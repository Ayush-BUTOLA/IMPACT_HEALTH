import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  PenTool,
  FileText,
  Bookmark,
  FolderOpen,
  Image,
  Settings,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  LogOut,
  X
} from 'lucide-react';

export default function Sidebar({ collapsed, setCollapsed }) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Listen to an custom event or state to toggle on mobile
  useEffect(() => {
    const handleMobileToggle = () => {
      setMobileOpen(prev => !prev);
    };
    window.addEventListener('toggle-admin-sidebar', handleMobileToggle);
    return () => window.removeEventListener('toggle-admin-sidebar', handleMobileToggle);
  }, []);

  // Close sidebar on navigation change in mobile
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Create Blog", path: "/admin/create", icon: PenTool },
    { name: "All Blogs", path: "/admin/blogs", icon: FileText },
    { name: "Drafts", path: "/admin/drafts", icon: Bookmark },
    { name: "Categories", path: "/admin/categories", icon: FolderOpen },
    { name: "Media Library", path: "/admin/media", icon: Image },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const sidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 80 }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={collapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex flex-col fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-[#5A67F2]/10 shadow-[4px_0_30px_rgba(29,42,114,0.03)] h-screen overflow-hidden"
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#5A67F2]/10 flex-shrink-0">
          <Link to="/" className="flex items-center gap-3 select-none">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-tr from-[#1D2A72] to-[#5A67F2] flex items-center justify-center text-white shadow-md shadow-[#1D2A72]/20 flex-shrink-0">
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
                <span className="text-[10px] text-[#5A67F2] font-semibold tracking-wider mt-0.5 uppercase">Admin CMS</span>
              </motion.div>
            )}
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            // Check exact or sub-path matches to highlight properly
            const isActive = item.path === '/admin' 
              ? pathname === '/admin'
              : pathname.startsWith(item.path);

            return (
              <Link key={item.name} to={item.path} className="block relative">
                <div
                  className={`flex items-center gap-4 px-4 py-3 rounded-[14px] transition-all duration-200 group cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#1D2A72] to-[#1D2A72]/90 text-white shadow-lg shadow-[#1D2A72]/15' 
                      : 'text-slate-500 hover:text-[#1D2A72] hover:bg-[#F8FAFF]'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 duration-200 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#1D2A72]'}`} />
                  {!collapsed && (
                    <span className="font-semibold text-sm tracking-wide">{item.name}</span>
                  )}
                  {isActive && !collapsed && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-2 w-1.5 h-1.5 rounded-full bg-[#35C76F]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer / Collapse trigger */}
        <div className="p-4 border-t border-[#5A67F2]/10 flex flex-col gap-2 flex-shrink-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full py-2.5 rounded-[12px] bg-[#F8FAFF] border border-[#5A67F2]/10 text-[#1D2A72] hover:bg-[#5A67F2]/5 transition cursor-pointer"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : (
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-xs font-bold tracking-wide">Collapse Bar</span>
              </div>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Drawer (Slide out overlay) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-[#030050] z-50 lg:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-white z-50 lg:hidden flex flex-col h-screen"
            >
              <div className="h-20 flex items-center justify-between px-6 border-b border-[#5A67F2]/10 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[12px] bg-[#1D2A72] flex items-center justify-center text-white">
                    <HeartPulse className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[#1D2A72]">Impact Health</span>
                    <span className="text-[10px] text-[#5A67F2] font-semibold uppercase">CMS</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.path === '/admin' ? pathname === '/admin' : pathname.startsWith(item.path);

                  return (
                    <Link key={item.name} to={item.path} onClick={() => setMobileOpen(false)} className="block">
                      <div
                        className={`flex items-center gap-4 px-4 py-3 rounded-[14px] transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-[#1D2A72] text-white shadow-md shadow-[#1D2A72]/20' 
                            : 'text-slate-500 hover:bg-[#F8FAFF]'
                        }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-semibold text-sm">{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-6 border-t border-[#5A67F2]/10 flex-shrink-0">
                <Link to="/" className="flex items-center justify-center gap-2 py-3 rounded-[14px] bg-[#F8FAFF] text-[#1D2A72] hover:bg-slate-100 font-semibold text-sm transition">
                  <LogOut className="w-4 h-4" />
                  Return to Site
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
