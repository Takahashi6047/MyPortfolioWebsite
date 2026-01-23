import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useCursor } from '../../cursor';
import { useTheme } from '../themeOverlay/RippleContext';

export function MobileNavOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { setCursorText, setCursorVariant } = useCursor();
  const { theme } = useTheme();

  // Determine if we're in artistry mode (dark) or dev mode (light)
  const isArtistryMode = theme === 'dark';

  const handleMouseEnter = (text: string) => {
    setCursorText(text);
    setCursorVariant('text');
  };

  const handleMouseLeave = () => {
    setCursorText('');
    setCursorVariant('default');
  };

  // Reset cursor on unmount or when overlay closes
  useEffect(() => {
    if (!isOpen) {
      setCursorText('');
      setCursorVariant('default');
    }
    return () => {
      setCursorText('');
      setCursorVariant('default');
    };
  }, [isOpen, setCursorText, setCursorVariant]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else if (!isClosing) {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isOpen, isClosing]);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = -1; // approximate nav height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  // Dynamic nav items based on mode
  const navItems = [
    {
      label: 'HOME',
      href: '#home',
      sectionId: 'home',
      cursorText: 'Take me home! '
    },
    {
      label: 'SERVICES',
      href: '#services',
      sectionId: 'services',
      cursorText: 'Check out my services',
    },
    {
      label: 'WORKS',
      href: isArtistryMode ? '#artistry' : '#works',
      sectionId: isArtistryMode ? 'artistry' : 'works',
      cursorText: isArtistryMode ? 'View the gallery ' : 'Ooh, the good stuff '
    },
    {
      label: 'CONTACT',
      href: '#contact',
      sectionId: 'contact',
      cursorText: "Let's chat! "
    }
  ];

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 1200); // Increased timeout to allow overlay animation to complete
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    handleClose();
    setTimeout(() => {
      scrollToSection(item.sectionId);
    }, 1300);
  };

  const overlay = (
    <>
      {(isOpen || isClosing) && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: isClosing ? '100%' : 0 }}
          transition={{
            type: 'spring',
            stiffness: isClosing ? 80 : 100,
            damping: isClosing ? 25 : 20,
            mass: isClosing ? 1.5 : 1.2,
            delay: isClosing ? 0.6 : 0
          }}
          className="fixed top-0 left-0 w-screen z-[9999999] bg-background"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100dvh', minHeight: '-webkit-fill-available' }}
        >
          {/* Header */}
          <motion.div
            className="flex justify-between items-center px-4 sm:px-8 py-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isClosing ? 0 : 1, y: isClosing ? -20 : 0 }}
            transition={{ delay: isClosing ? 0.25 : 0.2, duration: 0.3 }}
          >
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isClosing ? 0 : 1, x: isClosing ? -20 : 0 }}
              transition={{ delay: isClosing ? 0.25 : 0.3, duration: 0.3 }}
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
              onClick={handleClose}
              onMouseEnter={() => handleMouseEnter('Close')}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isClosing ? 0 : 1, scale: isClosing ? 0 : 1 }}
              whileHover={{ rotate: 90 }}
              transition={{ delay: isClosing ? 0.2 : 0.3, duration: 0.3, type: 'spring', stiffness: 200 }}
              className="md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6 w-10 h-10 flex items-center justify-center rounded-full bg-foreground transition-colors"
              aria-label="Close navigation"
            >
              <X size={20} className="text-background" />
            </motion.button>

            {/* Let's Talk - Hidden on mobile */}
            <motion.button
              className="hidden md:flex px-6 py-2 border border-foreground/20 rounded-full text-sm text-foreground hover:bg-foreground/10 transition-colors items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isClosing ? 0 : 1, x: isClosing ? 20 : 0 }}
              transition={{ delay: isClosing ? 0.25 : 0.3, duration: 0.3 }}
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
                  onClick={() => handleNavClick(item)}
                  onMouseEnter={() => handleMouseEnter(item.cursorText)}
                  onMouseLeave={handleMouseLeave}
                  initial={{ opacity: 0, y: 60, scale: 0.8 }}
                  animate={{
                    opacity: isClosing ? 0 : 1,
                    y: isClosing ? 0 : 0,
                    scale: 1,
                    scaleX: isClosing ? 0 : 1
                  }}
                  transition={{
                    delay: isClosing
                      ? (navItems.length - index - 1) * 0.05
                      : 0.3 + index * 0.1,
                    duration: isClosing ? 0.12 : 0.6,
                    type: isClosing ? 'tween' : 'spring',
                    ease: isClosing ? [0.4, 0, 1, 1] : undefined,
                    stiffness: 100,
                    damping: 15
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tight group flex items-center origin-left"
                  style={{ fontFamily: '"Orbitron", sans-serif' }}
                >
                  {/* Left Bracket with Glow */}
                  <span
                    className="absolute -left-8 sm:-left-12 md:-left-16 text-foreground font-black opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:-translate-x-2"
                    style={{
                      textShadow: '0 0 8px currentColor, 0 0 12px currentColor',
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
                      textShadow: '0 0 8px currentColor, 0 0 12px currentColor',
                    }}
                  >
                    ]
                  </span>

                  {/* Blinking Cursor */}
                  <span
                    className="absolute -right-4 sm:-right-6 md:-right-8 text-foreground font-black opacity-0 group-hover:opacity-100 group-hover:animate-pulse"
                    style={{
                      textShadow: '0 0 6px currentColor',
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
            animate={{ opacity: isClosing ? 0 : 1, y: isClosing ? 20 : 0 }}
            transition={{ delay: isClosing ? 0 : 0.6, duration: 0.3 }}
          >
            <motion.p
              className="text-xs sm:text-sm text-foreground/60 order-2 sm:order-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: isClosing ? 0 : 1 }}
              transition={{ delay: isClosing ? 0 : 0.7, duration: 0.3 }}
            >
              ©2025 ALL RIGHTS RESERVED
            </motion.p>
            <motion.div
              className="flex gap-4 sm:gap-6 text-xs sm:text-sm order-1 sm:order-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isClosing ? 0 : 1 }}
              transition={{ delay: isClosing ? 0 : 0.7, duration: 0.3 }}
            >
              <motion.a
                href="https://github.com/Takahashi6047"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                GITHUB ↗
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/john-robert-adlawan-6187443a6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                LINKEDIN ↗
              </motion.a>
              <motion.a
                href="https://www.instagram.com/artcodedddd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                INSTAGRAM ↗
              </motion.a>
              <motion.a
                href="mailto:hello.artcoded@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                EMAIL ↗
              </motion.a>
              {/* <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                RESUME ⬇
              </motion.a> */}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  );

  return (
    <>
      {/* Menu Button - 4 dots */}
      <motion.button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => handleMouseEnter('Menu')}
        onMouseLeave={handleMouseLeave}
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
