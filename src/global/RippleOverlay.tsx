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

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
    }
  }, [isActive]);

  const handleAnimationComplete = () => {
    setIsVisible(false);
    onComplete();
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
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {/* Ripple circle */}
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
            animate={{
              width: maxDistance * 2,
              height: maxDistance * 2,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            onAnimationComplete={handleAnimationComplete}
          />
          
          {/* Secondary ripple for extra smoothness */}
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
            animate={{
              width: maxDistance * 2.2,
              height: maxDistance * 2.2,
              opacity: 0.8,
            }}
            transition={{
              duration: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.1,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}