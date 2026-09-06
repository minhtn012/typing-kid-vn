---
phase: 2
title: "Integrate engine into UI"
status: done
priority: P1
effort: "1d"
dependencies: [1]
---

# Phase 2: Integrate engine into UI

## Overview

Thay lõi per-character trong `useTyping` bằng engine word-level của Phase 1, giữ nguyên API trả về cho components; cập nhật `TypingArea` để hiển thị "từ đang gõ" (vì với kiểu deferred, ký tự đã hiện có thể đổi dạng khi phím dấu tới sau: `gan` + `6` → `gân`).

## Requirements

- Functional: 3 kiểu gõ đều được chấp nhận trong Practice (Telex/VNI/basic/custom) và Game; highlight phím/ngón theo `nextExpectedKey`.
- Non-functional: API `useTyping` giữ shape hiện tại (`userInput`, `stats`, `isFinished`, `handleKeyDown`, `reset`, `currentIndex`, `currentKeyToPress`, `currentFinger`, `telexBuffer`) để PracticeSession/GameSession gần như không đổi.

## Architecture

**State mới trong `useTyping`:**

```ts
// Thay userInput (string append-only) + telexBuffer bằng:
const [committedWords, setCommittedWords] = useState<string[]>([]); // các từ đã hoàn thành
const [wordState, setWordState] = useState<WordMatchState>(EMPTY);   // từ đang gõ
// Suy ra:
// userInput   = committedWords.join(' ') [+ ' ' nếu đang ở đầu từ mới] + composeDisplay(wordState)
// currentIndex = userInput.length (như cũ, TypingArea dùng để tô màu)
// telexBuffer  = phần keystroke chưa compose xong của từ hiện tại (giữ tên cũ cho tương thích prop)
```

- Text được tokenize 1 lần (memo theo `text`+`rules`): mảng từ + khoảng trắng là ký tự phân cách phải gõ đúng như cũ.
- Space chỉ được chấp nhận khi từ hiện tại `completed`; space sớm (chưa đủ dấu) **tính là lỗi** như mọi phím sai khác (chốt validation), không nhảy từ.
- `basic` mode (rules rỗng): mỗi từ chỉ có 1 biến thể là chính nó → hành vi không đổi.
- Stats: mỗi keystroke đúng/sai vẫn tăng `correctChars`/`errorChars` như hiện tại; WPM tính theo `userInput.length / 5` như cũ.
- `isFinished` = đã commit từ cuối cùng (thay vì so sánh length — nhưng vẫn giữ bất biến `userInput.length === text.length` khi finish để TypingArea không đổi).

**TypingArea:** hiện render theo từng ký tự với overlay 1 ký tự đang gõ. Sửa: các ký tự thuộc **từ đang gõ** render theo `composeDisplay` (text tạm), gạch chân cả cụm từ hiện tại thay vì 1 ký tự; ký tự đã commit giữ logic màu đúng/sai như cũ. `getPartialChar` word-level chuyển vào engine (`composeDisplay`), xóa bản cũ.

**Keyboard/Hands:** không sửa — `currentKeyToPress`/`currentFinger` vẫn là 1 phím từ `nextExpectedKey` (ưu tiên variant B word-end kiểu Unikey — chốt validation; tự chuyển variant alive khác nếu user gõ kiểu inline).
<!-- Updated: Validation Session 1 - hint word-end, space sớm tính lỗi, bỏ un-commit -->


## Related Code Files

- Modify: `src/hooks/useTyping.ts` (thay lõi match, giữ API)
- Modify: `src/components/TypingArea.tsx` (render từ đang gõ)
- Modify (tối thiểu/không đổi): `src/components/PracticeSession.tsx`, `src/components/GameSession.tsx` (chỉ đổi nếu prop `telexBuffer` đổi kiểu)
- Delete logic: `getPartialChar` trong `TypingArea.tsx` (thay bằng `composeDisplay` từ engine)

## Implementation Steps

1. Tokenize text + build variants (memo) trong `useTyping`.
2. Viết lại `handleKeyDown` dùng `matchKey`; Backspace chỉ pop keystroke của từ hiện tại — ở đầu từ mới là no-op, từ đã hoàn thành là chốt (chốt validation); phím đặc biệt (`key.length > 1` bỏ qua), guard `isFinished`.
3. Suy diễn `userInput`/`currentIndex`/`currentKeyToPress`/`currentFinger`/`telexBuffer` từ state mới, giữ đúng shape trả về.
4. Cập nhật `TypingArea` render nhóm "từ đang gõ".
5. Chạy thử cả 5 loại bài: basic, telex, vni, custom, game.

## Success Criteria

- [x] Gõ inline (hành vi cũ) và deferred đều pass trên bài "Từ vựng Tiếng Việt" Telex + VNI. *(browser QA: Telex + VNI 100% accuracy kiểu deferred)*
- [x] Bài "Luyện dấu" (từng ký tự đơn lẻ như "á ắ ầ") vẫn hoạt động (từ 1 ký tự → 3 biến thể trùng nhau). *(unit test dedup "ậ")*
- [x] Game Totoro chơi bình thường, tốc độ tăng theo keystroke đúng. *(browser QA: keystroke deferred nhận đúng, game-over do gõ chậm đúng cơ chế)*
- [x] Custom mode với văn bản người dùng dán vào hoạt động. *(browser QA 100%)*
- [x] Backspace hoạt động trong từ hiện tại; ở đầu từ mới là no-op (không lỗi, không un-commit). *(unit + browser QA)*

## Risk Assessment

- **`currentIndex` semantics đổi ngầm:** TypingArea dùng `currentIndex === index` để tìm ký tự hiện tại; khi cả từ đang gõ, cần range thay vì 1 index. Mitigation: truyền thêm prop `currentWordRange` (optional) thay vì đổi nghĩa prop cũ.
- **Backspace no-op ở đầu từ mới khác hành vi cũ (đang cho xóa xuyên suốt):** user đã chấp nhận trade-off này ở validation; ghi chú trong guide nếu cần.
- **Hiệu ứng lên stats khi ký tự hiển thị đổi dạng (`gan`→`gân`):** stats đếm theo keystroke, không theo diff hiển thị → không ảnh hưởng; xác nhận bằng test tay accuracy.
