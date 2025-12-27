import { useEffect } from 'react'
import { Layout } from './components/Layout'
import { Hero } from './sections/Hero'
import { RippleProvider } from './global/overlay/themeOverlay/RippleContext'
import { CustomCursor, CursorProvider } from './global/cursor'

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
    <CursorProvider>
      <RippleProvider>
        <CustomCursor />
        <Layout>
          <Hero />
        </Layout>
      </RippleProvider>
    </CursorProvider>
  )
}

export default App
