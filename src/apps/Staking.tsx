import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const POOLS = [
  { id: '1', token: 'ETH', staked: 12.5, apy: 8.5, tvl: '$2.4M', rewards: '0.85', period: '30 days' },
  { id: '2', token: 'BNB', staked: 45.2, apy: 12.3, tvl: '$1.8M', rewards: '3.12', period: '60 days' },
  { id: '3', token: 'TRX', staked: 5000, apy: 15.7, tvl: '$890K', rewards: '125.4', period: '90 days' },
  { id: '4', token: 'USDT', staked: 2500, apy: 5.2, tvl: '$5.1M', rewards: '42.5', period: 'Flexible' },
];

const HISTORY = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  apy: 5 + Math.sin(i * 0.3) * 3 + Math.random() * 2
}));

export default function Staking() {
  const [activePool, setActivePool] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [myStakes, setMyStakes] = useState<Record<string, number>>({});
  const addNotification = useOSStore(s => s.addNotification);

  const handleStake = (poolId: string) => {
    if (!stakeAmount) return;
    setMyStakes({ ...myStakes, [poolId]: (myStakes[poolId] || 0) + parseFloat(stakeAmount) });
    addNotification({ title: 'Staked', message: `Staked ${stakeAmount} tokens`, type: 'success' });
    setStakeAmount('');
    setActivePool(null);
  };

  const handleUnstake = (poolId: string) => {
    setMyStakes({ ...myStakes, [poolId]: 0 });
    addNotification({ title: 'Unstaked', message: 'Tokens unstaked successfully', type: 'success' });
  };

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Staking Pools</h2>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500">Total Value Locked</div>
            <div className="text-lg font-medium text-green-400">$10.2M</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500">Your Staked</div>
            <div className="text-lg font-medium">{Object.values(myStakes).reduce((a, b) => a + b, 0).toFixed(2)}</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500">Rewards Earned</div>
            <div className="text-lg font-medium text-yellow-400">$142.50</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500">Avg APY</div>
            <div className="text-lg font-medium text-blue-400">10.4%</div>
          </div>
        </div>

        {/* APY Chart */}
        <div className="bg-zinc-800 rounded-xl p-4 mb-6">
          <div className="text-sm text-zinc-500 mb-3">APY Trend (30 Days)</div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={HISTORY}>
              <defs>
                <linearGradient id="apyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#52525b' }} />
              <YAxis tick={{ fontSize: 10, fill: '#52525b' }} />
              <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="apy" stroke="#22c55e" fill="url(#apyGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pools */}
        <div className="space-y-3">
          {POOLS.map(pool => (
            <div key={pool.id} className="bg-zinc-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Icons.Coins size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium">{pool.token} Pool</div>
                    <div className="text-xs text-zinc-500">Lock: {pool.period} | TVL: {pool.tvl}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-medium">{pool.apy}% APY</div>
                  <div className="text-xs text-zinc-500">{myStakes[pool.id] ? `Staked: ${myStakes[pool.id]}` : 'Not staked'}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActivePool(activePool === pool.id ? null : pool.id)}
                    className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30"
                  >
                    Stake
                  </button>
                  {myStakes[pool.id] ? (
                    <button
                      onClick={() => handleUnstake(pool.id)}
                      className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30"
                    >
                      Unstake
                    </button>
                  ) : null}
                </div>
              </div>
              {activePool === pool.id && (
                <div className="mt-4 flex gap-2">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={e => setStakeAmount(e.target.value)}
                    placeholder="Amount to stake"
                    className="flex-1 bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    onClick={() => handleStake(pool.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
