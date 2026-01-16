import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
    // Reduced parallax for cleaner feel
    const portalY = useTransform(scrollYProgress, [0, 1], [50, -20]);

    return (
        <section
            id="contact"
            ref={containerRef}
            className={`relative min-h-screen py-16 sm:py-24 px-4 sm:px-8 lg:px-8 flex flex-col justify-between ${isArtMode ? 'bg-[#050505] text-white' : 'bg-[#fafafa] text-black'} transition-colors duration-500`}
        >
            {/* Simple Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className={`absolute inset-0 opacity-[0.03] ${isArtMode ? 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")]' : 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")] invert'} mix-blend-overlay`} />
            </div>

            <div className="w-full relative z-10 flex-1 flex flex-col">

                {/* TOP SECTION: Text + Portal side by side on tablet/desktop */}
                <div className="relative pt-8 pb-0">
                    {/* Grid layout for tablet+ */}
                    <div className="flex flex-col tablet:flex-row tablet:items-start tablet:gap-8 lg:block">
                        {/* Left side: LET'S BUILD FUTURE text */}
                        <div className="tablet:flex-1 tablet:max-w-[55%] lg:max-w-none">
                            <ProjectInquiry />
                        </div>

                        {/* Right side: THE PORTAL - Side by side on tablet, absolute on desktop */}
                        <motion.div
                            style={{ y: typeof window !== 'undefined' && window.innerWidth >= 1024 ? portalY : 0 }}
                            className="relative lg:absolute w-[50vw] xs:w-[55vw] tablet:w-[280px] mx-auto tablet:mx-0 lg:w-[320px] xl:w-[380px] mt-8 sm:mt-12 tablet:mt-0 lg:mt-0 lg:top-[10%] lg:right-[5%] z-20"
                        >
                            <AboutPortal />
                        </motion.div>
                    </div>

                    {/* ACTION DASHBOARD BAR */}
                    <div className={`mt-4 w-full border-t border-b overflow-hidden flex flex-col md:flex-row ${isArtMode ? 'border-white/20' : 'border-black/20'}`}>
                        {/* Description / Context */}
                        <div className={`flex-1 py-4 sm:py-6 md:py-8 md:pr-12 flex items-center ${isArtMode ? 'border-white/20' : 'border-black/20'} border-b md:border-b-0 md:border-r`}>
                            <p className={`max-w-md text-xs sm:text-sm font-sans opacity-70 leading-relaxed pl-1 sm:pl-2 ${isArtMode ? 'text-white' : 'text-black'}`}>
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
                            ${isArtMode ? 'text-white hover:text-black' : 'text-black hover:text-white'}`}
                        >
                            {/* Fill Effect */}
                            <div className={`absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.22,1,0.36,1] z-0
                                ${isArtMode ? 'bg-white' : 'bg-black'}`} />

                            <span className="relative z-10 text-base sm:text-xl md:text-2xl font-mono tracking-wider sm:tracking-widest uppercase font-bold">Start Project</span>
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 relative z-10 transition-transform duration-500 group-hover:-rotate-45" />
                        </motion.button>
                    </div>
                </div>

                {/* BOTTOM SECTION */}
                <motion.div
                    style={{ y }}
                    className="mt-auto pt-8 pb-8"
                >
                    <div className="w-full">
                        <ContactInfo />

                        <div className={`mt-6 sm:mt-8 flex flex-col md:flex-row justify-between items-center text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-center md:text-left gap-3 sm:gap-4 md:gap-0 ${isArtMode ? 'text-white/20' : 'text-black/20'}`}>
                            <span>© 2025 ARTCODED INC.</span>
                            <span className="hidden md:block">///</span>
                            <span>ALL SYSTEMS OPERATIONAL</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
