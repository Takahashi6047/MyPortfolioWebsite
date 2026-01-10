import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RippleOverlayProps {
  isActive: boolean;
  centerX: number;
  centerY: number;
  isDarkMode: boolean;
  onComplete: () => void;
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

export function RippleOverlay({ isActive, centerX, centerY, isDarkMode, onComplete, onThemeChange }: RippleOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'expanding' | 'exploding'>('expanding');

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      setAnimationPhase('expanding');
    }
  }, [isActive]);

  const handleExpandComplete = () => {
    const html = document.documentElement;
    
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      // Delay React updates slightly to allow DOM/Particles to settle first
      requestAnimationFrame(() => {
        onThemeChange?.('dark');
      });
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      // Delay React updates slightly to allow DOM/Particles to settle first
      requestAnimationFrame(() => {
        onThemeChange?.('light');
      });
    }

    // Scroll to top when theme changes - use instant scroll and slight delay
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    setTimeout(() => {
      setAnimationPhase('exploding');
    }, 150);
  };

  const handleExplosionComplete = () => {
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 300);
  };

  const maxDistance = Math.sqrt(
    Math.pow(Math.max(centerX, window.innerWidth - centerX), 2) +
    Math.pow(Math.max(centerY, window.innerHeight - centerY), 2)
  ) * 1.2;

  const diameter = maxDistance * 2;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Secondary ripple (rendered first/behind to optimize opacity blending) */}
          <motion.div
            className={`absolute rounded-full will-change-transform ${isDarkMode
              ? 'bg-neutral-800'
              : 'bg-neutral-50'
              }`}
            style={{
              left: centerX,
              top: centerY,
              width: diameter * 1.1,
              height: diameter * 1.1,
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              WebkitFontSmoothing: 'antialiased',
            }}
            initial={{
              scale: 0,
              x: "-50%",
              y: "-50%",
              opacity: 0.7,
            }}
            animate={
              animationPhase === 'expanding'
                ? {
                  scale: 1,
                  x: "-50%",
                  y: "-50%",
                }
                : {
                  scale: 1,
                  x: "-50%",
                  y: "-50%",
                  opacity: 0,
                }
            }
            transition={
              animationPhase === 'expanding'
                ? {
                  scale: { duration: 1.1, ease: [0.64, 0, 0.78, 0], delay: 0.05 },
                }
                : {
                  opacity: { duration: 0.5, ease: 'easeOut', delay: 0.05 },
                }
            }
          />

          {/* Main ripple circle - covers the screen (rendered on top) */}
          <motion.div
            className={`absolute rounded-full will-change-transform ${isDarkMode
              ? 'bg-neutral-900'
              : 'bg-white'
              }`}
            style={{
              left: centerX,
              top: centerY,
              width: diameter,
              height: diameter,
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              WebkitFontSmoothing: 'antialiased',
            }}
            initial={{
              scale: 0,
              x: "-50%",
              y: "-50%",
              opacity: 1,
            }}
            animate={
              animationPhase === 'expanding'
                ? {
                  scale: 1,
                  x: "-50%",
                  y: "-50%",
                }
                : {
                  scale: 1,
                  x: "-50%",
                  y: "-50%",
                  opacity: 0,
                }
            }
            transition={
              animationPhase === 'expanding'
                ? {
                  scale: { duration: 1.0, ease: [0.64, 0, 0.78, 0] },
                }
                : {
                  opacity: { duration: 0.4, ease: 'easeOut' },
                }
            }
            onAnimationComplete={
              animationPhase === 'expanding' ? handleExpandComplete : undefined
            }
          />

          {/* Explosion ripples - multiple rings expanding outward */}
          {animationPhase === 'exploding' && (
            <>
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={`explosion-ring-${i}`}
                  className={`absolute rounded-full border-2 will-change-transform ${isDarkMode
                    ? 'border-neutral-600'
                    : 'border-neutral-400'
                    }`}
                  style={{
                    left: centerX,
                    top: centerY,
                    width: diameter,
                    height: diameter,
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    WebkitFontSmoothing: 'antialiased',
                  }}
                  initial={{
                    scale: 0,
                    x: "-50%",
                    y: "-50%",
                    opacity: 0,
                    borderWidth: '0px',
                  }}
                  animate={{
                    scale: 1.5 + i * 0.3,
                    x: "-50%",
                    y: "-50%",
                    opacity: [0, 0.8, 0],
                    borderWidth: ['2px', '1px', '0px'],
                  }}
                  transition={{
                    duration: 1.2 + i * 0.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.15,
                    times: [0, 0.2, 1],
                  }}
                  onAnimationComplete={i === 1 ? handleExplosionComplete : undefined}
                />
              ))}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
