// src/components/ThemeToggle.jsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// A little personality every time the theme changes
const quips = {
  dark: [
    "Ooh, going dim. Very mysterious of you. 🌙",
    "Lights off. Main character energy: activated.",
    "Ah, I see you like it moody. Respect.",
    "Welcome to the night shift. ✨",
    "Your eyes just said thank you.",
  ],
  light: [
    "Rise and shine! ☀️",
    "Looking on the bright side, I see.",
    "Lights on. Hope you brought sunglasses. 😎",
    "Good morning, sunshine!",
    "Back to the light. Bold choice.",
  ],
};

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const [toast, setToast] = useState(null);
  const lastQuip = useRef("");
  const hideTimer = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  function toggle() {
    const next = !dark;
    setDark(next);

    // Pick a random line, never the same one twice in a row
    const options = quips[next ? "dark" : "light"].filter((q) => q !== lastQuip.current);
    const text = options[Math.floor(Math.random() * options.length)];
    lastQuip.current = text;
    setToast({ text, id: Date.now() });
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setToast(null), 2600);
  }

  return (
    <>
      <button
        onClick={toggle}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        title={dark ? "Light mode" : "Dark mode"}
        className="brutal-chip !rounded-full relative w-9 h-9 flex items-center justify-center flex-shrink-0 text-[var(--accent-ink)] hover:!bg-pink-50 dark:hover:!bg-pink-500/10"
      >
        {/* Sun */}
        <svg
          className={`absolute w-4.5 h-4.5 transition-all duration-500 ${dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
          fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
        {/* Moon */}
        <svg
          className={`absolute w-4.5 h-4.5 transition-all duration-500 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
          fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      </button>

      {/* Witty pop-up, rendered on <body> so it floats above everything */}
      {toast &&
        createPortal(
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className="theme-toast brutal-tag fixed top-1/2 left-1/2 z-[70] max-w-[calc(100vw-2rem)] px-5 py-4 rounded-xl bg-[var(--brutal-surface)] text-base font-black text-gray-900 dark:text-white text-center pointer-events-none"
          >
            {toast.text}
          </div>,
          document.body
        )}
    </>
  );
}
