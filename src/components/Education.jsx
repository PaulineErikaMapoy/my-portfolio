// src/components/Education.jsx
import React, { useState } from "react";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
import admissionsPoster from "../assets/education/AdmissionsPoster.webp";
import techInsiderLive from "../assets/education/TechInsiderLive.webp";
import campusPortrait from "../assets/education/CampusPortrait.webp";

// The photo stack beside the diploma: image, and which part of the photo to keep in frame
const photos = [
  { img: admissionsPoster, focus: "object-center" },
  { img: techInsiderLive,  focus: "object-bottom" },
  { img: campusPortrait,   focus: "object-top" },
];

const honors = [
  { label: "President's Scholar", icon: "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" },
  { label: "Dean's Lister",       icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" },
];

const Icon = ({ d, className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

// Where each photo sits in the stack: front, peeking out on the left, peeking out on the right.
// Hovering the stack fans the back two out further.
const spots = [
  "z-30 rotate-0",
  "z-20 -rotate-6 -translate-x-[14%] translate-y-[3%] group-hover:-rotate-12 group-hover:-translate-x-[22%]",
  "z-10 rotate-6 translate-x-[14%] translate-y-[5%] group-hover:rotate-12 group-hover:translate-x-[22%]",
];

export default function Education() {
  // order[0] is the photo on top; clicking sends it to the back of the pile
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const shuffle = () => setOrder(([top, ...rest]) => [...rest, top]);

  return (
    <FadeIn>
      <section id="education" className="section-container py-16 sm:py-20">
        <SectionHeader
          number="04"
          eyebrow="Education"
          title={<>Academically <span className="text-pink-500">speaking...</span></>}
          subtitle="Building the foundation, one term at a time."
        />

        {/* One sheet of certificate paper: the diploma text on one side, a pile of photo prints on the other.
            It unrolls from the middle as you scroll in, then the honors get pressed on as seals.
            Sizes follow the sheet's own width (@ container queries), so it fits phones, tablets,
            and whatever width the sidebar leaves on desktop. */}
        <article data-reveal className="edu-diploma edu-paper @container relative rounded-md px-6 py-11 sm:px-10 sm:py-14">
          {/* Double frame, like a printed certificate */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-3 sm:inset-4 rounded-sm border-2 border-[var(--accent)]" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-[18px] sm:inset-[22px] rounded-sm border border-[var(--accent)] opacity-50" />

          <div className="grid gap-12 @2xl:grid-cols-[minmax(0,1fr)_auto] @2xl:gap-10 @4xl:gap-16 items-center">
            <div className="text-center">
              <p className="text-[11px] sm:text-xs font-black tracking-[0.35em] uppercase text-[var(--accent-ink)]">
                FEU Institute of Technology
              </p>
              <p className="mt-4 @md:mt-5 font-serif italic text-sm @md:text-base text-gray-500 dark:text-gray-400">
                is where I'm earning my
              </p>
              <h3 className="mt-2 font-serif text-[1.65rem] @md:text-3xl @xl:text-4xl @5xl:text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white text-balance">
                Bachelor of Science in Information Technology
              </h3>

              {/* Ornamental rule */}
              <div aria-hidden="true" className="my-6 flex items-center justify-center gap-3 text-[var(--accent)]">
                <span className="h-px w-10 @md:w-20 bg-current" />
                <span className="text-sm">✦</span>
                <span className="h-px w-10 @md:w-20 bg-current" />
              </div>

              <p className="font-serif text-base @md:text-lg text-gray-600 dark:text-gray-300">
                Specializing in <span className="font-bold text-gray-900 dark:text-white">Web and Mobile Applications</span>
              </p>

              {/* Honors as round seals */}
              <ul className="mt-8 @md:mt-10 flex flex-wrap justify-center gap-5 @md:gap-10" aria-label="Academic honors">
                {honors.map((h, i) => (
                  <li key={h.label} className={`edu-honor edu-seal ${i % 2 ? "rotate-6" : "-rotate-6"}`}>
                    <Icon d={h.icon} className="w-6 h-6" />
                    <span className="mt-1 text-[10px] font-black tracking-[0.12em] uppercase leading-tight">{h.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Photo prints: tap the pile to send the top photo to the back */}
            <figure className="edu-stack w-52 @md:w-60 @4xl:w-64 mx-auto @2xl:mx-8 @4xl:mx-12" aria-label="Photos from FEU Tech">
              <button
                type="button"
                onClick={shuffle}
                tabIndex={-1}
                aria-hidden="true"
                className="group relative block w-full aspect-[4/5] cursor-pointer"
              >
                {photos.map((p, i) => (
                  <span
                    key={i}
                    className={`edu-print absolute inset-0 p-1.5 @md:p-2 transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] ${spots[order.indexOf(i)]}`}
                  >
                    <img src={p.img} alt="" loading="lazy" decoding="async" className={`w-full h-full object-cover ${p.focus}`} />
                  </span>
                ))}
              </button>

              {/* Below the pile: which photo is on top, and the shuffle button (styled like the seals) */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <span className="flex items-center gap-1.5" aria-hidden="true">
                  {photos.map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 rounded-full transition-all duration-300 ${order[0] === i ? "w-5 bg-[var(--accent)]" : "w-2 bg-[var(--accent)] opacity-30"}`}
                    />
                  ))}
                </span>
                <button
                  type="button"
                  onClick={shuffle}
                  aria-label="Show the next photo"
                  title="Next photo"
                  className="edu-seal group/shuffle !w-11 !h-11 !p-0 cursor-pointer"
                >
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover/shuffle:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
              </div>
            </figure>
          </div>
        </article>
      </section>
    </FadeIn>
  );
}
