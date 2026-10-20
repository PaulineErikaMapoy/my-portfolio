// src/useImageLoading.js
// While an image is still downloading, its box shows a shimmering placeholder;
// once loaded, the image fades in. Covers images added later too (slideshow, popups).
import { useEffect } from "react";

export default function useImageLoading() {
  useEffect(() => {
    const pending = (parent) => parent && [...parent.children].some((c) => c.tagName === "IMG" && c.hasAttribute("data-loading"));

    const done = (img) => {
      img.removeAttribute("data-loading");
      const parent = img.parentElement;
      if (parent && !pending(parent)) parent.removeAttribute("data-img-loading");
    };

    const track = (img) => {
      if (img.dataset.tracked) return;
      img.dataset.tracked = "1";
      if (img.complete && img.naturalWidth) return; // already there
      img.setAttribute("data-loading", "");
      img.parentElement?.setAttribute("data-img-loading", "");
      img.addEventListener("load", () => done(img), { once: true });
      img.addEventListener("error", () => done(img), { once: true }); // never shimmer forever
    };

    document.querySelectorAll("img").forEach(track);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          if (n.tagName === "IMG") track(n);
          else n.querySelectorAll?.("img").forEach(track);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
}
