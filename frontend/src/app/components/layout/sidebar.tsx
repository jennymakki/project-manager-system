import { Link, useLocation } from "react-router-dom";
import { createTheme } from "../../../design-system/tokens";

const theme = createTheme("light");

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      style={{
        width: 256,
        padding: theme.spacing.md,
        borderRight: `1px solid ${theme.colors.border}`,
        background: theme.colors.background,
      }}
    >
      <div
        style={{
          marginBottom: theme.spacing.lg,
          fontSize: theme.typography.fontSize.lg,
          fontFamily: theme.typography.fontFamily.bold,
          color: theme.colors.text,
        }}
      >
        Project Manager
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: theme.spacing.sm }}>
        <Link
          to="/dashboard"
          style={{
            padding: theme.spacing.sm,
            borderRadius: theme.radius.sm,
            textDecoration: "none",
            background: isActive("/dashboard") ? theme.colors.primary : "transparent",
            color: isActive("/dashboard")
              ? "#fff"
              : theme.colors.textSecondary,
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/board/123"
          style={{
            padding: theme.spacing.sm,
            borderRadius: theme.radius.sm,
            textDecoration: "none",
            background: isActive("/board/123") ? theme.colors.primary : "transparent",
            color: isActive("/board/123")
              ? "#fff"
              : theme.colors.textSecondary,
          }}
        >
          Board
        </Link>
      </nav>
    </aside>
  );
}