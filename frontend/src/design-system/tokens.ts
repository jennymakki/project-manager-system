import { colors } from "./colors";
import { spacing } from "./spacing";
import { shadows } from "./shadows";
import { typography } from "./typography";

export const createTheme = (
  mode: "light" | "dark" | "pastel"
) => ({
  colors: colors[mode],
  spacing,
  shadows,
  typography,

  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
});