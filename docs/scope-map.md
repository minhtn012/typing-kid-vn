# Bản đồ vùng code theo nghiệp vụ — cho `agy-scout.sh --scope`

> Mỗi dòng: alias nghiệp vụ → thư mục/file → 1–3 câu nghiệp vụ và bẫy worker cần biết trước khi đọc code. Cột nghiệp vụ được nạp thẳng vào prompt scout. Ai đổi cấu trúc thư mục hoặc chốt nghiệp vụ mới thì sửa dòng tương ứng.

Site: `https://type.scala.vn/` — app luyện gõ 10 ngón tiếng Việt cho trẻ em (Vite + React 19 + react-router v6, SSG bằng `vite-react-ssg`, deploy Vercel). Tool luyện gõ là desktop-only; 4 trang guide phải đọc tốt trên mobile.

| Alias | Đường dẫn | Nghiệp vụ / bẫy |
|---|---|---|
| `seo` | `src/components/Seo.tsx` `src/components/JsonLd.tsx` `src/components/guide-schema.ts` `src/components/RelatedGuides.tsx` `src/routes.tsx` `src/main.tsx` `index.html` `public/sitemap.xml` `public/robots.txt` `vercel.json` `vite.config.ts` | Hạ tầng SEO: meta/title/canonical render per-route qua `<Head>` của vite-react-ssg (KHÔNG dùng React 19 auto-hoist khi SSG). JSON-LD tĩnh trong `index.html` (SoftwareApplication + FAQPage) + JSON-LD động per-guide. Sitemap tay, 5 URL, lastmod 2026-06-25. Bẫy: `vercel.json` `cleanUrls` + rewrite mọi route (trừ `/assets/`) về `index.html` — file tĩnh SSG được ưu tiên trước rewrite, nhưng URL lạ → soft 404 (200). Bẫy: commit chưa push ≠ đã deploy — verify bằng `curl` live trước khi tick plan (06/09 phát hiện 4 commit SEO 03/07 chưa lên prod). |
| `guides` | `src/pages` | 4 trang nội dung: `/huong-dan-telex`, `/huong-dan-vni`, `/tu-the-go-phim`, `/bi-mat-phim-f-j`. Đã tối ưu on-page keyword (phase 03, 07/2026). Style inline, responsive sẵn. Ảnh ở `public/guides/`. |
| `home` | `src/components/HomePage.tsx` `src/components/HomeView.tsx` `src/components/RootLayout.tsx` `src/components/DesktopNudge.tsx` | Trang chủ `/`: landing + chọn lesson/game; trên ≤768px thay tool luyện gõ bằng nudge "mở trên máy tính". `RootLayout` chứa `<Analytics/>` Vercel. |
| `practice` | `src/components/PracticeSession.tsx` `src/components/GameSession.tsx` `src/components/TypingArea.tsx` `src/components/Keyboard.tsx` `src/components/Hands.tsx` `src/components/Stats.tsx` `src/components/LessonSidebar.tsx` `src/hooks` `src/utils` `src/constants.ts` | Engine luyện gõ + mini game (Telex/VNI tone matching trong `src/utils/typing-engine.ts`, có test vitest). Không liên quan SEO — không scout cho việc SEO. |
