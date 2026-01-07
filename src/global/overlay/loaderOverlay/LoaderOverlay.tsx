import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface LoaderOverlayProps {
  onLoadingComplete?: () => void;
}

export function LoaderOverlay({ onLoadingComplete }: LoaderOverlayProps) {
  const [isLoading, setIsLoading] = useState(true);
  const onLoadingCompleteRef = useRef(onLoadingComplete);
  
  // Keep the ref updated
  onLoadingCompleteRef.current = onLoadingComplete;

  useEffect(() => {
    // Reset scroll position to top immediately when loader mounts
    window.scrollTo(0, 0);
    
    // Also prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    
    // Simulate loading time - adjust as needed
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Re-enable scrolling when loader completes
      document.body.style.overflow = 'unset';
      onLoadingCompleteRef.current?.();
    }, 2500);

    return () => {
      clearTimeout(timer);
      // Cleanup: ensure scrolling is re-enabled if component unmounts
      document.body.style.overflow = 'unset';
    };
  }, []);

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

            {/* Loading bar */}
            <motion.div
              className="w-48 h-[2px] bg-foreground/20 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-foreground"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, delay: 0.6, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(loader, document.body);
}
