import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="w-64 border-r p-4">
      <div className="mb-6 font-bold">Project Manager</div>

      <nav className="flex flex-col gap-2">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/board/123">Board</Link>
      </nav>
    </aside>
  );
}