import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

const SUPPORTED_TOKENS = [
  { symbol: 'ETH', name: 'Ethereum', price: 3524.87 },
  { symbol: 'USDT', name: 'Tether', price: 1.00 },
  { symbol: 'BNB', name: 'Binance Coin', price: 612.45 },
  { symbol: 'TRX', name: 'Tron', price: 0.125 },
  { symbol: 'USDC', name: 'USD Coin', price: 1.00 },
];

export default function CryptoPay() {
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [merchantAddress, setMerchantAddress] = useState('');
  const [processing, setProcessing] = useState(false);
  const addNotification = useOSStore(s => s.addNotification);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      addNotification({ title: 'Crypto Payment', message: `Paid ${amount} ${selectedToken}`, type: 'success' });
      setAmount('');
    }, 2000);
  };

  const token = SUPPORTED_TOKENS.find(t => t.symbol === selectedToken)!;

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-xl font-semibold mb-6 text-center">Crypto Payment</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-zinc-500">Merchant Address</label>
            <input value={merchantAddress} onChange={e => setMerchantAddress(e.target.value)} placeholder="0x..." className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 font-mono text-sm" />
          </div>

          <div>
            <label className="text-sm text-zinc-500">Token</label>
            <div className="grid grid-cols-5 gap-2 mt-1">
              {SUPPORTED_TOKENS.map(t => (
                <button key={t.symbol} onClick={() => setSelectedToken(t.symbol)}
                  className={`p-2 rounded-lg text-center text-xs font-medium transition-colors ${selectedToken === t.symbol ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/50' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>
                  {t.symbol}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-zinc-500">Amount</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.0" className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-lg font-medium" />
            <div className="text-xs text-zinc-500 mt-1 text-right">~${amount ? (parseFloat(amount) * token.price).toFixed(2) : '0.00'} USD</div>
          </div>

          <button onClick={handlePay} disabled={processing || !amount} className="w-full py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 disabled:opacity-50">
            {processing ? 'Processing...' : `Pay ${amount || '0'} ${selectedToken}`}
          </button>
        </div>
      </div>
    </div>
  );
}
