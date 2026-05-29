import { useState } from 'react';
import * as Icons from 'lucide-react';

interface Container {
  id: string; name: string; image: string; status: 'running' | 'stopped' | 'paused';
  ports: string[]; cpu: number; memory: number; uptime: string;
}

const CONTAINERS: Container[] = [
  { id: 'nexus-web', name: 'nexus-web', image: 'nexusos/web:latest', status: 'running', ports: ['3000:3000'], cpu: 2.3, memory: 256, uptime: '3d 12h' },
  { id: 'nexus-api', name: 'nexus-api', image: 'nexusos/api:v2.1', status: 'running', ports: ['8080:8080'], cpu: 5.1, memory: 512, uptime: '3d 12h' },
  { id: 'postgres', name: 'nexus-db', image: 'postgres:15', status: 'running', ports: ['5432:5432'], cpu: 1.2, memory: 384, uptime: '7d 4h' },
  { id: 'redis', name: 'nexus-cache', image: 'redis:7-alpine', status: 'running', ports: ['6379:6379'], cpu: 0.5, memory: 64, uptime: '7d 4h' },
  { id: 'blockchain-node', name: 'eth-node', image: 'ethereum/client-go:latest', status: 'running', ports: ['8545:8545', '8546:8546'], cpu: 15.8, memory: 2048, uptime: '14d 2h' },
  { id: 'ai-engine', name: 'ai-inference', image: 'nexusos/ai:v1.5', status: 'paused', ports: ['5000:5000'], cpu: 0, memory: 0, uptime: '-' },
];

const IMAGES = [
  { name: 'nexusos/web', tag: 'latest', size: '245MB', created: '2 days ago' },
  { name: 'nexusos/api', tag: 'v2.1', size: '189MB', created: '5 days ago' },
  { name: 'postgres', tag: '15', size: '378MB', created: '2 weeks ago' },
  { name: 'redis', tag: '7-alpine', size: '28MB', created: '3 weeks ago' },
  { name: 'ethereum/client-go', tag: 'latest', size: '1.2GB', created: '1 week ago' },
  { name: 'nexusos/ai', tag: 'v1.5', size: '4.5GB', created: '1 day ago' },
];

export default function DockerDesktop() {
  const [activeTab, setActiveTab] = useState('containers');
  const [containers, setContainers] = useState(CONTAINERS);

  const toggleContainer = (id: string) => {
    setContainers(containers.map(c => c.id === id ? { ...c, status: c.status === 'running' ? 'stopped' : 'running' as any } : c));
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      <div className="flex border-b border-zinc-700/50">
        {['containers', 'images', 'volumes'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2.5 text-sm font-medium capitalize ${activeTab === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-zinc-500'}`}>{tab}</button>
        ))}
      </div>

      {activeTab === 'containers' && (
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-2">
            {containers.map(c => (
              <div key={c.id} className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${c.status === 'running' ? 'bg-green-400' : c.status === 'paused' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-zinc-500">{c.image}</div>
                    <div className="text-xs text-zinc-500">{c.ports.join(', ')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <div className="text-zinc-400">CPU: {c.cpu}%</div>
                    <div className="text-zinc-400">Mem: {c.memory}MB</div>
                  </div>
                  <button onClick={() => toggleContainer(c.id)} className="p-2 rounded-lg hover:bg-zinc-700">
                    {c.status === 'running' ? <Icons.Pause size={16} /> : <Icons.Play size={16} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'images' && (
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-2">
            {IMAGES.map(img => (
              <div key={img.name} className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icons.Box size={18} className="text-blue-400" />
                  <div>
                    <div className="font-medium">{img.name}:{img.tag}</div>
                    <div className="text-xs text-zinc-500">{img.created}</div>
                  </div>
                </div>
                <div className="text-sm text-zinc-400">{img.size}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'volumes' && (
        <div className="flex-1 overflow-auto p-4">
          {['nexus-data', 'postgres-data', 'redis-data', 'blockchain-data'].map(v => (
            <div key={v} className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Icons.HardDrive size={18} className="text-purple-400" />
                <div className="font-medium">{v}</div>
              </div>
              <div className="text-sm text-zinc-400">{(Math.random() * 10 + 1).toFixed(1)} GB</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
