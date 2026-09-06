---
phase: 3
title: "Verification and docs"
status: done
priority: P2
effort: "0.5d"
dependencies: [2]
---

# Phase 3: Verification and docs

## Overview

QA thủ công theo ma trận, xác nhận không regression, cập nhật 2 trang guide (Telex/VNI) để mô tả cả hai kiểu bỏ dấu.

## Requirements

- Functional: guide phản ánh đúng hành vi mới (được gõ dấu cuối từ).
- Non-functional: lint/build sạch (không thêm lỗi mới so với baseline 35 lỗi tồn đọng), SSG build 5 trang vẫn pass.

## QA Matrix (test tay)

| Case | Kiểu gõ | Kỳ vọng |
|------|---------|---------|
| Telex "học đi đôi với hành" | inline (`hojc`) | pass như cũ |
| Telex nt | deferred (`hocj`) | pass, không đếm lỗi |
| VNI "gần mực thì đen" | `ga62n` / `ga6n2` / `gan62` | cả 3 pass |
| VNI bài "đ" | `d9` | phím 9 highlight đúng màu ngón áp út phải (fix 260813) |
| Gõ sai giữa chừng rồi Backspace | mọi kiểu | recover đúng trong từ hiện tại; backspace ở đầu từ mới là no-op |
| Space trước khi xong dấu deferred | `hoc` + space | space tính là lỗi (từ chưa complete), không nhảy từ |
| Hint Keyboard/Hands | chưa gõ gì ở "học" | gợi ý theo word-end: `h→o→c→j`; nếu gõ `h,o,j` (inline) hint tự chuyển theo variant còn alive |
| Câu có hoa "Tôi yêu Việt Nam" | inline + deferred | Shift hoạt động như cũ |
| Custom mode dán văn bản có dấu | cả hai | pass |
| Game Totoro | cả hai | tốc độ phản hồi đúng |
| Firefox (nếu có máy test) | gõ `/`, chữ, space | không mở Quick Find (fix 260813) |

## Related Code Files

- Modify: `src/pages/TelexGuide.tsx`, `src/pages/VniGuide.tsx` (thêm mục "hai cách bỏ dấu đều được chấp nhận")
- Read-only: `release-manifest.json` / quy trình deploy hiện có

## Implementation Steps

1. Chạy `npm run lint` + `npm run build`, so với baseline (35 lỗi tồn đọng — không tăng).
2. Chạy QA matrix trên Chrome; Firefox nếu khả dụng.
3. Cập nhật guide Telex/VNI (nội dung SEO giữ nguyên cấu trúc schema — chỉ thêm đoạn mô tả).
4. Trả lời thread VOZ (tùy user) rằng đã hỗ trợ gõ dấu cuối từ.

## Success Criteria

- [x] Toàn bộ QA matrix pass (browser tự động qua agent-browser; riêng case Firefox chưa test — không có Firefox automation, cần test tay nếu khả dụng).
- [x] Lint không thêm lỗi mới (35 = baseline); build + SSG 5 trang pass.
- [x] Guide Telex/VNI đã mô tả cả hai kiểu gõ (mục "Hai cách bỏ dấu đều được chấp nhận", dateModified 2026-08-13).

## Risk Assessment

- **Regression khó thấy ở bài "Luyện dấu" (ký tự đơn):** ma trận đã có case riêng.
- **SEO guides là trang SSG:** chỉ thêm nội dung tĩnh, rủi ro thấp; kiểm tra output `dist/huong-dan-*.html` sau build.
