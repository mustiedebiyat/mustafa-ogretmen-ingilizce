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
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Flag,
  Image as ImageIcon,
  Play,
  Puzzle,
  RotateCcw,
  Sparkles,
  Trophy,
  Volume2,
} from 'lucide-react';

export type GameModeId = 'memory' | 'matching' | 'race' | 'balloon';

interface GamesSectionProps {
  themeId: ThemeId;
  vocab: VocabItem[];
  bestMemoryMoves: number | null;
  matchingCompletedCount: number;
  raceCompletedCount: number;
  balloonBestScore: number | null;
  onCompleteMemory: (moves: number) => void;
  onCompleteMatching: () => void;
  onCompleteRace: () => void;
  onCompleteBalloon: (score: number, poppedCount: number) => void;
  onSpeakText: (text: string, key: string) => void;
}

interface MemoryCard {
  uid: string;
  pairId: string;
  kind: 'en' | 'tr';
  item: VocabItem;
}

interface RaceQuestion {
  target: VocabItem;
  options: VocabItem[];
}

const BALLOON_COLORS = [
  'from-rose-500 to-rose-600 border-rose-700',
  'from-amber-400 to-orange-500 border-orange-600',
  'from-sky-400 to-blue-600 border-blue-700',
  'from-emerald-400 to-emerald-600 border-emerald-700',
  'from-purple-500 to-violet-700 border-violet-800',
  'from-pink-500 to-fuchsia-600 border-fuchsia-700',
];

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const RACE_STEPS = 8;
const BALLOON_DURATION_SEC = 45;

export const GamesSection: React.FC<GamesSectionProps> = ({
  themeId,
  vocab,
  bestMemoryMoves,
  matchingCompletedCount,
  raceCompletedCount,
  balloonBestScore,
  onCompleteMemory,
  onCompleteMatching,
  onCompleteRace,
  onCompleteBalloon,
  onSpeakText,
}) => {
  const [mode, setMode] = useState<GameModeId | null>(null);
  const isOrange = themeId === 2;
  const accentBtn = isOrange ? 'bg-[#9A3412] text-white' : 'bg-[#4C1D95] text-white';

  useEffect(() => {
    setMode(null);
  }, [themeId]);

  // ==========================================
  // 1. EŞLEŞME VE HAFIZA OYUNU
  // ==========================================
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [memoryWon, setMemoryWon] = useState(false);

  const initMemoryGame = useCallback(() => {
    const chosen = shuffleArray(vocab).slice(0, 6);
    const deck: MemoryCard[] = [];
    chosen.forEach((item) => {
      deck.push({ uid: `${item.id}_en`, pairId: item.id, kind: 'en', item });
      deck.push({ uid: `${item.id}_tr`, pairId: item.id, kind: 'tr', item });
    });
    setCards(shuffleArray(deck));
    setFlippedUids([]);
    setMatchedPairIds([]);
    setMoves(0);
    setMemoryWon(false);
  }, [vocab]);

  useEffect(() => {
    initMemoryGame();
  }, [initMemoryGame]);

  const handleMemoryCardClick = (card: MemoryCard) => {
    if (flippedUids.length >= 2) return;
    if (flippedUids.includes(card.uid)) return;
    if (matchedPairIds.includes(card.pairId)) return;

    playFlipSound();
    if (card.kind === 'en') {
      onSpeakText(card.item.word, `mem_${card.uid}`);
    }

    const nextFlipped = [...flippedUids, card.uid];
    setFlippedUids(nextFlipped);

    if (nextFlipped.length === 2) {
      const nextMoves = moves + 1;
      setMoves(nextMoves);
      const firstCard = cards.find((c) => c.uid === nextFlipped[0]);
      const secondCard = card;

      if (firstCard && firstCard.pairId === secondCard.pairId) {
        playSuccessSound();
        onSpeakText(secondCard.item.word, `mem_match_${secondCard.pairId}`);
        const nextMatched = [...matchedPairIds, secondCard.pairId];
        setMatchedPairIds(nextMatched);
        setFlippedUids([]);

        if (nextMatched.length === cards.length / 2) {
          setMemoryWon(true);
          playRewardSound();
          onCompleteMemory(nextMoves);
        }
      } else {
        setTimeout(() => {
          setFlippedUids([]);
        }, 850);
      }
    }
  };

  // ==========================================
  // 2. GÖRSELİ KELİME İLE EŞLEŞTİRME
  // ==========================================
  const [matchRoundItems, setMatchRoundItems] = useState<VocabItem[]>([]);
  const [shuffledWords, setShuffledWords] = useState<VocabItem[]>([]);
  const [selectedPictureId, setSelectedPictureId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongFlashId, setWrongFlashId] = useState<string | null>(null);
  const [matchingWon, setMatchingWon] = useState(false);

  const initMatchingGame = useCallback(() => {
    const chosen = shuffleArray(vocab).slice(0, 6);
    setMatchRoundItems(chosen);
    setShuffledWords(shuffleArray(chosen));
    setSelectedPictureId(null);
    setMatchedIds([]);
    setWrongFlashId(null);
    setMatchingWon(false);
  }, [vocab]);

  useEffect(() => {
    initMatchingGame();
  }, [initMatchingGame]);

  const handleWordMatchClick = (wordItem: VocabItem) => {
    if (!selectedPictureId) return;
    if (matchedIds.includes(wordItem.id)) return;

    if (selectedPictureId === wordItem.id) {
      playSuccessSound();
      onSpeakText(wordItem.word, `match_${wordItem.id}`);
      const nextMatched = [...matchedIds, wordItem.id];
      setMatchedIds(nextMatched);
      setSelectedPictureId(null);

      if (nextMatched.length === matchRoundItems.length) {
        setMatchingWon(true);
        playRewardSound();
        onCompleteMatching();
      }
    } else {
      playErrorSound();
      setWrongFlashId(wordItem.id);
      setTimeout(() => setWrongFlashId(null), 500);
    }
  };

  // ==========================================
  // 3. DOĞRU KELİMEYİ SEÇEREK YARIŞMACIYI FİNALE ULAŞTIRMA
  // ==========================================
  const [raceQuestions, setRaceQuestions] = useState<RaceQuestion[]>([]);
  const [raceStep, setRaceStep] = useState(0);
  const [raceFeedback, setRaceFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [raceWon, setRaceWon] = useState(false);
  const [raceMistakes, setRaceMistakes] = useState(0);

  const initRaceGame = useCallback(() => {
    const targets = shuffleArray(vocab).slice(0, RACE_STEPS);
    const qs: RaceQuestion[] = targets.map((target) => {
      const distractors = shuffleArray(vocab.filter((v) => v.id !== target.id)).slice(0, 2);
      return {
        target,
        options: shuffleArray([target, ...distractors]),
      };
    });
    setRaceQuestions(qs);
    setRaceStep(0);
    setRaceFeedback('idle');
    setRaceWon(false);
    setRaceMistakes(0);
  }, [vocab]);

  useEffect(() => {
    initRaceGame();
  }, [initRaceGame]);

  const handleRaceChoice = (chosen: VocabItem) => {
    if (raceWon || raceFeedback === 'correct') return;
    const currentQ = raceQuestions[raceStep];
    if (!currentQ) return;

    if (chosen.id === currentQ.target.id) {
      playSuccessSound();
      onSpeakText(currentQ.target.word, `race_${currentQ.target.id}`);
      setRaceFeedback('correct');

      setTimeout(() => {
        const nextStep = raceStep + 1;
        setRaceStep(nextStep);
        setRaceFeedback('idle');
        if (nextStep >= RACE_STEPS) {
          setRaceWon(true);
          playRewardSound();
          onCompleteRace();
        }
      }, 650);
    } else {
      playErrorSound();
      setRaceMistakes((m) => m + 1);
      setRaceFeedback('wrong');
      setTimeout(() => setRaceFeedback('idle'), 700);
    }
  };

  // ==========================================
  // 4. SESTEKİ KELİMEYİ BALONDA BULUP PATLATMA (SÜRELİ)
  // ==========================================
  const [balloonActive, setBalloonActive] = useState(false);
  const [balloonFinished, setBalloonFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(BALLOON_DURATION_SEC);
  const [balloonScore, setBalloonScore] = useState(0);
  const [poppedCount, setPoppedCount] = useState(0);
  const [balloonOptions, setBalloonOptions] = useState<VocabItem[]>([]);
  const [targetBalloon, setTargetBalloon] = useState<VocabItem | null>(null);
  const [poppedId, setPoppedId] = useState<string | null>(null);
  const [wrongBalloonId, setWrongBalloonId] = useState<string | null>(null);

  const balloonScoreRef = useRef(0);
  const poppedCountRef = useRef(0);
  balloonScoreRef.current = balloonScore;
  poppedCountRef.current = poppedCount;

  const setupNextBalloonRound = useCallback(
    (speakNow = true) => {
      const roundItems = shuffleArray(vocab).slice(0, 6);
      const target = roundItems[Math.floor(Math.random() * roundItems.length)];
      setBalloonOptions(roundItems);
      setTargetBalloon(target);
      setPoppedId(null);
      setWrongBalloonId(null);
      if (speakNow && target) {
        onSpeakText(target.word, `balloon_target_${target.id}_${Date.now()}`);
      }
    },
    [vocab, onSpeakText]
  );

  const startBalloonGame = () => {
    setBalloonScore(0);
    setPoppedCount(0);
    setTimeLeft(BALLOON_DURATION_SEC);
    setBalloonFinished(false);
    setBalloonActive(true);
    setupNextBalloonRound(true);
  };

  useEffect(() => {
    if (!balloonActive || balloonFinished) return;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setBalloonActive(false);
          setBalloonFinished(true);
          playRewardSound();
          onCompleteBalloon(balloonScoreRef.current, poppedCountRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [balloonActive, balloonFinished, onCompleteBalloon]);

  // Stop timer if switching away from balloon mode
  useEffect(() => {
    if (mode !== 'balloon' && balloonActive) {
      setBalloonActive(false);
    }
  }, [mode, balloonActive]);

  const handleBalloonClick = (item: VocabItem) => {
    if (!balloonActive || !targetBalloon || poppedId) return;

    if (item.id === targetBalloon.id) {
      playSuccessSound();
      setPoppedId(item.id);
      setBalloonScore((s) => s + 10);
      setPoppedCount((c) => c + 1);

      setTimeout(() => {
        setupNextBalloonRound(true);
      }, 480);
    } else {
      playErrorSound();
      setWrongBalloonId(item.id);
      setTimeout(() => setWrongBalloonId(null), 450);
    }
  };

  const gameCards: {
    id: GameModeId;
    title: string;
    shortLabel: string;
    desc: string;
    stat: string;
    icon: React.FC<{ className?: string }>;
    symbol: string;
  }[] = [
    {
      id: 'memory',
      title: '1. Eşleşme ve Hafıza',
      shortLabel: 'Eşleşme ve Hafıza',
      desc: 'Kapalı kartları çevir, görselli İngilizce kelimeyi Türkçe anlamıyla eşleştir.',
      stat: bestMemoryMoves !== null ? `En İyi: ${bestMemoryMoves} hamle` : '6 çift kart',
      icon: Sparkles,
      symbol: '🃏',
    },
    {
      id: 'matching',
      title: '2. Görseli Kelime ile Eşleştirme',
      shortLabel: 'Görsel-Kelime Eşleştirme',
      desc: 'Resme bak, doğru İngilizce kelimeyi seçerek tüm çiftleri tamamla.',
      stat: matchingCompletedCount > 0 ? `${matchingCompletedCount} tur tamamlandı` : 'Sesli eşleştirme',
      icon: ImageIcon,
      symbol: '🖼️',
    },
    {
      id: 'race',
      title: '3. Doğru Kelimeyi Seçerek Finale Ulaşma',
      shortLabel: 'Finale Ulaşma Yarışı',
      desc: '8 soruluk pistte doğru kelimeleri bil ve yarışmacıyı bitiş bayrağına ulaştır!',
      stat: raceCompletedCount > 0 ? `${raceCompletedCount} kez kazanıldı` : '8 adımlı yarış',
      icon: Flag,
      symbol: '🏁',
    },
    {
      id: 'balloon',
      title: '4. Sesteki Kelimeyi Balonda Bulup Patlatma',
      shortLabel: 'Süreli Balon Patlatma',
      desc: '45 saniyede kadın sesinin okuduğu kelimeyi renkli balonlar arasında bul ve patlat!',
      stat: balloonBestScore !== null ? `Rekor: ${balloonBestScore} puan` : '45 saniye süreli',
      icon: Clock,
      symbol: '🎈',
    },
  ];

  const currentRaceQ = raceQuestions[raceStep];
  const iconBoxBg = isOrange ? 'bg-[#9A3412] text-white' : 'bg-[#4C1D95] text-white';
  const cardHoverBorder = isOrange ? 'hover:border-orange-500' : 'hover:border-purple-600';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Eşleştirme ve Hafıza Oyunları
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {mode === null
              ? 'Oynamak istediğin oyunun kutucuğuna tıkla ve eğlenceye başla!'
              : 'Oyunu tamamlayıp yıldız ve rozet kazanabilir, istediğin zaman diğer oyunlara geçebilirsin.'}
          </p>
        </div>

        {mode !== null && (
          <button
            type="button"
            onClick={() => setMode(null)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Oyun Kutularına Dön</span>
          </button>
        )}
      </div>

      {/* 4 GAME BOXES HUB (shown before selecting a game) */}
      {mode === null && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gameCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setMode(card.id)}
                className={`group bg-white border-2 border-slate-200 ${cardHoverBorder} rounded-2xl p-5 sm:p-6 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md cursor-pointer flex flex-col justify-between gap-5`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-14 h-14 rounded-2xl ${iconBoxBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl leading-none select-none" aria-hidden="true">
                      {card.symbol}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 group-hover:bg-slate-900 group-hover:text-white text-slate-800 text-xs font-extrabold transition-colors whitespace-nowrap shrink-0">
                    Oyna
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 tabular-nums">
                  <span>{card.stat}</span>
                  <span className={isOrange ? 'text-orange-800' : 'text-purple-800'}>
                    Tıkla ve Başla
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Compact switcher bar when inside a game */}
      {mode !== null && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 bg-slate-100 rounded-2xl">
          {gameCards.map((tab) => {
            const Icon = tab.icon;
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setMode(tab.id)}
                className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  active ? accentBtn : 'text-slate-700 hover:bg-white/70 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* GAME 1: EŞLEŞME VE HAFIZA */}
      {mode === 'memory' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-sm font-bold text-slate-700 tabular-nums">
              <span>Hamle: {moves}</span>
              <span>·</span>
              <span>Eşleşen: {matchedPairIds.length} / 6</span>
              {bestMemoryMoves !== null && (
                <>
                  <span>·</span>
                  <span className="text-emerald-700">En İyi Rekor: {bestMemoryMoves} hamle</span>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={initMemoryGame}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Yeni Oyun</span>
            </button>
          </div>

          {memoryWon && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-extrabold text-emerald-950">
                    Harika! Tüm kartları {moves} hamlede eşleştirdin! (+15 ★)
                  </p>
                  <p className="text-xs text-emerald-800">
                    Yeni kelimelerle oynamak için “Tekrar Oyna” butonuna basabilirsin.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={initMemoryGame}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 whitespace-nowrap cursor-pointer"
              >
                Tekrar Oyna
              </button>
            </div>
          )}

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
            {cards.map((card) => {
              const isRevealed =
                flippedUids.includes(card.uid) || matchedPairIds.includes(card.pairId);
              const isMatched = matchedPairIds.includes(card.pairId);

              return (
                <button
                  key={card.uid}
                  type="button"
                  onClick={() => handleMemoryCardClick(card)}
                  className={`h-32 sm:h-36 rounded-2xl border-2 p-3 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-400'
                      : isRevealed
                      ? 'bg-white border-slate-400 shadow-sm'
                      : isOrange
                      ? 'bg-[#9A3412] border-[#7C2D12] hover:bg-[#B43B0B]'
                      : 'bg-[#4C1D95] border-[#3B0764] hover:bg-[#5B21B6]'
                  }`}
                >
                  {isRevealed ? (
                    card.kind === 'en' ? (
                      <div className="flex flex-col items-center gap-1.5 text-center">
                        <WordIllustration
                          illustrationKey={card.item.illustrationKey}
                          className="w-16 h-16"
                        />
                        <span className="text-sm sm:text-base font-extrabold text-slate-900">
                          {card.item.word}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-center">
                        <span className="text-xs font-bold text-slate-500">Türkçesi</span>
                        <span className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                          {card.item.turkish}
                        </span>
                      </div>
                    )
                  ) : (
                    <span className="text-2xl font-extrabold text-white/85">?</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* GAME 2: GÖRSELİ KELİME İLE EŞLEŞTİRME */}
      {mode === 'matching' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold text-slate-700 tabular-nums">
              Soldan bir görsel seç, sağdan doğru İngilizce kelimeyi eşleştir! · Tamamlanan Tur:{' '}
              {matchingCompletedCount}
            </p>
            <button
              type="button"
              onClick={initMatchingGame}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Yeni Görseller Getir</span>
            </button>
          </div>

          {matchingWon && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <p className="font-extrabold text-emerald-950">
                  Mükemmel! Bütün görselleri doğru kelimelerle eşleştirdin! (+15 ★)
                </p>
              </div>
              <button
                type="button"
                onClick={initMatchingGame}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 whitespace-nowrap cursor-pointer"
              >
                Yeni Tur Başlat
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Visual Pictures */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                1. Görseli Seç
              </p>
              <div className="grid grid-cols-2 gap-3">
                {matchRoundItems.map((item) => {
                  const isMatched = matchedIds.includes(item.id);
                  const isSelected = selectedPictureId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isMatched}
                      onClick={() => setSelectedPictureId(item.id)}
                      className={`rounded-xl border-2 p-3 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer disabled:cursor-default ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-400 opacity-70'
                          : isSelected
                          ? isOrange
                            ? 'bg-orange-50 border-[#9A3412] ring-2 ring-orange-400'
                            : 'bg-purple-50 border-[#4C1D95] ring-2 ring-purple-400'
                          : 'bg-white border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <WordIllustration
                        illustrationKey={item.illustrationKey}
                        className="w-16 h-16"
                      />
                      <span className="text-xs font-bold text-slate-600">{item.turkish}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: English Words */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                2. Doğru İngilizce Kelimeye Tıkla
              </p>
              <div className="space-y-2.5">
                {shuffledWords.map((item) => {
                  const isMatched = matchedIds.includes(item.id);
                  const isWrong = wrongFlashId === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`rounded-xl border-2 p-3 flex items-center justify-between gap-3 transition-colors ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 opacity-75'
                          : isWrong
                          ? 'bg-red-50 border-red-500'
                          : 'bg-white border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <button
                        type="button"
                        disabled={isMatched}
                        onClick={() => handleWordMatchClick(item)}
                        className="flex-1 text-left font-extrabold text-base sm:text-lg text-slate-900 cursor-pointer disabled:cursor-default py-1"
                      >
                        {item.word}
                      </button>
                      <button
                        type="button"
                        onClick={() => onSpeakText(item.word, `match_word_${item.id}`)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                        title="Dinle"
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

      {/* GAME 3: DOĞRU KELİMEYİ SEÇEREK YARIŞMACIYI FİNALE ULAŞTIRMA */}
      {mode === 'race' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-bold text-slate-700 tabular-nums">
              Adım: {Math.min(raceStep, RACE_STEPS)} / {RACE_STEPS} · Tamamlanan Yarış:{' '}
              {raceCompletedCount}
            </div>
            <button
              type="button"
              onClick={initRaceGame}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Yarışı Sıfırla</span>
            </button>
          </div>

          {/* Visual Race Track */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-600">
              <span>BAŞLANGIÇ</span>
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <Flag className="w-4 h-4" />
                FİNAL
              </span>
            </div>

            <div className="relative h-16 bg-slate-200/80 rounded-xl border border-slate-300 flex items-center px-3 overflow-hidden">
              {/* Step markers */}
              <div className="w-full flex items-center justify-between relative z-0">
                {Array.from({ length: RACE_STEPS + 1 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold tabular-nums ${
                      idx <= raceStep
                        ? isOrange
                          ? 'bg-[#C2410C] text-white'
                          : 'bg-[#5B21B6] text-white'
                        : 'bg-white text-slate-500 border border-slate-300'
                    }`}
                  >
                    {idx === RACE_STEPS ? '★' : idx + 1}
                  </div>
                ))}
              </div>

              {/* Progress fill */}
              <div
                className={`absolute left-0 top-0 bottom-0 opacity-20 transition-all duration-300 ${
                  isOrange ? 'bg-orange-600' : 'bg-purple-700'
                }`}
                style={{ width: `${(raceStep / RACE_STEPS) * 100}%` }}
              />

              {/* Runner Mascot */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300 z-10 pointer-events-none"
                style={{
                  left: `calc(${Math.min(100, (raceStep / RACE_STEPS) * 92 + 4)}%)`,
                }}
              >
                <div className="w-11 h-11 rounded-full bg-amber-400 border-2 border-slate-900 shadow-md flex items-center justify-center text-lg">
                  🏃
                </div>
              </div>
            </div>
          </div>

          {raceWon ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-emerald-950">
                  Tebrikler! Yarışmacıyı Finale Ulaştırdın! (+20 ★)
                </h3>
                <p className="text-sm text-emerald-800 tabular-nums">
                  {RACE_STEPS} adımı {raceMistakes} hata ile tamamladın.
                </p>
              </div>
              <button
                type="button"
                onClick={initRaceGame}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer ${accentBtn}`}
              >
                Yeni Yarış Başlat
              </button>
            </div>
          ) : currentRaceQ ? (
            <div className="max-w-2xl mx-auto space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5">
                <div className={`w-28 h-28 rounded-2xl ${currentRaceQ.target.bgTone} border border-slate-200 flex items-center justify-center shrink-0`}>
                  <WordIllustration
                    illustrationKey={currentRaceQ.target.illustrationKey}
                    className="w-24 h-24"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Yarışmacıyı İlerletmek İçin Doğru Kelimeyi Seç
                  </p>
                  <p className="text-xl font-extrabold text-slate-900">
                    Türkçesi: “{currentRaceQ.target.turkish}”
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      onSpeakText(
                        currentRaceQ.target.word,
                        `race_hint_${currentRaceQ.target.id}`
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Sesli İpucu Dinle</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentRaceQ.options.map((opt) => {
                  const isCorrectHighlight =
                    raceFeedback === 'correct' && opt.id === currentRaceQ.target.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleRaceChoice(opt)}
                      className={`py-4 px-5 rounded-xl border-2 text-lg font-extrabold transition-all cursor-pointer ${
                        isCorrectHighlight
                          ? 'bg-emerald-600 border-emerald-600 text-white scale-[1.02]'
                          : 'bg-white border-slate-200 hover:border-slate-400 text-slate-900'
                      }`}
                    >
                      {opt.word}
                    </button>
                  );
                })}
              </div>

              {raceFeedback === 'wrong' && (
                <p className="text-center text-sm font-bold text-red-700">
                  Yanlış kelime! Resme ve sesli ipucuna bakarak tekrar seç.
                </p>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* GAME 4: SESTEKİ KELİMEYİ BALONDA BULUP PATLATMA (SÜRELİ) */}
      {mode === 'balloon' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-700 tabular-nums">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg ${
                  timeLeft <= 10 && balloonActive
                    ? 'bg-red-100 text-red-800'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                <Clock className="w-4 h-4" />
                Süre: {timeLeft} sn
              </span>
              <span>Puan: {balloonScore}</span>
              <span>·</span>
              <span>Patlatılan Balon: {poppedCount}</span>
              {balloonBestScore !== null && (
                <>
                  <span>·</span>
                  <span className="text-emerald-700">En Yüksek: {balloonBestScore} puan</span>
                </>
              )}
            </div>

            {balloonActive && (
              <button
                type="button"
                onClick={startBalloonGame}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Yeniden Başlat</span>
              </button>
            )}
          </div>

          {!balloonActive && !balloonFinished && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Volume2 className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 max-w-lg mx-auto">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Sesteki Kelimeyi Balonda Bul ve Patlat!
                </h3>
                <p className="text-sm text-slate-600">
                  45 saniye boyunca kadın seslendirmenin okuduğu İngilizce kelimeyi dinle ve o kelimenin yazdığı balona tıklayarak patlat!
                </p>
              </div>
              <button
                type="button"
                onClick={startBalloonGame}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base cursor-pointer shadow-sm hover:opacity-95 ${accentBtn}`}
              >
                <Play className="w-5 h-5" />
                <span>45 Saniyelik Oyunu Başlat</span>
              </button>
            </div>
          )}

          {balloonActive && targetBalloon && (
            <div className="space-y-6">
              {/* Target Audio Prompt Bar */}
              <div
                className={`rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  isOrange ? 'bg-[#9A3412]' : 'bg-[#4C1D95]'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                    Dinle ve Doğru Balonu Patlat!
                  </p>
                  <p className="text-lg font-extrabold mt-0.5">
                    Kadın seslendirmenin okuduğu kelimeyi bul:
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onSpeakText(targetBalloon.word, `balloon_replay_${targetBalloon.id}`)
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 text-sm font-extrabold hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>Sesi Tekrar Dinle</span>
                </button>
              </div>

              {/* Floating Balloons Arena */}
              <div className="bg-gradient-to-b from-sky-50 to-indigo-50/60 border border-sky-200 rounded-2xl p-6 sm:p-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-items-center">
                  {balloonOptions.map((item, idx) => {
                    const colorCls = BALLOON_COLORS[idx % BALLOON_COLORS.length];
                    const isPopped = poppedId === item.id;
                    const isWrong = wrongBalloonId === item.id;

                    return (
                      <div key={item.id} className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={() => handleBalloonClick(item)}
                          disabled={isPopped}
                          className={`relative w-32 h-36 sm:w-36 sm:h-40 rounded-full bg-gradient-to-br ${colorCls} border-b-4 text-white shadow-md flex flex-col items-center justify-center p-3 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
                            isPopped
                              ? 'scale-125 opacity-0'
                              : isWrong
                              ? 'ring-4 ring-red-500 translate-x-1'
                              : idx % 2 === 0
                              ? '-translate-y-1'
                              : 'translate-y-1'
                          }`}
                        >
                          {/* Balloon Shine */}
                          <span className="absolute top-4 left-5 w-4 h-7 rounded-full bg-white/30 rotate-[-25deg] pointer-events-none" />
                          <span className="text-base sm:text-lg font-extrabold text-center leading-tight drop-shadow-xs">
                            {item.word}
                          </span>
                          {/* Balloon knot */}
                          <span className="absolute -bottom-2 w-4 h-3 bg-inherit rounded-b-md" />
                        </button>
                        {/* Balloon String */}
                        <div className="w-0.5 h-8 bg-slate-400/70" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {balloonFinished && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                <Puzzle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-emerald-950">
                  Süre Doldu! Harika Oynadın!
                </h3>
                <p className="text-base font-bold text-emerald-900 tabular-nums">
                  {poppedCount} Balon Patlattın · Toplam {balloonScore} Puan (+
                  {poppedCount > 0 ? Math.max(5, poppedCount * 2) : 0} ★)
                </p>
              </div>
              <button
                type="button"
                onClick={startBalloonGame}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer ${accentBtn}`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Tekrar Oyna</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
