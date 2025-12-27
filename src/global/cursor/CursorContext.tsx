import { createContext, useContext, useState, type ReactNode } from 'react';

interface CursorContextType {
  cursorText: string;
  setCursorText: (text: string) => void;
  cursorVariant: 'default' | 'text';
  setCursorVariant: (variant: 'default' | 'text') => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'text'>('default');

  return (
    <CursorContext.Provider value={{ cursorText, setCursorText, cursorVariant, setCursorVariant }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within CursorProvider');
  }
  return context;
}
