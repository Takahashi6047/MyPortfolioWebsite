import { HeroCard } from '../components/Hero/HeroCard';
import { LogosSection } from '../components/Hero/LogosSection';
import { ParticleBackground } from '../components/Hero/ParticleBackground';
import { useState, useEffect } from 'react';
import { useTheme } from '../global/overlay/themeOverlay/RippleContext';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  isLoadingComplete?: boolean;
}

export function Hero({ isLoadingComplete = false }: HeroProps) {
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const { theme } = useTheme();
  const isArtMode = theme === 'dark';

  const [visibleElements, setVisibleElements] = useState({
    corners: false,
    title: false,
    subtitle: false,
    decorative: false,
    quote: false,
    card: false
  });

  useEffect(() => {
    if (!isLoadingComplete) return;

    const containerTimer = setTimeout(() => {
      setIsContainerVisible(true);
    }, 100);

    const timers = [
      setTimeout(() => setVisibleElements(prev => ({ ...prev, corners: true })), 700),
      setTimeout(() => setVisibleElements(prev => ({ ...prev, title: true })), 900),
      setTimeout(() => setVisibleElements(prev => ({ ...prev, subtitle: true })), 1100),
      setTimeout(() => setVisibleElements(prev => ({ ...prev, decorative: true })), 1300),
      setTimeout(() => setVisibleElements(prev => ({ ...prev, quote: true })), 1500),
      setTimeout(() => setVisibleElements(prev => ({ ...prev, card: true })), 1700),
    ];

    return () => {
      clearTimeout(containerTimer);
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isLoadingComplete]);

  return (
    <section id="home" className="relative px-4 sm:px-6 md:px-8 flex flex-col pt-2 sm:pt-4 md:min-h-screen md:justify-center md:pt-0 md:-mt-8">
      <div
        className={`relative w-full rounded-2xl sm:rounded-3xl bg-black dark:bg-white overflow-hidden transition-all duration-700 ease-out transform-gpu ${isContainerVisible
          ? 'h-[70vh] sm:h-[75vh] md:h-[80vh] opacity-100 scale-y-100'
          : 'h-0 opacity-0 scale-y-0'
          }`}
        style={{ transformOrigin: 'top' }}
      >
        {/* Interactive Particle Background */}
        <ParticleBackground isVisible={isContainerVisible} />

        {/* Corner brackets */}
        <div className={`absolute top-4 left-4 sm:top-6 sm:left-6 transition-all duration-500 ease-out ${visibleElements.corners ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-2 -translate-y-2'}`}>
          <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-l-2 border-t-2 rounded-tl-md transition-colors duration-500 ${isArtMode ? 'border-[var(--art-accent)]' : 'border-neutral-600'}`}></div>
        </div>
        <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 transition-all duration-500 ease-out ${visibleElements.corners ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-2 -translate-y-2'}`}>
          <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-r-2 border-t-2 rounded-tr-md transition-colors duration-500 ${isArtMode ? 'border-[var(--art-accent)]' : 'border-neutral-600'}`}></div>
        </div>
        <div className={`absolute bottom-4 left-4 sm:bottom-6 sm:left-6 transition-all duration-500 ease-out ${visibleElements.corners ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-2 translate-y-2'}`}>
          <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-l-2 border-b-2 rounded-bl-md transition-colors duration-500 ${isArtMode ? 'border-[var(--art-accent)]' : 'border-neutral-600'}`}></div>
        </div>
        <div className={`absolute bottom-4 right-4 sm:bottom-6 sm:right-6 transition-all duration-500 ease-out ${visibleElements.corners ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-2 translate-y-2'}`}>
          <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-r-2 border-b-2 rounded-br-md transition-colors duration-500 ${isArtMode ? 'border-[var(--art-accent)]' : 'border-neutral-600'}`}></div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between pointer-events-none">
          <div className="pt-4 sm:pt-6 md:pt-8 ml-2 sm:ml-4 md:ml-5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${theme}`}
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight ${isArtMode ? 'text-black font-serif italic' : 'text-neutral-200'}`}
                initial={{ opacity: 0, y: 30 }}
                animate={visibleElements.title ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                {isArtMode ? 'ARTCODED' : 'ARTCODED'}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={`subtitle-${theme}`}
                className={`text-xs sm:text-sm md:text-base font-light mt-1 sm:mt-2 ml-0 sm:ml-20 md:ml-32 lg:ml-40 ${isArtMode ? 'text-neutral-600 italic tracking-widest' : 'text-neutral-400'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={visibleElements.subtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                {isArtMode ? 'selections from the digital atelier.' : 'full-stack engineering & ui design.'}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 sm:gap-0">
            <div className="max-w-[300px] sm:max-w-xs md:max-w-sm ml-2 sm:ml-4 md:ml-5 mb-0 sm:mb-4 md:mb-5 order-2 sm:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`quote-${theme}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={visibleElements.quote ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                >
                  <div className={`relative pl-4 sm:pl-5 border-l-2 transition-colors duration-500 ${isArtMode ? 'border-[var(--art-accent)]' : 'border-neutral-600'}`}>
                    <span className={`absolute -left-1 -top-2 text-2xl sm:text-3xl font-serif leading-none transition-colors duration-500 ${isArtMode ? 'text-[var(--art-accent)]' : 'text-neutral-600'}`}>"</span>
                    <p className={`text-xs sm:text-sm leading-relaxed font-light tracking-wide ${isArtMode ? 'text-neutral-700 italic' : 'text-neutral-300'}`}>
                      {isArtMode
                        ? "Curating pixels and code into immersive digital experiences. A gallery of technical solutions and visual explorations."
                        : "Building scalable, high-performance web applications with a focus on user experience and clean architecture."
                      }
                      <span className={`font-medium ${isArtMode ? 'text-[var(--art-accent)]' : 'text-white'}`}> ARTCODED</span>.
                    </p>
                    <p className={`text-[10px] sm:text-xs mt-2 sm:mt-3 uppercase tracking-widest ${isArtMode ? 'text-[var(--art-accent)]' : 'text-neutral-500'}`}>
                      {isArtMode ? 'Est. 2024' : 'From the terminal to the tablet'}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className={`order-1 sm:order-2 sm:contents pointer-events-auto transition-all duration-600 ease-out ${visibleElements.card ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0 translate-y-4 translate-x-4'}`}>
              <HeroCard />
            </div>
          </div>
        </div>
      </div>

      <LogosSection isLoadingComplete={isLoadingComplete} />
    </section>
  );
}
