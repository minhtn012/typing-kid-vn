import React from 'react';
import { Head } from 'vite-react-ssg';

/**
 * Seo: đặt title/description/canonical riêng cho từng trang.
 *
 * Dùng <Head> của vite-react-ssg để chèn thẻ vào ĐÚNG <head> ngay khi build SSG
 * (prerender tĩnh) — không chỉ khi JS chạy phía client. Đây là fix gốc rễ cho
 * vấn đề SPA: trước đây mọi trang dùng chung canonical/title của homepage nên
 * Google coi các trang con là bản sao và không index; social scraper (Facebook/
 * Zalo) không chạy JS cũng chỉ thấy og chung.
 *
 * Vì sao KHÔNG dùng cơ chế auto-hoist <title>/<meta> của React 19: khi
 * vite-react-ssg render tĩnh (renderToString), các thẻ đó bị kẹt trong <body>
 * thay vì <head>, khiến title/canonical sai chuẩn trong HTML tĩnh. <Head> đảm
 * bảo thẻ nằm trong <head> ở cả HTML tĩnh lẫn sau khi hydrate.
 *
 * Lưu ý: index.html KHÔNG đặt sẵn title/description/canonical/og động để tránh
 * trùng lặp với thẻ do component này chèn.
 */

const SITE_URL = 'https://type.scala.vn';

interface SeoProps {
  /** Tiêu đề trang, nên <= 60 ký tự để không bị cắt trên SERP */
  title: string;
  /** Mô tả meta, nên 120-160 ký tự */
  description: string;
  /** Đường dẫn của trang, ví dụ "/" hoặc "/huong-dan-telex" */
  path: string;
}

const Seo: React.FC<SeoProps> = ({ title, description, path }) => {
  // Canonical phải là URL tuyệt đối, trỏ về CHÍNH trang này (không phải homepage)
  const url = `${SITE_URL}${path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph (Facebook/Zalo) theo từng trang */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />

      {/* Twitter/X theo từng trang */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
};

export default Seo;
