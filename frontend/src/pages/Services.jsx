import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, ShieldCheck, HeartHandshake, Award, ArrowRight, Check } from 'lucide-react';
import PremiumBackground from '../components/PremiumBackground';
import Button from '../components/Button';
import { categoriesData } from '../data/servicesData';

export default function Services() {
  useEffect(() => {
    document.title = "Our Services | Impact Health";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const categories = [
    {
      ...categoriesData["school-health"],
      path: "/services/school-health",
      icon: <Activity className="w-6 h-6 text-[#0F4C81]" />,
      colorClass: "bg-blue-50 text-[#0F4C81]",
    },
    {
      ...categoriesData["corporate-health"],
      path: "/services/corporate-health",
      icon: <ShieldCheck className="w-6 h-6 text-teal-600" />,
      colorClass: "bg-teal-50 text-teal-600",
    },
    {
      ...categoriesData["patient-support"],
      path: "/services/patient-support",
      icon: <HeartHandshake className="w-6 h-6 text-sky-500" />,
      colorClass: "bg-sky-50 text-sky-500",
    },
    {
      ...categoriesData["practitioner-support"],
      path: "/services/practitioner-support",
      icon: <Award className="w-6 h-6 text-indigo-600" />,
      colorClass: "bg-indigo-50 text-indigo-600",
    }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-white">
      <PremiumBackground />

      {/* Hero Section */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div 
            className="max-w-4xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-[#0F4C81]/10 border border-[#0F4C81]/15 text-[#0F4C81] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>Healthcare Infrastructure Portfolio</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 tracking-tight leading-tight">
              Integrated Medical &amp; Wellness Solutions
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed font-sans max-w-2xl mx-auto">
              Impact Health provides comprehensive clinical layouts, occupational screening, home care systems, and practitioner CME/EMR tools designed for maximum compliance, speed, and trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-12 pb-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                className="bg-white rounded-[24px] border border-gray-200/50 p-8 md:p-10 shadow-[0_4px_20px_-4px_rgba(15,76,129,0.03)] hover:-translate-y-1.5 hover:border-[#0F4C81] hover:shadow-[0_12px_35px_-8px_rgba(15,76,129,0.08)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cat.colorClass}`}>
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-gray-900 group-hover:text-[#0F4C81] transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-[#14B8A6] font-semibold mt-0.5 uppercase tracking-wider">{cat.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Category Highlights */}
                  <div className="space-y-2.5 pt-2 border-t border-gray-100">
                    {cat.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-gray-600">
                        <div className="w-4 h-4 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Link to={cat.path}>
                    <Button variant="secondary" className="w-full justify-between hover:bg-[#F8FBFF]/50 border border-gray-200 hover:border-[#0F4C81] text-[#0F4C81] font-semibold py-3 rounded-xl transition-all">
                      <span>Explore Category</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 bg-white">
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
                Not sure which service is right for you?
              </h2>
              <p className="text-sm md:text-base text-slate-100 font-sans leading-relaxed opacity-90">
                Connect with our medical coordinators. We will evaluate your needs and design the optimal setup matching your scale.
              </p>
            </div>

            <div className="z-10 pt-4">
              <a href="https://www.threephih.in/threephih/index.html" target="_blank" rel="noreferrer">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="secondary" className="bg-white text-[#0F4C81] border border-transparent font-sans font-bold text-sm px-8 py-4 rounded-lg shadow-md hover:bg-slate-50 transition-all">
                    Schedule Discovery Consultation
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
