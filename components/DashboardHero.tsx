'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Play, Sparkles } from 'lucide-react';

export default function DashboardHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#11162b]/80 to-[#0b0e1f]/80 p-6 md:p-8 shadow-2xl backdrop-blur-md"
    >
      {/* Animated subtle inner gradient spot */}
      <div className="absolute top-0 right-0 -z-10 h-64 w-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        {/* Left message payload */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>AI Knowledge Engine Active</span>
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Welcome Back, Ananya.<br />
            <span className="bg-gradient-to-r from-indigo-200 via-purple-300 to-indigo-100 bg-clip-text text-transparent">
              Transform Knowledge Into Understanding
            </span>
          </h1>
          
          <p className="text-sm leading-relaxed text-slate-300 max-w-xl">
            Your learning loop is synchronized. You have 2 unreviewed flashcard sets and an updated biology mind map generated from your last uploaded lecture notes.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 bg-white/[0.02] px-2.5 py-1 rounded-md border border-white/[0.04]">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              <span>Current Path: AP Biology</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/[0.02] px-2.5 py-1 rounded-md border border-white/[0.04]">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span>Streak Goal: 85% Complete</span>
            </div>
          </div>
        </div>

        {/* Right side interactive command actions */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end w-full">
          {/* Interactive Drag & Drop / Click Zone */}
          <motion.div
            whileHover={{ scale: 1.01, borderColor: 'rgba(99, 102, 241, 0.4)' }}
            whileTap={{ scale: 0.99 }}
            className="flex flex-1 flex-col items-center justify-center p-5 rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02] hover:bg-indigo-500/[0.02] transition-colors cursor-pointer group text-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors text-indigo-400 mb-2.5">
              <UploadCloud className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold text-white">Upload Reference Core</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Drop PDF, EPUB or Materials up to 45MB</p>
          </motion.div>

          {/* Continue Action */}
          <motion.button
            whileHover={{ scale: 1.01, bg: 'linear-gradient(to right, #4f46e5, #6d28d9)' }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-600/10 group"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white">
                <Play className="h-3.5 w-3.5 fill-current" />
              </div>
              <div>
                <p className="text-xs font-semibold">Resume Last Session</p>
                <p className="text-[10px] text-indigo-200">Neural Sync: Cell Structure Quiz</p>
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}