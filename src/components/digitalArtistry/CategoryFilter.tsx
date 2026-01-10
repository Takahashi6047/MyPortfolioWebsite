import { artCategories } from '../../data/artworks';

interface CategoryFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="flex gap-2 mt-6 md:mt-0 flex-wrap">
            {artCategories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
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
    );
}
