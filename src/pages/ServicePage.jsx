import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import ServicePageLayout from '../components/ServicePageLayout';
import Button from '../components/Button';
import { ShieldAlert } from 'lucide-react';

export default function ServicePage() {
  const { category, serviceId } = useParams();

  // Find the service in our structured data
  const categoryData = servicesData[category];
  const service = categoryData ? categoryData[serviceId] : null;

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Impact Health`;
    } else {
      document.title = `Service Not Found | Impact Health`;
    }

    // Scroll to top instantly on page change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [category, serviceId, service]);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-6 py-24 text-center font-sans">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-3">Service Not Found</h1>
        <p className="text-sm text-gray-600 max-w-md mb-8">
          The healthcare service you are looking for does not exist or has been relocated. Please check the URL or return to home.
        </p>
        <Link to="/">
          <Button variant="primary" className="bg-[#0F4C81] text-white px-6 py-3 rounded-lg font-semibold text-sm">
            Return to Homepage
          </Button>
        </Link>
      </div>
    );
  }

  return <ServicePageLayout service={service} />;
}
