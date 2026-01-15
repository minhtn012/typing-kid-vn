import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Focus, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const FjRidgeGuide: React.FC = () => {
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
                    Bí mật của hai phím F và J: Chìa khóa để gõ không nhìn bàn phím
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Bạn muốn gõ văn bản nhanh như suy nghĩ mà không phải cúi xuống nhìn tay? Câu trả lời nằm ở hai cái gờ nhỏ xíu trên bàn phím của bạn.
                </p>
                <img
                    src="/guides/fj-ridges.png"
                    alt="Cận cảnh gờ nổi trên phím F và J"
                    style={{ width: '100%', borderRadius: '20px', marginTop: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                />
            </header>

            <article style={{ lineHeight: '1.8' }}>
                <section style={{ marginBottom: '50px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Target size={24} /> "Job" của bạn: Gõ mà không cần nhìn
                    </h2>
                    <p>
                        Phần lớn mọi người gặp khó khăn khi học <strong>luyện gõ 10 ngón</strong> vì họ luôn cảm thấy "mất phương hướng" trên bàn phím. Bạn phải cúi xuống nhìn để biết tay mình đang ở đâu, rồi lại ngước lên nhìn màn hình. Việc này làm mất tập trung và gây mỏi cổ.
                    </p>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px', marginTop: '20px', borderLeft: '4px solid var(--primary-color)' }}>
                        <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                            "Khi tôi bắt đầu viết một ý tưởng quan trọng, tôi muốn ngón tay tự tìm đúng vị trí để dòng suy nghĩ không bị ngắt quãng."
                        </p>
                    </div>
                </section>

                <section style={{ marginBottom: '50px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Focus size={24} /> Giải pháp: Hai điểm tựa Tactile
                    </h2>
                    <p>
                        Hai cái gờ nổi trên phím <strong>F</strong> và <strong>J</strong> được thiết kế để làm "ngọn hải đăng" cho ngón tay của bạn.
                    </p>
                    <ul style={{ marginTop: '15px', paddingLeft: '20px' }}>
                        <li style={{ marginBottom: '10px' }}><strong>Ngón trỏ trái:</strong> Luôn đặt vào phím <strong>F</strong>.</li>
                        <li style={{ marginBottom: '10px' }}><strong>Ngón trỏ phải:</strong> Luôn đặt vào phím <strong>J</strong>.</li>
                    </ul>
                    <p>
                        Khi bạn cảm nhận được hai cái gờ này dưới đầu ngón tay trỏ, bộ não sẽ tự động biết được vị trí của tất cả các phím còn lại mà không cần dùng đến mắt.
                    </p>
                </section>

                <section style={{ marginBottom: '50px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Zap size={24} /> Kết quả: Tăng tốc độ gõ vượt trội
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                        <div className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
                            <h3 style={{ fontSize: '16px', color: '#fff', marginBottom: '10px' }}>Tiết kiệm thời gian</h3>
                            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Giảm 90% thời gian liếc nhìn bàn phím.</p>
                        </div>
                        <div className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
                            <h3 style={{ fontSize: '16px', color: '#fff', marginBottom: '10px' }}>Giảm sai sót</h3>
                            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Tay luôn ở đúng vị trí gốc (Home Row).</p>
                        </div>
                        <div className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
                            <h3 style={{ fontSize: '16px', color: '#fff', marginBottom: '10px' }}>Bảo vệ sức khỏe</h3>
                            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Giảm áp lực lên cổ và vai gáy.</p>
                        </div>
                    </div>
                </section>
            </article>

            <div style={{ marginTop: '60px', padding: '40px', background: 'linear-gradient(135deg, var(--primary-color), #3a8ee6)', borderRadius: '24px', textAlign: 'center' }}>
                <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '15px' }}>Bạn đã sẵn sàng cảm nhận phím F và J chưa?</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '30px' }}>Hãy bắt đầu bài luyện tập cơ bản để rèn luyện trí nhớ cơ bắp.</p>
                <Link to="/?tab=basic" style={{ padding: '15px 40px', background: '#fff', color: 'var(--primary-color)', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', display: 'inline-block' }}>
                    Luyện hàng phím giữa ngay
                </Link>
            </div>
        </motion.div>
    );
};

export default FjRidgeGuide;
