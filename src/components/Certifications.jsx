// src/components/Certifications.jsx
import React from "react";
import FadeIn from "./FadeIn";

import Cisco1 from "../assets/badges/cisco1.png";
import Cisco2 from "../assets/badges/cisco2.png";
import Cisco3 from "../assets/badges/cisco3.png";
import DevNet from "../assets/badges/devnet.png";
import PMI from "../assets/badges/PMI.png";
import Python from "../assets/badges/Python.png";
import Lifetime from "../assets/badges/Lifetime.png";

const certifications = [
  { name: "PMI Project Management Ready", issuer: "Project Management Institute", date: "3/16/2026", logo: PMI },
  { name: "CCST Networking — Lifetime", issuer: "Cisco", date: "2/15/2025", logo: Lifetime },
  { name: "IT Specialist — Python", issuer: "Certiport, a Pearson VUE business", date: "2/12/2025", logo: Python },
];

const badges = [
  { name: "CCNA: Introduction to Networks", issuer: "Cisco", date: "2/7/2025", logo: Cisco2 },
  { name: "CCNA: Switching, Routing, and Wireless Essentials", issuer: "Cisco", date: "9/13/2025", logo: Cisco3 },
  { name: "CCNA: Enterprise Networking, Security, and Automation", issuer: "Cisco", date: "1/12/2026", logo: Cisco1 },
  { name: "DevNet Associate", issuer: "Cisco", date: "3/21/2026", logo: DevNet },
];

function CertCard({ item }) {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 transition-all duration-300 hover:border-pink-200 hover:shadow-md hover:-translate-y-0.5 cursor-default group">
      <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-pink-200 group-hover:bg-pink-400 transition-colors duration-300" />
      <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 p-1.5 ml-2">
        <img src={item.logo} alt={item.name} className="w-full h-full object-contain" style={{ mixBlendMode: "multiply" }} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-gray-900 leading-snug">{item.name}</p>
        <p className="text-xs text-gray-500 mt-1">{item.issuer}</p>
        <span className="inline-block mt-1.5 text-xs font-semibold text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
          {item.date}
        </span>
      </div>
    </div>
  );
}

function BadgeCard({ item }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 transition-all duration-300 hover:border-pink-200 hover:shadow-md hover:-translate-y-0.5 cursor-default group">
      {/* White bg + mix-blend-multiply kills any black outline from PNG */}
      <div className="relative w-16 h-16 rounded-2xl bg-white border border-rose-100/80 flex items-center justify-center flex-shrink-0 p-2 group-hover:border-pink-200 transition-colors duration-300">
        <img
          src={item.logo}
          alt={item.name}
          className="w-full h-full object-contain"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-gray-900 leading-snug">{item.name}</p>
        <p className="text-xs text-gray-500 mt-1">{item.issuer}</p>
        <span className="inline-block mt-1.5 text-xs font-semibold text-pink-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
          {item.date}
        </span>
      </div>
    </div>
  );
}

export default function Certifications() {
  return (
    <FadeIn>
      <section id="certifications" className="max-w-5xl mx-auto px-4 py-16 sm:py-20">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-pink-500 mb-2">
            Credentials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-2">
            Certifications <span className="text-pink-500">&</span> badges
          </h2>
          <p className="text-sm text-gray-400">Proof of what I've put the hours into</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px flex-1 bg-gray-100" />
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 px-2">Certifications</p>
              <div className="h-px flex-1 bg-gray-100" />
            </div>
            <div className="flex flex-col gap-3">
              {certifications.map((item) => <CertCard key={item.name} item={item} />)}
            </div>
          </div>

          {/* Badges */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px flex-1 bg-gray-100" />
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 px-2">Badges</p>
              <div className="h-px flex-1 bg-gray-100" />
            </div>
            <div className="flex flex-col gap-3">
              {badges.map((item) => <BadgeCard key={item.name} item={item} />)}
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
