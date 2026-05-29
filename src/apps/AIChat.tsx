import { useState, useRef, useEffect } from 'react';
import * as Icons from 'lucide-react';

interface Message {
  id: string; role: 'user' | 'assistant'; content: string; timestamp: number;
}

const RESPONSES: Record<string, string> = {
  hello: "Hello! How can I assist you today? I can help with coding, blockchain development, smart contracts, and more.",
  help: "I can help you with:\n- Smart contract development (Solidity, Vyper)\n- Web3 integration\n- Blockchain architecture\n- DeFi protocol design\n- AI model deployment\n- Code debugging\n- Technical documentation",
  solidity: "Solidity is a statically-typed programming language for developing smart contracts on Ethereum. Key concepts include:\n\n- Data types: uint, int, address, bool, bytes, string\n- Functions: view, pure, payable\n- Modifiers: onlyOwner, reentrancy guards\n- Events for logging\n- Error handling with require/revert\n\nWould you like me to explain any specific concept?",
  tron: "Tron is a high-throughput blockchain platform. Key features:\n\n- TRC-20 tokens (similar to ERC-20)\n- TRC-721 NFTs\n- 2000+ TPS\n- 3-second block time\n- Energy and Bandwidth resource model\n- TVM (Tron Virtual Machine) compatible with EVM",
  bsc: "Binance Smart Chain (BSC) is an EVM-compatible blockchain:\n\n- 3-second block time\n- Low transaction fees (~$0.05)\n- 21 validators (PoSA consensus)\n- BEP-20 token standard\n- Cross-chain bridges to Ethereum\n- PancakeSwap as primary DEX",
  defi: "DeFi (Decentralized Finance) protocols include:\n\n1. DEXs - Uniswap, PancakeSwap\n2. Lending - Aave, Venus\n3. Yield Farming - liquidity mining\n4. Stablecoins - USDT, USDC, BUSD\n5. Derivatives - dYdX, GMX\n6. Insurance - Nexus Mutual",
  code: "Here is an example of a simple ERC-20 token in Solidity:\n\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.19;\n\nimport \"@openzeppelin/contracts/token/ERC20/ERC20.sol\";\n\ncontract MyToken is ERC20 {\n    constructor(uint256 supply) ERC20(\"MyToken\", \"MTK\") {\n        _mint(msg.sender, supply);\n    }\n}",
};

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    const lower = input.toLowerCase();
    let response = "I'm not sure about that. I can help with blockchain development, smart contracts, DeFi, coding, and AI. What would you like to know?";
    for (const [key, val] of Object.entries(RESPONSES)) { if (lower.includes(key)) { response = val; break; } }

    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: Date.now() }]);
    }, 800 + Math.random() * 1000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center mt-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
              <Icons.Bot size={28} className="text-white" />
            </div>
            <h3 className="text-lg font-medium mb-2">Nexus AI Assistant</h3>
            <p className="text-sm text-zinc-500">Ask me about blockchain, coding, or anything else.</p>
          </div>
        )}
        {messages.map(m => (
          <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                <Icons.Bot size={16} className="text-white" />
              </div>
            )}
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-200'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
              <Icons.Bot size={16} className="text-white" />
            </div>
            <div className="bg-zinc-800 p-3 rounded-2xl"><div className="flex gap-1"><div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" /><div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} /><div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} /></div></div>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-zinc-700/50">
        <div className="flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Ask me anything..." className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
          <button onClick={sendMessage} className="p-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600"><Icons.Send size={18} /></button>
        </div>
      </div>
    </div>
  );
}
