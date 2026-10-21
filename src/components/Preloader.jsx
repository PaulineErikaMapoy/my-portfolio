// src/components/Preloader.jsx
// Full-screen intro that flashes "hello" in different languages, lands on "Hello", then types
// ", I'm Pau!" while the screen slowly fades from black to pink, then opens like an old cartoon: a small circle appears in the
// middle and grows to reveal the site.
import React, { useEffect, useState } from "react";

const greetings = ["Bonjour", "Ciao", "Olá", "こんにちは", "안녕하세요", "Hola", "Hello"];

const IRIS_MS = 900;  // keep in sync with the iris-open animation in index.css
const INTRO = ", I'm Pau!";
const TYPE_MS = 85;   // per letter while typing ", I'm Pau!"
const PAU_MS = 2200;  // typing + the slow fade to pink (keep ≥ the 2s fade in index.css)

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState("hello"); // hello → pau → opening → done
  const [typed, setTyped] = useState(0);

  // Step through greetings: hold the first one, then flash the rest
  useEffect(() => {
    if (stage !== "hello") return;
    if (index === greetings.length - 1) {
      const t = setTimeout(() => setStage("pau"), 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), index === 0 ? 1000 : 150);
    return () => clearTimeout(t);
  }, [index, stage]);

  // Type ", I'm Pau!" one letter at a time
  useEffect(() => {
    if (stage !== "pau" || typed >= INTRO.length) return;
    const t = setTimeout(() => setTyped((n) => n + 1), typed === 0 ? 250 : TYPE_MS);
    return () => clearTimeout(t);
  }, [stage, typed]);

  // "I'm Pau!" on pink → iris opens → intro removed
  useEffect(() => {
    if (stage === "pau") {
      const t = setTimeout(() => setStage("opening"), PAU_MS);
      return () => clearTimeout(t);
    }
    if (stage === "opening") {
      const t = setTimeout(() => setStage("done"), IRIS_MS);
      return () => clearTimeout(t);
    }
  }, [stage]);

  // No scrolling behind the intro
  const covering = stage !== "done";
  useEffect(() => {
    if (!covering) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [covering]);

  if (stage === "done") return null;

  return (
    <div
      className={`preloader ${stage !== "hello" ? "preloader--pau" : ""} ${stage === "opening" ? "preloader--opening" : ""}`}
      aria-hidden="true"
    >
      <p className="preloader-word">
        {greetings[index]}
        {stage !== "hello" && (
          <span className="preloader-pau">
            {INTRO.slice(0, typed)}
            {stage === "pau" && <span className="preloader-caret" />}
          </span>
        )}
      </p>
    </div>
  );
}
