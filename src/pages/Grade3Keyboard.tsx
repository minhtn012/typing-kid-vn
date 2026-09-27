import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import RelatedGuides from '../components/RelatedGuides';
import { buildGuideSchemas } from '../components/guide-schema';
import { cellStyle, headStyle } from './typing-table-data';

/**
 * Tên bài theo 3 bộ SGK Tin học 3 (kiểm 27/09/2026 trên vietjack, loigiaihay, kenhgiaovien).
 * Phần mềm SGK dùng: Kết nối tri thức → Kiran's Typing Tutor; Cánh diều, Chân trời sáng tạo → RapidTyping.
 * Sửa tên bài thì kiểm lại nguồn, đừng đoán.
 */
const LESSON_LINK = { color: 'var(--primary-color)', fontWeight: 600 } as const;

/** FAQ: 1 mảng dùng cho CẢ phần hiển thị lẫn JSON-LD (Google yêu cầu text trùng khớp). */
const faqs: { q: string; a: string }[] = [
    {
        q: 'Tin học lớp 3 học gõ bàn phím ở bài nào?',
        a: 'Sách Kết nối tri thức: Bài 5 "Sử dụng bàn phím". Sách Cánh diều: Chủ đề A3, gồm Bài 1 "Em làm quen với bàn phím", Bài 2 "Em tập gõ hàng phím cơ sở" và Bài 3 "Em tập gõ hàng phím trên và dưới". Sách Chân trời sáng tạo: Bài 5 "Tập gõ bàn phím".',
    },
    {
        q: 'Phần mềm tập gõ bàn phím lớp 3 là phần mềm gì?',
        a: 'Sách Kết nối tri thức dùng Kiran\'s Typing Tutor, sách Cánh diều và Chân trời sáng tạo dùng RapidTyping. Cả hai đều phải cài trên máy Windows. Nếu ở nhà không cài được, bé có thể luyện đúng các hàng phím đó trên Typing Kid VN, chạy ngay trong trình duyệt.',
    },
    {
        q: 'Luyện gõ bàn phím lớp 3 ở nhà có cần cài phần mềm không?',
        a: 'Không. Typing Kid VN miễn phí, không cần cài đặt và không cần tài khoản. Có sẵn 3 bài hàng phím cơ sở, hàng phím trên, hàng phím dưới giống nội dung SGK. Cần máy tính có bàn phím; điện thoại và máy tính bảng không dùng được.',
    },
    {
        q: 'Hàng phím cơ sở gồm những phím nào?',
        a: 'Hàng phím cơ sở là hàng giữa của khu vực chính: A S D F G H J K L ;. Tám ngón đặt nghỉ trên A S D F (tay trái) và J K L ; (tay phải), hai ngón cái đặt trên phím cách. Phím F và J có gờ nổi để ngón trỏ tìm đúng chỗ mà không nhìn bàn phím.',
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

const pageSchemas = buildGuideSchemas({
    path: '/tap-go-ban-phim-lop-3',
    breadcrumbName: 'Tập gõ bàn phím lớp 3',
    headline: 'Tập gõ bàn phím Tin học lớp 3: luyện online theo bài SGK',
    description: 'Tập gõ bàn phím Tin học lớp 3 theo đúng bài SGK Kết nối tri thức, Cánh diều, Chân trời sáng tạo: hàng phím cơ sở, hàng trên, hàng dưới. Luyện online miễn phí, không cần cài phần mềm.',
    datePublished: '2026-09-27',
    dateModified: '2026-09-27',
});

const Grade3Keyboard: React.FC = () => {
    return (
        <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '60px 20px', color: 'var(--text-main)' }}
        >
            <Seo
                title="Tập gõ bàn phím Tin học lớp 3: luyện online theo bài SGK | Typing Kid VN"
                description="Tập gõ bàn phím Tin học lớp 3 theo đúng bài SGK Kết nối tri thức, Cánh diều, Chân trời sáng tạo: hàng phím cơ sở, hàng trên, hàng dưới. Luyện online miễn phí, không cần cài phần mềm."
                path="/tap-go-ban-phim-lop-3"
            />
            {/* FAQPage JSON-LD: sinh từ cùng mảng faqs với phần hiển thị bên dưới */}
            <JsonLd data={faqSchema} />
            {/* Breadcrumb + Article JSON-LD */}
            {pageSchemas.map((s) => (
                <JsonLd key={s['@type'] as string} data={s} />
            ))}

            <Link to="/" className="tap-target" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary-color)', textDecoration: 'none', marginBottom: '30px', fontWeight: 'bold' }}>
                <ChevronLeft size={20} /> Quay lại trang chủ
            </Link>

            <header style={{ marginBottom: '50px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '20px' }}>
                    Tập gõ bàn phím Tin học lớp 3: luyện online theo bài SGK
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Cả ba bộ sách Tin học 3 đều dạy gõ bàn phím theo cùng thứ tự: làm quen bàn phím, hàng phím cơ sở, rồi hàng phím trên và hàng phím dưới. Trang này ghép từng bài trong sách với bài luyện tương ứng trên Typing Kid VN, để bé ôn ở nhà mà không cần cài Kiran's Typing Tutor hay RapidTyping.
                </p>
            </header>

            <article style={{ lineHeight: '1.8' }}>
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>1. Bài trong sách và bài luyện tương ứng</h2>
                    <p style={{ marginBottom: '16px' }}>
                        Tìm đúng bộ sách của bé, bấm vào bài luyện ở cột cuối để mở ngay trên máy tính:
                    </p>
                    <div style={{ overflowX: 'auto', marginTop: '20px', marginBottom: '25px' }}>
                        <table style={{ width: '100%', minWidth: '560px', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', overflow: 'hidden' }}>
                            <thead>
                                <tr>
                                    <th style={{ ...headStyle, textAlign: 'left' }}>Bộ sách</th>
                                    <th style={{ ...headStyle, textAlign: 'left' }}>Bài trong SGK</th>
                                    <th style={{ ...headStyle, textAlign: 'left' }}>Luyện trên Typing Kid VN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Kết nối tri thức</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Bài 5. Sử dụng bàn phím</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>
                                        <Link to="/?mode=basic_home" style={LESSON_LINK}>Hàng phím cơ sở</Link>, <Link to="/?mode=basic_top" style={LESSON_LINK}>hàng phím trên</Link>, <Link to="/?mode=basic_bottom" style={LESSON_LINK}>hàng phím dưới</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Cánh diều</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Chủ đề A3, Bài 1. Em làm quen với bàn phím</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>
                                        <Link to="/tu-the-go-phim" style={LESSON_LINK}>Tư thế ngồi và cách đặt tay</Link>, <Link to="/bi-mat-phim-f-j" style={LESSON_LINK}>phím F và J</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Cánh diều</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Chủ đề A3, Bài 2. Em tập gõ hàng phím cơ sở</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>
                                        <Link to="/?mode=basic_home" style={LESSON_LINK}>Hàng phím cơ sở</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Cánh diều</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Chủ đề A3, Bài 3. Em tập gõ hàng phím trên và dưới</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>
                                        <Link to="/?mode=basic_top" style={LESSON_LINK}>Hàng phím trên</Link>, <Link to="/?mode=basic_bottom" style={LESSON_LINK}>hàng phím dưới</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Chân trời sáng tạo</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Bài 5. Tập gõ bàn phím</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>
                                        <Link to="/?mode=basic_home" style={LESSON_LINK}>Hàng phím cơ sở</Link>, <Link to="/?mode=basic_top" style={LESSON_LINK}>hàng phím trên</Link>, <Link to="/?mode=basic_bottom" style={LESSON_LINK}>hàng phím dưới</Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p style={{ marginBottom: '0' }}>
                        Trong sách, bài thực hành dùng phần mềm cài trên máy: Kiran's Typing Tutor (Kết nối tri thức) hoặc RapidTyping (Cánh diều, Chân trời sáng tạo). Typing Kid VN luyện cùng các hàng phím đó ngay trên trình duyệt, nên dùng được cả ở nhà lẫn ở phòng máy.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>2. Em tập gõ hàng phím cơ sở: đặt tay thế nào?</h2>
                    <p style={{ marginBottom: '16px' }}>
                        Hàng phím cơ sở là hàng giữa của khu vực chính: <strong>A S D F G H J K L ;</strong>. Trước khi gõ, tám ngón đặt nghỉ trên tám phím, hai ngón cái đặt trên phím cách. Hai ngón trỏ tìm gờ nổi trên phím <strong>F</strong> và <strong>J</strong>. Gõ xong phím nào thì đưa ngón về lại chỗ nghỉ.
                    </p>
                    <div style={{ overflowX: 'auto', marginTop: '20px', marginBottom: '0' }}>
                        <table style={{ width: '100%', minWidth: '560px', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', overflow: 'hidden' }}>
                            <thead>
                                <tr>
                                    <th style={{ ...headStyle, textAlign: 'left' }}>Ngón tay</th>
                                    <th style={headStyle}>Phím nghỉ (hàng cơ sở)</th>
                                    <th style={headStyle}>Hàng phím trên</th>
                                    <th style={headStyle}>Hàng phím dưới</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td style={{ ...cellStyle, textAlign: 'left' }}>Út trái</td><td style={cellStyle}>A</td><td style={cellStyle}>Q</td><td style={cellStyle}>Z</td></tr>
                                <tr><td style={{ ...cellStyle, textAlign: 'left' }}>Áp út trái</td><td style={cellStyle}>S</td><td style={cellStyle}>W</td><td style={cellStyle}>X</td></tr>
                                <tr><td style={{ ...cellStyle, textAlign: 'left' }}>Giữa trái</td><td style={cellStyle}>D</td><td style={cellStyle}>E</td><td style={cellStyle}>C</td></tr>
                                <tr><td style={{ ...cellStyle, textAlign: 'left' }}>Trỏ trái</td><td style={cellStyle}>F, G</td><td style={cellStyle}>R, T</td><td style={cellStyle}>V, B</td></tr>
                                <tr><td style={{ ...cellStyle, textAlign: 'left' }}>Trỏ phải</td><td style={cellStyle}>J, H</td><td style={cellStyle}>U, Y</td><td style={cellStyle}>M, N</td></tr>
                                <tr><td style={{ ...cellStyle, textAlign: 'left' }}>Giữa phải</td><td style={cellStyle}>K</td><td style={cellStyle}>I</td><td style={cellStyle}>,</td></tr>
                                <tr><td style={{ ...cellStyle, textAlign: 'left' }}>Áp út phải</td><td style={cellStyle}>L</td><td style={cellStyle}>O</td><td style={cellStyle}>.</td></tr>
                                <tr><td style={{ ...cellStyle, textAlign: 'left' }}>Út phải</td><td style={cellStyle}>;</td><td style={cellStyle}>P</td><td style={cellStyle}>/</td></tr>
                                <tr><td style={{ ...cellStyle, textAlign: 'left' }}>Hai ngón cái</td><td style={cellStyle} colSpan={3}>Phím cách</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>3. Em tập gõ hàng phím trên và dưới</h2>
                    <p style={{ marginBottom: '16px' }}>
                        Mỗi ngón chỉ phụ trách các phím nằm thẳng trên và thẳng dưới phím nghỉ của nó (bảng ở mục 2). Ngón vươn lên hoặc xuống gõ, rồi rút ngay về hàng cơ sở. Ngón trỏ làm nhiều nhất: mỗi bên phụ trách thêm cột phím ở giữa (G, T, B bên trái; H, Y, N bên phải).
                    </p>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px 25px', borderRadius: '16px' }}>
                        <p style={{ marginBottom: '10px' }}>
                            <strong>Khi luyện trên Typing Kid VN:</strong>
                        </p>
                        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Bàn phím trên màn hình tô sáng phím cần gõ, bàn tay minh họa chỉ ngón nào bấm phím đó.</li>
                            <li>Cuối bài có tốc độ (từ/phút), độ chính xác và 1–3 sao.</li>
                            <li>Tiến độ lưu ngay trên máy đang dùng, không cần đăng nhập.</li>
                            <li>Mỗi bài chỉ vài dòng, bé làm lại nhiều lần trong 10 phút là vừa.</li>
                        </ul>
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>4. Gợi ý cho thầy cô và phụ huynh</h2>
                    <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <li>
                            <strong>Ở phòng máy:</strong> gửi thẳng đường link một bài (ví dụ bài hàng phím cơ sở) cho cả lớp. Không cần cài đặt, không cần tạo tài khoản cho từng em.
                        </li>
                        <li>
                            <strong>Ở nhà:</strong> mỗi ngày 10 phút, ưu tiên gõ đúng ngón trước, tốc độ sau. Lộ trình từng tuần có ở trang <Link to="/tap-go-10-ngon-cho-be" style={LESSON_LINK}>tập gõ 10 ngón cho bé</Link>.
                        </li>
                        <li>
                            <strong>Cuối buổi:</strong> cho bé chơi 2–3 phút <Link to="/?mode=totoro_chase" style={LESSON_LINK}>Game: Mie đuổi bắt</Link>, vẫn là gõ phím nhưng bé thấy như chơi.
                        </li>
                        <li>
                            <strong>Bước tiếp theo:</strong> khi bé đã gõ đủ ba hàng phím không nhìn tay, chuyển sang gõ tiếng Việt có dấu với <Link to="/huong-dan-telex" style={LESSON_LINK}>kiểu gõ Telex</Link>.
                        </li>
                    </ul>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>Câu hỏi thường gặp</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {faqs.map((f) => (
                            <div key={f.q} style={{ background: 'rgba(255,255,255,0.03)', padding: '20px 25px', borderRadius: '16px' }}>
                                <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '10px' }}>{f.q}</h3>
                                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7', margin: 0 }}>{f.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA cuối */}
                <div
                    className="glass"
                    style={{
                        marginTop: '40px',
                        marginBottom: '40px',
                        padding: '28px',
                        borderRadius: '20px',
                        textAlign: 'center',
                    }}
                >
                    <Link
                        to="/?mode=basic_home"
                        style={{
                            display: 'inline-block',
                            padding: '14px 32px',
                            background: 'var(--primary-color)',
                            color: '#fff',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            fontWeight: 700,
                            fontSize: '16px',
                            marginBottom: '10px',
                        }}
                    >
                        Luyện hàng phím cơ sở ngay
                    </Link>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        Mở trên máy tính có bàn phím.
                    </div>
                </div>
            </article>

            <RelatedGuides currentPath="/tap-go-ban-phim-lop-3" />
        </motion.div>
    );
};

export default Grade3Keyboard;
