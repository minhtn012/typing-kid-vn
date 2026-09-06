[SKILL] Activating: scout — Reason: Khảo sát và audit kỹ thuật SEO trong vùng code chỉ định
### PHẦN I: TỔNG QUAN VÙNG CODE (SCOUT TASK SPEC)

#### (1) Entry point & route/màn hình trong vùng
- **Entry point ứng dụng:** `src/main.tsx:11` sử dụng `ViteReactSSG({ routes })` để xuất `createRoot` cho cả quá trình build SSG và hydrate phía client.
- **Root Layout:** `src/components/RootLayout.tsx:11-18` bọc toàn bộ ứng dụng bằng `<Outlet />` (`src/components/RootLayout.tsx:14`) và gắn `<Analytics />` Vercel (`src/components/RootLayout.tsx:15`).
- **Danh sách màn hình / route:** 5 route được khai báo tập trung trong `src/routes.tsx:15-38`:
  1. `/` (trang chủ): render `<Seo />` + `<HomeView />` (`src/routes.tsx:20-31`).
  2. `tu-the-go-phim`: render `<PostureGuide />` (`src/routes.tsx:33`).
  3. `huong-dan-telex`: render `<TelexGuide />` (`src/routes.tsx:34`).
  4. `huong-dan-vni`: render `<VniGuide />` (`src/routes.tsx:35`).
  5. `bi-mat-phim-f-j`: render `<FjRidgeGuide />` (`src/routes.tsx:36`).

#### (2) Luồng dữ liệu: store/state → component → action
- **Khởi tạo SSR an toàn:** Trong `src/components/HomeView.tsx:27-28`, `view` được khởi tạo cố định là `'home'` và `selectedModeId` là `LESSON_MODES[0].id` để tránh truy cập `window` trên server SSG.
- **Đồng bộ URL query params sang state:** `src/components/HomeView.tsx:31-42` dùng `useEffect` đọc `location.search` (`mode` hoặc `open`) để kích hoạt `setView('practice')` và cập nhật `selectedModeId`.
- **Đổi Tab trên Trang chủ:** `src/components/HomePage.tsx:41-54` quản lý state `activeTab`; khi chuyển tab, `useEffect` gọi `window.history.replaceState` để cập nhật param `?tab=` lên URL mà không tải lại trang.
- **Phân nhánh thiết bị di động:** `src/components/HomeView.tsx:63-65` nhận cờ `isMobile` từ hook `useIsMobile()`. Nếu `isMobile && view === 'practice'`, luồng bị chặn và hiển thị `<DesktopNudge />` (`src/components/DesktopNudge.tsx:20-106`).
- **Sinh Structured Data (JSON-LD):** `src/components/guide-schema.ts:31-57` nhận metadata bài viết, sinh 2 schema objects (`BreadcrumbList`, `Article`), chuyển vào `<JsonLd data={...} />` (`src/components/JsonLd.tsx:20-26`) để render ra thẻ `<script type="application/ld+json">`.

#### (3) Type/contract chính
- `RouteRecord`: `src/routes.tsx:1,15` (từ thư viện `vite-react-ssg`) — định nghĩa cấu trúc mảng route SSG.
- `SeoProps`: `src/components/Seo.tsx:24-31` — các trường `title: string`, `description: string`, `path: string`.
- `JsonLdProps`: `src/components/JsonLd.tsx:15-18` — trường `data: Record<string, unknown>`.
- `GuideSchemaMeta`: `src/components/guide-schema.ts:17-29` — các trường `path`, `breadcrumbName`, `headline`, `description`, `datePublished`, `dateModified`.
- `GuideItem`: `src/components/RelatedGuides.tsx:11-16` — các trường `path: string`, `title: string`, `desc: string`.
- `ViewMode`: `src/components/HomeView.tsx:10` — union type `'home' | 'practice'`.

#### (4) Nơi đặt rule nghiệp vụ
- `Seo`: `src/components/Seo.tsx:33-53` — Chèn `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph và Twitter vào `<head>` thông qua component `<Head>` của `vite-react-ssg`.
- `buildGuideSchemas`: `src/components/guide-schema.ts:31-57` — Chuẩn hoá cấu trúc BreadcrumbList (2 cấp) và Article (headline, description, author, publisher, datePublished, dateModified).
- `buildTelexTable`: `src/pages/TelexGuide.tsx:38-45` — Duyệt mảng `VOWEL_GROUPS` tra cứu tổ hợp phím gõ từ `TELEX_RULES` để kết xuất bảng quy tắc gõ Telex.
- `buildVniTable`: `src/pages/VniGuide.tsx:36-43` — Duyệt mảng `VOWEL_GROUPS` tra cứu tổ hợp phím gõ từ `VNI_RULES` để kết xuất bảng quy tắc gõ VNI.
- `DesktopNudge chặn mobile`: `src/components/HomeView.tsx:60-69` — Chặn toàn bộ thao tác mở chế độ luyện gõ/game trên màn hình mobile (≤768px), điều hướng quay về trang chủ hoặc đọc 4 trang cẩm nang.

#### (5) Điểm nối ra NGOÀI vùng
- `src/main.tsx:2`: import file stylesheet `src/index.css`.
- `src/components/HomeView.tsx:4`: import component `src/components/PracticeSession.tsx`.
- `src/components/HomeView.tsx:5`: import component `src/components/GameSession.tsx`.
- `src/components/HomeView.tsx:7`: import hook `src/hooks/useIsMobile.ts`.
- `src/components/HomeView.tsx:8`: import hằng số `LESSON_MODES` từ `src/constants.ts`.
- `src/components/HomePage.tsx:5`: import hằng số `LESSON_MODES` từ `src/constants.ts`.
- `src/pages/TelexGuide.tsx:9`: import hằng số `TELEX_RULES` từ `src/constants.ts`.
- `src/pages/VniGuide.tsx:9`: import hằng số `VNI_RULES` từ `src/constants.ts`.
- `index.html:6`: tham chiếu tài nguyên icon `public/favicon.svg`.

---

### PHẦN II: AUDIT KỸ THUẬT SEO

#### 1. Bảng ROUTE
*Tổng số: 5 route*

| Path | Component | Title (literal) | Meta Description (literal) | Canonical | OG có riêng? | JSON-LD Types | H1 Text | Số H2 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | `HomeView` (`src/routes.tsx:29`) | `"Gõ 10 ngón tiếng Việt miễn phí \| Typing Kid VN"` (`src/routes.tsx:25`) | `"Website học gõ 10 ngón tiếng Việt trực tuyến miễn phí cho trẻ em và người mới bắt đầu. Luyện gõ mười ngón nhanh, chính xác chuẩn Telex và VNI."` (`src/routes.tsx:26`) | `https://type.scala.vn/` (`src/components/Seo.tsx:35,41`) | CÓ (`og:title`, `og:desc`, `og:url` riêng tại `src/components/Seo.tsx:44-46`) | `SoftwareApplication` (`index.html:31`), `FAQPage` (`index.html:47`) | `"Luyện gõ 10 ngón tiếng Việt - Phần mềm gõ mười ngón miễn phí"` (`src/components/HomePage.tsx:73`) | 5 (`src/components/HomePage.tsx:137,186,251,271,290`) |
| `/tu-the-go-phim` | `PostureGuide` (`src/routes.tsx:33`) | `"Tư thế ngồi & cách đặt tay gõ 10 ngón đúng \| Typing Kid VN"` (`src/pages/PostureGuide.tsx:28`) | `"Hướng dẫn tư thế ngồi và cách đặt tay chuẩn trên hàng phím cơ sở (ASDF - JKL;) để gõ 10 ngón nhanh, đúng và không mỏi tay."` (`src/pages/PostureGuide.tsx:29`) | `https://type.scala.vn/tu-the-go-phim` (`src/pages/PostureGuide.tsx:30`) | CÓ (`src/components/Seo.tsx:44-46`) | Tĩnh: `SoftwareApplication`, `FAQPage` (`index.html:31,47`). Động: `BreadcrumbList`, `Article` (`src/pages/PostureGuide.tsx:10-18,33-35`) | `"Hướng dẫn Tư thế ngồi & Cách đặt tay khi gõ 10 ngón"` (`src/pages/PostureGuide.tsx:41-43`) | 4 (3 h2 nội dung tại `src/pages/PostureGuide.tsx:56,66,87` + 1 h2 `RelatedGuides:35`) |
| `/huong-dan-telex` | `TelexGuide` (`src/routes.tsx:34`) | `"Bảng chữ Telex & cách gõ Telex nhanh \| Typing Kid VN"` (`src/pages/TelexGuide.tsx:108`) | `"Bảng chữ Telex đầy đủ: cách gõ 5 dấu sắc, huyền, hỏi, ngã, nặng và â/ê/ô/ơ/ư. Hướng dẫn cách đánh bàn phím Telex nhanh, có ví dụ và mẹo nhớ."` (`src/pages/TelexGuide.tsx:109`) | `https://type.scala.vn/huong-dan-telex` (`src/pages/TelexGuide.tsx:110`) | CÓ (`src/components/Seo.tsx:44-46`) | Tĩnh: `SoftwareApplication`, `FAQPage` (`index.html:31,47`). Động: `FAQPage` (`src/pages/TelexGuide.tsx:77,113`), `BreadcrumbList`, `Article` (`src/pages/TelexGuide.tsx:86-93,115-117`) | `"Hướng dẫn gõ Tiếng Việt kiểu Telex - Cách gõ nhanh nhất"` (`src/pages/TelexGuide.tsx:124-126`) | 9 (8 h2 nội dung tại `src/pages/TelexGuide.tsx:139,160,175,207,220,232,241,249` + 1 h2 `RelatedGuides:35`) |
| `/huong-dan-vni` | `VniGuide` (`src/routes.tsx:35`) | `"Bảng dấu VNI & cách gõ VNI nhanh \| Typing Kid VN"` (`src/pages/VniGuide.tsx:98`) | `"Bảng dấu VNI đầy đủ: cách gõ dấu bằng phím số 1-5 và chữ â, ê, ô, ơ, ư, đ (6-9). Hướng dẫn cách gõ VNI nhanh cho người mới, kèm ví dụ."` (`src/pages/VniGuide.tsx:99`) | `https://type.scala.vn/huong-dan-vni` (`src/pages/VniGuide.tsx:100`) | CÓ (`src/components/Seo.tsx:44-46`) | Tĩnh: `SoftwareApplication`, `FAQPage` (`index.html:31,47`). Động: `FAQPage` (`src/pages/VniGuide.tsx:67,103`), `BreadcrumbList`, `Article` (`src/pages/VniGuide.tsx:76-83,105-107`) | `"Hướng dẫn gõ Tiếng Việt kiểu VNI - Lựa chọn cho người thích phím số"` (`src/pages/VniGuide.tsx:114-116`) | 7 (6 h2 nội dung tại `src/pages/VniGuide.tsx:129,141,152,185,201,209` + 1 h2 `RelatedGuides:35`) |
| `/bi-mat-phim-f-j` | `FjRidgeGuide` (`src/routes.tsx:36`) | `"Bí mật phím F và J: gõ không nhìn bàn phím \| Typing Kid VN"` (`src/pages/FjRidgeGuide.tsx:28`) | `"Vì sao phím F và J có gờ nổi? Tìm hiểu cách dùng hai phím định vị này để đặt tay đúng và gõ 10 ngón không cần nhìn bàn phím."` (`src/pages/FjRidgeGuide.tsx:29`) | `https://type.scala.vn/bi-mat-phim-f-j` (`src/pages/FjRidgeGuide.tsx:30`) | CÓ (`src/components/Seo.tsx:44-46`) | Tĩnh: `SoftwareApplication`, `FAQPage` (`index.html:31,47`). Động: `BreadcrumbList`, `Article` (`src/pages/FjRidgeGuide.tsx:11-18,33-35`) | `"Bí mật của hai phím F và J: Chìa khóa để gõ không nhìn bàn phím"` (`src/pages/FjRidgeGuide.tsx:41-43`) | 3 (2 h2 nội dung tại `src/pages/FjRidgeGuide.tsx:56,71` + 1 h2 `RelatedGuides:35`) |

---

#### 2. Cơ chế sinh meta (Seo.tsx, JsonLd.tsx, guide-schema.ts) & Canonical
- **Cơ chế:**
  - `Seo.tsx` dùng `<Head>` của `vite-react-ssg` (`src/components/Seo.tsx:2,38-51`), KHÔNG dùng React 19 auto-hoist. Rationale tại `src/components/Seo.tsx:13-17`: khi build tĩnh bằng `renderToString`, auto-hoist của React 19 giữ thẻ trong `<body>`; `<Head>` đưa thẳng thẻ vào `<head>` của HTML tĩnh.
  - `JsonLd.tsx` nhúng trực tiếp `<script type="application/ld+json">` qua `dangerouslySetInnerHTML` trong DOM (`src/components/JsonLd.tsx:21-26`).
  - `guide-schema.ts:31-57` là hàm helper sinh ra 2 schemas độc lập (`BreadcrumbList` và `Article`).
- **Nguy cơ trùng thẻ (index.html vs component):**
  - Thẻ Meta & Title: **KHÔNG TRÙNG**. `index.html:9-14` cố tình bỏ trống `<title>`, `<meta name="description">`, `<link rel="canonical">` và các thẻ `og:` động để `<Seo>` bơm vào.
  - Schema JSON-LD: **CÓ XUNG ĐỘT TRÙNG LẶP**. `index.html:44-75` chứa sẵn một schema tĩnh `@type: "FAQPage"`. Khi bot vào `/huong-dan-telex` hoặc `/huong-dan-vni`, component lại chèn thêm một khối `@type: "FAQPage"` động khác (`src/pages/TelexGuide.tsx:75-83,113`, `src/pages/VniGuide.tsx:65-73,103`), dẫn đến 2 khối `FAQPage` cạnh tranh nhau trên cùng 1 URL.
- **Tính nhất quán của Canonical với vercel.json cleanUrls:**
  - `vercel.json:2` cấu hình `"cleanUrls": true` (loại bỏ đuôi `.html` và dấu `/` ở cuối các trang con).
  - `src/components/Seo.tsx:35`: `url = `${SITE_URL}${path}``.
  - Trang chủ `path="/"` -> `https://type.scala.vn/` (giữ nguyên trailing slash cho root).
  - Các trang con `path="/..."` -> không có trailing slash (khớp 100% với `public/sitemap.xml:10,16,22,28`).
  - **Kết luận:** Canonical RẤT NHẤT QUÁN với `cleanUrls`.

---

#### 3. Bảng Internal Links & Phân tích Orphan / Dead-end

| Từ trang | Đến trang | Anchor Text | Vị trí định nghĩa |
| :--- | :--- | :--- | :--- |
| `/` (Trang chủ) | `/tu-the-go-phim` | `"Tư thế ngồi"` | Nav header: `src/components/HomePage.tsx:69` |
| `/` (Trang chủ) | `/huong-dan-telex` | `"Cách gõ Telex"` | Nav header: `src/components/HomePage.tsx:70` |
| `/` (Trang chủ) | `/huong-dan-vni` | `"Cách gõ VNI"` | Nav header: `src/components/HomePage.tsx:71` |
| `/` (Trang chủ) | `/tu-the-go-phim` | `"1. Tư thế ngồi & Cách đặt tay"` | Guides section: `src/components/HomePage.tsx:192,198` |
| `/` (Trang chủ) | `/huong-dan-telex` | `"2. Hướng dẫn gõ kiểu Telex"` | Guides section: `src/components/HomePage.tsx:206,212` |
| `/` (Trang chủ) | `/huong-dan-vni` | `"3. Hướng dẫn gõ kiểu VNI"` | Guides section: `src/components/HomePage.tsx:220,226` |
| `/` (Trang chủ) | `/bi-mat-phim-f-j` | `"4. Bí mật của hai phím F và J"` | Guides section: `src/components/HomePage.tsx:234,240` |
| `/` (Mobile Nudge) | `/tu-the-go-phim`, `/huong-dan-telex`, `/huong-dan-vni`, `/bi-mat-phim-f-j` | Tiêu đề các bài tương ứng | `src/components/DesktopNudge.tsx:80-101` |
| `/tu-the-go-phim` | `/` | `"Quay lại trang chủ"` / `"Bắt đầu luyện tập ngay"` | `src/pages/PostureGuide.tsx:37,96` |
| `/tu-the-go-phim` | `/huong-dan-telex`, `/huong-dan-vni`, `/bi-mat-phim-f-j` | Tiêu đề từng bài trong thẻ liên quan | `src/components/RelatedGuides.tsx:19-22,39-56` |
| `/huong-dan-telex` | `/` | `"Quay lại trang chủ"` / `"Vào bài học Telex"` (`/?tab=telex`) | `src/pages/TelexGuide.tsx:120,265` |
| `/huong-dan-telex` | `/huong-dan-vni` | `"hướng dẫn gõ kiểu VNI"` | Inline mục 7: `src/pages/TelexGuide.tsx:244` |
| `/huong-dan-telex` | `/tu-the-go-phim`, `/huong-dan-vni`, `/bi-mat-phim-f-j` | Tiêu đề từng bài trong thẻ liên quan | `src/components/RelatedGuides.tsx:19-22,39-56` |
| `/huong-dan-vni` | `/` | `"Quay lại trang chủ"` / `"Vào bài học VNI"` (`/?tab=vni`) | `src/pages/VniGuide.tsx:110,225` |
| `/huong-dan-vni` | `/huong-dan-telex` | `"hướng dẫn gõ kiểu Telex"` | Inline mục 5: `src/pages/VniGuide.tsx:204` |
| `/huong-dan-vni` | `/tu-the-go-phim`, `/huong-dan-telex`, `/bi-mat-phim-f-j` | Tiêu đề từng bài trong thẻ liên quan | `src/components/RelatedGuides.tsx:19-22,39-56` |
| `/bi-mat-phim-f-j` | `/` | `"Quay lại trang chủ"` / `"Gõ tự do"` (`/?tab=custom`) / `"Luyện hàng phím giữa ngay"` (`/?tab=basic`) | `src/pages/FjRidgeGuide.tsx:37,87,105` |
| `/bi-mat-phim-f-j` | `/tu-the-go-phim`, `/huong-dan-telex`, `/huong-dan-vni` | Tiêu đề từng bài trong thẻ liên quan | `src/components/RelatedGuides.tsx:19-22,39-56` |

- **Kiểm tra Orphan & Dead-end:**
  - **Trang Orphan:** **KHÔNG CÓ**. Toàn bộ 5 trang đều được trỏ tới từ Trang chủ và liên kết chéo qua lại từ component `RelatedGuides`. (Lưu ý nhỏ: Header menu ở `src/components/HomePage.tsx:68-72` thiếu link tới `/bi-mat-phim-f-j`, nhưng link này vẫn có ở danh sách hướng dẫn `src/components/HomePage.tsx:234`).
  - **Trang Dead-end:** **KHÔNG CÓ**. Cả 4 trang cẩm nang đều có nút quay lại trang chủ, nút CTA dẫn vào bài học và khối link sang 3 bài viết khác.

---

#### 4. Hình ảnh trong src/pages + home

| Trang | File : Dòng | `src` | Có `alt`? | Set `width` / `height`? | `loading="lazy"`? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Trang chủ (`/`) | `src/components/HomePage.tsx` | Không có thẻ `<img>` (chỉ dùng Lucide SVG icons) | N/A | N/A | N/A |
| `/tu-the-go-phim` | `src/pages/PostureGuide.tsx:48-51` | `"/guides/posture.png"` | CÓ (`"Minh họa tư thế ngồi gõ phím chuẩn"`) | KHÔNG (chỉ có style `width: 100%`) | KHÔNG |
| `/huong-dan-telex` | `src/pages/TelexGuide.tsx:131-134` | `"/guides/keyboard.png"` | CÓ (`"Bàn phím cơ hiện đại hỗ trợ gõ Telex"`) | KHÔNG (chỉ có style `width: 100%`) | KHÔNG |
| `/huong-dan-vni` | `src/pages/VniGuide.tsx:121-124` | `"/guides/keyboard.png"` | CÓ (`"Bàn phím cơ hiện đại hỗ trợ gõ VNI"`) | KHÔNG (chỉ có style `width: 100%`) | KHÔNG |
| `/bi-mat-phim-f-j` | `src/pages/FjRidgeGuide.tsx:48-51` | `"/guides/fj-ridges.png"` | CÓ (`"Cận cảnh gờ nổi trên phím F và J"`) | KHÔNG (chỉ có style `width: 100%`) | KHÔNG |

*Đánh giá:* Toàn bộ ảnh đều có `alt` mô tả ngữ nghĩa tốt, nhưng **thiếu thuộc tính `width`/`height`** (gây rủi ro CLS khi render hình ảnh) và **không set `loading="lazy"`**.

---

#### 5. Sitemap & robots.txt
- **Đối chiếu `public/sitemap.xml:3-32` vs `src/routes.tsx:15-38`:**
  - `public/sitemap.xml` chứa đúng 5 URLs: `https://type.scala.vn/`, `https://type.scala.vn/tu-the-go-phim`, `https://type.scala.vn/huong-dan-telex`, `https://type.scala.vn/huong-dan-vni`, `https://type.scala.vn/bi-mat-phim-f-j`.
  - Khớp chính xác 5/5 route, không thừa, không thiếu URL nào.
- **Cơ chế cập nhật `lastmod`:**
  - **KHÔNG tự động cập nhật**. `public/sitemap.xml` là file tĩnh viết tay.
  - Trong `vite.config.ts:5-7` không có bất kỳ plugin sitemap generator nào.
  - Xảy ra lệch dữ liệu: `public/sitemap.xml:5,11,17,23,29` ghi cố định `2026-06-25`, trong khi `src/pages/TelexGuide.tsx:92` và `src/pages/VniGuide.tsx:82` đã cập nhật `dateModified` thành `2026-08-13`.
- **`public/robots.txt`:**
  - Cấu hình 4 dòng (`public/robots.txt:1-4`): Cho phép mọi bot (`User-agent: *`, `Allow: /`) và khai báo chính xác `Sitemap: https://type.scala.vn/sitemap.xml`. Đạt chuẩn.

---

#### 6. Route 404 / NotFound & Vercel Rewrite vs SSG
- **Route 404 / NotFound:** **KHÔNG TỒN TẠI**. Trong `src/routes.tsx:15-38` không khai báo route bắt mọi URL dạng `*` (`{ path: '*', element: <NotFound /> }`).
- **Phân tích Vercel Rewrite (`vercel.json:3-8`) vs file SSG:**
  - Quy tắc định tuyến của Vercel: Các tệp tĩnh sinh ra từ build SSG (`dist/index.html`, `dist/tu-the-go-phim.html`, ...) **luôn được ưu tiên phục vụ trước rewrites**. Do đó, với 5 route hợp lệ, Vercel trả về đúng file SSG tĩnh tương ứng, **KHÔNG bị rewrite đè lên**.
  - **Hệ quả nghiêm trọng:** Khi người dùng hoặc bot truy cập vào một URL sai/không tồn tại (ví dụ `/bai-viet-khong-ton-tai`), vì không có file tĩnh và không có route 404, rule rewrite `source: "/((?!assets/).*)"` sẽ đẩy về `/index.html` với status code **HTTP 200 OK** (Soft 404), gây hại nghiêm trọng cho chỉ mục tìm kiếm của Google.

---

#### 7. Checklist Chuẩn SEO

| Hạng mục | Trạng thái | Chi tiết & File : Dòng |
| :--- | :---: | :--- |
| `lang` trên thẻ `<html>` | **CÓ** | `<html lang="vi">` tại `index.html:2`. |
| Thẻ `<link rel="alternate" hreflang>` | **KHÔNG** | Chưa khai báo trong cả `index.html:4-77` và `src/components/Seo.tsx:38-51`. |
| `BreadcrumbList` Schema | **CÓ** | Khai báo trên 4 trang guide qua `src/components/guide-schema.ts:34-41` (trang chủ không cần vì là root). |
| `og:image` riêng per page | **KHÔNG** | Toàn bộ 5 trang đều dùng chung 1 ảnh tĩnh `https://type.scala.vn/og-image.png` khai báo tại `index.html:21,23` và `src/components/guide-schema.ts:14,48`. `Seo.tsx` không nhận prop `image`. |
| `Article` Schema (`datePublished` / `dateModified`) | **CÓ** | Khai báo đầy đủ trên 4 guide tại `src/components/guide-schema.ts:43-54` (`PostureGuide.tsx:16-17`, `TelexGuide.tsx:91-92`, `VniGuide.tsx:81-82`, `FjRidgeGuide.tsx:16-17`). |
| `preconnect` / `preload` fonts | **KHÔNG** | `index.html:4-27` không có thẻ `<link rel="preconnect">` hay preload web font nào. |
| Analytics script ảnh hưởng LCP | **KHÔNG** | `@vercel/analytics/react` (`src/components/RootLayout.tsx:2,15`) inject script bất đồng bộ (async), không chặn main thread parser nên không ảnh hưởng đến LCP của các file SSG tĩnh. |

---

### RỦI RO / BẪY KỸ THUẬT (≤8 DÒNG)
1. **Lỗi Soft 404 do Vercel rewrites:** URL không tồn tại bị rewrite về `index.html` trả HTTP 200 thay vì 404 do thiếu route `*` và trang 404 tĩnh.
2. **Xung đột 2 khối FAQPage Schema:** `index.html:44-75` nhúng `FAQPage` tĩnh chung, trong khi `TelexGuide.tsx:113` và `VniGuide.tsx:103` chèn thêm `FAQPage` riêng.
3. **Thiếu kích thước ảnh (width/height):** Cả 4 trang guide dùng `<img>` thiếu `width`/`height`, gây giật layout (CLS).
4. **Lệch ngày sitemap vs schema:** `sitemap.xml` ghi cố định `2026-06-25`, lệch với `dateModified` (`2026-08-13`) trong `Article` schema của Telex/VNI.
5. **Chia sẻ mạng xã hội thiếu ảnh riêng:** `Seo.tsx` không có thẻ `og:image`/`twitter:image` per-page khiến chia sẻ bài viết luôn ra ảnh chung của site.

---
Tool đã dùng: default_api:view_file (19 lần) | Số file đã mở: 19 file.

