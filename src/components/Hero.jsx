import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import img1 from '../assets/hero.png';
import img2 from '../assets/hero_light.png';
import img3 from '../assets/hero_3.png';

import hero1 from '../assets/hero-1.png';
import hero2 from '../assets/hero-2.png';
import hero3 from '../assets/hero-3.png';
import hero4 from '../assets/hero-4.png';
import hero5 from '../assets/hero-5.png';

import heroLight1 from '../assets/hero_light-1.png';
import heroLight2 from '../assets/hero_light-2.png';
import heroLight3 from '../assets/hero_light-3.png';

import hero3_1 from '../assets/hero_3-1.png';
import hero3_2 from '../assets/hero_3-2.png';
import hero3_3 from '../assets/hero_3-3.png';
import hero3_4 from '../assets/hero_3-4.png';
import ProximityMagnifiedText from './ProximityMagnifiedText';

const Hero = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [lightHeroIndex, setLightHeroIndex] = useState(0);
  const [isLightHovered, setIsLightHovered] = useState(false);

  const [rightHeroIndex, setRightHeroIndex] = useState(0);
  const [isRightHovered, setIsRightHovered] = useState(false);

  const heroImages = useMemo(() => [img1, hero1, hero2, hero3, hero4, hero5], []);
  const lightHeroImages = useMemo(() => [img2, heroLight1, heroLight2, heroLight3], []);
  const rightHeroImages = useMemo(() => [img3, hero3_1, hero3_2, hero3_3, hero3_4], []);

  useEffect(() => {
    let interval;
    if (isHovered) {
      setHeroIndex(1);
      interval = setInterval(() => {
        setHeroIndex((prev) => (prev + 1) % heroImages.length);
      }, 3000);
    } else {
      setHeroIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, heroImages.length]);

  useEffect(() => {
    let interval;
    if (isLightHovered) {
      setLightHeroIndex(1);
      interval = setInterval(() => {
        setLightHeroIndex((prev) => (prev + 1) % lightHeroImages.length);
      }, 3000);
    } else {
      setLightHeroIndex(0);
    }
    return () => clearInterval(interval);
  }, [isLightHovered, lightHeroImages.length]);

  useEffect(() => {
    let interval;
    if (isRightHovered) {
      setRightHeroIndex(1);
      interval = setInterval(() => {
        setRightHeroIndex((prev) => (prev + 1) % rightHeroImages.length);
      }, 3000);
    } else {
      setRightHeroIndex(0);
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
        className="relative h-full border-r border-white/10 overflow-hidden group cursor-pointer z-20"
      >
        <AnimatePresence mode="popLayout">
          <motion.img
            key={heroIndex}
            src={heroImages[heroIndex]}
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(15px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{
              duration: 1.2,
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
        className="relative h-full border-r border-white/10 overflow-hidden group cursor-pointer z-20"
      >
        <AnimatePresence mode="popLayout">
          <motion.img
            key={lightHeroIndex}
            src={lightHeroImages[lightHeroIndex]}
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(15px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{
              duration: 1.2,
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
              duration: 1.2,
              ease: "easeOut"
            }}
            className="absolute inset-0 w-full h-full object-cover brightness-110 pointer-events-none"
            alt={`Stunning Terrarium Sequence ${rightHeroIndex}`}
          />
        </AnimatePresence>
      </motion.div>

      {/* Overlay Text - Interactive Mouse Proximity Lens Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-auto">
        <div className="text-center px-4">
          <ProximityMagnifiedText
            as="h1"
            mode="chars"
            radius={160}
            maxScale={1.38}
            className="text-6xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference drop-shadow-2xl font-display"
          >
            TERRAFUSION
          </ProximityMagnifiedText>

          <div className="mt-4">
            <ProximityMagnifiedText
              as="p"
              mode="words"
              radius={140}
              maxScale={1.35}
              className="text-sm md:text-base text-emerald-100 uppercase tracking-[0.4em] drop-shadow-lg font-semibold"
            >
              Living Design for Modern Spaces
            </ProximityMagnifiedText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
