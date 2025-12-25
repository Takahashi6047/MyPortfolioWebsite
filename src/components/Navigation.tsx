import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-card/80">
      <div className="mx-auto px-8 py-4 flex justify-between items-center">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-orbitron text-lg font-bold tracking-wider text-foreground"
        >
          ARTCODED
        </motion.div>
        <motion.ul
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="hidden md:flex gap-12 items-center text-foreground text-[1.05em] font-medium flex-1 justify-center"
        >
          <li><a href="#home" className="hover:text-accent transition-colors duration-200">Home</a></li>
          <li><a href="#about" className="hover:text-accent transition-colors duration-200">About Me</a></li>
          <li><a href="#work" className="hover:text-accent transition-colors duration-200">Work</a></li>
          <li><a href="#contact" className="hover:text-accent transition-colors duration-200">Contact</a></li>
        </motion.ul>
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
