"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="size-16 rounded-full hover:bg-card/50 grid place-items-center cursor-pointer transition-transform ease-in-out">
        {/* Espaço reservado vazio durante SSR */}
      </button>
    );
  }

  return (
    <button
      className="size-16 rounded-full hover:bg-card/50 grid place-items-center cursor-pointer transition-transform ease-in-out"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </button>
  );
}
