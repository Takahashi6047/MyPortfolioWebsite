import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../global/overlay/themeOverlay/RippleContext';
import { ArrowUpRight } from 'lucide-react';

export function Services() {
    const { theme } = useTheme();
    const isArtMode = theme === 'dark';
    const [hoveredService, setHoveredService] = useState<string | null>(null);

    const services = [
        {
            id: '01',
            title: 'WEB APPLICATION',
            subtitle: 'DEVELOPMENT',
            description: 'Engineering scalable, pixel-perfect web applications with modern frameworks. Focusing on performance, accessibility, and seamless user experiences.',
            tags: ['React', 'Next.js', 'Typescript', 'Tailwind']
        },
        {
            id: '02',
            title: 'BACKEND',
            subtitle: 'ARCHITECTURE',
            description: 'Designing robust server-side systems and efficient database structures. Creating secure APIs and managing complex data flows.',
            tags: ['Node.js', 'Laravel', 'PostgreSQL', 'REST API']
        },
        {
            id: '03',
            title: 'UI/UX & VISUAL',
            subtitle: 'DESIGN',
            description: 'Crafting immersive digital interfaces that blend aesthetics with functionality. Delivering distinctive brand identities and fluid interactive prototypes.',
            tags: ['Figma', 'Prototyping', 'Motion', 'Brand Identity']
        }
    ];

    return (
        <section id="services" className={`relative py-20 px-4 sm:px-6 md:px-8 transition-colors duration-500 overflow-hidden ${isArtMode ? 'bg-black text-white' : 'bg-neutral-50 text-neutral-900'}`}>

            <div className="max-w-[1600px] mx-auto relative z-10">
                {/* Section Header - Editorial Style */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-16 pl-2 md:pl-0 border-l-2 md:border-l-0 border-current/20 md:border-transparent"
                >
                    <span className={`block text-[10px] font-mono tracking-[0.3em] mb-4 uppercase ${isArtMode ? 'text-[var(--art-accent)]' : 'text-blue-600'}`}>
                        ( Capabilities )
                    </span>
                    <h2 className="text-[12vw] md:text-[8vw] leading-[0.85] font-black tracking-tighter uppercase whitespace-nowrap opacity-10 select-none absolute top-0 right-0 -z-10 bg-gradient-to-b from-current to-transparent bg-clip-text text-transparent pointer-events-none">
                        SERVICES
                    </h2>
                </motion.div>

                {/* Interactive List Layout */}
                <div className="flex flex-col">
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            onMouseEnter={() => setHoveredService(service.id)}
                            onMouseLeave={() => setHoveredService(null)}
                            onClick={() => setHoveredService(hoveredService === service.id ? null : service.id)}
                            className={`group relative border-t py-8 sm:py-12 md:py-16 transition-colors duration-500 cursor-pointer md:cursor-none
                                ${isArtMode ? 'border-white/10 hover:border-white/40' : 'border-black/10 hover:border-black/40'}
                            `}
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline relative z-10 pointer-events-none md:pointer-events-auto">
                                {/* Running Number */}
                                <span className={`font-mono text-[10px] md:text-sm tracking-widest mr-8 md:mr-16 mb-2 md:mb-0 transition-colors duration-300
                                    ${isArtMode
                                        ? (hoveredService === service.id ? 'text-[var(--art-accent)]' : 'text-neutral-600')
                                        : (hoveredService === service.id ? 'text-blue-600' : 'text-neutral-400')}
                                `}>
                                    /{service.id}
                                </span>

                                {/* Main Title Group */}
                                <div className="flex-1">
                                    <h3 className={`text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase transition-all duration-500 origin-left
                                        ${hoveredService && hoveredService !== service.id ? 'opacity-20 blur-[2px]' : 'opacity-100'}
                                    `}>
                                        {/* Split text for hover effect styling */}
                                        <span className="block md:inline-block">{service.title}</span>
                                        <span className={`block md:inline-block md:ml-4 italic font-serif font-light transition-colors duration-300
                                            ${isArtMode
                                                ? (hoveredService === service.id ? 'text-[var(--art-accent)]' : 'text-neutral-500')
                                                : (hoveredService === service.id ? 'text-blue-600' : 'text-neutral-400')}
                                        `}>
                                            {service.subtitle}
                                        </span>
                                    </h3>
                                </div>

                                {/* Link Icon */}
                                <div className={`hidden md:block transition-transform duration-500 ${hoveredService === service.id ? 'rotate-45 scale-125' : 'rotate-0'}`}>
                                    <ArrowUpRight size={48} strokeWidth={1} className={isArtMode ? 'text-white' : 'text-black'} />
                                </div>
                                {/* Mobile Arrow */}
                                <div className={`block md:hidden absolute top-0 right-0 transition-transform duration-500 ${hoveredService === service.id ? 'rotate-90' : 'rotate-0'}`}>
                                    <ArrowUpRight size={24} className={isArtMode ? 'text-white/50' : 'text-black/50'} />
                                </div>
                            </div>

                            {/* Expanded Content */}
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                    height: hoveredService === service.id ? 'auto' : 0,
                                    opacity: hoveredService === service.id ? 1 : 0
                                }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="pt-6 md:pt-12 md:pl-[120px] lg:pl-[140px] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                                    <p className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-xl ${isArtMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                        {service.description}
                                    </p>

                                    <div className="flex flex-wrap content-start gap-2 md:gap-3">
                                        {service.tags.map((tag) => (
                                            <span key={tag} className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-sm tracking-wider uppercase border
                                                ${isArtMode
                                                    ? 'border-white/20 text-white/80 bg-white/5'
                                                    : 'border-black/10 text-neutral-800 bg-black/5'}
                                            `}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}

                    {/* Final Border */}
                    <div className={`w-full h-[1px] ${isArtMode ? 'bg-white/10' : 'bg-black/10'}`} />
                </div>
            </div>
        </section>
    );
}
