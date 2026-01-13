import React from 'react';
import { motion } from 'framer-motion';
import { Keyboard as KeyboardIcon, BookOpen, ChevronRight } from 'lucide-react';
import { LESSON_MODES } from '../constants';

interface HomePageProps {
    onSelectMode: (modeId: string) => void;
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
    }
];

const HomePage: React.FC<HomePageProps> = ({ onSelectMode }) => {
    const [activeTab, setActiveTab] = React.useState<string>(CATEGORIES[0].id);

    const activeCategory = CATEGORIES.find(c => c.id === activeTab);

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px', textAlign: 'center' }}>
                <div style={{ background: 'var(--primary-color)', padding: '20px', borderRadius: '20px', boxShadow: '0 0 30px rgba(88, 166, 255, 0.4)', marginBottom: '30px' }}>
                    <KeyboardIcon color="white" size={48} />
                </div>
                <h1 style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-0.03em', background: 'linear-gradient(to right, #fff, #8b949e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px' }}>
                    Typing Kid <span style={{ fontSize: '24px', color: 'var(--primary-color)', WebkitTextFillColor: 'initial', fontWeight: '600' }}>VN</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '500px' }}>
                    Luyện gõ mười ngón Tiếng Việt với phương pháp trực quan và thú vị nhất.
                </p>
            </header>

            <main style={{ width: '100%' }}>
                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    marginBottom: '40px',
                    flexWrap: 'wrap'
                }}>
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

            <footer style={{ marginTop: 'auto', paddingTop: '60px', color: 'var(--text-muted)', fontSize: '14px' }}>
                Made with ❤️ by Antigravity
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
