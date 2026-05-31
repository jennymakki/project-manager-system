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
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.lg,
      }}
    >
      <div
        style={{
          fontSize: theme.typography.fontSize.lg,
          fontWeight: 700,
          color: theme.colors.text,
          letterSpacing: "-0.02em",
        }}
      >
        Project Manager
      </div>

      <div>
        <div
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: 600,
            color: theme.colors.textSecondary,
            marginBottom: theme.spacing.sm,
          }}
        >
          Navigation
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: theme.spacing.sm }}>
          <Link
            to="/dashboard"
            style={{
              padding: theme.spacing.sm,
              borderRadius: theme.radius.sm,
              textDecoration: "none",
              background: isActive("/dashboard")
                ? theme.colors.primary
                : "transparent",
              color: isActive("/dashboard")
                ? "#fff"
                : theme.colors.textSecondary,
              fontWeight: isActive("/dashboard") ? 600 : 400,
            }}
          >
            Dashboard
          </Link>
        </nav>
      </div>

      <div>
        <div
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: 600,
            color: theme.colors.textSecondary,
            marginBottom: theme.spacing.sm,
          }}
        >
          My Boards
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: theme.spacing.sm }}>
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
                fontWeight: isActive(`/boards/${board.id}`) ? 600 : 400,
              }}
            >
              {board.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}