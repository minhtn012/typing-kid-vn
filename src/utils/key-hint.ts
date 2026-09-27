import { FINGER_MAP } from '../constants';

/** Ký hiệu phải giữ Shift → phím gốc trên bàn phím US. */
const SHIFTED_SYMBOLS: Record<string, string> = {
    '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6', '&': '7', '*': '8', '(': '9', ')': '0',
    '_': '-', '+': '=', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/',
};

export interface KeyHint {
    /** Phím cần bấm, dạng lowercase như trên bàn phím ảo ('' khi không có gì để gõ). */
    key: string;
    finger: number | null;
    /** Shift nào cần giữ: tay đối diện với ngón bấm phím chính, theo cách gõ 10 ngón chuẩn. */
    shift: 'left' | 'right' | null;
    shiftFinger: number | null;
}

/** Tách phím engine chờ ('E', '!', 'a') thành phím gốc + Shift cần giữ để bàn phím và bàn tay chỉ đường. */
export const keyHint = (rawKey: string): KeyHint => {
    const key = SHIFTED_SYMBOLS[rawKey] ?? rawKey.toLowerCase();
    const finger = FINGER_MAP[key] ?? null;
    if (key === rawKey || finger === null) {
        return { key, finger, shift: null, shiftFinger: null };
    }
    // Ngón 1–5 là tay trái → giữ Shift phải bằng út phải (10), và ngược lại.
    return finger <= 5
        ? { key, finger, shift: 'right', shiftFinger: 10 }
        : { key, finger, shift: 'left', shiftFinger: 1 };
};
