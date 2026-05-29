import { useState, useRef, useEffect, useCallback } from 'react';
import * as Icons from 'lucide-react';

export default function Paint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#3b82f6');
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState<'brush' | 'eraser' | 'line' | 'rect' | 'circle'>('brush');

  const colors = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#000000', '#ffffff', '#06b6d4', '#84cc16'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e: React.MouseEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const ctx = canvasRef.current!.getContext('2d')!;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current!.getContext('2d')!;
    const { x, y } = getPos(e);
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => setIsDrawing(false);

  const clear = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const download = () => {
    const canvas = canvasRef.current!;
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      <div className="flex items-center gap-2 p-2 border-b border-zinc-700/50">
        <div className="flex gap-1">
          {[
            { t: 'brush', i: 'Brush' }, { t: 'eraser', i: 'Eraser' }, { t: 'line', i: 'Minus' },
            { t: 'rect', i: 'Square' }, { t: 'circle', i: 'Circle' },
          ].map(({ t, i }) => {
            const Icon = (Icons as any)[i];
            return <button key={t} onClick={() => setTool(t as any)} className={`p-1.5 rounded ${tool === t ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-zinc-800 text-zinc-400'}`}><Icon size={16} /></button>;
          })}
        </div>
        <div className="w-px h-6 bg-zinc-700" />
        <div className="flex gap-1">
          {colors.map(c => (
            <button key={c} onClick={() => setColor(c)} className={`w-5 h-5 rounded-full ${color === c ? 'ring-2 ring-white' : ''}`} style={{ background: c }} />
          ))}
        </div>
        <div className="w-px h-6 bg-zinc-700" />
        <input type="range" min="1" max="20" value={brushSize} onChange={e => setBrushSize(parseInt(e.target.value))} className="w-20" />
        <div className="flex-1" />
        <button onClick={clear} className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400"><Icons.Trash2 size={16} /></button>
        <button onClick={download} className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400"><Icons.Download size={16} /></button>
      </div>
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-zinc-800/30">
        <canvas ref={canvasRef} width={800} height={600} onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
          className="bg-white shadow-lg cursor-crosshair" />
      </div>
    </div>
  );
}
