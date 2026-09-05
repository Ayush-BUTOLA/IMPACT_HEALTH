import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import Button from './Button';
import PageBackground from './PageBackground';
import CtaBand from './CtaBand';
import { servicesData } from '../data/servicesData';

function ResolveIcon({ name, className = 'w-5 h-5' }) {
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
}

export default function CategoryPageLayout({ categoryKey, data }) {
  const categorySubservices = servicesData[categoryKey] 
    ? Object.values(servicesData[categoryKey]) 
    : [];

  const themeVariant = categoryKey === 'school-health' ? 'school'
    : categoryKey === 'corporate-health' ? 'corporate'
    : categoryKey === 'patient-support' ? 'patients'
    : 'practitioners';

  return (
    <div className={`relative w-full overflow-hidden font-sans text-[#0F172A] theme-${themeVariant}`}>
      <PageBackground variant={themeVariant} showInteractiveDots={true} />

      {/* 1. Hero Section (7:5 Clinical Split Architecture) */}
      <section className="pt-20 pb-16 sm:pt-24 sm:pb-20 border-b border-slate-200/70 bg-white/75 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
            <Link to="/services" className="hover:text-[#0066FF] transition-colors">Services</Link>
            <Icons.ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold">{data.title}</span>
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
                <span>Healthcare Infrastructure Division</span>
              </div>

              {/* Calibrated Editorial Headline */}
              <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#0B132B] tracking-[-0.03em] leading-[1.1]">
                {data.title}
              </h1>

              {/* Clinical Subtitle */}
              {data.subtitle && (
                <p className="text-base sm:text-lg font-semibold text-[#0066FF] tracking-[-0.01em]">
                  {data.subtitle}
                </p>
              )}

              {/* Scannable Value Proposition */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-xl">
                {data.description}
              </p>

              {/* Dual Action Strip */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link to="/contact">
                  <Button variant="royal" size="md" withArrow>
                    {data.ctaText || "Book Consultation"}
                  </Button>
                </Link>
                <a href="#services-list">
                  <Button variant="secondary" size="md" className="bg-white hover:bg-slate-50 border-slate-200 text-[#0B132B]">
                    Explore {categorySubservices.length} Solutions
                  </Button>
                </a>
                <a 
                  href="tel:+919667835909"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-semibold text-slate-600 hover:text-[#0066FF] transition-colors"
                >
                  <Icons.Phone className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>Contact Us: +91 9667835909</span>
                </a>
              </div>

              {/* Key Assurance Signals */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-sans">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Icons.ShieldCheck className="w-4 h-4 text-[#059669]" />
                  100% Institutional Compliance
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Icons.UserCheck className="w-4 h-4 text-[#0066FF]" />
                  Certified Clinical Practitioners
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Icons.Award className="w-4 h-4 text-[#059669]" />
                  ISO 9001:2015 Standards
                </span>
              </div>

            </div>

            {/* Right Hardware Bezel Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="bezel-outer p-2 shadow-xl bg-slate-100/90 rounded-3xl border border-slate-200/80">
                <div className="bezel-inner rounded-[22px] overflow-hidden aspect-[4/3] bg-slate-100 relative shadow-inner">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-full object-cover select-none"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Top Verification Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200/80 text-xs font-bold text-[#0B132B] shadow-md flex items-center gap-2">
                    <Icons.ShieldCheck className="w-4 h-4 text-[#059669]" />
                    <span>Accredited Healthcare Delivery</span>
                  </div>

                  {/* Floating Bottom Program Count Chip */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span className="text-xs font-bold text-[#0B132B] truncate">{data.title}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 shrink-0">
                      {categorySubservices.length} Programs
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Scope of Care / Clinical Mandate Section */}
      <section className="py-16 sm:py-20 bg-white/65 backdrop-blur-md border-b border-slate-200/70 text-left relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-mono font-semibold border border-blue-200/60">
                <Icons.Activity className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Healthcare Mandate</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0B132B] tracking-tight">
                Scope of Care &amp; Operational Standards
              </h2>
            </div>
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-xs">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                {data.overview}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Subservices Grid */}
      <section id="services-list" className="py-16 sm:py-24 text-left relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-mono font-semibold border border-blue-200/60">
              <Icons.Layers className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Standardized Solutions</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0B132B] tracking-tight">
              Available Clinical Programs
            </h2>
            <p className="text-sm text-slate-600 font-sans leading-relaxed">
              Explore customized clinical, technology, and operational modules. Each program includes turnkey deployment, certified personnel, real-time logging, and emergency protocol oversight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {categorySubservices.map((sub) => (
              <div 
                key={sub.id} 
                className="bezel-outer p-1.5 rounded-3xl bg-slate-100/90 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300/80 transition-all duration-200 flex flex-col group"
              >
                <div className="bezel-inner rounded-[22px] p-6 sm:p-7 bg-white flex flex-col justify-between h-full space-y-5">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#0066FF] flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:bg-[#0066FF] group-hover:text-white transition-all duration-200">
                        {sub.features && sub.features[0] ? (
                          <ResolveIcon name={sub.features[0].icon} className="w-5 h-5" />
                        ) : (
                          <Icons.Activity className="w-5 h-5" />
                        )}
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-slate-400">
                        {sub.deliverables ? `${sub.deliverables.length} Deliverables` : 'Clinical Standard'}
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-[#0B132B] group-hover:text-[#0066FF] transition-colors leading-snug">
                      {sub.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {sub.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <Link to={`/services/${categoryKey}/${sub.id}`}>
                      <Button variant="ghost" size="sm" className="w-full justify-between text-xs font-bold text-[#0066FF] hover:bg-blue-50" withArrow>
                        <span>View Program Protocol</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Consultation CTA */}
      <CtaBand />
    </div>
  );
}
