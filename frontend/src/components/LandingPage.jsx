import React, { useState, useEffect } from "react";
import Footer from "./Footer.jsx";
import "./css/LandingPage.css";
import { Link } from "react-router-dom";
import { Darkmode } from "./Darkmode.jsx";

function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference on mount
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);
  }, []);

  return (
    <div className={`landing-container ${darkMode ? "dark-mode" : ""}`}>
      <header className="landing-header">
        <Darkmode toggle = {darkMode} setToggle = {setDarkMode}/>
        <h1>
          Amusic<sup style={{ fontSize: "1rem" }}>&copy;</sup>
        </h1>
        <h3>Music You Found Amusing</h3>
      </header>

      <main className="landing-main">
        <section className="hero-section">
          <h2>Discover, Stream, and Share Your Favorite Music</h2>
          <p>Join millions of music lovers on Amusic and enjoy:</p>

          <div className="features-grid">
            <div className="feature-item">
              <i className="fas fa-music"></i>
              <h4>Unlimited Streaming</h4>
              <p>Access millions of songs anytime, anywhere</p>
            </div>

            <div className="feature-item">
              <i className="fas fa-headphones"></i>
              <h4>High Quality Audio</h4>
              <p>Experience crystal clear sound quality</p>
            </div>

            <div className="feature-item">
              <i className="fas fa-users"></i>
              <h4>Social Features</h4>
              <p>Share playlists and connect with friends</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Start Your Musical Journey?</h2>
          <p>Join Amusic today and get access to unlimited music streaming!</p>
          <div className="cta-buttons">
            <Link to="/register" className="primary-button">
              Sign Up Now
            </Link>
            <Link to="/login" className="secondary-button">
              Already have an account? Login
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
