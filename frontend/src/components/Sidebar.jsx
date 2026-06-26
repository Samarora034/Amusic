import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* Side Navigation Bar (Desktop) */}
      <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-surface border-r border-outline-variant/20 flex-col py-margin-desktop px-unit z-50">
        <div className="mb-12 px-4">
          <h1 className="font-display-lg text-[36px] font-black text-primary-container tracking-tight">Amusic</h1>
          <p className="text-on-surface-variant font-label-sm mt-1">your vibe, your rules.</p>
        </div>
        
        <nav className="flex-1 space-y-1 px-2">
          <Link
            to="/home"
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all active:scale-95 ${
              currentPath === "/home"
                ? "text-primary font-bold bg-surface-container-highest shadow-sm"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest/50"
            }`}
          >

            <span>Home</span>
          </Link>
          
          <Link
            to="/explore"
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all active:scale-95 ${
              currentPath === "/explore"
                ? "text-primary font-bold bg-surface-container-highest shadow-sm"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest/50"
            }`}
          >

            <span>Explore</span>
          </Link>
          
          <Link
            to="/library"
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all active:scale-95 ${
              currentPath === "/library"
                ? "text-primary font-bold bg-surface-container-highest shadow-sm"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest/50"
            }`}
          >

            <span>Library</span>
          </Link>
        </nav>
        
        <div className="mt-auto px-4 pt-6 border-t border-outline-variant/20">
          <p className="text-on-surface-variant/50 text-[11px] text-center">made for music lovers, not algorithms.</p>
        </div>
      </aside>

      {/* Mobile Navigation (Bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-[60] bg-surface-container/90 backdrop-blur-xl border-t border-white/5 h-16 flex justify-around items-center">
        <Link to="/home" className={`flex flex-col items-center gap-1 ${currentPath === "/home" ? "text-primary-container" : "text-on-surface-variant"}`}>

          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link to="/explore" className={`flex flex-col items-center gap-1 ${currentPath === "/explore" ? "text-primary-container" : "text-on-surface-variant"}`}>

          <span className="text-[10px] font-bold">Explore</span>
        </Link>
        <Link to="/library" className={`flex flex-col items-center gap-1 ${currentPath === "/library" ? "text-primary-container" : "text-on-surface-variant"}`}>

          <span className="text-[10px] font-bold">Library</span>
        </Link>
      </nav>
    </>
  );
}

export default Sidebar;
