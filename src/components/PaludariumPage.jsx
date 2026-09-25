import React from 'react';
import { motion } from 'framer-motion';

export default function PaludariumPage() {
  return (
    <div className="bg-[#020B07] text-white h-screen w-full flex items-center justify-center selection:bg-primary selection:text-black relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-blue-950/20 to-[#020B07] pointer-events-none" />
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-5xl md:text-8xl font-bold tracking-tighter text-center z-10"
      >
        MAJESTIC <span className="text-[#06b6d4] drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">PALUDARIUMS</span>
      </motion.h1>
    </div>
  );
}
