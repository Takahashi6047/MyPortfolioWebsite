import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Scan } from 'lucide-react';
import { useTheme } from '../../global/overlay/themeOverlay/RippleContext';
import { useCursor } from '../../global/cursor';

export function AboutPortal() {
    const { theme } = useTheme();
    const { setCursorText, setCursorVariant } = useCursor();
    const isArtMode = theme === 'dark';

    // 3D Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setCursorText("");
        setCursorVariant("default");
    };

    return (
        <div className="h-full w-full flex flex-col justify-end perspective-1000">
            {/* Header / Label */}
            <div className="flex justify-between items-end mb-4 sm:mb-6 px-1 sm:px-2">
                <div className="flex flex-col gap-0.5 sm:gap-1">
                    <span className={`text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] ${isArtMode ? 'text-white/40' : 'text-black/40'}`}>
                        Operator ID
                    </span>
                    <span className={`text-[10px] sm:text-xs font-bold font-mono uppercase tracking-wider sm:tracking-widest ${isArtMode ? 'text-[var(--art-accent)]' : 'text-blue-600'}`}>
                        #808-999
                    </span>
                </div>
                <Scan className={`w-3 h-3 sm:w-4 sm:h-4 ${isArtMode ? 'text-white/30' : 'text-black/30'}`} />
            </div>

            {/* The Portal Card with 3D Tilt */}
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => {
                    setCursorText("ACCESS BIO");
                    setCursorVariant("text");
                }}
                onMouseLeave={handleMouseLeave}
                className="relative w-full aspect-[4/5] md:aspect-[3/4] group cursor-none"
            >
                {/* Card Container */}
                <div className={`absolute inset-0 border border-t transition-colors duration-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 
                    ${isArtMode ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>

                    {/* The Image (Placeholder) */}
                    <div className="absolute inset-[1px] overflow-hidden">
                        <img
                            src="/assets/Formalphoto.jpg"
                            alt="Profile"
                            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110`}
                        />

                        {/* Digital Scanline / Glitch Overlay (Art Mode) */}
                        {isArtMode && (
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none opacity-50 mix-blend-hard-light" />
                        )}
                        {/* Noise Texture */}
                        <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                    </div>

                    {/* HUD Elements Overlay */}
                    <div className="absolute inset-2 sm:inset-4 pointer-events-none z-20 flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
                        <div className="flex justify-between items-start">
                            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 border ${isArtMode ? 'border-[var(--art-accent)] bg-[var(--art-accent)]' : 'border-blue-600 bg-blue-600'}`} />
                            <ArrowUpRight className={`w-6 h-6 sm:w-8 sm:h-8 ${isArtMode ? 'text-white opacity-0 group-hover:opacity-100' : 'text-black opacity-0 group-hover:opacity-100'} transition-opacity duration-300`} />
                        </div>

                        <div className="space-y-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <h3 className={`text-2xl sm:text-4xl font-bold font-sans tracking-tight leading-none ${isArtMode ? 'text-white' : 'text-white mix-blend-difference'}`}>
                                JOHN
                                <br />
                                ROBERT
                            </h3>
                            <div className={`h-[1px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100 ${isArtMode ? 'bg-[var(--art-accent)]' : 'bg-white'}`} />
                            <p className={`text-[8px] sm:text-[10px] font-mono font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase pt-1 sm:pt-2 ${isArtMode ? 'text-[var(--art-accent)]' : 'text-white'}`}>
                                Full Stack Engineer
                            </p>
                        </div>
                    </div>

                    {/* Animated Corners */}
                    <div className="absolute inset-0 pointer-events-none z-30">
                        {/* Top Left */}
                        <div className={`absolute top-0 left-0 w-10 sm:w-16 h-[1px] ${isArtMode ? 'bg-white/30' : 'bg-black/30'}`} />
                        <div className={`absolute top-0 left-0 w-[1px] h-10 sm:h-16 ${isArtMode ? 'bg-white/30' : 'bg-black/30'}`} />
                        {/* Bottom Right */}
                        <div className={`absolute bottom-0 right-0 w-10 sm:w-16 h-[1px] ${isArtMode ? 'bg-white/30' : 'bg-black/30'}`} />
                        <div className={`absolute bottom-0 right-0 w-[1px] h-10 sm:h-16 ${isArtMode ? 'bg-white/30' : 'bg-black/30'}`} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
