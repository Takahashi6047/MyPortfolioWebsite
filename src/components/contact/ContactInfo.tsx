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
        <div className="flex flex-col md:flex-row justify-between w-full border-t border-b py-8 gap-8 md:gap-0 h-auto min-h-0 border-current opacity-20 hover:opacity-100 transition-opacity duration-500">
            {socials.map((item, index) => (
                <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative flex flex-col gap-2"
                >
                    <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold font-mono uppercase tracking-widest ${isArtMode ? 'text-[var(--art-accent)]' : 'text-blue-600'}`}>
                            0{index + 1}
                        </span>
                        <span className={`text-xs font-mono uppercase tracking-wider ${isArtMode ? 'text-white/40 group-hover:text-white' : 'text-black/40 group-hover:text-black'} transition-colors`}>
                            {item.label}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`text-lg md:text-xl font-sans font-medium ${isArtMode ? 'text-white/80 group-hover:text-white' : 'text-black/80 group-hover:text-black'} transition-colors`}>
                            {item.value}
                        </span>
                        <ArrowUpRight className={`w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${isArtMode ? 'text-[var(--art-accent)]' : 'text-blue-600'}`} />
                    </div>
                </motion.a>
            ))}
        </div>
    );
}
