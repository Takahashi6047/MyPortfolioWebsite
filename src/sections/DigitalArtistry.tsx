import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

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
                    timeout = setTimeout(typeChar, 30); // Fast typing speed
                }
            };
            typeChar();
        };

        timeout = setTimeout(startTyping, delay);

        // Cursor blink loop
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

export function DigitalArtistry() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [selectedCategory, setSelectedCategory] = useState('All');
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    // Curated art pieces - Reorganized for Bento
    const artPieces = [
        {
            id: "01",
            title: "Project: NEON_VOID",
            category: "3D Render",
            image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2552&auto=format&fit=crop",
            year: "2024",
            size: "large"
        },
        {
            id: "TEXT_01",
            type: "text",
            content: "DESIGN PHILOSOPHY //\nFUNCTION OVER FORM",
            sub: "SYS.INIT",
            size: "small"
        },
        {
            id: "02",
            title: "Subroutine: CHROMATIC",
            category: "Data Vis",
            image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
            year: "2024",
            size: "medium"
        },
        {
            id: "03",
            title: "Flow_State_v9",
            category: "Generative",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
            year: "2023",
            size: "medium"
        },
        {
            id: "04",
            title: "Synth_Dreams.exe",
            category: "Illustration",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
            year: "2024",
            size: "wide"
        },
        {
            id: "05",
            title: "Neural_Net__Training",
            category: "AI Model",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
            year: "2023",
            size: "small"
        },
        {
            id: "TEXT_02",
            type: "text",
            content: "VISUAL DATA\nCOMPILING...",
            sub: "ERR_404_ART_FOUND",
            size: "small"
        },
        {
            id: "06",
            title: "Sector_7_Metropolis",
            category: "Concept Art",
            image: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=2698&auto=format&fit=crop",
            year: "2024",
            size: "medium"
        },
    ];

    const categories = ['All', '3D Render', 'Concept Art', 'Data Vis'];

    const filteredPieces = selectedCategory === 'All'
        ? artPieces
        : artPieces.filter(piece => piece.category === selectedCategory || piece.type === 'text');


    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    // Stagger Animation Variants
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
        <section
            id="artistry"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden font-mono"
        >
            {/* -- TECH BACKGROUND GRID -- */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(197, 160, 89, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 160, 89, 0.05) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="relative max-w-[95%] mx-auto">
                {/* -- HEADER: INDUSTRIAL TERMINAL STYLE -- */}
                <div ref={headerRef} className="mb-12 flex flex-col md:flex-row justify-between items-end border-b border-[var(--art-accent)]/30 pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 bg-[var(--art-accent)] animate-pulse" />
                            <span className="text-[10px] tracking-[0.2em] text-[var(--art-accent)]">SYS.STATUS: ONLINE</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-[#e5e5e5] tracking-tighter uppercase font-sans">
                            Visual <TypewriterText text="Database" delay={500} className="text-[var(--art-accent)]" />
                        </h2>
                    </div>

                    <div className="flex gap-2 mt-6 md:mt-0">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`
                                    px-4 py-2 text-[10px] tracking-widest uppercase border transition-all duration-300
                                    ${selectedCategory === category
                                        ? 'bg-[var(--art-accent)] text-black border-[var(--art-accent)] font-bold'
                                        : 'bg-transparent text-[var(--art-accent)] border-[var(--art-accent)]/30 hover:border-[var(--art-accent)]'
                                    }
                                `}
                            >
                                [{category}]
                            </button>
                        ))}
                    </div>
                </div>

                {/* -- BENTO GRID -- */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 auto-rows-[250px]"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredPieces.map((piece) => {
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
                                        {/* Scanline - Now Animated */}
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

                {/* Footer Data */}
                <div className="mt-8 flex justify-between text-[10px] text-[var(--art-accent)]/40 border-t border-[var(--art-accent)]/20 pt-4 uppercase tracking-widest">
                    <span>End Of Stream</span>
                    <span>ARTCODED // V.2.0</span>
                </div>
            </div>
        </section>
    );
}
