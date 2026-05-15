import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import { animate } from 'animejs';

// 3D Object Component (Three.js)
const FloatingEcosystem = ({ theme }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial 
          color={theme === 'dark' ? "#3b82f6" : "#10b981"} 
          attach="material" 
          distort={0.4} 
          speed={2} 
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
    </Float>
  );
};

// Main Component
const EcosystemVisualizer = ({ theme }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Anime.js SVG Animation
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      
      const paths = document.querySelectorAll('.ecosystem-path');
      paths.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
      });

      animate('.ecosystem-path', {
        strokeDashoffset: 0,
        easing: 'easeInOutSine',
        duration: 2500,
        delay: (el, i) => i * 250
      });
    }
  }, [isInView, hasAnimated]);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-slate-900">
      
      {/* Three.js Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <FloatingEcosystem theme={theme} />
        </Canvas>
      </div>

      {/* Anime.js SVG Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center opacity-30">
        <svg 
          ref={svgRef}
          width="800" 
          height="800" 
          viewBox="0 0 800 800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="ecosystem-path" cx="400" cy="400" r="300" stroke={theme === 'dark' ? "#ffffff" : "#000000"} strokeWidth="2" strokeDasharray="10 10"/>
          <path className="ecosystem-path" d="M100 400C200 200 600 600 700 400" stroke={theme === 'dark' ? "#3b82f6" : "#10b981"} strokeWidth="4"/>
          <path className="ecosystem-path" d="M400 100C600 200 200 600 400 700" stroke={theme === 'dark' ? "#3b82f6" : "#10b981"} strokeWidth="4"/>
        </svg>
      </div>

      {/* Framer Motion HTML/UI Overlay */}
      <div className="relative z-20 container mx-auto px-6 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Dynamic <span className="text-primary">Ecosystems</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-dim mb-8"
          >
            Powered by the intersection of Three.js, Anime.js, Framer Motion, and Lenis. 
            Experience a digital terrarium where smooth scrolling meets WebGL distortion and SVG vector animation.
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pointer-events-auto px-8 py-3 bg-primary text-white rounded-full font-medium tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
          >
            Explore Nature
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default EcosystemVisualizer;
