import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  FileText,
  Clock,
  CheckCircle2,
  Bookmark,
  XCircle,
  FolderOpen,
  UserCheck,
  Users,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  HeartPulse,
  Stethoscope,
  LogOut,
  X
} from 'lucide-react';
import apiService from '../api/apiService';

export default function Sidebar({ collapsed, setCollapsed }) {
  const { pathname, search } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [blogsMenuOpen, setBlogsMenuOpen] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const handleMobileToggle = () => {
      setMobileOpen(prev => !prev);
    };
    window.addEventListener('toggle-admin-sidebar', handleMobileToggle);
    return () => window.removeEventListener('toggle-admin-sidebar', handleMobileToggle);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, search]);

  useEffect(() => {
    // Fetch pending count for badge indicator
    const fetchPending = async () => {
      try {
        const pending = await apiService.getPendingBlogs();
        if (Array.isArray(pending)) {
          setPendingCount(pending.length);
        }
      } catch (err) {
        // Silent catch if backend offline
      }
    };
    fetchPending();
    const interval = setInterval(fetchPending, 10000);
    return () => clearInterval(interval);
  }, []);

  const blogSubMenuItems = [
    { name: "All Blogs", path: "/admin/blogs", icon: FileText },
    { name: "Pending Approval", path: "/admin/pending", icon: Clock, badge: pendingCount },
    { name: "Published", path: "/admin/blogs?status=PUBLISHED", icon: CheckCircle2 },
    { name: "Drafts", path: "/admin/drafts", icon: Bookmark },
    { name: "Rejected", path: "/admin/blogs?status=REJECTED", icon: XCircle },
  ];

  const mainMenuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Blog Categories", path: "/admin/categories", icon: FolderOpen },
    { name: "Doctors", path: "/admin/doctors", icon: UserCheck },
    { name: "Patients", path: "/admin/patients", icon: Users },
    { name: "Notifications", path: "/admin/notifications", icon: Bell },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const sidebarVariants = {
    expanded: { width: 260 },
    collapsed: { width: 80 }
  };

  const isBlogActive = pathname.startsWith('/admin/blogs') || pathname === '/admin/pending' || pathname === '/admin/drafts';

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={collapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex flex-col fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-[#1D2A72]/10 shadow-[4px_0_30px_rgba(29,42,114,0.04)] h-screen overflow-hidden"
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-slate-100 flex-shrink-0">
          <Link to="/" className="flex items-center gap-3 select-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1D2A72] to-[#5A67F2] flex items-center justify-center text-white shadow-md shadow-[#1D2A72]/20 flex-shrink-0">
              <HeartPulse className="w-5 h-5 animate-pulse" />
            </div>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col"
              >
                <span className="font-bold text-[#1D2A72] tracking-tight leading-none text-base">Impact Health</span>
                <span className="text-[10px] text-[#5A67F2] font-bold tracking-wider mt-1 uppercase">Admin Portal</span>
              </motion.div>
            )}
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {/* Dashboard */}
          <Link to="/admin" className="block relative">
            <div className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
              pathname === '/admin' ? 'bg-[#1D2A72] text-white shadow-md shadow-[#1D2A72]/20' : 'text-slate-600 hover:text-[#1D2A72] hover:bg-slate-50'
            }`}>
              <LayoutDashboard className={`w-5 h-5 flex-shrink-0 ${pathname === '/admin' ? 'text-white' : 'text-slate-400'}`} />
              {!collapsed && <span className="font-semibold text-sm">Dashboard</span>}
            </div>
          </Link>

          {/* Blog Management Group */}
          <div className="pt-2">
            {!collapsed ? (
              <div>
                <button
                  onClick={() => setBlogsMenuOpen(!blogsMenuOpen)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                    isBlogActive ? 'text-[#1D2A72]' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <span className="flex items-center gap-2">Blog Management</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${blogsMenuOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {blogsMenuOpen && (
                  <div className="mt-1 space-y-1 pl-2">
                    {blogSubMenuItems.map((item) => {
                      const Icon = item.icon;
                      const currentFull = pathname + search;
                      const isActive = item.path.includes('?') 
                        ? currentFull === item.path 
                        : (pathname === item.path && !search);

                      return (
                        <Link key={item.name} to={item.path} className="block relative">
                          <div className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                            isActive 
                              ? 'bg-[#5A67F2]/10 text-[#1D2A72] font-bold border-l-2 border-[#1D2A72]' 
                              : 'text-slate-600 hover:text-[#1D2A72] hover:bg-slate-50'
                          }`}>
                            <div className="flex items-center gap-3">
                              <Icon className={`w-4 h-4 ${isActive ? 'text-[#1D2A72]' : 'text-slate-400'}`} />
                              <span>{item.name}</span>
                            </div>
                            {item.badge > 0 && (
                              <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-amber-500 text-white animate-pulse">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                {blogSubMenuItems.map((item) => {
                  const Icon = item.icon;
                  const currentFull = pathname + search;
                  const isActive = item.path.includes('?') ? currentFull === item.path : (pathname === item.path && !search);
                  return (
                    <Link key={item.name} to={item.path} title={item.name} className="block relative">
                      <div className={`flex items-center justify-center py-2.5 rounded-xl transition ${
                        isActive ? 'bg-[#1D2A72] text-white' : 'text-slate-400 hover:text-[#1D2A72] hover:bg-slate-50'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Main Menu Remaining Items */}
          <div className="pt-2 space-y-1">
            {mainMenuItems.slice(1).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link key={item.name} to={item.path} className="block relative">
                  <div className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive ? 'bg-[#1D2A72] text-white shadow-md shadow-[#1D2A72]/20' : 'text-slate-600 hover:text-[#1D2A72] hover:bg-slate-50'
                  }`}>
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    {!collapsed && <span className="font-semibold text-sm">{item.name}</span>}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Doctor Portal Quick Switch */}
          <div className="pt-4 mt-2 border-t border-slate-100">
            <Link to="/doctor/blogs" className="block">
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-800 border border-emerald-500/20 hover:bg-emerald-500/20 transition cursor-pointer">
                <Stethoscope className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                {!collapsed && (
                  <div className="flex flex-col">
                    <span className="text-xs font-bold tracking-tight">Doctor Portal</span>
                    <span className="text-[10px] text-emerald-600">Create & Manage Blogs</span>
                  </div>
                )}
              </div>
            </Link>
          </div>
        </nav>

        {/* Sidebar Footer / Collapse */}
        <div className="p-3 border-t border-slate-100 flex flex-col gap-2 flex-shrink-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full py-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : (
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-xs font-bold tracking-wide">Collapse Sidebar</span>
              </div>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-72 bg-white z-50 lg:hidden flex flex-col h-screen"
            >
              <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1D2A72] flex items-center justify-center text-white">
                    <HeartPulse className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[#1D2A72]">Impact Health</span>
                    <span className="text-[10px] text-[#5A67F2] font-bold uppercase">Admin CMS</span>
                  </div>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="block">
                  <div className="flex items-center gap-3.5 px-4 py-3 rounded-xl bg-slate-50 text-[#1D2A72] font-semibold">
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                  </div>
                </Link>

                <div className="pt-2">
                  <span className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Blog Management</span>
                  <div className="mt-1 space-y-1 pl-2">
                    {blogSubMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.name} to={item.path} onClick={() => setMobileOpen(false)} className="block">
                          <div className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-50 text-sm font-semibold">
                            <div className="flex items-center gap-3">
                              <Icon className="w-4 h-4 text-slate-400" />
                              <span>{item.name}</span>
                            </div>
                            {item.badge > 0 && (
                              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500 text-white">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Link to="/doctor/blogs" onClick={() => setMobileOpen(false)} className="block">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold">
                      <Stethoscope className="w-5 h-5 text-emerald-600" />
                      <span>Doctor Portal</span>
                    </div>
                  </Link>
                </div>
              </nav>

              <div className="p-4 border-t border-slate-100 flex-shrink-0">
                <Link to="/" className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-[#1D2A72] font-bold text-sm">
                  <LogOut className="w-4 h-4" />
                  Return to Main Website
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
