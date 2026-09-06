import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import RelatedGuides from '../components/RelatedGuides';
import { buildGuideSchemas } from '../components/guide-schema';
import { TELEX_RULES } from '../constants';

/**
 * Nhóm nguyên âm theo gốc × 5 thanh (sắc, huyền, hỏi, ngã, nặng).
 * Đây chỉ là cấu trúc TRÌNH BÀY cho bảng tra cứu — phím gõ thực tế vẫn
 * lấy từ TELEX_RULES (1 nguồn dữ liệu duy nhất ở constants.ts) để tránh lệch.
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
 * Sinh dữ liệu bảng: mỗi nguyên âm gốc → phím gõ ra gốc + phím gõ 5 thanh.
 * Phím gốc của nguyên âm có dấu mũ/móc (â, ă, ê, ô, ơ, ư) lấy từ TELEX_RULES;
 * nguyên âm thường (a, e, i, o, u, y) thì gõ chính nó.
 */
function buildTelexTable() {
    return VOWEL_GROUPS.map(({ base, chars }) => ({
        base,
        baseKeys: (TELEX_RULES[base] ?? [base]).join(''),
        // Guard ?? để không crash nếu constants.ts đổi và thiếu key ký tự nào đó
        cells: chars.map((c) => ({ char: c, keys: (TELEX_RULES[c] ?? ['?']).join('') })),
    }));
}

/**
 * FAQ: 1 mảng dùng cho CẢ phần hiển thị lẫn JSON-LD.
 * Bắt buộc dùng chung nguồn để text trong schema trùng khớp text người dùng thấy
 * (yêu cầu của Google cho rich result FAQ).
 */
const faqs: { q: string; a: string }[] = [
    {
        q: 'Bảng gõ dấu Telex đầy đủ gồm những phím nào?',
        a: 'Telex dùng 5 phím chữ để bỏ dấu thanh: s = sắc, f = huyền, r = hỏi, x = ngã, j = nặng. Các nguyên âm đặc biệt gõ bằng cách lặp hoặc thêm w: aa = â, ee = ê, oo = ô, aw = ă, ow = ơ, uw = ư, dd = đ.',
    },
    {
        q: 'Cách gõ chữ â, ê, ô, ơ, ư trong Telex như thế nào?',
        a: 'Gõ aa để được â, ee để được ê, oo để được ô. Với dấu móc: ow để được ơ, uw để được ư. Riêng ă gõ là aw. Ví dụ chữ "tươi" gõ là t-u-w-o-w-i.',
    },
    {
        q: 'Kiểu gõ Telex khác VNI ở điểm nào?',
        a: 'Telex bỏ dấu bằng các phím chữ (s, f, r, x, j) nên không cần rời hàng phím chính, gõ nhanh hơn. VNI bỏ dấu bằng hàng phím số (1, 2, 3, 4, 5). Telex phổ biến hơn, còn VNI hợp với người quen dùng phím số.',
    },
    {
        q: 'Vì sao gõ "oo" lại ra chữ "ô" ngoài ý muốn?',
        a: 'Vì oo là tổ hợp Telex tạo ra ô. Khi cần hai chữ o liền nhau (ví dụ "xoong"), bạn gõ chữ o thứ hai rồi nhấn lại một phím o nữa để khử dấu mũ, hoặc dùng phím khử dấu của bộ gõ.',
    },
    {
        q: 'Làm sao để gõ Telex trên điện thoại?',
        a: 'Cài bộ gõ hỗ trợ tiếng Việt như Gboard hoặc Laban Key, vào phần cài đặt bàn phím và chọn kiểu gõ Telex. Sau đó bạn gõ y hệt như trên máy tính: s = sắc, f = huyền, aa = â...',
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
    path: '/huong-dan-telex',
    breadcrumbName: 'Cách gõ Telex',
    headline: 'Hướng dẫn gõ Tiếng Việt kiểu Telex - Cách gõ nhanh nhất',
    description: 'Bảng chữ Telex đầy đủ: cách gõ 5 dấu sắc, huyền, hỏi, ngã, nặng và â/ê/ô/ơ/ư. Hướng dẫn cách đánh bàn phím Telex nhanh, có ví dụ và mẹo nhớ.',
    datePublished: '2026-01-14',
    dateModified: '2026-08-13',
});

const cellStyle: React.CSSProperties = { padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' };
const headStyle: React.CSSProperties = { padding: '14px 15px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', fontWeight: 700 };

const TelexGuide: React.FC = () => {
    const tableRows = buildTelexTable();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', color: 'var(--text-main)' }}
        >
            <Seo
                title="Bảng chữ Telex & cách gõ Telex nhanh | Typing Kid VN"
                description="Bảng chữ Telex đầy đủ: cách gõ 5 dấu sắc, huyền, hỏi, ngã, nặng và â/ê/ô/ơ/ư. Hướng dẫn cách đánh bàn phím Telex nhanh, có ví dụ và mẹo nhớ."
                path="/huong-dan-telex"
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
                    Hướng dẫn gõ Tiếng Việt kiểu Telex - Cách gõ nhanh nhất
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Telex là kiểu gõ tiếng Việt phổ biến nhất hiện nay. Bài viết hướng dẫn <strong>cách gõ chữ Telex</strong> và <strong>cách đánh bàn phím Telex</strong> chuẩn, giúp bạn <strong>luyện gõ 10 ngón tiếng Việt</strong> nhanh mà không phải rời hàng phím chính.
                </p>
                <img
                    src="/guides/keyboard.png"
                    alt="Bàn phím cơ hiện đại hỗ trợ gõ Telex"
                    style={{ width: '100%', borderRadius: '20px', marginTop: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                />
            </header>

            <article style={{ lineHeight: '1.8' }}>
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>1. Quy tắc gõ dấu trong Telex</h2>
                    <p>Để bỏ dấu trong Telex, bạn sử dụng các chữ cái thay cho dấu thanh:</p>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', overflow: 'hidden' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Dấu</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Phím gõ</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Ví dụ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td style={{ padding: '15px' }}>Sắc</td><td style={{ padding: '15px' }}><strong>s</strong></td><td style={{ padding: '15px' }}>as = á</td></tr>
                            <tr><td style={{ padding: '15px' }}>Huyền</td><td style={{ padding: '15px' }}><strong>f</strong></td><td style={{ padding: '15px' }}>af = à</td></tr>
                            <tr><td style={{ padding: '15px' }}>Hỏi</td><td style={{ padding: '15px' }}><strong>r</strong></td><td style={{ padding: '15px' }}>ar = ả</td></tr>
                            <tr><td style={{ padding: '15px' }}>Ngã</td><td style={{ padding: '15px' }}><strong>x</strong></td><td style={{ padding: '15px' }}>ax = ã</td></tr>
                            <tr><td style={{ padding: '15px' }}>Nặng</td><td style={{ padding: '15px' }}><strong>j</strong></td><td style={{ padding: '15px' }}>aj = ạ</td></tr>
                        </tbody>
                    </table>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>2. Quy tắc gõ chữ cái đặc biệt</h2>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px' }}>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '10px' }}>Gõ <strong>aa</strong> để được chữ <strong>â</strong></li>
                            <li style={{ marginBottom: '10px' }}>Gõ <strong>ee</strong> để được chữ <strong>ê</strong></li>
                            <li style={{ marginBottom: '10px' }}>Gõ <strong>oo</strong> để được chữ <strong>ô</strong></li>
                            <li style={{ marginBottom: '10px' }}>Gõ <strong>dd</strong> để được chữ <strong>đ</strong></li>
                            <li style={{ marginBottom: '10px' }}>Gõ <strong>aw</strong> để được chữ <strong>ă</strong></li>
                            <li style={{ marginBottom: '10px' }}>Gõ <strong>uw</strong> để được chữ <strong>ư</strong></li>
                            <li style={{ marginBottom: '10px' }}>Gõ <strong>ow</strong> để được chữ <strong>ơ</strong></li>
                        </ul>
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>3. Bảng chữ Telex đầy đủ: bảng gõ dấu nguyên âm và thanh điệu</h2>
                    <p>Bảng tra cứu nhanh cách gõ mọi nguyên âm tiếng Việt với 5 thanh trong kiểu Telex. Cột "Gõ gốc" là cách tạo ra nguyên âm chưa dấu.</p>
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
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>4. Mẹo gõ Telex nhanh</h2>
                    <p>Luôn tuân thủ quy tắc: <strong>Gõ hết các chữ cái trong từ rồi mới gõ phím dấu.</strong></p>
                    <p style={{ marginTop: '10px' }}>Ví dụ: Để gõ chữ "Trường", hãy gõ liên tục <code>t-r-u-o-n-g-w-f</code>.</p>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px', marginTop: '20px' }}>
                        <p style={{ marginBottom: '12px' }}><strong>Hai cách bỏ dấu đều được chấp nhận</strong> khi luyện tập trên Typing Kid:</p>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            <li style={{ marginBottom: '10px' }}><strong>Bỏ dấu ngay tại chữ cái:</strong> "học" gõ <code>h-o-j-c</code> — dấu nặng đi liền sau chữ o.</li>
                            <li style={{ marginBottom: '0' }}><strong>Bỏ dấu cuối từ (kiểu Unikey):</strong> "học" gõ <code>h-o-c-j</code> — gõ hết chữ rồi mới bỏ dấu. Đây là thói quen phổ biến nhất và cũng là cách bàn phím gợi ý phím sáng.</li>
                        </ul>
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>5. Cách gõ Telex trên điện thoại</h2>
                    <p>Trên điện thoại, bạn cần một bàn phím ảo hỗ trợ tiếng Việt thì mới gõ được Telex:</p>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px', marginTop: '20px' }}>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            <li style={{ marginBottom: '10px' }}><strong>Android:</strong> dùng <strong>Gboard</strong> hoặc <strong>Laban Key</strong>. Vào Cài đặt bàn phím → Ngôn ngữ → thêm "Tiếng Việt (Telex)".</li>
                            <li style={{ marginBottom: '10px' }}><strong>iPhone:</strong> mở Cài đặt → Cài đặt chung → Bàn phím → thêm bàn phím "Tiếng Việt - Telex".</li>
                            <li>Sau khi bật, cách gõ dấu hoàn toàn giống trên máy tính: <code>s</code> = sắc, <code>f</code> = huyền, <code>aa</code> = â.</li>
                        </ul>
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>6. Lỗi thường gặp khi gõ Telex & cách sửa</h2>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px' }}>
                        <p style={{ marginBottom: '12px' }}><strong>1. Gõ "oo" ra "ô" ngoài ý muốn:</strong> với các từ cần 2 chữ o (như "xoong", "boong"), gõ chữ o thứ hai rồi nhấn thêm một phím <code>o</code> để khử dấu mũ.</p>
                        <p style={{ marginBottom: '12px' }}><strong>2. Gõ dấu quá sớm:</strong> nếu bỏ dấu khi chưa gõ xong phụ âm cuối, dấu có thể đặt sai chỗ. Hãy gõ hết chữ rồi mới gõ phím dấu.</p>
                        <p style={{ marginBottom: '0' }}><strong>3. Muốn giữ nguyên chữ "w", "s", "f"...:</strong> khi cần gõ tiếng nước ngoài, nhấn phím dấu thêm một lần nữa để bộ gõ trả lại đúng ký tự gốc.</p>
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>7. Telex và VNI khác nhau thế nào?</h2>
                    <p>
                        Telex bỏ dấu bằng các phím chữ (s, f, r, x, j) nên tay luôn ở gần hàng phím chính, gõ nhanh và đỡ mỏi. VNI thì bỏ dấu bằng hàng phím số (1-5). Nếu bạn đã quen dùng phím số, hãy xem thêm{' '}
                        <Link to="/huong-dan-vni" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>hướng dẫn gõ kiểu VNI</Link>.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>Câu hỏi thường gặp về gõ Telex</h2>
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

            <RelatedGuides currentPath="/huong-dan-telex" />

            <div style={{ marginTop: '60px', padding: '30px', background: 'var(--primary-color)', borderRadius: '20px', textAlign: 'center' }}>
                <h3 style={{ color: '#fff', marginBottom: '20px' }}>Luyện gõ Telex ngay bây giờ!</h3>
                <Link to="/?tab=telex" style={{ padding: '12px 30px', background: '#fff', color: 'var(--primary-color)', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                    Vào bài học Telex
                </Link>
            </div>
        </motion.div>
    );
};

export default TelexGuide;
