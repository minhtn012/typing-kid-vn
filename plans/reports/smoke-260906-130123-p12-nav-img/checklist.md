# Smoke phase 01+02 — nav 4 link, ảnh guide có kích thước

Ngân sách: 3 bước, ~4 phút. App là web tĩnh, không cần đăng nhập.

## Bước 1 — [layout] Trang chủ ở 1280×800
- Mở `/`.
- Trong `<nav>` đầu trang phải có **đúng 4 link** với nhãn: "Tư thế ngồi", "Cách gõ Telex", "Cách gõ VNI", "Phím F và J".
- Kỳ vọng: 4 link nằm gọn trên 1 hàng, không tràn khỏi khung, không đè lên h1 "Luyện gõ 10 ngón tiếng Việt - Phần mềm gõ mười ngón miễn phí".
- Ghi lại `document.title` — phải bắt đầu bằng "Luyện gõ 10 ngón tiếng Việt miễn phí cho trẻ em".

## Bước 2 — [layout] Trang chủ ở 375×812 (mobile)
- Resize viewport 375×812, tải lại `/`.
- Kỳ vọng: 4 link nav xuống dòng gọn (2 hàng cũng được), không bị cắt chữ, không chồng lên nhau.
- Kỳ vọng: trang KHÔNG cuộn ngang — kiểm bằng `document.documentElement.scrollWidth <= window.innerWidth + 1`. Dán giá trị thật của 2 số.
- Đoạn mô tả dưới h1 phải chứa cụm "tập gõ 10 ngón" và "không cần cài đặt".

## Bước 3 — [layout] Guide Telex ở 375×812
- Mở `/huong-dan-telex` (viewport vẫn 375×812).
- Ảnh bàn phím ngay dưới h1: kiểm `img.getBoundingClientRect()` — chiều rộng ≈ chiều rộng khung chứa, chiều cao > 0 và tỉ lệ ≈ 1:1 (ảnh vuông 1024×1024, style `height:auto`).
- Kỳ vọng: không cuộn ngang (`scrollWidth <= innerWidth + 1`), ảnh không bị bóp méo, không có khoảng trắng lớn bất thường.
- Chạy `agent-browser errors` — kỳ vọng 0 lỗi console nghiêm trọng (bỏ qua warning về favicon/analytics).

## Trả lời
Bảng: | Bước | Kết quả (PASS/FAIL/COSMETIC/BLOCKED) | Bằng chứng (số đo thật) |
Cuối cùng ghi `TỔNG: PASS=n FAIL=m COSMETIC=k BLOCKED=b`.
