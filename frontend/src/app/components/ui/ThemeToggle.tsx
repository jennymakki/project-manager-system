import { useTheme } from "../../../design-system/theme-provider";

export default function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <select
      value={mode}
      onChange={(e) =>
        setMode(
          e.target.value as
            | "blue"
            | "dark"
            | "purple"
        )
      }
    >
      <option value="blue">Blue</option>
      <option value="dark">Dark</option>
      <option value="purple">Purple</option>
    </select>
  );
}