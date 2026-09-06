---
phase: 2
title: "Game Bóng bay chữ"
status: pending
priority: P1
effort: "0.5d"
dependencies: [1]
---

# Phase 2: Game Bóng bay chữ

## Overview

Game 2D không có thua, cho bé nhỏ nhất: mỗi từ nằm trong một quả bóng bay màu pastel lơ lửng; gõ đúng từ (+ space) → bóng nổ với confetti; nổ hết bóng → màn hình chúc mừng với số sao theo accuracy.

## Requirements

- Functional: 5-8 bóng/vòng, mỗi bóng 1 từ; bóng của từ đang gõ được highlight (to hơn, viền sáng, hiện tiến độ gõ từng ký tự như TypingArea thu nhỏ); nổ bóng khi từ hoàn thành; vòng kết thúc → GameOverlay 'won' + sao (3 sao ≥95% accuracy, 2 sao ≥85%, 1 sao còn lại).
- Non-functional: thuần framer-motion + canvas-confetti (không dependency mới); 60fps với ≤8 bóng animate.

## Architecture

- `BalloonPopGame` dùng `useTyping(text, TELEX_RULES)` với `text` = các từ của vòng nối bằng space. `wordIndex` (từ Phase 1) xác định bóng active; khi `wordIndex` tăng hoặc `isFinished` → bóng tương ứng chuyển state `popped`, bắn confetti nhỏ tại vị trí bóng (`confetti({origin: {x, y}})`).
- Bóng: absolute position rải đều (grid ngẫu-nhiên-tất-định theo index — KHÔNG dùng `Math.random` trong render để tránh nhảy vị trí mỗi re-render; dùng mảng vị trí tính sẵn), framer-motion `animate={{ y: [0, -10, 0] }}` lắc lư vô hạn; pop = `AnimatePresence` scale-out.
- Hiển thị tiến độ từ đang gõ: dùng `currentWordDisplay` từ useTyping render ngay dưới/trong bóng active (ký tự đã gõ tô màu, giống pattern TypingArea).
- Từ vựng: entry `LESSON_MODES` id `balloon_pop`, inputMethod `telex`, mỗi phần tử `text[]` là 1 vòng gồm 5-8 từ đơn giản tươi sáng: "mèo con", "hoa hồng", "bầu trời", "cầu vồng", "ông mặt trời", "bánh kem", "cún con", "ngôi sao"… (từ 1-2 tiếng, có dấu đa dạng).
- Nhiều vòng: chơi lần lượt các phần tử `text[]` như PracticeSession xử lý lesson; đơn giản nhất là random-tất-định 1 vòng theo lượt chơi (state `roundIdx`, nút "Vòng tiếp theo" trên overlay).

## Related Code Files

- Create: `src/components/games/BalloonPopGame.tsx`
- Modify: `src/constants.ts` (entry `balloon_pop` trong LESSON_MODES)
- Modify: `src/components/HomeView.tsx` (đăng ký vào GAME_COMPONENTS)
- Modify: `src/components/HomePage.tsx` (thêm `balloon_pop` vào category `game`, mô tả trong `getModeDescription`)

## Implementation Steps

1. Thêm entry `balloon_pop` vào LESSON_MODES với 3-4 vòng từ vựng.
2. Dựng `BalloonPopGame`: layout bầu trời gradient sáng (xanh da trời → hồng nhạt), mây CSS/emoji, bóng bay SVG/CSS đơn giản (ellipse + dây); dùng GameHud.
3. Nối useTyping + useGameKeyboard; highlight bóng active + render `currentWordDisplay`.
4. Effect pop theo `wordIndex`/`isFinished` + confetti tại vị trí bóng.
5. GameOverlay 'won' với sao theo accuracy + nút vòng tiếp/chơi lại.
6. Đăng ký GAME_COMPONENTS + HomePage category, smoke test trọn vòng.

## Success Criteria

- [ ] Vào từ tab Giải trí, gõ nổ hết bóng, overlay thắng hiện đúng sao, chơi lại/vòng tiếp hoạt động.
- [ ] Gõ Telex word-end (`meof` → "mèo") nổ bóng đúng.
- [ ] Không có `Math.random` gây đổi layout giữa các render; không warning React key.

## Risk Assessment

- Vị trí confetti cần tọa độ normalized (0-1) theo viewport → đo bằng `getBoundingClientRect` tại thời điểm pop; sai số nhỏ chấp nhận được.
- Bé không biết phải gõ space để xác nhận từ → hiển thị hint "gõ xong nhấn phím cách" ở lần đầu + bóng active hiện ký tự kế tiếp.
