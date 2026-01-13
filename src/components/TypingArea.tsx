import React from 'react';
import { motion } from 'framer-motion';

interface TypingAreaProps {
    text: string;
    userInput: string;
    currentIndex: number;
}

const TypingArea: React.FC<TypingAreaProps> = ({ text, userInput, currentIndex }) => {
    return (
        <div className="typing-area glass" style={{ padding: '20px', fontSize: '20px', letterSpacing: '0.05em', minHeight: '80px', position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', top: '5px', right: '10px', fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Text
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                {text.split('').map((char, index) => {
                    let color = 'var(--text-muted)';
                    let backgroundColor = 'transparent';
                    let borderBottom = '2px solid transparent';

                    if (index < userInput.length) {
                        color = userInput[index] === char ? 'var(--secondary-color)' : 'var(--error-color)';
                        if (userInput[index] !== char) {
                            backgroundColor = 'rgba(248, 81, 73, 0.1)';
                        }
                    }

                    if (index === currentIndex) {
                        borderBottom = '2px solid var(--primary-color)';
                        color = 'var(--text-main)';
                    }

                    return (
                        <motion.span
                            key={index}
                            initial={false}
                            animate={{ color, backgroundColor, borderBottom }}
                            style={{
                                display: 'inline-block',
                                minWidth: char === ' ' ? '10px' : 'auto',
                                padding: '2px 1px',
                                borderRadius: '2px',
                                transition: 'all 0.1s',
                            }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    );
                })}
            </div>
        </div>
    );
};

export default TypingArea;
