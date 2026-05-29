import { useState } from 'react';
import * as Icons from 'lucide-react';

const EXAMPLES = [
  { q: 'ERC-20 token with minting', code: `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.19;\n\nimport "@openzeppelin/contracts/token/ERC20/ERC20.sol";\nimport "@openzeppelin/contracts/access/Ownable.sol";\n\ncontract MyToken is ERC20, Ownable {\n    constructor() ERC20("MyToken", "MTK") {}\n    function mint(address to, uint256 amount) public onlyOwner {\n        _mint(to, amount);\n    }\n}` },
  { q: 'React Web3 connection', code: `import { ethers } from 'ethers';\n\nasync function connectWallet() {\n  if (window.ethereum) {\n    const provider = new ethers.BrowserProvider(window.ethereum);\n    const signer = await provider.getSigner();\n    const address = await signer.getAddress();\n    return address;\n  }\n}` },
  { q: 'TronWeb transaction', code: `const tronWeb = new TronWeb({\n  fullHost: 'https://api.trongrid.io',\n  privateKey: 'YOUR_KEY'\n});\n\nasync function sendTRX(to, amount) {\n  const tx = await tronWeb.trx.sendTransaction(to, amount);\n  return tx.txid;\n}` },
  { q: 'BSC staking contract', code: `contract StakingPool {\n    mapping(address => uint256) public stakes;\n    uint256 public totalStaked;\n    \n    function stake() external payable {\n        stakes[msg.sender] += msg.value;\n        totalStaked += msg.value;\n    }\n    \n    function unstake(uint256 amount) external {\n        require(stakes[msg.sender] >= amount);\n        stakes[msg.sender] -= amount;\n        totalStaked -= amount;\n        payable(msg.sender).transfer(amount);\n    }\n}` },
];

export default function AICode() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ q: string; code: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const match = EXAMPLES.find(e => e.q.toLowerCase().includes(query.toLowerCase()) || query.toLowerCase().includes(e.q.toLowerCase()));
      setResult(match || EXAMPLES[0]);
    }, 1200);
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      <div className="p-4 border-b border-zinc-700/50">
        <h2 className="text-lg font-semibold mb-3">AI Code Assistant</h2>
        <div className="flex gap-2">
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && generate()} placeholder="Describe what you need..." className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm" />
          <button onClick={generate} disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 disabled:opacity-50">{loading ? 'Generating...' : 'Generate'}</button>
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {EXAMPLES.map(e => (
            <button key={e.q} onClick={() => { setQuery(e.q); }} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400 hover:text-zinc-200">{e.q}</button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {result && (
          <div className="bg-zinc-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-700/50">
              <span className="text-xs text-zinc-400">Generated Code</span>
              <button onClick={() => navigator.clipboard.writeText(result.code)} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"><Icons.Copy size={12} /> Copy</button>
            </div>
            <pre className="p-4 font-mono text-sm text-green-400 overflow-auto">{result.code}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
