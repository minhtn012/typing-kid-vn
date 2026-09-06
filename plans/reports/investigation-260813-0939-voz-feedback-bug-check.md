# VOZ Thread Feedback + Bug Check

Source: https://voz.vn/t/tap-go-10-ngon-tieng-viet-cho-be.1196935/ (1 page, fetched 2026-08-13)

## Feedback tổng hợp

### Bug reports (3 nhóm)
1. **zenfast** (Firefox/Ubuntu): "gõ từ đầu tiên tới phím space thì nó lại mở ô tìm kiếm của Firefox nên không sử dụng được"
2. **bibi97681**: "gõ vni bị lỗi rồi" (không mô tả chi tiết)
3. **anhanh3** + **Holo code dạo**: bắt buộc gõ dấu ngay tại ký tự thay vì gõ hết chữ rồi bỏ dấu ("thường là gõ xong chữ ko dấu trước rồi mới bắt đầu gõ dấu chứ nhỉ")

### Góp ý khác (không phải bug)
- Cho': cần bản offline; cần hoạt hình/hiệu ứng vui nhộn hơn cho bé
- Shioon: giao diện "nhìn tưởng anime" nhưng chưa hấp dẫn với trẻ
- Avenged7: hỏi độ tuổi/lớp phù hợp để bắt đầu → nên ghi rõ trên trang
- nguyenthaiau, Ơ Kìa Bạn: nhắc Typer Shark → gợi ý hướng game hoá thêm

## Kết quả check bug

### Bug 1 — Firefox mở Quick Find: CONFIRMED, root cause rõ
- App lắng nghe `window.keydown`, không có input element giữ focus.
- `useTyping.handleKeyDown` (src/hooks/useTyping.ts:53-99) **không gọi `e.preventDefault()`**.
- PracticeSession.tsx:57-63 & GameSession.tsx:162-167 chỉ preventDefault cho Space khi `e.target === document.body`.
- Firefox: phím `/` và `'` mặc định mở Quick Find (bài basic_bottom có ký tự `/`!); nếu user bật "Search for text when you start typing" thì MỌI chữ cái đều mở Quick Find → keydown sau đó rơi vào ô tìm kiếm, app mất input. Đúng như zenfast mô tả.
- Ngoài ra check `e.target === document.body` mỏng manh: sau khi click nút Restart, focus nằm trên button → Space vừa không bị chặn vừa kích hoạt lại button.
- **Fix đề xuất:** trong `onKeydown`, gọi `e.preventDefault()` cho mọi phím printable (`key.length === 1`) + Backspace khi session đang active (không có modal/textarea focus). Hoặc dùng hidden input giữ focus như các trang typing khác.

### Bug 2a — "gõ VNI bị lỗi" / cách bỏ dấu: CONFIRMED (design limitation, ảnh hưởng cả Telex + VNI)
- Engine so khớp **theo từng ký tự**: `rules[targetChar]` là chuỗi phím cố định phải gõ ngay tại vị trí ký tự đó (useTyping.ts:75-90).
- Ví dụ "gần" (VNI): app chỉ chấp nhận `g a 6 2 n`; người gõ VNI thật quen gõ `g a n 6 2` hoặc `ga6n2`. Telex tương tự: "học" app bắt `h o j c`, thói quen thật là `h o c j`.
- Người quen Unikey gõ theo thói quen → bị đếm lỗi liên tục → cảm giác "gõ vni bị lỗi rồi". Trùng khớp cả 3 comment (bibi97681, anhanh3, Holo code dạo).
- **Fix đề xuất:** refactor engine sang match theo **từ/âm tiết** (word buffer), chấp nhận nhiều thứ tự phím hợp lệ (dấu tại ký tự HOẶC cuối từ) — giống hành vi Unikey. Đây là thay đổi lớn nhất, cần plan riêng.
- Lưu ý phụ: nếu user đang bật Unikey/EVKey hệ thống, bộ gõ OS cũng phá input → nên hiện cảnh báo "tắt bộ gõ tiếng Việt của máy khi luyện tập".

### Bug 2b — Typo FINGER_MAP phím '9': CONFIRMED (bug thật, fix 1 ký tự)
- src/constants.ts, dòng `'o': 9, 'l': 9, '.': 9, '9': 0` → `'9'` bị map thành finger `0` (đúng phải là `9`).
- Hậu quả trong bài VNI chữ **đ = d + 9**: `FINGER_MAP['9'] || null` → null → Hands không sáng ngón nào; Keyboard highlight phím 9 với `fingerColor = 'transparent'` → phím highlight tàng hình.
- **Fix:** `'9': 0` → `'9': 9`.

## Đề xuất ưu tiên
1. (Nhỏ, ngay) Fix typo `FINGER_MAP['9']` — 1 dòng.
2. (Nhỏ, ngay) preventDefault mọi phím printable trong session → fix dứt điểm Firefox.
3. (Lớn, cần plan) Word-level matching cho Telex/VNI cho phép bỏ dấu cuối từ — giải quyết gốc 3/4 bug report.
4. (Product) Cảnh báo tắt bộ gõ OS; cân nhắc PWA offline + hiệu ứng cho bé (feedback Cho').

## Unresolved questions
- bibi97681 không mô tả chi tiết "gõ vni bị lỗi" — khả năng cao là 2a (thói quen bỏ dấu cuối từ) hoặc do bật Unikey hệ thống; chưa loại trừ trường hợp khác. Có thể hỏi lại trên thread để confirm.
