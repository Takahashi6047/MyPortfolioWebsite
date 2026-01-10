import { useState, useEffect, useRef } from 'react';
import { Code2, Palette } from 'lucide-react';
import { useRipple } from '../../global/overlay/themeOverlay/RippleContext';
import { useCursor } from '../../global/cursor';
import { AnimatePresence, motion } from 'framer-motion';

export function ThemeToggle() {
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { triggerRipple, isAnimating, theme } = useRipple();
  const { setCursorText, setCursorVariant } = useCursor();

  const isDark = theme === 'dark';

  useEffect(() => {
    if (isHovering) {
      setCursorText(isDark ? 'Enter Dev Mode' : 'Enter Artistry Mode');
      setCursorVariant('text');
    }
  }, [isDark, isHovering, setCursorText, setCursorVariant]);

  // Reset cursor state when component unmounts or loses focus
  useEffect(() => {
    return () => {
      setCursorText('');
      setCursorVariant('default');
    };
  }, [setCursorText, setCursorVariant]);

  const toggleTheme = () => {
    if (isAnimating || !buttonRef.current) {
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newIsDark = !isDark;
    triggerRipple(centerX, centerY, newIsDark);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    setCursorText(isDark ? 'Enter Dev Mode' : 'Enter Artistry Mode');
    setCursorVariant('text');
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCursorText('');
    setCursorVariant('default');
  };

  return (
    <div className="flex items-center gap-3">
      {/* Dynamic Text Indicator */}
      <div className="hidden sm:block relative h-5 w-8 overflow-hidden">
        <AnimatePresence mode="wait">
          {!isDark ? (
            <motion.span
              key="dev-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-blue-600 tracking-wider"
            >
              DEV
            </motion.span>
          ) : (
            <motion.span
              key="art-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center font-sans text-xs font-black text-yellow-500 tracking-widest italic"
            >
              ART
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <button
        ref={buttonRef}
        onClick={toggleTheme}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={isAnimating}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 z-[999999] ${!isDark
          ? 'bg-blue-100 hover:bg-blue-200 focus:ring-blue-500'
          : 'bg-neutral-800 hover:bg-neutral-700 focus:ring-yellow-500'
          } ${isAnimating ? 'opacity-75 cursor-wait' : ''}`}
        aria-label="Toggle theme"
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${!isDark ? 'translate-x-6' : 'translate-x-1'
            }`}
        >
          <span className="flex h-full w-full items-center justify-center">
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="art-icon"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Palette size={12} className="text-yellow-600" />
                </motion.div>
              ) : (
                <motion.div
                  key="dev-icon"
                  initial={{ scale: 0, rotate: 90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Code2 size={12} className="text-blue-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </span>
        </span>

        {isAnimating && (
          <div className="absolute inset-0 bg-neutral-500/10 rounded-full" />
        )}
      </button>
    </div>
  );
}
