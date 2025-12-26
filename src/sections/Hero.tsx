import { HeroCard } from '../components/Hero/HeroCard';
import { LogosSection } from '../components/LogosSection';

export function Hero() {
  return (
    <section id="home" className="relative min-h-[85vh] px-4 sm:px-6 md:px-8">
      {/* Main container with rounded corners */}
      <div 
        className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh] rounded-2xl sm:rounded-3xl bg-neutral-300 dark:bg-neutral-800 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero/hero.png)' }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        {/* Fade overlay - left to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none"></div>
        
        {/* Corner brackets */}
        {/* Top left corner */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-l-2 border-t-2 border-white/60 rounded-tl-md"></div>
        </div>
        
        {/* Top right corner */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-r-2 border-t-2 border-white/60 rounded-tr-md"></div>
        </div>
        
        {/* Bottom left corner */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-l-2 border-b-2 border-white/60 rounded-bl-md"></div>
        </div>
        
        {/* Bottom right corner */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-r-2 border-b-2 border-white/60 rounded-br-md"></div>
        </div>
        
        {/* Content overlay */}
        <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
          {/* Top section - Main heading */}
          <div className="pt-4 sm:pt-6 md:pt-8 ml-2 sm:ml-4 md:ml-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight">
              ARTCODED
            </h1>
            <p className="text-xs sm:text-sm md:text-base font-light text-white/80 mt-1 sm:mt-2 ml-0 sm:ml-20 md:ml-32 lg:ml-40">
              visions through the variable.
            </p>
          </div>

          {/* Decorative scattered elements */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-evenly px-8 sm:px-12 md:px-16 pointer-events-none">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/40"></div>
            <div className="w-1 h-4 sm:h-6 bg-white/30 hidden sm:block rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/40"></div>
            <div className="w-1 h-4 sm:h-6 bg-white/30 hidden md:block rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/40 hidden sm:block"></div>
          </div>

          {/* Bottom section - Description and Card */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 sm:gap-0">
            {/* Description */}
            <div className="max-w-[280px] sm:max-w-xs md:max-w-sm ml-2 sm:ml-4 md:ml-5 mb-0 sm:mb-4 md:mb-5 order-2 sm:order-1">
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                <span className="text-white/70">—</span> Full-stack capabilities meet digital artistry. A portfolio of technical solutions and visual explorations by <span className="font-medium text-white">artCoded</span>. From the terminal to the tablet.
              </p>
            </div>

            {/* Card - positioned relatively on mobile, absolutely on larger screens */}
            <div className="order-1 sm:order-2 sm:contents">
              <HeroCard />
            </div>
          </div>
        </div>
      </div>
      
      {/* Logos section */}
      <LogosSection />
    </section>
  );
}
