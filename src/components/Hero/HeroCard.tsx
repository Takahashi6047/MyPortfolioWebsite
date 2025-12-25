import { motion } from 'framer-motion';

export function HeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="relative sm:absolute right-0 sm:right-4 md:right-6 lg:right-8 bottom-0 sm:bottom-4 md:bottom-6 lg:bottom-8 flex flex-col items-end gap-2 sm:gap-3 md:gap-4 self-end"
    >
      {/* Happy clients badge */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="flex -space-x-1.5 sm:-space-x-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-neutral-400 border-2 border-card"></div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-neutral-500 border-2 border-card"></div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-neutral-600 border-2 border-card"></div>
        </div>
        <span className="text-[10px] sm:text-xs text-foreground/70 hidden sm:inline">Happy clients worldwide</span>
      </div>

      {/* Professional card */}
      <div className="bg-card/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 w-44 sm:w-52 md:w-56">
        <p className="text-xs sm:text-sm font-medium text-foreground mb-2 sm:mb-3">
          Digital Art &<br />Web Development
        </p>
        <div className="h-20 sm:h-24 bg-neutral-700 rounded-lg mb-2 sm:mb-3 flex items-center justify-center">
          <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">Clip Studio • Code</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] sm:text-xs text-foreground/60">© 2025</span>
          <button className="text-[10px] sm:text-xs bg-foreground text-background px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:opacity-90 transition">
            Let's chat
          </button>
        </div>
      </div>
    </motion.div>
  );
}
