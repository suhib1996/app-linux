import { useState, useCallback } from 'react';
import { useOSStore } from '@/store/osStore';
import { Monitor, Trash2 } from 'lucide-react';
import Window from './Window';
import StartMenu from './StartMenu';
import Taskbar from './Taskbar';

export default function Desktop() {
  const windows = useOSStore(s => s.windows);
  const openWindow = useOSStore(s => s.openWindow);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const handleClick = useCallback(() => {
    setContextMenu(null);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-zinc-950 overflow-hidden select-none"
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)`
      }} />

      {/* Desktop Icons */}
      <div className="absolute inset-0 bottom-12 p-4">
        <div className="grid grid-cols-1 gap-2 w-20">
          <button
            onDoubleClick={() => openWindow('monitor', 'System Monitor')}
            className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 transition-colors group"
          >
            <Monitor size={32} className="text-zinc-300 group-hover:text-white" />
            <span className="text-[11px] text-zinc-300 group-hover:text-white text-center leading-tight">Computer</span>
          </button>
          <button
            onDoubleClick={() => {}}
            className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 transition-colors group"
          >
            <Trash2 size={32} className="text-zinc-300 group-hover:text-white" />
            <span className="text-[11px] text-zinc-300 group-hover:text-white text-center leading-tight">Trash</span>
          </button>
        </div>
      </div>

      {/* Windows */}
      {windows.map(win => (
        <Window key={win.id} window={win} />
      ))}

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl py-1 z-[9999] min-w-44"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button className="w-full text-left px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-700 flex items-center gap-2">
            <span>Refresh</span>
          </button>
          <div className="h-px bg-zinc-700 my-1" />
          <button className="w-full text-left px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-700 flex items-center gap-2">
            <span>New Folder</span>
          </button>
          <button className="w-full text-left px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-700 flex items-center gap-2">
            <span>New Document</span>
          </button>
          <div className="h-px bg-zinc-700 my-1" />
          <button className="w-full text-left px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-700 flex items-center gap-2">
            <span>Change Wallpaper</span>
          </button>
          <button className="w-full text-left px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-700 flex items-center gap-2">
            <span>System Settings</span>
          </button>
        </div>
      )}

      {/* Start Menu */}
      <StartMenu />

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}
