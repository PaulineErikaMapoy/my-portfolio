// src/components/Projects.jsx
// Projects as "case files": each one is a big spread with its poster stacked
// like papers (click to open full size) beside the story, features and results. Spreads alternate
// sides. Slide-deck projects use the same layout, with the slides flippable in the poster spot.
import React, { useCallback, useRef, useState } from "react";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
import CertificateViewer from "./CertificateViewer";

// Web-sized copies of the posters in assets/Projects
import bloomoraPoster from "../assets/Projects/web/alyerto-project.jpg";
import bloomoraResearch from "../assets/Projects/web/alyerto-research.jpg";
import ignisPoster from "../assets/Projects/web/ignisaid.jpg";


// ── Edit your projects here ───────────────────────
// Posters go in `posters`. For a slide deck, use `slides: [{ label, src }, ...]` instead
// (CashTrack's web-sized slides are kept in assets/Projects/web/cashtrack for later).
const projects = [
  {
    name: "Bloomora",
    tagline: "Flower shop ordering app with AI bouquet previews",
    client: "Esting's Flower International Inc.",
    tags: ["Web App", "Mobile App", "Generative AI", "Research"],
    accent: "pink",
    role: "Project Manager & Front-End Dev",
    problem: "The shop ran on manual records, and customers had a hard time describing custom bouquets.",
    built: "Web and mobile ordering with shop management. Customers build a bouquet or describe one and get an AI preview.",
    features: ["Quotations", "Sales analytics", "Inventory", "AI bouquet preview"],
    stats: [
      { value: "30/30", label: "modules passed" },
      { value: "3.69", label: "web quality, out of 4" },
      { value: "3.67", label: "mobile quality, out of 4" },
    ],
    team: "Team Alyerto",
    posters: [
      { label: "Project poster", src: bloomoraPoster },
      { label: "Research poster", src: bloomoraResearch },
    ],
  },
  {
    name: "IgnisAid",
    tagline: "Fire emergency app for people with disabilities",
    tags: ["Mobile App", "Accessibility", "AI Assistant", "SDG 10"],
    accent: "mint",
    role: "Project Manager & UI/UX Designer",
    problem: "Blind people face a higher risk in fires and can't rely on visual cues to get out.",
    built: "One tap sends an SOS, and an AI assistant guides the user until help arrives.",
    features: ["One-tap SOS", "Fire alerts", "Community fire reports", "AI guidance"],
    team: "Team Alyerto",
    posters: [{ label: "Official poster", src: ignisPoster }],
  },
];
// ──────────────────────────────────────────────────

function PosterStack({ project, index, onOpen }) {
  const [front, ...back] = project.posters;
  const mint = project.accent === "mint";
  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] pt-4 pb-6 px-4">
      {/* Paper behind: the second poster if there is one, otherwise a solid accent sheet */}
      {back[0] ? (
        <button
          onClick={() => onOpen(back[0])}
          aria-label={`Open ${project.name} ${back[0].label.toLowerCase()}`}
          className="group absolute inset-x-4 top-4 bottom-6 rotate-[5deg] translate-x-5 hover:translate-x-8 hover:rotate-[7deg] transition-transform duration-300"
        >
          <span className="brutal-card block w-full h-full overflow-hidden [--brutal-offset:6px]">
            <img src={back[0].src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
          </span>
        </button>
      ) : (
        <span
          aria-hidden="true"
          className={`absolute inset-x-4 top-4 bottom-6 rotate-[5deg] translate-x-5 rounded-2xl border-[3px] border-[var(--brutal-border)] ${mint ? "bg-[var(--mint)]" : "bg-[var(--accent)]"}`}
        />
      )}

      {/* Front poster */}
      <button
        onClick={() => onOpen(front)}
        aria-label={`Open ${project.name} ${front.label.toLowerCase()}`}
        className="group relative block w-full -rotate-2 hover:rotate-0 hover:-translate-y-1 transition-transform duration-300"
      >
        <span className={`brutal-card block overflow-hidden aspect-[5/7] [--brutal-offset:10px] ${mint ? "brutal-mint" : ""}`}>
          <img src={front.src} alt={`${project.name} ${front.label.toLowerCase()}`} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-white text-xs font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
            View poster ↗
          </span>
        </span>
      </button>

      {/* Case-file stamp */}
      <span className="absolute -top-1 -left-1 z-10 -rotate-12 brutal-tag bg-[var(--brutal-chip-bg)] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-gray-900 dark:text-white">
        Case {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

// Slide-deck version of PosterStack: same stacked-paper look and stamp, but landscape,
// with arrows / swipe / arrow keys to flip through the slides
function SlideDeck({ project, index, onOpen }) {
  const slides = project.slides;
  const [i, setI] = useState(0);
  const touchX = useRef(null);
  const go = (d) => setI((n) => (n + d + slides.length) % slides.length);
  const slide = slides[i];
  const next = slides[(i + 1) % slides.length];

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="relative mx-auto w-full max-w-[460px] pt-4 pb-6 px-4">
        {/* Next slide peeking out behind, like the second poster */}
        <button
          onClick={() => go(1)}
          aria-label="Show the next slide"
          className="absolute inset-x-4 top-4 bottom-6 rotate-[4deg] translate-x-4 hover:translate-x-6 hover:rotate-[6deg] transition-transform duration-300"
        >
          <span className="brutal-card block w-full h-full overflow-hidden [--brutal-offset:6px]">
            <img src={next.src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </span>
        </button>

        {/* Current slide */}
        <button
          onClick={() => onOpen(slide)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - (touchX.current ?? e.changedTouches[0].clientX);
            if (Math.abs(dx) > 40) {
              e.preventDefault(); // a swipe flips slides instead of opening the viewer
              go(dx < 0 ? 1 : -1);
            }
          }}
          aria-label={`Open ${project.name} slide ${i + 1}: ${slide.label}`}
          className="group relative block w-full -rotate-2 hover:rotate-0 hover:-translate-y-1 transition-transform duration-300"
        >
          <span className="brutal-card block overflow-hidden aspect-video [--brutal-offset:10px]">
            <img key={slide.src} src={slide.src} alt={`${project.name}: ${slide.label}`} decoding="async" className="deck-slide w-full h-full object-cover" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-white text-xs font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
              View slide ↗
            </span>
          </span>
        </button>

        {/* Case-file stamp */}
        <span className="absolute -top-1 -left-1 z-10 -rotate-12 brutal-tag bg-[var(--brutal-chip-bg)] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-gray-900 dark:text-white">
          Case {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Controls, styled like the poster buttons */}
      <div className="flex items-center justify-center gap-2 mt-2">
        <button onClick={() => go(-1)} aria-label="Previous slide" className="brutal-chip w-9 h-9 flex items-center justify-center text-sm font-black text-gray-900 dark:text-white hover:bg-pink-50 dark:hover:bg-pink-500/15">←</button>
        <span className="brutal-chip px-3 h-9 flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white min-w-0">
          <span className="font-mono text-gray-500 dark:text-gray-400">{String(i + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}</span>
          <span className="truncate max-w-[9rem]">{slide.label}</span>
        </span>
        <button onClick={() => go(1)} aria-label="Next slide" className="brutal-chip w-9 h-9 flex items-center justify-center text-sm font-black text-gray-900 dark:text-white hover:bg-pink-50 dark:hover:bg-pink-500/15">→</button>
      </div>
    </div>
  );
}

function Label({ children }) {
  return <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-1.5">{children}</p>;
}

function ProjectSpread({ project, index, onOpen }) {
  const flip = index % 2 === 1;
  const mint = project.accent === "mint";
  const accentText = mint ? "text-teal-600 dark:text-[var(--mint)]" : "text-pink-500";

  return (
    <article data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      {/* Visual: poster stack or slide deck, same spot and style for every project */}
      <div className={`lg:col-span-5 lg:sticky lg:top-10 ${flip ? "lg:order-2" : ""}`}>
        {project.slides ? (
          <SlideDeck project={project} index={index} onOpen={onOpen} />
        ) : (
          <PosterStack project={project} index={index} onOpen={onOpen} />
        )}
        {project.posters?.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {project.posters.map((p) => (
              <button key={p.label} onClick={() => onOpen(p)} className="brutal-chip px-3 py-1.5 text-xs font-bold text-gray-900 dark:text-white hover:bg-pink-50 dark:hover:bg-pink-500/15">
                {p.label} ↗
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={`lg:col-span-7 min-w-0 ${flip ? "lg:order-1" : ""}`}>
        {/* Giant outlined number + tags */}
        <div className="flex items-end gap-4 mb-3">
          <span
            aria-hidden="true"
            className="text-6xl sm:text-7xl font-bold leading-none tracking-tighter text-transparent select-none"
            // A static (non-variable) font: the site font's overlapping glyph parts show as stray lines when outlined
            style={{ WebkitTextStroke: "2px var(--brutal-border)", fontFamily: '"Arial Black", "Helvetica Neue", Arial, sans-serif' }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-wrap gap-1.5 pb-1">
            {project.tags.map((t) => (
              <span key={t} className="brutal-tag bg-[var(--brutal-chip-bg)] px-2 py-0.5 text-[11px] font-bold text-gray-900 dark:text-white">
                {t}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
          {project.name}<span className={accentText}>.</span>
        </h3>
        <p className="mt-2 text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 leading-snug">{project.tagline}</p>
        {project.client && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            for <span className="font-bold text-gray-900 dark:text-white">{project.client}</span>
          </p>
        )}

        {/* Problem → solution, like a case file */}
        <div className="grid sm:grid-cols-2 gap-5 mt-6 pt-5 border-t-2 border-dashed border-[var(--brutal-border)]">
          <div>
            <Label>Problem</Label>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{project.problem}</p>
          </div>
          <div>
            <Label>Solution</Label>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{project.built}</p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6">
          <Label>Features</Label>
          <ul className="grid sm:grid-cols-2 gap-2">
            {project.features.map((f, i) => (
              <li key={f} className="flex items-center gap-3 rounded-lg border-2 border-[var(--brutal-chip-border)] bg-[var(--brutal-chip-bg)] px-3 py-2">
                <span className={`font-mono text-xs font-bold ${accentText}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Results strip */}
        {project.stats && (
        <div className={`brutal-card ${mint ? "brutal-mint" : ""} mt-6 grid grid-cols-3 divide-x-2 divide-[var(--brutal-border)]`}>
          {project.stats.map((s) => (
            <div key={s.label} className="p-3 sm:p-4 min-w-0">
              <p className={`text-xl sm:text-3xl font-black leading-none ${accentText}`}>{s.value}</p>
              <p className="mt-1.5 text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
        )}

        {/* Team + role */}
        <div className="flex flex-wrap items-center gap-2 mt-5 text-sm">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Built with</span>
          <span className="font-black text-gray-900 dark:text-white">{project.team}</span>
          {project.role && (
            <span className="brutal-tag bg-[var(--brutal-chip-bg)] px-2 py-0.5 text-[11px] font-bold text-gray-900 dark:text-white">
              My role: {project.role}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <div className="band-plus">
    <FadeIn>
      <section id="projects" className="section-container py-16 sm:py-20">
        <SectionHeader
          number="03"
          eyebrow="Projects"
          title={<>Things I've <span className="text-pink-500">built</span></>}
          subtitle="Ideas that made it out of my head and into the world."
        />

        <div className="flex flex-col gap-20 sm:gap-24">
          {projects.map((p, i) => (
            <ProjectSpread key={p.name} project={p} index={i} onOpen={(poster) => setOpen({ project: p, poster })} />
          ))}
        </div>

        {open && (
          <CertificateViewer
            entry={{ title: `${open.project.name}: ${open.poster.label}`, org: open.project.team, when: open.project.tags.slice(0, 2).join(" · "), full: open.poster.src }}
            onClose={close}
          />
        )}
      </section>
    </FadeIn>
    </div>
  );
}
