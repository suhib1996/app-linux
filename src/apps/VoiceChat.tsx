import { useState } from 'react';
import * as Icons from 'lucide-react';

export default function VoiceChat() {
  const [recording, setRecording] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);

  const toggleRecording = () => {
    if (recording) {
      setRecording(false);
      setMessages(prev => [...prev, { role: 'user', text: 'How do I deploy a smart contract on BSC?' }, { role: 'ai', text: 'To deploy a smart contract on BSC, you need to: 1. Connect to BSC network (chainId: 56), 2. Compile your contract with Hardhat or Remix, 3. Use a deployer script with your private key, 4. Pay gas fees in BNB.' }]);
    } else {
      setRecording(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center mt-20">
            <Icons.Mic size={48} className="text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-500">Press and hold the microphone to speak</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
            {m.role === 'ai' && <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0"><Icons.Bot size={16} className="text-white" /></div>}
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-200'}`}>{m.text}</div>
          </div>
        ))}
      </div>
      <div className="p-6 flex justify-center">
        <button onClick={toggleRecording} className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${recording ? 'bg-red-500 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'}`}>
          {recording ? <Icons.Square size={24} className="text-white" /> : <Icons.Mic size={24} className="text-white" />}
        </button>
      </div>
    </div>
  );
}
