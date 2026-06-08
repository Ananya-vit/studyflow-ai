"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layers, RotateCw, ChevronLeft, ChevronRight, Home, AlertCircle } from "lucide-react";
import Link from "next/link";

interface FlashcardItem {
  front: string;
  back: string;
}

export default function FlashcardsPage() {
  const [mounted, setMounted] = useState(false);
  const [cards, setCards] = useState<FlashcardItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedCards = sessionStorage.getItem("studyflow_flashcards");
    
    if (storedCards) {
      try {
        const parsed = JSON.parse(storedCards);
        const targetArray = Array.isArray(parsed) ? parsed : (parsed.flashcards || parsed.cards || []);

        const standardized = targetArray.map((c: any) => ({
          front: c.front || c.question || c.term || c.concept || "Empty Term Node",
          back: c.back || c.answer || c.definition || c.explanation || "Empty Definition Breakdown"
        })).filter((c: FlashcardItem) => c.front && c.back);

        setCards(standardized);
      } catch (e) {
        console.error("Failed to map flashcard vectors", e);
      }
    }
  }, []);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
    }, 150);
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-zinc-600 mb-4 animate-pulse" />
        <h2 className="text-xl font-bold mb-2">Recall Deck Unoccupied</h2>
        <p className="text-zinc-500 text-xs max-w-sm mb-6">Please process your local assets in the workspace to stack card vectors.</p>
        <Link href="/upload"><button className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-semibold hover:bg-zinc-800 transition">Go to Workspace</button></Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans flex flex-col justify-center items-center p-6 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,450 C300,250 400,650 800,450 C1200,250 1300,550 1900,400" fill="none" stroke="#2563eb" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center px-2">
          <span className="text-xs text-zinc-500 font-medium flex items-center gap-1.5 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-blue-400" /> Deck Stack: {currentIndex + 1} / {cards.length}
          </span>
          <Link href="/upload"><button className="text-xs flex items-center gap-1 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full transition"><Home className="w-3.5 h-3.5" /> Workspace</button></Link>
        </div>

        <div onClick={() => setIsFlipped(!isFlipped)} className="w-full h-80 perspective cursor-pointer group">
          <motion.div className="w-full h-full relative preserve-3d duration-500" animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.35, ease: "easeInOut" }}>
            
            {/* FRONT NODE */}
            <div className="absolute inset-0 w-full h-full border border-zinc-800 bg-zinc-950/60 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between backface-hidden shadow-2xl">
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">Concept Core</span>
              <div className="my-auto text-center"><h3 className="text-xl md:text-2xl font-bold tracking-tight px-2 text-zinc-100">{cards[currentIndex]?.front}</h3></div>
              <div className="text-zinc-600 group-hover:text-zinc-400 text-xs flex items-center justify-center gap-1.5 transition duration-300"><RotateCw className="w-3.5 h-3.5" /> Click space to flip vector</div>
            </div>

            {/* BACK NODE */}
            <div className="absolute inset-0 w-full h-full border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between backface-hidden shadow-2xl" style={{ transform: "rotateY(180deg)" }}>
              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">AI Synthesized Definition</span>
              <div className="my-auto text-center px-2"><p className="text-zinc-300 text-sm md:text-base leading-relaxed">{cards[currentIndex]?.back}</p></div>
              <div className="text-zinc-600 text-xs flex items-center justify-center gap-1.5"><RotateCw className="w-3.5 h-3.5" /> Click space to flip back</div>
            </div>

          </motion.div>
        </div>

        <div className="flex justify-between items-center gap-4">
          <button onClick={handlePrev} className="p-3 border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 rounded-xl text-zinc-400 hover:text-white transition"><ChevronLeft className="w-5 h-5" /></button>
          <span className="text-xs text-zinc-600 italic">Challenge retrieval memory before flipping.</span>
          <button onClick={handleNext} className="p-3 border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 rounded-xl text-zinc-400 hover:text-white transition"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
}