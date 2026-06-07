export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold">StudyFlow AI</h1>

        <button className="bg-black text-white px-4 py-2 rounded-lg">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="text-center mt-24 px-6">
        <h1 className="text-6xl font-bold">
          Study Smarter with AI
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your notes, generate summaries,
          create quizzes, flashcards, and get
          AI-powered answers from your study material.
        </p>

        <button className="mt-8 bg-black text-white px-6 py-3 rounded-xl">
          Start Learning
        </button>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-10 mt-24">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">
            AI Summaries
          </h2>
          <p className="text-gray-600 mt-2">
            Convert long notes into concise summaries.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">
            Quiz Generator
          </h2>
          <p className="text-gray-600 mt-2">
            Generate MCQs and exam questions instantly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">
            AI Doubt Solver
          </h2>
          <p className="text-gray-600 mt-2">
            Ask questions directly from uploaded notes.
          </p>
        </div>
      </section>
    </main>
  );
}