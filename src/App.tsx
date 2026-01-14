import { useState } from 'react'
import { Layout } from './components/Layout'
import { Hero } from './sections/Hero'
import { Works } from './sections/Works'
import { DigitalArtistry } from './sections/DigitalArtistry'
import { Contact } from './sections/Contact'
import { RippleProvider, useRipple } from './global/overlay/themeOverlay/RippleContext'
import { CustomCursor, CursorProvider } from './global/cursor'
import { LoaderOverlay } from './global/overlay/loaderOverlay'

function Content() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const { theme } = useRipple()

  return (
    <>
      <LoaderOverlay onLoadingComplete={() => setIsLoadingComplete(true)} />
      <CustomCursor />
      <Layout>
        <Hero isLoadingComplete={isLoadingComplete} />
        {theme === 'light' ? <Works /> : <DigitalArtistry />}
        <Contact />
      </Layout>
    </>
  )
}

function App() {
  return (
    <CursorProvider>
      <RippleProvider>
        <Content />
      </RippleProvider>
    </CursorProvider>
  )
}

export default App
