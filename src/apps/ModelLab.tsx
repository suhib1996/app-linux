import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

export default function ModelLab() {
  const [training, setTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [config, setConfig] = useState({ epochs: '10', lr: '0.001', batchSize: '32', dataset: 'custom.csv' });
  const [logs, setLogs] = useState<string[]>([]);
  const addNotification = useOSStore(s => s.addNotification);

  const startTraining = () => {
    setTraining(true);
    setProgress(0);
    setLogs(['Loading dataset...', 'Preprocessing...', 'Initializing model...']);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      setLogs(prev => [...prev, `Epoch ${Math.floor(p / 10)}/${config.epochs} - loss: ${(1 - p / 100 + Math.random() * 0.1).toFixed(4)} - acc: ${(p / 100 + Math.random() * 0.05).toFixed(4)}`]);
      if (p >= 100) {
        clearInterval(interval);
        setTraining(false);
        setLogs(prev => [...prev, 'Training complete! Final accuracy: 94.2%']);
        addNotification({ title: 'Training Complete', message: 'Model trained with 94.2% accuracy', type: 'success' });
      }
    }, 500);
  };

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Model Lab</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-zinc-800 rounded-xl p-4">
              <h3 className="font-medium mb-3">Training Configuration</h3>
              <div className="space-y-3">
                <div><label className="text-sm text-zinc-500">Dataset</label><input value={config.dataset} onChange={e => setConfig({ ...config, dataset: e.target.value })} className="w-full mt-1 bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm" /></div>
                <div className="grid grid-cols-3 gap-3">
                  <div><label className="text-sm text-zinc-500">Epochs</label><input type="number" value={config.epochs} onChange={e => setConfig({ ...config, epochs: e.target.value })} className="w-full mt-1 bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm" /></div>
                  <div><label className="text-sm text-zinc-500">Learning Rate</label><input value={config.lr} onChange={e => setConfig({ ...config, lr: e.target.value })} className="w-full mt-1 bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm" /></div>
                  <div><label className="text-sm text-zinc-500">Batch Size</label><input type="number" value={config.batchSize} onChange={e => setConfig({ ...config, batchSize: e.target.value })} className="w-full mt-1 bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-sm" /></div>
                </div>
                <button onClick={startTraining} disabled={training} className="w-full py-2.5 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 disabled:opacity-50">
                  {training ? 'Training...' : 'Start Training'}
                </button>
              </div>
            </div>
            {training && (
              <div className="bg-zinc-800 rounded-xl p-4">
                <div className="flex justify-between text-sm mb-2"><span>Progress</span><span>{progress}%</span></div>
                <div className="w-full bg-zinc-700 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
              </div>
            )}
          </div>
          <div className="bg-zinc-800 rounded-xl p-4">
            <h3 className="font-medium mb-3">Training Logs</h3>
            <div className="font-mono text-xs text-zinc-400 space-y-1 h-80 overflow-auto">
              {logs.map((log, i) => <div key={i}>{log}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
