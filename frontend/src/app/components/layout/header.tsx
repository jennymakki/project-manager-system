import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../design-system/theme-provider";
import { useBreakpoint } from "../../../design-system/hooks/useBreakpoint";
import { useAuth } from "../../../features/auth/hooks/useAuth";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const { theme } = useTheme();
  const { isMobile } = useBreakpoint();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => logout();

  return (
    <header
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 24px`,
        borderBottom: `1px solid ${theme.colors.border}`,
        background: theme.colors.surface,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {isMobile && (
          <button
            onClick={onMenuClick}
            aria-label="Open menu"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 20,
              color: theme.colors.text,
            }}
          >
            ☰
          </button>
        )}

        <div
          style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: 700,
            color: theme.colors.text,
          }}
        >
          {isMobile ? "PM" : "Project Manager"}
        </div>
      </div>

      <button
        onClick={handleLogout}
        aria-label="Log out"
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: theme.colors.textSecondary,
          fontWeight: 600,
        }}
      >
        Log out
      </button>
    </header>
  );
}
