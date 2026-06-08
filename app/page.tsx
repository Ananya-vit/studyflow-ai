"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Sparkles, BookOpen, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StudyFlowLanding() {
  const [mounted, setMounted] = useState(false);

  // Solves the React hydration mismatch from your layout error
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans overflow-hidden flex flex-col justify-between p-6 sm:p-12">
      
      {/* ================= BACKGROUND MOVING ANIMATION STREAM ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 sm:opacity-70">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Smooth Royal Blue to Indigo to Purple Gradient matching StudyFlow */}
            <linearGradient id="studyflow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          
          {/* Wave Path 1 */}
          <motion.path
            d="M-100,520 C250,280 450,720 850,480 C1250,280 1350,620 1850,420"
            fill="none"
            stroke="url(#studyflow-grad)"
            strokeWidth="4"
            animate={{
              d: [
                "M-100,520 C250,280 450,720 850,480 C1250,280 1350,620 1850,420",
                "M-100,470 C350,380 550,520 950,420 C1150,320 1450,680 1850,480",
                "M-100,520 C250,280 450,720 850,480 C1250,280 1350,620 1850,420"
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Wave Path 2 */}
          <motion.path
            d="M-100,560 C350,320 250,680 800,520 C1250,420 1250,580 1850,480"
            fill="none"
            stroke="url(#studyflow-grad)"
            strokeWidth="2"
            opacity="0.4"
            animate={{
              d: [
                "M-100,560 C350,320 250,680 800,520 C1250,420 1250,580 1850,480",
                "M-100,510 C250,420 450,580 900,470 C1150,380 1350,540 1850,510",
                "M-100,560 C350,320 250,680 800,520 C1250,420 1250,580 1850,480"
              ]
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>

      {/* ================= BRANDING HEADER ================= */}
      <header className="relative z-10 w-full flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Study<span className="text-indigo-500">Flow</span>
        </div>
        <Link href="/dashboard">
          <button className="text-sm px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition">
            Dashboard
          </button>
        </Link>
      </header>

      {/* ================= MAIN HERO HERO CONTAINER ================= */}
      <main className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center my-auto">
        
        {/* Animated Main Title */}
        <motion.h1 
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Elevate Your Learning Process With{" "}
          <span className="block mt-2 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            StudyFlow AI
          </span>
        </motion.h1>

        {/* Feature Copy */}
        <motion.p 
          className="text-zinc-400 text-base sm:text-lg max-w-2xl mb-10 font-normal leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Upload study assets to instantly synthesize complex concepts, compile 
          variable active-recall flashcard decks, and configure targeted test parameters.
        </motion.p>

        {/* Action Button: Routes seamlessly directly to your internal /upload page */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/upload">
            <button className="group flex items-center gap-3 px-8 py-4 bg-transparent border border-indigo-500/40 hover:border-indigo-400 text-indigo-400 hover:text-indigo-300 font-medium rounded-full backdrop-blur-sm shadow-[0_0_20px_rgba(79,70,229,0.15)] transition-all duration-300 transform hover:-translate-y-0.5">
              Get Started Free
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.div>

        <span className="text-xs text-zinc-600 mt-4 block">No complex setup required</span>
      </main>

      {/* ================= FLOATING ACTION FOOTER HUB ================= */}
      <footer className="relative z-10 w-full flex justify-center items-center mt-auto">
        <div className="flex items-center gap-2 p-2 bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-lg rounded-2xl shadow-xl">
          <Link href="/">
            <button className="p-3 text-white bg-zinc-800 rounded-xl hover:bg-zinc-700/80 transition" title="Home">
              <Home className="w-5 h-5" />
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="p-3 text-zinc-500 hover:text-zinc-200 rounded-xl hover:bg-zinc-900/50 transition" title="Workspace Dashboard">
              <Sparkles className="w-5 h-5" />
            </button>
          </Link>
          <Link href="/upload">
            <button className="p-3 text-zinc-500 hover:text-zinc-200 rounded-xl hover:bg-zinc-900/50 transition" title="Upload Study Assets">
              <BookOpen className="w-5 h-5" />
            </button>
          </Link>
          <Link href="/flashcards">
            <button className="p-3 text-zinc-500 hover:text-zinc-200 rounded-xl hover:bg-zinc-900/50 transition" title="Flashcard Decks">
              <Layers className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </footer>

    </div>
  );
}