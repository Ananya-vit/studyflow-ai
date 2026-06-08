"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI Summaries",
    desc: "Convert lengthy notes into concise summaries instantly.",
    emoji: "📝",
    href: "/upload",
  },
  {
    title: "Flashcards",
    desc: "Generate revision flashcards automatically.",
    emoji: "🧠",
    href: "/flashcards",
  },
  {
    title: "Quiz Generator",
    desc: "Practice with AI-generated MCQs.",
    emoji: "🎯",
    href: "/quiz",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* Background Blobs */}

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      {/* Navbar */}

      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

          <h1 className="text-2xl font-bold">
           <div className="flex items-center gap-3">
  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500" />
  <span className="text-2xl font-bold">
    StudyFlow
  </span>
</div>
          </h1>

          <Link
            href="/upload"
            className="btn-primary"
          >
            Get Started
          </Link>

        </div>
      </nav>

      {/* Hero */}

      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6 pt-28"
      >
        <div className="badge">
          AI Powered Learning Platform
        </div>

        <h1 className="hero-title">
          Study Smarter
          <br />
          With AI
        </h1>

        <p className="hero-desc">
          Upload notes, generate summaries,
          create flashcards, practice quizzes,
          and chat with your study material.
        </p>

        <div className="flex justify-center gap-4 mt-10">

          <Link href="/upload" className="btn-primary">
            Upload Notes
          </Link>

          <Link href="/dashboard" className="btn-secondary">
            Dashboard
          </Link>

        </div>
      </motion.section>
     {/* Dashboard */}
     <motion.section
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="max-w-6xl mx-auto px-6 mt-24"
>
  <div className="glass-card p-8">

    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold">
        Your AI Study Dashboard
      </h2>

      <div className="text-sm text-gray-500">
        Live Preview
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold mb-3">
          Summary
        </h3>

        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold mb-3">
          Flashcards
        </h3>

        <div className="h-28 rounded-xl bg-indigo-50 flex items-center justify-center">
          Q → A
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold mb-3">
          Quiz
        </h3>

        <div className="space-y-3">
          <div className="h-8 bg-indigo-100 rounded"></div>
          <div className="h-8 bg-indigo-100 rounded"></div>
          <div className="h-8 bg-indigo-100 rounded"></div>
        </div>
      </div>

    </div>
  </div>
</motion.section>
      {/* Stats */}

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto px-6 mt-24"
      >
        <div className="grid md:grid-cols-3 gap-6">

          {["AI Assistant", "Smart Quizzes", "Flashcards"].map(
            (item) => (
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                key={item}
                className="glass-card p-8 text-center"
              >
                <h2 className="text-2xl font-bold">
                  {item}
                </h2>
              </motion.div>
            )
          )}

        </div>
      </motion.section>

      {/* Features */}

      <section className="max-w-6xl mx-auto px-6 py-24">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center mb-14"
        >
          Everything You Need
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
            >
              <Link
                href={feature.href}
                className="glass-card block p-8 h-full"
              >
                <div className="text-6xl">
                  {feature.emoji}
                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  {feature.desc}
                </p>
              </Link>
            </motion.div>
          ))}

        </div>
      </section>

      {/* How It Works */}

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <h2 className="text-5xl font-bold text-center mb-14">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            "📄 Upload Notes",
            "🤖 AI Processing",
            "🎓 Learn Faster",
          ].map((step, i) => (
            <motion.div
              key={step}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.2,
              }}
              className="glass-card p-8 text-center"
            >
              <h3 className="text-2xl font-bold">
                {step}
              </h3>
            </motion.div>
          ))}

        </div>
      </section>

    </main>
  );
}