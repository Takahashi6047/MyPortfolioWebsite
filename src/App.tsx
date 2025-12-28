import { useEffect, useRef, useState } from 'react'
import { Layout } from './components/Layout'
import { Hero } from './sections/Hero'
import { Works } from './sections/Works'
import { DigitalArtistry } from './sections/DigitalArtistry'
import { RippleProvider } from './global/overlay/themeOverlay/RippleContext'
import { CustomCursor, CursorProvider } from './global/cursor'

function App() {
  const parallaxContainerRef = useRef<HTMLDivElement>(null)
  const worksEndRef = useRef<HTMLDivElement>(null)
  const worksRef = useRef<HTMLDivElement>(null)
  const [slideProgress, setSlideProgress] = useState(0)
  const [worksFixed, setWorksFixed] = useState(false)

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

  useEffect(() => {
    const handleScroll = () => {
      if (!worksEndRef.current || !worksRef.current) return

      const worksEndRect = worksEndRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // When the works-end marker enters the viewport, start the slide
      // worksEndRect.top will be < viewportHeight when it's visible
      const distanceFromBottom = worksEndRect.top - viewportHeight

      if (distanceFromBottom < 0) {
        // The marker has passed the bottom of the viewport
        // Calculate progress based on how far past it is
        const slideDistance = viewportHeight // Scroll distance to complete the slide
        const progress = Math.min(Math.max(-distanceFromBottom / slideDistance, 0), 1)
        setSlideProgress(progress)
        
        // Fix Works in place when parallax starts
        if (!worksFixed) {
          setWorksFixed(true)
        }
      } else {
        setSlideProgress(0)
        setWorksFixed(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [worksFixed])

  return (
    <CursorProvider>
      <RippleProvider>
        <CustomCursor />
        <Layout>
          <Hero />
          {/* Parallax Container for Works + DigitalArtistry */}
          <div ref={parallaxContainerRef} className="relative">
            {/* Works Section - becomes fixed at top when parallax starts */}
            <div 
              ref={worksRef}
              className={worksFixed ? 'fixed top-0 left-0 w-full z-10' : 'relative'}
            >
              <Works />
            </div>
            
            {/* Placeholder to maintain scroll height when Works is fixed */}
            {worksFixed && <div style={{ height: worksRef.current?.offsetHeight || 0 }} />}
            
            {/* Marker for end of Works - triggers the slide */}
            <div ref={worksEndRef} className="h-0" />
            
            {/* Spacer for the slide-in scroll distance */}
            <div style={{ height: '100vh' }} />
            
            {/* DigitalArtistry - Fixed and slides in from right */}
            <div 
              className="fixed top-0 left-0 w-full h-screen z-30 transition-transform duration-100 ease-out overflow-hidden"
              style={{
                transform: `translateX(${100 - slideProgress * 100}%)`,
                visibility: slideProgress > 0 ? 'visible' : 'hidden',
              }}
            >
              <DigitalArtistry />
            </div>
          </div>
        </Layout>
      </RippleProvider>
    </CursorProvider>
  )
}

export default App
