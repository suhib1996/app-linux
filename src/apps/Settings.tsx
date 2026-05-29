import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

export default function Settings() {
  const settings = useOSStore(s => s.settings);
  const updateSettings = useOSStore(s => s.updateSettings);
  const [activeTab, setActiveTab] = useState('appearance');
  const addNotification = useOSStore(s => s.addNotification);

  const tabs = [
    { id: 'appearance', name: 'Appearance', icon: 'Palette' },
    { id: 'system', name: 'System', icon: 'Monitor' },
    { id: 'users', name: 'Users', icon: 'Users' },
    { id: 'network', name: 'Network', icon: 'Wifi' },
  ];

  return (
    <div className="w-full h-full flex bg-zinc-900 text-zinc-200">
      {/* Sidebar */}
      <div className="w-56 border-r border-zinc-700/50 p-3 space-y-1">
        {tabs.map(tab => {
          const Icon = (Icons as any)[tab.icon];
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.id ? 'bg-blue-500/20 text-blue-400' : 'text-zinc-400 hover:bg-zinc-800'}`}
            >
              <Icon size={18} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-xl">
                <div>
                  <div className="font-medium">Theme</div>
                  <div className="text-sm text-zinc-500">Choose your preferred theme</div>
                </div>
                <select
                  value={settings.theme}
                  onChange={e => updateSettings({ theme: e.target.value as any })}
                  className="bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-xl">
                <div>
                  <div className="font-medium">Dock Position</div>
                  <div className="text-sm text-zinc-500">Taskbar position on screen</div>
                </div>
                <select
                  value={settings.dockPosition}
                  onChange={e => updateSettings({ dockPosition: e.target.value as any })}
                  className="bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-xl">
                <div>
                  <div className="font-medium">Dock Size</div>
                  <div className="text-sm text-zinc-500">Taskbar icon size</div>
                </div>
                <select
                  value={settings.dockSize}
                  onChange={e => updateSettings({ dockSize: e.target.value as any })}
                  className="bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">System</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-800 rounded-xl">
                <div className="text-sm text-zinc-500 mb-1">CPU</div>
                <div className="text-lg font-medium">QuantumCore i9-14900K</div>
                <div className="text-sm text-zinc-400">16 cores, 32 threads @ 6.0GHz</div>
              </div>
              <div className="p-4 bg-zinc-800 rounded-xl">
                <div className="text-sm text-zinc-500 mb-1">Memory</div>
                <div className="text-lg font-medium">64 GB DDR5</div>
                <div className="text-sm text-zinc-400">6400 MHz, 8GB used</div>
              </div>
              <div className="p-4 bg-zinc-800 rounded-xl">
                <div className="text-sm text-zinc-500 mb-1">Storage</div>
                <div className="text-lg font-medium">2 TB NVMe SSD</div>
                <div className="text-sm text-zinc-400">1.2 TB free</div>
              </div>
              <div className="p-4 bg-zinc-800 rounded-xl">
                <div className="text-sm text-zinc-500 mb-1">GPU</div>
                <div className="text-lg font-medium">RTX 4090 Ti</div>
                <div className="text-sm text-zinc-400">24 GB GDDR6X</div>
              </div>
            </div>
            <div className="p-4 bg-zinc-800 rounded-xl">
              <div className="font-medium mb-2">System Actions</div>
              <button
                onClick={() => {
                  localStorage.clear();
                  addNotification({ title: 'System', message: 'Cache cleared. Reboot required.', type: 'warning' });
                }}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
              >
                Clear Cache & Reset
              </button>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Users</h2>
            <div className="p-4 bg-zinc-800 rounded-xl flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
                {settings.username[0]?.toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-lg">{settings.username}</div>
                <div className="text-sm text-zinc-500">Administrator</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-xl">
                <div>
                  <div className="font-medium">Username</div>
                </div>
                <input
                  type="text"
                  value={settings.username}
                  onChange={e => updateSettings({ username: e.target.value })}
                  className="bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-xl">
                <div>
                  <div className="font-medium">Hostname</div>
                </div>
                <input
                  type="text"
                  value={settings.hostname}
                  onChange={e => updateSettings({ hostname: e.target.value })}
                  className="bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Network</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <Icons.Wifi size={20} className="text-green-400" />
                  <div>
                    <div className="font-medium">Wi-Fi</div>
                    <div className="text-sm text-zinc-500">Connected</div>
                  </div>
                </div>
                <div className="text-sm text-zinc-400">NexusNet-5G</div>
              </div>
              <div className="p-4 bg-zinc-800 rounded-xl">
                <div className="text-sm text-zinc-500 mb-3">Network Details</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">IP Address</span>
                    <span>192.168.1.105</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Subnet Mask</span>
                    <span>255.255.255.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Gateway</span>
                    <span>192.168.1.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">DNS</span>
                    <span>8.8.8.8, 1.1.1.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">MAC Address</span>
                    <span>aa:bb:cc:dd:ee:ff</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
