import { ViteReactSSG } from 'vite-react-ssg';
import './index.css';
import { routes } from './routes';

/**
 * Entry cho vite-react-ssg. Xuất `createRoot` để tool dùng chung cho cả:
 * - build SSG (render tĩnh từng route ra HTML),
 * - hydrate phía client sau khi tải trang.
 * Router (createBrowserRouter/StaticRouter) do vite-react-ssg tự quản từ `routes`.
 */
export const createRoot = ViteReactSSG({ routes });
