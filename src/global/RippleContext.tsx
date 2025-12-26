import { createContext, useContext, useState, ReactNode } from 'react';

interface RippleContextType {
  triggerRipple: (x: number, y: number, isDarkMode: boolean) => void;
}

const RippleContext = createContext<RippleContextType | undefined>(undefined);

export function useRipple() {
  const context = useContext(RippleContext);
  if (!context) {
    throw new Error('useRipple must be used within a RippleProvider');
  }
  return context;
}

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

  const triggerRipple = (x: number, y: number, isDarkMode: boolean) => {
    setRippleState({
      isActive: true,
      centerX: x,
      centerY: y,
      isDarkMode,
    });
  };

  const handleRippleComplete = () => {
    setRippleState(prev => ({ ...prev, isActive: false }));
  };

  return (
    <RippleContext.Provider value={{ triggerRipple }}>
      {children}
      <RippleOverlay
        isActive={rippleState.isActive}
        centerX={rippleState.centerX}
        centerY={rippleState.centerY}
        isDarkMode={rippleState.isDarkMode}
        onComplete={handleRippleComplete}
      />
    </RippleContext.Provider>
  );
}

// Import the RippleOverlay component
import { RippleOverlay } from './RippleOverlay';