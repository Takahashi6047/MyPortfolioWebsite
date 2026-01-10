import { motion, AnimatePresence } from 'framer-motion';
import type { ArtPiece } from '../../data/artworks';
import { ArtCard } from './ArtCard';

interface BentoGridProps {
    pieces: ArtPiece[];
}

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
            style={{ gridAutoFlow: 'dense' }}
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

                    return (
                        <ArtCard
                            key={piece.id}
                            {...piece}
                            className={`${colSpan} ${rowSpan}`}
                            variants={itemVariants}
                            layout
                            initial="hidden"
                            animate="show"
                            exit="exit"
                        />
                    );
                })}
            </AnimatePresence>
        </motion.div>
    );
}
