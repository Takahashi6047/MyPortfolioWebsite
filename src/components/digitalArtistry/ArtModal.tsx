import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { ArtPiece } from '../../data/artworks';

interface ArtModalProps {
    isOpen: boolean;
    onClose: () => void;
    artPiece: ArtPiece | null;
}

// Simplified animations for mobile
const getModalVariants = (isMobile: boolean) => ({
    hidden: {
        opacity: 0,
        scale: isMobile ? 0.95 : 0.9,
        y: isMobile ? 20 : 40,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: isMobile ? 0.25 : 0.4,
            ease: [0.4, 0, 0.2, 1] as const
        }
    },
    exit: {
        opacity: 0,
        scale: isMobile ? 0.95 : 0.9,
        y: isMobile ? 20 : 40,
        transition: {
            duration: isMobile ? 0.15 : 0.25,
            ease: [0.4, 0, 1, 1] as const
        }
    }
});

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { duration: 0.2 } 
    },
    exit: { 
        opacity: 0, 
        transition: { duration: 0.15 } 
    }
};

export function ArtModal({ isOpen, onClose, artPiece }: ArtModalProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleEsc);
            
            return () => {
                document.body.style.overflow = 'unset';
                window.removeEventListener('keydown', handleEsc);
            };
        }
    }, [isOpen, onClose]);

    const modalVariants = getModalVariants(isMobile);

    return (
        <AnimatePresence mode="wait">
            {isOpen && artPiece && (
                <motion.div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    {/* Backdrop - simplified for mobile */}
                    <motion.div
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                        className={`absolute inset-0 bg-black/90 cursor-pointer ${isMobile ? '' : 'backdrop-blur-md'}`}
                    />

                    {/* Modal Content - constrained sizing */}
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full max-w-5xl max-h-[90vh] bg-[#1a1a1a]/95 border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                        style={{ maxHeight: 'calc(100vh - 2rem)' }}
                    >
                        {/* Decorative elements - hidden on mobile for performance */}
                        {!isMobile && (
                            <>
                                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                                    style={{ 
                                        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                                        backgroundSize: '40px 40px'
                                    }} 
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-5 pointer-events-none" />
                            </>
                        )}

                        {/* Corner Brackets */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[var(--art-accent)] z-20 pointer-events-none" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[var(--art-accent)] z-20 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[var(--art-accent)] z-20 pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[var(--art-accent)] z-20 pointer-events-none" />

                        {/* Content Layout */}
                        <div className="flex flex-col lg:flex-row h-full max-h-[90vh] relative z-10 overflow-hidden">

                            {/* Image Area */}
                            <div className="flex-1 min-h-0 relative bg-black/30 flex items-center justify-center p-3 sm:p-4 lg:p-8 overflow-hidden">
                                <img
                                    src={artPiece.image}
                                    alt={artPiece.title}
                                    className="max-w-full max-h-[40vh] lg:max-h-[70vh] w-auto h-auto object-contain select-none"
                                    loading="eager"
                                />

                                {/* Mobile Close Button */}
                                <button
                                    onClick={onClose}
                                    className="lg:hidden absolute top-2 right-2 z-50 w-9 h-9 flex items-center justify-center bg-black/70 border border-[var(--art-accent)]/40 rounded-full text-[var(--art-accent)]"
                                >
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </button>
                            </div>

                            {/* Sidebar */}
                            <div className="w-full lg:w-[380px] shrink-0 border-t lg:border-t-0 lg:border-l border-white/10 bg-black/40 flex flex-col max-h-[45vh] lg:max-h-full overflow-hidden">

                                {/* Header - Desktop */}
                                <div className="hidden lg:flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-[var(--art-accent)] animate-pulse" />
                                        <span className="text-[10px] font-mono text-[var(--art-accent)] tracking-widest">
                                            SYS.VIEWER
                                        </span>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="px-3 py-1.5 border border-[var(--art-accent)]/30 hover:bg-[var(--art-accent)]/10 transition-colors"
                                    >
                                        <span className="text-[9px] font-mono tracking-widest text-[var(--art-accent)]">CLOSE</span>
                                    </button>
                                </div>

                                {/* Scrollable Content */}
                                <div className="flex-1 overflow-y-auto p-4 lg:p-6 flex flex-col gap-4 lg:gap-6 scrollbar-hide min-h-0">
                                    {/* ID Badge */}
                                    <span className="inline-flex self-start px-2 py-1 bg-[var(--art-accent)]/10 border border-[var(--art-accent)]/20 text-[9px] font-mono text-[var(--art-accent)] tracking-widest">
                                        FIG_{artPiece.id}
                                    </span>

                                    {/* Title */}
                                    <div>
                                        <h2 className="text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">
                                            {artPiece.title}
                                        </h2>
                                        <div className="w-full h-px bg-gradient-to-r from-[var(--art-accent)] to-transparent opacity-30" />
                                    </div>

                                    {/* Metadata */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Category</span>
                                            <span className="text-xs text-[#e5e5e5] border-l-2 border-[var(--art-accent)] pl-2">
                                                {artPiece.category}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Year</span>
                                            <span className="text-xs text-[#e5e5e5] border-l-2 border-[var(--art-accent)] pl-2">
                                                {artPiece.year}
                                            </span>
                                        </div>
                                        {artPiece.size && (
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Size</span>
                                                <span className="text-xs text-[#e5e5e5] border-l-2 border-[var(--art-accent)] pl-2 uppercase">
                                                    {artPiece.size}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    {artPiece.type === 'text' && artPiece.content && (
                                        <div className="bg-[#111] border border-[#222] p-3 lg:p-4">
                                            <p className="text-[#a3a3a3] text-xs lg:text-sm leading-relaxed">
                                                {artPiece.content}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer - simplified */}
                                <div className="p-3 lg:p-4 border-t border-white/10 bg-black/30 shrink-0">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[8px] font-mono text-[var(--art-accent)]/60 uppercase tracking-wider">
                                            DIGITAL ARCHIVE
                                        </span>
                                        <div className="flex gap-0.5">
                                            {[0.2, 0.4, 0.6, 0.8, 1].map((opacity, i) => (
                                                <div key={i} className="w-1 h-2 bg-[var(--art-accent)]" style={{ opacity }} />
                                            ))}
                                        </div>
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
