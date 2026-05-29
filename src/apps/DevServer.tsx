import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

export default function DevServer() {
  const [running, setRunning] = useState(false);
  const [port, setPort] = useState('3000');
  const [folder, setFolder] = useState('/home/user/Projects/my-app');
  const [logs, setLogs] = useState<string[]>([]);
  const addNotification = useOSStore(s => s.addNotification);

  const startServer = () => {
    setRunning(true);
    setLogs([
      '> nexus-dev-server@1.0.0 start',
      `> Server starting on port ${port}...`,
      `> Serving files from ${folder}`,
      '> Ready on http://localhost:' + port,
      '> Compiling...',
      '> Compiled successfully in 1245ms',
      '> Hot reload enabled',
    ]);
    addNotification({ title: 'DevServer', message: `Server started on port ${port}`, type: 'success' });
  };

  const stopServer = () => {
    setRunning(false);
    setLogs([...logs, '> Server stopped']);
    addNotification({ title: 'DevServer', message: 'Server stopped', type: 'info' });
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      <div className="p-4 border-b border-zinc-700/50">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-3 h-3 rounded-full ${running ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
          <span className="font-medium">{running ? 'Running' : 'Stopped'}</span>
        </div>
        <div className="flex gap-3">
          <input value={folder} onChange={e => setFolder(e.target.value)} placeholder="Project folder" className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm" />
          <input value={port} onChange={e => setPort(e.target.value)} placeholder="Port" className="w-24 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-center" />
          {running ? (
            <button onClick={stopServer} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"><Icons.Square size={14} /> Stop</button>
          ) : (
            <button onClick={startServer} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"><Icons.Play size={14} /> Start</button>
          )}
        </div>
      </div>
      {running && (
        <div className="p-4 border-b border-zinc-700/50">
          <div className="bg-zinc-800 rounded-xl p-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="text-xs text-zinc-500">Local</div>
              <div className="text-sm font-mono text-blue-400">http://localhost:{port}</div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-zinc-500">Network</div>
              <div className="text-sm font-mono text-blue-400">http://192.168.1.105:{port}</div>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {logs.map((log, i) => (
          <div key={i} className={`${log.includes('success') ? 'text-green-400' : log.includes('Error') ? 'text-red-400' : 'text-zinc-300'}`}>{log}</div>
        ))}
      </div>
    </div>
  );
}
