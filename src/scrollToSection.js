// src/scrollToSection.js
// Smooth-scrolls to a section and lands exactly on it, even though images further down the page
// load lazily and push the target while the scroll is still on its way.
export default function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const topBar = () => (window.innerWidth < 1024 ? 72 : 0); // mobile header height
  // offsetTop ignores any temporary animation shift, so we land exactly on the section
  const target = () => {
    let top = 0;
    for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
    return top - topBar();
  };
  window.scrollTo({ top: target(), behavior: "smooth" });

  // Once the scroll settles, re-measure and nudge if the page moved under us. Then keep
  // watching the page height for a few seconds: images near the landing spot can still load
  // and push things down, and correcting inside ResizeObserver happens before the next paint,
  // so the visitor never sees the jump.
  const correct = () => {
    const want = target();
    if (Math.abs(window.scrollY - want) > 4) window.scrollTo({ top: want, behavior: "instant" });
  };
  let done = false;
  const settle = () => {
    if (done) return;
    done = true;
    window.removeEventListener("scrollend", settle);
    clearTimeout(fallback);
    correct();
    if (typeof ResizeObserver === "undefined") return;
    const watcher = new ResizeObserver(correct);
    watcher.observe(document.body);
    setTimeout(() => watcher.disconnect(), 3000);
  };
  window.addEventListener("scrollend", settle);
  const fallback = setTimeout(settle, 1600); // browsers without scrollend
}
