import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

const FARMS = [
  { id: '1', name: 'ETH-USDT LP', platform: 'Uniswap', tvl: '$5.2M', apy: '45.2%', daily: '0.12%', deposited: '0', rewards: '0' },
  { id: '2', name: 'BNB-BUSD LP', platform: 'PancakeSwap', tvl: '$3.8M', apy: '38.5%', daily: '0.10%', deposited: '1.5', rewards: '12.5' },
  { id: '3', name: 'TRX-USDT LP', platform: 'JustSwap', tvl: '$1.2M', apy: '62.1%', daily: '0.17%', deposited: '0', rewards: '0' },
  { id: '4', name: 'ETH-BNB LP', platform: 'BiSwap', tvl: '$890K', apy: '55.8%', daily: '0.15%', deposited: '0.8', rewards: '8.2' },
];

export default function YieldFarm() {
  const [activeFarm, setActiveFarm] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const addNotification = useOSStore(s => s.addNotification);

  const handleDeposit = () => {
    addNotification({ title: 'Farm Deposited', message: `Deposited ${depositAmount} LP tokens`, type: 'success' });
    setActiveFarm(null);
    setDepositAmount('');
  };

  if (activeFarm) {
    const farm = FARMS.find(f => f.id === activeFarm)!;
    return (
      <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
        <div className="p-6 max-w-md mx-auto">
          <button onClick={() => setActiveFarm(null)} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 mb-4">
            <Icons.ArrowLeft size={18} /> Back
          </button>
          <h3 className="text-lg font-semibold mb-4">{farm.name}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-zinc-800 rounded-xl p-3 text-center">
                <div className="text-xs text-zinc-500">APY</div>
                <div className="text-lg font-medium text-green-400">{farm.apy}</div>
              </div>
              <div className="bg-zinc-800 rounded-xl p-3 text-center">
                <div className="text-xs text-zinc-500">Daily</div>
                <div className="text-lg font-medium">{farm.daily}</div>
              </div>
              <div className="bg-zinc-800 rounded-xl p-3 text-center">
                <div className="text-xs text-zinc-500">TVL</div>
                <div className="text-lg font-medium">{farm.tvl}</div>
              </div>
            </div>
            <div className="bg-zinc-800 rounded-xl p-4">
              <div className="text-sm text-zinc-500 mb-2">Deposit LP Tokens</div>
              <input type="number" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} placeholder="0.0" className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-lg" />
            </div>
            <button onClick={handleDeposit} className="w-full py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600">Deposit</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Yield Farms</h2>
        <div className="grid grid-cols-2 gap-4">
          {FARMS.map(farm => (
            <button key={farm.id} onClick={() => setActiveFarm(farm.id)} className="bg-zinc-800 rounded-xl p-4 hover:bg-zinc-700/50 transition-colors text-left">
              <div className="flex items-center gap-2 mb-2">
                <Icons.Sprout size={18} className="text-green-400" />
                <span className="font-medium">{farm.name}</span>
              </div>
              <div className="text-xs text-zinc-500 mb-3">{farm.platform}</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-500">APY</div>
                  <div className="text-green-400 font-medium">{farm.apy}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-500">TVL</div>
                  <div className="font-medium">{farm.tvl}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
