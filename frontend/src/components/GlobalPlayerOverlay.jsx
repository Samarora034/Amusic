import React from "react";
import { useAudioPlayer } from "../context/AudioPlayerContext";

const GlobalPlayerOverlay = () => {
  const { currentTrack, isPlaying, togglePlay, audioLoading } = useAudioPlayer();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] pointer-events-none p-6 md:p-margin-desktop flex justify-between items-end">
      
      {/* Left side: Track Info */}
      <div className="flex items-center gap-6 pointer-events-auto">
        <div className="relative w-20 h-20 md:w-32 md:h-32 overflow-hidden rounded-sm skew-card border border-white/10 group shadow-[0_0_30px_rgba(255,0,0,0.2)]">
          <img 
            src={currentTrack.coverUrl} 
            alt="Cover" 
            className="w-full h-full object-cover album-art-grain" 
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
            <button 
              onClick={togglePlay}
              className="w-12 h-12 bg-primary/20 text-primary border border-primary/50 rounded-full flex items-center justify-center neon-glow"
            >
              {audioLoading ? (
                <span className="material-symbols-outlined animate-spin text-[24px]">sync</span>
              ) : (
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isPlaying ? "pause" : "play_arrow"}
                </span>
              )}
            </button>
          </div>
        </div>
        
        <div className="overflow-hidden max-w-[200px] md:max-w-[400px]">
          <h2 
            className="hyper-display text-[24px] md:text-[40px] text-primary-container leading-none glitch-target" 
            data-text={currentTrack.title}
          >
            {currentTrack.title}
          </h2>
          <p className="font-label-md text-on-surface-variant uppercase tracking-[0.2em] mt-2">
            {currentTrack.artist}
            {currentTrack.audioUrl && !currentTrack.fullTrack && (
              <span className="ml-3 bg-red-900/50 text-red-400 text-[10px] px-2 py-0.5 rounded-sm border border-red-500/30">Preview</span>
            )}
          </p>
        </div>
      </div>

      {/* Right side: Minimal Controls */}
      <div className="pointer-events-auto flex gap-4 hidden sm:flex">
        <button className="text-on-surface-variant hover:text-primary transition-colors mix-blend-difference">
          <span className="material-symbols-outlined text-[32px]">skip_previous</span>
        </button>
        <button 
          onClick={togglePlay}
          className="text-primary hover:text-white transition-colors mix-blend-difference"
        >
          {audioLoading ? (
            <span className="material-symbols-outlined animate-spin text-[40px]">sync</span>
          ) : (
            <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isPlaying ? "pause_circle" : "play_circle"}
            </span>
          )}
        </button>
        <button className="text-on-surface-variant hover:text-primary transition-colors mix-blend-difference">
          <span className="material-symbols-outlined text-[32px]">skip_next</span>
        </button>
      </div>
      
    </div>
  );
};

export default GlobalPlayerOverlay;
