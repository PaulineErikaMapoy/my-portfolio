// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import PauPhoto from "../assets/pauphoto.png";

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "Kumusta? I'm Pau!";
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const handleType = () => {
      const delta = isDeleting ? 100 : 150;
      setTimeout(() => {
        if (!isDeleting) {
          setText(fullText.substring(0, text.length + 1));
        } else {
          setText(fullText.substring(0, text.length - 1));
        }
      }, delta);
    };

    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    const timer = setTimeout(handleType, 50);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, fullText]);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="hero"
      className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-20 sm:pb-28 md:pb-36 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #fed7e2 0%, #fef2f7 40%, #ffffff 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16 px-4 sm:px-6">
        {/* Text side */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-4 sm:space-y-6">
          <h1
            style={{ color: "#ec4899" }}
            className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tight pt-6 sm:pt-8 md:pt-4"
          >
            <span className="inline-block">
              {text}
              <span className="animate-pulse ml-2" style={{ color: "#ec4899" }}>|</span>
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl text-gray-800 mb-6 max-w-md sm:max-w-lg mx-auto lg:mx-0 leading-relaxed"
            style={{ textShadow: "0 2px 8px rgba(236, 72, 153, 0.15)" }}
          >
            A{" "}
            <span className="font-medium">21‑year‑old IT student</span>{" "}
            at FEU Institute of Technology with a specialization in{" "}
            <span className="font-medium">Web and Mobile Applications</span>. When I'm not coding, you'll find me doing{" "}
            <span className="font-medium">special effects makeup</span>,{" "}
            <span className="font-medium">hosting events</span>, or{" "}
            <span className="font-medium">lending my voice to characters</span>. I'm always up for creating something awesome, so let's make it happen!
          </p>

          {/* Buttons — fixed width so they don't stretch */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 items-center lg:items-start sm:justify-center lg:justify-start">
            <button
              onClick={() => scrollTo("about-me")}
              className="w-40 px-5 py-2.5 text-sm sm:text-base rounded-xl font-semibold text-white bg-[#ec4899] border-2 border-[#ec4899] shadow-lg hover:scale-105 transition-transform duration-300"
            >
              About Me
            </button>

            <button
              onClick={() => scrollTo("certifications")}
              className="w-40 px-5 py-2.5 text-sm sm:text-base rounded-xl font-semibold text-[#ec4899] bg-white border-2 border-[#ec4899] shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Credentials
            </button>
          </div>
        </div>

        {/* Photo side */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={PauPhoto}
            alt="Pau"
            className="w-72 sm:w-80 md:w-[360px] lg:w-[480px] h-72 sm:h-80 md:h-[360px] lg:h-[480px] rounded-none object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Animated scroll arrow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70">
        <span className="text-xs text-pink-400 font-medium tracking-widest uppercase">scroll</span>
        <div className="flex flex-col items-center gap-0.5">
          <svg
            className="w-5 h-5 text-pink-400 animate-bounce-arrow"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <svg
            className="w-5 h-5 text-pink-300 animate-bounce-arrow"
            style={{ animationDelay: "0.18s" }}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(6px); opacity: 1; }
        }
        .animate-bounce-arrow {
          animation: bounce-arrow 1.4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
