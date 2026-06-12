'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Award, Layers, Hourglass } from 'lucide-react';
import { StatItem } from '../types/dashboard';
import { Variants } from "framer-motion";


const statsData: StatItem[] = [
  { label: 'Documents Processed', value: 14, change: '+3 this week', isPositive: true, color: 'text-indigo-400', icon: FileText },
  { label: 'Active Study Streak', value: 8, suffix: ' Days', change: 'Top 5% of Students', isPositive: true, color: 'text-amber-400', icon: Award },
  
] as any;

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};


const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};
export default function StudyStats() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-4 lg:grid-cols-4"
    >
      {statsData.map((stat, i) => {
        const Icon = (stat as any).icon;
        return (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.12)' }}
            className="relative overflow-hidden rounded-xl border border-white/[0.05] bg-[#0c1020]/60 p-4 shadow-lg backdrop-blur-sm transition-colors duration-300"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 truncate">
                {stat.label}
              </span>
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.02] ${stat.color}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-xl font-bold tracking-tight text-white">
                {stat.value}
              </span>
              {stat.suffix && (
                <span className="text-xs font-medium text-slate-400">{stat.suffix}</span>
              )}
            </div>

            <div className="mt-1 flex items-center justify-between text-[10px]">
              <span className="text-slate-400 truncate">{stat.change}</span>
              <span className="font-medium text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded">Sync</span>
            </div>

            {/* Bottom accent glow layer */}
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
          </motion.div>
        );
      })}
    </motion.div>
  );
}