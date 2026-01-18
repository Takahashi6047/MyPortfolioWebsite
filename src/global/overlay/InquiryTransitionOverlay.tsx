import { motion } from 'framer-motion';
import { useTheme } from './themeOverlay/RippleContext';

interface InquiryTransitionOverlayProps {
    isActive: boolean;
    onTransitionComplete: () => void;
}

export function InquiryTransitionOverlay({ isActive, onTransitionComplete }: InquiryTransitionOverlayProps) {
    const { theme } = useTheme();
    const isArtMode = theme === 'dark';

    return (
        <motion.div
            className="fixed inset-0 z-[9999999] pointer-events-none"
            initial={false}
            animate={isActive ? "active" : "inactive"}
        >
            {/* We can use multiple panels for a shutter effect */}
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
                                delay: index * 0.05
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
                    onAnimationComplete={() => {
                        // If we just finished activating (covering screen), notify parent
                        if (isActive && index === 3) {
                            onTransitionComplete();
                        }
                    }}
                />
            ))}
        </motion.div>
    );
}
