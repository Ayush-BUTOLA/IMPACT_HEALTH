import React from 'react';
import { Star, CheckCircle2, HeartPulse, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PatientOutcomesMarquee.css';

const outcomesRow1 = [
  {
    id: 1,
    name: "Emma Thompson",
    handle: "@emmathompson",
    role: "Diabetes Type-2 Care",
    outcome: "HbA1c: 8.4% → 6.1%",
    quote: "The personalized care plan completely transformed how I manage my diabetes. Weekly consultations and free home blood tests made all the difference in my numbers.",
    location: "Bristol / UK",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
    verified: true,
    rating: 5,
    tagColor: "#008C7A",
    tagBg: "rgba(0, 140, 122, 0.15)",
  },
  {
    id: 2,
    name: "Rajesh Sharma",
    handle: "@rajesh_care",
    role: "Hypertension & Cardiac Care",
    outcome: "BP Stabilized: 120/80",
    quote: "Proactive vital tracking and quick doctor responses saved me countless hospital queues. Having a dedicated medical team gave our whole family peace of mind.",
    location: "Bhubaneswar",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    verified: true,
    rating: 5,
    tagColor: "#003087",
    tagBg: "rgba(0, 48, 135, 0.25)",
  },
  {
    id: 3,
    name: "David Park",
    handle: "@davidtech",
    role: "Post-Op Recovery Program",
    outcome: "Full Mobility in 6 Weeks",
    quote: "The tele-rehab support is flawless. Regular video check-ins and tailored exercise follow-ups accelerated my recovery timeline by over 40%.",
    location: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
    verified: true,
    rating: 5,
    tagColor: "#5B4FCF",
    tagBg: "rgba(91, 79, 207, 0.2)",
  },
  {
    id: 4,
    name: "Priya Patel",
    handle: "@priyapatel",
    role: "Chronic Disease Management",
    outcome: "₹18,500 Saved / Year",
    quote: "Unlimited free doctor consultations and doorstep medicine delivery for just ₹199/month removed all the out-of-pocket financial strain for my elderly parents.",
    location: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
    verified: true,
    rating: 5,
    tagColor: "#059669",
    tagBg: "rgba(5, 150, 105, 0.2)",
  },
  {
    id: 5,
    name: "Dr. Arun Joshi",
    handle: "@dr_arunjoshi",
    role: "Consultant Physician",
    outcome: "99.4% Patient Adherence",
    quote: "The proactive diagnostic schedules and automated medication reminders allow me to deliver preventative care rather than reactive crisis management.",
    location: "Delhi NCR",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=160&auto=format&fit=crop&q=80",
    verified: true,
    rating: 5,
    tagColor: "#008C7A",
    tagBg: "rgba(0, 140, 122, 0.2)",
  }
];

const outcomesRow2 = [
  {
    id: 6,
    name: "Meera Kulkarni",
    handle: "@meera_k",
    role: "PCOS & Metabolic Health",
    outcome: "Normalized Cycles & -7kg",
    quote: "Clinical nutrition plus gynecologist guidance under one roof gave me sustainable results without heavy medications. The care coordinators are always helpful.",
    location: "Pune",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
    verified: true,
    rating: 5,
    tagColor: "#CC2229",
    tagBg: "rgba(204, 34, 41, 0.2)",
  },
  {
    id: 7,
    name: "Vikram Malhotra",
    handle: "@vikram_m",
    role: "Elderly Chronic Care",
    outcome: "Zero Hospital Admissions",
    quote: "Managing my father's multiple prescriptions used to be chaotic. Impact Health synchronized lab tests, doctor reviews, and refills seamlessly.",
    location: "Chandigarh",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80",
    verified: true,
    rating: 5,
    tagColor: "#003087",
    tagBg: "rgba(0, 48, 135, 0.25)",
  },
  {
    id: 8,
    name: "Sunita Verma",
    handle: "@sunita_verma",
    role: "Thyroid & Vital Health",
    outcome: "TSH Stabilized at 2.4",
    quote: "Free quarterly blood sample collection at home and instant doctor review within 30 minutes of lab report uploads. Truly hassle-free healthcare.",
    location: "Kolkata",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=160&auto=format&fit=crop&q=80",
    verified: true,
    rating: 5,
    tagColor: "#008C7A",
    tagBg: "rgba(0, 140, 122, 0.15)",
  },
  {
    id: 9,
    name: "Dr. Anita Desai",
    handle: "@dr_anitadesai",
    role: "Preventive Care Specialist",
    outcome: "80% Risk Reduction",
    quote: "Combining continuous doctor access with early diagnostic intervention empowers patients to take charge of their health long before complications occur.",
    location: "Hyderabad",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=160&auto=format&fit=crop&q=80",
    verified: true,
    rating: 5,
    tagColor: "#5B4FCF",
    tagBg: "rgba(91, 79, 207, 0.2)",
  },
  {
    id: 10,
    name: "Ananya Sen",
    handle: "@ananya_sen",
    role: "Family Pediatric Care",
    outcome: "Instant 2 AM Consult",
    quote: "Connecting with an empathetic pediatrician at 2 AM when my child had high fever gave me instant relief. The doctors are compassionate and remarkably thorough.",
    location: "Jaipur",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    verified: true,
    rating: 5,
    tagColor: "#059669",
    tagBg: "rgba(5, 150, 105, 0.2)",
  }
];

function OutcomeCard({ item }) {
  return (
    <div className="w-[360px] sm:w-[400px] shrink-0 bg-[#0d1629]/90 hover:bg-[#131f38]/95 border border-white/10 hover:border-[#008C7A]/60 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 group select-none hover:-translate-y-1">
      {/* Top Header: Avatar + User Info */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative shrink-0">
            <img
              src={item.avatar}
              alt={item.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20 group-hover:border-[#008C7A] transition-colors"
              loading="lazy"
            />
            {item.verified && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-[#008C7A] border-2 border-[#0B132B] flex items-center justify-center">
                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-white text-[15px] leading-tight truncate group-hover:text-[#00E5C9] transition-colors">
                {item.name}
              </h4>
            </div>
            <p className="text-xs text-slate-400 font-mono truncate mt-0.5">
              {item.handle}
            </p>
          </div>
        </div>

        {/* Condition / Program Pill */}
        <span
          className="text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 border border-white/5"
          style={{ color: item.tagColor, backgroundColor: item.tagBg }}
        >
          {item.role}
        </span>
      </div>

      {/* Testimonial Quote */}
      <p className="text-sm text-slate-300 leading-relaxed font-sans line-clamp-3 group-hover:text-slate-200 transition-colors">
        &ldquo;{item.quote}&rdquo;
      </p>

      {/* Bottom Metadata: Outcome Metric + Rating & City */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-mono text-[#00E5C9] font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#00E5C9]" />
          <span>{item.outcome}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center text-amber-400">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-slate-400 font-mono text-[11px]">
            {item.location}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PatientOutcomesMarquee({
  title = "Trusted by patients & families worldwide",
  subtitle = "Join thousands of individuals who are already experiencing superior health outcomes and lower medical costs with our care platform",
  badge = "Patient Outcomes",
  showStats = true,
  speedRow1 = 42,
  speedRow2 = 46,
  className = ""
}) {
  return (
    <section
      id="patient-outcomes"
      className={`py-20 lg:py-28 bg-[#00112C] relative overflow-hidden text-white border-y border-white/10 ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#003087]/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#008C7A]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#00E5C9] backdrop-blur-md">
            <HeartPulse className="w-3.5 h-3.5 text-[#008C7A] animate-pulse" />
            <span>{badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* Quick Metrics Bar */}
          {showStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto">
              {[
                { value: "98.6%", label: "Patient Satisfaction" },
                { value: "200+", label: "Cities Pan-India" },
                { value: "₹18.5k", label: "Avg. Yearly Savings" },
                { value: "< 15 min", label: "Doctor Response Time" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-center backdrop-blur-sm"
                >
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono text-[#00E5C9]">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Marquee Tracks Container */}
      <div className="space-y-6 relative patient-marquee-mask">
        
        {/* ROW 1: Scrolling Left */}
        <div className="patient-marquee-row overflow-hidden flex" style={{ '--marquee-speed': `${speedRow1}s` }}>
          <div className="patient-marquee-track-left flex gap-5 sm:gap-6 pr-5 sm:pr-6">
            {outcomesRow1.map((item) => (
              <OutcomeCard key={`r1-a-${item.id}`} item={item} />
            ))}
            {outcomesRow1.map((item) => (
              <OutcomeCard key={`r1-b-${item.id}`} item={item} />
            ))}
          </div>
        </div>

        {/* ROW 2: Scrolling Right */}
        <div className="patient-marquee-row overflow-hidden flex" style={{ '--marquee-speed': `${speedRow2}s` }}>
          <div className="patient-marquee-track-right flex gap-5 sm:gap-6 pr-5 sm:pr-6">
            {outcomesRow2.map((item) => (
              <OutcomeCard key={`r2-a-${item.id}`} item={item} />
            ))}
            {outcomesRow2.map((item) => (
              <OutcomeCard key={`r2-b-${item.id}`} item={item} />
            ))}
          </div>
        </div>

      </div>

      {/* Bottom CTA Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 text-center relative z-10">
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2 px-4 text-xs sm:text-sm text-slate-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#008C7A]" />
            <span>Ready to experience compassionate, cost-effective care?</span>
          </div>
          <Link to="/contact">
            <button className="px-5 py-2.5 rounded-full bg-[#008C7A] hover:bg-[#006B5C] text-white text-xs sm:text-sm font-bold shadow-lg shadow-teal-900/30 inline-flex items-center gap-2 transition-all cursor-pointer">
              <span>Book Doctor Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>

    </section>
  );
}
