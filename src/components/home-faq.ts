/**
 * FAQPage cho riêng trang chủ. Trước đây khối này nằm tĩnh trong index.html nên
 * bị lặp lên mọi route (guide có FAQPage riêng → 2 khối FAQPage/URL, Google cảnh báo).
 * Đưa vào route "/" qua <JsonLd> để chỉ trang chủ có nó.
 */
export const HOME_FAQ: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Làm thế nào để gõ 10 ngón tiếng việt nhanh nhất?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Để gõ 10 ngón tiếng việt nhanh nhất, bạn cần luyện tập đặt tay đúng vị trí trên hàng phím cơ sở (ASDF - JKL;), gõ không nhìn bàn phím và sử dụng các phần mềm luyện tập như Typing Kid VN để làm quen với kiểu gõ Telex hoặc VNI.',
            },
        },
        {
            '@type': 'Question',
            name: 'Học gõ 10 ngón tiếng việt có khó không?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Hoàn toàn không khó nếu bạn luyện tập đúng phương pháp. Typing Kid VN cung cấp các bài học từ cơ bản đến nâng cao giúp bạn làm quen với từng hàng phím một cách tự nhiên và thú vị.',
            },
        },
        {
            '@type': 'Question',
            name: 'Nên dùng kiểu gõ Telex hay VNI?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Telex phổ biến hơn và giúp gõ nhanh hơn trên các thiết bị hiện đại vì không cần di chuyển tay lên hàng phím số. Tuy nhiên, VNI vẫn là lựa chọn tốt nếu bạn đã quen với việc gõ số.',
            },
        },
    ],
};
