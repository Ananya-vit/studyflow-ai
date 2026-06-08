"use client";

import { useEffect, useState } from "react";
import { BookOpen, Home, ArrowLeft, Clipboard, Check } from "lucide-react";
import Link from "next/link";

// 🛠️ The core fix: Ensuring a clean, explicit default function export for Next.js Router
export default function SummaryPage() {
  const [mounted, setMounted] = useState(false);
  const [summary, setSummary] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedSummary = sessionStorage.getItem("studyflow_summary");
    if (storedSummary) {
      try {
        const parsed = JSON.parse(storedSummary);
        setSummary(typeof parsed === "string" ? parsed : "No readable summary data found.");
      } catch (e) {
        setSummary(storedSummary);
      }
    } else {
      setSummary("Your workspace core summary is currently empty. Please upload a document to generate content.");
    }
  }, []);

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans flex flex-col items-center p-6 md:p-12 overflow-y-auto">
      {/* Background Flow Line Decorative Accent */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,200 C300,50 500,400 900,200 C1300,0 1500,300 1900,150" fill="none" stroke="#3b82f6" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col gap-6">
        
        {/* Nav Toolbar */}
        <div className="flex justify-between items-center border-b border-zinc-900/80 pb-5">
          <Link href="/upload">
            <button className="text-xs flex items-center gap-2 text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800 px-4 py-2 rounded-xl transition-all">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Workspace
            </button>
          </Link>
          
          <button 
            onClick={handleCopy}
            className="text-xs flex items-center gap-1.5 text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800 px-4 py-2 rounded-xl transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy Text"}
          </button>
        </div>

        {/* Branding Node */}
        <div className="flex items-start gap-4 mt-2">
          <div className="p-3.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">Knowledge Asset Synthesis</span>
            <h1 className="text-2xl font-black tracking-tight text-zinc-100 mt-0.5">AI Executive Summary</h1>
          </div>
        </div>

        {/* Material Reading View */}
        <div className="border border-zinc-800 bg-zinc-950/40 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl mt-2 min-h-[300px]">
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-normal selection:bg-blue-500/30 selection:text-white">
            {summary}
          </p>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-900 pt-6 text-zinc-500 text-xs italic">
          <span>Structured from your extracted document vector sheets.</span>
          <Link href="/upload">
            <button className="text-zinc-400 hover:text-white transition-all flex items-center gap-1 not-italic font-medium">
              <Home className="w-3.5 h-3.5" /> Workspace Hub
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}