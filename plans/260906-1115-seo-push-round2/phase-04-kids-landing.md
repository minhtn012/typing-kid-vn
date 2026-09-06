# Phase 04 — Landing phụ huynh `/tap-go-10-ngon-cho-be`

**Mục tiêu:** trang trả lời trực tiếp phụ huynh tìm cách cho con tập gõ 10 ngón; bắt cụm "tập gõ 10 ngón" (57 impr pos 64), "tập gõ 10 ngón tiếng việt" (21 impr pos 13), biến thể "cho bé", "dạy bé". Thread VOZ "Tập gõ 10 ngón tiếng Việt cho bé" đang xếp trên site cho cụm này.

**Không nhắm:** "luyện gõ 10 ngón tiếng việt cho trẻ em" (trang chủ đã pos 3.2). Không dùng cụm đó trong title/h1 trang này.

## Bối cảnh code
- Bài học: `LESSON_MODES` trong `src/constants.ts` (đọc bằng `tilth LESSON_MODES --scope src/constants.ts`) → lấy đúng tên/id bài để nhắc trong lộ trình và tạo link `/?mode=<id>` (HomeView đọc `?mode=` để mở thẳng bài, `HomeView.tsx:33-41`). Game id `totoro_chase` → link `/?mode=totoro_chase`.
- Mobile: mở `/?mode=` trên ≤768px sẽ hiện `DesktopNudge` (đúng ý: bảo phụ huynh mở máy tính).
- Layout, `<Seo>`, `buildGuideSchemas`, `RelatedGuides` như guide. FAQ pattern: mảng `faqs` dùng cho cả hiển thị lẫn `faqSchema` (`TelexGuide.tsx:52-83`) — copy pattern, text hiển thị phải trùng schema.

## Meta
- `<Seo title="Tập gõ 10 ngón cho bé: lộ trình 4 tuần tại nhà | Typing Kid VN" description="Cách cho bé tập gõ 10 ngón tiếng Việt tại nhà: mấy tuổi bắt đầu, mỗi ngày 10 phút, lộ trình 4 tuần từ hàng phím cơ sở đến gõ dấu Telex/VNI, kèm bài tập miễn phí." path="/tap-go-10-ngon-cho-be" />` (title 59 ký tự, description 152).
- `buildGuideSchemas({ path: '/tap-go-10-ngon-cho-be', breadcrumbName: 'Tập gõ cho bé', headline: 'Tập gõ 10 ngón cho bé: lộ trình 4 tuần tại nhà', description: <như Seo>, datePublished: '2026-09-08', dateModified: '2026-09-08' })` + FAQPage từ `faqs`.

## Nội dung (900–1 200 từ, giọng nói chuyện với phụ huynh, không nhồi keyword)

H1: **Tập gõ 10 ngón cho bé: lộ trình 4 tuần tại nhà**

Đoạn mở (60–80 từ): bé 7–8 tuổi trở lên đã có thể tập gõ 10 ngón; điều quan trọng không phải phần mềm mà là 10 phút mỗi ngày và đặt tay đúng từ đầu. Trang này là lộ trình 4 tuần dùng bài tập miễn phí trên Typing Kid VN (desktop).

H2 **1. Mấy tuổi thì bắt đầu được?** (100–120 từ) — 7–8 tuổi, tức học sinh tiểu học lớp 2–3 (bàn tay đủ rộng che 4 phím, đã đọc tốt); lớp 1 và dưới 7 tuổi chỉ chơi game làm quen bàn phím; 10+ học nhanh như người lớn. Dấu hiệu sẵn sàng: ngồi yên 10 phút, đọc được câu ngắn. Dùng cả hai cách gọi "tập gõ 10 ngón" và "tập đánh máy" trong mục này (từ khóa suggest: `tập đánh máy cho bé lớp 1`, `học sinh tiểu học`).

H2 **2. Chuẩn bị: bàn phím, tư thế, quy tắc 10 phút** (120–150 từ) — bàn phím rời cỡ chuẩn (không laptop 13" nếu được), ghế đúng chiều cao, mắt cách màn hình 50–70 cm; link `<Link to="/tu-the-go-phim">tư thế ngồi và cách đặt tay</Link>`; link `<Link to="/bi-mat-phim-f-j">gờ nổi phím F và J</Link>` để bé tự tìm vị trí tay. Quy tắc: 10 phút/ngày, 5–6 ngày/tuần, dừng khi bé mỏi; không ép tốc độ, chỉ tính đúng.

H2 **3. Lộ trình 4 tuần** — bảng 4 dòng (Tuần · Mục tiêu · Bài trên Typing Kid VN · Dấu hiệu đạt):
| Tuần | Mục tiêu | Bài | Đạt khi |
|---|---|---|---|
| 1 | Hàng phím cơ sở ASDF JKL; không nhìn tay | bài hàng cơ sở (lấy tên từ `LESSON_MODES`) | gõ đúng ≥90 % không nhìn |
| 2 | Thêm hàng trên QWERTY | bài hàng trên | 10 từ/phút, đúng ≥90 % |
| 3 | Hàng dưới + phím cách, chữ hoa | bài hàng dưới | gõ câu ngắn không dấu |
| 4 | Dấu tiếng Việt: chọn Telex hoặc VNI | bài có dấu | gõ được tên bé, tên trường có dấu |
Mỗi link bài dùng `/?mode=<id>`. Dưới bảng 1 đoạn 60–80 từ: tuần 4 chọn kiểu gõ — trẻ nhỏ nên Telex (không rời hàng phím), link `<Link to="/huong-dan-telex">`, in `<Link to="/bang-go-telex">bảng gõ Telex</Link>` dán cạnh máy; nếu nhà quen VNI thì `<Link to="/huong-dan-vni">` + `<Link to="/bang-go-vni">`.

H2 **4. Giữ bé không chán** (100–120 từ) — mini game đuổi bắt (link `/?mode=totoro_chase`), đổi bài mỗi 3 phút, khen số lần đúng thay vì tốc độ, dán bảng gõ in sẵn, cho bé tự chấm bằng thống kê cuối bài.

H2 **5. Lỗi hay gặp và cách sửa** (120–150 từ) — nhìn bàn phím (che tay bằng khăn mỏng), dùng 2 ngón trỏ (quay lại tuần 1), gõ dấu sai vị trí (nhắc gõ dấu cuối từ cũng được), ngồi cong lưng (nghỉ, xem lại tư thế).

H2 **Câu hỏi thường gặp** — `faqs` 4 mục, text dùng nguyên văn:
1. q: "Bé mấy tuổi có thể tập gõ 10 ngón?" · a: "Từ 7–8 tuổi, khi bàn tay bé đủ rộng để đặt 4 ngón lên 4 phím liền nhau và bé đã đọc tốt. Dưới 7 tuổi chỉ nên chơi game làm quen bàn phím, chưa cần đúng ngón."
2. q: "Mỗi ngày bé nên tập gõ bao lâu?" · a: "10 phút mỗi ngày, 5–6 ngày một tuần là đủ. Tập ngắn nhưng đều tốt hơn tập dài rồi bỏ. Dừng ngay khi bé mỏi tay hoặc mất tập trung."
3. q: "Tập gõ 10 ngón mất bao lâu?" · a: "Theo lộ trình 4 tuần, bé gõ được câu tiếng Việt có dấu mà không nhìn bàn phím. Tốc độ 20–25 từ/phút thường đến sau 2–3 tháng tập đều."
4. q: "Có cần mua phần mềm tập gõ cho bé không?" · a: "Không. Typing Kid VN miễn phí, chạy trên trình duyệt máy tính, có bài theo từng hàng phím, bài gõ dấu Telex/VNI và mini game. Chỉ cần bàn phím rời và 10 phút mỗi ngày."

CTA cuối trang (trước RelatedGuides): khối nổi bật "Bắt đầu tuần 1 ngay" → `<Link to="/?mode=<id hàng cơ sở>">` + dòng nhỏ "Mở trên máy tính có bàn phím rời".

Không được copy câu nào từ trang chủ, guide, hay thread VOZ. Kiểm tra bằng cách grep 2–3 cụm 8 từ ngẫu nhiên của trang mới trong `src/` → chỉ khớp chính nó.

## Bước
1. Đọc `LESSON_MODES` để lấy id/tên bài; ghi vào bảng tuần.
2. Viết `src/pages/KidsRoadmap.tsx` theo spec (pattern y hệt `FjRidgeGuide.tsx`, thêm `faqs` + `faqSchema` như `TelexGuide.tsx`).
3. `src/routes.tsx`: `{ path: 'tap-go-10-ngon-cho-be', element: <KidsRoadmap /> }`.
4. `scripts/gen-sitemap.mjs`: `{ path: '/tap-go-10-ngon-cho-be', files: ['src/pages/KidsRoadmap.tsx'] }`.
5. `RelatedGuides.tsx` `GUIDES`: `{ path: '/tap-go-10-ngon-cho-be', title: 'Tập gõ 10 ngón cho bé', desc: 'Lộ trình 4 tuần tại nhà, 10 phút mỗi ngày.' }` (7 item).
6. `HomePage.tsx` nav: thêm link "Tập gõ cho bé" → `/tap-go-10-ngon-cho-be` (5 link; kiểm tra xuống dòng ở 375px).
7. Lint, test, build. Verify `dist/tap-go-10-ngon-cho-be.html`: h1=1, FAQPage=1, BreadcrumbList=1, Article=1, title/canonical đúng; `dist/sitemap.xml` 8 URL.
8. Commit `feat(seo): trang lộ trình tập gõ 10 ngón cho bé`, push, curl live.
9. **User tay:** GSC Request Indexing; cập nhật post đầu thread VOZ (phase 05).
10. `docs/scope-map.md` dòng `guides`: "7 trang nội dung, thêm `/bang-go-telex`, `/bang-go-vni`, `/tap-go-10-ngon-cho-be` (09/2026); dữ liệu bảng dùng chung `src/pages/typing-table-data.ts`".

## Files
- Tạo: `src/pages/KidsRoadmap.tsx`
- Sửa: `src/routes.tsx`, `src/components/RelatedGuides.tsx`, `src/components/HomePage.tsx`, `scripts/gen-sitemap.mjs`, `docs/scope-map.md`

## Validation
- HTML SSG có h1, đúng 1 FAQPage, title ≤ 60, description 120–155.
- D+14: URL có impression cho query chứa "tập gõ" hoặc "cho bé" (phase 05).
