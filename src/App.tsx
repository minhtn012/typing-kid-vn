import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import PracticeSession from './components/PracticeSession';
import GameSession from './components/GameSession';
import PostureGuide from './pages/PostureGuide';
import TelexGuide from './pages/TelexGuide';
import VniGuide from './pages/VniGuide';
import FjRidgeGuide from './pages/FjRidgeGuide';
import { LESSON_MODES } from './constants';

type ViewMode = 'home' | 'practice';

function App() {
  const location = useLocation();
  const [view, setView] = useState<ViewMode>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.has('mode') || params.has('open')) ? 'practice' : 'home';
  });

  const [selectedModeId, setSelectedModeId] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const modeFromUrl = params.get('mode') || params.get('open');
    if (modeFromUrl && LESSON_MODES.find(m => m.id === modeFromUrl)) {
      return modeFromUrl;
    }
    return LESSON_MODES[0].id;
  });

  // Sync mode from URL on direct entry or back/forward
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modeFromUrl = params.get('mode');
    if (modeFromUrl) {
      setSelectedModeId(modeFromUrl);
      setView('practice');
    } else {
      setView('home');
    }
  }, [location]);

  const handleSelectMode = (modeId: string) => {
    setSelectedModeId(modeId);
    setView('practice');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setView('home');
    window.scrollTo(0, 0);
  };

  const initialTab = (() => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || params.get('open') || undefined;
  })();

  return (
    <Routes>
      <Route path="/" element={
        <>
          {view === 'home' && (
            <HomePage
              onSelectMode={handleSelectMode}
              initialTabId={initialTab}
            />
          )}
          {view === 'practice' && (
            selectedModeId === 'totoro_chase' ? (
              <GameSession onBack={handleBackToHome} />
            ) : (
              <PracticeSession
                initialModeId={selectedModeId}
                onBack={handleBackToHome}
              />
            )
          )}
        </>
      } />
      <Route path="/tu-the-go-phim" element={<PostureGuide />} />
      <Route path="/huong-dan-telex" element={<TelexGuide />} />
      <Route path="/huong-dan-vni" element={<VniGuide />} />
      <Route path="/bi-mat-phim-f-j" element={<FjRidgeGuide />} />
    </Routes>
  );
}

export default App;
