import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { MobileNavOverlay } from '../../global/overlay/navigation/MobileNavOverlay';
import { useState, useEffect } from 'react';
import { useCursor } from '../../global/cursor';

export function Navigation() {
  const [showSideNav, setShowSideNav] = useState(false);
  const [textColor, setTextColor] = useState('text-foreground');
  const { setCursorText, setCursorVariant } = useCursor();

  const handleMouseEnter = (text: string) => {
    setCursorText(text);
    setCursorVariant('text');
  };

  const handleMouseLeave = () => {
    setCursorText('');
    setCursorVariant('default');
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
            onMouseEnter={() => handleMouseEnter("That's me!")}
            onMouseLeave={handleMouseLeave}
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

          {/* Centered on desktop only */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <MobileNavOverlay />
          </div>

          <div className="flex items-center gap-3">
            {/* Show beside theme toggle on mobile */}
            <div className="md:hidden">
              <MobileNavOverlay />
            </div>
            <ThemeToggle />
          </div>
        </div>


      </nav>

      {/* Minimalist Vertical Side Navigation */}
      <AnimatePresence>
        {showSideNav && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-[999999] py-6 px-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col gap-6 items-center"
          >
            {[
              { label: 'Home', href: '#home', onClick: handleHomeClick },
              { label: 'Works', href: '#works' },
              { label: 'About Me', href: '#about' },
              { label: 'Services', href: '#services' },
              { label: 'Contact Me', href: '#contact' }
            ].map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={item.onClick}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative group flex items-center justify-center p-1"
              >
                {/* Dot Indicator */}
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 group-hover:bg-blue-400 group-hover:scale-150 ${textColor === 'text-white' ? 'bg-white/60' : 'bg-black/40'}`}
                />

                {/* Hover Label */}
                <span className="absolute right-8 px-3 py-1 rounded-md bg-black/80 text-white text-xs font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none backdrop-blur-md">
                  {item.label}
                  {/* Tiny arrow pointing right */}
                  <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-black/80 rotate-45 transform" />
                </span>

                {/* Larger invisible target area for easier clicking */}
                <div className="absolute inset-[-8px]" />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
