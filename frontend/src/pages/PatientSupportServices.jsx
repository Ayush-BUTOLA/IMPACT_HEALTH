import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HeartHandshake,
  Users,
  Award,
  ChevronRight,
  PhoneCall,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Stethoscope,
  Clock,
  ArrowRight,
  Sparkles,
  Building2,
  FileCheck,
  Syringe,
  Pill,
  Layers,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import PageBackground from '../components/PageBackground';
import CtaBand from '../components/CtaBand';
import { servicesData, categoriesData } from '../data/servicesData';

const EMIL_EASE = [0.23, 1, 0.32, 1];
const EMIL_SPRING = { type: 'spring', stiffness: 420, damping: 30 };

export default function PatientSupportServices() {
  const [activeTab, setActiveTab] = useState('patients'); // 'patients' | 'practitioners'

  useEffect(() => {
    document.title = activeTab === 'patients'
      ? "Patient Support Programs - For Patients | Impact Health"
      : "Patient Support Programs - For Practitioners | Impact Health";
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  const patientServicesList = [
    { id: "doctor-consultations", cat: "patient-support", title: "Doctor Consultations", subtitle: "Primary & Specialist Medical Opinions", icon: Stethoscope, desc: "Connect with verified physicians and board-certified clinical specialists for personalized evaluations and treatment plans." },
    { id: "teleconsultations", cat: "patient-support", title: "Teleconsultations", subtitle: "Virtual Medical Care", icon: PhoneCall, desc: "Immediate remote audio/video consultations with licensed doctors from home with zero waiting room exposure." },
    { id: "in-clinic-consultations", cat: "patient-support", title: "In-clinic / At-hospital Consultations", subtitle: "Priority Physical Examination", icon: Calendar, desc: "Coordinated appointments and queue skips at premier partnered hospitals and multispecialty clinics across 200+ cities." },
    { id: "lab-tests", cat: "patient-support", title: "Lab Tests & Diagnostics", subtitle: "Painless At-Home Sample Collection", icon: Activity, desc: "Certified phlebotomists collect samples at your doorstep with rapid digital reports from NABL-accredited diagnostic labs." },
    { id: "second-opinion", cat: "patient-support", title: "Second Opinion", subtitle: "Unbiased Multi-Specialist Review", icon: Award, desc: "Independent clinical review from senior super-specialists before major surgeries, oncology treatments, or complex diagnoses." },
    { id: "home-care", cat: "patient-support", title: "Home Care", subtitle: "Certified Bedside Clinical Nursing", icon: HeartHandshake, desc: "Post-operative nursing, catheter care, wound dressing, and continuous palliative support delivered in home comfort." },
    { id: "elderly-care", cat: "patient-support", title: "Elderly Care", subtitle: "Dedicated Senior Vitals Tracking", icon: ShieldCheck, desc: "Personalized geriatric monitoring, daily vitals check-ins, mobility assistance, and emergency escalation protocols." },
    { id: "vaccinations-at-home", cat: "patient-support", title: "Vaccinations at home", subtitle: "Cold-Chain Assured Immunizations", icon: Syringe, desc: "WHO-standard cold-chain delivery of adult, travel, flu, and pediatric vaccines administered by registered nurses." },
    { id: "medicines", cat: "patient-support", title: "Medicines", subtitle: "Doorstep Specialty Pharmacy", icon: Pill, desc: "Timely delivery of chronic and specialty pharmaceutical regimens with automated refill alerts and strict expiration audits." }
  ];

  const practitionerServicesList = [
    { id: "cme-programs", cat: "practitioner-support", title: "CME Programs", subtitle: "Continuing Medical Education", icon: Award, desc: "Accredited workshops, clinical case discussions, and certification credits that advance clinical competencies." },
    { id: "emr-hims", cat: "practitioner-support", title: "EMR / HIMS Services", subtitle: "HIPAA-Compliant Software", icon: FileCheck, desc: "Cloud-native hospital information systems, electronic prescription generators, and encrypted patient records." },
    { id: "marketing-patient-services", cat: "practitioner-support", title: "Marketing & Patient Services", subtitle: "Ethical Practice Outreach", icon: Users, desc: "Digital appointment discovery, transparent review tools, and patient adherence communication templates." },
    { id: "trainings-leadership", cat: "practitioner-support", title: "Trainings & Leadership Program", subtitle: "Clinical Governance & Leadership", icon: Building2, desc: "Advanced operational training for clinical department heads, nurse supervisors, and hospital administrators." }
  ];

  const currentList = activeTab === 'patients' ? patientServicesList : practitionerServicesList;

  return (
    <div className="relative w-full overflow-hidden font-sans text-[#0F172A]">
      <PageBackground variant="patients" showInteractiveDots={true} />

      {/* 1. Hero Section */}
      <section className="pt-20 pb-16 sm:pt-24 sm:pb-20 border-b border-slate-200/70 bg-white/75 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
            <Link to="/" className="hover:text-[#0066FF] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/services" className="hover:text-[#0066FF] transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold">Patient Support Programs</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Audience Pill Switcher */}
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
                <button
                  type="button"
                  onClick={() => setActiveTab('patients')}
                  className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 active:scale-[0.97] focus:outline-none ${
                    activeTab === 'patients' ? 'text-white' : 'text-slate-600 hover:text-[#0B132B]'
                  }`}
                >
                  {activeTab === 'patients' && (
                    <motion.div
                      layoutId="tab-pill"
                      className="absolute inset-0 bg-[#0066FF] rounded-lg shadow-sm"
                      transition={EMIL_SPRING}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4" />
                    For Patients (9 Services)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('practitioners')}
                  className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 active:scale-[0.97] focus:outline-none ${
                    activeTab === 'practitioners' ? 'text-white' : 'text-slate-600 hover:text-[#0B132B]'
                  }`}
                >
                  {activeTab === 'practitioners' && (
                    <motion.div
                      layoutId="tab-pill"
                      className="absolute inset-0 bg-[#0066FF] rounded-lg shadow-sm"
                      transition={EMIL_SPRING}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    For Practitioners (4 Programs)
                  </span>
                </button>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#0B132B] tracking-[-0.03em] leading-[1.1]">
                {activeTab === 'patients' ? (
                  <>
                    Personalized Healthcare{' '}
                    <span className="font-serif-editorial italic font-normal text-[#0066FF]">
                      for Patients.
                    </span>
                  </>
                ) : (
                  <>
                    Clinical Tools &amp; Education{' '}
                    <span className="font-serif-editorial italic font-normal text-[#0066FF]">
                      for Practitioners.
                    </span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-xl">
                {activeTab === 'patients'
                  ? "From primary consultations and painless home blood collections to specialized elderly nursing and temperature-controlled medicine deliveries, we wrap patients and their families in complete clinical safety."
                  : "Empowering clinicians, specialists, and hospital networks with accredited Continuing Medical Education credits, encrypted EMR platforms, and healthcare administration leadership programs."}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/contact">
                  <Button variant="royal" size="md" withArrow>
                    {activeTab === 'patients' ? "Register for Patient Support" : "Partner as a Practitioner"}
                  </Button>
                </Link>
                <Link to="/patient-support-programs">
                  <Button variant="secondary" size="md">
                    Explore Delivery Model
                  </Button>
                </Link>
              </div>

              {/* Quality Signals */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-sans">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#059669]" />
                  NABL-Accredited Labs
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <HeartHandshake className="w-4 h-4 text-[#0066FF]" />
                  Dedicated Care Coordination
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Clock className="w-4 h-4 text-[#059669]" />
                  Zero-Delay Tele-triage
                </span>
              </div>

            </div>

            {/* Right Hardware Visual */}
            <div className="lg:col-span-5 relative">
              <div className="bezel-outer p-2 shadow-xl bg-slate-100/90 rounded-3xl border border-slate-200/80">
                <div className="bezel-inner rounded-[22px] overflow-hidden aspect-[4/3] bg-slate-100 relative shadow-inner">
                  <img
                    src={activeTab === 'patients'
                      ? "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80"
                      : "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=80"}
                    alt="Patient Support Programs"
                    className="w-full h-full object-cover select-none"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200/80 text-xs font-bold text-[#0B132B] shadow-md flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Verified Clinical Infrastructure</span>
                  </div>

                  <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span className="text-xs font-bold text-[#0B132B]">
                        {activeTab === 'patients' ? "Patient Support Services" : "Practitioner Services"}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 shrink-0">
                      {currentList.length} Active Lines
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Subservices Directory Grid */}
      <section className="py-16 sm:py-24 text-left relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-mono font-semibold border border-blue-200/60">
                <Layers className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Standardized Service Directory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#0B132B] tracking-tight">
                {activeTab === 'patients' ? "For Patients: Comprehensive Care Line" : "For Practitioners: Technology & Growth"}
              </h2>
              <p className="text-sm text-slate-600 font-sans leading-relaxed">
                Click on any service protocol below to view full clinical scope, deliverables, execution timelines, and consultation bookings.
              </p>
            </div>

            {/* Quick Toggle on top of grid */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('patients')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                  activeTab === 'patients'
                    ? 'bg-[#0066FF] text-white border-[#0066FF]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                For Patients (9)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('practitioners')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                  activeTab === 'practitioners'
                    ? 'bg-[#0066FF] text-white border-[#0066FF]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                For Practitioners (4)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {currentList.map((service) => {
              const IconComp = service.icon;
              return (
                <div
                  key={service.id}
                  className="bezel-outer p-1.5 rounded-3xl bg-slate-100/90 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300/80 transition-all duration-200 flex flex-col group"
                >
                  <div className="bezel-inner rounded-[22px] p-6 sm:p-7 bg-white flex flex-col justify-between h-full space-y-5">
                    
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#0066FF] flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:bg-[#0066FF] group-hover:text-white transition-all duration-200">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">
                          {activeTab === 'patients' ? "Patient Care" : "Practitioner"}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-display font-bold text-[#0B132B] group-hover:text-[#0066FF] transition-colors leading-snug">
                          {service.title}
                        </h3>
                        <p className="text-[11px] font-mono text-[#0066FF] font-semibold mt-0.5">
                          {service.subtitle}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {service.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <Link to={`/services/${service.cat}/${service.id}`}>
                        <Button variant="ghost" size="sm" className="w-full justify-between text-xs font-bold text-[#0066FF] hover:bg-blue-50" withArrow>
                          <span>View Clinical Protocol</span>
                        </Button>
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. CTA Band */}
      <CtaBand />
    </div>
  );
}
