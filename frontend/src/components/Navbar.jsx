import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, Activity, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
const logoImg = '/logo.png';

const MASTER_LOGIN_URL = 'https://www.threephih.in/threephih/masterLogin.html';

const NAV_LINKS = [
  { name: 'Home', id: 'home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', isMegaMenu: true, path: '/services' },
  { name: 'Patient Support Programs', path: '/patient-support-programs' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact' }
];

const SERVICE_CATEGORIES = {
  schoolHealth: {
    title: "School Health",
    desc: "On-campus clinical care & hygiene education",
    path: "/services/school-health",
    icon: Activity,
    items: [
      { name: "Medical Room Setup", path: "/services/school-health/medical-room" },
      { name: "Health Education", path: "/services/school-health/health-education" },
      { name: "Student Health Checkups", path: "/services/school-health/health-checkups" },
      { name: "Nutrition Program", path: "/services/school-health/nutrition-program" },
      { name: "Mental Wellness", path: "/services/school-health/mental-wellness" },
      { name: "Ambulance & Emergency", path: "/services/school-health/emergency-services" }
    ]
  },
  corporateHealth: {
    title: "Corporate Health",
    desc: "Annual checkups & employee wellness programs",
    path: "/services/corporate-health",
    icon: ShieldCheck,
    items: [
      { name: "Pre-employment Checkups", path: "/services/corporate-health/pre-employment-checkups" },
      { name: "Annual Health Checkups", path: "/services/corporate-health/annual-checkups" },
      { name: "FSSAI Medical Checkups", path: "/services/corporate-health/fssai-checkups" },
      { name: "Employee Wellness", path: "/services/corporate-health/employee-wellness" }
    ]
  },
  patientSupport: {
    title: "For Patients",
    desc: "Personalized care at home & clinics",
    path: "/services/patient-support",
    icon: HeartHandshake,
    items: [
      { name: "Doctor Consultations", path: "/services/patient-support/doctor-consultations" },
      { name: "Teleconsultations", path: "/services/patient-support/teleconsultations" },
      { name: "In-clinic / Hospital", path: "/services/patient-support/in-clinic-consultations" },
      { name: "Lab Tests & Diagnostics", path: "/services/patient-support/lab-tests" },
      { name: "Second Opinion", path: "/services/patient-support/second-opinion" },
      { name: "Home Care & Eldercare", path: "/services/patient-support/home-care" }
    ]
  },
  practitionerSupport: {
    title: "For Practitioners",
    desc: "CME courses & medical software tools",
    path: "/services/practitioner-support",
    icon: Award,
    items: [
      { name: "CME Programs", path: "/services/practitioner-support/cme-programs" },
      { name: "EMR / HIMS Services", path: "/services/practitioner-support/emr-hims" },
      { name: "Marketing & Patient Services", path: "/services/practitioner-support/marketing-patient-services" },
      { name: "Trainings & Leadership", path: "/services/practitioner-support/trainings-leadership" }
    ]
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState({
    school: false,
    corporate: false,
    patient: false,
    practitioner: false
  });

  const navRef = useRef(null);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = NAV_LINKS;
  const serviceCategories = SERVICE_CATEGORIES;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (const link of NAV_LINKS) {
        if (!link.isMegaMenu && link.id) {
          const el = document.getElementById(link.id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(link.id);
              return;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close Services dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.closest('.services-trigger')) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (e, link) => {
    e?.preventDefault();

    if (link.isMegaMenu) {
      setIsServicesOpen(!isServicesOpen);
      return;
    }

    setIsOpen(false);
    setIsServicesOpen(false);

    if (link.path) {
      navigate(link.path);
      window.scrollTo({ top: 0, behavior: 'instant' });
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
      setActiveSection(link.id);
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
      setActiveSection(link.id);
    }
  };

  const getLinkClass = (link) => {
    const isActive = link.isMegaMenu
      ? location.pathname.startsWith('/services') || isServicesOpen
      : link.path
        ? location.pathname === link.path
        : activeSection === link.id && location.pathname === '/';

    return `text-xs xl:text-[13px] font-medium transition-all duration-150 py-1.5 px-3 rounded-full cursor-pointer font-sans flex items-center gap-1 whitespace-nowrap ${
      isActive
        ? 'text-[#030050] bg-[#ECECFE] font-bold shadow-xs'
        : 'text-slate-600 hover:text-[#030050] hover:bg-slate-100/70'
    }`;
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 py-2 px-4 sm:px-6 lg:px-8 bg-transparent backdrop-blur-sm border-b border-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Detached Logo (10% bigger, independent container) */}
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, { id: 'home', path: '/' })}
          className="shrink-0 flex items-center gap-2 group focus:outline-none"
          aria-label="Impact Health Home"
        >
          <img
            src={logoImg}
            alt="Impact Health"
            className="h-[72px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </Link>

        {/* Floating Capsule Nav */}
        <nav
          ref={navRef}
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/90 shadow-[0_4px_20px_-2px_rgba(3,0,80,0.06)] relative"
        >
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.isMegaMenu ? (
                <button
                  onClick={(e) => handleNavClick(e, link)}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  className={`services-trigger ${getLinkClass(link)}`}
                >
                  <span>{link.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180 text-[#030050]' : ''}`} />
                </button>
              ) : link.path ? (
                <Link
                  to={link.path}
                  onMouseEnter={() => setIsServicesOpen(false)}
                  onClick={() => {
                    setIsOpen(false);
                    setIsServicesOpen(false);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className={getLinkClass(link)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  href={`#${link.id}`}
                  onMouseEnter={() => setIsServicesOpen(false)}
                  onClick={(e) => handleNavClick(e, link)}
                  className={getLinkClass(link)}
                >
                  {link.name}
                </a>
              )}
            </div>
          ))}

          {/* Desktop Mega Menu Dropdown */}
          <AnimatePresence>
            {isServicesOpen && (
              <motion.div
                ref={dropdownRef}
                onMouseLeave={() => setIsServicesOpen(false)}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 left-1/2 -translate-x-1/2 w-[920px] bg-white rounded-3xl border border-[#e5e7eb] shadow-[0_20px_50px_rgba(3,0,80,0.12)] p-8 grid grid-cols-12 gap-6 z-50 text-left"
              >
                {/* Header Link to All Services */}
                <div className="col-span-12 pb-4 border-b border-[#e5e7eb] flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-[#030050] text-base">Impact Health Clinical Services</h4>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">Explore full suite of medical room setups, corporate wellness, patient care &amp; CME tools</p>
                  </div>
                  <Link
                    to="/services"
                    onClick={() => setIsServicesOpen(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5A67F2] hover:text-[#030050] bg-[#ECECFE]/60 hover:bg-[#ECECFE] px-4 py-2 rounded-xl transition-all"
                  >
                    <span>View All Services Portal</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* 4 Category Columns */}
                {Object.entries(serviceCategories).map(([key, category]) => {
                  const CategoryIcon = category.icon;
                  return (
                    <div key={key} className="col-span-3 space-y-3">
                      <div>
                        <Link
                          to={category.path}
                          onClick={() => setIsServicesOpen(false)}
                          className="font-display font-bold text-[#030050] text-sm tracking-tight flex items-center gap-1.5 hover:text-[#5A67F2] transition-colors"
                        >
                          <CategoryIcon className="w-4 h-4 text-[#5A67F2]" />
                          <span>{category.title}</span>
                        </Link>
                        <p className="text-[11px] text-slate-500 mt-1 font-sans leading-snug">{category.desc}</p>
                      </div>
                      <div className="border-t border-slate-100 pt-2.5 flex flex-col gap-1.5 font-sans text-xs">
                        {category.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsServicesOpen(false)}
                            className="text-slate-600 hover:text-[#030050] hover:bg-[#ECECFE]/30 px-2 py-1 rounded-md transition-colors flex items-center justify-between group"
                          >
                            <span>{item.name}</span>
                            <ChevronRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Desktop Actions (Shadcn UI Login & Sign Up buttons redirecting to Master Login) */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a
            href={MASTER_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#030050] disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-100 hover:text-[#030050] text-slate-700 h-9 px-4 shadow-xs"
          >
            Log in
          </a>
          <motion.a
            href={MASTER_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#030050] disabled:pointer-events-none disabled:opacity-50 bg-[#030050] text-white shadow-xs hover:bg-[#030050]/90 h-9 px-4 gap-1.5"
          >
            <span>Sign up</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-70" />
          </motion.a>
        </div>

        {/* Mobile menu trigger & Log in button */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={MASTER_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs font-medium border border-slate-200 bg-white hover:bg-slate-100 text-[#030050] h-8 px-3 shadow-xs"
          >
            <span>Log in</span>
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#030050] hover:bg-[#ECECFE]/30 rounded-lg transition border border-slate-200"
            aria-label="Toggle navigation menu"
            type="button"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-[#e5e7eb] flex flex-col p-6 gap-4 lg:hidden shadow-xl z-50 max-h-[85vh] overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                if (link.isMegaMenu) {
                  return (
                    <div key={link.name} className="flex flex-col">
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="text-sm font-medium py-2.5 px-3 rounded-md flex items-center justify-between text-[#4A4A4A] hover:bg-[#ECECFE]/30 cursor-pointer"
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-[#030050]' : ''}`} />
                      </button>

                      {/* Mobile Accordion */}
                      {mobileServicesOpen && (
                        <div className="pl-4 pr-2 py-2 flex flex-col gap-3 border-l-2 border-[#ECECFE] ml-3 mt-1 font-sans text-xs">
                          <Link
                            to="/services"
                            onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}
                            className="text-[#030050] font-bold py-1.5 block border-b border-slate-100"
                          >
                            View All Services Overview &rarr;
                          </Link>

                          {Object.entries(serviceCategories).map(([key, category]) => (
                            <div key={key}>
                              <button
                                onClick={() => setMobileCategoryOpen(prev => ({ ...prev, [key]: !prev[key] }))}
                                className="w-full flex items-center justify-between py-1.5 font-bold text-slate-700 hover:text-[#030050]"
                              >
                                <span>{category.title}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${mobileCategoryOpen[key] ? 'rotate-180' : ''}`} />
                              </button>

                              {mobileCategoryOpen[key] && (
                                <div className="pl-3 flex flex-col gap-1.5 mt-1 py-1">
                                  <Link
                                    to={category.path}
                                    onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}
                                    className="text-[#5A67F2] font-semibold py-1 block border-b border-slate-100"
                                  >
                                    Category Overview &rarr;
                                  </Link>
                                  {category.items.map(item => (
                                    <Link
                                      key={item.name}
                                      to={item.path}
                                      onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}
                                      className="text-slate-600 hover:text-[#030050] py-1 block"
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                const isMobileActive = link.path
                  ? location.pathname === link.path
                  : activeSection === link.id;
                return link.path ? (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => {
                      setIsOpen(false);
                      setIsServicesOpen(false);
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className={`text-sm font-medium py-2.5 px-3 rounded-md block transition-all ${isMobileActive
                      ? 'text-[#030050] bg-[#ECECFE]/60 font-semibold'
                      : 'text-[#4A4A4A] hover:text-[#030050] hover:bg-[#ECECFE]/30'
                      }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.id || link.name}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`text-sm font-medium py-2.5 px-3 rounded-md block transition-all ${isMobileActive
                      ? 'text-[#030050] bg-[#ECECFE]/60 font-semibold'
                      : 'text-[#4A4A4A] hover:text-[#030050] hover:bg-[#ECECFE]/30'
                      }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
            <hr className="border-[#e5e7eb]" />
            <div className="flex flex-col gap-2 pt-1">
              <a
                href={MASTER_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors bg-[#030050] text-white shadow-xs hover:bg-[#030050]/90 h-10 px-4 gap-1.5"
              >
                <span>Sign up</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </a>
              <a
                href={MASTER_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors border border-slate-200 bg-white hover:bg-slate-100 text-[#030050] h-10 px-4 shadow-xs"
              >
                <span>Log in</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
