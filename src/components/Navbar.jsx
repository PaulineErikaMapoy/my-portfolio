// src/components/Navbar.jsx
import React, { useEffect } from "react";
import PauLogoWebsite from "../assets/PauLogoWebsite.png";

export default function Navbar() {
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const target = e.target.closest("a[href^='#']");
      if (target) {
        e.preventDefault();
        const id = target.getAttribute("href")?.slice(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  return (
    <nav className="fixed w-full bg-white backdrop-blur-md shadow-xl shadow-primary/10 z-50 h-16 flex items-center">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-5 md:px-6 h-full flex items-center gap-4">
        {/* Logo */}
        <a
          href="#hero"
          className="h-16 flex items-center hover:scale-105 transition-transform duration-300"
        >
          <img
            src={PauLogoWebsite}
            alt="Pau's Portfolio"
            className="h-9 xs:h-10 sm:h-12 max-h-full object-contain"
          />
        </a>

        {/* Nav items — matching actual section IDs */}
        <ul className="ml-auto flex items-center flex-nowrap gap-1 xs:gap-1.5 sm:gap-2">
          {[
            { label: "About",        href: "#about-me" },
            { label: "Credentials",  href: "#certifications" },
            { label: "Skills",       href: "#skills" },
            { label: "Content",      href: "#content" },
            { label: "Socials",      href: "#socials", primary: true },
          ].map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={
                  item.primary
                    ? "bg-[#ec4899] text-white border-2 border-[#ec4899] hover:bg-white hover:text-[#ec4899] transition-colors duration-300 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-2xl flex items-center gap-1.5 whitespace-nowrap"
                    : "bg-white text-[#ec4899] border-2 border-transparent hover:border-pink-200 hover:bg-pink-50 transition-colors duration-300 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-2xl flex items-center gap-1.5 whitespace-nowrap"
                }
              >
                {item.label}
                {item.primary && (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zm9-3a.75.75 0 01.728.568l.258 1.036a2.625 2.625 0 001.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258a2.625 2.625 0 00-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5z" clipRule="evenodd" />
                  </svg>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
