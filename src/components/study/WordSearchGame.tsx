import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ThemeId, VocabItem } from '../../types/curriculum';
import { WordIllustration } from '../WordIllustration';
import {
  playErrorSound,
  playFlipSound,
  playRewardSound,
  playSuccessSound,
} from '../../utils/soundFx';
import {
  CheckCircle2,
  Flame,
  Lightbulb,
  Play,
  RotateCcw,
  Search,
  Trophy,
  Volume2,
} from 'lucide-react';

interface WordSearchGameProps {
  themeId: ThemeId;
  vocab: VocabItem[];
  bestScore: number | null;
  accentBtn: string;
  onComplete: (score: number, foundCount: number) => void;
  onSpeakText: (text: string, key: string, overrideRate?: number) => void;
}

type GamePhase = 'TITLE_MENU' | 'PLAYING' | 'GAME_OVER';

interface Coord {
  r: number;
  c: number;
}

interface PlacedWord {
  item: VocabItem;
  cleanWord: string;
  cells: Coord[];
  colorClass: string;
}

interface PuzzleData {
  size: number;
  grid: string[][];
  placedWords: PlacedWord[];
}

const GRID_SIZE = 9;
const TARGET_WORD_COUNT = 6;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const FOUND_PALETTE = [
  'bg-emerald-200 border-emerald-500 text-emerald-950',
  'bg-amber-200 border-amber-500 text-amber-950',
  'bg-sky-200 border-sky-500 text-sky-950',
  'bg-rose-200 border-rose-500 text-rose-950',
  'bg-purple-200 border-purple-500 text-purple-950',
  'bg-teal-200 border-teal-500 text-teal-950',
];

const DIRECTIONS: [number, number][] = [
  [0, 1], // horizontal left->right
  [1, 0], // vertical top->bottom
  [1, 1], // diagonal top-left->bottom-right
];

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

function buildPuzzle(vocab: VocabItem[]): PuzzleData {
  const singleWordCandidates = vocab.filter((item) => {
    const clean = normalizeLetters(item.word);
    return !item.word.trim().includes(' ') && clean.length >= 3 && clean.length <= GRID_SIZE;
  });

  const fallbackCandidates = vocab.filter((item) => {
    const clean = normalizeLetters(item.word);
    return clean.length >= 3 && clean.length <= GRID_SIZE;
  });

  const sourcePool =
    singleWordCandidates.length >= TARGET_WORD_COUNT
      ? singleWordCandidates
      : fallbackCandidates;

  const uniquePool = sourcePool.filter(
    (item, idx, list) =>
      list.findIndex(
        (other) => normalizeLetters(other.word) === normalizeLetters(item.word)
      ) === idx
  );

  const chosen = shuffleArray(uniquePool).slice(0, TARGET_WORD_COUNT);
  const grid: string[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => '')
  );
  const placedWords: PlacedWord[] = [];

  // Place longest words first for highest placement success
  const sortedChosen = [...chosen].sort(
    (a, b) => normalizeLetters(b.word).length - normalizeLetters(a.word).length
  );

  sortedChosen.forEach((item, wordIdx) => {
    const cleanWord = normalizeLetters(item.word);
    const len = cleanWord.length;
    let placed = false;

    const candidatePositions: { r: number; c: number; dr: number; dc: number }[] = [];
    for (const [dr, dc] of DIRECTIONS) {
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          const endR = r + dr * (len - 1);
          const endC = c + dc * (len - 1);
          if (endR >= 0 && endR < GRID_SIZE && endC >= 0 && endC < GRID_SIZE) {
            candidatePositions.push({ r, c, dr, dc });
          }
        }
      }
    }

    const shuffledPos = shuffleArray(candidatePositions);
    for (const { r, c, dr, dc } of shuffledPos) {
      let fits = true;
      const coords: Coord[] = [];
      for (let k = 0; k < len; k++) {
        const nr = r + dr * k;
        const nc = c + dc * k;
        const existing = grid[nr][nc];
        if (existing !== '' && existing !== cleanWord[k]) {
          fits = false;
          break;
        }
        coords.push({ r: nr, c: nc });
      }
      if (fits) {
        coords.forEach((pos, k) => {
          grid[pos.r][pos.c] = cleanWord[k];
        });
        placedWords.push({
          item,
          cleanWord,
          cells: coords,
          colorClass: FOUND_PALETTE[wordIdx % FOUND_PALETTE.length],
        });
        placed = true;
        break;
      }
    }

    if (!placed) {
      // Fallback: force horizontal on first free-ish row if rare collision
      for (let r = 0; r < GRID_SIZE && !placed; r++) {
        for (let c = 0; c <= GRID_SIZE - len && !placed; c++) {
          let fits = true;
          for (let k = 0; k < len; k++) {
            const existing = grid[r][c + k];
            if (existing !== '' && existing !== cleanWord[k]) {
              fits = false;
              break;
            }
          }
          if (fits) {
            const coords: Coord[] = [];
            for (let k = 0; k < len; k++) {
              grid[r][c + k] = cleanWord[k];
              coords.push({ r, c: c + k });
            }
            placedWords.push({
              item,
              cleanWord,
              cells: coords,
              colorClass: FOUND_PALETTE[wordIdx % FOUND_PALETTE.length],
            });
            placed = true;
          }
        }
      }
    }
  });

  // Fill remaining cells with random letters
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      }
    }
  }

  return {
    size: GRID_SIZE,
    grid,
    placedWords,
  };
}

function getLineCoords(start: Coord, end: Coord): Coord[] | null {
  const dr = end.r - start.r;
  const dc = end.c - start.c;

  if (dr === 0 && dc === 0) return [start];

  const absR = Math.abs(dr);
  const absC = Math.abs(dc);

  // Valid straight lines: horizontal, vertical, or 45-degree diagonal
  if (dr !== 0 && dc !== 0 && absR !== absC) {
    return null;
  }

  const steps = Math.max(absR, absC);
  const stepR = dr === 0 ? 0 : dr / absR;
  const stepC = dc === 0 ? 0 : dc / absC;

  const line: Coord[] = [];
  for (let i = 0; i <= steps; i++) {
    line.push({ r: start.r + stepR * i, c: start.c + stepC * i });
  }
  return line;
}

function coordKey(c: Coord): string {
  return `${c.r},${c.c}`;
}

export const WordSearchGame: React.FC<WordSearchGameProps> = ({
  themeId,
  vocab,
  bestScore,
  accentBtn,
  onComplete,
  onSpeakText,
}) => {
  const [phase, setPhase] = useState<GamePhase>('TITLE_MENU');
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(null);
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintCell, setHintCell] = useState<Coord | null>(null);
  const [anchorCell, setAnchorCell] = useState<Coord | null>(null);
  const [previewCells, setPreviewCells] = useState<Coord[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [wrongFlashCells, setWrongFlashCells] = useState<Coord[]>([]);
  const [feedbackMsg, setFeedbackMsg] = useState<string>(
    'İlk harfe basılı tutup sürükle veya başlangıç ile bitiş harfine sırayla dokun!'
  );

  const wrongTimerRef = useRef<number | null>(null);
  const finishTimerRef = useRef<number | null>(null);
  const didDragMoveRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (wrongTimerRef.current !== null) {
      window.clearTimeout(wrongTimerRef.current);
      wrongTimerRef.current = null;
    }
    if (finishTimerRef.current !== null) {
      window.clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearTimers();
    setPhase('TITLE_MENU');
  }, [themeId, clearTimers]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const startNewPuzzle = useCallback(() => {
    clearTimers();
    const generated = buildPuzzle(vocab);
    setPuzzle(generated);
    setFoundIds([]);
    setScore(0);
    setStreak(0);
    setHintsUsed(0);
    setHintCell(null);
    setAnchorCell(null);
    setPreviewCells([]);
    setIsDragging(false);
    setWrongFlashCells([]);
    setFeedbackMsg(
      'İlk harfe basılı tutup sürükle veya başlangıç ile bitiş harfine sırayla dokun!'
    );
    setPhase('PLAYING');
  }, [vocab, clearTimers]);

  const evaluateSelection = useCallback(
    (cells: Coord[]) => {
      if (!puzzle || cells.length < 2) return;

      const selectedForward = cells.map((p) => puzzle.grid[p.r][p.c]).join('');
      const selectedReverse = [...selectedForward].reverse().join('');

      const matched = puzzle.placedWords.find(
        (pw) =>
          !foundIds.includes(pw.item.id) &&
          (pw.cleanWord === selectedForward || pw.cleanWord === selectedReverse)
      );

      if (matched) {
        playSuccessSound();
        onSpeakText(matched.item.word, `wordsearch_${matched.item.id}_${Date.now()}`);
        const nextStreak = streak + 1;
        const pointsEarned = 20 + Math.min(3, streak) * 5;
        const nextScore = score + pointsEarned;
        const nextFound = [...foundIds, matched.item.id];

        setFoundIds(nextFound);
        setScore(nextScore);
        setStreak(nextStreak);
        setHintCell(null);
        setFeedbackMsg(
          `Harika! "${matched.item.word}" (${matched.item.turkish}) kelimesini buldun! (+${pointsEarned} puan)`
        );

        if (nextFound.length >= puzzle.placedWords.length) {
          const bonus = hintsUsed === 0 ? 20 : 0;
          const totalScore = nextScore + bonus;
          setScore(totalScore);
          finishTimerRef.current = window.setTimeout(() => {
            setPhase('GAME_OVER');
            playRewardSound();
            onComplete(totalScore, nextFound.length);
          }, 700);
        }
      } else {
        playErrorSound();
        setStreak(0);
        setWrongFlashCells(cells);
        setFeedbackMsg(`"${selectedForward}" aranan kelimelerden biri değil, tekrar dene!`);
        if (wrongTimerRef.current !== null) {
          window.clearTimeout(wrongTimerRef.current);
        }
        wrongTimerRef.current = window.setTimeout(() => {
          setWrongFlashCells([]);
        }, 450);
      }
    },
    [puzzle, foundIds, streak, score, hintsUsed, onSpeakText, onComplete]
  );

  const handleCellPointerDown = (r: number, c: number) => {
    if (phase !== 'PLAYING') return;

    // Two-tap mode: if an anchor is already waiting and user taps a valid straight end cell
    if (anchorCell && !isDragging) {
      if (anchorCell.r === r && anchorCell.c === c) {
        setAnchorCell(null);
        setPreviewCells([]);
        return;
      }
      const line = getLineCoords(anchorCell, { r, c });
      if (line && line.length >= 2) {
        setAnchorCell(null);
        setPreviewCells([]);
        evaluateSelection(line);
        return;
      }
    }

    playFlipSound();
    didDragMoveRef.current = false;
    setIsDragging(true);
    setAnchorCell({ r, c });
    setPreviewCells([{ r, c }]);
  };

  const updateDragTarget = useCallback(
    (r: number, c: number) => {
      if (!isDragging || !anchorCell) return;
      if (r !== anchorCell.r || c !== anchorCell.c) {
        didDragMoveRef.current = true;
      }
      const line = getLineCoords(anchorCell, { r, c });
      if (line) {
        setPreviewCells(line);
      }
    },
    [isDragging, anchorCell]
  );

  const handlePointerMoveGrid = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !anchorCell) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const cellBtn = el?.closest('[data-ws-cell]') as HTMLElement | null;
    if (!cellBtn) return;
    const r = Number(cellBtn.dataset.row);
    const c = Number(cellBtn.dataset.col);
    if (!Number.isNaN(r) && !Number.isNaN(c)) {
      updateDragTarget(r, c);
    }
  };

  const finishDrag = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    if (didDragMoveRef.current && previewCells.length >= 2) {
      const selected = [...previewCells];
      setAnchorCell(null);
      setPreviewCells([]);
      evaluateSelection(selected);
    }
    // If the user just tapped a single cell without dragging, keep anchorCell active for Two-Tap mode!
  }, [isDragging, previewCells, evaluateSelection]);

  useEffect(() => {
    if (!isDragging) return;
    const onGlobalPointerUp = () => finishDrag();
    window.addEventListener('pointerup', onGlobalPointerUp);
    window.addEventListener('pointercancel', onGlobalPointerUp);
    return () => {
      window.removeEventListener('pointerup', onGlobalPointerUp);
      window.removeEventListener('pointercancel', onGlobalPointerUp);
    };
  }, [isDragging, finishDrag]);

  const handleUseHint = () => {
    if (!puzzle) return;
    const nextUnfound = puzzle.placedWords.find(
      (pw) => !foundIds.includes(pw.item.id)
    );
    if (!nextUnfound || nextUnfound.cells.length === 0) return;

    playFlipSound();
    setHintsUsed((h) => h + 1);
    setHintCell(nextUnfound.cells[0]);
    setAnchorCell(nextUnfound.cells[0]);
    setPreviewCells([nextUnfound.cells[0]]);
    onSpeakText(nextUnfound.item.word, `ws_hint_${nextUnfound.item.id}_${Date.now()}`);
    setFeedbackMsg(
      `İpucu: "${nextUnfound.item.word}" kelimesinin ilk harfi sarı ile işaretlendi!`
    );
  };

  // Precompute found-cell lookup map
  const foundCellStyleMap = new Map<string, string>();
  if (puzzle) {
    puzzle.placedWords.forEach((pw) => {
      if (foundIds.includes(pw.item.id)) {
        pw.cells.forEach((cell) => {
          foundCellStyleMap.set(coordKey(cell), pw.colorClass);
        });
      }
    });
  }

  const previewSet = new Set(previewCells.map(coordKey));
  const wrongSet = new Set(wrongFlashCells.map(coordKey));
  const totalWords = puzzle?.placedWords.length ?? TARGET_WORD_COUNT;
  const earnedStars = foundIds.length > 0 ? Math.max(5, foundIds.length * 3) : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6">
      {/* Unobtrusive Top HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-700 tabular-nums">
          <span>
            Bulunan: {phase === 'TITLE_MENU' ? 0 : foundIds.length} / {totalWords}
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
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUseHint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-extrabold transition-colors cursor-pointer min-h-[40px]"
            >
              <Lightbulb className="w-4 h-4" />
              <span>İpucu Al</span>
            </button>
            <button
              type="button"
              onClick={startNewPuzzle}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer min-h-[40px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Yeni Bulmaca</span>
            </button>
          </div>
        )}
      </div>

      {/* TITLE MENU */}
      {phase === 'TITLE_MENU' && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 text-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Kelime Bulmaca · Harf Karmaşasında Kelime Avı
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Bu temada öğrendiğin 6 İngilizce kelimeyi 9×9 harf tablosunun içinde bul! Yatay,
              dikey veya çapraz olarak ilk harften son harfe sürükle ya da başlangıç ve bitiş
              harfine sırayla dokun.
            </p>
          </div>
          <button
            type="button"
            onClick={startNewPuzzle}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base cursor-pointer shadow-sm hover:opacity-95 min-h-[48px] ${accentBtn}`}
          >
            <Play className="w-5 h-5" />
            <span>Kelime Bulmacayı Başlat</span>
          </button>
        </div>
      )}

      {/* ACTIVE PLAY */}
      {phase === 'PLAYING' && puzzle && (
        <div className="space-y-5">
          {/* Feedback Bar */}
          <div
            className={`rounded-2xl px-4 py-3.5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${accentBtn}`}
          >
            <p className="text-sm sm:text-base font-bold">{feedbackMsg}</p>
            <span className="text-xs font-bold text-amber-200 whitespace-nowrap shrink-0 tabular-nums">
              İpucu: {hintsUsed} kez kullanıldı
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: 9x9 Letter Grid */}
            <div className="lg:col-span-7 flex justify-center">
              <div
                onPointerMove={handlePointerMoveGrid}
                className="w-full max-w-[430px] bg-slate-100 border-2 border-slate-300 rounded-2xl p-2 sm:p-3 select-none touch-none"
              >
                <div className="grid grid-cols-9 gap-1 sm:gap-1.5">
                  {puzzle.grid.map((row, r) =>
                    row.map((letter, c) => {
                      const key = `${r},${c}`;
                      const foundCls = foundCellStyleMap.get(key);
                      const isPreview = previewSet.has(key);
                      const isWrong = wrongSet.has(key);
                      const isHint = hintCell?.r === r && hintCell?.c === c && !foundCls;

                      return (
                        <button
                          key={key}
                          type="button"
                          data-ws-cell="1"
                          data-row={r}
                          data-col={c}
                          onPointerDown={() => handleCellPointerDown(r, c)}
                          className={`aspect-square rounded-lg border font-extrabold text-sm sm:text-lg flex items-center justify-center transition-transform duration-100 cursor-pointer select-none ${
                            isWrong
                              ? 'bg-rose-200 border-rose-500 text-rose-950 scale-95'
                              : isPreview
                              ? 'bg-indigo-600 border-indigo-700 text-white scale-105 shadow-xs'
                              : foundCls
                              ? foundCls
                              : isHint
                              ? 'bg-amber-100 border-amber-500 text-amber-950 ring-2 ring-amber-400'
                              : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          {letter}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Right: Word List with Illustrations & Voice */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Bulunacak Kelimeler ({foundIds.length} / {puzzle.placedWords.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {puzzle.placedWords.map((pw) => {
                  const isFound = foundIds.includes(pw.item.id);
                  return (
                    <div
                      key={pw.item.id}
                      className={`rounded-xl border-2 p-2.5 flex items-center gap-3 transition-all ${
                        isFound
                          ? `${pw.colorClass}`
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl ${pw.item.bgTone} border border-slate-200/80 flex items-center justify-center shrink-0`}
                      >
                        <WordIllustration
                          illustrationKey={pw.item.illustrationKey}
                          className="w-10 h-10"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-sm sm:text-base font-extrabold tracking-wide truncate ${
                              isFound ? 'line-through opacity-85' : 'text-slate-900'
                            }`}
                          >
                            {pw.cleanWord}
                          </span>
                          {isFound && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs font-semibold text-slate-600 truncate">
                          {pw.item.turkish}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          onSpeakText(
                            pw.item.word,
                            `ws_word_${pw.item.id}_${Date.now()}`
                          )
                        }
                        aria-label={`${pw.item.word} kelimesini dinle`}
                        title="Dinle"
                        className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GAME OVER */}
      {phase === 'GAME_OVER' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-2xl font-extrabold text-emerald-950">
              Tebrikler! Tüm Kelimeleri Harf Karmaşasında Buldun!
            </h3>
            <p className="text-sm sm:text-base font-bold text-emerald-900 tabular-nums">
              Bulunan Kelime: {foundIds.length} / {totalWords} · İpucu: {hintsUsed} · Toplam{' '}
              {score} Puan (+{earnedStars} ★)
            </p>
          </div>
          <button
            type="button"
            onClick={startNewPuzzle}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer min-h-[44px] ${accentBtn}`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Yeni Bulmaca Çöz</span>
          </button>
        </div>
      )}
    </div>
  );
};
