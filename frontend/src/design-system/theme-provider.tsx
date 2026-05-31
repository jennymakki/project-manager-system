import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { createTheme } from "./tokens";

type ThemeMode =
  | "blue"
  | "dark"
  | "purple"
  | "playful";

const ThemeContext = createContext<any>(null);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] =
    useState<ThemeMode>("blue");

  const theme = useMemo(
    () => createTheme(mode),
    [mode]
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode,
        setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () =>
  useContext(ThemeContext);