import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../global/overlay/themeOverlay/RippleContext';
import { ContactInfo } from '../components/contact/ContactInfo';
import { ProjectInquiry } from '../components/contact/ProjectInquiry';
import { AboutPortal } from '../components/contact/AboutPortal';
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

    // Portal Parallax: Moves faster than the text to create depth
    const portalY = useTransform(scrollYProgress, [0, 1], [100, -50]);

    return (
        <section
            id="contact"
            ref={containerRef}
            className={`relative min-h-screen py-24 px-4 sm:px-8 lg:px-8 overflow-hidden flex flex-col justify-between ${isArtMode ? 'bg-[#050505] text-white' : 'bg-[#fafafa] text-black'} transition-colors duration-500`}
        >
            {/* Ambient Background & Texture */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className={`absolute inset-0 opacity-[0.03] ${isArtMode ? 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")]' : 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")] invert'} mix-blend-overlay`} />
                {/* Tech lines */}
                <div className={`absolute left-0 top-0 bottom-0 w-[1px] ${isArtMode ? 'bg-white/5' : 'bg-black/5'}`} />
                <div className={`absolute right-0 top-0 bottom-0 w-[1px] ${isArtMode ? 'bg-white/5' : 'bg-black/5'}`} />
            </div>

            <div className="w-full relative z-10 flex-1 flex flex-col">

                {/* MASSIVE TEXT SECTION */}
                <div className="relative pt-8 pb-0">
                    <ProjectInquiry />

                    {/* THE PORTAL (Overlapping the text) */}
                    {/* Positioned absolute on desktop to float over the text */}
                    <motion.div
                        style={{ y: portalY }}
                        className="absolute top-[20%] right-[5%] z-20 w-[60vw] md:w-[350px] lg:w-[400px] aspect-[3/4]"
                    >
                        <AboutPortal />

                        {/* Call To Action Button (Attached to Portal now) */}
                        <motion.button
                            onMouseEnter={() => {
                                setCursorText("MAIL ME");
                                setCursorVariant("text");
                            }}
                            onMouseLeave={() => {
                                setCursorText("");
                                setCursorVariant("default");
                            }}
                            className={`group absolute -bottom-8 -left-16 hidden md:flex items-center gap-4 px-8 py-4 backdrop-blur-md border transition-all duration-300 ${isArtMode ? 'bg-black/40 border-white/20 hover:bg-white hover:text-black' : 'bg-white/40 border-black/20 hover:bg-black hover:text-white'}`}
                        >
                            <span className="text-sm font-mono tracking-widest uppercase font-bold">Start Project</span>
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </motion.div>
                </div>

                {/* BOTTOM SECTION */}
                <motion.div
                    style={{ y }}
                    className="mt-auto pt-20"
                >
                    <div className="max-w-[1600px] mx-auto">
                        <ContactInfo />

                        <div className={`mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest ${isArtMode ? 'text-white/20' : 'text-black/20'}`}>
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
