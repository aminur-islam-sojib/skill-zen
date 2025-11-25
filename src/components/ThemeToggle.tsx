"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
      if (stored === "dark" || stored === "light") return stored as "dark" | "light";
      const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    if (!theme) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  const icon = theme === "dark" ? <Sun className="h-4 w-4 text-yellow-300" /> : <Moon className="h-4 w-4" />;
  const customCss = `
    /* This is the key to the seamless animation.
      The @property rule tells the browser that '--angle' is a custom property
      of type <angle>. This allows the browser to smoothly interpolate it
      during animations, preventing the "jump" at the end of the loop.
    */
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    /* The keyframe animation simply transitions the --angle property
      from its start (0deg) to its end (360deg).
    */
    @keyframes shimmer-spin {
      to {
        --angle: 360deg;
      }
    }
  `;
  return (
 <>
 
 
    <div className="flex items-center justify-center font-sans cursor-pointer">
      <style>{customCss}</style>
      <button  aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
      title="Toggle theme"
      onClick={toggleTheme} className="relative inline-flex items-center justify-center p-[1.5px] bg-gray-300 dark:bg-black rounded-full overflow-hidden group cursor-pointer">
        <div 
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from var(--angle), transparent 25%, #06b6d4, transparent 50%)',
            animation: 'shimmer-spin 2.5s linear infinite',
          }}
        />
        <span className="relative z-10 inline-flex items-center justify-center w-full h-full px-5 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-900 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors duration-300">
          {icon}
        </span>
      </button>
    </div>
    </>
    
  );
}
