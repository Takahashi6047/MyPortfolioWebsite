import { useState, useEffect, useMemo } from 'react';
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
  
  // Detect mobile once on mount
  const isMobile = useMemo(() => window.innerWidth < 768, []);

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
      requestAnimationFrame(() => {
        onThemeChange?.('dark');
      });
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      requestAnimationFrame(() => {
        onThemeChange?.('light');
      });
    }

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    setTimeout(() => {
      setAnimationPhase('exploding');
    }, isMobile ? 100 : 150);
  };

  const handleExplosionComplete = () => {
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, isMobile ? 200 : 300);
  };

  const maxDistance = Math.sqrt(
    Math.pow(Math.max(centerX, window.innerWidth - centerX), 2) +
    Math.pow(Math.max(centerY, window.innerHeight - centerY), 2)
  ) * 1.2;

  const diameter = maxDistance * 2;

  // Mobile-optimized animation durations
  const expandDuration = isMobile ? 0.7 : 1.0;
  const secondaryExpandDuration = isMobile ? 0.8 : 1.1;
  const fadeDuration = isMobile ? 0.3 : 0.4;
  const explosionRingCount = isMobile ? 1 : 2;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Secondary ripple - skip on mobile for performance */}
          {!isMobile && (
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
                    scale: { duration: secondaryExpandDuration, ease: [0.64, 0, 0.78, 0], delay: 0.05 },
                  }
                  : {
                    opacity: { duration: fadeDuration, ease: 'easeOut', delay: 0.05 },
                  }
              }
            />
          )}

          {/* Main ripple circle */}
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
                  scale: { duration: expandDuration, ease: [0.64, 0, 0.78, 0] },
                }
                : {
                  opacity: { duration: fadeDuration, ease: 'easeOut' },
                }
            }
            onAnimationComplete={
              animationPhase === 'expanding' ? handleExpandComplete : undefined
            }
          />

          {/* Explosion ripples - reduced count on mobile */}
          {animationPhase === 'exploding' && (
            <>
              {[...Array(explosionRingCount)].map((_, i) => (
                <motion.div
                  key={`explosion-ring-${i}`}
                  className={`absolute rounded-full will-change-transform ${isDarkMode
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
                    borderWidth: 2,
                    borderStyle: 'solid',
                  }}
                  initial={{
                    scale: 0,
                    x: "-50%",
                    y: "-50%",
                    opacity: 0,
                  }}
                  animate={{
                    scale: isMobile ? 1.3 : 1.5 + i * 0.3,
                    x: "-50%",
                    y: "-50%",
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: isMobile ? 0.8 : 1.2 + i * 0.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.15,
                    times: [0, 0.2, 1],
                  }}
                  onAnimationComplete={i === explosionRingCount - 1 ? handleExplosionComplete : undefined}
                />
              ))}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
