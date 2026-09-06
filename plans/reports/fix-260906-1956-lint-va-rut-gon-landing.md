# Fix — dọn lint toàn repo + rút gọn landing tập gõ cho bé

**Ngày:** 06/09/2026 · **Branch:** main · **Commit:** `a27ad41`, `177c786` (đã push, live xanh)
Trả lời câu hỏi mở 1 và 2 trong `plans/reports/cook-260906-1927-seo-push-round2-phase-01-04.md`.

## 1. Lint: 34 lỗi → 0

`npm run lint` giờ xanh, dùng làm gate được (kể cả cho worker `agy`).

| Nhóm | Số lỗi | Cách xử lý |
|---|---:|---|
| `.opencode/**` | 28 (+1 warn) | Thêm vào `globalIgnores` của `eslint.config.js`. Thư mục này **không được git theo dõi**, là tooling agent chạy runtime khác (dùng `require`), không nằm trong `tsconfig.app.json` (`include: ["src"]`). Áp rule React/browser lên nó là sai cấu hình, không phải nợ kỹ thuật. |
| `react-refresh/only-export-components` | 1 | `GUIDES` + `GuideItem` tách sang `src/components/guides-data.ts`; `RelatedGuides.tsx` và `DesktopNudge.tsx` import từ đó. |
| `react-hooks/set-state-in-effect` | 5 | Sửa thật, không disable rule — chi tiết dưới. |

**Không dùng `eslint-disable` hay đổi cấu hình rule ở bất kỳ chỗ nào.**

### 5 chỗ setState trong effect

| File | Trước | Sau |
|---|---|---|
| `useTyping.ts:56` | effect reset `wordIdx`/`wordState` khi `tokens` đổi | chỉnh state ngay trong render kèm `prevTokens` (React render lại lập tức → không commit frame nào dùng variants cũ). Clamp `safeIdx` giữ nguyên. |
| `useTyping.ts:76` | effect đặt `startTime` khi `userInput.length === 1`, `endTime` khi `isFinished` | `startTime` chốt trong `markCorrect` (`prev.startTime ?? Date.now()`); `endTime` chốt trong `handleKeyDown` khi phím vừa gõ làm xong từ cuối (`isLastWord && isWordCompleted(r.next, …)`). |
| `LessonSidebar.tsx:19` | effect gọi `loadProgress()` khi `isOpen` | chỉnh trong render kèm `wasOpen` — panel hiện ra đã có tiến độ mới, không nháy 1 frame dữ liệu cũ. |
| `GameSession.tsx:152` | effect set `gameState = 'lost'` khi `miePos >= totoroPos` | bỏ hẳn state: `phase` suy ra từ vị trí. `gameState` chỉ còn `'playing' \| 'won'`. Bỏ luôn khối comment "let's rely on the separate checking effect". |
| `HomeView.tsx:36` | effect đọc query param sau mount (để không lệch HTML SSG) | `useIsHydrated()` bằng `useSyncExternalStore` (server/lần render đầu = false) + đồng bộ trong render theo `location.key + search`. Vẫn không lệch hydration, không còn setState trong effect. |

### Verify

`npx tsc -b` xanh · `npm run lint` xanh · `npm test` 27/27 · `npm run build` xanh.

Smoke trên bản build (`agent-browser`, đối chiếu production `a69d524` trước khi kết luận):

| Kiểm | Kết quả |
|---|---|
| `/?mode=basic_home` mở đúng bài, đồng hồ chạy | WPM 0 → 18 sau 3s gõ |
| Gõ hết bài → màn kết quả | "Tuyệt vời! / Bạn đã hoàn thành bài tập này." |
| `endTime` chốt (WPM đứng yên sau khi xong) | WPM 1 giữ nguyên qua 3s ✓ |
| Đếm phím sai | accuracy 25% với 1 đúng / 3 sai ✓ |
| "Bài tiếp theo" (đổi `tokens`) | sang Bài 2/5, text mới, state reset, gõ tiếp được ✓ |
| Panel "Danh sách bài" | hiện tiến độ đã lưu (Bài 1 — 3 WPM 100%) ✓ |
| Game: 9s không gõ | "Bắt được rồi!" ✓ · "Chơi lại" về `Position: 35%` ✓ |
| `/`, `/?mode=basic_top`, `/?mode=khong_ton_tai` | home / hàng phím trên / rơi về bài mặc định — y như trước ✓ |
| `RelatedGuides` sau khi tách `GUIDES` | 6 thẻ, loại trang hiện tại ✓ · `DesktopNudge` 7 link ✓ |
| Console | 0 lỗi trên mọi trang đã mở |

**Bẫy đo đạc:** `agent-browser eval` chạy trước khi React hydrate thì phím tổng hợp không tới handler → tưởng hỏng. Phải chờ một marker của app (`Bài 1 / 5`) trước khi gõ. Và WPM/accuracy chỉ cập nhật theo interval 1s, gõ tức thì thì số hiển thị không phản ánh gì — dùng số ô chữ đã xanh (`rgb(35, 134, 54)`) làm thước đo tiến độ.

## 2. Landing `/tap-go-10-ngon-cho-be`: 1672 → 1044 từ

Trong khoảng 900–1200 của plan. Viết mộc lại: bỏ "kim chỉ nam", "bứt phá", "quy tắc vàng", "hành trình", các câu mở đầu kiểu "Trước khi bước vào…".

Giữ nguyên: bố cục 5 mục + FAQ, bảng lộ trình 4 tuần, 4 khối lỗi hay gặp, toàn bộ 12 link nội bộ, CTA, JSON-LD (FAQ lấy từ cùng mảng `faqs`, không đụng).

Live xác nhận: 1044 từ, `h2` = 7, FAQPage = 1, 12 link nội bộ, 8/8 route trả 200.

## scope-map

- `seo` — thêm `src/components/guides-data.ts` vào đường dẫn.
- `home` — sửa dòng đã cũ (khối Cẩm nang giờ 7 thẻ, không phải 4); ghi `GUIDES` đã chuyển sang `guides-data.ts` và vì sao.
- `practice` — ghi cách xử lý `react-hooks/set-state-in-effect` cho 4 tình huống, và ràng buộc `HomeView` chỉ đọc query param sau hydrate.

## Câu hỏi mở

1. Khối "Cẩm nang" trang chủ vẫn hardcode (câu hỏi 3 của báo cáo trước, chưa trả lời). Thêm trang mới vẫn phải sửa 2 chỗ. Refactor cho đọc `GUIDES` không? Cần thêm field icon + thứ tự vào `GuideItem`.
2. `useTyping` không có test — 5 lần sửa vừa rồi chỉ được bảo chứng bằng smoke trình duyệt. Thêm `jsdom` + `@testing-library/react` để test hook không, hay để nguyên?
