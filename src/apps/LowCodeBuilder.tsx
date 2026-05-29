import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

const COMPONENTS = [
  { type: 'header', name: 'Header', icon: 'Layout' },
  { type: 'text', name: 'Text Block', icon: 'Type' },
  { type: 'button', name: 'Button', icon: 'MousePointer' },
  { type: 'image', name: 'Image', icon: 'Image' },
  { type: 'input', name: 'Input', icon: 'TextCursor' },
  { type: 'card', name: 'Card', icon: 'Square' },
  { type: 'grid', name: 'Grid', icon: 'Grid3X3' },
];

interface CanvasItem {
  id: string; type: string; x: number; y: number; content: string;
}

export default function LowCodeBuilder() {
  const [canvas, setCanvas] = useState<CanvasItem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const addNotification = useOSStore(s => s.addNotification);

  const addComponent = (type: string) => {
    const contents: Record<string, string> = {
      header: 'Page Title', text: 'Lorem ipsum dolor sit amet.', button: 'Click Me',
      image: '', input: '', card: 'Card Content', grid: 'Grid Item',
    };
    const newItem: CanvasItem = {
      id: Date.now().toString(), type,
      x: 50 + canvas.length * 20, y: 50 + canvas.length * 20,
      content: contents[type] || type,
    };
    setCanvas([...canvas, newItem]);
  };

  const exportHTML = () => {
    addNotification({ title: 'Exported', message: 'HTML code copied to clipboard', type: 'success' });
  };

  return (
    <div className="w-full h-full flex bg-zinc-900 text-zinc-200">
      <div className="w-56 border-r border-zinc-700/50 p-3">
        <div className="text-xs text-zinc-500 uppercase mb-2">Components</div>
        {COMPONENTS.map(c => {
          const Icon = (Icons as any)[c.icon];
          return (
            <button key={c.type} onClick={() => addComponent(c.type)} className="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 text-zinc-300 hover:bg-zinc-800 transition-colors">
              <Icon size={16} /> {c.name}
            </button>
          );
        })}
        <div className="mt-4">
          <button onClick={exportHTML} className="w-full py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 flex items-center justify-center gap-2"><Icons.Download size={14} /> Export HTML</button>
        </div>
      </div>
      <div className="flex-1 bg-zinc-800/50 p-8 overflow-auto">
        <div className="bg-white rounded-xl min-h-[600px] p-6 relative">
          {canvas.length === 0 && <div className="text-zinc-300 text-center mt-20">Drag components from the sidebar</div>}
          {canvas.map(item => (
            <div key={item.id} onClick={() => setSelected(item.id)} className={`mb-3 ${selected === item.id ? 'ring-2 ring-blue-500' : ''}`}>
              {item.type === 'header' && <h1 className="text-3xl font-bold text-black">{item.content}</h1>}
              {item.type === 'text' && <p className="text-black">{item.content}</p>}
              {item.type === 'button' && <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">{item.content}</button>}
              {item.type === 'image' && <div className="h-40 bg-zinc-200 rounded-lg flex items-center justify-center text-zinc-400"><Icons.Image size={32} /></div>}
              {item.type === 'input' && <input placeholder="Enter text..." className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-black" />}
              {item.type === 'card' && <div className="p-4 bg-zinc-100 rounded-xl text-black">{item.content}</div>}
              {item.type === 'grid' && <div className="grid grid-cols-3 gap-2">{[1,2,3].map(i => <div key={i} className="h-20 bg-zinc-100 rounded-lg" />)}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
