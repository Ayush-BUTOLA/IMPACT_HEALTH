import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import gsap from "gsap";
import {
  ArrowRight,
  Video,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Droplet,
  Star,
  Phone,
  Activity,
  TestTube2
} from "lucide-react";

import carouselDoctor from '../assets/carousel_doctor_stethoscope.jpg';
import carouselNurse from '../assets/carousel_nurse_patient.jpg';
import carouselFamily from '../assets/carousel_happy_family.jpg';
import carouselTelemedicine from '../assets/carousel_telemedicine_call.jpg';
import carouselBloodTest from '../assets/carousel_blood_test_home.jpg';

const SLIDES = [
  {
    badge: "Plans from ₹199/month • Zero hidden fees",
    lead: "Doctor Consultations",
    accent: "from ₹199/month",
    tail: ".",
    sub: "Connect with verified doctors anytime — virtually from home or at top network clinics across 200+ cities.",
    caption: "Primary Care Physician",
    image: carouselDoctor,
  },
  {
    badge: "Dedicated Clinical Care",
    lead: "Patient Attended by",
    accent: "Expert Nurses",
    tail: ".",
    sub: "Compassionate bedside nursing care, regular vitals checkups, and post-hospitalization support tailored for patient recovery.",
    caption: "Home & Bedside Nursing",
    image: carouselNurse,
  },
  {
    badge: "Trusted by 2L+ patients across 200+ Indian cities",
    lead: "Tailored patient first",
    accent: "Medical Services",
    tail: ".",
    sub: "One smart health membership for your family with unlimited consultations, lab tests, and dedicated care teams.",
    caption: "Family Health Plan",
    image: carouselFamily,
  },
  {
    badge: "Care that fits your schedule",
    lead: "Connect with a doctor",
    accent: "over call",
    tail: ".",
    sub: "Instant video visits, digital prescriptions, and follow-up consultations with experienced physicians from your home.",
    caption: "e-Consultation",
    image: carouselTelemedicine,
  },
  {
    badge: "Diagnostics made simple",
    lead: "Patient getting blood test",
    accent: "at home",
    tail: ".",
    sub: "Book lab tests at home with doorstep sample collection and digital report delivery directly to your phone.",
    caption: "Doorstep Blood Sample Collection",
    image: carouselBloodTest,
  },
];

const METRICS = [
  { value: "2L+", label: "Patients" },
  { value: "200+", label: "Cities" },
  { value: "4.9", label: "Care Rating", star: true },
];

const QUICK_ACTIONS = [
  {
    label: "Book Consultation",
    sub: "Speak to a doctor today",
    icon: Stethoscope,
    href: "/contact",
    accent: "hero-quick-action-red",
    iconColor: "#CC2229",
  },
  {
    label: "Explore Services",
    sub: "View all health programs",
    icon: Activity,
    href: "/services",
    accent: "hero-quick-action-navy",
    iconColor: "#003087",
  },
  {
    label: "Home Diagnostics",
    sub: "Doorstep sample collection",
    icon: TestTube2,
    href: "/services/patient-support/diagnostics-at-home",
    accent: "hero-quick-action-teal",
    iconColor: "#008C7A",
  },
];

const INTERVAL = 5200;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const paused = useRef(false);
  const heroSectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const progressRef = useRef(null);

  // Parallax Scroll Transforms
  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"]
  });
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const yHeroImage = useTransform(springScroll, [0, 1], ["0%", "18%"]);
  const scaleHeroImage = useTransform(springScroll, [0, 1], [1, 1.08]);
  const yHeroContent = useTransform(springScroll, [0, 1], ["0%", "28%"]);
  const opacityHeroContent = useTransform(springScroll, [0, 0.85], [1, 0.2]);

  // Auto-advance slides
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setIndex((p) => (p + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  // Progress bar reset + animation
  useEffect(() => {
    setProgress(0);
    const startTime = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    if (!paused.current) raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index]);

  // GSAP crossfade
  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;
    const panels = container.querySelectorAll('.hero-image-panel');
    panels.forEach((panel, i) => {
      if (i === index) {
        gsap.to(panel, { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' });
      } else {
        gsap.to(panel, { opacity: 0, scale: 1.04, duration: 0.6, ease: 'power2.inOut' });
      }
    });
  }, [index]);

  const slide = SLIDES[index];

  return (
    <section
      ref={heroSectionRef}
      className="relative w-full overflow-hidden"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      aria-label="Hero slideshow"
    >
      {/* ── FULL-BLEED IMAGE STACK WITH PARALLAX ── */}
      <motion.div
        ref={imageContainerRef}
        style={{ y: yHeroImage, scale: scaleHeroImage }}
        className="relative w-full h-[540px] sm:h-[600px] lg:h-[680px] bg-[#001A4D] will-change-transform"
      >
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className="hero-image-panel absolute inset-0 overflow-hidden"
            style={{ opacity: i === 0 ? 1 : 0, pointerEvents: i === index ? 'auto' : 'none' }}
          >
            <img
              src={s.image}
              alt={s.caption}
              className="w-full h-full object-cover object-center"
            />
            {/* Layered overlay — bottom-heavy for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/15 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
          </div>
        ))}

        {/* ── CENTERED HERO TEXT WITH PARALLAX ── */}
        <motion.div
          style={{ y: yHeroContent, opacity: opacityHeroContent }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 will-change-transform"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="flex flex-col items-center gap-4 max-w-4xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 text-xs font-semibold text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008C7A] animate-pulse" />
                <span>{slide.badge}</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-[-0.03em] text-balance drop-shadow-sm">
                {slide.lead}{" "}
                <span className="text-[#5BC8F5]">{slide.accent}</span>
                {slide.tail}
              </h1>

              {/* Sub-text */}
              <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed font-medium">
                {slide.sub}
              </p>

              {/* Metrics row */}
              <div className="flex items-center gap-8 mt-2 pt-4 border-t border-white/20">
                {METRICS.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="font-bold text-xl sm:text-2xl text-white flex items-center gap-1 justify-center">
                      {m.value}
                      {m.star && <Star className="w-4 h-4 fill-amber-400 text-amber-400" />}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── SLIDE DOT INDICATORS (bottom of image) ── */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${i === index
                  ? "w-8 h-1.5 bg-white"
                  : "w-2 h-1.5 bg-white/40 hover:bg-white/70"
                }`}
            />
          ))}
        </div>

        {/* ── PROGRESS BAR ── */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
          <div
            className="h-full bg-[#008C7A] transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>

      {/* ── QUICK ACTIONS BAR ── */}
      <div className="w-full bg-white border-b-2 border-[#E0E4EB] shadow-[0_4px_16px_rgba(0,48,135,0.08)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#E0E4EB]">
          {QUICK_ACTIONS.map((action) => {
            const IconComp = action.icon;
            return (
              <Link
                key={action.label}
                to={action.href}
                className={`hero-quick-action ${action.accent} flex-1`}
              >
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${action.iconColor}15` }}
                >
                  <IconComp className="w-5 h-5" style={{ color: action.iconColor }} />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[#1A1A2E] text-sm leading-tight">{action.label}</div>
                  <div className="text-[11px] text-[#6B7C93] font-medium mt-0.5">{action.sub}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#6B7C93] ml-auto shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
