"use client";

import AppLayout from "@/components/AppLayout";
import { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import PageTransition from "@/components/PageTransition";

export default function UploadPage() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState("");
  const [flashcards, setFlashcards] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  
  const [loading, setLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [flashcardsLoading, setFlashcardsLoading] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
const [isFlipped, setIsFlipped] = useState(false);

const [currentQuestion, setCurrentQuestion] =
  useState(0);
const [showAnswer, setShowAnswer] =
  useState(false);
  const textScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textScrollRef.current) {
      textScrollRef.current.scrollTop = 0;
    }
  }, [text]);

  const onDrop = async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsProcessing(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/extract-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        alert(`Error: ${errorData.error || "Unknown error occurred"}`);
        return;
      }

      const data = await response.json();
      setText(data.text ? data.text.trim() : "");
      setSummary("");
      setQuiz("");
      setFlashcards("");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Something went wrong while uploading.");
    } finally {
      setIsProcessing(false);
    }
  };

  const generateAIContent = async (endpoint: string, type: string, setLoad: (v: boolean) => void, setOutput: (v: string) => void) => {
    try {
      setLoad(true);
      setIsProcessing(true);
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.error || `Failed to generate ${type}`);
        return;
      }
      setOutput(data[endpoint] || data[type]);
      setActiveTab(type);
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
      setIsProcessing(false);
    }
  };

  const flashcardList = flashcards
  ? flashcards.split("\n\n").map((card) => {
      const parts = card.split("\n");

      return {
        question:
          parts[0]?.replace("Q:", "").trim(),

        answer:
          parts[1]?.replace("A:", "").trim(),
      };
    })
  : [];

const questions = quiz
  ? quiz
      .split(/(?=Q\d+\.)/g)
      .filter(
        (q) =>
          q.trim().startsWith("Q")
      )
  : [];

  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  return (
    <AppLayout>
      <PageTransition>
        {/* Processing Loading Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md">
            <div className="bg-white rounded-3xl p-10 w-[420px] shadow-2xl border border-slate-100 text-center">
              <div className="ai-spinner mx-auto mb-6 h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <h2 className="text-2xl font-bold text-slate-800">StudyFlow AI</h2>
              <p className="text-slate-500 mt-2 animate-pulse">Transforming your notes...</p>
              <div className="mt-6 h-2 bg-slate-100 rounded-full overflow-hidden">
               <div className="mt-6 h-2 bg-slate-100 rounded-full overflow-hidden">
  <div className="progress-bar"></div>
</div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-[1400px] mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Study Workspace</h1>
            <p className="text-slate-500 mt-2">Upload your study material to instantly extract key summaries, generate custom tests, or view adaptive flashcards.</p>
          </div>

          {/* Main Workspace Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Input Panel (Takes 5/12 grid spaces) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 rounded-2xl p-1 border border-slate-200 shadow-inner">
                <div
                  {...getRootProps()}
                  className={`
                    border-2 border-dashed rounded-xl p-10 transition-all duration-300 text-center cursor-pointer
                    ${isDragActive 
                      ? "border-blue-500 bg-blue-50/50 scale-[0.99]" 
                      : "border-slate-300 bg-white hover:border-slate-400 shadow-sm"
                    }
                  `}
                >
                  <input {...getInputProps()} />
                  <div className="text-5xl mb-4 transform hover:scale-110 transition-transform duration-200">📚</div>
                  <h3 className="text-lg font-semibold text-slate-800">Add Notes</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-[220px] mx-auto">
                    Drag & drop your PDF lecture sheets or textbook files here.
                  </p>
                </div>
              </div>

              {text && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
                  <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex justify-between items-center">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      Source Material
                    </h3>
                    <span className="text-xs font-mono text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded">
                      {text.length} chars
                    </span>
                  </div>
                  <div 
                    ref={textScrollRef}
                    className="p-5 max-h-[480px] overflow-y-auto bg-slate-50/50 text-slate-600 font-sans text-sm leading-relaxed scroll-smooth"
                  >
                    <pre className="whitespace-pre-wrap break-words">{text}</pre>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: AI Outputs Workspace (Takes 7/12 grid spaces) */}
            <div className="lg:col-span-7">
              {text ? (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[580px] flex flex-col overflow-hidden">
                  
                  {/* Generation Strategy Layer */}
                  <div className="p-5 border-b border-slate-100 bg-slate-50/30 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">AI Tools</span>
                    <div className="flex flex-wrap gap-2.5">
                      <button
                        onClick={() => generateAIContent("summarize", "summary", setLoading, setSummary)}
                        disabled={loading}
                        className="bg-slate-900 hover:bg-black disabled:opacity-40 text-white text-xs font-medium px-4 py-2.5 rounded-xl transition shadow-sm"
                      >
                        {loading ? "Summarizing..." : "⚡ Summarize"}
                      </button>
                      <button
                        onClick={() => generateAIContent("quiz", "quiz", setQuizLoading, setQuiz)}
                        disabled={quizLoading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-medium px-4 py-2.5 rounded-xl transition shadow-sm"
                      >
                        {quizLoading ? "Building Quiz..." : "📝 Generate Quiz"}
                      </button>
                      <button
                        onClick={() => generateAIContent("flashcards", "flashcards", setFlashcardsLoading, setFlashcards)}
                        disabled={flashcardsLoading}
                        className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-medium px-4 py-2.5 rounded-xl transition shadow-sm"
                      >
                        {flashcardsLoading ? "Stacking Cards..." : "🗂️ Generate Flashcards"}
                      </button>
                    </div>
                  </div>

                  {/* Navigation Tab Hub */}
                  <div className="px-5 pt-4 bg-white border-b border-slate-100 flex gap-2">
                    {["summary", "quiz", "flashcards"].map((tab) => {
                      const isSelected = activeTab === tab;
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-4 py-2.5 text-sm font-medium border-b-2 capitalize transition-all duration-200 -mb-[1px]
                            ${isSelected 
                              ? "border-blue-600 text-blue-600 font-semibold" 
                              : "border-transparent text-slate-400 hover:text-slate-600"
                            }
                          `}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>

                  {/* Reactive Content Container Panels */}
                  <div className="p-6 flex-1 bg-white max-h-[500px] overflow-y-auto">
                    {activeTab === "summary" && (
                      <div className="animate-fadeIn">
                        {summary ? (
                          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
                            <pre className="whitespace-pre-wrap font-sans">{summary}</pre>
                          </div>
                        ) : (
                          <EmptyStateMessage message="No summary generated yet. Fire up the tool layer above to compress your notes." />
                        )}
                      </div>
                    )}

                    {activeTab === "quiz" && (
                      <div className="animate-fadeIn">
                        {quiz ? (
                          <div className="prose prose-slate max-w-none text-slate-700">
                           <div className="max-w-2xl mx-auto">

  <div className="bg-white border rounded-3xl p-8 shadow-sm">

    <h2 className="text-xl font-bold mb-6">
      Question {currentQuestion + 1}
    </h2>

<pre className="whitespace-pre-wrap font-sans">
  {
    showAnswer
      ? questions[currentQuestion]
      : questions[currentQuestion]
          ?.split("Answer:")[0]
  }
</pre>

  </div>
  <button
  onClick={() =>
    setShowAnswer(!showAnswer)
  }
  className="
    mt-4
    px-4
    py-2
    bg-emerald-600
    text-white
    rounded-xl
  "
>
  {showAnswer
    ? "Hide Answer"
    : "Show Answer"}
</button>

  <div className="flex justify-between mt-6">

    <button
  onClick={() => {
    setCurrentQuestion(
      Math.max(
        currentQuestion - 1,
        0
      )
    );

    setShowAnswer(false);
  }}
>
  Previous
</button>

    <span>
      {currentQuestion + 1} / {questions.length}
    </span>

    <button
      onClick={() =>
        setCurrentQuestion(
          Math.min(
            currentQuestion + 1,
            questions.length - 1
          )
        )
      }
      className="px-4 py-2 bg-blue-600 text-white rounded-xl"
    >
      Next
    </button>

  </div>

</div>
                          </div>
                        ) : (
                          <EmptyStateMessage message="Ready to test your knowledge? Hit 'Generate Quiz' to scan your files." />
                        )}
                      </div>
                    )}

                    {activeTab === "flashcards" && (
                      <div className="animate-fadeIn">
                        {flashcards ? (
                          <div className="max-w-xl mx-auto">

  <div
    onClick={() =>
      setIsFlipped(!isFlipped)
    }
    className="
      h-72
      cursor-pointer
      rounded-3xl
      bg-gradient-to-br
      from-blue-500
      to-indigo-600
      text-white
      p-8
      flex
      items-center
      justify-center
      text-center
      shadow-xl
      transition-all
      hover:scale-[1.02]
    "
  >
    <h2 className="text-2xl font-bold">
      {isFlipped
        ? flashcardList[currentCard]?.answer
        : flashcardList[currentCard]?.question}
    </h2>
  </div>

  <div className="flex justify-between mt-6">

    <button
      onClick={() => {
        setCurrentCard(
          Math.max(currentCard - 1, 0)
        );
        setIsFlipped(false);
      }}
      className="px-4 py-2 bg-slate-200 rounded-xl"
    >
      ← Previous
    </button>

    <span>
      {currentCard + 1} / {flashcardList.length}
    </span>

    <button
      onClick={() => {
        setCurrentCard(
          Math.min(
            currentCard + 1,
            flashcardList.length - 1
          )
        );
        setIsFlipped(false);
      }}
      className="px-4 py-2 bg-slate-200 rounded-xl"
    >
      Next →
    </button>

  </div>

</div>
                        ) : (
                          <EmptyStateMessage message="No deck items found. Convert long passages into smart micro-cards." />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Showcase screen shown before material gets added */
                <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-12 text-center h-full min-h-[580px] flex flex-col justify-center items-center">
                  <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm border border-blue-100 mb-4 animate-bounce">
                    ✨
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Your Study Core is Idle</h3>
                  <p className="text-slate-500 text-sm max-w-sm mt-1">
                    Once you upload your study documents, your workspace options will unfold right here.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </PageTransition>
    </AppLayout>
  );
}

// Micro Empty State Component Helper
function EmptyStateMessage({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 border border-dashed border-slate-200 bg-slate-50/50 rounded-xl">
      <span className="text-3xl mb-2 opacity-60">🧠</span>
      <p className="text-sm text-slate-400 max-w-xs">{message}</p>
    </div>
  )
}