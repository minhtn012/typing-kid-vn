# Task: Trang chủ có đoạn định nghĩa + khối dữ kiện cụ thể để AI trích dẫn

## Outcome

Trang chủ `/` trả lời thẳng "Typing Kid VN là gì, có gì, giới hạn gì" bằng câu ngắn, có số liệu kiểm chứng được trong code. FAQ hiển thị và FAQPage JSON-LD sinh từ **cùng một mảng** (hiện hai bên lệch nhau: hiển thị 2 câu, schema 3 câu, câu chữ khác nhau). Khối quảng cáo chung chung "Tại sao chọn chúng tôi?" được thay bằng danh sách dữ kiện "Typing Kid VN có gì?".

## Context

Site `https://type.scala.vn/`, Vite + React 19 + react-router v6, prerender `vite-react-ssg`, style inline. Đọc dòng `seo` và `home` trong `docs/scope-map.md` trước khi làm.

Mục tiêu: để ChatGPT, Claude, Gemini, Perplexity trích site khi người dùng hỏi "web luyện gõ 10 ngón tiếng Việt cho trẻ em miễn phí". Nghiên cứu GEO cho thấy AI ưu tiên trích đoạn trả lời thẳng, có con số và dữ kiện cụ thể; câu marketing chung chung ("giao diện thân thiện", "hỗ trợ tuyệt đối") gần như không được trích. Khối hiện tại còn ghi sai thuật ngữ ("bảng mã Telex và VNI" — Telex/VNI là kiểu gõ, không phải bảng mã).

Mọi con số dưới đây coordinator đã đối chiếu code: `src/components/HomePage.tsx:12-38` (`CATEGORIES`: 3 + 3 + 2 + 1 bài + 1 game), `src/constants.ts:305-306` (game `Mie đuổi bắt`), `src/components/PracticeSession.tsx:239-242` (`Keyboard targetKey`, `Hands activeFinger`), `src/utils/storage.ts:18-39` (WPM, accuracy, 1–3 sao, `localStorage`).

**Chép nguyên văn text trong spec, không thêm câu, không thêm tính năng.**

## Files allowed to edit

- `src/components/home-faq.ts`
- `src/components/HomePage.tsx` — **chỉ** khối FAQ (dòng ~314–331) và khối "Tại sao chọn chúng tôi?" (dòng ~333–350), cộng import nếu cần.

DO NOT edit: `src/routes.tsx` (đang `import { HOME_FAQ }` ở dòng 5, dùng ở dòng 34 — giữ nguyên tên export và kiểu), `index.html`, `src/pages/*`, alias `practice`, `<nav>`, header, khối "Cẩm nang", section "Vì sao nên luyện gõ 10 ngón tiếng Việt?".

## Read-only files (reference)

- `src/components/home-faq.ts` 1–45 (`HOME_FAQ` object FAQPage 3 câu)
- `src/components/HomePage.tsx` 310–352 (lưới 2 cột: FAQ + "Tại sao chọn chúng tôi?"), tiền lệ style `h3`, `p`, `li` ✓ ở đó
- `src/pages/TelexGuide.tsx` 17–48 (tiền lệ mảng `faqs` → `faqSchema`)

## Requirements

### R1. `home-faq.ts`

Export thêm `HOME_FAQS: { q: string; a: string }[]` (5 câu, đúng thứ tự dưới) và dựng `HOME_FAQ` từ nó (giữ tên `HOME_FAQ`, kiểu `Record<string, unknown>`, `@context`, `@type: 'FAQPage'`, `mainEntity` = map sang `Question`/`acceptedAnswer`, như `TelexGuide.tsx:40-48`). Giữ comment đầu file.

1. q `Typing Kid VN là gì?` — a `Typing Kid VN (type.scala.vn) là trang web luyện gõ 10 ngón tiếng Việt miễn phí cho trẻ em và người mới bắt đầu. Trang chạy ngay trên trình duyệt máy tính, không cần cài đặt hay tạo tài khoản. Có 9 bài luyện đi từ hàng phím cơ sở đến gõ câu có dấu theo kiểu Telex và VNI, kèm 1 mini game.`
2. q `Làm thế nào để gõ 10 ngón tiếng Việt nhanh nhất?` — a `Đặt tay đúng trên hàng phím cơ sở (ASDF - JKL;), tập gõ không nhìn bàn phím và luyện đều mỗi ngày 10–15 phút. Trên Typing Kid VN, bạn đi lần lượt 3 bài hàng phím rồi mới sang bài gõ dấu Telex hoặc VNI.`
3. q `Học gõ 10 ngón tiếng Việt có khó không?` — a `Không khó nếu đi đúng thứ tự: hàng phím cơ sở trước, rồi hàng trên, hàng dưới, cuối cùng mới gõ dấu. Trẻ từ 7–8 tuổi, khi đã đọc tốt, có thể bắt đầu với các bài hàng phím.`
4. q `Nên dùng kiểu gõ Telex hay VNI?` — a `Telex phổ biến hơn và gõ nhanh hơn vì dấu nằm trên phím chữ (s, f, r, x, j), tay không phải rời hàng phím chính. VNI bỏ dấu bằng phím số 1–5, hợp với người đã quen hàng phím số.`
5. q `Typing Kid VN có dùng được trên điện thoại không?` — a `Phần luyện gõ cần bàn phím thật nên chỉ dùng trên máy tính. Trên điện thoại, trang sẽ nhắc mở bằng máy tính; bạn vẫn đọc được các bài hướng dẫn Telex, VNI và bảng gõ in được.`

### R2. `HomePage.tsx` — khối FAQ

Thay 2 `<div>` câu hỏi viết tay bằng `HOME_FAQS.map((f) => (...))` với `key={f.q}`, giữ đúng style `h3`/`p` hiện có ở dòng 319–322. H2 "Câu hỏi thường gặp" giữ nguyên.

### R3. `HomePage.tsx` — thay khối "Tại sao chọn chúng tôi?"

H2 đổi thành `Typing Kid VN có gì?` (giữ style). `<ul>` giữ style, mỗi `<li>` giữ style + `<span>✓</span>` như cũ, nội dung đúng 7 dòng:

1. `<strong>Miễn phí, không cài đặt, không cần tài khoản:</strong> mở trình duyệt trên máy tính là luyện được; kết quả từng bài lưu ngay trên trình duyệt.`
2. `<strong>9 bài luyện theo lộ trình:</strong> 3 bài hàng phím (cơ sở, trên, dưới), 3 bài Telex (dấu, từ, câu), 2 bài VNI (dấu, từ) và 1 bài tự nhập văn bản.`
3. `<strong>Bàn phím và bàn tay chỉ đường:</strong> bàn phím ảo sáng phím cần gõ, hình bàn tay sáng ngón cần dùng.`
4. `<strong>Đo tiến bộ:</strong> mỗi bài tính tốc độ (WPM), độ chính xác và chấm 1–3 sao.`
5. `<strong>Gõ dấu linh hoạt:</strong> chấp nhận cả bỏ dấu ngay sau nguyên âm lẫn bỏ dấu cuối từ như Unikey.`
6. `<strong>Mini game "Mie đuổi bắt":</strong> gõ đúng câu để giúp Totoro chạy thoát.`
7. `<strong>Giới hạn:</strong> chỉ luyện được trên máy tính có bàn phím; điện thoại dùng để đọc hướng dẫn.`

Mỗi `<li>` là JSX viết tay (không map) như hiện tại. Đổi comment `{/* Why Us Section */}` thành `{/* Dữ kiện cụ thể về sản phẩm */}`.

## Constraints

- Không thêm dependency; không `any`, `@ts-ignore`, `eslint-disable`.
- Không đổi title/description/`Seo` của trang chủ, không đổi layout lưới 2 cột.
- Tiếng Việt đủ dấu, dấu gạch ngang trong "10–15", "7–8", "1–5", "1–3" là en dash `–` đúng như spec.

## Edge cases this change opens up

1. **FAQPage vẫn 1 khối trên `/` và không lan sang route khác.** `HOME_FAQ` chỉ render ở route `/` (`src/routes.tsx:34`); giữ tên export thì `routes.tsx` không đổi. Khóa: đếm `"FAQPage"` trong `dist/index.html` = 1, trong `dist/huong-dan-telex.html` = 1 (của chính guide).
2. **Text schema phải trùng text hiển thị** (yêu cầu rich result của Google) → cả hai đọc `HOME_FAQS`. Khóa: câu "Typing Kid VN có dùng được trên điện thoại không?" xuất hiện 2 lần trong `dist/index.html` (1 hiển thị + 1 schema).
3. **`key={f.q}`**: 5 q khác nhau.
4. **Mobile 375px**: lưới `minmax(300px, 1fr)` đã có sẵn; không thêm phần tử rộng cố định.

## Non-goals

- Không sửa header/`<h1>`/title trang chủ (title mới đổi 06/09, đang chờ dữ liệu).
- Không thêm trang mới, không sửa `index.html` (SoftwareApplication giữ nguyên).

## Acceptance criteria

(Đếm bằng `grep -o … | wc -l`, không dùng `grep -c`.)

- [ ] `npm run lint` → exit 0
- [ ] `npm test` → exit 0
- [ ] `npm run build` → exit 0
- [ ] `grep -o '"FAQPage"' dist/index.html | wc -l` → `1`
- [ ] `grep -o '"@type":"Question"' dist/index.html | wc -l` → `5`
- [ ] `grep -o 'Typing Kid VN có dùng được trên điện thoại không?' dist/index.html | wc -l` → `2`
- [ ] `grep -o 'Typing Kid VN là gì?' dist/index.html | wc -l` → `2`
- [ ] `grep -o 'Typing Kid VN có gì?' dist/index.html | wc -l` → `1`
- [ ] `grep -o 'Tại sao chọn chúng tôi' dist/index.html | wc -l` → `0`
- [ ] `grep -o 'bảng mã Telex và VNI' dist/index.html | wc -l` → `0`
- [ ] `grep -o '"FAQPage"' dist/huong-dan-telex.html | wc -l` → `1`
- [ ] `grep -o 'Mie đuổi bắt' dist/index.html | wc -l` → ≥ 1
- [ ] `git status --porcelain -- src/routes.tsx index.html src/pages` → 0 lines

## Verify

```bash
npm run lint && npm test && npm run build
```
