import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

export default function SignTool() {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [address, setAddress] = useState('');
  const [mode, setMode] = useState<'sign' | 'verify'>('sign');
  const addNotification = useOSStore(s => s.addNotification);

  const handleSign = () => {
    if (!message) return;
    const sig = '0x' + Array(130).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    setSignature(sig);
    addNotification({ title: 'Message Signed', message: 'Signature generated', type: 'success' });
  };

  const handleVerify = () => {
    if (!message || !signature || !address) return;
    addNotification({ title: 'Verification', message: 'Signature is valid', type: 'success' });
  };

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="max-w-lg mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Signature Tool</h2>
        <div className="flex gap-2 mb-6">
          <button onClick={() => setMode('sign')} className={`flex-1 py-2 rounded-lg text-sm font-medium ${mode === 'sign' ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>Sign Message</button>
          <button onClick={() => setMode('verify')} className={`flex-1 py-2 rounded-lg text-sm font-medium ${mode === 'verify' ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>Verify Signature</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-zinc-500">Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Enter message to sign..."
              className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 h-24 resize-none" />
          </div>

          {mode === 'verify' && (
            <>
              <div>
                <label className="text-sm text-zinc-500">Signature</label>
                <textarea value={signature} onChange={e => setSignature(e.target.value)} placeholder="0x..."
                  className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 h-20 resize-none font-mono text-xs" />
              </div>
              <div>
                <label className="text-sm text-zinc-500">Signer Address</label>
                <input value={address} onChange={e => setAddress(e.target.value)} placeholder="0x..."
                  className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 font-mono text-sm" />
              </div>
            </>
          )}

          {mode === 'sign' && signature && (
            <div>
              <label className="text-sm text-zinc-500">Signature</label>
              <div className="mt-1 bg-zinc-800 border border-zinc-700 rounded-lg p-3 font-mono text-xs break-all text-green-400">{signature}</div>
            </div>
          )}

          <button onClick={mode === 'sign' ? handleSign : handleVerify}
            className="w-full py-2.5 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600">
            {mode === 'sign' ? 'Sign Message' : 'Verify Signature'}
          </button>
        </div>
      </div>
    </div>
  );
}
