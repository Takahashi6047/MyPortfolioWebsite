import { HeroCard } from '../components/Hero/HeroCard';
import { LogosSection } from '../components/Hero/LogosSection';
import { ParticleBackground } from '../components/Hero/ParticleBackground';
import { useState, useEffect } from 'react';

interface HeroProps {
  isLoadingComplete?: boolean;
}

export function Hero({ isLoadingComplete = false }: HeroProps) {
  const [isContainerVisible, setIsContainerVisible] = useState(false);
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
        className={`relative w-full rounded-2xl sm:rounded-3xl bg-neutral-100 dark:bg-neutral-900 overflow-hidden transition-all duration-700 ease-out transform-gpu ${isContainerVisible
          ? 'h-[70vh] sm:h-[75vh] md:h-[80vh] opacity-100 scale-y-100'
          : 'h-0 opacity-0 scale-y-0'
          }`}
        style={{ transformOrigin: 'top' }}
      >
        {/* Interactive Particle Background */}
        <ParticleBackground isVisible={isContainerVisible} />

        {/* Corner brackets */}
        <div className={`absolute top-4 left-4 sm:top-6 sm:left-6 transition-all duration-500 ease-out ${visibleElements.corners ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-2 -translate-y-2'}`}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-l-2 border-t-2 border-neutral-400 dark:border-neutral-600 rounded-tl-md"></div>
        </div>
        <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 transition-all duration-500 ease-out ${visibleElements.corners ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-2 -translate-y-2'}`}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-r-2 border-t-2 border-neutral-400 dark:border-neutral-600 rounded-tr-md"></div>
        </div>
        <div className={`absolute bottom-4 left-4 sm:bottom-6 sm:left-6 transition-all duration-500 ease-out ${visibleElements.corners ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-2 translate-y-2'}`}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-l-2 border-b-2 border-neutral-400 dark:border-neutral-600 rounded-bl-md"></div>
        </div>
        <div className={`absolute bottom-4 right-4 sm:bottom-6 sm:right-6 transition-all duration-500 ease-out ${visibleElements.corners ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-2 translate-y-2'}`}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-r-2 border-b-2 border-neutral-400 dark:border-neutral-600 rounded-br-md"></div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between pointer-events-none">
          <div className="pt-4 sm:pt-6 md:pt-8 ml-2 sm:ml-4 md:ml-5">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-neutral-800 dark:text-neutral-200 tracking-tight transition-all duration-600 ease-out ${visibleElements.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              ARTCODED
            </h1>
            <p className={`text-xs sm:text-sm md:text-base font-light text-neutral-600 dark:text-neutral-400 mt-1 sm:mt-2 ml-0 sm:ml-20 md:ml-32 lg:ml-40 transition-all duration-600 ease-out delay-100 ${visibleElements.subtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              visions through the variable.
            </p>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 sm:gap-0">
            <div className={`max-w-[300px] sm:max-w-xs md:max-w-sm ml-2 sm:ml-4 md:ml-5 mb-0 sm:mb-4 md:mb-5 order-2 sm:order-1 transition-all duration-600 ease-out ${visibleElements.quote ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0 translate-y-4 -translate-x-4'}`}>
              <div className="relative pl-4 sm:pl-5 border-l-2 border-neutral-400 dark:border-neutral-600">
                <span className="absolute -left-1 -top-2 text-2xl sm:text-3xl text-neutral-400 dark:text-neutral-600 font-serif leading-none">"</span>
                <p className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed font-light tracking-wide">
                  Full-stack capabilities meet digital artistry. A portfolio of technical solutions and visual explorations by <span className="font-medium text-neutral-900 dark:text-white">ARTCODED</span>.
                </p>
                <p className="text-neutral-500 dark:text-neutral-500 text-[10px] sm:text-xs mt-2 sm:mt-3 uppercase tracking-widest">
                  From the terminal to the tablet
                </p>
              </div>
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
