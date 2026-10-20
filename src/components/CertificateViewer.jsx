// src/components/CertificateViewer.jsx
// Full-screen popup for viewing a certificate image (signatures already blurred in the previews).
// Fades + scales in on open, and plays the same animation in reverse before closing.
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const CLOSE_MS = 220; // keep in sync with the viewer-out animations in index.css

export default function CertificateViewer({ entry, onClose }) {
  const closeRef = useRef(null);
  const timer = useRef(null);
  const [closing, setClosing] = useState(false);

  const requestClose = useCallback(() => {
    if (timer.current) return;
    setClosing(true);
    timer.current = setTimeout(onClose, CLOSE_MS);
  }, [onClose]);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && requestClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [requestClose]);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Rendered on <body> so no parent transform can trap the fixed overlay
  return createPortal(
    <div
      data-closing={closing || undefined}
      className="viewer-backdrop fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={requestClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${entry.title} certificate`}
    >
      <div
        data-closing={closing || undefined}
        className="viewer-panel brutal-card w-full max-w-4xl max-h-full flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-4 sm:p-5 border-b-2 border-[var(--brutal-border)]">
          <div className="min-w-0">
            <p className="text-base sm:text-lg font-black text-gray-900 dark:text-white leading-snug">{entry.title}</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{entry.org} · {entry.when}</p>
          </div>
          <button
            ref={closeRef}
            onClick={requestClose}
            aria-label="Close"
            className="brutal-btn w-10 h-10 shrink-0 flex items-center justify-center bg-[var(--brutal-chip-bg)] text-gray-900 dark:text-white hover:bg-pink-50 dark:hover:bg-pink-500/15"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-auto bg-gray-100 dark:bg-black/40 p-3 sm:p-5 flex items-center justify-center">
          <img src={entry.full} alt={`${entry.title} certificate`} className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-lg" />
        </div>
        <div className="flex items-center justify-end gap-3 p-4 border-t-2 border-[var(--brutal-border)]">
          <a
            href={entry.full}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn px-4 py-2 bg-[var(--accent)] text-white text-sm font-black"
          >
            Open full size ↗
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
