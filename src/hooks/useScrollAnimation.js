import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP scroll-triggered animations.
 *
 * @param {'fadeUp'|'fadeLeft'|'fadeRight'|'scaleIn'|'staggerUp'} type
 * @param {object} options
 * @returns {React.RefObject}
 */
export function useScrollAnimation(type = 'fadeUp', options = {}) {
  const ref = useRef(null);

  const {
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
    triggerStart = 'top 85%',
    staggerAmount = 0.12,
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ctx = gsap.context(() => {
      const baseScrollTrigger = {
        trigger: el,
        start: triggerStart,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      };

      switch (type) {
        case 'fadeUp':
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration,
            delay,
            ease,
            scrollTrigger: baseScrollTrigger,
          });
          break;

        case 'fadeLeft':
          gsap.from(el, {
            x: -50,
            opacity: 0,
            duration,
            delay,
            ease,
            scrollTrigger: baseScrollTrigger,
          });
          break;

        case 'fadeRight':
          gsap.from(el, {
            x: 50,
            opacity: 0,
            duration,
            delay,
            ease,
            scrollTrigger: baseScrollTrigger,
          });
          break;

        case 'scaleIn':
          gsap.from(el, {
            scale: 0.9,
            opacity: 0,
            duration,
            delay,
            ease,
            scrollTrigger: baseScrollTrigger,
          });
          break;

        case 'staggerUp':
          gsap.from(el.children, {
            y: 30,
            opacity: 0,
            duration,
            delay,
            ease,
            stagger: staggerAmount,
            scrollTrigger: baseScrollTrigger,
          });
          break;

        default:
          break;
      }
    }, el);

    return () => ctx.revert();
  }, [type, duration, delay, ease, triggerStart, staggerAmount, once]);

  return ref;
}

/**
 * Hook for parallax scroll effect.
 * @param {number} speed - Parallax speed multiplier (0.1 = subtle, 0.5 = strong)
 */
export function useParallax(speed = 0.2) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
