import { useState } from 'react';
import * as Icons from 'lucide-react';

const TRANSACTIONS = [
  { id: '1', hash: '0xabc123...def456', type: 'send', from: '0x742d...0bEb', to: '0x1234...5678', amount: '1.5', token: 'ETH', network: 'Ethereum', timestamp: '2026-05-29 14:32:15', status: 'confirmed', gas: '0.002' },
  { id: '2', hash: '0xdef456...ghi789', type: 'receive', from: '0x5678...9012', to: '0x742d...0bEb', amount: '500', token: 'USDT', network: 'BSC', timestamp: '2026-05-29 12:15:00', status: 'confirmed', gas: '0.0005' },
  { id: '3', hash: '0xghi789...jkl012', type: 'swap', from: 'DEX Router', to: '0x742d...0bEb', amount: '2.3', token: 'BNB', network: 'BSC', timestamp: '2026-05-29 10:45:30', status: 'confirmed', gas: '0.001' },
  { id: '4', hash: '0xjkl012...mno345', type: 'send', from: '0x742d...0bEb', to: '0x9012...3456', amount: '1000', token: 'TRX', network: 'Tron', timestamp: '2026-05-28 18:22:10', status: 'confirmed', gas: '5' },
  { id: '5', hash: '0xmno345...pqr678', type: 'deploy', from: '0x742d...0bEb', to: 'Contract', amount: '0', token: 'ETH', network: 'Ethereum', timestamp: '2026-05-28 15:00:00', status: 'confirmed', gas: '0.05' },
  { id: '6', hash: '0xpqr678...stu901', type: 'stake', from: '0x742d...0bEb', to: 'Staking Pool', amount: '5', token: 'ETH', network: 'Ethereum', timestamp: '2026-05-28 09:30:00', status: 'confirmed', gas: '0.003' },
  { id: '7', hash: '0xstu901...vwx234', type: 'send', from: '0x742d...0bEb', to: '0x3456...7890', amount: '100', token: 'USDC', network: 'Ethereum', timestamp: '2026-05-27 22:10:00', status: 'failed', gas: '0.001' },
  { id: '8', hash: '0xvwx234...yza567', type: 'receive', from: '0x7890...1234', to: '0x742d...0bEb', amount: '50', token: 'BNB', network: 'BSC', timestamp: '2026-05-27 16:45:00', status: 'confirmed', gas: '0.0003' },
  { id: '9', hash: '0xyza567...bcd890', type: 'swap', from: '0x742d...0bEb', to: 'DEX Router', amount: '2000', token: 'USDT', network: 'Tron', timestamp: '2026-05-27 11:20:00', status: 'confirmed', gas: '2' },
  { id: '10', hash: '0xbcd890...efg123', type: 'send', from: '0x742d...0bEb', to: '0xabcd...efgh', amount: '2', token: 'ETH', network: 'Ethereum', timestamp: '2026-05-26 08:00:00', status: 'pending', gas: '0.002' },
];

export default function TxHistory() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = TRANSACTIONS.filter(tx => {
    if (filter !== 'all' && tx.type !== filter) return false;
    if (search && !tx.hash.includes(search) && !tx.token.includes(search)) return false;
    return true;
  });

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by hash or token"
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Types</option>
            <option value="send">Send</option>
            <option value="receive">Receive</option>
            <option value="swap">Swap</option>
            <option value="deploy">Deploy</option>
            <option value="stake">Stake</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left px-4 py-3 text-zinc-500">Type</th>
                <th className="text-left px-4 py-3 text-zinc-500">Hash</th>
                <th className="text-right px-4 py-3 text-zinc-500">Amount</th>
                <th className="text-left px-4 py-3 text-zinc-500">Network</th>
                <th className="text-left px-4 py-3 text-zinc-500">Time</th>
                <th className="text-left px-4 py-3 text-zinc-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => (
                <tr key={tx.id} className="border-b border-zinc-700/50 hover:bg-zinc-700/30">
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      tx.type === 'send' ? 'bg-red-500/20 text-red-400' :
                      tx.type === 'receive' ? 'bg-green-500/20 text-green-400' :
                      tx.type === 'swap' ? 'bg-blue-500/20 text-blue-400' :
                      tx.type === 'deploy' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-400">{tx.hash}</td>
                  <td className="px-4 py-3 text-right font-medium">{tx.amount} {tx.token}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs ${tx.network === 'Ethereum' ? 'text-blue-400' : tx.network === 'BSC' ? 'text-yellow-400' : 'text-red-400'}`}>
                      {tx.network}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-400 text-xs">{tx.timestamp}</td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1 text-xs ${
                      tx.status === 'confirmed' ? 'text-green-400' : tx.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      <Icons.Circle size={8} className={tx.status === 'confirmed' ? 'fill-green-400' : tx.status === 'pending' ? 'fill-yellow-400' : 'fill-red-400'} />
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
