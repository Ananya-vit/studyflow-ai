// Fallback local Sidebar component to avoid missing import during development.
function Sidebar() {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-6">
      <h2 className="text-lg font-semibold">Studyflow</h2>
      <nav className="mt-4">
        <ul className="space-y-2 text-sm">
          <li className="text-gray-600">Dashboard</li>
          <li className="text-gray-600">Notes</li>
          <li className="text-gray-600">Quizzes</li>
          <li className="text-gray-600">Profile</li>
        </ul>
      </nav>
    </aside>
  );
}

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="font-semibold">
              Notes Uploaded
            </h2>
            <p className="text-3xl mt-3">0</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="font-semibold">
              Quizzes Taken
            </h2>
            <p className="text-3xl mt-3">0</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="font-semibold">
              Study Streak
            </h2>
            <p className="text-3xl mt-3">0 Days</p>
          </div>
        </div>
      </main>
    </div>
  );
}