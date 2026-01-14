import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTyping } from '../hooks/useTyping';
import { TELEX_RULES } from '../constants';
import TypingArea from './TypingArea';
import { ArrowLeft, Trophy, Skull } from 'lucide-react';
import confetti from 'canvas-confetti';
import meiFrame0 from '../assets/mie/mie_frame_0.png';
import meiFrame1 from '../assets/mie/mie_frame_1.png';
import meiFrame2 from '../assets/mie/mie_frame_2.png';
import meiFrame3 from '../assets/mie/mie_frame_3.png';

import totoroFrame0 from '../assets/totoro/totoro_frame_0.png';
import totoroFrame1 from '../assets/totoro/totoro_frame_1.png';
import totoroFrame2 from '../assets/totoro/totoro_frame_2.png';
import totoroFrame3 from '../assets/totoro/totoro_frame_3.png';

const MEI_FRAMES = [meiFrame0, meiFrame1, meiFrame2, meiFrame3];
const TOTORO_FRAMES = [totoroFrame0, totoroFrame1, totoroFrame2, totoroFrame3];

interface GameSessionProps {
    onBack: () => void;
}

const GAME_TEXT = "totoro nhỏ đang chạy trốn khỏi mie nhưng mie chạy rất nhanh bạn phải gõ thật nhanh";

// No longer using CSS spritesheet animation


const GameSession: React.FC<GameSessionProps> = ({ onBack }) => {
    // Game State
    const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
    const [totoroPos, setTotoroPos] = useState(35); // Start at 35% để có khoảng cách với Mei
    const [miePos, setMiePos] = useState(0); // Start at 0%
    const [totoroSpeed, setTotoroSpeed] = useState(0.2); // Base speed
    const [frameIndex, setFrameIndex] = useState(0);

    // Frame animation loop
    useEffect(() => {
        const interval = setInterval(() => {
            setFrameIndex(prev => (prev + 1) % 4);
        }, 100); // 100ms per frame
        return () => clearInterval(interval);
    }, []);

    // Mei: using individual frames
    const meiStyle: React.CSSProperties = {
        width: '100px',
        height: '100px',
        backgroundImage: `url(${MEI_FRAMES[frameIndex]})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
    };

    // Totoro: using individual frames
    const totoroStyle: React.CSSProperties = {
        width: '90px',
        height: '90px',
        backgroundImage: `url(${TOTORO_FRAMES[frameIndex]})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
    };

    // Typing Hook integration
    const { userInput, currentIndex, telexBuffer, handleKeyDown, reset: resetTyping } = useTyping(
        GAME_TEXT,
        TELEX_RULES,
        {
            onCorrect: () => {
                setTotoroSpeed(prev => Math.min(prev + 0.1, 1.2)); // Reduced max speed and increment
            },
            onMistake: () => {
                setTotoroSpeed(prev => Math.max(prev - 0.2, 0));
            }
        }
    );

    // Audio refs (placeholders for now)
    // const bgmRef = useRef<HTMLAudioElement>(null);

    // Game Loop
    useEffect(() => {
        if (gameState !== 'playing') return;

        let lastTime = performance.now();
        let animationFrameId: number;

        const update = (time: number) => {
            const deltaTime = (time - lastTime) / 1000; // seconds
            lastTime = time;

            // Move Mie (Constant speed, maybe accelerates over time?)
            const mieSpeed = 5; // % per second
            setMiePos(prev => {
                const newPos = prev + mieSpeed * deltaTime;
                return newPos;
            });

            // Move Totoro (Variable speed based on typing)
            // Decay speed over time
            setTotoroSpeed(prev => Math.max(prev - (0.3 * deltaTime), 0)); // Slower decay

            // Apply speed to position. NOTE: Speed acts as a boost to position update?
            // Actually, let's make it simpler: constant forward movement + burst on type?
            // Re-evaluating: 'speed' state variable is 'current velocity'.
            // We update position by velocity * deltaTime.
            // But if we decay velocity to 0, Totoro stops. This feels right.

            // Let's use a higher speed scale for the position update
            setTotoroPos(prev => {
                const moveAmount = totoroSpeed * 20 * deltaTime; // Reduced multiplier
                const newPos = prev + moveAmount;
                return newPos;
            });

            // Check Win/Loss
            if (userInput.length === GAME_TEXT.length) {
                setGameState('won');
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            } else {
                // We need to check collision in state update to be accurate,
                // but checking here is "next frame" which is fine.
                // Need to check refs or functional updates to be safe from stale closures?
                // React SetState functional update handles prev, but inside this loop
                // we rely on the implementation. Let's rely on the separate checking effect
                // OR move this logic.
            }

            animationFrameId = requestAnimationFrame(update);
        };

        animationFrameId = requestAnimationFrame(update);

        return () => cancelAnimationFrame(animationFrameId);
    }, [gameState, totoroSpeed, userInput.length]);

    // Win/Loss check effect
    useEffect(() => {
        if (gameState !== 'playing') return;

        if (miePos >= totoroPos - 5) { // Catch radius (Mie is 5% behind implies caught if visuals overlap?)
            // Let's say if Mie >= Totoro, game over.
            // Give a bit of grace visually?
            // Actually let's strict check: Mie >= Totoro
            if (miePos >= totoroPos) {
                setGameState('lost');
            }
        }
    }, [miePos, totoroPos, gameState]);


    // Input listener
    useEffect(() => {
        if (gameState !== 'playing') return;

        const onKeydown = (e: KeyboardEvent) => {
            handleKeyDown(e);
            if (e.key === " " && e.target === document.body) {
                e.preventDefault();
            }
        };

        window.addEventListener('keydown', onKeydown);
        return () => window.removeEventListener('keydown', onKeydown);
    }, [handleKeyDown, gameState]);

    const handleReset = () => {
        resetTyping();
        setGameState('playing');
        setTotoroPos(35);
        setMiePos(0);
        setTotoroSpeed(0);
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <button onClick={onBack} className="glass" style={{ padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                    <ArrowLeft size={16} /> Thoát game
                </button>
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'var(--primary-color)' }}>
                    MIE ĐUỔI BẮT
                </div>
            </div>

            {/* Game Track Area */}
            <div style={{
                position: 'relative',
                height: '200px',
                background: 'linear-gradient(to bottom, #87CEEB 0%, #E0F7FA 100%)', // Sky/Forest vibes?
                borderRadius: '20px',
                marginBottom: '30px',
                overflow: 'hidden',
                border: '4px solid #fff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
                {/* Background Decor (Trees) */}
                <div style={{ position: 'absolute', bottom: 0, left: '10%', fontSize: '40px' }}>🌲</div>
                <div style={{ position: 'absolute', bottom: 0, left: '40%', fontSize: '50px' }}>🌳</div>
                <div style={{ position: 'absolute', bottom: 0, left: '70%', fontSize: '40px' }}>🌲</div>
                <div style={{ position: 'absolute', bottom: 0, left: '90%', fontSize: '60px' }}>🌳</div>

                {/* Track Line */}
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: 0,
                    width: '100%',
                    height: '10px',
                    background: '#8B4513',
                    borderRadius: '5px'
                }} />

                {/* Characters */}
                {/* Mie */}
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: '25px',
                        left: `${Math.min(miePos, 95)}%`,
                        zIndex: 10,
                    }}
                >
                    <div style={meiStyle} />
                </motion.div>

                {/* Totoro */}
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: '25px',
                        left: `${Math.min(totoroPos, 95)}%`,
                        zIndex: 10,
                    }}
                >
                    <div style={totoroStyle} />
                </motion.div>

                {/* Finish Line */}
                <div style={{ position: 'absolute', bottom: '20px', right: '20px', height: '60px', borderLeft: '5px dashed white' }}></div>
            </div>

            {/* Typing Area (Simplified) */}
            <div style={{ opacity: gameState === 'playing' ? 1 : 0.5, transition: 'opacity 0.3s' }}>
                <TypingArea
                    text={GAME_TEXT}
                    userInput={userInput}
                    currentIndex={currentIndex}
                    telexBuffer={telexBuffer}
                    rules={TELEX_RULES}
                />
            </div>

            {/* Game Over / Win Overlays */}
            {gameState !== 'playing' && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 100,
                    backdropFilter: 'blur(5px)'
                }}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass"
                        style={{ padding: '40px', textAlign: 'center', maxWidth: '400px' }}
                    >
                        {gameState === 'won' ? (
                            <>
                                <Trophy size={60} color="#FFD700" style={{ marginBottom: '20px' }} />
                                <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Chiến thắng!</h1>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                                    Totoro đã chạy thoát thành công!
                                </p>
                            </>
                        ) : (
                            <>
                                <Skull size={60} color="#FF595E" style={{ marginBottom: '20px' }} />
                                <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Ôi không!</h1>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                                    Mie đã bắt được Totoro rồi.
                                </p>
                            </>
                        )}

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button onClick={handleReset} style={{ padding: '12px 24px', background: 'var(--primary-color)', borderRadius: '8px', color: 'white', fontWeight: 'bold' }}>
                                Chơi lại
                            </button>
                            <button onClick={onBack} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}>
                                Thoát
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Speed Indicator (Debug/Feedback) */}
            <div style={{ textAlign: 'center', marginTop: '10px', color: 'var(--text-muted)', fontSize: '12px' }}>
                Speed: {Math.round(totoroSpeed * 100)} | Position: {Math.round(totoroPos)}%
            </div>

        </div>
    );
};

export default GameSession;
