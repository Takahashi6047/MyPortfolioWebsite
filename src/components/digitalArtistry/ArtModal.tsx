import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import type { ArtPiece } from '../../data/artworks';

interface ArtModalProps {
    isOpen: boolean;
    onClose: () => void;
    artPiece: ArtPiece | null;
}

const modalVariants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
        y: 40,
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.6, 1] as const
        }
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1] as const
        }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: 40,
        transition: {
            duration: 0.25,
            ease: [0.4, 0, 1, 1] as const
        }
    }
};

const backdropVariants = {
    hidden: { 
        opacity: 0,
        transition: {
            duration: 0.2
        }
    },
    visible: { 
        opacity: 1, 
        transition: { 
            duration: 0.3,
            ease: "easeOut" as const
        } 
    },
    exit: { 
        opacity: 0, 
        transition: { 
            duration: 0.25,
            ease: "easeIn" as const
        } 
    }
};

export function ArtModal({ isOpen, onClose, artPiece }: ArtModalProps) {
    // Handle escape key and body scroll lock
    useEffect(() => {
        if (isOpen) {
            // Lock body scroll
            document.body.style.overflow = 'hidden';
            
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleEsc);
            
            return () => {
                // Unlock body scroll
                document.body.style.overflow = 'unset';
                window.removeEventListener('keydown', handleEsc);
            };
        }
    }, [isOpen, onClose]);

    return (
        <AnimatePresence mode="wait">
            {isOpen && artPiece && (
                <motion.div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full max-w-[95vw] h-[95vh] md:h-[90vh] bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
                    >
                        {/* --- DECORATIVE ELEMENTS --- */}
                        {/* Noise Texture for Realism */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
                        {/* Grid Background */}
                        <div
                            className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{
                                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
                                backgroundSize: '40px 40px'
                            }}
                        />

                        {/* Corner Brackets - Large & Premium */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--art-accent)] z-20 pointer-events-none" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--art-accent)] z-20 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--art-accent)] z-20 pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--art-accent)] z-20 pointer-events-none" />

                        {/* Scanline Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-10 pointer-events-none z-10" />

                        {/* --- CONTENT LAYOUT --- */}
                        <div className="flex flex-col lg:flex-row h-full relative z-20">

                            {/* --- IMAGE AREA (Dominant) --- */}
                            <div className="flex-1 relative bg-transparent flex items-center justify-center p-4 lg:p-12 overflow-hidden group">
                                {/* Subtle radial highlight behind image */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] opacity-100 pointer-events-none" />

                                <motion.img
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    src={artPiece.image}
                                    alt={artPiece.title}
                                    className="max-w-full max-h-full object-contain shadow-2xl relative z-10 select-none pointer-events-none"
                                />

                                {/* Mobile Close Button (Floating) */}
                                <motion.button
                                    onClick={onClose}
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="lg:hidden absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-md border border-[var(--art-accent)]/30 rounded-full text-[var(--art-accent)]"
                                >
                                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                                        <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </motion.button>
                            </div>

                            {/* --- SIDEBAR (Details) --- */}
                            <div className="w-full lg:w-[450px] shrink-0 border-t lg:border-t-0 lg:border-l border-white/10 bg-black/20 flex flex-col h-[40vh] lg:h-full relative">

                                {/* Header (Desktop Only) */}
                                <div className="hidden lg:flex items-center justify-between px-8 py-6 border-b border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-[var(--art-accent)] animate-pulse shadow-[0_0_10px_var(--art-accent)]" />
                                        <span className="text-xs font-mono text-[var(--art-accent)] tracking-[0.2em]">
                                            SYS.VIEWER
                                        </span>
                                    </div>
                                    <motion.button
                                        onClick={onClose}
                                        whileHover={{ scale: 1.05, backgroundColor: "rgba(197, 160, 89, 0.1)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group relative px-4 py-2 border border-[var(--art-accent)]/30 transition-colors"
                                    >
                                        <span className="text-[10px] font-mono tracking-widest text-[var(--art-accent)]">CLOSE_CONNECTION</span>
                                        {/* Corner accents for button */}
                                        <div className="absolute top-0 right-0 w-1 h-1 bg-[var(--art-accent)] opacity-50" />
                                        <div className="absolute bottom-0 left-0 w-1 h-1 bg-[var(--art-accent)] opacity-50" />
                                    </motion.button>
                                </div>

                                {/* Scrollable Content */}
                                <div className="flex-1 overflow-y-auto p-6 lg:p-8 flex flex-col gap-6 lg:gap-8 scrollbar-hide">
                                    {/* ID Badge */}
                                    <div className="inline-flex">
                                        <span className="px-3 py-1 bg-[var(--art-accent)]/10 border border-[var(--art-accent)]/20 text-[10px] font-mono text-[var(--art-accent)] tracking-widest rounded-sm">
                                            FIG_{artPiece.id} // SECURE_ASSET
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <div>
                                        <h2 className="text-2xl lg:text-4xl font-bold text-white mb-3 leading-tight font-sans tracking-tight">
                                            {artPiece.title}
                                        </h2>
                                        <div className="w-full h-px bg-gradient-to-r from-[var(--art-accent)] to-transparent opacity-30" />
                                    </div>

                                    {/* Metadata Grid */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Category</span>
                                            <span className="text-sm text-[#e5e5e5] font-medium border-l-2 border-[var(--art-accent)] pl-3">
                                                {artPiece.category}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Year Logged</span>
                                            <span className="text-sm text-[#e5e5e5] font-medium border-l-2 border-[var(--art-accent)] pl-3">
                                                {artPiece.year}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Dimensions</span>
                                            <span className="text-sm text-[#e5e5e5] font-medium border-l-2 border-[var(--art-accent)] pl-3 uppercase">
                                                {artPiece.size || 'Variable'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Format</span>
                                            <span className="text-sm text-[#e5e5e5] font-medium border-l-2 border-[var(--art-accent)] pl-3 uppercase">
                                                Digital
                                            </span>
                                        </div>
                                    </div>

                                    {/* Description / Content */}
                                    {artPiece.type === 'text' && artPiece.content && (
                                        <div className="bg-[#111] border border-[#222] p-4 lg:p-6 rounded-sm mt-2">
                                            <span className="text-[10px] font-mono text-[var(--art-accent)] opacity-70 uppercase tracking-widest block mb-3">
                                                // DECODED_PAYLOAD
                                            </span>
                                            <p className="text-[#a3a3a3] text-sm lg:text-base leading-relaxed font-sans">
                                                {artPiece.content}
                                            </p>
                                        </div>
                                    )}

                                    {/* Art Description Placeholder (if needed in future) */}
                                    {!artPiece.content && (
                                        <p className="text-[#666] text-sm italic border-l border-[#333] pl-4">
                                            Visual data record. No text payload attached to this file.
                                        </p>
                                    )}
                                </div>

                                {/* Footer Status Bar */}
                                <div className="p-6 border-t border-white/10 bg-black/20">
                                    <div className="flex justify-between items-end mb-2">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[9px] font-mono text-[#444] uppercase tracking-widest">Encryption</span>
                                            <span className="text-[10px] font-mono text-[var(--art-accent)] uppercase tracking-wider">AES-256 // VERIFIED</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-1 h-3 bg-[var(--art-accent)] opacity-20" />
                                            <div className="w-1 h-3 bg-[var(--art-accent)] opacity-40" />
                                            <div className="w-1 h-3 bg-[var(--art-accent)] opacity-60" />
                                            <div className="w-1 h-3 bg-[var(--art-accent)] opacity-80" />
                                            <div className="w-1 h-3 bg-[var(--art-accent)]" />
                                        </div>
                                    </div>
                                    {/* Loading Line */}
                                    <div className="w-full h-px bg-[#222] overflow-hidden relative">
                                        <div className="absolute inset-0 bg-[var(--art-accent)] w-1/2 animate-loading-bar opacity-50" />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
