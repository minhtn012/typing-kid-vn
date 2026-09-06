import { useState, useSyncExternalStore } from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import PracticeSession from './PracticeSession';
import GameSession from './GameSession';
import DesktopNudge from './DesktopNudge';
import { useIsMobile } from '../hooks/useIsMobile';
import { LESSON_MODES } from '../constants';

type ViewMode = 'home' | 'practice';

/**
 * HomeView: điều phối màn hình trang chủ ↔ luyện gõ dựa trên query param
 * (?mode= / ?open= / ?tab=). Trước đây logic này nằm trong App.tsx.
 *
 * Tách riêng để phục vụ SSG (vite-react-ssg): lúc build phía server KHÔNG có
 * `window`, nên state khởi tạo phải tất định, không đọc URL trong initializer.
 * - Server luôn render view 'home' → HTML landing đúng để Google index.
 * - Client: chỉ sau khi hydrate xong mới đọc query param và chuyển view.
 * Nhờ vậy không có hydration mismatch trên các trang SEO.
 */

/** Không có store ngoài để theo dõi: hydrate xong là xong, không đổi lại. */
const subscribeNoop = () => () => {};

/**
 * false lúc prerender và ở lần render đầu phía client (khớp HTML tĩnh),
 * true từ lần render sau khi hydrate. Thay cho mẹo "setState trong useEffect".
 */
function useIsHydrated(): boolean {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

export default function HomeView() {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Khởi tạo tất định (SSR-safe): không chạm window ở initializer.
  const [view, setView] = useState<ViewMode>('home');
  const [selectedModeId, setSelectedModeId] = useState<string>(LESSON_MODES[0].id);

  // Đồng bộ view từ URL: bỏ qua lần render hydrate, chạy lại mỗi lần điều hướng.
  const hydrated = useIsHydrated();
  const locationId = hydrated ? location.key + '|' + location.search : null;
  const [syncedLocationId, setSyncedLocationId] = useState<string | null>(null);

  if (locationId !== null && locationId !== syncedLocationId) {
    setSyncedLocationId(locationId);
    const params = new URLSearchParams(location.search);
    if (params.has('mode') || params.has('open')) {
      const modeFromUrl = params.get('mode') || params.get('open');
      if (modeFromUrl && LESSON_MODES.find(m => m.id === modeFromUrl)) {
        setSelectedModeId(modeFromUrl);
      }
      setView('practice');
    } else {
      setView('home');
    }
  }

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

  if (view === 'practice') {
    // Trên điện thoại: chặn giao diện luyện gõ (cần bàn phím vật lý) → hiện nudge.
    // Trang chủ (view 'home') vẫn render bình thường để đọc trên mobile.
    if (isMobile) {
      return <DesktopNudge onBack={handleBackToHome} />;
    }
    return selectedModeId === 'totoro_chase'
      ? <GameSession onBack={handleBackToHome} />
      : <PracticeSession initialModeId={selectedModeId} onBack={handleBackToHome} />;
  }

  return <HomePage onSelectMode={handleSelectMode} initialTabId={initialTab} />;
}
