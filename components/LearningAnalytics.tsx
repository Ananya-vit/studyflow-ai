'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Clock, CheckCircle, TrendingUp } from 'lucide-react';

export default function LearningAnalytics() {
  const weeklyData = [
    { day: 'Mon', hours: 2.4 },
    { day: 'Tue', hours: 4.1 },
    { day: 'Wed', hours: 3.8 },
    { day: 'Thu', hours: 5.2 },
    { day: 'Fri', hours: 1.8 },
    { day: 'Sat', hours: 4.5 },
    { day: 'Sun', hours: 3.2 },
  ];

  return (
    <div className="rounded-xl border border-white/[0.05] bg-[#0c1020]/40 p-5 backdrop-blur-sm space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight">Metrics & Engagement Intelligence</h2>
          <p className="text-[11px] text-slate-400">Evaluated learning patterns across current course pools</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] p-1 text-[10px] text-slate-300">
          <button className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md font-medium">Weekly</button>
          <button className="px-2 py-0.5 hover:text-white transition-colors">Monthly</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Weekly Bar Chart Diagram Visual */}
        <div className="md:col-span-7 flex flex-col justify-between h-44 pt-4">
          <div className="flex items-end justify-between h-32 px-2">
            {weeklyData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                <div className="relative w-full px-1.5 flex justify-center">
                  {/* Tooltip dynamic hover look */}
                  <div className="absolute -top-7 scale-0 group-hover:scale-100 transition-all bg-indigo-600 text-white font-mono text-[9px] px-1.5 py-0.5 rounded shadow pointer-events-none">
                    {data.hours}h
                  </div>
                  {/* Visual Chart Column Bar */}
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.hours / 6) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.04 }}
                    className="w-2.5 rounded-t bg-gradient-to-t from-indigo-600 to-purple-500 group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300"
                  />
                </div>
                <span className="text-[10px] font-medium text-slate-400">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight Diagnostic Summary Card */}
        <div className="md:col-span-5 flex flex-col justify-between p-4 rounded-xl bg-white/[0.01] border border-white/[0.03]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Cognitive Processing Model</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your conceptual retention vectors peak during <strong>Morning Study Blocks</strong>. Quiz response velocity increased by 14% on topics mapped via <strong>AI Mind Maps</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-slate-400 border-t border-white/[0.03]">
            <div>
              <p>Accuracy Target</p>
              <p className="text-white font-semibold text-xs mt-0.5">88.4% Average</p>
            </div>
            <div>
              <p>Active Syllabus Focus</p>
              <p className="text-white font-semibold text-xs mt-0.5">Molecular Bio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}