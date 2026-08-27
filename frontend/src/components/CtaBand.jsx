import { Link } from "react-router-dom";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import DotGrid from "./backgrounds/DotGrid";

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export default function CtaBand() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-20">
        <motion.div
          className="relative overflow-hidden rounded-[28px] px-8 py-10 md:px-12 md:py-14 border border-[#DDE0F5]/60"
          style={{ boxShadow: "var(--shadow-card)", backgroundColor: '#eaf4fd' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {/* Interactive DotGrid background */}
          <DotGrid
            dotColor="rgba(91, 91, 214, 0.13)"
            dotActiveColor="rgba(91, 91, 214, 0.55)"
            dotSize={1.2}
            gap={22}
            mouseRadius={120}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-left">
            <div className="max-w-[520px]">
              <span className="text-[12px] font-bold tracking-[0.14em] text-violet uppercase font-sans">
                Get in touch
              </span>
              <h2 className="font-display font-extrabold text-navy tracking-tight text-[32px] leading-tight mt-2">
                Need personalized healthcare guidance?
              </h2>
              <p className="text-[14.5px] text-[#1a1a2e]/60 mt-3 font-sans">
                Connect with our care team to discover how our solutions can support
                your family's health goals.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-navy text-white text-[14px] font-semibold px-6 py-3 rounded-xl hover:bg-navy-deep transition-all duration-200"
                >
                  <span>Contact Us</span> <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
                <motion.a
                  href="#services"
                  className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-navy text-[14px] font-semibold px-6 py-3 rounded-xl border-[1.5px] border-[#e6e7f2] hover:border-navy/30 transition-all duration-200"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore Patient Programs
                </motion.a>
              </div>
            </div>

            <div className="flex flex-col gap-3 shrink-0 w-full lg:w-auto">
              <motion.a
                href="tel:+919667835909"
                className="flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-[#e6e7f2] rounded-xl px-4 py-3 hover:shadow-sm transition-shadow group"
                whileHover={{ scale: 1.02 }}
              >
                <span className="w-9 h-9 rounded-lg bg-violet-soft flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-violet" strokeWidth={2} />
                </span>
                <div>
                  <div className="text-[11px] text-[#6b7280] uppercase tracking-wide font-sans">Call us</div>
                  <div className="text-[14px] font-semibold text-navy font-mono">+91 9667835909</div>
                </div>
              </motion.a>
              <motion.a
                href="mailto:connect@impacthealth.co.in"
                className="flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-[#e6e7f2] rounded-xl px-4 py-3 hover:shadow-sm transition-shadow group"
                whileHover={{ scale: 1.02 }}
              >
                <span className="w-9 h-9 rounded-lg bg-violet-soft flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-violet" strokeWidth={2} />
                </span>
                <div>
                  <div className="text-[11px] text-[#6b7280] uppercase tracking-wide font-sans">Email us</div>
                  <div className="text-[14px] font-semibold text-navy break-all font-sans">connect@impacthealth.co.in</div>
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
