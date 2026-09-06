---
date: 2026-08-13
tags: [typing-engine, telex, vni, refactor, code-review, react-hooks]
---

# Word-end tone matching: Telex/VNI refactor + 2 bug do reviewer bắt được

**Severity**: High | **Component**: typing-engine, useTyping hook, TypingArea | **Status**: Resolved

## Chuyện gì xảy ra

Thực thi plan `260813-0954-word-end-tone-matching-telex-vni`: chuyển engine gõ từ per-char matching sang word-level, hỗ trợ 3 biến thể chuỗi phím (inline A, tone-deferred B kiểu Unikey, fully-deferred C). Mục tiêu: fix 3/4 bug từ VOZ feedback (`hocj`, `gan62` bị tính sai lỗi).

Code Phase 1+2 đã nằm sẵn trong working tree từ session trước, chưa build được — 2 call site trong `TypingArea` còn truyền prop cũ `telexBuffer` (đã bị đổi API), cộng lỗi lint mới `react-hooks/immutability`. Session này dọn build, hoàn tất Phase 3 (thêm mục hướng dẫn "hai cách bỏ dấu đều được chấp nhận" vào guide Telex/VNI).

## Sự thật trần trụi

24 unit test xanh + build pass **không** bắt được 2 bug nghiêm trọng nhất. Code-reviewer subagent tìm ra:

1. **Critical — infinite re-render loop** ở basic/custom mode: `getRules()` trả object literal `{}` mới mỗi lần render → `useMemo([text, rules])` invalidate liên tục → effect reset liên tục → loop treo trình duyệt. Test suite thuần engine logic không chạm tới React lifecycle nên im re. Xác nhận thực nghiệm bằng agent-browser: trang treo, CDP timeout — nhìn thấy tận mắt mới tin.
2. **High — sai thứ tự phím dấu** ở variant B: với token có dấu câu cuối như `"hành,"`, deferred key bị đặt SAU dấu câu (`hanh,f`) thay vì trước — dạy sai cách gõ, người dùng gõ kiểu Unikey thật (`hanhf,`) bị reject oan.

Đây đúng là lỗ hổng coverage mà unit test engine-only không thể lấp: build/SSG không chạy effect, test engine không dựng component thật.

## Chi tiết kỹ thuật

- Fix #1: hoisted `BASIC_RULES` lên module-level thay vì tạo mới trong `getRules()`.
- Fix #2: chèn deferred tone key sau `lastLetterIdx` (chữ cái cuối cùng), trước đuôi dấu câu, thay vì cuối token.
- 1 finding của reviewer bị bác bỏ bằng byte-check (NBSP U+00A0 vẫn literal đúng, reviewer đọc nhầm diff).
- 2 finding accepted có chủ đích theo plan (variant C đa-shape, tính accuracy per-keystroke) — không phải bug.

## Kết quả QA

agent-browser chạy dev server, test 5 loại: Telex vocab deferred 100%, VNI + backspace giữa từ 100%, basic mode (sau fix) pass, câu có dấu câu (`quar.`) pass, custom mode 100%, game keystroke nhận đúng. agent-browser 2 lần rơi về `about:blank` giữa chừng (flaky), phải restart session mới verify tiếp — tốn thời gian nhưng không phải bug code.

Cuối cùng: 27/27 test, lint 35 warning = baseline cũ (không tăng), build + SSG 5 trang pass. Plan marked completed.

## Bài học

- Unit test cho engine thuần logic KHÔNG đủ để bắt bug tích hợp ở hook/component layer — phải có review hoặc test chạm React lifecycle thật.
- Object literal (`{}`, `[]`) tạo mới trong render mà đưa thẳng vào dependency array của `useMemo`/`useEffect` là bẫy re-render loop kinh điển — SSG/build không phát hiện vì không chạy effect.
- Đừng tin/bác finding của reviewer theo cảm tính — verify bằng thực nghiệm (browser xác nhận loop thật) hoặc byte-check (bác NBSP finding sai).

## Việc tiếp theo

Không còn action item mở — plan đã complete. Nếu thêm variant chuỗi phím mới trong tương lai, nhớ chạy review + browser QA trước khi merge, đừng chỉ dựa vào unit test xanh.
