import { motion } from 'framer-motion';

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
              Full-stack capabilities meet digital artistry. A portfolio of technical solutions and visual explorations by <span className="font-medium">artCoded</span>.
            </p>
          </div>

          {/* Decorative plus signs */}
          <div className="absolute top-1/2 left-1/4 text-foreground/50 text-2xl">+</div>
          <div className="absolute top-1/2 left-1/2 text-foreground/50 text-2xl">+</div>
          <div className="absolute top-1/2 right-1/3 text-foreground/50 text-2xl">+</div>

          {/* Bottom left - Description */}
          <div className="max-w-sm">
            <p className="text-foreground/80 text-sm leading-relaxed">
              <span className="text-foreground/50">—</span> From the terminal to the tablet.
            </p>
          </div>

          {/* Right side card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute right-8 top-1/4 flex flex-col items-end gap-4"
          >
            {/* Happy clients badge */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-neutral-400 border-2 border-card"></div>
                <div className="w-8 h-8 rounded-full bg-neutral-500 border-2 border-card"></div>
                <div className="w-8 h-8 rounded-full bg-neutral-600 border-2 border-card"></div>
              </div>
              <span className="text-xs text-foreground/70">Happy clients worldwide</span>
            </div>

            {/* Professional card */}
            <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 w-56">
              <p className="text-sm font-medium text-foreground mb-3">
                Professional creative<br />photography
              </p>
              <div className="h-24 bg-neutral-700 rounded-lg mb-3"></div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-foreground/60">© 2025</span>
                <button className="text-xs bg-foreground text-background px-4 py-2 rounded-full hover:opacity-90 transition">
                  Let's chat
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
