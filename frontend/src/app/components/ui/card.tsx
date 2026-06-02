import { forwardRef } from "react";
import { useTheme } from "../../../design-system/theme-provider";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, style, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <div
        ref={ref}
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
);