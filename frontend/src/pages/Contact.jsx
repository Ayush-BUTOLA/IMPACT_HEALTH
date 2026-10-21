import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  HeartHandshake,
  Handshake,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import DotGrid from "../components/backgrounds/DotGrid";

const REASONS = [
  { title: "Patient Support", body: "Get help understanding programs and navigating your healthcare journey.", icon: HeartHandshake },
  { title: "Partnerships", body: "Explore collaborations to expand healthcare access and innovation.", icon: Handshake },
  { title: "Business Solutions", body: "Learn how Impact Health supports organizations with tailored solutions.", icon: Briefcase },
];

const INFO = [
  { label: "Phone", value: "+91 9667835909", href: "tel:+919667835909", icon: Phone },
  { label: "Email", value: "connect@impacthealth.co.in", href: "mailto:connect@impacthealth.co.in", icon: Mail },
  { label: "Address", value: "473/B1/P, Kokila Lane 4, Pokhariput, Bhubaneswar, 751020", icon: MapPin },
  { label: "Office Hours", value: "Mon - Fri: 9:00 AM - 6:00 PM IST", icon: Clock },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Contact() {
  const [draftState, setDraftState] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Contact Us | Impact Health";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("fullName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const org = formData.get("organization");
    const msg = formData.get("message");

    const mailtoSubject = encodeURIComponent(`Contact Inquiry from ${name}`);
    const rawBody = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nOrganization: ${org || "N/A"}\n\nMessage:\n${msg}`;
    const mailtoBody = encodeURIComponent(rawBody);
    const mailtoUrl = `mailto:connect@impacthealth.co.in?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    // Explicitly open default mail client with draft
    window.open(mailtoUrl, "_blank");
    setDraftState({ mailtoUrl, subject: `Contact Inquiry from ${name}`, body: rawBody });
  };

  const handleCopy = () => {
    if (!draftState) return;
    const textToCopy = `To: connect@impacthealth.co.in\nSubject: ${draftState.subject}\n\n${draftState.body}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="w-full bg-white relative overflow-hidden">

      {/* HERO Interactive DotGrid background */}
      <section className="relative border-b border-[#e6e7f2] overflow-hidden" style={{ backgroundColor: '#eaf4fd' }}>
        <DotGrid
          dotColor="rgba(91, 91, 214, 0.15)"
          dotActiveColor="rgba(91, 91, 214, 0.6)"
          dotSize={1.3}
          gap={22}
          mouseRadius={130}
        />
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#e6e7f2] rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-navy shadow-sm mb-6 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Get in Touch
            </span>
          </motion.div>
          <motion.h1
            className="font-display font-extrabold text-navy tracking-tight text-[46px] lg:text-[52px] leading-[1.05] max-w-[720px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Let's build better healthcare <span className="text-violet">together</span>
          </motion.h1>
          <motion.p
            className="text-[16px] leading-relaxed text-[#1a1a2e]/60 max-w-[560px] mt-5 font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Whether you are a patient, healthcare provider, pharmaceutical company, or
            partner organization, we are here to help.
          </motion.p>
        </div>
      </section>

      {/* WHY CONTACT */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 text-center">
          <motion.div
            className="flex flex-col items-center text-center gap-3 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-[12px] font-bold tracking-[0.14em] text-violet uppercase font-sans">How We Help</span>
            <h2 className="font-display font-extrabold text-navy tracking-tight text-[32px]">Why Contact Us</h2>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-5 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {REASONS.map((r) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  className="bg-white border border-[#e6e7f2] rounded-2xl p-7 flex flex-col gap-3"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                >
                  <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="font-display font-bold text-[17px] text-navy leading-snug">{r.title}</h3>
                  <p className="text-[13px] leading-relaxed text-[#6b7280] font-sans">{r.body}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="bg-white pb-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12 grid lg:grid-cols-[1.3fr_1fr] gap-8">
          {/* form */}
          <motion.div
            className="bg-lav border border-[#e6e7f2] rounded-[24px] p-8 lg:p-10 text-left"
            style={{ boxShadow: "var(--shadow-card)" }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-display font-extrabold text-navy text-[22px] mb-2">Send us a message</h3>
            <p className="text-xs text-[#6b7280] font-sans mb-6">
              Submitting opens a pre-addressed email draft in your default mail application to our support desk.
            </p>
            {draftState ? (
              <motion.div
                role="status"
                aria-live="polite"
                className="flex flex-col items-center text-center py-8 gap-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-violet">
                  <Mail className="w-6 h-6" strokeWidth={2} />
                </div>
                <div className="font-display font-bold text-[20px] text-navy">Email Draft Prepared!</div>
                <p className="text-[14px] text-[#6b7280] max-w-[440px] font-sans mx-auto mt-1 leading-relaxed">
                  We've opened your default email application addressed to <strong className="text-navy">connect@impacthealth.co.in</strong>. Please click <strong>Send</strong> in your mail application to submit your inquiry.
                </p>

                {/* Accessible Fallback Options */}
                <div className="bg-white border border-[#e6e7f2] rounded-xl p-5 mt-4 text-left w-full max-w-[460px] mx-auto text-xs text-[#4f5373] space-y-3 shadow-xs">
                  <div className="font-bold text-navy text-[13px]">Didn't see your email app open?</div>
                  <p className="leading-relaxed">
                    Some browsers or popup blockers restrict mail links. You can re-trigger the draft or copy the message directly:
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    <a
                      href={draftState.mailtoUrl}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-navy text-white font-medium hover:bg-navy-deep transition-colors text-xs"
                    >
                      <Mail className="w-3.5 h-3.5" /> Re-open Email App
                    </a>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-[#d6d9ee] text-navy font-medium hover:bg-slate-50 transition-colors text-xs cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied to Clipboard!" : "Copy Email & Message"}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDraftState(null)}
                  className="mt-5 text-xs font-bold text-violet hover:underline cursor-pointer"
                >
                  Draft another inquiry
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    required
                    id="fullName"
                    name="fullName"
                    aria-label="Full Name"
                    data-testid="contact-name-input"
                    placeholder="Full Name"
                    className="bg-white border border-[#e6e7f2] rounded-xl px-4 py-3 text-[13.5px] text-navy placeholder:text-[#6b7280] focus:outline-none focus:border-violet/50 focus:ring-2 focus:ring-violet/10 font-sans transition-all duration-200"
                  />
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    aria-label="Email Address"
                    data-testid="contact-email-input"
                    placeholder="Email Address"
                    className="bg-white border border-[#e6e7f2] rounded-xl px-4 py-3 text-[13.5px] text-navy placeholder:text-[#6b7280] focus:outline-none focus:border-violet/50 focus:ring-2 focus:ring-violet/10 font-sans transition-all duration-200"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    id="phone"
                    name="phone"
                    aria-label="Phone Number"
                    data-testid="contact-phone-input"
                    placeholder="Phone Number"
                    className="bg-white border border-[#e6e7f2] rounded-xl px-4 py-3 text-[13.5px] text-navy placeholder:text-[#6b7280] focus:outline-none focus:border-violet/50 focus:ring-2 focus:ring-violet/10 font-sans transition-all duration-200"
                  />
                  <input
                    id="organization"
                    name="organization"
                    aria-label="Organization"
                    data-testid="contact-org-input"
                    placeholder="Organization (Optional)"
                    className="bg-white border border-[#e6e7f2] rounded-xl px-4 py-3 text-[13.5px] text-navy placeholder:text-[#6b7280] focus:outline-none focus:border-violet/50 focus:ring-2 focus:ring-violet/10 font-sans transition-all duration-200"
                  />
                </div>
                <textarea
                  required
                  id="message"
                  name="message"
                  aria-label="Message"
                  data-testid="contact-message-input"
                  placeholder="How can we help your family or organization?"
                  rows={5}
                  className="bg-white border border-[#e6e7f2] rounded-xl px-4 py-3 text-[13.5px] text-navy placeholder:text-[#6b7280] focus:outline-none focus:border-violet/50 focus:ring-2 focus:ring-violet/10 resize-none font-sans transition-all duration-200"
                />
                <motion.button
                  type="submit"
                  data-testid="contact-submit-btn"
                  className="self-start inline-flex items-center gap-2 bg-navy text-white text-[14px] font-semibold px-7 py-3.5 rounded-xl hover:bg-navy-deep transition-colors font-sans cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Draft Email Inquiry <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* info */}
          <motion.div
            className="flex flex-col gap-4 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {INFO.map((info) => {
              const Icon = info.icon;
              const Wrapper = info.href ? 'a' : 'div';
              const wrapperProps = info.href ? { href: info.href } : {};
              return (
                <motion.div key={info.label} variants={fadeInUp}>
                  <Wrapper
                    {...wrapperProps}
                    className="bg-white border border-[#e6e7f2] rounded-2xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow duration-300 block"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-violet-soft flex items-center justify-center shrink-0">
                      <Icon className="w-[18px] h-[18px] text-violet" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold tracking-[0.1em] text-[#6b7280] uppercase mb-1 font-sans">{info.label}</div>
                      <div className="text-[13.5px] font-semibold text-navy leading-relaxed">{info.value}</div>
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
