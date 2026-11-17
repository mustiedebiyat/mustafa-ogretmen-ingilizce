import React, { useMemo, useState } from 'react';
import { ThemeId, VocabItem } from '../../types/curriculum';
import { WordIllustration } from '../WordIllustration';
import { CheckCircle2, Volume2 } from 'lucide-react';

interface VocabularySectionProps {
  themeId: ThemeId;
  vocab: VocabItem[];
  listenedIds: string[];
  onSpeakWord: (item: VocabItem) => void;
  onSpeakSentence: (text: string, key: string) => void;
  speakingKey: string | null;
}

export const VocabularySection: React.FC<VocabularySectionProps> = ({
  themeId,
  vocab,
  listenedIds,
  onSpeakWord,
  onSpeakSentence,
  speakingKey,
}) => {
  const categories = useMemo(() => {
    const set = new Set(vocab.map((v) => v.category));
    return ['Tümü', ...Array.from(set)];
  }, [vocab]);

  const [activeCategory, setActiveCategory] = useState('Tümü');

  const filtered = useMemo(() => {
    if (activeCategory === 'Tümü') return vocab;
    return vocab.filter((v) => v.category === activeCategory);
  }, [vocab, activeCategory]);

  const activeBtnClass =
    themeId === 1
      ? 'bg-[#115E59] text-white shadow-xs'
      : themeId === 2
      ? 'bg-[#9A3412] text-white shadow-xs'
      : 'bg-[#4C1D95] text-white shadow-xs';
  const speakBtnClass =
    themeId === 1
      ? 'bg-teal-100 text-teal-900 hover:bg-teal-200'
      : themeId === 2
      ? 'bg-orange-100 text-orange-900 hover:bg-orange-200'
      : 'bg-purple-100 text-purple-900 hover:bg-purple-200';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Temanın Kelimeleri
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Kelimelerin üzerine veya hoparlör simgesine dokunarak kadın sesiyle telaffuzunu dinle.
          </p>
        </div>

        {/* Category Segmented Filter */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? activeBtnClass
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isListened = listenedIds.includes(item.id);
          const isSpeakingWord = speakingKey === `word_${item.id}`;
          const isSpeakingSent = speakingKey === `sent_${item.id}`;

          return (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-start gap-4 hover:border-slate-300 transition-colors"
            >
              <button
                type="button"
                onClick={() => onSpeakWord(item)}
                className={`w-20 h-20 rounded-xl ${item.bgTone} border border-slate-200/80 flex items-center justify-center shrink-0 hover:scale-105 transition-transform cursor-pointer`}
                title={`${item.word} kelimesini dinle`}
              >
                <WordIllustration illustrationKey={item.illustrationKey} className="w-16 h-16" />
              </button>

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {item.word}
                      </h3>
                      {isListened && (
                        <CheckCircle2
                          className="w-4 h-4 text-emerald-600 shrink-0"
                          aria-label="Dinlendi"
                        />
                      )}
                    </div>
                    <p className="text-sm font-bold text-slate-700">
                      {item.turkish}{' '}
                      <span className="font-normal text-xs text-slate-500">
                        · Okunuşu: /{item.phonetic}/
                      </span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSpeakWord(item)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSpeakingWord
                        ? 'bg-emerald-600 text-white'
                        : speakBtnClass
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isSpeakingWord ? 'Okunuyor' : 'Dinle'}</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-800">
                      “{item.exampleEn}”
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.exampleTr}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSpeakSentence(item.exampleEn, `sent_${item.id}`)}
                    title="Örnek cümleyi dinle"
                    className={`p-2 rounded-lg transition-colors shrink-0 cursor-pointer ${
                      isSpeakingSent
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
