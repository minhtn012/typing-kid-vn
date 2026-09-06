import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import RelatedGuides from '../components/RelatedGuides';
import { buildGuideSchemas } from '../components/guide-schema';

// Breadcrumb + Article schema cho on-page SEO (sinh từ helper dùng chung)
const guideSchemas = buildGuideSchemas({
    path: '/bi-mat-phim-f-j',
    breadcrumbName: 'Bí mật phím F và J',
    headline: 'Bí mật của hai phím F và J: Chìa khóa để gõ không nhìn bàn phím',
    description: 'Vì sao phím F và J có gờ nổi? Tìm hiểu cách dùng hai phím định vị này để đặt tay đúng và gõ 10 ngón không cần nhìn bàn phím.',
    datePublished: '2026-01-15',
    dateModified: '2026-06-25',
});

const FjRidgeGuide: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '60px 20px', color: 'var(--text-main)' }}
        >
            <Seo
                title="Bí mật phím F và J: gõ không nhìn bàn phím | Typing Kid VN"
                description="Vì sao phím F và J có gờ nổi? Tìm hiểu cách dùng hai phím định vị này để đặt tay đúng và gõ 10 ngón không cần nhìn bàn phím."
                path="/bi-mat-phim-f-j"
            />
            {/* Breadcrumb + Article JSON-LD */}
            {guideSchemas.map((s) => (
                <JsonLd key={s['@type'] as string} data={s} />
            ))}
            <Link to="/" className="tap-target" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary-color)', textDecoration: 'none', marginBottom: '30px', fontWeight: 'bold' }}>
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
                    width={1024}
                    height={1024}
                    style={{ width: '100%', height: 'auto', borderRadius: '20px', marginTop: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                />
            </header>

            <article style={{ lineHeight: '1.8' }}>
                <section style={{ marginBottom: '50px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Target size={24} /> 1. F và J là "Tâm điểm" của mọi chuyển động
                    </h2>
                    <p>
                        Hãy tưởng tượng hai phím <strong>F</strong> và <strong>J</strong> là "trạm căn cứ" (Home Base). Mọi phím bấm khác của hai bàn tay đều xoay quanh hai phím này. Đây là bí mật lớn nhất của những người gõ phím chuyên nghiệp:
                    </p>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px', marginTop: '20px', borderLeft: '4px solid var(--primary-color)' }}>
                        <p style={{ fontWeight: '600', marginBottom: '10px' }}>Quy tắc "Hồi mã thương":</p>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Ngay sau khi một ngón tay vươn ra gõ một phím bất kỳ, hãy lập tức đưa ngón trỏ về lại phím <strong>F</strong> (tay trái) hoặc <strong>J</strong> (tay phải). Khi hai ngón trỏ đã nằm đúng vị trí, <strong>tất cả các ngón khác sẽ tự động rơi vào đúng vị trí</strong> của chúng để sẵn sàng gõ từ mới mà không cần suy nghĩ.
                        </p>
                    </div>
                </section>

                <section style={{ marginBottom: '50px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Zap size={24} /> 2. Ba bước luyện tập "Khai sáng" đôi tay
                    </h2>
                    <p>
                        Bí kíp này phát huy sức mạnh tối đa khi bạn đã nhớ sơ bộ vị trí phím. Hãy thực hiện theo lộ trình sau:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                        <div className="glass" style={{ padding: '20px', borderRadius: '12px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            <div style={{ background: 'var(--primary-color)', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold' }}>1</div>
                            <div>
                                <strong>Đặt ngón trỏ làm mốc:</strong> Đặt hai ngón trỏ vào F và J cho đến khi bạn cảm nhận rõ cái gờ nổi. Đây là trạng thái "sẵn sàng" (Home Row).
                            </div>
                        </div>
                        <div className="glass" style={{ padding: '20px', borderRadius: '12px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            <div style={{ background: 'var(--primary-color)', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold' }}>2</div>
                            <div>
                                <strong>Gõ theo trí nhớ:</strong> Sử dụng phần <Link to="/?tab=custom" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Gõ tự do</Link>. Cố gắng nhìn thẳng vào màn hình, gõ một từ bất kỳ và ngay lập tức đưa ngón trỏ về cảm nhận 2 cái gờ.
                            </div>
                        </div>
                        <div className="glass" style={{ padding: '20px', borderRadius: '12px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            <div style={{ background: 'var(--primary-color)', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold' }}>3</div>
                            <div>
                                <strong>Tăng tốc với bí kíp:</strong> Khi não bộ đã quen với cảm giác "hồi mã thương", bạn sẽ thấy tốc độ gõ tăng lên vượt trội vì đôi tay không bao giờ bị "mất phương hướng" trên bàn phím.
                            </div>
                        </div>
                    </div>
                </section>
            </article>

            <RelatedGuides currentPath="/bi-mat-phim-f-j" />

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
