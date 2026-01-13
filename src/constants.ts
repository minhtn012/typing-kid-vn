export const TELEX_RULES: Record<string, string[]> = {
  'á': ['a', 's'],
  'à': ['a', 'f'],
  'ả': ['a', 'r'],
  'ã': ['a', 'x'],
  'ạ': ['a', 'j'],
  'â': ['a', 'a'],
  'ấ': ['a', 'a', 's'],
  'ầ': ['a', 'a', 'f'],
  'ẩ': ['a', 'a', 'r'],
  'ẫ': ['a', 'a', 'x'],
  'ậ': ['a', 'a', 'j'],
  'ă': ['a', 'w'],
  'ắ': ['a', 'w', 's'],
  'ằ': ['a', 'w', 'f'],
  'ẳ': ['a', 'w', 'r'],
  'ẵ': ['a', 'w', 'x'],
  'ặ': ['a', 'w', 'j'],
  'é': ['e', 's'],
  'è': ['e', 'f'],
  'ẻ': ['e', 'r'],
  'ẽ': ['e', 'x'],
  'ẹ': ['e', 'j'],
  'ê': ['e', 'e'],
  'ế': ['e', 'e', 's'],
  'ề': ['e', 'e', 'f'],
  'ể': ['e', 'e', 'r'],
  'ễ': ['e', 'e', 'x'],
  'ệ': ['e', 'e', 'j'],
  'í': ['i', 's'],
  'ì': ['i', 'f'],
  'ỉ': ['i', 'r'],
  'ĩ': ['i', 'x'],
  'ị': ['i', 'j'],
  'ó': ['o', 's'],
  'ò': ['o', 'f'],
  'ỏ': ['o', 'r'],
  'õ': ['o', 'x'],
  'ọ': ['o', 'j'],
  'ô': ['o', 'o'],
  'ố': ['o', 'o', 's'],
  'ồ': ['o', 'o', 'f'],
  'ổ': ['o', 'o', 'r'],
  'ỗ': ['o', 'o', 'x'],
  'ộ': ['o', 'o', 'j'],
  'ơ': ['o', 'w'],
  'ớ': ['o', 'w', 's'],
  'ờ': ['o', 'w', 'f'],
  'ở': ['o', 'w', 'r'],
  'ỡ': ['o', 'w', 'x'],
  'ợ': ['o', 'w', 'j'],
  'ú': ['u', 's'],
  'ù': ['u', 'f'],
  'ủ': ['u', 'r'],
  'ũ': ['u', 'x'],
  'ụ': ['u', 'j'],
  'ư': ['u', 'w'],
  'ứ': ['u', 'w', 's'],
  'ừ': ['u', 'w', 'f'],
  'ử': ['u', 'w', 'r'],
  'ữ': ['u', 'w', 'x'],
  'ự': ['u', 'w', 'j'],
  'ý': ['y', 's'],
  'ỳ': ['y', 'f'],
  'ỷ': ['y', 'r'],
  'ỹ': ['y', 'x'],
  'ỵ': ['y', 'j'],
  'đ': ['d', 'd'],
};

export const FINGER_MAP: Record<string, number> = {
  'q': 1, 'a': 1, 'z': 1, '1': 1, '`': 1, 'tab': 1, 'capslock': 1, 'shift': 1,
  'w': 2, 's': 2, 'x': 2, '2': 2,
  'e': 3, 'd': 3, 'c': 3, '3': 3,
  'r': 4, 'f': 4, 'v': 4, 't': 4, 'g': 4, 'b': 4, '4': 4, '5': 4,
  ' ': 5, // Thumb (left or right, usually right)
  'y': 7, 'h': 7, 'n': 7, 'u': 7, 'j': 7, 'm': 7, '6': 7, '7': 7,
  'i': 8, 'k': 8, ',': 8, '8': 8,
  'o': 9, 'l': 9, '.': 9, '9': 0,
  'p': 10, ';': 10, '/': 10, '[': 10, ']': 10, "'": 10, '0': 10, '-': 10, '=': 10, 'backspace': 10, 'enter': 10, 'shift-right': 10,
};

export const FINGER_LABELS: Record<number, string> = {
  1: 'Ngón út (Trái)',
  2: 'Ngón áp út (Trái)',
  3: 'Ngón giữa (Trái)',
  4: 'Ngón trỏ (Trái)',
  5: 'Ngón cái (Trái)',
  6: 'Ngón cái (Phải)',
  7: 'Ngón trỏ (Phải)',
  8: 'Ngón giữa (Phải)',
  9: 'Ngón áp út (Phải)',
  10: 'Ngón út (Phải)',
};

// 1-4: Left hand (pinky to index)
// 5-6: Thumbs
// 7-10: Right hand (index to pinky)

export const FINGER_COLORS: Record<number, string> = {
  1: '#FF595E', // Pinky - Red
  2: '#FFCA3A', // Ring - Yellow
  3: '#8AC926', // Middle - Green
  4: '#1982C4', // Index - Blue
  5: '#6A4C93', // Thumb - Purple
  6: '#6A4C93', // Thumb - Purple
  7: '#1982C4', // Index - Blue
  8: '#8AC926', // Middle - Green
  9: '#FFCA3A', // Ring - Yellow
  10: '#FF595E', // Pinky - Red
};

export const LESSON_MODES = [
  {
    id: 'basic_home',
    name: 'Cơ bản: Hàng phím cơ sở',
    text: [
      "a s d f j k l ;",
      "a s d f g h j k l ;",
      "fa da sa ja la ka",
      "dsk jfd lsa kja",
      "asdf jkl; asdf jkl;",
    ]
  },
  {
    id: 'basic_top',
    name: 'Cơ bản: Hàng phím trên',
    text: [
      "q w e r u i o p",
      "q w e r t y u i o p",
      "qa ws ed rf uj ik ol p;",
      "que ruoi to piques",
      "qwerty uiop",
    ]
  },
  {
    id: 'basic_bottom',
    name: 'Cơ bản: Hàng phím dưới',
    text: [
      "z x c v m , . /",
      "z x c v b n m , . /",
      "za xs cd vf mj ,k .l /;",
      "zxcv bnm,./",
    ]
  },
  {
    id: 'vietnamese_telex',
    name: 'Luyện dấu Telex',
    text: [
      "s f r x j",
      "as af ar ax aj",
      "sas faf rar xax jaj",
      "cá cà cả cã cạ",
      "má mà mả mã mạ",
      "đá đà đả đã đạ",
      "ăn ắc ằn ẳm ẵng ặm",
      "âm ấm ầm ẩm ẫm ậm",
      "em ếm ềm ểm ễu ệm",
      "ơm ớm ờm ởm ỡm ợm",
    ]
  },
  {
    id: 'vietnamese_words',
    name: 'Từ vựng Tiếng Việt',
    text: [
      "con cò bé bé nó đậu cành tre",
      "đi một ngày đàng học một sàng khôn",
      "bầu ơi thương lấy bí cùng tuy rằng khác giống nhưng chung một giàn",
      "gần mực thì đen gần đèn thì rạng",
      "lá lành đùm lá rách",
      "tiên học lễ hậu học văn",
    ]
  },
  {
    id: 'sentences',
    name: 'Câu danh ngôn',
    text: [
      "Chúc các bạn luyện gõ mười ngón thật tốt và hiệu quả.",
      "Học đi đôi với hành, luyện tập hàng ngày sẽ giúp bạn tiến bộ.",
      "Tiếng Việt là ngôn ngữ giàu và đẹp, hãy gõ thật chính xác.",
      "Công nghệ giúp cuộc sống trở nên dễ dàng và thuận tiện hơn.",
      "Hãy kiên trì, thành công sẽ đến với những người nỗ lực không ngừng.",
    ]
  }
];
