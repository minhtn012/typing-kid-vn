import React from 'react';
import { motion } from 'framer-motion';
import { TELEX_RULES } from '../constants';

interface TypingAreaProps {
    text: string;
    userInput: string;
    currentIndex: number;
    telexBuffer?: string[];
}

const getPartialChar = (keys: string[]): string => {
    if (keys.length === 0) return '';

    // Check if keys match a known Telex rule
    const ruleMatch = Object.entries(TELEX_RULES).find(([_, ruleKeys]) => {
        if (ruleKeys.length !== keys.length) return false;
        return ruleKeys.every((k, i) => k === keys[i]);
    });

    if (ruleMatch) return ruleMatch[0];

    // Fallback: If it's a single key, return it (e.g. 'a')
    if (keys.length === 1) return keys[0];

    // If no match (shouldn't happen with correct logic), join keys
    return keys.join('');
};

const TypingArea: React.FC<TypingAreaProps> = ({ text, userInput, currentIndex, telexBuffer = [] }) => {
    return (
        <div className="typing-area glass" style={{ padding: '30px', fontSize: '32px', letterSpacing: '0.02em', lineHeight: '1.6', minHeight: '120px', position: 'relative', maxWidth: '1000px', margin: '0 auto', userSelect: 'none' }}>
            <div style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Text
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {text.split('').map((char, index) => {
                    // Logic for past characters
                    if (index < userInput.length) {
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
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        );
                    }

                    // Logic for current character
                    if (index === currentIndex) {
                        const partialChar = getPartialChar(telexBuffer);

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
                                <span style={{ opacity: 0.3 }}>{char === ' ' ? '\u00A0' : char}</span>

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
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default TypingArea;
