import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function TransitionOverlay() {
  const location = useLocation();
  const [animating, setAnimating] = useState(false);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathRef.current === location.pathname) return;
    prevPathRef.current = location.pathname;

    setAnimating(true);
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!animating) return null;

  return (
    <div
      className="fixed top-0 inset-x-0 h-[2.5px] z-[9999] bg-[#0066FF] animate-pulse pointer-events-none transition-opacity duration-300"
      style={{
        boxShadow: '0 0 10px rgba(0, 102, 255, 0.6)'
      }}
    />
  );
}
