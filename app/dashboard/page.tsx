import Sidebar from "@/components/AppSidebar";

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