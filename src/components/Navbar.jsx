import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, ChevronDown, Layers, Droplet, Compass } from 'lucide-react';

const Navbar = ({ currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#/' },
    { name: 'About', href: '#/about' },
    {
      name: 'Products',
      href: '#/portfolio',
      dropdown: [
        { name: 'Terrariums', href: '#/terrarium' },
        { name: 'Paludariums', href: '#/paludarium' }
      ]
    },
    { name: 'Contact', href: '#/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-6'}`}>
      <div className="container">
        <div className={`glass rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'shadow-md bg-[#041b10]/40 backdrop-blur-xl border-white/15' : 'bg-transparent border-transparent'}`}>
          <a href="#/" className="flex items-center gap-2 cursor-pointer">
            <Leaf className="text-primary w-8 h-8 animate-pulse" />
            <span className="text-2xl font-bold tracking-tighter text-white">TERRA<span className="text-primary">FUSION</span></span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.dropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative group py-2"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <a
                      href={link.href}
                      className="text-sm font-medium text-white/90 hover:text-primary transition-colors py-1 cursor-pointer"
                    >
                      {link.name}
                    </a>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 glass rounded-xl p-1.5 shadow-2xl bg-[#041b10]/85 border border-white/15 backdrop-blur-2xl z-50 flex flex-col gap-1"
                        >
                          {link.dropdown.map((sub) => (
                            <a
                              key={sub.name}
                              href={sub.href}
                              onClick={() => setIsDropdownOpen(false)}
                              className="relative flex items-center justify-center py-2 px-3 rounded-lg hover:bg-white/5 transition-all text-xs font-semibold text-white/80 hover:text-primary text-center"
                            >
                              {sub.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-white/90 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              );
            })}

            <a href="#/contact" className="btn btn-primary text-sm py-2">Get Started</a>
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
          className="absolute top-full left-0 w-full glass mt-2 py-4 md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10"
        >
          <div className="container flex flex-col gap-4">
            {navLinks.map((link) => {
              if (link.dropdown) {
                return (
                  <div key={link.name} className="flex flex-col gap-2">
                    <button
                      onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                      className="text-lg font-medium py-2 border-b border-white/5 text-white flex justify-between items-center w-full"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isMobileDropdownOpen ? 'rotate-180 text-primary' : 'text-white/60'}`} />
                    </button>
                    {isMobileDropdownOpen && (
                      <div className="flex flex-col gap-3 pl-4 py-2 bg-white/5 rounded-xl border border-white/5">
                        {link.dropdown.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            className="text-base text-white/85 hover:text-primary transition-colors flex items-center gap-2 py-1"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsMobileDropdownOpen(false);
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {sub.name}
                          </a>
                        ))}
                        <a
                          href={link.href}
                          className="text-sm text-primary/70 hover:text-primary transition-colors flex items-center gap-2 py-1 font-semibold"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileDropdownOpen(false);
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/45" />
                          View All Products
                        </a>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium py-2 border-b border-white/5 text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              );
            })}
            <a
              href="#/contact"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-primary w-full justify-center"
            >
              Get Started
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
