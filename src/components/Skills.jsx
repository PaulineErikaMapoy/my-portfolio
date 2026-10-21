// src/components/Skills.jsx
import React from "react";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";

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
      <section id="skills" className="section-container py-16 sm:py-20">

        {/* Header */}
        <SectionHeader
          number="06"
          eyebrow="Skills"
          title={<>What I bring <span className="text-[var(--accent)]">to the table</span></>}
          subtitle="Tech edition"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {skillGroups.map((group, i) => (
            <div
              key={group.title}
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
      </section>
    </FadeIn>
  );
}
