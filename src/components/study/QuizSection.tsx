import React, { useState } from 'react';
import { QuizQuestion, ThemeId } from '../../types/curriculum';
import { WordIllustration } from '../WordIllustration';
import { THEME_IMAGES } from '../../data/curriculum';
import { playErrorSound, playRewardSound, playSuccessSound } from '../../utils/soundFx';
import { ArrowRight, CheckCircle2, RotateCcw, Star, Trophy, Volume2, XCircle } from 'lucide-react';

interface QuizSectionProps {
  themeId: ThemeId;
  questions: QuizQuestion[];
  bestScore: number | null;
  onFinishQuiz: (scoreOutOf100: number, correctCount: number) => void;
  onSpeakText: (text: string, key: string) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  themeId,
  questions,
  bestScore,
  onFinishQuiz,
  onSpeakText,
}) => {
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const accentBg =
    themeId === 1
      ? 'bg-[#115E59]'
      : themeId === 2
      ? 'bg-[#9A3412]'
      : themeId === 3
      ? 'bg-[#4C1D95]'
      : 'bg-[#9F1239]';
  const current = questions[qIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (idx === current.correctIndex) {
      setCorrectCount((prev) => prev + 1);
      playSuccessSound();
    } else {
      playErrorSound();
    }
  };

  const handleNext = () => {
    if (qIndex < questions.length - 1) {
      setQIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      const finalCorrect = correctCount;
      const score = Math.round((finalCorrect / questions.length) * 100);
      setFinished(true);
      playRewardSound();
      onFinishQuiz(score, finalCorrect);
    }
  };

  const handleRestart = () => {
    setQIndex(0);
    setSelectedOption(null);
    setCorrectCount(0);
    setFinished(false);
  };

  if (finished) {
    const score = Math.round((correctCount / questions.length) * 100);
    const earnedStars = correctCount * 5;
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 text-center max-w-2xl mx-auto space-y-6">
        <img
          src={THEME_IMAGES.rewardTrophy}
          alt="Sınav Başarı Kupası"
          referrerPolicy="no-referrer"
          className="w-28 h-28 mx-auto rounded-2xl object-cover border border-slate-200"
        />
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-500">
            {themeId}. Tema Mini Sınav Sonucu
          </p>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
            {score} / 100 Puan
          </h3>
          <p className="text-base font-medium text-slate-700 tabular-nums">
            {questions.length} sorudan {correctCount} doğru yaptın ve{' '}
            <strong className="text-amber-600">+{earnedStars} Yıldız</strong> kazandın!
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-sm">
          <Trophy className="w-5 h-5 text-amber-600" />
          <span>
            {score >= 80
              ? 'Muhteşem! Konuyu çok iyi öğrenmişsin!'
              : score >= 60
              ? 'Çok güzel! Küçük bir tekrarla 100 puana ulaşabilirsin!'
              : 'Harika bir başlangıç! Kelime kartlarını tekrar edip yeniden dene.'}
          </span>
        </div>

        <div>
          <button
            type="button"
            onClick={handleRestart}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold cursor-pointer hover:opacity-95 ${accentBg}`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Sınavı Tekrar Çöz</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Mini Sınav (Quiz) &amp; Puanlama
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Her doğru cevap 10 puan ve 5 yıldız kazandırır. 80+ puanla tema kahramanı rozeti açılır!
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm font-bold text-slate-700 tabular-nums">
          <span>
            Soru {qIndex + 1} / {questions.length}
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1 text-amber-600">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            Doğru: {correctCount}
          </span>
          {bestScore !== null && (
            <>
              <span>·</span>
              <span className="text-emerald-700">En Yüksek: {bestScore}</span>
            </>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${accentBg}`}
          style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
        <div className="space-y-4 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {current.type === 'picture'
              ? 'Resimli Soru'
              : current.type === 'listening'
              ? 'Dinleme Sorusu (Kadın Seslendirme)'
              : current.type === 'dialogue'
              ? 'Diyalog & Dil Bilgisi'
              : 'Anlam Sorusu'}
          </p>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {current.promptTr}
          </h3>

          {current.promptEn && (
            <p className="text-lg font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 inline-block">
              {current.promptEn}
            </p>
          )}

          {current.illustrationKey && (
            <div className="w-36 h-36 mx-auto rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <WordIllustration
                illustrationKey={current.illustrationKey}
                className="w-28 h-28"
              />
            </div>
          )}

          {current.audioText && (
            <div>
              <button
                type="button"
                onClick={() => onSpeakText(current.audioText!, `quiz_${current.id}`)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold shadow-xs hover:opacity-95 cursor-pointer ${accentBg}`}
              >
                <Volume2 className="w-5 h-5" />
                <span>Sesi Dinle</span>
              </button>
            </div>
          )}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {current.options.map((opt, idx) => {
            const isAnswered = selectedOption !== null;
            const isSelected = selectedOption === idx;
            const isCorrect = idx === current.correctIndex;

            let btnStyle =
              'bg-white border-slate-200 hover:border-slate-400 text-slate-900';
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950';
              } else if (isSelected) {
                btnStyle = 'bg-red-50 border-red-500 text-red-950';
              } else {
                btnStyle = 'bg-slate-50 border-slate-200 text-slate-400';
              }
            }

            return (
              <button
                key={opt}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-xl border-2 text-left font-bold text-base transition-colors flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Next Button */}
        {selectedOption !== null && (
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p
              className={`text-sm font-bold ${
                selectedOption === current.correctIndex
                  ? 'text-emerald-800'
                  : 'text-red-800'
              }`}
            >
              {selectedOption === current.correctIndex ? 'Doğru! ' : 'Yanlış! '}
              {current.explanationTr}
            </p>
            <button
              type="button"
              onClick={handleNext}
              className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-white font-bold text-sm whitespace-nowrap shrink-0 cursor-pointer ${accentBg}`}
            >
              <span>{qIndex < questions.length - 1 ? 'Sonraki Soru' : 'Sınavı Bitir'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
