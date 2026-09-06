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
 * FAQ: 1 mảng dùng cho CẢ phần hiển thị lẫn JSON-LD.
 * Bắt buộc dùng chung nguồn để text trong schema trùng khớp text người dùng thấy
 * (yêu cầu của Google cho rich result FAQ).
 */
const faqs: { q: string; a: string }[] = [
    {
        q: 'Bé mấy tuổi có thể tập gõ 10 ngón?',
        a: 'Từ 7–8 tuổi, khi bàn tay bé đủ rộng để đặt 4 ngón lên 4 phím liền nhau và bé đã đọc tốt. Dưới 7 tuổi chỉ nên chơi game làm quen bàn phím, chưa cần đúng ngón.',
    },
    {
        q: 'Mỗi ngày bé nên tập gõ bao lâu?',
        a: '10 phút mỗi ngày, 5–6 ngày một tuần là đủ. Tập ngắn nhưng đều tốt hơn tập dài rồi bỏ. Dừng ngay khi bé mỏi tay hoặc mất tập trung.',
    },
    {
        q: 'Tập gõ 10 ngón mất bao lâu?',
        a: 'Theo lộ trình 4 tuần, bé gõ được câu tiếng Việt có dấu mà không nhìn bàn phím. Tốc độ 20–25 từ/phút thường đến sau 2–3 tháng tập đều.',
    },
    {
        q: 'Có cần mua phần mềm tập gõ cho bé không?',
        a: 'Không. Typing Kid VN miễn phí, chạy trên trình duyệt máy tính, có bài theo từng hàng phím, bài gõ dấu Telex/VNI và mini game. Chỉ cần bàn phím rời và 10 phút mỗi ngày.',
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
    path: '/tap-go-10-ngon-cho-be',
    breadcrumbName: 'Tập gõ cho bé',
    headline: 'Tập gõ 10 ngón cho bé: lộ trình 4 tuần tại nhà',
    description: 'Cho bé tập gõ 10 ngón tiếng Việt tại nhà: mấy tuổi bắt đầu, 10 phút mỗi ngày, lộ trình 4 tuần từ hàng phím cơ sở đến gõ dấu Telex/VNI, kèm bài tập miễn phí.',
    datePublished: '2026-09-08',
    dateModified: '2026-09-08',
});

const KidsRoadmap: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '60px 20px', color: 'var(--text-main)' }}
        >
            <Seo
                title="Tập gõ 10 ngón cho bé: lộ trình 4 tuần tại nhà | Typing Kid VN"
                description="Cho bé tập gõ 10 ngón tiếng Việt tại nhà: mấy tuổi bắt đầu, 10 phút mỗi ngày, lộ trình 4 tuần từ hàng phím cơ sở đến gõ dấu Telex/VNI, kèm bài tập miễn phí."
                path="/tap-go-10-ngon-cho-be"
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
                    Tập gõ 10 ngón cho bé: lộ trình 4 tuần tại nhà
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Bé từ 7–8 tuổi là tập gõ 10 ngón được. Không cần mua phần mềm; chỉ cần 10 phút mỗi ngày và giữ đúng ngón ngay từ đầu. Dưới đây là lộ trình 4 tuần, kèm bài tập miễn phí trên Typing Kid VN (chạy trên máy tính).
                </p>
            </header>

            <article style={{ lineHeight: '1.8' }}>
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>1. Mấy tuổi thì bắt đầu được?</h2>
                    <p style={{ marginBottom: '16px' }}>
                        Tuổi bắt đầu hợp lý là 7–8, tức lớp 2 hoặc lớp 3. Lúc đó bàn tay bé đủ rộng để đặt bốn ngón lên bốn phím liền nhau mà không phải căng, và bé đã đọc chữ tốt.
                    </p>
                    <p style={{ marginBottom: '16px' }}>
                        Dưới 7 tuổi thì chưa cần ép đúng ngón, cho bé chơi game làm quen vị trí phím là đủ. Từ 10 tuổi trở lên bé học nhanh, tốc độ có thể gần bằng người lớn.
                    </p>
                    <p style={{ marginBottom: '0' }}>
                        Hai dấu hiệu bé đã sẵn sàng: ngồi yên trước màn hình được 10 phút, và đọc trôi một câu ngắn mà không phải đánh vần.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>2. Chuẩn bị: bàn phím, tư thế, quy tắc 10 phút</h2>
                    <p style={{ marginBottom: '16px' }}>
                        Bé cần một bàn phím rời cỡ chuẩn. Bàn phím laptop 13 inch quá hẹp, các ngón phải co lại nên bé khó giữ đúng thế tay.
                    </p>
                    <p style={{ marginBottom: '16px' }}>
                        Ghế chỉnh sao cho hai bàn chân bé chạm sàn, khuỷu tay gập vuông ngang mặt bàn, mắt cách màn hình 50–70 cm. Xem thêm <Link to="/tu-the-go-phim" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>tư thế ngồi và cách đặt tay</Link>.
                    </p>
                    <p style={{ marginBottom: '16px' }}>
                        Chỉ cho bé <Link to="/bi-mat-phim-f-j" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>gờ nổi trên phím F và J</Link>: hai ngón trỏ sờ thấy gờ là biết tay đã về đúng chỗ, không cần nhìn xuống.
                    </p>
                    <p style={{ marginBottom: '0' }}>
                        Mỗi ngày 10 phút, 5–6 ngày một tuần. Dừng ngay khi bé mỏi tay hoặc mất tập trung. Vài tuần đầu đừng nhắc tới tốc độ: chỉ cần gõ đúng phím bằng đúng ngón.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>3. Lộ trình 4 tuần</h2>
                    <p style={{ marginBottom: '16px' }}>
                        Mỗi tuần một mục tiêu, khớp với các bài tập trên Typing Kid VN:
                    </p>
                    <div style={{ overflowX: 'auto', marginTop: '20px', marginBottom: '25px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', overflow: 'hidden' }}>
                            <thead>
                                <tr>
                                    <th style={headStyle}>Tuần</th>
                                    <th style={{ ...headStyle, textAlign: 'left' }}>Mục tiêu</th>
                                    <th style={{ ...headStyle, textAlign: 'left' }}>Bài trên Typing Kid VN</th>
                                    <th style={{ ...headStyle, textAlign: 'left' }}>Đạt khi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={cellStyle}>1</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Hàng phím cơ sở ASDF JKL; không nhìn tay</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>
                                        <Link to="/?mode=basic_home" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Cơ bản: Hàng phím cơ sở</Link>
                                    </td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>gõ đúng từ 90% trở lên mà không nhìn bàn phím</td>
                                </tr>
                                <tr>
                                    <td style={cellStyle}>2</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Thêm hàng phím trên</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>
                                        <Link to="/?mode=basic_top" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Cơ bản: Hàng phím trên</Link>
                                    </td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>khoảng 10 từ/phút, đúng từ 90%</td>
                                </tr>
                                <tr>
                                    <td style={cellStyle}>3</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Hàng phím dưới, phím cách, chữ hoa</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>
                                        <Link to="/?mode=basic_bottom" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Cơ bản: Hàng phím dưới</Link>
                                    </td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>gõ được câu ngắn không dấu</td>
                                </tr>
                                <tr>
                                    <td style={cellStyle}>4</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Dấu tiếng Việt: chọn Telex hoặc VNI</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>
                                        <Link to="/?mode=vietnamese_telex" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Luyện dấu Telex</Link> hoặc <Link to="/?mode=vietnamese_vni" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Luyện dấu VNI</Link>
                                    </td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>gõ được tên bé và tên trường có dấu</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px 25px', borderRadius: '16px', marginBottom: '20px' }}>
                        <p style={{ marginBottom: '10px' }}>
                            <strong>Hướng dẫn chi tiết từng tuần cho cha mẹ:</strong>
                        </p>
                        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li><strong>Tuần 1:</strong> Nhớ vị trí nghỉ của 8 ngón trên hàng cơ sở, hai ngón trỏ luôn đặt vào phím có gờ, không cúi nhìn tay.</li>
                            <li><strong>Tuần 2:</strong> Vươn ngón lên hàng trên gõ rồi rút về hàng cơ sở ngay.</li>
                            <li><strong>Tuần 3:</strong> Thêm hàng dưới, ngón cái nhấn phím cách, ngón út giữ Shift khi viết hoa.</li>
                            <li><strong>Tuần 4:</strong> Gõ từ có dấu. Cho bé tập với tên mình, tên người nhà và tên trường.</li>
                        </ul>
                    </div>
                    <p style={{ marginBottom: '0' }}>
                        Tuần 4 phải chọn kiểu gõ dấu. Với học sinh tiểu học nên chọn Telex, vì phím bỏ dấu nằm ngay trong vùng chữ, bé không phải vươn lên hàng số: xem <Link to="/huong-dan-telex" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>cách gõ Telex</Link> và in <Link to="/bang-go-telex" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>bảng gõ Telex</Link> khổ A4 dán cạnh màn hình. Nhà đã quen VNI thì dùng <Link to="/huong-dan-vni" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>cách gõ VNI</Link> và <Link to="/bang-go-vni" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>bảng gõ VNI</Link>.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>4. Giữ bé không chán</h2>
                    <p style={{ marginBottom: '16px' }}>
                        Gõ đi gõ lại một dãy ký tự thì bé chán rất nhanh. Vài cách giữ buổi tập nhẹ nhàng:
                    </p>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px 25px', borderRadius: '16px' }}>
                        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li>
                                <strong>Xen game:</strong> cuối buổi thưởng bé 2–3 phút <Link to="/?mode=totoro_chase" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Game: Mie đuổi bắt</Link> — vẫn là gõ, nhưng bé thấy như chơi.
                            </li>
                            <li>
                                <strong>Đổi bài sau mỗi 3 phút:</strong> luân phiên bài ký tự đơn, từ ngắn và câu.
                            </li>
                            <li>
                                <strong>Khen độ chính xác, đừng khen tốc độ:</strong> đạt 90–95% đúng thì tốc độ tự lên.
                            </li>
                            <li>
                                <strong>Dán bảng tra cạnh máy:</strong> quên cách bỏ dấu thì bé liếc bảng, không cúi nhìn bàn phím.
                            </li>
                            <li>
                                <strong>Xem kết quả cùng bé:</strong> cuối bài cho bé tự đọc số liệu chính xác và hoàn thành để thấy mình tiến bộ.
                            </li>
                        </ul>
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>5. Lỗi hay gặp và cách sửa</h2>
                    <p style={{ marginBottom: '16px' }}>
                        Bốn lỗi hầu như bé nào cũng mắc, và cách sửa:
                    </p>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>Lỗi 1: Bé luôn nhìn xuống bàn phím khi gõ</h3>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                                Bé chưa tin vào cảm giác ngón tay. Phủ một chiếc khăn mỏng hoặc tờ A4 lên mu hai bàn tay, cho bé nhìn màn hình và định vị bằng gờ F, J.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>Lỗi 2: Bé chỉ dùng hai ngón trỏ để mổ cò</h3>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                                Bé muốn gõ nhanh cho xong. Quay lại bài hàng phím cơ sở của tuần 1, gõ thật chậm, chỉ bấm khi đúng ngón đã đặt đúng phím.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>Lỗi 3: Bé lúng túng gõ dấu sai thứ tự hoặc sai vị trí</h3>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                                Bé không biết gõ dấu lúc nào. Nói với bé: gõ dấu ngay sau nguyên âm hay để cuối từ đều được, bộ gõ nhận cả hai cách.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>Lỗi 4: Bé ngồi cong lưng hoặc cúi sát mắt vào màn hình</h3>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                                Bé đã mỏi, hoặc ghế chưa vừa tầm. Cho nghỉ ngay, vươn vai vài phút, rồi chỉnh lại độ cao ghế và khoảng cách màn hình.
                            </p>
                        </div>
                    </div>
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
                        Bắt đầu tuần 1 ngay
                    </Link>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        Mở trên máy tính có bàn phím rời.
                    </div>
                </div>
            </article>

            <RelatedGuides currentPath="/tap-go-10-ngon-cho-be" />
        </motion.div>
    );
};

export default KidsRoadmap;
