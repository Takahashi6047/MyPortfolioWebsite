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
            {/* Center Subject - Animated Branding */}
            <div className="relative z-50 flex flex-col items-center">
              <div className="relative text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider uppercase font-orbitron overflow-hidden py-4 px-8 sm:px-12">
                {/* Base Layer (Ghost/Stroke) */}
                <div
                  className={`absolute inset-0 flex items-center justify-center select-none opacity-20 ${isArtMode ? 'text-black' : 'text-white'
                    }`}
                  style={{ transform: 'translateZ(0)' }}
                >
                  ARTCODED
                </div>

                {/* Animated Fill Layer */}
                <motion.div
                  className={`relative flex items-center justify-center ${isArtMode ? 'text-black' : 'text-neutral-200'
                    }`}
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{
                    duration: 3.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2
                  }}
                >
                  {isArtMode ? (
                    <>
                      ART<span className="text-[#C5A059]">CODED</span>
                    </>
                  ) : (
                    <>
                      ART<span className="text-transparent" style={{ WebkitTextStroke: '1px #E5E5E5' }}>CODED</span>
                    </>
                  )}
                </motion.div>

                {/* Scanline Effect */}
                <motion.div
                  className={`absolute top-0 bottom-0 w-1 ${isArtMode ? 'bg-[#C5A059]' : 'bg-blue-500'
                    } blur-[2px]`}
                  initial={{ left: "0%", opacity: 0 }}
                  animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 3.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2
                  }}
                />
              </div>

              {/* Loading Bar under text */}
              <motion.div
                className={`h-1 mt-3 sm:mt-4 rounded-full ${isArtMode ? 'bg-[#C5A059]' : 'bg-blue-500'}`}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 100, opacity: 1 }}
                transition={{ duration: 3.2, ease: "easeInOut", delay: 0.2 }}
              />
            </div>

            {/* Micro-Typography Corner Data - Visible on tablets and up */}
            <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 right-6 sm:right-8 md:right-12 text-right hidden sm:block">
              <div className={`text-[9px] md:text-[10px] tracking-[0.2em] font-mono mb-1 ${isArtMode ? 'text-black/60' : 'text-neutral-400'}`}>
                SYSTEM.STATUS
              </div>
              <div className={`text-[11px] md:text-xs font-bold tracking-[0.1em] font-mono ${textClass}`}>
                {statusText}
              </div>
            </div>

            <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-6 sm:left-8 md:left-12 hidden sm:block">
              <div className={`text-[9px] md:text-[10px] tracking-[0.2em] font-mono mb-1 ${isArtMode ? 'text-black/60' : 'text-neutral-400'}`}>
                EST. TIME
              </div>
              <div className={`text-[11px] md:text-xs font-bold tracking-[0.1em] font-mono ${textClass}`}>
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
