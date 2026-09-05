import { Link } from "react-router-dom";
import { Phone, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "./Button";

export default function CtaBand() {
  return (
    <section className="py-16 sm:py-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-1.5 rounded-[2rem] bg-slate-900/90 ring-1 ring-slate-800 shadow-2xl">
          <div className="rounded-[calc(2rem-0.375rem)] p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#0B132B] via-[#0E1E45] to-[#060B18] text-white relative overflow-hidden border border-white/10">
            
            {/* Ambient background glows */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 text-left relative z-10">
              
              <div className="max-w-xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/20 text-[#7FB5FF] text-[11px] font-mono font-bold tracking-[0.18em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
                  Get in touch
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                  Need personalized healthcare guidance?
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Connect with our care team to discover how our tailored patient support programs and doorstep clinical services can support your health goals.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link to="/contact">
                    <Button
                      variant="primary"
                      size="md"
                      withArrow
                      className="bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-[0_4px_16px_rgba(0,102,255,0.35)] rounded-full px-6 py-2.5"
                    >
                      Contact Care Team
                    </Button>
                  </Link>
                  <Link to="/patient-support-programs">
                    <Button
                      variant="secondary"
                      size="md"
                      className="bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:text-white rounded-full px-6 py-2.5 backdrop-blur-sm"
                    >
                      Explore Patient Programs
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0 w-full lg:w-auto lg:min-w-[320px]">
                <a
                  href="tel:+919667835909"
                  className="group p-4 sm:p-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-blue-400/40 transition-all duration-200 flex items-center gap-4 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-500/20 group-hover:bg-[#0066FF] text-[#7FB5FF] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Direct Helpline</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <div className="font-display font-bold text-sm sm:text-base text-white font-mono tracking-tight group-hover:text-[#7FB5FF] transition-colors">
                      +91 9667835909
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Direct Care Support · Quick Response</div>
                  </div>
                </a>

                <a
                  href="mailto:connect@impacthealth.co.in"
                  className="group p-4 sm:p-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-emerald-400/40 transition-all duration-200 flex items-center gap-4 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/20 group-hover:bg-emerald-600 text-emerald-300 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Email Inquiry Desk</div>
                    <div className="font-display font-semibold text-xs sm:text-sm text-white break-all font-sans group-hover:text-emerald-300 transition-colors">
                      connect@impacthealth.co.in
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Central Clinical Dispatch Team</div>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
