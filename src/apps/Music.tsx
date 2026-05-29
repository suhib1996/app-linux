import { useState, useRef } from 'react';
import * as Icons from 'lucide-react';

const TRACKS = [
  { title: 'Neon Horizon', artist: 'Synthwave Collective', duration: '4:32' },
  { title: 'Blockchain Beats', artist: 'Crypto DJs', duration: '3:45' },
  { title: 'Digital Dreams', artist: 'AI Composer', duration: '5:12' },
  { title: 'Cyberpunk City', artist: 'Neon Riders', duration: '4:08' },
  { title: 'Quantum Flux', artist: 'Particle Beats', duration: '6:21' },
];

export default function Music() {
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(35);

  const track = TRACKS[currentTrack];

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 text-zinc-200">
      <div className="flex-1 overflow-auto p-6">
        <div className="text-center mb-6">
          <div className="w-48 h-48 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Icons.Music size={64} className="text-white/30" />
          </div>
          <h2 className="text-xl font-semibold">{track.title}</h2>
          <p className="text-sm text-zinc-500">{track.artist}</p>
        </div>
        <div className="space-y-1">
          {TRACKS.map((t, i) => (
            <button key={i} onClick={() => setCurrentTrack(i)} className={`w-full flex items-center justify-between p-3 rounded-xl text-left ${currentTrack === i ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-zinc-800'}`}>
              <div className="flex items-center gap-3">
                <span className="text-zinc-500 w-5">{i + 1}</span>
                <span className="text-sm">{t.title}</span>
              </div>
              <span className="text-xs text-zinc-500">{t.duration}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-zinc-700/50">
        <div className="w-full bg-zinc-700 rounded-full h-1 mb-4"><div className="bg-blue-500 h-1 rounded-full" style={{ width: `${progress}%` }} /></div>
        <div className="flex items-center justify-center gap-6">
          <button className="text-zinc-400 hover:text-zinc-200"><Icons.SkipBack size={20} /></button>
          <button onClick={() => setPlaying(!playing)} className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600">
            {playing ? <Icons.Pause size={24} /> : <Icons.Play size={24} />}
          </button>
          <button className="text-zinc-400 hover:text-zinc-200"><Icons.SkipForward size={20} /></button>
        </div>
      </div>
    </div>
  );
}
