import React from "react";

function MusicCard({ song, isPlaying, isFavorite, onPlay, onFavorite }) {
  return (
    <div className="group cursor-pointer" onClick={onPlay}>
      <div className={`aspect-square rounded-2xl overflow-hidden relative mb-3 border ${isPlaying ? "border-primary-container shadow-[0_0_12px_rgba(255,107,0,0.3)]" : "border-transparent"} transition-all duration-300 group-hover:scale-[1.03]`}>
        <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-black/40 ${isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity flex items-center justify-center`}>
          <div className="w-12 h-12 bg-primary-container text-on-primary rounded-full flex items-center justify-center shadow-xl">
            <span className="font-bold text-[12px]">
              {isPlaying ? "[ || ]" : "[ > ]"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start gap-1">
        <div className="min-w-0 flex-1">
          <h4 className={`text-sm font-medium truncate transition-colors ${isPlaying ? "text-primary-container" : "text-on-surface group-hover:text-primary-container"}`}>
            {song.title}
          </h4>
          <p className="text-on-surface-variant text-xs truncate">{song.artist}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onFavorite(); }}
          className={`p-1 rounded-full transition-colors flex-shrink-0 ${isFavorite ? "text-primary-container" : "text-on-surface-variant hover:text-primary-container"}`}
          aria-label="Toggle favorite"
        >
          <span className="font-bold text-[12px]">[ FAV ]</span>
        </button>
      </div>
    </div>
  );
}

export default MusicCard;
