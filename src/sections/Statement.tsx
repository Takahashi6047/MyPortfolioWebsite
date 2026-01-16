import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../global/overlay/themeOverlay/RippleContext';

export function Statement() {
    const { theme } = useTheme();
    const isArtMode = theme === 'dark';
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effects with GPU acceleration hints
    const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const yImage = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), { stiffness: 100, damping: 20 });
    const scaleImage = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.95, 1, 0.95]);

    // Theme-based content
    const content = isArtMode
        ? {
            leftMain: "DESIGN",
            leftSub: ["Vision", "Soul"],
            rightMain: "CRAFT",
            rightSub: ["Depth", "Feel"],
            label: "ARTISTRY // 002"
        }
        : {
            leftMain: "CODE",
            leftSub: ["Logic", "System"],
            rightMain: "SHIP",
            rightSub: ["Build", "Scale"],
            label: "FULLSTACK // 002"
        };

    return (
        <section
            ref={containerRef}
            className="relative min-h-[120vh] flex items-center justify-center overflow-hidden py-24"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute inset-0 opacity-[0.03] ${isArtMode ? 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")]' : 'bg-[url("https://grainy-gradients.vercel.app/noise.svg")] invert'}`} />

                {/* Optimized background blob - removed rotation animation and expensive blend mode */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] opacity-20 blur-[100px] rounded-full transition-colors duration-700">
                    <div
                        className={`w-full h-full rounded-full bg-gradient-to-tr ${isArtMode ? 'from-amber-900 via-amber-700 to-transparent' : 'from-blue-200 via-indigo-200 to-transparent'}`}
                    />
                </div>
            </div>
            <div className={`absolute top-1/2 left-0 w-full h-[1px] ${isArtMode ? 'bg-white/10' : 'bg-black/20'}`} />

            <div className={`absolute top-24 left-1/2 -translate-x-1/2 w-[90%] h-[1px] ${isArtMode ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-black/25 to-transparent'}`} />

            <div className={`absolute bottom-24 left-1/2 -translate-x-1/2 w-[90%] h-[1px] ${isArtMode ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-black/25 to-transparent'}`} />

            <div className={`absolute top-0 bottom-0 left-[15%] w-[1px] ${isArtMode ? 'bg-gradient-to-b from-transparent via-white/5 to-transparent' : 'bg-gradient-to-b from-transparent via-black/20 to-transparent'}`} />
            <div className={`absolute top-0 bottom-0 right-[15%] w-[1px] ${isArtMode ? 'bg-gradient-to-b from-transparent via-white/5 to-transparent' : 'bg-gradient-to-b from-transparent via-black/20 to-transparent'}`} />

            <div className="absolute top-24 left-[15%] -translate-x-1/2 -translate-y-1/2">
                <div className={`w-3 h-[1px] ${isArtMode ? 'bg-white/30' : 'bg-black/60'}`} />
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-[1px] ${isArtMode ? 'bg-white/30' : 'bg-black/60'}`} />
            </div>
            <div className="absolute top-24 right-[15%] translate-x-1/2 -translate-y-1/2">
                <div className={`w-3 h-[1px] ${isArtMode ? 'bg-white/30' : 'bg-black/60'}`} />
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-[1px] ${isArtMode ? 'bg-white/30' : 'bg-black/60'}`} />
            </div>
            <div className="absolute bottom-24 left-[15%] -translate-x-1/2 translate-y-1/2">
                <div className={`w-3 h-[1px] ${isArtMode ? 'bg-white/30' : 'bg-black/60'}`} />
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-[1px] ${isArtMode ? 'bg-white/30' : 'bg-black/60'}`} />
            </div>
            <div className="absolute bottom-24 right-[15%] translate-x-1/2 translate-y-1/2">
                <div className={`w-3 h-[1px] ${isArtMode ? 'bg-white/30' : 'bg-black/60'}`} />
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-[1px] ${isArtMode ? 'bg-white/30' : 'bg-black/60'}`} />
            </div>

            <div className={`absolute top-[6.5rem] left-[16%] text-[9px] font-mono tracking-widest ${isArtMode ? 'text-white opacity-40' : 'text-neutral-900 opacity-70'}`}>
                FIG. 002
            </div>
            <div className={`absolute bottom-[6.5rem] right-[16%] text-[9px] font-mono tracking-widest ${isArtMode ? 'text-white opacity-40' : 'text-neutral-900 opacity-70'}`}>
                COORDS: {isArtMode ? '48.8566° N' : '35.6764° N'}
            </div>

            {/* Main Content Grid */}
            <div className="relative w-full max-w-[1600px] px-4 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-y-4 tablet:gap-x-8 md:gap-x-0 items-center z-10">

                {/* LEFT TYPOGRAPHY */}
                <motion.div
                    style={{ y: yText, willChange: 'transform' }}
                    className="flex md:col-span-4 flex-col items-center md:items-end text-center md:text-right justify-center relative z-20 mb-8 md:mb-0 md:pr-4 lg:pr-0"
                >
                    <span className={`block text-[15vw] md:text-[7vw] lg:text-[7vw] leading-[0.8] font-black tracking-[-0.05em] uppercase 
                         ${isArtMode ? 'text-white' : 'text-neutral-900'}`}>
                        {content.leftMain}
                    </span>
                    <div className="flex flex-col gap-0 mt-2">
                        {content.leftSub.map((word, i) => (
                            <span key={i} className={`block text-[4vw] md:text-[2vw] leading-[1] font-serif italic font-light tracking-wide opacity-60
                                  ${isArtMode ? 'text-white' : 'text-neutral-800'}`}>
                                {word}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* CENTER IMAGE PILL */}
                <div className="md:col-span-4 flex justify-center items-center relative h-[45vh] md:h-[75vh] w-full z-10 perspective-[1000px] my-2 md:my-0">
                    <motion.div
                        style={{
                            y: yImage,
                            scale: scaleImage,
                            willChange: 'transform'
                        }}
                        className="relative w-[75vw] md:w-[220px] lg:w-full max-w-[280px] md:max-w-[220px] lg:max-w-[340px] h-full rounded-full overflow-hidden shadow-2xl"
                    >
                        {/* Image */}
                        <div className="absolute inset-0 bg-neutral-200">
                            <img
                                src="/assets/Formalphoto.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover transition-all duration-700"
                            />
                        </div>

                        {/* Glass Overlay Effect */}
                        <div className={`absolute inset-0 opacity-10 bg-gradient-to-b ${isArtMode ? 'from-amber-500/30 to-black/50' : 'from-blue-500/30 to-transparent'}`} />

                        {/* Inner Border */}
                        <div className={`absolute inset-0 border-[1px] rounded-full z-20 ${isArtMode ? 'border-white/20' : 'border-black/10'}`} />

                        {/* Floating Label */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 w-full flex justify-center">
                            <div className={`px-4 py-2 rounded-full backdrop-blur-md border ${isArtMode ? 'bg-black/20 border-white/20 text-white' : 'bg-white/30 border-black/10 text-black'}`}>
                                <span className="text-[10px] font-mono tracking-[0.2em] uppercase">
                                    {content.label}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT TYPOGRAPHY */}
                <motion.div
                    style={{ y: yText, willChange: 'transform' }}
                    className="flex md:col-span-4 flex-col items-center md:items-start text-center md:text-left justify-center relative z-20 mt-8 md:mt-0 md:pl-4 lg:pl-0"
                >
                    <span className={`block text-[15vw] md:text-[7vw] lg:text-[7vw] leading-[0.8] font-black tracking-[-0.05em] uppercase 
                         ${isArtMode ? 'text-white' : 'text-neutral-900'}`}>
                        {content.rightMain}
                    </span>
                    <div className="flex flex-col gap-0 mt-2">
                        {content.rightSub.map((word, i) => (
                            <span key={i} className={`block text-[4vw] md:text-[2vw] leading-[1] font-serif italic font-light tracking-wide opacity-60
                                  ${isArtMode ? 'text-white' : 'text-neutral-800'}`}>
                                {word}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Side Vertical Decor */}
            <div className={`hidden md:block absolute left-8 top-1/2 -translate-y-1/2 ${isArtMode ? 'mix-blend-overlay opacity-100' : 'opacity-40'}`}>
                <span className={`block text-[10px] font-mono tracking-[0.5em] uppercase ${isArtMode ? 'text-white' : 'text-black'}`} style={{ writingMode: 'vertical-rl' }}>
                    System Architecture
                </span>
            </div>
            <div className={`hidden md:block absolute right-8 top-1/2 -translate-y-1/2 ${isArtMode ? 'mix-blend-overlay opacity-100' : 'opacity-40'}`}>
                <span className={`block text-[10px] font-mono tracking-[0.5em] uppercase ${isArtMode ? 'text-white' : 'text-black'}`} style={{ writingMode: 'vertical-rl' }}>
                    Visual Narrative
                </span>
            </div>

        </section>
    );
}
