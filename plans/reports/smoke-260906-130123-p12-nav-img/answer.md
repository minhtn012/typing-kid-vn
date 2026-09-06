[SKILL] Activating: agent-browser — Reason: AI-optimized browser automation CLI to run smoke UI tests for the web app
### Bảng kết quả Smoke UI

| # | Bước | Kỳ vọng | Thực tế | Kết quả | Ảnh |
|---|---|---|---|---|---|
| 1 | [layout] Trang chủ ở 1280×800 | 4 link nav trên 1 hàng, không tràn khỏi khung, không đè lên h1; document.title bắt đầu bằng "Luyện gõ 10 ngón tiếng Việt miễn phí cho trẻ em" | Đủ 4 link nav cùng nằm trên 1 hàng (top 186px, bottom 208px, left 449px -> right 831px); h1 bắt đầu từ top 238px (không bị đè); `document.title` = "Luyện gõ 10 ngón tiếng Việt miễn phí cho trẻ em \| Typing Kid VN"; 0 lỗi console | PASS | shots/01-home-1280.png |
| 2 | [layout] Trang chủ ở 375×812 (mobile) | 4 link nav xuống dòng gọn gàng, không bị cắt chữ, không chồng lên nhau; trang không cuộn ngang (`scrollWidth <= innerWidth + 1`); mô tả dưới h1 chứa cụm "tập gõ 10 ngón" và "không cần cài đặt" | Nav chia làm 2 hàng gọn gàng (hàng 1: 3 link top 186px; hàng 2: 1 link top 250px căn giữa), không chồng lấn, không cắt chữ; `scrollWidth` = 375, `innerWidth` = 375 (375 <= 376: đúng); đoạn mô tả chứa đầy đủ cả 2 cụm từ; 0 lỗi console | PASS | shots/02-home-375.png |
| 3 | [layout] Guide Telex ở 375×812 | Mở `/huong-dan-telex`; ảnh bàn phím ngay dưới h1 có chiều rộng ≈ khung chứa, chiều cao > 0, tỉ lệ ≈ 1:1; không cuộn ngang (`scrollWidth <= innerWidth + 1`); ảnh không bị bóp méo; 0 lỗi console | Ảnh đạt tỉ lệ 1.000 (560×560px, khung chứa 560px, ảnh gốc 1024×1024px, `height: auto`), không méo; tuy nhiên trang bị cuộn ngang nặng với `scrollWidth` = 600 > `innerWidth` = 375 (600 <= 376: SAI); ảnh và tiêu đề h1 bị tràn ra ngoài mép phải màn hình và bị cắt xén; 0 lỗi console | FAIL | shots/03-guide-telex-375.png |

---

### Bằng chứng lỗi (Bước 3 — FAIL)

- **Số đo thực tế**: `scrollWidth = 600`, `innerWidth = 375` (điều kiện kiểm tra `scrollWidth <= innerWidth + 1` trả về `false` vì `600 > 376`). Trang bị tràn ngang tới 225px do khối nội dung (container và các bảng hướng dẫn gõ Telex) giữ độ rộng 600px (560px nội dung + 40px padding).
- **Kích thước ảnh**: `img.getBoundingClientRect()` đạt `width = 560px`, `height = 560px` (tỉ lệ 1:1), bằng đúng chiều rộng container cha (560px).
- **Mô tả ảnh `shots/03-guide-telex-375.png`**: Trên viewport mobile 375px, container 600px khiến các phần tử bị đẩy tràn ra ngoài khung nhìn. Tiêu đề H1 bị cắt xén mất cụm từ bên phải (chỉ nhìn thấy `"Hướng dẫn gõ Tiếng \"`), đoạn văn bản mô tả bị khuất lề phải, và ảnh bàn phím bị cắt mất ~185px bề ngang bên phải (phần tử có trong DOM nhưng bị tràn khỏi màn hình, không hiển thị trọn vẹn).
- **Lỗi console**: 0 lỗi console runtime (`errors: []`).

---

TỔNG: PASS=2 FAIL=1 COSMETIC=0 BLOCKED=0

