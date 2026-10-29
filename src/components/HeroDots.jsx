// src/components/HeroDots.jsx
// Animated background for the home section: a grid of small dots with a bit of physics.
// - As the intro reveals the page, the dots fly in from scattered spots and snap into the grid.
// - A slow pink wave rolls through them.
// - The mouse pushes dots aside as it moves (they spring back), and clicking on the
//   background sends out a pink shockwave ring.
// Drawn on a canvas; it pauses when the home section is off screen or the tab is hidden,
// and visitors who prefer reduced motion get a still dot grid.
import React, { useEffect, useRef } from "react";

const GAP = 26;            // space between dots (px)
const BASE_R = 1.3;        // resting dot radius
const WAVE_R = 2.2;        // extra radius at the crest of the wave
const PUSH_REACH = 110;    // how far the mouse pushes dots (px)
const PUSH_FORCE = 2.2;    // how hard the mouse pushes
const SPRING = 0.05;       // how quickly a dot returns home
const DAMPING = 0.86;      // how quickly the wobble settles
const RING_SPEED = 0.55;   // shockwave speed (px per ms)
const RING_WIDTH = 46;     // thickness of the shockwave ring (px)
const RING_LIFE = 1600;    // how long a shockwave lasts (ms)

export default function HeroDots() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas.parentElement; // the home section
    const ctx = canvas.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0 };
    let dots = [];
    let rings = [];
    let w = 0, h = 0, frame = null, visible = true, last = performance.now();
    const start = last;

    const build = () => {
      const next = [];
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) next.push({ hx: x, hy: y, x, y, vx: 0, vy: 0 });
      }
      dots = next;
    };
    // Throw every dot somewhere random; the springs then pull them back into the grid
    const scatter = () => {
      if (still) return;
      for (const d of dots) {
        d.x = Math.random() * w;
        d.y = Math.random() * h;
        d.vx = d.vy = 0;
      }
      play();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (still) draw(0, 0);
    };

    function draw(t, dt) {
      const dark = document.documentElement.classList.contains("dark");
      const rest = dark ? "255,255,255" : "17,17,17";
      const restAlpha = dark ? 0.12 : 0.14;
      const step = Math.min(dt / 16.7, 2); // frame-rate independent
      rings = rings.filter((r) => t - r.t < RING_LIFE);
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        if (!still) {
          // Mouse pushes dots away, a little more when it moves fast
          const mx = d.x - mouse.x, my = d.y - mouse.y;
          const md = Math.hypot(mx, my);
          if (md < PUSH_REACH && md > 0.1) {
            const f = (1 - md / PUSH_REACH) ** 2 * PUSH_FORCE * (1 + Math.min(Math.hypot(mouse.vx, mouse.vy), 3) * 0.3);
            d.vx += (mx / md) * f * step;
            d.vy += (my / md) * f * step;
          }
          // Shockwaves push dots outward as the ring passes
          for (const r of rings) {
            const age = t - r.t;
            const radius = age * RING_SPEED;
            const rx = d.hx - r.x, ry = d.hy - r.y;
            const rd = Math.hypot(rx, ry);
            const off = Math.abs(rd - radius);
            if (off < RING_WIDTH && rd > 0.1) {
              const f = (1 - off / RING_WIDTH) * 1.6 * (1 - age / RING_LIFE);
              d.vx += (rx / rd) * f * step;
              d.vy += (ry / rd) * f * step;
            }
          }
          // Spring back home
          d.vx = (d.vx + (d.hx - d.x) * SPRING * step) * DAMPING ** step;
          d.vy = (d.vy + (d.hy - d.y) * SPRING * step) * DAMPING ** step;
          d.x += d.vx * step;
          d.y += d.vy * step;
        }

        // Pink when on the wave crest, or when pushed out of place
        const wave = still ? 0 : Math.max(0, Math.sin((d.hx * 0.6 + d.hy) / 140 - t / 1400)) ** 6;
        const moved = Math.min(1, Math.hypot(d.x - d.hx, d.y - d.hy) / 18);
        const pink = Math.min(1, wave + moved);
        const r = BASE_R + wave * WAVE_R + moved * 1.6;

        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = pink > 0.05
          ? `rgba(236,72,153,${(0.2 + pink * 0.6).toFixed(3)})`
          : `rgba(${rest},${restAlpha})`;
        ctx.fill();
      }
      mouse.vx *= 0.9;
      mouse.vy *= 0.9;
    }

    const loop = (now) => {
      const dt = now - last;
      last = now;
      draw(now - start, dt);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : null;
    };
    const play = () => {
      if (still || frame !== null || !visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      if (mouse.x > -9999) { mouse.vx = (x - mouse.x) / 8; mouse.vy = (y - mouse.y) / 8; }
      mouse.x = x;
      mouse.y = y;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    // Shockwave on clicks on the background (not on buttons, links or the photo)
    const onDown = (e) => {
      if (e.target.closest("a, button, img, [role='button']")) return;
      const rect = canvas.getBoundingClientRect();
      rings.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, t: performance.now() - start });
      play();
    };

    // Only animate while the home section is on screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      play();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    document.addEventListener("visibilitychange", play);
    host.addEventListener("pointerdown", onDown);
    window.addEventListener("intro:reveal", scatter);
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    resize();
    play();

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", play);
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("intro:reveal", scatter);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 w-full h-full" />;
}
