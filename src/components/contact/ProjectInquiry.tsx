import { motion } from 'framer-motion';
import { useTheme } from '../../global/overlay/themeOverlay/RippleContext';


export function ProjectInquiry() {
    const { theme } = useTheme();
    const isArtMode = theme === 'dark';


    const textVariants = {
        hidden: { y: '100%' },
        visible: (i: number) => ({
            y: 0,
            transition: {
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: i * 0.1
            }
        })
    };

    return (
        <div className="w-full relative z-0 pointer-events-none select-none pt-2 md:pt-4 flex justify-center px-2 sm:px-4">
            {/* Brand Label */}
            <div className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3">
                <div className={`h-[1px] w-4 sm:w-6 md:w-12 ${isArtMode ? 'bg-yellow-600' : 'bg-blue-400'}`} />
                <span className={`text-[8px] sm:text-[9px] md:text-xs font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase whitespace-nowrap ${isArtMode ? 'text-yellow-600' : 'text-blue-400'}`}>
                    System Identity
                </span>
                <div className={`h-[1px] w-4 sm:w-6 md:w-12 ${isArtMode ? 'bg-yellow-600' : 'bg-blue-400'}`} />
            </div>

            {/* MAIN BRANDING TEXT - "ARTCODED" as one word */}
            <div className="flex flex-col items-center w-full">
                <motion.h2
                    custom={0}
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    className={`text-[18vw] sm:text-[16vw] md:text-[15vw] font-bold uppercase leading-[0.85] tracking-tighter ${isArtMode ? 'text-black' : 'text-white'}`}
                >
                    ARTCODED
                </motion.h2>

                {/* Subtle Divider Line below the name */}
                <div className={`w-full max-w-xs sm:max-w-2xl md:max-w-4xl h-[1px] mt-3 sm:mt-4 md:mt-6 ${isArtMode ? 'bg-black/20' : 'bg-white/20'}`} />
            </div>
        </div>
    );
}
