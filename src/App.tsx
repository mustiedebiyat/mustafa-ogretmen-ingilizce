/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { BADGES } from './data/curriculum';
import { StudentProfile, StudyTabId, ThemeId } from './types/curriculum';
import {
  clearActiveStudent,
  evaluateEarnedBadges,
  loadActiveProfile,
  saveProfile,
  startStudentProfile,
  updateStarHistory,
} from './utils/storage';
import { playRewardSound } from './utils/soundFx';
import { AppRoute, Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ThemeWorkspace } from './components/ThemeWorkspace';
import { AppDownloadBox } from './components/AppDownloadBox';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { Award, X } from 'lucide-react';

export default function App() {
  const [route, setRoute] = useState<AppRoute>('home');
  const [selectedTab, setSelectedTab] = useState<StudyTabId>('words');
  const [lastExpandedTheme, setLastExpandedTheme] = useState<ThemeId | null>(null);
  const [subMenuReturnTick, setSubMenuReturnTick] = useState(0);
  const [student, setStudent] = useState<StudentProfile | null>(() => loadActiveProfile());
  const [badgeToast, setBadgeToast] = useState<{ title: string; stars: number } | null>(null);
  const [privacyOpen, setPrivacyOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return window.location.hash === '#gizlilik' || params.get('privacy') === '1';
  });

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const profileSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!badgeToast) return;
    const timer = setTimeout(() => setBadgeToast(null), 5000);
    return () => clearTimeout(timer);
  }, [badgeToast]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#gizlilik') {
        setPrivacyOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleClosePrivacy = () => {
    setPrivacyOpen(false);
    if (window.location.hash === '#gizlilik') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const applyProfileUpdate = (updater: (prev: StudentProfile) => StudentProfile) => {
    setStudent((prev) => {
      if (!prev) return prev;
      const updated = updater(prev);
      const { newBadgeIds, bonusStars } = evaluateEarnedBadges(updated);
      const nextStars = updated.stars + bonusStars;
      const finalProfile: StudentProfile = {
        ...updated,
        stars: nextStars,
        starHistory: updateStarHistory(prev, nextStars),
        earnedBadgeIds:
          newBadgeIds.length > 0
            ? [...updated.earnedBadgeIds, ...newBadgeIds]
            : updated.earnedBadgeIds,
      };

      if (newBadgeIds.length > 0) {
        const firstBadge = BADGES.find((b) => b.id === newBadgeIds[0]);
        if (firstBadge) {
          playRewardSound();
          setBadgeToast({ title: firstBadge.title, stars: bonusStars });
        }
      }

      saveProfile(finalProfile);
      return finalProfile;
    });
  };

  const handleStartStudent = (name: string) => {
    const profile = startStudentProfile(name);
    setStudent(profile);
  };

  const handleLogoutStudent = () => {
    clearActiveStudent();
    setStudent(null);
    setLastExpandedTheme(null);
    setRoute('home');
    setTimeout(() => {
      nameInputRef.current?.focus();
      nameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  const handleNavigate = (nextRoute: AppRoute, scrollToProfile = false) => {
    if (nextRoute !== 'home' && !student) {
      setRoute('home');
      setTimeout(() => {
        nameInputRef.current?.focus();
        nameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
      return;
    }

    setRoute(nextRoute);
    if (nextRoute === 'home' && scrollToProfile) {
      setTimeout(() => {
        profileSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenMyProfile = () => {
    handleNavigate('home', true);
  };

  const handleSelectTheme = (themeId: ThemeId, initialTab: StudyTabId = 'words') => {
    setLastExpandedTheme(themeId);
    setSelectedTab(initialTab);
    const routeMap: Record<ThemeId, AppRoute> = {
      1: 'theme1',
      2: 'theme2',
      3: 'theme3',
      4: 'theme4',
      5: 'theme5',
      6: 'theme6',
    };
    setRoute(routeMap[themeId]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getThemeKey = (themeId: ThemeId) =>
    themeId === 1
      ? 'theme1'
      : themeId === 2
      ? 'theme2'
      : themeId === 3
      ? 'theme3'
      : themeId === 4
      ? 'theme4'
      : themeId === 5
      ? 'theme5'
      : 'theme6';

  const handleRecordWordListened = (themeId: ThemeId, wordId: string) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      if (t.listenedWordIds.includes(wordId)) return prev;
      return {
        ...prev,
        stars: prev.stars + 2,
        [key]: {
          ...t,
          listenedWordIds: [...t.listenedWordIds, wordId],
        },
      };
    });
  };

  const handleToggleMastered = (themeId: ThemeId, wordId: string) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      const already = t.masteredWordIds.includes(wordId);
      const nextMastered = already
        ? t.masteredWordIds.filter((id) => id !== wordId)
        : [...t.masteredWordIds, wordId];
      return {
        ...prev,
        stars: already ? Math.max(0, prev.stars - 3) : prev.stars + 3,
        [key]: {
          ...t,
          masteredWordIds: nextMastered,
        },
      };
    });
  };

  const handleCompleteLesson = (themeId: ThemeId, lessonId: string) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      if (t.completedLessonIds.includes(lessonId)) return prev;
      return {
        ...prev,
        stars: prev.stars + 10,
        [key]: {
          ...t,
          completedLessonIds: [...t.completedLessonIds, lessonId],
        },
      };
    });
  };

  const handleCompleteMemory = (themeId: ThemeId, moves: number) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      const bestMoves =
        t.memoryBestMoves === null ? moves : Math.min(t.memoryBestMoves, moves);
      return {
        ...prev,
        stars: prev.stars + 15,
        [key]: {
          ...t,
          memoryBestMoves: bestMoves,
        },
      };
    });
  };

  const handleCompleteMatching = (themeId: ThemeId) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      return {
        ...prev,
        stars: prev.stars + 15,
        [key]: {
          ...t,
          matchingCompletedCount: t.matchingCompletedCount + 1,
        },
      };
    });
  };

  const handleCompleteRace = (themeId: ThemeId) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      return {
        ...prev,
        stars: prev.stars + 20,
        [key]: {
          ...t,
          raceCompletedCount: t.raceCompletedCount + 1,
        },
      };
    });
  };

  const handleCompleteBalloon = (themeId: ThemeId, score: number, poppedCount: number) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      const earnedStars = poppedCount > 0 ? Math.max(5, poppedCount * 2) : 0;
      const bestScore =
        t.balloonBestScore === null ? score : Math.max(t.balloonBestScore, score);
      return {
        ...prev,
        stars: prev.stars + earnedStars,
        [key]: {
          ...t,
          balloonBestScore: bestScore,
        },
      };
    });
  };

  const handleCompleteSoundHunt = (themeId: ThemeId, score: number, correctCount: number) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      const earnedStars = correctCount > 0 ? Math.max(5, correctCount * 2) : 0;
      const prevBest = t.soundHuntBestScore ?? null;
      const bestScore = prevBest === null ? score : Math.max(prevBest, score);
      return {
        ...prev,
        stars: prev.stars + earnedStars,
        [key]: {
          ...t,
          soundHuntBestScore: bestScore,
        },
      };
    });
  };

  const handleCompleteCarRoad = (themeId: ThemeId, score: number, gatesCleared: number) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      const earnedStars = gatesCleared > 0 ? Math.max(5, gatesCleared * 2) : 0;
      const prevBest = t.carRoadBestScore ?? null;
      const bestScore = prevBest === null ? score : Math.max(prevBest, score);
      return {
        ...prev,
        stars: prev.stars + earnedStars,
        [key]: {
          ...t,
          carRoadBestScore: bestScore,
        },
      };
    });
  };

  const handleCompleteAnimalFeast = (themeId: ThemeId, score: number, fedCount: number) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      const earnedStars = fedCount > 0 ? Math.max(5, fedCount * 2) : 0;
      const prevBest = t.animalFeastBestScore ?? null;
      const bestScore = prevBest === null ? score : Math.max(prevBest, score);
      return {
        ...prev,
        stars: prev.stars + earnedStars,
        [key]: {
          ...t,
          animalFeastBestScore: bestScore,
        },
      };
    });
  };

  const handleCompleteFrogHop = (themeId: ThemeId, score: number, hopsCount: number) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      const earnedStars = hopsCount > 0 ? Math.max(5, hopsCount * 2) : 0;
      const prevBest = t.frogHopBestScore ?? null;
      const bestScore = prevBest === null ? score : Math.max(prevBest, score);
      return {
        ...prev,
        stars: prev.stars + earnedStars,
        [key]: {
          ...t,
          frogHopBestScore: bestScore,
        },
      };
    });
  };

  const handleCompleteWordSearch = (themeId: ThemeId, score: number, foundCount: number) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      const earnedStars = foundCount > 0 ? Math.max(5, foundCount * 3) : 0;
      const prevBest = t.wordSearchBestScore ?? null;
      const bestScore = prevBest === null ? score : Math.max(prevBest, score);
      return {
        ...prev,
        stars: prev.stars + earnedStars,
        [key]: {
          ...t,
          wordSearchBestScore: bestScore,
        },
      };
    });
  };

  const handleCompleteWhackMole = (themeId: ThemeId, score: number, hitsCount: number) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      const earnedStars = hitsCount > 0 ? Math.max(5, hitsCount * 2) : 0;
      const prevBest = t.whackMoleBestScore ?? null;
      const bestScore = prevBest === null ? score : Math.max(prevBest, score);
      return {
        ...prev,
        stars: prev.stars + earnedStars,
        [key]: {
          ...t,
          whackMoleBestScore: bestScore,
        },
      };
    });
  };

  const handleCompletePirateTreasure = (
    themeId: ThemeId,
    score: number,
    unlockedCount: number
  ) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      const earnedStars = unlockedCount > 0 ? Math.max(5, unlockedCount * 3) : 0;
      const prevBest = t.pirateTreasureBestScore ?? null;
      const bestScore = prevBest === null ? score : Math.max(prevBest, score);
      return {
        ...prev,
        stars: prev.stars + earnedStars,
        [key]: {
          ...t,
          pirateTreasureBestScore: bestScore,
        },
      };
    });
  };

  const handleCompleteSentence = (themeId: ThemeId, id: string) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      if (t.sentenceBuildCompletedIds.includes(id)) return prev;
      return {
        ...prev,
        stars: prev.stars + 5,
        [key]: {
          ...t,
          sentenceBuildCompletedIds: [...t.sentenceBuildCompletedIds, id],
        },
      };
    });
  };

  const handleCompleteFill = (themeId: ThemeId, id: string) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      if (t.fillBlankCompletedIds.includes(id)) return prev;
      return {
        ...prev,
        stars: prev.stars + 5,
        [key]: {
          ...t,
          fillBlankCompletedIds: [...t.fillBlankCompletedIds, id],
        },
      };
    });
  };

  const handleFinishQuiz = (themeId: ThemeId, score: number, correctCount: number) => {
    applyProfileUpdate((prev) => {
      const key = getThemeKey(themeId);
      const t = prev[key];
      const bestScore =
        t.quizBestScore === null ? score : Math.max(t.quizBestScore, score);
      return {
        ...prev,
        stars: prev.stars + correctCount * 5,
        [key]: {
          ...t,
          quizBestScore: bestScore,
          quizAttempts: t.quizAttempts + 1,
        },
      };
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        route={route}
        onNavigate={handleNavigate}
        student={student}
        onOpenProfile={handleOpenMyProfile}
      />

      {/* Badge Unlocked Notification */}
      {badgeToast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 max-w-sm bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-amber-400/50 flex items-center gap-3.5"
        >
          <div className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-amber-300">Yeni Ödül Kazandın!</p>
            <p className="text-sm font-extrabold truncate">{badgeToast.title}</p>
            <p className="text-xs text-slate-300 tabular-nums">+{badgeToast.stars} Bonus Yıldız</p>
          </div>
          <button
            type="button"
            onClick={() => setBadgeToast(null)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-300 cursor-pointer"
            aria-label="Bildirimi kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex-1">
        {route === 'home' && (
          <HomeView
            student={student}
            onStartStudent={handleStartStudent}
            onLogoutStudent={handleLogoutStudent}
            onSelectTheme={handleSelectTheme}
            nameInputRef={nameInputRef}
            profileSectionRef={profileSectionRef}
            initialExpandedTheme={lastExpandedTheme}
            subMenuReturnTick={subMenuReturnTick}
          />
        )}

        {route !== 'home' &&
          student && (
            <ThemeWorkspace
              key={route}
              themeId={
                route === 'theme1'
                  ? 1
                  : route === 'theme2'
                  ? 2
                  : route === 'theme3'
                  ? 3
                  : route === 'theme4'
                  ? 4
                  : route === 'theme5'
                  ? 5
                  : 6
              }
              initialTab={selectedTab}
              student={student}
              onBackHome={() => {
                setLastExpandedTheme(
                  route === 'theme1'
                    ? 1
                    : route === 'theme2'
                    ? 2
                    : route === 'theme3'
                    ? 3
                    : route === 'theme4'
                    ? 4
                    : route === 'theme5'
                    ? 5
                    : 6
                );
                setSubMenuReturnTick((tick) => tick + 1);
                setRoute('home');
              }}
            onRecordWordListened={handleRecordWordListened}
            onToggleMastered={handleToggleMastered}
            onCompleteLesson={handleCompleteLesson}
            onCompleteMemory={handleCompleteMemory}
            onCompleteMatching={handleCompleteMatching}
            onCompleteRace={handleCompleteRace}
            onCompleteBalloon={handleCompleteBalloon}
            onCompleteSoundHunt={handleCompleteSoundHunt}
            onCompleteCarRoad={handleCompleteCarRoad}
            onCompleteAnimalFeast={handleCompleteAnimalFeast}
            onCompleteFrogHop={handleCompleteFrogHop}
            onCompleteWordSearch={handleCompleteWordSearch}
            onCompleteWhackMole={handleCompleteWhackMole}
            onCompletePirateTreasure={handleCompletePirateTreasure}
            onCompleteSentence={handleCompleteSentence}
            onCompleteFill={handleCompleteFill}
            onFinishQuiz={handleFinishQuiz}
          />
        )}
      </div>

      <AppDownloadBox />

      <footer className="border-t border-slate-200 bg-white mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-slate-600">
          <p className="font-semibold text-slate-800">
            Mustafa Öğretmenle İngilizce · Hazırlayan: Mustafa ŞAHİN
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span>3. Sınıf Maarif Modele Uygun İngilizce Çalışma Programı</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              className="font-semibold text-purple-800 hover:text-purple-950 underline underline-offset-2 cursor-pointer"
            >
              Gizlilik Politikası
            </button>
          </div>
        </div>
      </footer>

      <PrivacyPolicyModal open={privacyOpen} onClose={handleClosePrivacy} />
    </div>
  );
}
