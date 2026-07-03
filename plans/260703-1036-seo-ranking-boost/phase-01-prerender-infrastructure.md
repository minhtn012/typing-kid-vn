# Phase 01 — Prerender Infrastructure (SSG)

**Mục tiêu:** Mọi route xuất ra HTML thật có sẵn nội dung + meta khi build, không phụ thuộc JS chạy phía client. Đây là đòn bẩy SEO lớn nhất.

## Bối cảnh kỹ thuật hiện tại

- `src/main.tsx`: `createRoot(...).render(<BrowserRouter><App/></BrowserRouter>)` — CSR thuần.
- `src/App.tsx`: routes khai báo bằng JSX `<Routes><Route .../></Routes>`. 5 route:
  `/`, `/tu-the-go-phim`, `/huong-dan-telex`, `/huong-dan-vni`, `/bi-mat-phim-f-j`.
- `src/components/Seo.tsx`: dùng React 19 auto-hoist `<title>/<meta>/<link>` (không react-helmet).
- `vercel.json`: rewrite `/(.*)` → `/index.html` (catch-all, sẽ cần chỉnh).

## Cách tiếp cận đề xuất: `vite-react-ssg`

**Lý do chọn:** Vite-native, hỗ trợ react-router v7 + React 19, tận dụng được cơ chế hoist meta sẵn có, sinh SSG thật (đáng tin hơn snapshot puppeteer, không cần Chrome trong CI).

**Trade-off:** cần refactor khai báo route từ JSX sang mảng dữ liệu (routes array). Với 5 route → nhỏ.

> Phương án B (fallback nếu refactor vướng): `@prerenderer/rollup-plugin` + renderer puppeteer — giữ nguyên `App.tsx`, thêm bước snapshot HTML sau build. Đổi lại phụ thuộc headless Chrome.

## Các bước triển khai (phương án A)

1. **Cài dependency**
   `npm i -D vite-react-ssg` (kiểm tra tương thích React 19 / Vite hiện tại; nếu lệch, cân nhắc phương án B).

2. **Chuyển routes sang mảng** — tạo `src/routes.tsx` export mảng `RouteRecord[]` tương ứng 5 route. Giữ nguyên các element component hiện có.

3. **Sửa entry `src/main.tsx`**
   Thay `createRoot(...)` bằng `export const createRoot = ViteReactSSG({ routes }, ...)`. Chuyển `<Analytics/>` vào layout gốc. Bỏ `<BrowserRouter>` (SSG tự quản router).

4. **Cập nhật `package.json` scripts**
   `"build": "vite-react-ssg build"` (giữ `tsc -b` phía trước để typecheck).

5. **Xử lý code phụ thuộc `window`**
   `App.tsx` đọc `window.location.search` khi khởi tạo state → khi SSG chạy phía server `window` không tồn tại. Bọc guard `typeof window !== 'undefined'` hoặc chuyển logic đọc query-param vào `useEffect`. **Bắt buộc** nếu không build SSG sẽ crash.

6. **Chỉnh `vercel.json`**
   Cho phép Vercel phục vụ file tĩnh đã prerender trước, chỉ fallback SPA cho route không tồn tại. Dùng `cleanUrls: true` + bỏ/điều chỉnh catch-all rewrite để không đè lên `dist/huong-dan-telex/index.html`.

## Validation

- `npm run build` pass, không lỗi `window is not defined`.
- `dist/` có `huong-dan-telex/index.html`, `huong-dan-vni/index.html`, ... với nội dung `<h1>` + `<meta name="description">` render sẵn.
- `npm run preview` → `view-source` mỗi route thấy nội dung thật.
- Sau deploy: `curl -s https://type.scala.vn/huong-dan-telex | grep -c "<h1"` > 0.
- Desktop: mọi route + luyện gõ vẫn chạy như cũ (không hồi quy hydration).

## Rủi ro & rollback

- **Hydration mismatch** giữa HTML SSG và client (thường do `window`/thời gian). Xử lý: guard các API browser, đảm bảo render lần đầu deterministic.
- **`vite-react-ssg` lệch version** React 19/Vite → chuyển phương án B.
- Rollback: revert commit; `vercel.json` catch-all cũ đưa site về trạng thái CSR ban đầu (vẫn hoạt động).

## Files

- Sửa: `src/main.tsx`, `src/App.tsx`, `package.json`, `vercel.json`
- Tạo: `src/routes.tsx`
- Không đụng: nội dung các trang guide (để phase 03)

## Kết quả thực hiện (2026-07-03) — ✅ DONE

**Đã làm:**
- Cài `vite-react-ssg@0.9.0` (`--legacy-peer-deps`).
- Hạ `react-router-dom` v7 → v6.30.4 (bắt buộc: v7 bỏ subpath `/server` mà tool cần).
- Tạo `src/routes.tsx` (mảng route), `src/components/RootLayout.tsx`, `src/components/HomeView.tsx` (tách logic home↔practice, SSR-safe).
- `src/main.tsx` → `export const createRoot = ViteReactSSG({ routes })`. Xoá `src/App.tsx`.
- `src/components/Seo.tsx` → dùng `<Head>` của vite-react-ssg (thay React-19 auto-hoist bị kẹt thẻ trong `<body>`).
- `package.json` build → `vite-react-ssg build`. `vercel.json` → `cleanUrls: true`.

**Xác minh (empirical):**
- Build pass, 5 file HTML prerender: index (20KB), huong-dan-telex (35KB), huong-dan-vni (33KB), tu-the-go-phim, bi-mat-phim-f-j.
- `<title>/<meta description>/<link canonical>/<og:*>` per-page nằm ĐÚNG trong `<head>` (có `data-rh`).
- `<h1>` + nội dung + JSON-LD FAQ schema đã static trong HTML.
- HTTP smoke test (vite preview): homepage + guide phục vụ đúng title/h1, có client hydration script.
- Lint: 0 lỗi mới ở file tôi tạo (routes/RootLayout/Seo/main sạch); HomeView giữ pattern setState-in-effect y hệt App.tsx gốc.

**Chờ:** code-review (subagent) xác nhận hydration + không regression tool luyện gõ.
