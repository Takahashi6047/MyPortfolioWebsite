import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { artPieces } from '../data/artworks';
import { CategoryFilter, BentoGrid } from '../components/digitalArtistry';
import { useRipple } from '../global/overlay/themeOverlay/RippleContext';

// Check if device is mobile
const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

// --- Typewriter Terminal Effect ---
const TypewriterText = ({ text, className = "", delay = 0, startTyping = false }: { text: string, className?: string, delay?: number, startTyping?: boolean }) => {
    const [display, setDisplay] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        if (!startTyping) return;
        
        let timeout: ReturnType<typeof setTimeout>;
        let currentIndex = 0;

        const beginTyping = () => {
            const typeChar = () => {
                if (currentIndex < text.length) {
                    setDisplay(text.slice(0, currentIndex + 1));
                    currentIndex++;
                    timeout = setTimeout(typeChar, 30);
                }
            };
            typeChar();
        };

        timeout = setTimeout(beginTyping, delay);

        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => { clearTimeout(timeout); clearInterval(cursorInterval); };
    }, [text, delay, startTyping]);

    return (
        <span className={`font-mono ${className}`}>
            {display}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-[var(--art-accent)]`}>_</span>
        </span>
    );
};

export function DigitalArtistry() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const { theme } = useRipple();
    
    // Use useInView for reliable entrance detection
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    // Parallax scroll setup - only on desktop
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax transforms - disabled on mobile
    const gridY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [50, -50]);

    // Simplified animation variants for mobile
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: isMobile ? 0.3 : 0.6,
                staggerChildren: isMobile ? 0.08 : 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: isMobile ? 20 : 60 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: isMobile ? 0.4 : 0.7, ease: "easeOut" as const }
        }
    };

    const statusVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.4, delay: 0.1 }
        }
    };

    const filterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, delay: 0.2 }
        }
    };

    const filteredPieces = selectedCategory === 'All'
        ? artPieces
        : artPieces.filter(piece => piece.category === selectedCategory || piece.type === 'text');

    return (
        <section
            id="artistry"
            ref={sectionRef}
            className="relative min-h-screen py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden font-mono md:-mt-16"
        >
            {/* Gradient overlay at the top - #3A3A3A fading downwards */}
            <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/70 via-60% to-transparent pointer-events-none z-100" />
            
            {/* -- TECH BACKGROUND GRID with Parallax -- */}
            {!isMobile && (
                <motion.div 
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{ y: gridY }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `linear-gradient(rgba(197, 160, 89, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 160, 89, 0.05) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }}
                    />
                </motion.div>
            )}

            {/* Main content with entrance animation */}
            <motion.div 
                className="relative w-full max-w-[95%] mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* -- HEADER -- */}
                <motion.div 
                    ref={headerRef}
                    className="mb-8 sm:mb-12 flex flex-col md:flex-row justify-between md:items-end gap-4 border-b border-[var(--art-accent)]/30 pb-4 sm:pb-6"
                    variants={itemVariants}
                >
                    <div className="w-full md:w-auto">
                        <motion.div 
                            className="flex items-center gap-2 sm:gap-3 mb-2"
                            variants={statusVariants}
                        >
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--art-accent)] animate-pulse" />
                            <span className="text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-[var(--art-accent)]">SYS.STATUS: ONLINE</span>
                        </motion.div>
                        <motion.h2 
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#e5e5e5] tracking-tighter uppercase font-sans leading-tight"
                            variants={itemVariants}
                        >
                            Visual <TypewriterText text="Database" delay={600} startTyping={isInView} className="text-[var(--art-accent)]" />
                        </motion.h2>
                    </div>

                    <motion.div variants={filterVariants} className="w-full md:w-auto">
                        <CategoryFilter 
                            selectedCategory={selectedCategory} 
                            onCategoryChange={setSelectedCategory} 
                        />
                    </motion.div>
                </motion.div>

                {/* -- BENTO GRID -- */}
                <motion.div variants={itemVariants}>
                    <BentoGrid pieces={filteredPieces} />
                </motion.div>

                {/* Footer Data */}
                <motion.div 
                    className="mt-8 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 text-[8px] sm:text-[10px] border-t border-[var(--art-accent)]/20 pt-4 uppercase tracking-wider sm:tracking-widest"
                    variants={itemVariants}
                >
                    <span className="text-[var(--art-accent)]/40">End Of Stream</span>
                    <span className="text-[var(--art-accent)]/40">
                        ART
                        <span className={theme === 'light' ? '!text-[rgb(59,130,246)]' : ''}>
                            CODED
                        </span>
                        {' // V.2.0'}
                    </span>
                </motion.div>
            </motion.div>
        </section>
    );
}
