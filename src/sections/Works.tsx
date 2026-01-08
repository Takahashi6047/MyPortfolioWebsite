import React, { useState, useRef, useEffect } from 'react';
import { ProjectCard } from '../components/works/ProjectCard';
import { projects } from '../data/projects';

export function Works() {

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
                    <span className="text-[10px] font-bold tracking-[0.3em] text-foreground/40 uppercase block font-sans">Selected Works</span>
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
                        <span className="text-xs font-bold tracking-[0.3em] text-foreground/40 uppercase mb-12 block font-sans">Selected Works</span>

                        {/* Counter */}
                        <div className="text-lg font-light font-sans mb-4 text-foreground/50 tracking-wider">
                            <span className="text-foreground/80 font-medium">0{activeIndex + 1}</span>
                            <span className="mx-2 text-foreground/30">/</span>
                            <span>0{projects.length}</span>
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
                                        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight font-sans leading-[1.05]">
                                            {project.title.split(' ').map((word, i) => (
                                                <span key={i} className="block">{word}</span>
                                            ))}
                                        </h1>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Category & Year */}
                        <div className="flex items-center gap-4 mb-8 text-foreground/50 text-sm uppercase tracking-[0.2em] border-b border-foreground/8 pb-4 font-sans font-medium">
                            <span>{projects[activeIndex].category}</span>
                            <span className="w-1 h-1 rounded-full bg-foreground/30" />
                            <span className="tabular-nums">{projects[activeIndex].year}</span>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-foreground/70 font-light leading-relaxed mb-8 min-h-[5rem] transition-all duration-500 font-sans">
                            {projects[activeIndex].description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {projects[activeIndex].tags.map((tag, i) => (
                                <span key={i} className="px-4 py-2 text-xs font-medium tracking-wider uppercase bg-accent/40 text-foreground/70 rounded-full font-sans border border-foreground/5 hover:border-foreground/15 hover:bg-accent/60 transition-all duration-300">
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
