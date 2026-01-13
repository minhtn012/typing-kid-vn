export interface LessonResult {
    wpm: number;
    accuracy: number;
    stars: number; // 0-3 stars based on performance
    completedAt: number;
}

export interface ModeProgress {
    [lessonIndex: number]: LessonResult;
}

export interface UserProgress {
    [modeId: string]: ModeProgress;
}

const STORAGE_KEY = 'typing-kid-progress';

export const saveResult = (modeId: string, lessonIndex: number, wpm: number, accuracy: number) => {
    const progress = loadProgress();

    if (!progress[modeId]) {
        progress[modeId] = {};
    }

    // Simple star logic: >95% acc & >40 wpm = 3 stars, >90% acc = 2 stars, else 1 star
    let stars = 1;
    if (accuracy >= 98 && wpm >= 40) stars = 3;
    else if (accuracy >= 90 && wpm >= 20) stars = 2;

    // Only update if better or new
    const currentBest = progress[modeId][lessonIndex];
    if (!currentBest || (wpm > currentBest.wpm)) {
        progress[modeId][lessonIndex] = {
            wpm,
            accuracy,
            stars,
            completedAt: Date.now()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
};

export const loadProgress = (): UserProgress => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
};

export const getLessonResult = (modeId: string, lessonIndex: number): LessonResult | null => {
    const progress = loadProgress();
    return progress[modeId]?.[lessonIndex] || null;
}
