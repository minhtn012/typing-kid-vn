# Plan: Đẩy SEO đợt 2 sau khi SSG lên production

**Slug:** seo-push-round2 · **Ngày:** 2026-09-06 · **Branch:** main
**Trạng thái:** Phase 01–04 xong và đã lên production (06/09) · Phase 05 chờ mốc D+7 (~13/09) · Phase 06 đợt 3
**Kế thừa:** `plans/260703-1036-seo-ranking-boost/` (phase 01–03 lên prod 06/09 ~10:50) + `plans/reports/seo-260906-1031-gsc-audit-recommendations.md`

## Quy tắc cho worker (đọc trước khi làm)

- Đọc/tìm source bằng `tilth` (`tilth <file> --section a-b`, `tilth "<symbol>" --scope src`). Không dùng Read/Grep trên `.ts/.tsx`.
- Hook `scout-block.cjs` chặn lệnh Bash chứa chuỗi literal `node_modules` và `build` (kể cả trong heredoc). Trước khi bắt đầu: thêm dòng `!build` vào `~/.claude/.ckignore` (hook tự hướng dẫn khi chặn). Viết file markdown bằng Write tool.
- Build = `tsc -b && vite-react-ssg build`, sau đó script `postbuild` sinh `dist/sitemap.xml`. Verify SEO bằng file trong `dist/*.html`, không tin console.
- Không đụng alias `practice` (`src/components/PracticeSession.tsx`, `GameSession.tsx`, `TypingArea.tsx`, `src/hooks`, `src/utils`).
- Mỗi phase 1 commit, conventional commit tiếng Việt như lịch sử repo (`feat(seo): ...`, `docs(seo): ...`), không nhắc AI/plan-id trong message hay comment code.
- Deploy: push `main` → Vercel tự build (đã xác nhận 06/09). Sau push, `curl` live để xác nhận trước khi tick.
- Sau mỗi phase: cập nhật cột Trạng thái bảng Phases + trả lời "phase này có đổi nghiệp vụ alias nào trong `docs/scope-map.md` không?" — có thì sửa dòng đó.

## Bối cảnh (đã verify 06/09 11:15)

| Mục | Trạng thái live |
|---|---|
| Deploy prod | 5 route trả HTML SSG đủ title/description/canonical/h1 |
| URL lạ | 404 thật (Vercel text, chưa có `404.html`) — không cần sửa |
| Google crawl | `lastCrawlTime` 5 URL vẫn 25/06 → chưa thấy bản mới |
| Sitemap | lastmod tĩnh 2026-06-25, GSC lastDownloaded 28/08 |
| GSC 28d | 49 click / 715 impr; `/` pos 29; `/huong-dan-telex` pos 15 |

Query cơ hội (90d): `luyện gõ 10 ngón tiếng việt` 62 impr pos 11 (28d 6.8) · `tập gõ 10 ngón` 57 impr pos 64 · nhóm `bảng * telex` ≈45 impr pos 26–86 · `bảng vni` 8 impr pos 71 · `luyện gõ 10 ngón tiếng việt cho trẻ em` 13 impr pos 3.2.

## Acceptance criteria

1. D+7: `--inspect` 5 URL cũ cho `lastCrawlTime` > 2026-09-06.
2. `dist/huong-dan-telex.html` và `dist/huong-dan-vni.html` mỗi file đúng 1 `"FAQPage"`; `dist/index.html` đúng 1.
3. `dist/sitemap.xml` sinh lúc build, lastmod = ngày commit gần nhất của file trang, 8 URL sau phase 04.
4. 3 trang mới có HTML SSG, meta riêng, canonical đúng, indexed trong 14 ngày.
5. D+28 (~05/10): `luyện gõ 10 ngón tiếng việt` pos ≤ 8; `bảng gõ telex` top 20; tổng click 28d ≥ 80.

## Non-goals

- Không đụng engine luyện gõ / mini game. Không `og:image` per page, không hreflang, không `404.html` đẹp.
- Không mua backlink; off-page chỉ VOZ thread + nhóm phụ huynh.

## Phases

| # | Phase | Mục tiêu | Phụ thuộc | Trạng thái |
|---|---|---|---|---|
| 01 | [Kích index + sitemap tự động](phase-01-reindex-and-sitemap.md) | Google crawl lại bản SSG, hết lệch lastmod | — | code + build verify xong; còn submit sitemap GSC + Request Indexing (user) |
| 02 | [Sửa on-page kỹ thuật](phase-02-onpage-fixes.md) | FAQPage, ảnh, nav, title trang chủ | — | xong, smoke PASS sau khi sửa cuộn ngang 375px |
| 03 | [Bảng gõ in được](phase-03-lookup-tables.md) | `/bang-go-telex`, `/bang-go-vni` | 01 | xong, smoke 5/5 PASS |
| 04 | [Landing phụ huynh](phase-04-kids-landing.md) | `/tap-go-10-ngon-cho-be` | 01, 02 | xong |
| 05 | [Đo lường + off-page](phase-05-measure-and-offpage.md) | Số liệu D+7/14/28, VOZ | 01–04 | chờ mốc ~13/09 |
| 06 | [Trang chọn phần mềm + mục bật kiểu gõ](phase-06-competitor-page-and-setup-sections.md) | Intent "phần mềm cho trẻ em", "bật Telex trên Win/Mac/điện thoại" | 05 (D+14) | đợt 3 |

Từ khóa mở rộng và cụm theo trang: [keyword-research.md](keyword-research.md) (Google Suggest 06/09, không có volume).

**Thứ tự:** verify + commit 01+02 chung 1 commit, push → 03 (commit, push) → 04 (commit, push) → 05 theo lịch.

## Quyết định đã chốt (user đồng ý 06/09)

1. Title trang chủ → "Luyện gõ 10 ngón tiếng Việt miễn phí cho trẻ em | Typing Kid VN".
2. Sitemap sinh từ `git log -1 --format=%cs` của file trang, chạy `postbuild`; xóa `public/sitemap.xml`.
3. FAQPage tĩnh trong `index.html` → `src/components/home-faq.ts` + `<JsonLd>` chỉ ở route `/`.
4. Trang trẻ em slug `/tap-go-10-ngon-cho-be` (cụm "tập gõ" hạng 64/57 impr), KHÔNG nhắm "luyện gõ … cho trẻ em" (trang chủ đã pos 3.2).
5. Bỏ `/telex-vs-vni` (0 query so sánh trong 200 query 90d). `/luyen-go-nhanh` để đợt 3 (~20 impr rải 8 biến thể).
6. Ảnh guide: thêm width/height, KHÔNG `loading="lazy"` vì là ảnh đầu tiên ngay dưới h1 (ứng viên LCP).
7. Trang bảng gõ: guide đã có bảng nguyên âm × thanh (`TelexGuide.tsx` mục 3, `VniGuide.tsx` tương tự) → trang mới phải là **bản in A4** + bảng từ hay gặp, tái dùng dữ liệu bảng qua module chung, không copy văn.
8. Title guide Telex giữ nguyên đến D+14; nếu 2 URL thay nhau hiện cho `bảng gõ telex` thì bỏ "Bảng chữ Telex &" khỏi title guide (phase 05 quyết).

## Ghi chú

- scope-map: `seo` — soft 404 đã hết, Vercel nối Git, sitemap sinh postbuild, FAQPage tĩnh lặp mọi route (đã sửa dòng 06/09).
- scope-map: `guides` — sau phase 03–04 sẽ có 7 trang nội dung; cập nhật dòng khi commit phase 04.

## Nhật ký thực thi

### 06/09 13:20 — phase 01 + 02

- Build pass, `dist/sitemap.xml` 5 URL hợp lệ, lastmod guide 2026-09-06 (lấy từ git, không còn 2026-06-25).
- `dist`: `index.html`/`huong-dan-telex`/`huong-dan-vni` mỗi trang đúng 1 FAQPage; `tu-the-go-phim`/`bi-mat-phim-f-j` 0; mọi `<img>` có width/height; title trang chủ đúng bản đã chốt; `bi-mat-phim-f-j` xuất hiện 2 lần trong `dist/index.html`.
- `npm test` 27/27 pass. `npm run lint` ĐỎ SẴN từ trước (34 lỗi ở `src/hooks/useTyping.ts`, `LessonSidebar`, `HomeView`, `GameSession`, `RelatedGuides`, `.opencode/**`) — không file nào thuộc phase 01/02; gate lint dùng bản giới hạn theo file.
- Smoke agy (`plans/reports/smoke-260906-130123-p12-nav-img/`): nav 4 link OK ở 1280 và 375; **FAIL** cuộn ngang `/huong-dan-telex` ở 375px.
- Xác minh lỗi cuộn ngang **có sẵn trên production** (`scrollWidth` 600 vs `innerWidth` 375 trên `/huong-dan-telex` và `/huong-dan-vni` live, `/tu-the-go-phim` bình thường) → không phải hồi quy của phase 02. Nguyên nhân: `#root` là flex column, wrapper trang guide chỉ có `maxWidth: 800px` nên bị co theo `min-content` = bảng `minWidth: 560px` + padding 40. Sửa: thêm `width: '100%'` vào wrapper 4 trang guide. Sau sửa cả 5 route đều `scrollWidth == innerWidth == 375`.

### 06/09 13:20 — phase 03

- Giao worker `agy` (`task-1-lookup-tables.md`, `gemini-3.8-flash-high`, 314s). Worker báo BLOCKED vì **tiêu chí 14 của spec sai**: `grep -c` đếm số dòng khớp, mà vite-react-ssg dồn cả DOM vào 1 dòng nên luôn ra 1; `grep -o … | wc -l` ra đúng 2. 17 tiêu chí còn lại pass. Đã sửa tiêu chí trong spec.
- Coordinator tự chạy lại: `tsc -b`, `npm test` 27/27, `npm run build`, `npx eslint src/pages src/routes.tsx` — đều exit 0. Escape check repo chính sạch.
- 2 test hồi quy bảng guide trước/sau khi tách `typing-table-data.ts`: `SAME`.
- `CONV_VIOLATION=14` là dương tính giả — script đoán stack là `vue` (repo là React), 12/14 là `rgba(255,255,255,0.03)` chép nguyên từ code cũ. `LINT_DODGE=0`.
- Sửa tay sau apply: bỏ `export` thừa của `VOWEL_GROUPS` (`DEAD_EXPORT=1`), thêm newline cuối `src/index.css`, viết lại đoạn mở `/bang-go-vni` cho khác `/bang-go-telex`, điền phần ghi tay `docs/ui-map.md`.
- Smoke agy (`plans/reports/smoke-260906-131844-p03-tables/`) 5/5 PASS: 2 trang mới `scrollWidth == innerWidth == 375`, bảng nguyên âm cuộn trong khung (`560 > 335`, `overflowX: auto`), chuỗi phím VNI đọc từ DOM đúng (`chữ → chu74`, `được → d9u7o7c5`), link chéo chạy, guide Telex sau refactor vẫn 12 dòng × 7 cột.
- `dist`: 7 trang; 2 trang bảng `h1=1`, `FAQPage=0`, `BreadcrumbList=1`, `Article=1`, canonical đúng; `sitemap.xml` 7 URL.

### 06/09 19:20 — phase 04

- Dispatch `agy` 2 lần đều ERROR phía Antigravity (attempt1 `network issue` sau 5023s, retry `timeout` sau 569s) — **không phải lỗi spec**: worker đã ghi xong đủ 5 file trong worktree trước khi mất kết nối. Coordinator lấy diff từ worktree, tự chạy toàn bộ acceptance criteria thay cho báo cáo worker.
- Verify tự chạy: `tsc -b`, `npm test` 27/27, `npm run build`, `npx eslint src/pages src/routes.tsx src/components/HomePage.tsx` — exit 0. `dist/tap-go-10-ngon-cho-be.html`: h1=1, h2=7, FAQPage=1, BreadcrumbList=1, Article=1, canonical đúng, 1672 từ trong `<article>`, đủ 6 link `?mode=`, 0 lần xuất hiện cụm cấm "luyện gõ 10 ngón tiếng việt cho trẻ em". Sitemap 8 URL.
- Sửa tay: meta description 161 ký tự → 156 (Google cắt ~155).
- Smoke agy timeout sau 2/5 bước (Antigravity không ổn định cả ngày). Coordinator tự verify bằng `agent-browser eval` (chỉ số liệu, không ảnh): trang mới ở 375px `scrollWidth 375 == innerWidth 375`, 1 h1, 7 h2, bảng 4 dòng, bảng bọc `overflowX: auto`; CTA "Bắt đầu tuần 1 ngay" → `/?mode=basic_home` kèm dòng nhắc mở trên máy tính; "Hướng dẫn liên quan" 6 thẻ; trong bài đủ link tới 2 guide, 2 bảng gõ, tư thế, phím F/J; nav trang chủ 5 link, trang chủ không cuộn ngang; 0 lỗi console.
- `/?mode=basic_home` mở đúng màn luyện gõ ("Cơ bản: Hàng phím cơ sở", WPM, bàn phím ảo). Lưu ý: `agent-browser click` trên link trong ô bảng **không** điều hướng (hit-test lỗi của công cụ), `el.click()` thì được — app không có lỗi.

### 06/09 19:20 — ngoài plan, user duyệt

- Phát hiện trang chủ có **hai** danh sách link và khối "Cẩm nang" hardcode 4 thẻ (không đọc `GUIDES`), nên `/bang-go-telex` và `/bang-go-vni` không được trang chủ link tới lần nào. User chọn thêm 3 thẻ vào khối Cẩm nang (thành 7). Sau khi thêm: mọi trang nội dung đều có ≥1 link từ trang chủ.
