import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useState, useCallback } from 'react';
import type { ArtPiece } from '../../data/artworks';
import { useCursor } from '../../global/cursor/CursorContext';

interface ArtCardProps extends ArtPiece {
    className?: string;
    variants?: any;
    layout?: boolean;
    initial?: string;
    animate?: string;
    exit?: string;
    onClick?: () => void;
}

// Check if device is mobile/touch
const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

// Playful cursor messages
const cursorMessages = [
    "ooh, nice pick!",
    "click me~",
    "good taste!",
    "expand me!",
    "let's see more",
    "curious?",
    "zoom in!",
    "take a peek",
    "art awaits",
    "discover me",
];

// Get a consistent message based on card id
const getCursorMessage = (id: string) => {
    const index = parseInt(id, 10) % cursorMessages.length;
    return cursorMessages[index];
};

export function ArtCard({
    id,
    title,
    image,
    category,
    year,
    className = "",
    variants,
    layout,
    initial,
    animate,
    exit,
    onClick
}: ArtCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const { setCursorText, setCursorVariant } = useCursor();

    const handleMouseMove = useCallback(({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        if (isMobile) return; // Skip on mobile
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }, [mouseX, mouseY]);

    const handleMouseEnter = useCallback(() => {
        if (isMobile) return;
        setIsHovered(true);
        setCursorText(getCursorMessage(id));
        setCursorVariant('text');
    }, [id, setCursorText, setCursorVariant]);

    const handleMouseLeave = useCallback(() => {
        if (isMobile) return;
        setIsHovered(false);
        setCursorText('');
        setCursorVariant('default');
    }, [setCursorText, setCursorVariant]);

    return (
        <motion.div
            key={id}
            layout={!isMobile && layout} // Disable layout animations on mobile
            variants={variants}
            initial={initial}
            animate={animate}
            exit={exit}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`${className} group relative bg-[#050505] overflow-hidden rounded-sm cursor-pointer`}
        >
            {/* Only render mouse-follow effects on desktop */}
            {!isMobile && (
                <>
                    <motion.div
                        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-30"
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                    650px circle at ${mouseX}px ${mouseY}px,
                                    rgba(197, 160, 89, 0.15),
                                    transparent 80%
                                )
                            `
                        }}
                    />
                    <motion.div
                        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 z-30"
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                    400px circle at ${mouseX}px ${mouseY}px,
                                    rgba(197, 160, 89, 0.4),
                                    transparent 40%
                                )
                            `,
                            maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                            maskComposite: 'exclude',
                            WebkitMaskComposite: 'xor',
                            padding: '1px'
                        }}
                    />
                </>
            )}

            <div className="absolute top-3 left-3 z-30 pointer-events-none">
                <div className="flex items-center gap-2 px-2 py-1 bg-black/60 md:backdrop-blur-md border border-[var(--art-accent)]/30 group-hover:border-[var(--art-accent)]/60 transition-colors duration-300">
                    <div className={`w-1 h-1 bg-[var(--art-accent)] ${isHovered ? 'animate-ping' : 'opacity-50'}`} />
                    <span className="text-[10px] font-mono tracking-widest text-[var(--art-accent)]">FIG_{id}</span>
                </div>
            </div>

            <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />

                {/* Scanline effect - desktop only */}
                {!isMobile && (
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.7)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none z-10" />
                )}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] opacity-60 pointer-events-none z-10" />
            </div>

            {/* --- HOVER OVERLAY --- */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 ease-out" />

            <div className="absolute inset-x-0 bottom-0 p-5 z-30 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">

                <div className="w-0 h-px bg-gradient-to-r from-[var(--art-accent)] to-transparent mb-3 group-hover:w-full transition-all duration-700 delay-100 ease-out opacity-0 group-hover:opacity-100" />

                <div className="flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                    <div className="flex-1 pr-4 min-w-0">
                        <h3 className="text-lg font-bold text-[#e5e5e5] mb-1 font-sans tracking-tight leading-tight group-hover:text-white transition-colors duration-300 min-h-[1.5em] truncate">
                            {title}
                        </h3>

                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-[10px] font-mono text-[var(--art-accent)] uppercase tracking-wider bg-[var(--art-accent)]/10 px-1 py-0.5 border border-[var(--art-accent)]/20">
                                //{category}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-500">
                                {year}
                            </span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="relative group/btn">
                        <button className="w-8 h-8 flex items-center justify-center border border-[var(--art-accent)]/50 text-[var(--art-accent)] bg-black/50 overflow-hidden hover:bg-[var(--art-accent)] hover:text-black transition-all duration-300 hover:scale-110">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover/btn:-rotate-45 transition-transform duration-300">
                                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- CORNER BRACKETS --- */}
            <div className="pointer-events-none z-40">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--art-accent)] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--art-accent)] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--art-accent)] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--art-accent)] opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>

        </motion.div>
    );
}
