// src/components/WalkingPet.jsx
// A little orange tabby that strolls left and right along the bottom of the screen, stays there
// while you scroll, never stops walking, and meows + shows a heart when clicked.
import React, { useEffect, useRef, useState } from "react";

// px width of the cat (a bit smaller on phones)
const SIZE = typeof window !== "undefined" && window.innerWidth < 640 ? 68 : 84;
const SPEED = 46;     // px per second
const MARGIN = 12;    // keep this far from the screen edges

export default function WalkingPet() {
  const petRef = useRef(null);
  const [facing, setFacing] = useState(1); // 1 = walking right, -1 = left
  // Visitors who prefer less motion get a cat that just sits there
  const [sitting] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [hearts, setHearts] = useState([]);
  const [meow, setMeow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The desktop sidebar covers the left side, so start walking right of it
    const leftEdge = () => {
      const aside = document.querySelector("aside");
      const r = aside?.getBoundingClientRect();
      return window.innerWidth >= 1024 && r ? r.right + MARGIN : MARGIN;
    };
    const rightEdge = () => window.innerWidth - SIZE - MARGIN;

    let x = Math.max(leftEdge(), Math.min(rightEdge(), window.innerWidth * 0.55));
    let dir = 1;
    let last = performance.now();
    let raf;

    const place = () => {
      if (petRef.current) petRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
    };
    place();
    if (reduced) return;

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      x += dir * SPEED * dt;
      const lo = leftEdge();
      const hi = rightEdge();
      if (x <= lo || x >= hi) {
        x = Math.max(lo, Math.min(hi, x));
        dir *= -1;
        setFacing(dir);
      }
      place();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const heartId = useRef(0);
  const meowTimer = useRef(null);
  useEffect(() => () => clearTimeout(meowTimer.current), []);

  function pet() {
    const id = ++heartId.current;
    setHearts((h) => [...h, id]);
    setTimeout(() => setHearts((h) => h.filter((x) => x !== id)), 1100);
    setMeow(true);
    clearTimeout(meowTimer.current);
    meowTimer.current = setTimeout(() => setMeow(false), 1400);
  }

  return (
    <div ref={petRef} className="walking-pet fixed bottom-0 left-0 z-[45]" style={{ width: SIZE }}>
      <button
        onClick={pet}
        aria-label="Pet the cat"
        title="Pet me!"
        className={`pet-body block w-full ${sitting ? "pet--sitting" : "pet--walking"}`}
        style={{ transform: `scaleX(${facing})` }}
      >
        <svg viewBox="0 0 64 52" className="w-full h-auto overflow-visible" aria-hidden="true">
          {/* Tail (curls up, orange with a dark tip) */}
          <path className="pet-tail" d="M13 31 C 1 28, 0 13, 8 8" fill="none" stroke="#2a1a12" strokeWidth="6.5" strokeLinecap="round" />
          <path className="pet-tail" d="M13 31 C 1 28, 0 13, 8 8" fill="none" stroke="#f28c28" strokeWidth="3.6" strokeLinecap="round" />
          <path className="pet-tail" d="M5.5 13 C 5 11, 6 9, 8 8" fill="none" stroke="#c4610f" strokeWidth="3.6" strokeLinecap="round" />
          {/* Legs: orange with cream socks */}
          {[
            ["pet-leg--a", 15], ["pet-leg--b", 23], ["pet-leg--b", 37], ["pet-leg--a", 45],
          ].map(([cls, x], i) => (
            <g key={i} className={`pet-leg ${cls}`}>
              <rect x={x} y="35" width="6.5" height="13" rx="3.2" fill="#f28c28" stroke="#2a1a12" strokeWidth="2.4" />
              <rect x={x + 1.2} y="43.5" width="4.1" height="3.6" rx="1.8" fill="#ffe3c2" />
            </g>
          ))}
          {/* Body + cream belly + tabby stripes */}
          <rect x="11" y="22" width="44" height="20" rx="10" fill="#f28c28" stroke="#2a1a12" strokeWidth="2.8" />
          <path d="M20 41 Q 33 36 46 41" fill="#ffe3c2" />
          <path d="M22 23.5 Q 24 28 22 32 M29 23 Q 31.5 28 29 33 M36 23 Q 38.5 28 36 32" fill="none" stroke="#c4610f" strokeWidth="2.6" strokeLinecap="round" />
          {/* Head */}
          <g className="pet-head">
            <path d="M41 14 L43 2 L50 9 Z" fill="#f28c28" stroke="#2a1a12" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M54 9 L61 2 L62 14 Z" fill="#f28c28" stroke="#2a1a12" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M44.2 8.5 L45 4.6 L48 8 Z" fill="#ff9fc6" />
            <path d="M56 8 L59.6 4.6 L60.3 9.3 Z" fill="#ff9fc6" />
            <circle cx="51" cy="18" r="11.5" fill="#f28c28" stroke="#2a1a12" strokeWidth="2.8" />
            {/* Forehead stripes */}
            <path d="M48 7.6 L49 11 M51 7 L51 11.2 M54 7.6 L53 11" stroke="#c4610f" strokeWidth="1.8" strokeLinecap="round" />
            {/* Cream muzzle */}
            <ellipse cx="51.3" cy="22.3" rx="6.2" ry="4.4" fill="#ffe3c2" />
            {/* Eyes with a shine */}
            <g className="pet-eye"><ellipse cx="46.8" cy="17" rx="2.1" ry="2.5" fill="#2a1a12" /><circle cx="47.5" cy="16.1" r="0.8" fill="#fff" /></g>
            <g className="pet-eye"><ellipse cx="55.8" cy="17" rx="2.1" ry="2.5" fill="#2a1a12" /><circle cx="56.5" cy="16.1" r="0.8" fill="#fff" /></g>
            {/* Blush, nose, mouth, whiskers */}
            <circle cx="43.6" cy="21.6" r="2" fill="#ff7fb0" opacity="0.55" />
            <circle cx="59" cy="21.6" r="2" fill="#ff7fb0" opacity="0.55" />
            <path d="M50.2 20.4 L52.4 20.4 L51.3 21.8 Z" fill="#ff6fa8" />
            <path d="M49.4 23 Q 50.4 24.2 51.3 23 Q 52.2 24.2 53.2 23" fill="none" stroke="#2a1a12" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M45 22 L39.5 21 M45 23.6 L39.8 24.6 M57.6 22 L63 21 M57.6 23.6 L62.8 24.6" stroke="#2a1a12" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
          </g>
          {/* Pink collar with a gold bell */}
          <path d="M42 27.5 Q 50 31.5 58.5 26.5" fill="none" stroke="var(--accent)" strokeWidth="3.6" strokeLinecap="round" />
          <circle cx="50.3" cy="31" r="2.3" fill="#ffd34d" stroke="#2a1a12" strokeWidth="1.2" />
        </svg>
      </button>

      {/* "meow!" bubble + hearts when petted (not flipped with the cat) */}
      {meow && (
        <span className="pet-meow brutal-tag absolute -top-9 left-1/2 bg-white text-gray-900 text-xs font-black px-2 py-1 whitespace-nowrap pointer-events-none" aria-hidden="true">
          meow!
        </span>
      )}
      {hearts.map((id) => (
        <span key={id} className="pet-heart absolute left-1/2 -top-2 text-[var(--accent)] text-xl font-black pointer-events-none" aria-hidden="true">
          ♥
        </span>
      ))}
    </div>
  );
}
