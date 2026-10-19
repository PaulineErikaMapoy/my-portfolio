// src/components/Sidebar.jsx
// Desktop: floating brutalist card on the left. Drag its right edge to resize it,
// or collapse it into a slim icon rail (remembered between visits).
// Mobile: sticky top bar with a dropdown menu.
import React, { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const sections = [
  { id: "hero",           label: "Home",        icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" },
  { id: "experience",     label: "Experience",  icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" },
  { id: "certifications", label: "Credentials", icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" },
  { id: "skills",         label: "Skills",      icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" },
  { id: "involvement",    label: "Involvement", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
  { id: "onstage",        label: "On Stage",    icon: "M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" },
  { id: "socials",        label: "Socials",     icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" },
];

// Desktop sizing (px, including the gap around the floating card)
const MIN_WIDTH = 230;
const MAX_WIDTH = 380;
const DEFAULT_WIDTH = 272;
const RAIL_WIDTH = 96;      // collapsed icon rail
const COLLAPSE_BELOW = 180; // dragging narrower than this snaps to the rail

const clamp = (w) => Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, w));

function Icon({ d, className = "w-[18px] h-[18px]" }) {
  return (
    <svg className={`${className} shrink-0`} fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [width, setWidth] = useState(() => clamp(Number(localStorage.getItem("sidebar-width")) || DEFAULT_WIDTH));
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem("sidebar-collapsed") === "1");
  const [dragging, setDragging] = useState(false);
  const drag = useRef(null);

  // Remember the size between visits
  useEffect(() => {
    localStorage.setItem("sidebar-width", String(width));
    localStorage.setItem("sidebar-collapsed", collapsed ? "1" : "0");
  }, [width, collapsed]);

  // Highlight the section you're reading: the last one whose top has scrolled
  // above 60% of the screen height (or the last section once you hit the bottom)
  useEffect(() => {
    let frame = null;
    const update = () => {
      frame = null;
      const line = window.innerHeight * 0.6;
      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1].id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Lock page scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Drag-to-resize
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const next = drag.current.startWidth + (e.clientX - drag.current.startX);
      if (next < COLLAPSE_BELOW) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
        setWidth(clamp(next));
      }
    };
    const onUp = () => setDragging(false);
    const { cursor, userSelect } = document.body.style;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.body.style.cursor = cursor;
      document.body.style.userSelect = userSelect;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging]);

  function startDrag(e) {
    if (e.button !== 0) return;
    e.preventDefault();
    drag.current = { startX: e.clientX, startWidth: collapsed ? RAIL_WIDTH : width };
    setDragging(true);
  }

  function onHandleKey(e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); collapsed || width - 20 < MIN_WIDTH ? setCollapsed(true) : setWidth(clamp(width - 20)); }
    if (e.key === "ArrowRight") { e.preventDefault(); collapsed ? setCollapsed(false) : setWidth(clamp(width + 20)); }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setCollapsed((c) => !c); }
  }

  function goTo(id) {
    setOpen(false);
    setActive(id);
    const el = document.getElementById(id);
    if (!el) return;
    // offsetTop ignores any temporary animation shift, so we land exactly on the section
    let top = 0;
    for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
    const topBar = window.innerWidth < 1024 ? 72 : 0; // mobile header height
    // Wait a frame so the mobile menu's scroll lock is released first
    requestAnimationFrame(() => window.scrollTo({ top: top - topBar, behavior: "smooth" }));
  }

  // On desktop, collapsed hides text and centers icons; on mobile it has no effect
  const hideWhenCollapsed = collapsed ? "lg:hidden" : "";

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
      />

      <aside
        style={{ "--sb-w": `${collapsed ? RAIL_WIDTH : width}px` }}
        className={`sticky top-0 z-50 lg:shrink-0 lg:h-screen lg:w-[var(--sb-w)] lg:py-4 lg:pl-4 lg:pr-5 ${
          dragging ? "" : "lg:transition-[width] lg:duration-300 lg:ease-out"
        }`}
      >
        {/* The panel: a top bar on mobile, a floating card on desktop */}
        <div
          className={`relative flex flex-col h-full px-4 sm:px-6 py-3 max-lg:bg-white/85 max-lg:dark:bg-[var(--page-bg)]/85 max-lg:backdrop-blur-md max-lg:border-b-2 max-lg:border-[var(--brutal-border)]
            lg:brutal-card lg:!bg-[var(--sidebar-bg)] ${collapsed ? "lg:px-2 lg:py-5" : "lg:p-5"}`}
        >
          {/* Name */}
          <header className={`relative flex items-center justify-between lg:pb-4 lg:border-b-2 border-[var(--brutal-border)] ${collapsed ? "lg:justify-center" : ""}`}>
            <button onClick={() => goTo("hero")} className={`group text-left min-w-0 ${hideWhenCollapsed}`}>
              <span className="block text-lg lg:text-xl font-black tracking-tight uppercase text-gray-900 dark:text-white group-hover:text-[var(--accent-ink)] transition-colors truncate">
                Pauline Mapoy
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Project Manager & Front-End Developer
              </span>
            </button>

            {/* Collapsed rail: monogram instead of the full name */}
            {collapsed && (
              <button
                onClick={() => goTo("hero")}
                title="Pauline Mapoy"
                className="hidden lg:flex brutal-tag w-11 h-11 !rounded-xl bg-[var(--accent)] text-white font-black text-sm items-center justify-center"
              >
                PM
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen((o) => !o)}
              className="brutal-chip lg:hidden w-10 h-10 !rounded-xl text-[var(--accent-ink)] flex items-center justify-center shrink-0"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="site-navigation"
            >
              {/* Three bars that morph into an X */}
              <span className="relative block w-5 h-4" aria-hidden="true">
                <span className={`absolute left-0 h-[2.5px] w-5 rounded-full bg-current transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2.5px] w-5 rounded-full bg-current transition-all duration-200 ${open ? "opacity-0 scale-x-0" : "opacity-100"}`} />
                <span className={`absolute left-0 h-[2.5px] w-5 rounded-full bg-current transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
              </span>
            </button>
          </header>

          {/* Nav + theme switch: dropdown on mobile, always visible on desktop */}
          <div
            id="site-navigation"
            className={`flex absolute top-full inset-x-0 max-lg:transition-all max-lg:duration-300 max-lg:ease-out ${
              open ? "max-lg:opacity-100 max-lg:translate-y-0 max-lg:visible" : "max-lg:opacity-0 max-lg:-translate-y-3 max-lg:invisible max-lg:pointer-events-none"
            } max-h-[calc(100dvh-4.5rem)] overflow-y-auto px-4 sm:px-6 py-5 bg-white dark:bg-[var(--page-bg)] border-b-2 border-[var(--brutal-border)] lg:static lg:flex lg:flex-1 lg:max-h-none lg:p-0 lg:pr-1 lg:pb-2 lg:mt-5 lg:border-b-0 lg:bg-transparent lg:dark:bg-transparent flex-col justify-between`}
          >
            <nav aria-label="Sections" className="mb-6">
              <p className={`text-[11px] font-black tracking-widest uppercase text-gray-900 dark:text-white mb-3 ${hideWhenCollapsed}`}>
                Sections
              </p>
              <ul className={`flex flex-col gap-2 ${collapsed ? "lg:items-center" : ""}`}>
                {sections.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <li
                      key={s.id}
                      style={{ transitionDelay: open ? `${80 + sections.indexOf(s) * 40}ms` : "0ms" }}
                      className={`max-lg:transition-all max-lg:duration-300 max-lg:ease-out ${open ? "max-lg:opacity-100 max-lg:translate-x-0" : "max-lg:opacity-0 max-lg:-translate-x-3"}`}
                    >
                      <button
                        onClick={() => goTo(s.id)}
                        title={collapsed ? s.label : undefined}
                        aria-label={s.label}
                        aria-current={isActive ? "location" : undefined}
                        className={`group w-full text-left text-sm font-bold px-3 py-2.5 lg:py-2 rounded-xl border-2 flex items-center gap-2.5 transition-all duration-200 ${
                          collapsed ? "lg:w-11 lg:h-11 lg:p-0 lg:justify-center" : ""
                        } ${
                          isActive
                            ? "bg-[var(--accent)] text-white border-[var(--brutal-chip-border)] shadow-[3px_3px_0_0_var(--brutal-chip-border)]"
                            : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white hover:bg-[var(--brutal-chip-bg)] hover:border-[var(--brutal-chip-border)] hover:shadow-[3px_3px_0_0_var(--accent)]"
                        }`}
                      >
                        <Icon d={s.icon} />
                        <span className={`flex-1 truncate ${hideWhenCollapsed}`}>{s.label}</span>
                        <span
                          aria-hidden="true"
                          className={`transition-all duration-300 ${hideWhenCollapsed} ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"}`}
                        >
                          →
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Light / dark mode switch */}
            {/* One switch only; when collapsed the card around it just disappears */}
            <div className="mt-auto pt-5 border-t-2 border-[var(--brutal-border)]">
              <div
                className={`brutal-card [--brutal-offset:4px] flex items-center justify-between gap-2 p-3 ${
                  collapsed ? "lg:!border-0 lg:!shadow-none lg:!bg-transparent lg:!p-0 lg:justify-center" : ""
                }`}
              >
                <span className={`text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white truncate ${hideWhenCollapsed}`}>
                  Light / Dark
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Resize handle on the card's right edge (desktop only): drag to resize, click the button to collapse */}
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize sidebar (arrow keys), Enter to collapse or expand"
            aria-valuemin={MIN_WIDTH}
            aria-valuemax={MAX_WIDTH}
            aria-valuenow={collapsed ? RAIL_WIDTH : width}
            tabIndex={0}
            onPointerDown={startDrag}
            onDoubleClick={() => setCollapsed((c) => !c)}
            onKeyDown={onHandleKey}
            className="hidden lg:block absolute top-0 -right-[13px] h-full w-[14px] cursor-col-resize group/handle outline-none"
          >
            {/* Pink line that appears when you hover the edge */}
            <span
              className={`absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-[3px] rounded-full bg-[var(--accent)] transition-opacity duration-200 ${
                dragging ? "opacity-100" : "opacity-0 group-hover/handle:opacity-100 group-focus-visible/handle:opacity-100"
              }`}
            />
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={`brutal-chip !rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-[var(--accent-ink)] transition-opacity duration-200 ${
                dragging ? "opacity-0" : "opacity-0 group-hover/handle:opacity-100 group-focus-visible/handle:opacity-100 focus-visible:opacity-100"
              }`}
            >
              <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
