import { HeroCard } from '../components/Hero/HeroCard';

export function Hero() {
  return (
    <section id="home" className="relative min-h-[85vh] px-8">
      {/* Main container with rounded corners */}
      <div className="relative w-full h-[80vh] rounded-3xl bg-neutral-300 dark:bg-neutral-800 overflow-hidden">
        {/* Background placeholder - photo will be added later */}
        
        {/* Content overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          {/* Top section - Main heading */}
          <div className="pt-8">
            <h1 className="text-5xl md:text-7xl font-light text-foreground tracking-tight uppercase">
              Designed to scale.<br />Drawn to inspire.
            </h1>
            <p className="text-lg text-foreground/70 mt-4 ml-1">
              
            </p>
          </div>

          {/* Decorative plus signs */}
          <div className="absolute top-1/2 left-1/4 text-foreground/50 text-2xl">+</div>
          <div className="absolute top-1/2 left-1/2 text-foreground/50 text-2xl">+</div>
          <div className="absolute top-1/2 right-1/3 text-foreground/50 text-2xl">+</div>

          {/* Bottom left - Description */}
          <div className="max-w-sm">
            <p className="text-foreground/80 text-sm leading-relaxed">
              <span className="text-foreground/50">—</span> Full-stack capabilities meet digital artistry. A portfolio of technical solutions and visual explorations by <span className="font-medium">artCoded</span>. From the terminal to the tablet.
            </p>
          </div>

          {/* Right side card */}
          <HeroCard />
        </div>
      </div>
    </section>
  );
}
