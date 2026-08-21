import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

/**
 * Newsletter Subscription + CTA Sections
 * Combines the newsletter signup and the final CTA block.
 */
export default function BlogNewsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // TODO: Connect to newsletter API
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════
          NEWSLETTER SECTION
       ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-28 bg-[#F8F9FF] border-y border-[#DDE0F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-surface-tint/10 text-surface-tint px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Newsletter</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary">
              Stay at the Forefront
            </h2>

            {/* Description */}
            <p className="text-body-md text-text-secondary leading-relaxed font-sans max-w-lg mx-auto">
              Join healthcare professionals receiving the latest updates, research summaries,
              and industry insights delivered to your inbox.
            </p>

            {/* Subscription form */}
            {isSubscribed ? (
              <div className="inline-flex items-center gap-2 bg-[#107C10]/10 text-[#107C10] px-6 py-4 rounded-xl text-sm font-semibold font-sans">
                <CheckCircle className="w-5 h-5" />
                <span>Thank you! You're now subscribed to our newsletter.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-stretch gap-3 max-w-lg mx-auto"
              >
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-4.5 h-4.5 text-outline/50" />
                  </div>
                  <input
                    id="blog-newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full pl-12 pr-5 py-4 bg-white border border-border-subtle rounded-xl text-sm font-sans text-on-surface placeholder:text-outline/50 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
                    aria-label="Email address for newsletter"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white font-sans font-semibold text-sm px-8 py-4 rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-ambient whitespace-nowrap"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Trust text */}
            <p className="text-xs text-outline/60 font-sans">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA SECTION
       ═══════════════════════════════════════════ */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-primary rounded-3xl p-10 md:p-14 lg:p-20 relative overflow-hidden shadow-ambient">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -mr-36 -mt-36 filter blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/[0.03] rounded-full -ml-28 -mb-28 filter blur-xl"></div>
            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-surface-tint/10 rounded-full filter blur-2xl"></div>

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans">
                <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></span>
                <span>Get Started Today</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-display font-bold text-white tracking-tight leading-tight">
                Need Personalized Healthcare Guidance?
              </h2>

              {/* Description */}
              <p className="text-slate-300 text-body-md leading-relaxed font-sans max-w-xl mx-auto">
                Connect with our team to discover how our solutions can support
                your healthcare goals and improve patient outcomes.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href="#contact"
                  className="bg-white text-primary font-sans font-bold text-sm px-8 py-4 rounded-xl hover:bg-slate-50 transition-all shadow-sm text-center min-w-[180px]"
                >
                  Contact Us
                </a>
                <a
                  href="#solutions"
                  className="bg-white/10 text-white border border-white/20 font-sans font-semibold text-sm px-8 py-4 rounded-xl hover:bg-white/20 transition-all text-center min-w-[180px]"
                >
                  Explore Patient Support Programs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
