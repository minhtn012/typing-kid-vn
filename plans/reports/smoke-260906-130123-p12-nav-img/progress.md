| # | Bước | Kỳ vọng | Thực tế | Kết quả | Ảnh |
|---|---|---|---|---|---|
| 1 | [layout] Trang chủ ở 1280×800 | 4 link nav trên 1 hàng, không tràn, không đè h1, title đúng prefix | Đủ 4 link nav 1 hàng (top 186px, h1 top 238px), title="Luyện gõ 10 ngón tiếng Việt miễn phí cho trẻ em | Typing Kid VN", 0 lỗi console | PASS | shots/01-home-1280.png |
| 2 | [layout] Trang chủ ở 375×812 (mobile) | 4 link nav xuống dòng gọn, không cuộn ngang (scrollWidth <= innerWidth + 1), mô tả có "tập gõ 10 ngón" và "không cần cài đặt" | Nav xuống 2 hàng gọn không chồng lấn, scrollWidth=375 <= innerWidth=375+1, mô tả chứa đủ 2 cụm từ, 0 lỗi console | PASS | shots/02-home-375.png |
| 3 | [layout] Guide Telex ở 375×812 | Ảnh tỉ lệ ≈ 1:1, không cuộn ngang (scrollWidth <= innerWidth + 1), không bóp méo, 0 lỗi console | Ảnh tỉ lệ 1.000 (560×560px), nhưng trang cuộn ngang nặng (scrollWidth=600 > innerWidth=375+1), ảnh và h1 bị cắt tràn màn hình, 0 lỗi console | FAIL | shots/03-guide-telex-375.png |
