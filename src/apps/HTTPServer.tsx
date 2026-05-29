import { useState } from 'react';
import * as Icons from 'lucide-react';

const ACCESS_LOGS = [
  { time: '2026-05-29 14:32:15', ip: '192.168.1.105', method: 'GET', path: '/api/v1/users', status: 200, size: 1245 },
  { time: '2026-05-29 14:32:14', ip: '192.168.1.106', method: 'POST', path: '/api/v1/auth', status: 200, size: 356 },
  { time: '2026-05-29 14:32:12', ip: '192.168.1.107', method: 'GET', path: '/static/app.js', status: 200, size: 45234 },
  { time: '2026-05-29 14:32:10', ip: '192.168.1.108', method: 'GET', path: '/api/v1/data', status: 404, size: 45 },
  { time: '2026-05-29 14:32:08', ip: '192.168.1.109', method: 'PUT', path: '/api/v1/update', status: 200, size: 234 },
];

export default function HTTPServer() {
  const [running, setRunning] = useState(false);
  const [port, setPort] = useState('8080');
  const [directory, setDirectory] = useState('/home/user/Projects/site');

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      <div className="p-4 border-b border-zinc-700/50">
        <div className="flex gap-3">
          <input value={directory} onChange={e => setDirectory(e.target.value)} placeholder="Serve directory" className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm" />
          <input value={port} onChange={e => setPort(e.target.value)} placeholder="Port" className="w-24 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-center" />
          {running ? (
            <button onClick={() => setRunning(false)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"><Icons.Square size={14} /> Stop</button>
          ) : (
            <button onClick={() => setRunning(true)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"><Icons.Play size={14} /> Start</button>
          )}
        </div>
        {running && (
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-green-400">Server running on port {port}</span>
            </div>
            <span className="text-sm text-blue-400 font-mono">http://localhost:{port}</span>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="text-sm text-zinc-500 mb-2">Access Logs</div>
        <div className="bg-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-zinc-700">
              <th className="text-left px-4 py-3 text-zinc-500">Time</th>
              <th className="text-left px-4 py-3 text-zinc-500">IP</th>
              <th className="text-left px-4 py-3 text-zinc-500">Method</th>
              <th className="text-left px-4 py-3 text-zinc-500">Path</th>
              <th className="text-right px-4 py-3 text-zinc-500">Status</th>
              <th className="text-right px-4 py-3 text-zinc-500">Size</th>
            </tr></thead>
            <tbody>
              {ACCESS_LOGS.map((log, i) => (
                <tr key={i} className="border-b border-zinc-700/50">
                  <td className="px-4 py-2 text-zinc-400 text-xs">{log.time}</td>
                  <td className="px-4 py-2 font-mono text-xs">{log.ip}</td>
                  <td className="px-4 py-2"><span className={`px-1.5 py-0.5 rounded text-xs ${log.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : log.method === 'POST' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{log.method}</span></td>
                  <td className="px-4 py-2 text-zinc-300">{log.path}</td>
                  <td className="px-4 py-2 text-right"><span className={log.status >= 400 ? 'text-red-400' : 'text-green-400'}>{log.status}</span></td>
                  <td className="px-4 py-2 text-right text-zinc-400">{log.size}B</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
