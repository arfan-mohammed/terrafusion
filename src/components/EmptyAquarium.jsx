import React from 'react';
import { motion } from 'framer-motion';

const EmptyAquarium = () => {
  return (
    <section className="py-24 bg-transparent overflow-hidden">
      <div className="container flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative w-full max-w-4xl aspect-[2/1]"
        >
          {/* Truly Empty Glass Aquarium (SVG) */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-full h-full"
          >
            <svg viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_20px_50px_rgba(16,185,129,0.1)]">
              {/* Back Glass Panel */}
              <rect x="100" y="50" width="800" height="400" fill="rgba(16, 185, 129, 0.02)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
              
              {/* Bottom Glass Panel */}
              <path d="M100 450 L200 400 L800 400 L900 450 Z" fill="rgba(16, 185, 129, 0.05)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
              
              {/* Left Glass Panel */}
              <path d="M100 50 L200 100 L200 400 L100 450 Z" fill="rgba(16, 185, 129, 0.03)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
              
              {/* Right Glass Panel */}
              <path d="M900 50 L800 100 L800 400 L900 450 Z" fill="rgba(16, 185, 129, 0.03)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
              
              {/* Front Glass Panel (Rimless Edge) */}
              <rect x="100" y="50" width="800" height="400" fill="rgba(16, 185, 129, 0.01)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" className="opacity-40" />
              
              {/* Top Glass Edge (Highlight) */}
              <line x1="100" y1="50" x2="900" y2="50" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
              
              {/* Corner Accents */}
              <circle cx="100" cy="450" r="2" fill="white" opacity="0.5" />
              <circle cx="900" cy="450" r="2" fill="white" opacity="0.5" />
              <circle cx="100" cy="50" r="1.5" fill="white" opacity="0.3" />
              <circle cx="900" cy="50" r="1.5" fill="white" opacity="0.3" />
            </svg>
            
            {/* Inner Glow / Caustics */}
            <div className="absolute inset-x-[15%] inset-y-[20%] bg-primary/5 blur-[80px] rounded-full opacity-20 pointer-events-none" />
          </motion.div>

          {/* Realistic Shadow */}
          <div className="w-2/3 h-6 bg-black/50 blur-[40px] rounded-full mx-auto -mt-6" />
        </motion.div>

        <div className="mt-8 text-center">
          <h3 className="text-primary/40 text-[10px] uppercase tracking-[1em] font-light">
            Modular Ecosystem Core
          </h3>
        </div>
      </div>
    </section>
  );
};

export default EmptyAquarium;
