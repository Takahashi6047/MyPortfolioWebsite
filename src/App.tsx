import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
  const { isTransitioning } = useView();

  return (
    <>
      <LoaderOverlay onLoadingComplete={() => setIsLoadingComplete(true)} />
      <CustomCursor />
      <InquiryTransitionOverlay isActive={isTransitioning} onTransitionComplete={() => { }} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home isLoadingComplete={isLoadingComplete} />} />
          <Route path="/inquiry" element={<Inquiry onBack={() => window.history.back()} />} />
          <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function App() {
  return (
    <CursorProvider>
      <RippleProvider>
        <ViewProvider>
          <AppContent />
        </ViewProvider>
      </RippleProvider>
    </CursorProvider>
  );
}

export default App;
