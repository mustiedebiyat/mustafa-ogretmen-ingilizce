import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ThemeId, VocabItem } from '../../types/curriculum';
import {
  playCrashSound,
  playFlipSound,
  playRewardSound,
  playSuccessSound,
} from '../../utils/soundFx';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Car,
  Flame,
  Play,
  RotateCcw,
  Trophy,
  Volume2,
} from 'lucide-react';

interface CarRoadGameProps {
  themeId: ThemeId;
  vocab: VocabItem[];
  bestScore: number | null;
  accentBtn: string;
  onComplete: (score: number, gatesCleared: number) => void;
  onSpeakText: (text: string, key: string, overrideRate?: number) => void;
}

type GamePhase = 'TITLE_MENU' | 'PLAYING' | 'GAME_OVER';
type Lane = 'left' | 'right';
type SpeedMode = 'relaxed' | 'fast';
type GateStatus = 'approaching' | 'cleared' | 'crashed';

interface GatePair {
  id: number;
  leftWord: VocabItem;
  rightWord: VocabItem;
  correctSide: Lane;
  status: GateStatus;
}

interface CrashDetails {
  targetWord: VocabItem;
  hitWord: VocabItem;
}

const ROAD_HEIGHT_PX = 400;
const GATE_START_Y = -92;
const COLLISION_Y = 264;
const PASS_EXIT_Y = 430;

function pickPair(vocab: VocabItem[], lastTargetId: string | null): GatePair {
  const pool = vocab.length >= 2 ? vocab : [...vocab, ...vocab];
  const candidates = pool.filter((v) => v.id !== lastTargetId);
  const targetPool = candidates.length > 0 ? candidates : pool;
  const target = targetPool[Math.floor(Math.random() * targetPool.length)];

  const others = pool.filter(
    (v) => v.id !== target.id && v.word.toLowerCase() !== target.word.toLowerCase()
  );
  const distractor =
    others.length > 0
      ? others[Math.floor(Math.random() * others.length)]
      : pool[(pool.indexOf(target) + 1) % pool.length];

  const correctSide: Lane = Math.random() < 0.5 ? 'left' : 'right';
  return {
    id: Date.now() + Math.floor(Math.random() * 10000),
    leftWord: correctSide === 'left' ? target : distractor,
    rightWord: correctSide === 'right' ? target : distractor,
    correctSide,
    status: 'approaching',
  };
}

export const CarRoadGame: React.FC<CarRoadGameProps> = ({
  themeId,
  vocab,
  bestScore,
  accentBtn,
  onComplete,
  onSpeakText,
}) => {
  const [phase, setPhase] = useState<GamePhase>('TITLE_MENU');
  const [speedMode, setSpeedMode] = useState<SpeedMode>('relaxed');
  const [carLane, setCarLane] = useState<Lane>('left');
  const [steeringTilt, setSteeringTilt] = useState<-1 | 0 | 1>(0);
  const [score, setScore] = useState(0);
  const [gatesCleared, setGatesCleared] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gate, setGate] = useState<GatePair | null>(null);
  const [gateY, setGateY] = useState(GATE_START_Y);
  const [roadOffset, setRoadOffset] = useState(0);
  const [boosting, setBoosting] = useState(false);
  const [crashDetails, setCrashDetails] = useState<CrashDetails | null>(null);

  const phaseRef = useRef<GamePhase>('TITLE_MENU');
  const carLaneRef = useRef<Lane>('left');
  const gateRef = useRef<GatePair | null>(null);
  const gateYRef = useRef<number>(GATE_START_Y);
  const roadOffsetRef = useRef<number>(0);
  const boostingRef = useRef<boolean>(false);
  const scoreRef = useRef<number>(0);
  const gatesClearedRef = useRef<number>(0);
  const streakRef = useRef<number>(0);
  const speedModeRef = useRef<SpeedMode>('relaxed');
  const lastTargetIdRef = useRef<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const nextGateTimerRef = useRef<number | null>(null);
  const tiltTimerRef = useRef<number | null>(null);

  speedModeRef.current = speedMode;

  const stopLoops = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (nextGateTimerRef.current !== null) {
      window.clearTimeout(nextGateTimerRef.current);
      nextGateTimerRef.current = null;
    }
    if (tiltTimerRef.current !== null) {
      window.clearTimeout(tiltTimerRef.current);
      tiltTimerRef.current = null;
    }
    lastTimeRef.current = null;
  }, []);

  useEffect(() => {
    stopLoops();
    phaseRef.current = 'TITLE_MENU';
    setPhase('TITLE_MENU');
    setGate(null);
    setCrashDetails(null);
  }, [themeId, stopLoops]);

  useEffect(() => {
    return () => stopLoops();
  }, [stopLoops]);

  const speakGateWord = useCallback(
    (g: GatePair, rate?: number) => {
      const target = g.correctSide === 'left' ? g.leftWord : g.rightWord;
      onSpeakText(target.word, `car_gate_${g.id}`, rate);
    },
    [onSpeakText]
  );

  const steerTo = useCallback((lane: Lane) => {
    if (phaseRef.current !== 'PLAYING') return;
    if (carLaneRef.current !== lane) {
      playFlipSound();
      setSteeringTilt(lane === 'left' ? -1 : 1);
      if (tiltTimerRef.current !== null) {
        window.clearTimeout(tiltTimerRef.current);
      }
      tiltTimerRef.current = window.setTimeout(() => setSteeringTilt(0), 180);
    }
    carLaneRef.current = lane;
    setCarLane(lane);
  }, []);

  const spawnNextGate = useCallback(() => {
    if (phaseRef.current !== 'PLAYING') return;
    const next = pickPair(vocab, lastTargetIdRef.current);
    const target = next.correctSide === 'left' ? next.leftWord : next.rightWord;
    lastTargetIdRef.current = target.id;
    gateRef.current = next;
    gateYRef.current = GATE_START_Y;
    setGate(next);
    setGateY(GATE_START_Y);
    speakGateWord(next);
  }, [vocab, speakGateWord]);

  const startGame = () => {
    stopLoops();
    const initialLane: Lane = 'left';
    carLaneRef.current = initialLane;
    scoreRef.current = 0;
    gatesClearedRef.current = 0;
    streakRef.current = 0;
    boostingRef.current = false;
    lastTargetIdRef.current = null;
    roadOffsetRef.current = 0;

    setCarLane(initialLane);
    setSteeringTilt(0);
    setScore(0);
    setGatesCleared(0);
    setStreak(0);
    setBoosting(false);
    setCrashDetails(null);

    const firstGate = pickPair(vocab, null);
    const target = firstGate.correctSide === 'left' ? firstGate.leftWord : firstGate.rightWord;
    lastTargetIdRef.current = target.id;
    gateRef.current = firstGate;
    gateYRef.current = GATE_START_Y;

    phaseRef.current = 'PLAYING';
    setGate(firstGate);
    setGateY(GATE_START_Y);
    setPhase('PLAYING');
    speakGateWord(firstGate);
  };

  useEffect(() => {
    if (phase !== 'PLAYING') return;

    const tick = (now: number) => {
      if (phaseRef.current !== 'PLAYING') return;
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const dt = Math.min(0.05, Math.max(0, (now - lastTimeRef.current) / 1000));
      lastTimeRef.current = now;

      const baseSpeed = speedModeRef.current === 'relaxed' ? 54 : 82;
      const ramp = Math.min(34, gatesClearedRef.current * 2.5);
      const speedPxPerSec = (baseSpeed + ramp) * (boostingRef.current ? 2.4 : 1);

      // Animate scrolling road lane markings
      const nextRoad = (roadOffsetRef.current + speedPxPerSec * 1.9 * dt) % 56;
      roadOffsetRef.current = nextRoad;
      setRoadOffset(nextRoad);

      const activeGate = gateRef.current;
      if (activeGate) {
        const nextY = gateYRef.current + speedPxPerSec * dt;
        gateYRef.current = nextY;
        setGateY(nextY);

        if (activeGate.status === 'approaching' && nextY >= COLLISION_Y) {
          const currentLane = carLaneRef.current;
          const targetWord =
            activeGate.correctSide === 'left' ? activeGate.leftWord : activeGate.rightWord;
          const hitWord = currentLane === 'left' ? activeGate.leftWord : activeGate.rightWord;

          if (currentLane === activeGate.correctSide) {
            // Correct lane: barrier in front of car lifts/clears!
            playSuccessSound();
            const updatedGate: GatePair = { ...activeGate, status: 'cleared' };
            gateRef.current = updatedGate;
            setGate(updatedGate);

            const nextStreak = streakRef.current + 1;
            const bonus = Math.min(4, streakRef.current) * 5;
            const nextScore = scoreRef.current + 10 + bonus;
            const nextCleared = gatesClearedRef.current + 1;

            streakRef.current = nextStreak;
            scoreRef.current = nextScore;
            gatesClearedRef.current = nextCleared;
            setStreak(nextStreak);
            setScore(nextScore);
            setGatesCleared(nextCleared);

            nextGateTimerRef.current = window.setTimeout(() => {
              spawnNextGate();
            }, 480);
          } else {
            // Wrong lane: car hits the barrier wall and game ends!
            playCrashSound();
            const crashedGate: GatePair = { ...activeGate, status: 'crashed' };
            gateRef.current = crashedGate;
            setGate(crashedGate);
            setCrashDetails({ targetWord, hitWord });

            phaseRef.current = 'GAME_OVER';
            setPhase('GAME_OVER');
            boostingRef.current = false;
            setBoosting(false);
            if (gatesClearedRef.current > 0) {
              setTimeout(() => playRewardSound(), 320);
            }
            onComplete(scoreRef.current, gatesClearedRef.current);
            return;
          }
        } else if (activeGate.status === 'cleared' && nextY > PASS_EXIT_Y) {
          gateRef.current = null;
          setGate(null);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimeRef.current = null;
    };
  }, [phase, onComplete, spawnNextGate]);

  // Keyboard support: ArrowLeft/A, ArrowRight/D, ArrowUp/W (boost), Space/R (replay audio)
  useEffect(() => {
    if (phase !== 'PLAYING') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        steerTo('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        steerTo('right');
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        boostingRef.current = true;
        setBoosting(true);
      } else if (e.key === ' ' || e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        if (gateRef.current) speakGateWord(gateRef.current);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        boostingRef.current = false;
        setBoosting(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [phase, steerTo, speakGateWord]);

  const activeTarget = gate
    ? gate.correctSide === 'left'
      ? gate.leftWord
      : gate.rightWord
    : null;
  const earnedStars = gatesCleared > 0 ? Math.max(5, gatesCleared * 2) : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
      {/* Unobtrusive Top HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-700 tabular-nums">
          <span>Geçilen Engel: {gatesCleared}</span>
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
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Car className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Sesli Araba Yolu · Sağ mı Sol mu?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Araban ilerlerken sağda ve solda üzerinde İngilizce kelimeler yazan engeller çıkar.
              Kadın sesinin okuduğu kelimenin şeridine geçersen engel kalkar ve yol açılır; yanlış
              tarafa gidersen araba engele çarpar!
            </p>
          </div>

          {/* Speed Selector */}
          <div className="inline-flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl">
            <button
              type="button"
              onClick={() => setSpeedMode('relaxed')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                speedMode === 'relaxed'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rahat Hız (Önerilen)
            </button>
            <button
              type="button"
              onClick={() => setSpeedMode('fast')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                speedMode === 'fast'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hızlı Yarış
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={startGame}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base cursor-pointer shadow-sm hover:opacity-95 min-h-[48px] ${accentBtn}`}
            >
              <Play className="w-5 h-5" />
              <span>Yarışı Başlat</span>
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE PLAY OR CRASH ARENA */}
      {phase !== 'TITLE_MENU' && (
        <div className="space-y-4">
          {/* Audio Prompt Bar (only during active play) */}
          {phase === 'PLAYING' && activeTarget && (
            <div
              className={`rounded-2xl p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${accentBtn}`}
            >
              <div>
                <p className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                  Dinle ve Doğru Şeride Geç!
                </p>
                <p className="text-base sm:text-lg font-extrabold mt-0.5">
                  Sesin okuduğu kelimenin bulunduğu şeride sür!
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => gate && speakGateWord(gate)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-extrabold hover:bg-amber-100 transition-colors cursor-pointer min-h-[44px]"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Tekrar Dinle</span>
                </button>
                <button
                  type="button"
                  onClick={() => gate && speakGateWord(gate, 0.68)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer min-h-[44px]"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Yavaş</span>
                </button>
              </div>
            </div>
          )}

          {/* Highway Arena Canvas */}
          <div className="max-w-xl mx-auto space-y-3">
            <div
              className={`relative rounded-2xl border-2 border-slate-800 overflow-hidden select-none shadow-md bg-emerald-700 ${
                phase === 'GAME_OVER' ? 'ring-4 ring-rose-500/60' : ''
              }`}
              style={{ height: `${ROAD_HEIGHT_PX}px` }}
            >
              {/* Left & Right Grass Shoulders with scrolling trees/markers */}
              <div className="absolute inset-y-0 left-0 w-7 sm:w-10 bg-emerald-700 border-r-4 border-amber-400/90 overflow-hidden pointer-events-none">
                {Array.from({ length: 9 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="absolute left-1.5 sm:left-2.5 w-4 h-4 rounded-full bg-emerald-900/50"
                    style={{
                      transform: `translate3d(0, ${((idx * 56 + roadOffset) % 504) - 56}px, 0)`,
                    }}
                  />
                ))}
              </div>
              <div className="absolute inset-y-0 right-0 w-7 sm:w-10 bg-emerald-700 border-l-4 border-amber-400/90 overflow-hidden pointer-events-none">
                {Array.from({ length: 9 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="absolute right-1.5 sm:right-2.5 w-4 h-4 rounded-full bg-emerald-900/50"
                    style={{
                      transform: `translate3d(0, ${((idx * 56 + roadOffset) % 504) - 56}px, 0)`,
                    }}
                  />
                ))}
              </div>

              {/* Two-Lane Asphalt Road */}
              <div className="absolute inset-y-0 left-7 right-7 sm:left-10 sm:right-10 bg-slate-800 flex">
                {/* Clickable Left Lane */}
                <button
                  type="button"
                  onClick={() => steerTo('left')}
                  disabled={phase !== 'PLAYING'}
                  aria-label="Sol şeride geç"
                  className={`flex-1 h-full transition-colors cursor-pointer disabled:cursor-default focus:outline-none ${
                    carLane === 'left' && phase === 'PLAYING'
                      ? 'bg-slate-700/35'
                      : 'hover:bg-white/5'
                  }`}
                />

                {/* Scrolling Center Dashed Divider */}
                <div className="relative w-2 h-full overflow-hidden pointer-events-none">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="absolute left-0.5 w-1 h-7 rounded-full bg-white/80"
                      style={{
                        transform: `translate3d(0, ${((idx * 56 + roadOffset) % 560) - 56}px, 0)`,
                      }}
                    />
                  ))}
                </div>

                {/* Clickable Right Lane */}
                <button
                  type="button"
                  onClick={() => steerTo('right')}
                  disabled={phase !== 'PLAYING'}
                  aria-label="Sağ şeride geç"
                  className={`flex-1 h-full transition-colors cursor-pointer disabled:cursor-default focus:outline-none ${
                    carLane === 'right' && phase === 'PLAYING'
                      ? 'bg-slate-700/35'
                      : 'hover:bg-white/5'
                  }`}
                />
              </div>

              {/* Left & Right Word Barriers moving down the road */}
              {gate && (
                <div
                  className="absolute left-7 right-7 sm:left-10 sm:right-10 grid grid-cols-2 gap-3 px-2 sm:px-3 pointer-events-none z-10"
                  style={{
                    transform: `translate3d(0, ${gateY}px, 0)`,
                  }}
                >
                  {(['left', 'right'] as const).map((side) => {
                    const item = side === 'left' ? gate.leftWord : gate.rightWord;
                    const isCarSide = carLane === side;
                    const isClearedThisGate = gate.status === 'cleared' && isCarSide;
                    const isCrashedThisGate = gate.status === 'crashed' && isCarSide;

                    return (
                      <div
                        key={side}
                        className={`relative rounded-xl border-2 px-2 py-2.5 sm:px-3 sm:py-3 shadow-lg text-center transition-all duration-200 ${
                          isClearedThisGate
                            ? 'bg-emerald-500 border-emerald-200 text-white -translate-y-8 opacity-0 scale-90'
                            : isCrashedThisGate
                            ? 'bg-rose-600 border-white text-white scale-105'
                            : 'bg-amber-400 border-slate-950 text-slate-950'
                        }`}
                      >
                        {/* Top Caution Stripes */}
                        <div
                          className={`h-2 rounded-sm mb-1.5 ${
                            isCrashedThisGate
                              ? 'bg-rose-950'
                              : isClearedThisGate
                              ? 'bg-emerald-700'
                              : 'bg-[repeating-linear-gradient(-45deg,#0f172a,#0f172a_6px,#f59e0b_6px,#f59e0b_12px)]'
                          }`}
                        />
                        <p className="text-xs sm:text-base font-extrabold leading-tight break-words">
                          {item.word}
                        </p>
                        {isCrashedThisGate && (
                          <span className="mt-1 inline-block text-xs font-extrabold text-amber-200">
                            💥 ENGEL!
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Player Car */}
              <div
                className="absolute bottom-5 left-7 right-7 sm:left-10 sm:right-10 pointer-events-none z-20"
              >
                <div
                  className="w-1/2 flex justify-center transition-transform duration-150 ease-out"
                  style={{
                    transform: `translate3d(${carLane === 'right' ? '100%' : '0%'}, 0, 0)`,
                  }}
                >
                  <div
                    className="relative transition-transform duration-150"
                    style={{
                      transform: `rotate(${steeringTilt * 8}deg)`,
                    }}
                  >
                    {/* Headlight beams */}
                    {phase === 'PLAYING' && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-10 bg-gradient-to-t from-amber-200/35 to-transparent blur-[2px] pointer-events-none" />
                    )}

                    {/* Top-down Rally Car SVG */}
                    <svg
                      viewBox="0 0 64 96"
                      className="w-14 h-20 sm:w-16 sm:h-24 drop-shadow-lg"
                      aria-label="Oyuncu arabası"
                    >
                      {/* Wheels */}
                      <rect x="4" y="14" width="9" height="18" rx="3" fill="#0f172a" />
                      <rect x="51" y="14" width="9" height="18" rx="3" fill="#0f172a" />
                      <rect x="4" y="64" width="9" height="18" rx="3" fill="#0f172a" />
                      <rect x="51" y="64" width="9" height="18" rx="3" fill="#0f172a" />
                      {/* Car Body */}
                      <rect
                        x="10"
                        y="6"
                        width="44"
                        height="84"
                        rx="14"
                        fill={phase === 'GAME_OVER' ? '#dc2626' : '#ef4444'}
                        stroke="#7f1d1d"
                        strokeWidth="2.5"
                      />
                      {/* Racing Stripe */}
                      <rect x="28" y="8" width="8" height="80" rx="2" fill="#f8fafc" />
                      {/* Windshield */}
                      <path
                        d="M16 28 Q32 22 48 28 L45 43 Q32 40 19 43 Z"
                        fill="#0f172a"
                      />
                      {/* Roof */}
                      <rect x="18" y="45" width="28" height="22" rx="6" fill="#b91c1c" />
                      {/* Rear window */}
                      <rect x="20" y="69" width="24" height="8" rx="3" fill="#0f172a" />
                      {/* Headlights */}
                      <ellipse cx="18" cy="11" rx="4.5" ry="2.5" fill="#fef08a" />
                      <ellipse cx="46" cy="11" rx="4.5" ry="2.5" fill="#fef08a" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Steering Touch Controls */}
            {phase === 'PLAYING' && (
              <div className="grid grid-cols-5 gap-2.5">
                <button
                  type="button"
                  onClick={() => steerTo('left')}
                  className={`col-span-2 py-3.5 px-4 rounded-xl border-2 font-extrabold text-sm sm:text-base inline-flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[52px] ${
                    carLane === 'left'
                      ? `${accentBtn} border-transparent shadow-sm`
                      : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Sola Git</span>
                </button>

                <button
                  type="button"
                  onPointerDown={() => {
                    boostingRef.current = true;
                    setBoosting(true);
                  }}
                  onPointerUp={() => {
                    boostingRef.current = false;
                    setBoosting(false);
                  }}
                  onPointerLeave={() => {
                    boostingRef.current = false;
                    setBoosting(false);
                  }}
                  onPointerCancel={() => {
                    boostingRef.current = false;
                    setBoosting(false);
                  }}
                  className={`col-span-1 py-3.5 px-2 rounded-xl border-2 font-extrabold text-xs inline-flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer min-h-[52px] select-none ${
                    boosting
                      ? 'bg-amber-400 border-amber-600 text-slate-950'
                      : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  }`}
                  title="Basılı tutarak arabayı hızlandır (Yukarı ok)"
                >
                  <ArrowUp className="w-4 h-4" />
                  <span>Hızlan</span>
                </button>

                <button
                  type="button"
                  onClick={() => steerTo('right')}
                  className={`col-span-2 py-3.5 px-4 rounded-xl border-2 font-extrabold text-sm sm:text-base inline-flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[52px] ${
                    carLane === 'right'
                      ? `${accentBtn} border-transparent shadow-sm`
                      : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>Sağa Git</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* GAME OVER PANEL */}
          {phase === 'GAME_OVER' && crashDetails && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center space-y-4 max-w-xl mx-auto">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-600 text-white flex items-center justify-center">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-extrabold text-rose-950">
                  Engele Çarptın! Oyun Bitti
                </h3>
                <p className="text-sm text-rose-900">
                  Sesin söylediği kelime:{' '}
                  <strong>
                    {crashDetails.targetWord.word} ({crashDetails.targetWord.turkish})
                  </strong>
                  {' · '}Çarptığın engel:{' '}
                  <strong>
                    {crashDetails.hitWord.word} ({crashDetails.hitWord.turkish})
                  </strong>
                </p>
                <p className="text-base font-extrabold text-slate-900 tabular-nums pt-1">
                  {gatesCleared} Engel Geçtin · Toplam {score} Puan (+{earnedStars} ★)
                </p>
              </div>
              <button
                type="button"
                onClick={startGame}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm cursor-pointer min-h-[44px] ${accentBtn}`}
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
