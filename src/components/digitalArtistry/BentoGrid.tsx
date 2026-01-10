import { motion, AnimatePresence } from 'framer-motion';
import type { ArtPiece } from '../../data/artworks';
import { useState, useEffect } from 'react';

interface BentoGridProps {
    pieces: ArtPiece[];
}

// --- Typewriter Terminal Effect ---
const TypewriterText = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
    const [display, setDisplay] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        let currentIndex = 0;

        const startTyping = () => {
            const typeChar = () => {
                if (currentIndex < text.length) {
                    setDisplay(text.slice(0, currentIndex + 1));
                    currentIndex++;
                    timeout = setTimeout(typeChar, 30);
                }
            };
            typeChar();
        };

        timeout = setTimeout(startTyping, delay);

        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => { clearTimeout(timeout); clearInterval(cursorInterval); };
    }, [text, delay]);

    return (
        <span className={`font-mono ${className}`}>
            {display}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-[var(--art-accent)]`}>_</span>
        </span>
    );
};

export function BentoGrid({ pieces }: BentoGridProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        show: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring" as const, stiffness: 50 }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.2 }
        }
    };

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 auto-rows-[250px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
        >
            <AnimatePresence mode="popLayout">
                {pieces.map((piece) => {
                    // Grid Spanning Logic
                    let colSpan = 'col-span-1';
                    let rowSpan = 'row-span-1';

                    if (piece.size === 'large') { colSpan = 'md:col-span-2'; rowSpan = 'md:row-span-2'; }
                    else if (piece.size === 'wide') { colSpan = 'md:col-span-2'; }
                    else if (piece.size === 'tall') { rowSpan = 'md:row-span-2'; }

                    // Text Card
                    if (piece.type === 'text') {
                        return (
                            <motion.div
                                key={piece.id}
                                layout
                                variants={itemVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className={`${colSpan} ${rowSpan} relative bg-[#111] border border-[var(--art-accent)]/20 p-8 flex flex-col justify-center items-center text-center group overflow-hidden`}
                            >
                                <div className="absolute inset-0 bg-[var(--art-accent)]/5 group-hover:bg-[var(--art-accent)]/10 transition-colors duration-500" />
                                {/* Animated Brackets */}
                                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--art-accent)] transition-all duration-300 group-hover:w-4 group-hover:h-4" />
                                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--art-accent)] transition-all duration-300 group-hover:w-4 group-hover:h-4" />
                                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[var(--art-accent)] transition-all duration-300 group-hover:w-4 group-hover:h-4" />
                                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[var(--art-accent)] transition-all duration-300 group-hover:w-4 group-hover:h-4" />

                                <span className="text-[10px] text-[var(--art-accent)]/50 mb-4 tracking-[0.3em]">{piece.sub}</span>
                                <p className="text-xl md:text-2xl font-bold text-[#e5e5e5] whitespace-pre-line leading-tight font-sans">
                                    <TypewriterText text={piece.content || ""} delay={200} />
                                </p>
                            </motion.div>
                        );
                    }

                    // Image Card
                    return (
                        <motion.div
                            key={piece.id}
                            layout
                            variants={itemVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className={`${colSpan} ${rowSpan} group relative bg-[#050505] border border-[var(--art-accent)]/20 overflow-hidden`}
                        >
                            {/* Tech overlay (Base) */}
                            <div className="absolute top-4 left-4 z-20 flex gap-2">
                                <span className="text-[9px] bg-black/80 text-[var(--art-accent)] px-1 border border-[var(--art-accent)]/30 backdrop-blur-sm">
                                    FIG_{piece.id}
                                </span>
                            </div>

                            {/* Image */}
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src={piece.image}
                                    alt={piece.title}
                                    className="w-full h-full object-cover grayscale-[0.5] contrast-[1.1] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                                />
                                {/* Scanline */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
                            </div>

                            {/* Hover Overlay (Tech specs) */}
                            <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 border-[0.5px] border-[var(--art-accent)] m-1">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    <div className="w-full h-px bg-[var(--art-accent)] mb-3 opacity-50" />
                                    <h3 className="text-lg font-bold text-white mb-1 font-sans tracking-wide">
                                        {piece.title}
                                    </h3>
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] text-[var(--art-accent)] uppercase tracking-wider">
                                                CAT: {piece.category}
                                            </span>
                                            <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                                                DATE: {piece.year}
                                            </span>
                                        </div>
                                        <button className="p-2 border border-[var(--art-accent)] text-[var(--art-accent)] hover:bg-[var(--art-accent)] hover:text-black transition-colors">
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Corner Brackets - Animated */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--art-accent)] transition-all duration-300 group-hover:w-6 group-hover:h-6" />
                                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--art-accent)] transition-all duration-300 group-hover:w-6 group-hover:h-6" />
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--art-accent)] transition-all duration-300 group-hover:w-6 group-hover:h-6" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--art-accent)] transition-all duration-300 group-hover:w-6 group-hover:h-6" />
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </motion.div>
    );
}
