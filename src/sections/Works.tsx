import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { projects } from '../data/projects';
import { useCursor } from '../global/cursor/CursorContext';
import { ArrowUpRight } from 'lucide-react';

export function Works() {
    return (
        <section id="works" className="relative bg-black text-white">
            {projects.map((project, index) => (
                <ProjectSection key={index} project={project} index={index} />
            ))}
        </section>
    );
}

function ProjectSection({ project, index }: { project: typeof projects[0]; index: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setCursorText, setCursorVariant } = useCursor();

    // Parallax Logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const springScroll = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
    const y = useTransform(springScroll, [0, 1], ["-10%", "10%"]);

    const handleMouseEnter = () => {
        setCursorText("VIEW");
        setCursorVariant("text");
    };

    const handleMouseLeave = () => {
        setCursorText("");
        setCursorVariant("default");
    };

    return (
        <div
            ref={containerRef}
            className="h-screen w-full relative flex flex-col items-center justify-start overflow-hidden group border-b border-white/5"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Full Screen Parallax Background */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    style={{ y }}
                    className="w-full h-[120%] -top-[10%] relative"
                >
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </div>

            {/* Number Top Left - Massive & Cinematic */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
                <span className="text-[8rem] md:text-[14rem] leading-none font-bold text-white/20 font-sans tracking-tighter select-none mix-blend-overlay">
                    0{index + 1}
                </span>
            </div>

            <div className="absolute top-10 right-8 md:top-16 md:right-16 z-20">
                <span className="text-lg font-mono text-white/80 tracking-widest">{project.year}</span>
            </div>

            {/* Centered Content */}
            <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center pt-32 md:pt-48 gap-8">
                {/* Title */}
                <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase text-center text-white drop-shadow-2xl opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_forwards]">
                    {project.title}
                </h2>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-3 opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
                    {project.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs uppercase font-mono tracking-widest text-white/90 hover:bg-white/20 transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <p className="text-white/80 text-lg md:text-xl max-w-2xl text-center font-light leading-relaxed drop-shadow-lg opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
                    {project.description}
                </p>
            </div>

            <div className="absolute bottom-12 right-12 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <button className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                    <span>View Case</span>
                    <ArrowUpRight className="w-5 h-5" />
                </button>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}
