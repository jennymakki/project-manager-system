import { useTheme } from "../../../design-system/theme-provider";
import { Spinner } from "./spinner";

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
      aria-busy={loading}
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
        opacity: loading ? 0.8 : 1,
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        ...style,
      }}
    >
      {loading ? (
        <>
          <Spinner />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
