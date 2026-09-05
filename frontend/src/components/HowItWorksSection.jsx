import React from 'react';
import { motion } from 'motion/react';
import { Stethoscope, Droplet, Users, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    step: 'STEP 1',
    title: 'Consult Verified Doctors',
    desc: 'Connect virtually with certified physicians or visit 200+ partnered clinics with zero wait times.',
    icon: Stethoscope,
  },
  {
    step: 'STEP 2',
    title: 'Home Diagnostics',
    desc: 'Certified phlebotomists collect blood samples at your doorstep, processed in 100% NABL-accredited labs.',
    icon: Droplet,
  },
  {
    step: 'STEP 3',
    title: 'Dedicated Care Manager',
    desc: 'Get an assigned personal care manager who tracks your vitals, prescriptions, and customized diet plans.',
    icon: Users,
  },
  {
    step: 'STEP 4',
    title: 'Track Progress & Meds',
    desc: 'Receive 100% genuine medicines at your door and monitor measurable health recovery every single month.',
    icon: TrendingUp,
  }
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28 bg-white border-t border-slate-200 relative overflow-hidden text-center"
    >
      {/* Background ambient subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-100/40 via-blue-50/30 to-teal-50/40 blur-[100px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 mb-16 lg:mb-20"
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#7C3AED] font-mono inline-block">
            THE PROCESS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight">
            How Impact Health{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7]">
              actually works
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed font-sans">
            A transparent, step-by-step healthcare journey built to give you and your family total peace of mind.
          </p>
        </motion.div>

        {/* Process Timeline Grid */}
        <div className="relative">
          {/* Continuous Gradient Connecting Line (Desktop) - Situated cleanly below icons and above step labels */}
          <div
            className="hidden lg:block absolute top-[74px] left-[12.5%] right-[12.5%] h-[2px] z-0 pointer-events-none"
            aria-hidden="true"
          >
            {/* Base line with purple gradient under step 1 fading smoothly across to soft slate */}
            <div className="w-full h-full bg-gradient-to-r from-[#7C3AED] via-[#9333EA] via-25% to-[#E5E7EB] opacity-90 rounded-full" />

            {/* Animated subtle shimmer overlay */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent w-1/4"
            />
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.12,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="group flex flex-col items-center text-center"
                >
                  {/* Icon Node Container (above line) */}
                  <div className="relative mb-8">
                    {/* Pulsing ring on hover */}
                    <div className="absolute -inset-2 rounded-2xl bg-purple-100/0 group-hover:bg-purple-100/60 transition-all duration-300 blur-sm -z-10" />

                    {/* Squircle Icon Box */}
                    <div className="w-14 h-14 rounded-2xl bg-[#F5EEFF] border border-[#E8DCFF] flex items-center justify-center text-[#7C3AED] shadow-sm shadow-purple-900/5 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-purple-500/15 group-hover:bg-[#EFE5FF] group-hover:border-[#DEC7FF] transition-all duration-300">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                  </div>

                  {/* Step Content Container (below line) */}
                  <div className="flex flex-col items-center">
                    {/* Step Label */}
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#8B5CF6] font-mono mb-1.5">
                      {item.step}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#0B132B] group-hover:text-[#7C3AED] transition-colors duration-200 tracking-tight mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-[270px]">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Trust Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="mt-14 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-500"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#008C7A]" />
            <span>100% NABL Accredited Diagnostics</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
            <span>Zero Hidden Fees or Lock-in</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008C7A]" />
            <span>Verified Doctors Across 200+ Cities</span>
          </div>
          <Link
            to="/contact"
            className="text-[#7C3AED] hover:text-[#6D28D9] font-bold inline-flex items-center gap-1 group"
          >
            <span>Start Your Care Journey</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
