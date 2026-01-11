import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../themeOverlay/RippleContext';

interface LoaderOverlayProps {
  onLoadingComplete?: () => void;
}

export function LoaderOverlay({ onLoadingComplete }: LoaderOverlayProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const onLoadingCompleteRef = useRef(onLoadingComplete);
  const progress = useMotionValue(0);
  const { theme } = useTheme();
  const isArtMode = theme === 'dark';
  
  // Keep the ref updated
  onLoadingCompleteRef.current = onLoadingComplete;

  useEffect(() => {
    // Reset scroll position to top immediately when loader mounts
    window.scrollTo(0, 0);
    
    // Also prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    
    // Animate progress from 0 to 100
    const controls = animate(progress, 100, {
      duration: 2.2,
      ease: 'easeInOut',
      onUpdate: (latest) => {
        setDisplayPercentage(Math.round(latest));
      },
    });
    
    // Simulate loading time - adjust as needed
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Re-enable scrolling when loader completes
      document.body.style.overflow = 'unset';
      onLoadingCompleteRef.current?.();
    }, 2500);

    return () => {
      clearTimeout(timer);
      controls.stop();
      // Cleanup: ensure scrolling is re-enabled if component unmounts
      document.body.style.overflow = 'unset';
    };
  }, [progress]);

  const loader = (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[99999999] bg-background flex items-center justify-center"
        >
          {/* Logo and Brand */}
          <div className="flex flex-col items-center gap-6">
            <motion.img
              src="/logo.png"
              alt="ArtCoded Logo"
              className="w-16 h-16 object-contain brightness-0 dark:brightness-0 dark:invert"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />

            <motion.span
              className="font-orbitron text-2xl font-bold tracking-widest text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              ARTCODED
            </motion.span>
          </div>

          {/* Bottom right percentage */}
          <motion.span
            className="absolute bottom-12 right-8 font-orbitron text-7xl md:text-8xl font-bold text-foreground/20 tabular-nums tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {displayPercentage}%
          </motion.span>

          {/* Full width loading bar at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-foreground/10">
            <motion.div
              className={`h-full ${isArtMode ? 'bg-[var(--art-accent)]' : 'bg-blue-400'}`}
              style={{ width: `${displayPercentage}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(loader, document.body);
}
