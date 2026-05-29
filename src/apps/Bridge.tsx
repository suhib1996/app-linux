import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

const CHAINS = [
  { id: 'ethereum', name: 'Ethereum', icon: 'Diamond', color: 'text-blue-400' },
  { id: 'bsc', name: 'BSC', icon: 'Hexagon', color: 'text-yellow-400' },
  { id: 'tron', name: 'Tron', icon: 'Zap', color: 'text-red-400' },
  { id: 'polygon', name: 'Polygon', icon: 'Hexagon', color: 'text-purple-400' },
  { id: 'arbitrum', name: 'Arbitrum', icon: 'Circle', color: 'text-blue-300' },
];

const TOKENS = [
  { symbol: 'USDT', name: 'Tether', balance: 5000 },
  { symbol: 'USDC', name: 'USD Coin', balance: 2500 },
  { symbol: 'ETH', name: 'Ethereum', balance: 12.456 },
  { symbol: 'BNB', name: 'Binance Coin', balance: 45.23 },
];

export default function Bridge() {
  const [fromChain, setFromChain] = useState('ethereum');
  const [toChain, setToChain] = useState('bsc');
  const [token, setToken] = useState('USDT');
  const [amount, setAmount] = useState('');
  const [isBridging, setIsBridging] = useState(false);
  const [progress, setProgress] = useState(0);
  const addNotification = useOSStore(s => s.addNotification);

  const handleBridge = () => {
    if (!amount) return;
    setIsBridging(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsBridging(false);
          addNotification({ title: 'Bridge Complete', message: `Bridged ${amount} ${token} to ${CHAINS.find(c => c.id === toChain)?.name}`, type: 'success' });
          setAmount('');
          return 100;
        }
        return p + 10;
      });
    }, 500);
  };

  const fromChainInfo = CHAINS.find(c => c.id === fromChain)!;
  const toChainInfo = CHAINS.find(c => c.id === toChain)!;
  const FromIcon = (Icons as any)[fromChainInfo.icon];
  const ToIcon = (Icons as any)[toChainInfo.icon];

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-xl font-semibold mb-6 text-center">Cross-Chain Bridge</h2>

        {/* From Chain */}
        <div className="bg-zinc-800 rounded-xl p-4 mb-4">
          <div className="text-sm text-zinc-500 mb-2">From</div>
          <select
            value={fromChain}
            onChange={e => setFromChain(e.target.value)}
            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2.5 text-sm mb-3"
          >
            {CHAINS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div className="flex items-center gap-3">
            <FromIcon size={24} className={fromChainInfo.color} />
            <div>
              <div className="font-medium">{fromChainInfo.name}</div>
              <div className="text-xs text-zinc-500">Gas: ~$2.50</div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => { setFromChain(toChain); setToChain(fromChain); }}
            className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center hover:bg-zinc-600 transition-colors"
          >
            <Icons.ArrowDown size={20} />
          </button>
        </div>

        {/* To Chain */}
        <div className="bg-zinc-800 rounded-xl p-4 mb-4">
          <div className="text-sm text-zinc-500 mb-2">To</div>
          <select
            value={toChain}
            onChange={e => setToChain(e.target.value)}
            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2.5 text-sm mb-3"
          >
            {CHAINS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div className="flex items-center gap-3">
            <ToIcon size={24} className={toChainInfo.color} />
            <div>
              <div className="font-medium">{toChainInfo.name}</div>
              <div className="text-xs text-zinc-500">Estimated: ~3-5 min</div>
            </div>
          </div>
        </div>

        {/* Token & Amount */}
        <div className="bg-zinc-800 rounded-xl p-4 mb-4">
          <div className="text-sm text-zinc-500 mb-2">Token</div>
          <select
            value={token}
            onChange={e => setToken(e.target.value)}
            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2.5 text-sm mb-3"
          >
            {TOKENS.map(t => <option key={t.symbol} value={t.symbol}>{t.name} ({t.symbol})</option>)}
          </select>
          <div className="text-sm text-zinc-500 mb-2">Amount</div>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0.0"
            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2.5 text-lg font-medium"
          />
          <div className="text-xs text-zinc-500 mt-1 text-right">
            Balance: {TOKENS.find(t => t.symbol === token)?.balance} {token}
          </div>
        </div>

        {/* Progress */}
        {isBridging && (
          <div className="bg-zinc-800 rounded-xl p-4 mb-4">
            <div className="text-sm text-zinc-500 mb-2">Bridging in progress...</div>
            <div className="w-full bg-zinc-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="text-xs text-zinc-500 mt-1 text-right">{progress}%</div>
          </div>
        )}

        {/* Bridge Button */}
        <button
          onClick={handleBridge}
          disabled={!amount || isBridging || fromChain === toChain}
          className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBridging ? 'Bridging...' : fromChain === toChain ? 'Select different chains' : 'Bridge Assets'}
        </button>

        {/* Info */}
        <div className="mt-4 text-xs text-zinc-500 space-y-1">
          <div className="flex justify-between">
            <span>Bridge Fee</span>
            <span>0.1%</span>
          </div>
          <div className="flex justify-between">
            <span>Minimum Amount</span>
            <span>10 {token}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Time</span>
            <span>3-5 minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
