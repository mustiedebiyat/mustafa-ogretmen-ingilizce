import React, { useRef, useState } from 'react';
import { BADGES, THEMES, THEME_IMAGES } from '../data/curriculum';
import { StudentProfile, StudyTabId, ThemeId } from '../types/curriculum';
import { getThemeCompletionPercent } from '../utils/storage';
import { StarProgressChart } from './StarProgressChart';
import { TeacherAvatar } from './TeacherAvatar';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Gamepad2,
  GraduationCap,
  Headphones,
  Image as ImageIcon,
  Layers,
  ListChecks,
  Lock,
  Medal,
  Puzzle,
  Sparkles,
  Sprout,
  Star,
  Trophy,
  UserPlus,
  X,
} from 'lucide-react';

interface HomeViewProps {
  student: StudentProfile | null;
  savedProfiles: StudentProfile[];
  onStartStudent: (name: string) => void;
  onSelectTheme: (themeId: ThemeId, initialTab?: StudyTabId) => void;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
  profileSectionRef: React.RefObject<HTMLElement | null>;
  initialExpandedTheme?: ThemeId | null;
}

export const HomeView: React.FC<HomeViewProps> = ({
  student,
  savedProfiles,
  onStartStudent,
  onSelectTheme,
  nameInputRef,
  profileSectionRef,
  initialExpandedTheme = null,
}) => {
  const [nameInput, setNameInput] = useState(student?.name ?? '');
  const [nameError, setNameError] = useState('');
  const [expandedThemeId, setExpandedThemeId] = useState<ThemeId | null>(initialExpandedTheme);
  const subMenuRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (trimmed.length < 2) {
      setNameError('Lütfen en az 2 harfli adını yaz.');
      return;
    }
    setNameError('');
    onStartStudent(trimmed);
  };

  const handleThemeClick = (themeId: ThemeId) => {
    if (!student) {
      const trimmed = nameInput.trim();
      if (trimmed.length >= 2) {
        onStartStudent(trimmed);
      } else {
        setNameError('Temaya başlamadan önce yukarıya adını yazmalısın!');
        nameInputRef.current?.focus();
        nameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }

    setExpandedThemeId((prev) => {
      const next = prev === themeId ? null : themeId;
      if (next !== null) {
        setTimeout(() => {
          subMenuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 60);
      }
      return next;
    });
  };

  const theme2Percent = getThemeCompletionPercent(student, 2);
  const theme3Percent = getThemeCompletionPercent(student, 3);

  const renderBadgeIcon = (iconKey: string, unlocked: boolean) => {
    const cls = `w-6 h-6 ${unlocked ? 'text-amber-600' : 'text-slate-400'}`;
    switch (iconKey) {
      case 'sprout':
        return <Sprout className={cls} />;
      case 'headphones':
        return <Headphones className={cls} />;
      case 'book':
        return <BookOpen className={cls} />;
      case 'graduation':
        return <GraduationCap className={cls} />;
      case 'sparkles':
        return <Sparkles className={cls} />;
      case 'puzzle':
        return <Puzzle className={cls} />;
      case 'orangeMedal':
        return <Medal className={`w-6 h-6 ${unlocked ? 'text-orange-700' : 'text-slate-400'}`} />;
      case 'purpleMedal':
        return <Medal className={`w-6 h-6 ${unlocked ? 'text-purple-800' : 'text-slate-400'}`} />;
      case 'trophy':
        return <Trophy className={cls} />;
      default:
        return <Award className={cls} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Hero Section */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 font-medium">
                <img
                  src={THEME_IMAGES.teacherEmblem}
                  alt="Mustafa Öğretmenle İngilizce Amblemi"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                />
                <span>Hazırlayan: <strong className="text-slate-900">Mustafa ŞAHİN</strong></span>
                <span aria-hidden="true">·</span>
                <span>3. Sınıf İngilizce</span>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] p-5 sm:p-6 text-white shadow-sm flex items-center gap-4">
                <div className="shrink-0">
                  <TeacherAvatar className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-sm" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-bold text-amber-200">
                    Hoş Geldin! Haydi Birlikte Öğrenelim
                  </p>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
                    Mustafa Öğretmenle İngilizce
                  </h1>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-700 font-medium max-w-xl leading-relaxed">
                Maarif Modele uygun İngilizce çalışma programı. Bol görselli kelime kartları, kadın seslendirmeli telaffuzlar, eğlenceli oyunlar ve mini sınavlarla öğren!
              </p>
            </div>

            {/* Student Name Entry Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <form onSubmit={handleSubmit} className="space-y-3">
                <label
                  htmlFor="student-name-input"
                  className="block text-sm font-bold text-slate-800"
                >
                  {student
                    ? `Hoş geldin ${student.name}! Başka bir öğrenci adına geçmek için isim yazabilirsin:`
                    : 'Öğrenci Adını Yaz ve Çalışmaya Başla:'}
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    ref={nameInputRef}
                    id="student-name-input"
                    type="text"
                    value={nameInput}
                    onChange={(e) => {
                      setNameInput(e.target.value);
                      if (nameError) setNameError('');
                    }}
                    placeholder="Örn: Elif Yılmaz"
                    className="flex-1 px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{student ? 'Profili Aç' : 'Başla'}</span>
                  </button>
                </div>
                {nameError && (
                  <p className="text-sm font-semibold text-red-700" role="alert">
                    {nameError}
                  </p>
                )}
              </form>

              {savedProfiles.length > 0 && (
                <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">Kayıtlı Öğrenciler:</span>
                  {savedProfiles.slice(0, 5).map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => {
                        setNameInput(p.name);
                        onStartStudent(p.name);
                      }}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        student?.name.toLowerCase() === p.name.toLowerCase()
                          ? 'bg-slate-900 text-white'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {p.name} ({p.stars} ★)
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[260px] bg-orange-950">
            <img
              src={THEME_IMAGES.heroClassroom}
              alt="3. Sınıf İngilizce Sınıfı İllüstrasyonu"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Theme Selection Boxes: 2. Tema (Koyu Turuncu) and 3. Tema (Koyu Mor) */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Çalışacağın Temayı Seç
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Her temada kelimeler, konu anlatımı, sesli resimler, kartlar, oyunlar ve mini sınav seni bekliyor.
            </p>
          </div>
          <span className="text-xs sm:text-sm font-medium text-slate-500 whitespace-nowrap">
            MEB Maarif Modeli · 2 Ayrı Tema
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 2. TEMA: Koyu Turuncu */}
          <button
            type="button"
            onClick={() => handleThemeClick(2)}
            aria-expanded={expandedThemeId === 2}
            className={`group text-left rounded-2xl overflow-hidden bg-gradient-to-br from-[#B43B0B] via-[#9A3412] to-[#7C2D12] text-white shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-400 cursor-pointer flex flex-col justify-between ${
              expandedThemeId === 2 ? 'ring-4 ring-orange-400' : ''
            }`}
          >
            <div className="h-52 w-full overflow-hidden relative bg-orange-950">
              <img
                src={THEMES[2].heroImage}
                alt="2. Tema Classroom Life Görseli"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7C2D12] via-[#7C2D12]/25 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-wider text-orange-200 uppercase">
                    2. Tema
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    Classroom Life
                  </h3>
                </div>
                <span className="text-sm font-bold text-orange-100 tabular-nums whitespace-nowrap">
                  %{theme2Percent} Tamamlandı
                </span>
              </div>
            </div>

            <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-lg font-bold text-orange-50">
                  Sınıf Yaşamı
                </p>
                <p className="text-sm text-orange-100/90 leading-relaxed">
                  {THEMES[2].subtitleTr}. 24 sesli kelime, 4 konu anlatımı, 4 eğlenceli oyun ve 10 soruluk sınav.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-full h-2.5 bg-orange-950/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-300 rounded-full transition-all duration-300"
                    style={{ width: `${theme2Percent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-white pt-1">
                  <span>{expandedThemeId === 2 ? 'Alt Başlıklar Açıldı' : '2. Temayı Aç'}</span>
                  <span className="inline-flex items-center gap-1.5 bg-white/15 group-hover:bg-white/25 px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                    {expandedThemeId === 2 ? 'Başlıkları Gizle' : 'Alt Başlıkları Gör'}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedThemeId === 2 ? 'rotate-180' : ''
                      }`}
                    />
                  </span>
                </div>
              </div>
            </div>
          </button>

          {/* 3. TEMA: Koyu Mor */}
          <button
            type="button"
            onClick={() => handleThemeClick(3)}
            aria-expanded={expandedThemeId === 3}
            className={`group text-left rounded-2xl overflow-hidden bg-gradient-to-br from-[#5B21B6] via-[#4C1D95] to-[#3B0764] text-white shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-400 cursor-pointer flex flex-col justify-between ${
              expandedThemeId === 3 ? 'ring-4 ring-purple-400' : ''
            }`}
          >
            <div className="h-52 w-full overflow-hidden relative bg-purple-950">
              <img
                src={THEMES[3].heroImage}
                alt="3. Tema Personal Life Görseli"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B0764] via-[#3B0764]/25 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-wider text-purple-200 uppercase">
                    3. Tema
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    Personal Life
                  </h3>
                </div>
                <span className="text-sm font-bold text-purple-100 tabular-nums whitespace-nowrap">
                  %{theme3Percent} Tamamlandı
                </span>
              </div>
            </div>

            <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-lg font-bold text-purple-50">
                  Kişisel Hayat
                </p>
                <p className="text-sm text-purple-100/90 leading-relaxed">
                  {THEMES[3].subtitleTr}. 24 sesli kelime, 4 konu anlatımı, 4 eğlenceli oyun ve 10 soruluk sınav.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-full h-2.5 bg-purple-950/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-300 rounded-full transition-all duration-300"
                    style={{ width: `${theme3Percent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-white pt-1">
                  <span>{expandedThemeId === 3 ? 'Alt Başlıklar Açıldı' : '3. Temayı Aç'}</span>
                  <span className="inline-flex items-center gap-1.5 bg-white/15 group-hover:bg-white/25 px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                    {expandedThemeId === 3 ? 'Başlıkları Gizle' : 'Alt Başlıkları Gör'}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedThemeId === 3 ? 'rotate-180' : ''
                      }`}
                    />
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Expanded Sub-Section Icon Boxes Panel */}
        {expandedThemeId !== null && (
          <div
            ref={subMenuRef}
            className={`rounded-2xl border-2 p-5 sm:p-7 space-y-5 shadow-sm transition-all ${
              expandedThemeId === 2
                ? 'bg-orange-50/70 border-orange-300'
                : 'bg-purple-50/70 border-purple-300'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p
                  className={`text-xs font-extrabold uppercase tracking-wider ${
                    expandedThemeId === 2 ? 'text-orange-800' : 'text-purple-900'
                  }`}
                >
                  {THEMES[expandedThemeId].code} · {THEMES[expandedThemeId].titleEn}
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                  Çalışma Alt Başlıkları — İstediğin Kutucuğa Tıkla
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setExpandedThemeId(null)}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer shrink-0"
                aria-label="Alt başlıkları kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {(() => {
              const p =
                expandedThemeId === 2 ? student?.theme2 : student?.theme3;
              const isOrange = expandedThemeId === 2;
              const iconBoxClass = isOrange
                ? 'bg-[#9A3412] text-white'
                : 'bg-[#4C1D95] text-white';
              const hoverBorderClass = isOrange
                ? 'hover:border-orange-500'
                : 'hover:border-purple-600';

              const subBoxes: {
                tab: StudyTabId;
                title: string;
                desc: string;
                stat: string;
                icon: React.FC<{ className?: string }>;
              }[] = [
                {
                  tab: 'words',
                  title: 'Temanın Kelimeleri',
                  desc: 'Sesli telaffuz ve örnek cümleler',
                  stat: `${p?.listenedWordIds.length ?? 0}/24 dinlendi`,
                  icon: BookOpen,
                },
                {
                  tab: 'grammar',
                  title: 'Tema Konu Anlatımı',
                  desc: 'Kalıplar ve örnek sınıf diyalogları',
                  stat: `${p?.completedLessonIds.length ?? 0}/4 konu`,
                  icon: GraduationCap,
                },
                {
                  tab: 'pictures',
                  title: 'Tema Kelimelerinin Resimleri',
                  desc: 'Görsele tıkla, kadın sesiyle dinle',
                  stat: '24 resimli kart',
                  icon: ImageIcon,
                },
                {
                  tab: 'flashcards',
                  title: 'Sesli Kelime Kartları',
                  desc: 'Çevir, dinle ve öğrendiklerini işaretle',
                  stat: `${p?.masteredWordIds.length ?? 0}/24 öğrenildi`,
                  icon: Layers,
                },
                {
                  tab: 'games',
                  title: 'Eşleştirme ve Hafıza Oyunları',
                  desc: 'Hafıza, eşleştirme, yarış ve balon oyunu',
                  stat: '4 farklı oyun',
                  icon: Gamepad2,
                },
                {
                  tab: 'sentences',
                  title: 'Cümle Kurma ve Boşluk Doldurma',
                  desc: 'Kelime dizme ve diyalog tamamlama',
                  stat: `${
                    (p?.sentenceBuildCompletedIds.length ?? 0) +
                    (p?.fillBlankCompletedIds.length ?? 0)
                  }/12 etkinlik`,
                  icon: Puzzle,
                },
                {
                  tab: 'quiz',
                  title: 'Mini Sınav & Puanlama',
                  desc: '10 soruluk resimli ve sesli değerlendirme',
                  stat:
                    p?.quizBestScore !== null && p?.quizBestScore !== undefined
                      ? `Rekor: ${p.quizBestScore} puan`
                      : '10 soru',
                  icon: ListChecks,
                },
              ];

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {subBoxes.map((box) => {
                    const Icon = box.icon;
                    return (
                      <button
                        key={box.tab}
                        type="button"
                        onClick={() => onSelectTheme(expandedThemeId, box.tab)}
                        className={`group bg-white border border-slate-200 ${hoverBorderClass} rounded-2xl p-4 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md cursor-pointer flex flex-col justify-between gap-3`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div
                            className={`w-11 h-11 rounded-xl ${iconBoxClass} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 transition-colors shrink-0 mt-1" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                            {box.title}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {box.desc}
                          </p>
                        </div>
                        <p className="text-xs font-bold tabular-nums text-slate-500 pt-1 border-t border-slate-100">
                          {box.stat}
                        </p>
                      </button>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}
      </section>

      {/* Profil Takip Bölümü ve Ödüller */}
      <section
        ref={profileSectionRef}
        id="profil-takip"
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <img
              src={THEME_IMAGES.rewardTrophy}
              alt="Öğrenci Ödül Kupası"
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
            />
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Profil Takip ve Ödül Köşesi
              </h2>
              <p className="text-sm text-slate-600 mt-0.5">
                {student
                  ? `${student.name} adlı öğrencinin güncel çalışma raporu ve kazandığı rozetler`
                  : 'İlerlemeyi ve rozetleri takip etmek için yukarıdan öğrenci adını girip başla.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs font-medium text-slate-500">Toplam Yıldız Puanı</p>
              <p className="text-2xl font-extrabold text-amber-600 tabular-nums inline-flex items-center gap-1.5">
                <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
                {student ? student.stars : 0}
              </p>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="text-right">
              <p className="text-xs font-medium text-slate-500">Kazanılan Rozet</p>
              <p className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {student ? student.earnedBadgeIds.length : 0} / {BADGES.length}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-orange-50/70 border border-orange-200/80 rounded-xl p-4 space-y-1">
            <p className="text-xs font-bold text-orange-900">2. Tema İlerlemesi</p>
            <p className="text-2xl font-extrabold text-orange-800 tabular-nums">%{theme2Percent}</p>
            <p className="text-xs text-orange-900/80 tabular-nums">
              Dinlenen: {student?.theme2.listenedWordIds.length ?? 0}/24 · Sınav:{' '}
              {student?.theme2.quizBestScore !== null && student?.theme2.quizBestScore !== undefined
                ? `${student.theme2.quizBestScore} puan`
                : 'Henüz yok'}
            </p>
          </div>

          <div className="bg-purple-50/70 border border-purple-200/80 rounded-xl p-4 space-y-1">
            <p className="text-xs font-bold text-purple-900">3. Tema İlerlemesi</p>
            <p className="text-2xl font-extrabold text-purple-900 tabular-nums">%{theme3Percent}</p>
            <p className="text-xs text-purple-900/80 tabular-nums">
              Dinlenen: {student?.theme3.listenedWordIds.length ?? 0}/24 · Sınav:{' '}
              {student?.theme3.quizBestScore !== null && student?.theme3.quizBestScore !== undefined
                ? `${student.theme3.quizBestScore} puan`
                : 'Henüz yok'}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
            <p className="text-xs font-bold text-slate-700">Öğrenilen Kelime Kartı</p>
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {(student?.theme2.masteredWordIds.length ?? 0) +
                (student?.theme3.masteredWordIds.length ?? 0)}{' '}
              / 48
            </p>
            <p className="text-xs text-slate-600">Sesli kelime kartlarında işaretlenen</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
            <p className="text-xs font-bold text-slate-700">Tamamlanan Etkinlikler</p>
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {(student?.theme2.completedLessonIds.length ?? 0) +
                (student?.theme3.completedLessonIds.length ?? 0) +
                (student?.theme2.sentenceBuildCompletedIds.length ?? 0) +
                (student?.theme2.fillBlankCompletedIds.length ?? 0) +
                (student?.theme3.sentenceBuildCompletedIds.length ?? 0) +
                (student?.theme3.fillBlankCompletedIds.length ?? 0)}
            </p>
            <p className="text-xs text-slate-600">Konu anlatımı ve cümle alıştırması</p>
          </div>
        </div>

        {/* Daily Star Accumulation Progress Chart */}
        <StarProgressChart student={student} />

        {/* Rewards / Badges Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Başarı Rozetleri ve Ödüller
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {BADGES.map((badge) => {
              const unlocked = student?.earnedBadgeIds.includes(badge.id) ?? false;
              return (
                <div
                  key={badge.id}
                  className={`rounded-xl border p-4 transition-colors flex flex-col justify-between gap-3 ${
                    unlocked
                      ? 'bg-amber-50/70 border-amber-300'
                      : 'bg-slate-50/70 border-slate-200 opacity-80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        unlocked ? 'bg-white border border-amber-200 shadow-xs' : 'bg-slate-100'
                      }`}
                    >
                      {renderBadgeIcon(badge.iconKey, unlocked)}
                    </div>
                    {unlocked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 leading-snug">
                      {badge.title}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                  <p className="text-xs font-bold tabular-nums text-amber-700">
                    {unlocked ? 'Kazanıldı! (+15 ★)' : `Ödül: +${badge.rewardStars} Yıldız`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
