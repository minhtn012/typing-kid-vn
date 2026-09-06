# Từ khóa mở rộng — Google Suggest (hl=vi, gl=vn) 06/09/2026

Nguồn: Google Suggest cho 12 seed × 5 hậu tố (~380 gợi ý), lưu thô ở scratchpad `suggest.json`. Không có volume (ReviewWeb API chưa cấu hình key). Ưu tiên theo: gợi ý xuất hiện ở nhiều seed + đã có impression trong GSC 90d.

## Phát hiện chính

1. **"đánh máy" vắng hoàn toàn trên site.** Suggest có cả cụm riêng: `tập đánh máy 10 ngón cho bé`, `tập đánh máy cho bé lớp 1`, `tập đánh máy có dấu`, `tập đánh máy tiếng việt`, `app tập đánh máy 10 ngón cho trẻ em`. GSC 90d đã có `phần mềm đánh máy 10 ngón tiếng việt miễn phí cho trẻ em` pos 1.8 dù on-page không có chữ này → thêm đồng nghĩa "đánh máy" vào trang chủ + trang trẻ em là thắng rẻ.
2. **Modifier "online / web / app / miễn phí / trên máy tính"** đi kèm hầu hết cụm gốc: `tập gõ 10 ngón tiếng việt online`, `web tập gõ 10 ngón cho trẻ em`, `app luyện gõ 10 ngón tiếng việt`, `luyện gõ 10 ngón online cho trẻ em`. Site là web nhưng on-page chưa nói "online / trực tuyến / không cần cài".
3. **Tên đối thủ chiếm nhiều gợi ý:** mario, cá heo (Dolphin), monkey, typingmaster, rapid typing, typing study, cá mập/typer shark. Intent "phần mềm gõ 10 ngón cho trẻ em (miễn phí)" là so sánh/chọn phần mềm → cần 1 trang liệt kê + so sánh, trong đó Typing Kid VN là lựa chọn web miễn phí tiếng Việt.
4. **Câu hỏi thời gian:** `tập/học/luyện gõ 10 ngón mất bao lâu`, `trong bao lâu` — xuất hiện ở 3 seed. Đã có FAQ tương tự ở phase 04, chỉnh câu hỏi đúng cụm.
5. **Telex/VNI: intent thật là "bật/chỉnh kiểu gõ"** trên Windows 11, macOS, iPhone/Android/Gboard/Samsung, và nhầm "bảng mã" (Unicode) với "kiểu gõ". Guide hiện chỉ dạy cách bỏ dấu → thêm 1 mục "Bật kiểu gõ Telex trên Windows, Mac, điện thoại" + 1 đoạn "Telex là kiểu gõ, bảng mã chọn Unicode".
6. **`bảng gõ telex và vni`** (xuất hiện ở cả 2 seed bảng) → 2 trang bảng nên có khối so sánh ngắn Telex ↔ VNI cùng dòng dấu, link chéo.
7. **"có dấu" / "telex" gắn với tập gõ:** `luyện gõ 10 ngón có dấu`, `tập gõ 10 ngón telex`, `tập đánh máy có dấu` → trang chủ và trang trẻ em nhắc "gõ có dấu Telex/VNI" ở h2.
8. **Đối tượng cụ thể:** `học sinh tiểu học`, `lớp 1`, `người mới bắt đầu`, `macbook` (2 seed). Trang trẻ em dùng "học sinh tiểu học" và "lớp 1–2" trong mục tuổi; guide Telex thêm dòng cho macOS.

## Cụm theo trang

| Trang | Cụm chính (từ GSC) | Cụm phụ thêm từ Suggest |
|---|---|---|
| `/` | luyện gõ 10 ngón tiếng việt · tập gõ 10 ngón | tập đánh máy 10 ngón · gõ 10 ngón tiếng việt online · web luyện gõ 10 ngón miễn phí · luyện gõ 10 ngón có dấu · không cần cài đặt |
| `/tap-go-10-ngon-cho-be` | tập gõ 10 ngón cho bé | tập đánh máy cho bé · tập đánh máy cho bé lớp 1 · học sinh tiểu học · tập gõ 10 ngón mất bao lâu · game gõ 10 ngón cho bé |
| `/phan-mem-go-10-ngon-cho-tre-em` (mới, đợt 3) | phần mềm gõ 10 ngón cho trẻ em miễn phí | phần mềm tập gõ 10 ngón cho bé online · app tập gõ 10 ngón tiếng việt · mario · cá heo · monkey · typingmaster · rapid typing |
| `/huong-dan-telex` | cách gõ telex · bảng chữ telex | cách chỉnh kiểu gõ telex trên máy tính / win 11 / macbook / điện thoại · kiểu gõ telex bảng mã gì · cách gõ telex trong word |
| `/huong-dan-vni` | cách gõ vni | cách chỉnh gõ vni trên máy tính / gboard / iphone · cách gõ bảng mã vni windows |
| `/bang-go-telex`, `/bang-go-vni` | bảng gõ telex · bảng gõ vni | bảng gõ dấu telex · bảng quy tắc gõ telex · bảng gõ telex và vni · bảng gõ tiếng việt vni |

## Không làm

- Tiếng Anh/Hàn/Nhật/Thái, "theo lời bài hát", "typing test tốc độ", "tải phần mềm/offline": ngoài định vị (web tiếng Việt cho trẻ em).
- Không chèn tên đối thủ vào title/h1 trang chủ; chỉ dùng trong trang so sánh.

## Cách lấy lại dữ liệu

```bash
# Google Suggest, không cần key; đổi seed trong mảng seeds
python3 - <<'EOF'
import urllib.request,urllib.parse,json,time
for s in ["tập đánh máy cho bé","phần mềm gõ 10 ngón cho trẻ em"]:
    u="https://suggestqueries.google.com/complete/search?client=firefox&hl=vi&gl=vn&q="+urllib.parse.quote(s)
    print(s,json.loads(urllib.request.urlopen(urllib.request.Request(u,headers={"User-Agent":"Mozilla/5.0"})).read())[1]); time.sleep(0.3)
EOF
```
Volume thật: cấu hình `REVIEWWEB_API_KEY` rồi `node .opencode/skills/seo/scripts/analyze-keywords.cjs --keyword "tập gõ 10 ngón" --country vn`. Chưa có key nên chưa chạy.
