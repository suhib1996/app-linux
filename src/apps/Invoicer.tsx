import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

interface Invoice {
  id: string; client: string; amount: number; status: 'paid' | 'pending' | 'overdue';
  date: string; dueDate: string; items: { name: string; qty: number; price: number }[];
}

const MOCK_INVOICES: Invoice[] = [
  { id: 'INV-001', client: 'Acme Corp', amount: 2500, status: 'paid', date: '2026-05-01', dueDate: '2026-05-15', items: [{ name: 'Smart Contract Development', qty: 1, price: 2000 }, { name: 'Audit', qty: 1, price: 500 }] },
  { id: 'INV-002', client: 'TechStart Inc', amount: 4800, status: 'pending', date: '2026-05-10', dueDate: '2026-05-24', items: [{ name: 'DApp Development', qty: 1, price: 3500 }, { name: 'UI/UX Design', qty: 1, price: 1300 }] },
  { id: 'INV-003', client: 'CryptoVentures', amount: 1200, status: 'overdue', date: '2026-04-15', dueDate: '2026-04-30', items: [{ name: 'Token Deployment', qty: 1, price: 800 }, { name: 'Consulting', qty: 2, price: 200 }] },
  { id: 'INV-004', client: 'BlockBuilders', amount: 7500, status: 'pending', date: '2026-05-20', dueDate: '2026-06-05', items: [{ name: 'Full Stack Dev', qty: 1, price: 5000 }, { name: 'Mobile App', qty: 1, price: 2500 }] },
];

export default function Invoicer() {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [showCreate, setShowCreate] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ client: '', amount: '' });
  const addNotification = useOSStore(s => s.addNotification);

  const createInvoice = () => {
    if (!newInvoice.client || !newInvoice.amount) return;
    const inv: Invoice = { id: `INV-${String(invoices.length + 1).padStart(3, '0')}`, client: newInvoice.client, amount: parseFloat(newInvoice.amount), status: 'pending', date: new Date().toISOString().split('T')[0], dueDate: '', items: [] };
    setInvoices([inv, ...invoices]);
    setShowCreate(false);
    setNewInvoice({ client: '', amount: '' });
    addNotification({ title: 'Invoice Created', message: `${inv.id} created`, type: 'success' });
  };

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Invoices</h2>
          <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
            <Icons.Plus size={16} className="inline mr-1" /> New Invoice
          </button>
        </div>

        {showCreate && (
          <div className="bg-zinc-800 rounded-xl p-4 mb-4 space-y-3">
            <input value={newInvoice.client} onChange={e => setNewInvoice({ ...newInvoice, client: e.target.value })} placeholder="Client name" className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2" />
            <input type="number" value={newInvoice.amount} onChange={e => setNewInvoice({ ...newInvoice, amount: e.target.value })} placeholder="Amount" className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2" />
            <button onClick={createInvoice} className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Create</button>
          </div>
        )}

        <div className="space-y-2">
          {invoices.map(inv => (
            <div key={inv.id} className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{inv.id}</div>
                <div className="text-sm text-zinc-500">{inv.client}</div>
                <div className="text-xs text-zinc-500">Due: {inv.dueDate || 'N/A'}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">${inv.amount.toLocaleString()}</div>
                <span className={`px-2 py-0.5 rounded text-xs ${inv.status === 'paid' ? 'bg-green-500/20 text-green-400' : inv.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                  {inv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
