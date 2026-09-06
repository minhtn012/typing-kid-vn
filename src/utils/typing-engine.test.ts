import { describe, expect, it } from 'vitest';
import { TELEX_RULES, VNI_RULES } from '../constants';
import {
    buildWordVariants,
    composeDisplay,
    createWordState,
    matchKey,
    nextExpectedKey,
    popKey,
    type WordMatchState,
    type WordVariant,
} from './typing-engine';

type Rules = Record<string, string[]>;

/** Gõ lần lượt các phím, trả state cuối + cờ completed; expect mọi phím đều đúng. */
const typeAll = (variants: WordVariant[], keys: string[]) => {
    let state = createWordState(variants);
    let completed = false;
    for (const key of keys) {
        const r = matchKey(state, variants, key);
        expect(r.result, `key "${key}" trong chuỗi ${keys.join('')}`).toBe('correct');
        state = r.next;
        completed = r.completed;
    }
    return { state, completed };
};

const acceptsSequence = (word: string, rules: Rules, sequence: string) => {
    const variants = buildWordVariants(word, rules);
    const { completed } = typeAll(variants, sequence.split(''));
    expect(completed, `"${word}" phải hoàn thành với "${sequence}"`).toBe(true);
};

describe('buildWordVariants', () => {
    it('từ không dấu chỉ có 1 biến thể là chính nó', () => {
        const variants = buildWordVariants('con', TELEX_RULES);
        expect(variants).toHaveLength(1);
        expect(variants[0].keys).toEqual(['c', 'o', 'n']);
    });

    it('từ 1 ký tự có dấu ("ậ") chỉ còn 1 biến thể sau dedup', () => {
        const variants = buildWordVariants('ậ', TELEX_RULES);
        expect(variants).toHaveLength(1);
        expect(variants[0].keys).toEqual(['a', 'a', 'j']);
    });

    it('"gần" Telex sinh 3 biến thể B/A/C đúng thứ tự ưu tiên', () => {
        const variants = buildWordVariants('gần', TELEX_RULES);
        expect(variants.map((v) => v.keys)).toEqual([
            ['g', 'a', 'a', 'n', 'f'], // B: word-end (preferred)
            ['g', 'a', 'a', 'f', 'n'], // A: inline
            ['g', 'a', 'n', 'a', 'f'], // C: fully-deferred
        ]);
    });

    it('"đ" là shape (không phải tone): variant B giữ inline, C dồn về nhóm shape', () => {
        const variants = buildWordVariants('đi', TELEX_RULES);
        expect(variants.map((v) => v.keys)).toEqual([
            ['d', 'd', 'i'], // B ≡ A
            ['d', 'i', 'd'], // C
        ]);
    });

    it('memoize: gọi lại cùng (word, rules) trả cùng reference', () => {
        const a = buildWordVariants('học', TELEX_RULES);
        const b = buildWordVariants('học', TELEX_RULES);
        expect(a).toBe(b);
    });
});

describe('matchKey — Telex', () => {
    it('"học" pass với hojc (inline) và hocj (deferred)', () => {
        acceptsSequence('học', TELEX_RULES, 'hojc');
        acceptsSequence('học', TELEX_RULES, 'hocj');
    });

    it('"gần" pass với gaafn, gaanf, ganaf', () => {
        acceptsSequence('gần', TELEX_RULES, 'gaafn');
        acceptsSequence('gần', TELEX_RULES, 'gaanf');
        acceptsSequence('gần', TELEX_RULES, 'ganaf');
    });

    it('"đi" pass với ddi', () => {
        acceptsSequence('đi', TELEX_RULES, 'ddi');
    });

    it('"người" pass inline và deferred đầy đủ', () => {
        acceptsSequence('người', TELEX_RULES, 'nguwowfi'); // inline
        acceptsSequence('người', TELEX_RULES, 'nguwowif'); // tone-deferred
        acceptsSequence('người', TELEX_RULES, 'nguoiwwf'); // fully-deferred
    });

    it('phím sai bị reject nhưng không phá state', () => {
        const variants = buildWordVariants('học', TELEX_RULES);
        const { state } = typeAll(variants, ['h', 'o']);
        const wrong = matchKey(state, variants, 'z');
        expect(wrong.result).toBe('wrong');
        expect(wrong.completed).toBe(false);
        expect(wrong.next).toBe(state); // state giữ nguyên
        // Vẫn tiếp tục gõ đúng được cả hai kiểu
        expect(matchKey(state, variants, 'j').result).toBe('correct');
        expect(matchKey(state, variants, 'c').result).toBe('correct');
    });

    it('space không nằm trong biến thể nào → wrong (từ chưa complete)', () => {
        const variants = buildWordVariants('học', TELEX_RULES);
        const { state } = typeAll(variants, ['h', 'o', 'c']);
        expect(matchKey(state, variants, ' ').result).toBe('wrong');
    });
});

describe('token có dấu câu cuối từ', () => {
    it('"hành," dồn dấu về sau chữ cái cuối, TRƯỚC dấu câu: hanhf, không phải hanh,f', () => {
        const variants = buildWordVariants('hành,', TELEX_RULES);
        // Variant B (preferred, dùng cho hint): h,a,n,h,f,"," — kiểu Unikey thật
        expect(variants[0].keys).toEqual(['h', 'a', 'n', 'h', 'f', ',']);
        acceptsSequence('hành,', TELEX_RULES, 'hanhf,'); // deferred
        acceptsSequence('hành,', TELEX_RULES, 'hafnh,'); // inline
    });

    it('"quả." Telex và "gần." VNI đều nhận kiểu deferred trước dấu chấm', () => {
        acceptsSequence('quả.', TELEX_RULES, 'quar.');
        acceptsSequence('gần.', VNI_RULES, 'gan62.');
    });

    it('token toàn dấu câu ("...") chỉ có 1 biến thể literal', () => {
        const variants = buildWordVariants('...', TELEX_RULES);
        expect(variants).toHaveLength(1);
        expect(variants[0].keys).toEqual(['.', '.', '.']);
    });
});

describe('matchKey — VNI', () => {
    it('"gần" pass với ga62n, ga6n2, gan62', () => {
        acceptsSequence('gần', VNI_RULES, 'ga62n');
        acceptsSequence('gần', VNI_RULES, 'ga6n2');
        acceptsSequence('gần', VNI_RULES, 'gan62');
    });

    it('"đậu" pass với d9a65u (inline), d9a6u5 (tone-deferred), dau965 (fully-deferred)', () => {
        acceptsSequence('đậu', VNI_RULES, 'd9a65u');
        acceptsSequence('đậu', VNI_RULES, 'd9a6u5');
        acceptsSequence('đậu', VNI_RULES, 'dau965');
    });

    it('"đ" pass với d9', () => {
        acceptsSequence('đ', VNI_RULES, 'd9');
    });
});

describe('uppercase và ký tự không có rule', () => {
    it('"Chúc": chữ hoa đầu phải gõ đúng "C", phần có rule case-insensitive', () => {
        const variants = buildWordVariants('Chúc', TELEX_RULES);
        // 'c' thường bị reject ở vị trí đầu
        const state = createWordState(variants);
        expect(matchKey(state, variants, 'c').result).toBe('wrong');
        // Inline và deferred đều pass với 'C' hoa
        typeAll(variants, ['C', 'h', 'u', 's', 'c']);
        const { completed } = typeAll(variants, ['C', 'h', 'u', 'c', 's']);
        expect(completed).toBe(true);
    });

    it('phím tone chấp nhận cả chữ hoa (S ≡ s) như engine cũ', () => {
        const variants = buildWordVariants('á', TELEX_RULES);
        const { completed } = typeAll(variants, ['a', 'S']);
        expect(completed).toBe(true);
    });

    it('số và ký hiệu không có rule so khớp exact', () => {
        const variants = buildWordVariants('a5;', VNI_RULES);
        // '5' là ký tự literal trong từ không có nguyên âm mang dấu phía trước đã complete
        const { completed } = typeAll(variants, ['a', '5', ';']);
        expect(completed).toBe(true);
    });
});

describe('popKey (backspace trong từ)', () => {
    it('pop keystroke và recompute alive đúng', () => {
        const variants = buildWordVariants('gần', TELEX_RULES);
        // Gõ theo inline: g,a,a,f → variant B chết
        const { state } = typeAll(variants, ['g', 'a', 'a', 'f']);
        expect(nextExpectedKey(state, variants)).toBe('n');
        // Backspace 1 phím → quay lại g,a,a → cả B lẫn A sống lại
        const popped = popKey(state, variants);
        expect(popped.typedKeys).toEqual(['g', 'a', 'a']);
        expect(popped.alive.length).toBeGreaterThanOrEqual(2);
        // Gõ tiếp theo kiểu deferred vẫn được
        const { completed } = ['n', 'f'].reduce(
            (acc, key) => {
                const r = matchKey(acc.state, variants, key);
                expect(r.result).toBe('correct');
                return { state: r.next, completed: r.completed };
            },
            { state: popped, completed: false as boolean },
        );
        expect(completed).toBe(true);
    });

    it('pop ở state rỗng là no-op', () => {
        const variants = buildWordVariants('gần', TELEX_RULES);
        const state = createWordState(variants);
        expect(popKey(state, variants)).toBe(state);
    });
});

describe('nextExpectedKey', () => {
    it('chưa gõ gì → gợi ý theo variant B (word-end): h→o→c→j cho "học"', () => {
        const variants = buildWordVariants('học', TELEX_RULES);
        let state: WordMatchState = createWordState(variants);
        const hints: string[] = [];
        for (const key of ['h', 'o', 'c', 'j']) {
            hints.push(nextExpectedKey(state, variants));
            state = matchKey(state, variants, key).next;
        }
        expect(hints).toEqual(['h', 'o', 'c', 'j']);
        expect(nextExpectedKey(state, variants)).toBe(''); // từ đã xong
    });

    it('user gõ inline (variant B chết) → hint chuyển sang variant alive đầu tiên', () => {
        const variants = buildWordVariants('học', TELEX_RULES);
        const { state } = typeAll(variants, ['h', 'o', 'j']); // inline, B (h,o,c,j) chết
        expect(nextExpectedKey(state, variants)).toBe('c');
    });
});

describe('composeDisplay', () => {
    it('hiển thị dạng trung gian theo variant ưu tiên: gân → gần', () => {
        const variants = buildWordVariants('gần', TELEX_RULES);
        let state = createWordState(variants);
        const snapshots: string[] = [];
        for (const key of ['g', 'a', 'a', 'n', 'f']) {
            state = matchKey(state, variants, key).next;
            snapshots.push(composeDisplay(state, variants));
        }
        expect(snapshots).toEqual(['g', 'ga', 'gâ', 'gân', 'gần']);
    });

    it('VNI fully-deferred "đậu": dau → đau → đâu → đậu', () => {
        const variants = buildWordVariants('đậu', VNI_RULES);
        let state = createWordState(variants);
        const snapshots: string[] = [];
        for (const key of ['d', 'a', 'u', '9', '6', '5']) {
            state = matchKey(state, variants, key).next;
            snapshots.push(composeDisplay(state, variants));
        }
        expect(snapshots).toEqual(['d', 'da', 'dau', 'đau', 'đâu', 'đậu']);
    });

    it('giữ nguyên chữ hoa của từ gốc khi ký tự hoàn thành', () => {
        const variants = buildWordVariants('Tôi', TELEX_RULES);
        const { state } = typeAll(variants, ['T', 'o', 'o', 'i']);
        expect(composeDisplay(state, variants)).toBe('Tôi');
    });
});
