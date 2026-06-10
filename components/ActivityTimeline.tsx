'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileUp, FileCheck, CheckCircle2, Award, ArrowUpRight } from 'lucide-react';
import { TimelineItem } from '../types/dashboard';

const activityData: TimelineItem[] = [
  { id: '1', type: 'upload', title: 'Neuroanatomy_Lec4.pdf', timestamp: '14 mins ago', status: 'Synthesized to Mind Map' },
  { id: '2', type: 'quiz', title: 'Cell Biology Comprehensive Diagnostic', timestamp: '2 hours ago', status: 'Scored 94% (+120 XP)' },
  { id: '3', type: 'notes', title: 'Organic Chemistry II Synthesized Matrix', timestamp: 'Yesterday', status: 'Formatted with Core AI Summaries' },
  { id: '4', type: 'flashcards', title: 'Immunology Terminology Deck', timestamp: '2 days ago', status: 'Spaced repetition pool active' },
];

export default function ActivityTimeline() {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-[#0c1020]/40 p-5 backdrop-blur-sm space-y-4">
      <div>
        <h2 className="text-sm font-bold text-white tracking-tight">Active Learning Pipeline</h2>
        <p className="text-[11px] text-slate-400">Real-time state logs of local AI ingestion nodes</p>
      </div>

      <div className="relative pl-4 space-y-5 before:absolute before:bottom-2 before:top-2 before:left-[7px] before:w-[1px] before:bg-white/[0.06]">
        {activityData.map((item, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              key={item.id}
              className="relative flex items-start justify-between gap-3 group"
            >
              {/* Node Indicator */}
              <div className="absolute -left-[13px] top-1 h-2.5 w-2.5 rounded-full border border-[#070913] bg-indigo-500 shadow-sm shadow-indigo-500/50 group-hover:scale-125 transition-transform" />
              
              <div className="space-y-0.5 max-w-[80%]">
                <span className="text-[10px] font-medium text-slate-400 block tracking-tight">
                  {item.timestamp}
                </span>
                <p className="text-xs font-semibold text-white truncate group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-400 font-medium">
                  {item.status}
                </p>
              </div>

              <button className="opacity-0 group-hover:opacity-100 p-1 rounded bg-white/[0.02] text-slate-400 hover:text-white transition-all">
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}