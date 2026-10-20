// src/components/Skills.jsx
import React from "react";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";

import phpIcon from "../assets/skills/php.png";
import pythonIcon from "../assets/skills/python.png";
import javaIcon from "../assets/skills/java.png";
import cppIcon from "../assets/skills/cpp.png";
import kotlinIcon from "../assets/skills/kotlin.png";
import htmlIcon from "../assets/skills/html.png";
import cssIcon from "../assets/skills/css.png";
import tailwindIcon from "../assets/skills/tailwindcss.png";
import javascriptIcon from "../assets/skills/javascript.png";
import reactIcon from "../assets/skills/react.png";
import codeigniterIcon from "../assets/skills/codeigniter.png";
import vscodeIcon from "../assets/skills/vscode.png";
import xcodeIcon from "../assets/skills/xcode.png";
import packetTracerIcon from "../assets/skills/packettracer.png";
import androidStudioIcon from "../assets/skills/androidstudio.png";
import photoshopIcon from "../assets/skills/ps.png";
import illustratorIcon from "../assets/skills/ai.png";
import figmaIcon from "../assets/skills/figma.png";
import canvaIcon from "../assets/skills/canva.png";

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
          number="04"
          eyebrow="Skills"
          title={<>What I bring <span className="text-pink-500">to the table</span></>}
          subtitle="Tech edition"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {skillGroups.map((group, i) => (
            <div
              key={group.title}
              className={`brutal-card brutal-hover p-5 sm:p-6 ${i % 4 === 1 || i % 4 === 2 ? "brutal-mint" : ""}`}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-pink-200 dark:border-white/10">
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
                    className="brutal-chip inline-flex items-center gap-2 px-3 py-2 text-sm font-bold text-gray-900 dark:text-white hover:bg-pink-50 dark:hover:bg-pink-500/10"
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
