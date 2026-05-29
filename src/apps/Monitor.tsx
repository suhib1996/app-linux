import { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import * as Icons from 'lucide-react';

export default function Monitor() {
  const [cpuData, setCpuData] = useState<any[]>([]);
  const [memoryData, setMemoryData] = useState<any[]>([]);
  const [networkData, setNetworkData] = useState<any[]>([]);
  const [processes, setProcesses] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      setCpuData(prev => [...prev.slice(-20), { time: now, value: 20 + Math.random() * 40 }]);
      setMemoryData(prev => [...prev.slice(-20), { time: now, value: 30 + Math.random() * 20 }]);
      setNetworkData(prev => [...prev.slice(-20), { time: now, value: Math.random() * 100 }]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const procs = [
      { pid: 1, name: 'kernel', cpu: 0.1, mem: 128, user: 'root' },
      { pid: 452, name: 'nexus-wm', cpu: 2.3, mem: 256, user: 'user' },
      { pid: 891, name: 'terminal', cpu: 0.5, mem: 64, user: 'user' },
      { pid: 1023, name: 'blockchain-node', cpu: 15.2, mem: 1024, user: 'user' },
      { pid: 1102, name: 'ai-engine', cpu: 25.8, mem: 2048, user: 'user' },
      { pid: 1205, name: 'payment-gateway', cpu: 5.1, mem: 512, user: 'user' },
      { pid: 1341, name: 'file-manager', cpu: 1.2, mem: 128, user: 'user' },
      { pid: 1456, name: 'browser', cpu: 8.7, mem: 768, user: 'user' },
      { pid: 1523, name: 'code-editor', cpu: 4.5, mem: 384, user: 'user' },
      { pid: 1601, name: 'crypto-wallet', cpu: 3.2, mem: 256, user: 'user' },
      { pid: 1702, name: 'dex-interface', cpu: 6.8, mem: 320, user: 'user' },
      { pid: 1801, name: 'smart-contract-vm', cpu: 12.4, mem: 896, user: 'user' },
    ];
    setProcesses(procs);
  }, []);

  const diskData = [
    { name: 'System', value: 45, color: '#3b82f6' },
    { name: 'Apps', value: 25, color: '#22c55e' },
    { name: 'User', value: 15, color: '#f59e0b' },
    { name: 'Free', value: 15, color: '#52525b' },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'Activity' },
    { id: 'cpu', name: 'CPU', icon: 'Cpu' },
    { id: 'memory', name: 'Memory', icon: 'HardDrive' },
    { id: 'processes', name: 'Processes', icon: 'List' },
  ];

  return (
    <div className="w-full h-full flex bg-zinc-900 text-zinc-200">
      {/* Sidebar */}
      <div className="w-44 border-r border-zinc-700/50 p-3 space-y-1">
        {tabs.map(tab => {
          const Icon = (Icons as any)[tab.icon];
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.id ? 'bg-blue-500/20 text-blue-400' : 'text-zinc-400 hover:bg-zinc-800'}`}
            >
              <Icon size={16} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">System Overview</h2>
            <div className="grid grid-cols-4 gap-4">
              <StatCard icon="Cpu" label="CPU Usage" value={`${cpuData.length > 0 ? cpuData[cpuData.length - 1].value.toFixed(1) : '0'}%`} color="text-blue-400" />
              <StatCard icon="HardDrive" label="Memory" value={`${memoryData.length > 0 ? memoryData[memoryData.length - 1].value.toFixed(1) : '0'}%`} color="text-green-400" />
              <StatCard icon="Wifi" label="Network" value={`${networkData.length > 0 ? networkData[networkData.length - 1].value.toFixed(0) : '0'} Mbps`} color="text-purple-400" />
              <StatCard icon="Clock" label="Uptime" value="2d 15h 32m" color="text-orange-400" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-800 rounded-xl p-4">
                <h3 className="text-sm font-medium mb-3">CPU History</h3>
                <ResponsiveContainer width="100%" height={150}>
                  <AreaChart data={cpuData}>
                    <defs>
                      <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#52525b' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#52525b' }} domain={[0, 100]} />
                    <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#cpuGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-zinc-800 rounded-xl p-4">
                <h3 className="text-sm font-medium mb-3">Memory History</h3>
                <ResponsiveContainer width="100%" height={150}>
                  <AreaChart data={memoryData}>
                    <defs>
                      <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#52525b' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#52525b' }} domain={[0, 100]} />
                    <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="value" stroke="#22c55e" fill="url(#memGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-xl p-4">
              <h3 className="text-sm font-medium mb-3">Disk Usage</h3>
              <div className="flex items-center gap-8">
                <ResponsiveContainer width={200} height={150}>
                  <PieChart>
                    <Pie data={diskData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value">
                      {diskData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {diskData.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                      <span className="text-zinc-400">{d.name}</span>
                      <span className="text-zinc-200 ml-2">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cpu' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">CPU Details</h2>
            <div className="bg-zinc-800 rounded-xl p-4">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={cpuData}>
                  <defs>
                    <linearGradient id="cpuGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#52525b' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#52525b' }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#cpuGrad2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 16 }, (_, i) => (
                <div key={i} className="bg-zinc-800 rounded-xl p-3">
                  <div className="text-xs text-zinc-500 mb-1">Core {i + 1}</div>
                  <div className="text-lg font-medium text-blue-400">{(10 + Math.random() * 30).toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'memory' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Memory Details</h2>
            <div className="bg-zinc-800 rounded-xl p-4">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={memoryData}>
                  <defs>
                    <linearGradient id="memGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#52525b' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#52525b' }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="value" stroke="#22c55e" fill="url(#memGrad2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-zinc-800 rounded-xl p-4 text-center">
                <div className="text-sm text-zinc-500">Total</div>
                <div className="text-2xl font-medium text-green-400">64 GB</div>
              </div>
              <div className="bg-zinc-800 rounded-xl p-4 text-center">
                <div className="text-sm text-zinc-500">Used</div>
                <div className="text-2xl font-medium text-yellow-400">18.5 GB</div>
              </div>
              <div className="bg-zinc-800 rounded-xl p-4 text-center">
                <div className="text-sm text-zinc-500">Free</div>
                <div className="text-2xl font-medium text-blue-400">45.5 GB</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'processes' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Processes</h2>
            <div className="bg-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left px-4 py-2 text-zinc-500">PID</th>
                    <th className="text-left px-4 py-2 text-zinc-500">Name</th>
                    <th className="text-left px-4 py-2 text-zinc-500">User</th>
                    <th className="text-right px-4 py-2 text-zinc-500">CPU %</th>
                    <th className="text-right px-4 py-2 text-zinc-500">Mem (MB)</th>
                  </tr>
                </thead>
                <tbody>
                  {processes.sort((a, b) => b.cpu - a.cpu).map(p => (
                    <tr key={p.pid} className="border-b border-zinc-700/50 hover:bg-zinc-700/30">
                      <td className="px-4 py-2 text-zinc-400">{p.pid}</td>
                      <td className="px-4 py-2">{p.name}</td>
                      <td className="px-4 py-2 text-zinc-400">{p.user}</td>
                      <td className="px-4 py-2 text-right text-blue-400">{p.cpu.toFixed(1)}%</td>
                      <td className="px-4 py-2 text-right text-green-400">{p.mem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  const Icon = (Icons as any)[icon];
  return (
    <div className="bg-zinc-800 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} className={color} />
        <span className="text-xs text-zinc-500">{label}</span>
      </div>
      <div className={`text-2xl font-semibold ${color}`}>{value}</div>
    </div>
  );
}
