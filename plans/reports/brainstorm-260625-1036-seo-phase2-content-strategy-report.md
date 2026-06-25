# Brainstorm: SEO type.scala.vn — chiến lược Phase 2 (nội dung & thứ hạng)

**Ngày:** 2026-06-25 10:36 | **Loại:** Brainstorm report | **Site:** type.scala.vn (Vite + React 19 SPA, deploy Vercel)
**Nguồn dữ liệu:** Google Search Console API (real data, 28 ngày) + đọc source code + audit trước (`seo-audit-260623-type-scala-vn-report.md`)

## 1. Vấn đề & bối cảnh

Audit 23/06 (điểm 52/100) kết luận nút thắt SEO là kiến trúc SPA: canonical trỏ sai → 3/5 trang con "unknown to Google". Sau đó commit `6e0be4a` đã fix canonical/meta per-route (qua React 19 metadata hoisting trong `Seo.tsx`), gỡ `aggregateRating` giả, bỏ H1 ẩn, rút title homepage.

Câu hỏi brainstorm: cần làm gì tiếp để đẩy SEO. Mục tiêu user chọn: **cả hai, làm theo giai đoạn** (G1 kỹ thuật → G2 nội dung).

## 2. Phát hiện then chốt từ GSC (25/06) — đổi kết luận

### Fix canonical đã ĂN: 5/5 trang đã index (audit báo 2/5)
| URL | Trạng thái | Google canonical | Last crawl |
|-----|-----------|------------------|------------|
| `/` | Indexed | self ✓ | 21/06 |
| `/tu-the-go-phim` | Indexed (trước: unknown) | self ✓ | 23/06 |
| `/huong-dan-vni` | Indexed (trước: unknown) | self ✓ | 23/06 |
| `/bi-mat-phim-f-j` | Indexed (trước: unknown) | self ✓ | 23/06 |
| `/huong-dan-telex` | Indexed nhưng **user-canonical lệch về `/`** | self (Google override) | **22/05 (cũ, trước fix)** |

→ React 19 hoisting **client-side đủ để Google index**. Nút thắt index đã gỡ.

### Vấn đề nhỏ còn lại
- `/huong-dan-telex`: crawl lần cuối 22/05 (trước fix), khai báo canonical cũ còn trỏ homepage → cần Request Indexing.
- Sitemap báo "0/5 indexed": metric lag (sitemap tải lần cuối 24/01). Thực tế URL Inspection = 5/5 indexed. Cần re-submit sitemap.

### Traffic & thứ hạng (28 ngày)
- Impressions ~108–175, clicks ~6 (gần như chỉ homepage). Đã index nhưng rank thấp → chưa có click.
- Vị trí đáng chú ý: `gõ 10 ngón tiếng việt` pos 15.5 (13 impr), `luyện gõ 10 ngón tiếng việt telex` pos 4.8, `luyện gõ 10 ngón.vn` pos 12.2.
- Cụm telex rank yếu (pos 70–87): `bảng gõ telex` (8 impr), `cách gõ chữ telex`, `bảng chữ telex`, `bảng chữ cái telex`, `cách đánh telex`, `kiểu gõ chữ telex` → mỏ từ khóa.

## 3. Approaches đã cân nhắc (rendering)

| Hướng | Pros | Cons | Kết luận |
|-------|------|------|----------|
| **A. vite-react-ssg (SSG)** | Pre-render HTML thật, dứt điểm index kể cả bot không JS, giữ codebase | Refactor entry + guard window/localStorage | Đã chọn ban đầu |
| **B. Migrate Next.js** | SEO mạnh nhất, native Vercel | Rewrite lớn, rủi ro cao, lợi ích (SSR/ISR) chưa cần | Loại (YAGNI) |
| **C. Giữ CSR + request index** | Rẻ | Không sửa gốc cho bot không JS | — |

**Đổi quyết định sau dữ liệu GSC:** vì 5/5 đã index, SSG tụt từ "critical" → "nên có". Đòn bẩy lớn nhất giờ là **nội dung + thứ hạng** (trang đã index nhưng pos 15–85). User chọn **ưu tiên Phase 2 nội dung**, hoãn SSG.

## 4. Giải pháp chốt: Phase 2 — Nội dung & on-page (bám GSC)

### ① `/huong-dan-telex` — cú đấm chính (pos 76 → mục tiêu top 20)
Trang hiện rất mỏng (bảng 5 dấu trên 'a' + vài quy tắc). Bổ sung:
- **Bảng gõ Telex ĐẦY ĐỦ**: mọi nguyên âm có dấu (a/ă/â/e/ê/o/ô/ơ/u/ư/i/y + đ) × 5 thanh, render từ `TELEX_RULES` có sẵn trong `constants.ts` → bắt "bảng gõ telex / bảng chữ telex / bảng chữ cái telex".
- **Cách gõ Telex trên điện thoại** (Gboard/Laban Key).
- **Lỗi thường gặp & cách sửa** (vd gõ "oo" ngoài ý muốn, từ 2 âm) → long-tail.
- **So sánh Telex vs VNI** + internal link `/huong-dan-vni`.
- **FAQ section + FAQPage JSON-LD riêng trang** → rich result / AI Overview.

### ② Homepage `/` (pos 28, "gõ 10 ngón" pos 15.5) — đẩy lên page 1
- Thêm khối nội dung text mô tả (crawler đọc) quanh H1.
- Tinh chỉnh title/H1 bám cụm impressions cao.

### ③ `/huong-dan-vni` — nhân bản công thức Telex (bảng VNI đầy đủ + FAQ) để bắt đầu rank.

### On-page chung mọi guide
- Breadcrumb JSON-LD + Article/HowTo schema từng trang.
- Internal linking chặt giữa 4 guide (hiện chỉ link về homepage).
- Cập nhật `lastmod` sitemap sau khi sửa.

### Quick win GSC (5 phút, không code) — nên làm song song
- Re-submit `sitemap.xml`.
- Request Indexing `/huong-dan-telex` (fix canonical lệch do bản crawl cũ).

## 5. Rủi ro
- **CSR còn giữ:** nội dung mới render bằng JS. Google đã chứng minh index được, nhưng nên đảm bảo bảng/FAQ nằm trong DOM ban đầu nhiều nhất có thể. Nếu cần chắc 100% → quay lại SSG (quyết định đã có).
- Schema mới phải validate (dùng `validate-schema.cjs` có sẵn) tránh lỗi rich result.
- Tránh nhồi từ khóa: nội dung phải tự nhiên, hữu ích.

## 6. Success metrics
- Telex page có bảng đầy đủ + FAQ; `validate-schema.cjs` pass.
- Sau 2–4 tuần (đo lại bằng GSC): cụm telex pos 70–87 → <40; `gõ 10 ngón tiếng việt` vào top 10; bắt đầu có clicks > hiện tại (~6/28d).

## 7. Next steps
1. Quick win GSC (re-submit sitemap + request index telex).
2. Chuyển `/ck:plan` lập kế hoạch chi tiết Phase 2 (file thay đổi: `src/pages/TelexGuide.tsx`, `src/pages/VniGuide.tsx`, `src/components/HomePage.tsx`, schema JSON-LD, `public/sitemap.xml`).
3. Deploy → Request Indexing → đo GSC sau 2–4 tuần → lặp.
4. (Để dành) SSG vite-react-ssg nếu cần đảm bảo crawl bot không-JS.

## 8. Unresolved questions
1. Có muốn thêm trang mới nhắm ngách (vd "luyện gõ 10 ngón cho học sinh", landing game Totoro) trong Phase 2 không, hay chỉ tối ưu 5 trang hiện có?
2. OG image 558KB (audit khuyến nghị nén <150KB) — gộp vào Phase 2 hay bỏ qua?
3. Có cần dịch vụ/CMS để mở rộng nội dung lâu dài, hay viết tay trong code là đủ?
