// src/components/MusicCard.jsx
import React from "react";
import "./css/MusicCard.css";

function MusicCard({ title, artist, coverUrl, audioUrl }) {
  return (
    <div className="music-card">
      <img src={coverUrl} alt={`${title} cover`} className="music-cover" />
      <div className="music-info">
        <h3>{title}</h3>
        <p>{artist}</p>
        <audio controls src={audioUrl}></audio>
      </div>
    </div>
  );
}

export default MusicCard;
