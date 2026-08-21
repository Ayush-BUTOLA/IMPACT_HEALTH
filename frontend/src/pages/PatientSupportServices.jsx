import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Stethoscope,
  Activity,
  HeartHandshake,
  Pill,
  CheckCircle2,
  ChevronRight,
  X,
  PhoneCall,
  Calendar,
  Award,
  TestTube,
  ShieldCheck,
  FileCheck,
  UserCheck,
  Syringe,
  Home,
  Truck,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function PatientSupportServices() {
  const [activeCircleIndex, setActiveCircleIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "For Patients - Healthcare That Revolves Around You | Impact Health";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const circlesData = [
    {
      id: 1,
      number: "CIRCLE 1",
      title: "Consultations & Expert Opinions",
      subtitle: "Whether you need quick advice from home or an in-person physical examination, we coordinate your entire consultation journey.",
      icon: <Stethoscope className="w-6 h-6 text-white" />,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80",
      themeColor: "from-[#0F766E] to-[#14B8A6]",
      badgeColor: "bg-[#0F766E]/10 text-[#0F766E]",
      services: [
        {
          title: "Teleconsultations (24/7 Virtual Care)",
          desc: "Connect with verified general physicians and specialists within minutes via audio or video from the comfort of your home.",
          icon: <PhoneCall className="w-5 h-5 text-[#0F766E]" />
        },
        {
          title: "In-Clinic & At-Hospital Consultations",
          desc: "Priority appointment bookings and streamlined queue management at partner clinics and super-speciality hospitals near you.",
          icon: <Calendar className="w-5 h-5 text-[#0F766E]" />
        },
        {
          title: "Expert Second Opinions",
          desc: "Facing a major diagnosis or surgery? Get unbiased, multi-speciality reviews from leading medical experts to make informed decisions with confidence.",
          icon: <Award className="w-5 h-5 text-[#0F766E]" />
        }
      ]
    },
    {
      id: 2,
      number: "CIRCLE 2",
      title: "Diagnostics & Lab Services",
      subtitle: "Accurate diagnostics form the bedrock of effective treatment. We ensure your testing is timely, painless, and transparent.",
      icon: <Activity className="w-6 h-6 text-white" />,
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80",
      themeColor: "from-[#0D9488] to-[#2DD4BF]",
      badgeColor: "bg-[#0D9488]/10 text-[#0D9488]",
      services: [
        {
          title: "At-Home Sample Collection",
          desc: "Phlebotomists follow strict hygiene protocols to collect blood, urine, and swab samples directly from your home across 200+ cities.",
          icon: <TestTube className="w-5 h-5 text-[#0D9488]" />
        },
        {
          title: "Comprehensive Diagnostic Packages",
          desc: "Full-body health checkups, preventative screening, and specialised chronic monitoring (Diabetes, Thyroid, Cardiac, PCOS).",
          icon: <ShieldCheck className="w-5 h-5 text-[#0D9488]" />
        },
        {
          title: "Radiology & Advanced Imaging",
          desc: "Partnered diagnostic centres for seamless booking of X-rays, USGs, CT scans, and MRIs with fast digital report delivery.",
          icon: <FileCheck className="w-5 h-5 text-[#0D9488]" />
        }
      ]
    },
    {
      id: 3,
      number: "CIRCLE 3",
      title: "At-Home Care & Elderly Support",
      subtitle: "Complex care doesn't always require a hospital stay. We bring trained nurses, preventive care, and eldercare professionals to your doorstep.",
      icon: <HeartHandshake className="w-6 h-6 text-white" />,
      image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80",
      themeColor: "from-[#0F766E] to-[#0284C7]",
      badgeColor: "bg-[#0284C7]/10 text-[#0284C7]",
      services: [
        {
          title: "Elderly Care Programs",
          desc: "Comprehensive support for senior citizens, including routine vitals tracking, mobility support, chronic disease management, and doctor visits.",
          icon: <UserCheck className="w-5 h-5 text-[#0284C7]" />
        },
        {
          title: "Vaccinations at Home",
          desc: "Stay protected with safe, cold-chain-maintained vaccinations (Flu, Typhoid, Hepatitis, HPV, Adult Boosters) administered by certified staff.",
          icon: <Syringe className="w-5 h-5 text-[#0284C7]" />
        },
        {
          title: "Home Nursing & Recovery",
          desc: "Post-operative care, wound dressing, IV fluids, and physiotherapist visits tailored for comfortable home recovery.",
          icon: <Home className="w-5 h-5 text-[#0284C7]" />
        }
      ]
    },
    {
      id: 4,
      number: "CIRCLE 4",
      title: "Pharmacy & Medicines",
      subtitle: "Genuine Medications Delivered Without the Hassle. Never miss a dose with our integrated pharmacy network and automated medication workflows.",
      icon: <Pill className="w-6 h-6 text-white" />,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80",
      themeColor: "from-[#0D9488] to-[#10B981]",
      badgeColor: "bg-[#10B981]/10 text-[#10B981]",
      services: [
        {
          title: "Doorstep Medicine Delivery",
          desc: "Upload your prescription to receive genuine, temperature-controlled medicines delivered straight to your home.",
          icon: <Truck className="w-5 h-5 text-[#10B981]" />
        },
        {
          title: "Chronic Refill Management",
          desc: "Timely reminders and automated monthly refills for hypertension, diabetes, and other chronic diseases.",
          icon: <Clock className="w-5 h-5 text-[#10B981]" />
        },
        {
          title: "Exclusive Discounts",
          desc: "Save on essential medications, healthcare devices, and daily wellness supplies.",
          icon: <Sparkles className="w-5 h-5 text-[#10B981]" />
        }
      ]
    }
  ];

  const currentCircle = circlesData[activeCircleIndex];

  const handleNodeClick = (index) => {
    setActiveCircleIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FCFC] text-[#0F172A] font-sans overflow-hidden">

      {/* ═══════════════════════════════════════════
          SECTION 1: HERO & HEADER
       ═══════════════════════════════════════════ */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 bg-gradient-to-b from-[#0F766E]/08 via-[#14B8A6]/05 to-transparent border-b border-[#0F766E]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider font-sans shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-ping" />
            <span>360° Patient Services</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-[#0F172A] tracking-tight leading-[1.15] max-w-4xl mx-auto"
          >
            Healthcare That Revolves Around You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl font-medium text-[#0F766E] font-sans"
          >
            Simple, Connected &amp; Compassionate
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base md:text-lg text-[#64748B] leading-relaxed max-w-3xl mx-auto font-sans"
          >
            From instant tele-consultations and home lab tests to specialised elderly care and doorstep medicine delivery, Impact Health brings 360° healthcare right to your home and neighbourhood.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: INTERACTIVE ORBITAL ECOSYSTEM CANVAS
       ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white border-b border-[#0F766E]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[#14B8A6] text-xs font-bold uppercase tracking-widest block font-sans">
              Integrated Patient Care Pillars
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight">
              Explore Our Patient Ecosystem
            </h2>
            <p className="text-sm text-[#64748B] font-sans">Click on any circle node to explore detailed services</p>
          </div>

          {/* CIRCULAR ORBITAL CANVAS (DESKTOP) */}
          <div className="relative w-full max-w-4xl mx-auto aspect-square md:aspect-[16/10] flex items-center justify-center overflow-visible">
            
            {/* SVG Connector Orbital Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600">
              <circle className="orbital-path" cx="500" cy="300" r="220" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6 6" />
              
              {/* Connector lines to center */}
              <line x1="500" y1="300" x2="500" y2="80" stroke="#0F766E" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="500" y1="300" x2="720" y2="300" stroke="#0F766E" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="500" y1="300" x2="500" y2="520" stroke="#0F766E" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="500" y1="300" x2="280" y2="300" stroke="#0F766E" strokeWidth="1.5" strokeOpacity="0.4" />
            </svg>

            {/* Central Hub Image & Visual */}
            <div className="relative z-10 w-64 h-64 md:w-[380px] md:h-[380px] rounded-full overflow-hidden border-4 border-white shadow-2xl transition-transform duration-500 hover:scale-105 bg-[#F8FCFC] flex items-center justify-center">
              <img
                src={currentCircle.image}
                alt={currentCircle.title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">{currentCircle.number}</span>
                <h3 className="text-xl font-bold font-display leading-tight">{currentCircle.title}</h3>
                <p className="text-xs text-slate-200 line-clamp-2 mt-1">{currentCircle.subtitle}</p>
              </div>
            </div>

            {/* Node 1: Top (Consultations & Expert Opinions) */}
            <button
              onClick={() => handleNodeClick(0)}
              className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 md:-translate-y-8 z-20 group text-center cursor-pointer transition-all duration-300 ${
                activeCircleIndex === 0 ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div className="bg-white p-4 rounded-2xl border-2 border-[#0F766E] shadow-xl flex items-center gap-3 min-w-[240px]">
                <div className="w-10 h-10 rounded-xl bg-[#0F766E] text-white flex items-center justify-center shrink-0">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0F766E]">Circle 1</span>
                  <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#0F766E] transition-colors leading-snug">Consultations</h4>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0F766E] ml-auto" />
              </div>
            </button>

            {/* Node 2: Right (Diagnostics & Lab Services) */}
            <button
              onClick={() => handleNodeClick(1)}
              className={`absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 group text-center cursor-pointer transition-all duration-300 ${
                activeCircleIndex === 1 ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div className="bg-white p-4 rounded-2xl border-2 border-[#0D9488] shadow-xl flex items-center gap-3 min-w-[240px]">
                <div className="w-10 h-10 rounded-xl bg-[#0D9488] text-white flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0D9488]">Circle 2</span>
                  <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#0D9488] transition-colors leading-snug">Diagnostics &amp; Labs</h4>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0D9488] ml-auto" />
              </div>
            </button>

            {/* Node 3: Bottom (At-Home Care & Elderly Support) */}
            <button
              onClick={() => handleNodeClick(2)}
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 md:translate-y-8 z-20 group text-center cursor-pointer transition-all duration-300 ${
                activeCircleIndex === 2 ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div className="bg-white p-4 rounded-2xl border-2 border-[#0284C7] shadow-xl flex items-center gap-3 min-w-[240px]">
                <div className="w-10 h-10 rounded-xl bg-[#0284C7] text-white flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0284C7]">Circle 3</span>
                  <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors leading-snug">At-Home &amp; Elderly</h4>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0284C7] ml-auto" />
              </div>
            </button>

            {/* Node 4: Left (Pharmacy & Medicines) */}
            <button
              onClick={() => handleNodeClick(3)}
              className={`absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 group text-center cursor-pointer transition-all duration-300 ${
                activeCircleIndex === 3 ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div className="bg-white p-4 rounded-2xl border-2 border-[#10B981] shadow-xl flex items-center gap-3 min-w-[240px]">
                <div className="w-10 h-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center shrink-0">
                  <Pill className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#10B981]">Circle 4</span>
                  <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#10B981] transition-colors leading-snug">Pharmacy &amp; Delivery</h4>
                </div>
                <ChevronRight className="w-4 h-4 text-[#10B981] ml-auto" />
              </div>
            </button>
          </div>

          {/* GRID OF THE 4 CIRCLES FOR MOBILE & EXPANDED VIEW */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {circlesData.map((circle, idx) => (
              <motion.div
                key={circle.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#F8FCFC] rounded-3xl p-8 border border-[#0F766E]/15 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${circle.badgeColor}`}>
                      {circle.number}
                    </span>
                    <button
                      onClick={() => handleNodeClick(idx)}
                      className="text-xs font-bold text-[#0F766E] hover:underline flex items-center gap-1"
                    >
                      <span>View Full Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-2xl font-display font-extrabold text-[#0F172A] group-hover:text-[#0F766E] transition-colors">
                    {circle.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-sans">
                    {circle.subtitle}
                  </p>

                  <div className="space-y-3 pt-2">
                    {circle.services.map((srv, sIdx) => (
                      <div key={sIdx} className="bg-white p-4 rounded-2xl border border-[#0F766E]/10 flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-[#F8FCFC] shrink-0 mt-0.5">
                          {srv.icon}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#0F172A]">{srv.title}</h4>
                          <p className="text-[11px] text-[#64748B] leading-relaxed mt-0.5">{srv.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: PATIENT SUPPORT PROGRAMS (PSP) BANNER
       ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[#F8FCFC] border-b border-[#0F766E]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-gradient-to-br from-[#0F766E] via-[#0D645E] to-[#14B8A6] rounded-[36px] p-8 sm:p-12 md:p-16 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
            <div className="space-y-4 max-w-2xl">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-teal-100 font-sans">
                Specialty Therapy &amp; Adherence
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight leading-tight">
                Looking for Specialized Patient Support Programs (PSPs)?
              </h2>
              <p className="text-xs sm:text-sm text-teal-50 leading-relaxed font-sans opacity-90">
                We partner with pharmaceutical companies, CSR initiatives, and healthcare providers to offer end-to-end specialty drug logistics, at-home nursing administration, and treatment adherence tracking.
              </p>
            </div>

            <Link to="/patient-support-programs" className="shrink-0 w-full sm:w-auto">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="primary"
                  className="bg-white text-[#0F766E] hover:bg-teal-50 font-sans font-bold text-sm px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center gap-2"
                >
                  <span>Explore PSP Programs</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MODAL DRAWER FOR CIRCLE DETAILS
       ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden relative border border-[#0F766E]/20 text-left"
            >
              {/* Modal Header */}
              <div className={`p-8 bg-gradient-to-r ${currentCircle.themeColor} text-white relative`}>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="text-xs font-bold uppercase tracking-widest text-teal-200 block mb-1">
                  {currentCircle.number}
                </span>
                <h3 className="text-2xl font-display font-extrabold">{currentCircle.title}</h3>
                <p className="text-xs text-teal-50 font-sans mt-2 leading-relaxed max-w-lg">
                  {currentCircle.subtitle}
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto font-sans">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">Key Services Included:</h4>
                <div className="space-y-4">
                  {currentCircle.services.map((srv, idx) => (
                    <div key={idx} className="bg-[#F8FCFC] p-5 rounded-2xl border border-[#0F766E]/10 flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-white text-[#0F766E] shadow-sm shrink-0 mt-0.5">
                        {srv.icon}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-[#0F172A]">{srv.title}</h5>
                        <p className="text-xs text-[#64748B] leading-relaxed mt-1">{srv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    variant="primary"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-[#0F766E] hover:bg-[#0D645E] text-white font-sans font-bold text-xs px-6 py-3 rounded-xl shadow-sm"
                  >
                    Close Overview
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
