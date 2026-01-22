import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { RippleProvider } from './global/overlay/themeOverlay/RippleContext';
import { CustomCursor, CursorProvider } from './global/cursor';
import { LoaderOverlay } from './global/overlay/loaderOverlay';
import { Home } from './pages/Home';
import { Inquiry } from './pages/Inquiry';
import { ProjectCaseStudy } from './pages/projects/ProjectCaseStudy';
import { ViewProvider, useView } from './global/ViewContext';
import { InquiryTransitionOverlay } from './global/overlay/InquiryTransitionOverlay';

function AppContent() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [showInitialLoader, setShowInitialLoader] = useState(true);
  const { isTransitioning } = useView();
  const location = useLocation();

  useEffect(() => {
    const isHomePage = location.pathname === '/';
    
    if (!isHomePage) {
      setShowInitialLoader(false);
      setIsLoadingComplete(true);
    }
  }, [location.pathname]);

  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {showInitialLoader && <LoaderOverlay onLoadingComplete={handleLoadingComplete} />}
      <CustomCursor />
      <InquiryTransitionOverlay 
        isActive={isTransitioning} 
        onTransitionComplete={() => {}} 
      />
      <Routes>
        <Route path="/" element={<Home isLoadingComplete={isLoadingComplete} />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CursorProvider>
        <RippleProvider>
          <ViewProvider>
            <AppContent />
          </ViewProvider>
        </RippleProvider>
      </CursorProvider>
    </BrowserRouter>
  );
}

export default App;
