import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './themeOverlay/RippleContext';
import { createPortal } from 'react-dom';

interface InquiryTransitionOverlayProps {
    isActive: boolean;
    onTransitionComplete: () => void;
}

export function InquiryTransitionOverlay({ isActive, onTransitionComplete }: InquiryTransitionOverlayProps) {
    const { theme } = useTheme();
    const isArtMode = theme === 'dark';

    const overlay = (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    className="fixed inset-0 z-[9999999] pointer-events-none"
                    initial="inactive"
                    animate="active"
                    exit="inactive"
                >
                    {/* Multiple panels for a shutter effect */}
                    {[0, 1, 2, 3].map((index) => (
                        <motion.div
                            key={index}
                            className={`absolute top-0 bottom-0 ${isArtMode ? 'bg-white' : 'bg-black'}`}
                            style={{
                                left: `${index * 25}%`,
                                width: '25%',
                            }}
                            variants={{
                                inactive: {
                                    scaleY: 0,
                                    transformOrigin: 'top',
                                    transition: {
                                        duration: 0.5,
                                        ease: [0.76, 0, 0.24, 1],
                                        delay: (3 - index) * 0.05 // Reverse delay for exit
                                    }
                                },
                                active: {
                                    scaleY: 1,
                                    transformOrigin: 'bottom',
                                    transition: {
                                        duration: 0.5,
                                        ease: [0.76, 0, 0.24, 1],
                                        delay: index * 0.05
                                    }
                                }
                            }}
                            onAnimationComplete={(definition) => {
                                // If we just finished activating (covering screen), notify parent
                                if (definition === 'active' && index === 3) {
                                    onTransitionComplete();
                                }
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(overlay, document.body);
}
