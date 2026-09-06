| # | Bước | Kỳ vọng | Thực tế | Kết quả | Ảnh |
|---|---|---|---|---|---|
| 1 | /tap-go-10-ngon-cho-be ở 375×812 | 1 h1 đúng tên, không cuộn ngang (375=375), 6 h2, 1 table có 4 dòng | 1 h1, scrollWidth=375/innerWidth=375, 7 h2, 1 table (4 dòng tbody) | FAIL | shots/01-kids-roadmap-375.png |
| 2 | Bảng lộ trình cuộn trong khung (375px) | overflowX=auto, scrollWidth===innerWidth | overflowX=auto, w.scrollWidth=335, w.clientWidth=335, scrollWidth=375/innerWidth=375 | PASS | shots/02-table-scroll-375.png |
