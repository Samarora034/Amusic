import React from "react";
import { usePlayer } from "../context/PlayerContext";

function Hero({ onPlay, song }) {
  const { toggleFavorite, isFavorite } = usePlayer();

  if (!song) return null;

  const liked = isFavorite(song.id);

  return (
    <section className="relative px-6 md:px-margin-desktop mb-12">
      <div className="relative h-[400px] md:h-[480px] rounded-3xl overflow-hidden glass-card group">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${song.coverUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(19,19,20,0.8)_100%)]"></div>

        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-3xl">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm mb-4">NOW PLAYING</span>
          <h2 className="font-display-lg text-[36px] md:text-[48px] mb-3 text-white line-clamp-1">{song.title}</h2>
          <p className="text-on-surface-variant text-body-lg mb-8 max-w-xl">Hit play. Trust us on this one. {song.artist} doesn't miss.</p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onPlay(song)}
              className="flex items-center gap-2 px-8 py-4 bg-primary-container text-on-primary rounded-full font-bold transition-all hover:scale-105 active:scale-95 neon-glow"
            >
              <span className="font-bold">[ PLAY ]</span>
              Play Now
            </button>
            <button
              onClick={() => toggleFavorite(song)}
              className="flex items-center gap-2 px-8 py-4 glass-card text-white rounded-full font-bold transition-all hover:bg-white/10 active:scale-95"
            >
              <span className="font-bold">[ FAV ]</span>
              {liked ? "Saved!" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
