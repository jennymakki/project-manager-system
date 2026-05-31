import { useTheme } from "../../../design-system/theme-provider";

export function Header() {
  const { theme } = useTheme();

  return (
    <header
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
        borderBottom: `1px solid ${theme.colors.border}`,
        background: theme.colors.surface,
      }}
    >
      <div
        style={{
          fontSize: theme.typography.fontSize.md,
          fontWeight: 600,
          color: theme.colors.text,
        }}
      >
        Dashboard
      </div>
    </header>
  );
}