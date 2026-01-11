import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCursor } from './CursorContext';

export function CustomCursor() {
  const [isClicking, setIsClicking] = useState(false);
  const { cursorText, cursorVariant } = useCursor();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Precision spring for the main dot
  const springConfig = { damping: 50, stiffness: 600, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Softer spring for the ring to create a "fluid" tech effect
  const ringSpringConfig = { damping: 40, stiffness: 150, mass: 0.8 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  /* State to track if cursor is near the right edge */
  const [isNearRightEdge, setIsNearRightEdge] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if cursor is within 300px of the right edge
      setIsNearRightEdge(window.innerWidth - e.clientX < 300);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Central Target Dot - Always visible for precision */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[99999999] bg-white mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Minimalist Tech Ring */}
      <AnimatePresence>
        {cursorVariant === 'default' && (
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/60 pointer-events-none z-[99999998] mix-blend-difference"
            style={{
              x: ringXSpring,
              y: ringYSpring,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: isClicking ? 0.8 : 1,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              scale: { type: 'spring', damping: 20, stiffness: 300 },
            }}
          />
        )}
      </AnimatePresence>

      {/* Modern Tech Label (replaces tooltip) */}
      <AnimatePresence>
        {cursorVariant === 'text' && cursorText && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[99999999]"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className={`relative -mt-3 transition-all duration-300 ${isNearRightEdge ? '-translate-x-full pr-6' : 'pl-6'}`}
            >
              {/* Connectivity Line */}
              <div
                className={`absolute top-1/2 w-4 h-[1px] bg-foreground/60 ${isNearRightEdge ? 'right-2' : 'left-2'}`}
              />

              {/* Text Container */}
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-md border border-foreground/20 px-3 py-1.5 shadow-xl rounded-sm">
                <div className="w-1.5 h-1.5 bg-foreground animate-pulse rounded-full" />
                <span className="text-foreground text-xs font-mono font-medium uppercase tracking-widest whitespace-nowrap">
                  {cursorText}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
