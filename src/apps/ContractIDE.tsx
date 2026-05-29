import { useState } from 'react';
import { useFileSystem } from '@/store/fileSystem';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

const EXAMPLE_CONTRACTS = {
  'ERC20 Token': `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    uint8 private _decimals;
    
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals_,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _decimals = decimals_;
        _mint(msg.sender, initialSupply * 10 ** decimals_);
    }
    
    function decimals() public view override returns (uint8) {
        return _decimals;
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}`,
  'ERC721 NFT': `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 private _tokenIds;
    string private _baseTokenURI;
    
    mapping(uint256 => string) private _tokenURIs;
    
    constructor(string memory name, string memory symbol) 
        ERC721(name, symbol) {}
    
    function mint(address to, string memory uri) public returns (uint256) {
        _tokenIds++;
        uint256 newId = _tokenIds;
        _safeMint(to, newId);
        _tokenURIs[newId] = uri;
        return newId;
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }
}`,
  'Staking Pool': `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract StakingPool is ReentrancyGuard {
    IERC20 public stakingToken;
    uint256 public rewardRate = 100;
    uint256 public lastUpdateTime;
    
    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public rewards;
    
    uint256 private _totalStaked;
    
    constructor(address _stakingToken) {
        stakingToken = IERC20(_stakingToken);
    }
    
    function stake(uint256 amount) external nonReentrant {
        stakingToken.transferFrom(msg.sender, address(this), amount);
        stakedBalance[msg.sender] += amount;
        _totalStaked += amount;
    }
    
    function withdraw(uint256 amount) external nonReentrant {
        require(stakedBalance[msg.sender] >= amount);
        stakedBalance[msg.sender] -= amount;
        _totalStaked -= amount;
        stakingToken.transfer(msg.sender, amount);
    }
    
    function getReward() external nonReentrant {
        uint256 reward = calculateReward(msg.sender);
        rewards[msg.sender] = 0;
    }
    
    function calculateReward(address account) public view returns (uint256) {
        return stakedBalance[account] * rewardRate / 10000;
    }
}`,
  'Multi-Sig Wallet': `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MultiSigWallet {
    address[] public owners;
    uint public required;
    
    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint confirmations;
    }
    
    Transaction[] public transactions;
    mapping(uint => mapping(address => bool)) public confirmations;
    
    modifier onlyOwner() {
        bool isOwner = false;
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) isOwner = true;
        }
        require(isOwner, "Not owner");
        _;
    }
    
    constructor(address[] memory _owners, uint _required) {
        owners = _owners;
        required = _required;
    }
    
    function submitTransaction(address _to, uint _value, bytes memory _data) public onlyOwner {
        transactions.push(Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false,
            confirmations: 0
        }));
    }
    
    function confirmTransaction(uint _txIndex) public onlyOwner {
        require(!confirmations[_txIndex][msg.sender]);
        confirmations[_txIndex][msg.sender] = true;
        transactions[_txIndex].confirmations++;
    }
    
    function executeTransaction(uint _txIndex) public onlyOwner {
        Transaction storage txn = transactions[_txIndex];
        require(txn.confirmations >= required, "Not enough confirmations");
        require(!txn.executed);
        txn.executed = true;
        (bool success, ) = txn.to.call{value: txn.value}(txn.data);
        require(success, "Execution failed");
    }
    
    receive() external payable {}
}`
};

export default function ContractIDE({ windowId, filePath }: { windowId: string; filePath?: string }) {
  const fs = useFileSystem();
  const [code, setCode] = useState(EXAMPLE_CONTRACTS['ERC20 Token']);
  const [activeFile, setActiveFile] = useState('ERC20 Token');
  const [activeTab, setActiveTab] = useState<'editor' | 'compile' | 'deploy'>('editor');
  const [compileOutput, setCompileOutput] = useState('');
  const [deployOutput, setDeployOutput] = useState('');
  const [deployForm, setDeployForm] = useState({ network: 'ethereum', gasLimit: '3000000' });
  const addNotification = useOSStore(s => s.addNotification);

  const loadExample = (name: string) => {
    setCode(EXAMPLE_CONTRACTS[name as keyof typeof EXAMPLE_CONTRACTS]);
    setActiveFile(name);
    setCompileOutput('');
    setDeployOutput('');
  };

  const handleCompile = () => {
    setCompileOutput(`Compiling with Solidity 0.8.19...\n\nAnalyzing...\n${activeFile}.sol: OK\n\nGenerating bytecode and ABI...\n\nCompiled successfully!\n  Bytecode: 6080604052348015610010576000...\n  ABI: ${JSON.stringify([
    { "type": "constructor", "inputs": [{ "name": "name", "type": "string" }, { "name": "symbol", "type": "string" }, { "name": "decimals_", "type": "uint8" }, { "name": "initialSupply", "type": "uint256" }] },
    { "type": "function", "name": "mint", "inputs": [{ "name": "to", "type": "address" }, { "name": "amount", "type": "uint256" }], "outputs": [], "stateMutability": "nonpayable" },
    { "type": "function", "name": "burn", "inputs": [{ "name": "amount", "type": "uint256" }], "outputs": [], "stateMutability": "nonpayable" },
    { "type": "function", "name": "decimals", "inputs": [], "outputs": [{ "type": "uint8" }], "stateMutability": "view" }
  ], null, 2)}\n\nGas estimate: 1,245,000`);
    addNotification({ title: 'Compilation Complete', message: `${activeFile} compiled successfully`, type: 'success' });
  };

  const handleDeploy = () => {
    const hash = '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const address = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    setDeployOutput(`Deploying to ${deployForm.network}...\n\nSending transaction...\n  Hash: ${hash}\n  Gas limit: ${deployForm.gasLimit}\n\nWaiting for confirmation...\n\nTransaction confirmed!\n  Contract address: ${address}\n  Gas used: 1,187,432\n  Block: #${Math.floor(Math.random() * 10000000 + 18000000)}\n\nContract deployed successfully!`);
    addNotification({ title: 'Contract Deployed', message: `Deployed to ${address}`, type: 'success' });
  };

  return (
    <div className="w-full h-full flex bg-zinc-900 text-zinc-200">
      {/* Sidebar */}
      <div className="w-48 border-r border-zinc-700/50 p-3">
        <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2 px-2">Examples</div>
        {Object.keys(EXAMPLE_CONTRACTS).map(name => (
          <button
            key={name}
            onClick={() => loadExample(name)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${activeFile === name ? 'bg-blue-500/20 text-blue-400' : 'text-zinc-400 hover:bg-zinc-800'}`}
          >
            <Icons.FileCode size={14} />
            {name}.sol
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-zinc-700/50">
          {['editor', 'compile', 'deploy'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'editor' && (
          <>
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-700/30">
              <span className="text-sm text-zinc-400">{activeFile}.sol</span>
              <div className="flex gap-2">
                <button onClick={handleCompile} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-xs hover:bg-blue-500/30">
                  Compile
                </button>
                <button onClick={() => setActiveTab('deploy')} className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs hover:bg-green-500/30">
                  Deploy
                </button>
              </div>
            </div>
            <div className="flex-1 flex">
              <div className="w-10 bg-zinc-800/30 text-right pr-2 pt-4 text-xs text-zinc-600 select-none">
                {code.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                className="flex-1 bg-zinc-900 text-zinc-200 p-4 font-mono text-sm leading-5 resize-none outline-none"
                spellCheck={false}
              />
            </div>
          </>
        )}

        {activeTab === 'compile' && (
          <div className="flex-1 p-4 overflow-auto">
            {!compileOutput ? (
              <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                <Icons.Hammer size={48} className="mb-4 opacity-50" />
                <p>Click Compile to compile the contract</p>
                <button onClick={handleCompile} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Compile Now
                </button>
              </div>
            ) : (
              <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{compileOutput}</pre>
            )}
          </div>
        )}

        {activeTab === 'deploy' && (
          <div className="flex-1 p-4 overflow-auto">
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-zinc-500">Network</label>
                <select
                  value={deployForm.network}
                  onChange={e => setDeployForm({ ...deployForm, network: e.target.value })}
                  className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="ethereum">Ethereum Mainnet</option>
                  <option value="bsc">BSC Mainnet</option>
                  <option value="tron">Tron Mainnet</option>
                  <option value="goerli">Goerli Testnet</option>
                  <option value="tbsc">BSC Testnet</option>
                  <option value="nile">Tron Nile</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-zinc-500">Gas Limit</label>
                <input
                  type="text"
                  value={deployForm.gasLimit}
                  onChange={e => setDeployForm({ ...deployForm, gasLimit: e.target.value })}
                  className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <button
                onClick={handleDeploy}
                className="w-full py-2.5 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                Deploy Contract
              </button>
            </div>
            {deployOutput && (
              <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap bg-zinc-800/50 p-4 rounded-xl">{deployOutput}</pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
