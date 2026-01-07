import { useEffect, useRef, useState } from 'react'
import { Layout } from './components/Layout'
import { Hero } from './sections/Hero'
import { Works } from './sections/Works'
import { DigitalArtistry } from './sections/DigitalArtistry'
import { RippleProvider } from './global/overlay/themeOverlay/RippleContext'
import { CustomCursor, CursorProvider } from './global/cursor'
import { LoaderOverlay } from './global/overlay/loaderOverlay'
import { StickyWorksOverlay } from './components/works/StickyWorksOverlay'

function App() {
  const parallaxTriggerRef = useRef<HTMLDivElement>(null)
  const worksWrapperRef = useRef<HTMLDivElement>(null)
  const [slideProgress, setSlideProgress] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isWorksSticky, setIsWorksSticky] = useState(false)
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)

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

  // Check if we're on desktop (lg breakpoint = 1024px)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useEffect(() => {
    // Only apply parallax effect on desktop
    if (!isDesktop) {
      setSlideProgress(0)
      setIsWorksSticky(false)
      return
    }

    const handleScroll = () => {
      if (!parallaxTriggerRef.current || !worksWrapperRef.current) return

      const triggerRect = parallaxTriggerRef.current.getBoundingClientRect()
      const wrapperRect = worksWrapperRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // Check if we've scrolled past the Works section (wrapper bottom is at or above viewport top)
      const worksEnded = wrapperRect.bottom <= viewportHeight

      if (worksEnded) {
        setIsWorksSticky(true)
        // Calculate slide progress based on trigger position
        const progress = Math.min(Math.max(1 - triggerRect.top / viewportHeight, 0), 1)
        setSlideProgress(progress)
      } else {
        setIsWorksSticky(false)
        setSlideProgress(0)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDesktop])

  return (
    <CursorProvider>
      <RippleProvider>
        <LoaderOverlay onLoadingComplete={() => setIsLoadingComplete(true)} />
        <CustomCursor />
        <Layout>
          <Hero isLoadingComplete={isLoadingComplete} />
          
          {/* Mobile View - Simple stacked layout without parallax */}
          <div className="lg:hidden">
            <Works />
            <DigitalArtistry />
          </div>
          
          {/* Desktop View - Parallax effect */}
          <div className="hidden lg:block relative">
            {/* Works wrapper - contains Works and provides the sticky context */}
            <div ref={worksWrapperRef} className="relative">
              <Works />
            </div>
            
            {/* Sticky Works clone that appears when original scrolls away */}
            {isWorksSticky && <StickyWorksOverlay />}
            
            {/* Parallax trigger zone */}
            <div ref={parallaxTriggerRef} style={{ height: '100vh' }} />
            
            {/* DigitalArtistry - Fixed and slides in from right */}
            <div 
              className="fixed top-0 left-0 w-full h-screen z-30 overflow-hidden"
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
