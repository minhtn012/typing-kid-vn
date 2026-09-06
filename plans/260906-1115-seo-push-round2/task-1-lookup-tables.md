# Task: Trang bảng gõ in được `/bang-go-telex` và `/bang-go-vni`

## Outcome

Site có thêm 2 trang tra cứu: `/bang-go-telex` và `/bang-go-vni`. Mỗi trang là một "bảng gõ 1 trang" để tra nhanh hoặc **in ra giấy A4 dán cạnh máy**: dấu thanh, chữ đặc biệt, bảng nguyên âm × 5 thanh, 12 từ hay gặp kèm chuỗi phím đầy đủ. Bấm nút "In bảng này" ra bản in trắng đen không có nav/nút. Hai trang có HTML tĩnh (SSG) với title/description/canonical riêng, có mặt trong `dist/sitemap.xml`, và được link chéo từ khối "Hướng dẫn liên quan".

Đồng thời dữ liệu bảng nguyên âm đang bị **copy nguyên xi ở 2 file guide** được tách ra một module dùng chung, để 4 trang (2 guide + 2 bảng) đọc cùng một nguồn. Nội dung HTML của 2 trang guide phải **không đổi** sau khi tách (trừ 1 câu link mới ở đoạn mở).

## Bối cảnh

Đây là phase 03 của plan `plans/260906-1115-seo-push-round2/plan.md`. Đọc `plans/260906-1115-seo-push-round2/phase-03-lookup-tables.md` để hiểu ý đồ SEO đầy đủ; spec này là bản thi hành, khi hai bên lệch nhau thì **spec này thắng**.

Vì sao tách trang riêng thay vì nhét vào guide: nhóm truy vấn "bảng gõ telex", "bảng chữ telex", "bảng vni" là intent *tra cứu*, khác intent *học cách gõ* của guide `/huong-dan-telex`. Site đang xếp hạng 26–86 cho nhóm này. Trang bảng phải khác guide ở 3 điểm: (1) không giải thích dài dòng, (2) có bảng từ hay gặp kèm chuỗi phím, (3) in được ra A4.

Ràng buộc nghiệp vụ đã chốt với chủ site (`plan.md` mục "Quyết định đã chốt"):
- Quyết định 7: trang bảng **phải là bản in A4 + bảng từ hay gặp**, tái dùng dữ liệu bảng qua module chung, **không copy văn** của guide.
- Non-goal của cả plan: không đụng engine luyện gõ, không `og:image` riêng từng trang, không hreflang.

Về stack: Vite + React 19 + react-router v6, prerender tĩnh bằng `vite-react-ssg`. Style trong repo này viết **inline** (`style={{...}}`), không dùng Tailwind, không CSS module — làm theo đúng như vậy. Chỉ `src/index.css` chứa CSS toàn cục.

## Files được phép sửa

Tạo mới:
- `src/pages/typing-table-data.ts`
- `src/pages/TelexTable.tsx`
- `src/pages/VniTable.tsx`

Sửa:
- `src/pages/TelexGuide.tsx`
- `src/pages/VniGuide.tsx`
- `src/routes.tsx`
- `src/components/RelatedGuides.tsx`
- `src/index.css`
- `scripts/gen-sitemap.mjs`

**KHÔNG sửa** (dù thấy "tiện tay"):
- `src/constants.ts` — nguồn `TELEX_RULES` / `VNI_RULES`, dùng chung với engine luyện gõ, đổi là hỏng bài tập.
- `src/components/HomePage.tsx`, `src/components/HomeView.tsx`, `src/components/DesktopNudge.tsx`
- `src/components/Seo.tsx`, `src/components/JsonLd.tsx`, `src/components/guide-schema.ts`
- `src/utils/`, `src/hooks/`, `index.html`, `package.json`, `vercel.json`
- Mọi file trong `plans/` và `docs/` — **ngoại lệ**: `docs/ui-map.md` được phép cập nhật vì route thay đổi (script dispatch tự sinh lại; nếu chạy tay thì dùng generator của repo, đừng viết tay phần giữa 2 marker `ui-map:generated`).

## Files chỉ đọc (tham chiếu)

- `src/pages/TelexGuide.tsx`
  - dòng 16–29: `VOWEL_GROUPS` (12 nguyên âm gốc × 5 ký tự có dấu) — bản sẽ chuyển sang module chung
  - dòng 31: `TONE_LABELS = ['Sắc','Huyền','Hỏi','Ngã','Nặng']`
  - dòng 38–45: `buildTelexTable()`
  - dòng 52–83: pattern `faqs` + `faqSchema` (mảng dùng chung cho cả hiển thị lẫn JSON-LD)
  - dòng 86–93: `buildGuideSchemas({...})`
  - dòng 95–96: `cellStyle`, `headStyle`
  - dòng 98–130: khung layout trang guide (`motion.div` maxWidth 800, `<Seo>`, các `<JsonLd>`, link "Quay lại trang chủ", `<header>` h1 + p)
  - dòng 179–205: **JSX render bảng nguyên âm × thanh** — chép nguyên cấu trúc này cho bảng 3 của trang mới
  - dòng 273 vùng cuối: `<RelatedGuides currentPath="..." />`
- `src/pages/VniGuide.tsx` — bản đối xứng: `VOWEL_GROUPS` 15–28, `TONE_LABELS` 30, `buildVniTable()` 36–43, `buildGuideSchemas` 76–83, `cellStyle`/`headStyle` 85–86
- `src/components/Seo.tsx` — props `{ title, description, path }`, tự sinh canonical + og + twitter
- `src/components/guide-schema.ts` — `buildGuideSchemas(meta): Record<string, unknown>[]` trả **mảng** [BreadcrumbList, Article]; render bằng nhiều `<JsonLd>`
- `src/components/JsonLd.tsx` — `<JsonLd data={obj} />`
- `src/components/RelatedGuides.tsx` dòng 18–24: mảng `GUIDES` — nguồn duy nhất cho khối "Hướng dẫn liên quan" **và** cho `src/components/DesktopNudge.tsx:80` (danh sách dọc trên mobile). Thêm item vào đây là đủ để link chéo ở cả 2 nơi.
- `src/constants.ts` — `TELEX_RULES` / `VNI_RULES`: `Record<string, string[]>`, ký tự → mảng phím
- `scripts/gen-sitemap.mjs` — mảng `ROUTES` (`{ path, files }`), lastmod lấy từ `git log -1 --format=%cs` của các file nguồn

## Yêu cầu

### 1. Chụp ảnh HTML guide TRƯỚC khi sửa (để chứng minh không hồi quy)

Chạy **trước mọi thay đổi**:

```bash
npm run build
mkdir -p /tmp/p03 && cp dist/huong-dan-telex.html dist/huong-dan-vni.html /tmp/p03/
```

### 2. Tách dữ liệu bảng dùng chung → `src/pages/typing-table-data.ts`

Module `.ts` thuần (không JSX). Export đúng các tên sau:

```ts
import type React from 'react';

/** 12 nguyên âm gốc × 5 ký tự có dấu — cấu trúc TRÌNH BÀY của bảng tra cứu. */
export const VOWEL_GROUPS: { base: string; chars: string[] }[] = /* chép nguyên từ TelexGuide.tsx:16-29 */;

export const TONE_LABELS = ['Sắc', 'Huyền', 'Hỏi', 'Ngã', 'Nặng'];

export interface ToneTableRow { base: string; baseKeys: string; cells: { char: string; keys: string }[] }

/**
 * Sinh dữ liệu bảng nguyên âm × thanh từ bảng luật của một kiểu gõ.
 * Thay cho buildTelexTable()/buildVniTable() vốn giống hệt nhau ngoài tham số rules.
 */
export function buildToneTable(rules: Record<string, string[]>): ToneTableRow[] {
    return VOWEL_GROUPS.map(({ base, chars }) => ({
        base,
        baseKeys: (rules[base] ?? [base]).join(''),
        // Guard ?? để không crash nếu constants.ts đổi và thiếu key ký tự nào đó
        cells: chars.map((c) => ({ char: c, keys: (rules[c] ?? ['?']).join('') })),
    }));
}

export const cellStyle: React.CSSProperties = /* chép nguyên từ TelexGuide.tsx:95 */;
export const headStyle: React.CSSProperties = /* chép nguyên từ TelexGuide.tsx:96 */;
```

Sửa `TelexGuide.tsx`: xoá `VOWEL_GROUPS`, `TONE_LABELS`, `buildTelexTable`, `cellStyle`, `headStyle` cục bộ; import từ `./typing-table-data`; đổi `const tableRows = buildTelexTable()` → `const tableRows = buildToneTable(TELEX_RULES)`. `VniGuide.tsx` làm y hệt với `VNI_RULES`.

**Không** đổi bất kỳ chữ nào trong JSX, style, hay text của 2 guide ở bước này. Import `TELEX_RULES`/`VNI_RULES` vẫn giữ.

### 3. `src/pages/TelexTable.tsx`

Khung trang chép theo `TelexGuide.tsx` dòng 98–130 (motion.div maxWidth 800, link "Quay lại trang chủ" với icon `ChevronLeft`, `<header>` h1 + đoạn mở, `<article>`, `<RelatedGuides>` cuối trang). **Không** chép nội dung văn của guide.

Meta — dùng **nguyên văn**:

```tsx
<Seo
    title="Bảng gõ Telex đầy đủ, in được | Typing Kid VN"
    description="Bảng gõ Telex 1 trang: 5 dấu thanh, 7 chữ đặc biệt, bảng nguyên âm 12×5 và 12 từ hay gặp kèm phím gõ. Bấm In để dán cạnh máy cho bé tập gõ."
    path="/bang-go-telex"
/>
```

```tsx
const tableSchemas = buildGuideSchemas({
    path: '/bang-go-telex',
    breadcrumbName: 'Bảng gõ Telex',
    headline: 'Bảng gõ Telex đầy đủ (bản in A4)',
    description: 'Bảng gõ Telex 1 trang: 5 dấu thanh, 7 chữ đặc biệt, bảng nguyên âm 12×5 và 12 từ hay gặp kèm phím gõ. Bấm In để dán cạnh máy cho bé tập gõ.',
    datePublished: '2026-09-07',
    dateModified: '2026-09-07',
});
```

Render mỗi phần tử của mảng đó thành một `<JsonLd>` (xem `TelexGuide.tsx` cách map). **Trang này KHÔNG có FAQPage.**

- H1: `Bảng gõ Telex đầy đủ (bản in A4)`
- Đoạn mở đúng 2 câu, ý: bảng này để tra nhanh hoặc in ra dán cạnh máy; muốn học từ đầu thì đọc `<Link to="/huong-dan-telex">hướng dẫn cách gõ Telex</Link>`. Tự viết câu, không chép từ guide.
- Nút in, đặt ngay dưới đoạn mở:
  ```tsx
  <button type="button" className="no-print" onClick={() => window.print()} style={{ /* style inline hợp tông trang: nền var(--primary-color), chữ trắng, bo 12px, padding 12px 20px, cursor pointer, border none, fontWeight 700 */ }}>
      In bảng này
  </button>
  ```
  `window.print()` chỉ nằm trong `onClick` — **không** gọi trong thân component hay `useEffect` (SSG render trên Node, không có `window`).

Năm bảng, mỗi bảng bọc trong `<section style={{ marginBottom: '40px' }}>` có `<h2>` số thứ tự, dùng `cellStyle`/`headStyle` từ module chung:

1. **Dấu thanh** — 3 cột `Dấu · Phím · Ví dụ`: Sắc `s` (as → á) · Huyền `f` (af → à) · Hỏi `r` (ar → ả) · Ngã `x` (ax → ã) · Nặng `j` (aj → ạ).
2. **Chữ đặc biệt** — 2 cột `Gõ · Ra chữ`: `aa`→â · `ee`→ê · `oo`→ô · `aw`→ă · `ow`→ơ · `uw`→ư · `dd`→đ. Thêm 1 dòng ghi chú (không nằm trong bảng): phím `z` xoá dấu vừa gõ.
3. **Nguyên âm × thanh** — `buildToneTable(TELEX_RULES)`, JSX chép nguyên cấu trúc `TelexGuide.tsx:179-205` (div `overflowX: 'auto'` bọc `<table>` `minWidth: '560px'`).
4. **12 từ hay gặp** — 2 cột `Từ · Gõ`. **Chuỗi phím dưới đây đã được coordinator kiểm bằng `TELEX_RULES`, chép đúng từng ký tự, không tự sửa:**

   | Từ | Gõ |
   |---|---|
   | Việt Nam | Vieetj Nam |
   | tiếng | tieengs |
   | người | nguwowif |
   | được | dduwowcj |
   | trường | truwowngf |
   | học | hocj |
   | bàn phím | banf phims |
   | mười ngón | muwowif ngons |
   | chữ | chuwx |
   | đẹp | ddepj |
   | gõ | gox |
   | nhanh | nhanh |

   Ngay dưới bảng, 1 dòng: `Gõ dấu ngay sau nguyên âm (ngươfi) hay cuối từ (nguwowif) đều được.`
5. **Telex và VNI cạnh nhau** — `<section className="no-print">`, bảng 3 cột `Dấu / chữ · Telex · VNI` cho 5 thanh (s/f/r/x/j ↔ 1/2/3/4/5) và 7 chữ đặc biệt (aa/ee/oo/aw/ow/uw/dd ↔ a6/e6/o6/a8/o7/u7/d9). Kèm câu có `<Link to="/bang-go-vni">bảng gõ VNI đầy đủ</Link>`.

Cuối trang: `<RelatedGuides currentPath="/bang-go-telex" />`.

### 4. `src/pages/VniTable.tsx`

Cấu trúc, thứ tự bảng, cách viết y hệt TelexTable, đổi dữ liệu:

```tsx
<Seo
    title="Bảng gõ VNI đầy đủ, in được | Typing Kid VN"
    description="Bảng gõ VNI 1 trang: dấu thanh phím 1-5, chữ â ê ô ơ ư ă đ phím 6-9, bảng nguyên âm 12×5 và 12 từ hay gặp kèm phím gõ. Bấm In để dán cạnh máy."
    path="/bang-go-vni"
/>
```
`buildGuideSchemas`: `path: '/bang-go-vni'`, `breadcrumbName: 'Bảng gõ VNI'`, `headline: 'Bảng gõ VNI đầy đủ (bản in A4)'`, `description` như trên, `datePublished`/`dateModified` `'2026-09-07'`. Không FAQPage.

- H1: `Bảng gõ VNI đầy đủ (bản in A4)`; đoạn mở link sang `<Link to="/huong-dan-vni">hướng dẫn cách gõ VNI</Link>`.
- Bảng 1: Sắc `1` (a1 → á) · Huyền `2` · Hỏi `3` · Ngã `4` · Nặng `5`.
- Bảng 2: `6` dấu mũ (a6→â, e6→ê, o6→ô) · `7` dấu móc (o7→ơ, u7→ư) · `8` dấu trăng (a8→ă) · `9` chữ đ (d9→đ). Ghi chú: phím `0` xoá dấu.
- Bảng 3: `buildToneTable(VNI_RULES)`.
- Bảng 4 — **chuỗi phím đã được coordinator kiểm bằng `VNI_RULES`, chép đúng từng ký tự:**

  | Từ | Gõ |
  |---|---|
  | Việt Nam | Vie6t5 Nam |
  | tiếng | tie6ng1 |
  | người | ngu7o7i2 |
  | được | d9u7o7c5 |
  | trường | tru7o7ng2 |
  | học | hoc5 |
  | bàn phím | ban2 phim1 |
  | mười ngón | mu7o7i2 ngon1 |
  | chữ | chu74 |
  | đẹp | d9ep5 |
  | gõ | go4 |
  | nhanh | nhanh |

  Dòng dưới bảng: `Gõ dấu ngay sau nguyên âm (ngu7o72i) hay cuối từ (ngu7o7i2) đều được.`
- Bảng 5 đối xứng, link ngược `<Link to="/bang-go-telex">bảng gõ Telex đầy đủ</Link>`, cũng trong `className="no-print"`.
- `<RelatedGuides currentPath="/bang-go-vni" />`.

### 5. Đăng ký route — `src/routes.tsx`

Thêm 2 route **sau** 4 route guide hiện có, cùng pattern (element bọc `<>` với `<Seo>` nằm trong component trang, xem cách 4 guide đang khai báo — làm giống hệt):

```tsx
{ path: 'bang-go-telex', element: <TelexTable /> },
{ path: 'bang-go-vni', element: <VniTable /> },
```

### 6. Sitemap — `scripts/gen-sitemap.mjs`

Thêm vào cuối mảng `ROUTES`:

```js
{ path: '/bang-go-telex', files: ['src/pages/TelexTable.tsx'] },
{ path: '/bang-go-vni', files: ['src/pages/VniTable.tsx'] },
```

### 7. Link chéo — `src/components/RelatedGuides.tsx`

Thêm vào cuối mảng `GUIDES` (thành 6 item):

```ts
{ path: '/bang-go-telex', title: 'Bảng gõ Telex (in được)', desc: 'Một trang A4: dấu, chữ đặc biệt, 12 từ mẫu.' },
{ path: '/bang-go-vni', title: 'Bảng gõ VNI (in được)', desc: 'Một trang A4: phím số 1-9 và 12 từ mẫu.' },
```

### 8. Link từ guide sang trang bảng

- `TelexGuide.tsx`, đoạn mở trong `<header>` (quanh dòng 128): thêm 1 câu `Cần bản in? Xem <Link to="/bang-go-telex">bảng gõ Telex in được</Link>.`
- `VniGuide.tsx`, đoạn mở tương ứng (quanh dòng 118): câu tương tự với `/bang-go-vni`.

Đây là **thay đổi duy nhất** được phép với nội dung hiển thị của 2 guide.

### 9. CSS in — thêm vào cuối `src/index.css`

```css
/* Bản in A4 cho trang bảng gõ: bỏ nền tối, bỏ nav/nút, kẻ viền bảng đen trắng. */
@media print {
    body { background: #fff !important; color: #000 !important; }
    nav, .no-print, a.tap-target { display: none !important; }
    table { border-collapse: collapse; }
    th, td { border: 1px solid #999; color: #000 !important; background: none !important; }
    @page { size: A4; margin: 12mm; }
}
```

## Ràng buộc

- Không thêm dependency.
- Không đổi public type/contract đang có (`SeoProps`, `GuideSchemaMeta`, `GuideItem`, `TELEX_RULES`, `VNI_RULES`).
- Không lách lỗi type/lint bằng `any`, `@ts-ignore`, `void <biến>`, `eslint-disable`, tham số `_x`. Gặp mâu thuẫn trong spec → báo BLOCKED, đừng tự chế.
- Style **inline** đúng như các trang hiện có; chỉ `@media print` được viết vào `src/index.css`. Không hardcode mã màu mới — dùng CSS var đang có (`var(--text-main)`, `var(--text-muted)`, `var(--primary-color)`); riêng khối `@media print` được dùng `#fff/#000/#999` vì đó là bản in.
- Mọi text hiển thị là tiếng Việt **có dấu đầy đủ**.
- Không dùng `window`/`document` ngoài handler sự kiện (build là SSG chạy trên Node).
- Không commit, không push, không tạo branch — coordinator giữ quyền git.

## Non-goals

- Không đụng `src/constants.ts`, engine luyện gõ, mini game.
- Không thêm FAQPage cho 2 trang mới.
- Không tạo `og:image` riêng, không hreflang, không `404.html`.
- Không sửa `plans/`, `package.json`, `index.html`; `docs/` chỉ đụng `docs/ui-map.md` như nêu trên.
- Không đổi title/description của 4 trang guide và trang chủ.
- Không refactor thêm gì ngoài phần `typing-table-data.ts` đã nêu.

## Acceptance criteria

Dán **output thật** của từng lệnh. Chưa chạy thì ghi "CHƯA CHẠY".

- [ ] `npx tsc -b` → exit 0
- [ ] `npm test` → exit 0
- [ ] `npm run build` → exit 0
- [ ] `npx eslint src/pages src/routes.tsx` → exit 0 *(chỉ lint vùng của task — `npm run lint` toàn repo ĐỎ SẴN 34 lỗi ở `src/hooks`, `src/components`, `.opencode/**`, không phải việc của task này, đừng sửa)*
- [ ] `grep -n "VOWEL_GROUPS\|buildTelexTable\|buildVniTable" src/pages/TelexGuide.tsx src/pages/VniGuide.tsx` → 0 dòng
- [ ] `grep -c "<url>" dist/sitemap.xml` → `7`
- [ ] `grep -c "<h1" dist/bang-go-telex.html` → `1`
- [ ] `grep -c "<h1" dist/bang-go-vni.html` → `1`
- [ ] `grep -n "FAQPage" dist/bang-go-telex.html dist/bang-go-vni.html` → 0 dòng
- [ ] `grep -c 'rel="canonical" href="https://type.scala.vn/bang-go-telex"' dist/bang-go-telex.html` → `1`
- [ ] `grep -c 'rel="canonical" href="https://type.scala.vn/bang-go-vni"' dist/bang-go-vni.html` → `1`
- [ ] `grep -c 'BreadcrumbList' dist/bang-go-telex.html` → `1`
- [ ] `grep -c '"@type":"Article"' dist/bang-go-telex.html` → `1`
- [ ] `grep -o "bang-go-telex" dist/huong-dan-telex.html | wc -l` → `≥ 2` *(sửa 06/09: bản cũ dùng `grep -c` đếm SỐ DÒNG khớp, mà vite-react-ssg dồn cả DOM vào 1 dòng nên luôn ra 1 — worker báo BLOCKED đúng, lỗi ở spec)*
- [ ] `grep -c "@media print" src/index.css` → `1`
- [ ] `python3 -c "import re;t=lambda f:re.findall(r'<table.*?</table>',open(f,encoding='utf-8').read(),re.S);print('SAME' if t('/tmp/p03/huong-dan-telex.html')==t('dist/huong-dan-telex.html') else 'DIFF')"` → `SAME` *(chứng minh việc tách module không đổi nội dung bảng của guide; cần bước 1 đã chạy trước khi sửa)*
- [ ] `python3 -c "import re;t=lambda f:re.findall(r'<table.*?</table>',open(f,encoding='utf-8').read(),re.S);print('SAME' if t('/tmp/p03/huong-dan-vni.html')==t('dist/huong-dan-vni.html') else 'DIFF')"` → `SAME`
- [ ] `git status --porcelain src/constants.ts src/components/HomePage.tsx index.html package.json` → 0 dòng *(vùng cấm không bị đụng)*

## Verify

```bash
npx tsc -b && npm test && npm run build && npx eslint src/pages src/routes.tsx
```
