import React, { useState } from 'react';
import { ThemeId, VocabItem } from '../../types/curriculum';
import { WordIllustration } from '../WordIllustration';
import { Eye, EyeOff, Volume2 } from 'lucide-react';

interface PictureGallerySectionProps {
  themeId: ThemeId;
  vocab: VocabItem[];
  onSpeakWord: (item: VocabItem) => void;
  speakingKey: string | null;
}

export const PictureGallerySection: React.FC<PictureGallerySectionProps> = ({
  themeId,
  vocab,
  onSpeakWord,
  speakingKey,
}) => {
  const [showTurkish, setShowTurkish] = useState(true);
  const [lastClicked, setLastClicked] = useState<VocabItem | null>(null);
  const bannerBg =
    themeId === 1 ? 'bg-[#115E59]' : themeId === 2 ? 'bg-[#9A3412]' : 'bg-[#4C1D95]';

  const handleCardClick = (item: VocabItem) => {
    setLastClicked(item);
    onSpeakWord(item);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Tema Kelimelerinin Resimleri
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            İstediğin resme tıkla! Her resim tıklandığında İngilizcesini kadın sesiyle seslendirir.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowTurkish((prev) => !prev)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          {showTurkish ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showTurkish ? 'Türkçesini Gizle' : 'Türkçesini Göster'}</span>
        </button>
      </div>

      {/* Live Spoken Banner */}
      {lastClicked && (
        <div
          className={`rounded-2xl p-4 sm:p-5 text-white flex items-center justify-between gap-4 ${bannerBg}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shrink-0">
              <WordIllustration
                illustrationKey={lastClicked.illustrationKey}
                className="w-14 h-14"
              />
            </div>
            <div>
              <p className="text-xs font-bold opacity-80">Seslendirilen Kelime</p>
              <p className="text-2xl font-extrabold">{lastClicked.word}</p>
              <p className="text-sm opacity-90">
                {lastClicked.turkish} · “{lastClicked.exampleEn}”
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSpeakWord(lastClicked)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
            <span>Tekrar Dinle</span>
          </button>
        </div>
      )}

      {/* Rich Visual Picture Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {vocab.map((item) => {
          const isSpeaking = speakingKey === `word_${item.id}`;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleCardClick(item)}
              className={`group rounded-2xl border p-4 text-center flex flex-col items-center justify-between gap-3 transition-all duration-150 cursor-pointer ${
                isSpeaking
                  ? themeId === 1
                    ? 'bg-teal-50 border-teal-700 ring-2 ring-teal-600 -translate-y-0.5'
                    : themeId === 2
                    ? 'bg-orange-50 border-orange-600 ring-2 ring-orange-500 -translate-y-0.5'
                    : 'bg-purple-50 border-purple-700 ring-2 ring-purple-600 -translate-y-0.5'
                  : 'bg-white border-slate-200 hover:border-slate-400 hover:-translate-y-0.5 shadow-xs'
              }`}
            >
              <div
                className={`w-full aspect-square rounded-xl ${item.bgTone} flex items-center justify-center relative overflow-hidden`}
              >
                <WordIllustration
                  illustrationKey={item.illustrationKey}
                  className="w-20 h-20 group-hover:scale-110 transition-transform duration-200"
                />
                <span
                  className={`absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    isSpeaking
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/90 text-slate-700 shadow-xs'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </span>
              </div>

              <div className="w-full">
                <p className="text-base font-extrabold text-slate-900 truncate">
                  {item.word}
                </p>
                {showTurkish && (
                  <p className="text-xs font-medium text-slate-500 truncate mt-0.5">
                    {item.turkish}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
