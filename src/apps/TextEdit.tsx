import { useState, useEffect } from 'react';
import { useFileSystem } from '@/store/fileSystem';
import { useOSStore } from '@/store/osStore';

interface TextEditProps {
  windowId: string;
  filePath?: string;
}

export default function TextEdit({ windowId, filePath }: TextEditProps) {
  const fs = useFileSystem();
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('Untitled.txt');
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (filePath) {
      const content = fs.readFile(filePath);
      if (content !== null) {
        setContent(content);
        setFileName(filePath.split('/').pop() || 'Untitled.txt');
      }
    }
  }, [filePath, fs]);

  const handleSave = () => {
    const path = filePath || `/home/user/Documents/${fileName}`;
    fs.writeFile(path, content);
    setIsDirty(false);
    useOSStore.getState().addNotification({
      title: 'File Saved',
      message: `Saved ${fileName}`,
      type: 'success'
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-zinc-700/50">
        <button
          onClick={handleSave}
          className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
        >
          Save
        </button>
        <span className="text-sm text-zinc-500">{fileName}{isDirty ? ' *' : ''}</span>
      </div>
      <textarea
        value={content}
        onChange={e => { setContent(e.target.value); setIsDirty(true); }}
        className="flex-1 bg-zinc-900 text-zinc-200 p-4 resize-none outline-none font-mono text-sm leading-relaxed"
        spellCheck={false}
        placeholder="Start typing..."
      />
    </div>
  );
}
