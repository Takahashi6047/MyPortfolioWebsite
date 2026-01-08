import { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useRipple } from '../../global/overlay/themeOverlay/RippleContext';
import { useCursor } from '../../global/cursor';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { triggerRipple, isAnimating } = useRipple();
  const { setCursorText, setCursorVariant } = useCursor();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  useEffect(() => {
    if (isHovering) {
      setCursorText(isDark ? 'Light Mode' : 'Dark Mode');
    }
  }, [isDark, isHovering, setCursorText]);

  const toggleTheme = () => {
    if (isAnimating || !buttonRef.current) {
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newTheme = !isDark;
    setIsDark(newTheme);

    triggerRipple(centerX, centerY, newTheme);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    setCursorText(isDark ? 'Light Mode' : 'Dark Mode');
    setCursorVariant('text');
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCursorText('');
    setCursorVariant('default');
  };

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={isAnimating}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-[999999] ${!isDark
          ? 'bg-blue-600 hover:bg-blue-700'
          : 'bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600'
        } ${isAnimating ? 'opacity-75' : ''}`}
      aria-label="Toggle theme"
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out ${!isDark ? 'translate-x-6' : 'translate-x-1'
          }`}
      >
        <span className="flex h-full w-full items-center justify-center">
          {isDark ? (
            <Moon size={10} className="text-neutral-600" />
          ) : (
            <Sun size={10} className="text-blue-600" />
          )}
        </span>
      </span>

      {isAnimating && (
        <div className="absolute inset-0 bg-neutral-500/10 rounded-full" />
      )}
    </button>
  );
}
