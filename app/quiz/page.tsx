"use client";

import { useEffect, useState } from "react";
import { HelpCircle, Home, ArrowLeft, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function QuizPage() {
  const [mounted, setMounted] = useState(false);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Read from the exact operational cache key written by the upload desk
    const cachedData = sessionStorage.getItem("studyflow_quiz");
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        // Ensure the parsed object resolves directly to an array structure
        if (Array.isArray(parsed)) {
          setQuiz(parsed);
        } else if (parsed && Array.isArray(parsed.quiz)) {
          setQuiz(parsed.quiz);
        } else {
          setQuiz([]);
        }
      } catch (e) {
        console.error("Failed to parse cached quiz matrix:", e);
        setQuiz([]);
      }
    }
  }, []);

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted || quiz.length === 0) return;

    const currentQuestion = quiz[currentIdx];
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setIsSubmitted(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);

    if (currentIdx + 1 < quiz.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  // EMPTY STATE LAYOUT: Only shown if the array is genuinely non-existent
  if (quiz.length === 0) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-purple-400 mb-4 animate-pulse">
          <HelpCircle className="w-full h-full" />
        </div>
        <h2 className="text-xl font-bold tracking-tight mb-2">No Active Quiz Vectors Found</h2>
        <p className="text-zinc-500 text-xs max-w-sm leading-relaxed mb-6">
          Please process a document asset inside the workspace hub to generate persistent layout questions.
        </p>
        <Link href="/upload">
          <button className="text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 px-5 py-2.5 rounded-xl transition-all">
            Return to Workspace
          </button>
        </Link>
      </div>
    );
  }

  const currentQuestion = quiz[currentIdx];

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans flex flex-col items-center p-6 md:p-12 overflow-y-auto">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 mt-4">
        
        {/* Navigation Row */}
        <div className="flex justify-between items-center border-b border-zinc-900 pb-5">
          <Link href="/upload">
            <button className="text-xs flex items-center gap-2 text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800 px-4 py-2 rounded-xl transition-all">
              <ArrowLeft className="w-3.5 h-3.5" /> Workspace Hub
            </button>
          </Link>
          <div className="text-xs font-mono px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg">
            Score Matrix: {score} / {quiz.length}
          </div>
        </div>

        {!quizComplete ? (
          <div className="flex flex-col gap-6">
            {/* Question Tracker Badge */}
            <div className="flex items-center justify-between text-xs font-medium text-zinc-500">
              <span className="uppercase tracking-wider font-bold text-purple-400">Knowledge Validation Mode</span>
              <span>Question {currentIdx + 1} of {quiz.length}</span>
            </div>

            {/* Question Shell View */}
            <div className="border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md p-6 md:p-8 rounded-2xl">
              <h2 className="text-lg md:text-xl font-medium tracking-tight leading-relaxed text-zinc-100">
                {currentQuestion?.question}
              </h2>
            </div>

            {/* Interactive Answer Matrix */}
            <div className="flex flex-col gap-3">
              {currentQuestion?.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const isCorrect = option === currentQuestion.correctAnswer;
                
                let optionStyle = "border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/70 text-zinc-300";
                if (isSelected && !isSubmitted) optionStyle = "border-purple-500 bg-purple-500/10 text-purple-300";
                if (isSubmitted && isCorrect) optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-medium";
                if (isSubmitted && isSelected && !isCorrect) optionStyle = "border-rose-500 bg-rose-500/10 text-rose-400";

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 flex items-center justify-between gap-4 ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Submission / Navigation Bar */}
            <div className="flex justify-end mt-2">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedOption}
                  className={`text-xs font-semibold px-6 py-3 rounded-xl transition-all ${
                    selectedOption 
                      ? "bg-purple-600 text-white hover:bg-purple-500 shadow-md" 
                      : "bg-zinc-900 text-zinc-500 border border-zinc-800 cursor-not-allowed"
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="text-xs font-semibold bg-zinc-100 text-black hover:bg-zinc-200 px-6 py-3 rounded-xl shadow-md transition-all"
                >
                  {currentIdx + 1 === quiz.length ? "Complete Assessment" : "Next Question"}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Finished Result Screen */
          <div className="border border-zinc-800 bg-zinc-950/40 backdrop-blur-md rounded-2xl p-8 md:p-12 text-center flex flex-col items-center gap-4 my-4">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-zinc-100">Assessment Room Cleared</h2>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              You correctly resolved <span className="text-emerald-400 font-bold">{score}</span> out of <span className="font-bold text-zinc-200">{quiz.length}</span> question vectors from your text layer.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <button 
                onClick={handleRestart}
                className="text-xs font-semibold flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 px-5 py-3 rounded-xl transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-test Module
              </button>
              <Link href="/upload">
                <button className="text-xs font-semibold bg-zinc-100 text-black hover:bg-zinc-200 px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5" /> Home Dashboard
                </button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}