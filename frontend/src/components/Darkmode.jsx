import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export const Darkmode = ({ toggle, setToggle }) => {
  return (
    <div className="mode-toggle">
      <button onClick={() => setToggle(!toggle)} className="theme-toggle-btn" aria-label="Toggle dark mode">
        {toggle ? <MdDarkMode /> : <MdLightMode />}
      </button>
    </div>
  );
};
