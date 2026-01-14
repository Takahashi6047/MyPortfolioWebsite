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
            className={`relative min-h-screen py-24 px-4 sm:px-8 lg:px-8 overflow-hidden flex flex-col justify-between ${isArtMode ? 'bg-[#050505] text-white' : 'bg-[#fafafa] text-black'} transition-colors duration-500`}
        >
            {/* Simple Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className={`absolute inset-0 opacity-[0.03] ${isArtMode ? 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")]' : 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")] invert'} mix-blend-overlay`} />
            </div>

            <div className="w-full relative z-10 flex-1 flex flex-col">

                {/* TOP HEADER: Label */}
                <div className="relative pt-8 pb-0">
                    <ProjectInquiry />

                    {/* BUTTON ROW - Positioned below text on Left/Center */}
                    <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-start md:items-center gap-8 pl-1">
                        {/* THE REDESIGNED BUTTON - Now independent */}
                        <motion.button
                            onMouseEnter={() => {
                                setCursorText("SEND");
                                setCursorVariant("text");
                            }}
                            onMouseLeave={() => {
                                setCursorText("");
                                setCursorVariant("default");
                            }}
                            className={`group relative flex items-center gap-4 px-8 py-5 text-lg font-mono tracking-widest uppercase font-bold border overflow-hidden transition-all duration-300
                            ${isArtMode ? 'border-white text-white hover:text-black' : 'border-black text-black hover:text-white'}`}
                        >
                            <span className="relative z-10">Start Project</span>
                            <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-2" />

                            {/* Fill Hover Effect */}
                            <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0
                                ${isArtMode ? 'bg-white' : 'bg-black'}`} />
                        </motion.button>

                        <p className={`hidden md:block max-w-xs text-sm font-sans opacity-60 ${isArtMode ? 'text-white' : 'text-black'}`}>
                            Have an idea? Let's discuss how we can bring it to life with precision and style.
                        </p>
                    </div>


                    {/* THE PORTAL - Positioned cleanly on the right */}
                    <motion.div
                        style={{ y: typeof window !== 'undefined' && window.innerWidth >= 768 ? portalY : 0 }}
                        className="relative md:absolute w-[50vw] mx-auto md:w-[320px] lg:w-[380px] mt-16 md:mt-0 md:top-[10%] md:right-[5%] z-20"
                    >
                        <AboutPortal />
                    </motion.div>
                </div>

                {/* BOTTOM SECTION */}
                <motion.div
                    style={{ y }}
                    className="mt-auto pt-24 md:pt-20 pb-8"
                >
                    <div className="max-w-[1600px] mx-auto">
                        <ContactInfo />

                        <div className={`mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest text-center md:text-left gap-4 md:gap-0 ${isArtMode ? 'text-white/20' : 'text-black/20'}`}>
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
