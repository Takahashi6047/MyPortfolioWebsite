import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import type { ArtPiece } from '../../data/artworks';
import { ArtCard } from './ArtCard';
import { ArtModal } from './ArtModal';

interface BentoGridProps {
    pieces: ArtPiece[];
}

// Wrapper component for individual card animations
function AnimatedCard({ piece, index, className, onClick }: { piece: ArtPiece; index: number; className: string; onClick: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut"
            }}
            layout
        >
            <ArtCard
                {...piece}
                className="w-full h-full"
                onClick={onClick}
            />
        </motion.div>
    );
}

export function BentoGrid({ pieces }: BentoGridProps) {
    const [showAll, setShowAll] = useState(false);
    const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);

    // Calculate how many items to show initially based on screen size
    const getInitialCount = () => {
        // Show enough items to fill roughly one viewport height
        // Assuming ~250px per row and ~4-5 rows for a fullscreen section
        return 12; // This will show about 3-4 rows on most screens
    };

    const initialCount = getInitialCount();
    const displayedPieces = showAll ? pieces : pieces.slice(0, initialCount);
    const hasMore = pieces.length > initialCount;

    return (
        <div className="w-full">
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 auto-rows-[200px] sm:auto-rows-[250px]"
                style={{ gridAutoFlow: 'dense' }}
            >
                <AnimatePresence mode="popLayout">
                    {displayedPieces.map((piece, index) => {
                        // Grid Spanning Logic
                        let colSpan = 'col-span-1';
                        let rowSpan = 'row-span-1';

                        if (piece.size === 'large') { colSpan = 'md:col-span-2'; rowSpan = 'md:row-span-2'; }
                        else if (piece.size === 'wide') { colSpan = 'md:col-span-2'; }
                        else if (piece.size === 'tall') { rowSpan = 'md:row-span-2'; }

                        return (
                            <AnimatedCard
                                key={piece.id}
                                piece={piece}
                                index={index}
                                className={`${colSpan} ${rowSpan}`}
                                onClick={() => setSelectedPiece(piece)}
                            />
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* View All / Show Less Buttons */}
            {hasMore && (
                <motion.div
                    className="flex justify-center mt-8 sm:mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {!showAll ? (
                        <button
                            onClick={() => setShowAll(true)}
                            className="group relative px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border border-[var(--art-accent)] text-[var(--art-accent)] hover:bg-[var(--art-accent)] hover:text-black transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm font-medium"
                        >
                            <span className="relative z-10">View All ({pieces.length - initialCount} more)</span>

                            {/* Tech-style corner brackets */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--art-accent)] transition-all duration-300 group-hover:w-3 group-hover:h-3" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--art-accent)] transition-all duration-300 group-hover:w-3 group-hover:h-3" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--art-accent)] transition-all duration-300 group-hover:w-3 group-hover:h-3" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--art-accent)] transition-all duration-300 group-hover:w-3 group-hover:h-3" />

                            {/* Scanline effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.1)_50%)] bg-[length:100%_2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowAll(false)}
                            className="group relative px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border border-neutral-500 text-neutral-400 hover:border-[var(--art-accent)] hover:text-[var(--art-accent)] transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm font-medium"
                        >
                            <span className="relative z-10">Show Less</span>

                            {/* Tech-style corner brackets */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-500 group-hover:border-[var(--art-accent)] transition-all duration-300 group-hover:w-3 group-hover:h-3" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-500 group-hover:border-[var(--art-accent)] transition-all duration-300 group-hover:w-3 group-hover:h-3" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-500 group-hover:border-[var(--art-accent)] transition-all duration-300 group-hover:w-3 group-hover:h-3" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-500 group-hover:border-[var(--art-accent)] transition-all duration-300 group-hover:w-3 group-hover:h-3" />

                            {/* Scanline effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.1)_50%)] bg-[length:100%_2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    )}
                </motion.div>
            )}

            {/* Modal */}
            <ArtModal
                isOpen={!!selectedPiece}
                onClose={() => setSelectedPiece(null)}
                artPiece={selectedPiece}
            />
        </div>
    );
}
