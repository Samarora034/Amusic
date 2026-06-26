import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import axios from "axios";

const AudioPlayerContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || "https://amusic-hm8o.onrender.com";

export function AudioPlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [volume, setVolume] = useState(1);

  // Audio elements
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    // Create the audio element
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
    };
  }, []);

  const initWebAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      sourceRef.current = source;
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const playSong = async (song) => {
    setCurrentTrack(song);
    setAudioLoading(true);
    
    // We must initialize audio context after a user interaction
    initWebAudio();

    try {
      const res = await axios.get(
        `${API_URL}/api/songs/stream/${encodeURIComponent(song.title + " " + song.artist)}`,
        { timeout: 10000 }
      );
      
      const audioUrl = res.data.audioUrl || song.previewUrl;
      const isFullTrack = !!res.data.audioUrl;
      
      setCurrentTrack((prev) => ({ ...prev, audioUrl, fullTrack: isFullTrack }));
      
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      await audioRef.current.play();
      
    } catch (err) {
      console.error("Playback error:", err);
      setCurrentTrack((prev) => ({ ...prev, audioUrl: song.previewUrl, fullTrack: false }));
      audioRef.current.src = song.previewUrl;
      audioRef.current.load();
      await audioRef.current.play().catch(e => console.error(e));
    } finally {
      setAudioLoading(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    initWebAudio();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error(e));
    }
  };

  const handleVolumeChange = (newVolume) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const getFrequencyData = (dataArray) => {
    if (analyserRef.current && isPlaying) {
      analyserRef.current.getByteFrequencyData(dataArray);
    } else {
      // Return zeroes if not playing
      for (let i = 0; i < dataArray.length; i++) {
        dataArray[i] = 0;
      }
    }
  };

  const value = {
    currentTrack,
    isPlaying,
    audioLoading,
    volume,
    playSong,
    togglePlay,
    handleVolumeChange,
    getFrequencyData,
    analyser: analyserRef.current,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  return useContext(AudioPlayerContext);
}
