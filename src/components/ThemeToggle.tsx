import { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useRipple } from '../global/RippleContext';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { triggerRipple } = useRipple();

  useEffect(() => {
    // Check if dark mode is already set
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    if (buttonRef.current) {
      // Get button position for ripple center
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Trigger ripple effect
      triggerRipple(centerX, centerY, !isDark);
      
      // Delay theme change to sync with ripple animation
      setTimeout(() => {
        const html = document.documentElement;
        if (isDark) {
          html.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          setIsDark(false);
        } else {
          html.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          setIsDark(true);
        }
      }, 400); // Sync with ripple animation timing
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-card hover:bg-accent transition-colors relative overflow-hidden"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={20} className="text-foreground" />
      ) : (
        <Moon size={20} className="text-foreground" />
      )}
    </button>
  );
}
