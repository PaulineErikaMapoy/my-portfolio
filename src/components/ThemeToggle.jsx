// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";

const sunPath = "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z";
const moonPath = "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z";
const Icon = ({ d, className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

// variant: "scene" = a little sky (sunny day / starry night); "switch" = pill whose sliding knob turns
// from sun to moon; "round" = single icon button
export default function ThemeToggle({ variant = "switch", className = "" }) {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Stay in sync if another switch on the page changes the theme
  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => setDark(html.classList.contains("dark")));
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    // Remember only a theme the visitor picked themselves (light is the default)
    try {
      localStorage.setItem("theme-choice", next ? "dark" : "light");
    } catch {
      /* storage blocked: the switch still works for this visit */
    }
  }

  const label = dark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <>
      {variant === "scene" ? (
        <button
          onClick={toggle}
          role="switch"
          aria-checked={dark}
          aria-label={label}
          title={label}
          className={`theme-scene ${className}`}
        >
          <span className="ts-sky ts-day" aria-hidden="true" />
          <span className="ts-sky ts-night" aria-hidden="true" />
          <span className="ts-stars" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span>
          <span className="ts-cloud ts-cloud-1" aria-hidden="true" />
          <span className="ts-cloud ts-cloud-2" aria-hidden="true" />
          <span className="ts-cloud ts-cloud-3" aria-hidden="true" />
          <span className="ts-shooting" aria-hidden="true" />
          <span className="ts-sun" aria-hidden="true" />
          <span className="ts-moon" aria-hidden="true" />
          <span className="ts-label ts-label-day" aria-hidden="true">Day</span>
          <span className="ts-label ts-label-night" aria-hidden="true">Night</span>
        </button>
      ) : variant === "switch" ? (
        <button
          onClick={toggle}
          role="switch"
          aria-checked={dark}
          aria-label={label}
          title={label}
          className={`theme-switch ${className}`}
        >
          {/* Stars that twinkle in on the dark side */}
          <span className="theme-switch-stars" aria-hidden="true"><i /><i /><i /></span>
          {/* The knob carries the icon: a sun that turns into a moon as it slides over */}
          <span className="theme-switch-knob" aria-hidden="true">
            <Icon d={sunPath} className="theme-switch-icon theme-switch-sun" />
            <Icon d={moonPath} className="theme-switch-icon theme-switch-moon" />
          </span>
        </button>
      ) : (
        <button
          onClick={toggle}
          aria-label={label}
          title={label}
          className={`brutal-chip !rounded-full relative w-11 h-11 flex items-center justify-center shrink-0 text-[var(--accent-ink)] hover:!bg-pink-50 dark:hover:!bg-pink-500/10 ${className}`}
        >
          <Icon d={sunPath} className={`absolute w-5 h-5 transition-all duration-500 ${dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
          <Icon d={moonPath} className={`absolute w-5 h-5 transition-all duration-500 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
        </button>
      )}
    </>
  );
}
