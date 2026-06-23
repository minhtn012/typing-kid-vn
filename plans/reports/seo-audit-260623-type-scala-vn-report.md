# SEO Audit: type.scala.vn
**Ngày:** 2026-06-23 | **Điểm:** 52/100 (D) | **Nguồn dữ liệu:** Google Search Console API (real data, 90 ngày) + phân tích source code

## Executive Summary
Site mới (~5 tháng), nội dung & on-page cơ bản tốt nhưng **kiến trúc SPA đang chặn SEO**: 3/5 trang chưa được Google index ("URL is unknown to Google") và sitemap báo **0/5 URL indexed**. Nguyên nhân gốc: mọi route dùng chung 1 `index.html` → cùng `<title>`, `<meta description>` và **canonical đều trỏ về homepage**, khiến Google coi các trang con là bản sao của trang chủ. Ưu tiên #1: tách meta/canonical theo từng trang (pre-render hoặc react-helmet).

## Quick Stats (GSC, 90 ngày)
| Metric | Value | Status |
|--------|-------|--------|
| Tổng clicks | ~9 | 🔴 |
| Tổng impressions | ~457 | 🟡 |
| Vị trí trung bình | 25–60 | 🔴 |
| Trang được index | 2/5 | 🔴 |
| Sitemap indexed | 0/5 (báo cáo) | 🔴 |

## Tình trạng Index từng trang (GSC URL Inspection)
| URL | Trạng thái |
|-----|-----------|
| `/` (homepage) | ✅ Submitted and indexed |
| `/huong-dan-telex` | ✅ Submitted and indexed |
| `/tu-the-go-phim` | ❌ URL is unknown to Google |
| `/huong-dan-vni` | ❌ URL is unknown to Google |
| `/bi-mat-phim-f-j` | ❌ URL is unknown to Google |

## Technical SEO Checklist
| Element | Status | Chi tiết |
|---------|--------|----------|
| Title Tag | ⚠️ | Homepage tốt (~70 ký tự, hơi dài >60). Các trang con KHÔNG có title riêng |
| Meta Description | ⚠️ | Chỉ homepage có. Trang con dùng chung mô tả của homepage |
| Canonical | ❌ | **Mọi trang đều canonical về `https://type.scala.vn/`** → trang con bị coi là trùng lặp |
| H1 Tag | ❌ | Homepage H1 bị ẩn (`fontSize:1px; opacity:0`) — kỹ thuật rủi ro (hidden text) |
| Heading Hierarchy | ✅ | Các guide có H1→H2 rõ ràng |
| Rendering | ❌ | CSR (client-side) hoàn toàn, không pre-render → Google render chậm/khó |
| Sitemap | ⚠️ | Tồn tại, submit OK, 0 errors — nhưng 0 indexed |
| robots.txt | ✅ | Allow all + khai báo sitemap đúng |
| Internal Links | ✅ | Homepage link tới đủ 5 trang (nav + card) |
| Structured Data | ⚠️ | FAQPage hợp lệ ✅; nhưng `aggregateRating` 4.9/120 reviews là **dữ liệu giả** (site không có hệ thống review) → rủi ro manual action |
| OG Image | ⚠️ | 558KB — nặng, nên nén |
| Mobile | ✅ | Có viewport, crawl mobile thành công |

## Issues by Priority

### 🔴 Critical
1. **Canonical trỏ sai (mọi trang về homepage).** Trong `index.html` dòng `<link rel="canonical" href="https://type.scala.vn/" />` là tĩnh, áp cho TẤT CẢ route. Đây là lý do chính khiến 3 trang con không được index.
2. **Không có meta/title theo route.** Không dùng react-helmet, không `document.title`. Trang con không có tín hiệu SEO riêng → kém cạnh tranh & bị gộp với homepage.
3. **CSR hoàn toàn, không pre-render.** Vite build thường (`tsc -b && vite build`), không SSG/SSR. Nội dung chỉ xuất hiện sau khi JS chạy — Google index chậm, tăng rủi ro trang mới không được index.

### 🟠 High
4. **`aggregateRating` giả** trong JSON-LD (4.9 sao / 120 reviews). Vi phạm chính sách Google rich results → có thể bị gỡ snippet hoặc phạt thủ công. Gỡ bỏ cho đến khi có review thật.
5. **H1 homepage bị ẩn** (`fontSize:1px; opacity:0`). Hidden keyword text — borderline black-hat. Nên dùng H1 hiển thị bình thường.

### 🟡 Medium
6. Title homepage > 60 ký tự → bị cắt trên SERP.
7. Nhiều query "telex/vni" đang ở vị trí 50–90 (`bảng gõ telex`, `cách gõ telex`...) — có nhu cầu nhưng rank yếu vì trang telex/vni không tối ưu meta riêng + chưa index (vni).
8. OG image 558KB — nén xuống <150KB.

### 🟢 Low
9. `lastmod` trong sitemap nên cập nhật khi sửa nội dung.
10. Thêm `<html lang="vi">` đã có ✅ — giữ nguyên.

## Recommendations
| # | Hành động | Priority | Effort | Impact |
|---|-----------|----------|--------|--------|
| 1 | Pre-render mỗi route ra HTML tĩnh có title/description/canonical riêng (dùng `vite-plugin-ssr`/`vite-react-ssg`, hoặc `vite-plugin-prerender`) | 🔴 | Major | Rất cao |
| 2 | Nếu chưa pre-render được ngay: thêm `react-helmet-async` để set title/meta/canonical động theo từng trang | 🔴 | Medium | Cao |
| 3 | Sửa canonical từng trang trỏ đúng URL của chính nó | 🔴 | Quick Win (đi kèm #1/#2) | Cao |
| 4 | Gỡ `aggregateRating` khỏi JSON-LD (giữ FAQPage + SoftwareApplication) | 🟠 | Quick Win | Cao (tránh phạt) |
| 5 | Đổi H1 homepage thành hiển thị bình thường | 🟠 | Quick Win | Trung bình |
| 6 | Sau khi fix, dùng GSC "Request Indexing" cho 3 trang chưa index | 🟠 | Quick Win | Cao |
| 7 | Rút gọn title homepage ≤60 ký tự | 🟡 | Quick Win | Thấp |
| 8 | Nén og-image.png (<150KB, có thể dùng WebP) | 🟡 | Quick Win | Thấp |
| 9 | Bổ sung nội dung sâu cho trang telex/vni nhắm cụm từ "cách gõ telex/vni", "bảng gõ telex" | 🟡 | Medium | Cao (dài hạn) |

## Tại sao đây là vấn đề (giải thích cho junior)
- **SPA = 1 file HTML cho mọi URL.** React Router đổi nội dung *trong trình duyệt* bằng JS, nhưng file HTML gốc Google tải về luôn giống nhau (cùng title, meta, canonical của homepage).
- **Canonical là gì:** thẻ nói với Google "URL chuẩn của trang này là X". Khi mọi trang con đều khai canonical = homepage, bạn đang *tự bảo Google*: "mấy trang này chỉ là bản sao của trang chủ, đừng index". → Đó là lý do `tu-the-go-phim`, `huong-dan-vni`, `bi-mat-phim-f-j` "unknown to Google".
- **Cách đúng:** pre-render (tạo sẵn HTML cho từng route lúc build) để mỗi trang có HTML thật, đầy đủ nội dung + meta riêng ngay khi Google tải về, không cần đợi JS.

## Key Takeaways
- Site khỏe về on-page cơ bản nhưng **kiến trúc SPA + canonical sai** đang là nút thắt khiến 60% trang không index.
- Fix theo thứ tự: (1) meta/canonical theo route → (2) pre-render → (3) gỡ rating giả → (4) request re-index.
- Dữ liệu GSC xác nhận: có nhu cầu tìm kiếm ("telex", "10 ngón") nhưng đang mất traffic vì rank yếu/chưa index.

## Unresolved Questions
1. Bạn muốn mình **triển khai fix luôn** (thêm react-helmet-async + pre-render) hay chỉ dừng ở báo cáo này?
2. `aggregateRating` 4.9/120 reviews — có hệ thống đánh giá thật ở đâu không, hay là số tự đặt? (quyết định có gỡ hay không)
3. Có cần mình tạo plan chi tiết trong `plans/` cho việc chuyển sang pre-render không?
