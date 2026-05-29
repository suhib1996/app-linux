import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export default function APITester() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.example.com/v1/users');
  const [body, setBody] = useState('{\n  "name": "John Doe",\n  "email": "john@example.com"\n}');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const addNotification = useOSStore(s => s.addNotification);

  const sendRequest = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const mockResponses: Record<string, string> = {
        'GET': JSON.stringify({ status: 'success', data: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }], meta: { total: 2, page: 1 } }, null, 2),
        'POST': JSON.stringify({ status: 'success', data: { id: 3, name: 'John Doe', email: 'john@example.com', createdAt: '2026-05-29T10:00:00Z' } }, null, 2),
        'PUT': JSON.stringify({ status: 'success', data: { id: 1, name: 'Updated', updatedAt: '2026-05-29T10:00:00Z' } }, null, 2),
        'DELETE': JSON.stringify({ status: 'success', message: 'Resource deleted' }, null, 2),
        'PATCH': JSON.stringify({ status: 'success', data: { id: 1, name: 'Partially Updated' } }, null, 2),
      };
      setResponse(`HTTP/1.1 200 OK\nContent-Type: application/json\nX-Request-ID: ${Math.random().toString(36).substring(7)}\n\n${mockResponses[method]}`);
      addNotification({ title: 'API Request', message: `${method} ${url}`, type: 'success' });
    }, 800);
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      <div className="p-4 border-b border-zinc-700/50">
        <div className="flex gap-2">
          <select value={method} onChange={e => setMethod(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm font-mono font-medium">
            {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <input value={url} onChange={e => setUrl(e.target.value)} className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm font-mono" />
          <button onClick={sendRequest} disabled={loading} className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2">
            <Icons.Send size={14} /> {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 border-r border-zinc-700/50">
          <div className="px-4 py-2 text-xs text-zinc-500 uppercase">Body</div>
          <textarea value={body} onChange={e => setBody(e.target.value)} className="w-full h-[calc(100%-28px)] bg-zinc-900 p-4 font-mono text-sm resize-none outline-none" spellCheck={false} />
        </div>
        <div className="flex-1">
          <div className="px-4 py-2 text-xs text-zinc-500 uppercase">Response</div>
          <pre className="w-full h-[calc(100%-28px)] bg-zinc-900 p-4 font-mono text-sm overflow-auto text-green-400">{response || 'Send a request to see the response'}</pre>
        </div>
      </div>
    </div>
  );
}
