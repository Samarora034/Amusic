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
      <Darkmode toggle={darkMode} setToggle={toggleDarkMode} />
    </nav>
  );
}

export default Navbar;
