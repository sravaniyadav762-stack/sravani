/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Terminal } from 'lucide-react';

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#08080a] text-slate-200 flex flex-col p-6 overflow-hidden font-mono select-none relative">
      
      {/* Header Navigation */}
      <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-cyan-900/30 pb-4 mb-6 relative z-20 gap-4 sm:gap-0">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
            SYNTH_SNAKE v1.0
          </h1>
          <p className="text-[10px] text-cyan-500/60 uppercase tracking-[0.2em]">Neural Audio-Visual Environment</p>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-stretch z-10">
        
        {/* Music Player Area - matching sidebar style */}
        <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col gap-4">
          <MusicPlayer />
        </div>
        
        {/* Game Area - matching center canvas style */}
        <div className="flex-1 w-full flex justify-center">
          <SnakeGame />
        </div>

      </main>

      {/* Decorative footer text */}
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-slate-700 uppercase tracking-[0.4em] text-right z-20 pointer-events-none hidden sm:block">
        Direct Input Mode: Active
      </div>
    </div>
  );
}
