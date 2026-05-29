import { useState, useEffect } from 'react';
import { useOSStore } from '@/store/osStore';

const BOOT_LINES = [
  'BIOS Date: 05/29/26 09:15:14 Ver 2.4.1',
  'CPU: QuantumCore i9-14900K @ 6.0GHz',
  'Memory Test: 65536MB OK',
  'Detecting primary master ... NEXUS-SSD-2TB',
  'Detecting primary slave ... NEXUS-HDD-4TB',
  'Detecting USB devices ... 3 devices found',
  '',
  'Loading kernel ...',
  'Mounting root filesystem ... OK',
  'Loading drivers ...',
  '  [OK] Loaded network driver (ethernet)',
  '  [OK] Loaded graphics driver (nvidia-drm)',
  '  [OK] Loaded audio driver (alsa)',
  '  [OK] Loaded USB subsystem',
  '  [OK] Loaded blockchain modules (web3, tronweb)',
  '  [OK] Loaded AI inference engine (onnx)',
  '  [OK] Loaded payment processing modules',
  '  [OK] Loaded virtual filesystem',
  '',
  'Initializing system services ...',
  '  [OK] Started Window Manager',
  '  [OK] Started File System Daemon',
  '  [OK] Started Network Manager',
  '  [OK] Started Crypto Wallet Service',
  '  [OK] Started AI Agent Host',
  '  [OK] Started Payment Gateway',
  '  [OK] Started DevServer Manager',
  '',
  'NexusOS v2.0 loaded successfully.',
  '',
  'Press ENTER to continue...'
];

export default function BootSequence() {
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<'boot' | 'login'>('boot');
  const [password, setPassword] = useState('');
  const setBootComplete = useOSStore(s => s.setBootComplete);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < BOOT_LINES.length) {
        setLines(prev => [...prev, BOOT_LINES[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase('login'), 500);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setBootComplete();
    }
  };

  if (phase === 'login') {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
        <div className="text-center space-y-6">
          <div className="text-6xl font-bold text-green-500 mb-2">N</div>
          <h1 className="text-2xl text-zinc-300 font-light tracking-widest">NEXUS OS</h1>
          <div className="w-80 mx-auto">
            <div className="text-zinc-500 text-sm mb-2 text-left">user@nexus-os</div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleLogin}
              placeholder="Enter password"
              className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-2 text-zinc-300 focus:outline-none focus:border-green-500"
              autoFocus
            />
            <div className="text-zinc-600 text-xs mt-2 text-left">Press ENTER to login</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-mono text-sm p-8 overflow-hidden z-[9999]">
      <div className="space-y-0.5">
        {lines.map((line, i) => (
          <div key={i} className={line.startsWith('  [OK]') ? 'text-green-400' : line.includes('...') ? 'text-zinc-400' : ''}>
            {line}
          </div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
    </div>
  );
}
