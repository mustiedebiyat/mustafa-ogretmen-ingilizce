import {
  StarHistoryEntry,
  StudentProfile,
  ThemeId,
  ThemeProgress,
} from '../types/curriculum';
import { THEMES } from '../data/curriculum';

const STORAGE_PROFILES_KEY = 'mustafa_hoca_ingilizce_profiles_v1';
const STORAGE_ACTIVE_NAME_KEY = 'mustafa_hoca_ingilizce_active_v1';

export function getLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function createEmptyThemeProgress(): ThemeProgress {
  return {
    listenedWordIds: [],
    masteredWordIds: [],
    completedLessonIds: [],
    pictureGalleryExplored: 0,
    memoryBestMoves: null,
    matchingCompletedCount: 0,
    raceCompletedCount: 0,
    balloonBestScore: null,
    sentenceBuildCompletedIds: [],
    fillBlankCompletedIds: [],
    quizBestScore: null,
    quizAttempts: 0,
  };
}

function normalizeThemeProgress(raw?: Partial<ThemeProgress>): ThemeProgress {
  const base = createEmptyThemeProgress();
  if (!raw) return base;
  return {
    ...base,
    ...raw,
    listenedWordIds: Array.isArray(raw.listenedWordIds) ? raw.listenedWordIds : [],
    masteredWordIds: Array.isArray(raw.masteredWordIds) ? raw.masteredWordIds : [],
    completedLessonIds: Array.isArray(raw.completedLessonIds) ? raw.completedLessonIds : [],
    sentenceBuildCompletedIds: Array.isArray(raw.sentenceBuildCompletedIds)
      ? raw.sentenceBuildCompletedIds
      : [],
    fillBlankCompletedIds: Array.isArray(raw.fillBlankCompletedIds)
      ? raw.fillBlankCompletedIds
      : [],
  };
}

function normalizeProfile(raw: StudentProfile): StudentProfile {
  const today = getLocalDateKey();
  const existingHistory = Array.isArray(raw.starHistory) ? raw.starHistory : [];
  const starHistory: StarHistoryEntry[] =
    existingHistory.length > 0
      ? existingHistory
      : raw.stars > 0
      ? [{ date: today, starsEarned: raw.stars, totalStars: raw.stars }]
      : [{ date: today, starsEarned: 0, totalStars: 0 }];

  return {
    ...raw,
    stars: typeof raw.stars === 'number' ? raw.stars : 0,
    starHistory,
    earnedBadgeIds: Array.isArray(raw.earnedBadgeIds) ? raw.earnedBadgeIds : [],
    theme1: normalizeThemeProgress(raw.theme1),
    theme2: normalizeThemeProgress(raw.theme2),
    theme3: normalizeThemeProgress(raw.theme3),
  };
}

export function createEmptyProfile(name: string): StudentProfile {
  const now = new Date().toISOString();
  const today = getLocalDateKey();
  return {
    name: name.trim(),
    createdAt: now,
    lastActiveAt: now,
    stars: 0,
    starHistory: [{ date: today, starsEarned: 0, totalStars: 0 }],
    earnedBadgeIds: [],
    theme1: createEmptyThemeProgress(),
    theme2: createEmptyThemeProgress(),
    theme3: createEmptyThemeProgress(),
  };
}

export function updateStarHistory(
  prevProfile: StudentProfile,
  nextTotalStars: number
): StarHistoryEntry[] {
  const today = getLocalDateKey();
  const delta = Math.max(0, nextTotalStars - prevProfile.stars);
  const history = [...(prevProfile.starHistory ?? [])];
  const todayIndex = history.findIndex((entry) => entry.date === today);

  if (todayIndex >= 0) {
    history[todayIndex] = {
      date: today,
      starsEarned: history[todayIndex].starsEarned + delta,
      totalStars: nextTotalStars,
    };
  } else {
    history.push({
      date: today,
      starsEarned: delta,
      totalStars: nextTotalStars,
    });
  }

  return history.slice(-30);
}

export function getChartStarHistory(
  profile: StudentProfile | null,
  days = 7
): {
  date: string;
  label: string;
  starsEarned: number;
  totalStars: number;
}[] {
  const today = new Date();
  const entryMap = new Map<string, StarHistoryEntry>();
  if (profile?.starHistory) {
    for (const entry of profile.starHistory) {
      entryMap.set(entry.date, entry);
    }
  }

  const sortedDates = Array.from(entryMap.keys()).sort();
  const result: {
    date: string;
    label: string;
    starsEarned: number;
    totalStars: number;
  }[] = [];

  const monthFormatter = new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'short',
  });

  let runningTotal = 0;

  for (let offset = days - 1; offset >= 0; offset--) {
    const d = new Date(today);
    d.setDate(today.getDate() - offset);
    const key = getLocalDateKey(d);
    const existing = entryMap.get(key);

    if (existing) {
      runningTotal = existing.totalStars;
    } else {
      const priorDate = [...sortedDates].reverse().find((sd) => sd < key);
      if (priorDate) {
        runningTotal = entryMap.get(priorDate)!.totalStars;
      }
    }

    result.push({
      date: key,
      label: offset === 0 ? 'Bugün' : monthFormatter.format(d),
      starsEarned: existing ? existing.starsEarned : 0,
      totalStars: profile ? runningTotal : 0,
    });
  }

  return result;
}

export function loadAllProfiles(): Record<string, StudentProfile> {
  try {
    const raw = localStorage.getItem(STORAGE_PROFILES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, StudentProfile>;
    if (!parsed || typeof parsed !== 'object') return {};
    const normalized: Record<string, StudentProfile> = {};
    for (const [k, v] of Object.entries(parsed)) {
      normalized[k] = normalizeProfile(v);
    }
    return normalized;
  } catch {
    return {};
  }
}

export function saveProfile(profile: StudentProfile): void {
  try {
    const profiles = loadAllProfiles();
    const key = profile.name.trim().toLocaleLowerCase('tr-TR');
    profiles[key] = {
      ...normalizeProfile(profile),
      lastActiveAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(profiles));
    localStorage.setItem(STORAGE_ACTIVE_NAME_KEY, key);
  } catch {
    // Ignore storage quota errors
  }
}

export function loadActiveProfile(): StudentProfile | null {
  try {
    const activeKey = localStorage.getItem(STORAGE_ACTIVE_NAME_KEY);
    if (!activeKey) return null;
    const profiles = loadAllProfiles();
    return profiles[activeKey] ?? null;
  } catch {
    return null;
  }
}

export function getOrCreateProfile(name: string): StudentProfile {
  const cleanName = name.trim();
  const key = cleanName.toLocaleLowerCase('tr-TR');
  const profiles = loadAllProfiles();
  if (profiles[key]) {
    const existing = normalizeProfile({
      ...profiles[key],
      name: cleanName,
      lastActiveAt: new Date().toISOString(),
    });
    saveProfile(existing);
    return existing;
  }
  const fresh = createEmptyProfile(cleanName);
  saveProfile(fresh);
  return fresh;
}

export function clearActiveStudent(): void {
  try {
    localStorage.removeItem(STORAGE_ACTIVE_NAME_KEY);
  } catch {
    // ignore
  }
}

export function getThemeCompletionPercent(profile: StudentProfile | null, themeId: ThemeId): number {
  if (!profile) return 0;
  const progress =
    themeId === 1 ? profile.theme1 : themeId === 2 ? profile.theme2 : profile.theme3;
  const theme = THEMES[themeId];

  const vocabScore = Math.min(1, progress.listenedWordIds.length / Math.max(1, theme.vocab.length * 0.5));
  const masteryScore = Math.min(1, progress.masteredWordIds.length / Math.max(1, theme.vocab.length * 0.5));
  const lessonScore = Math.min(1, progress.completedLessonIds.length / Math.max(1, theme.grammarLessons.length));
  const gameScore = Math.min(
    1,
    (progress.memoryBestMoves !== null ? 0.25 : 0) +
      (progress.matchingCompletedCount > 0 ? 0.25 : 0) +
      (progress.raceCompletedCount > 0 ? 0.25 : 0) +
      (progress.balloonBestScore !== null && progress.balloonBestScore > 0 ? 0.25 : 0)
  );
  const sentenceScore = Math.min(
    1,
    (progress.sentenceBuildCompletedIds.length + progress.fillBlankCompletedIds.length) /
      Math.max(1, theme.sentenceBuilds.length + theme.fillBlanks.length)
  );
  const quizScore = progress.quizBestScore !== null ? Math.min(1, progress.quizBestScore / 70) : 0;

  const total = (vocabScore + masteryScore + lessonScore + gameScore + sentenceScore + quizScore) / 6;
  return Math.round(total * 100);
}

export function evaluateEarnedBadges(profile: StudentProfile): {
  newBadgeIds: string[];
  bonusStars: number;
} {
  const already = new Set(profile.earnedBadgeIds);
  const newlyEarned: string[] = [];

  const totalListened =
    profile.theme1.listenedWordIds.length +
    profile.theme2.listenedWordIds.length +
    profile.theme3.listenedWordIds.length;
  const totalMastered =
    profile.theme1.masteredWordIds.length +
    profile.theme2.masteredWordIds.length +
    profile.theme3.masteredWordIds.length;
  const totalLessons =
    profile.theme1.completedLessonIds.length +
    profile.theme2.completedLessonIds.length +
    profile.theme3.completedLessonIds.length;
  const totalSentences =
    profile.theme1.sentenceBuildCompletedIds.length +
    profile.theme1.fillBlankCompletedIds.length +
    profile.theme2.sentenceBuildCompletedIds.length +
    profile.theme2.fillBlankCompletedIds.length +
    profile.theme3.sentenceBuildCompletedIds.length +
    profile.theme3.fillBlankCompletedIds.length;

  const t1Percent = getThemeCompletionPercent(profile, 1);
  const t2Percent = getThemeCompletionPercent(profile, 2);
  const t3Percent = getThemeCompletionPercent(profile, 3);

  const checks: [string, boolean][] = [
    ['first_step', totalListened >= 1 || totalLessons >= 1 || profile.stars >= 5],
    ['audio_explorer', totalListened >= 12],
    ['word_master', totalMastered >= 15],
    ['grammar_scholar', totalLessons >= 4],
    [
      'memory_champ',
      profile.theme1.memoryBestMoves !== null ||
        profile.theme2.memoryBestMoves !== null ||
        profile.theme3.memoryBestMoves !== null,
    ],
    [
      'matching_star',
      profile.theme1.matchingCompletedCount >= 1 ||
        profile.theme2.matchingCompletedCount >= 1 ||
        profile.theme3.matchingCompletedCount >= 1 ||
        profile.theme1.raceCompletedCount >= 1 ||
        profile.theme2.raceCompletedCount >= 1 ||
        profile.theme3.raceCompletedCount >= 1,
    ],
    ['sentence_builder', totalSentences >= 6],
    ['theme1_hero', (profile.theme1.quizBestScore ?? 0) >= 80 && t1Percent >= 60],
    ['theme2_hero', (profile.theme2.quizBestScore ?? 0) >= 80 && t2Percent >= 60],
    ['theme3_hero', (profile.theme3.quizBestScore ?? 0) >= 80 && t3Percent >= 60],
    [
      'super_star',
      profile.stars >= 150 && t1Percent >= 70 && t2Percent >= 70 && t3Percent >= 70,
    ],
  ];

  for (const [id, condition] of checks) {
    if (condition && !already.has(id)) {
      newlyEarned.push(id);
    }
  }

  const rewardPerBadge = 15;
  return {
    newBadgeIds: newlyEarned,
    bonusStars: newlyEarned.length * rewardPerBadge,
  };
}
