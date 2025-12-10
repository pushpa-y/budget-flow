import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as StyledProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "../styles/theme";

const ThemeToggleContext = createContext({ theme: "light", toggle: () => {} });

export const useTheme = () => useContext(ThemeToggleContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<"light"|"dark">(() => {
    try {
      const saved = localStorage.getItem("tf_theme");
      return (saved === "dark" ? "dark" : "light");
    } catch { return "light"; }
  });

  useEffect(() => {
    try { localStorage.setItem("tf_theme", themeName); } catch {}
  }, [themeName]);

  const toggle = () => setThemeName((t) => (t === "light" ? "dark" : "light"));

  const theme = themeName === "light" ? lightTheme : darkTheme;

  return (
    <ThemeToggleContext.Provider value={{ theme: themeName, toggle }}>
      <StyledProvider theme={theme}>
        <GlobalStyle theme={theme} />
        {children}
      </StyledProvider>
    </ThemeToggleContext.Provider>
  );
};
