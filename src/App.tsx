import { useEffect, useRef, useState } from 'react'
import { Layout } from './components/Layout'
import { Hero } from './sections/Hero'
import { Works } from './sections/Works'
import { DigitalArtistry } from './sections/DigitalArtistry'
import { RippleProvider } from './global/overlay/themeOverlay/RippleContext'
import { CustomCursor, CursorProvider } from './global/cursor'

function App() {
  const parallaxTriggerRef = useRef<HTMLDivElement>(null)
  const worksWrapperRef = useRef<HTMLDivElement>(null)
  const [slideProgress, setSlideProgress] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isWorksSticky, setIsWorksSticky] = useState(false)

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
        <CustomCursor />
        <Layout>
          <Hero />
          
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
            {isWorksSticky && (
              <div className="fixed top-0 left-0 w-full h-screen z-10 overflow-hidden">
                {/* Show only the last project view */}
                <div className="w-full h-full bg-background flex relative">
                  {/* Grid background */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                      className="absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                      }}
                    />
                    {/* Faded edges - top, bottom, left, right */}
                    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
                  </div>
                  
                  {/* Recreate the Works layout showing last project */}
                  <div className="w-1/2 h-screen flex flex-col justify-center px-12 md:px-20 py-20 bg-transparent relative z-10">
                    {/* Background Decorative Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent/30 blur-[80px]" />
                    </div>
                    
                    <div className="max-w-xl ml-auto mr-8">
                      <span className="text-sm font-bold tracking-widest text-foreground/50 uppercase mb-12 block font-sans">Selected Works</span>
                      <div className="text-xl font-mono mb-4 text-foreground/80">04 / 04</div>
                      <h1 className="text-6xl xl:text-7xl font-bold tracking-tight font-sans leading-[1.1] mb-6">
                        <span className="block">Smart</span>
                        <span className="block">City</span>
                        <span className="block">Grid</span>
                      </h1>
                      <div className="flex items-center gap-4 mb-8 text-foreground/60 text-lg uppercase tracking-widest border-b border-foreground/10 pb-4 font-sans">
                        <span>Infrastructure</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
                        <span>2022</span>
                      </div>
                      <p className="text-xl text-foreground/80 font-light leading-relaxed mb-8 font-sans">
                        IoT connectivity platform for managing smart city infrastructure and energy consumption.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["Go", "GraphQL", "PostgreSQL", "Flutter"].map((tag, i) => (
                          <span key={i} className="px-4 py-2 text-sm bg-accent/50 text-foreground/90 rounded-full font-sans border border-transparent">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 h-screen flex items-center justify-center p-20 relative z-10">
                    <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2669&auto=format&fit=crop"
                        alt="Smart City Grid"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
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
