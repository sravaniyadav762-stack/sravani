import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "Neon Drive (AI Gen)",
    artist: "Synth Mind",
    url: "https://actions.google.com/sounds/v1/science_fiction/cybernetic_ambience.ogg"
  },
  {
    id: 2,
    title: "Cyberpunk City (AI Gen)",
    artist: "Neural Net",
    url: "https://actions.google.com/sounds/v1/science_fiction/dark_alien_ambience.ogg"
  },
  {
    id: 3,
    title: "Digital Dreams (AI Gen)",
    artist: "Logic Gate",
    url: "https://actions.google.com/sounds/v1/science_fiction/deep_space_ambience.ogg"
  }
];

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error("Audio playback error:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleEnded = () => {
    nextTrack();
  };

  return (
    <div className="w-full flex-1 flex flex-col gap-4">
      {/* Playlist Section */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4 flex-1">
        <h3 className="text-[11px] text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          Neural Playlist
        </h3>
        <div className="space-y-2">
          {TRACKS.map((track, idx) => {
            const isActive = currentTrackIndex === idx;
            return (
              <div 
                key={track.id}
                onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
                className={`p-3 cursor-pointer transition-colors border rounded-md flex items-center gap-3 ${isActive ? 'bg-cyan-500/10 border-cyan-500/30 opacity-100' : 'border-transparent hover:bg-slate-800/50 opacity-60'}`}
              >
                <div className={`w-8 h-8 rounded flex items-center justify-center text-[10px] flex-shrink-0 ${isActive ? 'bg-cyan-500/20' : 'bg-slate-800 text-slate-500'}`}>
                  {isActive && isPlaying ? <Play size={16} className="text-cyan-400" /> : `0${idx + 1}`}
                </div>
                <div className="overflow-hidden">
                  <p className={`text-xs font-bold truncate ${isActive ? 'text-cyan-100' : 'text-slate-300'}`}>{track.title}</p>
                  <p className={`text-[10px] ${isActive ? 'text-cyan-500/70' : 'text-slate-500'} truncate`}>AI Gen: {track.artist}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audio Controls Section */}
      <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col items-center gap-6 backdrop-blur-md relative overflow-hidden flex-shrink-0">
        <audio
          ref={audioRef}
          src={currentTrack.url}
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        <div className="flex items-center gap-4 w-full border-b border-slate-800/50 pb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-fuchsia-600 rounded flex-shrink-0 flex items-center justify-center">
            <Play size={24} className="text-white opacity-80" />
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-white truncate">{currentTrack.title}</div>
            <div className="text-[10px] text-slate-500 truncate uppercase">{currentTrack.artist}</div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full gap-4 relative z-10 w-full">
          <div className="flex items-center justify-center gap-8 w-full">
            <button 
              onClick={prevTrack}
              className="text-slate-500 hover:text-cyan-400 transition-colors"
            >
              <SkipBack size={20} />
            </button>
            <button 
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="translate-x-0.5" />}
            </button>
            <button 
              onClick={nextTrack}
              className="text-slate-500 hover:text-cyan-400 transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full border-t border-slate-800/50 pt-4">
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              className="text-slate-500 hover:text-cyan-400 transition-colors flex-shrink-0"
            >
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setIsMuted(false);
              }}
              className="w-full h-1 bg-slate-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_white] accent-cyan-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
