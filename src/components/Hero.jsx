// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import HeroTapes from "./HeroTapes";
import PauPhoto from "../assets/about/PauMainPortrait-web.jpg"; // web-sized copy of PauMainPortrait.jpg
import PauHoverPhoto from "../assets/about/HoverPhoto-web.jpg"; // web-sized copy of HoverPhoto.jpg

// ── Your CV ───────────────────────────────────────
// public/Pauline-Mapoy-CV.pdf. To update it, replace that file (same name).
const CV_FILE = "/Pauline-Mapoy-CV.pdf";
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
    // Desktop: fills the first screen with the content centered vertically
    <section
      id="hero"
      className="pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-14 xl:pb-24 lg:min-h-svh lg:flex lg:flex-col lg:justify-center relative overflow-clip"
    >

      <HeroTapes />

      <div className="section-container relative z-10 flex flex-col xl:flex-row items-center gap-10 xl:gap-14">
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
            An IT student at FEU Institute of Technology who enjoys both the{" "}
            <span className="font-medium">technical and creative sides</span> of building things. From{" "}
            <span className="font-medium">developing web and mobile apps</span> to{" "}
            <span className="font-medium">designing interfaces</span>,{" "}
            <span className="font-medium">creating content</span>, and{" "}
            <span className="font-medium">marketing ideas</span>, I like exploring different ways to bring ideas to life. I guess I just don't like sticking to one lane.
          </p>

          {/* Quick stats: typographic, no boxes, so the buttons below stay the only "chunky" row */}
          <ul className="flex justify-center xl:justify-start divide-x-2 divide-gray-200 dark:divide-white/15">
            {[
              { value: "3", label: "Certifications" },
              { value: "2", label: "Internships" },
              { value: "2", label: "Hackathon wins" },
            ].map((s) => (
              <li key={s.label} className="px-2.5 min-[375px]:px-4 sm:px-6 first:pl-0 last:pr-0 text-center xl:text-left">
                <span className="block text-3xl sm:text-4xl font-black leading-none text-[var(--accent-ink)]">{s.value}</span>
                <span className="block mt-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider min-[375px]:tracking-widest text-gray-500 dark:text-gray-400">
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

            <a
              href={CV_FILE}
              download="Pauline-Mapoy-CV.pdf"
              className="brutal-btn brutal-mint min-w-40 whitespace-nowrap px-5 py-2.5 text-sm sm:text-base font-black text-gray-900 dark:text-white bg-[var(--brutal-chip-bg)] inline-flex items-center justify-center gap-2"
            >
              Download CV
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </a>
          </div>

        </div>

        {/* Photo side (shown first on phones and tablets, beside the text on wide screens) */}
        <div className="order-first xl:order-none xl:shrink-0 flex justify-center px-6 sm:px-10">
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


    </section>
  );
}
