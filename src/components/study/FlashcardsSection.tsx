import React, { useState } from 'react';
import { ThemeId, VocabItem } from '../../types/curriculum';
import { WordIllustration } from '../WordIllustration';
import { CheckCircle2, ChevronLeft, ChevronRight, RotateCw, Volume2 } from 'lucide-react';
import { playFlipSound } from '../../utils/soundFx';

interface FlashcardsSectionProps {
  themeId: ThemeId;
  vocab: VocabItem[];
  masteredIds: string[];
  onToggleMastered: (wordId: string) => void;
  onSpeakWord: (item: VocabItem) => void;
  onSpeakSentence: (text: string, key: string) => void;
  speakingKey: string | null;
}

export const FlashcardsSection: React.FC<FlashcardsSectionProps> = ({
  themeId,
  vocab,
  masteredIds,
  onToggleMastered,
  onSpeakWord,
  onSpeakSentence,
  speakingKey,
}) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const current = vocab[index] ?? vocab[0];
  const isMastered = masteredIds.includes(current.id);

  const handleFlip = () => {
    playFlipSound();
    setFlipped((prev) => !prev);
  };

  const goNext = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % vocab.length);
  };

  const goPrev = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + vocab.length) % vocab.length);
  };

  const accentBg =
    themeId === 1
      ? 'bg-[#115E59]'
      : themeId === 2
      ? 'bg-[#9A3412]'
      : themeId === 3
      ? 'bg-[#4C1D95]'
      : 'bg-[#9F1239]';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Sesli Kelime Kartları
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Kartı çevirmek için üzerine tıkla, telaffuzunu dinle ve öğrendiklerini işaretle.
          </p>
        </div>
        <p className="text-sm font-bold text-slate-700 tabular-nums">
          Kart {index + 1} / {vocab.length} · Öğrenilen: {masteredIds.length}/{vocab.length}
        </p>
      </div>

      {/* 3D Flip Card Stage */}
      <div className="max-w-xl mx-auto space-y-5">
        <div className="perspective-1000">
          <div
            onClick={handleFlip}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFlip();
              }
            }}
            className={`relative w-full min-h-[360px] transition-transform duration-500 transform-style-3d cursor-pointer ${
              flipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front Face: Illustration + English */}
            <div className="absolute inset-0 backface-hidden bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center justify-between">
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-500">
                <span>{current.category}</span>
                <span className="inline-flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" />
                  Çevirmek için tıkla
                </span>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div
                  className={`w-36 h-36 rounded-2xl ${current.bgTone} flex items-center justify-center`}
                >
                  <WordIllustration
                    illustrationKey={current.illustrationKey}
                    className="w-28 h-28"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                    {current.word}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Okunuşu: /{current.phonetic}/
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSpeakWord(current);
                }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90 cursor-pointer ${
                  speakingKey === `word_${current.id}` ? 'bg-emerald-600' : accentBg
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>İngilizce Dinle</span>
              </button>
            </div>

            {/* Back Face: Turkish Meaning + Example Sentence */}
            <div
              className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col items-center justify-between ${accentBg}`}
            >
              <div className="w-full flex items-center justify-between text-xs font-bold text-white/80">
                <span>Türkçe Anlamı &amp; Örnek Cümle</span>
                <span className="inline-flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" />
                  Ön yüze dön
                </span>
              </div>

              <div className="text-center space-y-4 max-w-md">
                <p className="text-sm font-bold text-amber-200 uppercase tracking-wider">
                  {current.word}
                </p>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                  {current.turkish}
                </h3>
                <div className="bg-white/15 rounded-2xl p-4 space-y-1.5">
                  <p className="text-base font-bold text-white">
                    “{current.exampleEn}”
                  </p>
                  <p className="text-sm text-white/85">{current.exampleTr}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSpeakSentence(current.exampleEn, `fc_sent_${current.id}`);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 text-sm font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Cümleyi Dinle</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation & Mastery Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm font-bold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Önceki</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleMastered(current.id)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
              isMastered
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isMastered ? 'Öğrendim ✓' : 'Biliyorum (+3 ★)'}</span>
          </button>

          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm font-bold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span>Sonraki</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
