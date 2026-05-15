import React from 'react';
import { motion } from 'framer-motion';

// Using the images seen in the user's screenshot
import img1 from '../assets/hero.png';
import img2 from '../assets/hero_light.png';
import img3 from '../assets/hero.png'; // Fallback to hero for now

const Hero = () => {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex">
      {/* Panel 1 */}
      <motion.div 
        initial={{ width: '0%' }}
        animate={{ width: '33.33%' }}
        transition={{ duration: 1, ease: 'circOut' }}
        className="relative h-full border-r border-white/5 overflow-hidden group"
      >
        <img src={img1} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Geometric Terrarium" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
      </motion.div>

      {/* Panel 2 */}
      <motion.div 
        initial={{ width: '0%' }}
        animate={{ width: '33.34%' }}
        transition={{ duration: 1, delay: 0.2, ease: 'circOut' }}
        className="relative h-full border-r border-white/5 overflow-hidden group"
      >
        <img src={img2} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Jar Terrarium" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
      </motion.div>

      {/* Panel 3 */}
      <motion.div 
        initial={{ width: '0%' }}
        animate={{ width: '33.33%' }}
        transition={{ duration: 1, delay: 0.4, ease: 'circOut' }}
        className="relative h-full overflow-hidden group"
      >
        <img src={img3} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Geometric Terrarium" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
      </motion.div>

      {/* Overlay Text - Original Style */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference">
            TERRA<span className="text-primary">FUSION</span>
          </h1>
          <p className="text-sm md:text-base text-white/70 uppercase tracking-[0.5em] mt-4">
            Living Design for Modern Spaces
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
