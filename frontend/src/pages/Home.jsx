import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowRight, HeartPulse, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import HeroSlideshow from '../components/HeroSlideshow';
import Aurora from '../components/backgrounds/Aurora';
import DotGrid from '../components/backgrounds/DotGrid';
import DoctorAvatar from '../components/DoctorAvatar';

// Real Photos from Drive
import doctorCheckupPulse from '../assets/drive/school/WhatsApp_Image_2026-07-29_at_6.37.13_PM.jpeg';
import healthCampVitals from '../assets/drive/school/WhatsApp_Image_2026-07-29_at_6.37.08_PM.jpeg';
import corporateOhc from '../assets/drive/corporate/OHC___OPD_at_site.jpg';

// Real Client Logos from Drive
import zomatoLogo from '../assets/drive/clients/zomato-logo-transparent-background-701751694712227nvjxqt9tkj.png';
import bharatBiotechLogo from '../assets/drive/clients/bharat-biotech-logo.jpg';
import zydusLogo from '../assets/drive/clients/Zydus_Logo.jpg';
import eisaiLogo from '../assets/drive/clients/4523.T-587fe547.png';
import healthiansLogo from '../assets/drive/clients/Healthianslogo2x.jpeg';
import coreDiagnosticsLogo from '../assets/drive/clients/cropped-cropped-Core-Diagnostics-Logo-Light.jpg';
import garbagudiLogo from '../assets/drive/clients/garbagudi_logo.jpeg';
import chaitanyaLogo from '../assets/drive/clients/chaitanya_india_micro_finance_logo.jpeg';
import rakkshakLogo from '../assets/drive/clients/rakkshak_logo.jpeg';
import tcisLogo from '../assets/drive/clients/TCIS-logo3.png';
import indiraGandhiLogo from '../assets/drive/clients/indira-gandhi.png';
import mSchoolLogo from '../assets/drive/clients/M-school-logo.png';
import fisLogo from '../assets/drive/clients/FIS-LOGO.jpg';
import fbLogo from '../assets/drive/clients/FB_Logo.jpg';

const services = [
  {
    category: "Consultations & Care",
    title: "Inclinic & Virtual Doctor Consultations",
    desc: "Get unlimited doctor consultations both virtually over call and at clinic/hospital locations across 200+ network centers.",
    image: doctorCheckupPulse,
    alt: "Inclinic & Virtual Doctor Consultations"
  },
  {
    category: "Diagnostics & OHC",
    title: "On-Campus Medical Rooms & Health Screening Camps",
    desc: "Gold-standard campus infirmaries, school wellness setups, and digital student health assessments with pediatric care.",
    image: healthCampVitals,
    alt: "On-Campus Medical Rooms & Health Screening Camps"
  },
  {
    category: "Corporate & Workplace",
    title: "Corporate Health Centers & Workplace Wellness",
    desc: "On-site OHC clinics, pre-employment checkups, and annual health screenings trusted by leading corporate organizations.",
    image: corporateOhc,
    alt: "Corporate Health Centers & Workplace Wellness"
  }
];

const teamMembers = [
  {
    name: "Anshuman Sahoo",
    role: "CEO",
    desc: "Bachelor's from Christ University. Product & Corporate Strategist. CSP India 2021.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfJxEo37U3qLZFlVZ_UIAkSntqR90rI0JVu1YHmNhUT9831Q9sluiEtuN7fxBLBr2JgAqZxsbwglc9QCK4xey5EEuo3076qEKDhCvH9XFcE_OrEG0obzicQvD0g9xO-Jc8ifgrxdkPWF6MXLAqsKYlFjTb9D5s0gOF2M-NR2rxMgead12dNMeCOwKJg_XrvQBv_GSrJNgxBs67RpiZvsyjbPLgdoK3OagfzCgYdEfeoMRKr_1JsI2VaB6D9ZFmr-UrLO_aPBom_DM",
    isFounder: true
  },
  {
    name: "Ashish Rawat",
    role: "CIO",
    desc: "Data Scientist & SAS Consultant. B.Tech from GGSIPU. Ex-HSBC, EXL, AON & AMEX.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4z1fUzs5DTNZzjO8EvbXM3dT45TOivJHZfetcuxuHUbEUPuwkVun_s4YGv6nhR5xztJGtWuV6tRQ8MgFQNY30ztWFiQjbKM3HTCVJQzKUYKtn5CwtZHHfc5YhbemtWX6gMpGp1r-j6CbBvCKSGeBix6BcyZx26i-qRzVuXyfIZZAjaEZ6FbcMEt8XSZxAfMlPiOgsfcSUir8kwT2k5ZHFfuLRPjsq6UgnPTcFIHfBYd-_ig5C8IPfAvmCpLbuVDDEmGpEk7_yEhc",
    isFounder: true
  },
  {
    name: "Dr. Gunjan D. Khare",
    role: "MO",
    desc: "Medical Officer heading clinical operations, quality assurance, and patient care protocols.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&fit=crop&q=80",
    isFounder: false
  }
];

const advisors = [
  {
    name: "Dr. Romil Lotta",
    role: "General Physician",
    desc: "MBBS from Mayo. PMO at Ministry of Housing & Urban Affairs, Govt. of India.",
    image: null
  },
  {
    name: "Dr. Lalasa Palli",
    role: "Pediatrician",
    desc: "Expert Pediatric Specialist focusing on child healthcare, growth monitoring, and preventive wellness.",
    image: null
  },
  {
    name: "Dr. Azad Dash",
    role: "Pediatrician",
    desc: "Senior Pediatrician specializing in campus health programs and childhood preventive healthcare.",
    image: null
  },
  {
    name: "Dr. Abhishek Miland Deshmukh",
    role: "Dermatologist",
    desc: "Consultant Dermatologist providing comprehensive clinical skin health consultations.",
    image: null
  },
  {
    name: "Dr. Sonti Kiran Kumar",
    role: "Internal Medicine",
    desc: "Internal Medicine Specialist dedicated to chronic disease management and adult care.",
    image: null
  }
];

const clients = [
  { name: "Zomato", alt: "Zomato", url: zomatoLogo },
  { name: "Bharat Biotech", alt: "Bharat Biotech", url: bharatBiotechLogo },
  { name: "Zydus Healthcare", alt: "Zydus Healthcare", url: zydusLogo },
  { name: "Eisai", alt: "Eisai Pharmaceuticals", url: eisaiLogo },
  { name: "Healthians", alt: "Healthians Diagnostics", url: healthiansLogo },
  { name: "Core Diagnostics", alt: "Core Diagnostics", url: coreDiagnosticsLogo },
  { name: "Garbagudi", alt: "Garbagudi IVF", url: garbagudiLogo },
  { name: "Chaitanya India", alt: "Chaitanya India Micro Finance", url: chaitanyaLogo },
  { name: "Rakkshak", alt: "Rakkshak", url: rakkshakLogo },
  { name: "The Cambridge International School", alt: "TCIS", url: tcisLogo },
  { name: "Indira Gandhi Institutions", alt: "Indira Gandhi Institutions", url: indiraGandhiLogo },
  { name: "Meluha International School", alt: "Meluha International School", url: mSchoolLogo },
  { name: "FIS", alt: "FIS", url: fisLogo },
  { name: "FB Group", alt: "FB Group", url: fbLogo }
];


const fadeInUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 }
};

const testimonials = [
  {
    quote: "Impact Health's patient support program has been a lifesaver. The free virtual doctor consultations and home blood tests saved me time and money.",
    author: "Rakesh Sharma",
    location: "Bhubaneswar",
    rating: 5
  },
  {
    quote: "Dedicated medical team and family doctors who actually care. Highly recommend their chronic disease management for Diabetes.",
    author: "Priya Patel",
    location: "Mumbai",
    rating: 5
  }
];

const faqs = [
  {
    question: "What is included in the Patient Support Program?",
    answer: "The program includes unlimited free doctor consultations (virtual & clinic), free blood tests at home, and a dedicated medical team."
  },
  {
    question: "How much does the program cost?",
    answer: "Our patient support programs start at an affordable rate of just INR 199 per month with no hidden charges."
  },
  {
    question: "How do I contact support or book a consultation?",
    answer: "You can book directly by clicking 'Book Consultation Now', or reach our support team at +91 9667835909 or connect@impacthealth.co.in."
  }
];

export default function Home() {
  return (
    <div id="home" className="w-full bg-white relative overflow-hidden">

      {/* ═══════════════════════════════════════════
          HERO SECTION
       ═══════════════════════════════════════════ */}
      <HeroSlideshow />

      {/* ═══════════════════════════════════════════
          SMART SOLUTIONS BENTO GRID
       ═══════════════════════════════════════════ */}
      <section id="solutions" className="py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <motion.div
            className="text-center max-w-3xl mx-auto mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">Smart Healthcare Solutions</h2>
            <p className="text-body-md text-[#4A4A4A] leading-relaxed font-sans mt-4">
              Experience high quality disease management with our tailored patient first medical services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">

            {/* One-Stop Solution Card */}
            <motion.div
              className="md:col-span-8 bg-[#fcf8ff] rounded-2xl p-8 lg:p-10 border border-[#DDE0F5]/40 shadow-ambient shadow-ambient-hover flex flex-col justify-between"
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div>
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6 text-white shadow-sm">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <h3 className="text-headline-md font-bold text-primary mb-4">One-Stop Solution</h3>
                <p className="text-body-md text-text-secondary leading-relaxed font-sans mb-8">
                  Manage chronic diseases such as Diabetes, PCOS etc. better with our dedicated patient support programs focused on quality and affordable care at home.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 flex items-center justify-between border border-[#DDE0F5] shadow-sm">
                <div className="flex -space-x-3">
                  <div className="w-9 h-9 rounded-full bg-[#7e82f4]/20 border-2 border-white flex items-center justify-center font-bold text-[10px] text-primary font-sans">IM</div>
                  <div className="w-9 h-9 rounded-full bg-[#c0c1ff]/40 border-2 border-white flex items-center justify-center font-bold text-[10px] text-primary-container font-sans">PH</div>
                  <div className="w-9 h-9 rounded-full bg-[#e16957]/20 border-2 border-white flex items-center justify-center font-bold text-[10px] text-[#e16957] font-sans">SO</div>
                </div>
                <span className="text-xs font-semibold text-primary font-mono tracking-wider">+200 Cities Nationwide</span>
              </div>
            </motion.div>

            {/* Price Card */}
            <motion.div
              className="md:col-span-4 bg-primary text-white rounded-2xl p-8 lg:p-10 flex flex-col justify-between shadow-lg shadow-ambient-hover"
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-white border border-white/20">
                  <span className="text-xl font-bold font-mono">₹</span>
                </div>
                <h3 className="text-headline-md font-bold text-white mb-4">Reduce Out-of-pocket Expenses</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-sans mb-8">
                  Comprehensive medical services including health insurance and unlimited consultations starting at just INR 199/- per month.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-3xl lg:text-4xl font-extrabold font-display">INR 199</span><span className="text-slate-400 text-sm font-normal font-sans ml-1">/mo</span>
                </div>
                <Link
                  to="/services"
                  className="bg-white text-primary text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-slate-100 transition-colors shadow-sm inline-flex items-center gap-1.5 font-sans"
                >
                  Explore App <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Availability Card */}
            <motion.div
              className="md:col-span-4 bg-white border border-[#DDE0F5] shadow-ambient shadow-ambient-hover rounded-2xl p-8 flex flex-col justify-between"
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div>
                <div className="w-12 h-12 bg-[#ECECFE] rounded-xl flex items-center justify-center mb-6 text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-headline-md font-bold text-primary mb-4">24/7 Availability</h3>
                <p className="text-text-secondary text-sm leading-relaxed font-sans">
                  A team of dedicated doctors and care managers for each family member for seamless access throughout the year.
                </p>
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              className="md:col-span-8 bg-[#0d0489] text-white rounded-2xl p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between shadow-lg relative overflow-hidden shadow-ambient-hover"
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 filter blur-xl"></div>
              <div className="z-10 text-center sm:text-left mb-6 sm:mb-0 max-w-md">
                <h3 className="text-2xl lg:text-3xl font-display font-bold mb-2">Speak to a Doctor</h3>
                <p className="text-slate-300 text-sm font-sans">Get unhindered access to medical queries instantly.</p>
              </div>
              <a
                href="https://www.threephih.in/threephih/patientlogin.php"
                target="_blank"
                rel="noopener noreferrer"
                className="z-10 bg-white text-primary font-sans font-bold text-sm px-6 py-3.5 rounded-lg hover:bg-slate-50 transition-all whitespace-nowrap shadow-sm text-center"
              >
                Book Consultation Now
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          QUOTE / STATS SECTION with DotGrid Background
       ═══════════════════════════════════════════ */}
      <section id="about" className="py-24 lg:py-28 relative border-y border-[#DDE0F5] overflow-hidden" style={{ backgroundColor: '#F8F9FF' }}>
        <DotGrid
          dotColor="rgba(91, 91, 214, 0.12)"
          dotActiveColor="rgba(91, 91, 214, 0.5)"
          dotSize={1.2}
          gap={24}
          mouseRadius={140}
        />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Quote content */}
            <motion.div
              className="lg:col-span-6 space-y-6 text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <span className="text-[#7e82f4] text-xs font-bold uppercase tracking-widest font-sans">Statistical Insight</span>
              <blockquote className="text-headline-lg font-bold text-primary leading-snug">
                "Worldwide, Chronic Diseases are the major causes of deaths and disabilities. In India, they account for 53% of all deaths."
              </blockquote>
              <div className="w-12 h-1 bg-[#e16957]/50 rounded-full my-2"></div>
              <p className="text-body-md text-text-secondary leading-relaxed font-sans">
                Chronic Diseases create large, adverse and underappreciated economic effects on families. Early diagnosis can prevent at least 80% of premature heart disease and stroke.
              </p>
            </motion.div>

            {/* Data Cards grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-6">

              <div className="bg-white/90 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-[#DDE0F5] shadow-ambient shadow-ambient-hover text-center">
                <div className="text-4xl lg:text-5xl font-display font-extrabold text-primary mb-2">80%</div>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider font-mono">Preventable Cases</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-[#DDE0F5] shadow-ambient shadow-ambient-hover text-center">
                <div className="text-4xl lg:text-5xl font-display font-extrabold text-tertiary-container mb-2">200+</div>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider font-mono">Service Cities</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-[#DDE0F5] shadow-ambient shadow-ambient-hover text-center">
                <div className="text-4xl lg:text-5xl font-display font-extrabold text-primary mb-2">2L+</div>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider font-mono">Patients Assisted</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-[#DDE0F5] shadow-ambient shadow-ambient-hover text-center">
                <div className="text-4xl lg:text-5xl font-display font-extrabold text-tertiary-container mb-2">100k+</div>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider font-mono">Consultations</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES SECTION
       ═══════════════════════════════════════════ */}
      <section id="services" className="py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">Our Services</h2>
              <p className="text-body-md text-text-secondary leading-relaxed font-sans mt-4">
                Experience our wide range of health &amp; wellness services available at more than 200+ cities across Pan India.
              </p>
            </div>
            <Link
              to="/services"
              className="bg-primary text-white font-sans font-semibold text-sm px-6 py-3.5 rounded-lg flex items-center gap-2 group self-start md:self-auto hover:opacity-95 shadow-sm transition-all"
            >
              Explore Plans
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.map((service, idx) => (
              <motion.div key={idx} className="group cursor-pointer" variants={fadeInUp}>
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3] border border-[#DDE0F5] shadow-ambient">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[#ECECFE] text-xs font-bold uppercase tracking-widest font-sans mb-1 opacity-90">{service.category}</span>
                    <h3 className="text-white text-headline-md font-bold leading-tight">{service.title}</h3>
                  </div>
                </div>
                <p className="text-body-md text-text-secondary leading-relaxed font-sans">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OUR TEAM SECTION
       ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-[#7e82f4] text-xs font-bold uppercase tracking-widest font-sans mb-3 block">Expert Leadership</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">Our Team</h2>
            <p className="text-body-md text-text-secondary leading-relaxed font-sans mt-4 max-w-2xl mx-auto">
              A passionate team of healthcare and technology professionals committed to making quality care accessible.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#DDE0F5] shadow-ambient shadow-ambient-hover flex flex-col justify-between"
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <div>
                  <div className={`w-28 h-28 rounded-full bg-slate-100 mx-auto mb-6 flex items-center justify-center overflow-hidden border-4 border-[#ECECFE] shadow-sm`}>
                    <img
                      alt={member.name}
                      className="w-full h-full object-cover"
                      src={member.image}
                      loading="lazy"
                    />
                  </div>
                  <h4 className="text-headline-md font-bold text-primary text-center mb-1 leading-tight">{member.name}</h4>
                  <p className="text-xs font-bold text-surface-tint text-center uppercase tracking-widest font-sans mb-5">({member.role})</p>

                  <p className="text-sm text-text-secondary text-center font-sans leading-relaxed mb-6">
                    {member.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DDE0F5]/50 flex justify-center gap-4 text-slate-400">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors text-xs font-semibold font-sans uppercase tracking-wider"
                  >
                    Connect &rarr;
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OUR ADVISORS SECTION
       ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-[#F8F9FF] border-t border-[#DDE0F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-[#7e82f4] text-xs font-bold uppercase tracking-widest font-sans mb-3 block">Clinical Guidance</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">Advisors</h2>
            <p className="text-body-md text-text-secondary leading-relaxed font-sans mt-4 max-w-2xl mx-auto">
              Renowned medical advisors and clinical experts guiding our health initiatives and patient care standards.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {advisors.map((advisor, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#DDE0F5] shadow-sm flex flex-col justify-between"
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <div>
                  <DoctorAvatar
                    name={advisor.name}
                    src={advisor.image}
                    alt={advisor.name}
                  />
                  <h4 className="text-base font-bold text-primary text-center mb-1 leading-snug">{advisor.name}</h4>
                  <p className="text-xs font-bold text-[#7e82f4] text-center font-sans mb-3">({advisor.role})</p>

                  <p className="text-xs text-text-secondary text-center font-sans leading-relaxed">
                    {advisor.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CLIENTS & PARTNERS
       ═══════════════════════════════════════════ */}
      <section id="clients" className="py-20 lg:py-24 bg-[#FAFBFF] border-t border-[#DDE0F5]/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            className="mb-14 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-[#7e82f4] text-xs font-bold uppercase tracking-widest font-sans mb-3 block">Trusted Partnerships</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">Our Happy Clients &amp; Partners</h2>
            <p className="text-body-md text-text-secondary leading-relaxed font-sans mt-3">
              Trusted by leading enterprises, educational institutions, and healthcare leaders nationwide.
            </p>
          </motion.div>

          {/* Grid displaying all clients & partners */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {clients.map((client, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-4 border border-[#DDE0F5] hover:border-[#7e82f4]/40 shadow-ambient flex flex-col items-center justify-center min-h-[110px] md:min-h-[120px] transition-all duration-300 group"
              >
                <div className="h-12 md:h-14 flex items-center justify-center w-full px-2">
                  <img
                    src={client.url}
                    alt={client.alt || client.name}
                    className="max-h-full max-w-full object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-semibold text-text-secondary/75 mt-2 font-sans truncate max-w-full group-hover:text-primary transition-colors">
                  {client.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS SECTION
       ═══════════════════════════════════════════ */}
      <section id="testimonials" className="py-24 lg:py-28 bg-[#F8F9FF] border-t border-[#DDE0F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            className="mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-[#7e82f4] text-xs font-bold uppercase tracking-widest font-sans mb-3 block">Patient Stories</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">Testimonials</h2>
            <p className="text-body-md text-text-secondary leading-relaxed font-sans mt-4 max-w-2xl mx-auto">
              Read how our dedicated care programs and personalized medical support improve the lives of our patients.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-[#DDE0F5] shadow-ambient shadow-ambient-hover flex flex-col justify-between"
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <div>
                  <div className="flex gap-1 mb-4 text-[#FFD700]">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed font-sans italic mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-[#DDE0F5]/50 pt-4">
                  <div className="w-10 h-10 rounded-full bg-[#7e82f4]/10 flex items-center justify-center font-bold text-xs text-primary font-sans">
                    {t.author[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm font-sans">{t.author}</h4>
                    <p className="text-xs text-text-secondary font-sans">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ SECTION
       ═══════════════════════════════════════════ */}
      <section id="faq" className="py-24 lg:py-28 bg-white border-t border-[#DDE0F5]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            className="mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-[#7e82f4] text-xs font-bold uppercase tracking-widest font-sans mb-3 block">Got Questions?</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">FAQ</h2>
            <p className="text-body-md text-text-secondary leading-relaxed font-sans mt-4">
              Find answers to common questions about our patient support programs, pricing, and health services.
            </p>
          </motion.div>

          <div className="space-y-6 text-left">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#F8F9FF] p-6 rounded-2xl border border-[#DDE0F5]/80 shadow-sm"
              >
                <h3 className="font-display font-bold text-primary text-lg mb-2">
                  {faq.question}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed font-sans">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT CTA SECTION with Aurora Background
       ═══════════════════════════════════════════ */}
      <section id="contact" className="py-20 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="relative rounded-[32px] overflow-hidden p-8 md:p-12 lg:p-16 shadow-ambient"
            style={{ backgroundColor: '#EDF3FF' }}
          >
            {/* Aurora background */}
            <Aurora
              colorStops={['#ECECFE', '#c0c1ff', '#eaf4fd']}
              amplitude={0.8}
              speed={0.5}
              blend={0.6}
              style={{ opacity: 0.4 }}
            />

            {/* Soft decorative blur circles to make it feel premium */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/40 rounded-full filter blur-xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/40 rounded-full filter blur-xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

              {/* Left Column - Content */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div>
                  <span className="text-surface-tint text-xs font-bold uppercase tracking-[0.2em] font-sans mb-3 block">
                    Get in Touch
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-primary tracking-tight leading-tight">
                    Need personalized<br />healthcare guidance?
                  </h2>
                </div>

                <p className="text-body-md text-text-secondary leading-relaxed max-w-xl font-sans">
                  Connect with our care team to discover how our solutions can support your family's health goals.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link
                    to="/contact"
                    className="bg-primary text-white font-sans font-semibold text-sm px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="w-4.5 h-4.5" />
                  </Link>
                  <a
                    href="#services"
                    className="bg-white border border-[#DDE0F5] text-primary hover:bg-[#ECECFE]/20 font-sans font-semibold text-sm px-8 py-4 rounded-xl shadow-sm active:scale-[0.98] transition-all duration-200 text-center"
                  >
                    Explore Patient Programs
                  </a>
                </div>
              </div>

              {/* Right Column - Info Cards */}
              <div className="lg:col-span-5 flex flex-col gap-6 w-full lg:max-w-md lg:ml-auto">

                {/* Call Us Card */}
                <motion.a
                  href="tel:+919667835909"
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-[#DDE0F5]/60 flex items-center gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-md transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#ECECFE] flex items-center justify-center text-surface-tint shrink-0 group-hover:bg-[#e2e4ff] transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <p className="text-[10px] text-text-secondary/70 uppercase font-semibold font-sans tracking-[0.15em]">Call Us</p>
                    <p className="font-display font-bold text-xl text-primary tracking-tight">+91 9667835909</p>
                  </div>
                </motion.a>

                {/* Email Us Card */}
                <motion.a
                  href="mailto:connect@impacthealth.co.in"
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-[#DDE0F5]/60 flex items-center gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-md transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#ECECFE] flex items-center justify-center text-surface-tint shrink-0 group-hover:bg-[#e2e4ff] transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <p className="text-[10px] text-text-secondary/70 uppercase font-semibold font-sans tracking-[0.15em]">Email Us</p>
                    <p className="font-display font-bold text-xl text-primary tracking-tight break-all">connect@impacthealth.co.in</p>
                  </div>
                </motion.a>

              </div>

            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
