import { useState, useEffect, useCallback } from 'react';
import { TELEX_RULES, FINGER_MAP } from '../constants';

interface TypingStats {
    wpm: number;
    accuracy: number;
    correctChars: number;
    errorChars: number;
    startTime: number | null;
    endTime: number | null;
}

export const useTyping = (text: string, rules: Record<string, string[]> = TELEX_RULES) => {
    const [userInput, setUserInput] = useState('');
    const [telexBuffer, setTelexBuffer] = useState<string[]>([]);
    const [stats, setStats] = useState<TypingStats>({
        wpm: 0,
        accuracy: 100,
        correctChars: 0,
        errorChars: 0,
        startTime: null,
        endTime: null,
    });

    const isFinished = userInput.length === text.length;

    useEffect(() => {
        if (userInput.length === 1 && !stats.startTime) {
            setStats((prev) => ({ ...prev, startTime: Date.now() }));
        }
        if (isFinished && !stats.endTime) {
            setStats((prev) => ({ ...prev, endTime: Date.now() }));
        }
    }, [userInput, isFinished, stats.startTime, stats.endTime]);

    useEffect(() => {
        if (stats.startTime && !stats.endTime) {
            const interval = setInterval(() => {
                const now = Date.now();
                const durationInMinutes = (now - stats.startTime!) / 60000;
                const wordsTyped = userInput.length / 5;
                const currentWpm = Math.round(wordsTyped / durationInMinutes) || 0;

                const totalTyped = stats.correctChars + stats.errorChars;
                const currentAccuracy = totalTyped === 0 ? 100 : Math.round((stats.correctChars / totalTyped) * 100);

                setStats((prev) => ({ ...prev, wpm: currentWpm, accuracy: currentAccuracy }));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [stats.startTime, stats.endTime, userInput.length, stats.correctChars, stats.errorChars]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (isFinished) return;

        const key = e.key;
        const targetChar = text[userInput.length];
        const rulesForChar = rules[targetChar.toLowerCase()];

        // Handle backspace
        if (key === 'Backspace') {
            if (telexBuffer.length > 0) {
                setTelexBuffer((prev) => prev.slice(0, -1));
            } else {
                setUserInput((prev) => prev.slice(0, -1));
            }
            return;
        }

        // Ignore special keys
        if (key.length > 1) return;

        if (rulesForChar) {
            const nextInSequence = rulesForChar[telexBuffer.length];
            if (key.toLowerCase() === nextInSequence) {
                const newBuffer = [...telexBuffer, key.toLowerCase()];
                if (newBuffer.length === rulesForChar.length) {
                    setUserInput((prev) => prev + targetChar);
                    setTelexBuffer([]);
                    setStats((prev) => ({ ...prev, correctChars: prev.correctChars + 1 }));
                } else {
                    setTelexBuffer(newBuffer);
                }
            } else {
                setStats((prev) => ({ ...prev, errorChars: prev.errorChars + 1 }));
            }
        } else {
            if (key === targetChar) {
                setUserInput((prev) => prev + key);
                setStats((prev) => ({ ...prev, correctChars: prev.correctChars + 1 }));
            } else {
                setStats((prev) => ({ ...prev, errorChars: prev.errorChars + 1 }));
            }
        }
    }, [text, userInput.length, isFinished, telexBuffer, rules]);

    const reset = useCallback(() => {
        setUserInput('');
        setTelexBuffer([]);
        setStats({
            wpm: 0,
            accuracy: 100,
            correctChars: 0,
            errorChars: 0,
            startTime: null,
            endTime: null,
        });
    }, []);

    const currentTargetChar = text[userInput.length] || '';
    const currentRules = rules[currentTargetChar.toLowerCase()];
    const currentKeyToPress = currentRules ? currentRules[telexBuffer.length] : currentTargetChar.toLowerCase();
    const currentFinger = FINGER_MAP[currentKeyToPress] || null;

    return {
        userInput,
        stats,
        isFinished,
        handleKeyDown,
        reset,
        currentIndex: userInput.length,
        currentKeyToPress,
        currentFinger,
        telexBuffer,
    };
};
