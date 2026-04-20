// src/components/AboutMe.jsx
import React, { useState, useEffect, useRef } from "react";
import FadeIn from "./FadeIn";
import pauPortrait from "../assets/about/pau_portrait.png";
import pauPortrait2 from "../assets/about/pau_portrait2.png";
import pauPortrait3 from "../assets/about/pau_portrait3.png";

const portraits = [pauPortrait, pauPortrait2, pauPortrait3];

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
      <section id="about-me" className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-pink-500 mb-2">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-2">
            A bit more about <span className="text-pink-500">me</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">Professional oversharer</p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 items-start">

          {/* Left: portrait carousel */}
          <div className="flex flex-col items-center gap-4">
            {/* Image container */}
            <div className="relative w-64 sm:w-72 lg:w-full rounded-2xl overflow-hidden border border-pink-100 shadow-md" style={{ aspectRatio: "4/5" }}>
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
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-pink-100 shadow flex items-center justify-center text-pink-500 hover:bg-pink-50 transition-colors z-10"
                aria-label="Previous photo"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Next button */}
              <button
                onClick={() => handleNav((current + 1) % portraits.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-pink-100 shadow flex items-center justify-center text-pink-500 hover:bg-pink-50 transition-colors z-10"
                aria-label="Next photo"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Name tag — centered */}
            <div className="bg-pink-500 text-white text-xs font-semibold px-5 py-1.5 rounded-full shadow-sm text-center">
              Pau / Philippines
            </div>

            {/* Dot indicators — centered */}
            <div className="flex gap-2 justify-center">
              {portraits.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleNav(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "w-5 h-2 bg-pink-500" : "w-2 h-2 bg-pink-200 hover:bg-pink-300"
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: bio text */}
          <div className="flex flex-col justify-start gap-5">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              I'm <strong className="text-gray-900 font-semibold">Pauline Erika M. Mapoy</strong>, but you can call me <strong className="text-gray-900 font-semibold">Pau</strong>. I'm based in the Philippines, and I'm currently pursuing a degree in Information Technology with a specialization in Web and Mobile Application Development at FEU Institute of Technology. As a President's Scholar, I've learned to balance academic excellence with active involvement in organizations such as JPCS and Tambayan TV, where I continue to grow both professionally and personally.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Outside the technical side, I also create content and have collaborated with well-known local cosmetic brands, allowing me to express my creativity through digital storytelling. I've always been drawn to the arts and anything that involves communication. When I'm not on my computer, I spend my time doing special effects (SFX) makeup, a skill I picked up during the pandemic. I also work as a freelance event host and have recently started exploring voice acting.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              At the core of everything I do is my love for communication and creative expression, whether through technology, storytelling, or live interaction. It's something I naturally gravitate toward, and I keep discovering in new ways through experiences and challenges.
            </p>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
