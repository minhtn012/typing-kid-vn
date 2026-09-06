---
phase: 1
title: "Pure typing engine + unit tests"
status: done
priority: P1
effort: "1d"
dependencies: []
---

# Phase 1: Pure typing engine + unit tests

## Overview

Tạo module engine thuần `src/utils/typing-engine.ts` (không React): sinh biến thể chuỗi phím cho từng từ từ `TELEX_RULES`/`VNI_RULES` hiện có, và matcher theo prefix. Có unit test đầy đủ.

## Requirements

- Functional: sinh biến thể + match keystroke + compose display text + gợi ý phím kế tiếp.
- Non-functional: pure functions, không side effect, không dependency runtime mới; input là rules hiện có trong `src/constants.ts` (không viết engine ngôn ngữ mới).

## Architecture

**Data model:**

```ts
// Mỗi từ (token tách theo space) có N biến thể chuỗi phím hợp lệ
interface WordVariants {
  word: string;          // "gần"
  variants: string[][];  // [["g","a","a","f","n"], ["g","a","a","n","f"], ["g","a","n","a","f"]]
}

interface WordMatchState {
  typedKeys: string[];   // keystroke đã gõ cho từ hiện tại
  alive: number[];       // index các biến thể còn khớp prefix
}
```

**Sinh biến thể** — từ rule per-char `char → keys[]`, tách keys của mỗi ký tự thành `base` (phím đầu) + `shape` (phím giữa: aa/w/6/7/8/9/dd) + `tone` (phím cuối nếu là dấu thanh: s f r x j / 1-5):

1. **Variant A (inline, hành vi hiện tại):** concat nguyên rule từng ký tự. "gần" Telex → `g,a,a,f,n`.
2. **Variant B (tone-deferred):** base+shape inline, các phím tone dồn về cuối từ theo thứ tự ký tự. "gần" → `g,a,a,n,f`; "học" → `h,o,c,j`; VNI "gần" → `g,a,6,n,2`.
3. **Variant C (fully-deferred):** base toàn bộ, rồi shape keys, rồi tone keys. "gần" → `g,a,n,a,f`; VNI → `g,a,n,6,2`.

Dedup biến thể trùng (từ không dấu → 3 biến thể giống nhau → còn 1). Ký tự không có rule (kể cả uppercase, số, `;`...) là chính nó.

**Lưu ý phân loại phím:** tone keys Telex = `s f r x j`, VNI = `1 2 3 4 5`; shape keys là phần còn lại sau base (`a`, `w` Telex; `6 7 8 9` VNI; `d` thứ hai của `đ`). Rule `đ`=`[d,d]`/`[d,9]`: phím 2 là shape, không phải tone → variant B giữ inline, variant C dồn về nhóm shape.

**Matcher API:**

```ts
buildWordVariants(word: string, rules: Rules): string[][]
matchKey(state, variants, key): { result: 'correct' | 'wrong'; next: WordMatchState; completed: boolean }
composeDisplay(typedKeys, variants, word): string   // text hiển thị best-effort cho từ đang gõ, vd "gà" khi đã gõ g,a,f của "gần"? → theo preferred variant
nextExpectedKey(state, variants): string            // phím của preferred variant (ưu tiên variant B word-end; fallback variant alive đầu tiên)
```

- Keystroke đúng ⇔ tồn tại variant trong `alive` có `variant[typedKeys.length] === key`; `alive` được lọc lại sau mỗi phím.
- `completed` khi một variant khớp toàn bộ.
- Backspace = pop `typedKeys`, recompute `alive` từ đầu (từ ngắn, chi phí không đáng kể). Chỉ thao tác trong từ hiện tại — engine không có API un-commit từ đã xong.
- Preferred variant cho hint/hiển thị = **variant B (word-end Unikey)** nếu còn alive, ngược lại variant alive đầu tiên. Từ 1 ký tự: A ≡ B nên hint bài "Luyện dấu" không đổi.
<!-- Updated: Validation Session 1 - hint word-end (B), backspace within-word only -->


## Related Code Files

- Create: `src/utils/typing-engine.ts`
- Create: `src/utils/typing-engine.test.ts`
- Modify: `package.json` (devDependency `vitest` + script `"test": "vitest run"`) — chờ user chốt ở Open Questions
- Read-only tham chiếu: `src/constants.ts` (TELEX_RULES, VNI_RULES)

## Implementation Steps

1. Viết `classifyRuleKeys(char, keys, method)` tách base/shape/tone theo bảng phím tone của Telex/VNI.
2. Viết `buildWordVariants` sinh A/B/C + dedup; memoize theo `(word, rules)` vì text bài học lặp lại.
3. Viết matcher (`matchKey`, `nextExpectedKey`, `composeDisplay`) thuần túy trên state bất biến.
4. Unit tests — tối thiểu các case:
   - Telex: "học" pass với `hojc` và `hocj`; "gần" pass với `gaafn`, `gaanf`, `ganaf`; "đi" với `ddi`; sai phím bị reject nhưng không phá state.
   - VNI: "gần" pass `ga62n`, `ga6n2`, `gan62`; "đậu" pass `d9a65u` và `dau965`? → xác nhận thứ tự tone theo ký tự; "đ" với `d9`.
   - Từ không dấu ("con", "a s d f") chỉ có 1 biến thể, hành vi y hệt hiện tại.
   - Uppercase ("Chúc", "Tôi"): base là ký tự hoa, so khớp giữ nguyên logic case hiện tại.
   - Backspace giữa chừng: recompute đúng; không có un-commit xuyên từ.
   - `nextExpectedKey` trả về phím của variant B (word-end) khi chưa gõ gì; nếu user đang gõ theo A (variant B chết), hint chuyển sang variant alive đầu tiên.

## Success Criteria

- [x] Toàn bộ unit test pass (`npm test`) — 27/27.
- [x] Không import React trong `typing-engine.ts`.
- [x] `npm run build` pass.

## Risk Assessment

- **Từ có 2 nguyên âm mang shape ("người", "ước"):** variant B/C sinh chuỗi dài (`w` hai lần) — hợp lệ nhưng khác thói quen gõ tắt `uo+w`. Đã ghi non-goal; test case "người" chỉ cần pass inline + deferred đầy đủ.
- **Nổ tổ hợp biến thể:** cố định 3 biến thể/từ (không permutation), không có rủi ro tổ hợp.
