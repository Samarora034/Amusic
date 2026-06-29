import React, { createContext, useContext, useState, useRef } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://amusic-yie7.onrender.com";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [queue, setQueue] = useState([]);
  const [audioLoading, setAudioLoading] = useState(false);
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const audioRef = useRef(null);

  const playSong = async (song, songList = []) => {
    setCurrentTrack(song);
    if (songList.length > 0) setQueue(songList);
    setAudioLoading(true);

    try {
      const res = await axios.get(
        `${API_URL}/api/songs/stream/${encodeURIComponent(song.title + " " + song.artist)}`,
        { timeout: 10000 }
      );
      if (res.data.audioUrl) {
        setCurrentTrack((prev) => prev && ({ ...prev, audioUrl: res.data.audioUrl, fullTrack: true }));
      } else {
        setCurrentTrack((prev) => prev && ({ ...prev, audioUrl: song.previewUrl, fullTrack: false }));
      }
    } catch {
      setCurrentTrack((prev) => prev && ({ ...prev, audioUrl: song.previewUrl, fullTrack: false }));
    } finally {
      setAudioLoading(false);
    }
  };

  const playNext = () => {
    if (!currentTrack || queue.length === 0) return;
    const idx = queue.findIndex((s) => s.id === currentTrack.id);
    const next = queue[(idx + 1) % queue.length];
    if (next) playSong(next, queue);
  };

  const playPrev = () => {
    if (!currentTrack || queue.length === 0) return;
    const idx = queue.findIndex((s) => s.id === currentTrack.id);
    const prev = queue[(idx - 1 + queue.length) % queue.length];
    if (prev) playSong(prev, queue);
  };

  const toggleFavorite = (song) => {
    const exists = favorites.find((f) => f.id === song.id);
    const updated = exists ? favorites.filter((f) => f.id !== song.id) : [...favorites, song];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (songId) => favorites.some((f) => f.id === songId);

  const closePlayer = () => setCurrentTrack(null);

  return (
    <PlayerContext.Provider value={{
      currentTrack, audioLoading, audioRef, queue, favorites,
      playSong, playNext, playPrev, toggleFavorite, isFavorite, closePlayer, setQueue,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
