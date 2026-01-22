import { useParams, useNavigate, Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { ArtCodedCaseStudy } from './artcoded/ArtCodedCaseStudy';

// Map of custom case study components by slug
const customCaseStudies: Record<string, React.ComponentType> = {
    'artcoded-portfolio': ArtCodedCaseStudy,
    // Add more custom case studies here as you create them
    // 'barnstone-portfolio': BarnStoneCaseStudy,
};

export function ProjectCaseStudy() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    // Check if there's a custom case study for this slug
    const CustomComponent = slug ? customCaseStudies[slug] : null;
    
    // If custom component exists, render it instead
    if (CustomComponent) {
        return <CustomComponent />;
    }

    const project = projects.find(p => p.slug === slug);

    if (!project) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link
                        to="/"
                        className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header with Back Button */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
            >
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm uppercase tracking-wider">Back</span>
                    </button>
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
                        src={project.image}
                        alt={project.title}
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
                            {project.category}
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-8">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {project.tags.map((tag, i) => (
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
                            <p className="text-lg text-white/70 leading-relaxed">
                                This is a placeholder for your case study content. Replace this section with your actual project details,
                                challenges, solutions, and outcomes. You can add images, videos, code snippets, and more to showcase your work.
                            </p>
                        </div>

                        {/* Challenge */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Challenge</h2>
                            <p className="text-lg text-white/70 leading-relaxed">
                                Describe the problem you were solving, the constraints you faced, and what made this project interesting or challenging.
                            </p>
                        </div>

                        {/* Solution */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Solution</h2>
                            <p className="text-lg text-white/70 leading-relaxed">
                                Explain your approach, the technologies you chose, and why. Include key features and innovations.
                            </p>
                        </div>

                        {/* Results */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Results & Impact</h2>
                            <p className="text-lg text-white/70 leading-relaxed">
                                Share the outcomes, metrics, user feedback, or any measurable impact your project had.
                            </p>
                        </div>

                        {/* Project Info */}
                        <div className="border-t border-white/10 pt-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div>
                                    <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">Year</h3>
                                    <p className="text-xl font-semibold">{project.year}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">Category</h3>
                                    <p className="text-xl font-semibold">{project.category}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">Technologies</h3>
                                    <p className="text-xl font-semibold">{project.tags.join(', ')}</p>
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
