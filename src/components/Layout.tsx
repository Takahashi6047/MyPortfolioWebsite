import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-white"
          >
            Portfolio
          </motion.div>
          <motion.ul
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex gap-8 text-slate-300"
          >
            <li><a href="#home" className="hover:text-white transition">Home</a></li>
            <li><a href="#about" className="hover:text-white transition">About</a></li>
            <li><a href="#projects" className="hover:text-white transition">Projects</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
          </motion.ul>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {children}
      </main>

      <footer className="border-t border-slate-700/50 bg-slate-900/50 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-slate-400">
          <p>&copy; 2025 My Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </motion.div>
  )
}
