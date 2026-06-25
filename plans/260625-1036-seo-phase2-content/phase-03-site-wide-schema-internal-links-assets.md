---
phase: 3
title: "Site-wide Schema Internal-Links & Assets"
status: done
priority: P2
dependencies: [1, 2]
effort: "S"
---

# Phase 3: Site-wide Schema, Internal-Links & Assets

## Overview
Hoàn thiện on-page toàn site: schema chung (breadcrumb + Article cho 4 guide), internal linking chặt giữa các guide (hiện chỉ link về homepage), cập nhật sitemap `lastmod`, và nén OG image. Chạy sau khi nội dung P1/P2 ổn định.

## Requirements
- **Functional:** Thêm BreadcrumbList + Article JSON-LD cho 4 guide (telex/vni/posture/fj); thêm khối "Hướng dẫn liên quan" internal-link giữa các guide; cập nhật `public/sitemap.xml` lastmod; nén `public/og-image.png` 558KB → <150KB.
- **Non-functional:** Tái dùng `JsonLd.tsx`; schema validate pass; build pass; OG image giữ kích thước hiển thị (1200×630) + chất lượng chấp nhận được.

## Architecture
- **Schema:** dùng `JsonLd.tsx`. Breadcrumb: Home → tên guide. Article (hoặc HowTo cho telex/vni): headline, description, datePublished/dateModified, author "Kamy Tech" (khớp `index.html`). Có thể dùng `.claude/skills/seo/scripts/generate-schema.cjs` để sinh mẫu.
- **Internal linking:** thêm component nhỏ `RelatedGuides` (hoặc khối inline) liệt kê 3 guide còn lại ở cuối mỗi guide, trước CTA. DRY: 1 component nhận `currentPath`, lọc từ danh sách guide.
- **Sitemap:** sửa `lastmod` các URL đã đổi nội dung về ngày deploy. Cân nhắc thêm script tự sinh (`generate-sitemap.cjs` có sẵn) — nhưng KISS: sửa tay 5 dòng là đủ.
- **OG image:** nén bằng công cụ ngoài (squoosh/sharp/pngquant). Không thêm dependency vào project nếu không cần — nén offline rồi thay file.

## Related Code Files
- Create: `src/components/RelatedGuides.tsx` (internal-link block dùng chung)
- Modify: `src/pages/TelexGuide.tsx`, `src/pages/VniGuide.tsx`, `src/pages/PostureGuide.tsx`, `src/pages/FjRidgeGuide.tsx` (thêm breadcrumb/Article JSON-LD + `<RelatedGuides>`)
- Modify: `public/sitemap.xml` (lastmod)
- Replace: `public/og-image.png` (bản nén)
- Reuse: `src/components/JsonLd.tsx`

## Implementation Steps
1. Tạo `RelatedGuides.tsx`: mảng 4 guide {path, title}; render 3 cái ≠ `currentPath`.
2. Thêm `<RelatedGuides currentPath="...">` vào cuối 4 guide (trước CTA).
3. Tạo helper/inline breadcrumb + Article schema cho từng guide; render qua `<JsonLd>`.
4. Validate toàn bộ JSON-LD: `node .claude/skills/seo/scripts/validate-schema.cjs` (FAQ từ P1/P2 + breadcrumb/Article mới).
5. Cập nhật `public/sitemap.xml` lastmod = ngày deploy cho các URL đã đổi.
6. Nén `og-image.png` <150KB (giữ 1200×630), thay file trong `public/`.
7. `npm run build` + `vite preview`, View Source xác nhận schema + internal links có trong DOM.

## Success Criteria
- [ ] `npm run build` pass.
- [ ] 4 guide có BreadcrumbList + Article JSON-LD; validate-schema pass toàn bộ.
- [ ] Mỗi guide có khối "Hướng dẫn liên quan" link tới 3 guide còn lại (internal link 2 chiều giữa các guide).
- [ ] `og-image.png` < 150KB, hiển thị OK khi share (test bằng FB/Zalo debugger sau deploy).
- [ ] `sitemap.xml` lastmod cập nhật.

## Risk Assessment
- **Schema sai/thừa gây lỗi rich result:** chỉ khai field bắt buộc + validate trước deploy. Tránh lặp lại sai lầm `aggregateRating` giả (đã gỡ ở audit) — KHÔNG thêm rating/review bịa.
- **Internal link tạo vòng trùng anchor:** giữ block đơn giản, mỗi guide trỏ 3 guide còn lại.
- **Nén OG quá tay vỡ ảnh:** kiểm tra mắt thường + dung lượng; dùng WebP nếu cần nhưng giữ `.png` fallback path trong meta (hiện meta trỏ `/og-image.png`).

## Post-deploy (làm tay, ngoài code)
- GSC Request Indexing `/huong-dan-telex` + các trang đã đổi nội dung lớn.
- Theo dõi GSC 2–4 tuần: vị trí cụm telex/10-ngón, clicks, impressions. Lặp nếu cần.
