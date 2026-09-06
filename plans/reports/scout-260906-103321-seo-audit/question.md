Audit kỹ thuật SEO của site này (SSG bằng vite-react-ssg, deploy Vercel). Trả lời bằng bảng, kèm file:dòng cho mọi claim.

1. Bảng ROUTE: với TỪNG route trong src/routes.tsx: path | component | title | meta description | canonical | og:title/og:description/og:url có riêng không | JSON-LD types nào (kể cả tĩnh ở index.html) | h1 text | số h2. Lấy giá trị thật từ code (chuỗi literal), không đoán. 'Tổng số: N route'.
2. Cách Seo.tsx / JsonLd.tsx / guide-schema.ts sinh meta: dùng <Head> của vite-react-ssg hay React 19 hoist? Có nguy cơ trùng thẻ (index.html vs component) không? Canonical có trailing slash nhất quán với vercel.json cleanUrls không?
3. INTERNAL LINKS: bảng từ-trang → đến-trang (anchor text) qua RelatedGuides.tsx, HomePage/HomeView, RootLayout nav, và link inline trong src/pages. Trang nào là orphan (không ai link tới) hoặc dead-end (không link ra)?
4. HÌNH ẢNH trong src/pages + home: src | alt có không | width/height có set không | loading=lazy?
5. Sitemap public/sitemap.xml vs routes: URL thiếu/thừa; lastmod có được cập nhật tự động không (tìm script build). robots.txt.
6. Có route 404 / NotFound không? Vercel rewrite trong vercel.json có đè lên file dist/<route>.html do SSG sinh ra không (đọc vite.config.ts + main.tsx + vercel.json để kết luận)?
7. Thiếu gì so với checklist chuẩn: hreflang/lang, BreadcrumbList, og:image riêng per page, article schema (datePublished/dateModified), preconnect/font, Analytics script ảnh hưởng LCP? Liệt kê 'CÓ / KHÔNG / KHÔNG RÕ' kèm file:dòng.
Kết thúc bằng mục 'Rủi ro/bẫy kỹ thuật' ngắn (≤8 dòng).
