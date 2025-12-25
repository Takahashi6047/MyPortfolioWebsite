import { useEffect } from 'react'
import { Layout } from './components/Layout'

function App() {
  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <Layout>
      <section id="home" className="py-20">
        <h1 className="text-5xl font-bold text-foreground mb-4">Welcome</h1>
        <p className="text-xl text-foreground/70">Your portfolio content goes here</p>
      </section>
    </Layout>
  )
}

export default App
