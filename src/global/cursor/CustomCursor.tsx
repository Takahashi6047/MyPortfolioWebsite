import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCursor } from './CursorContext';

export function CustomCursor() {
  const [isClicking, setIsClicking] = useState(false);
  const { cursorText, cursorVariant } = useCursor();
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

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
      {/* Default Circle Cursor */}
      <AnimatePresence>
        {cursorVariant === 'default' && (
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99999999] mix-blend-difference bg-white"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: isClicking ? 0.6 : 1,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              opacity: { duration: 0.2 },
              scale: {
                type: 'spring',
                stiffness: 500,
                damping: 15,
              },
            }}
          />
        )}
      </AnimatePresence>

      {/* Text Box Cursor */}
      <AnimatePresence>
        {cursorVariant === 'text' && cursorText && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[99999999]"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative -translate-x-1/2 translate-y-6">
              {/* Arrow pointing up */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-foreground rotate-45" />
              <div className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
                {cursorText}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
