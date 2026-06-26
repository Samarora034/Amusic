import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar({ isHome }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const currentPath = location.pathname;

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-none z-50 transition-all">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full z-50 max-w-container-max mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display-sm text-[32px] md:text-display-sm font-extrabold text-primary">
            Amusic
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/home"
              className={`${
                currentPath === "/home"
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-on-surface-variant font-medium hover:text-primary"
              } transition-colors duration-300`}
            >
              Discover
            </Link>
            <Link
              to="/explore"
              className={`${
                currentPath === "/explore"
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-on-surface-variant font-medium hover:text-primary"
              } transition-colors duration-300`}
            >
              Explore
            </Link>
            <Link
              to="/library"
              className={`${
                currentPath === "/library"
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-on-surface-variant font-medium hover:text-primary"
              } transition-colors duration-300`}
            >
              Library
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:flex text-on-surface-variant hover:text-primary transition-colors duration-300 font-bold">
            [ SEARCH ]
          </button>
          
          <button 
            onClick={toggleDarkMode}
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 px-3 py-1 font-bold rounded-full glass-card"
            title="Toggle Theme"
          >
            <span>
              {darkMode ? "[ LIGHT ]" : "[ DARK ]"}
            </span>
          </button>

          {isHome || localStorage.getItem("token") ? (
            <button
              onClick={handleLogout}
              className="font-label-md text-label-md bg-surface-variant text-on-surface px-6 py-2 rounded-full hover:bg-error hover:text-on-error transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="font-label-md text-label-md bg-primary-container text-black px-6 py-2 rounded-full hover:shadow-[0_0_15px_rgba(255,107,0,0.4)] transition-all duration-300"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden text-on-surface font-bold">
            [ MENU ]
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
