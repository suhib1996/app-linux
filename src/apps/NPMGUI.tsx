import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

const PACKAGES = [
  { name: 'react', version: '^18.2.0', installed: true, desc: 'React is a JavaScript library for building user interfaces.' },
  { name: 'typescript', version: '^5.0.0', installed: true, desc: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.' },
  { name: 'ethers', version: '^6.7.0', installed: true, desc: 'Complete Ethereum library.' },
  { name: 'tronweb', version: '^5.3.0', installed: false, desc: 'Web3 library for interacting with the TRON network.' },
  { name: '@openzeppelin/contracts', version: '^4.9.0', installed: true, desc: 'Secure smart contract library.' },
  { name: 'web3', version: '^4.1.0', installed: false, desc: 'Ethereum JavaScript API.' },
  { name: 'hardhat', version: '^2.17.0', installed: true, desc: 'Development environment for Ethereum software.' },
  { name: 'tailwindcss', version: '^3.3.0', installed: true, desc: 'A utility-first CSS framework.' },
];

export default function NPMGUI() {
  const [search, setSearch] = useState('');
  const [packages, setPackages] = useState(PACKAGES);
  const addNotification = useOSStore(s => s.addNotification);

  const filtered = packages.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const togglePackage = (name: string) => {
    setPackages(packages.map(p => p.name === name ? { ...p, installed: !p.installed } : p));
    const pkg = packages.find(p => p.name === name);
    addNotification({ title: pkg?.installed ? 'Uninstalled' : 'Installed', message: `${name} ${pkg?.installed ? 'removed' : 'added'}`, type: 'success' });
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      <div className="p-4 border-b border-zinc-700/50">
        <div className="relative">
          <Icons.Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search packages..." className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-sm" />
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-2">
          {filtered.map(pkg => (
            <div key={pkg.name} className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{pkg.name}</span>
                  <span className="text-xs text-zinc-500">{pkg.version}</span>
                  {pkg.installed && <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">installed</span>}
                </div>
                <div className="text-sm text-zinc-500 mt-0.5">{pkg.desc}</div>
              </div>
              <button onClick={() => togglePackage(pkg.name)} className={`px-3 py-1.5 rounded-lg text-sm ${pkg.installed ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'}`}>
                {pkg.installed ? 'Remove' : 'Install'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
