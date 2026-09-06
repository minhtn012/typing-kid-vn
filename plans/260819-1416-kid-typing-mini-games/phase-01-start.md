---
phase: 1
title: "Nền tảng — game registry + shared hooks/components"
status: pending
priority: P1
effort: "0.5d"
dependencies: []
---

# Phase 1: Nền tảng — game registry + shared hooks/components

## Overview

Chuẩn bị hạ tầng để thêm game không phải sửa điều phối: registry `modeId → lazy component` trong HomeView, mở rộng `useTyping` expose `wordIndex`, tách hook keydown + 2 component UI dùng chung.

## Requirements

- Functional: HomeView render game qua registry; `totoro_chase` vẫn hoạt động y hệt; `useTyping` trả thêm `wordIndex`.
- Non-functional: non-breaking với PracticeSession/GameSession; SSG-safe (không `window` ở initializer).

## Architecture

- `GAME_COMPONENTS: Record<string, React.LazyExoticComponent<React.ComponentType<{onBack: () => void}>>>` trong `HomeView.tsx`, bọc `<Suspense fallback>`. `GameSession` cũng chuyển sang `React.lazy` luôn cho đồng nhất.
- `useTyping` đã có `safeIdx` nội bộ (`src/hooks/useTyping.ts:62`) → return thêm `wordIndex: safeIdx` và `wordCount: tokens.length`. Không đổi hành vi hiện có.
- Hook mới `useGameKeyboard(handleKeyDown: (e: KeyboardEvent) => void, active: boolean)`: gói effect addEventListener/preventDefault đang lặp ở `GameSession.tsx:158-177` (và tương tự trong PracticeSession). GameSession chuyển sang dùng hook; PracticeSession để nguyên (tránh phình scope — dọn ở phase 5 nếu còn thời gian).
- Component `GameOverlay` ({state: 'won'|'lost', title, message, onReplay, onBack, stats?}): overlay kết quả + nút "Chơi lại"/"Về trang chủ", style glass + confetti khi won.
- Component `GameHud` ({onBack, title, children?}): header back button + tiêu đề game (pattern từ `GameSession.tsx:189-197`).

## Related Code Files

- Create: `src/components/games/GameOverlay.tsx`
- Create: `src/components/games/GameHud.tsx`
- Create: `src/hooks/useGameKeyboard.ts`
- Modify: `src/hooks/useTyping.ts` (expose `wordIndex`, `wordCount`)
- Modify: `src/components/HomeView.tsx` (registry + Suspense + lazy)
- Modify: `src/components/GameSession.tsx` (dùng useGameKeyboard, GameHud, GameOverlay nếu khớp — tối thiểu là useGameKeyboard)

## Implementation Steps

1. Mở rộng `useTyping`: return `wordIndex: safeIdx`, `wordCount: tokens.length`. Chạy `npm test` xác nhận không vỡ engine test.
2. Tạo `useGameKeyboard.ts`; refactor GameSession dùng hook này.
3. Tạo `GameHud.tsx`, `GameOverlay.tsx` dưới `src/components/games/`.
4. HomeView: khai báo `GAME_COMPONENTS` (lazy import GameSession với key `totoro_chase`), thay điều kiện hard-code bằng lookup + `<Suspense>`.
5. Smoke test: vào game Totoro từ trang chủ, chơi thắng/thua/reset.

## Success Criteria

- [ ] `totoro_chase` hoạt động y hệt trước refactor (thắng, thua, chơi lại, thoát).
- [ ] `useTyping` trả `wordIndex` tăng dần khi gõ qua từng từ; `npm test` pass.
- [ ] Thêm 1 game mới = thêm 1 dòng vào `GAME_COMPONENTS` + 1 entry `LESSON_MODES`.

## Risk Assessment

- Lazy hoá GameSession đổi timing mount → kiểm tra không hydration mismatch (view practice chỉ render client, rủi ro thấp).
- Expose `wordIndex` là additive — rủi ro regression thấp; test engine hiện có bao phủ.
