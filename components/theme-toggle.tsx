"use client";

import { Moon, Sun } from "react-feather";
import { Button } from "react-ui-vegetas-wife";

export function ThemeToggle() {
  const toggleTheme = () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("sirius-theme", nextTheme);
  };

  return (
    <Button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Alternar tema claro u oscuro"
      title="Cambiar tema"
    >
      <Sun className="theme-icon theme-icon-sun" aria-hidden="true" />
      <Moon className="theme-icon theme-icon-moon" aria-hidden="true" />
    </Button>
  );
}
