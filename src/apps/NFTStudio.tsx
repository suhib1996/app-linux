import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  collection: string;
  tokenId: string;
  owner: string;
  attributes: { trait: string; value: string }[];
}

const MOCK_NFTS: NFT[] = [
  { id: '1', name: 'Cyber Punk #001', description: 'A futuristic digital collectible', image: 'bg-gradient-to-br from-purple-600 to-blue-600', collection: 'Cyber Punks', tokenId: '1', owner: '0x742d...0bEb', attributes: [{ trait: 'Rarity', value: 'Legendary' }, { trait: 'Background', value: 'Neon City' }, { trait: 'Eyes', value: 'Laser' }] },
  { id: '2', name: 'Digital Dragon #042', description: 'Mythical creature NFT', image: 'bg-gradient-to-br from-red-600 to-orange-600', collection: 'Mythical Beasts', tokenId: '42', owner: '0x742d...0bEb', attributes: [{ trait: 'Rarity', value: 'Epic' }, { trait: 'Element', value: 'Fire' }, { trait: 'Wings', value: 'Phoenix' }] },
  { id: '3', name: 'Space Explorer #007', description: 'Journey through the cosmos', image: 'bg-gradient-to-br from-indigo-600 to-cyan-600', collection: 'Cosmic Voyagers', tokenId: '7', owner: '0x742d...0bEb', attributes: [{ trait: 'Rarity', value: 'Rare' }, { trait: 'Suit', value: 'Astro' }, { trait: 'Helmet', value: 'Visor' }] },
  { id: '4', name: 'Pixel Warrior #099', description: '8-bit hero on the blockchain', image: 'bg-gradient-to-br from-green-600 to-emerald-600', collection: 'Pixel Heroes', tokenId: '99', owner: '0x742d...0bEb', attributes: [{ trait: 'Rarity', value: 'Common' }, { trait: 'Weapon', value: 'Sword' }, { trait: 'Armor', value: 'Steel' }] },
  { id: '5', name: 'Abstract Mind #023', description: 'Generative art piece', image: 'bg-gradient-to-br from-pink-600 to-rose-600', collection: 'Abstract Minds', tokenId: '23', owner: '0x742d...0bEb', attributes: [{ trait: 'Rarity', value: 'Epic' }, { trait: 'Palette', value: 'Sunset' }, { trait: 'Style', value: 'Generative' }] },
  { id: '6', name: 'Golden Ape #001', description: 'The rarest ape in the collection', image: 'bg-gradient-to-br from-yellow-500 to-amber-600', collection: 'Elite Apes', tokenId: '1', owner: '0x742d...0bEb', attributes: [{ trait: 'Rarity', value: 'Legendary' }, { trait: 'Fur', value: 'Gold' }, { trait: 'Eyes', value: 'Diamond' }] },
];

export default function NFTStudio() {
  const [nfts, setNfts] = useState<NFT[]>(MOCK_NFTS);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [showMint, setShowMint] = useState(false);
  const [mintForm, setMintForm] = useState({ name: '', description: '', collection: '' });
  const [activeTab, setActiveTab] = useState<'gallery' | 'mint'>('gallery');
  const addNotification = useOSStore(s => s.addNotification);

  const handleMint = () => {
    if (!mintForm.name || !mintForm.collection) return;
    const gradients = [
      'bg-gradient-to-br from-purple-600 to-blue-600',
      'bg-gradient-to-br from-red-600 to-orange-600',
      'bg-gradient-to-br from-indigo-600 to-cyan-600',
      'bg-gradient-to-br from-green-600 to-emerald-600',
      'bg-gradient-to-br from-pink-600 to-rose-600',
      'bg-gradient-to-br from-yellow-500 to-amber-600',
    ];
    const newNFT: NFT = {
      id: Date.now().toString(),
      name: mintForm.name,
      description: mintForm.description,
      image: gradients[Math.floor(Math.random() * gradients.length)],
      collection: mintForm.collection,
      tokenId: String(Math.floor(Math.random() * 10000)),
      owner: '0x742d...0bEb',
      attributes: [
        { trait: 'Rarity', value: ['Common', 'Rare', 'Epic', 'Legendary'][Math.floor(Math.random() * 4)] },
        { trait: 'Minted', value: new Date().toLocaleDateString() },
        { trait: 'Chain', value: 'Ethereum' },
      ]
    };
    setNfts([newNFT, ...nfts]);
    setMintForm({ name: '', description: '', collection: '' });
    setShowMint(false);
    addNotification({ title: 'NFT Minted', message: `${newNFT.name} minted successfully`, type: 'success' });
  };

  if (selectedNFT) {
    return (
      <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
        <div className="p-6">
          <button onClick={() => setSelectedNFT(null)} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 mb-4">
            <Icons.ArrowLeft size={18} /> Back to Gallery
          </button>
          <div className="flex gap-6">
            <div className={`w-80 h-80 rounded-2xl ${selectedNFT.image} flex items-center justify-center`}>
              <Icons.Image size={64} className="text-white/50" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="text-sm text-zinc-500">{selectedNFT.collection}</div>
                <h2 className="text-2xl font-bold">{selectedNFT.name}</h2>
                <div className="text-sm text-zinc-500 mt-1">Owned by <span className="text-blue-400">{selectedNFT.owner}</span></div>
              </div>
              <p className="text-zinc-400">{selectedNFT.description}</p>
              <div className="text-sm text-zinc-500">Token ID: <span className="text-zinc-300 font-mono">#{selectedNFT.tokenId}</span></div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Attributes</div>
                <div className="flex gap-2">
                  {selectedNFT.attributes.map((attr, i) => (
                    <div key={i} className="bg-zinc-800 rounded-lg px-3 py-2 text-center">
                      <div className="text-xs text-zinc-500">{attr.trait}</div>
                      <div className="text-sm font-medium">{attr.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Transfer</button>
                <button className="px-4 py-2 bg-zinc-700 text-zinc-200 rounded-lg hover:bg-zinc-600">List for Sale</button>
                <button className="px-4 py-2 bg-zinc-700 text-zinc-200 rounded-lg hover:bg-zinc-600">Burn</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-700/50">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`text-sm font-medium ${activeTab === 'gallery' ? 'text-blue-400' : 'text-zinc-500'}`}
          >
            My NFTs ({nfts.length})
          </button>
          <button
            onClick={() => setActiveTab('mint')}
            className={`text-sm font-medium ${activeTab === 'mint' ? 'text-blue-400' : 'text-zinc-500'}`}
          >
            Mint New
          </button>
        </div>
      </div>

      {/* Gallery */}
      {activeTab === 'gallery' && (
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-3 gap-4">
            {nfts.map(nft => (
              <button
                key={nft.id}
                onClick={() => setSelectedNFT(nft)}
                className="bg-zinc-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500/50 transition-all text-left"
              >
                <div className={`h-40 ${nft.image} flex items-center justify-center`}>
                  <Icons.Image size={40} className="text-white/50" />
                </div>
                <div className="p-3">
                  <div className="text-xs text-zinc-500">{nft.collection}</div>
                  <div className="font-medium text-sm">{nft.name}</div>
                  <div className="text-xs text-zinc-500 font-mono mt-1">#{nft.tokenId}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mint Form */}
      {activeTab === 'mint' && (
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-lg space-y-4">
            <div>
              <label className="text-sm text-zinc-500">NFT Name</label>
              <input
                type="text"
                value={mintForm.name}
                onChange={e => setMintForm({ ...mintForm, name: e.target.value })}
                placeholder="Enter NFT name"
                className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm text-zinc-500">Description</label>
              <textarea
                value={mintForm.description}
                onChange={e => setMintForm({ ...mintForm, description: e.target.value })}
                placeholder="Describe your NFT"
                className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 h-24 resize-none"
              />
            </div>
            <div>
              <label className="text-sm text-zinc-500">Collection</label>
              <input
                type="text"
                value={mintForm.collection}
                onChange={e => setMintForm({ ...mintForm, collection: e.target.value })}
                placeholder="Collection name"
                className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm text-zinc-500">Network</label>
              <select className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2">
                <option>Ethereum</option>
                <option>BSC</option>
                <option>Tron</option>
              </select>
            </div>
            <button
              onClick={handleMint}
              className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600"
            >
              Mint NFT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
