import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../global/overlay/themeOverlay/RippleContext';
import { ContactInfo } from '../components/contact/ContactInfo';
import { ProjectInquiry } from '../components/contact/ProjectInquiry';
import { ArrowRight } from 'lucide-react';
import { useCursor } from '../global/cursor';

export function Contact() {
    const { theme } = useTheme();
    const isArtMode = theme === 'dark';
    const containerRef = useRef<HTMLElement>(null);
    const { setCursorText, setCursorVariant } = useCursor();

    // Viewport detection for enter/exit animations
    const isInView = useInView(containerRef, {
        once: false,
        margin: "-10% 0px -10% 0px"
    });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax transforms
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    // Staggered animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as const
            }
        },
        exit: {
            opacity: 0,
            y: 30,
            transition: {
                duration: 0.4,
                ease: [0.4, 0, 1, 1] as const
            }
        }
    };

    return (
        <section
            id="contact"
            ref={containerRef}
            className={`relative w-full py-8 sm:py-12 sm:pt-20 px-4 sm:px-8 lg:px-12 flex flex-col ${isArtMode ? 'bg-white text-black' : 'bg-black text-white'} transition-colors duration-500 overflow-hidden`}
        >
            {/* Animated Background */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 pointer-events-none z-0"
            >
                <div className={`absolute inset-0 opacity-[0.03] ${isArtMode ? 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")]' : 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")] invert'} mix-blend-overlay`} />
                {/* Accent gradient overlay */}
                <div className={`absolute inset-0 ${isArtMode ? 'bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-600/5' : 'bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5'}`} />
            </motion.div>

            <motion.div
                className="w-full relative z-10 flex flex-col"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "exit"}
            >
                {/* Main Content Container */}
                <div className="relative w-full max-w-[1800px] mx-auto flex flex-col gap-6 sm:gap-8 md:gap-12">

                    {/* TOP: BRANDING TEXT (Full Width) */}
                    <motion.div
                        className="w-full"
                        variants={itemVariants}
                    >
                        <ProjectInquiry />
                    </motion.div>

                    {/* MIDDLE: CTA (Minimal and Editorial) */}
                    <motion.div
                        className="w-full flex justify-center mt-8 sm:mt-12 md:mt-16"
                        variants={itemVariants}
                    >
                        <Link
                            to="/inquiry"
                            onMouseEnter={() => {
                                setCursorText("GO");
                                setCursorVariant("text");
                            }}
                            onMouseLeave={() => {
                                setCursorText("");
                                setCursorVariant("default");
                            }}
                            className={`group relative flex items-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-all duration-300 ${isArtMode ? 'text-black' : 'text-white'}`}
                        >
                            {/* Animated line before text */}
                            <div className={`h-[1px] w-8 sm:w-12 transition-all duration-500 ease-out group-hover:w-16 sm:group-hover:w-24 ${isArtMode ? 'bg-yellow-600' : 'bg-blue-400'}`} />

                            <span className={`transition-colors duration-300 whitespace-nowrap ${isArtMode ? 'group-hover:text-yellow-600' : 'group-hover:text-blue-400'}`}>
                                Start a Project
                            </span>

                            {/* Arrow with slide animation */}
                            <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 group-hover:translate-x-2 ${isArtMode ? 'group-hover:text-yellow-600' : 'group-hover:text-blue-400'}`} />

                            {/* Animated line after text */}
                            <div className={`h-[1px] w-8 sm:w-12 transition-all duration-500 ease-out group-hover:w-16 sm:group-hover:w-24 ${isArtMode ? 'bg-yellow-600' : 'bg-blue-400'}`} />
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* BOTTOM SECTION: Footer Data (Socials & Copyright) */}
            <motion.div
                style={{ y }}
                className="w-full relative z-10 mt-12 sm:mt-16 md:mt-24 pb-4 sm:pb-6 max-w-[1800px] mx-auto"
                variants={itemVariants}
            >
                <div className="w-full">
                    <ContactInfo />

                    <div className={`mt-6 sm:mt-8 flex flex-col md:flex-row justify-between items-center text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider sm:tracking-widest gap-3 sm:gap-4 md:gap-0 ${isArtMode ? 'text-black/40' : 'text-white/40'}`}>
                        <div className="flex flex-row items-center gap-2 md:gap-8 text-center md:text-left whitespace-nowrap">
                            <span>© 2026 ARTCODED INC.</span>
                            <span className={`${isArtMode ? 'text-yellow-600/50' : 'text-blue-400/50'}`}>///</span>
                            <span>ALL RIGHTS RESERVED</span>
                        </div>

                        <span className={`${isArtMode ? 'text-yellow-600/60' : 'text-blue-400/60'} whitespace-nowrap`}>/// SYSTEM OPERATIONAL</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
