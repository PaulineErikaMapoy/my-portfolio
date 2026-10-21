// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import PauPhoto from "../assets/about/PauMainPortrait-web.jpg"; // web-sized copy of PauMainPortrait.jpg
import PauHoverPhoto from "../assets/about/HoverPhoto-web.jpg"; // web-sized copy of HoverPhoto.jpg

// ── Request CV ────────────────────────────────────
// The CV isn't published; visitors email a request instead (opens their mail app, pre-filled).
const CV_REQUEST = `mailto:paulinemapoyph@gmail.com?subject=${encodeURIComponent("CV request")}&body=${encodeURIComponent(
  "Hi Pau,\n\nI came across your portfolio and would love to see your CV.\n\nName:\nCompany / organization:\nWhat it's for:\n\nThanks!"
)}`;
// ──────────────────────────────────────────────────

export default function Hero() {
  const [altPhoto, setAltPhoto] = useState(false);
  const [text, setText] = useState("");
  const fullText = "Kumusta? I'm Pau!";
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const handleType = () => {
      const delta = isDeleting ? 100 : 150;
      setTimeout(() => {
        if (!isDeleting) {
          setText(fullText.substring(0, text.length + 1));
        } else {
          setText(fullText.substring(0, text.length - 1));
        }
      }, delta);
    };

    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    const timer = setTimeout(handleType, 50);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, fullText]);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="hero"
      className="pt-10 sm:pt-14 lg:pt-20 pb-12 sm:pb-14 xl:pb-24 relative overflow-hidden bg-gradient-to-b from-[#fed7e2] via-[#fef2f7] to-white dark:from-[#3a1230] dark:via-[#1c0e1c] dark:to-[var(--page-bg)]"
    >
      <div className="section-container flex flex-col xl:flex-row items-center gap-10 xl:gap-14">
        {/* Text side */}
        <div className="@container w-full xl:flex-1 min-w-0 text-center xl:text-left space-y-4 sm:space-y-6">
          <h1
            style={{ color: "var(--accent-ink)" }}
            className="text-[min(3.75rem,8cqw)] whitespace-nowrap font-black mb-4 leading-tight tracking-tight pt-6 sm:pt-8 md:pt-4"
          >
            <span className="inline-block">
              {text}
              <span className="animate-pulse ml-2" style={{ color: "var(--accent-ink)" }}>|</span>
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 mb-6 max-w-md sm:max-w-lg mx-auto xl:mx-0 leading-relaxed"
            style={{ textShadow: "0 2px 8px rgba(236, 72, 153, 0.15)" }}
          >
            A{" "}
            <span className="font-medium">22‑year‑old IT student</span>{" "}
            at FEU Institute of Technology with a specialization in{" "}
            <span className="font-medium">Web and Mobile Applications</span>. When I'm not coding, you'll find me doing{" "}
            <span className="font-medium">special effects makeup</span>,{" "}
            <span className="font-medium">hosting events</span>, or{" "}
            <span className="font-medium">lending my voice to characters</span>. I'm always up for creating something awesome, so let's make it happen!
          </p>

          {/* Quick stats: typographic, no boxes, so the buttons below stay the only "chunky" row */}
          <ul className="flex justify-center xl:justify-start divide-x-2 divide-gray-200 dark:divide-white/15">
            {[
              { value: "3", label: "Certifications" },
              { value: "2", label: "Internships" },
              { value: "2", label: "Hackathon wins" },
            ].map((s) => (
              <li key={s.label} className="px-4 sm:px-6 first:pl-0 last:pr-0 text-center xl:text-left">
                <span className="block text-3xl sm:text-4xl font-black leading-none text-[var(--accent-ink)]">{s.value}</span>
                <span className="block mt-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>

          {/* Buttons — fixed width so they don't stretch */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-2 items-center xl:items-start sm:justify-center xl:justify-start">
            <button
              onClick={() => scrollTo("certifications")}
              className="brutal-btn min-w-40 whitespace-nowrap px-5 py-2.5 text-sm sm:text-base font-black text-white bg-[var(--accent)]"
            >
              Credentials
            </button>

            {/* External link opens in a new tab; a PDF in /public downloads directly */}
            <a
              href={CV_REQUEST}
              className="brutal-btn brutal-mint min-w-40 whitespace-nowrap px-5 py-2.5 text-sm sm:text-base font-black text-gray-900 dark:text-white bg-[var(--brutal-chip-bg)] inline-flex items-center justify-center gap-2"
            >
              Request CV
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
          </div>

        </div>

        {/* Photo side */}
        <div className="xl:shrink-0 flex justify-center px-6 sm:px-10">
          <div className="relative">
            {/* Framed portrait: same outline + hard pink shadow as the cards */}
            {/* Hover (or tap on phones) crossfades to the second photo */}
            <button
              type="button"
              // Tap toggles on touch screens; on a computer the hover does the swap
              onClick={() => window.matchMedia("(hover: none)").matches && setAltPhoto((a) => !a)}
              aria-label="Show another photo of Pau"
              aria-pressed={altPhoto}
              className="group/photo block brutal-card [--brutal-offset:10px] relative overflow-hidden w-60 sm:w-72 md:w-80 xl:w-[340px] aspect-[4/5]"
            >
              <img
                src={PauPhoto}
                alt="Pauline Mapoy"
                fetchPriority="high" // first thing visitors see, so download it before anything else
                className={`absolute inset-0 w-full h-full object-cover object-top transition-[opacity,scale] duration-500 ease-out group-hover/photo:scale-105 ${
                  altPhoto ? "!opacity-0" : "group-hover/photo:!opacity-0"
                }`}
              />
              <img
                src={PauHoverPhoto}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover object-top transition-[opacity,scale] duration-500 ease-out group-hover/photo:scale-105 ${
                  altPhoto ? "!opacity-100" : "!opacity-0 group-hover/photo:!opacity-100"
                }`}
              />
            </button>

            {/* Role tags around the photo */}
            {[
              { label: "Developer",     pos: "top-[14%] -left-6 sm:-left-10 -rotate-6" },
              { label: "Makeup Artist", pos: "top-[6%] -right-5 sm:-right-9 rotate-3" },
              { label: "Voice Actor",   pos: "top-[52%] -right-6 sm:-right-10 -rotate-3" },
              { label: "Events Host",   pos: "bottom-[10%] -left-5 sm:-left-9 rotate-3" },
              { label: "President's Scholar", pos: "-bottom-4 -right-4 sm:-right-8 -rotate-2" },
            ].map((t) => (
              <span
                key={t.label}
                className={`brutal-tag absolute ${t.pos} bg-[var(--brutal-chip-bg)] text-[var(--accent-ink)] text-[11px] sm:text-xs font-black px-2.5 py-1 whitespace-nowrap`}
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Animated scroll arrow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden xl:flex flex-col items-center gap-1 opacity-70">
        <span className="text-xs text-pink-400 font-medium tracking-widest uppercase">scroll</span>
        <div className="flex flex-col items-center gap-0.5">
          <svg
            className="w-5 h-5 text-pink-400 animate-bounce-arrow"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <svg
            className="w-5 h-5 text-pink-300 animate-bounce-arrow"
            style={{ animationDelay: "0.18s" }}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(6px); opacity: 1; }
        }
        .animate-bounce-arrow {
          animation: bounce-arrow 1.4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
