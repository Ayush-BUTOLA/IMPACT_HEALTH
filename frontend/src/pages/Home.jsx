import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  ArrowRight,
  HeartPulse,
  Clock,
  ShieldCheck,
  Stethoscope,
  Star,
  Activity,
  CheckCircle2,
  Users,
  Video,
  Droplet,
  IndianRupee
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import LogoLoop from '../components/LogoLoop';
import HeroSlideshow from '../components/HeroSlideshow';
import Button from '../components/Button';
import PageBackground from '../components/PageBackground';
import PatientOutcomesMarquee from '../components/PatientOutcomesMarquee';
import TeamImageAccordionSection from '../components/TeamImageAccordionSection';
import ParallaxAtmosphere from '../components/ParallaxAtmosphere';
import HowItWorksSection from '../components/HowItWorksSection';

import carouselDoctor from '../assets/carousel_doctor_stethoscope.jpg';
import carouselBloodTest from '../assets/carousel_blood_test_home.jpg';
import medicineDelivery from '../assets/medicine_delivery_guy.jpg';

const services = [
  {
    category: "Consultations",
    title: "Inclinic & Virtual Doctor Consultations",
    desc: "Get unlimited doctor consultations both virtually over call and at clinic/hospital locations across 200+ network centers.",
    image: carouselDoctor,
    alt: "Inclinic & Virtual Doctor Consultations"
  },
  {
    category: "Diagnostics Test",
    title: "Blood Tests at home & Radiology tests at our 200+ network centres",
    desc: "Avail free blood sample collection at home along with X-Rays, Scans and diagnostic tests at partnered labs and hospitals.",
    image: carouselBloodTest,
    alt: "Blood Tests at home & Radiology tests at our 200+ network centres"
  },
  {
    category: "Home Delivery",
    title: "Medicines delivered at home",
    desc: "Get genuine prescribed medicines delivered directly to your doorstep with priority care and adherence support.",
    image: medicineDelivery,
    alt: "Medicines delivered at home"
  }
];

const teamMembers = [
  {
    name: "Anshuman Sahoo",
    role: "CEO & Co-Founder",
    desc: "Bachelor's from Christ University. Product & Corporate Strategist. CSP India 2021.",
    image: "/team/anshuman_sahoo.jpg",
    isFounder: true
  },
  {
    name: "Ashish Rawat",
    role: "CIO & Co-Founder",
    desc: "Data Scientist & SAS Consultant. B.Tech from GGSIPU. Ex-HSBC, EXL, AON & AMEX.",
    image: "/team/ashish_rawat.jpg",
    isFounder: true
  },
  {
    name: "Dr. Gunjan D. Khare",
    role: "Medical Officer & Clinical Lead",
    desc: "Medical Officer heading clinical operations, quality assurance, and patient care protocols.",
    image: "/team/dr_gunjan_khare.jpg",
    isFounder: false
  }
];

const advisors = [
  {
    name: "Dr. Romil Lotta",
    role: "Clinical Advisor",
    desc: "MBBS from Mayo. PMO at Ministry of Housing & Urban Affairs, Govt. of India.",
    image: "/team/dr_romil_lotta.jpg"
  },
  {
    name: "Dr. Lalasa Palli",
    role: "Pediatric Specialist",
    desc: "MD Pediatrics. Expert in child healthcare, growth monitoring, and preventive wellness.",
    image: "/team/dr_lalasa_palli.jpg"
  }
];

const clients = [
  { name: "Zomato", alt: "Zomato", url: "/logos/zomato.svg" },
  { name: "Blinkit", alt: "Blinkit", url: "/logos/blinkit.svg" },
  { name: "Plum Health", alt: "Plum Health Insurance", url: "/logos/plum.svg" },
  { name: "Eisai", alt: "Eisai Pharmaceuticals", url: "/logos/eisai.svg" },
  { name: "Ayu Health", alt: "Ayu Health Hospitals", url: "/logos/ayu_health.svg" },
  { name: "Ryan International", alt: "Ryan International Group of Institutions", url: "/logos/ryan_international.png" },
  { name: "IRIS Florets", alt: "IRIS Florets World School", url: "/logos/iris_florets.svg" },
  { name: "Meluha International", alt: "Meluha International School", url: "/logos/meluha_international.svg" },
  { name: "Ravees International", alt: "Ravees International School", url: "/logos/ravees_school.svg" },
  { name: "Bistro", alt: "Bistro Hospitality", url: "/logos/bistro.svg" }
];

const clientLogos = clients.map(c => ({
  src: c.url,
  alt: c.alt || c.name,
  title: c.name
}));

const testimonials = [
  {
    quote: "Impact Health's patient support program has been a lifesaver. The free virtual doctor consultations and home blood tests saved me time and money.",
    author: "Rakesh Sharma",
    location: "Bhubaneswar",
    rating: 5
  },
  {
    quote: "Dedicated medical team and family doctors who actually care. Highly recommend their chronic disease management for Diabetes.",
    author: "Priya Patel",
    location: "Mumbai",
    rating: 5
  }
];

const faqs = [
  {
    question: "What is included in the Patient Support Program?",
    answer: "The program includes unlimited doctor consultations (both virtual and at 200+ partner clinics), certified at-home blood test collections, dedicated care manager support, and doorstep medicine delivery."
  },
  {
    question: "How much does the program cost and are there hidden fees?",
    answer: "Our patient support programs start at an affordable rate of just INR 199 per month with zero hidden fees. All virtual consultations and routine preventive care benefits are covered under your plan."
  },
  {
    question: "How do I book a doctor consultation or home blood test?",
    answer: "You can book directly through our portal or reach our dedicated care coordination desk via phone at +91 9667835909 or email at connect@impacthealth.co.in."
  },
  {
    question: "In which cities are your healthcare services available?",
    answer: "Impact Health operates across 200+ cities throughout Pan-India, including Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Bhubaneswar, and Tier-2/Tier-3 regional hubs."
  },
  {
    question: "Can I customize the healthcare plans for my family or corporate team?",
    answer: "Yes! We provide tailored healthcare subscriptions for individuals, entire families, school campus wellness programs, and corporate employee health benefits with flexible coverage tiers."
  },
  {
    question: "What is your cancellation and refund policy?",
    answer: "We offer flexible, no-lock-in monthly and annual plans. You can pause or cancel your subscription at any time with a single click or by reaching out to our support team."
  }
];

function ParallaxStadiumRow({ service, index, isReversed, numStr }) {
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"]
  });
  const springScroll = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const yImage = useTransform(springScroll, [0, 1], [-26, 26]);
  const yText = useTransform(springScroll, [0, 1], [14, -14]);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="py-7 sm:py-8 lg:py-10 group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
        {/* Text Block */}
        <motion.div
          style={{ y: yText }}
          className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : ''}`}
        >
          <div className="flex items-start gap-4 sm:gap-6">
            {!isReversed && (
              <span className="font-display text-4xl sm:text-5xl font-black text-[#003087] leading-none select-none shrink-0">
                {numStr}
              </span>
            )}
            <div className="space-y-1 w-full">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-extrabold text-[#008C7A] tracking-wider uppercase block">
                  {service.category}
                </span>
                {isReversed && (
                  <span className="font-display text-4xl sm:text-5xl font-black text-[#003087] leading-none select-none">
                    {numStr}
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl lg:text-[23px] font-display font-extrabold text-[#0B132B] leading-snug tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-md pt-0.5">
                {service.desc}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Stadium/Oval Image with Parallax */}
        <motion.div
          style={{ y: yImage }}
          className={`lg:col-span-5 flex justify-center ${isReversed ? 'lg:justify-start lg:order-1' : 'lg:justify-end'}`}
        >
          <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[16/9] rounded-[9999px] overflow-hidden shadow-md border border-slate-200 bg-slate-100 will-change-transform">
            <img
              src={service.image}
              alt={service.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── STAGGERED WORD REVEAL (staggered-word-reveal skill) ──────────────────────
const wordRevealContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } }
};
const wordRevealItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

function WordReveal({ text, className }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      variants={wordRevealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordRevealItem}
          aria-hidden="true"
          style={{ display: 'inline-block', marginRight: i < words.length - 1 ? '0.28em' : 0 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // Parallax hook for Stats section
  const statsSectionRef = useRef(null);
  const { scrollYProgress: statsScroll } = useScroll({
    target: statsSectionRef,
    offset: ["start end", "end start"]
  });
  const springStats = useSpring(statsScroll, { stiffness: 80, damping: 25 });
  const yNetworkBg = useTransform(springStats, [0, 1], ["-12%", "12%"]);
  const scaleNetworkBg = useTransform(springStats, [0, 1], [1.12, 1.02]);
  const yLeftQuote = useTransform(springStats, [0, 1], ["-20px", "20px"]);

  // Parallax hook for Contact CTA section
  const contactSectionRef = useRef(null);
  const { scrollYProgress: contactScroll } = useScroll({
    target: contactSectionRef,
    offset: ["start end", "end start"]
  });
  const springContact = useSpring(contactScroll, { stiffness: 80, damping: 25 });
  const yGlowNavy = useTransform(springContact, [0, 1], ["-60px", "60px"]);
  const yGlowTeal = useTransform(springContact, [0, 1], ["60px", "-60px"]);

  const solutionTabs = [
    {
      icon: HeartPulse,
      label: 'One-Stop Care',
      accentColor: '#008C7A',
      accentBg: '#E6F5F3',
      title: 'One-Stop Solution',
      description: 'Manage chronic diseases such as Diabetes, PCOS etc. better with our dedicated patient support programs focused on quality and affordable care at home.',
      stat: '200+ Cities',
      statLabel: 'Pan India Network',
    },
    {
      icon: IndianRupee,
      label: 'Reduce Expenses',
      accentColor: '#003087',
      accentBg: '#EBF2FF',
      title: 'Reduce Out-of-pocket Expenses',
      description: 'Comprehensive medical services including health insurance and unlimited consultations starting at just INR 199/- per month.',
      stat: '₹199/mo',
      statLabel: 'Starting Price',
    },
    {
      icon: Clock,
      label: 'Dedicated Care',
      accentColor: '#008C7A',
      accentBg: '#E6F5F3',
      title: 'Dedicated Care Support',
      description: 'A team of dedicated doctors and care managers for each family member for seamless access throughout the year.',
      stat: 'Year-Round',
      statLabel: 'Care Support',
    },
    {
      icon: Stethoscope,
      label: 'Book a Doctor',
      accentColor: '#CC2229',
      accentBg: '#FFF0F0',
      title: 'Speak to a Doctor',
      description: 'Get unhindered access to qualified doctors instantly. No waiting, no queues — just expert medical guidance when you need it most.',
      stat: 'Book Now →',
      statLabel: 'Instant Consultation',
      cta: true,
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div id="home" className="w-full overflow-hidden font-sans text-[#1A1A2E] relative">
      <Helmet>
        <title>Doctor Consultations, Home Blood Tests &amp; Health Plans from ₹199/mo | Impact Health</title>
        <meta name="description" content="Book doctor consultations online or at clinic, home blood tests &amp; medicine delivery across 200+ Indian cities. Plans from ₹199/month. Trusted by 2L+ patients. Zero hidden fees." />
        <meta property="og:title" content="Impact Health | Doctor Consultations &amp; Health Plans from ₹199/mo" />
        <meta property="og:description" content="Trusted by 2L+ patients across 200+ cities. Virtual &amp; in-clinic doctor consultations, home diagnostics, and medicine delivery from ₹199/month." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer }
          }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "Impact Health",
          "url": "https://impacthealth.co.in",
          "description": "Affordable doctor consultations, home diagnostics and medicine delivery across 200+ Indian cities.",
          "telephone": "+91-9667835909",
          "email": "connect@impacthealth.co.in",
          "areaServed": "India"
        })}</script>
      </Helmet>

      {/* ── PARALLAX AMBIENT SPATIAL BACKGROUND LAYER ── */}
      <ParallaxAtmosphere />

      {/* 1. HERO SLIDESHOW — includes the Quick Actions bar */}
      <HeroSlideshow />

      {/* 2. INSTITUTIONAL CLIENT / PARTNER LOGOS */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="py-10 bg-white border-t border-[#E0E4EB] border-b border-[#E0E4EB]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#6B7C93] text-center mb-5">
            Trusted by Leading Educational, Corporate &amp; Healthcare Partners Across India
          </p>
          <LogoLoop logos={clientLogos} speed={40} logoHeight={36} gap={44} fadeOut fadeOutColor="#ffffff" scaleOnHover />
        </div>
      </motion.section>

      {/* 3. SMART HEALTHCARE SOLUTIONS — TAB SELECTOR LAYOUT WITH MOTION */}
      <section id="solutions" className="py-20 lg:py-28 bg-white border-b border-[#E0E4EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="overline-teal">Smart Solutions</span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mt-2">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003087] tracking-tight max-w-xl">
                Smart Healthcare <em className="not-italic text-[#008C7A]">Solutions</em>
              </h2>
              <p className="text-sm text-[#6B7C93] leading-relaxed max-w-md lg:text-right">
                Experience high quality disease management with our tailored patient first medical services.
              </p>
            </div>
          </motion.div>

          {/* Tab Selector Layout - 15% Enlarged */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#E0E4EB] rounded-2xl overflow-hidden shadow-sm"
          >

            {/* Left: Tab List */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#E0E4EB] bg-[#F8F9FC]">
              {solutionTabs.map((tab, i) => {
                const Icon = tab.icon;
                const isActive = activeTab === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`w-full flex items-center gap-4.5 px-7 py-6 sm:py-6.5 text-left border-b border-[#E0E4EB] last:border-b-0 transition-all duration-200 group relative ${isActive
                      ? 'bg-white border-l-4 border-l-[#003087]'
                      : 'border-l-4 border-l-transparent hover:bg-white/70 hover:border-l-[#E0E4EB]'
                      }`}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                      style={{ background: isActive ? tab.accentBg : '#EAECF0' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: isActive ? tab.accentColor : '#9AA5B4' }} />
                    </div>
                    <span
                      className={`text-base font-semibold leading-snug transition-colors duration-200 ${isActive ? 'text-[#003087]' : 'text-[#6B7C93] group-hover:text-[#3D4B5C]'
                        }`}
                    >
                      {tab.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeArrow"
                        className="ml-auto shrink-0"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <ArrowRight className="w-5 h-5 text-[#003087]" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: Active Content Panel */}
            <div className="lg:col-span-8 bg-white">
              <AnimatePresence mode="wait">
                {solutionTabs.map((tab, i) => {
                  if (activeTab !== i) return null;
                  const Icon = tab.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.99 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="h-full p-8 sm:p-12 lg:p-14 flex flex-col justify-between gap-8 min-h-[380px] [background:linear-gradient(#ffffff,#ffffff)_padding-box,linear-gradient(160deg,rgba(0,140,122,0.18),rgba(0,48,135,0.10),rgba(255,255,255,0.04))_border-box] border border-transparent rounded-r-2xl"
                    >
                      {/* Top: icon + content */}
                      <div className="flex flex-col sm:flex-row gap-6 sm:gap-7 items-start">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.35, delay: 0.05 }}
                          className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                          style={{ background: tab.accentBg }}
                        >
                          <Icon className="w-8 h-8" style={{ color: tab.accentColor }} />
                        </motion.div>
                        <div className="space-y-3">
                          <h3 className="text-2xl sm:text-3xl font-bold text-[#003087] leading-tight">
                            {tab.title}
                          </h3>
                          <p className="text-base sm:text-lg text-[#6B7C93] leading-relaxed max-w-xl">
                            {tab.description}
                          </p>
                        </div>
                      </div>

                      {/* Bottom: stat + CTA */}
                      <div className="flex flex-wrap items-end justify-between gap-4 pt-8 border-t border-[#F0F2F5]">
                        <div>
                          <div
                            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                            style={{ color: tab.accentColor }}
                          >
                            {tab.stat}
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-[#9AA5B4] uppercase tracking-wider mt-1">
                            {tab.statLabel}
                          </div>
                        </div>
                        {tab.cta ? (
                          <Link to="/contact">
                            <Button variant="primary" size="lg" className="bg-[#CC2229] hover:bg-[#A81920] text-white border-transparent text-sm sm:text-base font-bold px-7 py-3.5 active:scale-[0.98] transition-transform" withArrow>
                              Book Consultation Now
                            </Button>
                          </Link>
                        ) : (
                          <Link to="/services">
                            <Button variant="secondary" size="lg" className="border-[#E0E4EB] text-[#003087] hover:bg-[#F5F6F8] text-sm sm:text-base font-bold px-7 py-3.5 active:scale-[0.98] transition-transform" withArrow>
                              Learn More
                            </Button>
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </motion.div>
        </div>
      </section>


      {/* 4. STATISTICAL INSIGHT — SQUARE-STYLE STACKED LAYOUT WITH USER PROVIDED FADED NETWORK MAP BG WITH PARALLAX */}
      <section ref={statsSectionRef} id="about" className="py-14 lg:py-20 text-white relative overflow-hidden bg-[#00112C]">
        {/* User-provided Global Health Network Map Background with Parallax Depth */}
        <motion.div
          style={{ y: yNetworkBg, scale: scaleNetworkBg }}
          className="absolute inset-0 z-0 pointer-events-none will-change-transform"
        >
          <img
            src="/stats-world-network.jpg"
            alt="Global Healthcare Network"
            className="w-full h-full object-cover object-center opacity-35"
          />
          {/* Subtle fade overlays to blend edges and maintain readability */}
          <div className="absolute inset-0 bg-[#00112C]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00112C] via-transparent to-[#00112C]" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* Left Column: Context / Problem Quote with subtle Parallax */}
            <motion.div
              style={{ y: yLeftQuote }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="lg:col-span-6 space-y-5 lg:sticky lg:top-28 will-change-transform"
            >
              <span className="overline-teal">
                Statistical Insight
              </span>

              <blockquote className="font-display font-bold text-2xl sm:text-3xl lg:text-[32px] text-white leading-tight border-l-2 border-[#008C7A] pl-5">
                <WordReveal
                  text="Worldwide, Chronic Diseases are the major causes of deaths and disabilities. In India, they account for 53% of all deaths."
                  className="leading-tight"
                />
              </blockquote>

              <div className="w-12 h-1 bg-[#008C7A] rounded-full" />

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg font-sans">
                Chronic Diseases create large, adverse and underappreciated economic effects on families. Early diagnosis can prevent at least 80% of premature heart disease and stroke.
              </p>
            </motion.div>

            {/* Right Column: Square-style Stacked Metric Rows */}
            <div className="lg:col-span-6 border-t border-white/10">
              {[
                { number: '80', suffix: '%', label: 'Preventable Cases' },
                { number: '200', suffix: '+', label: 'Service Cities' },
                { number: '200K', suffix: '+', label: 'Patients Assisted' },
                { number: '1M', suffix: '+', label: 'Consultations' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.25, 1, 0.5, 1] }}
                  className="py-7 sm:py-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group hover:border-[#008C7A]/50 transition-all duration-300 [background:linear-gradient(transparent,transparent)_padding-box,linear-gradient(90deg,rgba(0,140,122,0)_0%,rgba(0,140,122,0)_100%)_border-box] hover:[background:linear-gradient(rgba(0,140,122,0.04),rgba(0,140,122,0.04))_padding-box,linear-gradient(90deg,rgba(0,140,122,0.3)_0%,rgba(0,48,135,0.15)_100%)_border-box]"
                >
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none group-hover:translate-x-1 transition-transform duration-300">
                    {item.number}
                    <span className="text-[#008C7A]">{item.suffix}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-slate-400 group-hover:text-white transition-colors font-mono">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. OUR SERVICES — STADIUM / CAPSULE EDITORIAL ROWS WITH PARALLAX */}
      <section id="services" className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row md:items-start justify-between mb-7 lg:mb-9 gap-3"
          >
            <div className="max-w-xl space-y-1">
              <h2 className="text-2xl sm:text-3xl lg:text-[33px] font-display font-extrabold text-[#0B132B] tracking-tight">
                Our Services
              </h2>
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed font-sans max-w-lg">
                Experience our wide range of health &amp; wellness services available at more than 200+ cities across Pan India.
              </p>
            </div>

            {/* Glowing Pill Explore Plans Button */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 via-teal-400/20 to-purple-400/20 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
              <Link to="/services">
                <button className="relative px-4.5 py-1.5 rounded-full bg-slate-100/90 hover:bg-white text-[#0B132B] font-bold text-xs border border-slate-300 shadow-sm backdrop-blur-md inline-flex items-center gap-1.5 transition-all cursor-pointer">
                  <span>Explore Plans</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Stadium / Oval Alternating Rows with Individual Parallax */}
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            <div className="bg-white"><ParallaxStadiumRow service={services[0]} index={0} isReversed={false} numStr="01" /></div>
            <div className="bg-[#FBFAF8]"><ParallaxStadiumRow service={services[1]} index={1} isReversed={true} numStr="02" /></div>
            <div className="bg-white"><ParallaxStadiumRow service={services[2]} index={2} isReversed={false} numStr="03" /></div>
          </div>

        </div>
      </section>

      {/* 6. OUR TEAM — EXPANDABLE IMAGE ACCORDION (3 CORE LEADERS) */}
      <TeamImageAccordionSection />

      {/* 7. PATIENT OUTCOMES — INFINITE MARQUEE TESTIMONIAL CAROUSEL */}
      <PatientOutcomesMarquee />

      {/* 8. HOW IT WORKS — STEP-BY-STEP PROCESS TIMELINE */}
      <HowItWorksSection />

      {/* 9. FAQ SECTION — SPLIT 2-COLUMN MINIMAL ACCORDION */}
      <section id="faq" className="py-20 lg:py-28 bg-[#FAFBFD] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Left Column: Heading & Support Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 space-y-4 self-start"
            >
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-[#0B132B] tracking-tight leading-none">
                <WordReveal text="FAQs" className="block" />
              </h2>
              <p className="text-lg sm:text-xl text-slate-500 font-sans font-medium">
                Your questions answered
              </p>
              <p className="text-sm sm:text-base text-slate-600 font-sans pt-3 max-w-sm leading-relaxed">
                Can&apos;t find what you&apos;re looking for? Contact our{' '}
                <Link to="/contact" className="font-bold text-[#0B132B] underline hover:text-[#008C7A] transition-colors">
                  customer support team
                </Link>
              </p>
            </motion.div>

            {/* Right Column: Clean Border-Divided FAQ Rows */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 divide-y divide-slate-200 border-t border-b border-slate-200"
            >
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-6 sm:py-7">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      className="w-full flex items-center justify-between text-left group gap-4 py-1"
                    >
                      <span className="text-base sm:text-lg font-medium text-[#0B132B] group-hover:text-[#008C7A] transition-colors leading-snug">
                        {faq.question}
                      </span>
                      <span
                        className={`text-xl font-light shrink-0 w-6 h-6 flex items-center justify-center transition-all duration-300 ${isOpen ? 'text-[#008C7A] rotate-0' : 'text-slate-400 group-hover:text-slate-700'
                          }`}
                        aria-hidden="true"
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                          className="overflow-hidden"
                        >
                          <div id={`faq-answer-${idx}`} className="pt-2 pb-2 text-sm sm:text-base text-slate-600 leading-relaxed font-sans pr-6">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 9. CONTACT CTA SECTION — COMMAND CENTER GLASS BANNER WITH PARALLAX GLOWS */}
      <section ref={contactSectionRef} id="contact" className="py-20 lg:py-28 bg-[#00112C] relative overflow-hidden text-white">
        {/* Ambient atmospheric glows with Parallax */}
        <motion.div
          style={{ y: yGlowNavy }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#003087]/25 rounded-full blur-[140px] pointer-events-none will-change-transform"
        />
        <motion.div
          style={{ y: yGlowTeal }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#008C7A]/20 rounded-full blur-[140px] pointer-events-none will-change-transform"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="overline-white">
                Get in Touch
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
                <WordReveal text="Need personalized healthcare" className="block" />
                <em className="not-italic text-[#4FC8BC] block mt-1">
                  <WordReveal text="guidance?" className="block" />
                </em>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-sans">
                Connect with our care team to discover how our solutions can support your family&apos;s health goals.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/contact">
                  <Button variant="accent" size="lg" className="bg-[#CC2229] hover:bg-[#A81920] text-white font-bold px-8 py-3.5 shadow-lg shadow-red-900/30 active:scale-[0.98] transition-transform" withArrow>
                    Contact Us
                  </Button>
                </Link>
                <a href="#services">
                  <Button variant="secondary" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20 px-8 py-3.5 backdrop-blur-md active:scale-[0.98] transition-transform">
                    Explore Patient Programs
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 space-y-4"
            >
              <a
                href="tel:+919667835909"
                aria-label="Call us at +91 9667835909"
                className="p-6 rounded-2xl bg-white/5 flex items-center gap-5 hover:bg-white/10 transition-all duration-300 block group [background:linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.05))_padding-box,linear-gradient(135deg,rgba(255,255,255,0.18),rgba(204,34,41,0.25),rgba(255,255,255,0.04))_border-box] border border-transparent hover:[background:linear-gradient(rgba(255,255,255,0.09),rgba(255,255,255,0.09))_padding-box,linear-gradient(135deg,rgba(255,255,255,0.28),rgba(204,34,41,0.35),rgba(255,255,255,0.08))_border-box]"
              >
                <div className="w-14 h-14 rounded-xl bg-[#CC2229]/20 border border-[#CC2229]/40 text-[#FFF0F0] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Call Us</p>
                  <p className="font-display font-bold text-lg sm:text-xl text-white font-mono mt-0.5">+91 9667835909</p>
                </div>
              </a>

              <a
                href="mailto:connect@impacthealth.co.in"
                aria-label="Email us at connect@impacthealth.co.in"
                className="p-6 rounded-2xl flex items-center gap-5 hover:bg-white/10 transition-all duration-300 block group [background:linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.05))_padding-box,linear-gradient(135deg,rgba(255,255,255,0.18),rgba(0,140,122,0.28),rgba(255,255,255,0.04))_border-box] border border-transparent hover:[background:linear-gradient(rgba(255,255,255,0.09),rgba(255,255,255,0.09))_padding-box,linear-gradient(135deg,rgba(255,255,255,0.28),rgba(0,140,122,0.40),rgba(255,255,255,0.08))_border-box]"
              >
                <div className="w-14 h-14 rounded-xl bg-[#008C7A]/25 border border-[#008C7A]/40 text-[#E6F5F3] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Email Us</p>
                  <p className="font-bold text-sm sm:text-base text-white break-words font-mono mt-0.5">connect@impacthealth.co.in</p>
                </div>
              </a>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
