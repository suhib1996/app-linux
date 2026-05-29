import { useState, useRef, useCallback } from 'react';
import * as Icons from 'lucide-react';

interface Node {
  id: string; type: 'trigger' | 'llm' | 'code' | 'condition' | 'output';
  x: number; y: number; label: string; config: Record<string, string>;
}

interface Edge { from: string; to: string; }

const NODE_TYPES = [
  { type: 'trigger', label: 'Trigger', color: 'bg-green-500', icon: 'Zap', desc: 'Start the workflow' },
  { type: 'llm', label: 'LLM Call', color: 'bg-blue-500', icon: 'Brain', desc: 'Call an AI model' },
  { type: 'code', label: 'Code', color: 'bg-purple-500', icon: 'Code', desc: 'Execute custom code' },
  { type: 'condition', label: 'Condition', color: 'bg-yellow-500', icon: 'GitBranch', desc: 'Branch logic' },
  { type: 'output', label: 'Output', color: 'bg-red-500', icon: 'LogOut', desc: 'Return result' },
];

export default function AgentBuilder() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', type: 'trigger', x: 100, y: 200, label: 'HTTP Request', config: { method: 'POST', path: '/api/agent' } },
    { id: '2', type: 'llm', x: 350, y: 200, label: 'GPT-4 Analysis', config: { model: 'gpt-4', temperature: '0.7' } },
    { id: '3', type: 'condition', x: 600, y: 200, label: 'Check Result', config: { condition: 'confidence > 0.8' } },
    { id: '4', type: 'output', x: 850, y: 150, label: 'Return Success', config: {} },
    { id: '5', type: 'output', x: 850, y: 300, label: 'Return Error', config: {} },
  ]);
  const [edges] = useState<Edge[]>([{ from: '1', to: '2' }, { from: '2', to: '3' }, { from: '3', to: '4' }, { from: '3', to: '5' }]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addNode = (type: string) => {
    const nt = NODE_TYPES.find(n => n.type === type)!;
    setNodes([...nodes, { id: Date.now().toString(), type: type as any, x: 200 + Math.random() * 200, y: 150 + Math.random() * 200, label: nt.label, config: {} }]);
  };

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setDragging(nodeId);
    setSelectedNode(nodeId);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setNodes(prev => prev.map(n => n.id === dragging ? { ...n, x: e.clientX - rect.left - 40, y: e.clientY - rect.top - 20 } : n));
  }, [dragging]);

  const handleMouseUp = () => setDragging(null);

  const selected = nodes.find(n => n.id === selectedNode);

  return (
    <div className="w-full h-full flex bg-zinc-900 text-zinc-200">
      <div className="w-56 border-r border-zinc-700/50 p-3">
        <div className="text-xs text-zinc-500 uppercase mb-2">Nodes</div>
        {NODE_TYPES.map(nt => {
          const Icon = (Icons as any)[nt.icon];
          return (
            <button key={nt.type} onClick={() => addNode(nt.type)} className="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 text-zinc-300 hover:bg-zinc-800 mb-1">
              <div className={`w-6 h-6 rounded ${nt.color} flex items-center justify-center`}><Icon size={12} className="text-white" /></div>
              <div><div className="font-medium">{nt.label}</div><div className="text-xs text-zinc-500">{nt.desc}</div></div>
            </button>
          );
        })}
      </div>
      <div className="flex-1 flex">
        <div ref={canvasRef} className="flex-1 relative overflow-hidden bg-zinc-800/30 cursor-crosshair"
          onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
          {/* Grid */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #52525b 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          {/* Edges */}
          <svg className="absolute inset-0 pointer-events-none">
            {edges.map((edge, i) => {
              const from = nodes.find(n => n.id === edge.from);
              const to = nodes.find(n => n.id === edge.to);
              if (!from || !to) return null;
              return <line key={i} x1={from.x + 40} y1={from.y + 20} x2={to.x + 40} y2={to.y + 20} stroke="#52525b" strokeWidth="2" />;
            })}
          </svg>
          {/* Nodes */}
          {nodes.map(node => {
            const nt = NODE_TYPES.find(t => t.type === node.type)!;
            const Icon = (Icons as any)[nt.icon];
            return (
              <div key={node.id} onMouseDown={(e) => handleMouseDown(e, node.id)}
                className={`absolute px-3 py-2 rounded-xl bg-zinc-800 border cursor-move select-none flex items-center gap-2 transition-shadow ${selectedNode === node.id ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-zinc-700'}`}
                style={{ left: node.x, top: node.y }}>
                <div className={`w-6 h-6 rounded ${nt.color} flex items-center justify-center`}><Icon size={12} className="text-white" /></div>
                <span className="text-xs font-medium">{node.label}</span>
              </div>
            );
          })}
        </div>
        {selected && (
          <div className="w-64 border-l border-zinc-700/50 p-4">
            <h3 className="font-medium mb-3">{selected.label}</h3>
            <div className="space-y-3">
              {Object.entries(selected.config).map(([k, v]) => (
                <div key={k}>
                  <label className="text-xs text-zinc-500 capitalize">{k}</label>
                  <input value={v} onChange={e => setNodes(nodes.map(n => n.id === selected.id ? { ...n, config: { ...n.config, [k]: e.target.value } } : n))} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
