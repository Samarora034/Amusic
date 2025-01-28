import React from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

export const Darkmode = ({toggle, setToggle}) => {

  return (
    <div className="mode-toggle">
      <button
        onClick={() => setToggle(!toggle)}
        className="theme-toggle-btn">
        <i className={`fas ${toggle ? "fa-sun" : "fa-moon"}`}>
          {toggle ? <MdDarkMode /> : <MdLightMode />}
        </i>
      </button>
    </div>
  );
};