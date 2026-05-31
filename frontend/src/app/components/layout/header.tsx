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
        padding: `0 ${theme.spacing.md}px`,
        borderBottom: `1px solid ${theme.colors.border}`,
        background: theme.colors.surface,
      }}
    >
      {/* Left */}
      <div
        style={{
          fontSize: theme.typography.fontSize.md,
          fontFamily: theme.typography.fontFamily.semibold,
          color: theme.colors.text,
        }}
      >
        Dashboard
      </div>

      {/* Right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: theme.spacing.sm,
        }}
      >
        <div
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
          }}
        >
          user@email.com
        </div>
      </div>
    </header>
  );
}