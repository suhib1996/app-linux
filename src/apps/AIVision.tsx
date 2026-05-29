import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

const ANALYSIS_RESULTS = [
  'Detected: Smart contract code snippet\nLanguage: Solidity\nComplexity: High\nSecurity: 3 potential vulnerabilities found',
  'Detected: UI mockup wireframe\nElements: Button, Input field, Card layout\nFramework: Likely React/Tailwind',
  'Detected: Blockchain architecture diagram\nComponents: Node network, Consensus layer, Smart contracts',
];

export default function AIVision() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState('');
  const addNotification = useOSStore(s => s.addNotification);

  const handleAnalyze = () => {
    if (!image) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(ANALYSIS_RESULTS[Math.floor(Math.random() * ANALYSIS_RESULTS.length)]);
      addNotification({ title: 'Analysis Complete', message: 'Image analyzed successfully', type: 'success' });
    }, 2000);
  };

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">AI Vision</h2>
        <div className="bg-zinc-800 rounded-xl p-8 mb-4 text-center border-2 border-dashed border-zinc-700 hover:border-blue-500/50 transition-colors cursor-pointer"
          onClick={() => setImage('uploaded')}>
          {image ? (
            <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
              <Icons.Image size={48} className="text-blue-400" />
            </div>
          ) : (
            <>
              <Icons.Upload size={32} className="text-zinc-500 mx-auto mb-3" />
              <p className="text-sm text-zinc-500">Click to upload an image</p>
            </>
          )}
        </div>
        <button onClick={handleAnalyze} disabled={!image || analyzing} className="w-full py-2.5 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 disabled:opacity-50 mb-4">
          {analyzing ? 'Analyzing...' : 'Analyze Image'}
        </button>
        {result && (
          <div className="bg-zinc-800 rounded-xl p-4">
            <h3 className="font-medium mb-2">Analysis Result</h3>
            <pre className="text-sm text-zinc-300 whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
