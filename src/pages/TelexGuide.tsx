import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TelexGuide: React.FC = () => {
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
                    Hướng dẫn gõ Tiếng Việt kiểu Telex - Cách gõ nhanh nhất
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Telex là kiểu gõ phổ biến nhất hiện nay tại Việt Nam. Nó giúp bạn <strong>luyện gõ 10 ngón tiếng Việt</strong> cực nhanh vì không cần di chuyển tay lên hàng phím số.
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
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>3. Mẹo gõ Telex nhanh</h2>
                    <p>Luôn tuân thủ quy tắc: <strong>Gõ hết các chữ cái trong từ rồi mới gõ phím dấu.</strong></p>
                    <p style={{ marginTop: '10px' }}>Ví dụ: Để gõ chữ "Trường", hãy gõ liên tục <code>t-r-u-o-n-g-w-f</code>.</p>
                </section>
            </article>

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
