import React, { useState, useRef, useEffect } from 'react';
import { ProjectCard } from '../components/works/ProjectCard';

export function Works() {
    const projects = [
        {
            title: "FinTech Dashboard",
            category: "Web Application",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
            description: "A comprehensive financial data visualization platform with real-time analytics and predictive modeling.",
            tags: ["React", "TypeScript", "D3.js", "Node.js"],
            year: "2024"
        },
        {
            title: "Neon Commerce",
            category: "E-Commerce",
            image: "https://images.unsplash.com/photo-1555421689-492a80695629?q=80&w=2670&auto=format&fit=crop",
            description: "Modern e-commerce solution featuring 3D product previews and AI-driven recommendations.",
            tags: ["Next.js", "Three.js", "Stripe", "Tailwind"],
            year: "2023"
        },
        {
            title: "Cyber Security Hub",
            category: "Enterprise Security",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
            description: "Advanced threat detection interface for enterprise networks with automated response systems.",
            tags: ["Vue.js", "Python", "WebSockets", "Docker"],
            year: "2023"
        },
        {
            title: "Smart City Grid",
            category: "Infrastructure",
            image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2669&auto=format&fit=crop",
            description: "IoT connectivity platform for managing smart city infrastructure and energy consumption.",
            tags: ["Go", "GraphQL", "PostgreSQL", "Flutter"],
            year: "2022"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const rightColumnRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        setActiveIndex(index);
                    }
                });
            },
            {
                threshold: 0.5,
                rootMargin: "-20% 0px -20% 0px"
            }
        );

        const projectElements = document.querySelectorAll('.project-item');
        projectElements.forEach((el) => observer.observe(el));

        return () => {
            projectElements.forEach((el) => observer.unobserve(el));
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
            id="works"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative bg-background text-foreground"
        >
            {/* Mobile View (Original Grid Layout) */}
            <div className="block lg:hidden py-16 px-4 sm:px-6 relative">
                {/* Grid background for mobile */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.08]"
                        style={{
                            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                            backgroundSize: '30px 30px',
                        }}
                    />
                    {/* Faded edges */}
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
                </div>

                <div className="mb-10 relative z-10">
                    <span className="text-xs font-bold tracking-widest text-foreground/50 uppercase block font-sans">Selected Works</span>
                </div>
                <div className="grid grid-cols-1 gap-6 relative z-10">
                    {projects.map((project, index) => (
                        <div key={index}>
                            <ProjectCard {...project} index={index} total={projects.length} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop View (Split Sticky Layout) */}
            <div className="hidden lg:flex flex-row w-full relative">
                {/* Full-width grid background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.08]"
                        style={{
                            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                        }}
                    />
                    {/* Faded edges - top, bottom, left, right */}
                    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
                </div>

                {/* Left Column - Sticky Content */}
                <div className="w-1/2 h-screen sticky top-0 flex flex-col justify-center px-12 md:px-20 py-20 bg-transparent z-10 transition-colors duration-300">

                    {/* Background Decorative Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                        <div
                            className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent/30 blur-[80px] transition-transform duration-1000 ease-out"
                            style={{
                                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                            }}
                        />
                    </div>

                    <div className="max-w-xl ml-auto mr-8">
                        <span className="text-sm font-bold tracking-widest text-foreground/50 uppercase mb-12 block font-sans">Selected Works</span>

                        {/* Counter */}
                        <div className="text-xl font-mono mb-4 text-foreground/80">
                            0{activeIndex + 1} / 0{projects.length}
                        </div>

                        {/* Title Wrapper */}
                        <div className="relative mb-6 pointer-events-none">
                            {projects.map((project, idx) => {
                                const wordCount = project.title.split(' ').length;
                                const heightClass = wordCount <= 2 ? 'min-h-[10rem]' : wordCount === 3 ? 'min-h-[14rem]' : 'min-h-[18rem]';
                                return (
                                    <div
                                        key={idx}
                                        className={`${activeIndex === idx ? 'relative' : 'absolute top-0 left-0'} ${heightClass} transition-opacity duration-700 ease-out ${activeIndex === idx
                                            ? 'opacity-100'
                                            : 'opacity-0 pointer-events-none'
                                            }`}
                                    >
                                        <h1 className="text-6xl xl:text-7xl font-bold tracking-tight font-sans leading-[1.1]">
                                            {project.title.split(' ').map((word, i) => (
                                                <span key={i} className="block">{word}</span>
                                            ))}
                                        </h1>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Category & Year */}
                        <div className="flex items-center gap-4 mb-8 text-foreground/60 text-lg uppercase tracking-widest border-b border-foreground/10 pb-4 font-sans">
                            <span>{projects[activeIndex].category}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
                            <span>{projects[activeIndex].year}</span>
                        </div>

                        {/* Description */}
                        <p className="text-xl text-foreground/80 font-light leading-relaxed mb-8 h-24 transition-opacity duration-500 font-sans">
                            {projects[activeIndex].description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {projects[activeIndex].tags.map((tag, i) => (
                                <span key={i} className="px-4 py-2 text-sm bg-accent/50 text-foreground/90 rounded-full font-sans border border-transparent hover:border-foreground/20 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Scrolling Images */}
                <div className="w-full lg:w-1/2 bg-transparent transition-colors duration-300 relative z-10" ref={rightColumnRef}>
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            data-index={index}
                            className="project-item min-h-screen w-full flex items-center justify-center p-20"
                        >
                            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                                <div className={`absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all duration-300 ${activeIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white transform -rotate-45">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
