import React from 'react';
import { StudentProfile, ThemeId } from '../types/curriculum';
import { TeacherAvatar } from './TeacherAvatar';
import { Star, UserCheck } from 'lucide-react';

export type AppRoute = 'home' | 'theme1' | 'theme2' | 'theme3' | 'theme4';

interface NavbarProps {
  route: AppRoute;
  onNavigate: (route: AppRoute, scrollToProfile?: boolean) => void;
  student: StudentProfile | null;
  onSwitchStudent: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  route,
  onNavigate,
  student,
  onSwitchStudent,
}) => {
  const handleThemeNav = (themeId: ThemeId) => {
    onNavigate(
      themeId === 1 ? 'theme1' : themeId === 2 ? 'theme2' : themeId === 3 ? 'theme3' : 'theme4'
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#4C1D95] hover:bg-[#5B21B6] text-white text-sm sm:text-base font-extrabold tracking-tight transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
        >
          <TeacherAvatar className="w-7 h-7 shrink-0" />
          <span>Mustafa Öğretmenle İngilizce</span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              route === 'home'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Anasayfa
          </button>
          <button
            type="button"
            onClick={() => handleThemeNav(1)}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              route === 'theme1'
                ? 'border-teal-700 text-teal-800 font-semibold'
                : 'border-transparent hover:text-teal-800'
            }`}
          >
            1. Tema
          </button>
          <button
            type="button"
            onClick={() => handleThemeNav(2)}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              route === 'theme2'
                ? 'border-orange-700 text-orange-800 font-semibold'
                : 'border-transparent hover:text-orange-800'
            }`}
          >
            2. Tema
          </button>
          <button
            type="button"
            onClick={() => handleThemeNav(3)}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              route === 'theme3'
                ? 'border-purple-800 text-purple-900 font-semibold'
                : 'border-transparent hover:text-purple-900'
            }`}
          >
            3. Tema
          </button>
          <button
            type="button"
            onClick={() => handleThemeNav(4)}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              route === 'theme4'
                ? 'border-rose-700 text-rose-800 font-semibold'
                : 'border-transparent hover:text-rose-800'
            }`}
          >
            4. Tema
          </button>
          <button
            type="button"
            onClick={() => onNavigate('home', true)}
            className="py-1 border-b-2 border-transparent hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Profil &amp; Ödüller
          </button>
        </nav>

        {/* Zone 3: Single primary student action */}
        <div className="flex items-center shrink-0">
          {student ? (
            <button
              type="button"
              onClick={onSwitchStudent}
              title="Öğrenci Değiştir"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-amber-300" />
              <span className="max-w-[110px] truncate">{student.name}</span>
              <span className="text-slate-400" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 tabular-nums text-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                {student.stars}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Öğrenci Girişi
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
