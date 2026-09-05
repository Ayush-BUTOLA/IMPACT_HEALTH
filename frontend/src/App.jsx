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
import Login from './pages/Login';
import Signup from './pages/Signup';

// Admin Pages
import Dashboard from './admin/pages/Dashboard';
import AllBlogs from './admin/pages/AllBlogs';
import PendingApprovals from './admin/pages/PendingApprovals';
import BlogReviewPage from './admin/pages/BlogReviewPage';
import Drafts from './admin/pages/Drafts';
import Categories from './admin/pages/Categories';
import MediaLibrary from './admin/pages/MediaLibrary';
import Settings from './admin/pages/Settings';
import AdminProtectedRoute from './components/AdminProtectedRoute';

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
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
          <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />

          {/* Admin CMS Routes (Protected with admin001@admin.co.in) */}
          <Route path="/admin" element={<PageTransition><AdminProtectedRoute><Dashboard /></AdminProtectedRoute></PageTransition>} />
          <Route path="/admin/blogs" element={<PageTransition><AdminProtectedRoute><AllBlogs /></AdminProtectedRoute></PageTransition>} />
          <Route path="/admin/pending" element={<PageTransition><AdminProtectedRoute><PendingApprovals /></AdminProtectedRoute></PageTransition>} />
          <Route path="/admin/review/:id" element={<PageTransition><AdminProtectedRoute><BlogReviewPage /></AdminProtectedRoute></PageTransition>} />
          <Route path="/admin/drafts" element={<PageTransition><AdminProtectedRoute><Drafts /></AdminProtectedRoute></PageTransition>} />
          <Route path="/admin/categories" element={<PageTransition><AdminProtectedRoute><Categories /></AdminProtectedRoute></PageTransition>} />
          <Route path="/admin/media" element={<PageTransition><AdminProtectedRoute><MediaLibrary /></AdminProtectedRoute></PageTransition>} />
          <Route path="/admin/settings" element={<PageTransition><AdminProtectedRoute><Settings /></AdminProtectedRoute></PageTransition>} />

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
