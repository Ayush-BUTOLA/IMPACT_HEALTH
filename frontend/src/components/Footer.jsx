import { useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

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

    // If on a sub-page, navigate home first then scroll
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
    <footer ref={footerRef} className="bg-navy-deep text-white/70 w-full mt-auto">
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-10 text-left">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg border-[1.5px] border-white/40 flex items-center justify-center font-display font-extrabold text-[13px] text-white">
                IH
              </div>
              <span className="font-display font-extrabold text-[15px] text-white">Impact Health</span>
            </div>
            <p className="text-[13px] leading-relaxed text-white/50 max-w-[280px] font-sans">
              Accessible, high-quality disease management and smart health solutions
              tailored for your family.
            </p>
            <div className="flex items-start gap-2 text-[12.5px] text-white/50 font-sans">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.75} />
              <span>473/B1/P, Kokila Lane-4, Pokhariput, Bhubaneswar, 751020</span>
            </div>
          </div>

          {/* Navigation Columns */}
          {COLS.map((c) => (
            <div key={c.head} className="flex flex-col gap-3.5">
              <div className="text-[12px] font-bold tracking-[0.12em] text-white/40 uppercase font-sans">
                {c.head}
              </div>
              {c.links.map((link) => {
                if (link.isSection) {
                  return (
                    <a
                      key={link.name}
                      href={link.to}
                      onClick={(e) => handleNavClick(e, { id: link.to.substring(1) })}
                      className="text-[13.5px] text-white/60 hover:text-white transition-colors font-sans"
                    >
                      {link.name}
                    </a>
                  );
                }
                if (link.isExternal) {
                  return (
                    <a
                      key={link.name}
                      href={link.to}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[13.5px] text-white/60 hover:text-white transition-colors font-sans font-semibold"
                    >
                      {link.name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="text-[13.5px] text-white/60 hover:text-white transition-colors font-sans"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          ))}

          {/* Contact Column */}
          <div className="flex flex-col gap-3.5">
            <div className="text-[12px] font-bold tracking-[0.12em] text-white/40 uppercase font-sans">Contact</div>
            <div className="flex items-center gap-2 text-[13.5px] text-white/60">
              <Phone className="w-4 h-4 shrink-0" strokeWidth={1.75} /> 
              <a href="tel:+919667835909" className="hover:text-white transition-colors font-mono">+91 9667835909</a>
            </div>
            <div className="flex items-center gap-2 text-[13.5px] text-white/60">
              <Mail className="w-4 h-4 shrink-0" strokeWidth={1.75} /> 
              <a href="mailto:connect@impacthealth.co.in" className="hover:text-white transition-colors font-sans">connect@impacthealth.co.in</a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-white/40 font-sans">
          <span>© {new Date().getFullYear()} Impact Health. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white/70 transition-colors">Patient Data Protection</Link>
            <Link to="/privacy-policy" className="hover:text-white/70 transition-colors">Regulatory Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
