import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ThemeId, VocabItem } from '../../types/curriculum';
import { WordIllustration } from '../WordIllustration';
import { TreasureChestSvg } from './TreasureChestSvg';
import {
  playChestOpenSound,
  playErrorSound,
  playFlipSound,
  playRewardSound,
} from '../../utils/soundFx';
import {
  Coins,
  Eye,
  Flame,
  Heart,
  KeyRound,
  Lightbulb,
  Play,
  RotateCcw,
  Trophy,
  Volume2,
} from 'lucide-react';

interface PirateTreasureGameProps {
  themeId: ThemeId;
  vocab: VocabItem[];
  bestScore: number | null;
  accentBtn: string;
  onComplete: (score: number, unlockedCount: number) => void;
  onSpeakText: (text: string, key: string, overrideRate?: number) => void;
}

type GamePhase = 'TITLE_MENU' | 'PLAYING' | 'GAME_OVER';

interface LetterTile {
  uid: string;
  char: string;
  used: boolean;
}

interface ChestRound {
  item: VocabItem;
  cleanWord: string;
  tiles: LetterTile[];
}

const TOTAL_CHESTS = 8;
const MAX_MISTAKES_PER_CHEST = 6;
const EXTRA_DECOY_LETTERS = 4;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalizeLetters(word: string): string {
  return word.replace(/[^a-zA-Z]/g, '').toUpperCase();
}

function buildChestRounds(vocab: VocabItem[]): ChestRound[] {
  const singleWordPool = vocab.filter((v) => {
    const clean = normalizeLetters(v.word);
    return !v.word.trim().includes(' ') && clean.length >= 3 && clean.length <= 9;
  });
  const fallbackPool = vocab.filter((v) => {
    const clean = normalizeLetters(v.word);
    return clean.length >= 3 && clean.length <= 10;
  });

  const pool = singleWordPool.length >= TOTAL_CHESTS ? singleWordPool : fallbackPool;
  const uniquePool = pool.filter(
    (item, idx, list) =>
      list.findIndex((other) => normalizeLetters(other.word) === normalizeLetters(item.word)) === idx
  );

  const chosen = shuffleArray(uniquePool).slice(0, Math.min(TOTAL_CHESTS, uniquePool.length));

  return chosen.map((item, roundIdx) => {
    const cleanWord = normalizeLetters(item.word);
    const wordLetters = cleanWord.split('');
    const decoyPool = ALPHABET.split('').filter((ch) => !wordLetters.includes(ch));
    const decoys = shuffleArray(decoyPool).slice(0, EXTRA_DECOY_LETTERS);

    const rawTiles: LetterTile[] = [...wordLetters, ...decoys].map((char, idx) => ({
      uid: `tile_${roundIdx}_${idx}_${char}`,
      char,
      used: false,
    }));

    return {
      item,
      cleanWord,
      tiles: shuffleArray(rawTiles),
    };
  });
}

export const PirateTreasureGame: React.FC<PirateTreasureGameProps> = ({
  themeId,
  vocab,
  bestScore,
  accentBtn,
  onComplete,
  onSpeakText,
}) => {
  const [phase, setPhase] = useState<GamePhase>('TITLE_MENU');
  const [chests, setChests] = useState<ChestRound[]>([]);
  const [chestIndex, setChestIndex] = useState(0);
  const [tiles, setTiles] = useState<LetterTile[]>([]);
  const [typedCount, setTypedCount] = useState(0);
  const [mistakesLeft, setMistakesLeft] = useState(MAX_MISTAKES_PER_CHEST);
  const [goldScore, setGoldScore] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [chestState, setChestState] = useState<'locked' | 'open' | 'failed'>('locked');
  const [wrongTileUid, setWrongTileUid] = useState<string | null>(null);
  const [usedHintThisChest, setUsedHintThisChest] = useState(false);
  const [showTurkishHint, setShowTurkishHint] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const advanceTimerRef = useRef<number | null>(null);
  const wrongTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    if (wrongTimerRef.current !== null) {
      window.clearTimeout(wrongTimerRef.current);
      wrongTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearTimers();
    setPhase('TITLE_MENU');
  }, [themeId, clearTimers]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const speakChestWord = useCallback(
    (word: string, tag: string, rate?: number) => {
      onSpeakText(word, `pirate_${tag}_${Date.now()}`, rate);
    },
    [onSpeakText]
  );

  const loadChestRound = useCallback(
    (round: ChestRound, idx: number, speak = true) => {
      setChestIndex(idx);
      setTiles(round.tiles);
      setTypedCount(0);
      setMistakesLeft(MAX_MISTAKES_PER_CHEST);
      setChestState('locked');
      setWrongTileUid(null);
      setUsedHintThisChest(false);
      setShowTurkishHint(false);
      setStatusMessage('Resme bak, sesi dinle ve harfleri sırayla seçerek kilidi aç!');
      if (speak) {
        speakChestWord(round.item.word, `chest_${idx}`);
      }
    },
    [speakChestWord]
  );

  const startVoyage = () => {
    clearTimers();
    const generated = buildChestRounds(vocab);
    setChests(generated);
    setGoldScore(0);
    setUnlockedCount(0);
    setStreak(0);
    setBestStreak(0);
    setPhase('PLAYING');

    if (generated[0]) {
      loadChestRound(generated[0], 0, true);
    }
  };

  const currentChest = chests[chestIndex];
  const totalChests = chests.length || TOTAL_CHESTS;

  const advanceOrFinish = useCallback(
    (nextGold: number, nextUnlocked: number) => {
      const nextIdx = chestIndex + 1;
      if (nextIdx >= chests.length) {
        clearTimers();
        setPhase('GAME_OVER');
        playRewardSound();
        onComplete(nextGold, nextUnlocked);
      } else {
        loadChestRound(chests[nextIdx], nextIdx, true);
      }
    },
    [chestIndex, chests, clearTimers, loadChestRound, onComplete]
  );

  const handleTilePick = useCallback(
    (tile: LetterTile) => {
      if (phase !== 'PLAYING' || !currentChest || chestState !== 'locked' || tile.used) {
        return;
      }

      const expectedChar = currentChest.cleanWord[typedCount];
      if (!expectedChar) return;

      if (tile.char === expectedChar) {
        const nextTyped = typedCount + 1;
        setTiles((prev) =>
          prev.map((t) => (t.uid === tile.uid ? { ...t, used: true } : t))
        );
        setTypedCount(nextTyped);

        if (nextTyped >= currentChest.cleanWord.length) {
          playChestOpenSound();
          speakChestWord(currentChest.item.word, `open_${chestIndex}`);
          const nextStreak = streak + 1;
          const earnedGold = usedHintThisChest
            ? 15
            : 25 + Math.min(4, streak) * 5;
          const nextGold = goldScore + earnedGold;
          const nextUnlocked = unlockedCount + 1;

          setGoldScore(nextGold);
          setUnlockedCount(nextUnlocked);
          setStreak(nextStreak);
          setBestStreak((b) => Math.max(b, nextStreak));
          setChestState('open');
          setStatusMessage(
            `Harika! "${currentChest.item.word}" sandığı açıldı! +${earnedGold} Altın!`
          );

          advanceTimerRef.current = window.setTimeout(() => {
            advanceOrFinish(nextGold, nextUnlocked);
          }, 1250);
        } else {
          playFlipSound();
          setStatusMessage(
            `Doğru harf "${tile.char}"! Şimdi ${nextTyped + 1}. harfi seç.`
          );
        }
      } else {
        playErrorSound();
        const nextMistakes = mistakesLeft - 1;
        setMistakesLeft(nextMistakes);
        setStreak(0);
        setWrongTileUid(tile.uid);

        if (wrongTimerRef.current !== null) {
          window.clearTimeout(wrongTimerRef.current);
        }
        wrongTimerRef.current = window.setTimeout(() => {
          setWrongTileUid(null);
        }, 420);

        if (nextMistakes <= 0) {
          setChestState('failed');
          setStatusMessage(
            `Kilit bozuldu! Doğru yazılış: "${currentChest.cleanWord}" (${currentChest.item.turkish})`
          );
          speakChestWord(currentChest.item.word, `reveal_${chestIndex}`);
          advanceTimerRef.current = window.setTimeout(() => {
            advanceOrFinish(goldScore, unlockedCount);
          }, 1450);
        } else {
          setStatusMessage(
            `"${tile.char}" doğru sıradaki harf değil! Kalan kilit hakkı: ${nextMistakes}`
          );
        }
      }
    },
    [
      phase,
      currentChest,
      chestState,
      typedCount,
      streak,
      usedHintThisChest,
      goldScore,
      unlockedCount,
      mistakesLeft,
      chestIndex,
      speakChestWord,
      advanceOrFinish,
    ]
  );

  const handleUseLetterHint = () => {
    if (phase !== 'PLAYING' || !currentChest || chestState !== 'locked') return;
    const expectedChar = currentChest.cleanWord[typedCount];
    if (!expectedChar) return;
    const matchingTile = tiles.find((t) => !t.used && t.char === expectedChar);
    if (!matchingTile) return;

    setUsedHintThisChest(true);
    handleTilePick(matchingTile);
  };

  useEffect(() => {
    if (phase !== 'PLAYING' || !currentChest || chestState !== 'locked') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const keyChar = e.key.toUpperCase();
      if (/^[A-Z]$/.test(keyChar)) {
        const expected = currentChest.cleanWord[typedCount];
        const matchingTile =
          tiles.find((t) => !t.used && t.char === keyChar && t.char === expected) ??
          tiles.find((t) => !t.used && t.char === keyChar);
        if (matchingTile) {
          e.preventDefault();
          handleTilePick(matchingTile);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase, currentChest, chestState, typedCount, tiles, handleTilePick]);

  const earnedStars = unlockedCount > 0 ? Math.max(5, unlockedCount * 3) : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Unobtrusive Top HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-700 tabular-nums">
          <span>
            Sandık: {phase === 'PLAYING' ? chestIndex + 1 : phase === 'GAME_OVER' ? totalChests : 0}{' '}
            / {totalChests}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 text-amber-700">
            <Coins className="w-4 h-4" />
            Altın: {goldScore}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 text-orange-700">
            <Flame className="w-4 h-4" />
            Seri: {streak}x
          </span>
          {bestScore !== null && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700">Rekor: {bestScore} altın</span>
            </>
          )}
        </div>

        {phase === 'PLAYING' && (
          <button
            type="button"
            onClick={startVoyage}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer min-h-[40px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Yeniden Başlat</span>
          </button>
        )}
      </div>

      {/* TITLE MENU */}
      {phase === 'TITLE_MENU' && (
        <div className="bg-gradient-to-b from-amber-50 via-orange-50/60 to-yellow-50 border border-amber-200 rounded-2xl p-6 sm:p-8 text-center space-y-5">
          <div className="flex items-center justify-center gap-4">
            <TreasureChestSvg open={false} className="w-24 h-24" />
            <TreasureChestSvg open={true} className="w-24 h-24" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Korsan Hazinesi · Harf Şifresiyle Sandık Aç
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              8 kilitli korsan sandığı seni bekliyor! Resme bakıp kelimeyi dinle, ardından aşağıdaki
              karışık harflerden kelimenin harflerini <strong>doğru sırayla</strong> seçerek her
              sandığın kilidini aç ve altınları topla!
            </p>
          </div>

          <button
            type="button"
            onClick={startVoyage}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base cursor-pointer shadow-sm hover:opacity-95 min-h-[48px] ${accentBtn}`}
          >
            <Play className="w-5 h-5" />
            <span>Hazine Avını Başlat ({TOTAL_CHESTS} Sandık)</span>
          </button>
        </div>
      )}

      {/* ACTIVE PLAY */}
      {phase === 'PLAYING' && currentChest && (
        <div className="space-y-5">
          {/* Prompt & Audio Banner */}
          <div
            className={`rounded-2xl p-4 sm:p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 ${accentBtn}`}
          >
            <div className="space-y-1">
              <p className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                {chestIndex + 1}. Hazine Sandığı · Yazım (Spelling) Şifresi
              </p>
              <p className="text-base sm:text-lg font-extrabold">
                {showTurkishHint && chestState === 'locked'
                  ? `İpucu (Türkçesi): "${currentChest.item.turkish}"`
                  : statusMessage}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => speakChestWord(currentChest.item.word, `replay_${chestIndex}`)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-extrabold hover:bg-amber-100 transition-colors cursor-pointer min-h-[44px]"
              >
                <Volume2 className="w-4 h-4" />
                <span>Sesi Dinle</span>
              </button>
              <button
                type="button"
                onClick={() => speakChestWord(currentChest.item.word, `slow_${chestIndex}`, 0.68)}
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

          {/* Treasure Deck Stage */}
          <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-b from-amber-50 via-orange-50/50 to-amber-100/60 p-4 sm:p-6 space-y-5">
            {/* Top Row: Lock Lives & Letter Hint */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-800 tabular-nums">
                <KeyRound className="w-4 h-4 text-amber-700" />
                <span>Kilit Hakkı:</span>
                {Array.from({ length: MAX_MISTAKES_PER_CHEST }).map((_, idx) => (
                  <Heart
                    key={idx}
                    className={`w-4 h-4 ${
                      idx < mistakesLeft ? 'fill-rose-500 text-rose-600' : 'text-slate-300'
                    }`}
                  />
                ))}
                <span>({mistakesLeft}/{MAX_MISTAKES_PER_CHEST})</span>
              </div>

              <button
                type="button"
                disabled={chestState !== 'locked'}
                onClick={handleUseLetterHint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-200 hover:bg-amber-300 disabled:opacity-50 text-amber-950 text-xs font-extrabold transition-colors cursor-pointer min-h-[40px]"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Sonraki Harfi Aç</span>
              </button>
            </div>

            {/* Center: Picture Clue + Chest */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl ${currentChest.item.bgTone} border-2 border-amber-300 flex items-center justify-center shadow-xs`}
                >
                  <WordIllustration
                    illustrationKey={currentChest.item.illustrationKey}
                    className="w-20 h-20 sm:w-24 sm:h-24"
                  />
                </div>
                <span className="text-xs font-bold text-amber-950">
                  {chestState !== 'locked' ? currentChest.item.turkish : 'Gizli Kelime Resmi'}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <TreasureChestSvg
                  open={chestState === 'open'}
                  cracking={typedCount > 0 && chestState === 'locked'}
                  className={`w-28 h-28 sm:w-32 sm:h-32 transition-transform duration-300 ${
                    chestState === 'open' ? 'scale-105' : ''
                  }`}
                />
              </div>
            </div>

            {/* Ordered Spelling Slots */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-1">
              {currentChest.cleanWord.split('').map((char, idx) => {
                const isRevealed = idx < typedCount || chestState !== 'locked';
                const isActiveSlot = idx === typedCount && chestState === 'locked';

                return (
                  <div
                    key={`${currentChest.item.id}_slot_${idx}`}
                    className={`w-10 h-12 sm:w-12 sm:h-14 rounded-xl border-2 flex items-center justify-center text-lg sm:text-2xl font-extrabold transition-all tabular-nums ${
                      chestState === 'open'
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                        : chestState === 'failed'
                        ? 'bg-rose-100 border-rose-400 text-rose-950'
                        : isRevealed
                        ? 'bg-amber-200 border-amber-500 text-amber-950'
                        : isActiveSlot
                        ? 'bg-white border-amber-600 ring-2 ring-amber-300 text-slate-400'
                        : 'bg-white/75 border-amber-300 text-slate-300'
                    }`}
                  >
                    {isRevealed ? char : '_'}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Letter Lock Tiles */}
          <div className="space-y-2.5">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 text-center">
              Sıradaki Harfi Seç ( veya Klavyeden Yaz )
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
              {tiles.map((tile) => {
                const isWrong = wrongTileUid === tile.uid;
                return (
                  <button
                    key={tile.uid}
                    type="button"
                    disabled={tile.used || chestState !== 'locked'}
                    onClick={() => handleTilePick(tile)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 font-extrabold text-lg sm:text-xl flex items-center justify-center transition-all duration-150 ${
                      tile.used
                        ? 'bg-slate-100 border-slate-200 text-slate-300 scale-90 cursor-default'
                        : isWrong
                        ? 'bg-rose-100 border-rose-500 text-rose-900 scale-95 cursor-pointer'
                        : 'bg-white border-amber-400 text-slate-900 hover:bg-amber-50 hover:border-amber-600 hover:-translate-y-0.5 shadow-xs cursor-pointer active:scale-95'
                    }`}
                  >
                    {tile.char}
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
            <TreasureChestSvg open={unlockedCount > 0} className="w-28 h-28" />
          </div>
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-2xl font-extrabold text-emerald-950">
              {unlockedCount === totalChests
                ? 'Muhteşem Kaptan! Tüm Hazine Sandıklarını Açtın!'
                : 'Hazine Yolculuğu Tamamlandı!'}
            </h3>
            <p className="text-sm sm:text-base font-bold text-emerald-900 tabular-nums">
              Açılan Sandık: {unlockedCount} / {totalChests} · En Uzun Seri: {bestStreak}x · Toplam{' '}
              {goldScore} Altın (+{earnedStars} ★)
            </p>
          </div>
          <button
            type="button"
            onClick={startVoyage}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer min-h-[44px] ${accentBtn}`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Yeni Hazine Avı Başlat</span>
          </button>
        </div>
      )}
    </div>
  );
};
