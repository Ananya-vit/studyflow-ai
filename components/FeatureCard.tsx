'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, GraduationCap, Layers, Network, 
  Calendar, BarChart3, Upload, ArrowRight 
} from 'lucide-react';
import { FeatureItem } from '../types/dashboard';
import { Variants } from "framer-motion";
const tools: FeatureItem[] = [
  { id: '1', title: 'Upload Material', description: 'Convert text assets, lectures, and PDFs into customized knowledge structures.', icon: Upload, type: 'upload' },
  { id: '2', title: 'AI Notes', description: 'Auto-format study structures with conceptual hierarchies and semantic summaries.', icon: FileText, type: 'notes', badge: 'Refined' },
  { id: '3', title: 'Quiz Generator', description: 'Build adaptive diagnostic evaluation modules mapping key course vectors.', icon: GraduationCap, type: 'quiz' },
  { id: '4', title: 'Smart Flashcards', description: 'Leverage algorithmic spaced repetition models structured automatically.', icon: Layers, type: 'flashcards', badge: 'Active' },
  { id: '5', title: 'Mind Maps', description: 'Generate interactive 3D concept topologies and graph learning pipelines.', icon: Network, type: 'mindmap' },
  { id: '6', title: 'Study Planner', description: 'Dynamically schedule preparation calendars optimized around performance gaps.', icon: Calendar, type: 'planner' },
];

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};



const cardVariants: Variants = {
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

export default function FeatureCard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">AI Learning Modules</h2>
          <p className="text-xs text-slate-400">Select an engine tool component to launch configuration workspace</p>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.id}
              variants={cardVariants}
              whileHover={{ y: -5, borderColor: 'rgba(99, 102, 241, 0.25)', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}
              className="group relative overflow-hidden rounded-xl border border-white/[0.05] bg-[#0c1020]/40 p-5 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Internal absolute decorative accent vectors matching Notion/Linear standards */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500/5 to-purple-500/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.03] text-indigo-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-300 transition-colors duration-300 border border-white/[0.04]">
                    <Icon className="h-4 w-4" />
                  </div>
                  {tool.badge && (
                    <span className="text-[9px] font-semibold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {tool.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Functional Interactive Trigger Vector */}
              <div className="mt-5 flex items-center gap-1 text-[11px] font-medium text-slate-400 group-hover:text-white transition-colors pt-2 border-t border-white/[0.02]">
                <span>Launch Workspace</span>
                <ArrowRight className="h-3 w-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}