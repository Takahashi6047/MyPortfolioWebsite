import React, { useState, useRef, useEffect } from 'react';

export function DigitalArtistry() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollProgress, setScrollProgress] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Curated art pieces for gallery display
    const artPieces = [
        {
            title: "Neon Void",
            category: "3D Render",
            image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2552&auto=format&fit=crop",
            year: "2024"
        },
        {
            title: "Chromatic Data",
            category: "Data Visualization",
            image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
            year: "2024"
        },
        {
            title: "Abstract Flows",
            category: "Generative Art",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
            year: "2023"
        },
        {
            title: "Synthwave Dreams",
            category: "Digital Illustration",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
            year: "2024"
        },
        {
            title: "Neural Network",
            category: "AI Art",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
            year: "2023"
        },
        {
            title: "Cyber Metropolis",
            category: "Concept Art",
            image: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=2698&auto=format&fit=crop",
            year: "2024"
        },
        {
            title: "Quantum Glitch",
            category: "Glitch Art",
            image: "https://images.unsplash.com/photo-1506318137071-a8bcbf67cc77?q=80&w=2670&auto=format&fit=crop",
            year: "2023"
        },
        {
            title: "Digital Horizon",
            category: "Digital Landscape",
            image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2574&auto=format&fit=crop",
            year: "2024"
        }
    ];

    const categories = ['All', ...Array.from(new Set(artPieces.map(piece => piece.category)))];

    const filteredPieces = selectedCategory === 'All'
        ? artPieces
        : artPieces.filter(piece => piece.category === selectedCategory);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom > 0) {
                const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight * 0.5), 0), 1);
                setScrollProgress(progress);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        cardsRef.current.forEach((card, index) => {
            if (!card) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleCards(prev => new Set([...prev, index]));
                    }
                },
                {
                    threshold: 0.2,
                    rootMargin: "-50px"
                }
            );

            observer.observe(card);
            observers.push(observer);
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, [filteredPieces]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    useEffect(() => {
        setVisibleCards(new Set());
    }, [selectedCategory]);

    return (
        <section
            id="artistry"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">

                <div
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                        opacity: scrollProgress * 0.4,
                        background: `
                            radial-gradient(ellipse 120% 80% at 20% -20%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
                            radial-gradient(ellipse 100% 60% at 80% 120%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
                            radial-gradient(ellipse 80% 100% at -10% 60%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)
                        `
                    }}
                />

                <div
                    className="absolute w-[500px] h-[500px] rounded-full blur-[120px] transition-transform duration-[3000ms] ease-out"
                    style={{
                        top: '10%',
                        left: '5%',
                        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, rgba(147, 51, 234, 0.02) 50%, transparent 70%)',
                        transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
                        opacity: scrollProgress
                    }}
                />

                <div
                    className="absolute w-[400px] h-[400px] rounded-full blur-[100px] transition-transform duration-[2500ms] ease-out"
                    style={{
                        top: '50%',
                        right: '10%',
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.10) 0%, rgba(99, 102, 241, 0.03) 50%, transparent 70%)',
                        transform: `translate(${-mousePosition.x * 0.02}px, ${mousePosition.y * 0.01}px)`,
                        opacity: scrollProgress * 0.8
                    }}
                />

                <div
                    className="absolute w-[300px] h-[300px] rounded-full blur-[80px] transition-transform duration-[2000ms] ease-out"
                    style={{
                        bottom: '20%',
                        left: '30%',
                        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 60%)',
                        transform: `translate(${mousePosition.x * 0.025}px, ${-mousePosition.y * 0.02}px)`,
                        opacity: scrollProgress * 0.6
                    }}
                />

                <div
                    className="absolute w-[800px] h-[800px] rounded-full transition-all duration-700 ease-out"
                    style={{
                        left: mousePosition.x - 400,
                        top: mousePosition.y - 400,
                        background: `radial-gradient(circle, rgba(147, 51, 234, 0.04) 0%, rgba(59, 130, 246, 0.02) 30%, transparent 60%)`,
                        filter: 'blur(60px)',
                        opacity: scrollProgress * 0.5
                    }}
                />

                <div className="absolute inset-0" style={{ opacity: scrollProgress * 0.5 }}>
                    <div className="absolute w-1 h-1 bg-white/60 rounded-full animate-sparkle" style={{ top: '12%', left: '18%', animationDelay: '0s' }} />
                    <div className="absolute w-1.5 h-1.5 bg-purple-300/50 rounded-full animate-sparkle" style={{ top: '28%', right: '25%', animationDelay: '0.5s' }} />
                    <div className="absolute w-1 h-1 bg-blue-300/60 rounded-full animate-sparkle" style={{ top: '45%', left: '12%', animationDelay: '1s' }} />
                    <div className="absolute w-0.5 h-0.5 bg-white/70 rounded-full animate-sparkle" style={{ top: '65%', right: '18%', animationDelay: '1.5s' }} />
                    <div className="absolute w-1 h-1 bg-pink-300/50 rounded-full animate-sparkle" style={{ top: '78%', left: '28%', animationDelay: '2s' }} />
                    <div className="absolute w-1.5 h-1.5 bg-indigo-300/40 rounded-full animate-sparkle" style={{ bottom: '22%', right: '35%', animationDelay: '2.5s' }} />
                    <div className="absolute w-0.5 h-0.5 bg-white/60 rounded-full animate-sparkle" style={{ top: '38%', left: '42%', animationDelay: '0.8s' }} />
                    <div className="absolute w-1 h-1 bg-violet-300/50 rounded-full animate-sparkle" style={{ bottom: '35%', left: '8%', animationDelay: '1.8s' }} />

                    <div className="absolute w-2 h-2 rounded-full bg-purple-500/25 blur-[1px] animate-float" style={{ top: '15%', left: '25%', animationDelay: '0s' }} />
                    <div className="absolute w-3 h-3 rounded-full bg-blue-500/20 blur-[2px] animate-float" style={{ top: '35%', right: '20%', animationDelay: '1s' }} />
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-pink-500/25 blur-[1px] animate-float" style={{ top: '60%', left: '15%', animationDelay: '2s' }} />
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-indigo-500/20 blur-[1px] animate-float" style={{ bottom: '25%', right: '30%', animationDelay: '0.5s' }} />
                    <div className="absolute w-2 h-2 rounded-full bg-blue-400/20 blur-[1px] animate-float" style={{ bottom: '40%', left: '40%', animationDelay: '1.5s' }} />
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-fuchsia-500/25 blur-[1px] animate-float" style={{ top: '70%', right: '45%', animationDelay: '2.5s' }} />
                    <div className="absolute w-3 h-3 rounded-full bg-purple-400/15 blur-[2px] animate-float" style={{ bottom: '15%', left: '55%', animationDelay: '0.8s' }} />

                    <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-purple-400/10 to-transparent animate-drift" style={{ top: '20%', right: '15%', animationDelay: '0s' }} />
                    <div className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-blue-400/10 to-transparent animate-drift" style={{ bottom: '30%', left: '20%', animationDelay: '5s' }} />
                    <div className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-pink-400/8 to-transparent animate-drift" style={{ top: '50%', left: '60%', animationDelay: '10s' }} />
                </div>

                <div
                    className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                />

                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 40%, var(--background) 100%)',
                        opacity: 0.4
                    }}
                />

                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background via-background/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                <div
                    ref={headerRef}
                    className="text-center mb-24 lg:mb-32"
                    style={{
                        opacity: scrollProgress,
                        transform: `translateY(${(1 - scrollProgress) * 60}px) scale(${0.95 + scrollProgress * 0.05})`,
                        transition: 'transform 0.1s ease-out'
                    }}
                >
                    <div className="inline-flex items-center gap-6 mb-10">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent to-foreground/20" />
                        <span className="text-xs font-bold tracking-[0.3em] text-foreground/40 uppercase font-sans">
                            Gallery
                        </span>
                        <div className="w-16 h-px bg-gradient-to-l from-transparent to-foreground/20" />
                    </div>

                    <h2 className="font-sans tracking-tight leading-[0.9] mb-10">
                        <span
                            className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight text-foreground"
                            style={{
                                transform: `translateY(${(1 - scrollProgress) * 20}px)`,
                                opacity: scrollProgress,
                                transition: 'all 0.3s ease-out'
                            }}
                        >
                            Digital
                        </span>
                        <span
                            className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light italic text-foreground/50 mt-2"
                            style={{
                                transform: `translateY(${(1 - scrollProgress) * 40}px)`,
                                opacity: scrollProgress,
                                transition: 'all 0.4s ease-out 0.1s'
                            }}
                        >
                            Artistry
                        </span>
                    </h2>

                    <p
                        className="max-w-xl mx-auto text-base sm:text-lg text-foreground/60 font-light leading-relaxed font-sans"
                        style={{
                            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
                            opacity: scrollProgress * 0.8,
                            transition: 'all 0.5s ease-out 0.2s'
                        }}
                    >
                        A curated collection exploring the intersection of
                        <span className="text-foreground/80 font-normal"> technology</span>,
                        <span className="text-foreground/80 font-normal"> creativity</span>, and
                        <span className="text-foreground/80 font-normal"> visual storytelling</span>.
                    </p>
                </div>

                <div
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16 lg:mb-20"
                    style={{
                        opacity: scrollProgress,
                        transform: `translateY(${(1 - scrollProgress) * 40}px)`,
                        transition: 'all 0.6s ease-out 0.3s'
                    }}
                >
                    {categories.map((category, idx) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`
                                px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium tracking-wider 
                                transition-all duration-400 font-sans uppercase
                                ${selectedCategory === category
                                    ? 'bg-foreground text-background shadow-xl shadow-foreground/10'
                                    : 'bg-accent/50 text-foreground/60 hover:bg-accent hover:text-foreground/80 border border-foreground/5'
                                }
                            `}
                            style={{
                                transitionDelay: `${idx * 50}ms`
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {filteredPieces.map((piece, index) => {
                        const isCardVisible = visibleCards.has(index);

                        return (
                            <div
                                key={`${piece.title}-${selectedCategory}`}
                                ref={el => { cardsRef.current[index] = el; }}
                                className="group"
                                style={{
                                    opacity: isCardVisible ? 1 : 0,
                                    transform: isCardVisible
                                        ? 'translateY(0) scale(1)'
                                        : 'translateY(60px) scale(0.95)',
                                    transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms`
                                }}
                            >
                                <div className="relative bg-card p-3 sm:p-4 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-foreground/5 border border-foreground/5 hover:border-foreground/10 group-hover:-translate-y-3">

                                    <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-foreground/0 group-hover:border-foreground/20 rounded-tl transition-all duration-500" />
                                    <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-foreground/0 group-hover:border-foreground/20 rounded-tr transition-all duration-500" />
                                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-foreground/0 group-hover:border-foreground/20 rounded-bl transition-all duration-500" />
                                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-foreground/0 group-hover:border-foreground/20 rounded-br transition-all duration-500" />

                                    <div className="aspect-[4/5] overflow-hidden rounded-xl bg-accent/50 relative">
                                        <img
                                            src={piece.image}
                                            alt={piece.title}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 border border-white/20">
                                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white transform -rotate-45">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="pt-5 pb-1">
                                        <div className="flex items-start justify-between mb-1.5">
                                            <h3 className="text-lg font-semibold text-foreground leading-tight tracking-tight font-sans group-hover:text-foreground/90 transition-colors">
                                                {piece.title}
                                            </h3>
                                            <span className="text-xs text-foreground/40 font-light ml-3 font-sans tabular-nums">
                                                {piece.year}
                                            </span>
                                        </div>
                                        <p className="text-xs text-foreground/50 font-medium tracking-wider uppercase font-sans">
                                            {piece.category}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div
                    className="text-center mt-24 lg:mt-32"
                    style={{
                        opacity: scrollProgress > 0.5 ? 1 : 0,
                        transform: `translateY(${scrollProgress > 0.5 ? 0 : 20}px)`,
                        transition: 'all 0.6s ease-out'
                    }}
                >
                    <div className="inline-flex items-center gap-6">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-foreground/20" />
                        <span className="text-[10px] font-bold tracking-[0.4em] text-foreground/30 uppercase font-sans">
                            More works in progress
                        </span>
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-foreground/20" />
                    </div>

                    <div className="mt-8">
                        <span className="text-xs font-light tracking-[0.2em] text-foreground/20 font-sans">
                            ARTCODED
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
