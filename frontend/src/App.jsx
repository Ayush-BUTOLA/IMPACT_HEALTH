import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import TransitionOverlay from './components/TransitionOverlay';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import PatientSupportProgram from './pages/PatientSupportProgram';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Services from './pages/Services';
import SchoolHealthServices from './pages/SchoolHealthServices';
import CorporateHealthServices from './pages/CorporateHealthServices';
import PatientSupportServices from './pages/PatientSupportServices';
import PractitionerServices from './pages/PractitionerServices';
import ServicePage from './pages/ServicePage';

// Admin Pages
import Dashboard from './admin/pages/Dashboard';
import AllBlogs from './admin/pages/AllBlogs';
import PendingApprovals from './admin/pages/PendingApprovals';
import BlogReviewPage from './admin/pages/BlogReviewPage';
import Drafts from './admin/pages/Drafts';
import Categories from './admin/pages/Categories';
import MediaLibrary from './admin/pages/MediaLibrary';
import Settings from './admin/pages/Settings';

// Doctor Pages
import DoctorDashboard from './doctor/pages/DoctorDashboard';
import DoctorBlogEditor from './doctor/pages/DoctorBlogEditor';

// Global Admin State Provider
import { AdminStateProvider } from './context/AdminStateContext';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <TransitionOverlay />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/patient-support-programs" element={<PageTransition><PatientSupportProgram /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/services/school-health" element={<PageTransition><SchoolHealthServices /></PageTransition>} />
          <Route path="/services/corporate-health" element={<PageTransition><CorporateHealthServices /></PageTransition>} />
          <Route path="/services/patient-support" element={<PageTransition><PatientSupportServices /></PageTransition>} />
          <Route path="/services/practitioner-support" element={<PageTransition><PractitionerServices /></PageTransition>} />
          <Route path="/services/:category/:serviceId" element={<PageTransition><ServicePage /></PageTransition>} />
          <Route path="/blogs" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/blogs/:slug" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />

          {/* Admin CMS Routes */}
          <Route path="/admin" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="/admin/blogs" element={<PageTransition><AllBlogs /></PageTransition>} />
          <Route path="/admin/pending" element={<PageTransition><PendingApprovals /></PageTransition>} />
          <Route path="/admin/review/:id" element={<PageTransition><BlogReviewPage /></PageTransition>} />
          <Route path="/admin/drafts" element={<PageTransition><Drafts /></PageTransition>} />
          <Route path="/admin/categories" element={<PageTransition><Categories /></PageTransition>} />
          <Route path="/admin/media" element={<PageTransition><MediaLibrary /></PageTransition>} />
          <Route path="/admin/settings" element={<PageTransition><Settings /></PageTransition>} />

          {/* Doctor Portal Routes */}
          <Route path="/doctor/blogs" element={<PageTransition><DoctorDashboard /></PageTransition>} />
          <Route path="/doctor/blogs/create" element={<PageTransition><DoctorBlogEditor /></PageTransition>} />
          <Route path="/doctor/blogs/edit/:id" element={<PageTransition><DoctorBlogEditor /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <AdminStateProvider>
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </AdminStateProvider>
  );
}
