import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ThemeId, VocabItem } from '../../types/curriculum';
import { WordIllustration } from '../WordIllustration';
import { FrogCharacter, FrogMood, PondTreatPlatter } from './FrogCharacter';
import {
  playEatSound,
  playErrorSound,
  playHopSound,
  playRewardSound,
  playWaterDropSound,
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

interface FrogHopGameProps {
  themeId: ThemeId;
  vocab: VocabItem[];
  bestScore: number | null;
  accentBtn: string;
  onComplete: (score: number, hopsCount: number) => void;
  onSpeakText: (text: string, key: string, overrideRate?: number) => void;
}

type GamePhase = 'TITLE_MENU' | 'PLAYING' | 'GAME_OVER';

interface FrogRound {
  target: VocabItem;
  options: VocabItem[];
}

const TOTAL_STEPS = 7;
const MAX_LIVES = 2;

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildFrogRounds(vocab: VocabItem[]): FrogRound[] {
  const uniqueByKey = vocab.filter(
    (item, idx, list) =>
      list.findIndex((other) => other.illustrationKey === item.illustrationKey) === idx
  );
  const pool = uniqueByKey.length >= 3 ? uniqueByKey : vocab;
  const targets = shuffleArray(pool).slice(0, Math.min(TOTAL_STEPS, pool.length));

  return targets.map((target) => {
    const distractors = shuffleArray(
      pool.filter(
        (v) =>
          v.id !== target.id &&
          v.word.toLowerCase() !== target.word.toLowerCase()
      )
    ).slice(0, 2);

    return {
      target,
      options: shuffleArray([target, ...distractors]),
    };
  });
}

export const FrogHopGame: React.FC<FrogHopGameProps> = ({
  themeId,
  vocab,
  bestScore,
  accentBtn,
  onComplete,
  onSpeakText,
}) => {
  const [phase, setPhase] = useState<GamePhase>('TITLE_MENU');
  const [rounds, setRounds] = useState<FrogRound[]>([]);
  const [frogStep, setFrogStep] = useState(0); // 0 = left shore, 1..TOTAL_STEPS = lily pads / right shore
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showTurkishHint, setShowTurkishHint] = useState(false);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [roundSolved, setRoundSolved] = useState(false);
  const [frogMood, setFrogMood] = useState<FrogMood>('idle');
  const [foodEaten, setFoodEaten] = useState(false);

  const advanceTimerRef = useRef<number | null>(null);
  const moodTimerRef = useRef<number | null>(null);
  const scoreRef = useRef(0);
  const stepRef = useRef(0);
  scoreRef.current = score;
  stepRef.current = frogStep;

  const clearTimers = useCallback(() => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    if (moodTimerRef.current !== null) {
      window.clearTimeout(moodTimerRef.current);
      moodTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearTimers();
    setPhase('TITLE_MENU');
  }, [themeId, clearTimers]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const speakWord = useCallback(
    (word: string, tag: string, rate?: number) => {
      onSpeakText(word, `frog_hop_${tag}_${Date.now()}`, rate);
    },
    [onSpeakText]
  );

  const startGame = () => {
    clearTimers();
    const generated = buildFrogRounds(vocab);
    setRounds(generated);
    setFrogStep(0);
    setLives(MAX_LIVES);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setShowTurkishHint(false);
    setWrongIds([]);
    setRoundSolved(false);
    setFrogMood('idle');
    setFoodEaten(false);
    setPhase('PLAYING');

    if (generated[0]) {
      speakWord(generated[0].target.word, `start_${generated[0].target.id}`);
    }
  };

  const totalSteps = rounds.length || TOTAL_STEPS;
  const currentRound = rounds[frogStep];

  const finishGame = useCallback(
    (finalScore: number, completedHops: number, reachedShore: boolean) => {
      clearTimers();
      setPhase('GAME_OVER');
      if (reachedShore) {
        setFrogMood('eating');
        setFoodEaten(true);
        playEatSound();
        window.setTimeout(() => playRewardSound(), 320);
      } else {
        setFrogMood('sunk');
        playWaterDropSound();
      }
      onComplete(finalScore, completedHops);
    },
    [clearTimers, onComplete]
  );

  const handleLeafSelect = useCallback(
    (item: VocabItem) => {
      if (phase !== 'PLAYING' || !currentRound || roundSolved) return;
      if (wrongIds.includes(item.id)) return;

      if (item.id === currentRound.target.id) {
        playHopSound();
        if (moodTimerRef.current !== null) {
          window.clearTimeout(moodTimerRef.current);
          moodTimerRef.current = null;
        }

        const nextStreak = streak + 1;
        const bonus = showTurkishHint ? 0 : Math.min(4, streak) * 5;
        const pointsEarned = 15 + bonus;
        const nextScore = score + pointsEarned;
        const nextStep = frogStep + 1;

        setScore(nextScore);
        setStreak(nextStreak);
        setBestStreak((prev) => Math.max(prev, nextStreak));
        setRoundSolved(true);
        setFrogMood('jumping');
        setFrogStep(nextStep);

        const reachedFood = nextStep >= totalSteps;
        if (reachedFood) {
          setFoodEaten(true);
          advanceTimerRef.current = window.setTimeout(() => {
            finishGame(nextScore, nextStep, true);
          }, 950);
        } else {
          advanceTimerRef.current = window.setTimeout(() => {
            setWrongIds([]);
            setRoundSolved(false);
            setShowTurkishHint(false);
            setFrogMood('idle');
            if (rounds[nextStep]) {
              speakWord(rounds[nextStep].target.word, `step_${nextStep}`);
            }
          }, 950);
        }
      } else {
        const nextLives = lives - 1;
        setLives(nextLives);
        setStreak(0);
        setWrongIds((prev) => [...prev, item.id]);
        speakWord(item.word, `wrong_${item.id}`);

        if (nextLives <= 0) {
          setFrogMood('sunk');
          playWaterDropSound();
          advanceTimerRef.current = window.setTimeout(() => {
            finishGame(scoreRef.current, stepRef.current, false);
          }, 950);
        } else {
          playErrorSound();
          setFrogMood('splash');
          if (moodTimerRef.current !== null) {
            window.clearTimeout(moodTimerRef.current);
          }
          moodTimerRef.current = window.setTimeout(() => {
            setFrogMood('idle');
          }, 750);
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
      frogStep,
      totalSteps,
      rounds,
      lives,
      finishGame,
      speakWord,
    ]
  );

  useEffect(() => {
    if (phase !== 'PLAYING' || !currentRound) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const idx = ['1', '2', '3'].indexOf(e.key);
      if (idx >= 0 && currentRound.options[idx]) {
        e.preventDefault();
        handleLeafSelect(currentRound.options[idx]);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase, currentRound, handleLeafSelect]);

  // Compute frog position percentage across pond (0% = left shore, 100% = right shore treat)
  const frogLeftPercent = Math.min(92, Math.max(6, 6 + (frogStep / totalSteps) * 84));
  const earnedStars = frogStep > 0 ? Math.max(5, frogStep * 2) : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Top HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-700 tabular-nums">
          <span>
            Adım: {phase === 'TITLE_MENU' ? 0 : frogStep} / {totalSteps}
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
            <span className="ml-0.5">Hak: {lives}/{MAX_LIVES}</span>
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
        <div className="bg-gradient-to-b from-cyan-50 via-emerald-50 to-teal-50 border border-teal-200 rounded-2xl p-6 sm:p-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-6">
            <FrogCharacter mood="idle" className="w-20 h-20" />
            <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
              <span>🍃</span>
              <span>🍃</span>
              <span>🍃</span>
              <span>➔</span>
            </div>
            <PondTreatPlatter eaten={false} className="w-20 h-20" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Kurbağa Zıplatma · Göl Geçişi
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Gölün en başındaki kurbağa karşı kıyıdaki lezzetli ziyafet tabağına ulaşmak istiyor!
              Resme bakıp sesi dinle, doğru İngilizce kelimenin yazdığı nilüfer yaprağına bas ki
              kurbağa zıplayarak karşıya geçsin ve yiyeceğini afiyetle yesin. Dikkat:{' '}
              <strong>2 yanlış yaparsan kurbağa göle düşüp boğulur!</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={startGame}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base cursor-pointer shadow-sm hover:opacity-95 min-h-[48px] ${accentBtn}`}
          >
            <Play className="w-5 h-5" />
            <span>Göl Geçişini Başlat ({TOTAL_STEPS} Zıplama)</span>
          </button>
        </div>
      )}

      {/* ACTIVE PLAY */}
      {phase === 'PLAYING' && (
        <div className="space-y-5">
          {/* Prompt Banner */}
          {currentRound && (
            <div
              className={`rounded-2xl p-4 sm:p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 ${accentBtn}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${currentRound.target.bgTone} border-2 border-white/80 flex items-center justify-center shrink-0 shadow-sm`}
                >
                  <WordIllustration
                    illustrationKey={currentRound.target.illustrationKey}
                    className="w-14 h-14 sm:w-16 sm:h-16"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                    {frogStep + 1}. Zıplama · Doğru Nilüfer Yaprağını Seç
                  </p>
                  <p className="text-base sm:text-lg font-extrabold">
                    {roundSolved
                      ? frogStep >= totalSteps
                        ? `Harika! Kurbağa karşı kıyıya ulaştı ve yemeğini yiyor! 😋`
                        : `Vırak! Doğru yaprak: "${currentRound.target.word}" (${currentRound.target.turkish})`
                      : showTurkishHint
                      ? `İpucu (Türkçesi): "${currentRound.target.turkish}"`
                      : 'Resme bak ve okunan İngilizce kelimenin yaprağına zıpla!'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => speakWord(currentRound.target.word, `prompt_${frogStep}`)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-extrabold hover:bg-amber-100 transition-colors cursor-pointer min-h-[44px]"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Sesi Dinle</span>
                </button>
                <button
                  type="button"
                  onClick={() => speakWord(currentRound.target.word, `slow_${frogStep}`, 0.68)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer min-h-[44px]"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Yavaş</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowTurkishHint((v) => !v)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer min-h-[44px]"
                >
                  <Eye className="w-4 h-4" />
                  <span>{showTurkishHint ? 'Gizle' : 'Türkçe İpucu'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Scenic Pond Crossing Track */}
          <div className="relative rounded-2xl border-2 border-cyan-300 bg-gradient-to-b from-sky-100 via-cyan-200 to-teal-300 overflow-hidden p-4 sm:p-5">
            {/* Left Shore (Start) & Right Shore (Food Goal) */}
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-extrabold text-teal-950 mb-3">
              <span className="bg-emerald-100/90 border border-emerald-300 px-2.5 py-1 rounded-lg">
                Başlangıç Kıyısı
              </span>
              <span className="bg-amber-100/90 border border-amber-300 px-2.5 py-1 rounded-lg">
                Karşı Kıyı · Ziyafet!
              </span>
            </div>

            <div className="relative h-28 sm:h-32 flex items-end">
              {/* Left mossy bank */}
              <div className="absolute left-0 bottom-0 top-6 w-14 sm:w-20 rounded-r-full bg-emerald-500/85 border-t-4 border-emerald-600" />

              {/* Right mossy bank */}
              <div className="absolute right-0 bottom-0 top-6 w-16 sm:w-24 rounded-l-full bg-emerald-500/85 border-t-4 border-emerald-600" />

              {/* Stepping lily pads along the pond */}
              <div className="relative z-10 w-full flex items-end justify-between px-12 sm:px-18 pb-2">
                {Array.from({ length: totalSteps - 1 }).map((_, idx) => {
                  const padStep = idx + 1;
                  const crossed = frogStep >= padStep;
                  return (
                    <div
                      key={padStep}
                      className={`w-8 h-5 sm:w-11 sm:h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-[10px] font-extrabold tabular-nums ${
                        crossed
                          ? 'bg-lime-400 border-emerald-700 text-emerald-950 shadow-xs'
                          : 'bg-emerald-300/85 border-emerald-600/70 text-emerald-900'
                      }`}
                    >
                      {padStep}
                    </div>
                  );
                })}
              </div>

              {/* Food Platter waiting on the Right Shore */}
              <div className="absolute right-2 sm:right-3 bottom-3 z-10">
                <PondTreatPlatter
                  eaten={foodEaten}
                  className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-xs"
                />
              </div>

              {/* Jumping / Sinking Frog */}
              <div
                className={`absolute bottom-4 -translate-x-1/2 z-20 transition-all duration-500 ease-out pointer-events-none ${
                  frogMood === 'jumping'
                    ? '-translate-y-7 scale-110'
                    : frogMood === 'sunk'
                    ? 'translate-y-4 scale-90 opacity-85'
                    : 'translate-y-0'
                }`}
                style={{ left: `${frogLeftPercent}%` }}
              >
                <FrogCharacter
                  mood={frogMood}
                  className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* 3 Clickable Lily Pad Choices */}
          {currentRound && (
            <div className="space-y-2.5">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 text-center">
                Kurbağayı Zıplatmak İçin Doğru Yaprağa Bas (1-3)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto">
                {currentRound.options.map((item, idx) => {
                  const isTarget = item.id === currentRound.target.id;
                  const isCorrectRevealed = roundSolved && isTarget;
                  const isWrong = wrongIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`rounded-3xl border-2 p-2.5 flex items-center gap-2 transition-all duration-150 ${
                        isCorrectRevealed
                          ? 'bg-emerald-100 border-emerald-600 ring-2 ring-emerald-400 scale-[1.02]'
                          : isWrong
                          ? 'bg-rose-50 border-rose-400 opacity-85'
                          : 'bg-gradient-to-b from-lime-50 to-emerald-100/80 border-emerald-400 hover:border-emerald-600 hover:-translate-y-0.5 hover:shadow-md'
                      }`}
                    >
                      <button
                        type="button"
                        disabled={roundSolved || isWrong || lives <= 0}
                        onClick={() => handleLeafSelect(item)}
                        className="flex-1 flex items-center gap-3 text-left px-2 py-2 cursor-pointer disabled:cursor-default min-h-[60px]"
                      >
                        <span className="w-9 h-9 rounded-full bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0 tabular-nums shadow-xs">
                          {idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-base sm:text-lg font-extrabold text-emerald-950 truncate">
                            {item.word}
                          </p>
                          {isCorrectRevealed ? (
                            <p className="text-xs font-bold text-emerald-800">
                              Zıpladı! ({item.turkish})
                            </p>
                          ) : isWrong ? (
                            <p className="text-xs font-bold text-rose-700">
                              Suya düştü! ({item.turkish})
                            </p>
                          ) : (
                            <p className="text-xs font-semibold text-emerald-800/80">
                              Bu yaprağa zıpla
                            </p>
                          )}
                        </div>
                        {isCorrectRevealed && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                        )}
                        {isWrong && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => speakWord(item.word, `leaf_${item.id}`)}
                        aria-label={`${item.word} kelimesini dinle`}
                        title="Yapraktaki kelimeyi dinle"
                        className="w-11 h-11 rounded-2xl bg-white/90 hover:bg-white border border-emerald-300 text-emerald-900 flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME OVER */}
      {phase === 'GAME_OVER' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-5">
          <div className="flex items-center justify-center gap-4">
            <FrogCharacter
              mood={lives > 0 ? 'eating' : 'sunk'}
              className="w-20 h-20"
            />
            <PondTreatPlatter eaten={lives > 0} className="w-20 h-20" />
          </div>

          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-2xl font-extrabold text-emerald-950">
              {lives > 0
                ? 'Yaşasın! Kurbağa Karşıya Geçip Yemeğini Afiyetle Yedi! 😋'
                : 'Eyvah! 2 Yanlış Oldu, Kurbağa Göle Düşüp Boğuldu! 🫧'}
            </h3>
            <p className="text-sm sm:text-base font-bold text-emerald-900 tabular-nums">
              Geçilen Yaprak: {frogStep} / {totalSteps} · En Uzun Seri: {bestStreak}x · Toplam{' '}
              {score} Puan (+{earnedStars} ★)
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
