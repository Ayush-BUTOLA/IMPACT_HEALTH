import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function TransitionOverlay() {
  const overlayRef = useRef(null);
  const location = useLocation();
  const [isFirstMount, setIsFirstMount] = useState(true);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Skip animation on first mount
    if (isFirstMount) {
      setIsFirstMount(false);
      prevPathRef.current = location.pathname;
      return;
    }

    // Only animate if pathname actually changed
    if (prevPathRef.current === location.pathname) return;
    prevPathRef.current = location.pathname;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const tl = gsap.timeline();

    tl.set(overlay, {
      display: 'block',
      scaleY: 0,
      transformOrigin: 'bottom center',
    })
      .to(overlay, {
        scaleY: 1,
        duration: 0.4,
        ease: 'power3.inOut',
      })
      .set(overlay, {
        transformOrigin: 'top center',
      })
      .to(overlay, {
        scaleY: 0,
        duration: 0.4,
        ease: 'power3.inOut',
        delay: 0.05,
      })
      .set(overlay, {
        display: 'none',
      });

    return () => tl.kill();
  }, [location.pathname, isFirstMount]);

  return (
    <div
      ref={overlayRef}
      className="transition-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'linear-gradient(135deg, #030050 0%, #0d0489 50%, #7e82f4 100%)',
        display: 'none',
        pointerEvents: 'none',
        transformOrigin: 'bottom center',
        transform: 'scaleY(0)',
      }}
    />
  );
}
