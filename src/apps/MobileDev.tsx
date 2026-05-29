import { useState } from 'react';
import * as Icons from 'lucide-react';

export default function MobileDev() {
  const [device, setDevice] = useState<'iphone' | 'android'>('iphone');
  const [url, setUrl] = useState('https://example.com');
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-4 border-b border-zinc-700/50">
        <div className="flex gap-3">
          <div className="flex bg-zinc-800 rounded-lg overflow-hidden">
            <button onClick={() => setDevice('iphone')} className={`px-4 py-2 text-sm ${device === 'iphone' ? 'bg-blue-500 text-white' : 'text-zinc-400'}`}><Icons.Smartphone size={14} className="inline mr-1" />iPhone</button>
            <button onClick={() => setDevice('android')} className={`px-4 py-2 text-sm ${device === 'android' ? 'bg-green-500 text-white' : 'text-zinc-400'}`}><Icons.Smartphone size={14} className="inline mr-1" />Android</button>
          </div>
          <input value={url} onChange={e => setUrl(e.target.value)} className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm" />
          <button onClick={handleLoad} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"><Icons.RefreshCw size={14} /></button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className={`bg-black rounded-[2rem] border-4 border-zinc-700 overflow-hidden ${device === 'iphone' ? 'w-[375px] h-[812px]' : 'w-[360px] h-[740px]'}`}>
          <div className="w-full h-6 bg-black flex items-center justify-center">
            <div className={`bg-zinc-800 rounded-full ${device === 'iphone' ? 'w-24 h-5' : 'w-16 h-3'}`} />
          </div>
          <div className="h-[calc(100%-24px)] bg-zinc-800 p-4 overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full"><Icons.Loader size={24} className="animate-spin text-zinc-500" /></div>
            ) : (
              <div className="space-y-3">
                <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl" />
                <div className="h-4 bg-zinc-700 rounded w-3/4" />
                <div className="h-4 bg-zinc-700 rounded w-1/2" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-20 bg-zinc-700 rounded-xl" />
                  <div className="h-20 bg-zinc-700 rounded-xl" />
                </div>
                <div className="h-4 bg-zinc-700 rounded w-full" />
                <div className="h-4 bg-zinc-700 rounded w-2/3" />
                <div className="h-12 bg-blue-500 rounded-xl" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
