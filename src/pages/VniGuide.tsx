import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import RelatedGuides from '../components/RelatedGuides';
import { buildGuideSchemas } from '../components/guide-schema';
import { VNI_RULES } from '../constants';

/**
 * Nhóm nguyên âm theo gốc × 5 thanh — cấu trúc trình bày cho bảng tra cứu VNI.
 * Phím gõ thực tế luôn lấy từ VNI_RULES (constants.ts) để giữ 1 nguồn dữ liệu.
 */
const VOWEL_GROUPS: { base: string; chars: string[] }[] = [
    { base: 'a', chars: ['á', 'à', 'ả', 'ã', 'ạ'] },
    { base: 'ă', chars: ['ắ', 'ằ', 'ẳ', 'ẵ', 'ặ'] },
    { base: 'â', chars: ['ấ', 'ầ', 'ẩ', 'ẫ', 'ậ'] },
    { base: 'e', chars: ['é', 'è', 'ẻ', 'ẽ', 'ẹ'] },
    { base: 'ê', chars: ['ế', 'ề', 'ể', 'ễ', 'ệ'] },
    { base: 'i', chars: ['í', 'ì', 'ỉ', 'ĩ', 'ị'] },
    { base: 'o', chars: ['ó', 'ò', 'ỏ', 'õ', 'ọ'] },
    { base: 'ô', chars: ['ố', 'ồ', 'ổ', 'ỗ', 'ộ'] },
    { base: 'ơ', chars: ['ớ', 'ờ', 'ở', 'ỡ', 'ợ'] },
    { base: 'u', chars: ['ú', 'ù', 'ủ', 'ũ', 'ụ'] },
    { base: 'ư', chars: ['ứ', 'ừ', 'ử', 'ữ', 'ự'] },
    { base: 'y', chars: ['ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ'] },
];

const TONE_LABELS = ['Sắc', 'Huyền', 'Hỏi', 'Ngã', 'Nặng'];

/**
 * Sinh dữ liệu bảng VNI. Phím gốc của nguyên âm có dấu (â=a6, ă=a8, ê=e6,
 * ô=o6, ơ=o7, ư=u7) lấy từ VNI_RULES; nguyên âm thường gõ chính nó.
 */
function buildVniTable() {
    return VOWEL_GROUPS.map(({ base, chars }) => ({
        base,
        baseKeys: (VNI_RULES[base] ?? [base]).join(''),
        // Guard ?? để không crash nếu constants.ts đổi và thiếu key ký tự nào đó
        cells: chars.map((c) => ({ char: c, keys: (VNI_RULES[c] ?? ['?']).join('') })),
    }));
}

/** FAQ dùng chung cho phần hiển thị và JSON-LD (text phải trùng khớp). */
const faqs: { q: string; a: string }[] = [
    {
        q: 'Bảng gõ VNI đầy đủ dùng những phím số nào?',
        a: 'VNI dùng hàng phím số để bỏ dấu: 1 = sắc, 2 = huyền, 3 = hỏi, 4 = ngã, 5 = nặng. Các phím tạo chữ đặc biệt: 6 = dấu mũ (â, ê, ô), 7 = dấu móc (ơ, ư), 8 = dấu trăng (ă), 9 = chữ đ.',
    },
    {
        q: 'Cách gõ chữ â, ê, ô, ơ, ư, đ trong VNI như thế nào?',
        a: 'Gõ a6 để được â, e6 để được ê, o6 để được ô, o7 để được ơ, u7 để được ư, d9 để được đ. Ví dụ chữ "được" gõ là d9-u7-o-c-5.',
    },
    {
        q: 'Kiểu gõ VNI khác Telex ở điểm nào?',
        a: 'VNI bỏ dấu bằng hàng phím số (1-5), còn Telex bỏ dấu bằng các phím chữ (s, f, r, x, j). VNI hợp với người quen gõ phím số; Telex phổ biến hơn và không phải rời hàng phím chính.',
    },
    {
        q: 'Có gõ được VNI trên điện thoại không?',
        a: 'Có. Cài Gboard hoặc Laban Key, vào cài đặt bàn phím tiếng Việt và chọn kiểu gõ VNI. Cách bỏ dấu bằng phím số giống hệt trên máy tính.',
    },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
};

// Breadcrumb + Article schema cho on-page SEO (sinh từ helper dùng chung)
const guideSchemas = buildGuideSchemas({
    path: '/huong-dan-vni',
    breadcrumbName: 'Cách gõ VNI',
    headline: 'Hướng dẫn gõ Tiếng Việt kiểu VNI - Lựa chọn cho người thích phím số',
    description: 'Hướng dẫn gõ tiếng Việt kiểu VNI: bảng quy tắc dùng phím số để bỏ dấu thanh và dấu mũ, phù hợp người quen gõ phím số.',
    datePublished: '2026-01-14',
    dateModified: '2026-06-25',
});

const cellStyle: React.CSSProperties = { padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' };
const headStyle: React.CSSProperties = { padding: '14px 15px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', fontWeight: 700 };

const VniGuide: React.FC = () => {
    const tableRows = buildVniTable();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', color: 'var(--text-main)' }}
        >
            <Seo
                title="Cách gõ VNI tiếng Việt: bảng số dấu chi tiết | Typing Kid VN"
                description="Hướng dẫn gõ tiếng Việt kiểu VNI: bảng quy tắc dùng phím số để bỏ dấu thanh và dấu mũ, phù hợp người quen gõ phím số."
                path="/huong-dan-vni"
            />
            {/* FAQPage JSON-LD: sinh từ cùng mảng faqs với phần hiển thị bên dưới */}
            <JsonLd data={faqSchema} />
            {/* Breadcrumb + Article JSON-LD */}
            {guideSchemas.map((s) => (
                <JsonLd key={s['@type'] as string} data={s} />
            ))}

            <Link to="/" className="tap-target" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary-color)', textDecoration: 'none', marginBottom: '30px', fontWeight: 'bold' }}>
                <ChevronLeft size={20} /> Quay lại trang chủ
            </Link>

            <header style={{ marginBottom: '50px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '20px' }}>
                    Hướng dẫn gõ Tiếng Việt kiểu VNI - Lựa chọn cho người thích phím số
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    VNI là kiểu gõ sử dụng các phím số ở hàng trên cùng để bỏ dấu. Đây là kỹ năng thú vị khi bạn muốn <strong>luyện gõ 10 ngón</strong> mà không lo bị nhầm giữa chữ cái và dấu thanh.
                </p>
                <img
                    src="/guides/keyboard.png"
                    alt="Bàn phím cơ hiện đại hỗ trợ gõ VNI"
                    style={{ width: '100%', borderRadius: '20px', marginTop: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                />
            </header>

            <article style={{ lineHeight: '1.8' }}>
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>1. Quy tắc gõ dấu trong VNI</h2>
                    <p>Mỗi con số từ 1 đến 9 đại diện cho một dấu thanh hoặc chữ cái đặc biệt:</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px' }}><strong>Phím 1:</strong> Dấu Sắc (a1 = á)</div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px' }}><strong>Phím 2:</strong> Dấu Huyền (a2 = à)</div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px' }}><strong>Phím 3:</strong> Dấu Hỏi (a3 = ả)</div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px' }}><strong>Phím 4:</strong> Dấu Ngã (a4 = ã)</div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px' }}><strong>Phím 5:</strong> Dấu Nặng (a5 = ạ)</div>
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>2. Quy tắc gõ chữ cái đặc biệt</h2>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px' }}>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '10px' }}>Phím <strong>6</strong>: được dấu mũ cho <strong>â, ê, ô</strong> (a6 = â)</li>
                            <li style={{ marginBottom: '10px' }}>Phím <strong>7</strong>: được dấu móc cho <strong>ư, ơ</strong> (u7 = ư)</li>
                            <li style={{ marginBottom: '10px' }}>Phím <strong>8</strong>: được dấu trăng cho <strong>ă</strong> (a8 = ă)</li>
                            <li style={{ marginBottom: '10px' }}>Phím <strong>9</strong>: được chữ <strong>đ</strong> (d9 = đ)</li>
                        </ul>
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>3. Bảng gõ VNI đầy đủ (nguyên âm và thanh điệu)</h2>
                    <p>Bảng tra cứu cách gõ mọi nguyên âm tiếng Việt với 5 thanh trong kiểu VNI. Cột "Gõ gốc" là cách tạo ra nguyên âm chưa dấu.</p>
                    <div style={{ overflowX: 'auto', marginTop: '20px', borderRadius: '12px' }}>
                        <table style={{ width: '100%', minWidth: '560px', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.03)' }}>
                            <thead>
                                <tr>
                                    <th style={headStyle}>Nguyên âm</th>
                                    <th style={headStyle}>Gõ gốc</th>
                                    {TONE_LABELS.map((t) => (
                                        <th key={t} style={headStyle}>{t}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows.map((row) => (
                                    <tr key={row.base}>
                                        <td style={{ ...cellStyle, fontSize: '20px', fontWeight: 700, color: 'var(--primary-color)' }}>{row.base}</td>
                                        <td style={cellStyle}><code>{row.baseKeys}</code></td>
                                        {row.cells.map((cell) => (
                                            <td key={cell.char} style={cellStyle}>
                                                <div style={{ fontSize: '18px', fontWeight: 600 }}>{cell.char}</div>
                                                <code style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{cell.keys}</code>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>4. Lỗi thường gặp khi gõ VNI & cách sửa</h2>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px' }}>
                        <p style={{ marginBottom: '12px' }}><strong>1. Số bị chèn vào giữa chữ:</strong> nếu bộ gõ chưa bật chế độ VNI, phím số sẽ ra số thật. Hãy kiểm tra đã chọn đúng kiểu gõ VNI trong bộ gõ.</p>
                        <p style={{ marginBottom: '12px' }}><strong>2. Gõ sai thứ tự dấu mũ và thanh:</strong> luôn tạo chữ đặc biệt trước (a6 = â) rồi mới thêm thanh (a6-1 = ấ).</p>
                        <p style={{ marginBottom: '0' }}><strong>3. Cần gõ số thật ngay sau nguyên âm:</strong> nhấn phím số thêm lần nữa hoặc dùng phím khử dấu để bộ gõ trả lại con số.</p>
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>5. Nên chọn VNI hay Telex?</h2>
                    <p>
                        VNI tách bạch chữ cái và dấu (dấu nằm ở hàng số) nên dễ hình dung, hợp người mới. Telex gõ nhanh hơn vì không phải rời hàng phím chính. Bạn có thể tham khảo thêm{' '}
                        <Link to="/huong-dan-telex" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>hướng dẫn gõ kiểu Telex</Link> để so sánh và chọn kiểu phù hợp.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>Câu hỏi thường gặp về gõ VNI</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {faqs.map((f) => (
                            <div key={f.q} style={{ background: 'rgba(255,255,255,0.03)', padding: '20px 25px', borderRadius: '16px' }}>
                                <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '10px' }}>{f.q}</h3>
                                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7', margin: 0 }}>{f.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </article>

            <RelatedGuides currentPath="/huong-dan-vni" />

            <div style={{ marginTop: '60px', padding: '30px', background: 'var(--primary-color)', borderRadius: '20px', textAlign: 'center' }}>
                <h3 style={{ color: '#fff', marginBottom: '20px' }}>Luyện gõ VNI ngay thôi!</h3>
                <Link to="/?tab=vni" style={{ padding: '12px 30px', background: '#fff', color: 'var(--primary-color)', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                    Vào bài học VNI
                </Link>
            </div>
        </motion.div>
    );
};

export default VniGuide;
