import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import About from './components/About';
import EmptyAquarium from './components/EmptyAquarium';
import Contact from './components/Contact';
import TerrariumPage from './components/TerrariumPage';
import PaludariumPage from './components/PaludariumPage';
import GlowCursor from './components/GlowCursor';
import BioluminescentSmokeTrail from './components/BioluminescentSmokeTrail';
import BotanicalAtmosphere from './components/BotanicalAtmosphere';

function App() {
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/terrarium') {
        setCurrentView('terrarium');
        window.scrollTo(0, 0);
      } else if (hash === '#/paludarium') {
        setCurrentView('paludarium');
        window.scrollTo(0, 0);
      } else {
        setCurrentView('home');
        // Handle scrolling to home section
        const sectionId = hash.replace('#/', '');
        if (sectionId && sectionId !== '/' && sectionId !== '#') {
          setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        } else {
          window.scrollTo(0, 0);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
    <main className="min-h-screen bg-[#08321e] relative overflow-x-hidden">
      <BotanicalAtmosphere />
      <Navbar currentView={currentView} />
      
      {currentView === 'home' && (
        <>
          <Hero />
          <ProjectGrid />
          <About />
          <EmptyAquarium />
          <Contact />
        </>
      )}

      {currentView === 'terrarium' && <TerrariumPage />}
      {currentView === 'paludarium' && <PaludariumPage />}

      <footer className="py-12 border-t border-white/10 bg-[#08321e]">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <a href="#/" className="text-xl font-bold tracking-tighter text-white">
              TERRA<span className="text-primary">FUSION</span>
            </a>
          </div>
          <p className="text-dim text-sm">&copy; {new Date().getFullYear()} TerraFusion Ecosystems.</p>
        </div>
      </footer>
    </main>
  );
}

export default App;
