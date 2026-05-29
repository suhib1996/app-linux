import { useState } from 'react';
import * as Icons from 'lucide-react';

interface Subscription {
  id: string; name: string; price: number; interval: string;
  status: 'active' | 'paused' | 'cancelled'; nextBilling: string; subscribers: number;
}

const MOCK_SUBS: Subscription[] = [
  { id: '1', name: 'Pro Plan', price: 29.99, interval: 'monthly', status: 'active', nextBilling: '2026-06-15', subscribers: 1245 },
  { id: '2', name: 'Enterprise', price: 199.99, interval: 'monthly', status: 'active', nextBilling: '2026-06-01', subscribers: 89 },
  { id: '3', name: 'Basic Plan', price: 9.99, interval: 'monthly', status: 'active', nextBilling: '2026-06-10', subscribers: 5678 },
  { id: '4', name: 'Annual Pro', price: 299.99, interval: 'yearly', status: 'paused', nextBilling: '2026-12-01', subscribers: 234 },
];

export default function SubManager() {
  const [subs, setSubs] = useState<Subscription[]>(MOCK_SUBS);
  const mrr = subs.filter(s => s.status === 'active').reduce((sum, s) => sum + s.price * s.subscribers, 0);

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Subscriptions</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-800 rounded-xl p-4 text-center">
            <div className="text-xs text-zinc-500">MRR</div>
            <div className="text-2xl font-medium text-green-400">${(mrr / 1000).toFixed(1)}K</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4 text-center">
            <div className="text-xs text-zinc-500">Total Subscribers</div>
            <div className="text-2xl font-medium">{subs.reduce((sum, s) => sum + s.subscribers, 0).toLocaleString()}</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-4 text-center">
            <div className="text-xs text-zinc-500">Active Plans</div>
            <div className="text-2xl font-medium">{subs.filter(s => s.status === 'active').length}</div>
          </div>
        </div>

        <div className="space-y-3">
          {subs.map(sub => (
            <div key={sub.id} className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{sub.name}</div>
                <div className="text-sm text-zinc-500">{sub.subscribers.toLocaleString()} subscribers | Next: {sub.nextBilling}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">${sub.price}/{sub.interval === 'monthly' ? 'mo' : 'yr'}</div>
                <span className={`px-2 py-0.5 rounded text-xs ${sub.status === 'active' ? 'bg-green-500/20 text-green-400' : sub.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                  {sub.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
