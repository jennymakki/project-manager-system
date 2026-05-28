export function Header() {
  return (
    <header className="h-14 border-b flex items-center justify-between px-4">
      <div>Dashboard</div>

      <div className="flex items-center gap-2">
        <div className="text-sm opacity-70">user@email.com</div>
      </div>
    </header>
  );
}