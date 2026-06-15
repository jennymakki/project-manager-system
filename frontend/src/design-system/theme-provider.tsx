import { createContext, useContext, useMemo, useState, useEffect } from "react";

import { createTheme } from "./tokens";

type ThemeMode = "blue" | "dark" | "purple" | "playful";

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("theme") as ThemeMode | null;
    return saved ?? "blue";
  });

  const theme = useMemo(() => createTheme(mode), [mode]);

  useEffect(() => {
  localStorage.setItem("theme", mode);
}, [mode]);

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

export const useTheme = () => useContext(ThemeContext);
