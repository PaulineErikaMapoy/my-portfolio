// src/components/HeroTapes.jsx
// Animated background for the home section: two bold "caution tape" bands crossing at an angle,
// with skills scrolling along them in opposite directions. They speed up while the page is
// being scrolled, then ease back. Styles under "Hero tapes" in index.css.
// (The previous dot-grid background is still in HeroDots.jsx if we want to switch back.)
import React, { useEffect, useRef } from "react";

const tapes = [
  { words: ["React", "UI/UX Design", "Figma", "AI Engineer", "Front-End", "React Native", "Tailwind CSS"], className: "hero-tape-1" },
  { words: ["Project Manager", "Hackathon Champ", "Web & Mobile", "Python", "User Research", "JavaScript", "Prototyping"], className: "hero-tape-2" },
];

function Tape({ words, className }) {
  // The text is repeated twice so the loop is seamless (the track moves by exactly half its width)
  const run = (
    <span className="hero-tape-run">
      {words.map((w) => (
        <span key={w} className="hero-tape-item">
          {w}
          <span className="hero-tape-star" aria-hidden="true">✦</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className={`hero-tape ${className}`}>
      <div className="hero-tape-track">
        {run}
        {run}
        {run}
        {run}
      </div>
    </div>
  );
}

export default function HeroTapes() {
  const root = useRef(null);

  // Speed the tapes up while the page scrolls, then ease back to normal
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anims = () => root.current?.getAnimations({ subtree: true }) ?? [];
    let lastY = window.scrollY;
    let boost = 0;
    let frame = null;
    const tick = () => {
      boost *= 0.92;
      for (const a of anims()) a.playbackRate = 1 + boost;
      frame = boost > 0.02 ? requestAnimationFrame(tick) : null;
      if (frame === null) for (const a of anims()) a.playbackRate = 1;
    };
    const onScroll = () => {
      const y = window.scrollY;
      boost = Math.min(boost + Math.abs(y - lastY) / 40, 6);
      lastY = y;
      if (frame === null) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="hero-tapes pointer-events-none absolute inset-0 overflow-hidden">
      {tapes.map((t) => (
        <Tape key={t.className} {...t} />
      ))}
    </div>
  );
}
