import { useState, useEffect, useCallback, useMemo } from 'react';
import { TELEX_RULES, FINGER_MAP } from '../constants';
import {
    buildWordVariants,
    composeDisplay,
    createWordState,
    isWordCompleted,
    matchKey,
    nextExpectedKey,
    popKey,
} from '../utils/typing-engine';
import type { WordMatchState, WordVariant } from '../utils/typing-engine';

interface TypingStats {
    wpm: number;
    accuracy: number;
    correctChars: number;
    errorChars: number;
    startTime: number | null;
    endTime: number | null;
}

interface WordToken {
    word: string;
    /** Vị trí ký tự đầu của từ trong text gốc. */
    start: number;
    variants: WordVariant[];
}

const INITIAL_STATS: TypingStats = {
    wpm: 0,
    accuracy: 100,
    correctChars: 0,
    errorChars: 0,
    startTime: null,
    endTime: null,
};

export const useTyping = (text: string, rules: Record<string, string[]> = TELEX_RULES, options?: { onCorrect?: () => void; onMistake?: () => void }) => {
    // Tokenize theo space: khoảng trắng là ký tự phân cách phải gõ đúng như cũ.
    const tokens = useMemo<WordToken[]>(() => {
        const result: WordToken[] = [];
        let pos = 0;
        for (const word of text.split(' ')) {
            result.push({ word, start: pos, variants: buildWordVariants(word, rules) });
            pos += word.length + 1;
        }
        return result;
    }, [text, rules]);

    const [wordIdx, setWordIdx] = useState(0);
    const [wordState, setWordState] = useState<WordMatchState>(() => createWordState(tokens[0].variants));
    const [stats, setStats] = useState<TypingStats>(INITIAL_STATS);

    const [prevTokens, setPrevTokens] = useState(tokens);

    // text/rules đổi → state cũ trỏ vào variants cũ, phải reset. Chỉnh ngay trong
    // render thay vì effect: React render lại lập tức nên không commit frame nào
    // dùng variants cũ.
    if (prevTokens !== tokens) {
        setPrevTokens(tokens);
        setWordIdx(0);
        setWordState(createWordState(tokens[0].variants));
    }

    // Clamp phòng 1 render giữa lúc tokens đổi và effect reset chạy.
    const safeIdx = Math.min(wordIdx, tokens.length - 1);
    const current = tokens[safeIdx];
    const currentCompleted = isWordCompleted(wordState, current.variants);
    const isLastWord = safeIdx === tokens.length - 1;
    const isFinished = isLastWord && currentCompleted;

    // userInput suy ra từ các từ đã commit + text tạm của từ đang gõ.
    // Khi finish, userInput === text (bất biến cũ cho components).
    const committed = tokens.slice(0, safeIdx).map((t) => t.word).join(' ') + (safeIdx > 0 ? ' ' : '');
    const currentWordDisplay = composeDisplay(wordState, current.variants);
    const userInput = committed + currentWordDisplay;

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

        // Backspace chỉ trong từ đang gõ; ở đầu từ mới là no-op (từ đã commit là chốt).
        if (key === 'Backspace') {
            setWordState((prev) => popKey(prev, current.variants));
            return;
        }

        // Ignore special keys
        if (key.length > 1) return;

        // Đồng hồ chạy từ phím đúng đầu tiên (trước đây tính trong effect theo độ dài userInput).
        const markCorrect = () => {
            setStats((prev) => ({
                ...prev,
                correctChars: prev.correctChars + 1,
                startTime: prev.startTime ?? Date.now(),
            }));
            options?.onCorrect?.();
        };
        const markMistake = () => {
            setStats((prev) => ({ ...prev, errorChars: prev.errorChars + 1 }));
            options?.onMistake?.();
        };

        // Từ hiện tại đã xong → chỉ chờ space phân cách (từ cuối đã bị isFinished chặn).
        if (currentCompleted) {
            if (key === ' ') {
                const nextIdx = safeIdx + 1;
                setWordIdx(nextIdx);
                setWordState(createWordState(tokens[nextIdx].variants));
                markCorrect();
            } else {
                markMistake();
            }
            return;
        }

        // Space sớm (từ chưa đủ dấu) không khớp biến thể nào → tính là lỗi, không nhảy từ.
        const r = matchKey(wordState, current.variants, key);
        if (r.result === 'correct') {
            setWordState(r.next);
            markCorrect();
            // Phím vừa gõ làm xong từ cuối → chốt endTime ngay tại đây.
            if (isLastWord && isWordCompleted(r.next, current.variants)) {
                setStats((prev) => ({ ...prev, endTime: prev.endTime ?? Date.now() }));
            }
        } else {
            markMistake();
        }
    }, [isFinished, currentCompleted, current.variants, tokens, safeIdx, isLastWord, wordState, options]);

    const reset = useCallback(() => {
        setWordIdx(0);
        setWordState(createWordState(tokens[0].variants));
        setStats(INITIAL_STATS);
    }, [tokens]);

    // Gợi ý phím kế tiếp theo biến thể word-end (Unikey); lowercase cho Keyboard/Hands.
    const currentKeyToPress = isFinished
        ? ''
        : currentCompleted
            ? ' '
            : nextExpectedKey(wordState, current.variants).toLowerCase();
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
        // Vùng ký tự của từ đang gõ trong text + text tạm để TypingArea render.
        currentWordRange: isFinished ? null : { start: current.start, end: current.start + current.word.length },
        currentWordDisplay,
    };
};
