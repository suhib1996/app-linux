import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

const NETWORKS = [
  { id: 'ethereum', name: 'Ethereum', type: 'ERC-20' },
  { id: 'bsc', name: 'BSC', type: 'BEP-20' },
  { id: 'tron', name: 'Tron', type: 'TRC-20' },
];

export default function TokenDeployer() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', symbol: '', decimals: '18', supply: '1000000',
    network: 'ethereum', mintable: false, burnable: false,
    pausable: false, governance: false
  });
  const addNotification = useOSStore(s => s.addNotification);

  const handleDeploy = () => {
    addNotification({ title: 'Token Deployed', message: `${form.name} (${form.symbol}) deployed on ${form.network}`, type: 'success' });
    setStep(4);
  };

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="max-w-lg mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Token Deployer</h2>
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map(s => (
            <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-blue-500' : 'bg-zinc-700'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-medium">Basic Information</h3>
            <div>
              <label className="text-sm text-zinc-500">Token Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="My Token" className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="text-sm text-zinc-500">Symbol</label>
              <input value={form.symbol} onChange={e => setForm({ ...form, symbol: e.target.value })} placeholder="MTK" className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-zinc-500">Decimals</label>
                <input type="number" value={form.decimals} onChange={e => setForm({ ...form, decimals: e.target.value })} className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="text-sm text-zinc-500">Initial Supply</label>
                <input type="number" value={form.supply} onChange={e => setForm({ ...form, supply: e.target.value })} className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2" />
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full py-2.5 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600">Next</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-medium">Features</h3>
            <div className="space-y-2">
              {[
                { key: 'mintable', label: 'Mintable', desc: 'Owner can mint new tokens' },
                { key: 'burnable', label: 'Burnable', desc: 'Tokens can be burned' },
                { key: 'pausable', label: 'Pausable', desc: 'Transfers can be paused' },
                { key: 'governance', label: 'Governance', desc: 'Voting and delegation' },
              ].map(f => (
                <label key={f.key} className="flex items-center justify-between p-3 bg-zinc-800 rounded-xl cursor-pointer">
                  <div>
                    <div className="font-medium text-sm">{f.label}</div>
                    <div className="text-xs text-zinc-500">{f.desc}</div>
                  </div>
                  <input type="checkbox" checked={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.checked })} className="w-4 h-4" />
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-2.5 bg-zinc-800 text-zinc-200 rounded-xl hover:bg-zinc-700">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600">Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-medium">Network & Deploy</h3>
            <div>
              <label className="text-sm text-zinc-500">Network</label>
              <select value={form.network} onChange={e => setForm({ ...form, network: e.target.value })} className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2">
                {NETWORKS.map(n => <option key={n.id} value={n.id}>{n.name} ({n.type})</option>)}
              </select>
            </div>
            <div className="bg-zinc-800 rounded-xl p-4 text-sm">
              <div className="font-medium mb-2">Summary</div>
              <div className="space-y-1 text-zinc-400">
                <div>Name: {form.name || 'Not set'}</div>
                <div>Symbol: {form.symbol || 'Not set'}</div>
                <div>Supply: {form.supply}</div>
                <div>Network: {form.network}</div>
                <div>Features: {[form.mintable && 'Mintable', form.burnable && 'Burnable', form.pausable && 'Pausable', form.governance && 'Governance'].filter(Boolean).join(', ') || 'None'}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-2.5 bg-zinc-800 text-zinc-200 rounded-xl hover:bg-zinc-700">Back</button>
              <button onClick={handleDeploy} className="flex-1 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600">Deploy</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-4">
            <Icons.CheckCircle size={48} className="text-green-400 mx-auto" />
            <h3 className="font-medium text-lg">Token Deployed!</h3>
            <div className="bg-zinc-800 rounded-xl p-4 text-sm text-left text-zinc-400 space-y-1">
              <div>Name: {form.name}</div>
              <div>Symbol: {form.symbol}</div>
              <div>Address: 0x{Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}</div>
              <div>Network: {form.network}</div>
              <div>Explorer: <span className="text-blue-400 cursor-pointer">View on Explorer</span></div>
            </div>
            <button onClick={() => setStep(1)} className="w-full py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600">Deploy Another</button>
          </div>
        )}
      </div>
    </div>
  );
}
