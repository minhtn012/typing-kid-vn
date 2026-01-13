import React from 'react';
import { motion } from 'framer-motion';
import { FINGER_LABELS, FINGER_COLORS } from '../constants';

interface HandsProps {
    activeFinger: number | null;
}

const Hands: React.FC<HandsProps> = ({ activeFinger }) => {
    // Left hand: 1 (Pinky) -> 5 (Thumb)
    const leftHandFingers = [1, 2, 3, 4, 5];
    // Right hand: 6 (Thumb) -> 10 (Pinky)
    const rightHandFingers = [6, 7, 8, 9, 10];

    const renderFingerCircle = (finger: number) => {
        // Special case: Space key (mapped to 5) should highlight both thumbs (5 and 6)
        // or just highlight the one the user prefers? 
        // Let's highlight both to indicate "either thumb".
        const isActive = activeFinger === finger || (activeFinger === 5 && finger === 6);
        const color = FINGER_COLORS[finger];

        return (
            <div key={finger} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <motion.div
                    initial={false}
                    animate={{
                        backgroundColor: isActive ? color : 'transparent',
                        borderColor: color,
                        scale: isActive ? 1.2 : 1,
                        boxShadow: isActive ? `0 0 20px ${color}` : 'none',
                        opacity: isActive ? 1 : 0.3
                    }}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: `3px solid ${color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isActive ? '#fff' : color,
                        fontWeight: 'bold',
                        fontSize: '14px',
                        cursor: 'default',
                        marginBottom: isActive ? '10px' : '0px', // Lift up effect
                    }}
                >
                    {/* Optional: Show finger number or letter if needed, but simple circle is requested */}
                    {/* {finger} */}
                </motion.div>
                {/* Small indicator line to show mapping if needed, or just keep it clean */}
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
            <div className="glass" style={{ padding: '40px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
                    {/* Left Hand Group */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        {leftHandFingers.map(renderFingerCircle)}
                    </div>

                    {/* Right Hand Group */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        {rightHandFingers.map(renderFingerCircle)}
                    </div>
                </div>

                <div style={{ marginTop: '20px', height: '30px', color: 'var(--text-muted)', fontSize: '13px' }}>
                    {/* Labels for "Left Hand" and "Right Hand" */}
                    <div style={{ display: 'flex', gap: '220px' }}>
                        <span>Tay Trái</span>
                        <span>Tay Phải</span>
                    </div>
                </div>

            </div>

            {activeFinger ? (
                <motion.div
                    key={activeFinger}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        padding: '12px 24px',
                        borderRadius: '30px',
                        background: FINGER_COLORS[activeFinger],
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        boxShadow: `0 10px 20px -5px ${FINGER_COLORS[activeFinger]}`,
                        textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}
                >
                    {FINGER_LABELS[activeFinger]}
                </motion.div>
            ) : (
                <div style={{ height: '48px', visibility: 'hidden' }}>Placeholder</div>
            )}
        </div>
    );
};

export default Hands;
