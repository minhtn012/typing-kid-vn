# Phase 03 — On-page Keyword Optimization

**Mục tiêu:** Vợt các keyword đang sát trang 1 và phủ đúng cụm long-tail đang xếp hạng yếu, dựa trực tiếp trên dữ liệu GSC.

**Phụ thuộc:** Phase 01 (nội dung phải được prerender thì tối ưu on-page mới phát huy).

## Dữ liệu GSC làm căn cứ

| Keyword | Vị trí | Impr | Hành động |
|---|---|---|---|
| `gõ 10 ngón tiếng việt` | 11.4 | 21 | Đẩy lên trang 1 → trang chủ |
| `gõ 10 ngón tay tiếng việt` | 7.3 | 3 | Đã trang 1 → tăng CTR |
| `luyện gõ 10 ngón tiếng việt telex` | 4.8 | 5 | Giữ + củng cố |
| `bảng chữ telex`, `bảng gõ telex`, `cách gõ telex`, `cách đánh bàn phím telex` | 45–87 | — | Bổ sung nội dung guide telex |
| `cách gõ vni`, `bảng dấu vni` | 1–59 | — | Bổ sung nội dung guide vni |

## Các bước

1. **Trang chủ — vợt "gõ 10 ngón tiếng việt"**
   - Đảm bảo `<h1>` và đoạn mở đầu chứa nguyên cụm "gõ 10 ngón tiếng Việt" (title hiện đã tốt).
   - Thêm đoạn mô tả giá trị + internal link tới các guide (telex/vni/tư thế).
   - Kiểm tra title ≤60 ký tự, description 120–160 (Seo.tsx đã nhắc chuẩn này).

2. **Tăng CTR (title/meta description)**
   - Viết lại meta description theo hướng lợi ích + con số cho trang chủ & 4 guide.
   - VD guide telex: *"Bảng Telex đầy đủ: cách gõ dấu sắc, huyền, hỏi, ngã, nặng và â/ê/ô/ơ/ư trong tiếng Việt. Có ví dụ & mẹo nhớ nhanh."*

3. **Bơm long-tail vào guide telex** (`src/pages/TelexGuide.tsx`)
   - Bảng tra cứu đầy đủ quy tắc telex (aa→â, dd→đ, s/f/r/x/j cho dấu...).
   - Heading phụ chứa cụm search thật: "Bảng chữ Telex", "Cách gõ chữ Telex", "Cách đánh bàn phím Telex".
   - Ví dụ cụ thể + phần FAQ ngắn.

4. **Bơm long-tail vào guide vni** (`src/pages/VniGuide.tsx`)
   - Tương tự: "Bảng dấu VNI", "Cách gõ VNI" (1–9 cho dấu & ký tự đặc biệt), ví dụ.

5. **Internal linking**
   - Trang chủ ↔ 4 guide; guide ↔ guide liên quan (đã có `RelatedGuides.tsx` — tận dụng/mở rộng).
   - Anchor text chứa keyword mục tiêu.

6. **Schema/JSON-LD** (đã có `JsonLd.tsx`, `guide-schema.ts`)
   - Kiểm tra guide dùng schema `HowTo`/`FAQPage` phù hợp → tăng cơ hội rich result.

## Validation

- `view-source` (sau prerender) trang chủ chứa cụm "gõ 10 ngón tiếng Việt" trong `<h1>`.
- Guide telex/vni chứa các heading long-tail mục tiêu.
- Rich Results Test pass cho schema guide.
- Theo dõi GSC sau 2–4 tuần: vị trí "gõ 10 ngón tiếng việt" < 10.

## Files

- Sửa: `src/components/HomePage.tsx`, `src/pages/TelexGuide.tsx`, `src/pages/VniGuide.tsx`
- Sửa (meta): các lời gọi `<Seo>` trong `App.tsx`/route tương ứng
- Kiểm tra: `src/components/RelatedGuides.tsx`, `JsonLd.tsx`, `guide-schema.ts`
