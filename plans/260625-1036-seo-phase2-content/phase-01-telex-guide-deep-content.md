---
phase: 1
title: "Telex Guide Deep Content"
status: done
priority: P1
dependencies: []
effort: "M"
---

# Phase 1: Telex Guide Deep Content

## Overview
Đào sâu `/huong-dan-telex` (hiện pos 76, nội dung mỏng) thành trang Telex toàn diện, bám đúng cụm query GSC đang rank yếu (pos 70–87). Đây là đòn bẩy SEO lớn nhất của Phase 2.

## Requirements
- **Functional:** Thêm 4 khối nội dung mới vào `src/pages/TelexGuide.tsx`: (1) bảng gõ Telex đầy đủ render từ `TELEX_RULES`, (2) cách gõ trên điện thoại, (3) lỗi thường gặp & cách sửa, (4) FAQ + FAQPage JSON-LD riêng trang.
- **Non-functional:** Nội dung tự nhiên (không nhồi từ khóa); bảng + FAQ nằm trong DOM ban đầu (CSR); FAQPage JSON-LD pass `validate-schema.cjs`; `npm run build` pass; giữ nguyên style/UX hiện tại (dark, glass).

### Từ khóa mục tiêu (GSC, 28d)
| Query | Pos | Impr | Khối nhắm |
|-------|-----|------|-----------|
| `bảng gõ telex` | 85.8 | 8 | Bảng đầy đủ |
| `bảng chữ telex` / `bảng chữ cái telex` | 72–81 | 1+1 | Bảng đầy đủ |
| `cách gõ chữ telex` / `cách đánh telex` | 71–74 | 1+2 | Header + lỗi thường gặp |
| `kiểu gõ chữ telex` | 81 | 2 | So sánh Telex/VNI |
| `cách gõ bàn phím telex` | 69 | 1 | Cách gõ trên điện thoại/PC |

## Architecture
- Trang vẫn là component React render section tĩnh; thêm section vào `<article>` hiện có (giữ cấu trúc `<section><h2>...`).
- **Bảng đầy đủ:** import `TELEX_RULES` từ `../constants`. Dữ liệu là `Record<string, string[]>` (ký tự có dấu → chuỗi phím). Nhóm theo nguyên âm gốc (a, ă, â, e, ê, i, o, ô, ơ, u, ư, y) × 5 thanh (sắc/huyền/hỏi/ngã/nặng) để render bảng tra cứu. Derive bằng helper thuần trong file (không sửa `constants.ts`).
- **FAQPage JSON-LD:** render `<script type="application/ld+json">` ngay trong component — React 19 tự hoist lên `<head>` (cùng cơ chế `Seo.tsx`). Tạo component dùng lại `src/components/JsonLd.tsx` (nhận object, `JSON.stringify`) để Phase 3 tái dùng cho breadcrumb/Article.
- FAQ nội dung: câu hỏi bám intent thật (vd "Bảng gõ dấu Telex đầy đủ?", "Cách gõ chữ â/ê/ơ/ư?", "Telex khác VNI thế nào?", "Vì sao gõ 'oo' ra ô ngoài ý muốn?").

## Related Code Files
- Modify: `src/pages/TelexGuide.tsx` (thêm 4 section + import TELEX_RULES + JsonLd)
- Create: `src/components/JsonLd.tsx` (component JSON-LD dùng chung, ~15 dòng)
- Read-only: `src/constants.ts` (`TELEX_RULES`), `src/components/Seo.tsx` (tham chiếu cơ chế hoisting)

## Implementation Steps
1. Tạo `src/components/JsonLd.tsx`: nhận prop `data: object`, render `<script type="application/ld+json">{JSON.stringify(data)}</script>`. Comment giải thích React 19 hoist script lên head.
2. Trong `TelexGuide.tsx`, import `TELEX_RULES` + viết helper `buildTelexTable()` gom ký tự theo nguyên âm gốc × thanh (thuần, có comment).
3. Thêm section "Bảng gõ Telex đầy đủ" (sau section 1 hiện tại): bảng nguyên âm × 5 thanh + dòng chữ đặc biệt (â/ê/ô/ơ/ư/ă/đ). Caption + H2 chứa "bảng gõ Telex".
4. Thêm section "Cách gõ Telex trên điện thoại" (Gboard/Laban Key): hướng dẫn bật bộ gõ, lưu ý.
5. Thêm section "Lỗi thường gặp & cách sửa" (vd gõ "oo"/"aa" ngoài ý muốn → gõ phím khử/escape; gõ từ có 2 nguyên âm).
6. Thêm section "Telex và VNI khác nhau thế nào?" — đoạn ngắn + `<Link to="/huong-dan-vni">` (mở internal link, hoàn thiện ở Phase 3).
7. Thêm FAQ section (hiển thị accordion hoặc list) + `<JsonLd data={faqSchema} />` với 4–6 Q&A khớp nội dung hiển thị (text trong schema phải trùng text hiển thị).
8. Export `faqSchema` data inline; chạy validate (xem Success Criteria).

## Success Criteria
- [ ] `npm run build` pass (không lỗi TS).
- [ ] Trang Telex có: bảng đầy đủ (≥12 nguyên âm × 5 thanh), section điện thoại, section lỗi, FAQ ≥4 Q&A.
- [ ] FAQPage JSON-LD validate pass: `node .claude/skills/seo/scripts/validate-schema.cjs` trên output trang (hoặc trích JSON-LD kiểm tra cú pháp + đúng `@type: FAQPage`).
- [ ] Text trong FAQ JSON-LD trùng khớp text hiển thị (chính sách Google).
- [ ] Bảng + FAQ có trong DOM khi render (kiểm `curl` sau build/preview hoặc View Source của `vite preview`).
- [ ] Không nhồi từ khóa: đọc tự nhiên.

## Risk Assessment
- **JSON-LD không hoist (CSR):** React 19 hoist `<script>` — xác nhận bằng View Source ở `vite preview`. Nếu không hoist, fallback nhúng FAQPage tĩnh trong `index.html` là không khả thi (per-page) → giữ trong component và dựa vào Google render JS (đã chứng minh index được).
- **FAQ text lệch hiển thị vs schema:** giữ 1 nguồn dữ liệu (map FAQ array → cả UI lẫn schema) để tránh lệch.
- **Bảng quá lớn/rối trên mobile:** dùng layout responsive, scroll-x cho table.
