import React, { useState, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";

function Player() {
  const { currentTrack, audioLoading, audioRef, playNext, playPrev, toggleFavorite, isFavorite, closePlayer } = usePlayer();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => { setProgress(audio.currentTime); setIsPlaying(!audio.paused); };
    const updateDuration = () => setDuration(audio.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", playNext);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", playNext);
    };
  }, [currentTrack?.audioUrl]);

  if (!currentTrack) return null;

  const liked = isFavorite(currentTrack.id);

  const togglePlay = () => {
    if (!audioRef.current) return;
    audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause();
  };

  const seek = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * duration;
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={currentTrack.audioUrl} autoPlay hidden />

      <footer className="fixed bottom-[64px] md:bottom-0 left-0 w-full z-50 bg-surface-container/80 backdrop-blur-[30px] border-t border-white/10 shadow-2xl">
        {/* Progress bar (clickable) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5 cursor-pointer group" onClick={seek}>
          <div
            className="h-full bg-primary-container transition-all duration-150 group-hover:h-1.5"
            style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }}
          />
        </div>

        <div className="flex items-center justify-between px-4 md:px-8 h-20 gap-3">
          {/* Track info */}
          <div className="flex items-center gap-3 w-1/4 min-w-0">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
              <img src={currentTrack.coverUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h5 className="text-sm font-medium text-primary-container truncate">{currentTrack.title}</h5>
              <p className="text-[11px] text-on-surface-variant truncate flex items-center gap-1">
                {currentTrack.artist}
                {currentTrack.audioUrl && !currentTrack.fullTrack && (
                  <span className="bg-primary-container/20 text-primary-container text-[9px] px-1.5 py-0.5 rounded-full font-bold">30s</span>
                )}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 md:gap-5">
            <button onClick={playPrev} className="text-on-surface-variant hover:text-on-surface transition-colors hidden sm:block">
              <span className="font-bold text-[14px]">[ &lt;&lt; ]</span>
            </button>

            {audioLoading ? (
              <div className="w-11 h-11 rounded-full bg-primary-container/20 flex items-center justify-center">
                <span className="font-bold text-primary-container text-[12px] animate-pulse">[ LOAD ]</span>
              </div>
            ) : (
              <button onClick={togglePlay} className="w-11 h-11 rounded-full bg-primary-container text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
                <span className="font-bold text-[12px]">
                  {isPlaying ? "[ || ]" : "[ > ]"}
                </span>
              </button>
            )}

            <button onClick={playNext} className="text-on-surface-variant hover:text-on-surface transition-colors hidden sm:block">
              <span className="font-bold text-[14px]">[ &gt;&gt; ]</span>
            </button>

            {/* Time */}
            <span className="text-[10px] text-on-surface-variant hidden md:block w-20 text-center">
              {fmt(progress)} / {fmt(duration)}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 w-1/4 justify-end">
            <button
              onClick={() => toggleFavorite(currentTrack)}
              className={`transition-colors ${liked ? "text-primary-container" : "text-on-surface-variant hover:text-primary-container"}`}
              title={liked ? "Liked!" : "Like"}
            >
              <span className="font-bold text-[12px]">[ FAV ]</span>
            </button>

            <button
              onClick={() => {
                if (!isFavorite(currentTrack.id)) toggleFavorite(currentTrack);
                alert("Added to Library");
              }}
              className="text-on-surface-variant hover:text-on-surface transition-colors hidden md:block"
              title="Add to Library"
            >
              <span className="font-bold text-[12px]">[ + ]</span>
            </button>

            <button onClick={closePlayer} className="text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="font-bold text-[12px]">[ X ]</span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Player;
