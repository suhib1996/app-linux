import { useState } from 'react';
import * as Icons from 'lucide-react';

const MOCK_BLOCKS = Array.from({ length: 20 }, (_, i) => ({
  number: 18765432 - i,
  hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
  timestamp: new Date(Date.now() - i * 12000).toLocaleTimeString(),
  txns: Math.floor(Math.random() * 200 + 50),
  gas: Math.floor(Math.random() * 30000000 + 10000000),
  size: Math.floor(Math.random() * 50000 + 20000),
}));

const MOCK_TXNS = Array.from({ length: 10 }, (_, i) => ({
  hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
  from: '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
  to: '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
  value: (Math.random() * 10).toFixed(4),
  token: ['ETH', 'USDT', 'BNB', 'TRX'][Math.floor(Math.random() * 4)],
  gas: Math.floor(Math.random() * 21000 + 21000),
  status: Math.random() > 0.1 ? 'confirmed' : 'failed',
}));

export default function Explorer() {
  const [activeTab, setActiveTab] = useState<'blocks' | 'transactions'>('blocks');
  const [search, setSearch] = useState('');

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold">Block Explorer</h2>
          <div className="flex-1 relative">
            <Icons.Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by address, tx hash, block number..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500">Latest Block</div>
            <div className="text-lg font-medium">18,765,432</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500">TPS</div>
            <div className="text-lg font-medium text-green-400">15.2</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500">Gas Price</div>
            <div className="text-lg font-medium">25 Gwei</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500">Pending Txs</div>
            <div className="text-lg font-medium text-yellow-400">142</div>
          </div>
        </div>

        <div className="flex border-b border-zinc-700/50 mb-4">
          {['blocks', 'transactions'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2.5 text-sm font-medium capitalize ${activeTab === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-zinc-500'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'blocks' && (
          <div className="bg-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-zinc-700">
                <th className="text-left px-4 py-3 text-zinc-500">Block</th>
                <th className="text-left px-4 py-3 text-zinc-500">Time</th>
                <th className="text-right px-4 py-3 text-zinc-500">Txns</th>
                <th className="text-right px-4 py-3 text-zinc-500">Gas Used</th>
                <th className="text-right px-4 py-3 text-zinc-500">Size</th>
              </tr></thead>
              <tbody>
                {MOCK_BLOCKS.map(b => (
                  <tr key={b.number} className="border-b border-zinc-700/50 hover:bg-zinc-700/30">
                    <td className="px-4 py-3 text-blue-400 font-mono">{b.number.toLocaleString()}</td>
                    <td className="px-4 py-3 text-zinc-400">{b.timestamp}</td>
                    <td className="px-4 py-3 text-right">{b.txns}</td>
                    <td className="px-4 py-3 text-right text-zinc-400">{(b.gas / 1e6).toFixed(1)}M</td>
                    <td className="px-4 py-3 text-right text-zinc-400">{(b.size / 1024).toFixed(1)} KB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="bg-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-zinc-700">
                <th className="text-left px-4 py-3 text-zinc-500">Hash</th>
                <th className="text-left px-4 py-3 text-zinc-500">From</th>
                <th className="text-left px-4 py-3 text-zinc-500">To</th>
                <th className="text-right px-4 py-3 text-zinc-500">Value</th>
                <th className="text-left px-4 py-3 text-zinc-500">Status</th>
              </tr></thead>
              <tbody>
                {MOCK_TXNS.map((tx, i) => (
                  <tr key={i} className="border-b border-zinc-700/50 hover:bg-zinc-700/30">
                    <td className="px-4 py-3 text-blue-400 font-mono text-xs">{tx.hash.slice(0, 18)}...</td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-400">{tx.from.slice(0, 12)}...</td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-400">{tx.to.slice(0, 12)}...</td>
                    <td className="px-4 py-3 text-right font-medium">{tx.value} {tx.token}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs ${tx.status === 'confirmed' ? 'text-green-400' : 'text-red-400'}`}>{tx.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
