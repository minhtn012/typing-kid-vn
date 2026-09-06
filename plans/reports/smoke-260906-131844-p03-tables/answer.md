[SKILL] Activating: agent-browser — Reason: AI-optimized browser automation CLI to run smoke UI tests for the web app

### Bảng kết quả Smoke UI

| # | Bước | Kỳ vọng | Thực tế | Kết quả | Ảnh |
|---|---|---|---|---|---|
| 1 | [layout] `/bang-go-telex` ở 375×812 | Đúng 1 `<h1>` "Bảng gõ Telex đầy đủ (bản in A4)", không cuộn ngang (`scrollWidth === innerWidth`), 5 `<table>`, có nút "In bảng này" | Đúng 1 `<h1>` ("Bảng gõ Telex đầy đủ (bản in A4)"), `scrollWidth=375` === `innerWidth=375`, đủ 5 `<table>`, nút "In bảng này" tồn tại, 0 lỗi console | PASS | shots/01-telex-375.png |
| 2 | [layout] Bảng rộng cuộn trong khung (ở `/bang-go-telex`, 375px) | Bảng thứ 3 ("Nguyên âm × thanh") nằm trong `<div>` có `overflow-x: auto`; `overflowX="auto"`, `scrollWidth > clientWidth`, trang `scrollWidth === innerWidth` | `w.scrollWidth=560` > `w.clientWidth=335`, `overflowX="auto"`, `document.documentElement.scrollWidth=375` === `window.innerWidth=375`, 0 lỗi console | PASS | shots/02-telex-scroll-375.png |
| 3 | `/bang-go-vni` ở 375×812 | 1 `<h1>` = "Bảng gõ VNI đầy đủ (bản in A4)", không cuộn ngang (`scrollWidth === innerWidth`), 5 `<table>`; từ "chữ" phím "chu74", từ "được" phím "d9u7o7c5" | Đúng 1 `<h1>` ("Bảng gõ VNI đầy đủ (bản in A4)"), `scrollWidth=375` === `innerWidth=375`, 5 `<table>`; DOM từ "chữ" có phím `chu74`, từ "được" có phím `d9u7o7c5`, 0 lỗi console | PASS | shots/03-vni-375.png |
| 4 | Link chéo ở 1280×800 | Bấm link "hướng dẫn cách gõ Telex" trong đoạn mở → URL kết thúc bằng `/huong-dan-telex` và `<h1>` chứa "Telex"; quay lại `/bang-go-telex` đếm 5 thẻ trong khối "Hướng dẫn liên quan" | Chuyển hướng đúng sang URL `/huong-dan-telex` (`<h1>` = "Hướng dẫn gõ Tiếng Việt kiểu Telex - Cách gõ nhanh nhất"); quay lại `/bang-go-telex` khối "Hướng dẫn liên quan" có đúng 5 thẻ link; 0 lỗi console | PASS | shots/04-cross-links-1280.png |
| 5 | [layout] `/huong-dan-telex` sau refactor, ở 375×812 | Không cuộn ngang (`scrollWidth === innerWidth`); bảng nguyên âm × thanh render đủ 12 dòng `<tbody>` và 7 cột `<thead>`; link "bảng gõ Telex in được" trỏ tới `/bang-go-telex`; 0 lỗi console | `scrollWidth=375` === `innerWidth=375`; bảng nguyên âm × thanh có `theadCols=7`, `tbodyRows=12`; có link "bảng gõ Telex in được" với `href="/bang-go-telex"`; 0 lỗi console | PASS | shots/05-telex-guide-375.png |

---

TỔNG: PASS=5 FAIL=0 COSMETIC=0 BLOCKED=0

