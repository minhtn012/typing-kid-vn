import React from 'react';
import { motion } from 'framer-motion';
import { Keyboard as KeyboardIcon, BookOpen, ChevronRight, Focus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LESSON_MODES } from '../constants';

interface HomePageProps {
    onSelectMode: (modeId: string) => void;
    initialTabId?: string;
}

const CATEGORIES = [
    {
        id: 'basic',
        title: 'Luyện ngón cơ bản',
        modeIds: ['basic_home', 'basic_top', 'basic_bottom']
    },
    {
        id: 'telex',
        title: 'Luyện gõ Telex',
        modeIds: ['vietnamese_telex', 'vietnamese_words', 'sentences']
    },
    {
        id: 'vni',
        title: 'Luyện gõ VNI',
        modeIds: ['vietnamese_vni', 'vietnamese_words_vni']
    },
    {
        id: 'custom',
        title: 'Tự do',
        modeIds: ['custom']
    },
    {
        id: 'game',
        title: 'Giải trí',
        modeIds: ['totoro_chase']
    }
];

const HomePage: React.FC<HomePageProps> = ({ onSelectMode, initialTabId }) => {
    const [activeTab, setActiveTab] = React.useState<string>(() => {
        if (initialTabId && CATEGORIES.find(c => c.id === initialTabId)) {
            return initialTabId;
        }
        return CATEGORIES[0].id;
    });

    // Sync tab to URL
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.set('tab', activeTab);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newUrl);
    }, [activeTab]);

    const activeCategory = CATEGORIES.find(c => c.id === activeTab);

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px', textAlign: 'center' }}>
                <div
                    aria-hidden="true"
                    style={{ background: 'var(--primary-color)', padding: '20px', borderRadius: '20px', boxShadow: '0 0 30px rgba(88, 166, 255, 0.4)', marginBottom: '30px' }}
                >
                    <KeyboardIcon color="white" size={48} />
                </div>
                <nav style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link to="/tu-the-go-phim" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Tư thế ngồi</Link>
                    <Link to="/huong-dan-telex" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Cách gõ Telex</Link>
                    <Link to="/huong-dan-vni" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Cách gõ VNI</Link>
                </nav>
                <h1 style={{ fontSize: '1px', opacity: 0, position: 'absolute' }}>Luyện gõ 10 ngón tiếng Việt - Phần mềm gõ mười ngón miễn phí</h1>
                <div style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-0.03em', background: 'linear-gradient(to right, #fff, #8b949e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px' }}>
                    Typing Kid <span style={{ fontSize: '24px', color: 'var(--primary-color)', WebkitTextFillColor: 'initial', fontWeight: '600' }}>VN</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px', lineHeight: '1.6' }}>
                    Nền tảng <strong>luyện gõ 10 ngón tiếng Việt</strong> chuyên sâu.
                    Học gõ mười ngón nhanh và chuẩn xác với phương pháp trực quan nhất.
                </p>
            </header>

            <main style={{ width: '100%' }}>
                {/* Tabs */}
                <div
                    role="tablist"
                    aria-label="Chế độ luyện tập"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                        marginBottom: '40px',
                        flexWrap: 'wrap'
                    }}
                >
                    {CATEGORIES.map((category) => {
                        const isActive = activeTab === category.id;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: isActive ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.05)',
                                    color: isActive ? '#fff' : 'var(--text-muted)',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease',
                                    boxShadow: isActive ? '0 4px 20px rgba(88, 166, 255, 0.3)' : 'none',
                                    outline: 'none'
                                }}
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`panel-${category.id}`}
                                id={`tab-${category.id}`}
                            >
                                {category.title}
                            </button>
                        );
                    })}
                </div>

                <div style={{ minHeight: '400px' }}>
                    {activeCategory && (
                        <motion.div
                            key={activeCategory.id}
                            id={`panel-${activeCategory.id}`}
                            role="tabpanel"
                            aria-labelledby={`tab-${activeCategory.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <BookOpen size={24} color="var(--primary-color)" />
                                {activeCategory.title}
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                                {activeCategory.modeIds.map((modeId) => {
                                    const mode = LESSON_MODES.find(m => m.id === modeId);
                                    if (!mode) return null;

                                    return (
                                        <motion.div
                                            key={mode.id}
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => onSelectMode(mode.id)}
                                            className="glass"
                                            style={{
                                                padding: '30px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                minHeight: '160px',
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                background: 'linear-gradient(145deg, rgba(22, 27, 34, 0.8), rgba(13, 17, 23, 0.9))'
                                            }}
                                        >
                                            <div>
                                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: 'var(--text-main)' }}>
                                                    {mode.name}
                                                </h3>
                                                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                                                    {getModeDescription(mode.id)}
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary-color)', fontSize: '14px', fontWeight: 'bold', marginTop: '20px' }}>
                                                Bắt đầu <ChevronRight size={16} />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>

            {/* Instructional Guides Section (AIO/SEO focused) */}
            <div style={{ width: '100%', marginTop: '40px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '40px', textAlign: 'center' }}>
                    Cẩm nang luyện gõ 10 ngón Tiếng Việt
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Part 1: Posture & Placement */}
                    <Link to="/tu-the-go-phim" className="glass" style={{ padding: '20px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ background: 'rgba(88, 166, 255, 0.1)', padding: '10px', borderRadius: '12px' }}>
                                <BookOpen size={20} color="var(--primary-color)" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '4px' }}>1. Tư thế ngồi & Cách đặt tay</h3>
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Học cách ngồi chuẩn và giải mã bí ẩn gờ nổi trên phím F, J.</p>
                            </div>
                        </div>
                        <ChevronRight size={20} color="var(--text-muted)" />
                    </Link>

                    {/* Part 2: Telex Rules */}
                    <Link to="/huong-dan-telex" className="glass" style={{ padding: '20px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ background: 'rgba(88, 166, 255, 0.1)', padding: '10px', borderRadius: '12px' }}>
                                <BookOpen size={20} color="var(--primary-color)" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '4px' }}>2. Hướng dẫn gõ kiểu Telex</h3>
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Làm chủ kiểu gõ phổ biến nhất: s=sắc, f=huyền, r=hỏi...</p>
                            </div>
                        </div>
                        <ChevronRight size={20} color="var(--text-muted)" />
                    </Link>

                    {/* Part 3: VNI Rules */}
                    <Link to="/huong-dan-vni" className="glass" style={{ padding: '20px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ background: 'rgba(88, 166, 255, 0.1)', padding: '10px', borderRadius: '12px' }}>
                                <BookOpen size={20} color="var(--primary-color)" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '4px' }}>3. Hướng dẫn gõ kiểu VNI</h3>
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Quy tắc bỏ dấu bằng phím số dành cho người chuyên nghiệp.</p>
                            </div>
                        </div>
                        <ChevronRight size={20} color="var(--text-muted)" />
                    </Link>

                    {/* Part 4: F/J Secret */}
                    <Link to="/bi-mat-phim-f-j" className="glass" style={{ padding: '20px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ background: 'rgba(52, 211, 153, 0.1)', padding: '10px', borderRadius: '12px' }}>
                                <Focus size={20} color="#34d399" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '4px' }}>4. Bí mật của hai phím F và J</h3>
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Tuyệt chiêu để gõ phím nhanh mà không bao giờ cần nhìn xuống.</p>
                            </div>
                        </div>
                        <ChevronRight size={20} color="var(--text-muted)" />
                    </Link>
                </div>
            </div>

            {/* AI Search & E-E-A-T Sections */}
            <div style={{ width: '100%', marginTop: '80px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '60px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>

                    {/* FAQ Section */}
                    <section>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '30px' }}>Câu hỏi thường gặp</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary-color)', marginBottom: '10px' }}>Làm thế nào để gõ 10 ngón tiếng việt nhanh nhất?</h3>
                                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                    Bạn cần luyện tập đặt tay đúng vị trí trên hàng phím cơ sở (ASDF - JKL;), gõ không nhìn bàn phím và sử dụng Typing Kid VN đều đặn mỗi ngày.
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary-color)', marginBottom: '10px' }}>Nên dùng kiểu gõ Telex hay VNI?</h3>
                                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                    Telex phổ biến hơn và giúp gõ nhanh hơn trên các thiết bị hiện đại. VNI phù hợp nếu bạn đã quen với việc sử dụng hàng phím số để gõ dấu.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Why Us Section */}
                    <section>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '30px' }}>Tại sao chọn chúng tôi?</h2>
                        <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <li style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'flex', gap: '10px' }}>
                                <span style={{ color: 'var(--primary-color)' }}>✓</span>
                                <strong>Hỗ trợ Tiếng Việt tuyệt đối:</strong> Tối ưu riêng cho bảng mã Telex và VNI, điều mà các trang quốc tế thường bỏ qua.
                            </li>
                            <li style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'flex', gap: '10px' }}>
                                <span style={{ color: 'var(--primary-color)' }}>✓</span>
                                <strong>Nội dung thuần Việt:</strong> Kho bài tập phong phú từ ca dao, tục ngữ đến các thành ngữ Tiếng Việt ý nghĩa.
                            </li>
                            <li style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'flex', gap: '10px' }}>
                                <span style={{ color: 'var(--primary-color)' }}>✓</span>
                                <strong>Giao diện thân thiện:</strong> Thiết kế hiện đại, giúp việc <strong>luyện gõ 10 ngón</strong> không còn nhàm chán.
                            </li>
                        </ul>
                    </section>
                </div>
            </div>

            {/* SEO Content (Hidden) */}
            <section style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: '0' }}>
                <h2>Gõ 10 ngón tiếng việt cùng Typing Kid VN</h2>
                <p>
                    Chào mừng bạn đến với Typing Kid VN, nền tảng hàng đầu giúp bạn <strong>gõ 10 ngón tiếng việt</strong> nhanh và chính xác nhất.
                    Chúng tôi cung cấp các bài tập <strong>luyện gõ 10 ngón</strong> từ cơ bản đến nâng cao, hỗ trợ cả kiểu gõ Telex và VNI.
                    Phần mềm <strong>gõ mười ngón</strong> của chúng tôi được thiết kế đặc biệt cho trẻ em với giao diện sinh động,
                    giúp việc học <strong>gõ 10 ngón tiếng việt</strong> trở nên thú vị và hiệu quả.
                </p>
            </section>

            <footer style={{ marginTop: 'auto', paddingTop: '60px', color: 'var(--text-muted)', fontSize: '14px' }}>
                Sản phẩm của Kamy Tech
            </footer>
        </div>
    );
};

const getModeDescription = (id: string): string => {
    switch (id) {
        case 'basic_home': return "Làm quen với các phím A, S, D, F, J, K, L, ; nằm ở hàng giữa bàn phím.";
        case 'basic_top': return "Mở rộng ngón tay lên hàng phím trên với các phím Q, W, E, R, T, Y, U, I, O, P.";
        case 'basic_bottom': return "Luyện tập hàng phím dưới cùng với Z, X, C, V, B, N, M, phẩy và chấm.";
        case 'vietnamese_telex': return "Tập gõ dấu Tiếng Việt theo kiểu Telex: s (sắc), f (huyền), r (hỏi), x (ngã), j (nặng).";
        case 'vietnamese_vni': return "Tập gõ dấu Tiếng Việt theo kiểu VNI: 1 (sắc), 2 (huyền), 3 (hỏi), 4 (ngã), 5 (nặng)...";
        case 'vietnamese_words': return "Gõ các từ vựng và cụm từ tiếng Việt thông dụng có ý nghĩa (Telex).";
        case 'vietnamese_words_vni': return "Gõ các từ vựng và cụm từ tiếng Việt thông dụng có ý nghĩa (VNI).";
        case 'sentences': return "Thử thách với các câu danh ngôn và thành ngữ tiếng Việt trọn vẹn.";
        case 'custom': return "Tự nhập văn bản của bạn để luyện tập.";
        default: return "Bài tập luyện gõ phím.";
    }
}

export default HomePage;
