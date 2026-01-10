import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { ArtPiece } from '../../data/artworks';
import { ArtCard } from './ArtCard';

interface BentoGridProps {
    pieces: ArtPiece[];
}

// Wrapper component for individual card animations
function AnimatedCard({ piece, index, className }: { piece: ArtPiece; index: number; className: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut"
            }}
            layout
        >
            <ArtCard
                {...piece}
                className="w-full h-full"
            />
        </motion.div>
    );
}

export function BentoGrid({ pieces }: BentoGridProps) {
    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 auto-rows-[250px]"
            style={{ gridAutoFlow: 'dense' }}
        >
            <AnimatePresence mode="popLayout">
                {pieces.map((piece, index) => {
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
                        />
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
