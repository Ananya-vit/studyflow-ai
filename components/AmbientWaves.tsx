"use client";

import { useEffect, useRef } from "react";

interface WaveConfig {
  baseY: number;
  amplitude: number;
  speed: number;
  frequency: number;
  color: string;
  lineWidth: number;
}

export default function AmbientWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let increment = 0;

    // Configuration arrays matching the distinct colored lines from the interface
    const waves: WaveConfig[] = [
      {
        baseY: 0.7, // Percentage position down the canvas
        amplitude: 25,
        speed: 0.008,
        frequency: 0.005,
        color: "rgba(168, 85, 247, 0.4)", // Bright Purple line
        lineWidth: 2,
      },
      {
        baseY: 0.72,
        amplitude: 35,
        speed: 0.012,
        frequency: 0.003,
        color: "rgba(59, 130, 246, 0.3)", // Blue harmonic line
        lineWidth: 1.5,
      },
      {
        baseY: 0.68,
        amplitude: 20,
        speed: 0.006,
        frequency: 0.007,
        color: "rgba(6, 182, 212, 0.25)", // Cyan trace line
        lineWidth: 1,
      },
      {
        baseY: 0.74,
        amplitude: 15,
        speed: 0.015,
        frequency: 0.004,
        color: "rgba(139, 92, 246, 0.15)", // Deep Indigo background wave
        lineWidth: 3,
      },
    ];

    // Handle high-DPI displays safely to ensure sharp rendering lines
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Core animation render loop
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Render each configured active vector wave path
      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.lineWidth = wave.lineWidth;
        ctx.strokeStyle = wave.color;

        // Draw mathematical sine progression across horizontal width
        for (let x = 0; x < rect.width; x++) {
          const y =
            rect.height * wave.baseY +
            Math.sin(x * wave.frequency + increment * (wave.speed * 100)) *
              wave.amplitude *
              Math.sin(increment + x * 0.001); // Complex modulation overlay

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      increment += 0.01;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 select-none opacity-80"
    />
  );
}