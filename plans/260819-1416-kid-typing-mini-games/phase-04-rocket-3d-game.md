---
phase: 4
title: "Game Phóng tên lửa 3D"
status: pending
priority: P2
effort: "1d"
dependencies: [1]
---

# Phase 4: Game Phóng tên lửa 3D

## Overview

Game "wow" bằng Three.js: màn 1 (bệ phóng) gõ từ để nạp nhiên liệu — mỗi từ xong thanh nhiên liệu đầy thêm + khói phụt; đầy bình → đếm ngược 3-2-1 phóng; màn 2 (bay) tên lửa xuyên trường sao, gõ tiếp để duy trì lực đẩy, tốc độ bay/hiệu ứng sao kéo vệt theo tốc độ gõ; hết chuỗi từ → tới "hành tinh kẹo" + overlay chúc mừng. Không có thua.

## Requirements

- Functional: 2 màn liền mạch trong 1 scene; fuel gauge UI 2D overlay; tên lửa low-poly tự dựng từ primitive (cone + cylinder + fins) — KHÔNG load GLTF ngoài (giữ self-contained, không thêm asset pipeline); trường sao Points ~1500 sao; hành tinh đích sphere màu kẹo; win → GameOverlay + sao theo accuracy.
- Non-functional: `three` + `@types/three` là dependency mới DUY NHẤT; toàn bộ import three nằm trong chunk của `RocketLaunchGame` (lazy) — entry chunk không được chứa three; dispose renderer/geometry/material khi unmount; nắng-tươi-sáng: nền gradient hoàng hôn tím-cam ở màn bệ phóng chuyển dần sang không gian xanh đậm khi bay.

## Architecture

- Raw Three.js (không react-three-fiber — 1 scene, YAGNI): `useEffect` mount tạo `WebGLRenderer` gắn vào `<div ref>`, scene/camera/rAF loop nội bộ; React chỉ truyền "input" qua ref (`speedRef`, `phaseRef`) để loop đọc — tránh re-render 60fps.
- Cầu nối typing → 3D: `useTyping` + `wordIndex` như các game khác; mỗi từ hoàn thành → `fuelRef.current += 1/wordsPerTank` (màn 1) hoặc `boostRef.current = 1` (màn 2, decay dần trong loop — pattern totoroSpeed sẵn có). Mỗi keystroke đúng ở màn 2 cũng cộng boost nhỏ qua `options.onCorrect`.
- Chia chuỗi từ: nửa đầu vòng = nạp nhiên liệu, nửa sau = bay. Đơn giản: `fuelWords = ceil(wordCount/2)`; `wordIndex >= fuelWords` → chuyển phase launch (đếm ngược bằng state React, khóa input 3s).
- UI 2D overlay (fuel gauge, từ đang gõ + `currentWordDisplay`, countdown) là DOM absolute trên canvas — không làm text trong WebGL.
- SSG-safe: three chỉ được import trong file game (lazy), WebGL chỉ khởi tạo trong `useEffect` — không chạm `window` khi build.
- Từ vựng: entry `LESSON_MODES` id `rocket_launch`, inputMethod `telex`, chủ đề vũ trụ/du hành: "tên lửa", "phi hành gia", "mặt trăng", "sao hỏa", "vũ trụ bao la", "bay lên nào"… ~12-16 từ/vòng.

## Related Code Files

- Create: `src/components/games/RocketLaunchGame.tsx` (React wrapper + UI overlay)
- Create: `src/components/games/rocket-scene.ts` (pure Three.js: createScene/updateFrame/dispose — tách khỏi React để đọc dễ, không cần test framework DOM)
- Modify: `package.json` (+`three`, +`@types/three` dev)
- Modify: `src/constants.ts` (entry `rocket_launch`)
- Modify: `src/components/HomeView.tsx` (đăng ký GAME_COMPONENTS)
- Modify: `src/components/HomePage.tsx` (category `game` + mô tả)

## Implementation Steps

1. `npm i three && npm i -D @types/three`.
2. Viết `rocket-scene.ts`: init (renderer/camera/lights/rocket từ primitives/starfield Points/planet), `update(dt, {phase, fuel, boost})` (rung nhẹ ở bệ phóng, bay lên khi launch, star streak theo speed), `dispose()`.
3. Viết `RocketLaunchGame.tsx`: mount scene qua ref, nối useTyping/useGameKeyboard, refs cầu nối, resize handler theo container.
4. UI overlay: fuel gauge, countdown 3-2-1 (framer-motion), khung từ đang gõ, hint phím kế.
5. Phase chuyển: fuel đầy → countdown → launch → bay; hết từ → cập cảnh hành tinh → GameOverlay won + sao.
6. Đăng ký GAME_COMPONENTS + LESSON_MODES + HomePage; smoke test; kiểm tra unmount không leak (mở/đóng game nhiều lần, xem console/WebGL context).

## Success Criteria

- [ ] Chơi trọn vòng 2 màn, hiệu ứng phóng + trường sao chạy mượt (~60fps máy thường).
- [ ] `dist/assets`: three nằm trong chunk riêng của game, KHÔNG trong entry chunk (verify bằng grep tên chunk hoặc `vite-bundle-visualizer` nếu cần).
- [ ] Unmount sạch: không lỗi WebGL context leak khi vào/ra game 5+ lần.
- [ ] Gõ Telex có dấu hoạt động y các game khác.

## Risk Assessment

- Effort 3D dễ phình → khóa scope: primitive shapes only, không texture ngoài, không shader tự viết (dùng material có sẵn + fog); nếu quá 1 ngày thì cắt hiệu ứng star-streak, giữ starfield tĩnh.
- WebGL không khả dụng (máy cũ/iframe) → fallback: bắt lỗi khởi tạo renderer, hiện thông báo thân thiện + nút quay lại.
- React StrictMode double-mount effect → init/dispose phải idempotent.
