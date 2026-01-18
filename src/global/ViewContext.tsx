import { createContext, useContext, useState, type ReactNode } from 'react';

type ViewType = 'home' | 'inquiry';

interface ViewContextType {
    currentView: ViewType;
    isTransitioning: boolean;
    transitionTo: (view: ViewType) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: ReactNode }) {
    const [currentView, setCurrentView] = useState<ViewType>('home');
    const [isTransitioning, setIsTransitioning] = useState(false);

    const transitionTo = (view: ViewType) => {
        if (view === currentView || isTransitioning) return;

        setIsTransitioning(true);


        // Wait for overlay to cover screen (approx 500ms + delays)
        setTimeout(() => {
            setCurrentView(view);
            // Then wait a bit before lifting overlay? 
            // The overlay component itself handles the 'active' state prop from us.
            // But we need to signal it to open, then close.

            // With the shutter effect:
            // 0ms: Start animating IN
            // 600ms: Fully Covered. Switch View.
            // 1000ms: Start animating OUT? 
            // Actually, we keep 'isTransitioning' true until the IN animation is done.
            // But if we use a single 'isActive' prop, it creates a confusion.

            // Let's rely on the callback from the Overlay component instead for precise timing if possible?
            // But for simplicity here, I'll use timeouts which match the animation constants.

            setTimeout(() => {
                setIsTransitioning(false);

            }, 100); // Small buffer after view switch before starting reveal

        }, 800); // 500ms duration + delays (4 * 0.05 = 0.2) = ~0.7s total cover time. 800ms is safe.
    };

    return (
        <ViewContext.Provider value={{ currentView, isTransitioning, transitionTo }}>
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
