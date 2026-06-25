---
title: "SEO Phase 2 — Deep content & on-page for type.scala.vn"
description: ""
status: done
priority: P2
branch: "main"
tags: []
blockedBy: []
blocks: []
created: "2026-06-25T03:50:33.215Z"
createdBy: "ck:plan"
source: skill
---

# SEO Phase 2 — Deep content & on-page for type.scala.vn

## Overview

Phase 2 SEO cho type.scala.vn: đào sâu nội dung + tối ưu on-page để các trang đã index leo thứ hạng (hiện pos 15–85, clicks ~0). Bám dữ liệu GSC thật. **Không** đổi rendering (giữ CSR; SSG đã được hoãn — nút thắt index đã gỡ, 5/5 trang đã index).

Nguồn: `plans/reports/brainstorm-260625-1036-seo-phase2-content-strategy-report.md`.

**Mục tiêu đo được (sau 2–4 tuần, đo lại bằng GSC):**
- Cụm telex (`bảng gõ telex`, `cách gõ chữ telex`...) từ pos 70–87 → <40.
- `gõ 10 ngón tiếng việt` từ pos 15.5 → top 10.
- Bắt đầu có clicks > baseline (~6/28d).

**Scope quyết định (KISS/YAGNI):** tối ưu 5 trang hiện có, chưa thêm trang mới; viết content trong code (không CMS); nén OG image gộp vào Phase 3.

**Ràng buộc:** nội dung tự nhiên/hữu ích, tránh nhồi từ khóa; mọi JSON-LD phải pass `validate-schema.cjs`; nội dung quan trọng (bảng, FAQ) nằm trong DOM ban đầu (CSR còn giữ); `npm run build` (`tsc -b && vite build`) phải pass.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Telex Guide Deep Content](./phase-01-telex-guide-deep-content.md) | Done |
| 2 | [VNI Guide & Homepage Content](./phase-02-vni-guide-homepage-content.md) | Done |
| 3 | [Site-wide Schema Internal-Links & Assets](./phase-03-site-wide-schema-internal-links-assets.md) | Done |

Thứ tự: P1 (đòn bẩy lớn nhất) → P2 → P3. P3 phụ thuộc P1+P2 (internal link cần các section/anchor mới; sitemap lastmod cập nhật cuối).

## Dependencies

- Plugin/script có sẵn: `.claude/skills/seo/scripts/validate-schema.cjs`, `generate-schema.cjs`, `gsc-query.cjs`.
- Dữ liệu bảng có sẵn: `src/constants.ts` → `TELEX_RULES`, `VNI_RULES`.
- Không có cross-plan dependency (chỉ có templates + reports trong `plans/`).

## Post-deploy (ngoài code, làm tay)
- GSC → Request Indexing `/huong-dan-telex` (canonical lệch do bản crawl 22/05 cũ).
- Sau deploy mỗi phase: theo dõi GSC 2–4 tuần, lặp.
