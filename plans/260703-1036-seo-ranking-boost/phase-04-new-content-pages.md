# Phase 04 — New Content Pages (tùy chọn, làm sau)

**Mục tiêu:** Mở rộng độ phủ từ khóa bằng trang nội dung mới. Site hiện chỉ ~5 trang → nhiều intent chưa có cửa vào.

**Phụ thuộc:** Phase 01 (prerender) + Phase 03 (đã tối ưu trang hiện có trước khi thêm mới).

> Đây là phase mở rộng. Chỉ làm khi phase 01–03 đã ổn định và có ngân sách thời gian (xem câu hỏi mở trong `plan.md`).

## Ý tưởng trang mới (theo intent GSC + logic sản phẩm)

| Route đề xuất | Intent / keyword nhắm |
|---|---|
| `/luyen-go-nhanh` | "luyện gõ nhanh", "gõ nhanh", "go chu nhanh" |
| `/bai-tap-go-10-ngon-cho-tre-em` | trẻ em học gõ (khớp định vị "Typing Kid") |
| `/go-tieng-viet-co-dau-khong-dau` | so sánh gõ có dấu/không dấu |
| `/telex-vs-vni` | so sánh 2 kiểu gõ (intent so sánh, dễ rank) |

## Nguyên tắc

- Mỗi trang = 1 intent rõ, nội dung thực chất (không mỏng/nhồi keyword).
- Tái dùng layout guide sẵn có + `<Seo>` + JSON-LD.
- Thêm route vào cấu hình prerender (phase 01) để trang mới cũng ra HTML thật.
- Internal link chéo với các guide hiện có.

## Các bước

1. Chốt danh sách trang (2–4 trang cho đợt đầu — YAGNI, không làm hết một lúc).
2. Viết nội dung (có thể dùng skill `write`/`copywriting` + review bằng `content-reviewer`).
3. Tạo component trang trong `src/pages/`, thêm route + prerender entry.
4. Cập nhật sitemap (nếu có) & internal links.

## Validation

- Trang mới prerender ra HTML thật, có meta riêng, canonical đúng.
- Submit sitemap qua GSC: `node .claude/skills/seo/scripts/gsc-query.cjs --submit-sitemap -u <URL> -s "https://type.scala.vn/"`.
- Inspect index từng URL mới sau vài ngày.

## Files

- Tạo: `src/pages/<TrangMoi>.tsx` cho mỗi trang
- Sửa: `src/routes.tsx` (hoặc `App.tsx`), cấu hình prerender, sitemap
