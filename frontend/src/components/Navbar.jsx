import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Bell, HeartPulse, ChevronDown, ChevronRight, Activity, ShieldCheck, HeartHandshake, Award, Save, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Button from './Button';
import logoImg from '../assets/cropped-Logo-candidate-1-2-187x103.png';
import { useAdminState } from '../context/AdminStateContext';

const PORTAL_URL = '/contact';

export default function Navbar({ isAdmin, sidebarCollapsed }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // If we are rendering the admin top navbar
  if (isAdmin) {
    return <AdminNavbar sidebarCollapsed={sidebarCollapsed} />;
  }

  // Otherwise, render the client navbar
  return <ClientNavbar />;
}

// ----------------------------------------------------
// ADMIN TOP NAVBAR COMPONENT
// ----------------------------------------------------
function AdminNavbar({ sidebarCollapsed }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { settings, triggerToast } = useAdminState();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close menus when clicking outside
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

  // Mock Notifications
  const notifications = [
    { id: 1, text: "Dr. Elena Rostova published a new post in Cardiology", time: "2 hours ago", unread: true },
    { id: 2, text: "Draft 'Optimizing Telemedicine Workflows' was saved", time: "5 hours ago", unread: false },
    { id: 3, text: "System Update: CMS editor packages updated", time: "1 day ago", unread: false }
  ];

  // Detect if on the Create/Edit Blog Page to show top-nav shortcut buttons
  const isCreatePage = pathname === '/admin/create';

  const triggerNavbarSave = (status) => {
    // Send standard CustomEvent to notify the CreateBlog component
    window.dispatchEvent(new CustomEvent('admin-blog-save', { detail: { status } }));
  };

  return (
    <header className="sticky top-0 z-30 w-full h-20 bg-white/90 backdrop-blur-md border-b border-[#5A67F2]/10 px-4 md:px-8 flex items-center justify-between shadow-[0_2px_15px_rgba(29,42,114,0.02)]">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={handleMobileSidebarToggle}
          className="lg:hidden p-2 rounded-xl text-[#1D2A72] hover:bg-[#5A67F2]/10 transition cursor-pointer"
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
            className="w-full pl-10 pr-4 py-2 text-sm bg-[#F8FAFF] text-[#1D2A72] border border-[#5A67F2]/10 rounded-[12px] placeholder:text-slate-400 focus:outline-none focus:border-[#5A67F2] transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
        </form>
      </div>

      {/* Right: Publish/Save shortcuts (on Edit page only) & Notifications & User settings */}
      <div className="flex items-center gap-3">
        {isCreatePage && (
          <div className="flex items-center gap-2 mr-3 border-r border-[#5A67F2]/10 pr-4">
            <button
              onClick={() => triggerNavbarSave('draft')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold border border-[#5A67F2]/20 hover:bg-[#5A67F2]/5 rounded-[10px] text-[#5A67F2] transition cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              Save Draft
            </button>
            <button
              onClick={() => triggerNavbarSave('published')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-[#1D2A72] hover:opacity-90 rounded-[10px] text-white transition cursor-pointer shadow-sm shadow-[#1D2A72]/10"
            >
              <Send className="w-3.5 h-3.5" />
              Publish
            </button>
          </div>
        )}

        {/* Notifications Icon & Popover */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-[12px] bg-[#F8FAFF] border border-[#5A67F2]/5 text-[#1D2A72] hover:bg-[#5A67F2]/5 transition relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#35C76F]" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-80 bg-white border border-[#5A67F2]/10 rounded-[18px] shadow-[0_10px_30px_rgba(29,42,114,0.08)] overflow-hidden z-50"
              >
                <div className="px-4 py-3 bg-[#F8FAFF] border-b border-[#5A67F2]/10 flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1D2A72]">Notifications</span>
                  <span className="text-[10px] bg-[#5A67F2]/10 text-[#5A67F2] font-semibold px-2 py-0.5 rounded-full">New Updates</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="p-4 hover:bg-slate-50 transition cursor-pointer">
                      <p className="text-xs font-semibold text-slate-700 leading-normal">{n.text}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-slate-100 bg-[#F8FAFF]">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      triggerToast("Marked all notifications as read");
                    }}
                    className="text-xs font-bold text-[#5A67F2] hover:underline cursor-pointer"
                  >
                    Clear All Notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-[#F8FAFF] hover:bg-[#5A67F2]/5 rounded-[14px] border border-[#5A67F2]/5 transition cursor-pointer text-left"
          >
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&h=150&q=80"
              alt="Admin Profile"
              className="w-8 h-8 rounded-[10px] object-cover border border-[#5A67F2]/20 flex-shrink-0"
            />
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-[#1D2A72] leading-none">{settings.defaultAuthor || "Dr. Elena Rostova"}</p>
              <p className="text-[9px] text-[#5A67F2] font-semibold mt-0.5">Admin Editor</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-56 bg-white border border-[#5A67F2]/10 rounded-[18px] shadow-[0_10px_30px_rgba(29,42,114,0.08)] py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-slate-100 pb-2.5 mb-1.5">
                  <p className="text-xs font-semibold text-slate-400">Signed in as</p>
                  <p className="text-sm font-bold text-[#1D2A72] mt-0.5 truncate">{settings.defaultAuthor}</p>
                </div>
                <Link
                  to="/admin/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="block px-4 py-2 text-xs font-bold text-[#1D2A72] hover:bg-[#5A67F2]/5 transition"
                >
                  Edit Profile Settings
                </Link>
                <Link
                  to="/admin/blogs"
                  onClick={() => setShowProfileMenu(false)}
                  className="block px-4 py-2 text-xs font-bold text-[#1D2A72] hover:bg-[#5A67F2]/5 transition"
                >
                  Manage Blog Directory
                </Link>
                <hr className="border-slate-100 my-1.5" />
                <Link
                  to="/"
                  onClick={() => {
                    setShowProfileMenu(false);
                    triggerToast("Returned to public home view");
                  }}
                  className="block px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
                >
                  Sign Out to Public Site
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

// ----------------------------------------------------
// CLIENT NAVBAR COMPONENT WITH SERVICES DROPDOWN
// ----------------------------------------------------
function ClientNavbar() {
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

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', path: '/about' },
    { name: 'Services', isMegaMenu: true, path: '/services' },
    { name: 'Patient Support Programs', path: '/patient-support-programs' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin Panel', path: '/admin' }
  ];

  const serviceCategories = {
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (const link of navLinks) {
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
    let isActive = false;
    if (link.isMegaMenu) {
      isActive = location.pathname.startsWith('/services') || isServicesOpen;
    } else if (link.path) {
      isActive = location.pathname === link.path;
    } else {
      isActive = activeSection === link.id && location.pathname === '/';
    }

    return `text-sm font-medium transition-all duration-150 py-1.5 px-3 rounded-md cursor-pointer font-sans flex items-center gap-1 ${isActive
      ? 'text-[#030050] bg-[#ECECFE]/60 font-semibold'
      : 'text-[#4A4A4A] hover:text-[#030050] hover:bg-[#ECECFE]/30'
      }`;
  };

  return (
    <nav ref={navRef} className="sticky top-0 z-50 w-full h-20 bg-white/95 backdrop-blur-sm border-b border-[#e5e7eb] transition-all duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center justify-between">
        <a href="#home" onClick={(e) => handleNavClick(e, { id: 'home' })} className="flex items-center gap-2.5 group">
          <img
            src={logoImg}
            alt="Impact Health"
            className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1.5 relative">
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
              ) : (
                <a
                  href={link.path || `#${link.id}`}
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
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to={PORTAL_URL}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" className="px-4 py-2 text-xs text-[#030050] hover:bg-[#ECECFE]/40">
                Login
              </Button>
            </motion.div>
          </Link>
          <Link to="/admin">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="primary" className="px-4 py-2 text-xs bg-[#030050] hover:opacity-90 text-white">
                Admin Panel
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#030050] hover:bg-[#ECECFE]/20 rounded-md transition"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-20 left-0 right-0 bg-white border-b border-[#e5e7eb] flex flex-col p-6 gap-4 lg:hidden shadow-lg z-50 max-h-[80vh] overflow-y-auto"
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
                return (
                  <a
                    key={link.id || link.path}
                    href={link.path || `#${link.id}`}
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
            <div className="flex flex-col gap-2">
              <Link to={PORTAL_URL} className="w-full">
                <Button variant="secondary" className="w-full py-2.5 text-xs text-[#030050] border-[#e5e7eb] hover:bg-slate-50">
                  Login
                </Button>
              </Link>
              <Link to="/admin" className="w-full">
                <Button variant="primary" className="w-full py-2.5 text-xs bg-[#030050] hover:opacity-90 text-white">
                  Admin Panel
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
