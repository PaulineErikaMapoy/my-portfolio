// src/components/EventsHost.jsx
import React, { useState, useEffect, useRef } from "react";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";

import toTheFuture from "../assets/events/ToTheFutureAndBeyond.jpg";
import campRun from "../assets/events/CampRun.jpg";
import cohort4Graduation from "../assets/events/Cohort4GraduationNight.jpg";
import inPursuitOfProgress from "../assets/events/InPursuitOfProgress.JPG";
import aitsLaunchPad from "../assets/events/AITS_ITLaunchPad.JPG";
import innovMasterclass from "../assets/events/InnovMasterclass.jpg";
import movieNights1 from "../assets/events/MovieNights_1.png";
import artwakening2025b from "../assets/events/Artwakening2025_2.png";
import unveil1 from "../assets/events/Unveil_1.png";
import unveil2 from "../assets/events/Unveil_2.png";
import artwakening2025a from "../assets/events/Artwakening2025_1.png";
import herizon1 from "../assets/events/HERizon_1.png";
import herizon2 from "../assets/events/HERizon_2.png";
import movieNights2 from "../assets/events/MovieNights_2.png";
import handogNgiti from "../assets/events/HandogNgiti_1.png";
import technoweek1 from "../assets/events/Technoweek_1.png";
import technoweek2 from "../assets/events/Technoweek_2.png";
import nstp2 from "../assets/events/NSTP_2.png";
import artwakening2024 from "../assets/events/Artwakening2024_1.png";
import reform1 from "../assets/events/Reform_1.png";
import technoweek3 from "../assets/events/Technoweek_3.png";
import pastpective2 from "../assets/events/Pastpective_2.png";

// Slideshow order: photo, event name, date
const events = [
  { img: campRun,             label: "DEVCON Camp Run: Go Agentic with Hermes Agent", date: "October 2, 2026" },
  { img: cohort4Graduation,   label: "DEVCON Cohort 4 Graduation Night",              date: "August 27, 2026" },
  { img: movieNights1,     label: "TechnoWeek 2026: Movie Nights",                          date: "February 16, 2026" },
  { img: artwakening2025b, label: "Artwakening Festival 2025",                              date: "June 18, 2025" },
  { img: unveil1,          label: "UNVEIL II: The Music Synergy Showcase",                  date: "January 21, 2026" },
  { img: unveil2,          label: "UNVEIL II: The Music Synergy Showcase",                  date: "January 21, 2026" },
  { img: artwakening2025a, label: "Artwakening Festival 2025",                              date: "June 18, 2025" },
  { img: herizon1,         label: "HERizon: Kababaihan sa Lahat ng Sektor",                 date: "March 12, 2025" },
  { img: herizon2,         label: "HERizon: Kababaihan sa Lahat ng Sektor",                 date: "March 12, 2025" },
  { img: movieNights2,     label: "TechnoWeek 2026: Movie Nights",                          date: "February 16, 2026" },
  { img: handogNgiti,      label: "Handog Ngiti 2026",                                      date: "December 18, 2025" },
  { img: technoweek1,      label: "TechnoWeek 2026: Opening Ceremony",                      date: "February 16, 2026" },
  { img: technoweek2,      label: "TechnoWeek 2026: Opening Ceremony",                      date: "February 16, 2026" },
  { img: nstp2,            label: "General Assembly of the National Service Reserve Corps", date: "October 3, 2025" },
  { img: artwakening2024,  label: "Artwakening Festival 2024",                              date: "June 20, 2024" },
  { img: reform1,          label: "Re:Form Awards Night",                                   date: "March 18, 2026" },
  { img: technoweek3,      label: "FS/SL Night",                                            date: "February 17, 2025" },
  { img: pastpective2,     label: "Opening Ceremony of PastPective: A DocuFilm Festival",   date: "November 13, 2025" },
  { img: inPursuitOfProgress, label: "In Pursuit Of Progress: A Multimedia Arts Seminar", date: "July 9, 2026" },
  { img: toTheFuture,         label: "To The Future and Beyond: Exploring The Limitless Possibilities for Budding Careers in Computing Technology", date: "October 3, 2026" },
  { img: aitsLaunchPad,       label: "AITS IT LaunchPad 2026",                        date: "June 8, 2026" },
  { img: innovMasterclass,    label: "INNOV Masterclass 2026",                        date: "May 2, 2026" },
];

// Newest first; photos from the same day keep their featured order
const newestFirst = [...events].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "newest",   label: "Newest first" },
];

const total = events.length;
const SLIDE_MS = 4500;

const pad = (n) => String(n).padStart(2, "0");

const arrow = (d) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

export default function EventsHost() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [sort, setSort] = useState("featured");
  const list = sort === "newest" ? newestFirst : events;
  const stripRef = useRef(null);
  const thumbRefs = useRef([]);
  const paused = !playing || hovering;

  const goTo = (index) => setCurrent(((index % total) + total) % total);

  function changeSort(id) {
    setSort(id);
    setCurrent(0);
  }

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setCurrent((c) => (c + 1) % total), SLIDE_MS);
    return () => clearTimeout(t);
  }, [current, paused]);

  // Keep the active thumbnail in view (scrolls only the strip, not the page)
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = thumbRefs.current[current];
    if (!strip || !thumb) return;
    strip.scrollTo({ left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2, behavior: "smooth" });
  }, [current]);

  return (
    <FadeIn>
      <section id="onstage" className="section-container py-16 sm:py-20">
        {/* Header */}
        <SectionHeader
          number="06"
          eyebrow="On Stage"
          title={<>Mic Check, <span className="text-pink-500">It's Me!</span></>}
          subtitle="Hosting since 2023, from formal programs to high-energy celebrations."
        />

        {/* Sort switch */}
        <div data-reveal className="flex items-center justify-center sm:justify-end gap-3 mb-5">
          <span className="text-[11px] font-black tracking-widest uppercase text-gray-900 dark:text-white">Sort</span>
          <div className="brutal-tag flex p-1 gap-1 bg-[var(--brutal-chip-bg)] !rounded-xl" role="group" aria-label="Sort event photos">
            {sortOptions.map((o) => (
              <button
                key={o.id}
                onClick={() => changeSort(o.id)}
                aria-pressed={sort === o.id}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-colors duration-200 ${
                  sort === o.id ? "bg-[var(--accent)] text-white" : "text-gray-500 dark:text-gray-400 hover:text-[var(--accent-ink)]"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 lg:gap-8">
          {/* Featured photo */}
          <div
            className="brutal-card relative overflow-hidden aspect-[3/2]"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {list.map((e, i) => (
              <img loading="lazy" decoding="async"
                key={e.img}
                src={e.img}
                alt={e.label}
                draggable={false}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                  i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              />
            ))}
            <span className="brutal-tag absolute top-3 right-3 bg-[var(--accent)] text-white text-xs font-black px-2.5 py-1 tabular-nums">
              {pad(current + 1)} / {total}
            </span>
          </div>

          {/* Now showing card */}
          <div className="brutal-card p-6 flex flex-col text-left">
            <p className="text-[11px] font-black tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-2">
              Now showing
            </p>
            <h3 className="text-xl font-black leading-snug text-gray-900 dark:text-white min-h-[3.5rem]">
              {list[current].label}
            </h3>
            <span className="brutal-tag self-start mt-3 bg-pink-50 dark:bg-pink-500/15 text-[var(--accent-ink)] text-xs font-black px-2.5 py-1">
              {list[current].date}
            </span>

            {/* Time until the next photo */}
            <div className="mt-6 h-2.5 rounded-full border-2 border-[var(--brutal-chip-border)] overflow-hidden bg-[var(--brutal-chip-bg)]">
              <div
                key={`${current}-${paused}`}
                className="h-full bg-[var(--accent)] origin-left"
                style={paused ? { transform: "scaleX(0)" } : { animation: `slide-progress ${SLIDE_MS}ms linear forwards` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 mt-5">
              <button onClick={() => goTo(current - 1)} aria-label="Previous photo" className="brutal-btn w-11 h-11 flex items-center justify-center bg-[var(--brutal-chip-bg)] text-gray-900 dark:text-white hover:bg-pink-50 dark:hover:bg-pink-500/15">
                {arrow("M15 18l-6-6 6-6")}
              </button>
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                className="brutal-btn flex-1 h-11 flex items-center justify-center gap-2 bg-[var(--accent)] text-white text-sm font-black"
              >
                {playing ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5.5v13a1 1 0 001.5.86l11-6.5a1 1 0 000-1.72l-11-6.5A1 1 0 007 5.5z" /></svg>
                )}
                {playing ? "Pause" : "Play"}
              </button>
              <button onClick={() => goTo(current + 1)} aria-label="Next photo" className="brutal-btn w-11 h-11 flex items-center justify-center bg-[var(--brutal-chip-bg)] text-gray-900 dark:text-white hover:bg-pink-50 dark:hover:bg-pink-500/15">
                {arrow("M9 18l6-6-6-6")}
              </button>
            </div>

            <p className="mt-auto pt-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="text-2xl font-black text-gray-900 dark:text-white">30+</span> events hosted and counting
            </p>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div
          ref={stripRef}
          data-reveal
          className="mt-8 flex gap-3 overflow-x-auto px-1 pt-1 pb-3 [scrollbar-width:thin]"
          role="tablist"
          aria-label="Event photos"
        >
          {list.map((e, i) => (
            <button
              key={e.img}
              ref={(el) => (thumbRefs.current[i] = el)}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`${e.label}, ${e.date}`}
              className={`shrink-0 w-24 h-16 sm:w-28 sm:h-[4.5rem] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === current
                  ? "border-[var(--brutal-chip-border)] shadow-[3px_3px_0_0_var(--accent)] -translate-y-0.5"
                  : "border-transparent opacity-60 hover:opacity-100 hover:border-[var(--brutal-chip-border)]"
              }`}
            >
              <img loading="lazy" decoding="async" src={e.img} alt="" className="w-full h-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
