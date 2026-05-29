import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import * as Icons from 'lucide-react';

const REVENUE_DATA = Array.from({ length: 30 }, (_, i) => ({ day: i + 1, revenue: 1200 + Math.sin(i * 0.3) * 500 + Math.random() * 300 }));
const METHOD_DATA = [
  { name: 'Card', value: 45, color: '#3b82f6' },
  { name: 'Crypto', value: 25, color: '#22c55e' },
  { name: 'Bank', value: 20, color: '#f59e0b' },
  { name: 'Other', value: 10, color: '#52525b' },
];
const HOURLY_DATA = Array.from({ length: 24 }, (_, i) => ({ hour: i, transactions: Math.floor(Math.random() * 50 + 10) }));

export default function PayAnalytics() {
  const [period, setPeriod] = useState('30d');

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Payment Analytics</h2>
          <div className="flex gap-2">
            {['7d', '30d', '90d'].map(p => (
              <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-sm ${period === p ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>{p}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500 mb-1">Total Revenue</div>
            <div className="text-2xl font-medium text-green-400">$42,568</div>
            <div className="text-xs text-green-400">+12.5%</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500 mb-1">Transactions</div>
            <div className="text-2xl font-medium">1,245</div>
            <div className="text-xs text-green-400">+8.3%</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500 mb-1">Avg Transaction</div>
            <div className="text-2xl font-medium">$34.20</div>
            <div className="text-xs text-red-400">-2.1%</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-xs text-zinc-500 mb-1">Success Rate</div>
            <div className="text-2xl font-medium text-blue-400">98.7%</div>
            <div className="text-xs text-green-400">+0.5%</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-sm text-zinc-500 mb-3">Revenue Trend</div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={REVENUE_DATA}>
                <defs><linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#52525b' }} /><YAxis tick={{ fontSize: 10, fill: '#52525b' }} />
                <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#22c55e" fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="text-sm text-zinc-500 mb-3">Payment Methods</div>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width={150} height={150}>
                <PieChart><Pie data={METHOD_DATA} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value">
                  {METHOD_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie></PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {METHOD_DATA.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full" style={{ background: d.color }} /><span className="text-zinc-400">{d.name}</span><span className="text-zinc-200 ml-2">{d.value}%</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 rounded-xl p-4">
          <div className="text-sm text-zinc-500 mb-3">Hourly Transaction Volume</div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={HOURLY_DATA}>
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#52525b' }} /><YAxis tick={{ fontSize: 10, fill: '#52525b' }} />
              <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
              <Bar dataKey="transactions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
