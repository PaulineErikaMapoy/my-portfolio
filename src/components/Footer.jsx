// src/components/Footer.jsx
// Closing section: a big pink "let's work together" card with email + CV download,
// then name, quick links to every section, socials, and a big name wordmark.
import React, { useState } from "react";
import scrollToSection from "../scrollToSection";

const EMAIL = "paulinemapoyph@gmail.com";
const CV_FILE = "/Pauline-Mapoy-CV.pdf"; // public/Pauline-Mapoy-CV.pdf

const links = [
  { id: "experience", label: "Experience" },
  { id: "hackathons", label: "Hackathons" },
  { id: "projects", label: "Projects" },
  { id: "involvement", label: "Involvement" },
  { id: "certifications", label: "Credentials" },
  { id: "skills", label: "Skills" },
  { id: "onstage", label: "On Stage" },
  { id: "socials", label: "Socials" },
];


export default function Footer() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }


  const socials = [
    {
      label: "Facebook",
      url: "https://www.facebook.com/paulinemapoy",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com/paulinemapoy/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/paulinemapoy/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  const copyIcon = copied ? (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25" /></svg>
  );

  return (
    <footer className="@container relative overflow-hidden border-t-[3px] border-[var(--brutal-border)]">
      {/* Call to action */}
      <div className="section-container pt-14 sm:pt-20">
        <div className="brutal-card [--brutal-shadow:var(--brutal-chip-border)] [--brutal-offset:10px] !bg-[var(--accent)] text-white p-7 sm:p-12">
          <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/85">Got something in mind?</p>
          <h2 className="mt-3 text-4xl sm:text-6xl font-black tracking-tight leading-[1.02]">
            Let's build something <span className="underline decoration-[6px] underline-offset-[6px] decoration-white/60">together</span>.
          </h2>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href={`mailto:${EMAIL}`}
              className="brutal-btn [--brutal-btn-shadow:#111111] px-5 py-3 bg-white text-gray-900 text-sm sm:text-base font-black break-all"
            >
              {EMAIL} ↗
            </a>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              title={copied ? "Copied!" : "Copy email"}
              className="brutal-btn [--brutal-btn-shadow:#111111] h-12 px-4 flex items-center gap-2 bg-white text-gray-900 text-sm font-bold"
            >
              {copyIcon}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
            <a
              href={CV_FILE}
              download="Pauline-Mapoy-CV.pdf"
              className="h-12 px-4 flex items-center gap-2 rounded-xl border-[3px] border-white text-white text-sm font-black hover:bg-white/15 transition-colors"
            >
              Download CV
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Info columns */}
      <div className="section-container grid grid-cols-1 md:grid-cols-12 gap-10 pt-14 pb-6">
        <div className="md:col-span-5">
          <p className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Pauline Mapoy</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Project Manager & Front-End Developer</p>
        </div>

        <nav className="md:col-span-4" aria-label="Footer">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-3">Explore</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {links.map((l) => (
              <li key={l.id}>
                <button onClick={() => scrollToSection(l.id)} className="text-sm font-bold text-gray-900 dark:text-white hover:text-[var(--accent-ink)] transition-colors">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-3">Find me on</p>
          <ul className="flex flex-col gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-sm font-bold text-gray-900 dark:text-white hover:text-[var(--accent-ink)] transition-colors"
                >
                  <span className="brutal-chip w-8 h-8 flex items-center justify-center [&_svg]:w-4 [&_svg]:h-4">{s.icon}</span>
                  {s.label}
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="section-container flex flex-wrap items-center justify-between gap-3 pt-5 pb-4 border-t-2 border-gray-100 dark:border-white/10">
        <p className="text-xs text-gray-400 dark:text-gray-500">© {new Date().getFullYear()} Pauline Erika Mapoy</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="brutal-chip px-3 py-1.5 flex items-center gap-1.5 text-xs font-black text-gray-900 dark:text-white"
        >
          Back to top
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
        </button>
      </div>

      {/* Big name wordmark, sized to the footer width and cut off at the bottom edge */}
      <p
        aria-hidden="true"
        className="select-none whitespace-nowrap text-center font-black uppercase tracking-tighter leading-[0.78] text-[13cqw] text-pink-100 dark:text-white/[0.05] -mb-[2cqw] pt-2"
      >
        Pauline Mapoy
      </p>
    </footer>
  );
}
