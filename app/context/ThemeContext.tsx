// context/ThemeContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  toggleTheme: () => void;
  mode: ThemeMode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProviderContext = ({ children }: { children: ReactNode }) => {
  // Leer el tema inicial desde localStorage
  const getInitialTheme = (): ThemeMode => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedMode = localStorage.getItem("themeMode") as ThemeMode;
      return storedMode || "light"; // Predeterminado a "light" si no hay nada en localStorage
    }
    return "light"; // Predeterminado para el SSR
  };

  const [mode, setMode] = useState<ThemeMode>(getInitialTheme);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  // Crear el tema y aplicar responsiveFontSizes
  let theme = createTheme({
    palette: {
      mode,
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
