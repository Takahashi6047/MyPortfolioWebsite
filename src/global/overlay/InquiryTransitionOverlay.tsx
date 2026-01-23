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

    // Consistent branding colors
    const bgClass = isArtMode ? 'bg-[#F2F2F2]' : 'bg-[#050505]';
    const accentClass = isArtMode ? 'bg-[#C5A059]' : 'bg-blue-500';

    const overlay = (
        <AnimatePresence mode="wait">
            {isActive && (
                <motion.div
                    className="fixed inset-0 z-[9999999] flex flex-col pointer-events-none"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`relative flex-1 w-full ${bgClass} overflow-hidden -mb-px last:mb-0`}
                            custom={i}
                            variants={{
                                hidden: {
                                    x: i % 2 === 0 ? '-100%' : '100%',
                                    transition: {
                                        duration: 0.5,
                                        ease: [0.76, 0, 0.24, 1],
                                        delay: i * 0.05
                                    }
                                },
                                visible: {
                                    x: '0%',
                                    transition: {
                                        duration: 0.5,
                                        ease: [0.76, 0, 0.24, 1],
                                        delay: i * 0.05
                                    }
                                }
                            }}
                            onAnimationComplete={(definition) => {
                                if (definition === 'visible' && i === 5) {
                                    onTransitionComplete();
                                }
                            }}
                        >
                            {/* Decorative Accent Line on the edge */}
                            <motion.div
                                className={`absolute top-0 bottom-0 w-1 ${accentClass}`}
                                style={{
                                    left: i % 2 === 0 ? '0' : 'auto',
                                    right: i % 2 === 0 ? 'auto' : '0',
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(overlay, document.body);
}
