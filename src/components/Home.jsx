import React from "react";
import { useTheme } from "../context/ThemeContext";
import "./css/Home.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Home() {
  const { darkMode } = useTheme();

  return (
    <div className={`home-container ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar isHome={true}/>
      <div className="home-content">
        <Sidebar />
        <main className="main-content">
          <section className="featured-section">
            <h2>Featured Playlists</h2>
            <div className="playlist-grid">
              {/* Add playlist cards here */}
            </div>
          </section>
          
          <section className="recent-plays">
            <h2>Recently Played</h2>
            <div className="track-list">
              {/* Add recent tracks here */}
            </div>
          </section>
          
          <section className="recommendations">
            <h2>Recommended for You</h2>
            <div className="recommendation-grid">
              {/* Add recommended content here */}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
