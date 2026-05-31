import { useTheme } from "../../../design-system/theme-provider";

export function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const { theme } = useTheme();

  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
        border: `1px solid ${theme.colors.border}`,
        background: theme.colors.surface,
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.sm,
        outline: "none",
      }}
    />
  );
}