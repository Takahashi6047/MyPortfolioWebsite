import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ArtCoded Portfolio Case Study
 * 
 * This is an example of a dedicated case study page for a specific project.
 * You can create similar files for other projects and customize the content.
 */
export function ArtCodedCaseStudy() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header with Back Button */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
            >
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm uppercase tracking-wider">Back</span>
                    </Link>
                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                        Case Study
                    </span>
                </div>
            </motion.header>

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
                    <img
                        src="/assets/projects/artcoded/hero.png"
                        alt="ArtCoded Portfolio"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="relative z-20 container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs uppercase tracking-widest mb-6">
                            Portfolio
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                            ArtCoded Portfolio
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-8">
                            A modern, interactive portfolio showcasing the perfect blend of development expertise and artistic vision.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {['React', 'Vite', 'Tailwind', 'Framer Motion'].map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/15 rounded-full text-sm uppercase font-mono tracking-wider text-white/80"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs uppercase tracking-widest text-white/40">Scroll</span>
                        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
                    </div>
                </motion.div>
            </motion.section>

            {/* Case Study Content */}
            <section className="relative bg-black py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-16"
                    >
                        {/* Overview */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Overview</h2>
                            <p className="text-lg text-white/70 leading-relaxed mb-4">
                                The ArtCoded Portfolio represents a unique fusion of technical excellence and artistic expression.
                                This project was designed to showcase both development skills and creative vision through an
                                immersive, interactive experience.
                            </p>
                            <p className="text-lg text-white/70 leading-relaxed">
                                The portfolio features a dual-mode interface that seamlessly transitions between "Dev Mode" and
                                "Art Mode," allowing visitors to experience different facets of the creator's personality and expertise.
                            </p>
                        </div>

                        {/* Challenge */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Challenge</h2>
                            <p className="text-lg text-white/70 leading-relaxed mb-4">
                                Creating a portfolio that stands out in a saturated market while effectively communicating both
                                technical proficiency and artistic sensibility presented several challenges:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-lg text-white/70">
                                <li>Balancing aesthetic appeal with performance optimization</li>
                                <li>Creating smooth, engaging animations without sacrificing load times</li>
                                <li>Implementing a theme-switching system that feels natural and purposeful</li>
                                <li>Ensuring responsive design across all devices while maintaining visual impact</li>
                            </ul>
                        </div>

                        {/* Solution */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Solution</h2>
                            <p className="text-lg text-white/70 leading-relaxed mb-4">
                                The solution involved leveraging modern web technologies to create a performant yet visually
                                stunning experience:
                            </p>
                            <div className="space-y-4">
                                <div className="border-l-2 border-blue-400/30 pl-6">
                                    <h3 className="text-xl font-semibold mb-2">React + Vite</h3>
                                    <p className="text-white/60">
                                        Utilized Vite's lightning-fast build system and React's component architecture for optimal
                                        development experience and runtime performance.
                                    </p>
                                </div>
                                <div className="border-l-2 border-blue-400/30 pl-6">
                                    <h3 className="text-xl font-semibold mb-2">Framer Motion</h3>
                                    <p className="text-white/60">
                                        Implemented sophisticated scroll-based animations and page transitions using Framer Motion's
                                        declarative API, ensuring smooth 60fps animations.
                                    </p>
                                </div>
                                <div className="border-l-2 border-blue-400/30 pl-6">
                                    <h3 className="text-xl font-semibold mb-2">Custom Cursor System</h3>
                                    <p className="text-white/60">
                                        Developed a context-aware custom cursor that provides visual feedback and enhances the
                                        interactive experience throughout the site.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Key Features</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                                    <h3 className="text-xl font-semibold mb-3">Dual Theme System</h3>
                                    <p className="text-white/60">
                                        Seamless transition between Dev and Art modes with ripple animation effects.
                                    </p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                                    <h3 className="text-xl font-semibold mb-3">Particle Background</h3>
                                    <p className="text-white/60">
                                        Dynamic particle system that responds to theme changes and user interactions.
                                    </p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                                    <h3 className="text-xl font-semibold mb-3">Parallax Scrolling</h3>
                                    <p className="text-white/60">
                                        Cinematic full-screen project showcases with smooth parallax effects.
                                    </p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                                    <h3 className="text-xl font-semibold mb-3">Responsive Design</h3>
                                    <p className="text-white/60">
                                        Fully optimized experience across desktop, tablet, and mobile devices.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Results & Impact</h2>
                            <p className="text-lg text-white/70 leading-relaxed mb-6">
                                The ArtCoded Portfolio successfully demonstrates the intersection of technical skill and creative
                                vision, resulting in:
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-400/20 rounded-lg">
                                    <div className="text-4xl font-bold text-blue-400 mb-2">95+</div>
                                    <div className="text-sm text-white/60 uppercase tracking-wider">Lighthouse Score</div>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-400/20 rounded-lg">
                                    <div className="text-4xl font-bold text-blue-400 mb-2">&lt;2s</div>
                                    <div className="text-sm text-white/60 uppercase tracking-wider">Load Time</div>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-400/20 rounded-lg">
                                    <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
                                    <div className="text-sm text-white/60 uppercase tracking-wider">Responsive</div>
                                </div>
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="border-t border-white/10 pt-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div>
                                    <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">Year</h3>
                                    <p className="text-xl font-semibold">2026</p>
                                </div>
                                <div>
                                    <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">Category</h3>
                                    <p className="text-xl font-semibold">Portfolio</p>
                                </div>
                                <div>
                                    <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">Technologies</h3>
                                    <p className="text-xl font-semibold">React, Vite, Tailwind, Framer Motion</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="relative bg-black border-t border-white/10 py-16">
                <div className="container mx-auto px-6 text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-widest hover:bg-white/90 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to All Projects
                    </Link>
                </div>
            </section>
        </div>
    );
}
