import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Activity,
  ShieldCheck,
  HeartHandshake,
  Award,
  ArrowRight,
  Check,
  Phone,
  ChevronRight,
  Sparkles,
  Stethoscope,
  Building2,
  Users,
  Calendar,
  Layers
} from 'lucide-react';
import Button from '../components/Button';
import PageBackground from '../components/PageBackground';
import CtaBand from '../components/CtaBand';

export default function Services() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const schoolHealthServices = [
    { title: "Medical Room", path: "/services/school-health/medical-room", desc: "Gold-standard infirmary infrastructure & pediatric nursing" },
    { title: "Health Education and Awareness", path: "/services/school-health/health-education", desc: "Curriculum-aligned student & adolescent health workshops" },
    { title: "Health Checkups", path: "/services/school-health/health-checkups", desc: "NABL specialist screenings (Vision, Dental, Pediatric, ENT)" },
    { title: "Nutrition Program", path: "/services/school-health/nutrition-program", desc: "Clinical BMI assessments & cafeteria meal audits" },
    { title: "Mental Wellness", path: "/services/school-health/mental-wellness", desc: "Confidential student counseling & behavioral health" },
    { title: "Ambulance & Emergency Services", path: "/services/school-health/emergency-services", desc: "On-campus basic life support & priority transfer networks" }
  ];

  const corporateHealthServices = [
    { title: "Pre-employment & Annual Health Checkups", path: "/services/corporate-health/pre-employment-checkups", desc: "Pan-India diagnostic screening & automated HR health ledgers" },
    { title: "FSSAI Medical Checkups", path: "/services/corporate-health/fssai-checkups", desc: "Mandatory food handler certifications delivered within 36 hours" },
    { title: "Employee Wellness Programs", path: "/services/corporate-health/employee-wellness", desc: "Holistic workplace ergonomic audits, stress reduction & EAP" }
  ];

  const patientServices = [
    { title: "Doctor Consultations", path: "/services/patient-support/doctor-consultations", desc: "Primary & specialist medical advice" },
    { title: "Teleconsultations", path: "/services/patient-support/teleconsultations", desc: "Virtual care with verified physicians" },
    { title: "In-clinic / At-hospital Consultations", path: "/services/patient-support/in-clinic-consultations", desc: "Priority hospital bookings & zero-wait queues" },
    { title: "Lab Tests & Diagnostics", path: "/services/patient-support/lab-tests", desc: "Painless at-home sample collection by phlebotomists" },
    { title: "Second Opinion", path: "/services/patient-support/second-opinion", desc: "Multi-specialist clinical review before major surgery" },
    { title: "Home Care", path: "/services/patient-support/home-care", desc: "Trained bedside nursing & post-operative recovery" },
    { title: "Elderly Care", path: "/services/patient-support/elderly-care", desc: "Dedicated senior vitals tracking & continuous support" },
    { title: "Vaccinations at home", path: "/services/patient-support/vaccinations-at-home", desc: "Cold-chain assured adult & pediatric immunizations" },
    { title: "Medicines", path: "/services/patient-support/medicines", desc: "Doorstep specialty pharmaceuticals & refill alerts" }
  ];

  const practitionerServices = [
    { title: "CME Programs", path: "/services/practitioner-support/cme-programs", desc: "Accredited continuing medical education credits" },
    { title: "EMR / HIMS Services", path: "/services/practitioner-support/emr-hims", desc: "HIPAA-compliant clinic software & digital records" },
    { title: "Marketing & Patient Services", path: "/services/practitioner-support/marketing-patient-services", desc: "Ethical medical brand outreach & patient communication" },
    { title: "Trainings & Leadership Program", path: "/services/practitioner-support/trainings-leadership", desc: "Clinical excellence & healthcare administration workshops" }
  ];

  return (
    <div className="relative w-full overflow-hidden font-sans text-[#0F172A]">
      <Helmet>
        <title>Healthcare Services — Doctor Consultations, Home Tests &amp; School Health | Impact Health</title>
        <meta name="description" content="Explore Impact Health's services: doctor consultations, home blood tests, corporate wellness, school health programs &amp; more across 200+ Indian cities." />
        <meta property="og:title" content="Impact Health Services | Doctor Consultations, Home Tests &amp; Wellness" />
        <meta property="og:description" content="From in-clinic consultations to doorstep diagnostics. Find the right health service for patients, schools &amp; corporates." />
      </Helmet>
      <PageBackground variant="default" showInteractiveDots={true} />

      {/* 1. Hero Section */}
      <section className="pt-20 pb-16 sm:pt-24 sm:pb-20 border-b border-slate-200/70 bg-white/75 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
            <Link to="/" className="hover:text-[#0066FF] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold">Services</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2.5 bg-blue-50/90 border border-blue-200/80 text-[#0066FF] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]"></span>
              </span>
              <span>Healthcare Infrastructure Portfolio</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#0B132B] tracking-[-0.03em] leading-[1.1]">
              Integrated Medical &amp; Clinical Solutions
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-2xl">
              Impact Health delivers turnkey campus infirmaries, occupational corporate screening campaigns, and end-to-end patient support programs engineered for certified clinical excellence, zero delay, and absolute institutional trust.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/contact">
                <Button variant="royal" size="md" withArrow>
                  Request Infrastructure Audit
                </Button>
              </Link>
              <a 
                href="tel:+919667835909"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-semibold text-slate-700 hover:text-[#0066FF] bg-slate-50 border border-slate-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Clinical Support Desk: +91 9667835909</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Three Canonical Service Categories */}
      <section className="py-16 sm:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12 text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-mono font-semibold border border-blue-200/60">
              <Layers className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Three Core Divisions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#0B132B] tracking-tight">
              Select Your Clinical Category
            </h2>
            <p className="text-sm text-slate-600 font-sans leading-relaxed">
              Every division is backed by certified healthcare professionals, rigorous SOPs, calibrated medical hardware, and encrypted record systems.
            </p>
          </div>

          <div className="space-y-10 text-left">
            
            {/* ── ROW 1: 2-COLUMN SPLIT (School Health & Corporate Health) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Category 1: School Health Services */}
              <div className="bezel-outer p-2 rounded-3xl bg-slate-100/90 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-300/80 transition-all duration-300 flex flex-col group">
                <div className="bezel-inner rounded-[22px] p-7 sm:p-9 bg-white h-full flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/60 text-[#0D9488] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-200">
                        <Activity className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border bg-teal-50 border-teal-200/80 text-[#0F766E]">
                          K-12 &amp; Higher Education
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-medium">
                          6 Specialized Programs
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-display font-bold text-[#0B132B] group-hover:text-[#0066FF] transition-colors mb-2">
                        School Health Services
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                        Deploying gold-standard campus infirmaries, certified pediatric nurses, health awareness workshops, and rapid emergency transfer protocols on school grounds.
                      </p>
                    </div>

                    {/* Subservice Pills / Directory */}
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Active Clinical Programs:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {schoolHealthServices.map((service) => (
                          <Link
                            key={service.title}
                            to={service.path}
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-blue-50 hover:border-blue-200 transition-all flex items-start gap-2 group/item"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-1.5 shrink-0 group-hover/item:bg-[#0066FF]" />
                            <div className="overflow-hidden">
                              <p className="text-xs font-bold text-slate-800 group-hover/item:text-[#0066FF] truncate">
                                {service.title}
                              </p>
                              <p className="text-[10px] text-slate-500 line-clamp-1">
                                {service.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link to="/services/school-health" className="w-full">
                      <Button variant="royal" size="md" className="w-full justify-between" withArrow>
                        <span>Explore School Health Division</span>
                      </Button>
                    </Link>
                  </div>

                </div>
              </div>

              {/* Category 2: Corporate Health Services */}
              <div className="bezel-outer p-2 rounded-3xl bg-slate-100/90 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-300/80 transition-all duration-300 flex flex-col group">
                <div className="bezel-inner rounded-[22px] p-7 sm:p-9 bg-white h-full flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200/60 text-[#0284C7] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-200">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border bg-sky-50 border-sky-200/80 text-[#0369A1]">
                          Workforce Compliance
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-medium">
                          3 Enterprise Solutions
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-display font-bold text-[#0B132B] group-hover:text-[#0066FF] transition-colors mb-2">
                        Corporate Health Services
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                        Comprehensive employee screening campaigns, certified FSSAI food handler checkups, automated HR analytics, and proactive workforce wellness programs.
                      </p>
                    </div>

                    {/* Subservice Pills / Directory */}
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Active Clinical Programs:
                      </span>
                      <div className="grid grid-cols-1 gap-2.5">
                        {corporateHealthServices.map((service) => (
                          <Link
                            key={service.title}
                            to={service.path}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-blue-50 hover:border-blue-200 transition-all flex items-start gap-2.5 group/item"
                          >
                            <span className="w-2 h-2 rounded-full bg-[#0284C7] mt-1.5 shrink-0 group-hover/item:bg-[#0066FF]" />
                            <div className="overflow-hidden">
                              <p className="text-xs font-bold text-slate-800 group-hover/item:text-[#0066FF]">
                                {service.title}
                              </p>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {service.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link to="/services/corporate-health" className="w-full">
                      <Button variant="royal" size="md" className="w-full justify-between" withArrow>
                        <span>Explore Corporate Health Division</span>
                      </Button>
                    </Link>
                  </div>

                </div>
              </div>

            </div>

            {/* ── ROW 2: FULL-WIDTH MASTER BENTO (Patient Support Programs: Dual Track) ── */}
            <div className="bezel-outer p-2.5 rounded-3xl bg-slate-100/90 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="bezel-inner rounded-[22px] p-7 sm:p-10 bg-white space-y-8">
                
                {/* Master Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center shrink-0 shadow-xs">
                      <HeartHandshake className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-[#0066FF] border border-blue-100">
                          Dual-Track Care Network
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">13 Total Modules</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0B132B] mt-1">
                        Patient Support Programs
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans max-w-2xl">
                        A synchronized healthcare delivery model serving both individual patients with personalized home and clinic care, and practitioners with digital tools and accredited CME training.
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <Link to="/patient-support-programs">
                      <Button variant="secondary" size="md">
                        PSP Delivery Framework
                      </Button>
                    </Link>
                    <Link to="/services/patient-support">
                      <Button variant="royal" size="md" withArrow>
                        View Full Directory
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Dual Track Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Track 1: For Patients (9 Services) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#0066FF]" />
                        <h4 className="font-display font-bold text-base text-[#0B132B]">
                          For Patients
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200">
                        9 Services
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-sans">
                      Direct-to-family primary care, home diagnostics, continuous elderly assistance, and cold-chain medicine delivery.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {patientServices.map((s) => (
                        <Link
                          key={s.title}
                          to={s.path}
                          className="p-3 rounded-xl bg-slate-50/90 border border-slate-200/70 hover:bg-blue-50/70 hover:border-blue-200 transition-all flex items-start gap-2.5 group/item"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-1.5 shrink-0" />
                          <div className="overflow-hidden">
                            <p className="text-xs font-bold text-slate-800 group-hover/item:text-[#0066FF] truncate">
                              {s.title}
                            </p>
                            <p className="text-[10px] text-slate-500 line-clamp-1">
                              {s.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Track 2: For Practitioners (4 Services) */}
                  <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-slate-100 lg:pl-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#6366F1]" />
                        <h4 className="font-display font-bold text-base text-[#0B132B]">
                          For Practitioners
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200">
                        4 Programs
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-sans">
                      Accredited CME education, digital EMR platforms, and clinical leadership training for doctors and clinics.
                    </p>

                    <div className="grid grid-cols-1 gap-2.5 pt-1">
                      {practitionerServices.map((s) => (
                        <Link
                          key={s.title}
                          to={s.path}
                          className="p-3 rounded-xl bg-indigo-50/40 border border-indigo-100 hover:bg-indigo-50 hover:border-indigo-300 transition-all flex items-start gap-2.5 group/item"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#6366F1] mt-1.5 shrink-0" />
                          <div className="overflow-hidden">
                            <p className="text-xs font-bold text-slate-800 group-hover/item:text-[#4F46E5]">
                              {s.title}
                            </p>
                            <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                              {s.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CTA Band */}
      <CtaBand />
    </div>
  );
}
