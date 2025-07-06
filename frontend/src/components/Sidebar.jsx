// frontend/src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./css/Sidebar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <IoMdClose /> : <GiHamburgerMenu />}
      </button>
      <div className={`sidebar ${isOpen ? "" : "closed"}`}>
        <div className="sidebar-header">
          <h3>Your Library</h3>
        </div>
        <div className="playlists-section">
          <div className="playlists-header">
            <h4>Playlists</h4>
            <button className="create-playlist-btn">+ Create Playlist</button>
          </div>
          <div className="playlists-list">
            <div className="playlist-item">My Favorite Songs</div>
            <div className="playlist-item">Workout Mix</div>
            <div className="playlist-item">Chill Vibes</div>
          </div>
        </div>
        <div className="sidebar-footer">
          <Link to="/profile" className="profile-link">
            Profile
          </Link>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
