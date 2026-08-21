import { useState, useEffect, useRef, useCallback } from "react";
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

const SLIDES = [
  {
    badge: "Care that fits your schedule",
    lead: "Consult a doctor",
    accent: "from your couch",
    tail: ".",
    sub: "Video visits, instant prescriptions, and follow-ups with the same physician — so care never waits for a clinic visit.",
    caption: "Doctor consultation",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop&q=80",
    toastIcon: Video,
    toastTitle: "Video call active",
    toastSub: "Dr. Mehta · waits less than 1 min",
  },
  {
    badge: "Gentle care for elders",
    lead: "Health support for",
    accent: "aging parents",
    tail: ".",
    sub: "Dedicated care managers coordinate checkups, medicines, and lab tests at home — keeping your parents healthy and your mind at ease.",
    caption: "At-home wellness",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop&q=80",
    toastIcon: HeartPulse,
    toastTitle: "Wellness visit done",
    toastSub: "Monthly vitals check · next in 7 days",
  },
  {
    badge: "Trusted by 50,000+ patients across 40+ Indian cities",
    lead: "Reduce your healthcare expenditure",
    accent: "by 60%",
    tail: ".",
    sub: "One smart membership for your whole family. Unlimited doctor consultations, free at-home blood tests, and a dedicated care team for chronic conditions.",
    caption: "Family health plan",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=600&fit=crop&q=80",
    toastIcon: ShieldCheck,
    toastTitle: "Care plan active",
    toastSub: "Dr. Romil reviewed your labs · 2h ago",
  },
  {
    badge: "Unlimited consultations included",
    lead: "Talk to a doctor",
    accent: "anytime",
    tail: ".",
    sub: "Verified physicians, video or in-clinic — with a dedicated care manager who knows your family's history and follows up on every visit.",
    caption: "In-clinic consult",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop&q=80",
    toastIcon: Stethoscope,
    toastTitle: "Dr. Anjali available",
    toastSub: "General physician · responds in under 2 min",
  },
  {
    badge: "Diagnostics made simple",
    lead: "Free blood tests",
    accent: "at your doorstep",
    tail: ".",
    sub: "Book lab tests from home — a trained phlebotomist visits you, and verified reports land in your app within hours.",
    caption: "Sample collection",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351167?w=800&h=600&fit=crop&q=80",
    toastIcon: Droplet,
    toastTitle: "Sample collected",
    toastSub: "Lipid + HbA1c · report ready in 18h",
  },
];

const METRICS = [
  { value: "50K+", label: "Patients" },
  { value: "40+", label: "Cities" },
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
      className="relative overflow-hidden"
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
              <motion.a
                href="#solutions"
                className="inline-flex items-center gap-2 bg-navy text-white text-[14.5px] font-semibold px-7 py-3.5 rounded-xl hover:bg-navy-deep transition-colors font-sans shadow-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Check Prices <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </motion.a>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-navy text-[14.5px] font-semibold px-7 py-3.5 rounded-xl border-[1.5px] border-[#e6e7f2] hover:border-navy/30 transition-colors font-sans shadow-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Talk to a doctor
              </motion.a>
            </div>

            <div className="flex items-center gap-2.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  aria-label={"Go to slide " + (i + 1)}
                  onClick={() => setIndex(i)}
                  className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
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
