import { useState } from 'react';
import * as Icons from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CHART_DATA = Array.from({ length: 24 }, (_, i) => ({ time: i, price: 612 + Math.sin(i * 0.3) * 20 + Math.random() * 10 }));

const BSC_DAPPS = [
  { name: 'PancakeSwap', type: 'DEX', tvl: '$2.1B', users: '1.2M', status: 'active' },
  { name: 'Venus', type: 'Lending', tvl: '$890M', users: '234K', status: 'active' },
  { name: 'Alpaca Finance', type: 'Yield', tvl: '$340M', users: '89K', status: 'active' },
  { name: 'Biswap', type: 'DEX', tvl: '$156M', users: '67K', status: 'active' },
];

const VALIDATORS = [
  { name: 'Binance Node', staked: '5.2M BNB', commission: '5%', uptime: '99.99%' },
  { name: 'Ankr', staked: '3.8M BNB', commission: '3%', uptime: '99.95%' },
  { name: 'Allnodes', staked: '2.1M BNB', commission: '4%', uptime: '99.97%' },
  { name: 'HashQuark', staked: '1.7M BNB', commission: '6%', uptime: '99.92%' },
];

export default function BSCHub() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Icons.Hexagon size={20} className="text-yellow-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">BSC Hub</h2>
            <div className="text-xs text-zinc-500">Binance Smart Chain Tools</div>
          </div>
        </div>

        <div className="flex border-b border-zinc-700/50 mb-6">
          {['overview', 'dapps', 'validators'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium capitalize ${activeTab === tab ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-zinc-500'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-zinc-800 rounded-xl p-4">
                <div className="text-xs text-zinc-500">BNB Price</div>
                <div className="text-lg font-medium">$612.45</div>
                <div className="text-xs text-red-400">-1.23%</div>
              </div>
              <div className="bg-zinc-800 rounded-xl p-4">
                <div className="text-xs text-zinc-500">Gas Price</div>
                <div className="text-lg font-medium">5 Gwei</div>
              </div>
              <div className="bg-zinc-800 rounded-xl p-4">
                <div className="text-xs text-zinc-500">TVL</div>
                <div className="text-lg font-medium">$5.2B</div>
              </div>
              <div className="bg-zinc-800 rounded-xl p-4">
                <div className="text-xs text-zinc-500">Block Time</div>
                <div className="text-lg font-medium">3.0s</div>
              </div>
            </div>
            <div className="bg-zinc-800 rounded-xl p-4">
              <div className="text-sm text-zinc-500 mb-3">BNB Price (24h)</div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="bnbGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#52525b' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#52525b' }} domain={['dataMin - 20', 'dataMax + 20']} />
                  <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="price" stroke="#eab308" fill="url(#bnbGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === 'dapps' && (
          <div className="space-y-3">
            {BSC_DAPPS.map(app => (
              <div key={app.name} className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Icons.AppWindow size={18} className="text-yellow-400" />
                  </div>
                  <div>
                    <div className="font-medium">{app.name}</div>
                    <div className="text-xs text-zinc-500">{app.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{app.tvl} TVL</div>
                  <div className="text-xs text-zinc-500">{app.users} users</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'validators' && (
          <div className="space-y-3">
            {VALIDATORS.map((v, i) => (
              <div key={i} className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500 w-6">{i + 1}</span>
                  <div>
                    <div className="font-medium">{v.name}</div>
                    <div className="text-xs text-zinc-500">{v.staked} staked</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-yellow-400">{v.commission} commission</div>
                  <div className="text-xs text-zinc-500">{v.uptime} uptime</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
