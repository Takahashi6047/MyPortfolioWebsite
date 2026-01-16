import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";
import { useTheme } from "../global/overlay/themeOverlay/RippleContext";

// Check if device is mobile
const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
    children: string;
    baseVelocity: number;
    theme: string;
    isOutline?: boolean;
}

function ParallaxText({ children, baseVelocity = 100, theme, isOutline = false }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((_t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        // Reduced velocity effect for clean tech look (disabled on mobile)
        if (!isMobile) {
            moveBy += directionFactor.current * moveBy * velocityFactor.get() * 0.5;
        }

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden flex flex-nowrap whitespace-nowrap py-2 sm:py-4">
            <motion.div
                style={{ x }}
                className="flex flex-nowrap whitespace-nowrap gap-8 sm:gap-12 items-center"
            >
                {[...Array(4)].map((_, i) => (
                    <span
                        key={i}
                        className={`block text-[12vw] sm:text-[8vw] font-black tracking-tighter uppercase leading-[0.85]
                            ${isOutline
                                ? 'text-transparent'
                                : (theme === 'dark' ? 'text-white' : 'text-neutral-900')
                            }`}
                        style={{
                            WebkitTextStroke: isOutline
                                ? `1px ${theme === 'dark' ? '#ffffff' : '#000000'}` // High contrast for visibility
                                : 'none',
                            fontFamily: 'Inter, sans-serif'
                        }}
                    >
                        {children}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

export function TransitionMarquee() {
    const { theme } = useTheme();
    // theme='dark' is Art Mode (Dark Background usually)
    // theme='light' is Dev Mode (White Background usually)

    return (
        <section className={`py-12 sm:py-24 overflow-hidden w-full relative flex flex-col justify-center gap-0 sm:gap-2 border-t
            ${theme === 'dark' ? 'bg-[#1A1A1A] border-white/5' : 'bg-[#FAFAFA] border-black/5'}`}>

            <ParallaxText baseVelocity={-2} theme={theme}>
                FULL-STACK DEVELOPMENT • UI DESIGN •
            </ParallaxText>

            <ParallaxText baseVelocity={2} theme={theme} isOutline={true}>
                VISUAL NARRATIVE • DIGITAL ARTISTRY •
            </ParallaxText>

        </section>
    );
}
