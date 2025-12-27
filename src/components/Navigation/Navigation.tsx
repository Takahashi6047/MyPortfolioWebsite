import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [textColor, setTextColor] = useState('text-foreground');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Detect background luminance and adjust text color
  useEffect(() => {
    const detectBackgroundColor = () => {
      if (!showSideNav) return;

      // Get multiple points around the nav area to sample the background
      const navX = window.innerWidth - 60;
      const navY = window.innerHeight / 2;
      
      // Temporarily hide the nav to get the background element
      const navElements = document.querySelectorAll('[class*="fixed right-4"]');
      const originalDisplay = Array.from(navElements).map(el => (el as HTMLElement).style.display);
      
      navElements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });

      const bgElement = document.elementFromPoint(navX, navY);
      const bgColor = window.getComputedStyle(bgElement || document.body).backgroundColor;
      
      // Restore nav visibility
      navElements.forEach((el, i) => {
        (el as HTMLElement).style.display = originalDisplay[i];
      });

      const luminance = getColorLuminance(bgColor);
      
      // If background is dark (luminance < 128), use light text; otherwise use dark text
      setTextColor(luminance < 128 ? 'text-white' : 'text-gray-900');
    };

    const handleScroll = () => {
      detectBackgroundColor();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also detect on initial load
    setTimeout(detectBackgroundColor, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showSideNav]);

  // Helper function to calculate color luminance
  const getColorLuminance = (rgbColor: string): number => {
    const match = rgbColor.match(/\d+/g);
    if (!match || match.length < 3) return 128;

    const [r, g, b] = match.map(Number);
    // Standard luminance formula
    return (0.299 * r + 0.587 * g + 0.114 * b);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show side nav after scrolling 50px
      setShowSideNav(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="relative z-[999999] backdrop-blur-md bg-card/80">
        <div className="mx-auto px-8 py-4 flex justify-between items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
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
          
          <motion.ul
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="hidden md:flex gap-12 items-center text-foreground text-[1.05em] font-medium flex-1 justify-center"
            style={{ fontFamily: '"Quicksand", sans-serif' }}
          >
            <li><a href="#home" className="hover:text-accent transition-colors duration-200">Home</a></li>
            <li><a href="#about" className="hover:text-accent transition-colors duration-200">About Me</a></li>
            <li><a href="#work" className="hover:text-accent transition-colors duration-200">Work</a></li>
            <li><a href="#contact" className="hover:text-accent transition-colors duration-200">Contact</a></li>
          </motion.ul>
          
          <div className="flex items-center gap-3">
            {/* Hamburger menu for mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg bg-card hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={20} className="text-foreground" />
              ) : (
                <Menu size={20} className="text-foreground" />
              )}
            </button>
            
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-card/95 backdrop-blur-md border-t border-border"
          >
            <ul className="px-8 py-6 space-y-4" style={{ fontFamily: '"Quicksand", sans-serif' }}>
              <li>
                <a 
                  href="#home" 
                  className="block text-foreground hover:text-accent transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="block text-foreground hover:text-accent transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Me
                </a>
              </li>
              <li>
                <a 
                  href="#work" 
                  className="block text-foreground hover:text-accent transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Work
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="block text-foreground hover:text-accent transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </nav>

      {/* Sticky side navigation */}
      <AnimatePresence>
        {showSideNav && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-[999999] flex flex-col gap-3"
          >
            {[
              { label: 'Home', href: '#home', onClick: handleHomeClick },
              { label: 'About Me', href: '#about' },
              { label: 'Work', href: '#work' },
              { label: 'Contact Me', href: '#contact' }
            ].map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={item.onClick}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: -8, transition: { duration: 0.2 } }}
                className={`px-4 py-2 rounded-full border backdrop-blur-md shadow-lg transition-all duration-200 font-medium text-sm whitespace-nowrap bg-card/90 border-border ${textColor} hover:bg-accent/20`}
                style={{ fontFamily: '"Quicksand", sans-serif' }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
