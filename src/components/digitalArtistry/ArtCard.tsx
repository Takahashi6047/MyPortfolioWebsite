import { motion } from 'framer-motion';
import type { ArtPiece } from '../../data/artworks';

interface ArtCardProps extends ArtPiece {
    className?: string;
    variants?: any;
    layout?: boolean;
    initial?: string;
    animate?: string;
    exit?: string;
}

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
    exit
}: ArtCardProps) {
    return (
        <motion.div
            key={id}
            layout={layout}
            variants={variants}
            initial={initial}
            animate={animate}
            exit={exit}
            className={`${className} group relative bg-[#050505] border border-[var(--art-accent)]/20 overflow-hidden`}
        >
            {/* Tech overlay (Base) */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="text-[9px] bg-black/80 text-[var(--art-accent)] px-1 border border-[var(--art-accent)]/30 backdrop-blur-sm">
                    FIG_{id}
                </span>
            </div>

            {/* Image */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={image}
                    alt={title}
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
                        {title}
                    </h3>
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-[var(--art-accent)] uppercase tracking-wider">
                                CAT: {category}
                            </span>
                            <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                                DATE: {year}
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
}
