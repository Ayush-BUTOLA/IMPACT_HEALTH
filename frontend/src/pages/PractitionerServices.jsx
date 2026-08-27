import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Database,
  Award,
  TrendingUp,
  Sparkles,
  ChevronRight,
  X,
  CheckCircle2,
  Clock,
  Activity,
  ShieldCheck,
  BookOpen,
  Users,
  FileText,
  Building2,
  Share2,
  MessageSquare,
  ArrowRight,
  Layers
} from 'lucide-react';
import Button from '../components/Button';

export default function PractitionerServices() {
  const [activeIntersectionIndex, setActiveIntersectionIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "For Practitioners - Where Medical Excellence Meets Operational Innovation | Impact Health";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const intersectionsData = [
    {
      id: 1,
      intersection: "INTERSECTION 1: DIGITAL INFRASTRUCTURE",
      title: "EMR / HIMS Services",
      path: "/services/practitioner-support/emr-hims",
      subtitle: "Seamless clinical documentation and smart health records tailored for modern practice.",
      icon: <Database className="w-6 h-6 text-white" />,
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80",
      themeColor: "from-[#0F766E] to-[#14B8A6]",
      badgeColor: "bg-[#0F766E]/10 text-[#0F766E]",
      bullets: [
        {
          title: "Cloud-Based EMR",
          desc: "Fast, compliant, and intuitive electronic medical records designed to reduce administrative burden.",
          icon: <FileText className="w-5 h-5 text-[#0F766E]" />
        },
        {
          title: "Unified HIMS Operations",
          desc: "Integrated appointment scheduling, billing, inventory, and lab management for clinics and hospitals.",
          icon: <Building2 className="w-5 h-5 text-[#0F766E]" />
        },
        {
          title: "Interoperable Care",
          desc: "Real-time data sharing across diagnostic networks to track patient care histories effortlessly.",
          icon: <Share2 className="w-5 h-5 text-[#0F766E]" />
        }
      ]
    },
    {
      id: 2,
      intersection: "INTERSECTION 2: CLINICAL ADVANCEMENT",
      title: "CME Programs (Continuing Medical Education)",
      path: "/services/practitioner-support/cme-programs",
      subtitle: "Stay at the forefront of medical advancements with accredited, evidence-based learning.",
      icon: <Award className="w-6 h-6 text-white" />,
      image: "https://images.unsplash.com/photo-1544717302-de2938b81485?w=800&auto=format&fit=crop&q=80",
      themeColor: "from-[#0D9488] to-[#2DD4BF]",
      badgeColor: "bg-[#0D9488]/10 text-[#0D9488]",
      bullets: [
        {
          title: "Speciality Workshops",
          desc: "Hands-on training modules and accredited CME courses in partnership with leading global institutions and Pharmaceuticals.",
          icon: <BookOpen className="w-5 h-5 text-[#0D9488]" />
        },
        {
          title: "Point-of-Care Insights",
          desc: "Interactive case studies and clinical updates focused on chronic disease, preventive care, and diagnostics.",
          icon: <Activity className="w-5 h-5 text-[#0D9488]" />
        },
        {
          title: "Peer Knowledge Exchange",
          desc: "Access to closed-door clinical roundtables and multi-speciality tumour boards.",
          icon: <Users className="w-5 h-5 text-[#0D9488]" />
        }
      ]
    },
    {
      id: 3,
      intersection: "INTERSECTION 3: PRACTICE GROWTH",
      title: "Marketing & Patient Services",
      path: "/services/practitioner-support/marketing-patient-services",
      subtitle: "Expand your clinical reach and deliver exceptional patient engagement.",
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      themeColor: "from-[#0F766E] to-[#0284C7]",
      badgeColor: "bg-[#0284C7]/10 text-[#0284C7]",
      bullets: [
        {
          title: "Digital Brand Building",
          desc: "Turnkey solutions for doctor branding, website management, and verified online presence.",
          icon: <Sparkles className="w-5 h-5 text-[#0284C7]" />
        },
        {
          title: "Patient Support Programs (PSP)",
          desc: "Connect your patients to home diagnostics, nursing support, and treatment adherence plans.",
          icon: <Activity className="w-5 h-5 text-[#0284C7]" />
        },
        {
          title: "Retention & Care Management",
          desc: "Automated follow-up systems and health monitoring tools that keep patients connected to your practice.",
          icon: <MessageSquare className="w-5 h-5 text-[#0284C7]" />
        }
      ]
    },
    {
      id: 4,
      intersection: "INTERSECTION 4: CAREER EVOLUTION",
      title: "Trainings & Leadership Programs",
      path: "/services/practitioner-support/trainings-leadership",
      subtitle: "Transition from practitioner to healthcare leader with strategic management development.",
      icon: <Sparkles className="w-6 h-6 text-white" />,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
      themeColor: "from-[#0D9488] to-[#10B981]",
      badgeColor: "bg-[#10B981]/10 text-[#10B981]",
      bullets: [
        {
          title: "Healthcare Leadership Acceleration",
          desc: "Programs tailored for doctors managing teams, clinics, or hospital departments.",
          icon: <Users className="w-5 h-5 text-[#10B981]" />
        },
        {
          title: "Soft Skills & Communication",
          desc: "Training in empathetic patient communication, medico-legal ethics, and crisis handling.",
          icon: <MessageSquare className="w-5 h-5 text-[#10B981]" />
        },
        {
          title: "Research & Publication Mentorship",
          desc: "Support for doctors conducting clinical trials, publishing paper reviews, and generating real-world evidence (RWE).",
          icon: <FileText className="w-5 h-5 text-[#10B981]" />
        }
      ]
    }
  ];

  const whyChooseUs = [
    {
      title: "Less Administrative Overhead",
      desc: "Spend 40% more time on actual patient care by automating clinical records, appointment scheduling, and billing.",
      stat: "40% Time Saved",
      icon: <Clock className="w-8 h-8 text-[#0F766E]" />
    },
    {
      title: "Higher Patient Outcomes",
      desc: "Leverage last-mile diagnostic networks, home sample collection, and post-consultation care loops for accurate care plans.",
      stat: "Pan-India Diagnostics",
      icon: <Activity className="w-8 h-8 text-[#0F766E]" />
    },
    {
      title: "Sustainable Practice Growth",
      desc: "Build a future-ready clinic backed by compliant digital tech, accredited medical education, and verified professional reputation.",
      stat: "Future-Ready Practice",
      icon: <ShieldCheck className="w-8 h-8 text-[#0F766E]" />
    }
  ];

  const currentIntersection = intersectionsData[activeIntersectionIndex];

  const handleNodeClick = (index) => {
    setActiveIntersectionIndex(index);
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
            <span>For Practitioners</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-[#0F172A] tracking-tight leading-[1.15] max-w-4xl mx-auto"
          >
            Where Medical Excellence Meets Operational Innovation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-[#64748B] leading-relaxed max-w-3xl mx-auto font-sans"
          >
            Impact Health integrates practice management, clinical education, patient acquisition, and leadership training into a single ecosystem designed to help practitioners thrive.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: THE PRACTITIONER ECOSYSTEM (ORBITAL CANVAS)
       ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white border-b border-[#0F766E]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[#14B8A6] text-xs font-bold uppercase tracking-widest block font-sans">
              Operational &amp; Clinical Synergy
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight">
              THE PRACTITIONER ECOSYSTEM
            </h2>
            <p className="text-sm text-[#64748B] font-sans">Click on any intersection node to explore program details</p>
          </div>

          {/* CIRCULAR ORBITAL CANVAS (DESKTOP) */}
          <div className="relative w-full max-w-4xl mx-auto aspect-square md:aspect-[16/10] flex items-center justify-center overflow-visible">
            
            {/* SVG Connector Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600">
              <circle className="orbital-path" cx="500" cy="300" r="220" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6 6" />
              
              <line x1="500" y1="300" x2="500" y2="80" stroke="#0F766E" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="500" y1="300" x2="720" y2="300" stroke="#0F766E" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="500" y1="300" x2="500" y2="520" stroke="#0F766E" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="500" y1="300" x2="280" y2="300" stroke="#0F766E" strokeWidth="1.5" strokeOpacity="0.4" />
            </svg>

            {/* Central Hub Image Visual */}
            <div className="relative z-10 w-64 h-64 md:w-[380px] md:h-[380px] rounded-full overflow-hidden border-4 border-white shadow-2xl transition-transform duration-500 hover:scale-105 bg-[#F8FCFC] flex items-center justify-center">
              <img
                src={currentIntersection.image}
                alt={currentIntersection.title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6 text-white text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">{currentIntersection.intersection}</span>
                <h3 className="text-xl font-bold font-display leading-tight">{currentIntersection.title}</h3>
                <p className="text-xs text-slate-200 line-clamp-2 mt-1">{currentIntersection.subtitle}</p>
              </div>
            </div>

            {/* Node 1: Top (Digital Infrastructure) */}
            <button
              onClick={() => handleNodeClick(0)}
              className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 md:-translate-y-8 z-20 group text-center cursor-pointer transition-all duration-300 ${
                activeIntersectionIndex === 0 ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div className="bg-white p-4 rounded-2xl border-2 border-[#0F766E] shadow-xl flex items-center gap-3 min-w-[260px]">
                <div className="w-10 h-10 rounded-xl bg-[#0F766E] text-white flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0F766E]">Intersection 1</span>
                  <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#0F766E] transition-colors leading-snug">EMR / HIMS Services</h4>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0F766E] ml-auto" />
              </div>
            </button>

            {/* Node 2: Right (Clinical Advancement) */}
            <button
              onClick={() => handleNodeClick(1)}
              className={`absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 group text-center cursor-pointer transition-all duration-300 ${
                activeIntersectionIndex === 1 ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div className="bg-white p-4 rounded-2xl border-2 border-[#0D9488] shadow-xl flex items-center gap-3 min-w-[260px]">
                <div className="w-10 h-10 rounded-xl bg-[#0D9488] text-white flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0D9488]">Intersection 2</span>
                  <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#0D9488] transition-colors leading-snug">CME Programs</h4>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0D9488] ml-auto" />
              </div>
            </button>

            {/* Node 3: Bottom (Practice Growth) */}
            <button
              onClick={() => handleNodeClick(2)}
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 md:translate-y-8 z-20 group text-center cursor-pointer transition-all duration-300 ${
                activeIntersectionIndex === 2 ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div className="bg-white p-4 rounded-2xl border-2 border-[#0284C7] shadow-xl flex items-center gap-3 min-w-[260px]">
                <div className="w-10 h-10 rounded-xl bg-[#0284C7] text-white flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0284C7]">Intersection 3</span>
                  <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors leading-snug">Marketing &amp; Patients</h4>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0284C7] ml-auto" />
              </div>
            </button>

            {/* Node 4: Left (Career Evolution) */}
            <button
              onClick={() => handleNodeClick(3)}
              className={`absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 group text-center cursor-pointer transition-all duration-300 ${
                activeIntersectionIndex === 3 ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div className="bg-white p-4 rounded-2xl border-2 border-[#10B981] shadow-xl flex items-center gap-3 min-w-[260px]">
                <div className="w-10 h-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#10B981]">Intersection 4</span>
                  <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#10B981] transition-colors leading-snug">Trainings &amp; Leadership</h4>
                </div>
                <ChevronRight className="w-4 h-4 text-[#10B981] ml-auto" />
              </div>
            </button>
          </div>

          {/* GRID OF THE 4 INTERSECTIONS FOR ALL DEVICES */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {intersectionsData.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#F8FCFC] rounded-3xl p-8 border border-[#0F766E]/15 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${item.badgeColor}`}>
                      {item.intersection}
                    </span>
                    <button
                      onClick={() => handleNodeClick(idx)}
                      className="text-xs font-bold text-[#0F766E] hover:underline flex items-center gap-1"
                    >
                      <span>Explore Overview</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-2xl font-display font-extrabold text-[#0F172A] group-hover:text-[#0F766E] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-sans">
                    {item.subtitle}
                  </p>

                  <div className="space-y-3 pt-2 font-sans">
                    {item.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="bg-white p-4 rounded-2xl border border-[#0F766E]/10 flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-[#F8FCFC] shrink-0 mt-0.5">
                          {b.icon}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#0F172A]">{b.title}</h4>
                          <p className="text-[11px] text-[#64748B] leading-relaxed mt-0.5">{b.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link to={item.path}>
                    <Button
                      variant="secondary"
                      className="w-full bg-white hover:bg-[#0F766E] text-[#0F766E] hover:text-white border border-[#0F766E]/20 font-bold text-xs py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Learn More About {item.title.split(' ')[0]}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: WHY CHOOSE US? (CONVERGENCE VALUE)
       ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8FCFC] border-b border-[#0F766E]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[#0F766E] text-xs font-bold uppercase tracking-widest font-sans block">
              Practitioner Outcomes
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#0F172A] tracking-tight">
              Why Choose Us?
            </h2>
            <p className="text-base text-[#64748B] font-sans leading-relaxed">
              When Technology (EMR), Education (CME), Growth (Marketing), and Leadership (Trainings) converge, doctors gain:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-[#0F766E]/15 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#0F766E] bg-[#0F766E]/10 px-3 py-1 rounded-full mb-3">
                    {item.stat}
                  </span>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-sans">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: FINAL CTA
       ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div
            className="rounded-[36px] p-8 sm:p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl flex flex-col items-center justify-center gap-6"
            style={{
              background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 60%, #0D645E 100%)',
            }}
          >
            <div className="max-w-2xl space-y-4 z-10 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-widest text-teal-100 font-sans">
                Elevate Your Practice
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-tight">
                Ready to Join the Practitioner Ecosystem?
              </h2>
              <p className="text-sm md:text-base text-teal-50 font-sans leading-relaxed opacity-95 max-w-xl mx-auto">
                Connect with our practitioner support team to deploy customizable EMR software, enroll in accredited CME courses, or expand your clinic branding.
              </p>
            </div>

            <div className="z-10 pt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="primary"
                    className="bg-white text-[#0F766E] hover:bg-teal-50 font-sans font-bold text-sm px-9 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto text-center"
                  >
                    Schedule Demo / Consultation
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MODAL DRAWER FOR INTERSECTION DETAILS
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
              <div className={`p-8 bg-gradient-to-r ${currentIntersection.themeColor} text-white relative`}>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-200 block mb-1">
                  {currentIntersection.intersection}
                </span>
                <h3 className="text-2xl font-display font-extrabold">{currentIntersection.title}</h3>
                <p className="text-xs text-teal-50 font-sans mt-2 leading-relaxed max-w-lg">
                  {currentIntersection.subtitle}
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto font-sans">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">Key Program Deliverables:</h4>
                <div className="space-y-4">
                  {currentIntersection.bullets.map((b, idx) => (
                    <div key={idx} className="bg-[#F8FCFC] p-5 rounded-2xl border border-[#0F766E]/10 flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-white text-[#0F766E] shadow-sm shrink-0 mt-0.5">
                        {b.icon}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-[#0F172A]">{b.title}</h5>
                        <p className="text-xs text-[#64748B] leading-relaxed mt-1">{b.desc}</p>
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
