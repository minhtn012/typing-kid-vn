import { useState, useEffect } from 'react';

/** Ngưỡng coi là "mobile" — khớp media query dùng ở index.css. */
const MOBILE_QUERY = '(max-width: 768px)';

/**
 * useIsMobile: trả về true khi viewport ≤768px.
 *
 * Vì sao viết dạng hook + guard window:
 * - Trang được build tĩnh bằng vite-react-ssg (phase 01). Lúc build phía server
 *   KHÔNG có `window`/`matchMedia` → phải mặc định `false` và chỉ đọc thật sau
 *   khi mount (useEffect chỉ chạy ở client). Nhờ vậy không có hydration mismatch.
 * - Lắng nghe sự kiện `change` để cập nhật khi người dùng xoay ngang/thu phóng.
 *
 * Dùng để chặn giao diện luyện gõ trên điện thoại (gõ 10 ngón cần bàn phím vật lý).
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Guard SSR: matchMedia không tồn tại lúc prerender.
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mediaQuery.matches);

    update(); // đồng bộ ngay lần đầu sau khi mount
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return isMobile;
}
