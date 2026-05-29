import { useState } from 'react';
import * as Icons from 'lucide-react';

interface Prompt {
  id: string; name: string; content: string; tags: string[]; created: string;
}

const MOCK_PROMPTS: Prompt[] = [
  { id: '1', name: 'Solidity Auditor', content: 'You are an expert Solidity auditor. Review the following smart contract for security vulnerabilities...', tags: ['solidity', 'security'], created: '2026-05-20' },
  { id: '2', name: 'React Component Generator', content: 'Create a React component with TypeScript and Tailwind CSS. The component should...', tags: ['react', 'frontend'], created: '2026-05-22' },
  { id: '3', name: 'DeFi Strategy Analyzer', content: 'Analyze the following DeFi yield farming strategy for risks and returns...', tags: ['defi', 'analysis'], created: '2026-05-25' },
  { id: '4', name: 'API Documentation Writer', content: 'Generate comprehensive API documentation for the following endpoints...', tags: ['api', 'docs'], created: '2026-05-28' },
];

export default function PromptStudio() {
  const [prompts, setPrompts] = useState<Prompt[]>(MOCK_PROMPTS);
  const [selected, setSelected] = useState<Prompt | null>(null);
  const [editContent, setEditContent] = useState('');

  const savePrompt = () => {
    if (!selected) return;
    setPrompts(prompts.map(p => p.id === selected.id ? { ...p, content: editContent } : p));
    setSelected({ ...selected, content: editContent });
  };

  return (
    <div className="w-full h-full flex bg-zinc-900 text-zinc-200">
      <div className="w-64 border-r border-zinc-700/50 p-3">
        <div className="text-xs text-zinc-500 uppercase mb-2">Prompts</div>
        {prompts.map(p => (
          <button key={p.id} onClick={() => { setSelected(p); setEditContent(p.content); }} className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 ${selected?.id === p.id ? 'bg-blue-500/20 text-blue-400' : 'text-zinc-300 hover:bg-zinc-800'}`}>
            <div className="font-medium">{p.name}</div>
            <div className="flex gap-1 mt-1">{p.tags.map(t => <span key={t} className="px-1.5 py-0.5 bg-zinc-700 rounded text-xs text-zinc-400">{t}</span>)}</div>
          </button>
        ))}
      </div>
      <div className="flex-1 p-6">
        {selected ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{selected.name}</h3>
              <button onClick={savePrompt} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">Save</button>
            </div>
            <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full h-64 bg-zinc-800 border border-zinc-700 rounded-xl p-4 resize-none font-mono text-sm" />
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 flex items-center gap-2"><Icons.Play size={14} /> Test Prompt</button>
              <button className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-sm hover:bg-zinc-700 flex items-center gap-2"><Icons.Copy size={14} /> Copy</button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500">Select a prompt to edit</div>
        )}
      </div>
    </div>
  );
}
