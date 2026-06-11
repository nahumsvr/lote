"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-14 rounded-full bg-[var(--color-text-secondary)] opacity-50 animate-pulse" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 cursor-pointer ${isDark ? "bg-[var(--color-primary)]" : "bg-[var(--color-text-secondary)]"
        }`}
    >
      <span className="absolute left-1.5 flex h-full items-center text-white/80" aria-hidden>
        <Moon className="h-3.5 w-3.5" />
      </span>

      <span className="absolute right-1.5 flex h-full items-center text-white/80" aria-hidden>
        <Sun className="h-3.5 w-3.5" />
      </span>

      <span
        className="absolute h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-300 z-10"
        style={{
          transform: isDark ? "translateX(26px)" : "translateX(4px)",
        }}
      />
    </button>
  );
}