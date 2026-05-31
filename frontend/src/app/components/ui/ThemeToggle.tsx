import { useTheme } from "../../../design-system/theme-provider";

export default function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <select
      value={mode}
      onChange={(e) =>
        setMode(
          e.target.value as
            | "light"
            | "dark"
            | "pastel"
        )
      }
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="pastel">Pastel</option>
    </select>
  );
}