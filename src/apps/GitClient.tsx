import { useState } from 'react';
import * as Icons from 'lucide-react';

const BRANCHES = ['main', 'feature/contract-upgrade', 'bugfix/payment-gateway', 'develop', 'release/v2.0'];
const COMMITS = [
  { hash: 'a1b2c3d', message: 'feat: add multi-sig wallet support', author: 'user', time: '2 hours ago', branch: 'main' },
  { hash: 'e4f5g6h', message: 'fix: resolve staking pool APY calculation', author: 'user', time: '5 hours ago', branch: 'main' },
  { hash: 'i7j8k9l', message: 'chore: update dependencies', author: 'user', time: '1 day ago', branch: 'main' },
  { hash: 'm0n1o2p', message: 'feat: implement cross-chain bridge', author: 'user', time: '2 days ago', branch: 'main' },
  { hash: 'q3r4s5t', message: 'docs: add API documentation', author: 'user', time: '3 days ago', branch: 'main' },
];

const STAGED = ['src/contracts/MultiSig.sol', 'src/utils/bridge.ts'];
const UNSTAGED = ['src/components/Wallet.tsx', 'src/config.ts', 'README.md'];

export default function GitClient() {
  const [activeTab, setActiveTab] = useState('commits');
  const [commitMsg, setCommitMsg] = useState('');

  return (
    <div className="w-full h-full flex bg-zinc-900 text-zinc-200">
      <div className="w-48 border-r border-zinc-700/50 p-3">
        <div className="text-xs text-zinc-500 uppercase mb-2">Branches</div>
        {BRANCHES.map(b => (
          <button key={b} className="w-full text-left px-3 py-1.5 text-sm rounded-lg hover:bg-zinc-800 flex items-center gap-2 text-zinc-300">
            <Icons.GitBranch size={14} /> <span className="truncate">{b}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex border-b border-zinc-700/50">
          {['commits', 'changes'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2.5 text-sm font-medium capitalize ${activeTab === tab ? 'text-orange-400 border-b-2 border-orange-400' : 'text-zinc-500'}`}>{tab}</button>
          ))}
        </div>

        {activeTab === 'commits' && (
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-3">
              {COMMITS.map((c, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icons.GitCommit size={14} className="text-orange-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{c.message}</div>
                    <div className="text-xs text-zinc-500 flex items-center gap-2">
                      <span className="font-mono text-orange-400">{c.hash}</span>
                      <span>{c.author}</span>
                      <span>{c.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'changes' && (
          <div className="flex-1 overflow-auto p-4">
            <div className="mb-4">
              <div className="text-sm text-green-400 mb-2 flex items-center gap-2"><Icons.Check size={14} /> Staged ({STAGED.length})</div>
              {STAGED.map((f, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-300"><Icons.File size={14} className="text-zinc-500" /> {f}</div>
              ))}
            </div>
            <div className="mb-4">
              <div className="text-sm text-yellow-400 mb-2 flex items-center gap-2"><Icons.Minus size={14} /> Unstaged ({UNSTAGED.length})</div>
              {UNSTAGED.map((f, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-300"><Icons.File size={14} className="text-zinc-500" /> {f}</div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={commitMsg} onChange={e => setCommitMsg(e.target.value)} placeholder="Commit message" className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm" />
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600">Commit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
