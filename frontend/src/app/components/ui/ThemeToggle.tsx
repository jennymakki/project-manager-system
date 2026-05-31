import { useTheme } from "../../../design-system/theme-provider";

export default function ThemeToggle() {
  const { mode, setMode, theme } = useTheme();

  const options = [
    { value: "blue", label: "Default" },
    { value: "dark", label: "Dark" },
    { value: "purple", label: "Calm" },
    { value: "playful", label: "Playful"}
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        style={{
          padding: theme.spacing.md,
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.primary,
          fontWeight: 600,
        }}
      >
        Choose your theme
      </div>

      <div
        style={{
          display: "flex",
          padding: 4,
          borderRadius: theme.radius.md,
          border: `1px solid ${theme.colors.border}`,
          background: theme.colors.surface,
          gap: 4,
          width: "fit-content",
        }}
      >
        {options.map((opt) => {
          const active = mode === opt.value;

          return (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              style={{
                padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
                borderRadius: theme.radius.sm,
                border: "none",
                cursor: "pointer",
                fontSize: theme.typography.fontSize.xs,
                fontWeight: 600,

                background: active
                  ? theme.colors.primary
                  : "transparent",

                color: active
                  ? "#fff"
                  : theme.colors.textSecondary,

                transition: "all 0.2s ease",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}