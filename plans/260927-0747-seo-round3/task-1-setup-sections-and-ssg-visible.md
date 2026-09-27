# Task: Mục "bật kiểu gõ" cho 2 guide Telex/VNI + nội dung SSG hiện ngay

## Outcome

1. `/huong-dan-telex` và `/huong-dan-vni` có một mục H2 hướng dẫn bật kiểu gõ trên Windows, macOS, iPhone/iPad, Android (4 H3, mỗi H3 là danh sách bước), một khung giải thích "kiểu gõ khác bảng mã", và 2 câu FAQ mới mỗi trang (FAQPage JSON-LD tự cập nhật vì sinh từ cùng mảng `faqs`).
2. HTML tĩnh (SSG) của 7 trang nội dung không còn `opacity:0` ở wrapper ngoài cùng: nội dung hiện ngay khi HTML tới, không phải chờ JS hydrate.

## Context

Site `https://type.scala.vn/`: app luyện gõ 10 ngón tiếng Việt cho trẻ em. Vite + React 19 + react-router v6, prerender bằng `vite-react-ssg`, style inline (`style={{...}}`), không Tailwind. Đọc `docs/scope-map.md` dòng `seo` và `guides` trước khi làm.

Lý do SEO (số liệu Google Search Console 27/09):
- Gợi ý Google cho "cách gõ telex"/"cách gõ vni" phần lớn là "cách bật/chỉnh kiểu gõ … trên máy tính / win 11 / macbook / iphone / android" và "kiểu gõ telex bảng mã gì". Hai guide hiện chỉ có một mục ngắn về điện thoại (Telex) hoặc không có (VNI).
- `/huong-dan-telex` là trang Google crawl thường nhất (pos 12) nên nội dung mới đặt ở đây và `/huong-dan-vni`, không tạo trang mới.
- 7 trang nội dung bọc toàn bộ nội dung trong `<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>` → HTML SSG ship `style="opacity:0"` cho cả trang. Dùng `initial={false}` thì framer-motion render thẳng giá trị `animate` (opacity 1) cả lúc SSG lẫn client, không cần gỡ `motion.div`.

**Nội dung văn bản dưới đây đã được coordinator kiểm chứng tên menu. Chép đúng nguyên văn, không thêm bước, không thêm tên phần mềm, không viết thêm câu.** Được phép chỉnh khoảng trắng/xuống dòng JSX.

## Files allowed to edit

- `src/pages/TelexGuide.tsx`
- `src/pages/VniGuide.tsx`
- `src/pages/PostureGuide.tsx` (chỉ dòng `initial=`)
- `src/pages/FjRidgeGuide.tsx` (chỉ dòng `initial=`)
- `src/pages/KidsRoadmap.tsx` (chỉ dòng `initial=`)
- `src/pages/TelexTable.tsx` (chỉ dòng `initial=`)
- `src/pages/VniTable.tsx` (chỉ dòng `initial=`)

DO NOT edit: `src/components/HomePage.tsx` (animation chuyển tab là cố ý), `src/components/*`, `src/routes.tsx`, `scripts/gen-sitemap.mjs`, `index.html`, mọi file alias `practice`.

## Read-only files (reference)

- `src/pages/TelexGuide.tsx` 17–38 (`faqs`), 51–58 (`buildGuideSchemas`, `dateModified: '2026-08-13'`), 64–68 (`motion.div initial`), 183–193 (mục "5. Cách gõ Telex trên điện thoại" — sẽ bị thay), 195–210 (mục 6, 7), 212–222 (render FAQ).
- `src/pages/VniGuide.tsx` 13–30 (`faqs`), 43–50 (`dateModified`), 56–59 (`motion.div initial`), 150–164 (mục 4), 166–172 (mục "5. Nên chọn VNI hay Telex?").
- Style tham khảo: H2 = `style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}`; khung = `style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px', marginTop: '20px' }}`. H3 mới dùng `style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', margin: '24px 0 10px' }}`; `<ol>` dùng `style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.7' }}`.

## Requirements

### R1. `TelexGuide.tsx` — thay nguyên section "5. Cách gõ Telex trên điện thoại" (dòng 183–193) bằng:

H2: `5. Cách bật kiểu gõ Telex trên máy tính và điện thoại`

Đoạn mở: `Muốn gõ Telex, máy cần một bộ gõ tiếng Việt đang ở chế độ Telex. Chọn đúng mục theo thiết bị bạn dùng:`

H3 `Windows 11` — `<ol>`:
1. `Mở Settings (Cài đặt) → Time & language → Language & region.`
2. `Bấm Add a language, chọn Tiếng Việt. Windows cài sẵn bàn phím Vietnamese Telex.`
3. `Nhấn phím Windows + Space để chuyển giữa tiếng Anh và tiếng Việt.`
4. `Nếu dùng Unikey hoặc EVKey: chọn Kiểu gõ Telex và Bảng mã Unicode.`

H3 `macOS (MacBook, iMac)` — `<ol>`:
1. `Mở Cài đặt hệ thống → Bàn phím.`
2. `Ở mục Nguồn nhập bấm Sửa, rồi bấm dấu +.`
3. `Chọn Tiếng Việt → Telex, bấm Thêm. Chọn Telex đơn giản nếu không muốn phím [ và ] biến thành ơ, ư.`
4. `Chuyển nguồn nhập bằng phím Globe (Fn) hoặc Control + Space.`

H3 `iPhone, iPad` — `<ol>`:
1. `Mở Cài đặt → Cài đặt chung → Bàn phím → Bàn phím → Thêm bàn phím mới.`
2. `Chọn Tiếng Việt, rồi chọn kiểu Telex.`
3. `Khi gõ, chạm giữ biểu tượng quả địa cầu ở góc dưới bên trái để đổi bàn phím.`

H3 `Android (Gboard, Laban Key)` — `<ol>`:
1. `Gboard: mở cài đặt Gboard → Ngôn ngữ → Thêm bàn phím → Tiếng Việt. Bàn phím tiếng Việt của Gboard gõ theo kiểu Telex.`
2. `Laban Key: mở ứng dụng Laban Key → Kiểu gõ → Telex.`
3. `Sau khi bật, cách gõ dấu giống hệt trên máy tính: s = sắc, f = huyền, aa = â.`

Khung (div style khung) có `<p>` in đậm tiêu đề `Telex là kiểu gõ, không phải bảng mã` rồi `<p>`:
`Kiểu gõ (Telex, VNI) là cách bấm phím để ra dấu. Bảng mã là cách máy lưu chữ có dấu. Dù gõ Telex hay VNI, hãy chọn bảng mã Unicode: đây là chuẩn chung của Windows, macOS, điện thoại và web. Chọn nhầm bảng mã cũ như TCVN3 hay VNI Windows thì chữ sẽ hiện thành ký tự lạ khi gửi sang máy khác.`

### R2. `TelexGuide.tsx` — `faqs`: sửa câu cuối và thêm 2 câu

- Giữ nguyên 4 câu đầu.
- Câu "Làm sao để gõ Telex trên điện thoại?" giữ q, đổi a thành: `Trên iPhone vào Cài đặt → Cài đặt chung → Bàn phím → Thêm bàn phím mới → Tiếng Việt → Telex. Trên Android dùng Gboard (thêm bàn phím Tiếng Việt) hoặc Laban Key (Kiểu gõ → Telex). Sau đó gõ y hệt như trên máy tính: s = sắc, f = huyền, aa = â.`
- Thêm cuối mảng:
  - q `Kiểu gõ Telex dùng bảng mã gì?` — a `Dùng bảng mã Unicode. Telex chỉ là kiểu gõ, tức cách bấm phím ra dấu; Unicode là bảng mã chuẩn của Windows, macOS, điện thoại và web nên chữ gõ ra hiển thị đúng ở mọi nơi.`
  - q `Cách bật Telex trên Windows 11 như thế nào?` — a `Vào Settings → Time & language → Language & region và thêm Tiếng Việt. Windows cài sẵn bàn phím Vietnamese Telex; nhấn Windows + Space để chuyển giữa tiếng Anh và tiếng Việt.`

→ `faqs` có đúng 7 phần tử.

### R3. `VniGuide.tsx` — chèn section mới giữa mục 4 (kết thúc dòng 164) và mục "5. Nên chọn VNI hay Telex?"; đổi tiêu đề mục cũ thành `6. Nên chọn VNI hay Telex?`

H2: `5. Cách bật kiểu gõ VNI trên máy tính và điện thoại`

Đoạn mở: `Phím số chỉ ra dấu khi bộ gõ tiếng Việt đang ở chế độ VNI. Chọn đúng mục theo thiết bị bạn dùng:`

H3 `Windows 11` — `<ol>`:
1. `Mở Settings (Cài đặt) → Time & language → Language & region, thêm Tiếng Việt nếu chưa có.`
2. `Bấm dấu … cạnh Tiếng Việt → Language options → Add a keyboard, chọn Vietnamese Number Key-based. Đây chính là kiểu gõ VNI.`
3. `Nhấn phím Windows + Space để chuyển sang bàn phím vừa thêm.`
4. `Nếu dùng Unikey hoặc EVKey: chọn Kiểu gõ VNI và Bảng mã Unicode.`

H3 `macOS (MacBook, iMac)` — `<ol>`:
1. `Mở Cài đặt hệ thống → Bàn phím.`
2. `Ở mục Nguồn nhập bấm Sửa, rồi bấm dấu +.`
3. `Chọn Tiếng Việt → VNI, bấm Thêm.`
4. `Chuyển nguồn nhập bằng phím Globe (Fn) hoặc Control + Space.`

H3 `iPhone, iPad` — `<ol>`:
1. `Mở Cài đặt → Cài đặt chung → Bàn phím → Bàn phím → Thêm bàn phím mới.`
2. `Chọn Tiếng Việt, rồi chọn kiểu VNI.`
3. `Khi gõ, chạm giữ biểu tượng quả địa cầu ở góc dưới bên trái để đổi bàn phím.`

H3 `Android` — `<ol>`:
1. `Laban Key: mở ứng dụng Laban Key → Kiểu gõ → VNI.`
2. `Gboard: mở cài đặt Gboard → Ngôn ngữ → Thêm bàn phím → Tiếng Việt. Nếu không thấy lựa chọn VNI, hãy dùng Laban Key.`

Khung, tiêu đề in đậm `VNI là kiểu gõ, không phải bảng mã`, `<p>`:
`Kiểu gõ VNI là cách bấm phím số để ra dấu. Bảng mã là cách máy lưu chữ có dấu. Hãy luôn chọn bảng mã Unicode. Bảng mã "VNI Windows" trong Unikey là bảng mã cũ, trùng tên với kiểu gõ nhưng không liên quan: chọn nhầm thì chữ sẽ hiện thành ký tự lạ khi gửi sang máy khác.`

### R4. `VniGuide.tsx` — `faqs`

- Câu "Có gõ được VNI trên điện thoại không?" giữ q, đổi a thành: `Có. Trên iPhone vào Cài đặt → Cài đặt chung → Bàn phím → Thêm bàn phím mới → Tiếng Việt → VNI. Trên Android dùng Laban Key (Kiểu gõ → VNI). Cách bỏ dấu bằng phím số giống hệt trên máy tính.`
- Thêm cuối mảng:
  - q `Gõ VNI nên chọn bảng mã nào?` — a `Chọn bảng mã Unicode. Bảng mã "VNI Windows" là bảng mã cũ chỉ trùng tên với kiểu gõ VNI; dùng nó thì chữ dễ bị lỗi font khi mở trên máy khác.`
  - q `Cách bật kiểu gõ VNI trên Windows 11?` — a `Vào Settings → Time & language → Language & region, bấm dấu … cạnh Tiếng Việt → Language options → Add a keyboard và chọn Vietnamese Number Key-based. Nhấn Windows + Space để chuyển bàn phím.`

→ `faqs` có đúng 6 phần tử.

### R5. `dateModified`

Trong `buildGuideSchemas` của cả `TelexGuide.tsx` và `VniGuide.tsx`: `dateModified: '2026-09-27'`. Không đổi `datePublished`.

### R6. Bỏ `opacity:0` ở SSG — 7 file trang

Trong mỗi file `src/pages/{TelexGuide,VniGuide,PostureGuide,FjRidgeGuide,KidsRoadmap,TelexTable,VniTable}.tsx`, ở `motion.div` wrapper ngoài cùng của component: đổi `initial={{ opacity: 0 }}` (hoặc `initial={{ opacity: 0, ... }}`) thành `initial={false}`. Giữ `animate`. Không gỡ `motion.div`, không đổi import. Nếu một file có `motion.*` khác bên trong với `initial` riêng thì để nguyên và ghi vào Concerns.

## Constraints

- Không thêm dependency. Không `any`, `@ts-ignore`, `eslint-disable`.
- Không thêm link mới, ảnh, bảng. Không đổi `Seo` title/description.
- Văn bản tiếng Việt đủ dấu, chép nguyên văn spec; mũi tên dùng ký tự `→`.
- Mỗi `<li>` trong `<ol>` là 1 bước; key không cần (danh sách tĩnh viết tay, không `.map`).

## Edge cases this change opens up

1. **FAQPage phải vẫn là 1 khối mỗi trang và text schema trùng text hiển thị.** Schema sinh từ `faqs` (`TelexGuide.tsx:40-48`, `VniGuide.tsx:32-40`) và phần hiển thị `.map` cùng mảng (`TelexGuide.tsx:215`, `VniGuide.tsx:177`) nên chỉ cần sửa mảng; không được viết FAQ mới thành JSX tay. Khóa bằng tiêu chí đếm `"FAQPage"` = 1 và đếm `"@type":"Question"` = 7 / 6 trong `dist`.
2. **`key={f.q}`** ở render FAQ: 2 câu mới có q khác mọi q cũ → không trùng key. Không đặt q trùng.
3. **Sitemap lastmod** (`scripts/gen-sitemap.mjs`) lấy ngày commit của file nguồn trang → tự đổi sau commit, không cần sửa script.
4. **`initial={false}` và SSR:** framer-motion render giá trị `animate` ngay → HTML SSG không còn `opacity:0`; phía client không còn fade-in khi vào trang (chấp nhận, không phải lỗi). Khóa bằng tiêu chí `grep -o 'opacity:0'` = 0 cho 7 file dist.
5. **Mobile 375px:** H3 và `<ol>` là text thuần trong wrapper đã có `width: '100%'` → không gây cuộn ngang; không thêm phần tử có `minWidth`.

## Non-goals

- Không đụng `HomePage.tsx` (có `opacity: 0` ở panel chuyển tab, là hiệu ứng cố ý, ngoài wrapper nội dung chính).
- Không thêm trang, không sửa `guides-data.ts`, `RelatedGuides`, `routes.tsx`.
- Không viết thêm nội dung ngoài phần spec cho sẵn.

## Acceptance criteria

(SSG dồn DOM vào ít dòng: đếm bằng `grep -o … | wc -l`, KHÔNG dùng `grep -c`.)

- [ ] `npm run lint` → exit 0
- [ ] `npm test` → exit 0
- [ ] `npm run build` → exit 0
- [ ] `grep -o '"FAQPage"' dist/huong-dan-telex.html | wc -l` → `1`
- [ ] `grep -o '"FAQPage"' dist/huong-dan-vni.html | wc -l` → `1`
- [ ] `grep -o '"@type":"Question"' dist/huong-dan-telex.html | wc -l` → `7`
- [ ] `grep -o '"@type":"Question"' dist/huong-dan-vni.html | wc -l` → `6`
- [ ] `grep -o 'Cách bật kiểu gõ Telex trên máy tính và điện thoại' dist/huong-dan-telex.html | wc -l` → `1`
- [ ] `grep -o 'Cách bật kiểu gõ VNI trên máy tính và điện thoại' dist/huong-dan-vni.html | wc -l` → `1`
- [ ] `grep -o 'Vietnamese Number Key-based' dist/huong-dan-vni.html | wc -l` → ≥ 2
- [ ] `grep -o '6. Nên chọn VNI hay Telex?' dist/huong-dan-vni.html | wc -l` → `1`
- [ ] `grep -o '<h3' dist/huong-dan-telex.html | wc -l` → ≥ 18
- [ ] `grep -o '2026-09-27' dist/huong-dan-telex.html | wc -l` → ≥ 1
- [ ] `grep -o '2026-09-27' dist/huong-dan-vni.html | wc -l` → ≥ 1
- [ ] `cat dist/huong-dan-telex.html dist/huong-dan-vni.html dist/tu-the-go-phim.html dist/bi-mat-phim-f-j.html dist/tap-go-10-ngon-cho-be.html dist/bang-go-telex.html dist/bang-go-vni.html | grep -o 'opacity:0' | wc -l` → `0`
- [ ] `grep -nE "initial=\{\{ ?opacity: ?0" src/pages/TelexGuide.tsx src/pages/VniGuide.tsx src/pages/PostureGuide.tsx src/pages/FjRidgeGuide.tsx src/pages/KidsRoadmap.tsx src/pages/TelexTable.tsx src/pages/VniTable.tsx` → 0 lines
- [ ] `git status --porcelain -- src/components src/routes.tsx scripts index.html` → 0 lines

## Verify

```bash
npm run lint && npm test && npm run build
```
