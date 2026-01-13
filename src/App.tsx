import { useState } from 'react';
import HomePage from './components/HomePage';
import PracticeSession from './components/PracticeSession';
import { LESSON_MODES } from './constants';

type ViewMode = 'home' | 'practice';

function App() {
  const [view, setView] = useState<ViewMode>('home');
  const [selectedModeId, setSelectedModeId] = useState<string>(LESSON_MODES[0].id);

  const handleSelectMode = (modeId: string) => {
    setSelectedModeId(modeId);
    setView('practice');
  };

  const handleBackToHome = () => {
    setView('home');
  };

  return (
    <>
      {view === 'home' && <HomePage onSelectMode={handleSelectMode} />}
      {view === 'practice' && (
        <PracticeSession
          initialModeId={selectedModeId}
          onBack={handleBackToHome}
        />
      )}
    </>
  );
}

export default App;
