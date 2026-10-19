// src/components/Experience.jsx
// Work experience, newest first
import React from "react";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
import devconLogo from "../assets/Work/DEVCONLogo.png";
import netAestheticsLogo from "../assets/Work/NetAestheticsLogo.png";

// ── Edit your experience here ─────────────────────
const jobs = [
  {
    company: "Developers Connect Philippines (DevCon)",
    logo: devconLogo,
    role: "AI Engineer Intern",
    location: "Ortigas, Pasig",
    setup: "Hybrid",
    period: "August 2026 – Present",
    // Placeholder bullets: replace with what you actually do
    highlights: [
      "Build and test AI-powered tools and workflows that support DevCon's community programs and events.",
      "Experiment with prompt engineering and AI-assisted development to prototype features quickly.",
      "Collaborate with the team to document findings and turn experiments into usable resources for developers.",
    ],
  },
  {
    company: "NetAesthetics",
    logo: netAestheticsLogo,
    role: "UI/UX Engineer Intern",
    location: "Washington, DC",
    setup: "Remote",
    period: "June 2024 – September 2024",
    highlights: [
      "Designed intuitive user interfaces in Figma, translating product requirements into polished wireframes and high-fidelity mockups.",
      "Conducted user research and usability testing to uncover pain points and validate design decisions.",
      "Iterated on design solutions based on user feedback, refining flows across web, mobile, and other digital products.",
    ],
  },
];
// ──────────────────────────────────────────────────

export default function Experience() {
  return (
    <FadeIn>
      <section id="experience" className="section-container pt-10 sm:pt-12 pb-16 sm:pb-20">
        <SectionHeader
          number="01"
          eyebrow="Experience"
          title={<>Where I've <span className="text-pink-500">worked</span></>}
          subtitle="Internships where I've designed, built, and shipped."
        />

        <ol className="flex flex-col gap-8">
          {jobs.map((job) => (
            <li key={job.company} className="grid grid-cols-1 md:grid-cols-[210px_1fr] gap-3 md:gap-8">
              {/* When + where */}
              <div data-reveal className="md:pt-5 flex md:flex-col flex-wrap items-center md:items-start gap-2">
                <p className="text-sm font-black text-gray-900 dark:text-white">{job.period}</p>
                <span className="brutal-tag inline-block bg-[var(--brutal-chip-bg)] text-gray-700 dark:text-gray-300 text-[11px] font-bold px-2 py-0.5">
                  {job.setup}
                </span>
              </div>

              {/* Role card */}
              <div className="brutal-card brutal-hover p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div className="min-w-0 flex items-center gap-4">
                    {/* White tile keeps dark logos visible in dark mode */}
                    <span className="brutal-tag !rounded-xl w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-white flex items-center justify-center p-2">
                      <img loading="lazy" decoding="async" src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-contain" />
                    </span>
                    <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-black leading-snug text-gray-900 dark:text-white">{job.role}</h3>
                    <p className="text-sm sm:text-base font-bold text-[var(--accent-ink)] mt-0.5">{job.company}</p>
                    </div>
                  </div>
                  {job.current && (
                    <span className="brutal-tag inline-flex items-center gap-1.5 bg-[var(--accent)] text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
                      Current
                    </span>
                  )}
                </div>

                <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {job.location} ({job.setup})
                </p>

                {job.highlights.length > 0 && (
                  <ul className="mt-4 pt-4 border-t-2 border-gray-100 dark:border-white/10 flex flex-col gap-2.5">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm sm:text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed">
                        <span className="mt-2 w-2 h-2 shrink-0 rounded-[2px] bg-[var(--accent)]" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </FadeIn>
  );
}
