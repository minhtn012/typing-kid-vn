/**
 * FAQPage cho riêng trang chủ. Trước đây khối này nằm tĩnh trong index.html nên
 * bị lặp lên mọi route (guide có FAQPage riêng → 2 khối FAQPage/URL, Google cảnh báo).
 * Đưa vào route "/" qua <JsonLd> để chỉ trang chủ có nó.
 */
export const HOME_FAQS: { q: string; a: string }[] = [
    {
        q: 'Typing Kid VN là gì?',
        a: 'Typing Kid VN (type.scala.vn) là trang web luyện gõ 10 ngón tiếng Việt miễn phí cho trẻ em và người mới bắt đầu. Trang chạy ngay trên trình duyệt máy tính, không cần cài đặt hay tạo tài khoản. Có 9 bài luyện đi từ hàng phím cơ sở đến gõ câu có dấu theo kiểu Telex và VNI, kèm 1 mini game.',
    },
    {
        q: 'Làm thế nào để gõ 10 ngón tiếng Việt nhanh nhất?',
        a: 'Đặt tay đúng trên hàng phím cơ sở (ASDF - JKL;), tập gõ không nhìn bàn phím và luyện đều mỗi ngày 10–15 phút. Trên Typing Kid VN, bạn đi lần lượt 3 bài hàng phím rồi mới sang bài gõ dấu Telex hoặc VNI.',
    },
    {
        q: 'Học gõ 10 ngón tiếng Việt có khó không?',
        a: 'Không khó nếu đi đúng thứ tự: hàng phím cơ sở trước, rồi hàng trên, hàng dưới, cuối cùng mới gõ dấu. Trẻ từ 7–8 tuổi, khi đã đọc tốt, có thể bắt đầu với các bài hàng phím.',
    },
    {
        q: 'Nên dùng kiểu gõ Telex hay VNI?',
        a: 'Telex phổ biến hơn và gõ nhanh hơn vì dấu nằm trên phím chữ (s, f, r, x, j), tay không phải rời hàng phím chính. VNI bỏ dấu bằng phím số 1–5, hợp với người đã quen hàng phím số.',
    },
    {
        q: 'Typing Kid VN có dùng được trên điện thoại không?',
        a: 'Phần luyện gõ cần bàn phím thật nên chỉ dùng trên máy tính. Trên điện thoại, trang sẽ nhắc mở bằng máy tính; bạn vẫn đọc được các bài hướng dẫn Telex, VNI và bảng gõ in được.',
    },
];

export const HOME_FAQ: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
        },
    })),
};
