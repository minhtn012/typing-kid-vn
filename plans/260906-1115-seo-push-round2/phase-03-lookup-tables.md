# Phase 03 — Bảng gõ in được: `/bang-go-telex` và `/bang-go-vni`

**Mục tiêu:** bắt intent "bảng" (tra cứu nhanh, in dán cạnh máy) tách khỏi intent "hướng dẫn". Nhóm query `bảng * telex` ≈45 impr/90d, site pos 26–86; `bảng vni` 8 impr pos 71.

## Bối cảnh code (đã đọc 06/09)
- `TelexGuide.tsx:16-45` và `VniGuide.tsx:15-43` mỗi file có bản sao `VOWEL_GROUPS` (12 nguyên âm × 5 thanh) + `buildTelexTable()`/`buildVniTable()` sinh từ `TELEX_RULES`/`VNI_RULES` (`src/constants.ts:1-139`, `Record<string, string[]>`). Mục 3 của guide đã render bảng nguyên âm × thanh.
- `cellStyle`/`headStyle` lặp ở 2 guide (`TelexGuide.tsx:95-96`, `VniGuide.tsx:85-86`).
- `RelatedGuides.tsx:18-23` `GUIDES` là nguồn duy nhất cho khối "Hướng dẫn liên quan" và cho `DesktopNudge.tsx:80` → thêm item vào đây là đủ để link chéo.
- `src/index.css` chưa có `@media print`. Theme tối (CSS var `--text-main`, `--primary-color`).
- Layout guide: `motion.div` maxWidth 800, `<Seo>`, `<JsonLd>`, link "Quay lại trang chủ", `<header>` h1 + p, `<article>`, `<RelatedGuides currentPath>`.

## Thiết kế

### Tách dữ liệu dùng chung (DRY, không đổi hành vi guide)
Tạo `src/pages/typing-table-data.ts`:
```ts
export const VOWEL_GROUPS      // chuyển nguyên từ TelexGuide (2 bản giống hệt nhau)
export const TONE_LABELS       // ['Sắc','Huyền','Hỏi','Ngã','Nặng']
export function buildToneTable(rules: Record<string, string[]>)   // thay buildTelexTable/buildVniTable
export const cellStyle, headStyle
```
Sửa `TelexGuide.tsx` và `VniGuide.tsx` import từ module này, xóa bản sao cục bộ. Build + so sánh `dist/huong-dan-telex.html` trước/sau: nội dung bảng phải giống hệt (diff chỉ khác hash asset).

### Nội dung 2 trang (mỗi trang 350–500 từ văn, phần lớn là bảng)
Khác guide ở 3 điểm: (1) không có phần giải thích/mẹo dài, (2) có **bảng từ hay gặp** với chuỗi phím đầy đủ, (3) có nút in và CSS in A4 trắng đen.

**`/bang-go-telex`** — `src/pages/TelexTable.tsx`
- `<Seo title="Bảng gõ Telex đầy đủ, in được | Typing Kid VN" description="Bảng gõ Telex 1 trang: 5 dấu thanh, 7 chữ đặc biệt, bảng nguyên âm 12×5 và 12 từ hay gặp kèm phím gõ. Bấm In để dán cạnh máy cho bé tập gõ." path="/bang-go-telex" />` (title 45 ký tự, description 148).
- `buildGuideSchemas({ path: '/bang-go-telex', breadcrumbName: 'Bảng gõ Telex', headline: 'Bảng gõ Telex đầy đủ (bản in A4)', description: <như Seo>, datePublished: '2026-09-07', dateModified: '2026-09-07' })`. Không FAQPage.
- H1: "Bảng gõ Telex đầy đủ (bản in A4)".
- Đoạn mở 2 câu: bảng này để tra nhanh/in; muốn học từ đầu thì đọc `<Link to="/huong-dan-telex">hướng dẫn cách gõ Telex</Link>`.
- Nút `<button onClick={() => window.print()} className="no-print">In bảng này</button>` — component client-only OK vì onClick không chạy lúc SSG.
- **Bảng 1 — Dấu thanh:** Sắc s · Huyền f · Hỏi r · Ngã x · Nặng j (ví dụ: as á, af à, ar ả, ax ã, aj ạ).
- **Bảng 2 — Chữ đặc biệt:** aa â · ee ê · oo ô · aw ă · ow ơ · uw ư · dd đ · z xoá dấu.
- **Bảng 3 — Nguyên âm × thanh:** `buildToneTable(TELEX_RULES)`, render giống guide mục 3 (thẻ `<div style={{overflowX:'auto'}}>` bọc table minWidth 560).
- **Bảng 4 — 12 từ hay gặp (gõ dấu cuối từ, kiểu Unikey):**

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

  Ghi chú 1 dòng dưới bảng: "Gõ dấu ngay sau nguyên âm (ngươfi) hay cuối từ (nguwowif) đều được."
- **Bảng 5 — Telex và VNI cạnh nhau** (suggest `bảng gõ telex và vni` xuất hiện ở cả 2 seed): 1 bảng 3 cột Dấu/chữ · Telex · VNI cho 5 thanh + 7 chữ đặc biệt, kèm câu "Xem bản đầy đủ VNI tại `<Link to="/bang-go-vni">`". Trang VNI có bảng đối xứng link ngược. Đặt trong `.no-print` để bản in giữ 1 kiểu gõ.
- Cuối: `<RelatedGuides currentPath="/bang-go-telex" />`.

**`/bang-go-vni`** — `src/pages/VniTable.tsx`, cấu trúc y hệt:
- `<Seo title="Bảng gõ VNI đầy đủ, in được | Typing Kid VN" description="Bảng gõ VNI 1 trang: dấu thanh phím 1-5, chữ â ê ô ơ ư ă đ phím 6-9, bảng nguyên âm 12×5 và 12 từ hay gặp kèm phím gõ. Bấm In để dán cạnh máy." path="/bang-go-vni" />`
- Breadcrumb "Bảng gõ VNI", headline "Bảng gõ VNI đầy đủ (bản in A4)".
- Bảng 1: Sắc 1 · Huyền 2 · Hỏi 3 · Ngã 4 · Nặng 5.
- Bảng 2: 6 → mũ (a6 â, e6 ê, o6 ô) · 7 → móc (o7 ơ, u7 ư) · 8 → trăng (a8 ă) · 9 → đ (d9) · 0 xoá dấu.
- Bảng 3: `buildToneTable(VNI_RULES)`.
- Bảng 4 (dấu cuối từ):

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

Worker kiểm tra lại từng chuỗi phím bảng 4 bằng cách tra `TELEX_RULES`/`VNI_RULES` hoặc gõ thử trong Unikey; sai 1 ô là mất uy tín trang.

### CSS in (thêm vào `src/index.css`)
```css
@media print {
  body { background: #fff !important; color: #000 !important; }
  nav, .no-print, a.tap-target { display: none !important; }
  table { border-collapse: collapse; }
  th, td { border: 1px solid #999; color: #000 !important; background: none !important; }
  @page { size: A4; margin: 12mm; }
}
```
Bảng 3 có 7 cột × 12 dòng, vừa A4 dọc với font 12–13px trong print.

## Bước
1. Tách `typing-table-data.ts`, sửa 2 guide dùng chung, build, diff HTML guide (không đổi nội dung).
2. Tạo `TelexTable.tsx`, `VniTable.tsx` theo spec trên.
3. `src/routes.tsx`: thêm `{ path: 'bang-go-telex', element: <TelexTable /> }`, `{ path: 'bang-go-vni', element: <VniTable /> }` sau 4 route guide.
4. `scripts/gen-sitemap.mjs` `ROUTES`: thêm `{ path: '/bang-go-telex', files: ['src/pages/TelexTable.tsx'] }`, `{ path: '/bang-go-vni', files: ['src/pages/VniTable.tsx'] }`.
5. `RelatedGuides.tsx` `GUIDES`: thêm `{ path: '/bang-go-telex', title: 'Bảng gõ Telex (in được)', desc: 'Một trang A4: dấu, chữ đặc biệt, 12 từ mẫu.' }` và bản VNI tương ứng. Kiểm tra `DesktopNudge` vẫn hiển thị ổn với 6 item.
6. `TelexGuide.tsx` đoạn mở (dòng ~128) thêm câu có link "Cần bản in? Xem `<Link to="/bang-go-telex">bảng gõ Telex in được</Link>`." — tương tự `VniGuide.tsx` ~118.
7. `src/index.css` thêm block print.
8. Lint, test, build. Verify:
   ```bash
   for p in bang-go-telex bang-go-vni; do f=dist/$p.html; echo $f; grep -c "<h1" $f; grep -o '<title>[^<]*' $f; grep -o 'rel="canonical" href="[^"]*"' $f; grep -c '"@type":"FAQPage"' $f; done   # h1=1, FAQPage=0
   grep -c "<url>" dist/sitemap.xml    # 7
   ```
9. Dev server: mở `/bang-go-telex`, Cmd+P xem preview in: 1–2 trang, nền trắng, không nav. Mobile 375px: bảng cuộn ngang trong container, body không cuộn ngang. Tắt dev server.
10. Commit `feat(seo): trang bảng gõ Telex/VNI in được`, push, curl 2 URL live có `<h1`.
11. **User tay:** GSC Request Indexing 2 URL.

## Files
- Tạo: `src/pages/typing-table-data.ts`, `src/pages/TelexTable.tsx`, `src/pages/VniTable.tsx`
- Sửa: `src/pages/TelexGuide.tsx`, `src/pages/VniGuide.tsx`, `src/routes.tsx`, `src/components/RelatedGuides.tsx`, `scripts/gen-sitemap.mjs`, `src/index.css`

## Rủi ro
- Tự cạnh tranh với guide cho `bảng gõ telex`: chấp nhận, theo dõi ở phase 05 D+14 (quyết định 8 trong plan.md).
- `window.print` trong SSG: chỉ gọi trong onClick, không gọi khi render → an toàn. Không `useEffect` đọc `window`.
