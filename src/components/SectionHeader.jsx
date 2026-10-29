// src/components/SectionHeader.jsx
// Shared 3-layer section title: numbered label / big title / subtitle,
// left-aligned with a thick rule underneath.
// oneLine: title and subtitle each stay on a single row (stacked), shrinking to fit when there's room;
// on narrow screens they wrap as usual
import React from "react";

export default function SectionHeader({ number, eyebrow, title, subtitle, oneLine = false }) {
  return (
    <div data-reveal className="mb-10 sm:mb-12">
      <div className="flex items-center gap-3 mb-3">
        {number && (
          <span className="brutal-tag bg-[var(--accent)] text-white text-xs font-black px-2 py-0.5 tabular-nums">
            {number}
          </span>
        )}
        <span className="text-xs font-black tracking-widest uppercase text-gray-900 dark:text-white">
          {eyebrow}
        </span>
      </div>
      <div className={`flex flex-col gap-3 pb-5 border-b-[3px] border-[var(--brutal-border)] ${oneLine ? "@container" : "md:flex-row md:items-end md:justify-between md:gap-10"}`}>
        <h2 className={`${oneLine ? "text-4xl @2xl:text-[min(3rem,5.3cqi)] @2xl:whitespace-nowrap" : "text-4xl sm:text-5xl"} font-black tracking-tight leading-[1.05] text-gray-900 dark:text-white`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`${oneLine ? "@xl:whitespace-nowrap" : "md:max-w-sm md:text-right"} text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
