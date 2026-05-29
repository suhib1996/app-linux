import { useState } from 'react';
import { useFileSystem } from '@/store/fileSystem';
import * as Icons from 'lucide-react';

const EXAMPLE_FILES: Record<string, string> = {
  'App.tsx': `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}`,
  'config.ts': `export const config = {
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  chainId: 56,
  rpcUrl: 'https://bsc-dataseed.binance.org',
  contracts: {
    token: '0x...',
    staking: '0x...'
  }
};`,
  'utils.ts': `export function formatAddress(addr: string): string {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

export function formatAmount(amount: number, decimals = 2): string {
  return amount.toFixed(decimals);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}`,
  'styles.css': `:root {
  --primary: #3b82f6;
  --secondary: #22c55e;
  --dark: #18181b;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: var(--dark);
  color: white;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}`
};

export default function VSCode() {
  const [tabs, setTabs] = useState<string[]>(['App.tsx']);
  const [activeTab, setActiveTab] = useState('App.tsx');
  const [files, setFiles] = useState<Record<string, string>>(EXAMPLE_FILES);
  const [showExplorer, setShowExplorer] = useState(true);

  const openFile = (name: string) => {
    if (!tabs.includes(name)) setTabs([...tabs, name]);
    setActiveTab(name);
  };

  const closeTab = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = tabs.filter(t => t !== name);
    setTabs(newTabs);
    if (activeTab === name && newTabs.length > 0) setActiveTab(newTabs[0]);
  };

  return (
    <div className="w-full h-full flex bg-zinc-900 text-zinc-200">
      {showExplorer && (
        <div className="w-56 border-r border-zinc-700/50 flex flex-col">
          <div className="p-2 text-xs text-zinc-500 uppercase tracking-wider font-medium">Explorer</div>
          <div className="flex-1 overflow-auto">
            <div className="px-2 py-1 text-xs text-zinc-500">NEXUS-PROJECT</div>
            {Object.keys(files).map(f => (
              <button key={f} onClick={() => openFile(f)}
                className={`w-full text-left px-4 py-1.5 text-sm flex items-center gap-2 hover:bg-zinc-800 ${activeTab === f ? 'bg-zinc-800 text-blue-400' : 'text-zinc-300'}`}>
                <Icons.FileCode size={14} /> {f}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="flex bg-zinc-800 overflow-x-auto">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`flex items-center gap-2 px-3 py-2 text-xs border-r border-zinc-700 min-w-0 ${activeTab === t ? 'bg-zinc-900 text-blue-400' : 'text-zinc-400 hover:bg-zinc-700/50'}`}>
              <span className="truncate">{t}</span>
              <Icons.X size={12} onClick={(e) => closeTab(t, e)} className="hover:text-red-400 shrink-0" />
            </button>
          ))}
        </div>
        {/* Editor */}
        <div className="flex-1 flex overflow-hidden">
          <div className="w-10 bg-zinc-800/50 text-right pr-2 pt-4 text-xs text-zinc-600 select-none shrink-0">
            {(files[activeTab] || '').split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
          <textarea
            value={files[activeTab] || ''}
            onChange={e => setFiles({ ...files, [activeTab]: e.target.value })}
            className="flex-1 bg-zinc-900 text-zinc-200 p-4 font-mono text-sm leading-5 resize-none outline-none"
            spellCheck={false}
          />
        </div>
        {/* Status Bar */}
        <div className="flex items-center justify-between px-3 py-1 bg-blue-600 text-white text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Icons.GitBranch size={12} /> main</span>
            <span>0 errors</span>
            <span>0 warnings</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Ln {(files[activeTab] || '').split('\n').length}, Col 1</span>
            <span>UTF-8</span>
            <span>TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  );
}
