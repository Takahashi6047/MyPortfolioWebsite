import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { useTheme } from '../../global/overlay/themeOverlay/RippleContext';

export function ContactInfo() {
    const { theme } = useTheme();
    const isArtMode = theme === 'dark';

    const socials = [
        { label: 'GitHub', icon: Github, href: 'https://github.com', value: '@johnrobert' },
        { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', value: 'in/johnrobert' },
        { label: 'Twitter', icon: Twitter, href: 'https://twitter.com', value: '@johnrobert' },
        { label: 'Email', icon: Mail, href: 'mailto:hello@example.com', value: 'hello@example.com' },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {socials.map((item, index) => (
                <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`group relative p-6 border ${isArtMode ? 'border-white/10 hover:border-[var(--art-accent)]' : 'border-black/10 hover:border-blue-500'} bg-card/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1`}
                >
                    <div className="flex justify-between items-start mb-4">
                        <item.icon className={`w-5 h-5 ${isArtMode ? 'text-white/60 group-hover:text-[var(--art-accent)]' : 'text-black/60 group-hover:text-blue-500'} transition-colors`} />
                        <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${isArtMode ? 'text-[var(--art-accent)]' : 'text-blue-500'}`} />
                    </div>

                    <div className="space-y-1">
                        <span className={`text-xs font-mono uppercase tracking-wider ${isArtMode ? 'text-white/40' : 'text-black/40'}`}>
                            {item.label}
                        </span>
                        <div className={`font-sans font-medium ${isArtMode ? 'text-white/90 group-hover:text-white' : 'text-black/90 group-hover:text-black'}`}>
                            {item.value}
                        </div>
                    </div>

                    {/* Corner Accent */}
                    <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${isArtMode ? 'border-[var(--art-accent)]' : 'border-blue-500'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </motion.a>
            ))}
        </div>
    );
}
