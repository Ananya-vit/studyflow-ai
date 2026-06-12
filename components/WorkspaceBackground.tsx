"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
}

interface ShootingStar {
  id: number;
  top: string;
  left: string;
  delay: number;
}

export default function WorkspaceBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  // Generate stable random stars once on mount to prevent SSR hydration mismatches
  useEffect(() => {
    const generatedStars: Star[] = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      // Random positioning across the viewport
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      // Premium variation: mostly tiny 1px stars, occasional 2px stars
      size: Math.random() > 0.85 ? 2 : 1,
      // Varying animation speeds for organic twinkling
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 4,
    }));
    setStars(generatedStars);
  }, []);

  // Manage random shooting stars loop
  useEffect(() => {
    const createShootingStar = () => {
      setShootingStars((prev) => {
        // Strict cap at maximum 2 shooting stars simultaneously to maintain minimal aesthetic
        if (prev.length >= 2) return prev;
        
        return [
          ...prev,
          {
            id: Date.now(),
            // Constrain spawn points to top/left quadrant so they glide elegantly across the screen
            top: `${Math.random() * 40}%`,
            left: `${Math.random() * 60}%`,
            delay: Math.random() * 2,
          },
        ];
      });
    };

    // Initial trigger
    const initialTimeout = setTimeout(createShootingStar, 2000);

    // Elegant SaaS cadence: triggers a check every 6 to 8 seconds
    const interval = setInterval(() => {
      createShootingStar();
    }, 6000 + Math.random() * 2000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Clean up shooting stars after their animation completes
  const handleShootingStarComplete = (id: number) => {
    setShootingStars((prev) => prev.filter((star) => star.id !== id));
  };

  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-[#000000]">
      {/* Subtle, Ambient Indigo/Purple Glows */}
      <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-900/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-purple-900/10 blur-[140px] pointer-events-none" />

      {/* 150 Tiny Twinkling Stars */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.15, 0.8, 0.15],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Premium Elegant Shooting Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {shootingStars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute h-[1px] w-[120px] bg-gradient-to-r from-transparent via-indigo-200/40 to-white"
              style={{
                top: star.top,
                left: star.left,
                transform: "rotate(-45deg)",
                transformOrigin: "left center",
                // Creates a sharp head and a long, smooth trailing fade
                clipPath: "polygon(0% 0%, 100% 45%, 100% 55%, 0% 100%)",
              }}
              initial={{ 
                x: -50, 
                y: -50, 
                opacity: 0, 
                scaleX: 0 
              }}
              animate={{
                x: 350,
                y: 350,
                opacity: [0, 0.35, 0.35, 0],
                scaleX: [1, 1.2, 0.8],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.4,
                delay: star.delay,
                ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth ease-out
              }}
              onAnimationComplete={() => handleShootingStarComplete(star.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}