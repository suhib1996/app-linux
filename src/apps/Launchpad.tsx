import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

const PROJECTS = [
  { id: '1', name: 'NexusFi', symbol: 'NXF', description: 'Next-gen DeFi protocol on BSC', raised: '2.4M', goal: '3M', price: '0.05', participants: 12500, startDate: '2026-06-01', status: 'upcoming' },
  { id: '2', name: 'TronGames', symbol: 'TGM', description: 'Gaming ecosystem on Tron', raised: '890K', goal: '1M', price: '0.02', participants: 8900, startDate: '2026-06-05', status: 'live' },
  { id: '3', name: 'DataVault', symbol: 'DVT', description: 'Decentralized storage solution', raised: '5.1M', goal: '5M', price: '0.10', participants: 23400, startDate: '2026-05-20', status: 'ended' },
];

export default function Launchpad() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [buyAmount, setBuyAmount] = useState('');
  const addNotification = useOSStore(s => s.addNotification);

  const handleBuy = () => {
    addNotification({ title: 'Tokens Purchased', message: `Bought ${buyAmount} tokens`, type: 'success' });
    setBuyAmount('');
  };

  if (selectedProject) {
    const project = PROJECTS.find(p => p.id === selectedProject)!;
    const progress = (parseFloat(project.raised) / parseFloat(project.goal)) * 100;
    return (
      <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
        <div className="p-6 max-w-lg mx-auto">
          <button onClick={() => setSelectedProject(null)} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 mb-4">
            <Icons.ArrowLeft size={18} /> Back
          </button>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
            <Icons.Rocket size={28} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold">{project.name}</h3>
          <div className="text-sm text-zinc-500 mb-4">{project.symbol} | {project.description}</div>

          <div className="bg-zinc-800 rounded-xl p-4 mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-500">Progress</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-zinc-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }} />
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-zinc-400">{project.raised} raised</span>
              <span className="text-zinc-500">Goal: {project.goal}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-zinc-800 rounded-xl p-3 text-center">
              <div className="text-xs text-zinc-500">Token Price</div>
              <div className="font-medium">${project.price}</div>
            </div>
            <div className="bg-zinc-800 rounded-xl p-3 text-center">
              <div className="text-xs text-zinc-500">Participants</div>
              <div className="font-medium">{project.participants.toLocaleString()}</div>
            </div>
          </div>

          {project.status === 'live' && (
            <div className="space-y-3">
              <input type="number" value={buyAmount} onChange={e => setBuyAmount(e.target.value)} placeholder="Amount to purchase" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2" />
              <button onClick={handleBuy} className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600">Buy Tokens</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Token Launchpad</h2>
        <div className="space-y-3">
          {PROJECTS.map(project => {
            const progress = (parseFloat(project.raised) / parseFloat(project.goal)) * 100;
            return (
              <button key={project.id} onClick={() => setSelectedProject(project.id)} className="w-full bg-zinc-800 rounded-xl p-4 hover:bg-zinc-700/50 transition-colors text-left">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <Icons.Rocket size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-zinc-500">{project.symbol}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${project.status === 'live' ? 'bg-green-500/20 text-green-400' : project.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-700 text-zinc-400'}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 mb-3">{project.description}</p>
                <div className="w-full bg-zinc-700 rounded-full h-1.5 mb-1">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }} />
                </div>
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>{project.raised} raised</span>
                  <span>{project.participants.toLocaleString()} participants</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
