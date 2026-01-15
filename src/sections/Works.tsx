import React, { useState, useRef, useEffect } from 'react';
import { projects } from '../data/projects';
import { useCursor } from '../global/cursor/CursorContext';

export function Works() {
    const { setCursorText, setCursorVariant } = useCursor();
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

    const handleProjectEnter = () => {
        setCursorText("VIEW CASE");
        setCursorVariant("text");
    };

    const handleProjectLeave = () => {
        setCursorText("");
        setCursorVariant("default");
    };

    return (
        <section
            id="works"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative bg-background text-foreground"
        >
            <div className="block lg:hidden py-10 px-4 relative overflow-hidden">

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.05]"
                        style={{
                            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                            backgroundSize: '30px 30px',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                </div>

                <div className="absolute left-5 top-0 bottom-0 w-[1px] bg-gradient-to-b from-foreground/5 via-foreground/20 to-foreground/5" />

                {/* Section Header */}
                <div className="relative pl-10 mb-12 pt-4">
                    <div className="absolute left-5 top-[1.6rem] w-4 h-[1px] bg-foreground/30" />
                    <span className="text-[10px] font-bold tracking-[0.3em] text-foreground/40 uppercase font-mono block">
                        System.Gallery
                    </span>
                </div>

                <div className="flex flex-col gap-16 pl-9 relative">
                    {projects.map((project, index) => (
                        <div key={index} className="flex flex-col gap-5 group">
                            <div className="flex flex-col gap-1 relative">
                                <div className="absolute -left-[1.35rem] top-2 w-1.5 h-1.5 rounded-full border border-foreground/30 bg-background z-10" />

                                <div className="flex items-baseline gap-3 text-foreground/30 font-mono text-xs tracking-widest mb-1">
                                    <span className="text-foreground/80 font-sans text-base">0{index + 1}</span>
                                    <span className="h-[1px] w-8 bg-foreground/10" />
                                    <span>0{projects.length}</span>
                                </div>

                                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter font-sans leading-[1.0] text-foreground">
                                    {project.title}
                                </h2>
                            </div>

                            {/* Mobile Image Card */}
                            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-foreground/5">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />

                                {/* Overlay Info on Image */}
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full bg-black/40 backdrop-blur-md">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        <span className="text-[9px] font-bold tracking-[0.2em] text-white/90 uppercase font-sans">
                                            {project.category}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono text-white/60 tracking-wider bg-black/40 px-2 py-1 rounded backdrop-blur-md border border-white/10">
                                        {project.year}
                                    </span>
                                </div>
                            </div>

                            {/* Mobile Description & Tech */}
                            <div className="pl-0 border-t border-foreground/5 pt-4">
                                <p className="text-sm text-foreground/70 font-light leading-relaxed mb-4 font-sans line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-x-3 gap-y-2 text-[9px] font-mono text-foreground/40 uppercase tracking-widest">
                                    {projects[activeIndex].tags.slice(0, 3).map((tag, i) => (
                                        <span key={i}>/{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop View (Split Sticky Layout) */}
            <div className="hidden lg:flex flex-row w-full relative">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.05]"
                        style={{
                            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                </div>

                <div className="w-1/2 h-screen sticky top-0 flex flex-col justify-center px-12 md:px-20 py-20 bg-transparent z-10">

                    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                        <div
                            className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/20 blur-[100px] transition-transform duration-1000 ease-out"
                            style={{
                                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                            }}
                        />
                    </div>

                    <div className="max-w-xl ml-auto mr-8 relative pl-8">
                        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-foreground/10 via-foreground/20 to-transparent" />

                        {/* Tech Header Line */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[1px] w-8 bg-foreground/30 relative">
                                <span className="absolute -left-1 -top-[3px] w-[7px] h-[7px] border border-foreground/50 rounded-full bg-background" />
                            </div>
                            <span className="text-xs font-bold tracking-[0.3em] text-foreground/40 uppercase font-mono">
                                System.Gallery
                            </span>
                        </div>

                        {/* Interactive Counter with Progress Bar */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-5xl font-light font-sans text-foreground">
                                0{activeIndex + 1}
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-foreground/40 font-mono tracking-wider">INDEX</span>
                                <div className="w-48 h-[2px] bg-foreground/10 relative overflow-hidden">
                                    <div
                                        className="absolute inset-y-0 left-0 bg-foreground/80 transition-all duration-500 ease-out"
                                        style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div className="text-xl font-light text-foreground/30 ml-2">
                                / 0{projects.length}
                            </div>
                        </div>

                        {/* Title Wrapper */}
                        <div className="relative mb-6 min-h-[12rem] pointer-events-none">
                            {projects.map((project, idx) => (
                                <div
                                    key={idx}
                                    className={`absolute top-0 left-0 transition-all duration-700 ease-out ${activeIndex === idx
                                        ? 'opacity-100 transform translate-y-0'
                                        : 'opacity-0 transform translate-y-8 pointer-events-none'
                                        }`}
                                >
                                    <h1 className="text-6xl xl:text-7xl font-semibold tracking-tighter font-sans leading-[0.95]">
                                        {project.title.split(' ').map((word, i) => (
                                            <span key={i} className="block">{word}</span>
                                        ))}
                                    </h1>
                                </div>
                            ))}
                        </div>

                        {/* Category Tag */}
                        <div className="inline-flex items-center gap-3 px-4 py-2 border border-foreground/10 rounded-full bg-background/50 backdrop-blur-sm mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-xs font-bold tracking-[0.2em] text-foreground/70 uppercase font-sans">
                                {projects[activeIndex].category} — {projects[activeIndex].year}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-xl text-foreground/70 font-light leading-relaxed mb-8 min-h-[5rem] font-sans max-w-lg">
                            {projects[activeIndex].description}
                        </p>

                        {/* Tech Stack - Cyberpunk style */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-foreground/40 uppercase tracking-widest border-t border-foreground/10 pt-6">
                            {projects[activeIndex].tags.map((tag, i) => (
                                <span key={i} className="hover:text-foreground/80 transition-colors cursor-default">
                                    /{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Scrolling Images */}
                <div className="w-full lg:w-1/2 bg-transparent relative z-10" ref={rightColumnRef}>
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            data-index={index}
                            className="project-item min-h-screen w-full flex items-center justify-center p-12 xl:p-24"
                        >
                            <div
                                className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl group cursor-none"
                                onMouseEnter={handleProjectEnter}
                                onMouseLeave={handleProjectLeave}
                            >
                                <div className={`absolute inset-0 z-30 pointer-events-none border-[1px] border-white/10 transition-all duration-500 rounded-[2rem] ${activeIndex === index ? 'opacity-100 ring-1 ring-white/20' : 'opacity-0'}`} />

                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                <div className={`absolute bottom-8 right-8 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all duration-500 ${activeIndex === index ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-10 rotate-45'}`}>
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
