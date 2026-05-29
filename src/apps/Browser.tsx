import { useState } from 'react';
import * as Icons from 'lucide-react';

const BOOKMARKS = [
  { name: 'Nexus Portal', url: 'https://nexus.os', icon: 'Home' },
  { name: 'Etherscan', url: 'https://etherscan.io', icon: 'Search' },
  { name: 'BscScan', url: 'https://bscscan.com', icon: 'Hexagon' },
  { name: 'TronScan', url: 'https://tronscan.org', icon: 'Zap' },
  { name: 'GitHub', url: 'https://github.com', icon: 'Github' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: 'HelpCircle' },
];

export default function Browser() {
  const [url, setUrl] = useState('https://nexus.os');
  const [navUrl, setNavUrl] = useState('https://nexus.os');

  const navigate = () => {
    let u = navUrl;
    if (!u.startsWith('http')) u = 'https://' + u;
    setUrl(u);
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      <div className="flex items-center gap-2 p-2 border-b border-zinc-700/50">
        <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400"><Icons.ArrowLeft size={16} /></button>
        <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400"><Icons.ArrowRight size={16} /></button>
        <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400"><Icons.RefreshCw size={16} /></button>
        <div className="flex-1 flex items-center bg-zinc-800 rounded-lg px-3 py-1.5">
          <Icons.Lock size={14} className="text-green-400 mr-2" />
          <input value={navUrl} onChange={e => setNavUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && navigate()} className="flex-1 bg-transparent text-sm outline-none" />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {url.includes('nexus.os') ? (
          <div className="p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                <Icons.Globe size={28} className="text-white" />
              </div>
              <h1 className="text-2xl font-semibold mb-2">NexusOS Portal</h1>
              <p className="text-zinc-500">Your gateway to the decentralized web</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {BOOKMARKS.map(bm => {
                const Icon = (Icons as any)[bm.icon];
                return (
                  <button key={bm.name} onClick={() => { setNavUrl(bm.url); setUrl(bm.url); }} className="bg-zinc-800 rounded-xl p-4 hover:bg-zinc-700 transition-colors text-left">
                    <Icon size={20} className="text-blue-400 mb-2" />
                    <div className="font-medium text-sm">{bm.name}</div>
                    <div className="text-xs text-zinc-500 truncate">{bm.url}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Icons.Globe size={48} className="text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-500">Simulated view of {url}</p>
              <p className="text-xs text-zinc-600 mt-2">External websites cannot be loaded in this sandbox environment</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
