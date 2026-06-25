/**
 * Sinh schema BreadcrumbList + Article cho mỗi trang hướng dẫn.
 * Trả về MẢNG các object schema độc lập (mỗi cái có @context riêng) để:
 *  - render thành nhiều <JsonLd> riêng biệt
 *  - validate từng schema bằng validate-schema.cjs (script kiểm tra theo @type gốc)
 *
 * Chỉ khai các field BẮT BUỘC + cần thiết (theo validate-schema.cjs):
 *   Article: @type, headline, author, datePublished, image
 *   BreadcrumbList: @type, itemListElement
 * Không bịa rating/review (đã gỡ ở audit trước).
 */

const SITE_URL = 'https://type.scala.vn';
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const PUBLISHER = { '@type': 'Organization', name: 'Kamy Tech' };

export interface GuideSchemaMeta {
    /** Đường dẫn trang, ví dụ "/huong-dan-telex" */
    path: string;
    /** Nhãn breadcrumb (ngắn), ví dụ "Cách gõ Telex" */
    breadcrumbName: string;
    /** Tiêu đề bài viết (dài), thường trùng H1 */
    headline: string;
    description: string;
    /** ISO date, ví dụ "2026-01-14" */
    datePublished: string;
    /** ISO date ngày cập nhật nội dung gần nhất */
    dateModified: string;
}

export function buildGuideSchemas(meta: GuideSchemaMeta): Record<string, unknown>[] {
    const url = `${SITE_URL}${meta.path}`;

    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: meta.breadcrumbName, item: url },
        ],
    };

    const article = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: meta.headline,
        description: meta.description,
        image: OG_IMAGE,
        author: PUBLISHER,
        publisher: { ...PUBLISHER, logo: { '@type': 'ImageObject', url: OG_IMAGE } },
        datePublished: meta.datePublished,
        dateModified: meta.dateModified,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    };

    return [breadcrumb, article];
}
