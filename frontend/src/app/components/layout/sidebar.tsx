import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../../design-system/theme-provider";
import { useBoards } from "../../../features/boards/state/BoardsContext";

export function Sidebar() {
  const location = useLocation();
  const { theme } = useTheme();
  const { boards } = useBoards();

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
          fontWeight: 700,
          color: theme.colors.textSecondary,
          letterSpacing: "-0.02em",
        }}
      >
        Project Manager
      </div>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.sm,
        }}
      >
        <Link
          to="/dashboard"
          style={{
            padding: theme.spacing.sm,
            borderRadius: theme.radius.sm,
            textDecoration: "none",
            background: isActive("/dashboard")
              ? theme.colors.primary
              : "transparent",
            color: isActive("/dashboard") ? "#fff" : theme.colors.textSecondary,
          }}
        >
          Dashboard
        </Link>

        {boards.map((board) => (
          <Link
            key={board.id}
            to={`/boards/${board.id}`}
            style={{
              padding: theme.spacing.sm,
              borderRadius: theme.radius.sm,
              textDecoration: "none",
              background: isActive(`/boards/${board.id}`)
                ? theme.colors.primary
                : "transparent",
              color: isActive(`/boards/${board.id}`)
                ? "#fff"
                : theme.colors.textSecondary,
            }}
          >
            {board.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
