import React from "react";
import Sidebar from "./Sidebar";
import MusicCard from "./MusicCard";
import { usePlayer } from "../context/PlayerContext";

function Library() {
  const { playSong, currentTrack, favorites, toggleFavorite } = usePlayer();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handlePlay = (song) => playSong(song, favorites);

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Sidebar />

      <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-40 bg-surface/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-margin-desktop h-20">
        <h2 className="font-headline-lg text-[24px] text-primary">My Library</h2>
        <button className="flex items-center gap-3" onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href = "/login"; }}>
          <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface">logout</span>
          </div>
        </button>
      </header>

      <main className="md:ml-64 pt-28 pb-40 px-6 md:px-margin-desktop min-h-screen">
        <section className="mb-12">
          <div className="rounded-2xl bg-gradient-to-r from-primary-container/20 via-secondary-container/10 to-transparent p-8 flex items-center gap-6">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center shadow-xl">
              <span className="text-2xl font-bold text-on-primary">{user.name?.charAt(0)?.toUpperCase() || "?"}</span>
            </div>
            <div>
              <h3 className="font-headline-lg text-[28px] text-white">{user.name || "Guest"}</h3>
              <p className="text-on-surface-variant">{favorites.length} liked tracks</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-end mb-6">
            <h3 className="font-headline-lg text-[24px]">Liked Songs</h3>
            {favorites.length > 0 && (
              <button onClick={() => handlePlay(favorites[0])} className="bg-primary-container text-on-primary px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform active:scale-95">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                Play All
              </button>
            )}
          </div>

          {favorites.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {favorites.map((song) => (
                <MusicCard key={song.id} song={song} isPlaying={currentTrack?.id === song.id} isFavorite={true} onPlay={() => handlePlay(song)} onFavorite={() => toggleFavorite(song)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-[64px] text-on-surface-variant/30 mb-4 block">favorite</span>
              <h4 className="text-[20px] text-on-surface-variant mb-2">nothing here yet</h4>
              <p className="text-on-surface-variant/70">heart some tracks and they'll show up here.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Library;
