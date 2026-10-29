// src/components/Videos.jsx
// Public Facebook reels, shown with Facebook's own embed player.
// To add one: paste its link below. Use the full address (facebook.com/reel/123...),
// not a "share" link, or Facebook won't play it here.
import React, { useEffect, useRef, useState } from "react";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";

// aspect: "16/9" for landscape videos, "9/16" for vertical reels
const videos = [
  { url: "https://www.facebook.com/reel/885450513817632", aspect: "9/16" },
  { url: "https://www.facebook.com/reel/1242267711214327", aspect: "9/16" },
  { url: "https://www.facebook.com/reel/1914200339255225", aspect: "9/16" },
  { url: "https://www.facebook.com/reel/4445728292345762", aspect: "9/16" },
  { url: "https://www.facebook.com/reel/1086781597151076", aspect: "9/16" },
  { url: "https://www.facebook.com/reel/27488624117480759", aspect: "9/16" },
];

const embedSrc = (url) =>
  `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`;

export default function Videos() {
  // Bumping a video's count remounts its player, which stops it
  const [resets, setResets] = useState(() => videos.map(() => 0));
  const frames = useRef([]);
  const current = useRef(-1);

  // Facebook's player can't be paused from outside, but clicking into a player moves
  // focus to its iframe. When focus lands on a different player, stop the previous one.
  useEffect(() => {
    const check = () => {
      const i = frames.current.indexOf(document.activeElement);
      if (i === -1 || i === current.current) return;
      const prev = current.current;
      current.current = i;
      if (prev !== -1) setResets((r) => r.map((n, k) => (k === prev ? n + 1 : n)));
    };
    const onBlur = () => setTimeout(check, 0);
    window.addEventListener("blur", onBlur);
    // Moving from one player straight to another doesn't blur the page again, so keep checking
    const timer = setInterval(check, 400);
    return () => {
      window.removeEventListener("blur", onBlur);
      clearInterval(timer);
    };
  }, []);

  return (
    <FadeIn>
      <section id="videos" className="section-container py-16 sm:py-20">
        <SectionHeader
          number="09"
          eyebrow="Videos"
          title={<>Plot twist: I do <span className="text-pink-500">marketing, too.</span></>}
          subtitle="Turns out, I know how to sell the story, not just build it."
          oneLine
        />

        <div className="videos-grid grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {videos.map((v, i) => (
            <figure key={v.url} data-reveal className="brutal-card p-3 sm:p-4 flex flex-col gap-3">
              {/* Vertical reels are capped in width so they don't tower over the page */}
              <div
                className={`w-full overflow-hidden rounded-xl border-2 border-[var(--brutal-chip-border)] bg-black ${v.aspect === "9/16" ? "max-w-xs mx-auto" : ""}`}
                style={{ aspectRatio: v.aspect }}
              >
                <iframe
                  key={resets[i]}
                  ref={(el) => (frames.current[i] = el)}
                  src={embedSrc(v.url)}
                  title={`Facebook reel ${i + 1}`}
                  className="w-full h-full"
                  style={{ border: "none" }}
                  loading="lazy"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <a
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="self-end px-1 text-xs font-black text-[var(--accent-ink)] hover:underline"
              >
                Watch on Facebook ↗
              </a>
            </figure>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
