import React, { useEffect, useState } from 'react';
import { THEMES } from '../data/curriculum';
import {
  StudentProfile,
  StudyTabId,
  ThemeId,
  VocabItem,
} from '../types/curriculum';
import {
  getBestFemaleVoice,
  getFemaleEnglishVoices,
  preloadVoices,
  setPreferredFemaleVoice,
  speakEnglish,
} from '../utils/speech';
import { isSfxEnabled, setSfxEnabled } from '../utils/soundFx';
import { getThemeCompletionPercent } from '../utils/storage';
import { VocabularySection } from './study/VocabularySection';
import { GrammarSection } from './study/GrammarSection';
import { PictureGallerySection } from './study/PictureGallerySection';
import { FlashcardsSection } from './study/FlashcardsSection';
import { GamesSection } from './study/GamesSection';
import { SentenceExerciseSection } from './study/SentenceExerciseSection';
import { QuizSection } from './study/QuizSection';
import {
  ArrowLeft,
  BookOpen,
  Gamepad2,
  GraduationCap,
  Image as ImageIcon,
  Layers,
  ListChecks,
  Puzzle,
  Star,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface ThemeWorkspaceProps {
  themeId: ThemeId;
  initialTab?: StudyTabId;
  student: StudentProfile;
  onBackHome: () => void;
  onRecordWordListened: (themeId: ThemeId, wordId: string) => void;
  onToggleMastered: (themeId: ThemeId, wordId: string) => void;
  onCompleteLesson: (themeId: ThemeId, lessonId: string) => void;
  onCompleteMemory: (themeId: ThemeId, moves: number) => void;
  onCompleteMatching: (themeId: ThemeId) => void;
  onCompleteRace: (themeId: ThemeId) => void;
  onCompleteBalloon: (themeId: ThemeId, score: number, poppedCount: number) => void;
  onCompleteSentence: (themeId: ThemeId, id: string) => void;
  onCompleteFill: (themeId: ThemeId, id: string) => void;
  onFinishQuiz: (themeId: ThemeId, score: number, correctCount: number) => void;
}

const STUDY_TABS: { id: StudyTabId; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'words', label: 'Temanın Kelimeleri', icon: BookOpen },
  { id: 'grammar', label: 'Tema Konu Anlatımı', icon: GraduationCap },
  { id: 'pictures', label: 'Tema Kelimelerinin Resimleri', icon: ImageIcon },
  { id: 'flashcards', label: 'Sesli Kelime Kartları', icon: Layers },
  { id: 'games', label: 'Eşleştirme ve Hafıza Oyunları', icon: Gamepad2 },
  { id: 'sentences', label: 'Cümle Kurma ve Boşluk Doldurma', icon: Puzzle },
  { id: 'quiz', label: 'Mini Sınav & Puanlama', icon: ListChecks },
];

export const ThemeWorkspace: React.FC<ThemeWorkspaceProps> = ({
  themeId,
  initialTab = 'words',
  student,
  onBackHome,
  onRecordWordListened,
  onToggleMastered,
  onCompleteLesson,
  onCompleteMemory,
  onCompleteMatching,
  onCompleteRace,
  onCompleteBalloon,
  onCompleteSentence,
  onCompleteFill,
  onFinishQuiz,
}) => {
  const theme = THEMES[themeId];
  const progress = themeId === 2 ? student.theme2 : student.theme3;
  const completionPercent = getThemeCompletionPercent(student, themeId);

  const [activeTab, setActiveTab] = useState<StudyTabId>(initialTab);
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.88);
  const [sfxOn, setSfxOn] = useState<boolean>(isSfxEnabled());
  const [femaleVoices, setFemaleVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');

  useEffect(() => {
    setActiveTab(initialTab);
  }, [themeId, initialTab]);

  useEffect(() => {
    const syncVoices = () => {
      const list = getFemaleEnglishVoices();
      setFemaleVoices(list);
      const best = getBestFemaleVoice();
      if (best) {
        setSelectedVoiceURI(best.voiceURI);
      }
    };
    syncVoices();
    const unsub = preloadVoices(syncVoices);
    return unsub;
  }, []);

  const handleVoiceChange = (uri: string) => {
    setSelectedVoiceURI(uri);
    setPreferredFemaleVoice(uri);
    speakEnglish('Hello! Let us learn English together!', { rate: speechRate });
  };

  const handleSpeakText = (text: string, key: string) => {
    speakEnglish(text, {
      rate: speechRate,
      onStart: () => setSpeakingKey(key),
      onEnd: () => setSpeakingKey((curr) => (curr === key ? null : curr)),
    });
  };

  const handleSpeakWord = (item: VocabItem) => {
    onRecordWordListened(themeId, item.id);
    handleSpeakText(item.word, `word_${item.id}`);
  };

  const toggleSfx = () => {
    const next = !sfxOn;
    setSfxOn(next);
    setSfxEnabled(next);
  };

  const isOrange = themeId === 2;
  const headerGradient = isOrange
    ? 'from-[#B43B0B] via-[#9A3412] to-[#7C2D12]'
    : 'from-[#5B21B6] via-[#4C1D95] to-[#3B0764]';

  const activeTabStyle = isOrange
    ? 'bg-[#9A3412] text-white shadow-xs'
    : 'bg-[#4C1D95] text-white shadow-xs';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Theme Hero Header */}
      <section
        className={`rounded-2xl bg-gradient-to-r ${headerGradient} text-white p-6 sm:p-8 shadow-sm`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4">
            <button
              type="button"
              onClick={onBackHome}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 hover:bg-amber-100 active:scale-[0.99] text-sm font-extrabold shadow-md transition-all cursor-pointer min-h-[44px]"
            >
              <ArrowLeft className="w-5 h-5 shrink-0" />
              <span>Geri Dön · Tema Alt Başlıkları</span>
            </button>

            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-200">
                {theme.code} · {theme.titleTr}
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {theme.titleEn}
              </h1>
              <p className="text-sm text-white/90 max-w-2xl">{theme.subtitleTr}</p>
            </div>
          </div>

          {/* Progress & Audio Controls */}
          <div className="bg-black/20 rounded-xl p-4 space-y-3 min-w-[260px]">
            <div className="flex items-center justify-between text-xs font-bold">
              <span>Tema İlerlemesi</span>
              <span className="tabular-nums text-amber-300">%{completionPercent}</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-300 rounded-full transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-white/90 pt-1">
              <span className="inline-flex items-center gap-1 font-bold tabular-nums">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                {student.stars} Yıldız
              </span>
              <span className="tabular-nums">
                {progress.listenedWordIds.length}/{theme.vocab.length} Kelime Dinlendi
              </span>
            </div>
          </div>
        </div>

        {/* Female Voice Narration Toolbar */}
        <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-bold text-amber-200">
              <Volume2 className="w-4 h-4" />
              Kadın Seslendirme:
            </span>
            {femaleVoices.length > 0 ? (
              <select
                aria-label="Kadın İngilizce sesi seç"
                value={selectedVoiceURI}
                onChange={(e) => handleVoiceChange(e.target.value)}
                className="bg-white/15 text-white border border-white/25 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-300 max-w-[220px]"
              >
                {femaleVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI} className="text-slate-900">
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-white/80 font-medium">
                Varsayılan İngilizce Kadın Sesi Aktif
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white/80 font-medium">Okuma Hızı:</span>
            <button
              type="button"
              onClick={() => setSpeechRate(0.75)}
              className={`px-2.5 py-1 rounded-md font-bold cursor-pointer ${
                speechRate < 0.85
                  ? 'bg-white text-slate-900'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              Yavaş
            </button>
            <button
              type="button"
              onClick={() => setSpeechRate(0.92)}
              className={`px-2.5 py-1 rounded-md font-bold cursor-pointer ${
                speechRate >= 0.85
                  ? 'bg-white text-slate-900'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              Normal
            </button>
            <button
              type="button"
              onClick={toggleSfx}
              title={sfxOn ? 'Oyun seslerini kapat' : 'Oyun seslerini aç'}
              className="ml-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/15 hover:bg-white/25 text-white font-bold cursor-pointer"
            >
              {sfxOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{sfxOn ? 'Efekt Açık' : 'Efekt Kapalı'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7 Study Sub-Section Tabs */}
      <nav aria-label="Çalışma alt başlıkları" className="bg-white border border-slate-200 rounded-2xl p-2 shadow-xs">
        <div className="flex flex-wrap gap-1.5">
          {STUDY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? activeTabStyle
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Active Study Content */}
      <main>
        {activeTab === 'words' && (
          <VocabularySection
            themeId={themeId}
            vocab={theme.vocab}
            listenedIds={progress.listenedWordIds}
            onSpeakWord={handleSpeakWord}
            onSpeakSentence={handleSpeakText}
            speakingKey={speakingKey}
          />
        )}

        {activeTab === 'grammar' && (
          <GrammarSection
            themeId={themeId}
            lessons={theme.grammarLessons}
            completedLessonIds={progress.completedLessonIds}
            onCompleteLesson={(lessonId) => onCompleteLesson(themeId, lessonId)}
            onSpeakText={handleSpeakText}
            speakingKey={speakingKey}
          />
        )}

        {activeTab === 'pictures' && (
          <PictureGallerySection
            themeId={themeId}
            vocab={theme.vocab}
            onSpeakWord={handleSpeakWord}
            speakingKey={speakingKey}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsSection
            themeId={themeId}
            vocab={theme.vocab}
            masteredIds={progress.masteredWordIds}
            onToggleMastered={(wordId) => onToggleMastered(themeId, wordId)}
            onSpeakWord={handleSpeakWord}
            onSpeakSentence={handleSpeakText}
            speakingKey={speakingKey}
          />
        )}

        {activeTab === 'games' && (
          <GamesSection
            themeId={themeId}
            vocab={theme.vocab}
            bestMemoryMoves={progress.memoryBestMoves}
            matchingCompletedCount={progress.matchingCompletedCount}
            raceCompletedCount={progress.raceCompletedCount}
            balloonBestScore={progress.balloonBestScore}
            onCompleteMemory={(moves) => onCompleteMemory(themeId, moves)}
            onCompleteMatching={() => onCompleteMatching(themeId)}
            onCompleteRace={() => onCompleteRace(themeId)}
            onCompleteBalloon={(score, poppedCount) =>
              onCompleteBalloon(themeId, score, poppedCount)
            }
            onSpeakText={handleSpeakText}
          />
        )}

        {activeTab === 'sentences' && (
          <SentenceExerciseSection
            themeId={themeId}
            sentenceBuilds={theme.sentenceBuilds}
            fillBlanks={theme.fillBlanks}
            completedSentenceIds={progress.sentenceBuildCompletedIds}
            completedFillIds={progress.fillBlankCompletedIds}
            onCompleteSentence={(id) => onCompleteSentence(themeId, id)}
            onCompleteFill={(id) => onCompleteFill(themeId, id)}
            onSpeakText={handleSpeakText}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizSection
            themeId={themeId}
            questions={theme.quizQuestions}
            bestScore={progress.quizBestScore}
            onFinishQuiz={(score, correctCount) =>
              onFinishQuiz(themeId, score, correctCount)
            }
            onSpeakText={handleSpeakText}
          />
        )}
      </main>

      {/* Prominent Bottom Back Button (especially helpful on mobile after scrolling) */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onBackHome}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-white font-extrabold text-sm sm:text-base shadow-md hover:opacity-95 transition-all cursor-pointer min-h-[48px] bg-gradient-to-r ${headerGradient}`}
        >
          <ArrowLeft className="w-5 h-5 shrink-0" />
          <span>Geri Dön · Tema Alt Başlıklarına Git</span>
        </button>
      </div>
    </div>
  );
};
