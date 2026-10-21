import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import {
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Droplet,
  Star,
  Percent,
  Pause,
  Play,
} from "lucide-react";
import Aurora from "./backgrounds/Aurora";

import familyHealthcareSavings from "../assets/services/family/family-healthcare-savings.jpg";
import doctorConsultation from "../assets/services/doctor-online-consultation.jpg";
import nurseCare from "../assets/services/school/nurse-care-student.jpeg";
import healthCampVitals from "../assets/services/school/health-camp-vitals.jpeg";
import bloodTestHome from "../assets/services/blood-test-home.jpg";

const SLIDES = [
  {
    serviceLabel: "Family Savings",
    badge: "Smart Family Health Plans",
    lead: "Reduce your Healthcare",
    accent: "expenditure by 60%.",
    tail: "",
    sub: "Smart healthcare coverage for your whole family. Enjoy unlimited doctor visits, routine health checkups, and significant savings on medical expenses.",
    photoLabel: "Healthcare Savings Plan",
    cardHeading: "Save Up to 60% on Family Health",
    cardDescription: "Unlimited doctor consultations, lab tests & diagnostics covered.",
    image: familyHealthcareSavings,
    alt: "Happy Indian family saving up to 60% on comprehensive healthcare plans",
    icon: Percent,
    ctaText: "Explore Savings Plans",
    ctaLink: "/patient-support-programs",
    isExternal: false,
  },
  {
    serviceLabel: "Doctor Consultation",
    badge: "Verified Doctors across India",
    lead: "Consult a Doctor Online",
    accent: "or at a Clinic Near You",
    tail: "",
    sub: "Talk to a doctor on phone from home, or visit a partner clinic. Available in 200+ cities.",
    photoLabel: "Online & Clinic Consultation",
    cardHeading: "Consult Verified Specialists",
    cardDescription: "Virtual call from home or in-clinic visits in 200+ cities.",
    image: doctorConsultation,
    alt: "Patient consulting with verified specialist doctor online via tablet video call",
    icon: Stethoscope,
    ctaText: "Talk to a doctor",
    ctaLink: "https://www.threephih.in/threephih/patientlogin.php",
    isExternal: true,
  },
  {
    serviceLabel: "Nursing Care",
    badge: "Compassionate Nursing Care",
    lead: "Expert Nursing.",
    accent: "Care That Feels Personal.",
    tail: "",
    sub: "From everyday care to recovery after a hospital stay, our nurses provide attentive support, regular health checks, and comfort for your loved ones.",
    photoLabel: "Care with Compassion",
    cardHeading: "Personalised Nursing Support",
    cardDescription: "Regular health checks and support throughout recovery.",
    image: nurseCare,
    alt: "Healthcare nurse providing compassionate clinical bedside checkup",
    icon: HeartPulse,
    ctaText: "Enquire About Nursing Care",
    ctaLink: "/services/patient-support",
    isExternal: false,
  },
  {
    serviceLabel: "Health Plans",
    badge: "Care for You and Your Family",
    lead: "Your Family’s Health.",
    accent: "Our Personal Commitment.",
    tail: "",
    sub: "Doctor consultations, lab tests, and ongoing care—all brought together in one convenient health membership for your family.",
    photoLabel: "Health Checks for Every Generation",
    cardHeading: "Care That Puts You First",
    cardDescription: "Personalised support for your family’s health needs.",
    image: healthCampVitals,
    alt: "Comprehensive health checkup and family care screening",
    icon: ShieldCheck,
    ctaText: "Explore Health Plans",
    ctaLink: "/patient-support-programs",
    isExternal: false,
  },
  {
    serviceLabel: "Diagnostics",
    badge: "Blood Tests & Health Checkups at Home",
    lead: "Book Blood Tests at Home",
    accent: "with Impact Health.",
    tail: "",
    sub: "Book blood tests and health checkup packages with convenient home sample collection. Our trained professionals collect your sample at your doorstep, and your lab reports are delivered directly to your phone.",
    photoLabel: "Home Blood Sample Collection",
    cardHeading: "Professional Sample Collection at Your Doorstep",
    cardDescription: "Easy booking • Home collection • Digital lab reports",
    image: bloodTestHome,
    alt: "Healthcare professional collecting a blood sample from a patient at home.",
    icon: Droplet,
    ctaText: "Book a Blood Test",
    ctaLink: "/services/patient-support",
    isExternal: false,
  },
];

const METRICS = [
  { value: "200k+", label: "Patients" },
  { value: "200+", label: "Cities" },
  { value: "4.9", label: "Rating", star: true },
];

const INTERVAL = 6000;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  const paused = useRef(false);
  const sectionRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Detect prefers-reduced-motion with legacy addListener fallback
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReducedMotion(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    } else if (mq.addListener) {
      mq.addListener(onChange);
      return () => mq.removeListener(onChange);
    }
  }, []);

  const handleNext = useCallback(() => setIndex((p) => (p + 1) % SLIDES.length), []);
  const handlePrev = useCallback(() => setIndex((p) => (p - 1 + SLIDES.length) % SLIDES.length), []);
  const goTo = (i) => setIndex(i);

  const togglePlayPause = () => {
    setIsPaused((prev) => !prev);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(SLIDES.length - 1);
    }
  };

  // Touch swipe
  const onTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const d = touchStartX.current - touchEndX.current;
    if (d > 45) handleNext();
    else if (d < -45) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto-advance (respects reducedMotion and accessible isPaused state)
  useEffect(() => {
    if (reducedMotion || isPaused) return;
    const id = setInterval(() => {
      if (!paused.current) handleNext();
    }, INTERVAL);
    return () => clearInterval(id);
  }, [index, reducedMotion, isPaused, handleNext]);

  // GSAP crossfade between image panels
  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;
    container.querySelectorAll(".hero-image-panel").forEach((panel) => {
      const panelIndex = parseInt(panel.dataset.slide, 10);
      const active = panelIndex === index;
      gsap.to(panel, {
        opacity: active ? 1 : 0,
        scale: active ? 1 : reducedMotion ? 1 : 1.03,
        duration: reducedMotion ? 0.2 : active ? 0.7 : 0.45,
        ease: active ? "power3.out" : "power2.inOut",
      });
    });
  }, [index, reducedMotion]);

  const slide = SLIDES[index];

  return (
    <section
      className="relative overflow-hidden bg-[#eaf4fd]/45 text-navy py-10 sm:py-14 lg:py-20"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Impact Health Hero Showcase"
      ref={sectionRef}
    >
      {/* Previous Aurora & Subtle Gradient Overlay */}
      <Aurora
        colorStops={["#f4f5fd", "#ECECFE", "#eaf4fd"]}
        amplitude={0.6}
        speed={0.3}
        blend={0.5}
        style={{ opacity: 0.45 }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#f4f5fd]/80 via-[#eaf4fd]/60 to-transparent pointer-events-none z-[1]" />

      {/* Screen reader notification */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${index + 1} of ${SLIDES.length}: ${slide.lead} ${slide.accent}. ${slide.sub} ${isPaused ? "(Slideshow paused)" : ""}`}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ════ LEFT COLUMN: Content & Interactive Controls ════ */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Slide Text Content */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                id="hero-active-slide"
                role="tabpanel"
                aria-labelledby={`service-tab-${index}`}
                className="flex flex-col gap-4 w-full"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
                transition={{ duration: reducedMotion ? 0.12 : 0.28, ease: "easeOut" }}
              >
                {/* Badge: Green dot + slide.badge */}
                <div className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-[#e2e4f0] text-[13px] font-semibold text-navy font-sans shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                  <span>{slide.badge}</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-display font-extrabold text-navy text-3xl sm:text-4xl lg:text-[46px] leading-[1.16] tracking-tight">
                  <span>{slide.lead}</span>{" "}
                  <span className="text-violet font-extrabold">{slide.accent}</span>
                  {slide.tail}
                </h1>

                {/* Subtitle description */}
                <p className="text-[#43465e] text-sm sm:text-base leading-relaxed max-w-lg font-sans">
                  {slide.sub}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Primary Action Button */}
            <div className="mt-7">
              {slide.isExternal ? (
                <a
                  href={slide.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-navy text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-navy-deep active:scale-[0.98] transition-all font-sans text-sm shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.2} />
                </a>
              ) : (
                <Link
                  to={slide.ctaLink}
                  className="inline-flex items-center gap-2.5 bg-navy text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-navy-deep active:scale-[0.98] transition-all font-sans text-sm shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.2} />
                </Link>
              )}
            </div>

            {/* ══ Option C Service Switcher Pills + Accessible Pause Button ══ */}
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <div
                role="tablist"
                aria-label="Healthcare services"
                onKeyDown={handleKeyDown}
                className="flex items-center gap-2 flex-wrap"
              >
                {SLIDES.map((s, i) => {
                  const active = i === index;
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.serviceLabel}
                      id={`service-tab-${i}`}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-controls="hero-active-slide"
                      tabIndex={active ? 0 : -1}
                      onClick={() => goTo(i)}
                      className={`transition-all duration-200 cursor-pointer flex items-center justify-center font-sans focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 ${
                        active
                          ? "bg-navy text-white px-4 py-2.5 rounded-full font-semibold text-xs sm:text-[13px] gap-2 shadow-sm min-h-[44px]"
                          : "w-11 h-11 rounded-full bg-white/90 border border-[#d6d9ee] text-[#4f5373] hover:text-navy hover:border-navy/40 hover:bg-white shadow-xs"
                      }`}
                      title={s.serviceLabel}
                    >
                      <Icon className={active ? "w-4 h-4 text-white shrink-0" : "w-4 h-4 shrink-0"} strokeWidth={2} />
                      {active && <span>{s.serviceLabel}</span>}
                    </button>
                  );
                })}
              </div>

              {/* Accessible Pause / Resume Button */}
              <button
                type="button"
                onClick={togglePlayPause}
                aria-label={isPaused ? "Resume auto-advancing slides" : "Pause auto-advancing slides"}
                aria-pressed={isPaused}
                className="w-11 h-11 rounded-full bg-white/90 border border-[#d6d9ee] text-[#4f5373] hover:text-navy hover:border-navy/40 hover:bg-white flex items-center justify-center transition-all cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 shrink-0"
                title={isPaused ? "Resume rotation" : "Pause rotation"}
              >
                {isPaused ? (
                  <Play className="w-3.5 h-3.5 fill-current shrink-0 text-navy" aria-hidden="true" />
                ) : (
                  <Pause className="w-3.5 h-3.5 fill-current shrink-0 text-navy" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Bottom Stats Row: 2L+ Patients | 200+ Cities | 4.9 Rating */}
            <div className="mt-10 pt-6 border-t border-[#d8dbee]/80 w-full max-w-md">
              <div className="flex items-center gap-8 sm:gap-12">
                {METRICS.map((m) => (
                  <div key={m.label} className="text-left font-sans">
                    <div className="font-display font-extrabold text-xl sm:text-2xl text-navy flex items-center gap-0.5 leading-none">
                      <span>{m.value}</span>
                      {m.star && (
                        <Star className="w-4 h-4 fill-violet text-violet shrink-0 ml-0.5" />
                      )}
                    </div>
                    <div className="text-xs text-[#707494] font-medium mt-1.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════ RIGHT COLUMN: Significantly Larger Image Frame ════ */}
          <div className="lg:col-span-6 w-full">
            <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[530px] rounded-[24px] overflow-hidden bg-white/50 border border-[#dde0f4] shadow-xl">
              {/* Stack of cross-fading images */}
              {SLIDES.map((s, i) => {
                const Icon = s.icon;
                const active = i === index;
                return (
                  <div
                    key={s.serviceLabel}
                    data-slide={i}
                    className="hero-image-panel absolute inset-0 rounded-[24px] overflow-hidden"
                    style={{ opacity: i === 0 ? 1 : 0, pointerEvents: active ? "auto" : "none" }}
                  >
                    <img
                      src={s.image}
                      alt={s.alt}
                      className="w-full h-full object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                    />

                    {/* Gradient shading overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030050]/75 via-transparent to-black/10 pointer-events-none" />

                    {/* Top photo label badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center bg-navy/85 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1 rounded-full font-sans shadow-xs">
                        {s.photoLabel}
                      </span>
                    </div>

                    {/* Bottom floating consultation card matching Option C */}
                    <div className="absolute left-4 right-4 sm:left-6 sm:right-6 bottom-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-lg flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-violet-soft flex items-center justify-center shrink-0 text-violet">
                        <Icon className="w-5 h-5 text-violet" strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[14px] font-bold text-navy font-sans truncate">
                          {s.cardHeading}
                        </div>
                        <div className="text-xs text-[#626682] font-sans truncate mt-0.5">
                          {s.cardDescription}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

