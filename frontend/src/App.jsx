import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import TransitionOverlay from './components/TransitionOverlay';

// Code-split route components
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const About = lazy(() => import('./pages/About'));
const PatientSupportProgram = lazy(() => import('./pages/PatientSupportProgram'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Services = lazy(() => import('./pages/Services'));
const SchoolHealthServices = lazy(() => import('./pages/SchoolHealthServices'));
const CorporateHealthServices = lazy(() => import('./pages/CorporateHealthServices'));
const PatientSupportServices = lazy(() => import('./pages/PatientSupportServices'));
const PractitionerServices = lazy(() => import('./pages/PractitionerServices'));
const ServicePage = lazy(() => import('./pages/ServicePage'));

// Doctor Pages
const DoctorDashboard = lazy(() => import('./doctor/pages/DoctorDashboard'));
const DoctorBlogEditor = lazy(() => import('./doctor/pages/DoctorBlogEditor'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <TransitionOverlay />
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
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
            <Route path="/blogs/:slug" element={<PageTransition><BlogDetail /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />

            {/* Doctor Portal Routes */}
            <Route path="/doctor/blogs" element={<PageTransition><DoctorDashboard /></PageTransition>} />
            <Route path="/doctor/blogs/create" element={<PageTransition><DoctorBlogEditor /></PageTransition>} />
            <Route path="/doctor/blogs/edit/:id" element={<PageTransition><DoctorBlogEditor /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}
