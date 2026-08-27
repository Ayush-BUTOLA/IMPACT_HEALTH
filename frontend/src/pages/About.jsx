import { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  ShieldCheck, 
  HeartHandshake, 
  Globe, 
  Coins, 
  Clock, 
  Activity, 
  GraduationCap, 
  Building 
} from 'lucide-react';
import cert1 from '../assets/1.png';
import cert2 from '../assets/2.png';
import yourStoryLogo from '../assets/5bee83f7a69edda26bc5b891_YourStory_Logo-New-01-1024x346.png';
import missionGirlImg from '../assets/mission_healthcare_impact.jpg';
import Aurora from '../components/backgrounds/Aurora';

const fadeInUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 }
};

export default function About() {
  useEffect(() => {
    document.title = "About Us | Impact Health";
    
    // Smooth scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const coreValues = [
    {
      title: "Respect",
      icon: <HeartHandshake className="w-8 h-8 text-surface-tint" />,
      desc: "We respect every individual and community and appreciate valuable concrete concerns in the future."
    },
    {
      title: "Quality",
      icon: <ShieldCheck className="w-8 h-8 text-surface-tint" />,
      desc: "We constantly keep ourselves and quality, communication and review the dedicated quality care."
    },
    {
      title: "Patient Care",
      icon: <Users className="w-8 h-8 text-surface-tint" />,
      desc: "We keep striving towards the highly quality outcome and diseases remedies with better patient care."
    }
  ];

  return (
    <div id="about-page" className="w-full bg-white relative overflow-hidden">
      
      {/* ═══════════════════════════════════════════
          HERO BANNER with Aurora Background
       ═══════════════════════════════════════════ */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        {/* Aurora background */}
        <Aurora
          colorStops={['#030050', '#0d0489', '#7e82f4']}
          amplitude={1.2}
          speed={0.6}
          blend={0.7}
        />

        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent pointer-events-none z-[1]"></div>

        <motion.div
          className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight max-w-3xl">
            Empowering Healthcare through Innovation
          </h1>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          MISSION & ABOUT US
       ═══════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════
          OUR ORIGIN & MISSION
       ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Mission Girl Image with circle container */}
            <motion.div
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col items-center max-w-[360px]">
                <div className="relative group rounded-full overflow-hidden shadow-ambient border border-[#DDE0F5] bg-white p-3 transition-transform duration-500 hover:scale-[1.02] w-72 h-72 md:w-80 md:h-80">
                  {/* Decorative glow */}
                  <div className="absolute -inset-1 bg-gradient-to-tr from-[#7e82f4] to-[#ECECFE] rounded-full opacity-20 blur-md group-hover:opacity-35 transition-opacity duration-500"></div>
                  
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-50">
                    <img 
                      src={missionGirlImg} 
                      alt="On a mission to impact 1 million lives with Quality Care & Services by 2028"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="mt-6 px-3 text-center">
                  <p className="text-base md:text-lg font-display font-bold text-primary leading-snug">
                    On a mission to impact 1 million lives with Quality Care & Services by 2028
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Origin story & Pillars */}
            <motion.div
              className="lg:col-span-7 space-y-8 text-left"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <span className="text-[#7e82f4] text-xs font-bold uppercase tracking-widest font-sans mb-3 block">Who We Are</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">Our Origin Story</h2>
              </div>
              
              <div className="text-body-md text-text-secondary leading-relaxed font-sans space-y-4">
                <p>
                  Impact Health was born out of a major issue: a lack of access to quality and affordable care on time. Even when India has numerous good hospitals, affordability for basic medical care or primary care is a challenge for many.
                </p>
                <p className="font-semibold text-primary">
                  Our core focus is built on three key pillars:
                </p>
              </div>

              {/* Pillars grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                <div className="bg-[#F8F9FF] p-5 rounded-2xl border border-[#DDE0F5] hover:border-[#7e82f4]/40 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#DDE0F5] flex items-center justify-center mb-4 text-[#7e82f4]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-primary mb-1 text-base">Accessible</h4>
                  <p className="text-xs text-text-secondary leading-normal">Making premium care within reach for everyone.</p>
                </div>
                
                <div className="bg-[#F8F9FF] p-5 rounded-2xl border border-[#DDE0F5] hover:border-[#7e82f4]/40 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#DDE0F5] flex items-center justify-center mb-4 text-[#7e82f4]">
                    <Coins className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-primary mb-1 text-base">Affordable</h4>
                  <p className="text-xs text-text-secondary leading-normal">Lowering primary and basic medical costs.</p>
                </div>

                <div className="bg-[#F8F9FF] p-5 rounded-2xl border border-[#DDE0F5] hover:border-[#7e82f4]/40 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#DDE0F5] flex items-center justify-center mb-4 text-[#7e82f4]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-primary mb-1 text-base">Convenient</h4>
                  <p className="text-xs text-text-secondary leading-normal">Providing care on time, exactly when needed.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OUR IMPACT & SCALE
       ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-[#F8F9FF] border-y border-[#DDE0F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            className="max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#7e82f4] text-xs font-bold uppercase tracking-widest font-sans mb-3 block">Proven Numbers</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">Our Impact & Scale</h2>
            <p className="text-body-md text-text-secondary leading-relaxed font-sans mt-4">
              Over the years, Impact Health has worked intensively to build a tech-enabled supply chain model to reduce the unwanted costs in healthcare services and enhance care in each Indian city as per Metropolitan standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-2xl border border-[#DDE0F5]/60 shadow-ambient flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-4xl lg:text-5xl font-display font-extrabold text-[#e16957] mb-2 font-black group-hover:scale-105 transition-transform">~60%</div>
              <h4 className="font-display font-bold text-primary mb-2">Cost Reduction</h4>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                Reduced out-of-pocket expenditure of patients on healthcare.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-2xl border border-[#DDE0F5]/60 shadow-ambient flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl lg:text-5xl font-display font-extrabold text-[#7e82f4] mb-2 font-black group-hover:scale-105 transition-transform">200+</div>
              <h4 className="font-display font-bold text-primary mb-2">Indian Cities</h4>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                Pathology service live with Metropolitan standards.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-2xl border border-[#DDE0F5]/60 shadow-ambient flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-4xl lg:text-5xl font-display font-extrabold text-[#e16957] mb-2 font-black group-hover:scale-105 transition-transform">400+</div>
              <h4 className="font-display font-bold text-primary mb-2">Daily Consults</h4>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                Patients consulted daily with quality diagnostics.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-2xl border border-[#DDE0F5]/60 shadow-ambient flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#ECECFE]/60 flex items-center justify-center mb-3 text-primary">
                <Activity className="w-6 h-6 text-[#7e82f4]" />
              </div>
              <h4 className="font-display font-bold text-primary mb-2">Tech Supply Chain</h4>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                Built-in tech framework to minimize service costs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TARGETED PROGRAMS
       ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            className="max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#7e82f4] text-xs font-bold uppercase tracking-widest font-sans mb-3 block">Grassroots Care</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">Targeted Wellness Programs</h2>
            <p className="text-body-md text-text-secondary leading-relaxed font-sans mt-4">
              We believe in addressing health issues from the grassroots level. Our curated health and wellness programs are designed to holistically identify issues early, saving lives through timely diagnosis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Program 1 */}
            <motion.div
              className="bg-white p-8 rounded-3xl border border-[#DDE0F5] hover:border-[#7e82f4]/35 shadow-ambient hover:shadow-lg transition-all duration-300 flex flex-col text-left group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#ECECFE]/60 flex items-center justify-center mb-6 text-[#7e82f4] group-hover:bg-[#7e82f4] group-hover:text-white transition-colors duration-300">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display font-bold text-primary mb-3">School Health Program</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-sans">
                One of the most advanced and detailed assessment programs for school children across Pan India. We enable early detection and timely diagnosis of childhood diseases directly at school campuses.
              </p>
            </motion.div>

            {/* Program 2 */}
            <motion.div
              className="bg-white p-8 rounded-3xl border border-[#DDE0F5] hover:border-[#7e82f4]/35 shadow-ambient hover:shadow-lg transition-all duration-300 flex flex-col text-left group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#ECECFE]/60 flex items-center justify-center mb-6 text-[#7e82f4] group-hover:bg-[#7e82f4] group-hover:text-white transition-colors duration-300">
                <Building className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display font-bold text-primary mb-3">Corporate Wellness</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-sans">
                A single-umbrella solution for corporates and companies. We manage complete corporate wellness pathways, ranging from initial pre-employment checkups to comprehensive retirement planning.
              </p>
            </motion.div>

            {/* Program 3 */}
            <motion.div
              className="bg-white p-8 rounded-3xl border border-[#DDE0F5] hover:border-[#7e82f4]/35 shadow-ambient hover:shadow-lg transition-all duration-300 flex flex-col text-left group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#ECECFE]/60 flex items-center justify-center mb-6 text-[#7e82f4] group-hover:bg-[#7e82f4] group-hover:text-white transition-colors duration-300">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display font-bold text-primary mb-3">Food Safety Vaccinations</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-sans">
                We run one of the largest vaccination drives in the country for food handlers. This massive operation ensures the safety and well-being of the food service workforce, protecting the general public.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OUR CORE VALUES
       ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-28 bg-[#F8F9FF] border-y border-[#DDE0F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            className="max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-[#7e82f4] text-xs font-bold uppercase tracking-widest font-sans mb-3 block">What Drives Us</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">Our Core Values</h2>
          </motion.div>

          <motion.div
            ref={valuesRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {coreValues.map((val, idx) => (
              <motion.div 
                key={idx}
                className="bg-white p-8 rounded-2xl border border-[#DDE0F5]/60 shadow-ambient transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col items-center text-center"
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#ECECFE]/60 flex items-center justify-center mb-6">
                  {val.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-primary mb-4">{val.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed font-sans">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOUNDER QUOTE SECTION
       ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="bg-[#fcf8ff] rounded-3xl border border-[#DDE0F5]/60 p-8 md:p-14 lg:p-16 shadow-ambient"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left: Founder Photo */}
              <div className="lg:col-span-4 flex justify-center">
                <motion.div
                  className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border-4 border-[#ECECFE] shadow-sm"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfJxEo37U3qLZFlVZ_UIAkSntqR90rI0JVu1YHmNhUT9831Q9sluiEtuN7fxBLBr2JgAqZxsbwglc9QCK4xey5EEuo3076qEKDhCvH9XFcE_OrEG0obzicQvD0g9xO-Jc8ifgrxdkPWF6MXLAqsKYlFjTb9D5s0gOF2M-NR2rxMgead12dNMeCOwKJg_XrvQBv_GSrJNgxBs67RpiZvsyjbPLgdoK3OagfzCgYdEfeoMRKr_1JsI2VaB6D9ZFmr-UrLO_aPBom_DM"
                    alt="Anshuman Sahoo"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Right: Quotes & Description */}
              <div className="lg:col-span-8 text-left space-y-6 relative">
                {/* Big decorative quotes icon */}
                <div className="text-6xl md:text-8xl font-serif text-primary/10 absolute -top-8 -left-4 pointer-events-none">&ldquo;</div>
                
                <div className="space-y-6 relative z-10 font-sans">
                  <p className="text-lg md:text-xl font-display font-medium text-primary italic leading-relaxed">
                    "I thank everyone who has been a part of our journey and motivated and pushed us towards suggested the maps of impacting lives of people. We constantly strive to perfection with our earnest efforts towards patient care and centers."
                  </p>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed font-sans">
                    "We at Impact Health live by the principles of providing excellence to the services and working towards impacting the lives of people for a better future today and tomorrow."
                  </p>
                  
                  <div className="pt-4 border-t border-[#DDE0F5]">
                    <h4 className="font-display font-bold text-lg text-primary">Anshuman Sahoo</h4>
                    <p className="text-xs font-bold text-surface-tint uppercase tracking-widest font-sans mt-0.5">Founder &amp; CEO</p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          AWARDS & RECOGNITION
       ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-28 bg-[#F8F9FF] border-t border-[#DDE0F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-[#7e82f4] text-xs font-bold uppercase tracking-widest font-sans mb-3 block">Recognitions</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">Awards &amp; Recognition</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Award 1 */}
            <motion.div
              className="bg-white p-6 rounded-2xl border border-[#DDE0F5]/60 shadow-ambient flex flex-col justify-between"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="relative overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-4 flex items-center justify-center aspect-[4/3] mb-6">
                <img 
                  src={cert1} 
                  alt="DIPP recognized startup by Startup India"
                  className="max-h-full max-w-full object-contain shadow-sm"
                />
              </div>
              <p className="text-sm font-semibold text-primary font-sans leading-relaxed text-center">
                DIPP recognized startup by Startup India, Government of India.
              </p>
            </motion.div>

            {/* Award 2 */}
            <motion.div
              className="bg-white p-6 rounded-2xl border border-[#DDE0F5]/60 shadow-ambient flex flex-col justify-between"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="relative overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-4 flex items-center justify-center aspect-[4/3] mb-6">
                <img 
                  src={cert2} 
                  alt="Recognized as Solution based Healthcare Startup by Startup Odisha"
                  className="max-h-full max-w-full object-contain shadow-sm"
                />
              </div>
              <p className="text-sm font-semibold text-primary font-sans leading-relaxed text-center">
                Recognized as Solution based Healthcare Startup by Startup Odisha, Government of Odisha.
              </p>
            </motion.div>

            {/* Award 3 */}
            <motion.div
              className="bg-white p-6 rounded-2xl border border-[#DDE0F5]/60 shadow-ambient flex flex-col justify-between text-center"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="relative overflow-hidden rounded-xl bg-indigo-50/50 border border-indigo-100 p-6 flex flex-col items-center justify-center aspect-[4/3] mb-6 text-primary">
                <ShieldCheck className="w-16 h-16 text-[#7e82f4] mb-2" />
                <span className="font-display font-extrabold text-lg text-primary">ISO 9001:2015</span>
                <span className="text-[11px] text-surface-tint font-bold uppercase tracking-wider">Certified Healthcare</span>
              </div>
              <p className="text-sm font-semibold text-primary font-sans leading-relaxed text-center">
                ISO 9001:2015 Certified Healthcare Supply &amp; Clinical Management Standards.
              </p>
            </motion.div>

            {/* Award 4 */}
            <motion.div
              className="bg-white p-6 rounded-2xl border border-[#DDE0F5]/60 shadow-ambient flex flex-col justify-between text-center"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="relative overflow-hidden rounded-xl bg-amber-50/50 border border-amber-100 p-6 flex flex-col items-center justify-center aspect-[4/3] mb-6 text-amber-600">
                <Activity className="w-16 h-16 text-amber-500 mb-2" />
                <span className="font-display font-extrabold text-lg text-amber-900">Health-Tech 2024</span>
                <span className="text-[11px] text-amber-700 font-bold uppercase tracking-wider">Excellence Award</span>
              </div>
              <p className="text-sm font-semibold text-primary font-sans leading-relaxed text-center">
                National Healthcare Innovation &amp; Affordable Care Delivery Excellence Recognition.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MEDIA & PRESS
       ═══════════════════════════════════════════ */}
      <section className="py-24 bg-white border-t border-[#DDE0F5]/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-[#7e82f4] text-xs font-bold uppercase tracking-widest font-sans mb-3 block">Featured In</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">Media &amp; Press</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* YourStory Logo */}
            <motion.div
              className="h-36 bg-white rounded-xl border border-[#DDE0F5]/60 flex items-center justify-center p-6 shadow-sm cursor-pointer"
              variants={fadeInUp}
              whileHover={{ shadow: '0 10px 25px -5px rgba(3, 0, 80, 0.08)', scale: 1.02 }}
            >
              <img 
                src={yourStoryLogo} 
                alt="YourStory Logo"
                className="max-h-20 w-auto object-contain"
              />
            </motion.div>

            {/* The Startup Lab Logo */}
            <motion.div
              className="h-36 bg-white rounded-xl border border-[#DDE0F5]/60 flex items-center justify-center p-6 shadow-sm cursor-pointer"
              variants={fadeInUp}
              whileHover={{ shadow: '0 10px 25px -5px rgba(3, 0, 80, 0.08)', scale: 1.02 }}
            >
              <div className="flex flex-col text-left font-sans font-black text-2xl tracking-tight leading-none uppercase">
                <span className="text-[#000000]">THE</span>
                <span className="text-[#E11D48] mt-1">STARTUP</span>
                <span className="text-[#000000] mt-1">LAB<span className="text-[#E11D48]">.</span></span>
              </div>
            </motion.div>

            {/* Economic Times */}
            <motion.div
              className="h-36 bg-white rounded-xl border border-[#DDE0F5]/60 flex items-center justify-center p-6 shadow-sm cursor-pointer"
              variants={fadeInUp}
              whileHover={{ shadow: '0 10px 25px -5px rgba(3, 0, 80, 0.08)', scale: 1.02 }}
            >
              <div className="font-serif font-black text-xl text-[#030050] tracking-tight text-center">
                THE ECONOMIC TIMES
                <span className="block text-[10px] font-sans font-semibold text-surface-tint uppercase tracking-widest mt-1">Health &amp; Tech</span>
              </div>
            </motion.div>

            {/* Financial Express */}
            <motion.div
              className="h-36 bg-white rounded-xl border border-[#DDE0F5]/60 flex items-center justify-center p-6 shadow-sm cursor-pointer"
              variants={fadeInUp}
              whileHover={{ shadow: '0 10px 25px -5px rgba(3, 0, 80, 0.08)', scale: 1.02 }}
            >
              <div className="font-display font-black text-xl text-[#0d0489] tracking-tight text-center">
                FINANCIAL EXPRESS
                <span className="block text-[10px] font-sans font-semibold text-surface-tint uppercase tracking-widest mt-1">Healthcare Spotlight</span>
              </div>
            </motion.div>

            {/* Inc42 */}
            <motion.div
              className="h-36 bg-white rounded-xl border border-[#DDE0F5]/60 flex items-center justify-center p-6 shadow-sm cursor-pointer"
              variants={fadeInUp}
              whileHover={{ shadow: '0 10px 25px -5px rgba(3, 0, 80, 0.08)', scale: 1.02 }}
            >
              <div className="font-sans font-black text-3xl text-[#1E293B] tracking-tight flex items-center gap-1">
                Inc<span className="text-[#7e82f4]">42</span>
              </div>
            </motion.div>

            {/* Business Standard */}
            <motion.div
              className="h-36 bg-white rounded-xl border border-[#DDE0F5]/60 flex items-center justify-center p-6 shadow-sm cursor-pointer"
              variants={fadeInUp}
              whileHover={{ shadow: '0 10px 25px -5px rgba(3, 0, 80, 0.08)', scale: 1.02 }}
            >
              <div className="font-serif font-bold text-lg text-[#0F172A] tracking-normal text-center">
                Business Standard
                <span className="block text-[10px] font-sans font-semibold text-emerald-600 uppercase tracking-widest mt-1">Startup Feature</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
