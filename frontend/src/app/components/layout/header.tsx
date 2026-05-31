import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../design-system/theme-provider";
import { useBreakpoint } from "../../../design-system/hooks/useBreakpoint";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const { theme } = useTheme();
  const { isMobile } = useBreakpoint();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${theme.spacing.md}px`,
        borderBottom: `1px solid ${theme.colors.border}`,
        background: theme.colors.surface,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {isMobile && (
          <button
            onClick={onMenuClick}
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
          Project Manager
        </div>
      </div>

      <button
        onClick={handleLogout}
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