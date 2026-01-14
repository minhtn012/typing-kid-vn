import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const VniGuide: React.FC = () => {
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
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>3. Cách luyện tập VNI hiệu quả</h2>
                    <p>Khi <strong>luyện gõ 10 ngón</strong> theo kiểu VNI, ngón tay của bạn cần vươn lên hàng phím số linh hoạt. Hãy nhớ sử dụng ngón trỏ và ngón giữa cho các phím số giữa bàn phím, và ngón út/áp út cho các phím số ở rìa.</p>
                </section>
            </article>

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
