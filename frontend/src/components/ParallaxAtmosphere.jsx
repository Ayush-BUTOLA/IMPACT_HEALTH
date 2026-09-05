import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function ParallaxAtmosphere() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Smooth springs for different depth layers
  const springProgressSlow = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });
  const springProgressMid = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const springProgressFast = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Translation values for various floating nodes
  const ySlow1 = useTransform(springProgressSlow, [0, 1], [0, 300]);
  const ySlow2 = useTransform(springProgressSlow, [0, 1], [0, -250]);
  const yMid1 = useTransform(springProgressMid, [0, 1], [0, 500]);
  const yMid2 = useTransform(springProgressMid, [0, 1], [0, -450]);
  const yFast1 = useTransform(springProgressFast, [0, 1], [0, 750]);
  const yFast2 = useTransform(springProgressFast, [0, 1], [0, -700]);

  const rotate1 = useTransform(springProgressMid, [0, 1], [0, 180]);
  const rotate2 = useTransform(springProgressSlow, [0, 1], [0, -120]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Slow ambient glowing radial orbs */}
      <motion.div
        style={{ y: ySlow1 }}
        className="absolute top-[18%] -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-[#003087]/5 to-transparent blur-3xl"
      />
      <motion.div
        style={{ y: ySlow2 }}
        className="absolute top-[48%] -right-32 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-[#008C7A]/6 to-transparent blur-3xl"
      />
      <motion.div
        style={{ y: ySlow1 }}
        className="absolute top-[75%] left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#003087]/4 to-transparent blur-3xl"
      />

      {/* 2. Mid-speed subtle geometric accent badges */}
      <motion.div
        style={{ y: yMid1, rotate: rotate1 }}
        className="absolute top-[28%] right-[8%] w-12 h-12 border border-[#003087]/10 rounded-2xl opacity-40 backdrop-blur-sm"
      />
      <motion.div
        style={{ y: yMid2, rotate: rotate2 }}
        className="absolute top-[62%] left-[6%] w-14 h-14 border border-[#008C7A]/15 rounded-full opacity-50 backdrop-blur-sm"
      />

      {/* 3. Fast micro-depth floating light particles */}
      <motion.div
        style={{ y: yFast1 }}
        className="absolute top-[35%] left-[18%] w-2 h-2 rounded-full bg-[#008C7A]/30"
      />
      <motion.div
        style={{ y: yFast2 }}
        className="absolute top-[55%] right-[22%] w-2.5 h-2.5 rounded-full bg-[#003087]/25"
      />
      <motion.div
        style={{ y: yFast1 }}
        className="absolute top-[82%] right-[12%] w-2 h-2 rounded-full bg-[#00E5C9]/35"
      />
    </div>
  );
}
