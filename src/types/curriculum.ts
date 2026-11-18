export type ThemeId = 1 | 2 | 3 | 4 | 5 | 6;

export type StudyTabId =
  | 'words'
  | 'grammar'
  | 'pictures'
  | 'flashcards'
  | 'games'
  | 'sentences'
  | 'quiz';

export interface VocabItem {
  id: string;
  themeId: ThemeId;
  word: string;
  turkish: string;
  phonetic: string;
  category: string;
  exampleEn: string;
  exampleTr: string;
  illustrationKey: string;
  bgTone: string;
}

export interface GrammarPattern {
  en: string;
  tr: string;
  highlight?: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  subtitle: string;
  explanationTr: string;
  tipTr: string;
  patterns: GrammarPattern[];
  dialogue: {
    speaker: string;
    en: string;
    tr: string;
  }[];
}

export interface SentenceBuildExercise {
  id: string;
  turkishHint: string;
  targetEn: string;
  words: string[];
  illustrationKey?: string;
}

export interface FillBlankExercise {
  id: string;
  promptBefore: string;
  promptAfter: string;
  answer: string;
  options: string[];
  turkishHint: string;
  fullSentenceEn: string;
  illustrationKey?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'picture' | 'listening' | 'meaning' | 'dialogue';
  promptTr: string;
  promptEn?: string;
  audioText?: string;
  illustrationKey?: string;
  options: string[];
  correctIndex: number;
  explanationTr: string;
}

export interface ThemeData {
  id: ThemeId;
  code: string;
  titleTr: string;
  titleEn: string;
  subtitleTr: string;
  heroImage: string;
  vocab: VocabItem[];
  grammarLessons: GrammarLesson[];
  sentenceBuilds: SentenceBuildExercise[];
  fillBlanks: FillBlankExercise[];
  quizQuestions: QuizQuestion[];
}

export interface StarHistoryEntry {
  date: string;
  starsEarned: number;
  totalStars: number;
}

export interface ThemeProgress {
  listenedWordIds: string[];
  masteredWordIds: string[];
  completedLessonIds: string[];
  pictureGalleryExplored: number;
  memoryBestMoves: number | null;
  matchingCompletedCount: number;
  raceCompletedCount: number;
  balloonBestScore: number | null;
  sentenceBuildCompletedIds: string[];
  fillBlankCompletedIds: string[];
  quizBestScore: number | null;
  quizAttempts: number;
}

export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  rewardStars: number;
  iconKey: string;
  tier: 'bronze' | 'silver' | 'gold' | 'champion';
}

export interface StudentProfile {
  name: string;
  createdAt: string;
  lastActiveAt: string;
  stars: number;
  starHistory: StarHistoryEntry[];
  earnedBadgeIds: string[];
  theme1: ThemeProgress;
  theme2: ThemeProgress;
  theme3: ThemeProgress;
  theme4: ThemeProgress;
  theme5: ThemeProgress;
  theme6: ThemeProgress;
}
