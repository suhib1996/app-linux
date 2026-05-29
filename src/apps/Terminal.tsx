import { useState, useRef, useEffect, useCallback } from 'react';
import { useFileSystem } from '@/store/fileSystem';
import { useOSStore } from '@/store/osStore';
import { appRegistry } from '@/store/appRegistry';
import type { TransactionRecord } from '@/types';

interface TerminalProps {
  windowId: string;
}

interface CommandHistory {
  input: string;
  output: string[];
}

const COMMANDS: Record<string, (args: string[], fs: any, os: any) => string[]> = {
  help: () => [
    'Available commands:',
    '  ls [path]          List directory contents',
    '  cd <path>          Change directory',
    '  pwd                Print working directory',
    '  cat <file>         Display file contents',
    '  mkdir <dir>        Create directory',
    '  rm <file>          Remove file or directory',
    '  touch <file>       Create empty file',
    '  clear              Clear terminal',
    '  echo <text>        Print text',
    '  whoami             Display current user',
    '  date               Display current date/time',
    '  neofetch           Display system info',
    '  write <file>       Write content to file',
    '  wallet             Show wallet balance',
    '  send <to> <amt>    Send crypto',
    '  txlist             List transactions',
    '  compile <file>     Compile Solidity contract',
    '  deploy <file>      Deploy smart contract',
    '  apps               List installed apps',
    '  open <app>         Open application',
    '  reboot             Restart system',
    '  exit               Close terminal',
    ''
  ],

  ls: (args, fs) => {
    const path = args[0] || fs.currentPath;
    const items = fs.readdir(path);
    if (!items) return ['ls: cannot access: No such directory'];
    return items.map((item: any) => {
      const prefix = item.type === 'directory' ? 'd' : '-';
      const size = item.size || 0;
      const date = new Date(item.modifiedAt).toLocaleDateString();
      const name = item.type === 'directory' ? `\x1b[34m${item.name}/\x1b[0m` : item.name;
      return `${prefix}rw-r--r-- ${String(size).padStart(8)} ${date} ${name}`;
    });
  },

  cd: (args, fs) => {
    if (!args[0]) {
      fs.navigateTo('/home/user');
      return [];
    }
    let path = args[0];
    if (path.startsWith('/')) {
      if (fs.exists(path)) {
        fs.navigateTo(path);
        return [];
      }
      return [`cd: ${path}: No such directory`];
    }
    const current = fs.currentPath;
    const newPath = current === '/' ? `/${path}` : `${current}/${path}`;
    const normalized = newPath.replace(/\/+/g, '/');
    if (fs.exists(normalized)) {
      fs.navigateTo(normalized);
      return [];
    }
    return [`cd: ${path}: No such directory`];
  },

  pwd: (_args, fs) => [fs.currentPath],

  cat: (args, fs) => {
    if (!args[0]) return ['cat: missing file operand'];
    const path = args[0].startsWith('/') ? args[0] : `${fs.currentPath}/${args[0]}`;
    const content = fs.readFile(path);
    if (content === null) return [`cat: ${args[0]}: No such file`];
    return content.split('\n');
  },

  mkdir: (args, fs) => {
    if (!args[0]) return ['mkdir: missing directory name'];
    const path = args[0].startsWith('/') ? args[0] : `${fs.currentPath}/${args[0]}`;
    return fs.mkdir(path) ? [] : [`mkdir: cannot create ${args[0]}`];
  },

  rm: (args, fs) => {
    if (!args[0]) return ['rm: missing operand'];
    const path = args[0].startsWith('/') ? args[0] : `${fs.currentPath}/${args[0]}`;
    return fs.rm(path) ? [] : [`rm: cannot remove ${args[0]}`];
  },

  touch: (args, fs) => {
    if (!args[0]) return ['touch: missing file operand'];
    const path = args[0].startsWith('/') ? args[0] : `${fs.currentPath}/${args[0]}`;
    fs.writeFile(path, '');
    return [];
  },

  echo: (args) => [args.join(' ')],

  whoami: () => ['user'],

  date: () => [new Date().toString()],

  neofetch: () => [
    '    ___    __  _______  ____  _____ ',
    '   /   |  /  |/  / __ \/ __ \/ ___/',
    '  / /| | / /|_/ / / / / /_/ /__ \\ ',
    ' / ___ |/ /  / / /_/ / _, _/__/ / ',
    '/_/  |_/_/  /_/_____/_/ |_|/____/  ',
    '',
    '\x1b[32mOS:\x1b[0m NexusOS v2.0',
    '\x1b[32mKernel:\x1b[0m web-os-kernel 5.15.0',
    '\x1b[32mUptime:\x1b[0m 2h 15m',
    '\x1b[32mShell:\x1b[0m nexus-shell 1.0',
    '\x1b[32mResolution:\x1b[0m 1920x1080',
    '\x1b[32mDE:\x1b[0m NexusWM',
    '\x1b[32mWM:\x1b[0m React-RND',
    '\x1b[32mTheme:\x1b[0m Dark (nexus-dark)',
    '\x1b[32mIcons:\x1b[0m Lucide',
    '\x1b[32mTerminal:\x1b[0m xterm-nexus',
    '\x1b[32mCPU:\x1b[0m QuantumCore i9-14900K',
    '\x1b[32mMemory:\x1b[0m 8GB / 64GB',
    ''
  ],

  clear: () => [],

  write: (args, fs) => {
    if (!args[0]) return ['write: missing file operand'];
    const path = args[0].startsWith('/') ? args[0] : `${fs.currentPath}/${args[0]}`;
    fs.writeFile(path, args.slice(1).join(' '));
    return [];
  },

  wallet: (_args, fs) => {
    const walletData = fs.readFile('/home/user/.wallet/wallet.json');
    if (!walletData) return ['No wallet configured'];
    try {
      const wallet = JSON.parse(walletData);
      return [
        `Address: ${wallet.address}`,
        '',
        'Balances:',
        ...Object.entries(wallet.balances).map(([k, v]) => `  ${k}: ${Number(v).toLocaleString()}`)
      ];
    } catch {
      return ['Error reading wallet'];
    }
  },

  send: (args, fs) => {
    if (args.length < 2) return ['Usage: send <to_address> <amount>'];
    const walletData = fs.readFile('/home/user/.wallet/wallet.json');
    if (!walletData) return ['No wallet configured'];
    try {
      const wallet = JSON.parse(walletData);
      const tx: TransactionRecord = {
        id: `tx-${Date.now()}`,
        type: 'send',
        from: wallet.address,
        to: args[0],
        amount: args[1],
        token: args[2] || 'ETH',
        timestamp: Date.now(),
        status: 'confirmed',
        hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
        network: 'ethereum'
      };
      wallet.transactions = wallet.transactions || [];
      wallet.transactions.unshift(tx);
      fs.writeFile('/home/user/.wallet/wallet.json', JSON.stringify(wallet, null, 2));
      return [
        `Transaction sent!`,
        `To: ${args[0]}`,
        `Amount: ${args[1]} ${args[2] || 'ETH'}`,
        `Hash: ${tx.hash}`
      ];
    } catch {
      return ['Error processing transaction'];
    }
  },

  txlist: (_args, fs) => {
    const walletData = fs.readFile('/home/user/.wallet/wallet.json');
    if (!walletData) return ['No wallet configured'];
    try {
      const wallet = JSON.parse(walletData);
      const txs = wallet.transactions || [];
      if (txs.length === 0) return ['No transactions found'];
      return txs.slice(0, 10).map((tx: TransactionRecord) =>
        `${tx.type.toUpperCase()} ${tx.amount} ${tx.token} ${tx.status === 'confirmed' ? '\x1b[32mconfirmed\x1b[0m' : '\x1b[33mpending\x1b[0m'}`
      );
    } catch {
      return ['Error reading transactions'];
    }
  },

  compile: (args) => {
    if (!args[0]) return ['Usage: compile <file.sol>'];
    return [
      `Compiling ${args[0]}...`,
      'Compiling with Solidity 0.8.19',
      'Generating bytecode...',
      '\x1b[32mCompilation successful!\x1b[0m',
      '  Bytecode: 0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('').substring(0, 64),
      '  ABI: Generated (32 functions)',
      ''
    ];
  },

  deploy: (args) => {
    if (!args[0]) return ['Usage: deploy <file.sol>'];
    return [
      `Deploying ${args[0]}...`,
      'Estimating gas...',
      'Gas estimate: 1,245,000',
      'Sending transaction...',
      '\x1b[32mContract deployed!\x1b[0m',
      `  Address: 0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      `  Tx Hash: 0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      `  Gas used: 1,187,432`,
      ''
    ];
  },

  apps: () => {
    const allApps = Object.entries(appRegistry);
    return [
      `Installed applications (${allApps.length}):`,
      ...allApps.map(([id, app]: [string, any]) => `  ${id.padEnd(20)} - ${app.name}`),
      ''
    ];
  },

  open: (args, _fs, os) => {
    if (!args[0]) return ['Usage: open <app-id>'];
    const app = appRegistry[args[0]];
    if (!app) return [`Unknown app: ${args[0]}`];
    os.openWindow(args[0], app.name);
    return [`Opening ${app.name}...`];
  },

  reboot: () => {
    setTimeout(() => window.location.reload(), 500);
    return ['Rebooting system...'];
  },

  exit: (_args, _fs, os) => {
    const terminalWindow = useOSStore.getState().windows.find((w: any) => w.appId === 'terminal');
    if (terminalWindow) {
      setTimeout(() => os.closeWindow(terminalWindow.id), 100);
    }
    return ['Goodbye!'];
  },
};

export default function Terminal({ windowId }: TerminalProps) {
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fs = useFileSystem();
  const os = useOSStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output: string[];

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    const handler = COMMANDS[command];
    if (handler) {
      try {
        output = handler(args, fs, os);
      } catch (e) {
        output = [`Error: ${e}`];
      }
    } else {
      output = [`${command}: command not found. Type 'help' for available commands.`];
    }

    setHistory(prev => [...prev, { input: trimmed, output }]);
  }, [fs, os]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commands = history.filter(h => h.input);
      if (historyIndex < commands.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commands[commands.length - 1 - newIndex]?.input || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const commands = history.filter(h => h.input);
        setInput(commands[commands.length - 1 - newIndex]?.input || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const parseAnsi = (text: string) => {
    const parts = text.split(/(\x1b\[\d+m)/g);
    let currentColor = 'text-zinc-300';
    return parts.map((part, i) => {
      if (part === '\x1b[32m') { currentColor = 'text-green-400'; return null; }
      if (part === '\x1b[34m') { currentColor = 'text-blue-400'; return null; }
      if (part === '\x1b[33m') { currentColor = 'text-yellow-400'; return null; }
      if (part === '\x1b[0m') { currentColor = 'text-zinc-300'; return null; }
      return <span key={i} className={currentColor}>{part}</span>;
    }).filter(Boolean);
  };

  return (
    <div className="w-full h-full bg-zinc-950 text-zinc-300 font-mono text-sm flex flex-col" onClick={() => inputRef.current?.focus()}>
      <div ref={scrollRef} className="flex-1 overflow-auto p-3 space-y-1">
        <div className="text-green-400 mb-2">NexusOS Terminal v2.0 - Type &apos;help&apos; for commands</div>
        {history.map((entry, i) => (
          <div key={i} className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-green-400">user@nexus</span>
              <span className="text-zinc-500">:</span>
              <span className="text-blue-400">{fs.currentPath}</span>
              <span className="text-zinc-500">$</span>
              <span>{entry.input}</span>
            </div>
            {entry.output.map((line, j) => (
              <div key={j} className="pl-0">
                {parseAnsi(line)}
              </div>
            ))}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-green-400">user@nexus</span>
          <span className="text-zinc-500">:</span>
          <span className="text-blue-400">{fs.currentPath}</span>
          <span className="text-zinc-500">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-zinc-300 min-w-0"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
