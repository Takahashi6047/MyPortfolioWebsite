import React from 'react';

interface ArtCardProps {
    title: string;
    image: string;
    category?: string;
    className?: string; // For grid column/row spans
    index: number;
}

export const ArtCard: React.FC<ArtCardProps> = ({
    title,
    image,
    category = "Digital Art",
    className = "",
}) => {
    return (
        <div
            className={`
                relative
                group
                overflow-hidden
                rounded-3xl
                bg-neutral-200 dark:bg-neutral-800
                cursor-pointer
                ${className}
            `}
        >
            {/* Image Container */}
            <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-medium tracking-wider text-white border border-white/20 rounded-full backdrop-blur-md">
                    {category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {title}
                </h3>
            </div>
        </div>
    );
};
