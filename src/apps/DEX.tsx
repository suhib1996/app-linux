import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CHART_DATA = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  price: 1800 + Math.sin(i * 0.5) * 200 + Math.random() * 100
}));

const TOKENS = [
  { symbol: 'ETH', name: 'Ethereum', balance: 12.456, price: 3524.87 },
  { symbol: 'USDT', name: 'Tether', balance: 5000.00, price: 1.00 },
  { symbol: 'BNB', name: 'Binance Coin', balance: 45.23, price: 612.45 },
  { symbol: 'TRX', name: 'Tron', balance: 10000.00, price: 0.125 },
  { symbol: 'USDC', name: 'USD Coin', balance: 2500.00, price: 1.00 },
  { symbol: 'WBTC', name: 'Wrapped BTC', balance: 0.5, price: 67452.00 },
];

export default function DEX() {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDT');
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showConfirm, setShowConfirm] = useState(false);
  const addNotification = useOSStore(s => s.addNotification);

  const fromInfo = TOKENS.find(t => t.symbol === fromToken)!;
  const toInfo = TOKENS.find(t => t.symbol === toToken)!;
  const toAmount = fromAmount ? (parseFloat(fromAmount) * fromInfo.price / toInfo.price).toFixed(6) : '0';

  const handleSwap = () => {
    if (!fromAmount) return;
    setShowConfirm(false);
    addNotification({
      title: 'Swap Executed',
      message: `Swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`,
      type: 'success'
    });
    setFromAmount('');
  };

  return (
    <div className="w-full h-full flex bg-zinc-900 text-zinc-200">
      {/* Chart */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold">{fromInfo.symbol}/{toInfo.symbol}</div>
            <div className="text-green-400 text-sm">${(fromInfo.price / toInfo.price).toFixed(4)} (+2.34%)</div>
          </div>
          <div className="flex gap-2">
            {['1H', '1D', '1W', '1M'].map(t => (
              <button key={t} className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs">{t}</button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={CHART_DATA}>
            <defs>
              <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#52525b' }} />
            <YAxis tick={{ fontSize: 10, fill: '#52525b' }} domain={['dataMin - 100', 'dataMax + 100']} />
            <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
            <Area type="monotone" dataKey="price" stroke="#22c55e" fill="url(#priceGrad)" />
          </AreaChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500">24h Volume</div>
            <div className="text-lg font-medium">$1.2B</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500">Liquidity</div>
            <div className="text-lg font-medium">$450M</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500">APR</div>
            <div className="text-lg font-medium text-green-400">24.5%</div>
          </div>
        </div>
      </div>

      {/* Swap Panel */}
      <div className="w-96 border-l border-zinc-700/50 p-6">
        <h2 className="text-lg font-semibold mb-4">Swap</h2>
        
        {/* From */}
        <div className="bg-zinc-800 rounded-xl p-4 mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-500">From</span>
            <span className="text-xs text-zinc-500">Balance: {fromInfo.balance} {fromInfo.symbol}</span>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={fromAmount}
              onChange={e => setFromAmount(e.target.value)}
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl font-medium outline-none placeholder:text-zinc-600"
            />
            <select
              value={fromToken}
              onChange={e => setFromToken(e.target.value)}
              className="bg-zinc-700 rounded-lg px-3 py-1.5 text-sm"
            >
              {TOKENS.map(t => <option key={t.symbol} value={t.symbol}>{t.symbol}</option>)}
            </select>
          </div>
          <div className="text-xs text-zinc-500 mt-1">~${fromAmount ? (parseFloat(fromAmount) * fromInfo.price).toFixed(2) : '0.00'}</div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={() => { setFromToken(toToken); setToToken(fromToken); }}
            className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center hover:bg-zinc-600 transition-colors"
          >
            <Icons.ArrowDown size={16} />
          </button>
        </div>

        {/* To */}
        <div className="bg-zinc-800 rounded-xl p-4 mt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-500">To</span>
            <span className="text-xs text-zinc-500">Balance: {toInfo.balance} {toInfo.symbol}</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={toAmount}
              readOnly
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl font-medium outline-none placeholder:text-zinc-600"
            />
            <select
              value={toToken}
              onChange={e => setToToken(e.target.value)}
              className="bg-zinc-700 rounded-lg px-3 py-1.5 text-sm"
            >
              {TOKENS.map(t => <option key={t.symbol} value={t.symbol}>{t.symbol}</option>)}
            </select>
          </div>
          <div className="text-xs text-zinc-500 mt-1">~${(parseFloat(toAmount) * toInfo.price).toFixed(2)}</div>
        </div>

        {/* Slippage */}
        <div className="flex items-center justify-between mt-4 mb-4">
          <span className="text-sm text-zinc-500">Slippage Tolerance</span>
          <div className="flex gap-2">
            {[0.1, 0.5, 1].map(s => (
              <button
                key={s}
                onClick={() => setSlippage(s)}
                className={`px-2 py-1 rounded text-xs ${slippage === s ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-500'}`}
              >
                {s}%
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowConfirm(true)}
          disabled={!fromAmount}
          className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {fromAmount ? 'Swap' : 'Enter Amount'}
        </button>

        {showConfirm && (
          <div className="mt-4 p-4 bg-zinc-800/80 rounded-xl space-y-3">
            <div className="text-sm text-zinc-400">You will receive:</div>
            <div className="text-xl font-medium">{toAmount} {toToken}</div>
            <div className="text-xs text-zinc-500">
              <div>Rate: 1 {fromToken} = {(fromInfo.price / toInfo.price).toFixed(4)} {toToken}</div>
              <div>Minimum received: {(parseFloat(toAmount) * 0.995).toFixed(6)} {toToken}</div>
              <div>Network fee: ~$2.50</div>
            </div>
            <button onClick={handleSwap} className="w-full py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
              Confirm Swap
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
