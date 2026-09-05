import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Activity,
  ShieldCheck,
  HeartHandshake,
  Award,
  Phone,
  PhoneCall,
  Mail,
  MapPin,
  ArrowRight,
  Stethoscope,
  Sparkles,
  User,
  LogIn
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Button } from '@/components/ui/button';
import BrandLogo from './BrandLogo';
import logoImg from '../assets/cropped-Logo-candidate-1-2-187x103.png';
import { useAdminState } from '../context/AdminStateContext';

const EMIL_EASE = [0.23, 1, 0.32, 1];

export default function Navbar({ isAdmin, sidebarCollapsed }) {
  if (isAdmin) {
    return <AdminNavbar sidebarCollapsed={sidebarCollapsed} />;
  }

  return <ClientNavbar />;
}

// ----------------------------------------------------
// ADMIN TOP NAVBAR COMPONENT
// ----------------------------------------------------
function AdminNavbar({ sidebarCollapsed }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { settings, triggerToast, logoutAdmin } = useAdminState();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMobileSidebarToggle = () => {
    window.dispatchEvent(new CustomEvent('toggle-admin-sidebar'));
  };

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      triggerToast(`Searching CMS for: "${searchVal}"`, "info");
      setSearchVal('');
    }
  };

  const notifications = [
    { id: 1, text: "Dr. Elena Rostova published a new post in Cardiology", time: "2 hours ago" },
    { id: 2, text: "Draft 'Optimizing Telemedicine Workflows' was saved", time: "5 hours ago" },
    { id: 3, text: "System Update: CMS editor packages updated", time: "1 day ago" }
  ];

  return (
    <header className="sticky top-0 z-30 w-full h-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={handleMobileSidebarToggle}
          className="lg:hidden p-2 rounded-xl text-[#003087] hover:bg-slate-100 transition cursor-pointer"
          aria-label="Toggle admin sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>

        <form onSubmit={handleGlobalSearch} className="hidden md:flex items-center relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search blogs, drafts..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 text-[#1A1A2E] border border-slate-200 rounded-xl placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#003087] transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        </form>
      </div>

      <div className="flex items-center gap-3">
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition cursor-pointer relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#008C7A]" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 text-left"
              >
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-xs text-[#003087]">Notifications</span>
                  <span className="text-[10px] font-mono bg-blue-50 text-[#003087] font-semibold px-2 py-0.5 rounded-full">Updates</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="p-3.5 hover:bg-slate-50 transition cursor-pointer">
                      <p className="text-xs font-semibold text-slate-700 leading-normal">{n.text}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#003087] text-white flex items-center justify-center font-bold text-xs">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-[#003087] leading-none">{settings.defaultAuthor || "Dr. Elena Rostova"}</p>
              <p className="text-[10px] text-[#008C7A] font-semibold mt-0.5">Admin Editor</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-left"
              >
                <div className="px-4 py-2 border-b border-slate-100 mb-1">
                  <p className="text-[10px] font-mono text-slate-400">Signed in as</p>
                  <p className="text-xs font-bold text-[#003087] mt-0.5 truncate">{settings.defaultAuthor}</p>
                </div>
                <Link
                  to="/admin/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Edit Profile Settings
                </Link>
                <Link
                  to="/admin/blogs"
                  onClick={() => setShowProfileMenu(false)}
                  className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Manage Blog Directory
                </Link>
                <hr className="border-slate-100 my-1" />
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    logoutAdmin();
                    triggerToast("Signed out of Admin Panel", "info");
                    navigate("/login");
                  }}
                  className="w-full text-left block px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
                >
                  Sign Out of Admin Panel
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

// ----------------------------------------------------
// CLIENT NAVBAR COMPONENT WITH TOP UTILITY BAR
// ----------------------------------------------------
function ClientNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', isMegaMenu: true, path: '/services' },
    { name: 'Health Plans', path: '/patient-support-programs' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' }
  ];

  const serviceCategories = {
    schoolHealth: {
      title: "School Health Services",
      desc: "Campus infirmaries & pediatric health",
      path: "/services/school-health",
      icon: Activity,
      items: [
        { name: "Medical Room", path: "/services/school-health/medical-room" },
        { name: "Health Education and Awareness", path: "/services/school-health/health-education" },
        { name: "Health Checkups", path: "/services/school-health/health-checkups" },
        { name: "Nutrition Program", path: "/services/school-health/nutrition-program" },
        { name: "Mental Wellness", path: "/services/school-health/mental-wellness" },
        { name: "Ambulance & Emergency Services", path: "/services/school-health/emergency-services" }
      ]
    },
    corporateHealth: {
      title: "Corporate Health Services",
      desc: "Annual checkups & employee wellness",
      path: "/services/corporate-health",
      icon: ShieldCheck,
      items: [
        { name: "Pre-employment & Annual Health Checkups", path: "/services/corporate-health/pre-employment-checkups" },
        { name: "FSSAI Medical Checkups", path: "/services/corporate-health/fssai-checkups" },
        { name: "Employee Wellness Programs", path: "/services/corporate-health/employee-wellness" }
      ]
    },
    forPatients: {
      title: "For Patients",
      categoryGroup: "Patient Support Programs",
      desc: "Doctor consultations & home healthcare",
      path: "/services/patient-support",
      icon: HeartHandshake,
      items: [
        { name: "Doctor Consultations", path: "/services/patient-support/doctor-consultations" },
        { name: "Teleconsultations", path: "/services/patient-support/teleconsultations" },
        { name: "In-clinic / At-hospital Consultations", path: "/services/patient-support/in-clinic-consultations" },
        { name: "Lab Tests & Diagnostics", path: "/services/patient-support/lab-tests" },
        { name: "Second Opinion", path: "/services/patient-support/second-opinion" },
        { name: "Home Care", path: "/services/patient-support/home-care" },
        { name: "Elderly Care", path: "/services/patient-support/elderly-care" },
        { name: "Vaccinations at home", path: "/services/patient-support/vaccinations-at-home" },
        { name: "Medicines", path: "/services/patient-support/medicines" }
      ]
    },
    forPractitioners: {
      title: "For Practitioners",
      categoryGroup: "Patient Support Programs",
      desc: "CME credits & clinical software tools",
      path: "/services/practitioner-support",
      icon: Award,
      items: [
        { name: "CME Programs", path: "/services/practitioner-support/cme-programs" },
        { name: "EMR / HIMS Services", path: "/services/practitioner-support/emr-hims" },
        { name: "Marketing & Patient Services", path: "/services/practitioner-support/marketing-patient-services" },
        { name: "Trainings & Leadership Program", path: "/services/practitioner-support/trainings-leadership" }
      ]
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all duration-200">
      
      {/* ── TOP UTILITY STRIP (High-Trust Clinical Baseline) ── */}
      <div className="border-b border-slate-100 bg-slate-50/90 text-[11px] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1 flex items-center justify-between">
          <div className="flex items-center gap-5 text-slate-600">
            <a
              href="tel:+919667835909"
              className="inline-flex items-center gap-2 hover:text-[#0066FF] transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Contact Us: <strong className="font-mono text-slate-900 font-bold">+91 9667835909</strong></span>
            </a>
            <span className="text-slate-300 hidden sm:inline">·</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>200+ Cities Across India</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN CLINICAL NAVIGATION BAR (daisyUI 3-Zone Architecture: start / center / end) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        
        {/* NAVBAR-START: Mobile Hamburger + Clean Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-start">
          {/* Mobile Hamburger on the left (matching user snippet) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 -ml-2 rounded-xl text-[#0B132B] hover:bg-slate-100 transition cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo: Clean Vector SVG, 100% Sharp & Crisp */}
          <Link
            to="/"
            className="shrink-0 flex items-center py-1 group focus:outline-none transition-transform duration-200 hover:opacity-95"
            aria-label="Impact Health Home"
          >
            <BrandLogo className="h-8 sm:h-9 md:h-10" />
          </Link>
        </div>

        {/* NAVBAR-CENTER: Truly Centered Desktop Navigation Links */}
        <div className="hidden lg:flex items-center justify-center shrink-0">
          <nav className="flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              if (link.isMegaMenu) {
                const isServicesActive = location.pathname.startsWith('/services');
                return (
                  <div
                    key={link.name}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm rounded-xl font-semibold transition-all duration-150 active:scale-[0.98] ${
                        isServicesActive || isServicesOpen
                          ? 'text-[#0066FF] bg-blue-50/80 font-bold'
                          : 'text-slate-700 hover:text-[#0066FF] hover:bg-slate-50'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isServicesOpen ? 'rotate-180 text-[#0066FF]' : 'text-slate-400'
                        }`}
                      />
                    </Link>

                    {/* Mega-Menu Flyout Directory */}
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: shouldReduceMotion ? 1 : 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: shouldReduceMotion ? 1 : 0.99 }}
                          transition={{ duration: 0.18, ease: EMIL_EASE }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[980px] max-w-[95vw] bg-white/98 backdrop-blur-2xl border border-slate-200/90 rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.12)] p-6 z-50 text-left before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 before:content-['']"
                        >
                          <div className="grid grid-cols-4 gap-6 divide-x divide-slate-100">
                            {Object.entries(serviceCategories).map(([key, cat], idx) => {
                              const IconComp = cat.icon;
                              return (
                                <div key={key} className={idx > 0 ? "pl-5 space-y-3" : "space-y-3"}>
                                  {cat.categoryGroup && (
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100/80 inline-block mb-1">
                                      {cat.categoryGroup}
                                    </span>
                                  )}
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] border border-blue-200/60 flex items-center justify-center shrink-0">
                                      <IconComp className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <Link
                                        to={cat.path}
                                        className="font-display font-bold text-xs text-[#0B132B] hover:text-[#0066FF] transition-colors block leading-tight"
                                      >
                                        {cat.title}
                                      </Link>
                                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{cat.desc}</p>
                                    </div>
                                  </div>

                                  <div className="space-y-1 pt-2 border-t border-slate-100">
                                    {cat.items.map((item) => (
                                      <Link
                                        key={item.name}
                                        to={item.path}
                                        className="text-[11.5px] font-medium text-slate-600 hover:text-[#0066FF] transition flex items-center justify-between group py-0.5 rounded px-1 -mx-1 hover:bg-blue-50/50"
                                      >
                                        <span className="truncate">{item.name}</span>
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-[#0066FF] transition-all shrink-0" />
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                              Need custom healthcare infrastructure for your school, corporate, or practice?
                            </span>
                            <Link
                              to="/services"
                              className="font-bold text-[#0066FF] hover:underline flex items-center gap-1"
                            >
                              <span>Explore all service lines</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 text-xs sm:text-sm rounded-xl font-semibold transition-all duration-150 active:scale-[0.98] ${
                    isActive
                      ? 'text-[#0066FF] bg-blue-50/80 font-bold'
                      : 'text-slate-700 hover:text-[#0066FF] hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* NAVBAR-END: Right CTA Action */}
        <div className="flex items-center justify-end flex-1 gap-3">
          <Button
            asChild
            variant="royal"
            size="default"
            className="rounded-xl px-5 py-2.5 font-bold shadow-[0_4px_16px_rgba(0,102,255,0.25)] hover:shadow-[0_6px_20px_rgba(0,102,255,0.35)] transition-all text-xs sm:text-sm gap-2"
          >
            <Link to="/login" aria-label="Login to Portal">
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          </Button>
        </div>

      </div>

      {/* ── MOBILE FLOATING DRAWER ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: shouldReduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: shouldReduceMotion ? 1 : 0.98 }}
            transition={{ duration: 0.2, ease: EMIL_EASE }}
            className="lg:hidden max-w-7xl mx-auto mt-2 rounded-3xl bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-2xl p-5 space-y-4 text-left overflow-hidden pointer-events-auto"
          >
            {/* Contact Us Quick-Call Banner */}
            <a
              href="tel:+919667835909"
              className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/80 border border-blue-200/70 text-xs font-semibold text-[#0066FF]"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <PhoneCall className="w-4 h-4" />
                <span>Contact Us: <strong className="font-mono text-[#0B132B]">+91 9667835909</strong></span>
              </div>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-blue-200 font-mono font-bold">
                CALL NOW
              </span>
            </a>

            {/* Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                if (link.isMegaMenu) {
                  return (
                    <div key={link.name} className="border-b border-slate-100 pb-1">
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180 text-[#0066FF]' : 'text-slate-400'}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-2 pr-1 py-1 space-y-2 overflow-hidden"
                          >
                            {Object.entries(serviceCategories).map(([key, cat]) => (
                              <div key={key} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <div>
                                    {cat.categoryGroup && (
                                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#0066FF] block">
                                        {cat.categoryGroup}
                                      </span>
                                    )}
                                    <Link
                                      to={cat.path}
                                      className="text-xs font-bold text-[#0B132B] hover:text-[#0066FF] transition-colors"
                                    >
                                      {cat.title}
                                    </Link>
                                  </div>
                                  <Link to={cat.path} className="text-[#0066FF] p-1">
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </Link>
                                </div>
                                <div className="grid grid-cols-1 gap-1 pl-1 pt-1 border-t border-slate-200/60">
                                  {cat.items.map((item) => (
                                    <Link
                                      key={item.name}
                                      to={item.path}
                                      className="text-[11px] text-slate-600 hover:text-[#0066FF] py-0.5 block truncate"
                                    >
                                      • {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                      isActive
                        ? 'bg-blue-50 text-[#0066FF] font-bold border border-blue-100'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#0B132B]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Drawer CTA */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <Button
                asChild
                variant="royal"
                size="lg"
                className="w-full rounded-xl font-bold shadow-md py-2.5 text-center justify-center flex items-center gap-2"
              >
                <Link to="/login">
                  <LogIn className="w-4 h-4" />
                  <span>Login to Portal</span>
                </Link>
              </Button>
              <Link to="/contact" className="block w-full text-center text-xs font-semibold text-slate-500 hover:text-[#0066FF] py-1">
                Need consultation? Book here →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
