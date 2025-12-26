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
    }
  }, [isActive]);

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
          className="fixed inset-0 pointer-events-none z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Main ripple circle - covers the screen */}
          <motion.div
            className={`absolute rounded-full ${
              isDarkMode 
                ? 'bg-neutral-900' 
                : 'bg-white'
            }`}
            style={{
              left: centerX,
              top: centerY,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{
              width: 0,
              height: 0,
              opacity: 0.9,
            }}
            animate={
              animationPhase === 'expanding'
                ? {
                    width: maxDistance * 2,
                    height: maxDistance * 2,
                    opacity: 1,
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
            className={`absolute rounded-full ${
              isDarkMode 
                ? 'bg-neutral-800' 
                : 'bg-neutral-50'
            }`}
            style={{
              left: centerX,
              top: centerY,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{
              width: 0,
              height: 0,
              opacity: 0.6,
            }}
            animate={
              animationPhase === 'expanding'
                ? {
                    width: maxDistance * 2.2,
                    height: maxDistance * 2.2,
                    opacity: 0.8,
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
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`explosion-ring-${i}`}
                  className={`absolute rounded-full border-2 ${
                    isDarkMode 
                      ? 'border-neutral-600' 
                      : 'border-neutral-400'
                  }`}
                  style={{
                    left: centerX,
                    top: centerY,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{
                    width: 20,
                    height: 20,
                    opacity: 0.8,
                  }}
                  animate={{
                    width: maxDistance * (1.5 + i * 0.3),
                    height: maxDistance * (1.5 + i * 0.3),
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.8 + i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: i * 0.08,
                  }}
                  onAnimationComplete={i === 0 ? handleExplosionComplete : undefined}
                />
              ))}

              {/* Fast expanding rings */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`fast-ring-${i}`}
                  className={`absolute rounded-full border ${
                    isDarkMode 
                      ? 'border-neutral-500' 
                      : 'border-neutral-300'
                  }`}
                  style={{
                    left: centerX,
                    top: centerY,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{
                    width: 10,
                    height: 10,
                    opacity: 0.6,
                  }}
                  animate={{
                    width: maxDistance * (2 + i * 0.4),
                    height: maxDistance * (2 + i * 0.4),
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.6 + i * 0.05,
                    ease: 'easeOut',
                    delay: i * 0.04,
                  }}
                />
              ))}

              {/* Particle burst effect */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * Math.PI * 2) / 12;
                const distance = 80 + Math.random() * 40;
                return (
                  <motion.div
                    key={`particle-${i}`}
                    className={`absolute w-1 h-1 rounded-full ${
                      isDarkMode ? 'bg-neutral-500' : 'bg-neutral-400'
                    }`}
                    style={{
                      left: centerX,
                      top: centerY,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{
                      opacity: 0.8,
                      scale: 1,
                    }}
                    animate={{
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance,
                      opacity: 0,
                      scale: 0.3,
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.3,
                      ease: 'easeOut',
                      delay: i * 0.02,
                    }}
                  />
                );
              })}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}