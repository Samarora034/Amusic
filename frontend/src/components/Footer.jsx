import React from "react";
import { useTheme } from "../context/ThemeContext";
import "./css/Footer.css";

function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer className={`footer ${darkMode ? "dark-mode" : ""}`}>
      <div className="footer-content">
        <p>&copy; 2024 Amusic. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
