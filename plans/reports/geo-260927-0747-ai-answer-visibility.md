# Hiện diện trong câu trả lời của AI (ChatGPT, Claude, Gemini, Perplexity) — type.scala.vn, 27/09/2026

## Kết luận

AI chỉ trích được trang mà chỉ mục nó dùng đã có. Hiện type.scala.vn **vắng mặt ở Bing** (nguồn của ChatGPT search, Copilot), **mỏng ở Brave** (nguồn của Claude: 2 URL), và 3/8 URL chưa vào Google (nguồn của Gemini, AI Overviews). Với câu hỏi đề xuất ("web/phần mềm luyện gõ 10 ngón cho trẻ em"), AI đang dựng câu trả lời từ các bài "top N phần mềm" của blog lớn. Nên thứ tự đòn bẩy là: vào chỉ mục → có mặt trong các bài tổng hợp → trang của mình có đoạn trả lời thẳng, có số liệu.

## Mỗi AI lấy nguồn từ đâu

| AI | Nguồn chính | Crawler | Trạng thái site |
|---|---|---|---|
| ChatGPT search | Bing + OAI-SearchBot | `OAI-SearchBot`, `ChatGPT-User` (GPTBot chỉ để train) | Bing `site:` không ra trang nào |
| Claude | Brave Search | `Claude-SearchBot`, `Claude-User` (ClaudeBot để train) | Brave có `/`, `/huong-dan-telex` |
| Gemini, AI Overviews | Google | Googlebot (Google-Extended không ảnh hưởng AI Overviews) | 5/8 indexed |
| Perplexity | chỉ mục riêng + web | `PerplexityBot`, `Perplexity-User` | chưa đo |

Kiểm kỹ thuật (curl với UA từng bot): cả 10 UA nhận 200 và đủ HTML SSG (h1, 40 KB). `robots.txt` = `Allow: /` cho mọi bot, không có tường lửa chặn AI trên Vercel. Các bot AI không chạy JS, nên SSG là điều kiện cần và site đã có.

## Baseline câu trả lời (WebSearch 27/09)

| Câu hỏi | Nguồn được dùng | Site có mặt? |
|---|---|---|
| web luyện gõ 10 ngón tiếng Việt cho trẻ em miễn phí | viettelstore, dienthoaivui, cellphones sforum, mytour, phucanh, typingstudy, cth.edu.vn, taimienphi | không |
| phần mềm tập gõ 10 ngón cho trẻ em tốt nhất 2026 | dienthoaivui, hoanghamobile, ben.com.vn, mytour, mygear, cybercubevn, tiniphone | không |
| bảng gõ dấu telex đầy đủ | quantrimang, gearvn, phongvu, mytour, hoanghamobile, totolink, teky, icantech, taivietkey | không |

Đối thủ được AI nhắc lặp lại: TypingTop, Typing Fingers, Rapid Typing, Mario Teaches Typing, TypingStudy, Typing.com, Nitro Type.

## Điều nghiên cứu GEO 2023–2026 ủng hộ (và không)

- Có tác dụng: đoạn trả lời thẳng đầu mục, con số và dữ kiện kiểm chứng được, trích dẫn/nguồn (+25–40 % hiển thị trong thí nghiệm GEO). Nguồn đã được trích nhiều sẽ được trích tiếp (hiệu ứng Matthew) → có mặt trong bài của site lớn quan trọng hơn tối ưu trang mình.
- Không có bằng chứng: `llms.txt` (Ahrefs: 97 % file không có request nào, Google nói không dùng), schema chung chung (không thấy tác động trích dẫn; chỉ Product/Review có giá thật). → Không làm `llms.txt` đợt này.

## Đã làm (27/09)

1. **IndexNow**: `public/a2fc90a4415b11f295d748325f6b628a.txt` + `scripts/indexnow.mjs` (`npm run indexnow`, chạy sau khi deploy live; script tự từ chối nếu file key chưa live). Báo Bing/Yandex/Naver các URL trong sitemap mà không cần tài khoản.
2. **Task 2 (agy)**: trang chủ có FAQ "Typing Kid VN là gì?" với số liệu thật (9 bài, 1 game, miễn phí, không cài, không tài khoản, giới hạn chỉ máy tính), khối "Typing Kid VN có gì?" thay khối quảng cáo chung chung, FAQ hiển thị và schema dùng chung một mảng.
3. **Task 1 (đã apply)**: 2 guide có mục bật kiểu gõ theo thiết bị + "kiểu gõ khác bảng mã" dạng từng bước, đúng định dạng AI hay trích cho câu hỏi "cách bật Telex trên Windows 11".

## Việc của user (không làm bằng code được)

1. **Bing Webmaster Tools** (bing.com/webmasters): đăng nhập, *Import from Google Search Console* (1 click, tự xác minh), submit `sitemap.xml`. Đây là việc quan trọng nhất cho ChatGPT.
2. **Request Indexing** trong GSC cho 3 URL chưa index.
3. **Có mặt trong bài tổng hợp**: liên hệ tác giả/biên tập các bài "top phần mềm luyện gõ 10 ngón" ở bảng baseline (dienthoaivui, mygear, cybercubevn, cellphones sforum, mytour đều cập nhật định kỳ) xin thêm Typing Kid VN với 1 dòng mô tả dữ kiện: miễn phí, web, không tài khoản, có Telex/VNI, cho trẻ 7–8 tuổi trở lên. Thread VOZ, nhóm phụ huynh cũng là nguồn Brave/Bing crawl.

## Đo lường

- Hằng tháng hỏi cùng 6 câu ở ChatGPT (bật search), Claude (bật web search), Gemini, Perplexity; ghi site có được nhắc/trích không: (1) web luyện gõ 10 ngón tiếng Việt cho trẻ em miễn phí; (2) phần mềm tập gõ 10 ngón cho trẻ em tốt nhất; (3) bảng gõ dấu telex đầy đủ; (4) cách bật telex trên windows 11; (5) kiểu gõ telex dùng bảng mã gì; (6) typing kid vn là gì.
- Vercel Analytics → Referrers: `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `claude.ai`, `copilot.microsoft.com`.
- Bing `site:type.scala.vn` sau khi chạy IndexNow + Bing Webmaster 7–14 ngày.

## Đề xuất tiếp theo

- Trang `/phan-mem-go-10-ngon-cho-tre-em` (bảng so sánh 6–7 phần mềm AI đang nhắc, ô nào không kiểm chứng được ghi "không rõ"): định dạng AI trích nhiều nhất cho câu hỏi "phần mềm nào tốt". Giờ có lý do làm sớm hơn kế hoạch cũ, nhưng cần 1–2 giờ kiểm chứng từng phần mềm.

## Deploy

User cho phép deploy 27/09. Live: `5a206e0` (task 1), `9bf7466` (IndexNow, 202 Accepted 8 URL), `4cadefc` (task 2). Mỗi task: agy làm trong worktree (205s / 177s, gemini-3.8-flash-high, 0 lần 503), coordinator đọc toàn bộ diff, chạy lại lint/test/build + mọi tiêu chí, kiểm 375px/1280px bằng agent-browser, rồi mới apply và curl live.

scope-map: `seo` — thêm quy trình `npm run indexnow` sau deploy và file key không được xóa; `home` — FAQ trang chủ sinh từ `HOME_FAQS`, khối dữ kiện phải khớp code; `guides` — bẫy `initial={false}`. business: unchanged (repo chưa có `docs/business`).

## Câu hỏi mở

1. Làm trang so sánh phần mềm ngay đợt này hay chờ 3 URL cũ được index?

Nguồn: [OpenAI Publishers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq) · [Claude web search chạy trên Brave (TechCrunch)](https://techcrunch.com/2025/03/21/anthropic-appears-to-be-using-brave-to-power-web-searches-for-its-claude-chatbot/) · [Claude bots và robots.txt (SEJ)](https://www.searchenginejournal.com/anthropics-claude-bots-make-robots-txt-decisions-more-granular/568253/) · [Khảo sát GEO 2023–2026 (arXiv)](https://arxiv.org/html/2607.14035v1) · [GEO: dữ liệu ủng hộ gì năm 2026](https://dev.to/2pizza/generative-engine-optimization-what-the-data-actually-supports-in-2026-2894)
