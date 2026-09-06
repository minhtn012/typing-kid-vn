# Phase 06 (đợt 3, sau D+14) — Trang chọn phần mềm + mục "bật kiểu gõ" trong guide

**Nguồn:** `keyword-research.md` phát hiện 3 và 5. Làm sau khi phase 03–04 đã index và có số đo D+14, để không đổi quá nhiều thứ cùng lúc.

## A. `/phan-mem-go-10-ngon-cho-tre-em` — trang chọn phần mềm

Intent: phụ huynh/giáo viên tìm "phần mềm gõ 10 ngón cho trẻ em miễn phí", "app tập gõ 10 ngón tiếng việt", và hay gõ kèm tên: mario, cá heo, monkey, typingmaster, rapid typing. GSC 90d: `phần mềm đánh máy 10 ngón tiếng việt miễn phí cho trẻ em` pos 1.8, `phần mềm tập gõ 10 ngón cho trẻ em` pos 1.0 (1 impr) → site đã được coi là hợp intent, thiếu trang chuyên.

- Title: "Phần mềm gõ 10 ngón cho trẻ em miễn phí: so sánh 6 lựa chọn | Typing Kid VN" (≤ 65, cân nhắc bỏ "so sánh" nếu quá dài).
- H1: "Phần mềm tập gõ 10 ngón cho trẻ em: 6 lựa chọn miễn phí và cách chọn".
- Bảng so sánh 6 cột tiêu chí: tiếng Việt có dấu? · chạy trên web hay phải cài? · miễn phí? · có game? · phù hợp tuổi · hệ điều hành. Dòng: Typing Kid VN, Mario Teaches Typing, phần mềm "cá heo" (Dolphin), TypingMaster, Rapid Typing, Typing Study/Monkey. **Worker phải kiểm tra thực tế từng phần mềm bằng WebSearch/WebFetch trước khi điền ô** (phiên bản, còn tải được không, có tiếng Việt không); ô không chắc ghi "không rõ", không bịa.
- Mục "Chọn theo tuổi": 6–8 game trước; 8–10 bài theo hàng phím; 10+ gõ có dấu. Link `/tap-go-10-ngon-cho-be`.
- Mục "Vì sao phần mềm cũ (Mario, cá heo) khó dùng năm 2026": chạy DOS/Win cũ, không có tiếng Việt có dấu, cần cài đặt; web thay thế được.
- FAQ 3 câu: "Phần mềm gõ 10 ngón nào có tiếng Việt?", "Có cần cài đặt không?", "Phần mềm gõ 10 ngón Mario còn dùng được không?".
- Schema: Breadcrumb + Article + FAQPage. Không dùng schema Review/Rating (đã gỡ ở audit trước, không bịa).
- Trung thực: nêu điểm Typing Kid VN chưa có (không offline, chỉ desktop) để trang không thành quảng cáo.

## B. Guide Telex/VNI thêm mục "Bật kiểu gõ trên máy và điện thoại"

Suggest cho `cách gõ telex` / `cách gõ vni`: hơn nửa là "cách chỉnh/chuyển/bật kiểu gõ ... trên máy tính / win 11 / macbook / iphone / android / samsung / gboard" và "kiểu gõ telex bảng mã gì".

- Thêm vào cuối mỗi guide (trước FAQ) 1 H2 "Bật kiểu gõ Telex trên Windows, macOS và điện thoại" với 4 H3 ngắn: Windows 11 (bộ gõ tiếng Việt có sẵn hoặc Unikey → chọn Telex, bảng mã Unicode), macOS (Bàn phím → Nguồn nhập → Tiếng Việt Telex/VNI), iPhone (Cài đặt → Bàn phím → Tiếng Việt → Telex/VNI), Android/Gboard (Ngôn ngữ → Tiếng Việt → Telex/VNI). Mỗi H3 3–5 bước, không ảnh.
- Thêm 1 đoạn "Telex là kiểu gõ, không phải bảng mã: luôn chọn bảng mã Unicode" — giải quyết cụm `kiểu gõ telex bảng mã gì`, `cách gõ bảng mã vni windows`.
- Thêm 2 câu FAQ tương ứng vào `faqs` (schema tự cập nhật).
- Worker kiểm tra tên menu thật của Windows 11 / macOS 15 / iOS 18 / Gboard 2026 bằng WebSearch trước khi viết bước.

## C. Đồng nghĩa "đánh máy" (làm ngay trong phase 02/04 nếu chưa)

- Trang chủ: 1 H2 hoặc câu mở dùng "tập đánh máy 10 ngón" và "luyện gõ 10 ngón online, không cần cài đặt".
- Trang trẻ em: mục tuổi dùng "học sinh tiểu học", "lớp 1–2"; FAQ 3 đổi thành "Tập gõ 10 ngón mất bao lâu?".

## Validation
- Trang A: HTML SSG, 1 FAQPage, bảng so sánh cuộn ngang trên mobile, mọi ô đã kiểm chứng hoặc ghi "không rõ".
- Guide: FAQPage vẫn 1 khối, số câu tăng; Rich Results Test pass.
- D+28 sau khi lên: query chứa "phần mềm" hoặc "app" có impression cho trang A.
