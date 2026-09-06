---
title: "Kid typing mini games"
description: "Thêm 3 mini-game gõ phím cho bé 6-10 tuổi: Bóng bay chữ (2D), Mưa sao băng (2D), Phóng tên lửa 3D (Three.js lazy-load); kèm refactor registry game trong HomeView"
status: pending
priority: P2
effort: "3d"
tags: [game, kids, threejs, framer-motion, typing-engine]
created: 2026-08-19
---

# Kid typing mini games

## Overview

Trang hiện có 1 game (`totoro_chase` — `src/components/GameSession.tsx`) chạy trên engine gõ tiếng Việt word-level (`src/hooks/useTyping.ts` + `src/utils/typing-engine.ts`, hỗ trợ Telex/VNI, đã có unit test). Plan này thêm 3 game mới đã chốt với user qua brainstorm:

1. 🎈 **Bóng bay chữ** — từ nằm trong bóng bay màu bay lơ lửng; gõ đúng từ + space → bóng nổ kèm confetti; nổ hết là thắng. Không có "thua" — hợp bé nhỏ.
2. 🌠 **Mưa sao băng** — từ rơi từ trên xuống; gõ kịp trước khi chạm đất; tốc độ tăng dần; chạm đất là thua. Hợp bé lớn hơn muốn thử thách.
3. 🚀 **Phóng tên lửa 3D** — gõ đúng nạp nhiên liệu; đủ nhiên liệu tên lửa phóng xuyên trường sao 3D (Three.js). Hiệu ứng "wow".

Kèm 1 refactor bắt buộc: `HomeView.tsx` đang hard-code `selectedModeId === 'totoro_chase'` → chuyển thành **registry `modeId → lazy game component`** để thêm game không phải sửa điều phối.

Brainstorm contract: xem phần Goals/Non-goals bên dưới (đã chốt với user 2026-08-19, không có report riêng).

## Goals

| # | Goal | Priority |
|---|------|----------|
| 1 | 3 game mới chọn được từ tab "Giải trí" trang chủ, chơi trọn vòng (thắng/thua/chơi lại), gõ đúng tiếng Việt có dấu Telex qua engine sẵn có | P1 |
| 2 | Registry game trong HomeView + toàn bộ game component lazy-load (`React.lazy`); Three.js nằm trong chunk riêng, bundle trang chủ không phình | P1 |
| 3 | Hình ảnh tươi sáng, luật chơi hiểu trong 5 giây, đồng bộ tinh thần Ghibli-cute hiện có | P2 |

## Constraints

- **SSG-safe**: build bằng `vite-react-ssg`, server render không có `window`. Game chỉ mount phía client sau khi user chọn mode (HomeView đã đảm bảo view 'home' mặc định) — không đụng `window`/WebGL ở module top-level hay state initializer.
- **SEO là ưu tiên repo**: Lighthouse/bundle trang chủ không được tụt. Three.js (~150KB gzip) bắt buộc code-split.
- Mobile đã bị chặn ở view luyện gõ (`DesktopNudge`) — không cần responsive cho game.
- Không thêm dependency ngoài `three` + `@types/three`. Không dùng react-three-fiber (1 scene duy nhất, YAGNI).

## Non-goals

- Không leaderboard online, không tài khoản.
- Không rewrite typing engine (chỉ mở rộng non-breaking: expose `wordIndex`).
- Không làm game Vườn hoa / Câu cá (user không chọn ở vòng brainstorm).
- Không thêm âm thanh (audio đang là placeholder ở game cũ — giữ nguyên phạm vi).

## Architecture chung

```
LESSON_MODES (constants.ts)          ← +3 entry: balloon_pop, meteor_rain, rocket_launch
HomePage CATEGORIES 'game'           ← +3 modeIds
HomeView                             ← GAME_COMPONENTS: Record<modeId, React.LazyExoticComponent>
  └─ Suspense fallback "Đang tải game..."
      ├─ GameSession (totoro_chase, giữ nguyên)
      ├─ BalloonPopGame      ─┐
      ├─ MeteorRainGame       ├─ dùng chung: useTyping (+wordIndex), useGameKeyboard,
      └─ RocketLaunchGame    ─┘  GameHud (back/tiêu đề/WPM), GameOverlay (won/lost/replay)
```

- Engine tuần tự theo từ: game hiển thị từ của `wordIndex` hiện tại là mục tiêu active; từ hoàn thành khi user gõ hết + space (từ cuối: `isFinished`). Game phản ứng qua `useEffect` theo `wordIndex`.
- Keydown listener toàn cục (chặn Firefox Quick Find, Space scroll) đang bị copy giữa PracticeSession và GameSession → tách hook `useGameKeyboard` dùng chung.

## Phases

| # | Phase | Status |
|---|-------|--------|
| 1 | [Phase 1: Nền tảng — game registry + shared hooks/components](./phase-01-start.md) | Pending |
| 2 | [Phase 2: Game Bóng bay chữ](./phase-02-balloon-pop-game.md) | Pending |
| 3 | [Phase 3: Game Mưa sao băng](./phase-03-meteor-rain-game.md) | Pending |
| 4 | [Phase 4: Game Phóng tên lửa 3D](./phase-04-rocket-3d-game.md) | Pending |
| 5 | [Phase 5: Verification & polish](./phase-05-verification-and-polish.md) | Pending |

Phase 2, 3, 4 độc lập với nhau, đều phụ thuộc Phase 1. Phase 5 chốt sau cùng.

## Success Criteria

- [ ] 3 game xuất hiện ở tab "Giải trí", vào chơi được trọn vòng: thắng/thua (nếu có) → màn hình kết quả → chơi lại hoạt động.
- [ ] Gõ tiếng Việt có dấu Telex đúng theo cả 3 kiểu (inline, tone-deferred, word-end) — engine sẵn có, không regression.
- [ ] `npm run build` + `npm test` + `npm run lint` pass.
- [ ] Chunk trang chủ (entry) không chứa `three`; game chunks tách riêng (kiểm tra `dist/assets/`).
- [ ] `useTyping` mở rộng non-breaking: PracticeSession/GameSession cũ hoạt động như cũ.

<!-- slug: kid-typing-mini-games -->
