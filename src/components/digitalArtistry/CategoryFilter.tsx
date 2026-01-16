import { artCategories } from '../../data/artworks';
import { useRef, useState, useEffect, useCallback } from 'react';

interface CategoryFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;
        const hasOverflow = scrollWidth > clientWidth;
        
        setCanScrollLeft(hasOverflow && scrollLeft > 5);
        setCanScrollRight(hasOverflow && scrollLeft < scrollWidth - clientWidth - 5);
    }, []);

    useEffect(() => {
        const timer = setTimeout(checkScroll, 100);
        
        window.addEventListener('resize', checkScroll);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkScroll);
        };
    }, [checkScroll]);

    useEffect(() => {
        checkScroll();
    }, [selectedCategory, checkScroll]);

    // Build mask gradient based on scroll position - fades the actual content
    const getMaskStyle = (): React.CSSProperties => {
        if (!canScrollLeft && !canScrollRight) {
            return {};
        }
        
        let gradient = 'linear-gradient(to right, ';
        
        if (canScrollLeft) {
            gradient += 'transparent 0%, black 10%, ';
        } else {
            gradient += 'black 0%, ';
        }
        
        if (canScrollRight) {
            gradient += 'black 90%, transparent 100%)';
        } else {
            gradient += 'black 100%)';
        }
        
        return {
            maskImage: gradient,
            WebkitMaskImage: gradient,
        };
    };

    return (
        <div className="relative w-full">
            {/* Scrollable Container with CSS mask fade on the buttons themselves */}
            <div 
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-1"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    ...getMaskStyle(),
                }}
            >
                {artCategories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`
                            px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs tracking-wider uppercase border transition-all duration-300 whitespace-nowrap flex-shrink-0
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
