import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../../design-system/theme-provider";
import { useBoards } from "../../../features/boards/state/BoardsContext";
import { useBreakpoint } from "../../../design-system/hooks/useBreakpoint";
import ThemeToggle from "../ui/ThemeToggle";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const location = useLocation();
  const { theme } = useTheme();
  const { boards } = useBoards();
  const { isMobile } = useBreakpoint();

  const isActive = (path: string) =>
    location.pathname === path;

  return (
    <aside
      style={{
        width: 256,
        height: "100vh",

        position: isMobile ? "fixed" : "relative",
        top: 0,
        left: isMobile
          ? open
            ? 0
            : -256
          : 0,

        transition: "left 0.25s ease",
        zIndex: 1000,

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
        }}
      >
        Project Manager
      </div>

      {isMobile && (
        <button
          onClick={onClose}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            alignSelf: "flex-end",
            color: theme.colors.text,
          }}
        >
          ✕
        </button>
      )}

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

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing.sm,
          }}
        >
          <Link
            to="/dashboard"
            onClick={() => isMobile && onClose()}
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

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing.sm,
          }}
        >
          {boards.map((board) => (
            <Link
              key={board.id}
              to={`/boards/${board.id}`}
              onClick={() => isMobile && onClose()}
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
          <div>
  <div
    style={{
      fontSize: theme.typography.fontSize.sm,
      fontWeight: 600,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.sm,
      marginTop: theme.spacing.lg,
    }}
  >
    Choose Theme
  </div>

  <ThemeToggle />
</div>
        </nav>
      </div>
    </aside>
  );
}