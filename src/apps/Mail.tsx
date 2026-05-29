import { useState } from 'react';
import * as Icons from 'lucide-react';

interface Email {
  id: string; from: string; subject: string; preview: string; date: string; read: boolean; folder: string;
}

const EMAILS: Email[] = [
  { id: '1', from: 'team@nexus.os', subject: 'Welcome to NexusOS v2.0', preview: 'Thank you for installing NexusOS. Here are some tips to get started...', date: '10:30 AM', read: false, folder: 'inbox' },
  { id: '2', from: 'security@ethereum.org', subject: 'Smart Contract Security Alert', preview: 'A new vulnerability has been discovered in certain ERC-20 implementations...', date: 'Yesterday', read: false, folder: 'inbox' },
  { id: '3', from: 'jobs@binance.com', subject: 'Blockchain Developer Position', preview: 'We are looking for experienced Solidity developers to join our team...', date: 'May 28', read: true, folder: 'inbox' },
  { id: '4', from: 'alerts@tron.network', subject: 'TRX Price Movement', preview: 'TRX has increased by 5.6% in the last 24 hours...', date: 'May 27', read: true, folder: 'inbox' },
  { id: '5', from: 'newsletter@defiweekly.com', subject: 'DeFi Weekly - May Edition', preview: 'This week in DeFi: New protocols, yield opportunities, and more...', date: 'May 25', read: true, folder: 'inbox' },
];

export default function Mail() {
  const [folder, setFolder] = useState('inbox');
  const [selected, setSelected] = useState<Email | null>(null);

  const filtered = EMAILS.filter(e => e.folder === folder);

  return (
    <div className="w-full h-full flex bg-zinc-900 text-zinc-200">
      <div className="w-48 border-r border-zinc-700/50 p-3">
        {[
          { id: 'inbox', name: 'Inbox', icon: 'Inbox', count: 2 },
          { id: 'sent', name: 'Sent', icon: 'Send', count: 0 },
          { id: 'drafts', name: 'Drafts', icon: 'FileText', count: 0 },
          { id: 'trash', name: 'Trash', icon: 'Trash2', count: 0 },
        ].map(f => {
          const Icon = (Icons as any)[f.icon];
          return (
            <button key={f.id} onClick={() => { setFolder(f.id); setSelected(null); }} className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 mb-1 ${folder === f.id ? 'bg-blue-500/20 text-blue-400' : 'text-zinc-400 hover:bg-zinc-800'}`}>
              <Icon size={16} /> {f.name} {f.count > 0 && <span className="ml-auto text-xs bg-blue-500/20 text-blue-400 px-1.5 rounded">{f.count}</span>}
            </button>
          );
        })}
      </div>
      <div className="w-80 border-r border-zinc-700/50 overflow-auto">
        {filtered.map(email => (
          <button key={email.id} onClick={() => setSelected(email)} className={`w-full text-left p-3 border-b border-zinc-700/50 hover:bg-zinc-800/50 ${!email.read ? 'bg-blue-500/5' : ''} ${selected?.id === email.id ? 'bg-zinc-800' : ''}`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-sm ${!email.read ? 'font-medium' : ''}`}>{email.from}</span>
              <span className="text-xs text-zinc-500">{email.date}</span>
            </div>
            <div className={`text-sm ${!email.read ? 'font-medium' : 'text-zinc-400'}`}>{email.subject}</div>
            <div className="text-xs text-zinc-500 truncate">{email.preview}</div>
          </button>
        ))}
      </div>
      <div className="flex-1 p-6 overflow-auto">
        {selected ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">{selected.subject}</h2>
            <div className="flex items-center gap-2 mb-4 text-sm text-zinc-500">
              <span>From: {selected.from}</span>
              <span>|</span>
              <span>{selected.date}</span>
            </div>
            <div className="text-zinc-300 leading-relaxed">{selected.preview}</div>
            <div className="mt-6 p-4 bg-zinc-800 rounded-xl">
              <textarea placeholder="Reply..." className="w-full bg-transparent resize-none outline-none text-sm h-24" />
              <div className="flex justify-end"><button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">Send</button></div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500">Select an email to read</div>
        )}
      </div>
    </div>
  );
}
