import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import PracticeSession from './components/PracticeSession';
import GameSession from './components/GameSession';
import { LESSON_MODES } from './constants';

type ViewMode = 'home' | 'practice';

function App() {
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

  const initialTab = (() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || params.get('open') || undefined;
  })();

  // Keep URL in sync with state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (view === 'practice') {
      params.set('mode', selectedModeId);
    } else {
      params.delete('mode');
    }

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [view, selectedModeId]);

  const handleSelectMode = (modeId: string) => {
    setSelectedModeId(modeId);
    setView('practice');
  };

  const handleBackToHome = () => {
    setView('home');
  };

  return (
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
  );
}

export default App;
