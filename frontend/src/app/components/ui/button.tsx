import { useState } from "react";
import { useTheme } from "../../../design-system/theme-provider";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function Button({
  children,
  loading,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();

  return (
    <button
      {...props}
      disabled={loading || disabled}
      style={{
        padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
        borderRadius: theme.radius.sm,
        background: loading ? theme.colors.textSecondary : theme.colors.primary,
        color: "#fff",
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        fontSize: theme.typography.fontSize.md,
        fontWeight: 500,
        opacity: loading ? 0.7 : 1,
        transition: "all 0.2s ease",
        ...style,
      }}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
