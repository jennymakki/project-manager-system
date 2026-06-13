import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../../design-system/theme-provider";
import { useBoards } from "../../../features/boards/state/BoardsContext";
import { useBreakpoint } from "../../../design-system/hooks/useBreakpoint";
import ThemeToggle from "../ui/ThemeToggle";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const { theme } = useTheme();
  const { boards } = useBoards();
  const { isMobile } = useBreakpoint();

  const isDashboard = location.pathname === "/dashboard";

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      style={{
        width: 256,
        height: "100vh",
        position: isMobile ? "fixed" : "relative",
        top: 0,
        left: isMobile ? (open ? 0 : -256) : 0,
        transition: "left 0.25s ease",
        zIndex: 1000,
        padding: theme.spacing.md,
        borderRight: `1px solid ${theme.colors.border}`,
        background: theme.colors.background,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.md,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemeToggle />

        {isMobile && open && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              border: "none",
              background: "transparent",
              fontSize: 20,
              cursor: "pointer",
              color: theme.colors.text,
            }}
          >
            ✕
          </button>
        )}
      </div>

      {!isDashboard && (
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Button>
            <ArrowLeft size={18} />
            Back to Dashboard
          </Button>
        </Link>
      )}

      <hr style={{ opacity: 0.1 }} />

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

                color: isActive(`/boards/${board.id}`)
                  ? theme.colors.primary
                  : theme.colors.textSecondary,

                fontWeight: isActive(`/boards/${board.id}`) ? 600 : 400,
              }}
            >
              {board.name}
            </Link>
          ))}
        </nav>
      </div>

      <div style={{ marginTop: "auto" }} />
    </aside>
  );
}
