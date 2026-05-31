import { useTheme } from "../../../design-system/theme-provider";

export function Card({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,
        boxShadow: theme.shadows.card,
      }}
    >
      {children}
    </div>
  );
}