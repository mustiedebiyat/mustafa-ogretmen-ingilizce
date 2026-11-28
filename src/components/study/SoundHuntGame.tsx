import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ThemeId, VocabItem } from '../../types/curriculum';
import { WordIllustration } from '../WordIllustration';
import {
  playErrorSound,
  playRewardSound,
  playSuccessSound,
} from '../../utils/soundFx';
import {
  CheckCircle2,
  Eye,
  Flame,
  Heart,
  Play,
  RotateCcw,
  Trophy,
  Volume2,
  XCircle,
} from 'lucide-react';

interface SoundHuntGameProps {
  themeId: ThemeId;
  vocab: VocabItem[];
  bestScore: number | null;
  accentBtn: string;
  onComplete: (score: number, correctCount: number) => void;
  onSpeakText: (text: string, key: string, overrideRate?: number) => void;
}

type GamePhase = 'TITLE_MENU' | 'PLAYING' | 'GAME_OVER';

interface HuntRound {
  target: VocabItem;
  options: VocabItem[];
}

const TOTAL_ROUNDS = 10;
const MAX_LIVES = 3;

function shuffleItems<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRounds(vocab: VocabItem[]): HuntRound[] {
  const uniqueByKey = vocab.filter(
    (item, idx, list) =>
      list.findIndex((other) => other.illustrationKey === item.illustrationKey) === idx
  );
  const pool = uniqueByKey.length >= 4 ? uniqueByKey : vocab;
  const targets = shuffleItems(pool).slice(0, Math.min(TOTAL_ROUNDS, pool.length));

  return targets.map((target) => {
    const distractors = shuffleItems(
      pool.filter((v) => v.id !== target.id && v.word.toLowerCase() !== target.word.toLowerCase())
    ).slice(0, 3);
    return {
      target,
      options: shuffleItems([target, ...distractors]),
    };
  });
}

export const SoundHuntGame: React.FC<SoundHuntGameProps> = ({
  themeId,
  vocab,
  bestScore,
  accentBtn,
  onComplete,
  onSpeakText,
}) => {
  const [phase, setPhase] = useState<GamePhase>('TITLE_MENU');
  const [rounds, setRounds] = useState<HuntRound[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showTurkishHint, setShowTurkishHint] = useState(false);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [roundSolved, setRoundSolved] = useState(false);

  const advanceTimerRef = useRef<number | null>(null);
  const scoreRef = useRef(0);
  const correctRef = useRef(0);
  scoreRef.current = score;
  correctRef.current = correctCount;

  const clearPendingTimer = useCallback(() => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearPendingTimer();
    setPhase('TITLE_MENU');
  }, [themeId, clearPendingTimer]);

  useEffect(() => {
    return () => clearPendingTimer();
  }, [clearPendingTimer]);

  const speakRoundWord = useCallback(
    (item: VocabItem, rate?: number) => {
      onSpeakText(item.word, `sound_hunt_${item.id}_${Date.now()}`, rate);
    },
    [onSpeakText]
  );

  const startGame = () => {
    clearPendingTimer();
    const generated = buildRounds(vocab);
    setRounds(generated);
    setRoundIndex(0);
    setLives(MAX_LIVES);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCorrectCount(0);
    setShowTurkishHint(false);
    setWrongIds([]);
    setRoundSolved(false);
    setPhase('PLAYING');

    if (generated[0]) {
      speakRoundWord(generated[0].target);
    }
  };

  const currentRound = rounds[roundIndex];
  const totalRounds = rounds.length || TOTAL_ROUNDS;

  const finishGame = useCallback(
    (finalScore: number, finalCorrect: number) => {
      clearPendingTimer();
      setPhase('GAME_OVER');
      playRewardSound();
      onComplete(finalScore, finalCorrect);
    },
    [clearPendingTimer, onComplete]
  );

  const handleOptionSelect = useCallback(
    (item: VocabItem) => {
      if (phase !== 'PLAYING' || !currentRound || roundSolved) return;
      if (wrongIds.includes(item.id)) return;

      if (item.id === currentRound.target.id) {
        playSuccessSound();
        const nextStreak = streak + 1;
        const bonus = showTurkishHint ? 0 : Math.min(4, streak) * 5;
        const pointsEarned = 10 + bonus;
        const nextScore = score + pointsEarned;
        const nextCorrect = correctCount + 1;

        setScore(nextScore);
        setStreak(nextStreak);
        setBestStreak((prev) => Math.max(prev, nextStreak));
        setCorrectCount(nextCorrect);
        setRoundSolved(true);

        advanceTimerRef.current = window.setTimeout(() => {
          const nextIdx = roundIndex + 1;
          if (nextIdx >= rounds.length) {
            finishGame(nextScore, nextCorrect);
          } else {
            setRoundIndex(nextIdx);
            setWrongIds([]);
            setRoundSolved(false);
            setShowTurkishHint(false);
            speakRoundWord(rounds[nextIdx].target);
          }
        }, 1150);
      } else {
        playErrorSound();
        const nextLives = lives - 1;
        setLives(nextLives);
        setStreak(0);
        setWrongIds((prev) => [...prev, item.id]);
        speakRoundWord(item.word ? item : currentRound.target);

        if (nextLives <= 0) {
          advanceTimerRef.current = window.setTimeout(() => {
            finishGame(scoreRef.current, correctRef.current);
          }, 900);
        }
      }
    },
    [
      phase,
      currentRound,
      roundSolved,
      wrongIds,
      streak,
      showTurkishHint,
      score,
      correctCount,
      roundIndex,
      rounds,
      lives,
      finishGame,
      speakRoundWord,
    ]
  );

  useEffect(() => {
    if (phase !== 'PLAYING' || !currentRound) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const idx = ['1', '2', '3', '4'].indexOf(e.key);
      if (idx >= 0 && currentRound.options[idx]) {
        e.preventDefault();
        handleOptionSelect(currentRound.options[idx]);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase, currentRound, handleOptionSelect]);

  const earnedStars = correctCount > 0 ? Math.max(5, correctCount * 2) : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Unobtrusive Top HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-700 tabular-nums">
          <span>
            Tur: {phase === 'PLAYING' ? roundIndex + 1 : phase === 'GAME_OVER' ? totalRounds : 0} /{' '}
            {totalRounds}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 text-rose-700">
            {Array.from({ length: MAX_LIVES }).map((_, idx) => (
              <Heart
                key={idx}
                className={`w-4 h-4 ${
                  idx < lives ? 'fill-rose-500 text-rose-600' : 'text-slate-300'
                }`}
              />
            ))}
            <span className="ml-0.5">Can: {lives}/{MAX_LIVES}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 text-amber-700">
            <Flame className="w-4 h-4" />
            Seri: {streak}x
          </span>
          <span aria-hidden="true">·</span>
          <span>Puan: {score}</span>
          {bestScore !== null && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700">Rekor: {bestScore} puan</span>
            </>
          )}
        </div>

        {phase === 'PLAYING' && (
          <button
            type="button"
            onClick={startGame}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer min-h-[40px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Yeniden Başlat</span>
          </button>
        )}
      </div>

      {/* TITLE MENU */}
      {phase === 'TITLE_MENU' && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 text-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
            <Volume2 className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Sesli Resim Avı · Dinle ve Resmi Bul
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Kadın seslendirmenin okuduğu İngilizce kelimeyi dikkatle dinle ve 4 resim arasından
              doğru görseli seç. Üst üste doğru bildikçe kombo puanı kazanırsın!
            </p>
          </div>
          <button
            type="button"
            onClick={startGame}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base cursor-pointer shadow-sm hover:opacity-95 min-h-[48px] ${accentBtn}`}
          >
            <Play className="w-5 h-5" />
            <span>10 Turluk Sesli Oyunu Başlat</span>
          </button>
        </div>
      )}

      {/* ACTIVE PLAY */}
      {phase === 'PLAYING' && currentRound && (
        <div className="space-y-5">
          {/* Audio Prompt Bar */}
          <div
            className={`rounded-2xl p-4 sm:p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 ${accentBtn}`}
          >
            <div className="space-y-1">
              <p className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                Sesi Dinle ve Doğru Resmi Seç
              </p>
              <p className="text-base sm:text-lg font-extrabold">
                {roundSolved
                  ? `Harika! Doğru kelime: "${currentRound.target.word}" (${currentRound.target.turkish})`
                  : showTurkishHint
                  ? `İpucu (Türkçesi): "${currentRound.target.turkish}"`
                  : 'Hangi resim okunan İngilizce kelimeye ait?'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => speakRoundWord(currentRound.target)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-extrabold hover:bg-amber-100 transition-colors cursor-pointer min-h-[44px]"
              >
                <Volume2 className="w-4 h-4" />
                <span>Tekrar Dinle</span>
              </button>
              <button
                type="button"
                onClick={() => speakRoundWord(currentRound.target, 0.68)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer min-h-[44px]"
              >
                <Volume2 className="w-4 h-4" />
                <span>Yavaş Dinle</span>
              </button>
              <button
                type="button"
                onClick={() => setShowTurkishHint((v) => !v)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer min-h-[44px]"
              >
                <Eye className="w-4 h-4" />
                <span>{showTurkishHint ? 'İpucunu Gizle' : 'Türkçe İpucu'}</span>
              </button>
            </div>
          </div>

          {/* 4 Visual Picture Choices */}
          <div className="grid grid-cols-2 gap-3.5 sm:gap-4 max-w-3xl mx-auto">
            {currentRound.options.map((item, idx) => {
              const isTarget = item.id === currentRound.target.id;
              const isCorrectRevealed = roundSolved && isTarget;
              const isWrong = wrongIds.includes(item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={roundSolved || isWrong || lives <= 0}
                  onClick={() => handleOptionSelect(item)}
                  className={`relative rounded-2xl border-2 p-4 sm:p-5 min-h-[164px] sm:min-h-[188px] flex flex-col items-center justify-center gap-2.5 transition-all duration-150 cursor-pointer disabled:cursor-default ${
                    isCorrectRevealed
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400 scale-[1.01]'
                      : isWrong
                      ? 'bg-rose-50 border-rose-400 opacity-85'
                      : 'bg-white border-slate-200 hover:border-slate-400 hover:-translate-y-0.5 hover:shadow-sm'
                  }`}
                >
                  <span className="absolute top-2.5 left-3 text-xs font-extrabold text-slate-400 tabular-nums">
                    {idx + 1}
                  </span>

                  {isCorrectRevealed && (
                    <CheckCircle2 className="absolute top-2.5 right-3 w-5 h-5 text-emerald-600" />
                  )}
                  {isWrong && (
                    <XCircle className="absolute top-2.5 right-3 w-5 h-5 text-rose-600" />
                  )}

                  <div
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl ${item.bgTone} border border-slate-200/80 flex items-center justify-center`}
                  >
                    <WordIllustration
                      illustrationKey={item.illustrationKey}
                      className="w-20 h-20 sm:w-24 sm:h-24"
                    />
                  </div>

                  {(isCorrectRevealed || isWrong) ? (
                    <div className="text-center space-y-0.5">
                      <p className="text-sm sm:text-base font-extrabold text-slate-900">
                        {item.word}
                      </p>
                      <p className="text-xs font-semibold text-slate-600">{item.turkish}</p>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-slate-500">Bu resmi seç</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* GAME OVER / SUMMARY */}
      {phase === 'GAME_OVER' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-2xl font-extrabold text-emerald-950">
              {lives > 0 ? 'Tebrikler! Sesli Resim Avını Tamamladın!' : 'Güzel Deneme! Canların Bitti'}
            </h3>
            <p className="text-sm sm:text-base font-bold text-emerald-900 tabular-nums">
              Doğru: {correctCount} / {totalRounds} · En Uzun Seri: {bestStreak}x · Toplam {score}{' '}
              Puan (+{earnedStars} ★)
            </p>
          </div>
          <button
            type="button"
            onClick={startGame}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer min-h-[44px] ${accentBtn}`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tekrar Oyna</span>
          </button>
        </div>
      )}
    </div>
  );
};
