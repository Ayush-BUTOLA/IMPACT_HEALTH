import React, { useEffect } from 'react';
import CategoryPageLayout from '../components/CategoryPageLayout';
import { categoriesData } from '../data/servicesData';

export default function SchoolHealthServices() {
  const categoryKey = "school-health";
  const data = categoriesData[categoryKey];

  useEffect(() => {
    document.title = `${data.title} | Impact Health`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [data]);

  return <CategoryPageLayout categoryKey={categoryKey} data={data} />;
}
