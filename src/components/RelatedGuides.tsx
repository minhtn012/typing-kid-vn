import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

/**
 * Danh sách 4 trang hướng dẫn — 1 nguồn dữ liệu dùng chung cho:
 *  - khối internal link "Hướng dẫn liên quan" (component bên dưới)
 *  - sinh schema breadcrumb/Article (guide-schema.ts)
 * Vì sao gom 1 chỗ: tránh lặp metadata ở nhiều file (DRY) và dễ thêm guide mới.
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
];

interface RelatedGuidesProps {
    /** Đường dẫn trang hiện tại để loại nó khỏi danh sách liên quan */
    currentPath: string;
}

const RelatedGuides: React.FC<RelatedGuidesProps> = ({ currentPath }) => {
    const others = GUIDES.filter((g) => g.path !== currentPath);

    return (
        <section style={{ marginTop: '50px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '20px' }}>
                Hướng dẫn liên quan
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
                {others.map((g) => (
                    <Link
                        key={g.path}
                        to={g.path}
                        className="glass"
                        style={{ padding: '18px 20px', textDecoration: 'none', display: 'flex', gap: '14px', alignItems: 'flex-start', transition: 'transform 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                        <div style={{ background: 'rgba(88, 166, 255, 0.1)', padding: '8px', borderRadius: '10px', flexShrink: 0 }}>
                            <BookOpen size={18} color="var(--primary-color)" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 4px' }}>{g.title}</h3>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{g.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default RelatedGuides;
