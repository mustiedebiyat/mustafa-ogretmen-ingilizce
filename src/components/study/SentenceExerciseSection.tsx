import React, { useEffect, useState } from 'react';
import {
  FillBlankExercise,
  SentenceBuildExercise,
  ThemeId,
} from '../../types/curriculum';
import { WordIllustration } from '../WordIllustration';
import { playErrorSound, playSuccessSound } from '../../utils/soundFx';
import { CheckCircle2, RotateCcw, Volume2, XCircle } from 'lucide-react';

interface SentenceExerciseSectionProps {
  themeId: ThemeId;
  sentenceBuilds: SentenceBuildExercise[];
  fillBlanks: FillBlankExercise[];
  completedSentenceIds: string[];
  completedFillIds: string[];
  onCompleteSentence: (id: string) => void;
  onCompleteFill: (id: string) => void;
  onSpeakText: (text: string, key: string) => void;
}

function shuffleWords<T>(words: T[]): T[] {
  const copy = [...words];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const SentenceExerciseSection: React.FC<SentenceExerciseSectionProps> = ({
  themeId,
  sentenceBuilds,
  fillBlanks,
  completedSentenceIds,
  completedFillIds,
  onCompleteSentence,
  onCompleteFill,
  onSpeakText,
}) => {
  const [mode, setMode] = useState<'build' | 'fill'>('build');
  const accentBtn =
    themeId === 1
      ? 'bg-[#115E59] text-white'
      : themeId === 2
      ? 'bg-[#9A3412] text-white'
      : themeId === 3
      ? 'bg-[#4C1D95] text-white'
      : themeId === 4
      ? 'bg-[#9F1239] text-white'
      : themeId === 5
      ? 'bg-[#166534] text-white'
      : 'bg-[#1E40AF] text-white';

  // --- SENTENCE BUILD STATE ---
  const [sbIndex, setSbIndex] = useState(0);
  const currentSb = sentenceBuilds[sbIndex] ?? sentenceBuilds[0];
  const [availablePool, setAvailablePool] = useState<{ idx: number; text: string }[]>([]);
  const [chosenTokens, setChosenTokens] = useState<{ idx: number; text: string }[]>([]);
  const [sbFeedback, setSbFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  useEffect(() => {
    const indexed = currentSb.words.map((w, idx) => ({ idx, text: w }));
    setAvailablePool(shuffleWords(indexed));
    setChosenTokens([]);
    setSbFeedback('idle');
  }, [currentSb]);

  const handlePickToken = (token: { idx: number; text: string }) => {
    setChosenTokens((prev) => [...prev, token]);
    setAvailablePool((prev) => prev.filter((t) => t.idx !== token.idx));
    setSbFeedback('idle');
  };

  const handleRemoveToken = (token: { idx: number; text: string }) => {
    setChosenTokens((prev) => prev.filter((t) => t.idx !== token.idx));
    setAvailablePool((prev) => [...prev, token]);
    setSbFeedback('idle');
  };

  const handleCheckSentence = () => {
    const built = chosenTokens.map((t) => t.text).join(' ');
    if (built === currentSb.targetEn) {
      setSbFeedback('correct');
      playSuccessSound();
      onSpeakText(currentSb.targetEn, `sb_${currentSb.id}`);
      onCompleteSentence(currentSb.id);
    } else {
      setSbFeedback('wrong');
      playErrorSound();
    }
  };

  // --- FILL IN THE BLANK STATE ---
  const [fbIndex, setFbIndex] = useState(0);
  const currentFb = fillBlanks[fbIndex] ?? fillBlanks[0];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [fbFeedback, setFbFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  useEffect(() => {
    setSelectedOption(null);
    setFbFeedback('idle');
  }, [currentFb]);

  const handleSelectBlankOption = (opt: string) => {
    setSelectedOption(opt);
    if (opt === currentFb.answer) {
      setFbFeedback('correct');
      playSuccessSound();
      onSpeakText(currentFb.fullSentenceEn, `fb_${currentFb.id}`);
      onCompleteFill(currentFb.id);
    } else {
      setFbFeedback('wrong');
      playErrorSound();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Cümle Kurma ve Boşluk Doldurma
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Temadaki dil bilgisi kalıplarıyla kendi İngilizce cümlelerini kur!
          </p>
        </div>

        <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start">
          <button
            type="button"
            onClick={() => setMode('build')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
              mode === 'build' ? accentBtn : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cümle Kurma ({completedSentenceIds.length}/{sentenceBuilds.length})
          </button>
          <button
            type="button"
            onClick={() => setMode('fill')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
              mode === 'fill' ? accentBtn : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Boşluk Doldurma ({completedFillIds.length}/{fillBlanks.length})
          </button>
        </div>
      </div>

      {mode === 'build' ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {sentenceBuilds.map((item, idx) => {
                const done = completedSentenceIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSbIndex(idx)}
                    className={`w-9 h-9 rounded-lg text-xs font-extrabold tabular-nums transition-colors cursor-pointer ${
                      idx === sbIndex
                        ? accentBtn
                        : done
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => onSpeakText(currentSb.targetEn, `sb_hint_${currentSb.id}`)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>İpucu: Cümleyi Dinle</span>
            </button>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
            {currentSb.illustrationKey && (
              <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                <WordIllustration
                  illustrationKey={currentSb.illustrationKey}
                  className="w-12 h-12"
                />
              </div>
            )}
            <div>
              <p className="text-xs font-bold text-slate-500">Türkçe Anlamı</p>
              <p className="text-lg font-extrabold text-slate-900">
                “{currentSb.turkishHint}”
              </p>
            </div>
          </div>

          {/* Sentence Construction Tray */}
          <div className="min-h-[76px] rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-4 flex flex-wrap items-center gap-2">
            {chosenTokens.length === 0 ? (
              <span className="text-sm text-slate-400 font-medium">
                Aşağıdaki kelimelere sırayla tıklayarak cümleyi buraya kur...
              </span>
            ) : (
              chosenTokens.map((token) => (
                <button
                  key={token.idx}
                  type="button"
                  onClick={() => handleRemoveToken(token)}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-slate-300 text-slate-900 font-bold text-sm sm:text-base hover:border-red-400 transition-colors cursor-pointer"
                >
                  {token.text}
                </button>
              ))
            )}
          </div>

          {/* Available Word Pool */}
          <div className="flex flex-wrap gap-2.5">
            {availablePool.map((token) => (
              <button
                key={token.idx}
                type="button"
                onClick={() => handlePickToken(token)}
                className={`px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base text-white transition-transform hover:-translate-y-0.5 cursor-pointer ${
                  themeId === 1
                    ? 'bg-[#0F766E] hover:bg-[#115E59]'
                    : themeId === 2
                    ? 'bg-[#C2410C] hover:bg-[#9A3412]'
                    : themeId === 3
                    ? 'bg-[#5B21B6] hover:bg-[#4C1D95]'
                    : themeId === 4
                    ? 'bg-[#BE123C] hover:bg-[#9F1239]'
                    : themeId === 5
                    ? 'bg-[#15803D] hover:bg-[#166534]'
                    : 'bg-[#1D4ED8] hover:bg-[#1E40AF]'
                }`}
              >
                {token.text}
              </button>
            ))}
          </div>

          {sbFeedback === 'correct' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-sm font-extrabold text-emerald-950">
                  Harika! Doğru cümle: “{currentSb.targetEn}” (+5 ★)
                </span>
              </div>
              {sbIndex < sentenceBuilds.length - 1 && (
                <button
                  type="button"
                  onClick={() => setSbIndex((i) => i + 1)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer whitespace-nowrap"
                >
                  Sonraki Cümle
                </button>
              )}
            </div>
          )}

          {sbFeedback === 'wrong' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2.5 text-red-900">
              <XCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span className="text-sm font-bold">
                Kelime sırasını tekrar kontrol edelim. Kelimelerin üzerine tıklayıp yerini değiştirebilirsin!
              </span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleCheckSentence}
              disabled={availablePool.length > 0}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              Kontrol Et
            </button>
            <button
              type="button"
              onClick={() => {
                const indexed = currentSb.words.map((w, idx) => ({ idx, text: w }));
                setAvailablePool(shuffleWords(indexed));
                setChosenTokens([]);
                setSbFeedback('idle');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Sıfırla</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center gap-1.5">
            {fillBlanks.map((item, idx) => {
              const done = completedFillIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFbIndex(idx)}
                  className={`w-9 h-9 rounded-lg text-xs font-extrabold tabular-nums transition-colors cursor-pointer ${
                    idx === fbIndex
                      ? accentBtn
                      : done
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 bg-slate-50 border border-slate-200 rounded-2xl p-5">
            {currentFb.illustrationKey && (
              <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                <WordIllustration
                  illustrationKey={currentFb.illustrationKey}
                  className="w-20 h-20"
                />
              </div>
            )}
            <div className="space-y-2 text-center sm:text-left">
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                {currentFb.promptBefore}{' '}
                <span
                  className={`inline-block min-w-[90px] px-3 py-0.5 rounded-lg border-2 text-center ${
                    fbFeedback === 'correct'
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                      : 'bg-white border-dashed border-slate-400 text-slate-500'
                  }`}
                >
                  {selectedOption ?? '_____'}
                </span>{' '}
                {currentFb.promptAfter}
              </p>
              <p className="text-sm text-slate-600 font-medium">
                Türkçesi: {currentFb.turkishHint}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentFb.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isRight = opt === currentFb.answer;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectBlankOption(opt)}
                  className={`py-3.5 px-5 rounded-xl border-2 font-extrabold text-base transition-colors cursor-pointer ${
                    isSelected && fbFeedback === 'correct'
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : isSelected && fbFeedback === 'wrong'
                      ? 'bg-red-600 border-red-600 text-white'
                      : fbFeedback === 'correct' && isRight
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                      : 'bg-white border-slate-200 hover:border-slate-400 text-slate-900'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {fbFeedback === 'correct' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-sm font-extrabold text-emerald-950">
                  Doğru! “{currentFb.fullSentenceEn}” (+5 ★)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSpeakText(currentFb.fullSentenceEn, `fb_play_${currentFb.id}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-900 text-xs font-bold cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Dinle</span>
                </button>
                {fbIndex < fillBlanks.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setFbIndex((i) => i + 1)}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer"
                  >
                    Sonraki Soru
                  </button>
                )}
              </div>
            </div>
          )}

          {fbFeedback === 'wrong' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2.5 text-red-900">
              <XCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span className="text-sm font-bold">
                Tekrar dene! Türkçe ipucuna bakarak doğru kelimeyi bulabilirsin.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
