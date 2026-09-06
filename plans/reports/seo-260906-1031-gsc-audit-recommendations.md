# SEO audit + đề xuất — type.scala.vn (2026-09-06)

Nguồn: GSC API (28d/90d, inspect 5 URL), agy-scout `--scope seo,guides,home` (`plans/reports/scout-260906-103321-seo-audit/answer.md`, 19 file / 1641 dòng, spot-check 4 claim OK), curl live site, `vercel ls`.

## 1. Phát hiện chặn (P0): toàn bộ công việc SEO 03/07 CHƯA LÊN PRODUCTION

| Bằng chứng | Giá trị |
|---|---|
| `git status -sb` | `main...origin/main [ahead 4]` — 4 commit SSG/mobile/on-page (03/07) chưa push |
| `vercel ls typing-kid-vn` | deploy prod cuối: 73 ngày trước (≈25/06, trước SSG) |
| curl 5 route + `/khong-ton-tai` | đều 200, đúng 3488 byte, HTML shell CSR cũ: KHÔNG title / description / canonical / h1 |
| `dist/huong-dan-telex.html` local | 39 120 byte, có h1 + meta đầy đủ (SSG hoạt động) |
| GSC inspect | 5/5 "Submitted and indexed", nhưng lastCrawl telex 25/06, posture/fj 23/06 → Google chưa thấy nội dung mới |

Hệ quả: phase 01–03 của plan `260703-1036-seo-ranking-boost` đánh dấu DONE nhưng chưa có tác dụng gì với thứ hạng. Mọi số liệu GSC bên dưới phản ánh bản CSR cũ.

Lưu ý: working tree còn 9 file sửa dở (mini-game, typing-engine, 543+/110−) chưa commit — push `main` chỉ đem 4 commit đã có lên, không dính phần dở.

## 2. Số liệu GSC

**Tổng 90d:** 69 click / 1 253 impr, CTR 5.5 %, vị trí TB 31. VN chiếm 100 % click.

**Theo trang (28d):**

| Trang | Click | Impr | CTR | Pos |
|---|---|---|---|---|
| `/` | 45 | 458 | 9.8 % | 29.2 |
| `/huong-dan-telex` | 2 | 148 | 1.4 % | 15.2 |
| `/huong-dan-vni` | 1 | 91 | 1.1 % | 44.1 |
| `/tu-the-go-phim` | 1 | 13 | 7.7 % | 10.3 |
| `/bi-mat-phim-f-j` | 0 | 5 | 0 % | 5.4 |

Xu hướng so với plan 03/07 (28d khi đó: 9 click / 239 impr): click ×5, impr ×2 — tăng dù chưa deploy gì mới. Telex 19.1 → 15.2.

**Query đáng chú ý (90d):**

| Query | Impr | Pos | Nhận xét |
|---|---|---|---|
| `luyện gõ 10 ngón tiếng việt` | 62 | 11.3 | 28d: pos 6.8 → đã vào trang 1, CTR chỉ 4 % |
| `luyện gõ 10 ngón tiếng việt cho trẻ em` | 13 | 3.2 | intent "trẻ em" khớp thương hiệu, CTR 7.7 % |
| `luyện gõ 10 ngón tiếng việt telex` | 7 | 9.7 | |
| `bảng gõ telex` | 25 | 54.7 | impr cao, hạng thấp → thiếu trang "bảng" thuần tra cứu |
| `bảng vni` / `bảng gõ vni` / `bảng dấu vni` | 8 / 4 / 2 | 71 / 17.5 / 1 | tương tự cho VNI |
| `luyện gõ 10 ngón` (không "tiếng việt") | 11 | 50.8 | head term, chưa cạnh tranh được |
| `10` | 99 | 51.3 | nhiễu, bỏ qua |
| cụm `cách gõ … có dấu / bàn phím có dấu` | ~10 | 54–85 | intent chưa có trang |

Thiết bị 28d: desktop 40 click / 564 impr; mobile 5 / 98 (pos 15.5); tablet 4 / 11. `--low-ctr` trả rỗng (chưa đủ ngưỡng impr).

## 3. Audit kỹ thuật (từ scout, đã spot-check)

| Hạng mục | Trạng thái | Chi tiết |
|---|---|---|
| Meta/title/canonical per-route | OK trong code | `Seo.tsx:33-53` dùng `<Head>` vite-react-ssg; canonical khớp `cleanUrls` + sitemap |
| Soft 404 | LỖI | `routes.tsx:15-38` không có route `*`; `vercel.json` rewrite mọi URL lạ → `index.html` 200 (curl `/khong-ton-tai` = 200) |
| FAQPage trùng | LỖI | `index.html:47` FAQPage tĩnh (3 câu trang chủ) + `TelexGuide.tsx:113` / `VniGuide.tsx:103` FAQPage động → 2 khối FAQPage trên cùng URL guide |
| Sitemap `lastmod` | LỆCH | tĩnh `2026-06-25`, trong khi `dateModified` Article = `2026-08-13`; không có generator |
| Ảnh guide | THIẾU | 4 `<img>` có alt tốt nhưng không `width/height` (CLS), không `loading="lazy"` |
| `og:image` per page | KHÔNG | dùng chung `og-image.png`; `Seo.tsx` không nhận prop image |
| Nav header trang chủ | THIẾU | `HomePage.tsx:68-72` không link `/bi-mat-phim-f-j` (chỉ có ở list guide) |
| Internal link | OK | không orphan, không dead-end; RelatedGuides chéo 4 guide |
| BreadcrumbList + Article | OK | `guide-schema.ts:31-57`; GSC inspect `/huong-dan-vni` đã nhận Breadcrumbs (item "Unnamed" do bản CSR cũ) |
| hreflang / preconnect | KHÔNG | site đơn ngữ, không web font → không cần |
| robots.txt | OK | |

## 4. Đề xuất theo thứ tự ưu tiên

**P0 — Deploy (0 code, hiệu quả lớn nhất)**
1. `git push origin main` → Vercel build `npm run build` (đã là `vite-react-ssg build`). Nếu project chưa nối Git: `vercel --prod`.
2. Verify: `curl -s https://type.scala.vn/huong-dan-telex | grep -c "<h1"` > 0.
3. GSC UI: Request Indexing 5 URL (API không làm được). Sau đó `--inspect` lại sau 3–7 ngày, kỳ vọng lastCrawlTime mới.
4. Cập nhật `sitemap.xml` lastmod về ngày deploy trước khi push.

**P1 — Sửa lỗi kỹ thuật nhỏ (1 phase, ~1 giờ)**
5. Soft 404: thêm route `{ path: '*', element: <NotFound /> }` + đảm bảo SSG xuất `404.html` (Vercel tự phục vụ `404.html` với status 404 cho URL không khớp file tĩnh; khi đó bỏ hoặc thu hẹp rewrite catch-all).
6. Gỡ FAQPage tĩnh khỏi `index.html` → chuyển thành `<JsonLd>` chỉ render ở route `/` (`routes.tsx:22-30`). Giữ SoftwareApplication tĩnh.
7. `<img>` guide: thêm `width`/`height` thật của file PNG + `loading="lazy"` (trừ ảnh đầu trang nếu là LCP).
8. Thêm link `/bi-mat-phim-f-j` vào nav `HomePage.tsx:68`.
9. Sinh `sitemap.xml` tự động lúc build từ `routes` + `dateModified` của từng guide (script nhỏ trong `vite.config.ts` hoặc `scripts/gen-sitemap.mjs` chạy sau `build`) — hết lệch lastmod.

**P2 — Nội dung theo dữ liệu GSC (phase 04 của plan, chọn 2–3 trang)**
10. `/bang-go-telex` — trang tra cứu thuần "bảng gõ telex" (25 impr, pos 55): bảng lớn, ít văn, có nút copy/in, link về guide telex. Intent "bảng" khác intent "hướng dẫn", tách trang mới rank tốt hơn.
11. `/bang-go-vni` — tương tự cho VNI (`bảng vni`, `bảng dấu vni` đã pos 1 nhưng chỉ 2 impr).
12. `/luyen-go-10-ngon-cho-tre-em` — query trẻ em đã pos 3.2, khớp định vị Typing Kid; landing riêng + FAQ cho phụ huynh, CTA vào bài học.
13. Cụm "gõ tiếng việt có dấu / bàn phím có dấu" (pos 54–85): có thể gộp vào 1 mục lớn trong guide Telex/VNI thay vì trang mới (ít impr).
14. Tăng CTR `luyện gõ 10 ngón tiếng việt` (pos 6.8, CTR 4 %): title trang chủ hiện "Gõ 10 ngón tiếng Việt miễn phí | Typing Kid VN" → thử "Luyện gõ 10 ngón tiếng Việt miễn phí cho trẻ em | Typing Kid VN" (khớp cả 2 query top). Đo lại sau 2 tuần.

**P3 — Sau khi SSG live 2–4 tuần**
15. Chạy lại `--top-pages -d 28` và `--inspect` để tách hiệu ứng SSG khỏi nội dung; chỉ khi đó mới đánh giá phase 03 on-page.
16. `og:image` per page: chỉ làm nếu có kênh chia sẻ (Zalo/Facebook) thực tế; hiện traffic 100 % search → xếp cuối.

## 5. Ghi chú vận hành
- Script GSC đã dời sang `.opencode/skills/seo/scripts/gsc-query.cjs` (memory cũ trỏ `.claude/skills/seo/` — đã sửa memory). Thiếu `googleapis` → cài trong scratchpad, chạy với `NODE_PATH`; nên `npm i googleapis` vào `.opencode/skills/seo/` (gitignored) để lần sau khỏi cài lại.
- `docs/scope-map.md` mới tạo (alias `seo`, `guides`, `home`, `practice`) — dùng cho scout các task sau.
- scope-map: `seo` — thêm bẫy "commit chưa push ≠ đã deploy; verify bằng curl live".

## Câu hỏi mở
1. Project Vercel `typing-kid-vn` có nối Git integration không (deploy tự khi push) hay đang deploy tay bằng `vercel --prod`? Quyết định lệnh ở bước P0.1.
2. Phần sửa dở (mini-game, typing-engine) có muốn commit chung đợt này hay để riêng? Đề xuất: push 4 commit SEO trước, game sau.
3. Chọn 2 trong 3 trang P2 cho đợt đầu?
