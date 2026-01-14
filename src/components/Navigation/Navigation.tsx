import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { MobileNavOverlay } from '../../global/overlay/navigation/MobileNavOverlay';
import { useState, useEffect, useRef } from 'react';
import { useCursor } from '../../global/cursor';
import { useTheme } from '../../global/overlay/themeOverlay/RippleContext';

export function Navigation() {
  const [showSideNav, setShowSideNav] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { setCursorText, setCursorVariant } = useCursor();
  const { theme } = useTheme();
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const isArtMode = theme === 'dark';

  const handleMouseEnter = (text: string) => {
    setCursorText(text);
    setCursorVariant('text');
  };

  const handleMouseLeave = () => {
    setCursorText('');
    setCursorVariant('default');
  };

  // Reset cursor on unmount
  useEffect(() => {
    return () => {
      setCursorText('');
      setCursorVariant('default');
    };
  }, [setCursorText, setCursorVariant]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = -50; // approximate nav height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowSideNav(window.scrollY > 50);

      // Track active section
      const sections = ['home', isArtMode ? 'artistry' : 'works', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isArtMode]);

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

          <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <MobileNavOverlay />
          </div>

          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <MobileNavOverlay />
            </div>
            <ThemeToggle />
          </div>
        </div>


      </nav>

      <div ref={constraintsRef} className="fixed right-6 top-0 bottom-0 w-12 pointer-events-none z-[999998]" />

      <AnimatePresence>
        {showSideNav && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            dragMomentum={false}
            whileDrag={{ scale: 1.05 }}
            className="fixed right-6 top-1/3 -translate-y-1/2 z-[999999] py-6 px-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col gap-6 items-center cursor-grab active:cursor-grabbing"
          >
            {[
              { label: 'Home', href: '#home', id: 'home' },
              { label: isArtMode ? 'Artistry' : 'Works', href: isArtMode ? '#artistry' : '#works', id: isArtMode ? 'artistry' : 'works' },
              { label: 'Contact Me', href: '#contact', id: 'contact' }
            ].map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.id)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group flex items-center justify-center p-1"
                >
                  {/* Active indicator ring */}
                  <motion.div
                    className={`absolute inset-0 rounded-full border-2 ${isArtMode ? 'border-[var(--art-accent)]' : 'border-blue-400'}`}
                    initial={false}
                    animate={{
                      scale: isActive ? 1.8 : 0,
                      opacity: isActive ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />

                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive
                      ? (isArtMode ? 'bg-[var(--art-accent)] scale-125' : 'bg-blue-400 scale-125')
                      : 'bg-black dark:bg-white group-hover:bg-blue-400 group-hover:scale-150'
                      }`}
                  />

                  <span className="absolute right-8 px-3 py-1 rounded-md bg-black/80 text-white text-xs font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none backdrop-blur-md">
                    {item.label}
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-black/80 rotate-45 transform" />
                  </span>

                  <div className="absolute inset-[-8px]" />
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
