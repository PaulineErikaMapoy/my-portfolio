// src/components/SectionHeader.jsx
// Shared 3-layer section title: numbered label / big title / subtitle,
// left-aligned with a thick rule underneath
import React from "react";

export default function SectionHeader({ number, eyebrow, title, subtitle }) {
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
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-10 pb-5 border-b-[3px] border-[var(--brutal-border)]">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] text-gray-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="md:max-w-sm md:text-right text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
