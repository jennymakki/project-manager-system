import { colors } from "./colors";
import { spacing } from "./spacing";
import { shadows } from "./shadows";
import { typography } from "./typography";
import { breakpoints } from "./breakpoints";

export const createTheme = (
  mode: "blue" | "dark" | "purple" | "playful"
) => ({
  colors: colors[mode],
  spacing,
  shadows,
  typography,
  breakpoints,

  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
});