import { motion, useReducedMotion } from 'motion/react';

export default function PageTransition({ children }) {
  const shouldReduceMotion = useReducedMotion();

  const transitionVariants = {
    initial: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 8,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.22,
        ease: [0.23, 1, 0.32, 1],
      },
    },
    exit: {
      opacity: shouldReduceMotion ? 1 : 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.15,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={transitionVariants}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}
