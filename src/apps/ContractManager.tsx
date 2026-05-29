import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

interface Contract {
  id: string;
  name: string;
  address: string;
  network: string;
  type: string;
  deployedAt: string;
  abi: any[];
}

const MOCK_CONTRACTS: Contract[] = [
  {
    id: '1', name: 'MyToken', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    network: 'Ethereum', type: 'ERC-20', deployedAt: '2026-05-15',
    abi: [
      { name: 'totalSupply', type: 'function', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
      { name: 'balanceOf', type: 'function', inputs: [{ name: 'account', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
      { name: 'transfer', type: 'function', inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ type: 'bool' }], stateMutability: 'nonpayable' },
      { name: 'mint', type: 'function', inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
    ]
  },
  {
    id: '2', name: 'NFTCollection', address: '0x1234567890abcdef1234567890abcdef12345678',
    network: 'BSC', type: 'ERC-721', deployedAt: '2026-05-20',
    abi: [
      { name: 'mint', type: 'function', inputs: [{ name: 'to', type: 'address' }, { name: 'uri', type: 'string' }], outputs: [{ type: 'uint256' }], stateMutability: 'nonpayable' },
      { name: 'ownerOf', type: 'function', inputs: [{ name: 'tokenId', type: 'uint256' }], outputs: [{ type: 'address' }], stateMutability: 'view' },
      { name: 'tokenURI', type: 'function', inputs: [{ name: 'tokenId', type: 'uint256' }], outputs: [{ type: 'string' }], stateMutability: 'view' },
    ]
  },
  {
    id: '3', name: 'StakingPool', address: '0xabcdef1234567890abcdef1234567890abcdef12',
    network: 'Tron', type: 'Staking', deployedAt: '2026-05-22',
    abi: [
      { name: 'stake', type: 'function', inputs: [{ name: 'amount', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
      { name: 'withdraw', type: 'function', inputs: [{ name: 'amount', type: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
      { name: 'getReward', type: 'function', inputs: [], outputs: [], stateMutability: 'nonpayable' },
      { name: 'calculateReward', type: 'function', inputs: [{ name: 'account', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    ]
  },
  {
    id: '4', name: 'PaymentSplitter', address: '0x9876543210fedcba9876543210fedcba98765432',
    network: 'Ethereum', type: 'Utility', deployedAt: '2026-05-25',
    abi: [
      { name: 'release', type: 'function', inputs: [{ name: 'account', type: 'address' }], outputs: [], stateMutability: 'nonpayable' },
      { name: 'shares', type: 'function', inputs: [{ name: 'account', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
    ]
  },
];

export default function ContractManager() {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [activeTab, setActiveTab] = useState<'functions' | 'read' | 'write'>('functions');
  const [readResults, setReadResults] = useState<Record<string, string>>({});
  const [writeInputs, setWriteInputs] = useState<Record<string, Record<string, string>>>({});
  const addNotification = useOSStore(s => s.addNotification);

  const handleRead = (funcName: string) => {
    const results: Record<string, string> = {
      'totalSupply': '1000000000000000000000000',
      'balanceOf': '50000000000000000000000',
      'ownerOf': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      'tokenURI': 'https://api.example.com/metadata/1',
      'shares': '2500',
      'calculateReward': '1250000000000000000',
    };
    setReadResults({ ...readResults, [funcName]: results[funcName] || '0' });
  };

  const handleWrite = (funcName: string) => {
    addNotification({
      title: 'Transaction Sent',
      message: `Called ${funcName} on ${selectedContract?.name}`,
      type: 'success'
    });
  };

  if (!selectedContract) {
    return (
      <div className="w-full h-full bg-zinc-900 text-zinc-200 p-6 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Deployed Contracts</h2>
        <div className="space-y-2">
          {MOCK_CONTRACTS.map(contract => (
            <button
              key={contract.id}
              onClick={() => setSelectedContract(contract)}
              className="w-full flex items-center justify-between p-4 bg-zinc-800 rounded-xl hover:bg-zinc-700/50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Icons.FileCode size={18} className="text-blue-400" />
                </div>
                <div>
                  <div className="font-medium">{contract.name}</div>
                  <div className="text-xs text-zinc-500 font-mono">{contract.address}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-zinc-700 rounded text-xs">{contract.type}</span>
                <span className={`px-2 py-1 rounded text-xs ${contract.network === 'Ethereum' ? 'bg-blue-500/20 text-blue-400' : contract.network === 'BSC' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                  {contract.network}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const readFunctions = selectedContract.abi.filter(f => f.stateMutability === 'view' || f.stateMutability === 'pure');
  const writeFunctions = selectedContract.abi.filter(f => f.stateMutability === 'nonpayable' || f.stateMutability === 'payable');

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-700/50">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelectedContract(null)} className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400">
            <Icons.ArrowLeft size={18} />
          </button>
          <div>
            <div className="font-medium">{selectedContract.name}</div>
            <div className="text-xs text-zinc-500 font-mono">{selectedContract.address}</div>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs ${selectedContract.network === 'Ethereum' ? 'bg-blue-500/20 text-blue-400' : selectedContract.network === 'BSC' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
          {selectedContract.network}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-700/50">
        {['read', 'write'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {tab === 'read' ? `Read (${readFunctions.length})` : `Write (${writeFunctions.length})`}
          </button>
        ))}
      </div>

      {/* Functions */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {activeTab === 'read' && readFunctions.map((func, i) => (
          <div key={i} className="bg-zinc-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-blue-400">{func.name}</div>
              <button
                onClick={() => handleRead(func.name)}
                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30"
              >
                Query
              </button>
            </div>
            {func.inputs.length > 0 && (
              <div className="space-y-1 mb-2">
                {func.inputs.map((input: any, j: number) => (
                  <input
                    key={j}
                    placeholder={`${input.name} (${input.type})`}
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded px-3 py-1.5 text-sm"
                  />
                ))}
              </div>
            )}
            {readResults[func.name] && (
              <div className="mt-2 p-2 bg-zinc-900 rounded text-sm font-mono text-green-400">
                {readResults[func.name]}
              </div>
            )}
          </div>
        ))}

        {activeTab === 'write' && writeFunctions.map((func, i) => (
          <div key={i} className="bg-zinc-800 rounded-xl p-4">
            <div className="font-medium text-green-400 mb-2">{func.name}</div>
            <div className="space-y-1 mb-3">
              {func.inputs.map((input: any, j: number) => (
                <input
                  key={j}
                  placeholder={`${input.name} (${input.type})`}
                  className="w-full bg-zinc-700/50 border border-zinc-600 rounded px-3 py-1.5 text-sm"
                />
              ))}
            </div>
            <button
              onClick={() => handleWrite(func.name)}
              className="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30"
            >
              Execute
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
