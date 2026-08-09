import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import PremiumBackground from './PremiumBackground';
import Button from './Button';
import { servicesData } from '../data/servicesData';

function ResolveIcon({ name, className = 'w-6 h-6' }) {
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
}

export default function CategoryPageLayout({ categoryKey, data }) {
  // Extract all subservices in this category from servicesData
  const categorySubservices = servicesData[categoryKey] 
    ? Object.values(servicesData[categoryKey]) 
    : [];

  return (
    <div className="relative w-full overflow-hidden bg-white">
      <PremiumBackground />

      {/* Hero Section */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div 
                className="inline-flex items-center gap-2 bg-[#0F4C81]/10 border border-[#0F4C81]/15 text-[#0F4C81] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans"
                variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              >
                <Icons.Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>Impact Health Services</span>
              </motion.div>

              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 tracking-tight leading-none"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
              >
                {data.title}
              </motion.h1>

              <motion.p 
                className="text-lg md:text-xl text-gray-600 leading-relaxed font-sans font-medium"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                {data.subtitle}
              </motion.p>

              <motion.p 
                className="text-base text-gray-500 leading-relaxed font-sans opacity-95"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                {data.description}
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <a href="https://www.threephih.in/threephih/index.html" target="_blank" rel="noreferrer">
                  <Button variant="primary" className="bg-[#0F4C81] text-white font-sans font-semibold text-sm px-8 py-4 rounded-lg shadow-sm w-full sm:w-auto">
                    {data.ctaText}
                  </Button>
                </a>
                <a href="#services-list">
                  <Button variant="secondary" className="bg-white border border-gray-200 text-[#0F4C81] hover:bg-[#F8FBFF]/50 font-sans font-semibold text-sm px-8 py-4 rounded-lg w-full sm:w-auto">
                    Explore Solutions
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* Right Image */}
            <motion.div 
              className="lg:col-span-5 relative"
              variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.2 } } }}
            >
              <div className="bg-white rounded-[32px] p-3 shadow-md border border-gray-200/40 overflow-hidden group">
                <img 
                  alt={data.title}
                  className="w-full h-[320px] md:h-[400px] object-cover rounded-[24px] transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  src={data.image}
                  loading="eager"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-[#F8FBFF] border-y border-gray-200/60 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[#14B8A6] text-xs font-bold uppercase tracking-widest font-sans block">Healthcare Mandate</span>
              <h2 className="text-3xl font-display font-bold text-gray-900 tracking-tight">Scope of Care</h2>
            </div>
            <div className="lg:col-span-7 bg-white rounded-[24px] border border-gray-200/40 p-8 shadow-sm font-sans">
              <p className="text-sm text-gray-600 leading-relaxed">
                {data.overview}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section id="services-list" className="py-24 bg-white text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-[#2AA8FF] text-xs font-bold uppercase tracking-widest font-sans block">Clinical Solutions</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 tracking-tight">Available Programs</h2>
            <p className="text-sm text-gray-600 font-sans leading-relaxed">
              Browse through our customized clinical, technology, and operational modules. Each program includes full-service tracking and professional certified personnel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-sans">
            {categorySubservices.map((sub, idx) => (
              <motion.div
                key={sub.id}
                className="bg-white rounded-[24px] border border-gray-200/60 p-8 shadow-[0_4px_20px_-4px_rgba(15,76,129,0.03)] hover:-translate-y-1.5 hover:border-[#0F4C81] hover:shadow-[0_12px_35px_-8px_rgba(15,76,129,0.08)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <div>
                  <div className="w-12 h-12 rounded-[16px] bg-[#0F4C81]/5 text-[#0F4C81] flex items-center justify-center mb-6">
                    {sub.features && sub.features[0] ? (
                      <ResolveIcon name={sub.features[0].icon} className="w-6 h-6" />
                    ) : (
                      <Icons.Activity className="w-6 h-6" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0F4C81] transition-colors mb-2">
                    {sub.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-8">
                    {sub.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link 
                    to={`/services/${categoryKey}/${sub.id}`}
                    className="text-xs font-semibold text-[#0F4C81] flex items-center gap-1 hover:underline w-full justify-between"
                  >
                    <span>View program details</span>
                    <Icons.ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights & Benefits Checklist */}
      <section className="py-20 bg-[#F8FBFF] border-y border-gray-200/60 text-left font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[#14B8A6] text-xs font-bold uppercase tracking-widest block">Value &amp; SLA Delivery</span>
              <h2 className="text-3xl font-display font-bold text-gray-900 tracking-tight">Clinical Standards</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We coordinate healthcare services through professional networks to ensure full compliance and continuous quality loops.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.highlights.map((h, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200/40 p-6 shadow-sm flex flex-col gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center shrink-0">
                    <Icons.Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                    {h}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div 
            className="rounded-[32px] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-md flex flex-col items-center justify-center gap-6"
            style={{
              background: 'linear-gradient(135deg, #0F4C81 0%, #14B8A6 100%)',
            }}
          >
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-36 -mt-36 filter blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2AA8FF]/20 rounded-full -mr-36 -mb-36 filter blur-3xl pointer-events-none" />

            <div className="max-w-2xl space-y-4 z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
                Get Started with {data.title}
              </h2>
              <p className="text-sm md:text-base text-slate-100 font-sans leading-relaxed opacity-90">
                Setup custom deployments, schedule consultation programs, or migrate to digital scheduling databases today.
              </p>
            </div>

            <div className="z-10 pt-4">
              <a href="https://www.threephih.in/threephih/index.html" target="_blank" rel="noreferrer">
                <Button variant="secondary" className="bg-white text-[#0F4C81] border border-transparent font-sans font-bold text-sm px-8 py-4 rounded-lg shadow-md hover:bg-slate-50 transition-all">
                  Schedule Consultation Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
