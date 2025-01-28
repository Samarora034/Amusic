import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./css/Navbar.css";

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className={`navbar ${darkMode ? "dark-mode" : ""}`}>
      <div className="navbar-brand">
        <Link to="/" className="logo">
          Amusic
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/home" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/register" className="nav-link">
            Register/Login
          </Link>
        </li>
      </ul>
      <div className="theme-toggle">
        <button onClick={toggleDarkMode} className="theme-toggle-btn">
          <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
