import { useSnake } from '../hooks/useSnake';
import { Play } from 'lucide-react';

export function SnakeGame() {
  const { snake, food, gameOver, score, isPlaying, startGame, gridSize } = useSnake();

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center relative border border-slate-800 bg-[#0c0c10] rounded-xl overflow-hidden shadow-2xl shadow-cyan-900/20 p-6 sm:p-10">
      
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(34, 211, 238, 0.05) 1px, transparent 0)', 
          backgroundSize: '24px 24px'
        }}
      />

      <div className="flex justify-between w-full mb-6 relative z-10 px-0 sm:px-4 items-center">
        <div>
          <span className="block text-[10px] text-slate-500 uppercase">Current Score</span>
          <span className="text-2xl font-bold text-fuchsia-400 leading-none">
            {score.toString().padStart(4, '0')}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_theme('colors.cyan.400')]" />
          <span className="text-slate-500 font-mono text-[10px] tracking-widest uppercase">System Online</span>
        </div>
      </div>

      <div 
        className="relative bg-[#0c0c10] border border-slate-800 rounded-xl overflow-hidden shadow-inner"
        style={{
          width: `${gridSize * 15}px`,
          height: `${gridSize * 15}px`,
        }}
      >
        {/* Draw food */}
        <div
          className="absolute bg-fuchsia-500 rounded-full shadow-[0_0_20px_#d946ef] animate-pulse"
          style={{
            left: `${food.x * 15}px`,
            top: `${food.y * 15}px`,
            width: '15px',
            height: '15px',
            transform: 'scale(0.8)'
          }}
        />

        {/* Draw snake */}
        {snake.map((segment, i) => {
          let opacity = 1;
          if (i > 0) {
            opacity = Math.max(0.2, 1 - (i * 0.1));
          }
          let boxShadow = 'none';
          if (i === 0) {
            boxShadow = '0 0 15px rgba(34,211,238,0.6)';
          } else if (i === 1) {
            boxShadow = '0 0 10px rgba(34,211,238,0.4)';
          }
          return (
            <div
              key={i}
              className="absolute bg-cyan-400 rounded-sm"
              style={{
                left: `${segment.x * 15}px`,
                top: `${segment.y * 15}px`,
                width: '15px',
                height: '15px',
                opacity: opacity,
                boxShadow: boxShadow,
                zIndex: i === 0 ? 10 : 5
              }}
            />
          );
        })}

        {/* Start / Game Over Overlay */}
        {(!isPlaying || gameOver) && (
          <div className="absolute inset-0 bg-[#0c0c10]/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center border-t border-slate-800/50">
            {gameOver && (
              <h2 className="text-2xl font-bold text-fuchsia-400 mb-2 drop-shadow-[0_0_12px_theme('colors.fuchsia.500')] uppercase tracking-widest font-mono">
                System Failure
              </h2>
            )}
            
            <button
              onClick={startGame}
              className="mt-6 flex items-center gap-3 px-8 py-3 bg-cyan-500 text-slate-950 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105 transition-transform font-mono uppercase tracking-widest text-sm font-bold"
            >
              <Play size={18} fill="currentColor" />
              {gameOver ? 'Reboot Sequence' : 'Initialize'}
            </button>

            <p className="mt-8 font-mono text-[10px] text-slate-500 tracking-widest uppercase max-w-[200px]">
              [ Use Arrow Keys to navigate ] <br/>
              [ Spacebar to reboot ]
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
