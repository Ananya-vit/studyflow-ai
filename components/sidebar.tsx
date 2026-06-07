import Link from "next/link";
import {
  LayoutDashboard,
  Upload,
  BookOpen,
  Brain,
  Calendar,
  MessageSquare,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-8">
        StudyFlow AI
      </h1>

      <nav className="space-y-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/upload"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <Upload size={20} />
          Upload Notes
        </Link>

        <Link
          href="/quiz"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <BookOpen size={20} />
          Quiz
        </Link>

        <Link
          href="/flashcards"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <Brain size={20} />
          Flashcards
        </Link>

        <Link
          href="/planner"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <Calendar size={20} />
          Planner
        </Link>

        <Link
          href="/chat"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <MessageSquare size={20} />
          AI Chat
        </Link>
      </nav>
    </aside>
  );
}