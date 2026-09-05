import React from 'react';
import { motion } from 'motion/react';
import TailwindImageAccordion from '@/components/ui/tailwind-image-accordion';

export const coreTeam = [
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

export default function TeamImageAccordionSection() {
  return (
    <section id="team" className="py-20 lg:py-28 bg-[#FAFBFD] relative overflow-hidden border-t border-slate-200">
      {/* Subtle background ambient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#008C7A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3"
        >
          <span className="overline-teal">
            Leadership &amp; Clinical Advisory
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-display font-extrabold text-[#0B132B] tracking-tight leading-tight">
            Our commitment to integrity and innovation
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            Meet the leadership team and senior clinical advisors steering high-quality, tech-enabled healthcare delivery across Pan-India.
          </p>
        </motion.div>

        {/* 5-Card Image Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <TailwindImageAccordion items={coreTeam} />
        </motion.div>
      </div>
    </section>
  );
}
