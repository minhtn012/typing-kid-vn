import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Star } from 'lucide-react';
import { loadProgress, type UserProgress } from '../utils/storage';

interface LessonSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    currentMode: { id: string, name: string, text: string[] };
    currentLessonIndex: number;
    onSelectLesson: (index: number) => void;
}

const LessonSidebar: React.FC<LessonSidebarProps> = ({ isOpen, onClose, currentMode, currentLessonIndex, onSelectLesson }) => {
    const [progress, setProgress] = useState<UserProgress>({});

    useEffect(() => {
        if (isOpen) {
            setProgress(loadProgress());
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.5)',
                            zIndex: 40,
                            backdropFilter: 'blur(4px)'
                        }}
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '350px',
                            background: '#0d1117',
                            borderLeft: '1px solid #30363d',
                            zIndex: 50,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
                        }}
                    >
                        <div style={{ padding: '20px', borderBottom: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-main)' }}>Danh sách bài tập</h3>
                            <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                            <div style={{ padding: '0 10px 15px', fontSize: '12px', color: 'var(--text-muted)' }}>
                                {currentMode.name} ({currentMode.text.length} bài)
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {currentMode.text.map((_, index) => {
                                    const result = progress[currentMode.id]?.[index];
                                    const isLocked = index > 0 && !progress[currentMode.id]?.[index - 1] && !progress[currentMode.id]?.[index];
                                    // For testing simplicity, let's unlock all or logic could be stricter. 
                                    // Let's just visually dim unlocked ones but allow clicking for now as it's a practice tool.

                                    const isActive = currentLessonIndex === index;

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => onSelectLesson(index)}
                                            style={{
                                                padding: '15px',
                                                borderRadius: '12px',
                                                background: isActive ? 'rgba(88, 166, 255, 0.1)' : 'var(--surface-color)',
                                                border: isActive ? '1px solid var(--primary-color)' : '1px solid transparent',
                                                cursor: 'pointer',
                                                opacity: isLocked ? 0.6 : 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                transition: 'all 0.2s hover'
                                            }}
                                        >
                                            <div style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                background: result ? 'rgba(35, 134, 54, 0.2)' : 'rgba(255,255,255,0.05)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: result ? 'var(--secondary-color)' : 'var(--text-muted)',
                                                fontWeight: 'bold',
                                                fontSize: '14px'
                                            }}>
                                                {result ? <CheckCircle size={16} /> : (index + 1)}
                                            </div>

                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '14px', fontWeight: 'bold', color: result ? 'var(--text-main)' : 'var(--text-muted)', marginBottom: '4px' }}>
                                                    Bài {index + 1}
                                                </div>
                                                {result ? (
                                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', gap: '10px' }}>
                                                        <span style={{ color: 'var(--secondary-color)' }}>{result.wpm} WPM</span>
                                                        <span>{result.accuracy}%</span>
                                                    </div>
                                                ) : (
                                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                                        Chưa hoàn thành
                                                    </div>
                                                )}
                                            </div>

                                            {result && (
                                                <div style={{ display: 'flex' }}>
                                                    {[...Array(result.stars)].map((_, i) => (
                                                        <Star key={i} size={12} fill="#FFCA3A" color="#FFCA3A" />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LessonSidebar;
