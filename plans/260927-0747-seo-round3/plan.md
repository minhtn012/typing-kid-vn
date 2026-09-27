# Plan: SEO đợt 3 — củng cố trang đã index, gỡ nghẽn index

**Slug:** seo-round3 · **Ngày:** 2026-09-27 · **Branch:** main
**Trạng thái:** task 1, 2 và IndexNow đã lên production 27/09 (`5a206e0`, `9bf7466`, `4cadefc`); việc của user còn chờ
**Báo cáo GEO:** `plans/reports/geo-260927-0747-ai-answer-visibility.md`
**Kế thừa:** `plans/260906-1115-seo-push-round2/` (phase 05 đo D+21 ở báo cáo dưới, phase 06 được chia lại ở đây)
**Báo cáo đánh giá:** `plans/reports/seo-260927-0747-gsc-d21-evaluation.md`

## Vì sao đổi thứ tự phase 06 cũ

3 trang thêm ngày 06/09 (`/bang-go-telex`, `/bang-go-vni`, `/tap-go-10-ngon-cho-be`) sau 21 ngày vẫn "Discovered – currently not indexed". Thêm trang mới (`/phan-mem-go-10-ngon-cho-tre-em`, phase 06A) lúc này chỉ đẩy thêm URL vào hàng chờ. Trang đang được Google crawl nhiều nhất là `/huong-dan-telex` (crawl 21/09, pos 16 → 12, đang nhận thêm `gõ telex`, `bảng dấu telex`, `cách gõ telex`) → dồn nội dung vào đó và `/huong-dan-vni`.

## Acceptance criteria (đo D+28 sau deploy, ~25/10)

1. `/huong-dan-telex` pos 28d ≤ 10, có impression cho ít nhất 1 query chứa "win", "mac", "iphone", "điện thoại" hoặc "bảng mã".
2. 3 URL mới: `coverageState` = "Submitted and indexed" (cần user Request Indexing).
3. HTML SSG của 7 trang nội dung không còn `opacity:0` ở wrapper.
4. Tổng click 28d ≥ 50 (hiện 41).

## Non-goals

- Không thêm trang mới đợt này (06A để lại tới khi 3 trang cũ được index).
- Không đổi title trang chủ lần nữa (mới đổi 06/09, chưa đủ dữ liệu).
- Không đụng alias `practice`.

## Tasks

| # | Task | Người làm | Trạng thái |
|---|---|---|---|
| 1 | [Mục bật kiểu gõ Win/Mac/điện thoại + bảng mã + FAQ cho 2 guide; bỏ `opacity:0` SSG ở 7 trang](task-1-setup-sections-and-ssg-visible.md) | agy (gemini-3.8-flash-high) | xong, live 27/09 (`5a206e0`) |
| 2a | [Trang chủ: định nghĩa + dữ kiện cho AI trích dẫn, FAQ một nguồn](task-2-home-facts-for-ai-answers.md) | agy | xong, live 27/09 (`4cadefc`) |
| 2b | IndexNow (`npm run indexnow` sau mỗi deploy) | coordinator | xong 27/09, 202 Accepted 8 URL (`9bf7466`) |
| 2c | Bing Webmaster Tools: import từ GSC, submit sitemap | user | chờ |
| 2 | Request Indexing 3 URL mới trong GSC UI; Rich Results Test 2 guide | user | chờ |
| 3 | Off-page: sửa post đầu thread VOZ, đăng bảng gõ ở nhóm phụ huynh (link về `/bang-go-telex`, `/tap-go-10-ngon-cho-be`) | user | chờ (còn từ phase 05 đợt 2) |
| 4 | Đo lại D+14 sau deploy (~11/10): `--inspect` 8 URL, `--top-pages -d 28` | coordinator | chờ |
| 5 | Trang `/phan-mem-go-10-ngon-cho-tre-em` (phase 06A đợt 2) | — | hủy 27/09 theo quyết định của user |
| 6 | Trang `/tap-go-ban-phim-lop-3`: bài SGK Tin học 3 (Kết nối tri thức Bài 5, Cánh diều A3 Bài 1–3, Chân trời sáng tạo Bài 5) → bài luyện; nhắm cụm "tập gõ bàn phím lớp 3", "em tập gõ hàng phím cơ sở" (ít đối thủ công cụ, SERP toàn trang giải bài tập) | coordinator | xong 27/09; user chọn làm dù non-goal "không thêm trang mới" |
