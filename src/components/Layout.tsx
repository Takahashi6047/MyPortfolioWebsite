import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from './Navigation/Navigation'

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
      <main>
        {children}
      </main>


    </motion.div>
  )
}
