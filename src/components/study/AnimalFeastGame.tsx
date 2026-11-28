import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ThemeId, VocabItem } from '../../types/curriculum';
import { WordIllustration } from '../WordIllustration';
import {
  ANIMAL_META,
  AnimalCharacter,
  AnimalMood,
  AnimalType,
} from './AnimalCharacters';
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
  Star,
  Trophy,
  Utensils,
  Volume2,
  XCircle,
} from 'lucide-react';

interface AnimalFeastGameProps {
  themeId: ThemeId;
  vocab: VocabItem[];
  bestScore: number | null;
  accentBtn: string;
  onComplete: (score: number, fedCount: number) => void;
  onSpeakText: (text: string, key: string, overrideRate?: number) => void;
}

type GamePhase = 'TITLE_MENU' | 'PLAYING' | 'GAME_OVER';

interface FeastRound {
  target: VocabItem;
  options: VocabItem[];
  trio: [AnimalType, AnimalType, AnimalType];
  activeSlot: number;
}

const ALL_ANIMALS: AnimalType[] = ['panda', 'fox', 'lion', 'monkey', 'bunny'];
const TREAT_EMOJIS = ['🍎', '🥐', '🍯', '🍓', '🧀', '🍌', '🥕', '🍪'];
const TOTAL_ROUNDS = 10;
const MAX_LIVES = 3;
const INITIAL_HEIGHT_CM = 100;
const GROW_STEP_CM = 25;
const SHRINK_STEP_CM = 20;
const MIN_HEIGHT_CM = 60;
const MAX_HEIGHT_CM = 200;

function createInitialHeights(): Record<AnimalType, number> {
  return {
    panda: INITIAL_HEIGHT_CM,
    fox: INITIAL_HEIGHT_CM,
    lion: INITIAL_HEIGHT_CM,
    monkey: INITIAL_HEIGHT_CM,
    bunny: INITIAL_HEIGHT_CM,
  };
}

function createInitialCounts(): Record<AnimalType, number> {
  return {
    panda: 0,
    fox: 0,
    lion: 0,
    monkey: 0,
    bunny: 0,
  };
}

function heightToScale(heightCm: number): number {
  const clamped = Math.max(MIN_HEIGHT_CM, Math.min(MAX_HEIGHT_CM, heightCm));
  return Number((0.68 + ((clamped - MIN_HEIGHT_CM) / (MAX_HEIGHT_CM - MIN_HEIGHT_CM)) * 0.68).toFixed(2));
}

function heightToPodiumPx(heightCm: number): number {
  const clamped = Math.max(MIN_HEIGHT_CM, Math.min(MAX_HEIGHT_CM, heightCm));
  return Math.round(52 + ((clamped - MIN_HEIGHT_CM) / (MAX_HEIGHT_CM - MIN_HEIGHT_CM)) * 78);
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildFeastRounds(vocab: VocabItem[]): FeastRound[] {
  const uniqueByKey = vocab.filter(
    (item, idx, list) =>
      list.findIndex((other) => other.illustrationKey === item.illustrationKey) === idx
  );
  const pool = uniqueByKey.length >= 4 ? uniqueByKey : vocab;
  const targets = shuffleArray(pool).slice(0, Math.min(TOTAL_ROUNDS, pool.length));
  const roundAnimalOrder = shuffleArray(ALL_ANIMALS);

  return targets.map((target, index) => {
    const distractors = shuffleArray(
      pool.filter(
        (v) =>
          v.id !== target.id &&
          v.word.toLowerCase() !== target.word.toLowerCase()
      )
    ).slice(0, 3);

    const activeAnimal = roundAnimalOrder[index % roundAnimalOrder.length];
    const companions = shuffleArray(ALL_ANIMALS.filter((a) => a !== activeAnimal)).slice(0, 2);
    const activeSlot = index % 3;
    const trio: [AnimalType, AnimalType, AnimalType] = ['panda', 'fox', 'lion'];

    let cIdx = 0;
    for (let s = 0; s < 3; s++) {
      if (s === activeSlot) {
        trio[s] = activeAnimal;
      } else {
        trio[s] = companions[cIdx++];
      }
    }

    return {
      target,
      options: shuffleArray([target, ...distractors]),
      trio,
      activeSlot,
    };
  });
}

export const AnimalFeastGame: React.FC<AnimalFeastGameProps> = ({
  themeId,
  vocab,
  bestScore,
  accentBtn,
  onComplete,
  onSpeakText,
}) => {
  const [phase, setPhase] = useState<GamePhase>('TITLE_MENU');
  const [rounds, setRounds] = useState<FeastRound[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [fedCount, setFedCount] = useState(0);
  const [showTurkishHint, setShowTurkishHint] = useState(false);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [roundSolved, setRoundSolved] = useState(false);
  const [activeMood, setActiveMood] = useState<AnimalMood>('hungry');
  const [lastPoints, setLastPoints] = useState<number>(0);
  const [animalHeights, setAnimalHeights] = useState<Record<AnimalType, number>>(
    createInitialHeights
  );
  const [animalFedCounts, setAnimalFedCounts] = useState<Record<AnimalType, number>>(
    createInitialCounts
  );
  const [sizeDeltaBadge, setSizeDeltaBadge] = useState<{
    text: string;
    positive: boolean;
  } | null>(null);

  const advanceTimerRef = useRef<number | null>(null);
  const moodTimerRef = useRef<number | null>(null);
  const scoreRef = useRef(0);
  const fedRef = useRef(0);
  scoreRef.current = score;
  fedRef.current = fedCount;

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
      onSpeakText(word, `animal_feast_${tag}_${Date.now()}`, rate);
    },
    [onSpeakText]
  );

  const startGame = () => {
    clearTimers();
    const generated = buildFeastRounds(vocab);
    setRounds(generated);
    setRoundIndex(0);
    setLives(MAX_LIVES);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setFedCount(0);
    setShowTurkishHint(false);
    setWrongIds([]);
    setRoundSolved(false);
    setActiveMood('hungry');
    setLastPoints(0);
    setAnimalHeights(createInitialHeights());
    setAnimalFedCounts(createInitialCounts());
    setSizeDeltaBadge(null);
    setPhase('PLAYING');

    if (generated[0]) {
      speakWord(generated[0].target.word, `start_${generated[0].target.id}`);
    }
  };

  const currentRound = rounds[roundIndex];
  const totalRounds = rounds.length || TOTAL_ROUNDS;

  const finishGame = useCallback(
    (finalScore: number, finalFed: number) => {
      clearTimers();
      setPhase('GAME_OVER');
      playRewardSound();
      onComplete(finalScore, finalFed);
    },
    [clearTimers, onComplete]
  );

  const handleFeedChoice = useCallback(
    (item: VocabItem) => {
      if (phase !== 'PLAYING' || !currentRound || roundSolved) return;
      if (wrongIds.includes(item.id)) return;

      const currentAnimal = currentRound.trio[currentRound.activeSlot];

      if (item.id === currentRound.target.id) {
        playSuccessSound();
        if (moodTimerRef.current !== null) {
          window.clearTimeout(moodTimerRef.current);
          moodTimerRef.current = null;
        }
        const nextStreak = streak + 1;
        const bonus = showTurkishHint ? 0 : Math.min(4, streak) * 5;
        const pointsEarned = 10 + bonus;
        const nextScore = score + pointsEarned;
        const nextFed = fedCount + 1;

        setLastPoints(pointsEarned);
        setScore(nextScore);
        setStreak(nextStreak);
        setBestStreak((prev) => Math.max(prev, nextStreak));
        setFedCount(nextFed);
        setActiveMood('happy');
        setRoundSolved(true);
        setAnimalHeights((prev) => ({
          ...prev,
          [currentAnimal]: Math.min(MAX_HEIGHT_CM, prev[currentAnimal] + GROW_STEP_CM),
        }));
        setAnimalFedCounts((prev) => ({
          ...prev,
          [currentAnimal]: prev[currentAnimal] + 1,
        }));
        setSizeDeltaBadge({ text: `+${GROW_STEP_CM} cm Büyüdü!`, positive: true });

        advanceTimerRef.current = window.setTimeout(() => {
          const nextIdx = roundIndex + 1;
          if (nextIdx >= rounds.length) {
            finishGame(nextScore, nextFed);
          } else {
            setRoundIndex(nextIdx);
            setWrongIds([]);
            setRoundSolved(false);
            setShowTurkishHint(false);
            setActiveMood('hungry');
            setLastPoints(0);
            setSizeDeltaBadge(null);
            speakWord(rounds[nextIdx].target.word, `round_${nextIdx}`);
          }
        }, 1150);
      } else {
        playErrorSound();
        const nextLives = lives - 1;
        setLives(nextLives);
        setStreak(0);
        setWrongIds((prev) => [...prev, item.id]);
        setActiveMood('oops');
        setAnimalHeights((prev) => ({
          ...prev,
          [currentAnimal]: Math.max(MIN_HEIGHT_CM, prev[currentAnimal] - SHRINK_STEP_CM),
        }));
        setSizeDeltaBadge({ text: `-${SHRINK_STEP_CM} cm Küçüldü!`, positive: false });
        speakWord(item.word, `wrong_${item.id}`);

        if (nextLives <= 0) {
          advanceTimerRef.current = window.setTimeout(() => {
            finishGame(scoreRef.current, fedRef.current);
          }, 1000);
        } else {
          if (moodTimerRef.current !== null) {
            window.clearTimeout(moodTimerRef.current);
          }
          moodTimerRef.current = window.setTimeout(() => {
            setActiveMood('hungry');
            setSizeDeltaBadge(null);
          }, 850);
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
      fedCount,
      roundIndex,
      rounds,
      lives,
      finishGame,
      speakWord,
    ]
  );

  useEffect(() => {
    if (phase !== 'PLAYING' || !currentRound) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const idx = ['1', '2', '3', '4'].indexOf(e.key);
      if (idx >= 0 && currentRound.options[idx]) {
        e.preventDefault();
        handleFeedChoice(currentRound.options[idx]);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase, currentRound, handleFeedChoice]);

  const activeAnimal = currentRound
    ? currentRound.trio[currentRound.activeSlot]
    : 'panda';
  const activeAnimalInfo = ANIMAL_META[activeAnimal];
  const earnedStars = fedCount > 0 ? Math.max(5, fedCount * 2) : 0;

  const rankedAnimals = [...ALL_ANIMALS]
    .map((animal) => ({
      animal,
      height: animalHeights[animal],
      fed: animalFedCounts[animal],
      meta: ANIMAL_META[animal],
    }))
    .sort((a, b) => {
      if (b.height !== a.height) return b.height - a.height;
      if (b.fed !== a.fed) return b.fed - a.fed;
      return ALL_ANIMALS.indexOf(a.animal) - ALL_ANIMALS.indexOf(b.animal);
    });

  const winner = rankedAnimals[0];

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
        <div className="bg-gradient-to-b from-emerald-50 to-amber-50/60 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            {ALL_ANIMALS.map((animal) => (
              <div
                key={animal}
                className={`p-2 rounded-2xl border border-emerald-200/80 shadow-xs ${ANIMAL_META[animal].accentBg}`}
              >
                <AnimalCharacter animal={animal} mood="hungry" className="w-14 h-14 sm:w-16 sm:h-16" />
              </div>
            ))}
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Acıkmış Hayvanları Besle · Büyüme Yarışı
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Sıradaki hayvan arkadaşının istediği İngilizce kelimeyi dinle ve doğru yemek tepsisiyle
              onu besle! Doğru bildikçe hayvan <strong>büyür</strong>, yanlış yaparsan{' '}
              <strong>küçülür</strong>. 3 yanlışta oyun biter ve finalde tüm hayvanlar{' '}
              <strong>boy sırasına dizilir</strong>; en büyük hayvan yıldızı kazanır!
            </p>
          </div>

          <button
            type="button"
            onClick={startGame}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base cursor-pointer shadow-sm hover:opacity-95 min-h-[48px] ${accentBtn}`}
          >
            <Play className="w-5 h-5" />
            <span>10 Turluk Büyüme Yarışını Başlat</span>
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
                {activeAnimalInfo.title} · Boy: {animalHeights[activeAnimal]} cm
              </p>
              <p className="text-base sm:text-lg font-extrabold">
                {roundSolved
                  ? `Harika! ${activeAnimalInfo.name} doydu ve büyüdü: "${currentRound.target.word}" (+${lastPoints} puan)`
                  : showTurkishHint
                  ? `İpucu (${activeAnimalInfo.name} bunu istiyor): "${currentRound.target.turkish}"`
                  : `${activeAnimalInfo.title}'nun istediği kelimeyi dinle ve doğru tepsiyle besle!`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => speakWord(currentRound.target.word, `prompt_${roundIndex}`)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-extrabold hover:bg-amber-100 transition-colors cursor-pointer min-h-[44px]"
              >
                <Volume2 className="w-4 h-4" />
                <span>Sesi Dinle</span>
              </button>
              <button
                type="button"
                onClick={() => speakWord(currentRound.target.word, `slow_${roundIndex}`, 0.68)}
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

          {/* Forest Picnic Stage with Growing & Shrinking Animals */}
          <div className="relative rounded-2xl border-2 border-emerald-200 bg-gradient-to-b from-sky-50 via-emerald-50 to-lime-100/70 p-4 sm:p-6 overflow-hidden">
            {/* Subtle Height Ruler Lines */}
            <div className="absolute inset-x-4 bottom-20 border-b border-dashed border-emerald-300/60 pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-x-4 bottom-36 border-b border-dashed border-emerald-300/40 pointer-events-none" aria-hidden="true" />

            {/* Decorative Picnic Tablecloth Strip */}
            <div
              className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-r from-amber-200/70 via-orange-200/70 to-amber-200/70 border-t border-amber-300/80 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-3 gap-2.5 sm:gap-5 items-end">
              {currentRound.trio.map((animal, slotIdx) => {
                const isActive = slotIdx === currentRound.activeSlot;
                const meta = ANIMAL_META[animal];
                const mood: AnimalMood = isActive ? activeMood : 'happy';
                const heightCm = animalHeights[animal];
                const scale = heightToScale(heightCm);

                return (
                  <div
                    key={`${animal}_${slotIdx}`}
                    className={`flex flex-col items-center justify-end gap-2 transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-85'
                    }`}
                  >
                    {/* Thought Bubble for the Active Hungry Animal */}
                    {isActive ? (
                      <div
                        className={`relative bg-white rounded-2xl border-2 p-2.5 sm:p-3 shadow-sm flex flex-col items-center gap-1 transition-all ${
                          roundSolved
                            ? 'border-emerald-500 ring-2 ring-emerald-300'
                            : activeMood === 'oops'
                            ? 'border-rose-400'
                            : 'border-amber-400 ring-2 ring-amber-200'
                        }`}
                      >
                        <div className="flex items-center gap-1 text-[11px] font-extrabold text-slate-700">
                          <Utensils className="w-3.5 h-3.5 text-amber-600" />
                          <span>
                            {roundSolved
                              ? 'Büyüdü!'
                              : activeMood === 'oops'
                              ? 'Küçüldü!'
                              : 'Bunu istiyorum!'}
                          </span>
                        </div>
                        <div
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl ${currentRound.target.bgTone} border border-slate-200 flex items-center justify-center`}
                        >
                          <WordIllustration
                            illustrationKey={currentRound.target.illustrationKey}
                            className="w-14 h-14 sm:w-16 sm:h-16"
                          />
                        </div>
                        {showTurkishHint && !roundSolved && (
                          <span className="text-[11px] font-bold text-slate-600 text-center leading-tight">
                            {currentRound.target.turkish}
                          </span>
                        )}
                        {sizeDeltaBadge && (
                          <span
                            className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md tabular-nums ${
                              sizeDeltaBadge.positive
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {sizeDeltaBadge.text}
                          </span>
                        )}
                      </div>
                    ) : null}

                    {/* Animal Character Card with Dynamic Growth/Shrink Scale */}
                    <div
                      className={`w-full max-w-[172px] rounded-2xl border-2 px-2.5 pt-3 pb-2.5 flex flex-col items-center justify-end gap-1 transition-colors duration-200 ${
                        isActive
                          ? `${meta.accentBg} ${
                              roundSolved
                                ? 'border-emerald-500 shadow-md'
                                : activeMood === 'oops'
                                ? 'border-rose-400'
                                : 'border-amber-500 shadow-md'
                            }`
                          : 'bg-white/80 border-emerald-200/80'
                      }`}
                    >
                      <div className="h-24 sm:h-28 w-full flex items-end justify-center overflow-visible">
                        <div
                          className="transition-transform duration-300 ease-out"
                          style={{
                            transform: `scale(${scale})`,
                            transformOrigin: 'bottom center',
                          }}
                        >
                          <AnimalCharacter
                            animal={animal}
                            mood={mood}
                            className="w-16 h-16 sm:w-20 sm:h-20"
                          />
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 text-center leading-tight">
                        {meta.title}
                      </span>
                      <span className="text-[11px] font-bold text-slate-600 tabular-nums">
                        Boy: {heightCm} cm
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Food Treat Choices */}
          <div className="space-y-2.5">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 text-center">
              Doğru Yemek Tepsisini Seçip {activeAnimalInfo.name}&apos;yu Besle (1-4)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {currentRound.options.map((item, idx) => {
                const isTarget = item.id === currentRound.target.id;
                const isCorrectRevealed = roundSolved && isTarget;
                const isWrong = wrongIds.includes(item.id);
                const treatEmoji = TREAT_EMOJIS[(roundIndex + idx) % TREAT_EMOJIS.length];

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border-2 p-3 flex items-center gap-3 transition-all duration-150 ${
                      isCorrectRevealed
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300'
                        : isWrong
                        ? 'bg-rose-50 border-rose-400 opacity-85'
                        : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-sm'
                    }`}
                  >
                    <button
                      type="button"
                      disabled={roundSolved || isWrong || lives <= 0}
                      onClick={() => handleFeedChoice(item)}
                      className="flex-1 flex items-center gap-3 text-left cursor-pointer disabled:cursor-default min-h-[56px]"
                    >
                      <span className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shrink-0 select-none">
                        {treatEmoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-slate-400 tabular-nums">
                            {idx + 1}.
                          </span>
                          <span className="text-base sm:text-lg font-extrabold text-slate-900 truncate">
                            {item.word}
                          </span>
                        </div>
                        {(isCorrectRevealed || isWrong) ? (
                          <p
                            className={`text-xs font-bold ${
                              isCorrectRevealed ? 'text-emerald-800' : 'text-rose-700'
                            }`}
                          >
                            {isCorrectRevealed
                              ? `Doğru! +${GROW_STEP_CM} cm büyüdü (${item.turkish})`
                              : `Yanlış tepsi! (${item.turkish})`}
                          </p>
                        ) : (
                          <p className="text-xs font-semibold text-slate-500">
                            Tıkla ve {activeAnimalInfo.name}&apos;yu besle
                          </p>
                        )}
                      </div>

                      {isCorrectRevealed && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isWrong && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => speakWord(item.word, `opt_${item.id}`)}
                      aria-label={`${item.word} kelimesini dinle`}
                      title="Kelimeyi dinle"
                      className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* GAME OVER: HEIGHT LINEUP & WINNER STAR */}
      {phase === 'GAME_OVER' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 sm:p-7 text-center space-y-6">
          <div className="space-y-1.5">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
              <Trophy className="w-7 h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-950">
              {lives <= 0
                ? '3 Yanlış Oldu · Oyun Bitti! İşte Boy Sıralaması'
                : 'Ziyafet Tamamlandı · İşte Boy Sıralaması!'}
            </h3>
            <p className="text-sm sm:text-base font-extrabold text-amber-800">
              En Büyük Şampiyon: {winner.meta.title} ({winner.height} cm) ⭐
            </p>
            <p className="text-xs sm:text-sm font-bold text-emerald-900 tabular-nums">
              Doğru Besleme: {fedCount} / {totalRounds} · En Uzun Seri: {bestStreak}x · Toplam{' '}
              {score} Puan (+{earnedStars} ★)
            </p>
          </div>

          {/* Boy Sırası Podyumu (Büyükten Küçüğe) */}
          <div className="bg-gradient-to-b from-sky-50 to-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-4">
              Büyükten Küçüğe Boy Sırası (1. Kazananın Üstünde Yıldız!)
            </p>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-3 items-end pt-2">
              {rankedAnimals.map((entry, rankIdx) => {
                const isWinner = rankIdx === 0;
                const charSizePx = heightToPodiumPx(entry.height);
                const mood: AnimalMood = isWinner
                  ? 'happy'
                  : entry.height < INITIAL_HEIGHT_CM
                  ? 'oops'
                  : 'hungry';

                return (
                  <div
                    key={entry.animal}
                    className={`rounded-2xl border-2 px-1.5 py-3 sm:p-3 flex flex-col items-center justify-end gap-1.5 transition-all ${
                      isWinner
                        ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300 shadow-md'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    {/* Shining Star on Top of the Tallest/Biggest Winner */}
                    {isWinner ? (
                      <div className="flex flex-col items-center gap-0.5 mb-0.5">
                        <Star className="w-7 h-7 sm:w-9 sm:h-9 fill-amber-400 text-amber-500 drop-shadow-xs" />
                        <span className="text-[10px] sm:text-xs font-extrabold text-amber-800 uppercase">
                          Kazanan
                        </span>
                      </div>
                    ) : (
                      <span className="text-[11px] sm:text-xs font-extrabold text-slate-400 tabular-nums">
                        {rankIdx + 1}.
                      </span>
                    )}

                    <div
                      className="flex items-end justify-center"
                      style={{ height: '132px' }}
                    >
                      <div
                        style={{
                          width: `${charSizePx}px`,
                          height: `${charSizePx}px`,
                        }}
                        className="flex items-end justify-center"
                      >
                        <AnimalCharacter
                          animal={entry.animal}
                          mood={mood}
                          className="w-full h-full"
                        />
                      </div>
                    </div>

                    <div className="text-center space-y-0.5">
                      <p className="text-[11px] sm:text-sm font-extrabold text-slate-900 leading-tight truncate max-w-full">
                        {entry.meta.name}
                      </p>
                      <p
                        className={`text-[10px] sm:text-xs font-bold tabular-nums ${
                          isWinner ? 'text-amber-800' : 'text-slate-600'
                        }`}
                      >
                        {entry.height} cm
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
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
