import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ThemeId, VocabItem } from '../../types/curriculum';
import { WordIllustration } from '../WordIllustration';
import { MoleCharacter, MoleMood } from './MoleCharacter';
import {
  playBonkSound,
  playErrorSound,
  playRewardSound,
} from '../../utils/soundFx';
import {
  Clock,
  Eye,
  Flame,
  Hammer,
  Play,
  RotateCcw,
  Trophy,
  Volume2,
} from 'lucide-react';

interface WhackMoleGameProps {
  themeId: ThemeId;
  vocab: VocabItem[];
  bestScore: number | null;
  accentBtn: string;
  onComplete: (score: number, hitsCount: number) => void;
  onSpeakText: (text: string, key: string, overrideRate?: number) => void;
}

type GamePhase = 'TITLE_MENU' | 'PLAYING' | 'GAME_OVER';
type SignDisplayMode = 'mixed' | 'words' | 'pictures';

interface MoleBurrow {
  slot: number;
  item: VocabItem | null;
  mood: MoleMood;
}

interface ActiveWave {
  target: VocabItem;
  showPictureOnSign: boolean;
  burrows: MoleBurrow[];
}

const GAME_DURATION_SEC = 45;
const BURROW_COUNT = 6;
const WAVE_TIMEOUT_MS = 4500;

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildWave(
  vocab: VocabItem[],
  displayMode: SignDisplayMode,
  waveNumber: number
): ActiveWave {
  const uniqueByKey = vocab.filter(
    (item, idx, list) =>
      list.findIndex((other) => other.illustrationKey === item.illustrationKey) === idx
  );
  const pool = uniqueByKey.length >= 4 ? uniqueByKey : vocab;
  const chosenItems = shuffleArray(pool).slice(0, 4);
  const target = chosenItems[0];
  const slotIndices = shuffleArray([0, 1, 2, 3, 4, 5]).slice(0, chosenItems.length);

  const burrows: MoleBurrow[] = Array.from({ length: BURROW_COUNT }, (_, slot) => ({
    slot,
    item: null,
    mood: 'pop',
  }));

  slotIndices.forEach((slot, idx) => {
    burrows[slot] = {
      slot,
      item: chosenItems[idx],
      mood: 'pop',
    };
  });

  const showPictureOnSign =
    displayMode === 'pictures'
      ? true
      : displayMode === 'words'
      ? false
      : waveNumber % 2 === 1;

  return {
    target,
    showPictureOnSign,
    burrows,
  };
}

export const WhackMoleGame: React.FC<WhackMoleGameProps> = ({
  themeId,
  vocab,
  bestScore,
  accentBtn,
  onComplete,
  onSpeakText,
}) => {
  const [phase, setPhase] = useState<GamePhase>('TITLE_MENU');
  const [displayMode, setDisplayMode] = useState<SignDisplayMode>('mixed');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SEC);
  const [score, setScore] = useState(0);
  const [hitsCount, setHitsCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [wave, setWave] = useState<ActiveWave | null>(null);
  const [waveSolved, setWaveSolved] = useState(false);
  const [showTurkishHint, setShowTurkishHint] = useState(false);
  const [feedbackBanner, setFeedbackBanner] = useState<string>('');

  const waveCountRef = useRef(0);
  const scoreRef = useRef(0);
  const hitsRef = useRef(0);
  const waveNextTimerRef = useRef<number | null>(null);
  const waveExpireTimerRef = useRef<number | null>(null);
  const phaseRef = useRef<GamePhase>('TITLE_MENU');
  const displayModeRef = useRef<SignDisplayMode>('mixed');

  scoreRef.current = score;
  hitsRef.current = hitsCount;
  phaseRef.current = phase;
  displayModeRef.current = displayMode;

  const clearWaveTimers = useCallback(() => {
    if (waveNextTimerRef.current !== null) {
      window.clearTimeout(waveNextTimerRef.current);
      waveNextTimerRef.current = null;
    }
    if (waveExpireTimerRef.current !== null) {
      window.clearTimeout(waveExpireTimerRef.current);
      waveExpireTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearWaveTimers();
    setPhase('TITLE_MENU');
  }, [themeId, clearWaveTimers]);

  useEffect(() => {
    return () => clearWaveTimers();
  }, [clearWaveTimers]);

  const speakTarget = useCallback(
    (item: VocabItem, rate?: number) => {
      onSpeakText(item.word, `mole_${item.id}_${Date.now()}`, rate);
    },
    [onSpeakText]
  );

  const spawnNextWave = useCallback(
    (speakNow = true) => {
      clearWaveTimers();
      if (phaseRef.current !== 'PLAYING') return;

      const nextWaveNum = waveCountRef.current;
      waveCountRef.current += 1;
      const nextWave = buildWave(vocab, displayModeRef.current, nextWaveNum);
      setWave(nextWave);
      setWaveSolved(false);
      setShowTurkishHint(false);
      setFeedbackBanner('');

      if (speakNow) {
        speakTarget(nextWave.target);
      }

      waveExpireTimerRef.current = window.setTimeout(() => {
        if (phaseRef.current === 'PLAYING') {
          setStreak(0);
          setFeedbackBanner(`Süre doldu! Aranan: "${nextWave.target.word}"`);
          waveNextTimerRef.current = window.setTimeout(() => {
            spawnNextWave(true);
          }, 650);
        }
      }, WAVE_TIMEOUT_MS);
    },
    [vocab, clearWaveTimers, speakTarget]
  );

  const startGame = () => {
    clearWaveTimers();
    waveCountRef.current = 0;
    setScore(0);
    setHitsCount(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(GAME_DURATION_SEC);
    setWaveSolved(false);
    setShowTurkishHint(false);
    setFeedbackBanner('');
    phaseRef.current = 'PLAYING';
    setPhase('PLAYING');
    spawnNextWave(true);
  };

  useEffect(() => {
    if (phase !== 'PLAYING') return;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          clearWaveTimers();
          phaseRef.current = 'GAME_OVER';
          setPhase('GAME_OVER');
          playRewardSound();
          onComplete(scoreRef.current, hitsRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [phase, clearWaveTimers, onComplete]);

  const handleBurrowClick = useCallback(
    (slotIdx: number) => {
      if (phase !== 'PLAYING' || !wave || waveSolved) return;
      const burrow = wave.burrows[slotIdx];
      if (!burrow || !burrow.item) return;

      if (burrow.item.id === wave.target.id) {
        clearWaveTimers();
        playBonkSound();
        const nextStreak = streak + 1;
        const pointsEarned = 10 + Math.min(4, streak) * 5;
        setScore((s) => s + pointsEarned);
        setHitsCount((h) => h + 1);
        setStreak(nextStreak);
        setBestStreak((b) => Math.max(b, nextStreak));
        setWaveSolved(true);
        setFeedbackBanner(
          `Tam isabet! "${burrow.item.word}" (${burrow.item.turkish}) +${pointsEarned} puan!`
        );

        setWave((curr) =>
          curr
            ? {
                ...curr,
                burrows: curr.burrows.map((b) =>
                  b.slot === slotIdx ? { ...b, mood: 'bonked' } : b
                ),
              }
            : curr
        );

        waveNextTimerRef.current = window.setTimeout(() => {
          spawnNextWave(true);
        }, 520);
      } else {
        playErrorSound();
        setStreak(0);
        setScore((s) => Math.max(0, s - 5));
        setFeedbackBanner(
          `Yanlış köstebek! Bu "${burrow.item.word}" (${burrow.item.turkish})`
        );
        setWave((curr) =>
          curr
            ? {
                ...curr,
                burrows: curr.burrows.map((b) =>
                  b.slot === slotIdx ? { ...b, mood: 'wrong' } : b
                ),
              }
            : curr
        );
      }
    },
    [phase, wave, waveSolved, streak, clearWaveTimers, spawnNextWave]
  );

  useEffect(() => {
    if (phase !== 'PLAYING') return;
    const onKeyDown = (e: KeyboardEvent) => {
      const idx = ['1', '2', '3', '4', '5', '6'].indexOf(e.key);
      if (idx >= 0) {
        e.preventDefault();
        handleBurrowClick(idx);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase, handleBurrowClick]);

  const earnedStars = hitsCount > 0 ? Math.max(5, hitsCount * 2) : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Unobtrusive Top HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-700 tabular-nums">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${
              timeLeft <= 10 && phase === 'PLAYING'
                ? 'bg-rose-100 text-rose-800'
                : 'bg-slate-100 text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            Süre: {timeLeft} sn
          </span>
          <span className="inline-flex items-center gap-1 text-amber-700">
            <Flame className="w-4 h-4" />
            Seri: {streak}x
          </span>
          <span aria-hidden="true">·</span>
          <span>Yakalanan: {hitsCount}</span>
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
        <div className="bg-gradient-to-b from-lime-50 to-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-5">
          <div className="flex items-center justify-center gap-4">
            <MoleCharacter mood="pop" className="w-20 h-20" />
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center">
              <Hammer className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Köstebek Yakala · Hızlı Dokun!
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              45 saniye boyunca bahçedeki deliklerden fırlayan köstebeklerin ellerindeki kelimelere
              ve resimlere bak. Sesin okuduğu doğru köstebeğe süre dolmadan dokunarak kombo yap!
            </p>
          </div>

          {/* Interactive Display Mode Selector */}
          <div className="inline-flex items-center gap-1 p-1 bg-white border border-emerald-200 rounded-xl">
            {(
              [
                ['mixed', 'Karışık (Kelime + Resim)'],
                ['words', 'Sadece Kelimeler'],
                ['pictures', 'Sadece Resimler'],
              ] as [SignDisplayMode, string][]
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                onClick={() => setDisplayMode(m)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer min-h-[36px] ${
                  displayMode === m
                    ? accentBtn
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div>
            <button
              type="button"
              onClick={startGame}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base cursor-pointer shadow-sm hover:opacity-95 min-h-[48px] ${accentBtn}`}
            >
              <Play className="w-5 h-5" />
              <span>45 Saniyelik Oyunu Başlat</span>
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE PLAY */}
      {phase === 'PLAYING' && wave && (
        <div className="space-y-5">
          {/* Audio Prompt Bar */}
          <div
            className={`rounded-2xl p-4 sm:p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 ${accentBtn}`}
          >
            <div className="space-y-1">
              <p className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                {wave.showPictureOnSign
                  ? 'Resimli Köstebek Dalgası'
                  : 'Kelimeli Köstebek Dalgası'}
              </p>
              <p className="text-base sm:text-lg font-extrabold">
                {feedbackBanner
                  ? feedbackBanner
                  : showTurkishHint
                  ? `İpucu (Türkçesi): "${wave.target.turkish}"`
                  : 'Sesin okuduğu kelimeyi tutan köstebeğe hızlıca dokun!'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => speakTarget(wave.target)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-extrabold hover:bg-amber-100 transition-colors cursor-pointer min-h-[44px]"
              >
                <Volume2 className="w-4 h-4" />
                <span>Tekrar Dinle</span>
              </button>
              <button
                type="button"
                onClick={() => speakTarget(wave.target, 0.68)}
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

          {/* Garden Meadow with 6 Mole Burrows */}
          <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-b from-lime-100 via-emerald-100 to-green-200/75 p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5">
              {wave.burrows.map((burrow) => {
                const hasMole = burrow.item !== null;
                const isBonked = burrow.mood === 'bonked';
                const isWrong = burrow.mood === 'wrong';

                return (
                  <button
                    key={burrow.slot}
                    type="button"
                    disabled={!hasMole || waveSolved}
                    onClick={() => handleBurrowClick(burrow.slot)}
                    className={`relative rounded-2xl border-2 p-3 min-h-[168px] sm:min-h-[188px] flex flex-col items-center justify-end overflow-hidden transition-all duration-150 ${
                      hasMole
                        ? isBonked
                          ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-400 cursor-default'
                          : isWrong
                          ? 'bg-rose-50 border-rose-500 cursor-pointer'
                          : 'bg-white/65 border-emerald-300 hover:border-amber-500 hover:bg-white cursor-pointer active:scale-95'
                        : 'bg-emerald-200/45 border-emerald-300/60 cursor-default'
                    }`}
                  >
                    <span className="absolute top-2 left-2.5 text-xs font-extrabold text-emerald-900/60 tabular-nums">
                      {burrow.slot + 1}
                    </span>

                    {hasMole && burrow.item ? (
                      <div className="relative z-10 flex flex-col items-center gap-1.5 w-full mb-3">
                        {/* Signboard held by the mole */}
                        <div
                          className={`w-full max-w-[164px] rounded-xl border-2 px-2.5 py-1.5 shadow-sm flex flex-col items-center justify-center ${
                            isBonked
                              ? 'bg-emerald-600 border-emerald-700 text-white'
                              : isWrong
                              ? 'bg-rose-100 border-rose-400 text-rose-950'
                              : 'bg-amber-50 border-amber-400 text-slate-900'
                          }`}
                        >
                          {wave.showPictureOnSign ? (
                            <div className="flex flex-col items-center gap-0.5">
                              <WordIllustration
                                illustrationKey={burrow.item.illustrationKey}
                                className="w-12 h-12 sm:w-14 sm:h-14"
                              />
                              {(isBonked || isWrong) && (
                                <span className="text-xs font-extrabold">
                                  {burrow.item.word}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm sm:text-base font-extrabold text-center leading-tight">
                              {burrow.item.word}
                            </span>
                          )}
                        </div>

                        <MoleCharacter
                          mood={burrow.mood}
                          className={`w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-150 ${
                            isBonked ? 'scale-105' : ''
                          }`}
                        />
                      </div>
                    ) : (
                      <div className="mb-6 text-xs font-bold text-emerald-800/50">
                        Boş Yuva
                      </div>
                    )}

                    {/* Earthy Burrow Rim */}
                    <div
                      className="absolute inset-x-3 bottom-1.5 h-6 rounded-full bg-amber-900 border-2 border-amber-950/70 shadow-inner pointer-events-none"
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* GAME OVER */}
      {phase === 'GAME_OVER' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <div className="flex items-center justify-center">
            <MoleCharacter mood="bonked" className="w-20 h-20" />
          </div>
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-2xl font-extrabold text-emerald-950">
              Süre Doldu! Süper Refleks!
            </h3>
            <p className="text-sm sm:text-base font-bold text-emerald-900 tabular-nums">
              Yakalanan Köstebek: {hitsCount} · En Uzun Seri: {bestStreak}x · Toplam {score}{' '}
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
