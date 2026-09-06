# Smoke phase 03 — 2 trang bảng gõ in được

Site tĩnh, không đăng nhập. Ngân sách 5 bước, ~6 phút.

**CẤM**: đừng bấm nút "In bảng này" — nó gọi `window.print()`, hộp thoại in của trình duyệt sẽ chặn mọi lệnh sau đó và làm hỏng cả run.

## Bước 1 — [layout] `/bang-go-telex` ở 375×812
- Đặt viewport 375×812 rồi mở `/bang-go-telex`.
- Kỳ vọng: đúng 1 `<h1>`, nội dung `Bảng gõ Telex đầy đủ (bản in A4)`.
- Kỳ vọng: **không cuộn ngang** — dán số thật của `document.documentElement.scrollWidth` và `window.innerWidth`, phải bằng nhau.
- Kỳ vọng: đếm `document.querySelectorAll('table').length` → `5`.
- Kỳ vọng: có nút chữ "In bảng này" (chỉ kiểm tra tồn tại, KHÔNG bấm).

## Bước 2 — [layout] Bảng rộng cuộn trong khung, không kéo cả trang (vẫn ở `/bang-go-telex`, 375px)
- Bảng thứ 3 ("Nguyên âm × thanh") nằm trong một `<div>` có `overflow-x: auto`.
- Chạy: lấy `const t=document.querySelectorAll('table')[2]; const w=t.parentElement;` rồi dán `w.scrollWidth`, `w.clientWidth`, `getComputedStyle(w).overflowX`.
- Kỳ vọng: `overflowX` = `auto`, `scrollWidth > clientWidth` (bảng cuộn được bên trong), và trang vẫn `scrollWidth === innerWidth`.

## Bước 3 — `/bang-go-vni` ở 375×812
- Mở `/bang-go-vni`.
- Kỳ vọng: 1 `<h1>` = `Bảng gõ VNI đầy đủ (bản in A4)`; không cuộn ngang (dán 2 số); 5 `<table>`.
- Kỳ vọng: trong bảng "12 từ hay gặp", dòng của từ `chữ` có ô phím là `chu74`, dòng `được` là `d9u7o7c5`. Dán 2 giá trị đọc được từ DOM.

## Bước 4 — Link chéo ở 1280×800
- Viewport 1280×800, mở `/bang-go-telex`.
- Bấm link `hướng dẫn cách gõ Telex` trong đoạn mở → kỳ vọng URL đích kết thúc bằng `/huong-dan-telex` và trang đó có `<h1>` chứa "Telex".
- Quay lại `/bang-go-telex`, đếm số thẻ trong khối "Hướng dẫn liên quan" cuối trang → kỳ vọng `5` (6 trang trừ trang hiện tại).

## Bước 5 — [layout] `/huong-dan-telex` sau refactor, ở 375×812
- Mở `/huong-dan-telex` ở 375×812.
- Kỳ vọng: không cuộn ngang (dán 2 số).
- Kỳ vọng: bảng nguyên âm × thanh vẫn render đủ **12 dòng** dữ liệu trong `<tbody>` và **7 cột** ở `<thead>`. Dán 2 số thật.
- Kỳ vọng: trong đoạn mở có link chữ `bảng gõ Telex in được` trỏ tới `/bang-go-telex`.
- Chạy `agent-browser errors` → kỳ vọng 0 lỗi console (bỏ qua warning favicon/analytics).

## Trả lời
Bảng: | Bước | Kết quả (PASS/FAIL/COSMETIC/BLOCKED) | Bằng chứng (số đo thật) |
Cuối cùng ghi `TỔNG: PASS=n FAIL=m COSMETIC=k BLOCKED=b`.
