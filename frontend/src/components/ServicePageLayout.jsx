import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import Button from './Button';

// Dynamic Lucide Icon Resolver with safe fallback
function ResolveIcon({ name, className = 'w-6 h-6' }) {
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
}

export default function ServicePageLayout({ service }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Fallback defaults if specific properties are missing in older service entries
  const heroHeadline = service.heroHeadline || service.title;
  const whyMatters = service.whyMatters || {
    title: "Why This Service Matters",
    description: service.overview?.whyItMatters || "Ensuring comprehensive clinical safety and wellbeing across school campuses.",
    image: service.benefitsImage || service.image,
    stats: [
      { number: "100%", label: "Clinical Compliance", icon: "ShieldCheck" },
      { number: "24/7", label: "Emergency Response", icon: "Clock" },
      { number: "< 15m", label: "Triage SLA", icon: "Zap" },
      { number: "0-Delay", label: "Parent Alerts", icon: "Bell" }
    ]
  };

  const solutionTimeline = service.solutionTimeline || [
    { step: "01", title: "Assessment", desc: "Evaluate campus infrastructure and safety needs.", icon: "Search" },
    { step: "02", title: "Implementation", desc: "Deploy certified personnel and medical equipment.", icon: "Building2" },
    { step: "03", title: "Monitoring", desc: "Track health trends via encrypted EMR platforms.", icon: "Activity" },
    { step: "04", title: "Reporting", desc: "Provide detailed health analytics to leadership.", icon: "FileText" },
    { step: "05", title: "Continuous Support", desc: "Ensure continuous supply replenishment and drills.", icon: "HeartHandshake" }
  ];

  const deliverables = service.deliverables || (service.features || []).map((f) => ({
    title: f.title,
    description: f.description,
    icon: f.icon || "CheckCircle2",
    image: service.image
  }));

  const benefitsList = service.benefits
    ? (typeof service.benefits[0] === 'string'
      ? service.benefits.map((b) => ({ title: b, desc: "Key healthcare outcome for student safety.", icon: "CheckCircle2" }))
      : service.benefits)
    : [
      { title: "Immediate Emergency Care", desc: "Instant clinical stabilization for sudden acute illness.", icon: "Zap" },
      { title: "Better Student Safety", desc: "Comprehensive clinical infrastructure lowering campus risk.", icon: "ShieldCheck" },
      { title: "Parent Confidence", desc: "Complete transparency and instant alerts build lasting trust.", icon: "Heart" },
      { title: "Reduced Response Time", desc: "Immediate nurse intervention while emergency transport arrives.", icon: "Clock" }
    ];

  const howWeWorkSteps = service.howWeWork || [
    { step: "01", title: "Site Audit & Planning", desc: "Audit facility requirements, safety standards, and space allocation.", icon: "Search" },
    { step: "02", title: "Clinical Setup & Deployment", desc: "Equip space with certified medical tools, staff, and EMR portals.", icon: "UserCheck" },
    { step: "03", title: "Protocol Integration", desc: "Institute standard operating procedures and parent notification loops.", icon: "Sliders" },
    { step: "04", title: "Quality Assurance", desc: "Conduct regular inventory replenishment, CPR drills, and audits.", icon: "RefreshCw" }
  ];

  const faqs = service.faqs || [
    { question: "How does Impact Health ensure medical compliance?", answer: "All our clinical protocols match statutory state board and national pediatric safety standards with verified medical staff credentials." },
    { question: "How are parents notified during health visits?", answer: "Parents receive instant digital notifications via SMS and app links whenever a child visits the infirmary." },
    { question: "What is the emergency transport response procedure?", answer: "Our nurses initiate triage immediately while our priority ambulance network coordinates rapid transport to partner tertiary hospitals." }
  ];

  const floatingBadges = service.floatingBadges || [
    { text: "Certified Medical Team", icon: "UserCheck" },
    { text: "100% Safety Compliant", icon: "ShieldCheck" },
    { text: "24/7 Support Network", icon: "HeartPulse" }
  ];

  // Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FCFC] text-[#0F172A] font-sans overflow-hidden">
      
      {/* ═══════════════════════════════════════════
          SECTION 1: HERO SECTION
       ═══════════════════════════════════════════ */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Soft Background Gradient Wash */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-[#0F766E]/8 via-[#14B8A6]/5 to-transparent pointer-events-none rounded-b-[60px] -z-10" />
        
        {/* Ambient Blurred Orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#38BDF8]/15 rounded-full filter blur-3xl pointer-events-none -z-10 animate-float-slow" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#14B8A6]/15 rounded-full filter blur-3xl pointer-events-none -z-10 animate-float" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category Pill Badge */}
              <motion.div 
                variants={fadeUpVariants}
                className="inline-flex items-center gap-2 bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider font-sans shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-ping" />
                <span>{service.categoryName || "School Health Services"}</span>
              </motion.div>

              {/* Service Subtitle / Label */}
              <motion.p 
                variants={fadeUpVariants}
                className="text-sm md:text-base font-semibold text-[#14B8A6] tracking-wide uppercase font-display"
              >
                {service.title}
              </motion.p>

              {/* Short Impactful Heading */}
              <motion.h1 
                variants={fadeUpVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-[#0F172A] tracking-tight leading-[1.12]"
              >
                {heroHeadline}
              </motion.h1>

              {/* Supporting Paragraph */}
              <motion.p 
                variants={fadeUpVariants}
                className="text-base md:text-lg text-[#64748B] leading-relaxed font-sans max-w-2xl"
              >
                {service.description}
              </motion.p>

              {/* Action CTA Buttons */}
              <motion.div 
                variants={fadeUpVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link to="/contact">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="primary" 
                      className="bg-[#0F766E] hover:bg-[#0D645E] text-white font-sans font-bold text-sm px-8 py-4 rounded-2xl shadow-lg shadow-[#0F766E]/20 hover:shadow-xl hover:shadow-[#0F766E]/30 transition-all duration-300 w-full sm:w-auto text-center"
                    >
                      Book Consultation
                    </Button>
                  </motion.div>
                </Link>
                <a href="#why-it-matters">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="secondary" 
                      className="bg-white text-[#0F766E] border border-[#0F766E]/20 hover:bg-[#F8FCFC] font-sans font-bold text-sm px-8 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto text-center"
                    >
                      Contact Us
                    </Button>
                  </motion.div>
                </a>
              </motion.div>
            </div>

            {/* Right Healthcare Illustration & Floating Decorative Elements */}
            <motion.div 
              className="lg:col-span-5 relative"
              variants={scaleUpVariants}
            >
              <div className="relative bg-white rounded-[36px] p-4 shadow-[0_20px_50px_-15px_rgba(15,118,110,0.12)] border border-[#0F766E]/10 overflow-hidden group">
                <img 
                  alt={heroHeadline}
                  className="w-full h-[360px] md:h-[440px] object-cover rounded-[28px] transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  src={service.image}
                  loading="eager"
                />

                {/* Floating Decorative Badges */}
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md border border-[#0F766E]/15 rounded-2xl p-3.5 shadow-lg flex items-center gap-3 animate-float">
                  <div className="w-10 h-10 rounded-xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center shrink-0">
                    <ResolveIcon name={floatingBadges[0]?.icon || "UserCheck"} className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0F172A]">{floatingBadges[0]?.text}</p>
                    <p className="text-[10px] text-[#64748B]">Impact Health Standard</p>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md border border-[#14B8A6]/20 rounded-2xl p-3.5 shadow-lg flex items-center gap-3 animate-float-slow">
                  <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/15 text-[#14B8A6] flex items-center justify-center shrink-0">
                    <ResolveIcon name={floatingBadges[1]?.icon || "ShieldCheck"} className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0F172A]">{floatingBadges[1]?.text}</p>
                    <p className="text-[10px] text-[#64748B]">Verified Clinical SLA</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 1.5: OVERVIEW / PROGRAM ESSENCE (If overviewText exists)
       ═══════════════════════════════════════════ */}
      {service.overviewText && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#F8FCFC] to-white border-y border-[#0F766E]/10">
          <div className="max-w-5xl mx-auto px-6 md:px-12 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-2 bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest font-sans">
                <Icons.Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                {service.subtitle || "Prioritising Mental Well-Being in Schools"}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#0F172A] tracking-tight leading-tight">
                Prioritising Mental Well-Being in Schools
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-[#0F766E]/15 shadow-xl shadow-[#0F766E]/5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#0F766E] to-[#14B8A6]" />
              <p className="text-base sm:text-lg md:text-xl text-[#334155] leading-relaxed font-sans text-left sm:text-center font-normal">
                {service.overviewText}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SECTION 2: WHY THIS SERVICE MATTERS
       ═══════════════════════════════════════════ */}
      <section id="why-it-matters" className="py-20 md:py-28 bg-white border-b border-[#0F766E]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image with floating statistics overlay */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-[#F8FCFC] rounded-[36px] p-3 border border-[#0F766E]/10 shadow-md">
                <img 
                  alt={whyMatters.title}
                  className="w-full h-[380px] md:h-[420px] object-cover rounded-[28px]"
                  src={whyMatters.image}
                  loading="lazy"
                />

                {/* Floating highlight badge */}
                <div className="absolute -bottom-6 -right-4 md:bottom-6 md:-right-6 bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white p-5 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                    <Icons.Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Gold-Standard</p>
                    <p className="text-xs text-teal-100">Preventative Psychological Care</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Content & Statistics Highlights */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-3">
                <span className="text-[#14B8A6] text-xs font-bold uppercase tracking-widest block font-sans">
                  Clinical Necessity &amp; Early Intervention
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight">
                  {whyMatters.title}
                </h2>
                <p className="text-base text-[#64748B] leading-relaxed font-sans">
                  {whyMatters.description}
                </p>
              </div>

              {/* 3-4 Statistics or Benefit Highlights */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
                {whyMatters.stats.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="glass-card p-5 rounded-2xl border border-[#0F766E]/10 hover:border-[#0F766E]/30 transition-all duration-300 hover:shadow-lg group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0F766E]/10 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-3">
                      <ResolveIcon name={stat.icon} className="w-5 h-5" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-display font-extrabold text-[#0F766E]">
                      {stat.number}
                    </p>
                    <p className="text-xs font-semibold text-[#64748B] mt-1 leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2.5: CORE PILLARS OF OUR MENTAL HEALTH ECOSYSTEM (If corePillars exists)
       ═══════════════════════════════════════════ */}
      {service.corePillars && service.corePillars.length > 0 && (
        <section className="py-24 bg-[#F8FCFC] border-b border-[#0F766E]/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-[#0F766E] text-xs font-bold uppercase tracking-widest font-sans block">
                Integrated Care Architecture
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight">
                {service.corePillarsTitle || "Core Pillars of Our Mental Health Ecosystem"}
              </h2>
              <p className="text-base text-[#64748B] font-sans max-w-xl mx-auto">
                {service.corePillarsSubtitle || "A structured framework bringing screening, counseling, socio-emotional learning, and emergency protocols directly into school environments."}
              </p>
            </div>

            {/* Desktop Structured Table / Grid */}
            <div className="hidden lg:block overflow-hidden rounded-3xl border border-[#0F766E]/15 shadow-xl bg-white">
              <table className="w-full text-left border-collapse font-sans">
                <thead>
                  <tr className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white text-sm font-bold uppercase tracking-wider">
                    <th className="py-5 px-6 w-1/4">Feature</th>
                    <th className="py-5 px-6 w-5/12">What We Provide</th>
                    <th className="py-5 px-6 w-1/3">Impact on Students</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0F766E]/10 text-sm">
                  {service.corePillars.map((pillar, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-[#F8FCFC] transition-colors duration-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FCFC]/50'}`}
                    >
                      <td className="py-6 px-6 font-bold text-[#0F172A] align-top">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center shrink-0">
                            <ResolveIcon name={pillar.icon || "Sparkles"} className="w-5 h-5" />
                          </div>
                          <span className="text-base font-bold text-[#0F172A]">{pillar.feature}</span>
                        </div>
                      </td>
                      <td className="py-6 px-6 text-[#475569] leading-relaxed align-top">
                        <p className="font-medium">{pillar.whatWeProvide}</p>
                      </td>
                      <td className="py-6 px-6 align-top">
                        <div className="inline-flex items-start gap-2 bg-[#0F766E]/08 border border-[#0F766E]/15 text-[#0F766E] px-4 py-3 rounded-2xl font-semibold text-xs sm:text-sm leading-relaxed">
                          <Icons.CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                          <span>{pillar.impactOnStudents}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Cards View */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.corePillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-[#0F766E]/15 shadow-md flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center shrink-0">
                        <ResolveIcon name={pillar.icon || "Sparkles"} className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0F172A]">{pillar.feature}</h3>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block mb-1">What We Provide</span>
                      <p className="text-xs text-[#475569] leading-relaxed font-sans">{pillar.whatWeProvide}</p>
                    </div>
                  </div>

                  <div className="bg-[#0F766E]/08 border border-[#0F766E]/15 p-3.5 rounded-2xl flex items-start gap-2.5">
                    <Icons.CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E] block">Impact on Students</span>
                      <p className="text-xs font-semibold text-[#0F172A] leading-snug">{pillar.impactOnStudents}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SECTION 2.6: PACKAGES GRID (If service.packages exists)
       ═══════════════════════════════════════════ */}
      {service.packages && service.packages.length > 0 && (
        <section className="py-24 bg-white border-b border-[#0F766E]/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-[#14B8A6] text-xs font-bold uppercase tracking-widest font-sans block">
                Tailored Health Protocols
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight">
                {service.packagesTitle || "Health Checkup Packages"}
              </h2>
              <p className="text-base text-[#64748B] font-sans max-w-xl mx-auto">
                {service.packagesSubtitle || "Screening protocols customized based on workforce demographics, industry requirements, and operational exposure."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.packages.map((pkg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`rounded-3xl p-8 border ${pkg.color || 'border-[#0F766E]/15 bg-[#F8FCFC]'} shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0F766E]/10 text-[#0F766E]">
                        {pkg.badge}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white text-[#0F766E] border border-[#0F766E]/15 flex items-center justify-center shadow-sm">
                        <ResolveIcon name={pkg.icon || "Shield"} className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-extrabold text-[#0F172A] group-hover:text-[#0F766E] transition-colors leading-tight">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                      {pkg.subtitle}
                    </p>
                    <div className="pt-4 border-t border-gray-200/60 space-y-3 font-sans">
                      {pkg.items.map((item, iIdx) => (
                        <div key={iIdx} className="space-y-1">
                          <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider block">
                            {item.label}
                          </span>
                          <p className="text-xs text-[#334155] leading-relaxed font-medium">
                            {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link to="/contact" className="block w-full">
                      <Button variant="secondary" className="w-full bg-white hover:bg-[#0F766E] hover:text-white border border-[#0F766E]/20 text-[#0F766E] font-bold text-xs py-3 rounded-xl transition-all duration-300">
                        Select Package
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SECTION 2.7: DETAILED SERVICE OFFERINGS (If service.serviceOfferings exists)
       ═══════════════════════════════════════════ */}
      {service.serviceOfferings && service.serviceOfferings.length > 0 && (
        <section className="py-24 bg-[#F8FCFC] border-b border-[#0F766E]/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-[#0F766E] text-xs font-bold uppercase tracking-widest font-sans block">
                Comprehensive Modules
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight">
                {service.serviceOfferingsTitle || "Our Corporate Offerings"}
              </h2>
              <p className="text-base text-[#64748B] font-sans max-w-xl mx-auto">
                {service.serviceOfferingsSubtitle || "Tailored corporate healthcare offerings built to meet high-volume enterprise needs."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.serviceOfferings.map((offering, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-3xl p-8 border border-[#0F766E]/15 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center shrink-0">
                        <ResolveIcon name={offering.icon || "Sparkles"} className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-display font-extrabold text-[#0F172A] leading-snug">
                        {offering.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-sans">
                      {offering.desc}
                    </p>

                    {offering.points && offering.points.length > 0 && (
                      <div className="space-y-2.5 pt-2 border-t border-gray-100 font-sans">
                        {offering.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2.5">
                            <Icons.CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0 mt-1" />
                            <p className="text-xs text-[#334155] leading-relaxed font-medium">
                              {pt}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SECTION 3: OUR SOLUTION (Horizontal Timeline)
       ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8FCFC] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-[#0F766E] text-xs font-bold uppercase tracking-widest font-sans block">
              Structured Methodology
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight">
              Our Solution
            </h2>
            <p className="text-base text-[#64748B] font-sans max-w-xl mx-auto">
              A comprehensive 5-stage healthcare execution model designed specifically for educational institutions.
            </p>
          </div>

          {/* Horizontal Timeline Connector */}
          <div className="relative mt-12">
            {/* Desktop connecting bar */}
            <div className="hidden lg:block absolute top-[32px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#38BDF8] rounded-full -z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
              {solutionTimeline.map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  {/* Timeline Badge Bubble with animated glow */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#0F766E]/20 text-[#0F766E] shadow-md flex items-center justify-center font-display font-extrabold text-lg group-hover:border-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white transition-all duration-300">
                      <ResolveIcon name={item.icon} className="w-7 h-7" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#14B8A6] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                      {item.step}
                    </span>
                  </div>

                  {/* Step Title & Details */}
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0F766E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed max-w-[200px] mx-auto lg:mx-0 font-sans">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: KEY DELIVERABLES (Large Image Card Grid)
       ═══════════════════════════════════════════ */}
      <section className="py-24 bg-white border-t border-[#0F766E]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-[#14B8A6] text-xs font-bold uppercase tracking-widest font-sans block">
              Complete Scope of Service
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight">
              Key Deliverables &amp; Features
            </h2>
            <p className="text-base text-[#64748B] font-sans max-w-xl mx-auto">
              Every deliverable is backed by certified clinical protocols, pediatric-friendly professionals, and modern healthcare technology.
            </p>
          </div>

          {/* Cards Grid with Alternate Image Placements & Smooth Hover Zoom */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deliverables.map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-[#F8FCFC] rounded-[32px] border border-[#0F766E]/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0F766E]/30 transition-all duration-500 group flex flex-col justify-between"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              >
                {/* Healthcare Illustration with Zoom Effect */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img 
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    src={item.image}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute bottom-4 left-4 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md border border-[#0F766E]/20 text-[#0F766E] flex items-center justify-center shadow-md">
                    <ResolveIcon name={item.icon} className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between text-left space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#0F766E] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed font-sans mt-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-2 text-xs font-bold text-[#0F766E] group-hover:text-[#14B8A6] transition-colors">
                    <span>Explore details</span>
                    <Icons.ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5: BENEFITS SECTION (Glassmorphism Cards)
       ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8FCFC] relative border-t border-[#0F766E]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-widest font-sans block">
              Institutional &amp; Student Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight">
              Key Program Benefits
            </h2>
            <p className="text-base text-[#64748B] font-sans max-w-xl mx-auto">
              Measurable healthcare outcomes that safeguard students, reassure parents, and elevate campus safety standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {benefitsList.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="glass-card glass-card-hover rounded-[28px] p-7 border border-[#0F766E]/10 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center mb-5">
                    <ResolveIcon name={benefit.icon || "CheckCircle2"} className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-2 leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                    {benefit.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6: HOW WE WORK (4-Step Connected Process)
       ═══════════════════════════════════════════ */}
      <section className="py-24 bg-white border-t border-[#0F766E]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-[#0F766E] text-xs font-bold uppercase tracking-widest font-sans block">
              Seamless Integration
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight">
              How We Work
            </h2>
            <p className="text-base text-[#64748B] font-sans max-w-xl mx-auto">
              Our 4-step onboarding workflow ensures zero disruption to daily school operations.
            </p>
          </div>

          <div className="relative mt-8">
            {/* Animated Connector Line for Desktop */}
            <div className="hidden lg:block absolute top-[40px] left-[12%] right-[12%] h-1 bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#38BDF8] rounded-full -z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {howWeWorkSteps.map((step, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 group bg-[#F8FCFC] lg:bg-transparent p-6 lg:p-0 rounded-3xl border border-[#0F766E]/10 lg:border-none"
                >
                  {/* Step Bubble Indicator */}
                  <div className="w-20 h-20 rounded-3xl bg-white border-2 border-[#0F766E]/20 text-[#0F766E] shadow-md flex items-center justify-center font-display font-black text-xl group-hover:bg-[#0F766E] group-hover:text-white transition-all duration-300 shrink-0">
                    <ResolveIcon name={step.icon} className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="inline-block text-xs font-black text-[#14B8A6] tracking-widest font-mono">
                      STEP {step.step}
                    </span>
                    <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0F766E] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed max-w-[220px] mx-auto lg:mx-0 font-sans">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7: FAQ (Accordion in Rounded Cards)
       ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8FCFC] border-t border-[#0F766E]/10">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[#38BDF8] text-xs font-bold uppercase tracking-widest font-sans block">
              Clear &amp; Transparent Information
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-[#64748B] font-sans max-w-lg mx-auto">
              Answers to common queries regarding implementation, staff credentials, and parental data privacy.
            </p>
          </div>

          <div className="space-y-4 text-left font-sans">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-[#0F766E]/12 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:border-[#0F766E]/30"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setOpenFaqIndex(isOpen ? null : idx);
                      }
                    }}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:ring-offset-2 rounded-2xl"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0F172A] pr-4">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full border border-[#0F766E]/20 flex items-center justify-center text-[#0F766E] transform ${isOpen ? 'rotate-180 bg-[#0F766E] text-white border-[#0F766E]' : 'bg-[#F8FCFC]'} transition-all duration-300 shrink-0`}>
                      <Icons.ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#0F766E]/08 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8: FINAL CTA
       ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white border-t border-[#0F766E]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div 
            className="rounded-[36px] p-8 sm:p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl flex flex-col items-center justify-center gap-6"
            style={{
              background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 60%, #0D645E 100%)',
            }}
          >
            {/* Glowing Decorative Background Circles */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full filter blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#38BDF8]/20 rounded-full filter blur-3xl pointer-events-none" />

            <div className="max-w-2xl space-y-4 z-10 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-widest text-teal-100">
                Transform Your Campus Healthcare
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-tight">
                Ready to Upgrade Your School&apos;s Health Services?
              </h2>
              <p className="text-sm md:text-base text-teal-50 font-sans leading-relaxed opacity-95 max-w-xl mx-auto">
                Speak with our medical operations leads to design customized campus medical rooms, checkup schedules, and wellness education programs.
              </p>
            </div>

            {/* Action CTA Buttons */}
            <div className="z-10 pt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button 
                    variant="primary" 
                    className="bg-white text-[#0F766E] hover:bg-teal-50 font-sans font-bold text-sm px-9 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto text-center"
                  >
                    Book Consultation
                  </Button>
                </motion.div>
              </Link>

              <a href="#why-it-matters">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button 
                    variant="secondary" 
                    className="bg-teal-800/40 hover:bg-teal-800/60 text-white border border-white/20 font-sans font-bold text-sm px-9 py-4 rounded-2xl shadow-md transition-all duration-300 w-full sm:w-auto text-center"
                  >
                    Contact Us
                  </Button>
                </motion.div>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
