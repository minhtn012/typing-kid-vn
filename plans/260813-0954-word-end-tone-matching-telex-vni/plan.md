---
title: "Word-end tone matching Telex VNI"
description: "Refactor typing engine sang word-level matching: chấp nhận cả bỏ dấu tại ký tự lẫn bỏ dấu cuối từ (kiểu Unikey) cho Telex và VNI"
status: completed
priority: P1
effort: "2d"
tags: [typing-engine, telex, vni, ux]
created: 2026-08-13
---

# Word-end tone matching Telex VNI

## Overview

Engine hiện tại (`src/hooks/useTyping.ts`) so khớp theo **từng ký tự**: mỗi ký tự có dấu là một chuỗi phím cố định phải gõ ngay tại vị trí đó ("học" bắt buộc `h-o-j-c`). Người quen Unikey gõ dấu cuối từ (`hocj`, `gan62`) bị đếm lỗi liên tục — nguồn gốc của 3/4 bug report trên VOZ (xem `plans/reports/investigation-260813-0939-voz-feedback-bug-check.md`).

Plan này refactor engine sang **word-level matching**: mỗi từ có nhiều biến thể chuỗi phím hợp lệ (dấu tại ký tự, dấu cuối từ, shape+dấu cuối từ); keystroke đúng nếu còn khớp ≥1 biến thể.

## Goals

| # | Goal | Priority |
|---|------|----------|
| 1 | Chấp nhận cả 3 kiểu gõ: inline (`ho j c`), tone-deferred (`hocj`, `ga62n`), fully-deferred (`gan62`, `ganaf`) cho cả Telex và VNI | P1 |
| 2 | Highlight phím/ngón tay gợi ý theo kiểu **word-end (Unikey)** — thói quen phổ biến nhất; WPM/accuracy tính theo keystroke như cũ | P1 |
| 3 | Engine thuần (pure functions) tách khỏi React, có unit test | P2 |

## Non-goals

- Kiểu gõ 1 phím modifier cho 2 nguyên âm (`uo7` → "ươ", `nguoiw` → "ngưoi") — hiếm, để sau.
- Tự do đặt dấu ở vị trí bất kỳ giữa từ ngoài 3 biến thể trên.
- Phát hiện/cảnh báo bộ gõ OS (Unikey/EVKey) đang bật — tách thành việc riêng.
- Thay đổi nội dung bài học, scoring, storage.

## Phases

| # | Phase | Status |
|---|-------|--------|
| 1 | [Phase 1: Pure typing engine + unit tests](./phase-01-start.md) | Done |
| 2 | [Phase 2: Integrate engine into UI](./phase-02-integrate-engine-into-ui.md) | Done |
| 3 | [Phase 3: Verification and docs](./phase-03-verification-and-docs.md) | Done |

## Success Criteria

- [x] Gõ "học" theo cả `hojc` và `hocj` đều pass, không đếm lỗi (Telex); "gần" theo `ga62n`, `gan62`, `ga6n2` đều pass (VNI). *(unit tests + browser QA 260813)*
- [x] Kiểu gõ inline hiện tại vẫn hoạt động y nguyên (backward compatible). *(unit tests: gaafn/hojc/nguwowfi)*
- [x] Keyboard/Hands highlight luôn hiển thị gợi ý phím kế tiếp hợp lệ; không bao giờ trống. *(nextExpectedKey tests; hint variant B word-end)*
- [x] Backspace giữa chừng từ hoạt động đúng (pop keystroke, recompute); từ đã hoàn thành là chốt, backspace ở đầu từ mới là no-op. *(unit + browser VNI QA)*
- [x] WPM/accuracy vẫn tính theo keystroke; kết quả lưu storage không đổi schema. *(code review xác nhận schema không đổi)*
- [x] `npm run lint` không thêm lỗi mới (35 = baseline), `npm run build` pass; unit tests 27/27 pass.

## Validation Log

### Session 1 — 2026-08-13

**Verification Results**
- Claims checked: ~18 (API useTyping, props TypingArea ở PracticeSession + GameSession, rules constants, guide pages, baseline lint 35, SSG 5 trang)
- Verified: 18 | Failed: 0 | Unverified: 0
- Tier: Standard (Fact Checker + Contract Verifier)

**Decisions**
1. **Space sớm (chưa gõ đủ dấu):** tính là lỗi, không nhảy từ — nhất quán với mọi phím sai.
2. **Hint mặc định (Keyboard/Hands/partial display):** kiểu **word-end Unikey** (variant B: shape inline, tone cuối từ — `hocj`, `gaanf`, `ga6n2`). Lưu ý: từ 1 ký tự (bài "Luyện dấu") variant A ≡ B nên hint bài đó không đổi.
3. **Backspace:** chỉ trong từ đang gõ; từ đã hoàn thành là chốt, backspace ở đầu từ mới là no-op (đơn giản hóa engine; user chấp nhận khác hành vi cũ).
4. **Test runner:** vitest (devDependency) + script `npm test`.

### Whole-Plan Consistency Sweep
- Đã cập nhật phase 1 (preferred variant A→B, test nextExpectedKey), phase 2 (backspace no-op, hint word-end), phase 3 (QA matrix). Không còn mâu thuẫn tồn đọng.

## Open Questions

- ~~Test runner~~ → **Đã chốt (2026-08-13): thêm `vitest` làm devDependency**, script `npm test`.

<!-- slug: word-end-tone-matching-telex-vni -->
