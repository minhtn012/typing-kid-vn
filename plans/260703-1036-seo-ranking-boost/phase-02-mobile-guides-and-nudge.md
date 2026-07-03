# Phase 02 — Mobile-friendly Guides + Desktop Nudge

**Trạng thái:** ✅ DONE (2026-07-03). Audit: guides đã responsive sẵn (bảng lớn `overflowX:auto`, ảnh `width:100%`, grid `auto-fit`), `App.css` là dead code (không import). Đã thêm: hook `useIsMobile` (SSR-safe), component `DesktopNudge`, nhánh chặn practice/game trên ≤768px trong `HomeView`, class `.tap-target` (min 44px, mobile-only) cho link back guide + nav trang chủ. Build + code-review pass.

**Mục tiêu:** Trang hướng dẫn đọc tốt trên điện thoại (nơi người dùng tra cứu); trang chủ trên mobile hướng người dùng về máy tính thay vì hiện giao diện luyện gõ hỏng.

**Phụ thuộc:** Phase 01 (để HTML prerender phục vụ đúng cả trên mobile crawler).

## Nguyên tắc

- KHÔNG làm bàn phím ảo / luyện gõ cho mobile (gõ 10 ngón cần bàn phím vật lý).
- CÓ làm 4 trang guide responsive: `/huong-dan-telex`, `/huong-dan-vni`, `/tu-the-go-phim`, `/bi-mat-phim-f-j`.

## Hiện trạng

- `src/App.css` gần như không có responsive (chỉ `max-width: 1280px` + `prefers-reduced-motion`).
- Chưa rõ mức responsive của từng trang guide → cần audit nhanh trước khi sửa.

## Các bước

1. **Audit mobile nhanh** — mở 4 trang guide ở viewport 375px, ghi nhận: tràn ngang, chữ nhỏ, bảng/hình vỡ layout, tap target nhỏ. (dùng skill `web-testing`/Playwright hoặc DevTools thủ công)

2. **Guide responsive**
   - Đảm bảo có `<meta name="viewport" content="width=device-width, initial-scale=1">` trong `index.html` (kiểm tra).
   - Container guide: `max-width` + `width: 100%` + padding co giãn; chữ body ≥16px.
   - Bảng tra cứu telex/vni: cho `overflow-x: auto` bọc riêng, không để tràn cả trang.
   - Ảnh/sơ đồ bàn phím: `max-width: 100%; height: auto`.
   - Tap target (link, nút "về trang chủ") ≥44px.

3. **Desktop nudge ở trang chủ (mobile)**
   - Khi viewport ≤ ~768px và người dùng vào chế độ luyện gõ (`view === 'practice'`), thay canvas luyện gõ bằng banner thân thiện:
     *"👉 Mở trên máy tính (có bàn phím) để luyện gõ 10 ngón nhé!"* + link về nội dung/guide đọc được trên mobile.
   - Trang chủ (landing) vẫn đọc bình thường trên mobile — chỉ chặn phần *thao tác luyện gõ*.
   - Ưu tiên CSS/media-query; nếu cần logic, có thể dùng 1 hook nhỏ đọc `matchMedia` (guard SSR theo phase 01).

## Validation

- 4 trang guide ở 375px: không cuộn ngang toàn trang, chữ đọc được, bảng cuộn nội bộ.
- Trang chủ mobile ở chế độ practice: hiện nudge, không hiện giao diện gõ vỡ.
- Desktop: không đổi hành vi.
- Lighthouse mobile (guide) — không còn cảnh báo "tap targets"/"content wider than screen".

## Files

- Sửa: `src/pages/TelexGuide.tsx`, `VniGuide.tsx`, `PostureGuide.tsx`, `FjRidgeGuide.tsx` (nếu style inline), CSS liên quan (`App.css`/`index.css` hoặc CSS module của guide).
- Sửa: `src/components/HomePage.tsx` hoặc `PracticeSession.tsx` (nudge mobile).
- Kiểm tra: `index.html` (viewport meta).
