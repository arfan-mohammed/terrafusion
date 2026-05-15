import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Using the images seen in the user's screenshot
import img1 from '../assets/hero.png';
import img2 from '../assets/hero_light.png';
import img3 from '../assets/hero_3.png';

// New hero images for sequential swap
import hero1 from '../assets/hero-1.png';
import hero2 from '../assets/hero-2.png';
import hero3 from '../assets/hero-3.png';
import hero4 from '../assets/hero-4.png';
import hero5 from '../assets/hero-5.png';
import hero6 from '../assets/hero-6.png';

const Hero = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const heroImages = useMemo(() => [img1, hero1, hero2, hero3, hero4, hero5, hero6], []);

  // Slideshow logic on hover - 3 second interval
  useEffect(() => {
    let interval;
    if (isHovered) {
      // Trigger first change immediately on hover so user sees it working
      setHeroIndex(1);
      
      interval = setInterval(() => {
        setHeroIndex((prev) => {
          const next = prev + 1;
          return next % heroImages.length;
        });
      }, 3000); // 3 seconds per image
    } else {
      setHeroIndex(0); // Reset to original image
    }
    return () => clearInterval(interval);
  }, [isHovered, heroImages.length]);

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex">
      {/* Panel 1 - Interactive Image Sequence */}
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: '33.33%' }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative h-full border-r border-white/5 overflow-hidden group cursor-pointer z-20"
      >
        <AnimatePresence mode="popLayout">
          <motion.img
            key={heroIndex}
            src={heroImages[heroIndex]}
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(15px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ 
              duration: 1.2, // Smooth cinematic transition
              ease: "easeOut"
            }}
            className="absolute inset-0 w-full h-full object-cover brightness-110 pointer-events-none"
            alt={`Geometric Terrarium Sequence ${heroIndex}`}
          />
        </AnimatePresence>
        
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
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
        <img
          src={img3}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-105"
          alt="Stunning Terrarium Ecosystem"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
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

