import React from 'react';
import { motion } from 'framer-motion';


interface TypingAreaProps {
    text: string;
    userInput: string;
    currentIndex: number;
    /** Vùng [start, end) của từ đang gõ trong text; null khi đã finish. */
    currentWordRange?: { start: number; end: number } | null;
    /** Text tạm của từ đang gõ (từ composeDisplay của engine). */
    currentWordDisplay?: string;
}

const TypingArea: React.FC<TypingAreaProps> = ({ text, userInput, currentIndex, currentWordRange = null, currentWordDisplay = '' }) => {
    // Trước từ đang gõ là phần đã commit; không có range (finish) → tất cả đã commit.
    const wordStart = currentWordRange ? currentWordRange.start : currentIndex;
    const wordEnd = currentWordRange ? currentWordRange.end : currentIndex;

    return (
        <div className="typing-area glass" style={{ padding: '30px', fontSize: '32px', letterSpacing: '0.02em', lineHeight: '1.6', minHeight: '120px', position: 'relative', maxWidth: '1000px', margin: '0 auto', userSelect: 'none' }}>
            <div style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Text
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {text.split('').map((char, index) => {
                    // Logic for past characters (đã commit)
                    if (index < wordStart) {
                        const isCorrect = userInput[index] === char;
                        return (
                            <motion.span
                                key={index}
                                initial={false}
                                animate={{
                                    color: isCorrect ? 'var(--secondary-color)' : 'var(--error-color)',
                                    backgroundColor: isCorrect ? 'transparent' : 'rgba(248, 81, 73, 0.1)',
                                }}
                                style={{
                                    display: 'inline-block',
                                    padding: '0 2px',
                                    borderRadius: '4px',
                                }}
                            >
                                {char === ' ' ? ' ' : char}
                            </motion.span>
                        );
                    }

                    // Từ đang gõ: gạch chân cả cụm, overlay ký tự tạm đã compose
                    // (với kiểu gõ deferred, ký tự có thể đổi dạng khi phím dấu tới sau: gan + 6 → gân)
                    if (index < wordEnd) {
                        const partialChar = currentWordDisplay[index - wordStart] ?? '';

                        return (
                            <motion.span
                                key={index}
                                animate={{ borderBottom: '3px solid var(--primary-color)' }}
                                style={{
                                    display: 'inline-block',
                                    padding: '0 2px',
                                    position: 'relative',
                                    color: 'var(--text-main)' // Base color (Unfinished parts)
                                }}
                            >
                                {/* Base Layer: Full Target Char (White/Main) - lowered opacity to suggest pending */}
                                <span style={{ opacity: 0.3 }}>{char === ' ' ? ' ' : char}</span>

                                {/* Overlay Layer: Partial Char (Green/Active) */}
                                <span style={{
                                    position: 'absolute',
                                    left: '2px', // Match padding
                                    top: 0,
                                    color: 'var(--secondary-color)',
                                    opacity: 1
                                }}>
                                    {partialChar}
                                </span>
                            </motion.span>
                        );
                    }

                    // Future characters
                    return (
                        <span key={index} style={{ color: 'var(--text-muted)', display: 'inline-block', padding: '0 2px' }}>
                            {char === ' ' ? ' ' : char}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default TypingArea;
