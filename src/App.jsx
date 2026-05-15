import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import About from './components/About';
import EmptyAquarium from './components/EmptyAquarium';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <ProjectGrid />
      <About />
      <EmptyAquarium />
      <Contact />

      <footer className="py-12 border-t border-white/5 bg-slate-950">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter text-white">TERRA<span className="text-primary">FUSION</span></span>
          </div>
          <p className="text-dim text-sm">&copy; {new Date().getFullYear()} TerraFusion Ecosystems.</p>
        </div>
      </footer>
    </main>
  );
}

export default App;
