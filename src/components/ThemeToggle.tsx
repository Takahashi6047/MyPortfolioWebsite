import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is already set
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
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
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-card hover:bg-accent transition-colors"
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
