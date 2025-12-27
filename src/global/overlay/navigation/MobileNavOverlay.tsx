import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export function MobileNavOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'HOME', href: '#home' },
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT ME', href: '#about' },
    { label: 'CONTACT', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const overlay = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ 
            type: 'spring',
            stiffness: 100,
            damping: 20,
            mass: 1.2
          }}
          className="fixed top-0 left-0 w-screen h-screen z-[9999999] bg-background"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}
        >
          {/* Header */}
          <motion.div 
            className="flex justify-between items-center px-4 sm:px-8 py-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <img 
                src="/logo.png" 
                alt="ArtCoded Logo" 
                className="w-8 h-8 object-contain brightness-0 dark:brightness-0 dark:invert"
              />
              <span className="font-orbitron text-lg font-bold tracking-wider text-foreground">
                ARTCODED
              </span>
            </motion.div>
            
            {/* Close Button - Right on mobile, Centered on desktop */}
            <motion.button
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              whileHover={{ rotate: 90 }}
              transition={{ delay: 0.3, duration: 0.4, type: 'spring', stiffness: 200 }}
              className="md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6 w-10 h-10 flex items-center justify-center rounded-full bg-foreground transition-colors"
              aria-label="Close navigation"
            >
              <X size={20} className="text-background" />
            </motion.button>
            
            {/* Let's Talk - Hidden on mobile */}
            <motion.button 
              className="hidden md:flex px-6 py-2 border border-foreground/20 rounded-full text-sm text-foreground hover:bg-foreground/10 transition-colors items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              LET'S TALK
              <span>→</span>
            </motion.button>
          </motion.div>

          {/* Navigation Items - Centered */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <nav className="flex flex-col items-center gap-1 sm:gap-2 pointer-events-auto">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  initial={{ opacity: 0, y: 60, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ 
                    delay: 0.3 + index * 0.1,
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 100,
                    damping: 15
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tight group flex items-center"
                  style={{ fontFamily: '"Orbitron", sans-serif' }}
                >
                  {/* Left Bracket with Glow */}
                  <span 
                    className="absolute -left-8 sm:-left-12 md:-left-16 text-foreground font-black opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:-translate-x-2"
                    style={{
                      filter: 'drop-shadow(0 0 8px currentColor) drop-shadow(0 0 12px currentColor)',
                    }}
                  >
                    [
                  </span>
                  
                  {/* Text */}
                  <span className="relative z-10">
                    {item.label}
                  </span>
                  
                  {/* Right Bracket with Glow */}
                  <span 
                    className="absolute -right-8 sm:-right-12 md:-right-16 text-foreground font-black opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-2"
                    style={{
                      filter: 'drop-shadow(0 0 8px currentColor) drop-shadow(0 0 12px currentColor)',
                    }}
                  >
                    ]
                  </span>
                  
                  {/* Blinking Cursor */}
                  <span 
                    className="absolute -right-4 sm:-right-6 md:-right-8 text-foreground font-black opacity-0 group-hover:opacity-100 group-hover:animate-pulse"
                    style={{
                      filter: 'drop-shadow(0 0 6px currentColor)',
                    }}
                  >
                    |
                  </span>
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.p 
              className="text-xs sm:text-sm text-foreground/60 order-2 sm:order-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              ©2025 ALL RIGHTS RESERVED
            </motion.p>
            <motion.div 
              className="flex gap-4 sm:gap-6 text-xs sm:text-sm order-1 sm:order-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.a 
                href="#" 
                className="text-foreground/60 hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                INSTAGRAM ↗
              </motion.a>
              <motion.a 
                href="#" 
                className="text-foreground/60 hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                LINKEDIN ↗
              </motion.a>
              <motion.a 
                href="#" 
                className="text-foreground/60 hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                BEHANCE ↗
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Menu Button - 4 dots */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.3 }}
        className="p-2 rounded-full hover:bg-foreground/10 transition-colors"
        aria-label="Open navigation"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-foreground">
          <circle cx="7" cy="7" r="2" fill="currentColor" />
          <circle cx="17" cy="7" r="2" fill="currentColor" />
          <circle cx="7" cy="17" r="2" fill="currentColor" />
          <circle cx="17" cy="17" r="2" fill="currentColor" />
        </svg>
      </motion.button>

      {/* Render overlay at document body level using Portal */}
      {createPortal(overlay, document.body)}
    </>
  );
}
