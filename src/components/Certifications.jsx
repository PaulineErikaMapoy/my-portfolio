// src/components/Certifications.jsx
import React, { useCallback, useState } from "react";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
import CertificateViewer from "./CertificateViewer";

import Cisco1 from "../assets/badges/cisco1.png";
import Cisco2 from "../assets/badges/cisco2.png";
import Cisco3 from "../assets/badges/cisco3.png";
import DevNet from "../assets/badges/devnet.png";
import PMI from "../assets/badges/PMI.png";
import Python from "../assets/badges/Python.png";
import Lifetime from "../assets/badges/Lifetime.png";

// Full certificates (signatures blurred) for the "View certificate" popup
import pmiCert from "../assets/Certificates/previews/pmi.jpg";
import ccstCert from "../assets/Certificates/previews/ccst.jpg";
import pythonCert from "../assets/Certificates/previews/python-cert.jpg";
import pmiThumb from "../assets/Certificates/previews/pmi-thumb.jpg";
import ccstThumb from "../assets/Certificates/previews/ccst-thumb.jpg";
import pythonThumb from "../assets/Certificates/previews/python-cert-thumb.jpg";

const certifications = [
  { name: "PMI Project Management Ready", issuer: "Project Management Institute", date: "3/16/2026", logo: PMI, full: pmiCert, thumb: pmiThumb },
  { name: "CCST Networking — Lifetime", issuer: "Cisco", date: "2/15/2025", logo: Lifetime, full: ccstCert, thumb: ccstThumb },
  { name: "IT Specialist — Python", issuer: "Certiport, a Pearson VUE business", date: "2/12/2025", logo: Python, full: pythonCert, thumb: pythonThumb },
];

const badges = [
  { name: "CCNA: Introduction to Networks", issuer: "Cisco", date: "2/7/2025", logo: Cisco2 },
  { name: "CCNA: Switching, Routing, and Wireless Essentials", issuer: "Cisco", date: "9/13/2025", logo: Cisco3 },
  { name: "CCNA: Enterprise Networking, Security, and Automation", issuer: "Cisco", date: "1/12/2026", logo: Cisco1 },
  { name: "DevNet Associate", issuer: "Cisco", date: "3/21/2026", logo: DevNet },
];

function CertCard({ item, onView }) {
  return (
    <button onClick={() => onView(item)} className="group w-full brutal-card brutal-hover p-5 flex flex-wrap @md:flex-nowrap items-center gap-4 text-left">
      {/* White box + mix-blend-multiply keeps logo backgrounds clean in both themes */}
      <span className="w-20 h-20 rounded-xl bg-white border-2 border-[var(--brutal-chip-border)] flex items-center justify-center flex-shrink-0 p-1.5">
        <img loading="lazy" decoding="async" src={item.logo} alt={item.name} className="w-full h-full object-contain" style={{ mixBlendMode: "multiply" }} />
      </span>
      <span className="min-w-0 flex-1 block">
        <span className="block text-sm font-black text-gray-900 dark:text-white leading-snug">{item.name}</span>
        <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">{item.issuer}</span>
        <span className="brutal-chip inline-block mt-2 text-[11px] font-bold text-white !bg-[var(--accent)] px-2 py-0.5">
          {item.date}
        </span>
      </span>

      {/* Certificate preview: click the card to open it full size */}
      <span className="relative block shrink-0 w-full @md:w-28 @md:aspect-[4/3] rounded-lg overflow-hidden border-2 border-[var(--brutal-chip-border)] bg-white">
        {/* Narrow card: whole certificate at its real shape. Wide card: small cropped thumbnail */}
        <img src={item.thumb} alt="" loading="lazy" className="block w-full h-auto @md:h-full object-contain @md:object-cover group-hover:scale-105 transition-transform duration-300" />
        <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-white text-[10px] font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
          Preview ↗
        </span>
      </span>
    </button>
  );
}

function BadgeCard({ item }) {
  return (
    <div className="brutal-card brutal-hover brutal-mint p-5 flex items-center gap-4">
      {/* White bg + mix-blend-multiply kills any black outline from PNG */}
      <div className="w-20 h-20 rounded-2xl bg-white border-2 border-[var(--brutal-chip-border)] flex items-center justify-center flex-shrink-0 p-2">
        <img loading="lazy" decoding="async"
          src={item.logo}
          alt={item.name}
          className="w-full h-full object-contain"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-black text-gray-900 dark:text-white leading-snug">{item.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.issuer}</p>
        <span className="brutal-chip inline-block mt-2 text-[11px] font-bold text-white !bg-[var(--accent)] px-2 py-0.5">
          {item.date}
        </span>
      </div>
    </div>
  );
}

export default function Certifications() {
  const [viewing, setViewing] = useState(null);
  const close = useCallback(() => setViewing(null), []);

  return (
    <FadeIn>
      <section id="certifications" className="section-container py-16 sm:py-20">

        {/* Header */}
        <SectionHeader
          number="02"
          eyebrow="Credentials"
          title={<>Certifications <span className="text-pink-500">&</span> badges</>}
          subtitle="Proof of what I've put the hours into"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Certifications */}
          <div>
            <div data-reveal className="flex items-center gap-2.5 mb-5">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">Certifications</h3>
              <span className="min-w-6 h-6 px-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-black flex items-center justify-center tabular-nums">
                {certifications.length}
              </span>
            </div>
            <div className="flex flex-col gap-5">
              {certifications.map((item) => (
                <div key={item.name} className="@container">
                  <CertCard item={item} onView={setViewing} />
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div>
            <div data-reveal className="flex items-center gap-2.5 mb-5">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">Badges</h3>
              <span className="min-w-6 h-6 px-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-black flex items-center justify-center tabular-nums">
                {badges.length}
              </span>
            </div>
            <div className="flex flex-col gap-5">
              {badges.map((item) => <BadgeCard key={item.name} item={item} />)}
            </div>
          </div>
        </div>

        {viewing && (
          <CertificateViewer
            entry={{ title: viewing.name, org: viewing.issuer, when: viewing.date, full: viewing.full }}
            onClose={close}
          />
        )}
      </section>
    </FadeIn>
  );
}
