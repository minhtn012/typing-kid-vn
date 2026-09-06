# Phase 02 — Sửa on-page kỹ thuật

**Trạng thái:** code đã sửa 06/09 11:25 trong working tree, CHƯA build/lint/test/commit.

## Đã sửa (đối chiếu `git diff`)
| File | Thay đổi |
|---|---|
| `index.html` | Xóa khối `<!-- FAQ Structured Data -->` + script FAQPage (cũ dòng 43–75). Giữ SoftwareApplication. |
| `src/components/home-faq.ts` (mới) | `export const HOME_FAQ` = đúng 3 câu hỏi cũ, comment giải thích vì sao tách. |
| `src/routes.tsx` | Import `JsonLd`, `HOME_FAQ`; route index thêm `<JsonLd data={HOME_FAQ} />` trước `<HomeView />`; title → "Luyện gõ 10 ngón tiếng Việt miễn phí cho trẻ em \| Typing Kid VN"; description → "Website luyện gõ 10 ngón tiếng Việt miễn phí cho trẻ em và người mới. Tập gõ 10 ngón nhanh, chính xác chuẩn Telex và VNI, có bài học và mini game." |
| `src/pages/{Telex,Vni,Posture,FjRidge}Guide.tsx` | `<img>`: thêm `width={1024} height={1024}`, style thêm `height: 'auto'`. Không lazy (quyết định 6). |
| `src/components/HomePage.tsx` | Nav thêm `<Link to="/bi-mat-phim-f-j">Phím F và J</Link>` cùng style 3 link cũ; đoạn mở thêm câu "Trẻ em và người mới có thể **tập gõ 10 ngón** từ hàng phím cơ sở, mỗi ngày 10 phút." |

## Bổ sung từ keyword-research.md (làm trước bước 1)
- `HomePage.tsx` đoạn mở (dòng ~77–81): câu đã thêm sửa thành "Trẻ em và người mới có thể **tập gõ 10 ngón** (tập đánh máy 10 ngón) ngay trên web, không cần cài đặt, mỗi ngày 10 phút từ hàng phím cơ sở." — đưa đồng nghĩa "đánh máy" và "không cần cài đặt" vào on-page.
- Tìm H2 trang chủ nói về bài học/kiểu gõ (`tilth "/<h2/" --scope src/components/HomePage.tsx`): nếu có H2 phù hợp, thêm "gõ có dấu Telex/VNI" vào 1 H2; nếu không có, không thêm H2 mới (giữ layout).
- Không đổi title/description đã chốt.

## Bước còn lại
1. `npm run lint && npm test` — pass (vitest là test typing-engine, chạy để chắc không hồi quy).
2. Chạy build.
3. Verify HTML xuất (script Python, chạy qua Bash):
   ```python
   import re,glob
   for f in sorted(glob.glob('dist/*.html')):
       s=open(f,encoding='utf-8').read()
       faq=len(re.findall(r'"@type":\s*"FAQPage"',s))
       imgs=re.findall(r'<img[^>]*>',s); nowh=[i for i in imgs if 'width=' not in i]
       t=re.search(r'<title>(.*?)</title>',s)
       print(f,'FAQPage=',faq,'img=',len(imgs),'no-wh=',len(nowh),'title=',t.group(1)[:70] if t else None)
   ```
   Kỳ vọng: `index.html` FAQPage=1, telex/vni FAQPage=1, posture/fj FAQPage=0, mọi trang no-wh=0, title index bắt đầu "Luyện gõ 10 ngón".
4. `grep -c "bi-mat-phim-f-j" dist/index.html` ≥ 2 (nav + list guide).
5. Mở dev server, xem `/` và `/huong-dan-telex` ở 375px và desktop: nav 4 link xuống dòng gọn, ảnh không giật layout. Tắt dev server sau khi xem (không để orphan).
6. Commit 01+02 (kèm `docs/scope-map.md`, thư mục plan):
   ```
   feat(seo): sitemap tự sinh lúc build, gỡ FAQPage lặp, title trang chủ theo query
   ```
7. Push, chờ Ready, verify live:
   ```bash
   curl -s https://type.scala.vn/huong-dan-telex | grep -o '"@type":"FAQPage"' | wc -l   # 1
   curl -s https://type.scala.vn/ | grep -o '<title>[^<]*'                                  # Luyện gõ 10 ngón...
   curl -s https://type.scala.vn/sitemap.xml | grep -c '<url>'                              # 5
   ```
8. Rich Results Test (tay, UI): `https://search.google.com/test/rich-results` cho `/huong-dan-telex` — 0 lỗi FAQ.

## Rủi ro
- Đổi title trang chủ có thể dao động hạng 1–2 tuần → không đổi thêm on-page trang chủ đến D+14.
