/**
 * Danh sách các trang hướng dẫn — 1 nguồn dữ liệu dùng chung cho:
 *  - khối internal link "Hướng dẫn liên quan" (RelatedGuides.tsx)
 *  - danh sách guide trong DesktopNudge
 *  - sinh schema breadcrumb/Article (guide-schema.ts)
 * Vì sao tách khỏi RelatedGuides.tsx: file component chỉ nên export component
 * để Fast Refresh hoạt động; hằng số dùng chung ở file riêng.
 */
export interface GuideItem {
    path: string;
    /** Nhãn ngắn dùng cho breadcrumb và thẻ liên quan */
    title: string;
    desc: string;
}

export const GUIDES: GuideItem[] = [
    { path: '/tu-the-go-phim', title: 'Tư thế ngồi & cách đặt tay', desc: 'Ngồi đúng và đặt tay chuẩn trên hàng phím cơ sở.' },
    { path: '/huong-dan-telex', title: 'Cách gõ Telex', desc: 'Bỏ dấu bằng phím chữ: s, f, r, x, j.' },
    { path: '/huong-dan-vni', title: 'Cách gõ VNI', desc: 'Bỏ dấu bằng hàng phím số: 1, 2, 3, 4, 5.' },
    { path: '/bi-mat-phim-f-j', title: 'Bí mật phím F và J', desc: 'Dùng gờ nổi để gõ không nhìn bàn phím.' },
    { path: '/bang-go-telex', title: 'Bảng gõ Telex (in được)', desc: 'Một trang A4: dấu, chữ đặc biệt, 12 từ mẫu.' },
    { path: '/bang-go-vni', title: 'Bảng gõ VNI (in được)', desc: 'Một trang A4: phím số 1-9 và 12 từ mẫu.' },
    { path: '/tap-go-10-ngon-cho-be', title: 'Tập gõ 10 ngón cho bé', desc: 'Lộ trình 4 tuần tại nhà, 10 phút mỗi ngày.' },
];
