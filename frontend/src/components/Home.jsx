import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Hero from "./Hero";
import MusicCard from "./MusicCard";
import axios from "axios";
import { usePlayer } from "../context/PlayerContext";

const API_URL = process.env.REACT_APP_API_URL || "https://amusic-hm8o.onrender.com";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const searchTimeout = useRef(null);
  const { playSong, currentTrack, toggleFavorite, isFavorite } = usePlayer();

  useEffect(() => {
    axios.get(`${API_URL}/api/songs/trending?limit=20`)
      .then((res) => setSongs(res.data))
      .catch(() => setSongs([]));
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      axios.get(`${API_URL}/api/songs/search?q=${encodeURIComponent(searchQuery)}&limit=20`)
        .then((res) => setSearchResults(res.data))
        .catch(() => setSearchResults([]));
    }, 400);
  }, [searchQuery]);

  const displaySongs = searchQuery.trim() ? searchResults : songs;

  const handlePlay = (song) => playSong(song, displaySongs);

  return (
    <div className="bg-background text-on-surface min-h-screen font-body-md selection:bg-primary-container selection:text-white">
      <Sidebar />

      {/* Top App Bar */}
      <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-40 bg-surface/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-margin-desktop h-20">
        <div className="flex items-center gap-8 flex-1">
          <div className="relative w-full max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant material-symbols-outlined">search</span>
            <input
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-primary-container focus:outline-none transition-all placeholder:text-on-surface-variant/50"
              placeholder="what do you wanna hear?"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <button className="flex items-center gap-3" onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href = "/login"; }}>
          <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface">logout</span>
          </div>
        </button>
      </header>

      {/* Main Content */}
      <main className="md:ml-64 pt-24 pb-40 min-h-screen">
        {searchQuery.trim() ? (
          <section className="px-6 md:px-margin-desktop mb-12">
            <h3 className="font-headline-lg text-[24px] mb-6">Results</h3>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {searchResults.map((song) => (
                  <MusicCard key={song.id} song={song} isPlaying={currentTrack?.id === song.id} isFavorite={isFavorite(song.id)} onPlay={() => handlePlay(song)} onFavorite={() => toggleFavorite(song)} />
                ))}
              </div>
            ) : (
              <p className="text-on-surface-variant">nothing came up for "{searchQuery}" — try something else?</p>
            )}
          </section>
        ) : (
          <>
            <Hero onPlay={handlePlay} song={songs[0]} />

            <section className="mb-12">
              <div className="px-6 md:px-margin-desktop flex justify-between items-end mb-6">
                <h3 className="font-headline-lg text-[24px] md:text-headline-lg">Trending Now</h3>
              </div>
              <div className="px-6 md:px-margin-desktop grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {displaySongs.slice(0, 12).map((song) => (
                  <MusicCard key={song.id} song={song} isPlaying={currentTrack?.id === song.id} isFavorite={isFavorite(song.id)} onPlay={() => handlePlay(song)} onFavorite={() => toggleFavorite(song)} />
                ))}
              </div>
            </section>

            {displaySongs.length > 12 && (
              <section className="mb-12">
                <div className="px-6 md:px-margin-desktop flex justify-between items-end mb-6">
                  <h3 className="font-headline-lg text-[24px] md:text-headline-lg">Discover More</h3>
                </div>
                <div className="px-6 md:px-margin-desktop grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {displaySongs.slice(12).map((song) => (
                    <MusicCard key={song.id} song={song} isPlaying={currentTrack?.id === song.id} isFavorite={isFavorite(song.id)} onPlay={() => handlePlay(song)} onFavorite={() => toggleFavorite(song)} />
                  ))}
                </div>
              </section>
            )}

            {displaySongs.length === 0 && (
              <div className="px-6 md:px-margin-desktop">
                <p className="text-on-surface-variant animate-pulse">Loading songs...</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
