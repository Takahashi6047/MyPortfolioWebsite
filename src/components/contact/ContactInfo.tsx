import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../global/overlay/themeOverlay/RippleContext';
import { useCursor } from '../../global/cursor';

// Check if device is mobile
const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

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

    const handleMouseEnter = () => {
        if (!isMobile) {
            setCursorText("VISIT");
            setCursorVariant("text");
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setCursorText("");
            setCursorVariant("default");
        }
    };

    return (
        <div className={`grid grid-cols-2 md:grid-cols-4 w-full border-t border-b ${isArtMode ? 'border-black/30' : 'border-white/30'}`}>
            {socials.map((item, index) => (
                <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`group relative flex flex-col justify-between p-4 sm:p-6 md:p-8 md:border-r md:last:border-r-0 overflow-hidden will-change-transform
                    ${index < 2 ? 'border-b md:border-b-0' : ''}
                    ${isArtMode ? 'border-black/30 text-black' : 'border-white/30 text-white'}
                    ${isMobile ? 'active:scale-95' : 'transition-colors duration-300'}`}
                >
                    {/* Hover Fill Effect - Disabled on mobile for performance */}
                    {!isMobile && (
                        <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] z-0
                            ${isArtMode ? 'bg-black' : 'bg-white'}`} />
                    )}

                    <div className="relative z-10 flex justify-between items-start mb-3 sm:mb-4">
                        <span className={`text-[9px] sm:text-[10px] font-mono opacity-50 
                            ${isMobile ? '' : 'transition-colors duration-300 group-hover:opacity-100'}
                            ${isArtMode ? (isMobile ? '' : 'group-hover:text-white') : (isMobile ? '' : 'group-hover:text-black')}`}>
                            0{index + 1}
                        </span>
                        <ArrowUpRight className={`w-3 h-3 sm:w-4 sm:h-4 
                            ${isMobile ? '' : 'transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1'}
                            ${isArtMode ? (isMobile ? '' : 'group-hover:text-white') : (isMobile ? '' : 'group-hover:text-black')}`} />
                    </div>

                    <div className="relative z-10">
                        <span className={`block text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase 
                            ${isMobile ? '' : 'transition-colors duration-300'}
                            ${isArtMode ? (isMobile ? '' : 'group-hover:text-white') : (isMobile ? '' : 'group-hover:text-black')}`}>
                            {item.label}
                        </span>
                        <span className={`block text-[8px] sm:text-[10px] font-mono mt-1 opacity-50 truncate 
                            ${isMobile ? '' : 'transition-colors duration-300 group-hover:opacity-100'}
                            ${isArtMode ? (isMobile ? '' : 'group-hover:text-white') : (isMobile ? '' : 'group-hover:text-black')}`}>
                            {item.value}
                        </span>
                    </div>
                </motion.a>
            ))}
        </div>
    );
}