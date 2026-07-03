import type { RouteRecord } from 'vite-react-ssg';
import RootLayout from './components/RootLayout';
import Seo from './components/Seo';
import HomeView from './components/HomeView';
import PostureGuide from './pages/PostureGuide';
import TelexGuide from './pages/TelexGuide';
import VniGuide from './pages/VniGuide';
import FjRidgeGuide from './pages/FjRidgeGuide';

/**
 * Danh sách route dạng mảng dữ liệu để vite-react-ssg biết đường prerender.
 * Mỗi path ở đây sẽ được build thành 1 file HTML tĩnh có sẵn nội dung + meta.
 * Các trang guide tự render <Seo> bên trong nên không lặp ở đây.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <>
            <Seo
              title="Gõ 10 ngón tiếng Việt miễn phí | Typing Kid VN"
              description="Website học gõ 10 ngón tiếng Việt trực tuyến miễn phí cho trẻ em và người mới bắt đầu. Luyện gõ mười ngón nhanh, chính xác chuẩn Telex và VNI."
              path="/"
            />
            <HomeView />
          </>
        ),
      },
      { path: 'tu-the-go-phim', element: <PostureGuide /> },
      { path: 'huong-dan-telex', element: <TelexGuide /> },
      { path: 'huong-dan-vni', element: <VniGuide /> },
      { path: 'bi-mat-phim-f-j', element: <FjRidgeGuide /> },
    ],
  },
];
