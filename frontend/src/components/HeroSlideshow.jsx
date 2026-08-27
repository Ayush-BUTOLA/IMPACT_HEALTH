import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import {
  ArrowRight,
  Video,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Droplet,
  CheckCircle2,
  Star,
} from "lucide-react";
import Aurora from "./backgrounds/Aurora";

import carouselDoctor from '../assets/carousel_doctor_stethoscope.jpg';
import carouselNurse from '../assets/carousel_nurse_patient.jpg';
import carouselFamily from '../assets/carousel_happy_family.jpg';
import carouselTelemedicine from '../assets/carousel_telemedicine_call.jpg';
import carouselBloodTest from '../assets/carousel_blood_test_home.jpg';

const SLIDES = [
  {
    badge: "Pan-India Experienced Physicians",
    lead: "Inclinic & Virtual",
    accent: "Doctor Consultations",
    tail: ".",
    sub: "Connect with verified doctors anytime — whether virtually from home or at top network clinics across 200+ cities.",
    caption: "Doctor with stethoscope",
    image: carouselDoctor,
    toastIcon: Stethoscope,
    toastTitle: "Doctor Consult Active",
    toastSub: "Dr. Gunjan D. Khare · Ready for consultation",
  },
  {
    badge: "Dedicated Clinical Care",
    lead: "Patient Attended by",
    accent: "Expert Nurses",
    tail: ".",
    sub: "Compassionate bedside nursing care, regular vitals checkups, and post-hospitalization support tailored for patient recovery.",
    caption: "Patient attended by nurse",
    image: carouselNurse,
    toastIcon: HeartPulse,
    toastTitle: "Nurse Care Visit",
    toastSub: "Monthly vitals check · Regular monitoring",
  },
  {
    badge: "Trusted by 2L+ patients across 200+ Indian cities",
    lead: "Tailored patient first",
    accent: "Medical Services",
    tail: ".",
    sub: "One smart membership for your whole family. Unlimited doctor consultations, free at-home blood tests, and dedicated care teams.",
    caption: "Happy family health",
    image: carouselFamily,
    toastIcon: ShieldCheck,
    toastTitle: "Care plan active",
    toastSub: "2L+ Patients Protected · 24/7 Support",
  },
  {
    badge: "Care that fits your schedule",
    lead: "Connect with a doctor",
    accent: "over call (Telemedicine)",
    tail: ".",
    sub: "Instant video visits, instant digital prescriptions, and follow-ups with experienced physicians from the comfort of your home.",
    caption: "Telemedicine consultation",
    image: carouselTelemedicine,
    toastIcon: Video,
    toastTitle: "Video call active",
    toastSub: "Doctor on call · Instant connect",
  },
  {
    badge: "Diagnostics made simple",
    lead: "Patient getting blood test",
    accent: "at home",
    tail: ".",
    sub: "Book lab tests at home — trained certified phlebotomists visit your doorstep, and verified reports arrive directly on your phone.",
    caption: "Blood test at home",
    image: carouselBloodTest,
    toastIcon: Droplet,
    toastTitle: "Home Blood Sample",
    toastSub: "Lipid + HbA1c · Report ready in 18h",
  },
];

const METRICS = [
  { value: "2L+", label: "Patients" },
  { value: "200+", label: "Cities" },
  { value: "4.9", label: "Care Rating", star: true },
];

const INTERVAL = 5200;

const slideTextVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.3 } },
};

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setIndex((p) => (p + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  // GSAP image transition
  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;

    const panels = container.querySelectorAll('.hero-image-panel');
    panels.forEach((panel, i) => {
      if (i === index) {
        gsap.to(panel, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        });
      } else {
        gsap.to(panel, {
          opacity: 0,
          scale: 1.05,
          duration: 0.6,
          ease: 'power2.inOut',
        });
      }
    });
  }, [index]);

  const slide = SLIDES[index];

  return (
    <section
      className="relative overflow-hidden min-h-[calc(100dvh-72px)] flex items-center"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {/* Aurora background for the hero */}
      <Aurora
        colorStops={['#f4f5fd', '#ECECFE', '#eaf4fd']}
        amplitude={0.6}
        speed={0.3}
        blend={0.5}
        style={{ opacity: 0.35 }}
      />

      {/* Gradient overlay so content stays readable */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f4f5fd]/80 via-[#eaf4fd]/60 to-transparent pointer-events-none z-[1]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 py-16 lg:py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* LEFT — rotating message + fixed controls */}
        <div className="flex flex-col text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="flex flex-col gap-5 min-h-[300px]"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                initial: {},
                animate: { transition: { staggerChildren: 0.08 } },
                exit: { transition: { staggerChildren: 0.04 } },
              }}
            >
              <motion.span
                className="self-start inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#e6e7f2] rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-navy shadow-sm font-sans"
                variants={slideTextVariants}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {slide.badge}
              </motion.span>

              <motion.h1
                className="font-display font-extrabold text-navy tracking-tight text-[44px] lg:text-[52px] leading-[1.04]"
                variants={slideTextVariants}
              >
                {slide.lead}{" "}
                <span className="text-violet">{slide.accent}</span>
                {slide.tail}
              </motion.h1>

              <motion.p
                className="text-[16px] leading-relaxed text-[#1a1a2e]/65 max-w-[480px] font-sans"
                variants={slideTextVariants}
              >
                {slide.sub}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* FIXED — CTAs, dots, metrics */}
          <div className="flex flex-col gap-7 mt-2">
            <div className="flex flex-wrap gap-3.5">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-navy text-white text-[14.5px] font-semibold px-7 py-3.5 rounded-xl hover:bg-navy-deep transition-colors font-sans shadow-sm"
              >
                Explore App <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-navy text-[14.5px] font-semibold px-7 py-3.5 rounded-xl border-[1.5px] border-[#e6e7f2] hover:border-navy/30 transition-colors font-sans shadow-sm"
              >
                Talk to a doctor
              </Link>
            </div>

            <div className="flex items-center gap-2.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  aria-label={"Go to slide " + (i + 1)}
                  onClick={() => setIndex(i)}
                  className="h-1.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2"
                  style={{
                    width: i === index ? 26 : 7,
                    background: i === index ? "var(--color-navy)" : "#c5c8e0",
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-9 pt-5 border-t border-[#e6e7f2]/85">
              {METRICS.map((m) => (
                <div key={m.label}>
                  <div className="font-display font-extrabold text-[24px] text-navy flex items-center gap-1">
                    {m.value}
                    {m.star && <Star className="w-4 h-4 fill-violet text-violet" />}
                  </div>
                  <div className="text-[12px] text-muted uppercase tracking-wide mt-0.5 font-sans font-medium">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — GSAP-powered crossfading image panels */}
        <div ref={imageContainerRef} className="relative h-[440px] lg:h-[480px]">
          {SLIDES.map((s, i) => {
            const ToastIcon = s.toastIcon;
            const active = i === index;
            return (
              <div
                key={i}
                className="hero-image-panel absolute inset-0 rounded-[22px] overflow-hidden"
                style={{
                  opacity: i === 0 ? 1 : 0,
                  boxShadow: "var(--shadow-lg)",
                  pointerEvents: active ? "auto" : "none",
                }}
              >
                {/* Background Image */}
                <img
                  src={s.image}
                  alt={s.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Dark overlay to ensure text/chips stand out nicely */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030050]/50 via-transparent to-black/20 pointer-events-none"></div>

                {/* caption chip */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center bg-navy/85 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1.5 rounded-full font-sans">
                    {s.caption}
                  </span>
                </div>

                {/* contextual toast */}
                <div 
                  className="absolute left-4 right-4 bottom-4 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center gap-3 shadow-md border border-white/20"
                >
                  <div className="w-9 h-9 rounded-xl bg-violet-soft flex items-center justify-center shrink-0">
                    <ToastIcon className="w-[18px] h-[18px] text-violet" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="text-[13px] font-semibold text-navy font-sans">{s.toastTitle}</div>
                    <div className="text-[11.5px] text-[#6b7280] truncate font-sans">{s.toastSub}</div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto shrink-0" strokeWidth={2} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
