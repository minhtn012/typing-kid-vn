---
phase: 2
title: "VNI Guide & Homepage Content"
status: done
priority: P2
dependencies: [1]
effort: "M"
---

# Phase 2: VNI Guide & Homepage Content

## Overview
Nhân bản công thức nội dung Telex (Phase 1) sang `/huong-dan-vni` để bắt đầu rank, và bổ sung nội dung text on-page cho homepage `/` (pos 28, cụm "gõ 10 ngón" pos 15.5) để đẩy lên page 1.

## Requirements
- **Functional (VNI):** Thêm vào `src/pages/VniGuide.tsx`: bảng gõ VNI đầy đủ render từ `VNI_RULES`, lỗi thường gặp, FAQ + FAQPage JSON-LD.
- **Functional (Homepage):** Thêm khối nội dung text mô tả (crawler đọc được) quanh H1 trong `src/components/HomePage.tsx`; rà title/H1 bám cụm impressions cao.
- **Non-functional:** Tái dùng `JsonLd.tsx` (tạo ở Phase 1); content tự nhiên; build pass; giữ UX.

### Từ khóa mục tiêu (GSC, 28d)
| Query | Pos | Khối nhắm |
|-------|-----|-----------|
| `gõ 10 ngón tiếng việt` | 15.5 | Homepage H1 + nội dung |
| `luyện gõ 10 ngón tiếng việt` | 16.7 | Homepage nội dung |
| `gõ phím 10 ngón` | 40.0 | Homepage nội dung |
| (VNI: chưa có impr) | — | VNI bảng đầy đủ để bắt đầu rank |

## Architecture
- **VNI:** giống Phase 1. Import `VNI_RULES` từ `../constants` (cùng shape `Record<string, string[]>`, dùng phím số). Helper `buildVniTable()` thuần trong file. FAQ array → UI + schema (1 nguồn).
- **Homepage:** hiện H1 = "Luyện gõ 10 ngón tiếng Việt - Phần mềm gõ mười ngón miễn phí" (đã ổn). Thêm 1 khối `<section>` text ngắn (2–3 đoạn) mô tả lợi ích/cách dùng — đặt ở vùng home view (không ảnh hưởng practice view). Đảm bảo nằm trong DOM ban đầu.
- Không trùng lặp: homepage text phải khác mô tả guide (tránh duplicate content nội bộ).

## Related Code Files
- Modify: `src/pages/VniGuide.tsx` (bảng đầy đủ + lỗi + FAQ + JsonLd)
- Modify: `src/components/HomePage.tsx` (khối nội dung text quanh H1)
- Read-only: `src/constants.ts` (`VNI_RULES`)
- Reuse: `src/components/JsonLd.tsx` (từ Phase 1)

## Implementation Steps
1. VNI: import `VNI_RULES`, viết `buildVniTable()` gom nguyên âm × thanh (phím số).
2. VNI: thêm section "Bảng gõ VNI đầy đủ" (nguyên âm × thanh + chữ đặc biệt â=a6, ô=o6, ơ=o7, ư=u7, ă=a8, đ=d9).
3. VNI: thêm section "Lỗi thường gặp" + section so sánh ngắn `<Link to="/huong-dan-telex">`.
4. VNI: thêm FAQ + `<JsonLd data={vniFaqSchema} />` (text trùng hiển thị).
5. Homepage: thêm `<section>` nội dung text (2–3 đoạn) trong home view, bám tự nhiên cụm "luyện gõ 10 ngón tiếng việt", "gõ phím 10 ngón". Style khớp dark theme.
6. Homepage: xác nhận chỉ render ở `view === 'home'` (không lọt vào practice/game).

## Success Criteria
- [ ] `npm run build` pass.
- [ ] VNI có bảng đầy đủ + lỗi + FAQ ≥4 Q&A; FAQPage JSON-LD validate pass.
- [ ] Homepage có khối text mới trong DOM ban đầu (View Source `vite preview`), không lặp nội dung guide.
- [ ] Homepage text không phá vỡ layout home / không xuất hiện ở practice view.
- [ ] Đọc tự nhiên, không nhồi từ khóa.

## Risk Assessment
- **Duplicate content homepage vs guide:** viết góc nhìn khác (homepage = tổng quan/lợi ích; guide = hướng dẫn chi tiết).
- **Homepage text rò vào practice view:** đặt trong nhánh `view === 'home'` (xem `App.tsx`/`HomePage.tsx` logic).
- **VNI_RULES shape khác kỳ vọng:** kiểm tra dữ liệu thực trước khi render (đã xác nhận export tồn tại tại `constants.ts:71`).
