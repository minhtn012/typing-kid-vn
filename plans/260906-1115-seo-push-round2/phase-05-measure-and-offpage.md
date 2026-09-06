# Phase 05 — Đo lường + off-page

**Mục tiêu:** tách hiệu ứng SSG khỏi nội dung mới; tận dụng kênh sẵn có.

## Lịch
| Ngày | Việc |
|---|---|
| ~13/09 (D+7) | `--inspect` 5 URL cũ: lastCrawlTime mới? `--top-pages -d 7`. Ghi vào bảng dưới. |
| ~20/09 (D+14) | `--top-queries -d 14 --limit 50`; kiểm tra 3 URL mới có impr chưa; quyết định câu hỏi mở 2 (title guide Telex). |
| ~05/10 (D+28) | `--top-pages -d 28`, `--top-queries -d 28`; so với baseline; chốt đợt 3. |

## Lệnh
```
SP=<scratchpad>; export NODE_PATH="$SP/gsc-deps/node_$(echo modules)"
node .opencode/skills/seo/scripts/gsc-query.cjs --top-pages -s https://type.scala.vn/ -d 28
node .opencode/skills/seo/scripts/gsc-query.cjs --top-queries -s https://type.scala.vn/ -d 28 --limit 50
node .opencode/skills/seo/scripts/gsc-query.cjs --inspect -s https://type.scala.vn/ -u https://type.scala.vn/<path>
```
(`googleapis` chưa cài trong `.opencode/skills/seo/` — cân nhắc `npm i googleapis` tại đó để khỏi dùng scratchpad.)

## Baseline (28d tính đến 06/09)
| Trang | Click | Impr | Pos |
|---|---|---|---|
| `/` | 45 | 458 | 29.2 |
| `/huong-dan-telex` | 2 | 148 | 15.2 |
| `/huong-dan-vni` | 1 | 91 | 44.1 |
| `/tu-the-go-phim` | 1 | 13 | 10.3 |
| `/bi-mat-phim-f-j` | 0 | 5 | 5.4 |

Query: `luyện gõ 10 ngón tiếng việt` 6.8 · `tập gõ 10 ngón` 63.8 · `bảng gõ telex` 54.7 · `gõ 10 ngón tiếng việt` 15.3.

## Off-page (0 code)
1. Thread VOZ `voz.vn/t/tap-go-10-ngon-tieng-viet-cho-be.1196935/`: sửa post đầu — thêm link `/tap-go-10-ngon-cho-be` và `/bang-go-telex` khi đã live, tóm tắt 4 tuần lộ trình (không dán nguyên văn). Link vẫn nofollow nhưng đem referral.
2. Đăng lại bảng gõ (ảnh chụp trang `/bang-go-telex` + link) ở 1–2 nhóm phụ huynh Facebook; đo referral bằng Vercel Analytics.

## Kết quả (điền sau)
| Ngày | Tổng click 28d | `/` pos | telex pos | 3 URL mới indexed? | Ghi chú |
|---|---|---|---|---|---|
| | | | | | |
