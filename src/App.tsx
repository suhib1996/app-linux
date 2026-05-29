import { Suspense } from 'react';
import { useOSStore } from '@/store/osStore';
import BootSequence from '@/components/BootSequence';
import Desktop from '@/components/Desktop';
import './App.css';

function App() {
  const bootComplete = useOSStore(s => s.bootComplete);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      {!bootComplete ? (
        <BootSequence />
      ) : (
        <Suspense fallback={<LoadingScreen />}>
          <Desktop />
        </Suspense>
      )}
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <div className="text-zinc-500 text-sm">Loading NexusOS...</div>
      </div>
    </div>
  );
}

export default App;
