import React from 'react';

/**
 * Seo: đặt title/description/canonical riêng cho từng trang.
 *
 * React 19 tự động "hoist" (nâng) các thẻ <title>, <meta>, <link> được render
 * trong bất kỳ component nào lên <head> của document. Nhờ vậy mỗi route có
 * metadata riêng mà không cần thư viện (react-helmet...). Đây là fix gốc rễ cho
 * vấn đề SPA: trước đây mọi trang dùng chung canonical của homepage nên Google
 * coi các trang con là bản sao và không index.
 *
 * Lưu ý: index.html KHÔNG còn các thẻ động (title/description/canonical/og:title...)
 * để tránh bị trùng lặp với thẻ do component này render.
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
    <>
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
    </>
  );
};

export default Seo;
