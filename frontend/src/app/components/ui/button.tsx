import { useTheme } from "../../../design-system/theme-provider";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, style, ...props }: ButtonProps) {
  const { theme } = useTheme();

  return (
    <button
      {...props}
      style={{
        padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
        borderRadius: theme.radius.sm,
        background: theme.colors.primary,
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: theme.typography.fontSize.sm,
        fontFamily: theme.typography.fontFamily.medium,
        transition: "all 0.2s ease",
        ...style,
      }}
    >
      {children}
    </button>
  );
}