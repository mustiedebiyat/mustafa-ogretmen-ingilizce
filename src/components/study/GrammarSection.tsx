import React, { useState } from 'react';
import { GrammarLesson, ThemeId } from '../../types/curriculum';
import { CheckCircle2, Lightbulb, MessageCircle, Volume2 } from 'lucide-react';

interface GrammarSectionProps {
  themeId: ThemeId;
  lessons: GrammarLesson[];
  completedLessonIds: string[];
  onCompleteLesson: (lessonId: string) => void;
  onSpeakText: (text: string, key: string) => void;
  speakingKey: string | null;
}

export const GrammarSection: React.FC<GrammarSectionProps> = ({
  themeId,
  lessons,
  completedLessonIds,
  onCompleteLesson,
  onSpeakText,
  speakingKey,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = lessons[selectedIndex] ?? lessons[0];
  const isCompleted = completedLessonIds.includes(current.id);
  const activeTabClass =
    themeId === 1
      ? 'bg-[#115E59] text-white'
      : themeId === 2
      ? 'bg-[#9A3412] text-white'
      : themeId === 3
      ? 'bg-[#4C1D95] text-white'
      : 'bg-[#9F1239] text-white';
  const accentBtnClass =
    themeId === 1
      ? 'bg-[#0F766E] hover:bg-[#115E59] text-white'
      : themeId === 2
      ? 'bg-[#C2410C] hover:bg-[#9A3412] text-white'
      : themeId === 3
      ? 'bg-[#5B21B6] hover:bg-[#4C1D95] text-white'
      : 'bg-[#BE123C] hover:bg-[#9F1239] text-white';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Tema Konu Anlatımı
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Kısa ve anlaşılır konu anlatımlarını oku, örnek cümle ve diyalogları kadın sesiyle dinle.
        </p>
      </div>

      {/* Lesson Step Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {lessons.map((lesson, idx) => {
          const done = completedLessonIds.includes(lesson.id);
          const active = idx === selectedIndex;
          return (
            <button
              key={lesson.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                active
                  ? `${activeTabClass} border-transparent`
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="min-w-0">
                <p className="text-xs font-bold opacity-80 truncate">{lesson.subtitle}</p>
                <p className="text-sm font-bold truncate mt-0.5">{lesson.title}</p>
              </div>
              {done && (
                <CheckCircle2
                  className={`w-5 h-5 shrink-0 ${
                    active ? 'text-amber-300' : 'text-emerald-600'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Lesson Content */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <p className="text-xs font-bold text-slate-500">{current.subtitle}</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
              {current.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onCompleteLesson(current.id)}
            disabled={isCompleted}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                : accentBtnClass
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Bu Konu Tamamlandı (+10 ★)' : 'Konuyu Tamamladım (+10 ★)'}</span>
          </button>
        </div>

        {/* Explanation & Tip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-3">
            <h4 className="text-base font-bold text-slate-900">Nasıl Kullanılır?</h4>
            <p className="text-base text-slate-700 leading-relaxed">
              {current.explanationTr}
            </p>
          </div>
          <div className="lg:col-span-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-amber-950 leading-relaxed">
              {current.tipTr}
            </p>
          </div>
        </div>

        {/* Key Patterns */}
        <div className="space-y-3">
          <h4 className="text-base font-bold text-slate-900">Önemli Kalıplar (Tıkla ve Dinle)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {current.patterns.map((pat, idx) => {
              const key = `pat_${current.id}_${idx}`;
              const isSpeaking = speakingKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onSpeakText(pat.en, key)}
                  className="text-left p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div>
                    <p className="text-base font-extrabold text-slate-900">{pat.en}</p>
                    <p className="text-sm text-slate-600 mt-0.5">{pat.tr}</p>
                  </div>
                  <span
                    className={`p-2.5 rounded-lg shrink-0 ${
                      isSpeaking
                        ? 'bg-emerald-600 text-white'
                        : themeId === 1
                        ? 'bg-teal-100 text-teal-900'
                        : themeId === 2
                        ? 'bg-orange-100 text-orange-900'
                        : themeId === 3
                        ? 'bg-purple-100 text-purple-900'
                        : 'bg-rose-100 text-rose-900'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mini Dialogue */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-slate-900 inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-slate-600" />
              Örnek Sınıf Diyaloğu
            </h4>
            <button
              type="button"
              onClick={() =>
                onSpeakText(
                  current.dialogue.map((d) => d.en).join(' '),
                  `dlg_all_${current.id}`
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Tüm Diyaloğu Dinle
            </button>
          </div>

          <div className="space-y-2.5 bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
            {current.dialogue.map((line, idx) => {
              const key = `dlg_${current.id}_${idx}`;
              const isSpeaking = speakingKey === key;
              return (
                <div
                  key={key}
                  className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-500">{line.speaker}</p>
                    <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                      {line.en}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{line.tr}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSpeakText(line.en, key)}
                    className={`p-2.5 rounded-lg shrink-0 transition-colors cursor-pointer ${
                      isSpeaking
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    title="Satırı dinle"
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
  );
};
