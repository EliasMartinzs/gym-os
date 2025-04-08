"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Background() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themeClass = theme === "dark" ? "dark" : "light";

  return <div className={`responsive-background ${themeClass}`} />;
}
