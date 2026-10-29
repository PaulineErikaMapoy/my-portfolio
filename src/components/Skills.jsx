// src/components/Skills.jsx
import React from "react";
import FadeIn from "./FadeIn";

import phpIcon from "../assets/skills/php.webp";
import pythonIcon from "../assets/skills/python.webp";
import javaIcon from "../assets/skills/java.webp";
import cppIcon from "../assets/skills/cpp.webp";
import kotlinIcon from "../assets/skills/kotlin.webp";
import htmlIcon from "../assets/skills/html.webp";
import cssIcon from "../assets/skills/css.webp";
import tailwindIcon from "../assets/skills/tailwindcss.webp";
import javascriptIcon from "../assets/skills/javascript.webp";
import reactIcon from "../assets/skills/react.webp";
import codeigniterIcon from "../assets/skills/codeigniter.webp";
import vscodeIcon from "../assets/skills/vscode.webp";
import xcodeIcon from "../assets/skills/xcode.webp";
import packetTracerIcon from "../assets/skills/packettracer.webp";
import androidStudioIcon from "../assets/skills/androidstudio.webp";
import photoshopIcon from "../assets/skills/ps.webp";
import illustratorIcon from "../assets/skills/ai.webp";
import figmaIcon from "../assets/skills/figma.webp";
import canvaIcon from "../assets/skills/canva.webp";

const skillGroups = [
  {
    title: "Programming languages",
    skills: [
      { name: "Python", icon: pythonIcon },
      { name: "PHP", icon: phpIcon },
      { name: "Kotlin", icon: kotlinIcon },
      { name: "C++", icon: cppIcon },
      { name: "Java", icon: javaIcon },
    ],
  },
  {
    title: "Web development",
    skills: [
      { name: "HTML", icon: htmlIcon },
      { name: "CSS", icon: cssIcon },
      { name: "React", icon: reactIcon },
      { name: "JavaScript", icon: javascriptIcon },
      { name: "Tailwind CSS", icon: tailwindIcon },
    ],
  },
  {
    title: "Frameworks & tools",
    skills: [
      { name: "VS Code", icon: vscodeIcon },
      { name: "Xcode", icon: xcodeIcon },
      { name: "Android Studio", icon: androidStudioIcon },
      { name: "CodeIgniter", icon: codeigniterIcon },
      { name: "Packet Tracer", icon: packetTracerIcon },
    ],
  },
  {
    title: "Design & creative",
    skills: [
      { name: "Canva", icon: canvaIcon },
      { name: "Figma", icon: figmaIcon },
      { name: "Adobe Photoshop", icon: photoshopIcon },
      { name: "Adobe Illustrator", icon: illustratorIcon },
    ],
  },
];

export default function Skills() {
  return (
    <FadeIn>
      {/* On tablets and up this section is a pinned "stage" (see .skills-stage in index.css):
          the title holds in the middle of the screen and tightens as you scroll, then tucks up
          to the top while the cards rise in from below. On phones it's a normal section. */}
      <section id="skills" className="skills-stage">
        <div className="skills-pin section-container py-16 sm:py-20">
          <div className="skills-inner relative">
            {/* Giant faded word behind everything */}
            <span aria-hidden="true" className="skills-ghost">Skills</span>

            {/* Header (same look as the other sections on phones) */}
            <div className="skills-head mb-10 sm:mb-12">
              <div className="skills-eyebrow flex items-center gap-3 mb-3">
                <span className="brutal-tag bg-[var(--accent)] text-white text-xs font-black px-2 py-0.5 tabular-nums">07</span>
                <span className="text-xs font-black tracking-widest uppercase text-gray-900 dark:text-white">Skills</span>
              </div>
              <div className="skills-rule flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-10 pb-5 border-b-[3px] border-[var(--brutal-border)]">
                <h2 className="skills-title text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] text-gray-900 dark:text-white">
                  What I bring <span className="text-[var(--accent)]">to the table</span>
                </h2>
                <p className="skills-sub md:max-w-sm md:text-right text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">Tech edition</p>
              </div>
            </div>

            <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {skillGroups.map((group, i) => (
                <div
                  key={group.title}
                  style={{ "--k": i }}
                  className={`brutal-card brutal-hover p-5 sm:p-6 ${i % 4 === 1 || i % 4 === 2 ? "brutal-mint" : ""}`}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-teal-200 dark:border-white/10">
                    <h3 className="text-base font-black text-gray-900 dark:text-white">{group.title}</h3>
                    <span className="text-xs font-bold text-white bg-[var(--accent)] min-w-6 h-6 px-2 rounded-full flex items-center justify-center tabular-nums">
                      {group.skills.length}
                    </span>
                  </div>

                  {/* Skill chips */}
                  <ul className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="brutal-chip inline-flex items-center gap-2 px-3 py-2 text-sm font-bold text-gray-900 dark:text-white hover:bg-teal-50 dark:hover:bg-teal-400/10"
                      >
                        <img loading="lazy" decoding="async" src={skill.icon} alt="" aria-hidden="true" className="w-6 h-6 object-contain shrink-0" />
                        <span>{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
