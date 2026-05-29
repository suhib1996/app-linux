import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

const TOKENS = [
  { symbol: 'ETH', name: 'Ethereum', balance: 12.456, price: 3524.87, change: 2.34, icon: 'Diamond' },
  { symbol: 'USDT', name: 'Tether', balance: 5000.00, price: 1.00, change: 0.01, icon: 'CircleDollarSign' },
  { symbol: 'BNB', name: 'Binance Coin', balance: 45.23, price: 612.45, change: -1.23, icon: 'Hexagon' },
  { symbol: 'TRX', name: 'Tron', balance: 10000.00, price: 0.125, change: 5.67, icon: 'Zap' },
  { symbol: 'USDC', name: 'USD Coin', balance: 2500.00, price: 1.00, change: 0.0, icon: 'CircleDollarSign' },
  { symbol: 'BUSD', name: 'Binance USD', balance: 1800.00, price: 1.00, change: 0.0, icon: 'CircleDollarSign' },
];

const TRANSACTIONS = [
  { id: '1', type: 'receive', from: '0x1234...5678', to: '0x742d...0bEb', amount: '1.5', token: 'ETH', time: '2 min ago', status: 'confirmed' },
  { id: '2', type: 'send', from: '0x742d...0bEb', to: '0xabcd...ef01', amount: '500', token: 'USDT', time: '15 min ago', status: 'confirmed' },
  { id: '3', type: 'swap', from: 'DEX Router', to: '0x742d...0bEb', amount: '2.3', token: 'BNB', time: '1 hr ago', status: 'confirmed' },
  { id: '4', type: 'receive', from: '0x5678...9012', to: '0x742d...0bEb', amount: '1000', token: 'TRX', time: '3 hrs ago', status: 'confirmed' },
  { id: '5', type: 'send', from: '0x742d...0bEb', to: '0x3456...7890', amount: '100', token: 'USDC', time: '5 hrs ago', status: 'confirmed' },
];

export default function Wallet() {
  const [activeTab, setActiveTab] = useState('assets');
  const [showSend, setShowSend] = useState(false);
  const [sendForm, setSendForm] = useState({ to: '', amount: '', token: 'ETH' });
  const addNotification = useOSStore(s => s.addNotification);

  const totalBalance = TOKENS.reduce((sum, t) => sum + t.balance * t.price, 0);

  const handleSend = () => {
    if (!sendForm.to || !sendForm.amount) return;
    addNotification({
      title: 'Transaction Sent',
      message: `Sent ${sendForm.amount} ${sendForm.token} to ${sendForm.to}`,
      type: 'success'
    });
    setShowSend(false);
    setSendForm({ to: '', amount: '', token: 'ETH' });
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      {/* Header */}
      <div className="p-6 border-b border-zinc-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Icons.Wallet size={24} className="text-white" />
          </div>
          <div>
            <div className="text-sm text-zinc-500">Total Balance</div>
            <div className="text-2xl font-bold">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
        </div>
        <div className="text-xs text-zinc-500 font-mono">0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb</div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setShowSend(!showSend)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
          >
            <Icons.ArrowUp size={18} /> Send
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-zinc-800 text-zinc-200 rounded-xl hover:bg-zinc-700 transition-colors font-medium">
            <Icons.ArrowDown size={18} /> Receive
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-zinc-800 text-zinc-200 rounded-xl hover:bg-zinc-700 transition-colors font-medium">
            <Icons.ArrowLeftRight size={18} /> Swap
          </button>
        </div>
      </div>

      {/* Send Form */}
      {showSend && (
        <div className="p-4 bg-zinc-800/50 border-b border-zinc-700/50 space-y-3">
          <input
            type="text"
            value={sendForm.to}
            onChange={e => setSendForm({ ...sendForm, to: e.target.value })}
            placeholder="Recipient address (0x...)"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
          />
          <div className="flex gap-2">
            <input
              type="number"
              value={sendForm.amount}
              onChange={e => setSendForm({ ...sendForm, amount: e.target.value })}
              placeholder="Amount"
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
            />
            <select
              value={sendForm.token}
              onChange={e => setSendForm({ ...sendForm, token: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
            >
              {TOKENS.map(t => <option key={t.symbol} value={t.symbol}>{t.symbol}</option>)}
            </select>
          </div>
          <button onClick={handleSend} className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
            Confirm Send
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-zinc-700/50">
        {['assets', 'activity'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'assets' && (
          <div className="divide-y divide-zinc-700/30">
            {TOKENS.map(token => {
              const Icon = (Icons as any)[token.icon] || Icons.Coins;
              return (
                <div key={token.symbol} className="flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                      <Icon size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium">{token.symbol}</div>
                      <div className="text-xs text-zinc-500">{token.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{token.balance.toLocaleString()} {token.symbol}</div>
                    <div className="text-xs text-zinc-500">${(token.balance * token.price).toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="divide-y divide-zinc-700/30">
            {TRANSACTIONS.map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'receive' ? 'bg-green-500/20' : tx.type === 'send' ? 'bg-red-500/20' : 'bg-blue-500/20'
                  }`}>
                    {tx.type === 'receive' ? <Icons.ArrowDown size={18} className="text-green-400" /> :
                     tx.type === 'send' ? <Icons.ArrowUp size={18} className="text-red-400" /> :
                     <Icons.ArrowLeftRight size={18} className="text-blue-400" />}
                  </div>
                  <div>
                    <div className="font-medium capitalize">{tx.type}</div>
                    <div className="text-xs text-zinc-500 font-mono">{tx.from.slice(0, 10)}...{tx.from.slice(-6)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${tx.type === 'receive' ? 'text-green-400' : tx.type === 'send' ? 'text-red-400' : ''}`}>
                    {tx.type === 'receive' ? '+' : tx.type === 'send' ? '-' : ''}{tx.amount} {tx.token}
                  </div>
                  <div className="text-xs text-zinc-500">{tx.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
