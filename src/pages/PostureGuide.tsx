import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PostureGuide: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', color: 'var(--text-main)' }}
        >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary-color)', textDecoration: 'none', marginBottom: '30px', fontWeight: 'bold' }}>
                <ChevronLeft size={20} /> Quay lại trang chủ
            </Link>

            <header style={{ marginBottom: '50px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '20px' }}>
                    Hướng dẫn Tư thế ngồi & Cách đặt tay khi gõ 10 ngón
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Tư thế đúng không chỉ giúp bạn <strong>luyện gõ 10 ngón</strong> nhanh hơn mà còn bảo vệ sức khỏe cột sống và cổ tay của bạn.
                </p>
                <img
                    src="/guides/posture.png"
                    alt="Minh họa tư thế ngồi gõ phím chuẩn"
                    style={{ width: '100%', borderRadius: '20px', marginTop: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                />
            </header>

            <article style={{ lineHeight: '1.8' }}>
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>1. Tư thế ngồi đạt chuẩn</h2>
                    <p>Để đạt hiệu quả cao nhất khi <strong>luyện gõ 10 ngón tiếng Việt</strong>, bạn cần tuân thủ các quy tắc sau:</p>
                    <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                        <li><strong>Lưng:</strong> Luôn giữ thẳng lưng, không tựa quá sâu vào ghế hoặc ngả người về phía trước.</li>
                        <li><strong>Mắt:</strong> Giữ khoảng cách với màn hình từ 50cm đến 70cm. Tầm mắt nên ngang với cạnh trên của màn hình.</li>
                        <li><strong>Cánh tay:</strong> Thả lỏng, khuỷu tay vuông góc 90 độ.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>2. Vị trí đặt tay trên hàng phím cơ sở</h2>
                    <p>Trên bàn phím luôn có 2 phím đặc biệt là <strong>F</strong> và <strong>J</strong> có gờ nổi. Đây là căn cứ để bạn đặt tay mà không cần nhìn bàn phím.</p>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px', marginTop: '20px' }}>
                        <p><strong>Bàn tay trái:</strong></p>
                        <ul>
                            <li>Ngón út: Phím A</li>
                            <li>Ngón áp út: Phím S</li>
                            <li>Ngón giữa: Phím D</li>
                            <li>Ngón trỏ: Phím F (có gờ nổi)</li>
                        </ul>
                        <p style={{ marginTop: '15px' }}><strong>Bàn tay phải:</strong></p>
                        <ul>
                            <li>Ngón trỏ: Phím J (có gờ nổi)</li>
                            <li>Ngón giữa: Phím K</li>
                            <li>Ngón áp út: Phím L</li>
                            <li>Ngón út: Phím ;</li>
                        </ul>
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>3. Cách gõ phím Cách (Space)</h2>
                    <p>Hai ngón cái của bạn nên đặt hờ trên phím Cách. Khi gõ, bạn có thể dùng bất kỳ ngón cái nào cảm thấy thuận tiện nhất. Thông thường, nếu bạn vừa gõ bằng tay trái, hãy dùng ngón cái phải để gõ phím Cách và ngược lại.</p>
                </section>
            </article>

            <div style={{ marginTop: '60px', padding: '30px', background: 'var(--primary-color)', borderRadius: '20px', textAlign: 'center' }}>
                <h3 style={{ color: '#fff', marginBottom: '20px' }}>Sẵn sàng thực hành chưa?</h3>
                <Link to="/" style={{ padding: '12px 30px', background: '#fff', color: 'var(--primary-color)', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                    Bắt đầu luyện tập ngay
                </Link>
            </div>
        </motion.div>
    );
};

export default PostureGuide;
