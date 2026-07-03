import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

/**
 * Layout gốc bọc mọi route: gắn Vercel Analytics một lần, render route con
 * qua <Outlet/>. Thay cho <BrowserRouter><App/><Analytics/></BrowserRouter> cũ.
 *
 * Tách khỏi routes.tsx để routes.tsx chỉ export dữ liệu (mảng route), tránh lỗi
 * react-refresh "file vừa export component vừa export non-component".
 */
export default function RootLayout() {
  return (
    <>
      <Outlet />
      <Analytics />
    </>
  );
}
