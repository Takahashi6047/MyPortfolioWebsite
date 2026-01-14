import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../global/overlay/themeOverlay/RippleContext';
import { ContactInfo } from '../components/contact/ContactInfo';
import { ProjectInquiry } from '../components/contact/ProjectInquiry';
import { AboutPortal } from '../components/contact/AboutPortal';

export function Contact() {
    const { theme } = useTheme();
    const isArtMode = theme === 'dark';
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    return (
        <section
            id="contact"
            ref={containerRef}
            className={`relative min-h-screen py-24 px-4 sm:px-8 lg:px-16 overflow-hidden flex flex-col justify-between ${isArtMode ? 'bg-[#050505] text-white' : 'bg-[#fafafa] text-black'} transition-colors duration-500`}
        >
            {/* Ambient Background & Texture */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Noise Texture */}
                <div className={`absolute inset-0 opacity-[0.03] ${isArtMode ? 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")]' : 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")] invert'} mix-blend-overlay`} />

                {/* Decorative Technical Markings */}
                <div className={`absolute left-8 top-0 bottom-0 w-[1px] ${isArtMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    {/* Tick marks */}
                    <div className="absolute top-1/4 left-0 w-3 h-[1px] bg-current" />
                    <div className="absolute top-2/4 left-0 w-3 h-[1px] bg-current" />
                    <div className="absolute top-3/4 left-0 w-3 h-[1px] bg-current" />
                </div>

                {/* Right side technical line for balance */}
                <div className={`absolute right-8 top-0 bottom-0 w-[1px] ${isArtMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    <div className="absolute top-1/3 right-0 w-3 h-[1px] bg-current" />
                    <div className="absolute bottom-1/3 right-0 w-3 h-[1px] bg-current" />
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">

                {/* Main Content Split - Vertical centered */}
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-24">

                    {/* Left: Call to Action */}
                    <div className="lg:col-span-8">
                        <ProjectInquiry />
                    </div>

                    {/* Right: The Portal (About Me) */}
                    <div className="lg:col-span-4 h-full flex items-center justify-center lg:justify-end">
                        <div className="w-full max-w-sm">
                            <AboutPortal />
                        </div>
                    </div>
                </div>

                {/* Footer / Socials Grid - Pushed to bottom */}
                <motion.div
                    style={{ y, opacity }}
                    className="mt-auto"
                >
                    <div className={`mb-12 h-[1px] w-full ${isArtMode ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-black/5 to-transparent'}`} />

                    <div className="relative">
                        <ContactInfo />
                    </div>

                    {/* Final Bottom Bar */}
                    <div className={`mt-16 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest ${isArtMode ? 'text-white/20' : 'text-black/20'}`}>
                        <span>© 2025 ARTCODED INC.</span>
                        <span className="hidden md:block">///</span>
                        <span>ALL SYSTEMS OPERATIONAL</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
