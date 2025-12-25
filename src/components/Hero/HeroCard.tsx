import { motion } from 'framer-motion';

export function HeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="absolute right-8 bottom-8 flex flex-col items-end gap-4"
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
          Digital Art &<br />Web Development
        </p>
        <div className="h-24 bg-neutral-700 rounded-lg mb-3 flex items-center justify-center">
          <span className="text-xs text-neutral-400 uppercase tracking-wider">Clip Studio • Code</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-foreground/60">© 2025</span>
          <button className="text-xs bg-foreground text-background px-4 py-2 rounded-full hover:opacity-90 transition">
            Let's chat
          </button>
        </div>
      </div>
    </motion.div>
  );
}
