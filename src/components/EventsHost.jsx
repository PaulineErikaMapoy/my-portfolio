// src/components/EventsHost.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import FadeIn from "./FadeIn";

import Event1 from "../assets/events/MovieNights_1.png";
import Event2 from "../assets/events/Artwakening2025_2.png";
import Event3 from "../assets/events/Unveil_1.png";
import Event4 from "../assets/events/Unveil_2.png";
import Event5 from "../assets/events/Artwakening2025_1.png";
import Event6 from "../assets/events/HERizon_1.png";
import Event7 from "../assets/events/HERizon_2.png";
import Event8 from "../assets/events/MovieNights_2.png";
import Event9 from "../assets/events/HandogNgiti_1.png";
import Event10 from "../assets/events/DisasterAwarenessSeminar.png";
import Event11 from "../assets/events/Technoweek_1.png";
import Event12 from "../assets/events/Technoweek_2.png";
import Event13 from "../assets/events/PINASing.png";
import Event14 from "../assets/events/NSTP_1.png";
import Event15 from "../assets/events/NSTP_2.png";
import Event16 from "../assets/events/Artwakening2024_1.png";
import Event17 from "../assets/events/Reform_1.png";
import Event18 from "../assets/events/Reform_2.png";
import Event19 from "../assets/events/Technoweek_3.png";
import Event20 from "../assets/events/Pastpective_2.png";

const images = [
  Event1, Event2, Event3, Event4, Event5,
  Event6, Event7, Event8, Event9, Event10,
  Event11, Event12, Event13, Event14, Event15,
  Event16, Event17, Event18, Event19, Event20,
];

const imageLabels = [
  "TechnoWeek 2026: Movie Nights",
  "Artwakening Festival 2025",
  "UNVEIL II: The Music Synergy Showcase",
  "UNVEIL II: The Music Synergy Showcase",
  "Artwakening Festival 2025",
  "HERizon: Kababaihan sa Lahat ng Sektor",
  "HERizon: Kababaihan sa Lahat ng Sektor",
  "TechnoWeek 2026: Movie Nights",
  "Handog Ngiti 2026",
  "Natural Disaster Awareness Seminar at Asociación de Damas de Filipinas, Inc.",
  "TechnoWeek 2026: Opening Ceremony",
  "TechnoWeek 2026: Opening Ceremony",
  "PINASing and PINASambit 2024",
  "General Assembly of the National Service Reserve Corps",
  "General Assembly of the National Service Reserve Corps",
  "Artwakening Festival 2024",
  "Re:Form Awards Night",
  "ReConvene Research Colloquium",
  "FS/SL Night",
  "Opening Ceremony of PastPective: A DocuFilm Festival",
];

const imageDescriptions = [
  "February 16, 2026", "June 18, 2025", "January 21, 2026",
  "January 21, 2026", "June 18, 2025", "March 12, 2025",
  "March 12, 2025", "February 16, 2026", "December 18, 2025",
  "July 13, 2024", "February 16, 2026", "February 16, 2026",
  "September 14, 2024", "October 3, 2025", "October 3, 2025",
  "June 20, 2024", "March 18, 2026", "March 16, 2026",
  "February 17, 2025", "November 13, 2025",
];

const total = images.length;

function getSlideRole(index, current, total) {
  const diff = (index - current + total) % total;
  if (diff === 0) return "center";
  if (diff === 1) return "next";
  if (diff === total - 1) return "prev";
  return diff > total / 2 ? "hidden-left" : "hidden-right";
}

export default function EventsHost() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setCurrent(((index % total) + total) % total);
  }, []);

  const handlePrev = () => goTo(current - 1);
  const handleNext = () => goTo(current + 1);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(handleNext, 4000);
    return () => clearTimeout(timerRef.current);
  }, [current, isPaused]);

  const slideStyles = {
    center: {
      // Wider landscape dimensions for center
      width: "clamp(280px, 42vw, 520px)",
      height: "clamp(170px, 26vw, 320px)",
      transform: "translateX(0) scale(1)",
      opacity: 1,
      filter: "none",
      zIndex: 3,
      boxShadow: "0 20px 60px rgba(236,72,153,0.2), 0 4px 20px rgba(0,0,0,0.15)",
    },
    prev: {
      width: "clamp(130px, 20vw, 240px)",
      height: "clamp(80px, 12vw, 148px)",
      transform: "translateX(clamp(-200px,-30vw,-160px)) scale(0.88)",
      opacity: 0.5,
      filter: "brightness(0.7) saturate(0.55)",
      zIndex: 2,
    },
    next: {
      width: "clamp(130px, 20vw, 240px)",
      height: "clamp(80px, 12vw, 148px)",
      transform: "translateX(clamp(160px,30vw,200px)) scale(0.88)",
      opacity: 0.5,
      filter: "brightness(0.7) saturate(0.55)",
      zIndex: 2,
    },
    "hidden-left": {
      width: "clamp(130px, 20vw, 240px)",
      height: "clamp(80px, 12vw, 148px)",
      transform: "translateX(clamp(-400px,-60vw,-320px)) scale(0.75)",
      opacity: 0,
      filter: "brightness(0.5)",
      zIndex: 0,
      pointerEvents: "none",
    },
    "hidden-right": {
      width: "clamp(130px, 20vw, 240px)",
      height: "clamp(80px, 12vw, 148px)",
      transform: "translateX(clamp(320px,60vw,400px)) scale(0.75)",
      opacity: 0,
      filter: "brightness(0.5)",
      zIndex: 0,
      pointerEvents: "none",
    },
  };

  return (
    <FadeIn>
      <section
        id="onstage"
        className="max-w-5xl mx-auto px-4 py-20 md:py-28 text-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Header */}
        <div className="space-y-3 max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-pink-500">
            On Stage
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Mic Check, <span className="text-pink-500">It's Me!</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
            I started hosting in 2023 at my university, and since then I've
            taken on a wide range of events, from formal programs to high-energy
            celebrations, learning to adapt to whatever the moment calls for.
          </p>
        </div>

        {/* Stage */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: "clamp(200px, 34vw, 380px)" }}
        >
          {images.map((img, i) => {
            const role = getSlideRole(i, current, total);
            return (
              <div
                key={i}
                className="absolute rounded-2xl overflow-hidden cursor-pointer select-none"
                style={{
                  ...slideStyles[role],
                  transition: "all 0.55s cubic-bezier(0.4,0,0.2,1)",
                }}
                onClick={() => role !== "center" && goTo(i)}
              >
                <img
                  src={img}
                  alt={imageLabels[i]}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {role === "center" && (
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-pink-400/40 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        {/* Caption */}
        <div className="mt-8 min-h-[52px]">
          <p className="text-base sm:text-lg font-medium text-gray-800">
            {imageLabels[current]}
          </p>
          <p className="text-sm text-pink-500 tracking-wide mt-1">
            {imageDescriptions[current]}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="w-10 h-10 rounded-full border border-pink-400 text-pink-500 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-200 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "20px" : "6px",
                  height: "6px",
                  background: i === current ? "#ec4899" : "#f9a8d4",
                }}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="w-10 h-10 rounded-full border border-pink-400 text-pink-500 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-200 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </section>
    </FadeIn>
  );
}