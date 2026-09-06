# Progress Report — Word-end tone matching Telex/VNI

Plan: `plans/260813-0954-word-end-tone-matching-telex-vni/` | Status: **completed** (3/3 phases)
Date: 2026-08-13 | Session: cook (execute plan)

## Summary

Refactor typing engine sang word-level matching: mỗi từ có 3 biến thể chuỗi phím
(inline A, tone-deferred B kiểu Unikey, fully-deferred C). Keystroke đúng nếu còn
khớp ≥1 biến thể. Hint Keyboard/Hands theo variant B. Giải quyết 3/4 bug VOZ
(gõ `hocj`, `gan62` bị đếm lỗi).

## Changes

| File | Change |
|------|--------|
| `src/utils/typing-engine.ts` | NEW — pure engine: buildWordVariants (A/B/C + dedup, punctuation-aware), matchKey, popKey, nextExpectedKey, composeDisplay; memoize WeakMap |
| `src/utils/typing-engine.test.ts` | NEW — 27 unit tests (Telex/VNI/uppercase/punctuation/backspace/hint/display) |
| `vitest.config.ts` | NEW — include `src/**/*.test.{ts,tsx}` |
| `src/hooks/useTyping.ts` | Rewrite lõi per-char → word-level; API giữ shape, thêm `currentWordRange`/`currentWordDisplay`, bỏ `telexBuffer` (không còn consumer) |
| `src/components/TypingArea.tsx` | Render cụm từ đang gõ theo composeDisplay; xóa getPartialChar |
| `src/components/PracticeSession.tsx` | Props mới cho TypingArea; hoisted `BASIC_RULES` (fix loop); preventDefault Firefox Quick Find (fix 260813) |
| `src/components/GameSession.tsx` | Props mới cho TypingArea; preventDefault fix |
| `src/constants.ts` | Fix `FINGER_MAP['9']`: 0 → 9 (ngón áp út phải) |
| `src/pages/TelexGuide.tsx`, `VniGuide.tsx` | Mục "Hai cách bỏ dấu đều được chấp nhận"; dateModified 2026-08-13 |
| `package.json` | devDep `vitest`, script `test` |

## Code review findings & resolution

Code-reviewer subagent: DONE_WITH_CONCERNS, 9 findings.

| # | Severity | Finding | Resolution |
|---|----------|---------|------------|
| 1 | Critical | Infinite re-render loop basic/custom mode (`rules={}` mới mỗi render) | **Fixed** — hoisted `BASIC_RULES`; xác nhận empirically (page treo trước fix, hoạt động sau fix) |
| 2 | High | Variant B đặt tone SAU dấu câu cuối token (`hanh,f`) → hint sai, `hanhf,` bị reject | **Fixed** — deferred keys chèn sau chữ cái cuối, trước đuôi dấu câu; +3 unit tests; browser QA "quả." pass |
| 3 | Medium | Variant C đa-shape nhận chuỗi IME thật không nhận (`duocdwwj`) | **Accepted** — plan chỉ định (test `nguoiwwf`), đã ghi Risk Assessment phase 1; chỉ nới lỏng chấp nhận, hint không dạy kiểu này |
| 4 | Medium | NBSP → space thường trong TypingArea | **Rejected** — false positive; byte-check xác nhận literal U+00A0 vẫn còn (perl `\x{00A0}` match dòng 44/66/85); browser render đúng |
| 5 | Medium | Accuracy semantics đổi (cũ: per-char-hoàn-thành; mới: per-keystroke) | **Accepted** — chủ đích plan ("tính theo keystroke"); schema storage không đổi; history cũ/mới lệch nhẹ về ý nghĩa |
| 6 | Low | matchKey deref `variants[i]` không guard stale alive | **Fixed** — guard `v !== undefined` |
| 7 | Low | `telexBuffer` dead API | **Fixed** — removed |
| 8 | Low | vitest include bỏ sót `.test.tsx` | **Fixed** |
| 9 | Low | preventDefault broadening | **Kept** — fix Firefox Quick Find có chủ đích từ 260813 (QA matrix phase 3 tham chiếu); guard `isFinished` giữ modal buttons hoạt động |

## Verification

- `npm test`: 27/27 pass
- `npm run lint`: 35 problems = baseline HEAD (git stash so sánh) — không lỗi mới
- `npm run build`: tsc + vite-react-ssg pass, 5 trang SSG; dist chứa nội dung guide mới
- Browser QA (agent-browser, Chromium): Telex vocab deferred 100% | VNI vocab deferred + backspace giữa từ 100% | Basic mode pass (trước fix #1 bị treo) | Câu danh ngôn có dấu câu `quar.` pass | Custom mode 100% | Game keystroke deferred nhận đúng, game-over đúng cơ chế
- Chưa test: Firefox (không có automation) — case Quick Find cần test tay

## Unresolved questions

1. Backspace no-op ở đầu từ mới = không sửa được từ đã commit — user đã chốt trade-off ở validation; nếu feedback trẻ em muốn sửa từ trước, cần API un-commit (ngoài scope).
2. Firefox Quick Find: cần 1 lần test tay khi có máy Firefox.
3. Trả lời thread VOZ (bước 4 phase 3) — tùy user, chưa làm.
