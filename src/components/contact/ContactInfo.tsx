import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../global/overlay/themeOverlay/RippleContext';
import { useCursor } from '../../global/cursor';

export function ContactInfo() {
    const { theme } = useTheme();
    const { setCursorText, setCursorVariant } = useCursor();
    const isArtMode = theme === 'dark';

    const socials = [
        { label: 'GITHUB', value: '@johnrobert', href: 'https://github.com/johnrobert' },
        { label: 'LINKEDIN', value: 'in/johnrobert', href: 'https://linkedin.com/in/johnrobert' },
        { label: 'TWITTER', value: '@johnrobert', href: 'https://twitter.com/johnrobert' },
        { label: 'EMAIL', value: 'hello@example.com', href: 'mailto:hello@example.com' }
    ];

    return (
        <div className={`grid grid-cols-2 md:grid-cols-4 w-full border-t border-b ${isArtMode ? 'border-white/20' : 'border-black/20'}`}>
            {socials.map((item, index) => (
                <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => {
                        setCursorText("VISIT");
                        setCursorVariant("text");
                    }}
                    onMouseLeave={() => {
                        setCursorText("");
                        setCursorVariant("default");
                    }}
                    className={`group relative flex flex-col justify-between p-6 md:p-8 border-r last:border-r-0 overflow-hidden transition-colors duration-300
                    ${isArtMode ? 'border-white/20 text-white' : 'border-black/20 text-black'}`}
                >
                    {/* Hover Fill Effect */}
                    <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] z-0
                        ${isArtMode ? 'bg-white' : 'bg-black'}`} />

                    <div className="relative z-10 flex justify-between items-start mb-4">
                        <span className={`text-[10px] font-mono opacity-50 transition-colors duration-300 ${isArtMode ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                            0{index + 1}
                        </span>
                        <ArrowUpRight className={`w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 
                            ${isArtMode ? 'group-hover:text-black' : 'group-hover:text-white'}`} />
                    </div>

                    <div className="relative z-10">
                        <span className={`block text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${isArtMode ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                            {item.label}
                        </span>
                        <span className={`block text-[10px] font-mono mt-1 opacity-50 transition-colors duration-300 ${isArtMode ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                            {item.value}
                        </span>
                    </div>
                </motion.a>
            ))}
        </div>
    );
}
