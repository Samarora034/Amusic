import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import MusicCard from "./MusicCard";
import axios from "axios";
import { useAudioPlayer } from "../context/AudioPlayerContext";

const API_URL = process.env.REACT_APP_API_URL || "https://amusic-hm8o.onrender.com";
const GENRES = ["Pop", "Rock", "Hip Hop", "Electronic", "Jazz", "R&B", "Classical", "Indie"];

function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [genreSongs, setGenreSongs] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Pop");
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const searchTimeout = useRef(null);

  const toggleFavorite = (song) => {
    const exists = favorites.find((f) => f.id === song.id);
    const updated = exists ? favorites.filter((f) => f.id !== song.id) : [...favorites, song];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  useEffect(() => {
    axios.get(`${API_URL}/api/songs/search?q=${encodeURIComponent(selectedGenre)}&limit=12`)
      .then((res) => setGenreSongs(res.data))
      .catch(() => setGenreSongs([]));
  }, [selectedGenre]);

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      axios.get(`${API_URL}/api/songs/search?q=${encodeURIComponent(searchQuery)}&limit=20`)
        .then((res) => setSearchResults(res.data))
        .catch(() => setSearchResults([]));
    }, 400);
  }, [searchQuery]);

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Sidebar />

      <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-40 bg-surface/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-margin-desktop h-20">
        <div className="relative w-full max-w-md">
          <span className="font-bold absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[10px]">[ SEARCH ]</span>
          <input
            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-full py-2.5 pl-20 pr-4 focus:ring-2 focus:ring-primary-container focus:outline-none transition-all placeholder:text-on-surface-variant/50"
            placeholder="find something new..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <main className="md:ml-64 pt-24 pb-40 px-6 md:px-margin-desktop min-h-screen">
        <h2 className="font-display-sm text-[36px] md:text-[60px] font-extrabold text-on-surface mb-8 tracking-tight hyper-display" style={{ textTransform: 'uppercase', letterSpacing: '-0.05em' }}>Explore</h2>

        {searchQuery.trim() ? (
          <section className="mb-12">
            <h3 className="font-headline-lg text-[24px] mb-6">Search Results</h3>
            {searchResults.length > 0 ? (
              <div className="flex flex-col">
                {searchResults.map((song) => (
                  <MusicCard key={song.id} song={song} isFavorite={favorites.some((f) => f.id === song.id)} onFavorite={() => toggleFavorite(song)} />
                ))}
              </div>
            ) : (
              <p className="text-on-surface-variant">no results for "{searchQuery}"</p>
            )}
          </section>
        ) : (
          <>
            <section className="mb-8">
              <h3 className="font-headline-lg text-[24px] mb-4">Browse by Genre</h3>
              <div className="flex flex-wrap gap-3">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-5 py-2 rounded-full font-label-md transition-all active:scale-95 ${
                      selectedGenre === genre
                        ? "bg-primary-container text-on-primary font-bold shadow-[0_0_15px_rgba(255,107,0,0.5)]"
                        : "glass-card text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h3 className="font-headline-lg text-[24px] mb-6">{selectedGenre}</h3>
              {genreSongs.length > 0 ? (
                <div className="flex flex-col">
                  {genreSongs.map((song) => (
                    <MusicCard key={song.id} song={song} isFavorite={favorites.some((f) => f.id === song.id)} onFavorite={() => toggleFavorite(song)} />
                  ))}
                </div>
              ) : (
                <p className="text-on-surface-variant animate-pulse">Loading...</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Explore;
