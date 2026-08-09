import { BookOpen } from 'lucide-react';

/**
 * Empty State — displayed when no blog articles exist in the CMS.
 * Premium healthcare empty state card.
 *
 * Props:
 *  - show: boolean — true if there are zero articles total (not just filtered)
 */
export default function BlogEmpty({ show }) {
  if (!show) return null;

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-[#DDE0F5]/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          {/* Premium empty state card */}
          <div className="bg-[#fcf8ff] rounded-3xl p-10 md:p-14 lg:p-16 border border-[#DDE0F5]/60 shadow-ambient text-center relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/[0.03] rounded-full -mr-16 -mt-16 filter blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-surface-tint/[0.03] rounded-full -ml-12 -mb-12 filter blur-2xl"></div>

            {/* Healthcare/Book icon */}
            <div className="relative mx-auto mb-8">
              {/* Pulsing ring */}
              <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-[#ECECFE]/50 animate-ping opacity-20"></div>
              <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-surface-tint/10 border border-[#DDE0F5] flex items-center justify-center shadow-sm">
                <BookOpen className="w-9 h-9 text-primary/60" />
              </div>
            </div>

            {/* Heartbeat SVG line */}
            <div className="flex justify-center mb-8 opacity-20">
              <svg width="240" height="40" viewBox="0 0 240 40" fill="none" className="text-primary">
                <path
                  d="M0 20 L40 20 L50 20 L60 8 L70 32 L80 4 L90 36 L100 20 L110 20 L150 20 L160 20 L170 8 L180 32 L190 4 L200 36 L210 20 L240 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">
              Knowledge Center Launching Soon
            </h2>

            {/* Description */}
            <p className="text-body-md text-text-secondary leading-relaxed font-sans max-w-md mx-auto">
              Our medical advisory board is preparing expert-reviewed healthcare resources and clinical insights.
              Published articles will appear here once available.
            </p>
          </div>
        </div>
      </div>
    </section> 
  );
}
