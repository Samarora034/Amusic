import "./css/Navbar.css";
import React from "react";
import { useEffect } from "react";
import { Darkmode } from "./Darkmode";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar({ setToggle, isHome }) {
  const { darkMode, toggleDarkMode } = useTheme();
  useEffect(() => {
    if (setToggle) {
      setToggle(darkMode);
    }
  }, [darkMode]);

  return (
    <nav className={`navbar`}>
      <div className="navbar-brand">
        <Link to="/" className={`logo ${isHome?"home-logo":""}`}>
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
      <Darkmode toggle={darkMode} setToggle={toggleDarkMode} />
    </nav>
  );
}

export default Navbar;
