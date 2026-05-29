import { useState, useMemo } from 'react';
import { useFileSystem } from '@/store/fileSystem';
import { useOSStore } from '@/store/osStore';
import type { FileSystemNode } from '@/types';
import * as Icons from 'lucide-react';

interface FilesProps {
  windowId: string;
  initialPath?: string;
}

export default function Files({ windowId, initialPath }: FilesProps) {
  const fs = useFileSystem();
  const openWindow = useOSStore(s => s.openWindow);
  const [currentPath, setCurrentPath] = useState(initialPath || '/home/user');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const items = useMemo(() => {
    return fs.readdir(currentPath) || [];
  }, [currentPath, fs]);

  const navigateUp = () => {
    if (currentPath === '/') return;
    const lastSlash = currentPath.lastIndexOf('/');
    const parent = lastSlash === 0 ? '/' : currentPath.substring(0, lastSlash);
    setCurrentPath(parent);
  };

  const navigateTo = (name: string) => {
    const newPath = currentPath === '/' ? `/${name}` : `${currentPath}/${name}`;
    setCurrentPath(newPath);
  };

  const openFile = (item: FileSystemNode) => {
    const path = currentPath === '/' ? `/${item.name}` : `${currentPath}/${item.name}`;
    if (item.name.endsWith('.sol')) {
      openWindow('contract-ide', item.name, { filePath: path });
    } else if (item.name.endsWith('.txt') || item.name.endsWith('.md')) {
      openWindow('textedit', item.name, { filePath: path });
    } else if (item.name.endsWith('.js') || item.name.endsWith('.ts') || item.name.endsWith('.html') || item.name.endsWith('.css')) {
      openWindow('vscode', item.name, { filePath: path });
    }
  };

  const getFileIcon = (item: FileSystemNode) => {
    if (item.type === 'directory') return <Icons.Folder size={40} className="text-blue-400" />;
    if (item.name.endsWith('.sol')) return <Icons.FileCode size={40} className="text-purple-400" />;
    if (item.name.endsWith('.js') || item.name.endsWith('.ts')) return <Icons.FileJson size={40} className="text-yellow-400" />;
    if (item.name.endsWith('.html')) return <Icons.FileText size={40} className="text-orange-400" />;
    if (item.name.endsWith('.css')) return <Icons.Palette size={40} className="text-blue-300" />;
    if (item.name.endsWith('.json')) return <Icons.Database size={40} className="text-green-400" />;
    if (item.name.endsWith('.md') || item.name.endsWith('.txt')) return <Icons.FileText size={40} className="text-zinc-300" />;
    if (item.name.endsWith('.png') || item.name.endsWith('.jpg') || item.name.endsWith('.svg')) return <Icons.Image size={40} className="text-pink-400" />;
    return <Icons.File size={40} className="text-zinc-400" />;
  };

  const breadcrumbs = currentPath.split('/').filter(Boolean);

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-zinc-700/50">
        <button onClick={navigateUp} className="p-1.5 rounded hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200">
          <Icons.ArrowUp size={16} />
        </button>
        <div className="flex items-center gap-1 text-sm bg-zinc-800 rounded-lg px-3 py-1.5 flex-1">
          <Icons.Home size={14} className="text-zinc-500" />
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="text-zinc-500">/</span>
              <button
                onClick={() => setCurrentPath('/' + breadcrumbs.slice(0, i + 1).join('/'))}
                className="hover:text-blue-400 transition-colors"
              >
                {crumb}
              </button>
            </span>
          ))}
        </div>
        <button
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className="p-1.5 rounded hover:bg-zinc-700 text-zinc-400"
        >
          {viewMode === 'grid' ? <Icons.List size={16} /> : <Icons.Grid3X3 size={16} />}
        </button>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-auto p-3">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-6 gap-3">
            {items.map(item => (
              <button
                key={item.name}
                onClick={() => {
                  if (item.type === 'directory') {
                    navigateTo(item.name);
                  } else {
                    openFile(item);
                  }
                }}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-zinc-800 transition-colors group"
              >
                {getFileIcon(item)}
                <span className="text-xs text-zinc-300 group-hover:text-zinc-100 text-center truncate w-full">{item.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-0.5">
            <div className="grid grid-cols-12 text-xs text-zinc-500 px-3 py-1.5">
              <span className="col-span-5">Name</span>
              <span className="col-span-2">Size</span>
              <span className="col-span-3">Modified</span>
              <span className="col-span-2">Type</span>
            </div>
            {items.map(item => (
              <button
                key={item.name}
                onClick={() => {
                  if (item.type === 'directory') {
                    navigateTo(item.name);
                  } else {
                    openFile(item);
                  }
                }}
                className="w-full grid grid-cols-12 text-sm px-3 py-2 rounded-lg hover:bg-zinc-800 text-left items-center"
              >
                <span className="col-span-5 flex items-center gap-2 truncate">
                  {item.type === 'directory' ? <Icons.Folder size={16} className="text-blue-400 shrink-0" /> : <Icons.File size={16} className="text-zinc-400 shrink-0" />}
                  <span className="truncate">{item.name}</span>
                </span>
                <span className="col-span-2 text-zinc-500">{item.size ? `${(item.size / 1024).toFixed(1)} KB` : '--'}</span>
                <span className="col-span-3 text-zinc-500">{new Date(item.modifiedAt).toLocaleDateString()}</span>
                <span className="col-span-2 text-zinc-500 capitalize">{item.type}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-t border-zinc-700/50 text-xs text-zinc-500">
        <span>{items.length} items</span>
        <span>{currentPath}</span>
      </div>
    </div>
  );
}
