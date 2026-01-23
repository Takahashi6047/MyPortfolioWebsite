import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../themeOverlay/RippleContext';

interface LoaderOverlayProps {
  onLoadingComplete?: () => void;
}

export function LoaderOverlay({ onLoadingComplete }: LoaderOverlayProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [statusText, setStatusText] = useState('INITIALIZING...');
  const { theme } = useTheme();
  const isArtMode = theme === 'dark';
  const onLoadingCompleteRef = useRef(onLoadingComplete);
  /* Particle refs removed */

  // Keep ref updated
  useEffect(() => {
    onLoadingCompleteRef.current = onLoadingComplete;
  }, [onLoadingComplete]);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);


    const statusMessages = [
      "INITIALIZING KERNEL...",
      "LOADING ASSETS...",
      "COMPILING SHADERS...",
      "SYSTEM OPTIMIZED",
      "ACCESS GRANTED"
    ];

    // Animation Duration
    const duration = 4000;
    const startTime = Date.now();
    let frameId: number;

    const updateAnimation = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Update Status Text
      const statusIndex = Math.min(
        statusMessages.length - 1,
        Math.floor(progress * statusMessages.length)
      );
      setStatusText(statusMessages[statusIndex]);

      if (progress < 1) {
        frameId = requestAnimationFrame(updateAnimation);
      } else {
        // Exit sequence
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    frameId = requestAnimationFrame(updateAnimation);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = 'unset';
    };
  }, []);



  // Colors based on mode
  const bgClass = isArtMode ? 'bg-[#F2F2F2]' : 'bg-[#050505]'; // Matching Hero bg-white / bg-black approximate
  const textClass = isArtMode ? 'text-[#C5A059]' : 'text-blue-500';
  const accentClass = isArtMode ? 'bg-[#C5A059]' : 'bg-blue-500';

  const loader = (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        document.body.style.overflow = 'unset';
        onLoadingCompleteRef.current?.();
      }}
    >
      {isLoading && (
        <motion.div
          key="loader-container"
          className="fixed inset-0 z-[99999999] flex flex-col items-center justify-center -mt-8 pointer-events-none"
        >
          {/* HORIZONTAL STRIPS EXIT (Cross-Axis Reveal) */}
          <div className="absolute inset-0 z-20 flex flex-col w-full h-full pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-full flex-1 ${bgClass} relative -mb-px last:mb-0 overflow-hidden`}
                initial={{ x: 0 }}
                exit={{
                  x: i % 2 === 0 ? '-100%' : '100%',
                  transition: {
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1],
                    delay: i * 0.05
                  }
                }}
              >
                {/* Internal Scan Pulse */}
                <motion.div
                  className={`absolute inset-0 ${accentClass}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* CONTENT LAYER - MINIMALIST MORPH */}
          <motion.div
            className="relative z-30 flex flex-col items-center justify-center w-full h-full"
            exit={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(10px)",
              transition: { duration: 0.4 }
            }}
          >
            {/* Empty Center - Content is now in the panels */}

            {/* Micro-Typography Corner Data */}
            <div className="absolute bottom-12 right-12 text-right hidden sm:block">
              <div className={`text-[10px] tracking-[0.2em] font-mono mb-1 ${isArtMode ? 'text-black/60' : 'text-neutral-400'}`}>
                SYSTEM.STATUS
              </div>
              <div className={`text-xs font-bold tracking-[0.1em] font-mono ${textClass}`}>
                {statusText}
              </div>
            </div>

            <div className="absolute bottom-12 left-12 hidden sm:block">
              <div className={`text-[10px] tracking-[0.2em] font-mono mb-1 ${isArtMode ? 'text-black/60' : 'text-neutral-400'}`}>
                EST. TIME
              </div>
              <div className={`text-xs font-bold tracking-[0.1em] font-mono ${textClass}`}>
                00:04:00
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(loader, document.body);
}
