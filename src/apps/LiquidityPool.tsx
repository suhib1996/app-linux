import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

const POOLS = [
  { id: '1', pair: 'ETH/USDT', tvl: '$12.5M', volume: '$2.1M', apr: '24.5%', fee: '0.3%', myShare: '0.05%' },
  { id: '2', pair: 'BNB/BUSD', tvl: '$8.2M', volume: '$1.4M', apr: '18.2%', fee: '0.3%', myShare: '0.12%' },
  { id: '3', pair: 'ETH/BNB', tvl: '$5.8M', volume: '$890K', apr: '32.1%', fee: '0.5%', myShare: '0%' },
  { id: '4', pair: 'TRX/USDT', tvl: '$3.4M', volume: '$450K', apr: '15.8%', fee: '0.3%', myShare: '0.08%' },
  { id: '5', pair: 'USDC/USDT', tvl: '$22.1M', volume: '$5.2M', apr: '5.2%', fee: '0.05%', myShare: '0.25%' },
];

export default function LiquidityPool() {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const addNotification = useOSStore(s => s.addNotification);

  const handleAddLiquidity = () => {
    addNotification({ title: 'Liquidity Added', message: `Added to pool ${POOLS.find(p => p.id === selectedPool)?.pair}`, type: 'success' });
    setSelectedPool(null);
    setAmountA('');
    setAmountB('');
  };

  if (selectedPool) {
    const pool = POOLS.find(p => p.id === selectedPool)!;
    return (
      <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
        <div className="p-6 max-w-md mx-auto">
          <button onClick={() => setSelectedPool(null)} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 mb-4">
            <Icons.ArrowLeft size={18} /> Back
          </button>
          <h3 className="text-lg font-semibold mb-4">Add Liquidity - {pool.pair}</h3>
          <div className="space-y-4">
            <div className="bg-zinc-800 rounded-xl p-4">
              <div className="text-sm text-zinc-500 mb-2">{pool.pair.split('/')[0]}</div>
              <input type="number" value={amountA} onChange={e => setAmountA(e.target.value)} placeholder="0.0" className="w-full bg-transparent text-2xl font-medium outline-none placeholder:text-zinc-600" />
            </div>
            <div className="flex justify-center"><Icons.Plus size={20} className="text-zinc-500" /></div>
            <div className="bg-zinc-800 rounded-xl p-4">
              <div className="text-sm text-zinc-500 mb-2">{pool.pair.split('/')[1]}</div>
              <input type="number" value={amountB} onChange={e => setAmountB(e.target.value)} placeholder="0.0" className="w-full bg-transparent text-2xl font-medium outline-none placeholder:text-zinc-600" />
            </div>
            <div className="bg-zinc-800 rounded-xl p-4 text-sm space-y-1">
              <div className="flex justify-between"><span className="text-zinc-500">Pool APR</span><span className="text-green-400">{pool.apr}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Fee Tier</span><span>{pool.fee}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Your Share</span><span>{pool.myShare}</span></div>
            </div>
            <button onClick={handleAddLiquidity} className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600">Add Liquidity</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Liquidity Pools</h2>
        <div className="space-y-2">
          {POOLS.map(pool => (
            <button key={pool.id} onClick={() => setSelectedPool(pool.id)} className="w-full bg-zinc-800 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-700/50 transition-colors text-left">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs text-blue-400">{pool.pair.split('/')[0][0]}</div>
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-xs text-green-400">{pool.pair.split('/')[1][0]}</div>
                </div>
                <div>
                  <div className="font-medium">{pool.pair}</div>
                  <div className="text-xs text-zinc-500">Fee: {pool.fee}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-medium">{pool.apr} APR</div>
                <div className="text-xs text-zinc-500">TVL: {pool.tvl}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
