import React, { useState, useEffect } from "react";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const move = (e) => { setPos({ x: e.clientX, y: e.clientY }); setHidden(false); };
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setHidden(true);

    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] mix-blend-difference transition-transform duration-75"
      style={{ left: pos.x - 10, top: pos.y - 10, transform: clicking ? "scale(0.6)" : "scale(1)" }}
    >
      <div className="w-5 h-5 rounded-full border-2 border-white opacity-80" />
    </div>
  );
};

export default CustomCursor;
