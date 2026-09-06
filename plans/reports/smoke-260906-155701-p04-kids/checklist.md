# Smoke phase 04 — landing phụ huynh `/tap-go-10-ngon-cho-be`

Site tĩnh, không đăng nhập. Ngân sách 5 bước, ~6 phút.

**CẤM**: không mở `/bang-go-telex` hay `/bang-go-vni` rồi bấm nút "In bảng này" — `window.print()` mở hộp thoại in và chặn mọi lệnh sau đó.

## Bước 1 — [layout] `/tap-go-10-ngon-cho-be` ở 375×812
- Đặt viewport 375×812, mở `/tap-go-10-ngon-cho-be`.
- Kỳ vọng: đúng 1 `<h1>` nội dung `Tập gõ 10 ngón cho bé: lộ trình 4 tuần tại nhà`.
- Kỳ vọng: **không cuộn ngang** — dán số thật `document.documentElement.scrollWidth` và `window.innerWidth`, phải bằng nhau.
- Kỳ vọng: đếm `document.querySelectorAll('h2').length` → `6`.
- Kỳ vọng: `document.querySelectorAll('table').length` → `1`, và bảng đó có 4 dòng trong `<tbody>`.

## Bước 2 — [layout] Bảng lộ trình cuộn trong khung (vẫn 375px)
- Lấy `const t=document.querySelector('table'); const w=t.parentElement;` rồi dán `getComputedStyle(w).overflowX`, `w.scrollWidth`, `w.clientWidth`.
- Kỳ vọng: `overflowX` = `auto`; trang vẫn `scrollWidth === innerWidth`.
- (Bảng có thể vừa khung, `scrollWidth == clientWidth` cũng PASS — điều quan trọng là trang không cuộn ngang.)

## Bước 3 — Link bài học mở đúng bài (1280×800)
- Viewport 1280×800, mở `/tap-go-10-ngon-cho-be`.
- Bấm link `Cơ bản: Hàng phím cơ sở` trong bảng lộ trình.
- Kỳ vọng: URL chứa `mode=basic_home`, và trang hiện màn luyện gõ (có vùng gõ / bàn phím ảo), KHÔNG còn thấy `<h1>` "Tập gõ 10 ngón cho bé". Dán URL thật và một đoạn text nhận diện màn luyện gõ.

## Bước 4 — CTA cuối trang và link chéo (1280×800)
- Quay lại `/tap-go-10-ngon-cho-be`.
- Kỳ vọng: cuối bài có nút/link chữ `Bắt đầu tuần 1 ngay` trỏ tới `/?mode=basic_home`; dưới nó có dòng `Mở trên máy tính có bàn phím rời.`
- Kỳ vọng: khối "Hướng dẫn liên quan" cuối trang có đúng `6` thẻ (7 trang trừ trang hiện tại).
- Kỳ vọng: trong bài có link tới `/huong-dan-telex`, `/bang-go-telex`, `/huong-dan-vni`, `/bang-go-vni`, `/tu-the-go-phim`, `/bi-mat-phim-f-j`. Dán danh sách href thật tìm được.

## Bước 5 — [layout] Nav trang chủ 5 link ở 375×812
- Viewport 375×812, mở `/`.
- Kỳ vọng: `<nav>` đầu trang có **5** link: "Tư thế ngồi", "Cách gõ Telex", "Cách gõ VNI", "Phím F và J", "Tập gõ cho bé"; xuống dòng gọn, không cắt chữ, không chồng lên nhau.
- Kỳ vọng: trang chủ không cuộn ngang (dán 2 số).
- Chạy `agent-browser errors` → kỳ vọng 0 lỗi console (bỏ qua warning favicon/analytics).

## Trả lời
Bảng: | Bước | Kết quả (PASS/FAIL/COSMETIC/BLOCKED) | Bằng chứng (số đo thật) |
Cuối cùng ghi `TỔNG: PASS=n FAIL=m COSMETIC=k BLOCKED=b`.
