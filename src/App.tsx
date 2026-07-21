import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const CosmicBackdrop = lazy(() => import('./components/CosmicBackdrop'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const QuestionPage = lazy(() => import('./pages/QuestionPage'));
const CareerPage = lazy(() => import('./pages/CareerPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

function BootFallback() {
  return (
    <div className="relative z-10 grid h-[100svh] place-items-center bg-[#03040a] text-white">
      <div className="rounded-lg border border-cyan-200/20 bg-white/[0.06] px-4 py-3 text-sm text-cyan-100 shadow-[0_0_42px_rgba(93,220,255,0.16)]">
        Synchronizing Nova...
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();

  return (
    <>
      <Suspense fallback={null}>
        <CosmicBackdrop />
      </Suspense>
      <Suspense fallback={<BootFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/questions" element={<QuestionPage />} />
            <Route path="/career/:slug" element={<CareerPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}

export default App;
