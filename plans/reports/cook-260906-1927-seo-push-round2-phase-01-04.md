# Cook report — seo-push-round2, phase 01–04

**Ngày:** 06/09/2026 · **Plan:** `plans/260906-1115-seo-push-round2/plan.md` · **Branch:** main
**Kết quả:** phase 01–04 xong, 3 commit đã lên production. Phase 05 chờ mốc D+7 (~13/09), phase 06 để đợt 3.

## Commit

| SHA | Nội dung |
|---|---|
| `30a6866` | sitemap tự sinh lúc build, gỡ FAQPage lặp, title trang chủ theo query, fix cuộn ngang mobile |
| `4c448b2` | `/bang-go-telex`, `/bang-go-vni` in được + module bảng dùng chung |
| `197c405` | `/tap-go-10-ngon-cho-be` + link chéo từ trang chủ |

## Trạng thái live (đã `curl` xác nhận sau mỗi lần deploy)

| Kiểm | Kết quả |
|---|---|
| 8 route trả 200, HTML SSG | ✓ |
| `sitemap.xml` | 8 URL, lastmod từ git (2026-09-06), submit GSC `errors: 0` |
| FAQPage | `/` 1, `/huong-dan-telex` 1, `/huong-dan-vni` 1, 3 trang mới đúng như thiết kế (2 bảng 0, landing 1) |
| Title/description/canonical | riêng từng trang, description ≤ 156 ký tự |
| Cuộn ngang ở 375px | hết trên cả 8 route |

## Ngoài scope plan — đã làm, có lý do

1. **Fix cuộn ngang `/huong-dan-telex` và `/huong-dan-vni` ở 375px.** Smoke phát hiện; xác minh **có sẵn trên production** (`scrollWidth` 600 vs `innerWidth` 375), không phải hồi quy. Nguyên nhân: `#root` là flex column, wrapper trang guide chỉ có `maxWidth: 800px` nên bị co theo `min-content` = bảng `minWidth: 560px` + padding. Sửa: thêm `width: '100%'` vào wrapper 4 trang guide. Đây là lỗi mobile-first indexing trên 2 trang guide giá trị nhất và phase 02 vốn có bước kiểm 375px, nên xử lý trong phase 02.
2. **Thêm 3 thẻ vào khối "Cẩm nang" trang chủ** (user duyệt). Trang chủ có hai danh sách link độc lập; khối Cẩm nang hardcode 4 thẻ và không đọc `GUIDES`, nên `/bang-go-telex`, `/bang-go-vni` không có link nào từ trang chủ. Sau khi thêm, mọi trang nội dung đều được trang chủ link tới.

## Vận hành worker `agy`

| Run | Kết quả |
|---|---|
| dispatch `task-1-lookup-tables` | SUCCESS 314s, worker báo BLOCKED vì **tiêu chí spec sai** (dùng `grep -c` đếm số DÒNG, mà vite-react-ssg dồn cả DOM vào 1 dòng). 17/18 tiêu chí pass. Worker đúng khi từ chối lách. |
| dispatch `task-2-kids-landing` | 2 lần ERROR phía Antigravity (`network issue` 5023s, `timeout` 569s). Code trong worktree đã xong đủ 5 file → coordinator lấy diff, tự chạy toàn bộ acceptance criteria. |
| smoke `p12-nav-img` | 2 PASS / 1 FAIL (FAIL là bug thật, xem mục Ngoài scope 1) |
| smoke `p03-tables` | 5/5 PASS |
| smoke `p04-kids` | ERROR timeout sau 2/5 bước → coordinator tự verify bằng `agent-browser eval` |

**Bài học ghi lại:**
- Tiêu chí acceptance đếm số lần xuất hiện trong HTML SSG phải dùng `grep -o … | wc -l`, không dùng `grep -c`. Đã thêm cảnh báo vào spec phase 04.
- `--convention` của dispatch không có mục cho React + Vite thuần: đoán ra `vue` (14 cảnh báo dương tính giả). Lần sau truyền `--convention none` cho repo này, **không** truyền `nextjs`.
- `agent-browser click` trên link nằm trong ô bảng không điều hướng (lỗi hit-test của công cụ); `el.click()` qua `eval` thì được. App không có lỗi.

## scope-map

- `seo` — sitemap sinh postbuild (không còn `public/sitemap.xml`); FAQPage trang chủ chuyển sang `src/components/home-faq.ts` render ở route `/`.
- `guides` — 7 trang nội dung; module dùng chung `src/pages/typing-table-data.ts`; bẫy layout `width: '100%'` + `overflowX: auto`.
- `home` — ghi rõ trang chủ có **hai** danh sách link (nav + khối Cẩm nang hardcode, không đọc `GUIDES`).

## Token

| Bên | Model | Lượt/run | Input tươi | Cache ghi | Cache đọc | Output (thinking) | Thời gian |
|---|---|---:|---:|---:|---:|---:|---:|
| Claude (coordinator) | claude-opus-5 | 240 | 480 | 1.6M | 47.3M | 193k (60k) | 390 phút |
| agy smoke `p12-nav-img` | gemini-3.8-flash-high | 1 | 233k | — | 1.5M | 25k (19k) | 134s |
| agy dispatch `task-1-lookup-tables` | gemini-3.8-flash-high | 1 | 370k | — | 7.1M | 61k (34k) | 314s |
| agy smoke `p03-tables` | gemini-3.8-flash-high | 1 | 149k | — | 1.3M | 22k (16k) | 123s |
| agy dispatch `task-2-kids-landing` ⚠ ERROR | gemini-3.8-flash-high | 1 | 347k | — | 1.2M | 12k (8k) | 569s |
| agy smoke `p04-kids` ⚠ ERROR | gemini-3.8-flash-high | 1 | 81k | — | 448k | 14k (11k) | 2916s |
| **Tổng agy** | | 5 | 1.2M | — | 11.6M | 133k (89k) | 68 phút |

## Việc còn lại của user (không code được)

1. GSC UI → URL Inspection → Request Indexing cho 8 URL (5 cũ + 3 mới). API không có quyền này.
2. Rich Results Test cho `/huong-dan-telex` và `/tap-go-10-ngon-cho-be` — kỳ vọng 0 lỗi FAQ.
3. Off-page phase 05: sửa post đầu thread VOZ, đăng bảng gõ ở nhóm phụ huynh Facebook.

## Câu hỏi mở

1. `npm run lint` toàn repo đỏ sẵn **34 lỗi** ở `src/hooks/useTyping.ts`, `LessonSidebar`, `HomeView`, `GameSession`, `RelatedGuides`, `.opencode/**` — không liên quan plan này nên tôi không đụng. Có muốn dọn thành một task riêng không? Chừng nào còn đỏ thì mọi gate lint phải giới hạn theo file, và worker `agy` không dùng được `npm run lint` làm tiêu chí.
2. Landing `/tap-go-10-ngon-cho-be` dài 1672 từ, vượt mức 900–1200 trong plan, giọng văn hơi hoa mỹ ở vài đoạn ("kim chỉ nam", "bứt phá"). Nội dung đúng và không sai sự thật. Có muốn tôi rút gọn/làm mộc lại không?
3. Khối "Cẩm nang" trang chủ vẫn hardcode. Lần thêm trang tiếp theo lại phải sửa tay 2 chỗ. Có muốn refactor cho nó đọc `GUIDES` không (cần thêm field số thứ tự + icon vào `GuideItem`)?
