import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

// Importing assets
import step1 from '../assets/hero_step1_tank.png';
import step2 from '../assets/hero_step2_soil.png';
import step3 from '../assets/hero_step3_wood.png';
import step4 from '../assets/hero_step4_stones.png';
import step5 from '../assets/hero_step5_plants.png';
import step6 from '../assets/hero_step6_mist.png';

const steps = [
  { id: 1, img: step1, title: 'Step 1: The Glass Canvas' },
  { id: 2, img: step2, title: 'Step 2: Hardscape Foundation' },
  { id: 3, img: step3, title: 'Step 3: Initial Planting' },
  { id: 4, img: step4, title: 'Step 4: The Greenery' },
  { id: 5, img: step5, title: 'Step 5: Living Water' },
  { id: 6, img: step6, title: 'Step 6: The Atmosphere' },
];

const PaludariumBuild = () => {
  const containerRef = useRef(null);
  // activeStep starts at 0 = Step 1 always shown first
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Listen to scroll progress and derive which step (0-5) is active
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Clamp to valid range
    const clamped = Math.max(0, Math.min(0.9999, latest));
    const stepIndex = Math.floor(clamped * steps.length);
    setActiveStep(stepIndex);
  });

  return (
    <section ref={containerRef} className="relative h-[600vh] bg-bg">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

        {/* Progress Dots */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary transition-opacity duration-300"
              style={{ opacity: i === activeStep ? 1 : 0.25 }}
            />
          ))}
        </div>

        {/* Image stack — only the active step is shown */}
        <div className="relative w-full max-w-[1400px] aspect-[2.5/1] group">

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={false}
              animate={{
                opacity: index === activeStep ? 1 : 0,
                scale: index === activeStep ? 1 : 0.98,
              }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-900"
              style={{ pointerEvents: index === activeStep ? 'auto' : 'none' }}
            >
              <img
                src={step.img}
                alt={step.title}
                className="w-full h-full object-cover object-[center_20%]"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-4 z-30 flex justify-center px-6">
                <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight bg-black/60 backdrop-blur-md px-8 py-3 rounded-xl text-center">
                  {step.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Step counter */}
        <div className="absolute bottom-24 text-dim text-xs uppercase tracking-widest">
          {activeStep + 1} / {steps.length}
        </div>

        {/* Scroll Instruction — shown only on step 1 */}
        <motion.div
          animate={{ opacity: activeStep === 0 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-12 text-dim text-xs uppercase tracking-widest animate-bounce"
        >
          Scroll down to begin building
        </motion.div>

      </div>
    </section>
  );
};

export default PaludariumBuild;
