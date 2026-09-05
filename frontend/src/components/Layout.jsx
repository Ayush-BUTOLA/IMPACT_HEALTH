import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import ToastContainer from './Toast';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#F8FAFF] font-sans antialiased text-[#1D2A72] relative">
        <ScrollToTop />
        {/* Admin Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        {/* Main Content Pane */}
        <div
          className={`flex flex-col min-h-screen transition-all duration-300 ${
            sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
          }`}
        >
          {/* Top Navbar */}
          <Navbar isAdmin={true} sidebarCollapsed={sidebarCollapsed} />

          {/* Scrollable Page Body */}
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto pb-24">
            {children}
          </main>
        </div>

        {/* Toast Notification Container */}
        <ToastContainer />
      </div>
    );
  }

  const isAuthPage = pathname === '/login' || pathname === '/signup';

  if (isAuthPage) {
    return (
      <div className="min-h-screen w-full font-sans antialiased text-[#0F172A] relative">
        <ScrollToTop />
        <main className="w-full min-h-screen">
          {children}
        </main>
        <ToastContainer />
      </div>
    );
  }

  // Client layout
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-secondary">
      <ScrollToTop />
      <Navbar isAdmin={false} />
      <main className="flex-grow w-full">
        {children}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
