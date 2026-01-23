import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { RippleOverlay } from './RippleOverlay';

type Theme = 'light' | 'dark';

interface RippleContextType {
  triggerRipple: (x: number, y: number, isDarkMode: boolean) => void;
  isAnimating: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const RippleContext = createContext<RippleContextType | undefined>(undefined);

export function useRipple() {
  const context = useContext(RippleContext);
  if (!context) {
    throw new Error('useRipple must be used within a RippleProvider');
  }
  return context;
}

export const useTheme = useRipple;

interface RippleProviderProps {
  children: ReactNode;
}

export function RippleProvider({ children }: RippleProviderProps) {
  const [rippleState, setRippleState] = useState({
    isActive: false,
    centerX: 0,
    centerY: 0,
    isDarkMode: false,
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Initialize theme from localStorage, default to 'light' (Dev mode)
    const savedTheme = localStorage.getItem('theme') as Theme;

    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      // Default to light mode (Dev mode)
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const triggerRipple = (x: number, y: number, isDarkMode: boolean) => {
    // Prevent new ripples if one is already animating
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    setRippleState({
      isActive: true,
      centerX: x,
      centerY: y,
      isDarkMode,
    });
  };

  const handleRippleComplete = () => {
    setRippleState(prev => ({ ...prev, isActive: false }));
    setIsAnimating(false);
  };

  // This callback is called by RippleOverlay when the visual transition happens
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <RippleContext.Provider value={{ triggerRipple, isAnimating, theme, setTheme }}>
      {children}
      <RippleOverlay
        isActive={rippleState.isActive}
        centerX={rippleState.centerX}
        centerY={rippleState.centerY}
        isDarkMode={rippleState.isDarkMode}
        onComplete={handleRippleComplete}
        onThemeChange={handleThemeChange}
      />
    </RippleContext.Provider>
  );
}
