import { useState, useEffect } from 'react';
import TypingArea from './TypingArea';
import Keyboard from './Keyboard';
import Hands from './Hands';
import LessonSidebar from './LessonSidebar';
import { useTyping } from '../hooks/useTyping';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RefreshCw, Trophy, ArrowLeft, List, ArrowRight } from 'lucide-react';
import { LESSON_MODES, TELEX_RULES, VNI_RULES } from '../constants';
import { saveResult } from '../utils/storage';

interface PracticeSessionProps {
    initialModeId: string;
    onBack: () => void;
}

const PracticeSession: React.FC<PracticeSessionProps> = ({ initialModeId, onBack }) => {
    const [currentModeId] = useState(initialModeId);
    const [lessonIndex, setLessonIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Custom Mode State
    const [customText, setCustomText] = useState("");
    const [isCustomSetupDone, setIsCustomSetupDone] = useState(false);
    const [tempInput, setTempInput] = useState("");

    const currentMode = LESSON_MODES.find(m => m.id === currentModeId) || LESSON_MODES[0];
    const isCustomMode = currentMode.id === 'custom';

    let text = currentMode.text[lessonIndex];
    if (isCustomMode) {
        text = isCustomSetupDone ? customText : " ";
    }

    const getRules = () => {
        if (currentMode.inputMethod === 'vni') return VNI_RULES;
        if (currentMode.inputMethod === 'telex') return TELEX_RULES;
        return {}; // Basic mode or unknown
    };

    const rules = getRules();

    const { userInput, stats, isFinished, handleKeyDown, reset, currentIndex, currentKeyToPress, currentFinger, telexBuffer } = useTyping(text, rules);
    const [pressedKey, setPressedKey] = useState<string | null>(null);

    // Reset when mode or lesson changes
    useEffect(() => {
        reset();
    }, [currentModeId, lessonIndex, reset, isCustomSetupDone]);

    useEffect(() => {
        if (isCustomMode && !isCustomSetupDone) return;

        const onKeydown = (e: KeyboardEvent) => {
            setPressedKey(e.key);
            handleKeyDown(e);

            if (e.key === " " && e.target === document.body) {
                e.preventDefault();
            }
        };
        const onKeyup = () => setPressedKey(null);

        window.addEventListener('keydown', onKeydown);
        window.addEventListener('keyup', onKeyup);
        return () => {
            window.removeEventListener('keydown', onKeydown);
            window.removeEventListener('keyup', onKeyup);
        };
    }, [handleKeyDown, isCustomMode, isCustomSetupDone]);

    useEffect(() => {
        if (isFinished) {
            // Save result
            saveResult(currentModeId, lessonIndex, stats.wpm, stats.accuracy);

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#58a6ff', '#238636', '#f85149']
            });
        }
    }, [isFinished, currentModeId, lessonIndex, stats.wpm, stats.accuracy]);

    const nextLesson = () => {
        if (isCustomMode) {
            setIsCustomSetupDone(false);
            setCustomText("");
            setTempInput("");
        } else if (lessonIndex < currentMode.text.length - 1) {
            setLessonIndex((prev) => prev + 1);
        } else {
            setLessonIndex(0);
        }
        reset();
    };

    const handleCustomSubmit = () => {
        if (!tempInput.trim()) return;
        setCustomText(tempInput);
        setIsCustomSetupDone(true);
        reset();
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            <LessonSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                currentMode={currentMode}
                currentLessonIndex={lessonIndex}
                onSelectLesson={(index) => {
                    setLessonIndex(index);
                    setIsSidebarOpen(false);
                    // Reset handled by useEffect dependency change
                }}
            />

            {/* Minimal Header Control */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, display: 'flex', gap: '10px' }}>
                <button
                    onClick={onBack}
                    className="glass"
                    style={{ padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px', fontWeight: 'bold' }}
                >
                    <ArrowLeft size={16} /> Trang chủ
                </button>

                {!isCustomMode && (
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="glass"
                        style={{ padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '14px', fontWeight: 'bold' }}
                    >
                        <List size={16} /> Danh sách bài
                    </button>
                )}
            </div>

            <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px', alignItems: 'center', zIndex: 10 }}>
                {(isCustomMode && !isCustomSetupDone) ? null : (
                    <>
                        <div className="glass" style={{ padding: '0 10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>WPM: <strong style={{ color: 'var(--text-main)' }}>{stats.wpm}</strong></span>
                        </div>

                        <div className="glass" style={{ padding: '0 10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--primary-color)' }}>{currentMode.name}</span>
                        </div>

                        <button
                            onClick={reset}
                            className="glass"
                            style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}
                            title="Restart"
                        >
                            <RefreshCw size={14} />
                        </button>
                    </>
                )}
            </div>

            <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', width: '100%' }}>

                {isCustomMode && !isCustomSetupDone ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass"
                        style={{ width: '100%', maxWidth: '600px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}
                    >
                        <h2 style={{ fontSize: '24px', textAlign: 'center' }}>Nhập văn bản của bạn</h2>
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                            Dán hoặc nhập văn bản bạn muốn luyện tập vào bên dưới.
                        </p>
                        <textarea
                            value={tempInput}
                            onChange={(e) => setTempInput(e.target.value)}
                            placeholder="Nhập văn bản ở đây..."
                            style={{
                                width: '100%',
                                minHeight: '200px',
                                padding: '15px',
                                borderRadius: '10px',
                                border: '1px solid var(--border-color)',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'var(--text-main)',
                                fontSize: '16px',
                                lineHeight: '1.5',
                                resize: 'vertical'
                            }}
                        />
                        <button
                            onClick={handleCustomSubmit}
                            disabled={!tempInput.trim()}
                            style={{
                                padding: '15px',
                                borderRadius: '10px',
                                background: 'var(--primary-color)',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                opacity: !tempInput.trim() ? 0.5 : 1,
                                cursor: !tempInput.trim() ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Bắt đầu luyện tập <ArrowRight size={18} />
                        </button>
                    </motion.div>
                ) : (
                    <>
                        {/* Typing Area */}
                        <div style={{ width: '100%', maxWidth: '900px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '5px', textAlign: 'center' }}>
                                {isCustomMode ? 'Bài tập tùy chỉnh' : `Bài ${lessonIndex + 1} / ${currentMode.text.length}`}
                            </div>
                            <TypingArea text={text} userInput={userInput} currentIndex={currentIndex} telexBuffer={telexBuffer} rules={rules} />
                        </div>

                        {/* Keyboard and Hands Layout - Centered Stack */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
                            <div style={{ position: 'relative' }}>
                                <Keyboard targetKey={currentKeyToPress} pressedKey={pressedKey} />
                            </div>
                            <div style={{ width: '100%', maxWidth: '800px' }}>
                                <Hands activeFinger={currentFinger} />
                            </div>
                        </div>
                    </>
                )}

                <AnimatePresence>
                    {isFinished && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(13, 17, 23, 0.9)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 100,
                                backdropFilter: 'blur(8px)',
                            }}
                        >
                            <div className="glass" style={{ padding: '50px', maxWidth: '500px', textAlign: 'center' }}>
                                <div style={{ display: 'inline-block', padding: '20px', borderRadius: '50%', background: 'rgba(35, 134, 54, 0.1)', marginBottom: '20px' }}>
                                    <Trophy size={60} color="var(--secondary-color)" />
                                </div>
                                <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Tuyệt vời!</h2>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Bạn đã hoàn thành bài tập này.</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                                    <div style={{ padding: '15px', background: 'var(--surface-color)', borderRadius: '10px' }}>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>WPM</div>
                                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.wpm}</div>
                                    </div>
                                    <div style={{ padding: '15px', background: 'var(--surface-color)', borderRadius: '10px' }}>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Accuracy</div>
                                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.accuracy}%</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button
                                        onClick={reset}
                                        style={{ flex: 1, padding: '15px', borderRadius: '10px', background: 'var(--surface-accent)', color: 'var(--icon-color)', fontWeight: 'bold', fontSize: '16px' }}
                                    >
                                        Làm lại
                                    </button>
                                    <button
                                        onClick={nextLesson}
                                        style={{ flex: 1, padding: '15px', borderRadius: '10px', background: 'var(--primary-color)', color: '#fff', fontWeight: 'bold', fontSize: '16px' }}
                                    >
                                        {isCustomMode ? 'Nhập bài mới' : 'Bài tiếp theo'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div >
    );
};

export default PracticeSession;
