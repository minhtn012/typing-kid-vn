# Plan: Tăng thứ hạng SEO cho Typing Kid VN

**Slug:** seo-ranking-boost
**Ngày:** 2026-07-03
**Branch:** main
**Trạng thái:** ĐANG THỰC HIỆN — Phase 01 ✅ done (chờ code-review), Phase 02 ✅ done (build + code-review pass), Phase 03 ✅ done (build + SSG render verify pass), Phase 04 chưa bắt đầu

## Quyết định đã chốt
1. **Prerender:** SSG thật bằng `vite-react-ssg` 0.9.0.
2. **react-router:** hạ v7 → v6 (`^6.30.4`) vì vite-react-ssg cần subpath `react-router-dom/server` (v7 đã bỏ). App chỉ dùng API cơ bản nên v6 tương thích. Xác minh bằng build thực tế: pass.
3. **Meta vào `<head>`:** dùng component `<Head>` của vite-react-ssg trong `Seo.tsx` (React 19 auto-hoist bị kẹt thẻ trong `<body>` khi SSG).
4. **Phase 04:** làm trong đợt này, 3 trang mới (`/telex-vs-vni`, `/luyen-go-nhanh`, `/bai-tap-go-10-ngon-cho-tre-em`).

## Bối cảnh

App luyện gõ 10 ngón tiếng Việt (`https://type.scala.vn/`) — Vite + React 19 SPA, react-router v7, deploy Vercel. Dữ liệu GSC 28 ngày: ~9 clicks / ~239 impressions, site còn nhỏ, đang giai đoạn Google index & thử hạng.

**Phát hiện chính từ GSC:**
- Trang chủ gánh gần như toàn bộ traffic (9 clicks / 212 impr).
- Guide `/huong-dan-telex` leo hạng mạnh 61.9 → 19.1 → nội dung đang có tác dụng.
- Keyword `"gõ 10 ngón tiếng việt"` ở vị trí 11.4 (đầu trang 2) — sát trang 1, cơ hội thắng nhanh.
- Nhiều long-tail telex/vni ở vị trí 45–87 → thiếu nội dung/độ sâu.
- Mobile: 16 impr / 0 click.

**Vấn đề nền tảng:** SPA render 100% client-side, KHÔNG prerender (`vercel.json` rewrite mọi route về `index.html` rỗng, không có plugin SSG). Google phải chạy JS mới thấy nội dung → index chậm, kém ổn định, kìm thứ hạng.

## Nguyên tắc sản phẩm: tách 2 công việc

| Phần | Mobile? | Lý do |
|---|---|---|
| Công cụ luyện gõ (`/` practice, game) | Không | Gõ 10 ngón cần bàn phím vật lý → desktop-only là đúng |
| Trang hướng dẫn (`/huong-dan-*`, `/tu-the-*`, `/bi-mat-*`) | Có | Nội dung để đọc/tra cứu → nhiều lượt search từ điện thoại |

## Mục tiêu (Acceptance Criteria)

1. `view-source` các trang guide hiện nội dung + meta đã render sẵn (không cần JS). Test: `curl -s https://type.scala.vn/huong-dan-telex | grep "<h1"` ra kết quả.
2. Trang guide đọc tốt trên điện thoại (không tràn ngang, chữ ≥16px, tap target ≥44px).
3. Trang chủ trên mobile hiện nudge "mở trên máy tính" thay vì giao diện luyện gõ hỏng.
4. On-page trang chủ + guide chứa đúng cụm keyword mục tiêu (đặc biệt "gõ 10 ngón tiếng việt").
5. Không hồi quy: build pass, các route hoạt động như cũ trên desktop.

## Phases

| # | Phase | Mục tiêu | Phụ thuộc |
|---|---|---|---|
| 01 | [Prerender infrastructure](phase-01-prerender-infrastructure.md) | SSG cho toàn bộ route → HTML thật | — |
| 02 | [Mobile guides + desktop nudge](phase-02-mobile-guides-and-nudge.md) | Guide responsive + banner mobile trang chủ | 01 |
| 03 | [On-page keyword optimization](phase-03-onpage-keyword-optimization.md) | Vợt keyword sát trang 1 + long-tail | 01 |
| 04 | [New content pages](phase-04-new-content-pages.md) | Mở rộng độ phủ (tùy chọn, làm sau) | 01,03 |

**Thứ tự khuyến nghị:** 01 → (02 ∥ 03) → 04. Phase 01 là nền tảng, mở khóa hiệu quả cho mọi phase sau.

## Đo lường (sau 2–4 tuần)

Chạy lại: `node .claude/skills/seo/scripts/gsc-query.cjs --top-pages -s "https://type.scala.vn/" -d 28`
- Kỳ vọng: `"gõ 10 ngón tiếng việt"` lên trang 1 (<10); guide bắt đầu ra click; số trang index tăng.

## Câu hỏi mở

1. **Chọn cách prerender:** `vite-react-ssg` (SSG thật, cần refactor routes thành mảng) vs snapshot bằng puppeteer (giữ nguyên code, thêm bước build). Plan đề xuất `vite-react-ssg` — xác nhận? (chi tiết ở phase 01)
2. Có muốn làm phase 04 (thêm trang nội dung mới) ngay đợt này hay để đợt sau?
3. Ngân sách thời gian cho đợt này? (ảnh hưởng phạm vi phase 04)
