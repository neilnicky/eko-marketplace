"use client";

import { useCallback, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

export default function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>("light");

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode;
    if (savedTheme === "dark" || savedTheme === "light") {
      setThemeState(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Default to light mode
      setThemeState("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setThemeState(newTheme);
  }, []);

  return { theme, setTheme };
}
