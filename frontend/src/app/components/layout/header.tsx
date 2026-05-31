import { useTheme } from "../../../design-system/theme-provider";
import { useBreakpoint } from "../../../design-system/hooks/useBreakpoint";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const { theme } = useTheme();
  const { isMobile } = useBreakpoint();

  return (
    <header
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        gap: theme.spacing.md,
        padding: `0 ${theme.spacing.md}px`,
        borderBottom: `1px solid ${theme.colors.border}`,
        background: theme.colors.surface,
      }}
    >
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
    </header>
  );
}