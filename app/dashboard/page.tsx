'use client';

import React, { useState } from 'react';
import WorkspaceBackground from "@/components/WorkspaceBackground";
import Sidebar from '@/components/Sidebar'; // Using the updated premium sidebar
import DashboardHero from '@/components/DashboardHero';
import StudyStats from '@/components/StudyStats';
import FeatureCard from '@/components/FeatureCard';
import LearningAnalytics from '@/components/LearningAnalytics';
import { Menu, Search, Bell, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-white antialiased overflow-x-hidden">
      {/* Premium Ambient Background Network Node Layer */}
      <WorkspaceBackground />

      {/* Structural Layout Wrapper */}
      <div className="flex">
        {/* Updated Sidebar Context */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Primary Workspace Frame */}
        <div className="flex-1 md:pl-64 min-h-screen flex flex-col transition-all duration-300">
          
          {/* Top Floating Glass Header Controller */}
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/[0.04] bg-black/80 px-4 backdrop-blur-md md:px-8">
            <div className="flex items-center gap-3 w-full max-w-md">
              <button className="rounded-lg p-1.5 text-slate-400 hover:bg-white/[0.02] hover:text-white md:hidden">
                <Menu className="h-4 w-4" />
              </button>
              
              {/* Global Context Workspace Search Bar */}
              <div className="relative w-full hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search resources, generated flashcards, or semantic vectors..." 
                  className="w-full rounded-lg bg-white/[0.02] border border-white/[0.05] py-1.5 pl-9 pr-4 text-xs text-slate-200 placeholder:text-slate-500 focus:border-indigo-500/40 focus:bg-white/[0.04] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Action Tools Cluster Right */}
            <div className="flex items-center gap-3">
              <button className="relative rounded-lg p-1.5 text-slate-400 hover:bg-white/[0.02] hover:text-white transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
              </button>
              
              <div className="h-4 w-[1px] bg-white/[0.06]" />

              <div className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 px-2.5 py-1 text-xs font-semibold text-indigo-300 shadow-sm">
                <Sparkles className="h-3 w-3 text-purple-400" />
                <span>StudyFlow Premium</span>
              </div>
            </div>
          </header>

          {/* Main Dashboard Panel Workspace Grid */}
          <main className="flex-1 p-4 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
            
            {/* Section 1: Top Hero Welcome Spotlight */}
            <DashboardHero />

            {/* Section 2: Core Academic Stats Matrix Display Layout */}
            <StudyStats />

            {/* Section 3: Dual Column Learning Ecosystem Space Layout */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              
              {/* Left Primary Core Column Stack */}
              <div className="lg:col-span-8 space-y-6">
                <FeatureCard />
                <LearningAnalytics />
              </div>

              {/* Right Diagnostic Metric Pipeline Feeds */}
              <div className="lg:col-span-4 space-y-6">
               
                
              </div>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}