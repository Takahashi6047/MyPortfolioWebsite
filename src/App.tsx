import { useState } from 'react'
import { Layout } from './components/Layout'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Works } from './sections/Works'
import { DigitalArtistry } from './sections/DigitalArtistry'
import { Contact } from './sections/Contact'
import { TransitionMarquee } from './sections/TransitionMarquee'
import { RippleProvider, useRipple } from './global/overlay/themeOverlay/RippleContext'
import { CustomCursor, CursorProvider } from './global/cursor'
import { LoaderOverlay } from './global/overlay/loaderOverlay'
import { Statement } from './sections/Statement'
import { ViewProvider, useView } from './global/ViewContext'
import { Inquiry } from './pages/Inquiry'
import { InquiryTransitionOverlay } from './global/overlay/InquiryTransitionOverlay'

function AppContent() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const { theme } = useRipple()
  const { currentView, isTransitioning, transitionTo } = useView()

  return (
    <>
      {/* Initial Loader - only shows once on mount basically */}
      <LoaderOverlay onLoadingComplete={() => setIsLoadingComplete(true)} />

      {/* Global Cursor */}
      <CustomCursor />

      {/* Page Transition Overlay */}
      <InquiryTransitionOverlay isActive={isTransitioning} onTransitionComplete={() => { }} />

      {/* Main Content Render */}
      {currentView === 'home' ? (
        <Layout>
          <Hero isLoadingComplete={isLoadingComplete} />
          <Statement />
          <Services />
          {theme === 'light' ? <Works /> : <DigitalArtistry />}
          <TransitionMarquee />
          <Contact />
        </Layout>
      ) : (
        <Inquiry onBack={() => transitionTo('home')} />
      )}
    </>
  )
}



// ...

// ...

function App() {
  return (
    <CursorProvider>
      <RippleProvider>
        <ViewProvider>
          <AppContent />
        </ViewProvider>
      </RippleProvider>
    </CursorProvider>
  )
}

export default App
