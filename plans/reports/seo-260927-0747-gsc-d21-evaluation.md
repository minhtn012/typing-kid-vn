# Đánh giá SEO type.scala.vn — D+21 sau đợt 2 (27/09/2026)

Nguồn: GSC API (28d, 90d, theo tuần 01/06–26/09 với `dataState: all`, so sánh 3 tuần trước/sau 07/09 theo query×page, inspect 8 URL), `curl` live 8 route, Google Suggest/WebSearch cho tên menu bộ gõ.

## Kết luận

Kỹ thuật ổn và trang Telex đang lên, nhưng lượt hiển thị giảm gần một nửa và 3 trang mới chưa được Google index. Nút thắt hiện tại là **index và độ tin của domain**, không phải on-page. Vì vậy đợt 3 dồn nội dung vào 2 trang đã index thay vì thêm trang.

## Số liệu

**28 ngày (tới 26/09):** 41 click / 518 impr. Desktop 38 click (pos 29.5), mobile 2 click / 99 impr (pos 11.1).

| Trang | Click | Impr | Pos | So với baseline 06/09 |
|---|---:|---:|---:|---|
| `/` | 33 | 245 | 30.7 | impr −46 % (458), click −27 % |
| `/huong-dan-telex` | 8 | 214 | 12.7 | click ×4, impr +45 %, pos 15.2 → 12.7 |
| `/huong-dan-vni` | 0 | 75 | 43.6 | không đổi |
| `/tu-the-go-phim` | 1 | 15 | 4.1 | ổn |
| `/bi-mat-phim-f-j` | 0 | 3 | 5.0 | ổn |
| 3 trang mới | 0 | 0 | — | chưa index |

**Theo tuần (cả site):** impr 200/tuần cuối 08 → 148 → 84 → 63 (tuần 21/09); pos TB 31 → 15; click ổn định 6–11/tuần.

**Vì sao impr giảm:** trang chủ mất các query rộng ở hạng 40–58 (`tập gõ 10 ngón` 26 → 0, `luyện gõ 10 ngón`, `đánh máy 10 ngón`, `gõ phím 10 ngón`…) sau lần crawl 13/09 với title mới có "cho trẻ em". Những query này ở trang 5–6 nên gần như không mất click; pos TB tăng chủ yếu vì mất phần đuôi này. `luyện gõ 10 ngón tiếng việt` nằm ở pos ~34 suốt từ tháng 8; con số 6.8 trong baseline là một đợt 44 impr tuần 10/08, không phải thứ hạng bền.

**Đang tăng:** query thương hiệu `typing kid vn` (0 → 41 impr/28d, pos 1.5, 20 click, có vẻ từ thread VOZ); `/huong-dan-telex` nhận thêm `gõ telex` (pos 13.8), `bảng dấu telex` (9.2), `dấu trong telex` (4.8), `cách đánh telex trên máy tính` (5.0).

## Index (GSC inspect 27/09)

| URL | Trạng thái | Crawl gần nhất |
|---|---|---|
| `/` | indexed | 13/09 |
| `/huong-dan-telex` | indexed | 21/09 |
| `/huong-dan-vni` | indexed | 31/07 |
| `/tu-the-go-phim`, `/bi-mat-phim-f-j` | indexed | 23/06 |
| `/bang-go-telex`, `/bang-go-vni`, `/tap-go-10-ngon-cho-be` | **Discovered – currently not indexed** | chưa từng |

Sitemap: 8 URL, Google tải lần cuối 26/09, 0 lỗi. Google biết 3 URL nhưng chưa bỏ công crawl: dấu hiệu crawl budget thấp của domain nhỏ, ít backlink.

## Kỹ thuật (curl live)

- 8 route 200, HTML SSG đủ title/h1/canonical, không `noindex`, link nội bộ trang chủ và guide Telex trỏ đủ 3 trang mới.
- **Lỗi mới phát hiện:** cả 7 trang nội dung bọc nội dung trong `motion.div initial={{ opacity: 0 }}` → HTML SSG ship `opacity:0`, nội dung vô hình tới khi JS chạy. Google render JS nên không mất index, nhưng làm chậm LCP và lãng phí lợi ích của SSG. Sửa trong task 1 đợt 3 (`initial={false}`).
- **Sai nội dung:** FAQ VNI ghi "Cài Gboard… chọn kiểu gõ VNI"; nguồn tìm được mâu thuẫn về việc Gboard có VNI. Task 1 viết lại, hướng người dùng Android sang Laban Key.

## Việc đã làm hôm nay

- Plan `plans/260927-0747-seo-round3/plan.md`; task 1 (mục bật kiểu gõ Win/Mac/iPhone/Android + "kiểu gõ khác bảng mã" + 4 FAQ + bỏ `opacity:0` ở 7 trang) do agy làm (205s, gemini-3.8-flash-high, không 503). Coordinator chạy lại lint/test/build và 17 tiêu chí, kiểm 375px bằng agent-browser (không cuộn ngang, opacity 1, không lỗi console), rồi apply. Chưa commit/push.
- scope-map: `guides` — thêm bẫy `initial={false}` cho wrapper và ghi chú mục bật kiểu gõ. business: unchanged (repo chưa có `docs/business`).

## Việc của user (API không làm được)

1. GSC UI → URL Inspection → **Request Indexing** cho `/bang-go-telex`, `/bang-go-vni`, `/tap-go-10-ngon-cho-be`, và sau khi deploy task 1 cho `/huong-dan-telex`, `/huong-dan-vni`.
2. Off-page: post đầu thread VOZ và nhóm phụ huynh Facebook, link thẳng tới `/bang-go-telex` và `/tap-go-10-ngon-cho-be`. Một link ngoài được crawl thường là cách nhanh nhất để Google crawl URL đang "Discovered".

## Câu hỏi mở

1. Có muốn thử lại title trang chủ để lấy lại cụm rộng "luyện gõ 10 ngón" không? Đề xuất: chưa, chờ D+28 (~05/10) vì click chưa giảm.
2. Trang so sánh phần mềm (06A) để sau khi 3 trang mới được index. Đồng ý không?
