import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="container">
        <div className={`glass rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'shadow-lg bg-black/40 backdrop-blur-xl border-white/10' : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center gap-2">
            <Leaf className="text-primary w-8 h-8" />
            <span className="text-2xl font-bold tracking-tighter text-white">TERRA<span className="text-primary">FUSION</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/90 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}

            <button className="btn btn-primary text-sm py-2">Get Started</button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full glass mt-2 py-4 md:hidden bg-black/90 backdrop-blur-2xl border-b border-white/10"
        >
          <div className="container flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium py-2 border-b border-white/5 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="btn btn-primary w-full justify-center">Get Started</button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
