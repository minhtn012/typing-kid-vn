import type React from 'react';

/** 12 nguyên âm gốc × 5 ký tự có dấu — cấu trúc TRÌNH BÀY của bảng tra cứu. */
const VOWEL_GROUPS: { base: string; chars: string[] }[] = [
    { base: 'a', chars: ['á', 'à', 'ả', 'ã', 'ạ'] },
    { base: 'ă', chars: ['ắ', 'ằ', 'ẳ', 'ẵ', 'ặ'] },
    { base: 'â', chars: ['ấ', 'ầ', 'ẩ', 'ẫ', 'ậ'] },
    { base: 'e', chars: ['é', 'è', 'ẻ', 'ẽ', 'ẹ'] },
    { base: 'ê', chars: ['ế', 'ề', 'ể', 'ễ', 'ệ'] },
    { base: 'i', chars: ['í', 'ì', 'ỉ', 'ĩ', 'ị'] },
    { base: 'o', chars: ['ó', 'ò', 'ỏ', 'õ', 'ọ'] },
    { base: 'ô', chars: ['ố', 'ồ', 'ổ', 'ỗ', 'ộ'] },
    { base: 'ơ', chars: ['ớ', 'ờ', 'ở', 'ỡ', 'ợ'] },
    { base: 'u', chars: ['ú', 'ù', 'ủ', 'ũ', 'ụ'] },
    { base: 'ư', chars: ['ứ', 'ừ', 'ử', 'ữ', 'ự'] },
    { base: 'y', chars: ['ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ'] },
];

export const TONE_LABELS = ['Sắc', 'Huyền', 'Hỏi', 'Ngã', 'Nặng'];

export interface ToneTableRow {
    base: string;
    baseKeys: string;
    cells: { char: string; keys: string }[];
}

/**
 * Sinh dữ liệu bảng nguyên âm × thanh từ bảng luật của một kiểu gõ.
 * Thay cho buildTelexTable()/buildVniTable() vốn giống hệt nhau ngoài tham số rules.
 */
export function buildToneTable(rules: Record<string, string[]>): ToneTableRow[] {
    return VOWEL_GROUPS.map(({ base, chars }) => ({
        base,
        baseKeys: (rules[base] ?? [base]).join(''),
        // Guard ?? để không crash nếu constants.ts đổi và thiếu key ký tự nào đó
        cells: chars.map((c) => ({ char: c, keys: (rules[c] ?? ['?']).join('') })),
    }));
}

export const cellStyle: React.CSSProperties = { padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' };
export const headStyle: React.CSSProperties = { padding: '14px 15px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', fontWeight: 700 };
