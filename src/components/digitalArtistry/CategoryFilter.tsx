import { artCategories } from '../../data/artworks';
import { useRef, useState, useEffect } from 'react';

interface CategoryFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(false);

    const checkScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;
        setShowLeftFade(scrollLeft > 10);
        setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    return (
        <div className="relative w-full">
            {/* Left Fade */}
            {showLeftFade && (
                <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            )}
            
            {/* Right Fade */}
            {showRightFade && (
                <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            )}

            {/* Scrollable Container */}
            <div 
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {artCategories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`
                            px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase border transition-all duration-300 whitespace-nowrap flex-shrink-0
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
    );
}
