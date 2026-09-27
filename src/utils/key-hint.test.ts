import { describe, expect, it } from 'vitest';
import { keyHint } from './key-hint';

describe('keyHint', () => {
    it('chữ thường không cần Shift', () => {
        expect(keyHint('e')).toEqual({ key: 'e', finger: 3, shift: null, shiftFinger: null });
    });

    it('chữ hoa tay trái giữ Shift phải bằng út phải', () => {
        expect(keyHint('E')).toEqual({ key: 'e', finger: 3, shift: 'right', shiftFinger: 10 });
    });

    it('chữ hoa tay phải giữ Shift trái bằng út trái', () => {
        expect(keyHint('M')).toEqual({ key: 'm', finger: 7, shift: 'left', shiftFinger: 1 });
    });

    it('ký hiệu cần Shift chỉ về phím gốc', () => {
        expect(keyHint('!')).toEqual({ key: '1', finger: 1, shift: 'right', shiftFinger: 10 });
        expect(keyHint('?')).toEqual({ key: '/', finger: 10, shift: 'left', shiftFinger: 1 });
    });

    it('phím cách, số và dấu câu thường không cần Shift', () => {
        expect(keyHint(' ').shift).toBeNull();
        expect(keyHint('7').shift).toBeNull();
        expect(keyHint('.').shift).toBeNull();
    });

    it('không có phím chờ thì không gợi ý gì', () => {
        expect(keyHint('')).toEqual({ key: '', finger: null, shift: null, shiftFinger: null });
    });
});
