// src/useScrollReveal.js
// Phones and older browsers: each card / block slides up and fades in when it
// enters the screen. Things that appear together are slightly staggered.
import { useEffect } from "react";

// What gets revealed: every bold card, plus anything marked with data-reveal
const TARGETS = "main .brutal-card, main [data-reveal], footer .brutal-card";

export default function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Modern browsers on tablets and up get scroll-linked entrances from CSS instead
    // (see "Scroll-driven" in index.css); phones always use this timed version
    const phone = window.matchMedia("(max-width: 767px)").matches;
    if (!phone && window.CSS?.supports?.("animation-timeline: view()")) return;

    const els = [...document.querySelectorAll(TARGETS)];
    // Anything already on screen at load stays put (no flash on the first view)
    const pending = els.filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    pending.forEach((el) => el.setAttribute("data-sr", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        const showing = entries.filter((e) => e.isIntersecting).map((e) => e.target);
        showing
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.getBoundingClientRect().left - b.getBoundingClientRect().left)
          .forEach((el, i) => {
            const delay = Math.min(i * 130, 650);
            el.style.setProperty("--sr-delay", `${delay}ms`);
            el.setAttribute("data-sr", "in");
            observer.unobserve(el);
            // Hand the element back to its normal styles (e.g. hover effects) once revealed
            setTimeout(() => {
              el.removeAttribute("data-sr");
              el.style.removeProperty("--sr-delay");
            }, 1300 + delay);
          });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
