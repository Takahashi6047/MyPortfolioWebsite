import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../global/overlay/themeOverlay/RippleContext';
import { useCursor } from '../../global/cursor';

export function ContactInfo() {
    const { theme } = useTheme();
    const { setCursorText, setCursorVariant } = useCursor();
    const isArtMode = theme === 'dark';

    const socials = [
        { label: 'GITHUB', value: '@Takahashi6047', href: 'https://github.com/Takahashi6047' },
        { label: 'LINKEDIN', value: 'in/artcoded', href: 'https://www.linkedin.com/in/john-robert-adlawan-6187443a6' },
        { label: 'INSTAGRAM', value: '@artcodedddd', href: 'https://www.instagram.com/artcodedddd/' },
        { label: 'EMAIL', value: 'hello.artcoded@gmail.com', href: 'mailto:hello.artcoded@gmail.com' }
    ];

    return (
        <div className={`grid grid-cols-2 md:grid-cols-4 w-full border-t border-b ${isArtMode ? 'border-white/30' : 'border-black/30'}`}>
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
                    className={`group relative flex flex-col justify-between p-4 sm:p-6 md:p-8 md:border-r md:last:border-r-0 overflow-hidden transition-colors duration-300
                    ${index < 2 ? 'border-b md:border-b-0' : ''}
                    ${isArtMode ? 'border-white/30 text-white' : 'border-black/30 text-black'}`}
                >
                    {/* Hover Fill Effect */}
                    <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] z-0
                        ${isArtMode ? 'bg-white' : 'bg-black'}`} />

                    <div className="relative z-10 flex justify-between items-start mb-3 sm:mb-4">
                        <span className={`text-[9px] sm:text-[10px] font-mono opacity-50 transition-colors duration-300 ${isArtMode ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                            0{index + 1}
                        </span>
                        <ArrowUpRight className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 
                            ${isArtMode ? 'group-hover:text-black' : 'group-hover:text-white'}`} />
                    </div>

                    <div className="relative z-10">
                        <span className={`block text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase transition-colors duration-300 ${isArtMode ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                            {item.label}
                        </span>
                        <span className={`block text-[8px] sm:text-[10px] font-mono mt-1 opacity-50 transition-colors duration-300 truncate ${isArtMode ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                            {item.value}
                        </span>
                    </div>
                </motion.a>
            ))}
        </div>
    );
}
