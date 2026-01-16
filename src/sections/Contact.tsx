import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTheme } from '../global/overlay/themeOverlay/RippleContext';
import { ContactInfo } from '../components/contact/ContactInfo';
import { ProjectInquiry } from '../components/contact/ProjectInquiry';
import { AboutPortal } from '../components/contact/AboutPortal';
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
        margin: "-20% 0px -20% 0px" 
    });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax transforms
    const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
    const portalY = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    // Staggered animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
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
            y: 60,
            scale: 0.95
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as const
            }
        },
        exit: { 
            opacity: 0, 
            y: -30,
            scale: 0.98,
            transition: {
                duration: 0.4,
                ease: [0.4, 0, 1, 1] as const
            }
        }
    };

    const portalVariants = {
        hidden: { 
            opacity: 0, 
            x: 100,
            rotateY: -15
        },
        visible: { 
            opacity: 1, 
            x: 0,
            rotateY: 0,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: 0.3
            }
        },
        exit: { 
            opacity: 0, 
            x: 50,
            rotateY: 10,
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 1, 1] as const
            }
        }
    };

    return (
        <section
            id="contact"
            ref={containerRef}
            className={`relative min-h-screen py-16 sm:py-24 px-4 sm:px-8 lg:px-8 flex flex-col justify-between ${isArtMode ? 'bg-white text-black' : 'bg-black text-white'} transition-colors duration-500 overflow-hidden`}
        >
            {/* Animated Background */}
            <motion.div 
                style={{ y: backgroundY }}
                className="absolute inset-0 pointer-events-none z-0"
            >
                <div className={`absolute inset-0 opacity-[0.03] ${isArtMode ? 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")] invert' : 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'} mix-blend-overlay`} />
            </motion.div>

            <motion.div 
                className="w-full relative z-10 flex-1 flex flex-col"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "exit"}
            >
                {/* TOP SECTION: Text + Portal side by side on tablet/desktop */}
                <div className="relative pt-8 pb-0">
                    {/* Grid layout for tablet+ */}
                    <div className="flex flex-col tablet:flex-row tablet:items-start tablet:gap-8 lg:block">
                        {/* Left side: LET'S BUILD FUTURE text */}
                        <motion.div 
                            className="tablet:flex-1 tablet:max-w-[55%] lg:max-w-none"
                            variants={itemVariants}
                        >
                            <ProjectInquiry />
                        </motion.div>

                        {/* Right side: THE PORTAL - Side by side on tablet, absolute on desktop */}
                        <motion.div
                            style={{ 
                                y: typeof window !== 'undefined' && window.innerWidth >= 1024 ? portalY : 0 
                            }}
                            variants={portalVariants}
                            className="relative lg:absolute w-[50vw] xs:w-[55vw] tablet:w-[280px] mx-auto tablet:mx-0 lg:w-[320px] xl:w-[380px] mt-8 sm:mt-12 tablet:mt-0 lg:mt-0 lg:top-[10%] lg:right-[5%] z-20"
                        >
                            <AboutPortal />
                        </motion.div>
                    </div>

                    {/* ACTION DASHBOARD BAR */}
                    <motion.div 
                        className={`mt-4 w-full border-t border-b overflow-hidden flex flex-col md:flex-row ${isArtMode ? 'border-black/30' : 'border-white/30'}`}
                        variants={itemVariants}
                    >
                        {/* Description / Context */}
                        <div className={`flex-1 py-4 sm:py-6 md:py-8 md:pr-12 flex items-center ${isArtMode ? 'border-black/30' : 'border-white/30'} border-b md:border-b-0 md:border-r`}>
                            <p className={`max-w-md text-xs sm:text-sm font-sans opacity-70 leading-relaxed pl-1 sm:pl-2 ${isArtMode ? 'text-black' : 'text-white'}`}>
                                have an idea? let's discuss how we can bring it to life with precision and style.
                                <span className="block mt-2 opacity-50 text-[10px] sm:text-xs font-mono uppercase">/// AWAITING INPUT</span>
                            </p>
                        </div>

                        {/* THE REDESIGNED BUTTON - Huge & Integrated */}
                        <motion.button
                            onMouseEnter={() => {
                                setCursorText("SEND");
                                setCursorVariant("text");
                            }}
                            onMouseLeave={() => {
                                setCursorText("");
                                setCursorVariant("default");
                            }}
                            className={`group relative flex-none w-full md:w-[400px] flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 md:py-0
                            ${isArtMode ? 'text-black hover:text-white' : 'text-white hover:text-black'}`}
                        >
                            {/* Fill Effect */}
                            <div className={`absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.22,1,0.36,1] z-0
                                ${isArtMode ? 'bg-black' : 'bg-white'}`} />

                            <span className="relative z-10 text-base sm:text-xl md:text-2xl font-mono tracking-wider sm:tracking-widest uppercase font-bold">Start Project</span>
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 relative z-10 transition-transform duration-500 group-hover:-rotate-45" />
                        </motion.button>
                    </motion.div>
                </div>

                {/* BOTTOM SECTION */}
                <motion.div
                    style={{ y }}
                    className="mt-auto pt-8 pb-8"
                    variants={itemVariants}
                >
                    <div className="w-full">
                        <ContactInfo />

                        <div className={`mt-6 sm:mt-8 flex flex-col md:flex-row justify-between items-center text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-center md:text-left gap-3 sm:gap-4 md:gap-0 ${isArtMode ? 'text-black/30' : 'text-white/30'}`}>
                            <span>© 2025 ARTCODED INC.</span>
                            <span className="hidden md:block">///</span>
                            <span>ALL SYSTEMS OPERATIONAL</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
