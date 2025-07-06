// frontend/src/components/Hero.jsx
import React from "react";
import "./css/Hero.css";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Discover the Sound of Your Soul</h1>
        <p>Stream your favorite tracks and discover new music tailored just for you.</p>
        <button className="hero-button">Play Featured Track</button>
      </div>
    </section>
  );
}

export default Hero;
