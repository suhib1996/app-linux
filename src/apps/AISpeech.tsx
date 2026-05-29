import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

const VOICES = [
  { id: 'alloy', name: 'Alloy', desc: 'Balanced and clear' },
  { id: 'echo', name: 'Echo', desc: 'Warm and natural' },
  { id: 'fable', name: 'Fable', desc: 'British accent' },
  { id: 'onyx', name: 'Onyx', desc: 'Deep and authoritative' },
  { id: 'nova', name: 'Nova', desc: 'Energetic and bright' },
  { id: 'shimmer', name: 'Shimmer', desc: 'Youthful and expressive' },
];

export default function AISpeech() {
  const [text, setText] = useState('Welcome to NexusOS, the next generation operating system for blockchain and AI development.');
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const [generating, setGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const addNotification = useOSStore(s => s.addNotification);

  const generate = () => {
    if (!text) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setAudioUrl('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT' );
      addNotification({ title: 'Speech Generated', message: 'Audio file ready', type: 'success' });
    }, 2000);
  };

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="max-w-lg mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">AI Speech Generator</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-zinc-500">Text</label>
            <textarea value={text} onChange={e => setText(e.target.value)} className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 h-32 resize-none" />
          </div>
          <div>
            <label className="text-sm text-zinc-500">Voice</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {VOICES.map(v => (
                <button key={v.id} onClick={() => setSelectedVoice(v.id)} className={`p-2 rounded-lg text-left text-sm ${selectedVoice === v.id ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/50' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}>
                  <div className="font-medium">{v.name}</div>
                  <div className="text-xs text-zinc-500">{v.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <button onClick={generate} disabled={generating} className="w-full py-2.5 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2">
            {generating ? <><Icons.Loader size={16} className="animate-spin" /> Generating...</> : <><Icons.Mic size={16} /> Generate Speech</>}
          </button>
          {audioUrl && (
            <div className="bg-zinc-800 rounded-xl p-4">
              <audio controls className="w-full" src={audioUrl} />
              <button className="mt-2 w-full py-2 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 flex items-center justify-center gap-2">
                <Icons.Download size={14} /> Download Audio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
