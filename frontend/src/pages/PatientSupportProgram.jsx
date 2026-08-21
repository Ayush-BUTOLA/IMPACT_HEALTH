import { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Dna,
  HeartHandshake,
  ClipboardList,
  Truck,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Users,
  MapPin,
  Activity,
  Building2,
  Sparkles,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import DotGrid from '../components/backgrounds/DotGrid';
import Aurora from '../components/backgrounds/Aurora';

export default function PatientSupportProgram() {
  useEffect(() => {
    document.title = "Patient Support Programs | Impact Health";

    // Smooth scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const timelineSteps = [
    {
      step: "01",
      title: "Disease Identification and Mapping",
      icon: <Dna className="w-5 h-5 text-white" />,
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
      icon: <HeartHandshake className="w-5 h-5 text-white" />,
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
      icon: <ClipboardList className="w-5 h-5 text-white" />,
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
      icon: <Truck className="w-5 h-5 text-white" />,
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
      icon: <BarChart3 className="w-5 h-5 text-white" />,
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
    {
      value: "50,000+",
      label: "Patients Supported",
      icon: <Users className="w-5 h-5 text-surface-tint" />,
      trend: "+12% MoM",
      sparkline: (
        <svg className="w-full h-8" viewBox="0 0 100 30" fill="none">
          <path d="M0 25c10-2 20-15 30-10s20-8 30-12 20 5 40-3" stroke="var(--color-surface-tint)" strokeWidth="2" strokeLinecap="round" />
          <path d="M0 25c10-2 20-15 30-10s20-8 30-12 20 5 40-3v30H0z" fill="url(#grad1)" fillOpacity="0.1" />
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-surface-tint)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      value: "200+",
      label: "Cities Covered",
      icon: <MapPin className="w-5 h-5 text-[#e16957]" />,
      trend: "Nationwide",
      sparkline: (
        <svg className="w-full h-8" viewBox="0 0 100 30" fill="none">
          <path d="M0 28c15-4 30-2 45-12s25-5 55-10" stroke="#e16957" strokeWidth="2" strokeLinecap="round" />
          <path d="M0 28c15-4 30-2 45-12s25-5 55-10v30H0z" fill="url(#grad2)" fillOpacity="0.1" />
          <defs>
            <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e16957" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      value: "94%",
      label: "Program Compliance",
      icon: <Activity className="w-5 h-5 text-[#107C10]" />,
      trend: "Industry Lead",
      sparkline: (
        <svg className="w-full h-8" viewBox="0 0 100 30" fill="none">
          <path d="M0 20c10-5 20 5 30-5s20-10 30 2 20-12 40-2" stroke="#107C10" strokeWidth="2" strokeLinecap="round" />
          <path d="M0 20c10-5 20 5 30-5s20-10 30 2 20-12 40-2v30H0z" fill="url(#grad3)" fillOpacity="0.1" />
          <defs>
            <linearGradient id="grad3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#107C10" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      value: "150+",
      label: "Partner Clinics",
      icon: <Building2 className="w-5 h-5 text-primary" />,
      trend: "Active Network",
      sparkline: (
        <svg className="w-full h-8" viewBox="0 0 100 30" fill="none">
          <path d="M0 15c20 8 40-10 60 5s20-15 40 2" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
          <path d="M0 15c20 8 40-10 60 5s20-15 40 2v30H0z" fill="url(#grad4)" fillOpacity="0.1" />
          <defs>
            <linearGradient id="grad4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      )
    }
  ];

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const scrollToTimeline = (e) => {
    e.preventDefault();
    const el = document.getElementById("psp-delivery-model");
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <div id="psp-page" className="w-full bg-white relative overflow-hidden">

      {/* ═══════════════════════════════════════════
          SAAS HERO HEADER (TWO-COLUMN)
       ═══════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-b from-[#ECECFE]/50 via-[#ECECFE]/20 to-white py-24 lg:py-36 border-b border-[#DDE0F5]/50 overflow-hidden">
        {/* Interactive DotGrid background */}
        <DotGrid
          dotColor="rgba(91, 91, 214, 0.10)"
          dotActiveColor="rgba(91, 91, 214, 0.45)"
          dotSize={1.2}
          gap={24}
          mouseRadius={150}
        />

        {/* Ambient blur blobs */}
        <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-primary-container/5 rounded-full filter blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-surface-tint/5 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Typography & CTAs */}
            <motion.div
              className="lg:col-span-7 space-y-8 text-left"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div
                variants={fadeUpVariants}
                className="inline-flex items-center gap-2 bg-[#107C10]/10 border border-[#107C10]/20 text-[#107C10] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-surface-tint animate-pulse" />
                <span>Trusted Pharmaceutical PSP Partner</span>
              </motion.div>

              <motion.h1
                variants={fadeUpVariants}
                className="text-4xl md:text-5xl lg:text-[3.50rem] font-display font-bold text-primary tracking-tight leading-[1.15] max-w-2xl"
              >
                Helping Pharmaceutical Companies Support Patients Throughout Treatment
              </motion.h1>

              <motion.p
                variants={fadeUpVariants}
                className="text-body-lg text-text-secondary leading-relaxed max-w-2xl font-sans"
              >
                Impact Health provides the clinical, technological, and operational infrastructure for pharmaceutical companies to deploy and scale support programs. From therapy onboarding to specialty logistics and active adherence monitoring, we coordinate care to ensure patient success.
              </motion.p>

              <motion.div
                variants={fadeUpVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <a
                  href="https://www.threephih.in/threephih/index.html"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary text-white font-sans font-semibold text-sm px-8 py-4 rounded-lg shadow-ambient hover:opacity-95 transition-opacity text-center"
                >
                  Schedule Consultation
                </a>
                <a
                  href="#psp-delivery-model"
                  onClick={scrollToTimeline}
                  className="bg-white border border-[#DDE0F5] text-primary hover:bg-[#ECECFE]/30 font-sans font-semibold text-sm px-8 py-4 rounded-lg shadow-sm transition-colors text-center"
                >
                  Explore Delivery Model
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column: Healthcare Journey & Care Ecosystem Workflow */}
            <motion.div
              className="lg:col-span-5 relative flex justify-center"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="relative w-full max-w-[480px] bg-white rounded-3xl p-6 shadow-ambient border border-[#DDE0F5]/50 overflow-hidden">
                <svg className="w-full h-auto" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Subtle Grid backdrop */}
                  <defs>
                    <pattern id="card-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DDE0F5" strokeWidth="0.5" opacity="0.3" />
                    </pattern>
                    <filter id="hub-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  <rect width="500" height="400" fill="url(#card-grid)" />

                  {/* Connecting Paths (Spokes) */}
                  <g stroke="#DDE0F5" strokeWidth="2" strokeDasharray="4 4" className="opacity-80">
                    <line x1="250" y1="200" x2="110" y2="105" />
                    <line x1="250" y1="200" x2="390" y2="105" />
                    <line x1="250" y1="200" x2="110" y2="295" />
                    <line x1="250" y1="200" x2="390" y2="295" />
                  </g>

                  {/* Active pulsing dots on pathways */}
                  <circle cx="180" cy="152" r="4" fill="#4e51c0" />
                  <circle cx="180" cy="152" r="8" fill="#4e51c0" fillOpacity="0.3" className="animate-pulse" />

                  <circle cx="320" cy="152" r="4" fill="#e16957" />
                  <circle cx="320" cy="152" r="8" fill="#e16957" fillOpacity="0.3" className="animate-pulse" />

                  <circle cx="180" cy="248" r="4" fill="#107C10" />
                  <circle cx="180" cy="248" r="8" fill="#107C10" fillOpacity="0.3" className="animate-pulse" />

                  <circle cx="320" cy="248" r="4" fill="#4e51c0" />
                  <circle cx="320" cy="248" r="8" fill="#4e51c0" fillOpacity="0.3" className="animate-pulse" />

                  {/* Center Patient Hub */}
                  <circle cx="250" cy="200" r="50" fill="#ECECFE" fillOpacity="0.6" stroke="#4e51c0" strokeWidth="1.5" />
                  <circle cx="250" cy="200" r="40" fill="white" stroke="#030050" strokeWidth="2" filter="url(#hub-glow)" />
                  <g transform="translate(240, 185)">
                    {/* Heart shape */}
                    <path d="M10 18.35l-1.45-1.32C3.4 12.36 0 9.28 0 5.5 0 2.42 2.42 0 5.5 0 7.24 0 8.91.81 10 2.09 11.09.81 12.76 0 14.5 0 17.58 0 20 2.42 20 5.5c0 3.78-3.4 6.86-8.55 11.54L10 18.35z" fill="#4e51c0" />
                  </g>
                  <text x="250" y="222" textAnchor="middle" fill="#030050" className="text-[8px] font-sans font-bold tracking-widest uppercase">PATIENT</text>

                  {/* Corner Cards */}

                  {/* Node 1: Intake & Consent */}
                  <g>
                    <rect x="25" y="45" width="130" height="60" rx="10" fill="white" stroke="#DDE0F5" strokeWidth="1.5" />
                    <circle cx="50" cy="75" r="16" fill="#ECECFE" />
                    {/* Clipboard icon */}
                    <rect x="43" y="67" width="14" height="17" rx="2" stroke="#030050" strokeWidth="1.5" fill="none" />
                    <path d="M47 65h6v2h-6z" fill="#030050" />
                    <line x1="47" y1="71" x2="53" y2="71" stroke="#030050" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="47" y1="75" x2="53" y2="75" stroke="#030050" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="47" y1="79" x2="51" y2="79" stroke="#030050" strokeWidth="1.5" strokeLinecap="round" />
                    <text x="75" y="68" fill="#030050" className="text-[10px] font-sans font-bold">1. Onboarding</text>
                    <text x="75" y="80" fill="#5c5d6c" className="text-[8px] font-sans">Consent Setup</text>
                  </g>

                  {/* Node 2: Care Team */}
                  <g>
                    <rect x="345" y="45" width="130" height="60" rx="10" fill="white" stroke="#DDE0F5" strokeWidth="1.5" />
                    <circle cx="370" cy="75" r="16" fill="#ECECFE" />
                    {/* Care team / user icon */}
                    <path d="M362 78c0-2 1.5-3.5 3.5-3.5h9c2 0 3.5 1.5 3.5 3.5v3h-16v-3z" stroke="#4e51c0" strokeWidth="1.5" fill="none" />
                    <circle cx="370" cy="68" r="3" stroke="#4e51c0" strokeWidth="1.5" fill="none" />
                    <text x="395" y="68" fill="#030050" className="text-[10px] font-sans font-bold">2. Care Team</text>
                    <text x="395" y="80" fill="#5c5d6c" className="text-[8px] font-sans">Family Doctors</text>
                  </g>

                  {/* Node 3: Logistics */}
                  <g>
                    <rect x="25" y="295" width="130" height="60" rx="10" fill="white" stroke="#DDE0F5" strokeWidth="1.5" />
                    <circle cx="50" cy="325" r="16" fill="#F8F9FF" />
                    {/* Delivery truck icon */}
                    <rect x="38" y="318" width="15" height="9" rx="1" stroke="#e16957" strokeWidth="1.5" fill="none" />
                    <path d="M53 321h5l3 3v4h-8v-7z" stroke="#e16957" strokeWidth="1.5" fill="none" />
                    <circle cx="43" cy="331" r="2" fill="#e16957" />
                    <circle cx="52" cy="331" r="2" fill="#e16957" />
                    <text x="75" y="318" fill="#030050" className="text-[10px] font-sans font-bold">3. Distribution</text>
                    <text x="75" y="330" fill="#5c5d6c" className="text-[8px] font-sans">Cold-Chain Delivery</text>
                  </g>

                  {/* Node 4: Adherence */}
                  <g>
                    <rect x="345" y="295" width="130" height="60" rx="10" fill="white" stroke="#DDE0F5" strokeWidth="1.5" />
                    <circle cx="370" cy="325" r="16" fill="#107C10" fillOpacity="0.1" />
                    {/* Heartbeat pulse line */}
                    <path d="M358 325h5l3-6 3 12 3-8 2 2h4" stroke="#107C10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <text x="395" y="318" fill="#030050" className="text-[10px] font-sans font-bold">4. Compliance</text>
                    <text x="395" y="330" fill="#107C10" className="text-[8px] font-sans font-semibold">98.4% Adherence</text>
                  </g>
                </svg>

                {/* Floating soft tags */}
                <div className="absolute top-6 left-6 bg-[#107C10] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  Adherence Secured
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHAT IS PSP SECTION
       ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

            {/* Left Column: Text */}
            <motion.div
              className="lg:col-span-6 text-left space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-3">
                <span className="text-surface-tint text-xs font-bold uppercase tracking-widest font-sans block">Patient Education</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-primary tracking-tight">
                  What is a Patient Support Program?
                </h2>
                <div className="w-16 h-1 bg-surface-tint rounded-full mt-3"></div>
              </div>
              <p className="text-body-md text-text-secondary leading-relaxed font-sans">
                A Patient Support Program (PSP) is a privately operated service designed to assist patients who have been prescribed specific pharmaceutical therapies. These programs provide dedicated support structures to help patients manage their treatment, understand their health conditions, and coordinate clinical care for better medical outcomes and compliance.
              </p>
            </motion.div>

            {/* Right Column: Custom SVG Journey Illustration */}
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative bg-gradient-to-br from-[#F8F9FF] to-[#ECECFE]/30 rounded-3xl p-8 border border-[#DDE0F5]/50 shadow-ambient flex items-center justify-center">
                <svg className="w-full h-auto max-w-[440px]" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 0v400M150 0v400M250 0v400M350 0v400M450 0v400M0 100h500M0 200h500M0 300h500" stroke="#030050" strokeOpacity="0.02" strokeWidth="1.5" />

                  {/* Central Dashboard Panel */}
                  <rect x="80" y="80" width="340" height="240" rx="16" fill="white" stroke="#DDE0F5" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(3,0,80,0.02))" />
                  <rect x="80" y="80" width="340" height="40" rx="16" fill="#F8F9FF" />
                  <line x1="80" y1="120" x2="420" y2="120" stroke="#DDE0F5" strokeWidth="1.5" />

                  {/* Top Panel Actions */}
                  <circle cx="110" cy="100" r="5" fill="#e16957" />
                  <circle cx="125" cy="100" r="5" fill="#4e51c0" />
                  <circle cx="140" cy="100" r="5" fill="#ECECFE" />

                  {/* Visual Layout representing Patient care */}
                  <rect x="110" y="145" width="130" height="70" rx="8" fill="#ECECFE" fillOpacity="0.4" stroke="#DDE0F5" />
                  <rect x="260" y="145" width="130" height="70" rx="8" fill="#ECECFE" fillOpacity="0.4" stroke="#DDE0F5" />

                  {/* Chart Curves inside */}
                  <path d="M125 195c10-15 20-5 30-20s20-25 35-15 25-10 30-20" stroke="#4e51c0" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M275 180c10-5 20-15 30-10s20 10 35-15 25 15 30-10" stroke="#e16957" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Central Communication Line */}
                  <circle cx="160" cy="265" r="22" fill="#030050" fillOpacity="0.05" />
                  <circle cx="160" cy="265" r="14" fill="#030050" />
                  <path d="M152 268a8 8 0 0116 0h-16z" fill="white" />
                  <circle cx="160" cy="260" r="4" fill="white" />

                  <line x1="185" y1="265" x2="315" y2="265" stroke="#4e51c0" strokeWidth="2" strokeDasharray="4 4" />

                  <circle cx="340" cy="265" r="22" fill="#4e51c0" fillOpacity="0.08" />
                  <circle cx="340" cy="265" r="14" fill="#4e51c0" />
                  <path d="M332 272c2-6 10-6 12 0h-12z" fill="white" />
                  <circle cx="346" cy="261" r="3.5" fill="white" />
                  <circle cx="334" cy="261" r="3.5" fill="white" />

                  {/* Heartbeat pulse widget */}
                  <rect x="210" y="225" width="80" height="28" rx="14" fill="#e16957" filter="drop-shadow(0 4px 10px rgba(225,105,87,0.25))" />
                  <path d="M225 239h10l5-8 5 16 5-11 5 3h10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY PHARMACEUTICALS NEED PSP SECTION
       ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white border-t border-[#DDE0F5]/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

            {/* Left Column: Custom SVG Analytics Illustration */}
            <motion.div
              className="lg:col-span-6 order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative bg-gradient-to-br from-[#F8F9FF] to-[#ECECFE]/30 rounded-3xl p-8 border border-[#DDE0F5]/50 shadow-ambient flex items-center justify-center">
                <svg className="w-full h-auto max-w-[440px]" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 0v400M150 0v400M250 0v400M350 0v400M450 0v400M0 100h500M0 200h500M0 300h500" stroke="#030050" strokeOpacity="0.02" strokeWidth="1.5" />

                  {/* Tablet Interface representing diagnostics */}
                  <rect x="90" y="70" width="320" height="260" rx="20" fill="white" stroke="#DDE0F5" strokeWidth="2" filter="drop-shadow(0 15px 30px rgba(3,0,80,0.03))" />
                  <rect x="100" y="80" width="300" height="240" rx="16" fill="#F8F9FF" />

                  {/* DNA Diagnostic Curve */}
                  <g opacity="0.8">
                    <path d="M170 120c15 15 30-15 45 0s30 15 45 0" stroke="#4e51c0" strokeWidth="3" strokeLinecap="round" />
                    <path d="M170 120c15-15 30 15 45 0s30-15 45 0" stroke="#e16957" strokeWidth="3" strokeLinecap="round" />
                    <line x1="180" y1="114" x2="180" y2="126" stroke="#030050" strokeWidth="2" />
                    <line x1="195" y1="128" x2="195" y2="112" stroke="#030050" strokeWidth="2" />
                    <line x1="210" y1="128" x2="210" y2="112" stroke="#030050" strokeWidth="2" />
                    <line x1="225" y1="114" x2="225" y2="126" stroke="#030050" strokeWidth="2" />
                    <line x1="240" y1="114" x2="240" y2="126" stroke="#030050" strokeWidth="2" />
                  </g>

                  {/* Tablet Metrics Widget */}
                  <rect x="130" y="180" width="240" height="110" rx="12" fill="white" stroke="#DDE0F5" strokeWidth="1.5" filter="drop-shadow(0 4px 12px rgba(3,0,80,0.02))" />

                  <rect x="160" y="205" width="180" height="10" rx="5" fill="#ECECFE" />
                  <rect x="160" y="205" width="130" height="10" rx="5" fill="#4e51c0" />

                  <rect x="160" y="225" width="180" height="10" rx="5" fill="#ECECFE" />
                  <rect x="160" y="225" width="90" height="10" rx="5" fill="#e16957" />

                  <rect x="160" y="245" width="180" height="10" rx="5" fill="#ECECFE" />
                  <rect x="160" y="245" width="160" height="10" rx="5" fill="#030050" />

                  {/* Verified Check Badge */}
                  <circle cx="360" cy="190" r="16" fill="#107C10" filter="drop-shadow(0 4px 10px rgba(16,124,16,0.25))" />
                  <path d="M353 190l5 5 10-10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>

            {/* Right Column: Text */}
            <motion.div
              className="lg:col-span-6 text-left space-y-6 order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-3">
                <span className="text-surface-tint text-xs font-bold uppercase tracking-widest font-sans block">Compliance &amp; Insights</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-primary tracking-tight">
                  Why do Pharmaceuticals need Patient Support Programs?
                </h2>
                <div className="w-16 h-1 bg-surface-tint rounded-full mt-3"></div>
              </div>
              <p className="text-body-md text-text-secondary leading-relaxed font-sans">
                Pharmaceutical companies require Patient Support Programs to assist patients navigating complex specialty drugs, modern medical devices, and intricate treatment regimens. By offering direct patient consultation, compliance tracking, and adherence support, these programs co-create personalized care journeys that optimize treatment results and improve long-term retention.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONNECTED TIMELINE
       ═══════════════════════════════════════════ */}
      <section id="psp-delivery-model" className="py-24 lg:py-32 bg-[#F8F9FF] border-t border-[#DDE0F5] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="mb-20 space-y-3 max-w-2xl mx-auto">
            <span className="text-surface-tint text-xs font-bold uppercase tracking-widest font-sans block">Execution framework</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary tracking-tight">
              Our Patient Support Program Delivery Model
            </h2>
            <div className="w-20 h-1 bg-surface-tint rounded-full mx-auto mt-4"></div>
          </div>

          {/* Timeline Wrapper */}
          <div className="relative max-w-4xl mx-auto">
            {/* Connecting Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-[#4e51c0] to-[#e16957] -translate-x-1/2 hidden md:block"></div>
            <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-[#4e51c0] to-[#e16957] md:hidden"></div>

            <motion.div
              className="space-y-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {timelineSteps.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={idx}
                    variants={fadeUpVariants}
                    className="relative flex flex-col md:flex-row items-stretch group"
                  >

                    {/* Circle Indicator (desktop center, mobile left) */}
                    <div className="absolute left-8 md:left-1/2 w-12 h-12 rounded-full bg-primary border-4 border-white flex items-center justify-center -translate-x-1/2 z-10 shadow-md transition-all duration-300 group-hover:bg-surface-tint group-hover:scale-110">
                      {step.icon}
                    </div>

                    {/* Step number indicator */}
                    <div className={`absolute top-2.5 font-mono font-black text-[#7e82f4]/15 text-[5rem] leading-none select-none pointer-events-none transition-colors duration-300 group-hover:text-surface-tint/10 ${isEven ? 'left-16 md:left-[calc(50%+2.5rem)]' : 'left-16 md:right-[calc(50%+2.5rem)] md:left-auto'
                      }`}>
                      {step.step}
                    </div>

                    {/* Content card (desktop staggered left/right, mobile right-aligned) */}
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 text-left ${isEven ? 'md:pr-16' : 'md:pl-16 md:ml-auto'
                      }`}>
                      <div className="bg-white p-8 rounded-2xl border border-[#DDE0F5]/70 shadow-ambient shadow-ambient-hover relative z-10 text-left transition-all duration-300 group-hover:border-surface-tint/20">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-surface-tint bg-[#ECECFE] px-2.5 py-1 rounded-full font-sans">
                            {step.tag}
                          </span>
                        </div>
                        <h3 className="text-xl font-display font-bold text-primary mb-3 group-hover:text-surface-tint transition-colors duration-200">
                          {step.title}
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed font-sans mb-6">
                          {step.desc}
                        </p>

                        {/* Key Operations Deliverables Checklist */}
                        <div className="border-t border-[#DDE0F5]/50 pt-4">
                          <p className="text-xs font-bold text-primary uppercase tracking-wider font-sans mb-3">Key Operations:</p>
                          <ul className="space-y-2.5 text-xs text-text-secondary font-sans">
                            {step.deliverables.map((item, keyIdx) => (
                              <li key={keyIdx} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#107C10] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ELIGIBILITY & BENEFITS SECTION
       ═══════════════════════════════════════════ */}
      <section id="eligibility-benefits" className="py-24 lg:py-32 bg-[#F8F9FF] border-t border-[#DDE0F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 text-left">
          
          {/* Eligibility Column */}
          <div className="space-y-8">
            <div>
              <span className="text-surface-tint text-xs font-bold uppercase tracking-widest font-sans mb-3 block">Who Can Participate</span>
              <h2 className="text-3xl font-display font-bold text-primary">Eligibility</h2>
              <div className="w-12 h-1 bg-surface-tint rounded-full mt-4"></div>
            </div>
            
            <p className="text-body-md text-text-secondary leading-relaxed font-sans">
              Our Patient Support Programs are designed to be inclusive and accessible. Patients meeting the following criteria are eligible to enroll:
            </p>

            <ul className="space-y-4 font-sans text-text-secondary">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Patients diagnosed with chronic conditions such as Diabetes, Hypertension, or PCOS.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Individuals requiring continuous physiological monitoring or home care services.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Patients prescribed specialty therapies requiring cold-chain or dedicated logistics support.</span>
              </li>
            </ul>
          </div>

          {/* Benefits Column */}
          <div className="space-y-8">
            <div>
              <span className="text-surface-tint text-xs font-bold uppercase tracking-widest font-sans mb-3 block">What You Receive</span>
              <h2 className="text-3xl font-display font-bold text-primary">Benefits</h2>
              <div className="w-12 h-1 bg-surface-tint rounded-full mt-4"></div>
            </div>

            <p className="text-body-md text-text-secondary leading-relaxed font-sans">
              Enrolling in our program grants patients access to comprehensive care coordination and direct medical benefits:
            </p>

            <ul className="space-y-4 font-sans text-text-secondary">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>**Unlimited consultations:** Free doctor consultations virtually or at clinic locations.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>**Home Diagnostics:** Complimentary home blood collection and diagnostics checks.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>**Personal Health Coach:** Dedicated care coordinator to guide your daily health choices.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATISTICS SECTION
       ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white border-t border-[#DDE0F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="mb-20 space-y-3">
            <span className="text-surface-tint text-xs font-bold uppercase tracking-widest font-sans block">Performance in Numbers</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary tracking-tight">Proven Program Impact</h2>
            <div className="w-16 h-1 bg-surface-tint rounded-full mx-auto mt-4"></div>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpVariants}
                className="bg-white p-8 rounded-2xl border border-[#DDE0F5] shadow-ambient shadow-ambient-hover flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <span className="text-[10px] font-bold text-[#107C10] bg-[#107C10]/10 px-2 py-0.5 rounded-full font-sans">
                      {stat.trend}
                    </span>
                  </div>

                  <div className="text-4xl md:text-[2.75rem] font-display font-extrabold text-primary mb-2 tracking-tight group-hover:text-surface-tint transition-colors">
                    {stat.value}
                  </div>
                  <h4 className="text-sm font-bold text-text-secondary uppercase tracking-wider font-sans mb-6">
                    {stat.label}
                  </h4>
                </div>

                <div className="w-full pt-4 border-t border-[#DDE0F5]/50 mt-auto">
                  {stat.sparkline}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PREMIUM CTA
       ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#F8F9FF] border-t border-[#DDE0F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="bg-gradient-to-br from-[#030050] to-[#0d0489] rounded-[2.5rem] p-10 md:p-16 lg:p-24 relative overflow-hidden shadow-2xl text-center space-y-8"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Aurora background overlay */}
            <Aurora
              colorStops={['#030050', '#0d0489', '#7e82f4']}
              amplitude={0.8}
              speed={0.4}
              blend={0.3}
              style={{ opacity: 0.15 }}
            />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.04] rounded-full -mr-40 -mt-40 filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ECECFE]/[0.05] rounded-full -ml-40 -mb-40 filter blur-3xl"></div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="text-[#ECECFE]/80 text-xs font-bold uppercase tracking-widest font-sans block">Get in Touch</span>
              <h2 className="text-3xl md:text-4xl lg:text-[3.25rem] font-display font-bold text-white tracking-tight leading-tight">
                Ready to Launch Your Patient Support Program?
              </h2>
              <p className="text-indigo-200/80 text-body-md leading-relaxed font-sans max-w-xl mx-auto">
                Discover how our specialized technological and operational infrastructure can improve compliance and therapy retention for your patients.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href="https://www.threephih.in/threephih/index.html"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-primary font-sans font-bold text-sm px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-center min-w-[200px]"
                >
                  Schedule Consultation
                </a>
                <a
                  href="#contact"
                  className="bg-white/10 text-white border border-white/20 font-sans font-semibold text-sm px-8 py-4 rounded-xl hover:bg-white/25 transition-colors text-center min-w-[200px]"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
