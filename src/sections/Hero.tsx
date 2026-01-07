import { HeroCard } from '../components/Hero/HeroCard';
import { LogosSection } from '../components/Hero/LogosSection';
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
    // Only start animations after loading is complete
    if (!isLoadingComplete) return;

    // Start container animation immediately after loading
    const containerTimer = setTimeout(() => {
      setIsContainerVisible(true);
    }, 100);

    // Staggered content animations
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
      {/* Main container with rounded corners */}
      <div
        className={`relative w-full rounded-2xl sm:rounded-3xl bg-neutral-300 dark:bg-neutral-800 overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-700 ease-out transform-gpu ${isContainerVisible
          ? 'h-[70vh] sm:h-[75vh] md:h-[80vh] opacity-100 scale-y-100'
          : 'h-0 opacity-0 scale-y-0'
          }`}
        style={{
          backgroundImage: 'url(/hero/hero.png)',
          transformOrigin: 'top'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        {/* Fade overlay - left to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none"></div>

        {/* Corner brackets */}
        {/* Top left corner */}
        <div className={`absolute top-4 left-4 sm:top-6 sm:left-6 transition-all duration-500 ease-out ${visibleElements.corners ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-2 -translate-y-2'
          }`}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-l-2 border-t-2 border-white/60 rounded-tl-md"></div>
        </div>

        {/* Top right corner */}
        <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 transition-all duration-500 ease-out ${visibleElements.corners ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-2 -translate-y-2'
          }`}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-r-2 border-t-2 border-white/60 rounded-tr-md"></div>
        </div>

        {/* Bottom left corner */}
        <div className={`absolute bottom-4 left-4 sm:bottom-6 sm:left-6 transition-all duration-500 ease-out ${visibleElements.corners ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-2 translate-y-2'
          }`}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-l-2 border-b-2 border-white/60 rounded-bl-md"></div>
        </div>

        {/* Bottom right corner */}
        <div className={`absolute bottom-4 right-4 sm:bottom-6 sm:right-6 transition-all duration-500 ease-out ${visibleElements.corners ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-2 translate-y-2'
          }`}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-r-2 border-b-2 border-white/60 rounded-br-md"></div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
          {/* Top section - Main heading */}
          <div className="pt-4 sm:pt-6 md:pt-8 ml-2 sm:ml-4 md:ml-5">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight transition-all duration-600 ease-out ${visibleElements.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
              ARTCODED
            </h1>
            <p className={`text-xs sm:text-sm md:text-base font-light text-white/80 mt-1 sm:mt-2 ml-0 sm:ml-20 md:ml-32 lg:ml-40 transition-all duration-600 ease-out delay-100 ${visibleElements.subtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              visions through the variable.
            </p>
          </div>

          {/* Decorative scattered elements */}
          <div className={`absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-evenly px-8 sm:px-12 md:px-16 pointer-events-none transition-all duration-500 ease-out ${visibleElements.decorative ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/40"></div>
            <div className="w-1 h-4 sm:h-6 bg-white/30 hidden sm:block rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/40"></div>
            <div className="w-1 h-4 sm:h-6 bg-white/30 hidden md:block rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/40 hidden sm:block"></div>
          </div>

          {/* Bottom section - Description and Card */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 sm:gap-0">
            {/* Description - Quote Style */}
            <div className={`max-w-[300px] sm:max-w-xs md:max-w-sm ml-2 sm:ml-4 md:ml-5 mb-0 sm:mb-4 md:mb-5 order-2 sm:order-1 transition-all duration-600 ease-out ${visibleElements.quote ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0 translate-y-4 -translate-x-4'
              }`}>
              <div className="relative pl-4 sm:pl-5 border-l-2 border-white/40">
                {/* Quote mark */}
                <span className="absolute -left-1 -top-2 text-2xl sm:text-3xl text-white/30 font-serif leading-none">"</span>

                <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-light tracking-wide">
                  Full-stack capabilities meet digital artistry. A portfolio of technical solutions and visual explorations by <span className="font-medium text-white">ARTCODED</span>.
                </p>

                <p className="text-white/60 text-[10px] sm:text-xs mt-2 sm:mt-3 uppercase tracking-widest">
                  From the terminal to the tablet
                </p>
              </div>
            </div>

            {/* Card - positioned relatively on mobile, absolutely on larger screens */}
            <div className={`order-1 sm:order-2 sm:contents transition-all duration-600 ease-out ${visibleElements.card ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0 translate-y-4 translate-x-4'
              }`}>
              <HeroCard />
            </div>
          </div>
        </div>
      </div>

      {/* Logos section */}
      <LogosSection isLoadingComplete={isLoadingComplete} />
    </section>
  );
}
