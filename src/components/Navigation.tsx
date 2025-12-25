import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-card/80 border-b border-accent/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold text-foreground"
        >
          Portfolio
        </motion.div>
        <motion.ul
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-8 items-center text-foreground"
        >
          <li><a href="#home" className="hover:text-accent transition">Home</a></li>
          <li><a href="#about" className="hover:text-accent transition">About</a></li>
          <li><a href="#projects" className="hover:text-accent transition">Projects</a></li>
          <li><a href="#contact" className="hover:text-accent transition">Contact</a></li>
          <li><ThemeToggle /></li>
        </motion.ul>
      </div>
    </nav>
  );
}
