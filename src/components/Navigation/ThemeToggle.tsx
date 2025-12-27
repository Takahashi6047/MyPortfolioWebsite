import { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useRipple } from '../../global/RippleContext';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { triggerRipple, isAnimating } = useRipple();

  useEffect(() => {
    // Check if dark mode is already set
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    // Prevent multiple clicks during animation
    if (isAnimating || !buttonRef.current) {
      return;
    }

    // Get button position for ripple center
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Update local state immediately for button icon
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Trigger ripple effect (theme change happens inside the ripple animation)
    triggerRipple(centerX, centerY, newTheme);
  };

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      disabled={isAnimating}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-[999999] ${
        !isDark 
          ? 'bg-blue-600 hover:bg-blue-700' 
          : 'bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600'
      } ${isAnimating ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
      aria-label="Toggle theme"
    >
      {/* Toggle circle */}
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out ${
          !isDark ? 'translate-x-6' : 'translate-x-1'
        }`}
      >
        {/* Icon inside the circle */}
        <span className="flex h-full w-full items-center justify-center">
          {isDark ? (
            <Moon size={10} className="text-neutral-600" />
          ) : (
            <Sun size={10} className="text-blue-600" />
          )}
        </span>
      </span>
      
      {/* Visual indicator when disabled */}
      {isAnimating && (
        <div className="absolute inset-0 bg-neutral-500/10 rounded-full" />
      )}
    </button>
  );
}
