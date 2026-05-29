import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

const PRESETS = [
  'Cyberpunk city at night with neon lights',
  'Abstract blockchain visualization with glowing nodes',
  'Futuristic DeFi dashboard interface',
  'Space station orbiting a crypto planet',
  'Digital art of a quantum computer',
  'Neural network brain made of light',
];

const MOCK_IMAGES = [
  'bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500',
  'bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600',
  'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700',
  'bg-gradient-to-br from-orange-500 via-red-600 to-pink-600',
  'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500',
  'bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-800',
];

export default function AIImage() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<string[]>([]);
  const addNotification = useOSStore(s => s.addNotification);

  const generate = () => {
    if (!prompt) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      const gradient = MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)];
      setGenerated([gradient, ...generated]);
      addNotification({ title: 'Image Generated', message: 'New image created', type: 'success' });
    }, 2500);
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-4 border-b border-zinc-700/50">
        <h2 className="text-lg font-semibold mb-3">AI Image Generator</h2>
        <div className="flex gap-2">
          <input value={prompt} onChange={e => setPrompt(e.target.value)} onKeyDown={e => e.key === 'Enter' && generate()} placeholder="Describe the image you want..." className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm" />
          <button onClick={generate} disabled={generating} className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 disabled:opacity-50 flex items-center gap-2">
            {generating ? <><Icons.Loader size={14} className="animate-spin" /> Generating...</> : <><Icons.Sparkles size={14} /> Generate</>}
          </button>
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {PRESETS.map(p => (
            <button key={p} onClick={() => setPrompt(p)} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400 hover:text-zinc-200">{p}</button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4">
        {generating && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Icons.Sparkles size={48} className="text-purple-400 animate-pulse mx-auto mb-4" />
              <p className="text-zinc-500">Creating your masterpiece...</p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-3 gap-4">
          {generated.map((img, i) => (
            <div key={i} className={`aspect-square rounded-xl ${img} flex items-center justify-center group relative overflow-hidden`}>
              <Icons.Image size={40} className="text-white/30" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30"><Icons.Download size={16} className="text-white" /></button>
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30"><Icons.Trash size={16} className="text-white" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
