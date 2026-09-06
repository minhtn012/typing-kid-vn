# Task: Landing phụ huynh `/tap-go-10-ngon-cho-be`

## Outcome

Site có thêm 1 trang nội dung dài `/tap-go-10-ngon-cho-be`: lộ trình 4 tuần dạy trẻ tập gõ 10 ngón tại nhà, viết cho **phụ huynh** đọc trên điện thoại. Trang có HTML tĩnh (SSG) với title/description/canonical riêng, JSON-LD Breadcrumb + Article + FAQPage, link thẳng vào từng bài tập của app qua `/?mode=<id>`, và có trong `dist/sitemap.xml` (tổng 8 URL).

## Bối cảnh

Phase 04 của plan `plans/260906-1115-seo-push-round2/plan.md`. Chi tiết ý đồ ở `plans/260906-1115-seo-push-round2/phase-04-kids-landing.md`; spec này là bản thi hành, lệch nhau thì **spec này thắng**.

Mục tiêu SEO: bắt cụm **"tập gõ 10 ngón"** (57 lượt hiển thị/90 ngày, site đang hạng 64) và các biến thể "cho bé", "dạy bé", "tập đánh máy cho bé". Một thread diễn đàn VOZ đang xếp trên site cho cụm này — trang phải trả lời trực tiếp và đầy đủ hơn.

**Không nhắm** cụm "luyện gõ 10 ngón tiếng việt cho trẻ em": trang chủ đã đứng hạng 3.2 cho cụm đó, tự cạnh tranh là lỗ. **Không** dùng nguyên cụm này trong title hay H1 của trang mới.

Người đọc là phụ huynh không rành máy tính. Giọng văn nói chuyện, câu ngắn, không thuật ngữ, **không nhồi từ khóa**. Trang này là nội dung dài (900–1 200 từ văn), khác hẳn 2 trang bảng tra cứu của task trước.

Stack: Vite + React 19 + react-router v6, prerender tĩnh bằng `vite-react-ssg`. Style **inline** (`style={{...}}`) như mọi trang hiện có, không Tailwind, không CSS module.

**Task này chạy SAU task `task-1-lookup-tables.md`** — khi bắt đầu, repo đã có `src/pages/TelexTable.tsx`, `src/pages/VniTable.tsx`, `src/pages/typing-table-data.ts` và 6 item trong `GUIDES`. Đọc `TelexTable.tsx` để thấy tiền lệ mới nhất cho một trang nội dung.

## Files được phép sửa

Tạo mới:
- `src/pages/KidsRoadmap.tsx`

Sửa:
- `src/routes.tsx`
- `src/components/RelatedGuides.tsx`
- `src/components/HomePage.tsx` (**chỉ** khối `<nav>` đầu trang — thêm 1 `<Link>`)
- `scripts/gen-sitemap.mjs`
- `docs/ui-map.md` (route đổi; script dispatch tự sinh lại — đừng sửa tay phần giữa 2 marker `ui-map:generated`)

**KHÔNG sửa**:
- `src/constants.ts`, `src/utils/`, `src/hooks/`, `src/components/HomeView.tsx`, `src/components/DesktopNudge.tsx`, `src/components/PracticeSession.tsx`, `src/components/GameSession.tsx`
- `src/components/Seo.tsx`, `src/components/JsonLd.tsx`, `src/components/guide-schema.ts`, `src/pages/typing-table-data.ts`
- 4 trang guide và 2 trang bảng đã có (`TelexGuide`, `VniGuide`, `PostureGuide`, `FjRidgeGuide`, `TelexTable`, `VniTable`)
- `src/index.css`, `index.html`, `package.json`, `vercel.json`, mọi file trong `plans/`
- Ngoài khối `<nav>`, **không** đụng phần nào khác của `HomePage.tsx` (title, H1, đoạn mô tả, H2 đã chốt ở phase trước).

## Files chỉ đọc (tham chiếu)

- `src/pages/TelexGuide.tsx`
  - dòng 52–83: pattern `faqs` (mảng `{q, a}`) + `faqSchema` sinh từ nó — **1 nguồn cho cả hiển thị lẫn JSON-LD**, text phải trùng nhau từng chữ (yêu cầu của Google cho rich result FAQ)
  - dòng 86–93: `buildGuideSchemas({...})`
  - dòng 98–130: khung layout trang (`motion.div` có `width: '100%'`, `maxWidth: '800px'`, `margin: '0 auto'`, `padding: '60px 20px'`; `<Seo>`; các `<JsonLd>`; link "Quay lại trang chủ" với `ChevronLeft`; `<header>` h1 + p + `<img>`)
- `src/pages/TelexTable.tsx` — trang mới nhất, dùng làm tiền lệ về cách import và bố cục
- `src/pages/FjRidgeGuide.tsx` — trang ngắn, cấu trúc đơn giản nhất
- `src/components/Seo.tsx` — props `{ title, description, path }`
- `src/components/guide-schema.ts` — `buildGuideSchemas(meta)` trả **mảng** [BreadcrumbList, Article]
- `src/components/RelatedGuides.tsx` — mảng `GUIDES`, nguồn chung cho khối "Hướng dẫn liên quan" và cho `DesktopNudge.tsx:80`
- `src/components/HomeView.tsx` dòng 31–42: đọc `?mode=<id>` (hoặc `?open=`) sau khi mount, nếu id có trong `LESSON_MODES` thì mở thẳng bài đó. Trên màn ≤768px sẽ hiện `DesktopNudge` bảo mở trên máy tính — **đúng ý**, không cần xử lý gì thêm.
- `src/constants.ts` dòng 183+: `LESSON_MODES`. Các id và tên dùng trong trang này (coordinator đã đọc và xác nhận, dùng đúng chuỗi sau):

  | id | Tên hiển thị |
  |---|---|
  | `basic_home` | Cơ bản: Hàng phím cơ sở |
  | `basic_top` | Cơ bản: Hàng phím trên |
  | `basic_bottom` | Cơ bản: Hàng phím dưới |
  | `vietnamese_telex` | Luyện dấu Telex |
  | `vietnamese_vni` | Luyện dấu VNI |
  | `totoro_chase` | Game: Mie đuổi bắt |

## Yêu cầu

### 1. `src/pages/KidsRoadmap.tsx`

Khung trang theo `TelexGuide.tsx:98-130`. **Không** có `<img>` (chưa có ảnh cho trang này — đừng trỏ tới file không tồn tại).

Meta — dùng **nguyên văn**:

```tsx
<Seo
    title="Tập gõ 10 ngón cho bé: lộ trình 4 tuần tại nhà | Typing Kid VN"
    description="Cách cho bé tập gõ 10 ngón tiếng Việt tại nhà: mấy tuổi bắt đầu, mỗi ngày 10 phút, lộ trình 4 tuần từ hàng phím cơ sở đến gõ dấu Telex/VNI, kèm bài tập miễn phí."
    path="/tap-go-10-ngon-cho-be"
/>
```

```tsx
const pageSchemas = buildGuideSchemas({
    path: '/tap-go-10-ngon-cho-be',
    breadcrumbName: 'Tập gõ cho bé',
    headline: 'Tập gõ 10 ngón cho bé: lộ trình 4 tuần tại nhà',
    description: 'Cách cho bé tập gõ 10 ngón tiếng Việt tại nhà: mấy tuổi bắt đầu, mỗi ngày 10 phút, lộ trình 4 tuần từ hàng phím cơ sở đến gõ dấu Telex/VNI, kèm bài tập miễn phí.',
    datePublished: '2026-09-08',
    dateModified: '2026-09-08',
});
```

Render mỗi phần tử của mảng thành một `<JsonLd>`, cộng thêm 1 `<JsonLd data={faqSchema} />` sinh từ mảng `faqs` (pattern `TelexGuide.tsx:75-83`).

**H1** (đúng một `<h1>` trên trang): `Tập gõ 10 ngón cho bé: lộ trình 4 tuần tại nhà`

**Đoạn mở** 60–80 từ, ngay dưới H1: bé từ 7–8 tuổi đã tập được; thứ quyết định không phải phần mềm mà là 10 phút mỗi ngày và đặt tay đúng ngay từ đầu; trang này là lộ trình 4 tuần dùng bài tập miễn phí trên Typing Kid VN (chạy trên máy tính).

Thân bài — 5 `<section>`, mỗi section một `<h2>` đúng chữ sau:

**H2 `1. Mấy tuổi thì bắt đầu được?`** (100–120 từ)
7–8 tuổi, tức lớp 2–3, khi bàn tay bé đủ rộng đặt 4 ngón lên 4 phím liền nhau và bé đã đọc tốt. Lớp 1 và dưới 7 tuổi chỉ nên chơi game làm quen bàn phím. Từ 10 tuổi học nhanh gần như người lớn. Dấu hiệu sẵn sàng: ngồi yên được 10 phút, đọc được câu ngắn. Trong mục này dùng **cả hai** cách gọi "tập gõ 10 ngón" và "tập đánh máy" (phụ huynh tìm bằng cả hai).

**H2 `2. Chuẩn bị: bàn phím, tư thế, quy tắc 10 phút`** (120–150 từ)
Bàn phím rời cỡ chuẩn (tránh laptop 13" nếu có thể), ghế đúng chiều cao, mắt cách màn hình 50–70 cm. Có `<Link to="/tu-the-go-phim">tư thế ngồi và cách đặt tay</Link>` và `<Link to="/bi-mat-phim-f-j">gờ nổi trên phím F và J</Link>` để bé tự tìm vị trí tay. Quy tắc: 10 phút/ngày, 5–6 ngày/tuần, dừng khi bé mỏi; không ép tốc độ, chỉ tính gõ đúng.

**H2 `3. Lộ trình 4 tuần`**
Một `<table>` 4 dòng, 4 cột `Tuần · Mục tiêu · Bài trên Typing Kid VN · Đạt khi`. Bảng bọc trong `<div style={{ overflowX: 'auto' }}>` (bắt buộc — bảng không bọc sẽ kéo cả trang cuộn ngang ở 375px). Dùng `cellStyle`/`headStyle` import từ `./typing-table-data`.

| Tuần | Mục tiêu | Bài (link) | Đạt khi |
|---|---|---|---|
| 1 | Hàng phím cơ sở ASDF JKL; không nhìn tay | `<Link to="/?mode=basic_home">Cơ bản: Hàng phím cơ sở</Link>` | gõ đúng từ 90% trở lên mà không nhìn bàn phím |
| 2 | Thêm hàng phím trên | `<Link to="/?mode=basic_top">Cơ bản: Hàng phím trên</Link>` | khoảng 10 từ/phút, đúng từ 90% |
| 3 | Hàng phím dưới, phím cách, chữ hoa | `<Link to="/?mode=basic_bottom">Cơ bản: Hàng phím dưới</Link>` | gõ được câu ngắn không dấu |
| 4 | Dấu tiếng Việt: chọn Telex hoặc VNI | `<Link to="/?mode=vietnamese_telex">Luyện dấu Telex</Link>` hoặc `<Link to="/?mode=vietnamese_vni">Luyện dấu VNI</Link>` | gõ được tên bé và tên trường có dấu |

Dưới bảng, 1 đoạn 60–80 từ về việc chọn kiểu gõ ở tuần 4: trẻ nhỏ nên bắt đầu bằng Telex vì không phải rời hàng phím chính — `<Link to="/huong-dan-telex">cách gõ Telex</Link>`, in `<Link to="/bang-go-telex">bảng gõ Telex</Link>` dán cạnh máy; nếu cả nhà đã quen VNI thì `<Link to="/huong-dan-vni">cách gõ VNI</Link>` và `<Link to="/bang-go-vni">bảng gõ VNI</Link>`.

**H2 `4. Giữ bé không chán`** (100–120 từ)
Mini game `<Link to="/?mode=totoro_chase">Game: Mie đuổi bắt</Link>` xen giữa buổi tập; đổi bài mỗi 3 phút; khen số lần gõ đúng thay vì khen tốc độ; dán bảng gõ in sẵn cạnh máy; cho bé tự xem thống kê cuối mỗi bài.

**H2 `5. Lỗi hay gặp và cách sửa`** (120–150 từ)
Bốn lỗi, mỗi lỗi 1 câu vấn đề + 1 câu cách sửa: nhìn bàn phím (che tay bằng khăn mỏng); dùng 2 ngón trỏ (quay lại tuần 1, chậm lại); gõ dấu sai chỗ (nhắc bé gõ dấu ở cuối từ cũng được chấp nhận); ngồi cong lưng (cho nghỉ, xem lại tư thế).

**H2 `Câu hỏi thường gặp`**
Mảng `faqs` 4 mục, **text nguyên văn dưới đây**, dùng cho cả phần hiển thị (`<h3>` câu hỏi + `<p>` trả lời) lẫn `faqSchema`:

1. q: `Bé mấy tuổi có thể tập gõ 10 ngón?`
   a: `Từ 7–8 tuổi, khi bàn tay bé đủ rộng để đặt 4 ngón lên 4 phím liền nhau và bé đã đọc tốt. Dưới 7 tuổi chỉ nên chơi game làm quen bàn phím, chưa cần đúng ngón.`
2. q: `Mỗi ngày bé nên tập gõ bao lâu?`
   a: `10 phút mỗi ngày, 5–6 ngày một tuần là đủ. Tập ngắn nhưng đều tốt hơn tập dài rồi bỏ. Dừng ngay khi bé mỏi tay hoặc mất tập trung.`
3. q: `Tập gõ 10 ngón mất bao lâu?`
   a: `Theo lộ trình 4 tuần, bé gõ được câu tiếng Việt có dấu mà không nhìn bàn phím. Tốc độ 20–25 từ/phút thường đến sau 2–3 tháng tập đều.`
4. q: `Có cần mua phần mềm tập gõ cho bé không?`
   a: `Không. Typing Kid VN miễn phí, chạy trên trình duyệt máy tính, có bài theo từng hàng phím, bài gõ dấu Telex/VNI và mini game. Chỉ cần bàn phím rời và 10 phút mỗi ngày.`

**CTA cuối** (trước `<RelatedGuides>`): khối nổi bật (dùng `className="glass"` như các thẻ khác, padding 24–30px) chứa `<Link to="/?mode=basic_home">Bắt đầu tuần 1 ngay</Link>` và một dòng nhỏ `Mở trên máy tính có bàn phím rời.`

Kết trang: `<RelatedGuides currentPath="/tap-go-10-ngon-cho-be" />`.

**Cấm sao chép**: không lấy nguyên câu nào từ trang chủ, 4 guide, 2 trang bảng, hay bất kỳ nguồn ngoài. Viết mới toàn bộ.

### 2. Route — `src/routes.tsx`

Thêm sau các route đã có, đúng pattern hiện hành:

```tsx
{ path: 'tap-go-10-ngon-cho-be', element: <KidsRoadmap /> },
```

### 3. Sitemap — `scripts/gen-sitemap.mjs`

Thêm vào mảng `ROUTES`:

```js
{ path: '/tap-go-10-ngon-cho-be', files: ['src/pages/KidsRoadmap.tsx'] },
```

### 4. Link chéo — `src/components/RelatedGuides.tsx`

Thêm vào cuối `GUIDES` (thành 7 item):

```ts
{ path: '/tap-go-10-ngon-cho-be', title: 'Tập gõ 10 ngón cho bé', desc: 'Lộ trình 4 tuần tại nhà, 10 phút mỗi ngày.' },
```

### 5. Nav trang chủ — `src/components/HomePage.tsx`

Trong khối `<nav>` đầu trang (hiện có 4 `<Link>`: Tư thế ngồi · Cách gõ Telex · Cách gõ VNI · Phím F và J), thêm link thứ 5 **cuối danh sách**, copy y hệt `style` và 2 handler `onMouseEnter`/`onMouseLeave` của các link cũ:

```tsx
<Link to="/tap-go-10-ngon-cho-be" className="tap-target" style={/* y hệt link trước đó */}>Tập gõ cho bé</Link>
```

Không đổi gì khác trong file này.

## Ràng buộc

- Không thêm dependency.
- Không đổi public type/contract đang có (`SeoProps`, `GuideSchemaMeta`, `GuideItem`, `LESSON_MODES`, `ToneTableRow`).
- Không lách lỗi type/lint bằng `any`, `@ts-ignore`, `void <biến>`, `eslint-disable`, tham số `_x`. Mâu thuẫn trong spec → báo BLOCKED.
- Style inline, chỉ dùng CSS var đang có (`var(--text-main)`, `var(--text-muted)`, `var(--primary-color)`), không hardcode mã màu mới.
- Mọi text tiếng Việt **có dấu đầy đủ**. Không dùng ký tự `|` trong text hiển thị (vỡ bảng markdown khi báo cáo).
- Không dùng `window`/`document` ngoài handler sự kiện (SSG render trên Node).
- Mọi `<table>` phải nằm trong `<div style={{ overflowX: 'auto' }}>`; trang không được cuộn ngang ở viewport 375px.
- Không commit, không push, không tạo branch.

## Non-goals

- Không tạo ảnh minh họa, không `og:image` riêng, không hreflang.
- Không sửa engine luyện gõ, mini game, hay `LESSON_MODES`.
- Không sửa nội dung 4 guide và 2 trang bảng.
- Không đổi title/description/H1 của trang chủ.
- Không sửa `npm run lint` cho phần repo ngoài task (đang đỏ sẵn từ trước).

## Acceptance criteria

Dán **output thật** của từng lệnh. Chưa chạy thì ghi "CHƯA CHẠY".

- [ ] `npx tsc -b` → exit 0
- [ ] `npm test` → exit 0
- [ ] `npm run build` → exit 0
- [ ] `npx eslint src/pages src/routes.tsx src/components/HomePage.tsx` → exit 0
- [ ] `grep -c "<url>" dist/sitemap.xml` → `8`
- [ ] `grep -c "<h1" dist/tap-go-10-ngon-cho-be.html` → `1`
- [ ] `grep -c "<h2" dist/tap-go-10-ngon-cho-be.html` → `≥ 6`
- [ ] `grep -o '"@type":"FAQPage"' dist/tap-go-10-ngon-cho-be.html | wc -l` → `1`
- [ ] `grep -c 'BreadcrumbList' dist/tap-go-10-ngon-cho-be.html` → `1`
- [ ] `grep -c '"@type":"Article"' dist/tap-go-10-ngon-cho-be.html` → `1`
- [ ] `grep -c 'rel="canonical" href="https://type.scala.vn/tap-go-10-ngon-cho-be"' dist/tap-go-10-ngon-cho-be.html` → `1`
- [ ] `grep -c '<title[^>]*>Tập gõ 10 ngón cho bé: lộ trình 4 tuần tại nhà | Typing Kid VN</title>' dist/tap-go-10-ngon-cho-be.html` → `1`
- [ ] `grep -o 'mode=basic_home\|mode=basic_top\|mode=basic_bottom\|mode=vietnamese_telex\|mode=vietnamese_vni\|mode=totoro_chase' dist/tap-go-10-ngon-cho-be.html | sort -u | wc -l` → `6`
- [ ] `grep -c "tap-go-10-ngon-cho-be" dist/index.html` → `≥ 2`
- [ ] `grep -n "luyện gõ 10 ngón tiếng việt cho trẻ em" dist/tap-go-10-ngon-cho-be.html` → 0 dòng *(không nhắm cụm trang chủ đang giữ)*
- [ ] `python3 -c "import re,html;s=open('dist/tap-go-10-ngon-cho-be.html',encoding='utf-8').read();m=re.search(r'<article.*?</article>',s,re.S);t=re.sub(r'<[^>]+>',' ',m.group(0));print(len(html.unescape(t).split()))"` → `≥ 900` *(đếm số từ phần thân bài)*
- [ ] `git status --porcelain src/constants.ts src/index.css src/pages/TelexGuide.tsx src/pages/VniGuide.tsx src/pages/TelexTable.tsx src/pages/VniTable.tsx index.html package.json` → 0 dòng *(vùng cấm không bị đụng)*

## Verify

```bash
npx tsc -b && npm test && npm run build && npx eslint src/pages src/routes.tsx src/components/HomePage.tsx
```
