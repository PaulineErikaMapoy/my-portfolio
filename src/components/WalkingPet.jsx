// src/components/WalkingPet.jsx
// A little pet that strolls left and right along the bottom of the screen, stays there
// while you scroll, never stops walking, and talks: when clicked, when you reach a new
// section, and now and then on its own. Visitors pick the pet with the paw button in the corner.
import React, { useEffect, useRef, useState } from "react";

// px width of the pet (a bit smaller on phones)
const SIZE = typeof window !== "undefined" && window.innerWidth < 640 ? 68 : 84;
const SPEED = 46;     // px per second
const MARGIN = 12;    // keep this far from the screen edges
const PICKER = 56;    // room kept free for the paw button on the right

const INK = "#2a1a12";

// Collar: a band with a shine and buckle, a ring, and a charm (bell or ID tag) that swings
function Collar({ color, charm = "tag", dy = 0 }) {
  return (
    <g transform={`translate(0 ${dy})`}>
      <path d="M42.6 27 Q 50.6 31.6 58.8 26.6 L 58.8 29.8 Q 50.6 34.8 42.6 30.2 Z" fill={color} stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M44.2 28.4 Q 50.6 32 57.2 28.1" fill="none" stroke="#fff" strokeWidth="0.9" strokeLinecap="round" opacity="0.4" />
      <rect x="54.4" y="27.6" width="2.6" height="3.2" rx="0.6" fill="none" stroke="#d9a520" strokeWidth="0.9" transform="rotate(-14 55.7 29.2)" />
      <g className="pet-charm">
        <circle cx="50.6" cy="32.9" r="1" fill="none" stroke="#b8860b" strokeWidth="0.9" />
        {charm === "bell" ? (
          <>
            <circle cx="50.6" cy="35.2" r="2.3" fill="#ffd34d" stroke={INK} strokeWidth="1.1" />
            <path d="M49.2 35.8 H52" stroke={INK} strokeWidth="0.8" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="50.6" cy="35.3" r="2.3" fill="#ffd34d" stroke={INK} strokeWidth="1.1" />
            <circle cx="49.9" cy="34.6" r="0.7" fill="#fff" opacity="0.8" />
          </>
        )}
      </g>
    </g>
  );
}

// ── Garfield: orange tabby cat ────────────────────
function Cat() {
  const O = "#f28c28", D = "#c4610f", L = "#ffe3c2";
  return (
    <>
      {/* Tail (curls up, orange with a dark tip) */}
      {/* One group so outline, fur and tip all sway together */}
      <g className="pet-tail">
        <path d="M13 31 C 4 29, 3 20, 8 16" fill="none" stroke={INK} strokeWidth="6.5" strokeLinecap="round" />
        <path d="M13 31 C 4 29, 3 20, 8 16" fill="none" stroke={O} strokeWidth="3.6" strokeLinecap="round" />
        <path d="M5.6 19.6 C 5.8 18, 6.6 16.8, 8 16" fill="none" stroke={D} strokeWidth="3.6" strokeLinecap="round" />
      </g>
      {/* Legs: orange with cream socks */}
      {[["pet-leg--a", 15], ["pet-leg--b", 23], ["pet-leg--b", 37], ["pet-leg--a", 45]].map(([cls, x], i) => (
        <g key={i} className={`pet-leg ${cls}`}>
          <rect x={x} y="35" width="6.5" height="13" rx="3.2" fill={O} stroke={INK} strokeWidth="2.4" />
          <rect x={x + 1.2} y="43.5" width="4.1" height="3.6" rx="1.8" fill={L} />
        </g>
      ))}
      {/* Body + cream belly + tabby stripes */}
      <rect x="11" y="22" width="44" height="20" rx="10" fill={O} stroke={INK} strokeWidth="2.8" />
      <path d="M20 41 Q 33 36 46 41" fill={L} />
      <path d="M22 23.5 Q 24 28 22 32 M29 23 Q 31.5 28 29 33 M36 23 Q 38.5 28 36 32" fill="none" stroke={D} strokeWidth="2.6" strokeLinecap="round" />
      {/* Head */}
      <g className="pet-head">
        <path d="M41 14 L43 2 L50 9 Z" fill={O} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M54 9 L61 2 L62 14 Z" fill={O} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M44.2 8.5 L45 4.6 L48 8 Z" fill="#ff9fc6" />
        <path d="M56 8 L59.6 4.6 L60.3 9.3 Z" fill="#ff9fc6" />
        <circle cx="51" cy="18" r="11.5" fill={O} stroke={INK} strokeWidth="2.8" />
        {/* Forehead stripes */}
        <path d="M48 7.6 L49 11 M51 7 L51 11.2 M54 7.6 L53 11" stroke={D} strokeWidth="1.8" strokeLinecap="round" />
        {/* Cream muzzle */}
        <ellipse cx="51.3" cy="22.3" rx="6.2" ry="4.4" fill={L} />
        {/* Eyes with a shine */}
        <g className="pet-eye"><ellipse cx="46.8" cy="17" rx="2.1" ry="2.5" fill={INK} /><circle cx="47.5" cy="16.1" r="0.8" fill="#fff" /></g>
        <g className="pet-eye"><ellipse cx="55.8" cy="17" rx="2.1" ry="2.5" fill={INK} /><circle cx="56.5" cy="16.1" r="0.8" fill="#fff" /></g>
        {/* Blush, nose, mouth, whiskers */}
        <circle cx="43.6" cy="21.6" r="2" fill="#ff7fb0" opacity="0.55" />
        <circle cx="59" cy="21.6" r="2" fill="#ff7fb0" opacity="0.55" />
        <path d="M50.2 20.4 L52.4 20.4 L51.3 21.8 Z" fill="#ff6fa8" />
        <path d="M49.4 23 Q 50.4 24.2 51.3 23 Q 52.2 24.2 53.2 23" fill="none" stroke={INK} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M45 22 L39.5 21 M45 23.6 L39.8 24.6 M57.6 22 L63 21 M57.6 23.6 L62.8 24.6" stroke={INK} strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
      </g>
      {/* Pink collar with a gold bell */}
      <Collar color="var(--accent)" charm="bell" dy={-1.5} />
    </>
  );
}

// ── Shih tzus: fluffy body, long ears, beard, plume tail ─
// coat = fur, ears = ear fur (short and fluffy), beard = face fluff, collar = collar color,
// spots = black patches on the body, topknot = bow color for a top ponytail
function ShihTzu({ coat, ears, beard, collar, spots, topknot }) {
  return (
    <>
      {/* Plume tail curled over the back, swaying slowly like the cat's */}
      <g className="pet-tail">
        <path d="M15 25 C 6 20, 8 9, 17 11" fill="none" stroke={INK} strokeWidth="6.2" strokeLinecap="round" />
        <path d="M15 25 C 6 20, 8 9, 17 11" fill="none" stroke={coat} strokeWidth="3.4" strokeLinecap="round" />
      </g>
      {/* Short legs peeking out under the fur */}
      {[["pet-leg--a", 16], ["pet-leg--b", 24], ["pet-leg--b", 37], ["pet-leg--a", 45]].map(([cls, x], i) => (
        <g key={i} className={`pet-leg ${cls}`}>
          <rect x={x} y="37" width="6.5" height="11" rx="3.2" fill={coat} stroke={INK} strokeWidth="2.4" />
        </g>
      ))}
      {/* Fluffy body with a scalloped fur skirt */}
      <path
        d="M20 22 H46 A10 10 0 0 1 56 32 Q 55 40 52 41 Q 49 45 45 41 Q 42 45 38 41 Q 35 45 31 41 Q 28 45 24 41 Q 21 45 17 41 Q 11 40 10 32 A10 10 0 0 1 20 22 Z"
        fill={coat} stroke={INK} strokeWidth="2.8" strokeLinejoin="round"
      />
      {spots && (
        <g fill={spots}>
          <ellipse cx="21" cy="29" rx="4.2" ry="3.2" />
          <ellipse cx="30" cy="25.5" rx="2.4" ry="1.8" />
          <ellipse cx="33" cy="34" rx="3.4" ry="2.6" />
          <ellipse cx="43" cy="30" rx="2.6" ry="2.1" />
        </g>
      )}
      {/* Head */}
      <g className="pet-head">
        {/* Topknot ponytail + bow */}
        {topknot && (
          <>
            <path d="M48 7 Q 47 0 51 1 Q 55 0 54 7 Z" fill={coat} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
            <path d="M51 5.5 L45.5 2.5 L45.5 8.5 Z M51 5.5 L56.5 2.5 L56.5 8.5 Z" fill={topknot} stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
            <circle cx="51" cy="5.5" r="1.6" fill={topknot} stroke={INK} strokeWidth="1.2" />
          </>
        )}
        <circle cx="51" cy="17" r="11.5" fill={coat} stroke={INK} strokeWidth="2.8" />
        {/* Long silky ears */}
        <path className="pet-ear" d="M43.5 8.5 Q 37 9.5 37 15.5 Q 35.8 21 38.6 23.6 Q 41.6 24.6 42.6 21.6 Q 44.6 15.5 45.6 9.6 Z" fill={ears} stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
        <path className="pet-ear" d="M58.5 8.5 Q 65 9.5 65 15.5 Q 66.2 21 63.4 23.6 Q 60.4 24.6 59.4 21.6 Q 57.4 15.5 56.4 9.6 Z" fill={ears} stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
        {/* Fluffy beard + short snout */}
        <path d="M44.5 20 Q 43.5 29 47.5 28.6 Q 49.4 31.6 51.3 29 Q 53.2 31.6 55.1 28.6 Q 59.1 29 58.1 20 Z" fill={beard} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
        <ellipse cx="51.3" cy="21.6" rx="4.4" ry="3.1" fill={beard} />
        {/* Big round eyes */}
        <g className="pet-eye"><circle cx="46.4" cy="15.6" r="3.1" fill="#fff" /><circle cx="46.6" cy="15.8" r="2.3" fill={INK} /><circle cx="47.3" cy="14.9" r="0.8" fill="#fff" /></g>
        <g className="pet-eye"><circle cx="56.2" cy="15.6" r="3.1" fill="#fff" /><circle cx="56.4" cy="15.8" r="2.3" fill={INK} /><circle cx="57.1" cy="14.9" r="0.8" fill="#fff" /></g>
        {/* Nose, smile, tongue, blush */}
        <ellipse cx="51.3" cy="20" rx="2.5" ry="1.8" fill="#111" />
        <circle cx="50.6" cy="19.5" r="0.6" fill="#fff" opacity="0.7" />
        <path d="M49.2 23 Q 50.2 24.3 51.3 23 Q 52.4 24.3 53.4 23" fill="none" stroke={INK} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M50.4 24 Q 51.3 27 52.2 24 Z" fill="#ff6fa8" />
        <circle cx="43.6" cy="20.6" r="1.9" fill="#ff7fb0" opacity="0.5" />
        <circle cx="59" cy="20.6" r="1.9" fill="#ff7fb0" opacity="0.5" />
      </g>
      {/* Collar at the neck, just under the chin */}
      <Collar color={collar} dy={-0.5} />
    </>
  );
}

// ── The pets visitors can choose from ─────────────
// sounds = what they say when clicked, picked, or now and then on their own
const pets = [
  {
    id: "garfield", name: "Garfield", kind: "Orange cat", sound: "meow!", Art: Cat,
    sounds: ["meow!", "meow meow!", "mew!"],
  },
  {
    id: "oreo", name: "Oreo", kind: "Shih tzu", sound: "woof!",
    Art: () => <ShihTzu coat="#3a3a42" ears="#1c1c21" beard="#8a8a94" collar="#2f6bff" />,
    sounds: ["woof!", "woof woof!", "arf!"],
  },
  {
    id: "heaven", name: "Heaven", kind: "Shih tzu", sound: "arf!",
    Art: () => <ShihTzu coat="#fdfdfd" ears="#1d1d1d" beard="#ffffff" collar="#e5262d" spots="#1d1d1d" topknot="#e5262d" />,
    sounds: ["arf!", "arf arf!", "woof!"],
  },
];

// ──────────────────────────────────────────────────

const pick = (list) => list[Math.floor(Math.random() * list.length)];

// Speech bubble that types its text out
function SpeechBubble({ text, ms }) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [shown, setShown] = useState(reduced ? text.length : 0);
  useEffect(() => {
    if (shown >= text.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), 28);
    return () => clearTimeout(t);
  }, [shown, text]);
  // Full text is laid out invisibly so the bubble doesn't grow while typing
  return (
    <span className="pet-say" aria-hidden="true">
      <span className="pet-say-bubble brutal-tag" style={{ animationDuration: `${ms}ms` }}>
        <span className="invisible">{text}</span>
        <span className="absolute inset-0 px-2.5 py-1.5">{[...text].slice(0, shown).join("")}</span>
      </span>
    </span>
  );
}

function PetArt({ pet, className }) {
  const { Art } = pet;
  return (
    <svg viewBox="0 0 64 52" className={className} aria-hidden="true">
      <Art />
    </svg>
  );
}

// Picking this hides the walking pet (the paw button stays so it can be brought back)
const NO_PET = { id: "none", name: "No pet" };

function savedPet() {
  try {
    const id = localStorage.getItem("pet-choice");
    if (id === NO_PET.id) return NO_PET;
    return pets.find((p) => p.id === id) || pets[0];
  } catch {
    return pets[0];
  }
}

export default function WalkingPet() {
  const petRef = useRef(null);
  const [pet, setPet] = useState(savedPet);
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef(null);
  const [facing, setFacing] = useState(1); // 1 = walking right, -1 = left
  // Visitors who prefer less motion get a pet that just sits there
  const [sitting] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [hearts, setHearts] = useState([]);
  const [speech, setSpeech] = useState(null); // { id, text, ms }

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The desktop sidebar covers the left side, so start walking right of it
    const leftEdge = () => {
      const aside = document.querySelector("aside");
      const r = aside?.getBoundingClientRect();
      return window.innerWidth >= 1024 && r ? r.right + MARGIN : MARGIN;
    };
    const rightEdge = () => window.innerWidth - SIZE - MARGIN - PICKER;

    let x = Math.max(leftEdge(), Math.min(rightEdge(), window.innerWidth * 0.55));
    let dir = 1;
    let last = performance.now();
    let raf;

    const place = () => {
      const el = petRef.current;
      if (!el) return;
      el.style.transform = `translate3d(${x}px, 0, 0)`;
      // Near a screen edge, the speech bubble lines up with that edge instead of centering
      const edge = x < leftEdge() + 70 ? "left" : x > rightEdge() - 70 ? "right" : "";
      if (el.dataset.edge !== edge) el.dataset.edge = edge;
    };
    place();
    if (reduced) return;

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      x += dir * SPEED * dt;
      const lo = leftEdge();
      const hi = rightEdge();
      if (x <= lo || x >= hi) {
        x = Math.max(lo, Math.min(hi, x));
        dir *= -1;
        setFacing(dir);
      }
      place();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Close the picker on an outside click or Escape
  useEffect(() => {
    if (!pickerOpen) return;
    const onDown = (e) => !pickerRef.current?.contains(e.target) && setPickerOpen(false);
    const onKey = (e) => e.key === "Escape" && setPickerOpen(false);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [pickerOpen]);

  const heartId = useRef(0);
  const speakTimer = useRef(null);
  const lastSpoke = useRef(0);
  const petNow = useRef(pet);
  useEffect(() => () => clearTimeout(speakTimer.current), []);

  function say(text) {
    const ms = 1600 + text.length * 55;
    const id = ++heartId.current;
    lastSpoke.current = performance.now();
    setSpeech({ id, text, ms });
    clearTimeout(speakTimer.current);
    speakTimer.current = setTimeout(() => setSpeech(null), ms);
  }
  // The timers below always reach the latest pet and say()
  const sayRef = useRef(null);
  useEffect(() => {
    sayRef.current = say;
    petNow.current = pet;
  });

  // Make a sound after the intro, and now and then when things are quiet
  useEffect(() => {
    let ready = false;
    const hello = setTimeout(() => {
      ready = true;
      if (petNow.current.sound) sayRef.current(petNow.current.sound);
    }, 5200);
    const idle = setInterval(() => {
      if (ready && petNow.current.sounds && !document.hidden && performance.now() - lastSpoke.current > 35000) {
        sayRef.current(pick(petNow.current.sounds));
      }
    }, 5000);
    return () => {
      clearTimeout(hello);
      clearInterval(idle);
    };
  }, []);

  function pat(line) {
    const id = ++heartId.current;
    setHearts((h) => [...h, id]);
    setTimeout(() => setHearts((h) => h.filter((x) => x !== id)), 1100);
    say(line || pick(pet.sounds));
  }

  function choose(next) {
    setPet(next);
    setPickerOpen(false);
    try {
      localStorage.setItem("pet-choice", next.id);
    } catch {
      /* storage blocked: the choice still applies for this visit */
    }
    if (next.sound) pat(next.sound); // say hi
  }

  return (
    <>
      <div ref={petRef} className={`walking-pet fixed bottom-0 left-0 z-[35] ${pet === NO_PET ? "hidden" : ""}`} style={{ width: SIZE }}>
        <button
          onClick={() => pat()}
          aria-label={`Pet ${pet.name}`}
          title={`Pet ${pet.name}!`}
          className={`pet-body block w-full ${sitting ? "pet--sitting" : "pet--walking"}`}
          style={{ transform: `scaleX(${facing})` }}
        >
          {pet.Art && <PetArt key={pet.id} pet={pet} className="w-full h-auto overflow-visible" />}
        </button>

        {/* Speech bubble + hearts when petted (not flipped with the pet) */}
        {speech && <SpeechBubble key={speech.id} text={speech.text} ms={speech.ms} />}
        {hearts.map((id) => (
          <span key={id} className="pet-heart absolute left-1/2 -top-2 text-[var(--accent)] text-xl font-black pointer-events-none" aria-hidden="true">
            ♥
          </span>
        ))}
      </div>

      {/* Paw button + pet picker (turquoise sticker style, works in light and dark) */}
      <div ref={pickerRef} className="pet-ui fixed bottom-4 right-4 z-[36]">
        {pickerOpen && (
          <div role="menu" aria-label="Choose a pet" className="pet-picker pet-panel absolute bottom-full right-0 mb-4 w-[276px]">
            <div className="flex items-center justify-between px-3 py-2 border-b-[3px] border-[var(--pet-ink)]">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]">Pick a pal</span>
              <span className="font-mono text-[10px] font-bold">{pet === NO_PET ? "off" : `${pets.findIndex((p) => p.id === pet.id) + 1}/${pets.length}`}</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5 p-3">
              {pets.map((p) => (
                <button key={p.id} role="menuitemradio" aria-checked={p.id === pet.id} onClick={() => choose(p)} className="pet-tile">
                  <PetArt pet={p} className="w-full h-auto overflow-visible" />
                  <span className="text-xs font-black leading-tight mt-1">{p.name}</span>
                  <span className="font-mono text-[9px] uppercase tracking-wider opacity-70">{p.kind}</span>
                </button>
              ))}
              <button
                role="menuitemradio"
                aria-checked={pet === NO_PET}
                onClick={() => choose(NO_PET)}
                className="pet-tile col-span-3 !flex-row justify-center gap-2 !py-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M5.6 18.4 L18.4 5.6" />
                </svg>
                <span className="text-xs font-black">No pet</span>
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setPickerOpen((o) => !o)}
          aria-label="Choose a pet"
          aria-expanded={pickerOpen}
          title="Choose a pet"
          className="pet-paw-btn"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
            <ellipse cx="12" cy="16" rx="5" ry="4.2" />
            <ellipse cx="5.6" cy="10.6" rx="2" ry="2.6" transform="rotate(-20 5.6 10.6)" />
            <ellipse cx="9.6" cy="6.6" rx="2" ry="2.7" transform="rotate(-8 9.6 6.6)" />
            <ellipse cx="14.4" cy="6.6" rx="2" ry="2.7" transform="rotate(8 14.4 6.6)" />
            <ellipse cx="18.4" cy="10.6" rx="2" ry="2.6" transform="rotate(20 18.4 10.6)" />
          </svg>
        </button>
      </div>
    </>
  );
}
