import { useTheme } from "../../../design-system/theme-provider";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function Card({ children, style, ...props }: CardProps) {
  const { theme } = useTheme();

  return (
    <div
      {...props}
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,
        boxShadow: theme.shadows.card,
        ...style,
      }}
    >
      {children}
    </div>
  );
}