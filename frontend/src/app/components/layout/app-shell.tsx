import { Outlet } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import { useTheme } from "../../../design-system/theme-provider";

export function AppShell() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <aside
        style={{
          width: 256,
          borderRight: `1px solid ${theme.colors.border}`,
          padding: theme.spacing.md,
          background: theme.colors.surface,
        }}
      >
        <div style={{ marginBottom: theme.spacing.md }}>
          Sidebar
        </div>

        <ThemeToggle />
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header
          style={{
            height: 56,
            borderBottom: `1px solid ${theme.colors.border}`,
            padding: theme.spacing.md,
          }}
        >
          Header
        </header>

        <main
          style={{
            flex: 1,
            padding: theme.spacing.lg,
            overflow: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}