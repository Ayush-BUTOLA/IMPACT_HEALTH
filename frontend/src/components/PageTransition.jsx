import { motion } from 'motion/react';

const transitionVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    filter: 'blur(4px)',
    transition: {
      duration: 0.35,
      ease: [0.55, 0.06, 0.68, 0.19],
    },
  },
};

export default function PageTransition({ children }) {
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
