// src/components/Preloader.jsx
// Full-screen intro that flashes "hello" in different languages, then opens like an
// old cartoon: a small circle appears in the middle and grows to reveal the site.
import React, { useEffect, useState } from "react";

const greetings = ["Hello", "Bonjour", "Ciao", "Olá", "こんにちは", "안녕하세요", "Hola", "Kumusta"];

const IRIS_MS = 1500; // keep in sync with the iris-open animation in index.css

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState("hello"); // hello → opening → done

  // Step through greetings: hold the first one, then flash the rest
  useEffect(() => {
    if (stage !== "hello") return;
    if (index === greetings.length - 1) {
      const t = setTimeout(() => setStage("opening"), 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), index === 0 ? 1000 : 150);
    return () => clearTimeout(t);
  }, [index, stage]);

  // Remove the intro once the iris has fully opened
  useEffect(() => {
    if (stage !== "opening") return;
    const t = setTimeout(() => setStage("done"), IRIS_MS);
    return () => clearTimeout(t);
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
    <div className={`preloader ${stage === "opening" ? "preloader--opening" : ""}`} aria-hidden="true">
      <p className="preloader-word">{greetings[index]}</p>
    </div>
  );
}
