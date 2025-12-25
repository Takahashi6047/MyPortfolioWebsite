import { HeroCard } from '../components/Hero/HeroCard';

export function Hero() {
  return (
    <section id="home" className="relative min-h-[85vh] px-4 sm:px-6 md:px-8">
      {/* Main container with rounded corners */}
      <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh] rounded-2xl sm:rounded-3xl bg-neutral-300 dark:bg-neutral-800 overflow-hidden before:absolute before:top-4 before:left-4 sm:before:top-6 sm:before:left-6 before:w-6 before:h-6 sm:before:w-8 sm:before:h-8 before:border-t-2 before:border-l-2 before:border-foreground/30 before:rounded-tl-lg after:absolute after:top-4 after:right-4 sm:after:top-6 sm:after:right-6 after:w-6 after:h-6 sm:after:w-8 sm:after:h-8 after:border-t-2 after:border-r-2 after:border-foreground/30 after:rounded-tr-lg">
        {/* Bottom corner borders */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-foreground/30 rounded-bl-lg"></div>
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-foreground/30 rounded-br-lg"></div>
        {/* Background placeholder - photo will be added later */}
        
        {/* Content overlay */}
        <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
          {/* Top section - Main heading */}
          <div className="pt-4 sm:pt-6 md:pt-8 ml-2 sm:ml-4 md:ml-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-foreground tracking-tight">
              ARTCODED
            </h1>
            <p className="text-xs sm:text-sm md:text-base font-light text-foreground/70 mt-1 sm:mt-2 ml-0 sm:ml-20 md:ml-32 lg:ml-40">
              visions through the variable.
            </p>
          </div>

          {/* Decorative plus signs */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-evenly px-4 sm:px-6 md:px-8">
            <span className="text-foreground/50 text-lg sm:text-xl md:text-2xl">+</span>
            <span className="text-foreground/50 text-lg sm:text-xl md:text-2xl">+</span>
            <span className="text-foreground/50 text-lg sm:text-xl md:text-2xl hidden sm:inline">+</span>
            <span className="text-foreground/50 text-lg sm:text-xl md:text-2xl hidden sm:inline">+</span>
          </div>

          {/* Bottom section - Description and Card */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 sm:gap-0">
            {/* Description */}
            <div className="max-w-[280px] sm:max-w-xs md:max-w-sm ml-2 sm:ml-4 md:ml-5 mb-0 sm:mb-4 md:mb-5 order-2 sm:order-1">
              <p className="text-foreground/80 text-xs sm:text-sm leading-relaxed">
                <span className="text-foreground/50">—</span> Full-stack capabilities meet digital artistry. A portfolio of technical solutions and visual explorations by <span className="font-medium">artCoded</span>. From the terminal to the tablet.
              </p>
            </div>

            {/* Card - positioned relatively on mobile, absolutely on larger screens */}
            <div className="order-1 sm:order-2 sm:contents">
              <HeroCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
