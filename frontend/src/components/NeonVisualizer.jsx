import React, { useRef, useEffect } from "react";
import { useAudioPlayer } from "../context/AudioPlayerContext";

const NeonVisualizer = () => {
  const canvasRef = useRef(null);
  const { getFrequencyData, isPlaying, analyser } = useAudioPlayer();
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    let dataArray;
    if (analyser) {
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    } else {
      dataArray = new Uint8Array(128); // dummy
    }

    const beams = Array.from({ length: 40 }).map((_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 2 + 0.1, // depth
      thickness: Math.random() * 4 + 1,
      speed: Math.random() * 5 + 2,
    }));

    const render = () => {
      // Clear with trailing effect
      ctx.fillStyle = "rgba(19, 19, 20, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (analyser) {
        getFrequencyData(dataArray);
      }
      
      // Calculate average low-end frequency (bass)
      let bassAvg = 0;
      for (let i = 0; i < 10; i++) {
        bassAvg += dataArray[i] || 0;
      }
      bassAvg = bassAvg / 10;
      
      const bassIntensity = bassAvg / 255; // 0 to 1

      // Draw beams
      ctx.globalCompositeOperation = "screen";

      beams.forEach((beam, i) => {
        // Map bass intensity to velocity and scale
        const currentSpeed = beam.speed + (bassIntensity * 20 * beam.z);
        beam.y -= currentSpeed;
        
        if (beam.y < -100) {
          beam.y = canvas.height + 100;
          beam.x = Math.random() * canvas.width;
        }

        const width = beam.thickness * (1 + bassIntensity * 2);
        const length = 50 + (bassIntensity * 150) * beam.z;
        
        ctx.beginPath();
        ctx.moveTo(beam.x, beam.y);
        ctx.lineTo(beam.x, beam.y + length);
        
        // Neon Red/Orange Tron style
        const alpha = Math.min(1, 0.2 + bassIntensity + (beam.z * 0.2));
        ctx.lineWidth = width;
        ctx.strokeStyle = `rgba(255, 30, 0, ${alpha})`;
        ctx.lineCap = "round";
        
        // Glow effect
        ctx.shadowBlur = 15 + bassIntensity * 20;
        ctx.shadowColor = "rgba(255, 60, 0, 1)";
        
        ctx.stroke();
      });
      
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowBlur = 0;

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, [getFrequencyData, analyser, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-50"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default NeonVisualizer;
