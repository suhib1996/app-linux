import { useState } from 'react';
import * as Icons from 'lucide-react';

interface Table { name: string; columns: string[]; rows: any[][]; }

const TABLES: Table[] = [
  { name: 'users', columns: ['id', 'name', 'email', 'role', 'created_at'],
    rows: [['1', 'Alice', 'alice@nexus.os', 'admin', '2026-01-15'], ['2', 'Bob', 'bob@nexus.os', 'user', '2026-02-20'], ['3', 'Charlie', 'charlie@nexus.os', 'user', '2026-03-10']] },
  { name: 'transactions', columns: ['id', 'user_id', 'amount', 'token', 'status'],
    rows: [['1', '1', '1000', 'USDT', 'completed'], ['2', '2', '5.2', 'ETH', 'pending'], ['3', '3', '200', 'BNB', 'completed']] },
  { name: 'contracts', columns: ['id', 'name', 'address', 'network', 'deployed_at'],
    rows: [['1', 'MyToken', '0x742d...0bEb', 'Ethereum', '2026-04-01'], ['2', 'NFTCollection', '0x1234...5678', 'BSC', '2026-04-15']] },
];

export default function DBManager() {
  const [activeTable, setActiveTable] = useState(0);
  const [query, setQuery] = useState('SELECT * FROM users LIMIT 10');
  const [queryResult, setQueryResult] = useState('');

  const runQuery = () => {
    setQueryResult(`Query executed successfully.\n\n3 rows returned in 12ms.\n\nid | name    | email           | role  | created_at\n---+---------+-----------------+-------+-----------\n1  | Alice   | alice@nexus.os  | admin | 2026-01-15\n2  | Bob     | bob@nexus.os    | user  | 2026-02-20\n3  | Charlie | charlie@nexus.os| user  | 2026-03-10`);
  };

  const table = TABLES[activeTable];

  return (
    <div className="w-full h-full flex bg-zinc-900 text-zinc-200">
      <div className="w-48 border-r border-zinc-700/50 p-3">
        <div className="text-xs text-zinc-500 uppercase mb-2">Tables</div>
        {TABLES.map((t, i) => (
          <button key={t.name} onClick={() => setActiveTable(i)} className={`w-full text-left px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${activeTable === i ? 'bg-blue-500/20 text-blue-400' : 'text-zinc-400 hover:bg-zinc-800'}`}>
            <Icons.Table size={14} /> {t.name}
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b border-zinc-700/50">
          <div className="flex gap-2">
            <input value={query} onChange={e => setQuery(e.target.value)} className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm font-mono" />
            <button onClick={runQuery} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">Run</button>
          </div>
        </div>
        {queryResult ? (
          <pre className="flex-1 p-4 font-mono text-sm text-green-400 overflow-auto">{queryResult}</pre>
        ) : (
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-zinc-700">
                {table.columns.map(c => <th key={c} className="text-left px-4 py-2 text-zinc-500 font-medium">{c}</th>)}
              </tr></thead>
              <tbody>
                {table.rows.map((row, i) => (
                  <tr key={i} className="border-b border-zinc-700/50 hover:bg-zinc-800/50">
                    {row.map((cell, j) => <td key={j} className="px-4 py-2 text-zinc-300">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
