// src/components/Involvement.jsx
// Timeline of org memberships and events attended, each with a viewable certificate
import React, { useCallback, useState } from "react";
import CertificateViewer from "./CertificateViewer";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";

// Small previews for the timeline, larger previews for the viewer.
// Signatures are blurred in these previews; the original files are never published.
import ticapThumb from "../assets/Certificates/previews/ticap-thumb.jpg";
import ticapFull from "../assets/Certificates/previews/ticap.jpg";
import devconThumb from "../assets/Certificates/previews/devcon-thumb.jpg";
import devconFull from "../assets/Certificates/previews/devcon.jpg";
import aitsThumb from "../assets/Certificates/previews/aits-thumb.jpg";
import aitsFull from "../assets/Certificates/previews/aits.jpg";
import jpcsThumb from "../assets/Certificates/previews/jpcs-thumb.jpg";
import jpcsFull from "../assets/Certificates/previews/jpcs.jpg";
import tambayanThumb from "../assets/Certificates/previews/tambayantv-thumb.jpg";
import tambayanFull from "../assets/Certificates/previews/tambayantv.jpg";
import acmThumb from "../assets/Certificates/previews/acm-thumb.jpg";
import acmFull from "../assets/Certificates/previews/acm.jpg";
import freshmenThumb from "../assets/Certificates/previews/freshmen-society-thumb.jpg";
import freshmenFull from "../assets/Certificates/previews/freshmen-society.jpg";
import teamsThumb from "../assets/Certificates/previews/teams-thumb.jpg";
import teamsFull from "../assets/Certificates/previews/teams.jpg";
import stemThumb from "../assets/Certificates/previews/stem-at-work-thumb.jpg";
import stemFull from "../assets/Certificates/previews/stem-at-work.jpg";
import edtekconThumb from "../assets/Certificates/previews/edtekcon-hackathon-thumb.jpg";
import edtekconFull from "../assets/Certificates/previews/edtekcon-hackathon.jpg";
import ctrlZThumb from "../assets/Certificates/previews/jpcs-ctrl-z-thumb.jpg";
import ctrlZFull from "../assets/Certificates/previews/jpcs-ctrl-z.jpg";
import decryptThumb from "../assets/Certificates/previews/jpcs-decrypt-decode-thumb.jpg";
import decryptFull from "../assets/Certificates/previews/jpcs-decrypt-decode.jpg";
import rebootMapThumb from "../assets/Certificates/previews/jpcs-reboot-map-thumb.jpg";
import rebootMapFull from "../assets/Certificates/previews/jpcs-reboot-map.jpg";
import itamReadyThumb from "../assets/Certificates/previews/itamready-drrm-thumb.jpg";
import itamReadyFull from "../assets/Certificates/previews/itamready-drrm.jpg";

// Newest year first; entries within a year newest first
const timeline = [
  {
    year: "2026",
    entries: [
      { title: "(TICaP 21) To the Future and Beyond: Exploring The Limitless Possibilities for Budding Careers in Computing Technology", org: "FEU Institute of Technology", type: "Participation", when: "Oct 3, 2026", thumb: ticapThumb, full: ticapFull },
      { title: "DEVCON Code Smarter: Modern Software Development with AI", org: "DEVCON Manila Chapter", type: "Recognition", when: "Sep 6, 2026", thumb: devconThumb, full: devconFull },
      { title: "(EDTEKCON 2026) Mission:LearnPossible2 - AI Hackathon", org: "Team No. 4", type: "Hackathon", when: "2026", thumb: edtekconThumb, portrait: true, full: edtekconFull },
    ],
  },
  {
    year: "2025",
    entries: [
      { kind: "org", title: "FEU Tech - Alliance of Information Technology Students (AITS)", org: "Student organization", type: "Membership", when: "A.Y. 2025–2026", thumb: aitsThumb, full: aitsFull },
      { kind: "org", title: "FEU Tech - Junior Philippine Computer Society (JPCS)", org: "Student organization", type: "Membership", when: "A.Y. 2025–2026", thumb: jpcsThumb, full: jpcsFull },
      { kind: "org", title: "FEU Tech - Tambayan TV", org: "Student organization", type: "Membership", when: "A.Y. 2025–2026", thumb: tambayanThumb, full: tambayanFull },
    ],
  },
  {
    year: "2024",
    entries: [
      { title: "JPCS CTRL+Z: Reboot Our Legacy", org: "JPCS General Assembly · FEU Tech", type: "Events Head", when: "2024", thumb: ctrlZThumb, portrait: true, full: ctrlZFull },
      { title: "JPCS Decrypt & Decode", org: "JPCS · FEU Tech", type: "Events Head", when: "2024", thumb: decryptThumb, portrait: true, full: decryptFull },
      { title: "JPCS Reboot & Map", org: "JPCS · FEU Tech", type: "Events Head", when: "2024", thumb: rebootMapThumb, portrait: true, full: rebootMapFull },
      { title: "ITamReady: The FEUture is here!", org: "DRRM Innovations Exposition · FEU Tech", type: "Committee member", when: "Jul 11, 2024", thumb: itamReadyThumb, full: itamReadyFull },
    ],
  },
  {
    year: "2023",
    entries: [
      { kind: "org", title: "FEU Tech - Tribe of EMC and Multimedia Arts Students (TEAMS)", org: "Student organization", type: "Membership", when: "A.Y. 2023–2024", thumb: teamsThumb, full: teamsFull },
      { kind: "org", title: "FEU Tech - ACM Student Chapter", org: "Student organization", type: "Membership", when: "A.Y. 2023–2024", thumb: acmThumb, full: acmFull },
      { kind: "org", title: "FEU Tech - Freshmen Society", org: "Student organization", type: "Membership", when: "A.Y. 2023–2024", thumb: freshmenThumb, full: freshmenFull },
    ],
  },
  {
    year: "2022",
    entries: [
      { title: "Business Skills Pass: STEM@WORK", org: "JA Philippines", type: "Recognition", when: "Nov 29, 2022", thumb: stemThumb, full: stemFull },
    ],
  },
];

const all = timeline.flatMap((y) => y.entries);
const orgCount = all.filter((e) => e.kind === "org").length;
const eventCount = all.length - orgCount;

export default function Involvement() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <FadeIn>
      <section id="involvement" className="section-container py-16 sm:py-20">
        <SectionHeader
          number="05"
          eyebrow="Involvement"
          title={<>Where I've <span className="text-pink-500">shown up</span></>}
          subtitle={`${orgCount} orgs, ${eventCount} events and seminars, since 2022. Tap any entry to see the proof.`}
        />

        <div className="relative">
          {/* The timeline line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-[3px] bg-[var(--brutal-border)]" aria-hidden="true" />

          {timeline.map((group) => (
            <div key={group.year} className="relative pl-12 sm:pl-14 pb-10 last:pb-0">
              {/* Year marker */}
              <div data-reveal className="flex items-center gap-3 mb-5 -ml-12 sm:-ml-14">
                <span className="brutal-tag w-[33px] h-[33px] !rounded-lg bg-[var(--accent)] shrink-0 relative z-10" aria-hidden="true" />
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white tabular-nums">{group.year}</h3>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {group.entries.map((entry) => (
                  <li key={entry.title} className="@container">
                    <button
                      onClick={() => setOpen(entry)}
                      className="group brutal-card brutal-hover w-full h-full p-3 flex flex-col @md:flex-row items-stretch @md:items-center gap-3 @md:gap-4 text-left"
                    >
                      {/* Vertical IDs keep their tall shape instead of being cropped into a wide box */}
                      {/* Narrow card: whole image at its real shape (tall IDs capped in height). Wide card: small cropped thumbnail */}
                      <span
                        className={`relative flex justify-center shrink-0 rounded-lg overflow-hidden border-2 border-[var(--brutal-chip-border)] bg-white ${
                          entry.portrait ? "w-full @md:w-24 @md:aspect-[2/3]" : "w-full @md:w-32 @md:aspect-[4/3]"
                        }`}
                      >
                        <img
                          src={entry.thumb}
                          alt=""
                          loading="lazy"
                          className={`object-contain @md:object-cover @md:w-full @md:h-full group-hover:scale-105 transition-transform duration-300 ${
                            entry.portrait ? "max-h-80 w-auto @md:max-h-none" : "w-full h-auto"
                          }`}
                        />
                        {/* Hover hint, same as the Credentials cards */}
                        <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-white text-[10px] font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                          Preview ↗
                        </span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="brutal-tag inline-block bg-pink-50 dark:bg-pink-500/15 text-[var(--accent-ink)] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 mb-2">
                          {entry.type}
                        </span>
                        <span className="block text-sm font-black text-gray-900 dark:text-white leading-snug">{entry.title}</span>
                        <span className="flex items-center justify-between gap-2 mt-2">
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{entry.when}</span>
                          <span className="text-xs font-black text-[var(--accent-ink)] whitespace-nowrap group-hover:translate-x-0.5 transition-transform">View ↗</span>
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {open && <CertificateViewer entry={open} onClose={close} />}
      </section>
    </FadeIn>
  );
}
