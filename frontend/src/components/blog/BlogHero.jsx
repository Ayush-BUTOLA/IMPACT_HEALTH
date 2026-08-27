import { Activity, ShieldCheck, HeartHandshake, BookOpen, ClipboardList } from 'lucide-react';

/**
 * Blog Hero Section
 * Badge + headline + description with Healthcare Trust Indicators.
 * Matches homepage hero pattern: bg-[#ECECFE]/40, blurred gradient orbs.
 */
export default function BlogHero() {
  return (
    <section className="relative bg-[#ECECFE]/40 overflow-hidden py-20 lg:py-28 border-b border-[#DDE0F5]/50">
      {/* Decorative background elements matches homepage pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/5 rounded-full filter blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-surface-tint/5 rounded-full filter blur-3xl opacity-60"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full filter blur-3xl"></div>

      {/* Subtle healthcare grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 0h4v60h-4z' fill='%23030050'/%3E%3Cpath d='M0 28h60v4H0z' fill='%23030050'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }}></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge same pattern as homepage hero badge */}
          <div
            className="inline-flex items-center gap-2 bg-[#107C10]/10 border border-[#107C10]/20 text-[#107C10] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Trusted Healthcare Knowledge</span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary tracking-tight leading-tight"
          >
            Trusted Healthcare{' '}
            <span className="text-surface-tint relative inline-block">
              Knowledge
              <span className="absolute bottom-1 left-0 w-full h-1 bg-[#ECECFE]"></span>
            </span>{' '}
            & Insights
          </h1>

          {/* Description */}
          <p
            className="text-body-lg text-text-secondary leading-relaxed max-w-2xl mx-auto font-sans"
          >
            Stay informed with expert-reviewed articles, clinical research, diagnostics, and operational insights from the care coordination team at Impact Health.
          </p>

          {/* Trust Pillars Grid */}
          <div className="pt-8 border-t border-[#DDE0F5]/60 mt-12">
            <div className="text-xs font-bold uppercase tracking-widest text-[#107C10] mb-6 flex items-center justify-center gap-2 font-sans">
              <span className="w-2 h-2 rounded-full bg-[#107C10] animate-pulse"></span>
              <span>Medical Advisory Board Reviewed • Clinical Accuracy Verified</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-left">
              {/* Pillar 1: Research */}
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-[#DDE0F5]/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-ambient">
                <div className="w-9 h-9 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mb-3">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-primary font-sans uppercase tracking-wider mb-1">Research</h4>
                <p className="text-[10px] text-text-secondary font-sans leading-relaxed">
                  Insights on clinical trials & epidemiological trends.
                </p>
              </div>

              {/* Pillar 2: Diagnostics */}
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-[#DDE0F5]/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-ambient">
                <div className="w-9 h-9 rounded-xl bg-surface-tint/5 border border-surface-tint/10 flex items-center justify-center text-surface-tint mb-3">
                  <Activity className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-primary font-sans uppercase tracking-wider mb-1">Diagnostics</h4>
                <p className="text-[10px] text-text-secondary font-sans leading-relaxed">
                  Modern testing models & early disease mapping.
                </p>
              </div>

              {/* Pillar 3: Disease Management */}
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-[#DDE0F5]/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-ambient">
                <div className="w-9 h-9 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mb-3">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-primary font-sans uppercase tracking-wider mb-1">Management</h4>
                <p className="text-[10px] text-text-secondary font-sans leading-relaxed">
                  Medication adherence protocols & guides.
                </p>
              </div>

              {/* Pillar 4: Patient Care */}
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-[#DDE0F5]/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-ambient col-span-1">
                <div className="w-9 h-9 rounded-xl bg-[#e16957]/5 border border-[#e16957]/10 flex items-center justify-center text-[#e16957] mb-3">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-primary font-sans uppercase tracking-wider mb-1">Patient Care</h4>
                <p className="text-[10px] text-text-secondary font-sans leading-relaxed">
                  Last-mile care coordination & support ops.
                </p>
              </div>

              {/* Pillar 5: Clinical Insights */}
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-[#DDE0F5]/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-ambient col-span-2 md:col-span-1">
                <div className="w-9 h-9 rounded-xl bg-[#107C10]/5 border border-[#107C10]/10 flex items-center justify-center text-[#107C10] mb-3">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-primary font-sans uppercase tracking-wider mb-1">Clinical Insights</h4>
                <p className="text-[10px] text-text-secondary font-sans leading-relaxed">
                  Authoritative reports for partner organizations.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
