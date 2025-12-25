import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from './Navigation'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground transition-colors"
    >
      <Navigation />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {children}
      </main>

      <footer className="border-t border-accent/20 bg-card/50 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-foreground/70">
          <p>&copy; 2025 My Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </motion.div>
  )
}
