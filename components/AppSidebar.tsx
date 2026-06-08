export default function AppSidebar() {
  const items = [
    "Dashboard",
    "Upload Notes",
    "Quiz",
    "Flashcards",
    "Planner",
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-950 text-white border-r border-slate-800">
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          StudyFlow
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          AI Learning Workspace
        </p>
      </div>

      <nav className="px-4 space-y-2">
        {items.map((item) => (
          <button
            key={item}
            className="
              w-full
              text-left
              px-4
              py-3
              rounded-xl
              hover:bg-slate-800
              transition-all
              duration-200
            "
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}