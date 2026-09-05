import { useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ShieldCheck, Award } from 'lucide-react';

const COLS = [
  {
    head: "Navigation",
    links: [
      { name: "Home", to: "#home", isSection: true },
      { name: "About", to: "/about" },
      { name: "Patient Support Programs", to: "/patient-support-programs" },
      { name: "Services", to: "/services" }
    ]
  },
  {
    head: "Patient Portal",
    links: [
      { name: "Privacy Policy", to: "/privacy-policy" },
      { name: "Terms of Service", to: "/privacy-policy" },
      { name: "Patient Support", to: "/services/patient-support" },
      { name: "Doctor Login", to: "/doctor/blogs" }
    ]
  }
];

export default function Footer() {
  const footerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, link) => {
    e.preventDefault();

    if (link.path) {
      navigate(link.path);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(link.id);
        if (el) {
          const offset = 80;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const el = document.getElementById(link.id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer ref={footerRef} className="bg-[#0B132B] text-slate-300 w-full mt-auto font-sans border-t border-slate-800">
      
      {/* 1. Governance & Accreditation Banner */}
      <div className="border-b border-slate-800 bg-[#060B18]/70 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-300">ISO 9001:2015 Certified Healthcare Management</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>DIPP Recognized Startup by Startup India</span>
            <span>•</span>
            <span>Recognized by Startup Odisha</span>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-10 text-left">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-display font-extrabold text-[13px] text-white shadow-sm">
                IH
              </div>
              <span className="font-display font-bold text-lg text-white">Impact Health</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-400 max-w-[280px] font-sans">
              Accessible, high-quality disease management and smart health solutions tailored for your family.
            </p>
            <div className="flex items-start gap-2 text-xs text-slate-400 font-sans mt-1">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#0066FF]" />
              <span>473/B1/P, Kokila Lane-4, Pokhariput, Bhubaneswar, 751020</span>
            </div>
          </div>

          {/* Navigation Columns */}
          {COLS.map((c) => (
            <div key={c.head} className="flex flex-col gap-3">
              <div className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                {c.head}
              </div>
              <div className="flex flex-col gap-2.5">
                {c.links.map((link) => {
                  if (link.isSection) {
                    return (
                      <a
                        key={link.name}
                        href={link.to}
                        onClick={(e) => handleNavClick(e, { id: link.to.substring(1) })}
                        className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={link.name}
                      to={link.to}
                      className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Contact Column */}
          <div className="flex flex-col gap-3">
            <div className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Contact</div>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-[#0066FF]" /> 
                <a href="tel:+919667835909" className="hover:text-white transition-colors font-mono">+91 9667835909</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-[#0066FF]" /> 
                <a href="mailto:connect@impacthealth.co.in" className="hover:text-white transition-colors">connect@impacthealth.co.in</a>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Bottom Copyright Bar */}
        <div className="pt-10 mt-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <p>© 2026 3 PH Solutions LLP. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-400 transition">Privacy Policy</Link>
            <Link to="/privacy-policy" className="hover:text-slate-400 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
