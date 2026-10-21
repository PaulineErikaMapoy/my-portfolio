// src/components/SocialMedia.jsx
import React, { useEffect, useRef, useState } from "react";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
// Feed photos (web-sized copies of the originals in assets/SocMed)
import socmed1 from "../assets/SocMed/web/socmed1.jpg"; // profile photo
import socmed2 from "../assets/SocMed/web/socmed2.jpg";
import socmed3 from "../assets/SocMed/web/socmed3.jpg";
import socmed4 from "../assets/SocMed/web/socmed4.jpg";

const socials = [
  {
    platform: "Facebook",
    handle: "@paulinemapoy",
    url: "https://www.facebook.com/paulinemapoy",
    description: "Personal updates and occasional posts",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    platform: "Instagram",
    handle: "@paulinemapoy",
    url: "https://www.instagram.com/paulinemapoy/",
    description: "Photos and creative work",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    platform: "LinkedIn",
    handle: "paulinemapoy",
    url: "https://www.linkedin.com/in/paulinemapoy/",
    description: "Professional updates",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

// What each social looks like as a post inside the phone feed
const posts = {
  Facebook:  { color: "#1877F2", image: socmed3, caption: "Hosting, school life, and the occasional life update." },
  Instagram: { color: "#E4405F", image: socmed2, caption: "SFX makeup looks, portraits, and creative work." },
  LinkedIn:  { color: "#0A66C2", image: socmed4, caption: "Professional updates, certifications, and projects." },
};

const avatar = socmed1;

const manilaTime = () =>
  new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Manila", hour: "numeric", minute: "2-digit", hour12: false });

function Post({ social, liked, onLike }) {
  const post = posts[social.platform];
  return (
    <article className="h-full snap-start snap-always flex flex-col px-4 pt-3 pb-4">
      {/* Post header */}
      <div className="flex items-center gap-2.5 mb-3">
        <img loading="lazy" decoding="async" src={avatar} alt="" className="w-9 h-9 rounded-full object-cover object-[50%_22%] border-2 border-[var(--accent)]" />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[13px] font-black text-gray-900 dark:text-white truncate">{social.handle}</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">{social.platform}</p>
        </div>
        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white [&_svg]:w-4 [&_svg]:h-4" style={{ background: post.color }}>
          {social.icon}
        </span>
      </div>

      {/* Media: tap the photo to open the profile */}
      <a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open my ${social.platform} profile`}
        className="group/media relative block flex-1 min-h-0 rounded-2xl overflow-hidden"
      >
        {post.image ? (
          <img loading="lazy" decoding="async" src={post.image} alt="" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        ) : (
          // LinkedIn: a mini profile card instead of a photo
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center bg-gradient-to-b from-[#0A66C2] to-[#084d93] text-white">
            <img loading="lazy" decoding="async" src={avatar} alt="" className="w-20 h-20 rounded-full object-cover object-[50%_22%] border-4 border-white" />
            <p className="text-base font-black leading-tight">Pauline Erika Mapoy</p>
            <p className="text-[11px] text-white/80 leading-snug">Project Manager & Front-End Developer<br />IT Student · FEU Tech</p>
            <span className="mt-1 text-[10px] font-bold bg-white/15 border border-white/30 rounded-full px-2.5 py-0.5">President's Scholar</span>
          </div>
        )}
        <span className="absolute top-2 left-2 text-[10px] font-black uppercase tracking-wider text-white px-2 py-0.5 rounded-md" style={{ background: post.color }}>
          {social.platform}
        </span>
        {/* Hover hint */}
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm font-black opacity-0 group-hover/media:opacity-100 group-focus-visible/media:opacity-100 transition-opacity">
          Open {social.platform} ↗
        </span>
      </a>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-3 text-gray-900 dark:text-white">
        <button onClick={onLike} aria-label={liked ? "Unlike" : "Like"} aria-pressed={liked} className="transition-transform active:scale-75">
          <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-all duration-300 ${liked ? "fill-[var(--accent)] stroke-[var(--accent)] scale-110" : "fill-none stroke-current"}`} strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
        </svg>
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[11px] font-black px-3.5 py-1.5 rounded-full bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)] active:scale-95 transition-all"
        >
          Visit ↗
        </a>
      </div>

      {/* Caption */}
      <p className="text-[12px] leading-snug text-gray-700 dark:text-gray-300 mt-2">
        <span className="font-black text-gray-900 dark:text-white">{social.handle}</span> {post.caption}
      </p>
    </article>
  );
}

export default function SocialMedia() {
  const feedRef = useRef(null);
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState({});
  const [time, setTime] = useState(manilaTime);
  const [swiped, setSwiped] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(manilaTime()), 30000);
    return () => clearInterval(id);
  }, []);

  function onScroll() {
    const el = feedRef.current;
    setActive(Math.round(el.scrollTop / el.clientHeight));
    if (el.scrollTop > 10) setSwiped(true);
  }

  function goTo(i) {
    const el = feedRef.current;
    el.scrollTo({ top: i * el.clientHeight, behavior: "smooth" });
  }

  return (
    <FadeIn>
      <section id="socials" className="section-container py-16 sm:py-20">

        {/* Header */}
        <SectionHeader
          number="08"
          eyebrow="Socials"
          title={<>Let's stay <span className="text-pink-500">connected</span></>}
          subtitle="Find me around the internet"
        />

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">

          {/* Phone */}
          <div data-reveal className="relative shrink-0">
            {/* Soft pink glow behind the phone */}
            <div className="absolute inset-6 rounded-[3rem] bg-[var(--accent)]/40 blur-3xl" aria-hidden="true" />
            {/* Side buttons */}
            <span className="absolute -left-[3px] top-28 w-[3px] h-8 rounded-l bg-[#2a2a2e]" aria-hidden="true" />
            <span className="absolute -left-[3px] top-40 w-[3px] h-14 rounded-l bg-[#2a2a2e]" aria-hidden="true" />
            <span className="absolute -left-[3px] top-56 w-[3px] h-14 rounded-l bg-[#2a2a2e]" aria-hidden="true" />
            <span className="absolute -right-[3px] top-44 w-[3px] h-20 rounded-r bg-[#2a2a2e]" aria-hidden="true" />
            <div className="relative w-[290px] h-[590px] sm:w-[310px] sm:h-[630px] rounded-[3rem] bg-[#111] p-3 ring-1 ring-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45),inset_0_0_0_2px_#2a2a2e]">
              <div className="relative h-full rounded-[2.4rem] overflow-hidden bg-white dark:bg-[var(--page-bg)] flex flex-col">

                {/* Status bar + dynamic island */}
                <div className="relative h-11 shrink-0 flex items-center justify-between px-7 text-[12px] font-bold text-gray-900 dark:text-white">
                  <span className="tabular-nums">{time}</span>
                  <span className="absolute left-1/2 -translate-x-1/2 top-2 w-24 h-7 rounded-full bg-[#111]" />
                  <span className="flex items-center gap-1" aria-hidden="true">
                    <svg className="w-4 h-3" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="4.3" y="5.5" width="3" height="6.5" rx="1"/><rect x="8.6" y="3" width="3" height="9" rx="1"/><rect x="13" y="0" width="3" height="12" rx="1"/></svg>
                    <span className="w-6 h-3 rounded-[4px] border-[1.5px] border-current p-[1.5px]"><span className="block h-full w-3/4 bg-current rounded-[2px]" /></span>
                  </span>
                </div>

                {/* App bar */}
                <div className="shrink-0 flex items-center justify-between px-4 pb-2 border-b-2 border-gray-100 dark:border-white/10">
                  <span className="text-lg font-black tracking-tight text-gray-900 dark:text-white">pau<span className="text-[var(--accent-ink)]">.</span>feed</span>
                  <span className="text-[11px] font-bold text-gray-400 tabular-nums">{active + 1} / {socials.length}</span>
                </div>

                {/* Swipeable feed */}
                <div
                  ref={feedRef}
                  onScroll={onScroll}
                  className="flex-1 min-h-0 overflow-y-auto snap-y snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  aria-label="Social media feed"
                >
                  {socials.map((s, i) => (
                    <Post
                      key={s.platform}
                      social={s}
                      liked={!!liked[i]}
                      onLike={() => setLiked((l) => ({ ...l, [i]: !l[i] }))}
                    />
                  ))}
                </div>

                {/* Progress dots */}
                <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5" aria-hidden="true">
                  {socials.map((s, i) => (
                    <span key={s.platform} className={`w-1.5 rounded-full transition-all duration-300 ${i === active ? "h-5 bg-[var(--accent)]" : "h-1.5 bg-gray-300 dark:bg-white/25"}`} />
                  ))}
                </div>

                {/* Swipe hint (disappears after the first swipe) */}
                <div className={`pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center text-white transition-opacity duration-500 ${swiped ? "opacity-0" : "opacity-100"}`}>
                  <svg className="w-6 h-6 animate-bounce drop-shadow" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
                  <span className="text-[11px] font-black drop-shadow bg-black/40 rounded-full px-2 py-0.5">Swipe up</span>
                </div>

                {/* Home indicator */}
                <div className="shrink-0 h-5 flex items-center justify-center">
                  <span className="w-28 h-1 rounded-full bg-gray-900 dark:bg-white/70" />
                </div>
              </div>
            </div>
          </div>

          {/* Jump-to-platform list: settings-menu layout, brutalist styling (matches the sidebar) */}
          <div data-reveal className="w-full max-w-xs">
            <p className="text-xs font-black tracking-widest uppercase text-gray-900 dark:text-white text-center lg:text-left mb-3 px-1">
              Jump to
            </p>
            <div className="brutal-card p-2.5 flex flex-col gap-2">
              {socials.map((s, i) => {
                const isActive = i === active;
                return (
                  // Row = jump button (scrolls the phone) + its own "open profile" link
                  <div
                    key={s.platform}
                    className={`flex items-center gap-2 pr-2 rounded-xl border-2 transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--accent)] border-[var(--brutal-chip-border)] shadow-[3px_3px_0_0_var(--brutal-chip-border)]"
                        : "border-transparent hover:bg-pink-50 dark:hover:bg-pink-500/10 hover:border-[var(--brutal-chip-border)] hover:shadow-[3px_3px_0_0_var(--accent)]"
                    }`}
                  >
                    <button
                      onClick={() => goTo(i)}
                      aria-current={isActive ? "true" : undefined}
                      aria-label={`Show ${s.platform} in the phone`}
                      className="flex-1 min-w-0 flex items-center gap-3 pl-3 py-2.5 text-left"
                    >
                      <span className="brutal-tag w-10 h-10 !rounded-lg flex items-center justify-center shrink-0 [&_svg]:w-5 [&_svg]:h-5 bg-white dark:bg-[var(--page-bg)] text-[var(--accent-ink)]">
                        {s.icon}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className={`block text-sm font-black ${isActive ? "text-white" : "text-gray-900 dark:text-white"}`}>{s.platform}</span>
                        <span className={`block text-xs truncate ${isActive ? "text-white/85" : "text-gray-500 dark:text-gray-400"}`}>{s.handle}</span>
                      </span>
                    </button>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open my ${s.platform} profile`}
                      title={`Open ${s.platform}`}
                      className="brutal-btn !rounded-lg w-9 h-9 shrink-0 flex items-center justify-center bg-white dark:bg-[var(--page-bg)] text-gray-900 dark:text-white hover:text-[var(--accent-ink)]"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
