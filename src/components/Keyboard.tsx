import React from 'react';
import { motion } from 'framer-motion';
import { FINGER_MAP, FINGER_COLORS } from '../constants';

const ROWS = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift '],
    ['Space'],
];

interface KeyboardProps {
    targetKey: string;
    /** Shift cần giữ cùng targetKey (chữ hoa, ký hiệu); null khi không cần. */
    shiftSide?: 'left' | 'right' | null;
    pressedKey: string | null;
}

const Keyboard: React.FC<KeyboardProps> = ({ targetKey, shiftSide = null, pressedKey }) => {
    const normalizedTarget = targetKey.toLowerCase();
    const normalizedPressed = pressedKey?.toLowerCase();

    return (
        <div className="keyboard-container glass" style={{ padding: '20px', width: 'fit-content', margin: '0 auto', background: 'rgba(255,255,255,0.01)' }}>
            {ROWS.map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                    {row.map((key) => {
                        const lowKey = key.toLowerCase();
                        // 'Shift ' (có dấu cách) là Shift phải: tra FINGER_MAP bằng 'shift-right'.
                        const fingerId = FINGER_MAP[key === 'Shift ' ? 'shift-right' : lowKey] || (key === 'Space' ? 5 : null);
                        const isShiftTarget = (key === 'Shift' && shiftSide === 'left') || (key === 'Shift ' && shiftSide === 'right');
                        const isHighlighted = isShiftTarget || lowKey === normalizedTarget || (key === 'Space' && (normalizedTarget === ' ' || normalizedTarget === 'space'));
                        const isPressed = normalizedPressed === lowKey || (key === 'Space' && normalizedPressed === ' ');

                        let width = '48px';
                        if (key === 'Backspace') width = '95px';
                        if (key === 'Tab') width = '65px';
                        if (key === 'CapsLock') width = '85px';
                        if (key === 'Enter') width = '105px';
                        if (key.startsWith('Shift')) width = '125px';
                        if (key === 'Space') width = '380px';

                        const fingerColor = fingerId ? FINGER_COLORS[fingerId] : 'transparent';

                        return (
                            <motion.div
                                key={key}
                                animate={{
                                    backgroundColor: isPressed ? (isHighlighted ? 'var(--secondary-color)' : 'var(--surface-accent)') : (isHighlighted ? fingerColor : 'var(--surface-accent)'),
                                    scale: isPressed ? 0.95 : 1,
                                    boxShadow: isHighlighted ? `0 0 20px ${fingerColor}` : 'none',
                                    borderColor: isHighlighted ? '#fff' : 'rgba(255,255,255,0.05)',
                                }}
                                style={{
                                    width,
                                    height: '48px',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: isHighlighted || isPressed ? '#fff' : 'var(--text-muted)',
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    borderBottom: `3px solid ${fingerColor}`,
                                    transition: 'background-color 0.1s, border-color 0.1s',
                                }}
                            >
                                {key}
                            </motion.div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;
