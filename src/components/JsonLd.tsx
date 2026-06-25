import React from 'react';

/**
 * JsonLd: render một khối structured data (JSON-LD) dùng chung cho mọi trang.
 *
 * Vì sao cần: Google đọc structured data để hiển thị "rich result" (FAQ, breadcrumb...).
 * JSON-LD là định dạng khuyến nghị — chỉ cần nằm trong DOM (head HOẶC body đều được),
 * Googlebot sẽ parse khi render JS. Ta gom về 1 component để tái dùng (DRY) và tránh
 * sai cú pháp khi tự viết <script> ở nhiều nơi.
 *
 * Lưu ý: type="application/ld+json" nên trình duyệt KHÔNG thực thi nội dung này như
 * JavaScript — nó chỉ là dữ liệu. Do đó an toàn khi nhúng thẳng object đã JSON.stringify.
 */

interface JsonLdProps {
  /** Object schema theo chuẩn schema.org, ví dụ { "@type": "FAQPage", ... } */
  data: Record<string, unknown>;
}

const JsonLd: React.FC<JsonLdProps> = ({ data }) => (
  <script
    type="application/ld+json"
    // dangerouslySetInnerHTML để React xuất JSON thô, không escape thành text node lạ.
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default JsonLd;
