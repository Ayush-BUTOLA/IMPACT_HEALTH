import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useInView, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Dna,
  HeartHandshake,
  ClipboardList,
  Truck,
  BarChart3,
  CheckCircle2,
  Users,
  MapPin,
  Activity,
  Building2,
  ArrowDown,
  PhoneCall,
  ShieldCheck,
  Award,
  Thermometer,
  Clock,
  Sparkles,
  ArrowRight,
  Stethoscope
} from 'lucide-react';
import Button from '../components/Button';
import PageBackground from '../components/PageBackground';
import CtaBand from '../components/CtaBand';
import patientCareImg from '../assets/patient_support_chronic_care.jpg';

// Emil Kowalski refined easing & spring curves
const EMIL_EASE = [0.23, 1, 0.32, 1];
const EASE = EMIL_EASE;
const EMIL_SPRING = { type: 'spring', stiffness: 420, damping: 30 };

const timelineSteps = [
  {
    step: "01",
    title: "Disease Identification and Mapping",
    icon: Dna,
    desc: "Profiling and tracking patient cohorts to identify optimal therapy opportunities and mapping demographic/clinical variations.",
    tag: "Diagnostics & Setup",
    deliverables: [
      "Patient cohort profiling & segmentation",
      "Clinical protocol mapping & localization",
      "Demographic and geographic variation audits"
    ]
  },
  {
    step: "02",
    title: "Treatment Initiation and Assistance",
    icon: HeartHandshake,
    desc: "Guiding patients through the critical onboarding phase, clarifying prescription protocols, and ensuring early treatment compliance.",
    tag: "Onboarding & Adherence",
    deliverables: [
      "Digital consent management & setup",
      "Insurance clearance & copay support assistance",
      "Patient welcome kits & onboarding tutorials"
    ]
  },
  {
    step: "03",
    title: "Disease Management",
    icon: ClipboardList,
    desc: "Structured monitoring, personal health coach support, and proactive follow-ups for long-term health improvements and tracking.",
    tag: "Continuous Care",
    deliverables: [
      "Personalized care coordinator matching",
      "Proactive wellness check-ins & vitals tracking",
      "Custom behavioral compliance support loops"
    ]
  },
  {
    step: "04",
    title: "Drug Distribution",
    icon: Truck,
    desc: "Seamless cold-chain distribution, last-mile logistics support, and home delivery for complex specialty medicines.",
    tag: "Specialty Logistics",
    deliverables: [
      "Temperature-controlled cold-chain distribution",
      "Last-mile tracking & delivery coordination",
      "Automated prescription refill alerts & logistics"
    ]
  },
  {
    step: "05",
    title: "Assessment",
    icon: BarChart3,
    desc: "Continuous evaluation of program performance, patient adherence metrics, clinical response reports, and therapy retention insights.",
    tag: "Evaluation & Analytics",
    deliverables: [
      "Comprehensive therapy retention audits",
      "Real-time patient adherence insights",
      "Clinical outcome reporting for partners"
    ]
  }
];

const stats = [
  { value: 50000, suffix: "+", label: "Patients Supported", trend: "+12% MoM", icon: Users },
  { value: 200, suffix: "+", label: "Cities Covered", trend: "Nationwide", icon: MapPin },
  { value: 94, suffix: "%", label: "Program Compliance", trend: "Industry Lead", icon: Activity },
  { value: 150, suffix: "+", label: "Partner Clinics", trend: "Active Network", icon: Building2 }
];

const tickerItems = [
  "50,000+ Patients Supported",
  "200+ Cities Covered",
  "94% Program Compliance",
  "150+ Partner Clinics",
  "1M+ Consultations Delivered"
];

const pillars = [
  {
    num: "01",
    label: "Patient Education",
    title: "What is a Patient Support Program?",
    desc: "A Patient Support Program (PSP) is a privately operated service designed to assist patients who have been prescribed specific pharmaceutical therapies. These programs provide dedicated support structures to help patients manage their treatment, understand their health conditions, and coordinate clinical care for better medical outcomes and compliance."
  },
  {
    num: "02",
    label: "Compliance & Insights",
    title: "Why do Pharmaceuticals need Patient Support Programs?",
    desc: "Pharmaceutical companies require Patient Support Programs to assist patients navigating complex specialty drugs, modern medical devices, and intricate treatment regimens. By offering direct patient consultation, compliance tracking, and adherence support, these programs co-create personalized care journeys that optimize treatment results and improve long-term retention."
  }
];

function CountUp({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

export default function PatientSupportProgram() {
  const [audienceMode, setAudienceMode] = useState('patients'); // 'patients' | 'pharma'
  const shouldReduceMotion = useReducedMotion();
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 55%"]
  });
  const railProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  useEffect(() => {
    document.title = audienceMode === 'patients'
      ? "Patient Support Programs & Care Navigation | Impact Health"
      : "Pharma Patient Support Infrastructure (PSP) | Impact Health";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [audienceMode]);

  return (
    <div id="psp-page" className="w-full font-sans text-[#0F172A] relative overflow-hidden">
      <PageBackground variant="patients" showInteractiveDots={true} />

      {/* 1. Refined Hybrid Hero (Impeccable + Emil Kowalski Polish) */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 border-b border-slate-200/60 bg-white/70 backdrop-blur-md relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">

          {/* Segmented Audience Switcher - Clean, Tactile, No Redundant Sub-Badges */}
          <div className="mb-8 sm:mb-10 flex items-center justify-between">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
              <button
                type="button"
                onClick={() => setAudienceMode('patients')}
                className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 active:scale-[0.97] focus:outline-none ${
                  audienceMode === 'patients' ? 'text-white' : 'text-slate-600 hover:text-[#0B132B]'
                }`}
              >
                {audienceMode === 'patients' && (
                  <motion.div
                    layoutId="hero-audience-pill"
                    className="absolute inset-0 bg-[#0066FF] rounded-lg shadow-sm"
                    transition={EMIL_SPRING}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4" />
                  For Patients &amp; Families
                </span>
              </button>

              <button
                type="button"
                onClick={() => setAudienceMode('pharma')}
                className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 active:scale-[0.97] focus:outline-none ${
                  audienceMode === 'pharma' ? 'text-white' : 'text-slate-600 hover:text-[#0B132B]'
                }`}
              >
                {audienceMode === 'pharma' && (
                  <motion.div
                    layoutId="hero-audience-pill"
                    className="absolute inset-0 bg-[#0066FF] rounded-lg shadow-sm"
                    transition={EMIL_SPRING}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  For Pharma &amp; Clinicians
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <AnimatePresence mode="wait">
                {audienceMode === 'patients' ? (
                  <motion.div
                    key="patients-content"
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8, scale: shouldReduceMotion ? 1 : 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: shouldReduceMotion ? 1 : 0.99 }}
                    transition={{ duration: 0.22, ease: EMIL_EASE }}
                    className="space-y-5"
                  >
                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#0066FF] block">
                      Dedicated Care Navigation
                    </span>

                    <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[54px] text-[#0B132B] tracking-[-0.03em] leading-[1.1]">
                      Specialty care is complex.{' '}
                      <br className="hidden sm:inline" />
                      Your journey through it{' '}
                      <span className="font-serif-editorial italic font-normal text-[#0066FF]">
                        shouldn't be.
                      </span>
                    </h1>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-xl">
                      From day one of diagnosis through long-term therapy retention: we provide the dedicated personal care coordinator, zero-hassle copay assistance, and clinical oversight you and your family can depend on every single day.
                    </p>

                    {/* Clean Minimalist Benefit Strip - No Overwhelming Pill Clutter */}
                    <div className="pt-1 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                        <span>Zero out-of-pocket copay support</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                        <span>1-on-1 certified nurse navigator</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                        <span>Doorstep cold-chain medicine delivery</span>
                      </div>
                    </div>

                    {/* CTAs for Patients - Clinical Royal Blue, Active Feedback */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <Link to="/contact">
                        <Button
                          variant="primary"
                          size="md"
                          withArrow
                          className="bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-[0_4px_16px_rgba(0,102,255,0.25)] rounded-full px-6 py-2.5 active:scale-[0.97]"
                        >
                          Enroll in Support Program
                        </Button>
                      </Link>
                      <a
                        href="tel:+919667835909"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white text-slate-800 border border-slate-300 hover:border-[#0066FF] hover:text-[#0066FF] active:scale-[0.97] transition-all shadow-sm"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <PhoneCall className="w-4 h-4 text-slate-600" />
                        <span>Contact Us: +91 9667835909</span>
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="pharma-content"
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8, scale: shouldReduceMotion ? 1 : 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: shouldReduceMotion ? 1 : 0.99 }}
                    transition={{ duration: 0.22, ease: EMIL_EASE }}
                    className="space-y-5"
                  >
                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#0066FF] block">
                      Enterprise PSP Infrastructure
                    </span>

                    <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[54px] text-[#0B132B] tracking-[-0.03em] leading-[1.1]">
                      Where critical therapy meets{' '}
                      <br className="hidden sm:inline" />
                      <span className="font-serif-editorial italic font-normal text-[#0066FF]">
                        unwavering daily care.
                      </span>
                    </h1>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-xl">
                      Deploy turnkey Patient Support Programs that eliminate therapy abandonment. We combine dedicated clinical care coordinators, IoT-verified cold-chain logistics, and automated adherence tracking across 200+ cities.
                    </p>

                    {/* Clean Minimalist Metrics Strip */}
                    <div className="pt-1 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                        <span>94.2% verified therapy compliance</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                        <span>Pan-India 2°C–8°C cold-chain fleet</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                        <span>Audit-ready Pharmacovigilance &amp; AE logs</span>
                      </div>
                    </div>

                    {/* CTAs for Pharma */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <Link to="/contact">
                        <Button
                          variant="primary"
                          size="md"
                          withArrow
                          className="bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-[0_4px_16px_rgba(0,102,255,0.25)] rounded-full px-6 py-2.5 active:scale-[0.97]"
                        >
                          Schedule Program Consultation
                        </Button>
                      </Link>
                      <a href="#psp-delivery-model">
                        <Button
                          variant="secondary"
                          size="md"
                          className="bg-white text-slate-700 border border-slate-300 hover:border-[#0066FF] hover:text-[#0066FF] rounded-full px-6 py-2.5 active:scale-[0.97]"
                        >
                          Explore Delivery Model
                        </Button>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Institutional Trust Footprint */}
              <div className="pt-6 border-t border-slate-200/70 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B132B]">ISO 9001:2015</div>
                    <div className="text-[10px] text-slate-500 font-mono">Quality Certified</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-[#059669]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B132B]">200,000+</div>
                    <div className="text-[10px] text-slate-500 font-mono">Lives Supported</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B132B]">GxP Compliant</div>
                    <div className="text-[10px] text-slate-500 font-mono">Pharmacovigilance</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B132B]">200+ Cities</div>
                    <div className="text-[10px] text-slate-500 font-mono">Doorstep Network</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Showcase Column (Double-Bezel Hardware Enclosure) */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/15 to-emerald-500/10 rounded-[32px] filter blur-2xl -z-10" />

              <AnimatePresence mode="wait">
                {audienceMode === 'patients' ? (
                  <motion.div
                    key="patients-visual"
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
                    transition={{ duration: 0.22, ease: EMIL_EASE }}
                    className="bezel-outer shadow-xl"
                  >
                    <div className="bezel-inner overflow-hidden aspect-[4/3] bg-slate-100 relative group rounded-2xl">
                      <img
                        src={patientCareImg}
                        alt="Patient Support Program Consultation"
                        className="w-full h-full object-cover"
                      />

                      {/* Clean Docked Card - Replaces 3 scattered floating badges */}
                      <div className="absolute inset-x-3 bottom-3 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200/90 shadow-lg text-left">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-[#0B132B] flex items-center gap-1">
                              <Stethoscope className="w-3.5 h-3.5 text-[#0066FF]" />
                              Sister Ananya R., RN
                            </span>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full">
                            Active Now · &lt;3 min
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
                          <span>✓ Copay Approved &lt;48h</span>
                          <span className="text-slate-300">·</span>
                          <span>✓ 2°C–8°C Cold-Chain Secure</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="pharma-visual"
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
                    transition={{ duration: 0.22, ease: EMIL_EASE }}
                    className="bezel-outer shadow-xl text-left"
                  >
                    <div className="bezel-inner rounded-2xl p-5 sm:p-6 bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-sm space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs font-mono font-bold tracking-wider text-slate-700 uppercase">
                            Live Therapy Telemetry
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                          ACTIVE COHORT
                        </span>
                      </div>

                      {/* Care Coordinator Status */}
                      <div className="p-3.5 bg-slate-50/80 hover:bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between gap-3 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] border border-blue-200/60 flex items-center justify-center font-bold text-xs">
                            RN
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">Sister Ananya R., RN</div>
                            <div className="text-[10px] text-slate-500">Care Navigator · Active On-Duty</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono font-bold text-emerald-600">&lt;3 min</div>
                          <div className="text-[10px] text-slate-400">Avg Response</div>
                        </div>
                      </div>

                      {/* IoT Cold Chain Tracker */}
                      <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5 text-[#0066FF]" />
                            Specialty Biologics · Batch #IH-9482
                          </span>
                          <span className="text-[#0066FF] font-mono font-bold text-[10px] bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded">
                            2°C–8°C Cold-Chain · 4.2°C Now
                          </span>
                        </div>
                        <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-gradient-to-r from-[#0066FF] to-emerald-500 h-1.5 rounded-full w-[82%]" />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                          <span>Transit: Pune Cold Hub</span>
                          <span>ETA: Tomorrow 10:30 AM</span>
                        </div>
                      </div>

                      {/* Adherence Ring & Metric */}
                      <div className="flex items-center justify-between bg-blue-50/70 rounded-xl p-3.5 border border-blue-200/70">
                        <div>
                          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                            Therapy Compliance Rate
                          </div>
                          <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0066FF]">
                            94.2%
                          </div>
                          <div className="text-[10px] font-medium text-emerald-700">
                            +46% vs 48% unmanaged drop-off
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-full border-4 border-emerald-400/30 border-t-emerald-500 flex items-center justify-center font-mono font-bold text-xs text-slate-800 bg-white shadow-xs">
                          94%
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Trust Ticker */}
      <section className="py-4 border-b border-slate-200/60 bg-[#F0F6FF]/80 backdrop-blur-md overflow-hidden relative select-none" aria-hidden="true">
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="animate-ticker-marquee flex items-center gap-10 shrink-0 pr-10">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div key={idx} className="flex items-center gap-10">
                <span className="font-serif-editorial italic text-lg sm:text-xl tracking-wide text-[#0B132B]">
                  {item}
                </span>
                <span className="text-[#0066FF] text-xs">✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. What & Why — numbered editorial rows */}
      <section className="py-20 lg:py-28 bg-white/70 backdrop-blur-md border-b border-slate-200/60 text-left relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mb-12"
          >
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#0066FF]">
              THE FOUNDATION
            </span>
          </motion.div>

          <div className="divide-y divide-slate-200/70 border-y border-slate-200/70">
            {pillars.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start group"
              >
                <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start gap-4">
                  <span className="font-display font-extrabold text-6xl sm:text-7xl lg:text-8xl leading-none text-blue-100 group-hover:text-[#0066FF]/25 transition-colors duration-500 select-none">
                    {p.num}
                  </span>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#0066FF]">
                    {p.label}
                  </span>
                </div>
                <div className="lg:col-span-9 space-y-4 group-hover:translate-x-2 transition-transform duration-500">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#0B132B] tracking-tight leading-tight">
                    {p.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-3xl">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Delivery Model — scroll-progress timeline */}
      <section id="psp-delivery-model" className="py-20 lg:py-28 text-left scroll-mt-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="space-y-4"
                >
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#0066FF]">
                    Execution Framework
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#0B132B] tracking-tight leading-[1.1]">
                    Our Patient Support Program{' '}
                    <span className="font-serif-editorial italic font-normal text-[#0066FF]">delivery model.</span>
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans max-w-sm">
                    Five connected stages take a patient from first diagnosis to measurable therapy outcomes — with accountability at every handoff.
                  </p>
                  <a href="#eligibility-benefits" className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#0066FF] hover:gap-3 transition-all">
                    Eligibility &amp; Benefits
                    <ArrowDown className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              </div>
            </div>

            <div className="lg:col-span-8 relative" ref={railRef}>
              <div className="absolute left-[19px] top-3 bottom-3 w-px bg-slate-200" />
              <motion.div
                style={{ scaleY: railProgress }}
                className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-[#0066FF] to-sky-400 origin-top"
              />

              <ol className="space-y-8">
                {timelineSteps.map((step, i) => {
                  const IconComp = step.icon;
                  return (
                    <motion.li
                      key={step.step}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="relative pl-14"
                    >
                      <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center font-mono font-bold text-xs text-[#0066FF] z-10">
                        {step.step}
                      </div>

                      <div className="bezel-outer shadow-md">
                        <div className="bezel-inner p-6 sm:p-8">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] shrink-0">
                              <IconComp className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-full">
                              {step.tag}
                            </span>
                          </div>

                          <h3 className="font-display font-bold text-xl text-[#0B132B]">
                            {step.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mt-2">
                            {step.desc}
                          </p>

                          <div className="mt-5 bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80">
                            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block mb-3">
                              Key Operations:
                            </span>
                            <ul className="space-y-2.5 text-xs text-slate-700 font-sans">
                              {step.deliverables.map((item, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true, margin: "-30px" }}
                                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.08, ease: EASE }}
                                  className="flex items-center gap-2"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                                  <span>{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Eligibility & Benefits */}
      <section id="eligibility-benefits" className="py-20 lg:py-24 bg-white/70 backdrop-blur-md border-y border-slate-200/60 text-left relative scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mb-12 space-y-3"
          >
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#0066FF]">
              ENROLLMENT
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0B132B] tracking-tight">
              Who qualifies, and what they receive.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: EASE }}
              whileHover={{ y: -6, transition: { duration: 0.28 } }}
              className="bezel-outer shadow-md will-change-transform"
            >
              <div className="bezel-inner p-8 space-y-4 h-full">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 inline-block">
                  Who Can Participate
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0B132B]">
                  Eligibility
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  Our Patient Support Programs are designed to be inclusive and accessible. Patients meeting the following criteria are eligible to enroll:
                </p>
                <ul className="space-y-3.5 font-sans text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-100">
                  {[
                    "Patients diagnosed with chronic conditions such as Diabetes, Hypertension, or PCOS.",
                    "Individuals requiring continuous physiological monitoring or home care services.",
                    "Patients prescribed specialty therapies requiring cold-chain or dedicated logistics support."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
              whileHover={{ y: -6, transition: { duration: 0.28 } }}
              className="bezel-outer shadow-md will-change-transform"
            >
              <div className="bezel-inner p-8 space-y-4 h-full">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#059669] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 inline-block">
                  What You Receive
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0B132B]">
                  Benefits
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  Enrolling in our program grants patients access to comprehensive care coordination and direct medical benefits:
                </p>
                <ul className="space-y-3.5 font-sans text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-100">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span><strong>Unlimited consultations:</strong> Free doctor consultations virtually or at clinic locations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span><strong>Home Diagnostics:</strong> Complimentary home blood collection and diagnostics checks.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span><strong>Personal Health Coach:</strong> Dedicated care coordinator to guide your daily health choices.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 6. Statistics — full-bleed dark band */}
      <section className="bg-stats-dark py-20 lg:py-24 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mb-14 space-y-3"
          >
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#7FB5FF]">
              Performance in Numbers
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Proven program <span className="font-serif-editorial italic font-normal text-[#7FB5FF]">impact.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 items-start text-left">
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: idx * 0.1, ease: EASE }}
                  whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                  className="space-y-2 will-change-transform"
                >
                  <div className="flex items-center justify-between">
                    <IconComp className="w-5 h-5 text-[#7FB5FF]" />
                    <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-full">
                      {stat.trend}
                    </span>
                  </div>
                  <div className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none pt-2">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider font-sans">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-20 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <CtaBand />
          </motion.div>
        </div>
      </section>

    </div>
  );
}
