import { motion } from 'framer-motion';
import { useTheme } from '../../global/overlay/themeOverlay/RippleContext';
import { useState, useEffect } from 'react';

export function ProjectInquiry() {
    const { theme } = useTheme();
    const isArtMode = theme === 'dark';
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Massive Text Stagger
    const textVariants = {
        hidden: { y: '100%' },
        visible: (i: number) => ({
            y: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.1 }
        })
    };

    return (
        <div className="w-full flex flex-col justify-center relative z-0 pointer-events-none select-none">
            {/* Row 1 - Top Decorative Line */}
            <div className={`w-full h-[1px] ${isArtMode ? 'bg-white/10' : 'bg-black/10'} mb-8`} />

            <div className="relative w-full">
                {/* Decorative Label */}
                <div className="absolute -top-12 left-0 flex items-center gap-4">
                    <div className={`h-[1px] w-8 ${isArtMode ? 'bg-[var(--art-accent)]' : 'bg-blue-600'}`} />
                    <span className={`text-[10px] font-mono tracking-[0.3em] uppercase ${isArtMode ? 'text-[var(--art-accent)]' : 'text-blue-600'}`}>
                        Initiate Sequence
                    </span>
                </div>

                {/* TEXT LINE 1 - "LET'S" */}
                <div className="leading-[0.9]">
                    <motion.h2
                        custom={0}
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={`hero-text-responsive font-bold tracking-tighter uppercase ${isArtMode ? 'text-white' : 'text-black'}`}
                    >
                        LET'S
                    </motion.h2>
                </div>
            </div>

            {/* TEXT LINE 2 - "BUILD" */}
            <div className="leading-[0.9] relative">
                <motion.h2
                    custom={1}
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="hero-text-responsive font-bold tracking-tighter uppercase italic text-transparent"
                    style={{
                        WebkitTextStroke: isArtMode
                            ? `${isMobile ? '1.5px' : '3px'} rgba(255,255,255,0.6)`
                            : `${isMobile ? '1.5px' : '3px'} rgba(0,0,0,0.8)`,
                    }}
                >
                    BUILD
                </motion.h2>
            </div>

            {/* TEXT LINE 3 - "FUTURE" */}
            <div className="leading-[0.9] relative z-10">
                <motion.h2
                    custom={2}
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`hero-text-responsive font-bold tracking-tighter uppercase ${isArtMode ? 'text-[var(--art-accent)]' : 'text-blue-600'}`}
                >
                    FUTURE
                </motion.h2>
            </div>
        </div>
    );
}
