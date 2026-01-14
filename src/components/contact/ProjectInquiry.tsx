import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../../global/overlay/themeOverlay/RippleContext';
import { useCursor } from '../../global/cursor';

export function ProjectInquiry() {
    const { theme } = useTheme();
    const { setCursorText, setCursorVariant } = useCursor();
    const isArtMode = theme === 'dark';

    const wordVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.2, 1, 0.3, 1] as const, delay: i * 0.1 }
        })
    };

    return (
        <div className="flex flex-col justify-center h-full relative z-10">
            {/* Decorative Label */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-8 pl-1"
            >
                <div className={`h-[1px] w-12 ${isArtMode ? 'bg-[var(--art-accent)]' : 'bg-blue-600'}`} />
                <span className={`text-xs font-mono tracking-[0.3em] uppercase ${isArtMode ? 'text-[var(--art-accent)]' : 'text-blue-600'}`}>
                    Initiate Sequence
                </span>
            </motion.div>

            {/* Massive Typography */}
            <div className="relative mb-12">
                <div className="overflow-hidden">
                    <motion.h2
                        custom={0}
                        variants={wordVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={`text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] ${isArtMode ? 'text-white' : 'text-black'}`}
                    >
                        LET'S
                    </motion.h2>
                </div>

                <div className="overflow-hidden my-2">
                    <motion.h2
                        custom={1}
                        variants={wordVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] italic text-transparent"
                        style={{ WebkitTextStroke: isArtMode ? '2px white' : '2px black' }}
                    >
                        BUILD
                    </motion.h2>
                </div>

                <div className="overflow-hidden">
                    <motion.h2
                        custom={2}
                        variants={wordVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={`text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] ${isArtMode ? 'text-[var(--art-accent)]' : 'text-blue-600'}`}
                    >
                        FUTURE
                    </motion.h2>
                </div>
            </div>

            <p className={`max-w-md text-lg md:text-xl font-light mb-12 ${isArtMode ? 'text-white/60' : 'text-black/60'}`}>
                Ready to turn abstract concepts into digital reality?
                Let's architect your vision.
            </p>

            {/* High-Tech Button */}
            <motion.button
                onMouseEnter={() => {
                    setCursorText("LAUNCH");
                    setCursorVariant("text");
                }}
                onMouseLeave={() => {
                    setCursorText("");
                    setCursorVariant("default");
                }}
                whileHover="hover"
                className="group relative w-fit"
            >
                <div className={`relative px-12 py-6 overflow-hidden border ${isArtMode ? 'border-white/20' : 'border-black/20'} bg-transparent transition-colors duration-300`}>

                    {/* Hover Fill Effect */}
                    <motion.div
                        variants={{
                            hover: { x: '0%' }
                        }}
                        initial={{ x: '-101%' }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className={`absolute inset-0 ${isArtMode ? 'bg-[var(--art-accent)]' : 'bg-blue-600'}`}
                    />

                    {/* Button Text */}
                    <div className="relative flex items-center gap-6 z-10">
                        <span className={`text-lg font-mono tracking-widest uppercase transition-colors duration-300 ${isArtMode ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'}`}>
                            Start Project
                        </span>
                        <ArrowRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 ${isArtMode ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'}`} />
                    </div>

                    {/* Corner Accents */}
                    <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${isArtMode ? 'border-white group-hover:border-black' : 'border-black group-hover:border-white'} transition-colors duration-300`} />
                    <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${isArtMode ? 'border-white group-hover:border-black' : 'border-black group-hover:border-white'} transition-colors duration-300`} />
                </div>
            </motion.button>
        </div>
    );
}
