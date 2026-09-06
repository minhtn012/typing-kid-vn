# Phase 01 — Kích index + sitemap tự động

**Trạng thái:** code đã sửa 06/09 11:25 trong working tree, CHƯA build/verify/commit.

## Đã sửa (kiểm tra bằng `git status`, `git diff`)
- Tạo `scripts/gen-sitemap.mjs`: bảng `ROUTES` path → file nguồn; lastmod = max `git log -1 --format=%cs -- <file>`; fallback ngày build nếu git rỗng (Vercel shallow clone); ghi `dist/sitemap.xml`.
- `package.json`: thêm `"postbuild": "node scripts/gen-sitemap.mjs"` ngay sau `build`.
- `git rm public/sitemap.xml` (đã staged).

## Bước còn lại
1. Chạy build → log có dòng `[gen-sitemap] dist/sitemap.xml: 5 URL`.
2. Kiểm tra:
   ```bash
   cat dist/sitemap.xml            # 5 <url>, lastmod guide ≥ 2026-08-13
   xmllint --noout dist/sitemap.xml
   ```
   Lastmod lấy từ commit → file đang sửa chưa commit vẫn hiện ngày commit cũ. Đúng thiết kế.
3. Commit chung với phase 02 (phase 02 bước 6), push, chờ Vercel Ready: `vercel ls typing-kid-vn | head -4`.
4. `curl -s https://type.scala.vn/sitemap.xml` — lastmod phải khác 2026-06-25. Nếu mọi lastmod = ngày build → Vercel không có git history; chấp nhận, ghi vào Ghi chú plan.md.
5. Submit lại sitemap qua API:
   ```bash
   SP=/private/tmp/claude-502/-Users-minhtn-Projects-typing-kid/6aab6f92-37b4-4721-9b92-a2f293e138d7/scratchpad
   export NODE_PATH="$SP/gsc-deps/node_$(echo modules)"   # hook chặn chuỗi literal node_modules
   node .opencode/skills/seo/scripts/gsc-query.cjs --submit-sitemap -s https://type.scala.vn/ -u https://type.scala.vn/sitemap.xml
   node .opencode/skills/seo/scripts/gsc-query.cjs --sitemaps -s https://type.scala.vn/    # errors 0
   ```
   Nếu scratchpad không còn `gsc-deps`: `mkdir -p "$SP/gsc-deps" && (cd "$SP/gsc-deps" && npm init -y >/dev/null && npm i googleapis)`. Credentials ở `.claude/secrets/` (gitignored, không commit).
6. **User làm tay (GSC UI):** URL Inspection → Request Indexing cho 5 URL. API không có quyền.
7. D+3…D+7: `--inspect -s https://type.scala.vn/ -u https://type.scala.vn/<path>` từng URL, ghi `lastCrawlTime` vào bảng phase 05.

## Validation
- Build pass; `dist/sitemap.xml` hợp lệ; live sitemap có lastmod mới; GSC `--sitemaps` errors 0.

## Rollback
- `git checkout HEAD -- public/sitemap.xml package.json && rm scripts/gen-sitemap.mjs`.
