import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCursor } from './CursorContext';

export function CustomCursor() {
  const [isClicking, setIsClicking] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: '-50%', y: 'calc(-100% - 16px)' });
  const { cursorText, cursorVariant } = useCursor();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Detect if device has a fine pointer (mouse) - disable cursor on touchscreens
  const [hasFinePointer, setHasFinePointer] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setHasFinePointer(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setHasFinePointer(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isInitialized) {
        setIsInitialized(true);
      }

      // Smart tooltip positioning - keep it close to cursor
      const edgePadding = 150; // Distance from edge to trigger repositioning
      const topPadding = 80; // Distance from top
      const windowWidth = window.innerWidth;
      const offset = 20; // Fixed pixel offset from cursor

      // Default: centered above cursor
      let newPosition = { x: '-50%', y: `-${offset}px` };

      // Near top edge - show below cursor instead
      if (e.clientY < topPadding) {
        newPosition.y = `${offset}px`;
      }

      // Near left edge - align to left of cursor
      if (e.clientX < edgePadding) {
        newPosition.x = '0%';
      }

      // Near right edge - align to right of cursor
      if (windowWidth - e.clientX < edgePadding) {
        newPosition.x = '-100%';
      }

      // Top-left corner
      if (e.clientX < edgePadding && e.clientY < topPadding) {
        newPosition = { x: '0%', y: `${offset}px` };
      }

      // Top-right corner
      if (windowWidth - e.clientX < edgePadding && e.clientY < topPadding) {
        newPosition = { x: '-100%', y: `${offset}px` };
      }

      setTooltipPosition(newPosition);
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
  }, [cursorX, cursorY, hasFinePointer, isInitialized]);

  if (!hasFinePointer || !isInitialized) {
    return null;
  }

  return (
    <>
      {/* Main Cursor Dot - Larger and more visible */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[99999999] bg-white mix-blend-difference shadow-lg"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Cursor Ring - Thicker and more prominent */}
      <AnimatePresence mode="wait">
        {cursorVariant === 'default' && (
          <motion.div
            key="ring"
            className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-white/70 pointer-events-none z-[99999998] mix-blend-difference"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: isClicking ? 0.6 : 1,
              opacity: 1,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </AnimatePresence>

      {/* Text Label - More refined design with smart positioning */}
      <AnimatePresence mode="wait">
        {cursorVariant === 'text' && cursorText && (
          <motion.div
            key="text"
            className="fixed top-0 left-0 pointer-events-none z-[99999999]"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: tooltipPosition.x,
              translateY: tooltipPosition.y,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.1 }}
          >
            {/* Tooltip content */}
            <div className="bg-black dark:bg-white px-4 py-2 rounded-md shadow-xl border border-white/20 dark:border-black/20">
              <span className="text-white dark:text-black text-[11px] font-mono font-bold uppercase tracking-[0.15em] whitespace-nowrap">
                {cursorText}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
