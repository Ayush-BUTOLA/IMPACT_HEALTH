import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import * as Icons from 'lucide-react';
import Button from './Button';
import CtaBand from './CtaBand';
import PageBackground from './PageBackground';

function ResolveIcon({ name, className = 'w-5 h-5' }) {
  const IconComponent = Icons[name] || Icons.CheckCircle2;
  return <IconComponent className={className} />;
}

export default function ServicePageLayout({ service }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [service?.id]);

  if (!service) return null;

  const categoryKey = service.category || 'school-health';
  const themeVariant = categoryKey === 'school-health' ? 'school'
    : categoryKey === 'corporate-health' ? 'corporate'
    : categoryKey === 'patient-support' ? 'patients'
    : 'practitioners';

  const categoryPath = `/services/${categoryKey}`;
  const heroHeadline = service.heroHeadline || service.title;

  const whyMatters = service.whyMatters || {
    title: "Why This Service Matters",
    description: service.description || "Ensuring comprehensive clinical safety, regulatory compliance, and rapid triage support.",
    image: service.image,
    stats: [
      { number: "100%", label: "Clinical Compliance", icon: "ShieldCheck" },
      { number: "Rapid", label: "Triage Response", icon: "Clock" },
      { number: "< 15m", label: "Triage SLA", icon: "Zap" },
      { number: "0-Delay", label: "Parent Alerts", icon: "Bell" }
    ]
  };

  const solutionTimeline = service.solutionTimeline || [
    { step: "01", title: "Assessment", desc: "Audit existing setup, capacity requirements, and local board compliance.", icon: "ClipboardCheck" },
    { step: "02", title: "Implementation", desc: "Deploy certified personnel, equipment, and standardized medical protocols.", icon: "Building2" },
    { step: "03", title: "Monitoring", desc: "Track health trends and maintain real-time clinical logs.", icon: "Activity" },
    { step: "04", title: "Reporting", desc: "Publish monthly health trend reports and confidential incident updates.", icon: "FileBarChart" },
    { step: "05", title: "Continuous Support", desc: "Refresh nursing staff certifications, run CPR drills, and restock supplies.", icon: "HeartHandshake" }
  ];

  const deliverables = service.deliverables || (service.features || []).map((f) => ({
    title: f.title,
    description: f.description,
    icon: f.icon || "CheckCircle2",
    image: service.image
  }));

  const faqs = service.faqs || [
    {
      question: `How does Impact Health deliver ${service.title}?`,
      answer: "All our clinical workflows follow strict medical standard operating procedures, staffed by credentialed healthcare professionals and tracked via secure digital health portals."
    },
    {
      question: "What is the onboarding and setup timeline?",
      answer: "Following the initial assessment and infrastructure audit, deployment typically takes 3 to 7 business days with full emergency equipment calibration."
    },
    {
      question: "How are records and privacy managed?",
      answer: "All patient logs, consultation records, and lab values are encrypted in compliance with DISHA and ISO 9001:2015 privacy benchmarks."
    }
  ];

  const floatingBadges = service.floatingBadges || [
    { text: "Certified Medical Team", icon: "UserCheck" },
    { text: "100% Safety Compliant", icon: "ShieldCheck" },
    { text: "Dedicated Support Network", icon: "HeartPulse" }
  ];

  return (
    <div className={`w-full font-sans text-[#0F172A] theme-${themeVariant} relative overflow-hidden`}>
      <PageBackground variant={themeVariant} showInteractiveDots={true} />

      {/* 1. Hero Section (7:5 Clinical Split Architecture) */}
      <section className="pt-20 pb-16 sm:pt-24 sm:pb-20 border-b border-slate-200/70 bg-white/75 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
            <Link to="/services" className="hover:text-[#0066FF] transition-colors">Services</Link>
            <Icons.ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to={categoryPath} className="hover:text-[#0066FF] transition-colors">{service.categoryName || "Category"}</Link>
            <Icons.ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-none">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Category Live Status Chip */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-blue-50/90 border border-blue-200/80 text-[#0066FF] text-xs font-mono font-semibold shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]"></span>
                </span>
                <span>{service.categoryName || "Healthcare Infrastructure"}</span>
              </div>

              {/* Calibrated Editorial Headline */}
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[46px] text-[#0B132B] tracking-[-0.03em] leading-[1.12]">
                {heroHeadline}
              </h1>

              {/* Clinical Subtitle */}
              {service.subtitle && (
                <p className="text-base sm:text-lg font-semibold text-[#0066FF] tracking-[-0.01em]">
                  {service.subtitle}
                </p>
              )}

              {/* Scannable Value Proposition */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-sans">
                {service.description}
              </p>

              {/* Dual Action Strip (No Alarmist Red!) */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link to="/contact">
                  <Button variant="royal" size="md" withArrow>
                    {service.ctaText || "Book Consultation"}
                  </Button>
                </Link>
                <a href="#clinical-scope">
                  <Button variant="secondary" size="md" className="bg-white hover:bg-slate-50 border-slate-200 text-[#0B132B]">
                    {service.secondaryCtaText || "Explore Scope"}
                  </Button>
                </a>
                <a 
                  href="tel:+919667835909"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-semibold text-slate-600 hover:text-[#0066FF] transition-colors"
                >
                  <Icons.Phone className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>Helpline: +91 9667835909</span>
                </a>
              </div>

              {/* Key Assurance Signals */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-sans">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Icons.ShieldCheck className="w-4 h-4 text-[#059669]" />
                  NABH &amp; ISO Aligned SOPs
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Icons.UserCheck className="w-4 h-4 text-[#0066FF]" />
                  Verified Clinical Personnel
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Icons.Clock className="w-4 h-4 text-[#059669]" />
                  Rapid Turnkey Deployment
                </span>
              </div>

            </div>

            {/* Right Hardware Bezel Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="bezel-outer p-2 shadow-xl bg-slate-100/90 rounded-3xl border border-slate-200/80">
                <div className="bezel-inner rounded-[22px] overflow-hidden aspect-[4/3] bg-slate-100 relative shadow-inner">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover select-none"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Top Verification Badge */}
                  {floatingBadges[0] && (
                    <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200/80 text-xs font-bold text-[#0B132B] shadow-md flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-blue-50 text-[#0066FF] flex items-center justify-center">
                        <ResolveIcon name={floatingBadges[0].icon} className="w-3 h-3 text-[#0066FF]" />
                      </div>
                      <span>{floatingBadges[0].text}</span>
                    </div>
                  )}

                  {/* Floating Bottom Live Protocol Chip */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span className="text-xs font-bold text-[#0B132B] truncate">{service.title}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 shrink-0">
                      Standard Protocol
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Overview Banner (If present in schema) */}
      {service.overviewText && (
        <section className="py-14 sm:py-16 bg-white/70 backdrop-blur-md border-b border-slate-200/70 relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-mono font-semibold text-[#0066FF] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 inline-block">
              Clinical Overview
            </span>
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-sm text-left">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                {service.overviewText}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 3. Why This Service Matters (Clinical Telemetry Metrics) */}
      {whyMatters && (
        <section id="why-it-matters" className="py-16 sm:py-24 bg-white/60 backdrop-blur-md border-b border-slate-200/70 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-mono font-semibold border border-blue-200/60">
                  <Icons.Activity className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>Clinical Rationale</span>
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0B132B] tracking-tight leading-tight">
                  {whyMatters.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-sans max-w-lg">
                  {whyMatters.description}
                </p>
              </div>

              {/* 4 Telemetry Metric Readouts */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {(whyMatters.stats || []).map((stat, idx) => (
                    <div 
                      key={idx} 
                      className="p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/80 hover:border-blue-300/80 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 shadow-xs group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] group-hover:scale-105 group-hover:bg-[#0066FF] group-hover:text-white transition-all duration-200">
                          <ResolveIcon name={stat.icon || "Activity"} className="w-4 h-4" />
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]/40 group-hover:bg-[#0066FF] transition-colors" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-3xl sm:text-4xl text-[#0B132B] tracking-tight">
                          {stat.number}
                        </div>
                        <div className="text-xs font-semibold text-slate-500 font-sans mt-1">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 4. Standardized Execution Journey (Interconnected Progress Rail) */}
      <section id="timeline" className="py-16 sm:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="max-w-3xl space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-mono font-semibold border border-blue-200/60">
              <Icons.GitBranch className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Step-by-Step Delivery</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0B132B] tracking-tight">
              Standardized Execution Journey
            </h2>
            <p className="text-sm text-slate-600 font-sans max-w-2xl leading-relaxed">
              How our medical operations team audits, deploys, and continually oversees this service from initial setup to lifelong care.
            </p>
          </div>

          {/* Stepped Timeline Grid with Connected Progress Rail */}
          <div className="relative">
            {/* Desktop Horizontal Progress Track Line */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-emerald-300 -z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
              {solutionTimeline.map((step, idx) => (
                <div key={idx} className="flex flex-col h-full group">
                  
                  {/* Step Number Indicator Pin */}
                  <div className="w-9 h-9 rounded-xl bg-white border-2 border-[#0066FF] text-[#0066FF] font-mono font-bold text-xs flex items-center justify-center shadow-sm mb-4 mx-auto lg:mx-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors duration-200">
                    {step.step}
                  </div>

                  {/* Step Content Card */}
                  <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-xs hover:border-blue-300/80 hover:shadow-md transition-all duration-200 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-bold text-sm text-[#0B132B]">{step.title}</h4>
                        <ResolveIcon name={step.icon} className="w-4 h-4 text-slate-400 group-hover:text-[#0066FF] transition-colors" />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">{step.desc}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 text-[11px] font-mono font-medium text-slate-400">
                      Phase {step.step} Protocol
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. Deliverables & Clinical Scope (Responsive Bento Cards) */}
      {deliverables.length > 0 && (
        <section id="clinical-scope" className="py-16 sm:py-24 bg-white/70 backdrop-blur-md border-y border-slate-200/70 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            
            <div className="max-w-3xl space-y-3 mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#059669] text-xs font-mono font-semibold border border-emerald-200/60">
                <Icons.CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                <span>Verified Deliverables</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0B132B] tracking-tight">
                Comprehensive Equipment &amp; Clinical Scope
              </h2>
              <p className="text-sm text-slate-600 font-sans max-w-2xl leading-relaxed">
                Every component, equipment piece, professional certification, and digital infrastructure asset included with this service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {deliverables.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/80 hover:border-blue-300/80 hover:shadow-md transition-all duration-200 space-y-3.5 group shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-[#0066FF] shrink-0 group-hover:scale-105 group-hover:bg-[#0066FF] group-hover:text-white transition-all duration-200">
                      <ResolveIcon name={item.icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-[#0B132B] group-hover:text-[#0066FF] transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5 font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Clinical Standard</span>
                    <Icons.Check className="w-3.5 h-3.5 text-[#059669]" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 6. Core Pillars Framework (Executive Clinical Ledger) */}
      {service.corePillars && service.corePillars.length > 0 && (
        <section className="py-16 sm:py-24 border-b border-slate-200/70 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            
            <div className="max-w-3xl space-y-3 mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-mono font-semibold border border-blue-200/60">
                <Icons.Layers className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Integrated Framework</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0B132B] tracking-tight">
                {service.corePillarsTitle || "Core Pillars of Clinical Care"}
              </h2>
              {service.corePillarsSubtitle && (
                <p className="text-sm text-slate-600 font-sans max-w-2xl leading-relaxed">
                  {service.corePillarsSubtitle}
                </p>
              )}
            </div>

            {/* Desktop Structured Ledger Table */}
            <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200/80 shadow-md bg-white/95 backdrop-blur-md">
              <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50/90 text-slate-700 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
                    <th className="py-4 px-6 w-1/4">Clinical Feature</th>
                    <th className="py-4 px-6 w-5/12">Operational Deliverable</th>
                    <th className="py-4 px-6 w-1/3">Direct Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {service.corePillars.map((pillar, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/20 transition-colors">
                      <td className="py-5 px-6 font-bold text-[#0B132B] align-top">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] shrink-0">
                            <ResolveIcon name={pillar.icon || "Sparkles"} className="w-3.5 h-3.5 text-[#0066FF]" />
                          </div>
                          <span>{pillar.feature}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-slate-600 align-top leading-relaxed">
                        {pillar.whatWeProvide}
                      </td>
                      <td className="py-5 px-6 align-top">
                        <div className="inline-flex items-center gap-2 text-[#059669] font-medium bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60 text-xs">
                          <Icons.CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>{pillar.impactOnStudents}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Responsive Cards */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.corePillars.map((pillar, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center gap-2.5 font-bold text-sm text-[#0B132B]">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] shrink-0">
                      <ResolveIcon name={pillar.icon || "Sparkles"} className="w-3.5 h-3.5 text-[#0066FF]" />
                    </div>
                    <span>{pillar.feature}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">What We Provide</span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{pillar.whatWeProvide}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-xs font-semibold text-[#059669] flex items-center gap-1.5">
                    <Icons.CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{pillar.impactOnStudents}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 7. Health Packages (If service.packages exists) */}
      {service.packages && service.packages.length > 0 && (
        <section className="py-16 sm:py-24 bg-white/70 backdrop-blur-md border-b border-slate-200/70 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            <div className="max-w-3xl space-y-3 mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-mono font-semibold border border-blue-200/60">
                <Icons.Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Tailored Health Protocols</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0B132B] tracking-tight">
                {service.packagesTitle || "Health Checkup Packages"}
              </h2>
              {service.packagesSubtitle && (
                <p className="text-sm text-slate-600 font-sans max-w-2xl leading-relaxed">
                  {service.packagesSubtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.packages.map((pkg, idx) => (
                <div key={idx} className="bezel-outer p-1.5 rounded-3xl bg-slate-100/90 border border-slate-200/80 shadow-md flex flex-col">
                  <div className="bezel-inner rounded-[22px] p-6 sm:p-7 bg-white flex flex-col justify-between h-full space-y-5">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-display font-bold text-lg text-[#0B132B]">{pkg.name}</h3>
                        {pkg.price && <div className="text-2xl font-bold font-mono text-[#0066FF] mt-1">{pkg.price}</div>}
                      </div>

                      {pkg.tests && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#0066FF] text-xs font-mono font-semibold border border-blue-100">
                          <Icons.TestTube2 className="w-3.5 h-3.5" />
                          <span>{pkg.tests} Clinical Tests Included</span>
                        </div>
                      )}

                      {pkg.features && (
                        <ul className="space-y-2.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                          {pkg.features.map((f, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <Icons.CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                              <span className="leading-snug">{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <Link to="/contact">
                        <Button variant="royal" size="sm" className="w-full justify-center" withArrow>
                          <span>Select Package</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Accessible FAQ Accordion */}
      <section className="py-16 sm:py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="space-y-3 mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-mono font-semibold border border-blue-200/60">
              <Icons.HelpCircle className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Service FAQ</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0B132B] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
              Clear answers regarding clinical staffing, deployment timelines, regulatory compliance, and EMR data security.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`rounded-2xl border transition-all duration-200 bg-white/95 backdrop-blur-sm overflow-hidden ${
                    isOpen 
                      ? 'border-[#0066FF]/40 ring-2 ring-[#0066FF]/10 shadow-sm' 
                      : 'border-slate-200/80 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 flex items-center justify-between text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-[#0B132B] pr-4 leading-snug">
                      {faq.question}
                    </span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen ? 'bg-[#0066FF] text-white rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <Icons.ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-sans">
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

      {/* 9. High-Contrast Clinical Consultation CTA Band */}
      <CtaBand />
    </div>
  );
}
