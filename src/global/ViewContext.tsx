import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ViewContextType {
    isTransitioning: boolean;
    navigateWithTransition: (path: string) => void;
    goBackWithTransition: () => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: ReactNode }) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Reset transition state when location changes
    useEffect(() => {
        setIsTransitioning(false);
    }, [location.pathname]);

    const navigateWithTransition = (path: string) => {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        
        // Wait for overlay to fully cover screen
        setTimeout(() => {
            navigate(path);
            // Transition will be reset by the useEffect above
        }, 700); // 500ms animation + 200ms delay buffer
    };

    const goBackWithTransition = () => {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        
        // Wait for overlay to fully cover screen
        setTimeout(() => {
            navigate(-1);
            // Transition will be reset by the useEffect above
        }, 700); // 500ms animation + 200ms delay buffer
    };

    return (
        <ViewContext.Provider value={{ isTransitioning, navigateWithTransition, goBackWithTransition }}>
            {children}
        </ViewContext.Provider>
    );
}

export function useView() {
    const context = useContext(ViewContext);
    if (context === undefined) {
        throw new Error('useView must be used within a ViewProvider');
    }
    return context;
}
