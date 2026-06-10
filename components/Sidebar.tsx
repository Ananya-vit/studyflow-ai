'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, FileText, GraduationCap, 
  Layers, Network, Calendar, BarChart3, Settings, HelpCircle, GraduationCap as LogoIcon
} from 'lucide-react';
import { NavItem } from '../types/dashboard';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const navigationItems: NavItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'AI Notes', icon: FileText, id: 'notes' },
  { name: 'Quizzes', icon: GraduationCap, id: 'quizzes' },
  { name: 'Flashcards', icon: Layers, id: 'flashcards' },
  { name: 'Mind Maps', icon: Network, id: 'mindmaps' },
  { name: 'Study Planner', icon: Calendar, id: 'planner' },
  { name: 'Analytics', icon: BarChart3, id: 'analytics' },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="fixed bottom-0 top-0 left-0 z-40 hidden w-64 border-r border-white/[0.06] bg-[#090d1a]/60 backdrop-blur-xl md:block">
      <div className="flex h-full flex-col justify-between p-6">
        <div>
          {/* Logo Brand Core */}
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20">
              <LogoIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white">StudyFlow</span>
              <span className="ml-1 text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded-full">AI</span>
            </div>
          </div>

          {/* Navigation Links Layer */}
          <nav className="mt-8 space-y-1.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="group relative flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300"
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/10 border border-indigo-500/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`h-4 w-4 transition-colors duration-300 ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  <span className={`relative transition-colors duration-300 ${isActive ? 'text-white font-semibold' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {item.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Elements */}
        <div className="space-y-1.5 border-t border-white/[0.06] pt-4">
          <button className="group flex w-full items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors">
            <Settings className="h-4 w-4 text-slate-400 group-hover:text-slate-200" />
            <span>Settings</span>
          </button>
          <button className="group flex w-full items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors">
            <HelpCircle className="h-4 w-4 text-slate-400 group-hover:text-slate-200" />
            <span>Help Center</span>
          </button>

          {/* Connected Student Profile Slot */}
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/[0.04] p-2.5">
            <div className="relative h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 p-[1.5px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0d111c] text-[11px] font-bold text-white">
                AN
              </div>
              <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-[#0d111c] bg-emerald-500" />
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-xs font-semibold text-white">Ananya</p>
              <p className="truncate text-[10px] text-slate-400">Premium Scholar</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}