"use client";
import React from "react";

export interface AccordionItem {
  id: string | number;
  url: string;
  title: string;
  description: string;
  tags?: string[];
}

interface TailwindImageAccordionProps {
  items?: AccordionItem[];
}

export const defaultTeamItems: AccordionItem[] = [
  {
    id: "1",
    url: "/team/anshuman_sahoo.jpg",
    title: "Anshuman Sahoo",
    description: "CEO & Co-Founder",
    tags: ["Strategy", "Operations", "Leadership", "Preventive Care"],
  },
  {
    id: "2",
    url: "/team/ashish_rawat.jpg",
    title: "Ashish Rawat",
    description: "CIO & Co-Founder",
    tags: ["Data Science", "SAS", "Tech Infrastructure", "Health-Tech"],
  },
  {
    id: "3",
    url: "/team/dr_gunjan_khare.jpg",
    title: "Dr. Gunjan D. Khare",
    description: "Medical Officer & Clinical Lead",
    tags: ["MBBS", "Clinical Governance", "Quality Assurance", "Telemedicine"],
  },
  {
    id: "4",
    url: "/team/dr_romil_lotta.jpg",
    title: "Dr. Romil Lotta",
    description: "Clinical Advisor",
    tags: ["MBBS (Mayo)", "Govt PMO", "General Physician", "Health Policy"],
  },
  {
    id: "5",
    url: "/team/dr_lalasa_palli.jpg",
    title: "Dr. Lalasa Palli",
    description: "Pediatric Specialist",
    tags: ["MD Pediatrics", "Child Wellness", "School Health", "Adolescent Care"],
  },
];

export function TailwindImageAccordion({
  items = defaultTeamItems,
}: TailwindImageAccordionProps) {
  return (
    <div className="group flex max-md:flex-col justify-center gap-2.5 sm:gap-3 w-full max-w-7xl mx-auto mb-6 mt-3">
      {items.map((item: AccordionItem) => {
        return (
          <article
            key={item?.id ?? item?.title}
            tabIndex={0}
            className="group/article relative w-full rounded-2xl overflow-hidden md:not-[&:hover]:group-hover:w-[13%] md:[&:not(:focus-within):not(:hover)]:group-focus-within:w-[13%] transition-all duration-500 ease-[cubic-bezier(.5,.85,.25,1.15)] shadow-md hover:shadow-xl border border-slate-200/70 bg-slate-950 before:absolute before:inset-x-0 before:bottom-0 before:h-2/3 before:bg-gradient-to-t before:from-black/90 before:via-black/45 before:to-transparent before:transition-opacity md:before:opacity-75 md:hover:before:opacity-95 focus-within:before:opacity-100 after:opacity-0 md:not-[&:hover]:group-hover:after:opacity-100 md:[&:not(:focus-within):not(:hover)]:group-focus-within:after:opacity-100 after:absolute after:inset-0 after:bg-black/35 after:backdrop-blur-[2px] after:rounded-2xl after:transition-all focus-within:ring-3 focus-within:ring-[#008C7A] cursor-pointer"
          >
            <div className="absolute inset-0 text-white z-10 p-4 sm:p-5 lg:p-6 flex flex-col justify-end pointer-events-none">
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2 transition-all duration-300 md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0">
                  {item.tags.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              
              <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-extrabold text-white tracking-tight leading-snug drop-shadow-md md:whitespace-nowrap md:truncate transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)]">
                {item?.title}
              </h3>
              
              <p className="text-xs sm:text-sm font-semibold text-[#38d9c0] font-sans mt-0.5 drop-shadow-sm md:whitespace-nowrap md:truncate transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)]">
                {item?.description}
              </p>
            </div>

            <img
              className="object-cover object-top h-72 sm:h-80 md:h-[450px] w-full group-hover/article:scale-105 transition-transform duration-700 ease-out"
              src={item?.url}
              alt={item?.title}
              loading="lazy"
            />
          </article>
        );
      })}
    </div>
  );
}

export default TailwindImageAccordion;
