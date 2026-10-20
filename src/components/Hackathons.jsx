// src/components/Hackathons.jsx
// Hackathons as a wall of pinned polaroids: wins up top (big, with a trophy sticker),
// other competitions below. Click a polaroid to open the photo.
import React, { useCallback, useState } from "react";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
import CertificateViewer from "./CertificateViewer";

// Web-sized copies of the photos in assets/Hackathon
import sikaptala from "../assets/Hackathon/web/sikaptala.jpg";
import technopreneurship from "../assets/Hackathon/web/technopreneurship.jpg";
import edtekcon from "../assets/Hackathon/web/edtekcon.jpg";
import designThinking from "../assets/Hackathon/web/design-thinking.jpg";

// ── Edit your hackathons here ─────────────────────
const wins = [
  {
    title: "Sikaptala 2026: The National CS & IT Competition",
    place: "De La Salle University – Dasmariñas",
    date: "May 19, 2026",
    award: "Grand Champion",
    photo: sikaptala,
  },
  {
    title: "Technopreneurship 2026",
    place: "",
    date: "July 12, 2025",
    award: "Grand Champion",
    photo: technopreneurship,
  },
];

const joined = [
  {
    title: "(EDTEKCON 2026) Mission:LearnPossible2 - AI Hackathon",
    place: "Thames International School",
    date: "October 17, 2026",
    photo: edtekcon,
  },
  {
    title: "Design Thinking Summit 2025: ITAM Design Jam",
    place: "",
    date: "March 22, 2025",
    photo: designThinking,
  },
];
// ──────────────────────────────────────────────────

// Alternating tilts so the wall looks hand-pinned
const tilts = ["-rotate-2", "rotate-[1.5deg]", "rotate-1", "-rotate-[1.5deg]"];

function Polaroid({ item, big, tilt, onOpen }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className={`group relative block w-full text-left ${tilt} hover:rotate-0 hover:-translate-y-1.5 transition-transform duration-300 ease-out`}
    >
      {/* Tape */}
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-20 h-6 rotate-[-4deg] bg-[var(--accent)]/35 border border-[var(--accent)]/40"
      />

      {/* The polaroid */}
      <span className="brutal-card block bg-white dark:bg-[#f6f1f4] p-3 pb-4 sm:p-4 sm:pb-5">
        <span className={`relative block overflow-hidden rounded-md border-2 border-[#111111] ${big ? "aspect-[4/3]" : "aspect-[5/4]"}`}>
          <img src={item.photo} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </span>

        {/* Caption: always dark ink on the white polaroid, in both themes */}
        <span className="block mt-3 px-1">
          <span className={`block font-black leading-snug text-gray-900 ${big ? "text-base sm:text-lg" : "text-sm"}`}>{item.title}</span>
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5 text-xs text-gray-600">
            <span className="font-bold text-gray-900">{item.date}</span>
            {item.place && <span>· {item.place}</span>}
          </span>
        </span>
      </span>

      {/* Sticker */}
      {item.award ? (
        <span className="brutal-tag absolute -top-3 -right-3 sm:-right-4 z-10 rotate-6 bg-[var(--accent)] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1.5">
          🏆 {item.award}
        </span>
      ) : (
        <span className="brutal-tag absolute -top-2.5 -right-2 z-10 rotate-3 bg-white text-gray-900 text-[10px] font-black uppercase tracking-wider px-2 py-1">
          Participant
        </span>
      )}
    </button>
  );
}

export default function Hackathons() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <FadeIn>
      <section id="hackathons" className="section-container py-16 sm:py-20">
        <SectionHeader
          number="02"
          eyebrow="Hackathons"
          title={<>Built under <span className="text-pink-500">pressure</span></>}
          subtitle={`${wins.length} grand champion wins and counting. Tap a photo to see it up close.`}
        />

        {/* Wins */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 px-2 sm:px-4">
          {wins.map((item, i) => (
            <div key={item.title} data-reveal>
              <Polaroid item={item} big tilt={tilts[i % tilts.length]} onOpen={setOpen} />
            </div>
          ))}
        </div>

        {/* Other hackathons */}
        <div className="flex items-center gap-3 mt-16 mb-8">
          <span className="text-xs font-black tracking-widest uppercase text-gray-900 dark:text-white whitespace-nowrap">Also competed in</span>
          <span className="flex-1 border-t-2 border-dashed border-[var(--brutal-border)]" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 px-2 sm:px-10 lg:px-20">
          {joined.map((item, i) => (
            <div key={item.title} data-reveal>
              <Polaroid item={item} tilt={tilts[(i + 2) % tilts.length]} onOpen={setOpen} />
            </div>
          ))}
        </div>

        {open && (
          <CertificateViewer
            entry={{ title: open.title, org: open.award || "Participant", when: open.date, full: open.photo }}
            onClose={close}
          />
        )}
      </section>
    </FadeIn>
  );
}
