import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import * as Icons from 'lucide-react';

const CHANNELS = [
  { name: 'Stripe', status: 'active', volume: '$12.5K', txns: 342, success: 99.2 },
  { name: 'PayPal', status: 'active', volume: '$8.2K', txns: 189, success: 98.7 },
  { name: 'CryptoPay', status: 'active', volume: '$5.1K', txns: 67, success: 97.5 },
  { name: 'Square', status: 'maintenance', volume: '$3.4K', txns: 98, success: 0 },
];

const TXN_DATA = Array.from({ length: 24 }, (_, i) => ({ hour: i, count: Math.floor(Math.random() * 30 + 5) }));

export default function PayGateway() {
  const [activeTab, setActiveTab] = useState('channels');

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Gateway</h2>
        <div className="flex border-b border-zinc-700/50 mb-6">
          {['channels', 'analytics', 'settings'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2.5 text-sm font-medium capitalize ${activeTab === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-zinc-500'}`}>{tab}</button>
          ))}
        </div>

        {activeTab === 'channels' && (
          <div className="space-y-3">
            {CHANNELS.map(ch => (
              <div key={ch.name} className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ch.status === 'active' ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                    <Icons.CreditCard size={18} className={ch.status === 'active' ? 'text-green-400' : 'text-yellow-400'} />
                  </div>
                  <div>
                    <div className="font-medium">{ch.name}</div>
                    <div className="text-xs text-zinc-500">{ch.txns} transactions today</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{ch.volume}</div>
                  <span className={`px-2 py-0.5 rounded text-xs ${ch.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{ch.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analytics' && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-zinc-800 rounded-xl p-4 text-center">
                <div className="text-xs text-zinc-500">Total Volume</div>
                <div className="text-2xl font-medium text-green-400">$29.2K</div>
              </div>
              <div className="bg-zinc-800 rounded-xl p-4 text-center">
                <div className="text-xs text-zinc-500">Transactions</div>
                <div className="text-2xl font-medium">696</div>
              </div>
              <div className="bg-zinc-800 rounded-xl p-4 text-center">
                <div className="text-xs text-zinc-500">Avg Success</div>
                <div className="text-2xl font-medium text-blue-400">98.5%</div>
              </div>
            </div>
            <div className="bg-zinc-800 rounded-xl p-4">
              <div className="text-sm text-zinc-500 mb-3">Transaction Volume (24h)</div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={TXN_DATA}>
                  <defs><linearGradient id="txnGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
                  <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#52525b' }} /><YAxis tick={{ fontSize: 10, fill: '#52525b' }} />
                  <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="url(#txnGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4 max-w-lg">
            <div className="bg-zinc-800 rounded-xl p-4">
              <div className="font-medium mb-3">Webhook URL</div>
              <input placeholder="https://your-api.com/webhook" className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="bg-zinc-800 rounded-xl p-4">
              <div className="font-medium mb-3">API Keys</div>
              <div className="space-y-2">
                {['Production', 'Test'].map(k => (
                  <div key={k} className="flex items-center justify-between p-2 bg-zinc-700 rounded-lg">
                    <span className="text-sm">{k}</span>
                    <span className="text-xs text-zinc-500 font-mono">pk_{Array(24).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-zinc-800 rounded-xl p-4">
              <div className="font-medium mb-3">Risk Settings</div>
              <div className="space-y-2 text-sm">
                <label className="flex items-center justify-between"><span>Block suspicious IPs</span><input type="checkbox" defaultChecked className="w-4 h-4" /></label>
                <label className="flex items-center justify-between"><span>3D Secure</span><input type="checkbox" defaultChecked className="w-4 h-4" /></label>
                <label className="flex items-center justify-between"><span>Fraud detection</span><input type="checkbox" defaultChecked className="w-4 h-4" /></label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
