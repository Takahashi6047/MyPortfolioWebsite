import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RippleOverlayProps {
  isActive: boolean;
  centerX: number;
  centerY: number;
  isDarkMode: boolean;
  onComplete: () => void;
}

export function RippleOverlay({ isActive, centerX, centerY, isDarkMode, onComplete }: RippleOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'expanding' | 'exploding'>('expanding');

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      setAnimationPhase('expanding');
      
      // Trigger theme change midway through the ripple expansion
      const themeTimeout = setTimeout(() => {
        const html = document.documentElement;
        if (isDarkMode) {
          html.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          html.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      }, 400); // Trigger at 50% of the 800ms expansion
      
      return () => clearTimeout(themeTimeout);
    }
  }, [isActive, isDarkMode]);

  const handleExpandComplete = () => {
    // Start the explosion phase after a brief pause
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

  // Calculate the maximum distance to cover the entire screen
  const maxDistance = Math.sqrt(
    Math.pow(Math.max(centerX, window.innerWidth - centerX), 2) +
    Math.pow(Math.max(centerY, window.innerHeight - centerY), 2)
  ) * 1.2;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Main ripple circle - covers the screen */}
          <motion.div
            className={`absolute rounded-full will-change-transform ${
              isDarkMode 
                ? 'bg-neutral-900' 
                : 'bg-white'
            }`}
            style={{
              left: centerX,
              top: centerY,
              transform: 'translate(-50%, -50%)',
              backfaceVisibility: 'hidden',
              opacity: 0.95,
            }}
            initial={{
              width: 0,
              height: 0,
            }}
            animate={
              animationPhase === 'expanding'
                ? {
                    width: maxDistance * 2,
                    height: maxDistance * 2,
                  }
                : {
                    width: maxDistance * 2,
                    height: maxDistance * 2,
                    opacity: 0,
                  }
            }
            transition={
              animationPhase === 'expanding'
                ? {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }
                : {
                    duration: 0.4,
                    ease: 'easeOut',
                  }
            }
            onAnimationComplete={
              animationPhase === 'expanding' ? handleExpandComplete : undefined
            }
          />
          
          {/* Secondary ripple */}
          <motion.div
            className={`absolute rounded-full will-change-transform ${
              isDarkMode 
                ? 'bg-neutral-800' 
                : 'bg-neutral-50'
            }`}
            style={{
              left: centerX,
              top: centerY,
              transform: 'translate(-50%, -50%)',
              backfaceVisibility: 'hidden',
              opacity: 0.7,
            }}
            initial={{
              width: 0,
              height: 0,
            }}
            animate={
              animationPhase === 'expanding'
                ? {
                    width: maxDistance * 2.2,
                    height: maxDistance * 2.2,
                  }
                : {
                    width: maxDistance * 2.2,
                    height: maxDistance * 2.2,
                    opacity: 0,
                  }
            }
            transition={
              animationPhase === 'expanding'
                ? {
                    duration: 0.9,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.1,
                  }
                : {
                    duration: 0.5,
                    ease: 'easeOut',
                    delay: 0.05,
                  }
            }
          />

          {/* Explosion ripples - multiple rings expanding outward */}
          {animationPhase === 'exploding' && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`explosion-ring-${i}`}
                  className={`absolute rounded-full border will-change-transform ${
                    isDarkMode 
                      ? 'border-neutral-600' 
                      : 'border-neutral-400'
                  }`}
                  style={{
                    left: centerX,
                    top: centerY,
                    transform: 'translate(-50%, -50%)',
                    backfaceVisibility: 'hidden',
                  }}
                  initial={{
                    width: 20,
                    height: 20,
                    opacity: 0.6,
                  }}
                  animate={{
                    width: maxDistance * (1.2 + i * 0.2),
                    height: maxDistance * (1.2 + i * 0.2),
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.6 + i * 0.1,
                    ease: 'easeOut',
                    delay: i * 0.05,
                  }}
                  onAnimationComplete={i === 0 ? handleExplosionComplete : undefined}
                />
              ))}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}