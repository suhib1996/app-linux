import { useState } from 'react';
import * as Icons from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CHART_DATA = Array.from({ length: 24 }, (_, i) => ({ time: i, price: 0.115 + Math.sin(i * 0.3) * 0.01 + Math.random() * 0.005 }));

const TRON_APPS = [
  { name: 'JustSwap', type: 'DEX', tvl: '$450M', users: '125K', status: 'active' },
  { name: 'JustLend', type: 'Lending', tvl: '$1.2B', users: '89K', status: 'active' },
  { name: 'SunSwap', type: 'DEX', tvl: '$280M', users: '67K', status: 'active' },
  { name: 'APENFT', type: 'NFT', tvl: '$15M', users: '45K', status: 'active' },
];

const SR_NODES = [
  { name: 'Binance Staking', votes: '12.4B', blocks: 189234, apr: '4.5%' },
  { name: 'BitGuild', votes: '8.7B', blocks: 156789, apr: '4.2%' },
  { name: 'Tron Society', votes: '6.2B', blocks: 134567, apr: '4.1%' },
  { name: 'CryptoChain', votes: '5.1B', blocks: 123456, apr: '4.0%' },
];

export default function TronStation() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <Icons.Zap size={20} className="text-red-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Tron Station</h2>
            <div className="text-xs text-zinc-500">Tron Network Tools & Analytics</div>
          </div>
        </div>

        <div className="flex border-b border-zinc-700/50 mb-6">
          {['overview', 'dapps', 'staking', 'resources'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium capitalize ${activeTab === tab ? 'text-red-400 border-b-2 border-red-400' : 'text-zinc-500'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-zinc-800 rounded-xl p-4">
                <div className="text-xs text-zinc-500">TRX Price</div>
                <div className="text-lg font-medium">$0.1254</div>
                <div className="text-xs text-green-400">+5.67%</div>
              </div>
              <div className="bg-zinc-800 rounded-xl p-4">
                <div className="text-xs text-zinc-500">Total Accounts</div>
                <div className="text-lg font-medium">178.5M</div>
              </div>
              <div className="bg-zinc-800 rounded-xl p-4">
                <div className="text-xs text-zinc-500">TVL</div>
                <div className="text-lg font-medium">$6.8B</div>
              </div>
              <div className="bg-zinc-800 rounded-xl p-4">
                <div className="text-xs text-zinc-500">Transactions/24h</div>
                <div className="text-lg font-medium">4.2M</div>
              </div>
            </div>
            <div className="bg-zinc-800 rounded-xl p-4">
              <div className="text-sm text-zinc-500 mb-3">TRX Price (24h)</div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="trxGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#52525b' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#52525b' }} domain={['dataMin - 0.01', 'dataMax + 0.01']} />
                  <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="price" stroke="#ef4444" fill="url(#trxGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === 'dapps' && (
          <div className="space-y-3">
            {TRON_APPS.map(app => (
              <div key={app.name} className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Icons.AppWindow size={18} className="text-red-400" />
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

        {activeTab === 'staking' && (
          <div className="space-y-3">
            <div className="bg-zinc-800 rounded-xl p-4 mb-4">
              <div className="text-sm font-medium mb-2">Freeze TRX for Resources</div>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Amount to freeze" className="bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm" />
                <select className="bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm">
                  <option>Bandwidth</option>
                  <option>Energy</option>
                </select>
              </div>
              <button className="mt-3 w-full py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">Freeze</button>
            </div>
            <h3 className="font-medium text-sm text-zinc-500 uppercase">Super Representatives</h3>
            {SR_NODES.map((sr, i) => (
              <div key={i} className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500 w-6">{i + 1}</span>
                  <div>
                    <div className="font-medium">{sr.name}</div>
                    <div className="text-xs text-zinc-500">{sr.votes} votes | {sr.blocks.toLocaleString()} blocks</div>
                  </div>
                </div>
                <div className="text-green-400 text-sm">{sr.apr} APR</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-800 rounded-xl p-4">
              <div className="text-sm text-zinc-500 mb-2">Bandwidth</div>
              <div className="text-2xl font-medium">8,450 / 10,000</div>
              <div className="w-full bg-zinc-700 rounded-full h-2 mt-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '84.5%' }} />
              </div>
            </div>
            <div className="bg-zinc-800 rounded-xl p-4">
              <div className="text-sm text-zinc-500 mb-2">Energy</div>
              <div className="text-2xl font-medium">12,300 / 15,000</div>
              <div className="w-full bg-zinc-700 rounded-full h-2 mt-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '82%' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
