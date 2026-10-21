// src/components/AboutMe.jsx
import React, { useState, useEffect, useRef } from "react";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
import pauPortrait from "../assets/about/pau_portrait.webp";
import pauPortrait2 from "../assets/about/pau_portrait2.webp";
import pauPortrait3 from "../assets/about/pau_portrait3.png";

const portraits = [pauPortrait, pauPortrait2, pauPortrait3];

// ── Edit your About text here ─────────────────────
const intro = {
  greeting: "I'm Pauline Erika M. Mapoy, but you can call me Pau.",
  line: "An IT student who's drawn to anything that involves communication, whether through technology, storytelling, or live interaction.",
};

const facts = [
  { label: "Based in",    value: "Philippines",                               icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" },
  { label: "Studying",    value: "IT, Web & Mobile Apps at FEU Tech",          icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" },
  { label: "Scholarship", value: "President's Scholar",                        icon: "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" },
  { label: "Active in",   value: "JPCS · Tambayan TV",                         icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
];

const offTheClock = [
  { title: "SFX makeup",       note: "Picked it up during the pandemic" },
  { title: "Event hosting",    note: "Freelance host since 2023" },
  { title: "Voice acting",     note: "Recently started exploring" },
  { title: "Content creation", note: "Collabs with local cosmetic brands" },
];

const quote = "At the core of everything I do is my love for communication and creative expression.";
// ──────────────────────────────────────────────────

export default function AboutMe() {
  const [current, setCurrent] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const timerRef = useRef(null);
  const transitioning = useRef(false);

  function crossfadeTo(idx) {
    if (transitioning.current || idx === current) return;
    transitioning.current = true;

    // Fade out
    setOpacity(0);

    setTimeout(() => {
      // Swap image while invisible
      setCurrent(idx);
      // Fade in
      setOpacity(1);
      setTimeout(() => {
        transitioning.current = false;
      }, 500);
    }, 400);
  }

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % portraits.length;
        // Direct crossfade without going through crossfadeTo to avoid stale closure
        transitioning.current = true;
        setOpacity(0);
        setTimeout(() => {
          setCurrent(next);
          setOpacity(1);
          setTimeout(() => { transitioning.current = false; }, 500);
        }, 400);
        return prev; // will be overridden by the setTimeout above
      });
    }, 4500);
  }

  // Auto-advance
  useEffect(() => {
    let idx = 0;
    timerRef.current = setInterval(() => {
      idx = (idx + 1) % portraits.length;
      if (!transitioning.current) {
        transitioning.current = true;
        setOpacity(0);
        const nextIdx = idx;
        setTimeout(() => {
          setCurrent(nextIdx);
          setOpacity(1);
          setTimeout(() => { transitioning.current = false; }, 500);
        }, 400);
      }
    }, 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  function handleNav(idx) {
    clearInterval(timerRef.current);
    crossfadeTo(idx);
    // Restart timer from now
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        if (!transitioning.current) {
          const next = (prev + 1) % portraits.length;
          transitioning.current = true;
          setOpacity(0);
          setTimeout(() => {
            setCurrent(next);
            setOpacity(1);
            setTimeout(() => { transitioning.current = false; }, 500);
          }, 400);
        }
        return prev;
      });
    }, 4500);
  }

  return (
    <FadeIn>
      <section id="about-me" className="section-container py-16 sm:py-20">
        {/* Header */}
        <SectionHeader
          number="01"
          eyebrow="About"
          title={<>A bit more about <span className="text-pink-500">me</span></>}
          subtitle="Professional oversharer"
        />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 items-start">

          {/* Left: portrait carousel */}
          <div className="flex flex-col items-center gap-5">
            {/* Image container */}
            <div className="brutal-card relative w-64 sm:w-72 lg:w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <img
                src={portraits[current]}
                alt="Pauline Erika M. Mapoy"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity,
                  transition: "opacity 0.5s cubic-bezier(0.4,0,0.2,1)",
                  willChange: "opacity",
                }}
              />

              {/* Prev button */}
              <button
                onClick={() => handleNav((current - 1 + portraits.length) % portraits.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 brutal-chip !rounded-full w-9 h-9 flex items-center justify-center text-pink-500 hover:!bg-pink-50 dark:hover:!bg-pink-500/15 z-10"
                aria-label="Previous photo"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Next button */}
              <button
                onClick={() => handleNav((current + 1) % portraits.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 brutal-chip !rounded-full w-9 h-9 flex items-center justify-center text-pink-500 hover:!bg-pink-50 dark:hover:!bg-pink-500/15 z-10"
                aria-label="Next photo"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Name tag — centered */}
            <div className="brutal-tag bg-[var(--accent)] text-white text-xs font-black px-5 py-1.5 text-center">
              Pau / Philippines
            </div>

            {/* Dot indicators — centered */}
            <div className="flex gap-2 justify-center">
              {portraits.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleNav(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "w-5 h-2 bg-pink-500" : "w-2 h-2 bg-pink-200 dark:bg-pink-500/30 hover:bg-pink-300"
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: bio, broken into scannable pieces */}
          <div className="flex flex-col gap-6">
            {/* Intro */}
            <div>
              <p className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                {intro.greeting}
              </p>
              <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {intro.line}
              </p>
            </div>

            {/* Quick facts */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {facts.map((f) => (
                <li key={f.label} className="brutal-card [--brutal-offset:4px] p-4 flex items-center gap-3">
                  <span className="brutal-tag w-10 h-10 !rounded-lg shrink-0 flex items-center justify-center bg-pink-50 dark:bg-pink-500/15 text-[var(--accent-ink)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">{f.label}</span>
                    <span className="block text-sm font-bold text-gray-900 dark:text-white leading-snug">{f.value}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Hobbies */}
            <div>
              <p className="text-xs font-black tracking-widest uppercase text-gray-900 dark:text-white mb-3">Off the clock</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {offTheClock.map((h) => (
                  <li key={h.title} className="brutal-chip px-3 py-2">
                    <span className="block text-sm font-black text-gray-900 dark:text-white">{h.title}</span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">{h.note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pull quote */}
            <blockquote className="brutal-tag !rounded-2xl bg-[var(--accent)] text-white p-5 sm:p-6">
              <p className="text-lg sm:text-xl font-black leading-snug">“{quote}”</p>
              <footer className="mt-2 text-sm font-bold text-white/80">— Pau</footer>
            </blockquote>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
