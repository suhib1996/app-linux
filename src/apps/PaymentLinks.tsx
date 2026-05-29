import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

interface PayLink {
  id: string; name: string; amount: number; currency: string;
  url: string; created: string; clicks: number; conversions: number;
}

const MOCK_LINKS: PayLink[] = [
  { id: '1', name: 'Consulting Fee', amount: 500, currency: 'USD', url: 'https://pay.nexus/os/consult-abc', created: '2026-05-20', clicks: 45, conversions: 12 },
  { id: '2', name: 'Product License', amount: 99, currency: 'USD', url: 'https://pay.nexus/os/license-xyz', created: '2026-05-22', clicks: 234, conversions: 89 },
  { id: '3', name: 'Token Sale', amount: 0.1, currency: 'ETH', url: 'https://pay.nexus/os/token-sale', created: '2026-05-25', clicks: 567, conversions: 234 },
];

export default function PaymentLinks() {
  const [links, setLinks] = useState<PayLink[]>(MOCK_LINKS);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', amount: '', currency: 'USD' });
  const addNotification = useOSStore(s => s.addNotification);

  const createLink = () => {
    const link: PayLink = { id: Date.now().toString(), name: form.name, amount: parseFloat(form.amount), currency: form.currency, url: `https://pay.nexus/os/${Math.random().toString(36).substring(7)}`, created: new Date().toISOString().split('T')[0], clicks: 0, conversions: 0 };
    setLinks([link, ...links]);
    setForm({ name: '', amount: '', currency: 'USD' });
    setShowCreate(false);
    addNotification({ title: 'Link Created', message: link.url, type: 'success' });
  };

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Payment Links</h2>
          <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
            <Icons.Plus size={16} className="inline mr-1" /> Create Link
          </button>
        </div>

        {showCreate && (
          <div className="bg-zinc-800 rounded-xl p-4 mb-4 space-y-3">
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Link name" className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2" />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="Amount" className="bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2" />
              <select value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })} className="bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2">
                <option>USD</option><option>ETH</option><option>USDT</option><option>BNB</option>
              </select>
            </div>
            <button onClick={createLink} className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Create Link</button>
          </div>
        )}

        <div className="space-y-3">
          {links.map(link => (
            <div key={link.id} className="bg-zinc-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{link.name}</div>
                <div className="text-sm font-medium">{link.amount} {link.currency}</div>
              </div>
              <div className="text-xs text-blue-400 font-mono mb-2">{link.url}</div>
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span>{link.clicks} clicks</span>
                <span>{link.conversions} conversions</span>
                <span>{((link.conversions / Math.max(link.clicks, 1)) * 100).toFixed(1)}% rate</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
