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

// New hero light images for sequential swap
import heroLight1 from '../assets/hero_light-1.png';
import heroLight2 from '../assets/hero_light-2.png';
import heroLight3 from '../assets/hero_light-3.png';

// New hero right images for sequential swap
import hero3_1 from '../assets/hero_3-1.png';
import hero3_2 from '../assets/hero_3-2.png';
import hero3_3 from '../assets/hero_3-3.png';
import hero3_4 from '../assets/hero_3-4.png';

const Hero = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // States for center panel hover slideshow
  const [lightHeroIndex, setLightHeroIndex] = useState(0);
  const [isLightHovered, setIsLightHovered] = useState(false);

  // States for right panel hover slideshow
  const [rightHeroIndex, setRightHeroIndex] = useState(0);
  const [isRightHovered, setIsRightHovered] = useState(false);

  const heroImages = useMemo(() => [img1, hero1, hero2, hero3, hero4, hero5], []);
  const lightHeroImages = useMemo(() => [img2, heroLight1, heroLight2, heroLight3], []);
  const rightHeroImages = useMemo(() => [img3, hero3_1, hero3_2, hero3_3, hero3_4], []);

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

  // Slideshow logic on hover for Panel 2 (Center Image) - 3 second interval
  useEffect(() => {
    let interval;
    if (isLightHovered) {
      // Trigger first change immediately on hover so user sees it working
      setLightHeroIndex(1);

      interval = setInterval(() => {
        setLightHeroIndex((prev) => {
          const next = prev + 1;
          return next % lightHeroImages.length;
        });
      }, 3000); // 3 seconds per image
    } else {
      setLightHeroIndex(0); // Reset to original image
    }
    return () => clearInterval(interval);
  }, [isLightHovered, lightHeroImages.length]);

  // Slideshow logic on hover for Panel 3 (Right Image) - 3 second interval
  useEffect(() => {
    let interval;
    if (isRightHovered) {
      // Trigger first change immediately on hover so user sees it working
      setRightHeroIndex(1);

      interval = setInterval(() => {
        setRightHeroIndex((prev) => {
          const next = prev + 1;
          return next % rightHeroImages.length;
        });
      }, 3000); // 3 seconds per image
    } else {
      setRightHeroIndex(0); // Reset to original image
    }
    return () => clearInterval(interval);
  }, [isRightHovered, rightHeroImages.length]);


  return (
    <section className="relative h-screen w-full bg-transparent overflow-hidden flex">
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

      </motion.div>

      {/* Panel 2 - Interactive Center Image Sequence */}
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: '33.34%' }}
        transition={{ duration: 1, delay: 0.2, ease: 'circOut' }}
        onMouseEnter={() => setIsLightHovered(true)}
        onMouseLeave={() => setIsLightHovered(false)}
        className="relative h-full border-r border-white/5 overflow-hidden group cursor-pointer z-20"
      >
        <AnimatePresence mode="popLayout">
          <motion.img
            key={lightHeroIndex}
            src={lightHeroImages[lightHeroIndex]}
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(15px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{
              duration: 1.2, // Smooth cinematic transition
              ease: "easeOut"
            }}
            className="absolute inset-0 w-full h-full object-cover brightness-110 pointer-events-none"
            alt={`Jar Terrarium Sequence ${lightHeroIndex}`}
          />
        </AnimatePresence>

      </motion.div>

      {/* Panel 3 - Interactive Right Image Sequence */}
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: '33.33%' }}
        transition={{ duration: 1, delay: 0.4, ease: 'circOut' }}
        onMouseEnter={() => setIsRightHovered(true)}
        onMouseLeave={() => setIsRightHovered(false)}
        className="relative h-full overflow-hidden group cursor-pointer z-20"
      >
        <AnimatePresence mode="popLayout">
          <motion.img
            key={rightHeroIndex}
            src={rightHeroImages[rightHeroIndex]}
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(15px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{
              duration: 1.2, // Smooth cinematic transition
              ease: "easeOut"
            }}
            className="absolute inset-0 w-full h-full object-cover brightness-110 pointer-events-none"
            alt={`Stunning Terrarium Sequence ${rightHeroIndex}`}
          />
        </AnimatePresence>

      </motion.div>

      {/* Overlay Text - Always Visible and Fixed On Top */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none" style={{ pointerEvents: 'none' }}>
        <div className="text-center">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference">
            TERRA<span className="text-primary">FUSION</span>
          </h1>
          <p className="text-sm md:text-base text-white/70 uppercase tracking-[0.5em] mt-4">
            Living Design for Modern Spaces
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

