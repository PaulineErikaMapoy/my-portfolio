// src/components/Preloader.jsx
// Full-screen intro that flashes "hello" in different languages, then fades away
// (inspired by ivanotch.vercel.app)
import React, { useEffect, useState } from "react";

const greetings = ["Hello", "Bonjour", "Ciao", "Olá", "こんにちは", "안녕하세요", "Hola", "Kumusta"];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  // Step through greetings: hold the first one, then flash the rest
  useEffect(() => {
    if (index === greetings.length - 1) {
      const t = setTimeout(() => setLeaving(true), 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), index === 0 ? 1000 : 150);
    return () => clearTimeout(t);
  }, [index]);

  // Unmount once the fade-out finishes
  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(() => setDone(true), 1300);
    return () => clearTimeout(t);
  }, [leaving]);

  // No scrolling behind the intro
  useEffect(() => {
    if (done) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [done]);

  if (done) return null;

  return (
    <div className={`preloader ${leaving ? "preloader--leaving" : ""}`} aria-hidden="true">
      <p className="preloader-word">{greetings[index]}</p>
    </div>
  );
}
