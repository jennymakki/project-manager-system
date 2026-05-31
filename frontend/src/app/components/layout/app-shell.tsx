import { Outlet } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import { useTheme } from "../../../design-system/theme-provider";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

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
      <aside>
        <Sidebar />

        <ThemeToggle />
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
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
