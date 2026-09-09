"use client";

import { SkillItem } from "@/lib/mock-data";
import { Code2, Layout, Server, Wrench } from "lucide-react";

interface SkillMarqueeProps {
  skills: SkillItem[];
}

export default function SkillMarquee({ skills }: SkillMarqueeProps) {
  // Category icon fallback helper
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "frontend":
        return Layout;
      case "backend":
        return Server;
      case "tools":
        return Wrench;
      default:
        return Code2;
    }
  };

  // Double the array for seamless infinite marquee loop
  const firstRowSkills = skills.length > 0 ? [...skills, ...skills] : [];
  const reversedSkills = [...skills].reverse();
  const secondRowSkills = skills.length > 0 ? [...reversedSkills, ...reversedSkills] : [];

  return (
    <div className="relative w-full overflow-hidden py-4 space-y-4">
      {/* Soft Gradient Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#faf8f5] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#faf8f5] to-transparent z-10 pointer-events-none"></div>

      {/* Row 1: Sliding Left Track */}
      <div className="animate-marquee flex items-center gap-4">
        {firstRowSkills.map((skill, idx) => {
          const Icon = getCategoryIcon(skill.category);
          return (
            <div
              key={`row1-${skill.id}-${idx}`}
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs hover:border-emerald-400 hover:shadow-md hover:scale-105 transition-all duration-300 shrink-0 cursor-pointer group"
            >
              <div className="p-2 rounded-xl text-emerald-600 transition-colors flex items-center justify-center w-9 h-9 shrink-0">
                {skill.icon_url ? (
                  <img
                    src={skill.icon_url}
                    alt={skill.name}
                    className="w-5 h-5 object-contain"
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-stone-900 group-hover:text-emerald-700 transition-colors">
                  {skill.name}
                </span>
                <span className="text-[11px] font-mono text-stone-500">
                  {skill.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Sliding Right Track (Reverse Direction) */}
      <div className="animate-marquee-reverse flex items-center gap-4">
        {secondRowSkills.map((skill, idx) => {
          const Icon = getCategoryIcon(skill.category);
          return (
            <div
              key={`row2-${skill.id}-${idx}`}
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs hover:border-teal-400 hover:shadow-md hover:scale-105 transition-all duration-300 shrink-0 cursor-pointer group"
            >
              <div className="p-2 rounded-xl text-teal-600 transition-colors flex items-center justify-center w-9 h-9 shrink-0">
                {skill.icon_url ? (
                  <img
                    src={skill.icon_url}
                    alt={skill.name}
                    className="w-5 h-5 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-stone-900 group-hover:text-teal-700 transition-colors">
                  {skill.name}
                </span>
                <span className="text-[11px] font-mono text-stone-500">
                  {skill.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 1: Sliding Left Track */}
      <div className="animate-marquee flex items-center gap-4">
        {firstRowSkills.map((skill, idx) => {
          const Icon = getCategoryIcon(skill.category);
          return (
            <div
              key={`row1-${skill.id}-${idx}`}
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs hover:border-emerald-400 hover:shadow-md hover:scale-105 transition-all duration-300 shrink-0 cursor-pointer group"
            >
              <div className="p-2 rounded-xl text-emerald-600 transition-colors flex items-center justify-center w-9 h-9 shrink-0">
                {skill.icon_url ? (
                  <img
                    src={skill.icon_url}
                    alt={skill.name}
                    className="w-5 h-5 object-contain"
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-stone-900 group-hover:text-emerald-700 transition-colors">
                  {skill.name}
                </span>
                <span className="text-[11px] font-mono text-stone-500">
                  {skill.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
}
