---
phase: 3
title: "Game Mưa sao băng"
status: pending
priority: P1
effort: "0.5d"
dependencies: [1]
---

# Phase 3: Game Mưa sao băng

## Overview

Game 2D có áp lực tốc độ cho bé lớn hơn: từng từ rơi từ trên xuống trong một ngôi sao băng; gõ xong trước khi chạm đất để "hóa phép" thành pháo hoa; sao chạm đất → mất 1 tim; hết 3 tim là thua; gõ hết chuỗi từ là thắng. Tốc độ rơi tăng nhẹ theo tiến độ.

## Requirements

- Functional: 1 sao active rơi tại một thời điểm (engine tuần tự); hàng chờ 2-3 từ kế hiện mờ ở góc trên; 3 mạng (tim); từ hoàn thành → sao nổ thành pháo hoa + từ kế xuất hiện; sao chạm đất → -1 tim, từ đó respawn rơi lại từ đầu (không skip từ — engine giữ nguyên vị trí); thắng khi hết chuỗi, thua khi hết tim; GameOverlay cả 2 nhánh + chơi lại.
- Non-functional: game loop bằng `requestAnimationFrame` (pattern sẵn ở `GameSession.tsx:84-141`); tốc độ rơi bắt đầu chậm (~8%/s chiều cao khung), tăng ~10% mỗi 3 từ hoàn thành, có trần.

## Architecture

- `MeteorRainGame` dùng `useTyping` + `useGameKeyboard` + `wordIndex`. State game: `starY` (0-100%), `lives`, `speed`, `gameState: 'playing'|'won'|'lost'`.
- rAF loop tăng `starY` theo `speed * deltaTime`; `starY >= 100` → -1 tim, reset `starY = 0`. Effect theo `wordIndex`/`isFinished`: reset `starY`, tăng speed theo bậc, bắn confetti (pháo hoa).
- Nền trời đêm tươi sáng kiểu hoạt hình (tím than → xanh navy, sao lấp lánh CSS animation, trăng lưỡi liềm) — vẫn "bắt mắt" nhờ sao băng vàng rực + vệt đuôi gradient; mặt đất là đồi cỏ với nhà nhỏ sáng đèn (giữ vibe dễ thương, không đáng sợ).
- Từ hiện to bên trong/dưới ngôi sao rơi, render `currentWordDisplay` để thấy tiến độ gõ; ký tự kế tiếp gợi ý màu nhấn.
- Từ vựng: entry `LESSON_MODES` id `meteor_rain`, inputMethod `telex`, mỗi phần tử `text[]` là 1 vòng ~10-12 từ, độ dài tăng dần trong vòng (từ 1 tiếng → 2 tiếng: "sao", "trăng", "ước mơ", "lấp lánh", "vũ trụ", "thiên hà"…).

## Related Code Files

- Create: `src/components/games/MeteorRainGame.tsx`
- Modify: `src/constants.ts` (entry `meteor_rain`)
- Modify: `src/components/HomeView.tsx` (đăng ký GAME_COMPONENTS)
- Modify: `src/components/HomePage.tsx` (category `game` + mô tả)

## Implementation Steps

1. Thêm entry `meteor_rain` vào LESSON_MODES (2-3 vòng).
2. Dựng layout trời đêm + mặt đất + hàng tim (lucide `Heart`) + hàng chờ từ kế.
3. rAF loop rơi sao + deltaTime (tham khảo GameSession, nhưng gom state loop vào `useRef` để tránh stale-closure như comment ở GameSession.tsx:127-132 đã than phiền).
4. Nối useTyping: hoàn thành từ → pháo hoa + reset sao + tăng speed; chạm đất → -tim + respawn.
5. Win/lose → GameOverlay, chơi lại reset toàn bộ (resetTyping + lives + speed).
6. Đăng ký GAME_COMPONENTS + HomePage, smoke test cả nhánh thắng lẫn thua.

## Success Criteria

- [ ] Chơi trọn: thắng khi gõ hết, thua khi rơi 3 sao; chơi lại về trạng thái đầu sạch sẽ.
- [ ] Tốc độ tăng cảm nhận được nhưng vòng 1 bé gõ ~15 WPM vẫn qua được (tune số).
- [ ] Không memory leak rAF khi unmount/đổi gameState (cleanup đúng).

## Risk Assessment

- Stale closure trong rAF loop (bug tiềm ẩn ở GameSession cũ) → dùng ref cho giá trị đọc trong loop, state chỉ để render.
- Cân bằng độ khó là phần tốn thời gian nhất → expose 2-3 hằng số (BASE_SPEED, SPEED_STEP, MAX_SPEED) đầu file để tune nhanh.
