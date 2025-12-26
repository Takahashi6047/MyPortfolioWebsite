import { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useRipple } from '../global/RippleContext';

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
      className={`p-2 rounded-lg bg-card hover:bg-accent transition-colors relative overflow-hidden ${
        isAnimating ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={20} className="text-foreground" />
      ) : (
        <Moon size={20} className="text-foreground" />
      )}
      
      {/* Visual indicator when disabled */}
      {isAnimating && (
        <div className="absolute inset-0 bg-neutral-500/10 rounded-lg" />
      )}
    </button>
  );
}
