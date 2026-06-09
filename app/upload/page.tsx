"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { UploadCloud, Sparkles, FileText, Loader2, BookOpen, Layers, HelpCircle, ArrowRight } from "lucide-react";
import AmbientWaves from "@/components/AmbientWaves";

interface GenerationResults {
  summary?: string;
  quiz?: any[];
  flashcards?: any[];
}

export default function UploadPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [results, setResults] = useState<GenerationResults | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContainerClick = () => {
    if (!isGenerating) fileInputRef.current?.click();
  };

  const triggerProcessingPipeline = async (file: File) => {
    setIsGenerating(true);
    setResults(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      setCurrentStep("Extracting knowledge assets...");
      const extractResponse = await fetch("/api/extract-pdf", {
        method: "POST",
        body: formData,
      });
      
      if (!extractResponse.ok) throw new Error("Content extraction failed");
      
      const rawExtractData = await extractResponse.json();
      console.log("1. Raw Data from PDF Extract Endpoint:", rawExtractData);

      const text = rawExtractData.text || 
                   rawExtractData.extractedText || 
                   rawExtractData.content || 
                   rawExtractData.data || 
                   (typeof rawExtractData === 'string' ? rawExtractData : "");

      if (!text || text.trim().length === 0) {
        console.error("Pipeline halt: No readable text strings found inside this document.");
        alert("The PDF parser returned an empty text layer.");
        setIsGenerating(false);
        return;
      }

      console.log(`2. Valid Text Found (${text.length} characters). Launching Groq Prompts...`);
      setCurrentStep("Awakening AI Generation Engines...");
      
      const [summaryRes, quizRes, flashcardRes] = await Promise.all([
        
        fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }).then(res => res.json()),

        fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }).then(res => res.json()),

        fetch("/api/flashcards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }).then(res => res.json())
      ]);
      console.log("========== QUIZ RAW ==========");
console.log(JSON.stringify(quizRes, null, 2));

console.log("========== FLASHCARD RAW ==========");
console.log(JSON.stringify(flashcardRes, null, 2));

      const finalSummary = summaryRes.summary || 
                           summaryRes.text || 
                           (typeof summaryRes === 'string' ? summaryRes : "Summary unavailable");
      
      let finalQuiz: any[] = [];
      if (quizRes) {
        if (Array.isArray(quizRes)) {
          finalQuiz = quizRes;
        } else if (quizRes.quiz && Array.isArray(quizRes.quiz)) {
          finalQuiz = quizRes.quiz;
        } else if (quizRes.questions && Array.isArray(quizRes.questions)) {
          finalQuiz = quizRes.questions;
        } else if (quizRes.data && Array.isArray(quizRes.data)) {
          finalQuiz = quizRes.data;
        } else if (quizRes.data?.quiz && Array.isArray(quizRes.data.quiz)) {
          finalQuiz = quizRes.data.quiz;
        } else {
          const foundArray = Object.values(quizRes).find(val => Array.isArray(val));
          if (foundArray) finalQuiz = foundArray as any[];
        }
      }

      let finalFlashcards: any[] = [];
      if (flashcardRes) {
        if (Array.isArray(flashcardRes)) {
          finalFlashcards = flashcardRes;
        } else if (flashcardRes.flashcards && Array.isArray(flashcardRes.flashcards)) {
          finalFlashcards = flashcardRes.flashcards;
        } else if (flashcardRes.cards && Array.isArray(flashcardRes.cards)) {
          finalFlashcards = flashcardRes.cards;
        } else if (flashcardRes.data && Array.isArray(flashcardRes.data)) {
          finalFlashcards = flashcardRes.data;
        } else if (flashcardRes.data?.flashcards && Array.isArray(flashcardRes.data.flashcards)) {
          finalFlashcards = flashcardRes.data.flashcards;
        } else {
          const foundArray = Object.values(flashcardRes).find(val => Array.isArray(val));
          if (foundArray) finalFlashcards = foundArray as any[];
        }
      }

      console.log("=== RE-PARSING METRICS ===");
      console.log("Extracted Quiz Array:", finalQuiz);
      console.log("Extracted Flashcard Array:", finalFlashcards);

      sessionStorage.setItem("studyflow_summary", JSON.stringify(finalSummary));
      sessionStorage.setItem("studyflow_quiz", JSON.stringify(finalQuiz));
      sessionStorage.setItem("studyflow_flashcards", JSON.stringify(finalFlashcards));

      setResults({
        summary: finalSummary,
        quiz: finalQuiz,
        flashcards: finalFlashcards
      });

    } catch (error) {
      console.error("Pipeline structural breakdown details:", error);
      alert("AI pipeline encountered an issue processing this document.");
    } finally {
      setIsGenerating(false);
      setCurrentStep("");
    }
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans flex flex-col justify-center items-center p-6 md:p-12 overflow-hidden">
      
      {/* Background Flow Ambient Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <AmbientWaves />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">
            Study <span className="bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">Workspace</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl">
            Upload study assets to synthesize concepts, compile variable active-recall decks, and configure text test parameters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* DRAG AND DROP TARGET TRIGGER */}
          <motion.div 
            onClick={handleContainerClick}
            onDragOver={(e) => { e.preventDefault(); if(!isGenerating) setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); if(e.dataTransfer.files?.[0]) triggerProcessingPipeline(e.dataTransfer.files[0]); }}
            className={`lg:col-span-4 border rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[300px] transition-all duration-300 backdrop-blur-md bg-zinc-950/40 ${
              isDragging ? "border-indigo-500 bg-indigo-500/5 shadow-[0_0_20px_rgba(79,70,229,0.15)] cursor-pointer" : "border-zinc-800 hover:border-zinc-700 cursor-pointer"
            }`}
          >
            <input type="file" ref={fileInputRef} onChange={(e) => { if(e.target.files?.[0]) { setSelectedFile(e.target.files[0]); triggerProcessingPipeline(e.target.files[0]); } }} className="hidden" accept=".pdf,.txt" />

            {!selectedFile ? (
              <>
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl mb-3 text-indigo-400">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold mb-1">Import Node Docs</h3>
                <p className="text-zinc-500 text-xs max-w-[200px]">Drop course files to awaken modules.</p>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <div className={`p-4 rounded-xl mb-3 ${isGenerating ? "bg-indigo-950 text-indigo-400 animate-spin" : "bg-emerald-950/60 text-emerald-400 border border-emerald-800"}`}>
                  {isGenerating ? <Loader2 className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                </div>
                <h3 className="text-sm font-medium mb-1 truncate max-w-[180px] text-zinc-200">{selectedFile.name}</h3>
                <span className="text-[11px] text-zinc-400 mt-1 max-w-[180px] block text-center leading-normal">
                  {isGenerating ? currentStep : "Processing completed successfully"}
                </span>
                {!isGenerating && (
                  <button onClick={(e) => { e.stopPropagation(); setSelectedFile(null); setResults(null); }} className="mt-5 text-xs text-zinc-500 hover:text-zinc-300 underline">Upload New Asset</button>
                )}
              </div>
            )}
          </motion.div>

          {/* RENDERING INTERACTIVE HUB DESK */}
          <div className="lg:col-span-8">
            {!results ? (
              <div className="border border-zinc-800/80 bg-zinc-950/20 backdrop-blur-md rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
                <div className={`p-4 rounded-2xl mb-4 ${isGenerating ? "bg-indigo-600/20 text-indigo-400 animate-pulse" : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg"}`}>
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{isGenerating ? "Synthesizing Core Concepts..." : "Workspace Core Unoccupied"}</h3>
                <p className="text-zinc-500 text-xs max-w-sm leading-relaxed">
                  {isGenerating ? "Our models are processing your document text to construct summaries, test parameters, and card metrics." : "Once you upload your local curriculum resources on the left side, the generation engines will awaken here."}
                </p>
              </div>
            ) : (
              <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                
                {/* 1. SUMMARY DISPLAY DECK */}
                <div 
                  onClick={() => router.push("/summary")} 
                  className="group p-5 border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-blue-500/50 backdrop-blur-sm rounded-xl flex flex-col justify-between gap-4 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-md"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-blue-400 font-medium text-sm">
                      <BookOpen className="w-4 h-4" /> AI Summary Generated
                    </div> 
                    <p className="text-xs text-zinc-400 line-clamp-6 leading-relaxed">{results.summary}</p>
                  </div>
                  <div className="flex items-center justify-between text-blue-400 text-xs font-semibold group-hover:text-blue-300 mt-2">
                    <span>Read Full Summary</span> <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* 2. QUIZ DISPLAY DECK */}
                <div 
                  onClick={() => router.push("/quiz")} 
                  className="group p-5 border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-purple-500/50 backdrop-blur-sm rounded-xl flex flex-col justify-between gap-6 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-md"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-purple-400 font-medium text-sm">
                      <HelpCircle className="w-4 h-4" /> AI Quiz Configured
                    </div> 
                    <p className="text-xs text-zinc-400 leading-relaxed">Extracted {results.quiz?.length || 0} testing nodes. Click to begin evaluation room.</p>
                  </div>
                  <div className="flex items-center justify-between text-purple-400 text-xs font-semibold group-hover:text-purple-300">
                    <span>Launch Quiz Room</span> <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* 3. FLASHCARD DISPLAY DECK */}
                <div 
                  onClick={() => router.push("/flashcards")} 
                  className="group p-5 border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-indigo-500/50 backdrop-blur-sm rounded-xl flex flex-col justify-between gap-6 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-md"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-indigo-400 font-medium text-sm">
                      <Layers className="w-4 h-4" /> Recall Decks Stacked
                    </div> 
                    <p className="text-xs text-zinc-400 leading-relaxed">Generated {results.flashcards?.length || 0} active-recall card vectors.</p>
                  </div>
                  <div className="flex items-center justify-between text-indigo-400 text-xs font-semibold group-hover:text-indigo-300">
                    <span>Open Flashcards</span> <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

              </motion.div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}