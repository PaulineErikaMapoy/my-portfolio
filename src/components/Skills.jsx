// src/components/Skills.jsx
import React from "react";
import FadeIn from "./FadeIn";

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
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    skills: [
      { name: "Python", level: 80, icon: pythonIcon },
      { name: "PHP", level: 75, icon: phpIcon },
      { name: "Kotlin", level: 65, icon: kotlinIcon },
      { name: "C++", level: 65, icon: cppIcon },
      { name: "Java", level: 50, icon: javaIcon },
    ],
  },
  {
    title: "Web development",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
      </svg>
    ),
    skills: [
      { name: "HTML", level: 90, icon: htmlIcon },
      { name: "CSS", level: 90, icon: cssIcon },
      { name: "React", level: 70, icon: reactIcon },
      { name: "JavaScript", level: 65, icon: javascriptIcon },
      { name: "Tailwind CSS", level: 65, icon: tailwindIcon },
    ],
  },
  {
    title: "Frameworks & tools",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    skills: [
      { name: "VS Code", level: 90, icon: vscodeIcon },
      { name: "Xcode", level: 60, icon: xcodeIcon },
      { name: "Android Studio", level: 60, icon: androidStudioIcon },
      { name: "CodeIgniter", level: 50, icon: codeigniterIcon },
      { name: "Packet Tracer", level: 50, icon: packetTracerIcon },
    ],
  },
  {
    title: "Design & creative",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    skills: [
      { name: "Canva", level: 85, icon: canvaIcon },
      { name: "Figma", level: 80, icon: figmaIcon },
      { name: "Adobe Photoshop", level: 75, icon: photoshopIcon },
      { name: "Adobe Illustrator", level: 75, icon: illustratorIcon },
    ],
  },
];

export default function Skills() {
  return (
    <FadeIn>
      <section id="skills" className="max-w-5xl mx-auto px-4 py-16 sm:py-20">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-pink-500 mb-2">
            Skills
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-1">
            What I bring <span className="text-pink-500">to the table</span>
          </h2>
          <p className="text-sm text-gray-400">Tech edition</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 hover:border-pink-200 hover:shadow-sm transition-all duration-300"
            >
              {/* Card header */}
              <div className="flex items-center gap-2 text-pink-500 mb-6">
                {group.icon}
                <span className="text-sm font-bold">{group.title}</span>
              </div>

              {/* Skills */}
              <div className="space-y-5">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-5 h-5 object-contain"
                        />
                        <span className="text-sm font-semibold text-gray-700">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-pink-400 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
