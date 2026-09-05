import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight, Sparkles, ShieldCheck, Heart, Stethoscope, Award, Users, CheckCircle2 } from 'lucide-react';

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 4 FAQs from the design
  const faqs = [
    {
      title: 'Serving India',
      answer:
        'Impact Health operates across 200+ cities in India, ensuring families in both metropolitan hubs and tier-2/tier-3 regional districts receive doorstep diagnostics, fast sample collection, and tele-triage consultations.',
    },
    {
      title: 'Clinical Ethics',
      answer:
        'Our medical practitioners and clinical advisors are evaluated strictly by patient health recovery, diagnostic precision, and trust earned. We enforce a zero-commission policy with no pharmaceutical sales targets or unnecessary test quotas.',
    },
    {
      title: 'Accredited Labs',
      answer:
        'Every diagnostic partner in our network holds verified NABL accreditation and ISO 9001:2015 certification. We follow strict cold-chain sample logistics with barcoded tracking to guarantee uncompromising report accuracy.',
    },
    {
      title: 'Doctor Selection',
      answer:
        'All physicians on our panel hold verified MBBS or MD degrees with active Medical Council registration. They undergo rigorous pediatric, chronic illness, and triage protocol training before handling patient consultations.',
    },
  ];

  // Core Values from the design
  const values = [
    {
      name: 'Respect',
      desc: 'Every patient, regardless of geography or income, is treated with absolute dignity and compassionate care.',
    },
    {
      name: 'Quality',
      desc: 'Zero shortcuts in diagnostic testing protocols, NABL laboratory accreditation, or doctor qualifications.',
    },
    {
      name: 'Patient Care',
      desc: 'We evaluate our clinical success strictly by patient health recovery and long-term trust, never by volume quotas.',
    },
  ];

  // 3 Key Programs
  const programs = [
    {
      tag: 'EDUCATION',
      title: 'School Health Program',
      desc: 'Preventive screenings, growth monitoring, and nutritional counseling for over 40,000 students nationwide.',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop',
      fallback: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    },
    {
      tag: 'WORKPLACE',
      title: 'Corporate Wellness',
      desc: 'On-site wellness camps, executive health checks, and ongoing occupational health management for modern enterprises.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
      fallback: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    },
    {
      tag: 'COMPLIANCE',
      title: 'Food Handler Sanitisation',
      desc: 'FSSAI-compliant medical screening, typhoid vaccination, and routine diagnostic certification for kitchen and hospitality staff.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop',
      fallback: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=800&auto=format&fit=crop',
    },
  ];

  // 4 Stats for the banner
  const stats = [
    { value: '~60%', label: 'average out-of-pocket cost reduction for covered families' },
    { value: '200+', label: 'Indian cities with active doorstep phlebotomy coverage' },
    { value: '400+', label: 'daily physician consultations across Pan-India' },
    { value: 'TECH', label: 'proprietary digital triage and clinical logistics engine' },
  ];

  // 3 Origin Story Metrics
  const originMetrics = [
    { num: '01', stat: '400+', unit: '/ DAILY', desc: 'Doctor consultations conducted daily across 200+ Indian cities.' },
    { num: '02', stat: '40,000+', unit: '', desc: 'Students screened under preventive School Health programs.' },
    { num: '03', stat: 'PAN-INDIA', unit: '', desc: 'Accredited phlebotomy network reaching tier-2 & tier-3 hubs.' },
  ];

  // Ticker items
  const tickerItems = [
    'Convenient',
    'For everyone',
    'Accessible',
    'Affordable',
    'Convenient',
    'For everyone',
    'Accessible',
    'Affordable',
    'Convenient',
    'For everyone',
    'Accessible',
    'Affordable',
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1A1816] font-sans selection:bg-[#C6F035] selection:text-black relative overflow-hidden">
      <Helmet>
        <title>About Impact Health | Affordable Healthcare Across 200+ Indian Cities</title>
        <meta name="description" content="Learn about Impact Health — our mission to make quality healthcare accessible and affordable for every Indian family. Doctor consultations, home diagnostics & more." />
        <meta property="og:title" content="About Impact Health | Our Mission & Team" />
        <meta property="og:description" content="Trusted by 2L+ patients. Impact Health provides affordable doctor consultations, home blood tests & medicine delivery across 200+ cities in India." />
      </Helmet>
      
      {/* ────────────────────────────────────────────────────────────
          WARM LIGHT EDITORIAL AMBIENCE
          (Warm cream/linen canvas #FBF9F4 + soft honey & olive radiance)
          ──────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Soft amber top radiance */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.06, 0.09, 0.06] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 left-1/4 w-[850px] h-[850px] rounded-full bg-gradient-to-br from-[#F59E0B] via-[#D97706]/60 to-transparent blur-[160px]"
        />
        {/* Soft olive/warm mid radiance */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.08, 0.06] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[35%] -right-40 w-[750px] h-[750px] rounded-full bg-gradient-to-bl from-[#84CC16] via-[#EAB308]/60 to-transparent blur-[150px]"
        />
        {/* Soft warm sand lower radiance */}
        <div className="absolute top-[70%] -left-32 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-[#D97706]/5 via-[#FBBF24]/4 to-transparent blur-[160px]" />
        {/* Fine warm paper dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#1A1816 1.2px, transparent 1.2px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Outer Content Shell */}
      <div className="relative z-10">

        {/* ────────────────────────────────────────────────────────────
            SECTION 1: HERO SECTION
            "Healthcare, without the barriers."
            ──────────────────────────────────────────────────────────── */}
        <section className="pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative">
          
          {/* Top-Right Background Rotating Concentric Radar Rings in Warm Sand/Gold */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-10 right-0 sm:right-10 w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] pointer-events-none opacity-40 select-none will-change-transform"
          >
            <svg viewBox="0 0 540 540" className="w-full h-full stroke-[#C5B392]/50" fill="none">
              <circle cx="440" cy="100" r="80" strokeWidth="1" strokeDasharray="3 4" />
              <circle cx="440" cy="100" r="150" strokeWidth="1" />
              <circle cx="440" cy="100" r="230" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="440" cy="100" r="310" strokeWidth="1" />
              <circle cx="440" cy="100" r="400" strokeWidth="1" strokeDasharray="3 5" />
              <circle cx="440" cy="100" r="490" strokeWidth="1" />
            </svg>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading + Story */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Overline Badge */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2"
              >
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-[#4D7C0F] uppercase">
                  IMPACT HEALTH &bull; REDUCE HEALTHCARE EXPENDITURE
                </span>
              </motion.div>

              {/* Main Headline with Staggered Entrance */}
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif-editorial text-5xl sm:text-7xl lg:text-[84px] text-[#141414] font-normal leading-[1.05] tracking-tight"
              >
                Healthcare,<br />
                <motion.span
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block italic font-serif-editorial text-[#4D7C0F]"
                >
                  without
                </motion.span>{' '}
                the<br />
                barriers.
              </motion.h1>

              {/* Mission Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base text-[#524E48] font-sans leading-relaxed max-w-lg pt-4 font-normal"
              >
                Impact Health exists to eliminate friction from everyday healthcare in India, delivering affordable, accessible, and high-quality clinical care at scale.
              </motion.p>
            </div>

            {/* Right Column: Hero Medical Team Photo Card with Hover Lift */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.28 } }}
                className="relative w-full max-w-md rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E3DDD1] bg-white shadow-xl shadow-stone-300/40 group cursor-pointer will-change-transform"
              >
                {/* Authentic Clinical Team Photograph */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-200">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop"
                    alt="Impact Health Clinical Team"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1200&auto=format&fit=crop';
                    }}
                  />
                </div>

                {/* Bottom Overlay Label with subtle pulse */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-[#1A1816]/90 backdrop-blur-md border border-white/20 flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#C6F035] animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-white uppercase">
                    OFFICIAL MEDICAL TEAM
                  </span>
                </div>
              </motion.div>
            </div>

          </div>
        </section>


        {/* ────────────────────────────────────────────────────────────
            SECTION 2: INFINITE EDITORIAL TICKER RIBBON (Interactive Hover Slowdown)
            "Convenient ✦ For everyone ✦ Accessible ✦ Affordable ✦"
            ──────────────────────────────────────────────────────────── */}
        <section className="py-5 border-y border-[#E5E0D6] bg-[#F2EDE2]/70 backdrop-blur-md overflow-hidden relative select-none">
          <div className="flex whitespace-nowrap overflow-hidden">
            <div className="animate-ticker-marquee flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12">
              {[...tickerItems, ...tickerItems].map((item, idx) => (
                <div key={idx} className="flex items-center gap-8 sm:gap-12">
                  <span className="font-serif-editorial text-lg sm:text-2xl italic tracking-wide text-[#262422] hover:text-[#4D7C0F] transition-colors">
                    {item}
                  </span>
                  <span className="text-[#D97706] text-xs sm:text-sm">✦</span>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ────────────────────────────────────────────────────────────
            SECTION 3: ORIGIN STORY SPLIT (Scroll Staggered Reveal)
            "Born from a simple, uncomfortable question."
            ──────────────────────────────────────────────────────────── */}
        <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Bold Serif Title */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-4"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#4D7C0F]">
                ORIGIN STORY
              </span>
              <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#141414] font-normal leading-[1.1]">
                Born from a<br />
                simple,<br />
                uncomfortable<br />
                question.
              </h2>
            </motion.div>

            {/* Right Column: Question + Story + 3 Metric Cards */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Question in Rich Healthcare Teal */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#007A6C] font-normal leading-snug"
              >
                Why does where you live still determine whether you get care?
              </motion.h3>

              {/* Narrative Text */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base text-[#524E48] font-sans leading-relaxed font-normal"
              >
                For millions of Indian families, even routine clinical care requires endless travel, loss of daily wages, and catastrophic out-of-pocket costs. We built Impact Health to reverse this — bringing hospital-grade doctor consultations, accredited diagnostics, and preventative programs directly to schools, workplaces, and communities nationwide.
              </motion.p>

              {/* 3 Metric / Pillar Cards in a Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {originMetrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
                    className="p-6 rounded-2xl bg-[#F4EFE6] border border-[#E3DDD1] hover:border-[#C5B392] hover:shadow-lg transition-colors cursor-pointer"
                  >
                    <div className="text-xs font-mono font-bold text-[#4D7C0F] mb-2">{m.num}</div>
                    <div className="text-2xl font-bold font-sans text-[#141414] tracking-tight">
                      {m.stat} {m.unit && <span className="text-xs font-normal text-[#78716C]">{m.unit}</span>}
                    </div>
                    <p className="text-xs text-[#615C55] mt-2.5 leading-relaxed font-sans">
                      {m.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

            </div>

          </div>

        </section>


        {/* ────────────────────────────────────────────────────────────
            SECTION 4: HIGH-CONTRAST ELECTRIC LIME STAT BANNER (Animated Stagger)
            (~60% • 200+ • 400+ • TECH)
            ──────────────────────────────────────────────────────────── */}
        <section className="bg-[#C6F035] text-black py-14 sm:py-18 relative overflow-hidden shadow-sm">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 items-start">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                  className="space-y-2 cursor-pointer will-change-transform"
                >
                  <div className="font-serif-editorial text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-none">
                    {s.value}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-black/85 leading-snug font-sans">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>


        {/* ────────────────────────────────────────────────────────────
            SECTION 5: PROGRAMS THAT SHOW UP (Staggered Cards with Lift)
            (3 Vertical Cards: School Health, Corporate Wellness, Food Handler)
            ──────────────────────────────────────────────────────────── */}
        <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          
          {/* Header Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 mb-14"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#4D7C0F]">
              WHAT WE DO
            </span>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#141414] font-normal leading-tight">
                Programs that <span className="italic font-serif-editorial text-[#C2410C]">show up.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#524E48] font-sans max-w-md lg:text-right leading-relaxed font-normal">
                From tier-2 classrooms to industrial kitchens, we bring accredited clinical care to where people actually live and work.
              </p>
            </div>
          </motion.div>

          {/* 3 Vertical Program Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.28 } }}
                className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F4EFE6] border border-[#E3DDD1] hover:border-[#C5B392] hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer will-change-transform"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-200 relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.currentTarget.src = p.fallback;
                    }}
                  />
                </div>
                <div className="p-6 sm:p-7 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#4D7C0F] bg-[#ECFCCB] px-2.5 py-0.5 rounded-full inline-block">
                      {p.tag}
                    </span>
                    <h3 className="font-serif-editorial text-2xl text-[#141414] font-normal leading-snug group-hover:text-[#4D7C0F] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#524E48] leading-relaxed font-sans">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </section>


        {/* ────────────────────────────────────────────────────────────
            SECTION 6: CORE VALUES (Slide-In Rows with Shift on Hover)
            (— Respect • — Quality • — Patient Care)
            ──────────────────────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#E5E0D6]">
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#4D7C0F]">
              CORE VALUES
            </span>
          </motion.div>

          <div className="divide-y divide-[#E5E0D6]">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline group cursor-pointer"
              >
                {/* Title with dash and subtle slide on hover */}
                <div className="lg:col-span-5">
                  <h3 className="font-serif-editorial text-3xl sm:text-5xl lg:text-6xl text-[#141414] group-hover:text-[#4D7C0F] group-hover:translate-x-3 transition-all duration-300 font-normal">
                    — {val.name}
                  </h3>
                </div>

                {/* Description */}
                <div className="lg:col-span-7">
                  <p className="text-sm sm:text-base lg:text-lg text-[#524E48] font-sans leading-relaxed font-normal">
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </section>


        {/* ────────────────────────────────────────────────────────────
            SECTION 7: FOUNDER SPOTLIGHT & QUOTE (Smooth Scale & Text Reveal)
            (Anshuman Sahoo • CEO Quote)
            ──────────────────────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#E5E0D6]">
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#4D7C0F]">
              FROM THE FOUNDER
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left: Founder Headshot Card with Hover Lift */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.28 } }}
              className="lg:col-span-4 flex justify-center lg:justify-start cursor-pointer"
            >
              <div className="relative w-full max-w-[280px] sm:max-w-xs rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E3DDD1] shadow-xl bg-white group">
                <img
                  src="/team/anshuman_sahoo.jpg"
                  alt="Anshuman Sahoo - Founder & CEO"
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>

            {/* Right: Large Editorial Quote */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 space-y-8"
            >
              <blockquote className="font-serif-editorial text-2xl sm:text-4xl lg:text-5xl text-[#141414] font-normal leading-[1.25]">
                &ldquo;Healthcare should not be a privilege of geography or income.{' '}
                <span className="italic font-serif-editorial text-[#4D7C0F] bg-[#ECFCCB]/70 px-1.5 py-0.5 rounded">
                  Every person deserves care that is within reach &mdash;
                </span>{' '}
                physically, financially, and emotionally.&rdquo;
              </blockquote>

              <div className="space-y-1 pt-2">
                <p className="text-xs sm:text-sm font-mono font-bold tracking-[0.18em] text-[#4D7C0F] uppercase">
                  ANSHUMAN SAHOO &bull; FOUNDER &amp; CHIEF EXECUTIVE OFFICER
                </p>
                <p className="text-xs text-[#78716C] font-sans">
                  Impact Health Technologies Private Limited
                </p>
              </div>
            </motion.div>

          </div>

        </section>


        {/* ────────────────────────────────────────────────────────────
            SECTION 8: FREQUENTLY ASKED QUESTIONS (Staggered Card Entrance)
            (Accordion: Serving India, Clinical Ethics, Accredited Labs, Doctor Selection)
            ──────────────────────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#E5E0D6]">
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#4D7C0F]">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                    isOpen
                      ? 'bg-white border-[#84CC16] shadow-md'
                      : 'bg-[#F4EFE6] border-[#E3DDD1] hover:border-[#C5B392]'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif-editorial text-xl sm:text-2xl text-[#141414] font-normal">
                      {faq.title}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="shrink-0 text-[#4D7C0F]"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#524E48] font-sans leading-relaxed border-t border-stone-200/60">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Subtext Link */}
          <div className="mt-8 text-center sm:text-left">
            <p className="text-xs text-[#78716C] font-sans">
              Have questions about our institutional partnerships or community programs?{' '}
              <Link to="/contact" className="text-[#4D7C0F] hover:underline font-semibold ml-1">
                Reach our team directly &rarr;
              </Link>
            </p>
          </div>

        </section>


        {/* ────────────────────────────────────────────────────────────
            SECTION 9: "Let's talk." CTA & CONTACT FOOTER STRIP (Staggered Word Entrance)
            (Large Serif Title • Bhubaneswar, Mumbai, Delhi • Contact info)
            ──────────────────────────────────────────────────────────── */}
        <section className="pt-24 sm:pt-32 pb-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#E5E0D6]">
          
          {/* Giant Title */}
          <div className="mb-14 sm:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-editorial text-6xl sm:text-8xl lg:text-9xl text-[#141414] font-normal tracking-tight"
            >
              Let&apos;s{' '}
              <motion.span
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block italic font-serif-editorial text-[#4D7C0F]"
              >
                talk.
              </motion.span>
            </motion.h2>
          </div>

          {/* 3 Contact Columns with Staggered Fade Up */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 pt-8 border-t border-[#E5E0D6]">
            
            {/* Column 1: Locations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#4D7C0F]">
                VISIT
              </p>
              <p className="text-sm sm:text-base text-[#524E48] font-sans leading-relaxed">
                Bhubaneswar &bull; Mumbai &bull; Delhi NCR
              </p>
            </motion.div>

            {/* Column 2: Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2"
            >
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#4D7C0F]">
                EMAIL
              </p>
              <a
                href="mailto:connect@impacthealth.co.in"
                className="text-sm sm:text-base text-[#524E48] hover:text-[#141414] transition-colors font-sans block font-medium"
              >
                connect@impacthealth.co.in
              </a>
            </motion.div>

            {/* Column 3: Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2"
            >
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#4D7C0F]">
                CALL
              </p>
              <a
                href="tel:+919667835909"
                className="text-sm sm:text-base text-[#524E48] hover:text-[#141414] transition-colors font-sans block font-medium"
              >
                +91 96678 35909
              </a>
            </motion.div>

          </div>

          {/* Copyright Sub-strip */}
          <div className="mt-16 pt-8 border-t border-stone-300/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8C857B]">
            <p>&copy; {new Date().getFullYear()} Impact Health Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy" className="hover:text-[#141414] transition-colors">Privacy Policy</Link>
              <span>&bull;</span>
              <Link to="/contact" className="hover:text-[#141414] transition-colors">Contact Support</Link>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
