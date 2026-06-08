import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AppSidebar />

      <main className="flex-1 p-10 overflow-auto">
        <AppHeader />

        {children}
      </main>
    </div>
  );
}