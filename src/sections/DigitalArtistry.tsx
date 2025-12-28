import React, { useState, useRef, useEffect } from 'react';
import { ArtCard } from '../components/works/ArtCard';

export function DigitalArtistry() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // Duplicated art pieces to form a dense "wall"
    const artPieces = [
        // ... Original Set ...
        {
            title: "Neon Void",
            category: "3D Render",
            image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2552&auto=format&fit=crop",
            className: "md:col-span-2 md:row-span-2 min-h-[400px]"
        },
        {
            title: "Chromatic Data",
            category: "Data Viz",
            image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
            className: "md:col-span-1 md:row-span-1 min-h-[200px]"
        },
        {
            title: "Abstract Flows",
            category: "Generative",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
            className: "md:col-span-1 md:row-span-2 min-h-[400px]"
        },
        // ... Duplicates/Variations for the Grid ...
        {
            title: "Synthwave",
            category: "Illustration",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
            className: "md:col-span-1 md:row-span-1 min-h-[200px]"
        },
        {
            title: "Neural Network",
            category: "AI Art",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
            className: "md:col-span-1 md:row-span-1 min-h-[200px]"
        },
        {
            title: "Cyber City",
            category: "Concept Art",
            image: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=2698&auto=format&fit=crop",
            className: "md:col-span-2 md:row-span-1 min-h-[200px]"
        },
        {
            title: "Quantum Glitch",
            category: "Glitch Art",
            image: "https://images.unsplash.com/photo-1506318137071-a8bcbf67cc77?q=80&w=2670&auto=format&fit=crop",
            className: "md:col-span-1 md:row-span-2 min-h-[400px]"
        },
        {
            title: "Digital Horizon",
            category: "Landscape",
            image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2574&auto=format&fit=crop",
            className: "md:col-span-2 md:row-span-2 min-h-[400px]"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: "-50px"
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <section
            id="artistry"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen lg:h-screen py-20 px-4 sm:px-6 md:px-8 bg-neutral-100 dark:bg-neutral-900 overflow-hidden flex flex-col justify-center"
            style={{ backgroundColor: 'var(--background, #f5f5f5)' }}
        >
            {/* Background Decorative Elements (Matching Works Section) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 100, 255, 0.05), transparent 40%)`
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.08] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(#999 1px, transparent 1px), linear-gradient(90deg, #999 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                    }}
                />
            </div>

            <div className="relative w-full mx-auto max-w-[1400px]">
                {/* Header (Matching Works Section) - Kept straight */}
                <div
                    className={`mb-24 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                        }`}
                >
                    <div className="flex flex-col md:items-end">
                        <h2 className="text-4xl md:text-6xl font-light text-neutral-900 dark:text-white mb-6 tracking-tight text-right">
                            Digital Artistry
                        </h2>
                        <div className="w-24 h-1 bg-neutral-900 dark:bg-white/20 mb-6" />
                        <p className="max-w-xl text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed text-right">
                            A tilted perspective on digital creation.
                        </p>
                    </div>
                </div>

                {/* Tilted Bento Wall */}
                <div className="relative h-[800px] overflow-visible perspective-1000 flex justify-center items-center">
                    <div
                        className={`
                            grid grid-cols-1 md:grid-cols-4 gap-6 w-[150%] md:w-[120%] 
                            transform -rotate-12 scale-90 translate-x-[-10%]
                            transition-all duration-1000 ease-out
                        `}
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible
                                ? 'rotate(-12deg) scale(0.9) translateY(0)'
                                : 'rotate(-12deg) scale(0.9) translateY(100px)'
                        }}
                    >
                        {artPieces.map((piece, index) => (
                            <div
                                key={index}
                                className={`transform transition-all duration-700 hover:scale-105 hover:z-20 ${piece.className
                                    }`}
                                style={{
                                    transitionDelay: `${index * 100}ms`
                                }}
                            >
                                <ArtCard
                                    {...piece}
                                    index={index}
                                    className="w-full h-full shadow-2xl border border-white/5"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
