import { useState } from 'react';
import * as Icons from 'lucide-react';

const SUGGESTIONS = [
  { icon: 'Terminal', text: 'Open Terminal', action: () => {} },
  { icon: 'Code', text: 'Open VS Code', action: () => {} },
  { icon: 'Wallet', text: 'Check Wallet', action: () => {} },
  { icon: 'Settings', text: 'System Settings', action: () => {} },
];

export default function Copilot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [expanded, setExpanded] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: 'I can help you with that. Would you like me to open a relevant app or provide documentation?' }]);
    }, 600);
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      <div className="flex-1 overflow-auto p-4 space-y-3">
        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-2">
            <Icons.Ghost size={24} className="text-white" />
          </div>
          <h3 className="font-medium">Nexus Copilot</h3>
          <p className="text-xs text-zinc-500">Your AI assistant</p>
        </div>
        {messages.map((m, i) => (
          <div key={i} className={`text-sm p-2 rounded-lg ${m.role === 'user' ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-300'}`}>{m.text}</div>
        ))}
        {messages.length === 0 && (
          <div className="space-y-2">
            {SUGGESTIONS.map((s, i) => {
              const Icon = (Icons as any)[s.icon];
              return (
                <button key={i} className="w-full flex items-center gap-2 p-2 bg-zinc-800 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors">
                  <Icon size={14} /> {s.text}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div className="p-3 border-t border-zinc-700/50">
        <div className="flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask Copilot..." className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm" />
          <button onClick={send} className="p-1.5 bg-blue-500 text-white rounded-lg"><Icons.Send size={14} /></button>
        </div>
      </div>
    </div>
  );
}
