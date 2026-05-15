import React from 'react';
import { motion, useTransform } from 'framer-motion';

// Awaiting new transparent PNG assets from the user...

const AnimatedPaludarium = ({ scrollProgress }) => {
  // 1. Empty Aquarium (Stays at 1x scale for maximum quality)
  const emptyScale = useTransform(scrollProgress, [0, 1], [1, 1]);

  // 2. Soil - flies in and scales up to assemble
  const soilOpacity = useTransform(scrollProgress, [0.05, 0.2], [0, 1]);
  const soilScale = useTransform(scrollProgress, [0.05, 0.2], [0.5, 1]);

  // 3. Driftwood & Stone - flies in
  const hardscapeOpacity = useTransform(scrollProgress, [0.25, 0.4], [0, 1]);
  const hardscapeScale = useTransform(scrollProgress, [0.25, 0.4], [0.6, 1]);

  // 4. Plants - fly in
  const plantsOpacity = useTransform(scrollProgress, [0.45, 0.6], [0, 1]);
  const plantsScale = useTransform(scrollProgress, [0.45, 0.6], [0.7, 1]);

  // 5. Waterfalls - flow in
  const waterfallOpacity = useTransform(scrollProgress, [0.65, 0.8], [0, 1]);
  const waterfallScale = useTransform(scrollProgress, [0.65, 0.8], [0.8, 1]);

  // 6. Mist - gently fades in
  const mistOpacity = useTransform(scrollProgress, [0.85, 0.95], [0, 1]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0a0f16]">
      <motion.div
        className="relative w-full h-full origin-center"
        style={{ scale: emptyScale }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 text-xl font-light">
          Waiting for new transparent assets...
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedPaludarium;
