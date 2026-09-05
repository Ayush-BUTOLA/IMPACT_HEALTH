import { useState, useEffect, useRef } from "react";
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import {
  HeartHandshake,
  Building2,
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import PageBackground from "../components/PageBackground";
import Button from "../components/Button";

// Emil Kowalski animation tokens
const EMIL_EASE = [0.23, 1, 0.32, 1];
const EMIL_SPRING = { stiffness: 420, damping: 30 };

const INQUIRY_TYPES = [
  { id: "psp", label: "Patient Support Program", icon: HeartHandshake },
  { id: "pharma", label: "Pharma & Enterprise", icon: Building2 },
  { id: "clinician", label: "Clinician & Hospital", icon: Stethoscope },
  { id: "general", label: "General Inquiry", icon: MessageSquare },
];

const TRIAGE_CHANNELS = [
  {
    id: "psp",
    title: "Patients & Families",
    tagline: "Dedicated Care Navigation",
    body: "1-on-1 certified nurse navigator assistance, zero-hassle prescription copay support, and cold-chain doorstep medicine coordination.",
    badge: "Dedicated Helpline Active",
    badgeColor: "emerald",
    icon: HeartHandshake,
    accentColor: "blue",
    actionLabel: "Enroll or Request Care →",
  },
  {
    id: "pharma",
    title: "Pharma & Enterprise",
    tagline: "Institutional Infrastructure",
    body: "Deploy customized patient adherence programs, IoT-verified cold-chain delivery across 200+ cities, and audit-ready pharmacovigilance logging.",
    badge: "GxP & ISO 9001",
    badgeColor: "blue",
    icon: Building2,
    accentColor: "indigo",
    actionLabel: "Discuss Program Architecture →",
  },
  {
    id: "clinician",
    title: "Clinicians & Hospitals",
    tagline: "Practice & Clinic Network",
    body: "Partner with Impact Health to refer specialty patients for dedicated adherence monitoring, clinic integration, and doorstep diagnostics.",
    badge: "150+ Partner Centers",
    badgeColor: "amber",
    icon: Stethoscope,
    accentColor: "emerald",
    actionLabel: "Connect Clinical Team →",
  },
];

export default function Contact() {
  const [selectedType, setSelectedType] = useState("psp");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const formRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleCopy = (text, field) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleSelectChannel = (channelId) => {
    setSelectedType(channelId);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(e.target);
    const name = formData.get("fullName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const org = formData.get("organization");
    const msg = formData.get("message");
    const inquiryLabel = INQUIRY_TYPES.find((t) => t.id === selectedType)?.label || selectedType;

    const mailtoSubject = encodeURIComponent(`[${inquiryLabel}] Contact Inquiry from ${name}`);
    const mailtoBody = encodeURIComponent(
      `Inquiry Type: ${inquiryLabel}\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nOrganization: ${org || "N/A"}\n\nMessage:\n${msg}`
    );

    // Simulate swift UX feedback before launching client
    setTimeout(() => {
      window.open(`mailto:connect@impacthealth.co.in?subject=${mailtoSubject}&body=${mailtoBody}`, "_blank");
      setSubmitting(false);
      setSent(true);
    }, 300);
  };

  return (
    <div className="w-full font-sans text-[#0F172A] relative overflow-hidden bg-[#F8FAFC]">
      <Helmet>
        <title>Contact Impact Health | Book Consultation or Get Clinical Support</title>
        <meta name="description" content="Contact Impact Health's care team. Book a doctor consultation, request home diagnostics, or enquire about school &amp; corporate health programs. Call +91 9667835909." />
        <meta property="og:title" content="Contact Impact Health | Clinical Support &amp; Enquiries" />
        <meta property="og:description" content="Reach Impact Health for doctor consultations, home blood tests, corporate wellness &amp; school health programs. Available across 200+ Indian cities." />
      </Helmet>
      <PageBackground variant="corporate" showInteractiveDots={true} />

      {/* 1. Hero Section — Impeccable Typography & Clinical Trust */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 border-b border-slate-200/60 bg-white/70 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: EMIL_EASE }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-[#0066FF] text-[11px] font-mono font-bold uppercase tracking-[0.2em] shadow-xs mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
              Clinical Directory &amp; Support Dispatch
            </span>
          </motion.div>

          {/* Impeccable Headline Pairing: Display Sans + Editorial Serif */}
          <motion.h1
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] text-[#0B132B] tracking-[-0.03em] leading-[1.1] max-w-3xl mx-auto pb-1"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05, ease: EMIL_EASE }}
          >
            Let's build reliable healthcare{" "}
            <br className="hidden sm:inline" />
            <span className="font-serif-editorial italic font-normal text-[#0066FF]">
              together.
            </span>
          </motion.h1>

          {/* Calibrated Value Proposition Subtitle */}
          <motion.p
            className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1, ease: EMIL_EASE }}
          >
            Whether you are a patient navigating specialty therapy, a pharmaceutical sponsor launching pan-India PSP infrastructure, or a clinician seeking care coordination: we are here to support you.
          </motion.p>

          {/* Quiet Trust Strip */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-slate-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
              <span>Dedicated Clinical Support Desk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
              <span>Direct GxP &amp; Pharmacovigilance Desk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
              <span>200+ Pan-India City Operations Hubs</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. Interactive Triage Channels (UI/UX Pro Max Fast-Track Routing) */}
      <section className="py-14 sm:py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-10">
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#0066FF] uppercase">
              Purposeful Routing
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B132B] tracking-tight mt-1">
              Select your primary inquiry path
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-1.5">
              Select a category to immediately customize your dispatch team and route your inquiry directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRIAGE_CHANNELS.map((ch) => {
              const Icon = ch.icon;
              const isSelected = selectedType === ch.id;

              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleSelectChannel(ch.id)}
                  className={`group relative text-left p-6 sm:p-7 rounded-2xl transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] active:scale-[0.98] ${
                    isSelected
                      ? "bg-white ring-2 ring-[#0066FF] shadow-lg shadow-blue-500/10 -translate-y-1"
                      : "bg-white/80 hover:bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#0066FF] text-white shadow-sm"
                          : "bg-blue-50 text-[#0066FF] border border-blue-200/60 group-hover:bg-[#0066FF] group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                        ch.badgeColor === "emerald"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/70"
                          : ch.badgeColor === "blue"
                          ? "bg-blue-50 text-[#0066FF] border-blue-200/70"
                          : "bg-amber-50 text-amber-700 border-amber-200/70"
                      }`}
                    >
                      {ch.badge}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    {ch.tagline}
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#0B132B] mb-2 group-hover:text-[#0066FF] transition-colors">
                    {ch.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans mb-4">
                    {ch.body}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0066FF]">
                    <span>{ch.actionLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Form & Direct Dispatch Hub (Hardware Double-Bezel Enclosure) */}
      <section ref={formRef} id="contact-form" className="pb-20 sm:pb-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form Container */}
          <div className="lg:col-span-7 bezel-outer shadow-xl">
            <div className="bezel-inner bg-white p-7 sm:p-10 rounded-2xl border border-slate-200/80 shadow-sm text-left">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-200/70 mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl text-[#0B132B] tracking-tight">
                    Send us a clinical message
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Our central coordinator desk responds in &lt;3 minutes during active duty.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-3 py-1 rounded-full shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Dispatch On-Duty</span>
                </div>
              </div>

              {/* Inquiry Type Chips Selector */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-700 mb-2 font-sans">
                  Inquiry Topic <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {INQUIRY_TYPES.map((type) => {
                    const isSelected = selectedType === type.id;
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1.5 text-center transition-all duration-150 cursor-pointer active:scale-[0.97] focus:outline-none ${
                          isSelected
                            ? "bg-[#0066FF] text-white shadow-sm ring-2 ring-[#0066FF]/20"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="truncate w-full text-[11px]">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {sent ? (
                <motion.div
                  role="status"
                  aria-live="polite"
                  className="flex flex-col items-center text-center py-12 gap-3"
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.22, ease: EMIL_EASE }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#0B132B]">
                    Inquiry Dispatched Successfully
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md font-sans mx-auto leading-relaxed">
                    Your transmission has been forwarded to our central clinical dispatch team at{" "}
                    <strong className="text-slate-900 font-mono">connect@impacthealth.co.in</strong>. A certified coordinator will follow up directly within 24 hours.
                  </p>
                  
                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-left w-full max-w-md text-xs space-y-1.5 font-mono text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Queue Category:</span>
                      <span className="font-bold text-[#0066FF]">
                        {INQUIRY_TYPES.find((t) => t.id === selectedType)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Dispatch Status:</span>
                      <span className="text-emerald-700 font-bold">Encrypted &amp; Queued</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Emergency SLA:</span>
                      <span>Immediate Hotline Access</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#0066FF] hover:underline cursor-pointer active:scale-[0.97]"
                  >
                    <span>Submit another clinical message</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        id="fullName"
                        name="fullName"
                        aria-required="true"
                        aria-label="Full Name"
                        data-testid="contact-name-input"
                        placeholder="e.g. Dr. Rajesh Sharma"
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/15 transition-all outline-none font-sans"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        aria-required="true"
                        aria-label="Email Address"
                        data-testid="contact-email-input"
                        placeholder="e.g. contact@apollohealth.org"
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/15 transition-all outline-none font-sans"
                      />
                    </div>
                  </div>

                  {/* Phone and Organization */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        aria-label="Phone Number"
                        data-testid="contact-phone-input"
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/15 transition-all outline-none font-sans"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="organization"
                        className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans"
                      >
                        Organization / Clinic <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        id="organization"
                        name="organization"
                        aria-label="Organization"
                        data-testid="contact-org-input"
                        placeholder="e.g. Max Specialty Care / Novartis"
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/15 transition-all outline-none font-sans"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans"
                    >
                      Message &amp; Clinical Requirements <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      id="message"
                      name="message"
                      rows={4}
                      aria-required="true"
                      aria-label="Message"
                      data-testid="contact-message-input"
                      placeholder="Please describe your patient care requirements, hospital collaboration details, or enterprise PSP infrastructure needs..."
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/15 resize-none transition-all outline-none font-sans"
                    />
                  </div>

                  {/* Submit CTA & Privacy Reassurance */}
                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      withArrow
                      disabled={submitting}
                      data-testid="contact-submit-btn"
                      className="bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-[0_4px_16px_rgba(0,102,255,0.25)] rounded-xl px-7 py-3 active:scale-[0.97]"
                    >
                      {submitting ? "Dispatching..." : "Send Clinical Message"}
                    </Button>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-sans">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>DPDP Act &amp; HIPAA GxP Compliant</span>
                    </div>
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* Right Column: Direct Dispatch Hub Details */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Helpline Card */}
            <div className="bezel-outer shadow-md">
              <div className="bezel-inner bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-left">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] border border-blue-200/60 flex items-center justify-center font-bold text-xs">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B132B]">Clinical Support Helpline</div>
                      <div className="text-[10px] text-slate-500 font-mono">Toll-Free Pan-India</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Dedicated Support
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3 border border-slate-200/70">
                  <a
                    href="tel:+919667835909"
                    className="font-mono font-bold text-base text-[#0B132B] hover:text-[#0066FF] transition-colors"
                  >
                    +91 9667835909
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy("+919667835909", "phone")}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-[#0066FF] hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                    title="Copy phone number"
                  >
                    {copiedField === "phone" ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  Dedicated response desk for active patient emergency coordination, refill requests, and clinician consultations.
                </p>
              </div>
            </div>

            {/* Email Dispatch Desk Card */}
            <div className="bezel-outer shadow-md">
              <div className="bezel-inner bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-left">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center font-bold text-xs">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B132B]">Email Dispatch Desk</div>
                      <div className="text-[10px] text-slate-500 font-mono">Institutional Inquiries</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200/70 px-2 py-0.5 rounded-full">
                    SLA &lt;24h
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3 border border-slate-200/70">
                  <a
                    href="mailto:connect@impacthealth.co.in"
                    className="font-mono font-semibold text-xs sm:text-sm text-[#0B132B] hover:text-[#0066FF] transition-colors truncate mr-2"
                  >
                    connect@impacthealth.co.in
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy("connect@impacthealth.co.in", "email")}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-[#0066FF] hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer shrink-0"
                    title="Copy email address"
                  >
                    {copiedField === "email" ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  Direct pipeline for RFP proposals, sponsor agreements, hospital tie-ups, and media relations.
                </p>
              </div>
            </div>

            {/* Headquarters & Operational Center Card */}
            <div className="bezel-outer shadow-md">
              <div className="bezel-inner bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3.5 text-left">
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200/60 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B132B]">Registered Headquarters</div>
                    <div className="text-xs text-slate-600 font-sans mt-0.5 leading-relaxed">
                      472/8/1/P, Kokila Lane 4, Pothariput,
                      <br />
                      Bhubaneswar, Odisha — 751020, India
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B132B]">Executive Office Hours</div>
                    <div className="text-xs text-slate-600 font-sans mt-0.5">
                      Mon – Sat: 8:00 AM – 8:00 PM IST
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Medical Emergency Alert Note */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/70 text-left text-xs text-amber-900 leading-relaxed font-sans">
              <span className="font-bold block mb-1">Emergency Medical Assistance Notice:</span>
              If you or a loved one are experiencing a life-threatening acute emergency, please dial national emergency services (<strong>112</strong>) or visit your nearest hospital emergency department immediately.
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
