"use client";

import React from "react";
import Link from "next/link";

interface AppHeaderProps {
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

export default function AppHeader({
  theme = "light",
  onToggleTheme,
}: AppHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-slate-200/60 dark:border-slate-900 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        
        {/* Brand System Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-slate-900 dark:text-white group"
        >
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-600/10 group-hover:scale-105 transition-transform">
            S
          </div>
          StudyFlow
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          <Link
            href="#features"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Features
          </Link>

          <Link
            href="/dashboard"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Dashboard
          </Link>

          <Link
            href="#saved-notes"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Saved Notes
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => onToggleTheme?.()}
            className="h-9 w-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#030712] hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 active:scale-95 transition-all text-base shadow-sm"
            aria-label="Toggle theme"
            title={`Switch to ${
              theme === "dark" ? "Light" : "Dark"
            } Mode`}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <Link
            href="/login"
            className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-2 py-1.5"
          >
            Sign In
          </Link>

          <Link
            href="/dashboard"
            className="px-4 py-2 bg-slate-950 hover:bg-slate-900 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-slate-950/10 dark:shadow-indigo-600/10 active:scale-[0.98] transition-all"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </header>
  );
}