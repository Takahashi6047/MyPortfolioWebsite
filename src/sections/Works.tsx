import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    // Parallax Logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const hasCaseStudy = !!project.slug;

    const handleMouseEnter = () => {
        if (hasCaseStudy) {
            setCursorText("VIEW");
            setCursorVariant("text");
        } else {
            setCursorText("COMING SOON");
            setCursorVariant("text");
        }
    };

    const handleMouseLeave = () => {
        setCursorText("");
        setCursorVariant("default");
    };

    const handleClick = () => {
        if (hasCaseStudy && project.slug) {
            navigate(`/projects/${project.slug}`);
        }
    };

    return (
        <div
            ref={containerRef}
            className={`h-screen w-full relative flex flex-col items-center justify-center overflow-hidden group border-b border-white/5 ${hasCaseStudy ? 'cursor-pointer' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {/* Full Screen Parallax Background */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    style={{ y }}
                    className="w-full h-[120%] -top-[10%] relative"
                >
                    <div className="absolute inset-0 bg-black/60 z-10" /> {/* Darker overlay for better readability */}
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </div>

            {/* Number Top Left - Smaller & Neater */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
                <span className="text-4xl md:text-7xl font-sans font-bold text-white/30 tracking-tighter select-none">
                    0{index + 1}
                </span>
            </div>

            <div className="absolute top-10 right-8 md:top-12 md:right-12 z-20">
                <span className="text-xs font-mono text-white/60 tracking-widest bg-white/5 px-2 py-1 rounded border border-white/10">
                    {project.year}
                </span>
            </div>

            {/* Centered Content - Scaled Down for Modern Look */}
            <div className="relative z-20 container mx-auto px-6 h-full flex flex-col items-center justify-center gap-6 md:gap-8">
                {/* Title */}
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-center text-white drop-shadow-lg max-w-4xl leading-tight opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_forwards]">
                    {project.title}
                </h2>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
                    {project.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-white/5 backdrop-blur-sm border border-white/15 rounded-full text-[10px] md:text-xs uppercase font-mono tracking-widest text-white/80 hover:bg-white/10 transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <p className="text-white/70 text-sm md:text-base max-w-lg text-center font-light leading-relaxed drop-shadow opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
                    {project.description}
                </p>
            </div>

            <div className="absolute bottom-12 right-12 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <button className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/20 font-medium text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    <span>View Case</span>
                    <ArrowUpRight className="w-4 h-4" />
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
