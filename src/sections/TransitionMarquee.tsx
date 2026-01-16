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
import { Sparkle } from "lucide-react";

// Utility function to replace @motionone/utils wrap
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
    children: string;
    baseVelocity: number;
    theme: string;
}

function ParallaxText({ children, baseVelocity = 100, theme }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Add skew effect back
    const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-30, 30]);

    // Reduced velocity factor for stability on solid strips
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
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

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    // Styles for the strip
    const stripStyle = theme === 'dark'
        ? 'bg-[#C5A059]/90 backdrop-blur-sm text-black shadow-[0_0_40px_rgba(197,160,89,0.4)]'
        : 'bg-[#1a1a1a]/90 backdrop-blur-sm text-white shadow-[0_0_20px_rgba(0,0,0,0.2)]';

    return (
        <div className={`overflow-hidden flex flex-nowrap whitespace-nowrap py-2 md:py-6 ${stripStyle} w-[120%] -ml-[10%] transform-gpu`}>
            <motion.div style={{ x, skew: skewVelocity }} className="flex flex-nowrap whitespace-nowrap gap-8 md:gap-24 items-center">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex items-center gap-8 md:gap-24 flex-shrink-0">
                        <span className="block text-xl sm:text-2xl md:text-4xl font-black italic uppercase tracking-tighter font-sans">
                            {children}
                        </span>
                        <Sparkle className={`w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 fill-current ${theme === 'dark' ? 'text-black' : 'text-white'}`} />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export function TransitionMarquee() {
    const { theme } = useTheme();

    return (
        <section className={`pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-24 md:pb-32 overflow-hidden w-full relative flex items-center justify-center
            ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#fafafa]'}`}>

            <div className={`absolute inset-0 pointer-events-none 
                ${theme === 'dark' ? 'hidden' : 'opacity-[0.03] bg-[url("https://grainy-gradients.vercel.app/noise.svg")] invert'}`}
            />

            <div className="relative w-full flex flex-col items-center justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full rotate-[-6deg] md:rotate-[-2deg] z-10 hover:z-30 transition-all duration-300">
                    <ParallaxText baseVelocity={-3} theme={theme}>
                        Full-Stack Developer
                    </ParallaxText>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full rotate-[6deg] md:rotate-[2deg] z-20 hover:z-30 transition-all duration-300 mix-blend-normal">
                    <ParallaxText baseVelocity={3} theme={theme}>
                        Digital Artistry
                    </ParallaxText>
                </div>
            </div>
        </section>
    );
}
