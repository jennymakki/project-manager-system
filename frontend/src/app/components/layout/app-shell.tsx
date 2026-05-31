import { Outlet } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";

export function AppShell() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r">
        Sidebar
        <ThemeToggle/>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b">
          Header
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}