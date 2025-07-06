// frontend/src/components/Home.jsx
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "./css/Home.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Hero from "./Hero";
import MusicCard from "./MusicCard"; // reusable
import musicData from "../assets/Data/musicData"; // local or backend

function Home() {
  const { darkMode } = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className={`home-container ${darkMode ? "dark-mode" : ""}`}>
      {isSidebarOpen && (
        <div className="blur-overlay" onClick={toggleSidebar} />
      )}
      <Navbar onMenuClick={toggleSidebar} isHome={true} />
      <Hero />
      <div className="home-content">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="main-content">
          {/* Featured Playlists */}
          <section className="featured-section">
            <h2>Featured Playlists</h2>
            <div className="playlist-grid">
              {musicData.slice(0, 4).map((item, i) => (
                <MusicCard key={i} {...item} />
              ))}
            </div>
          </section>

          {/* Recently Played */}
          <section className="recent-plays">
            <h2>Recently Played</h2>
            <div className="track-list">
              {musicData.slice(4, 7).map((item, i) => (
                <MusicCard key={i} {...item} />
              ))}
            </div>
          </section>

          {/* Recommendations */}
          <section className="recommendations">
            <h2>Recommended for You</h2>
            <div className="recommendation-grid">
              {musicData.slice(7).map((item, i) => (
                <MusicCard key={i} {...item} />
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
