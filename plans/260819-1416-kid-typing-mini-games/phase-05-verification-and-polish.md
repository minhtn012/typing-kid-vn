---
phase: 5
title: "Verification & polish"
status: pending
priority: P1
effort: "0.5d"
dependencies: [2, 3, 4]
---

# Phase 5: Verification & polish

## Overview

Chốt chất lượng toàn bộ: build/test/lint, kiểm tra bundle split, chơi xuyên suốt 4 game (kể cả totoro cũ), đồng bộ mô tả trang chủ, cập nhật docs/SEO copy nếu trang chủ đổi nội dung hiển thị.

## Requirements

- Functional: 4 game chơi trọn vòng từ trang chủ; deep-link `?mode=balloon_pop` v.v. hoạt động (HomeView đọc query param sẵn — chỉ cần entry LESSON_MODES đúng id).
- Non-functional: bundle entry không chứa three; Lighthouse trang chủ không tụt so với baseline trước khi merge.

## Architecture

Không thêm kiến trúc mới — đây là phase kiểm chứng + dọn dẹp.

## Related Code Files

- Modify (nếu cần): `src/components/HomePage.tsx` (polish mô tả/emoji card game)
- Modify (nếu cần): `src/components/PracticeSession.tsx` (chuyển sang `useGameKeyboard` để hết trùng lặp — chỉ khi còn thời gian, non-blocking)
- Modify (nếu cần): docs/SEO liên quan nếu nội dung trang chủ user-visible thay đổi

## Implementation Steps

1. `npm run lint && npm test && npm run build` — sửa mọi lỗi phát sinh.
2. Kiểm tra `dist/assets/`: xác nhận chunk chứa three tách riêng (`grep -l "THREE" dist/assets/*.js` hoặc so kích thước); entry chunk kích thước ~ như trước.
3. `npm run preview` → chơi xuyên suốt cả 4 game: thắng, thua (meteor), chơi lại, thoát giữa chừng rồi vào lại; test deep-link `?mode=` cho 3 game mới.
4. Kiểm tra SSG output: các trang prerender (`dist/index.html`, guides) không chứa markup game/three.
5. Polish nhỏ theo cảm nhận khi chơi thật: copy tiếng Việt thân thiện với bé, kích thước chữ trong game đủ to.
6. Nếu còn thời gian: PracticeSession dùng `useGameKeyboard` (dọn trùng lặp).

## Success Criteria

- [ ] `npm run lint`, `npm test`, `npm run build` đều pass.
- [ ] Entry chunk không chứa three; kích thước entry không tăng đáng kể (>5%).
- [ ] 4 game + deep-link chơi được trọn vòng trên preview build (không chỉ dev server).
- [ ] SSG pages sạch, không hydration warning trong console.

## Risk Assessment

- Nếu Lighthouse tụt vì lý do ngoài game (ảnh, font) → ghi nhận riêng, không gộp vào scope này.
