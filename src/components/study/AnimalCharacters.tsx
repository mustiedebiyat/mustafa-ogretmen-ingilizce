import React from 'react';

export type AnimalType = 'panda' | 'fox' | 'lion' | 'monkey' | 'bunny';
export type AnimalMood = 'hungry' | 'happy' | 'oops';

interface AnimalCharacterProps {
  animal: AnimalType;
  mood: AnimalMood;
  className?: string;
}

export const ANIMAL_META: Record<
  AnimalType,
  { name: string; title: string; treatName: string; accentBg: string }
> = {
  panda: {
    name: 'Milo',
    title: 'Panda Milo',
    treatName: 'Bambu Kurabiyesi',
    accentBg: 'bg-emerald-50',
  },
  fox: {
    name: 'Bibi',
    title: 'Tilki Bibi',
    treatName: 'Orman Çileği',
    accentBg: 'bg-orange-50',
  },
  lion: {
    name: 'Leo',
    title: 'Aslan Leo',
    treatName: 'Bal Çöreği',
    accentBg: 'bg-amber-50',
  },
  monkey: {
    name: 'Koko',
    title: 'Maymun Koko',
    treatName: 'Muzlu Kek',
    accentBg: 'bg-yellow-50',
  },
  bunny: {
    name: 'Pamuk',
    title: 'Tavşan Pamuk',
    treatName: 'Havuçlu Tart',
    accentBg: 'bg-rose-50',
  },
};

const renderEyesAndMouth = (mood: AnimalMood, noseY = 62, mouthY = 72) => {
  if (mood === 'happy') {
    return (
      <>
        {/* Happy curved eyes */}
        <path
          d="M34 50 Q39 44 44 50"
          fill="none"
          stroke="#0f172a"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M56 50 Q61 44 66 50"
          fill="none"
          stroke="#0f172a"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Rosy cheeks */}
        <ellipse cx="31" cy="58" rx="5" ry="3" fill="#fda4af" opacity="0.85" />
        <ellipse cx="69" cy="58" rx="5" ry="3" fill="#fda4af" opacity="0.85" />
        {/* Big happy smile */}
        <path
          d={`M40 ${mouthY - 2} Q50 ${mouthY + 11} 60 ${mouthY - 2} Z`}
          fill="#be123c"
          stroke="#0f172a"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <ellipse cx="50" cy={mouthY + 3} rx="5" ry="2.2" fill="#fda4af" />
      </>
    );
  }

  if (mood === 'oops') {
    return (
      <>
        {/* X / dizzy eyes */}
        <path
          d="M35 46 L43 54 M43 46 L35 54"
          stroke="#0f172a"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M57 46 L65 54 M65 46 L57 54"
          stroke="#0f172a"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Wavy mouth */}
        <path
          d={`M41 ${mouthY + 2} Q45 ${mouthY - 3} 50 ${mouthY + 2} T59 ${mouthY + 2}`}
          fill="none"
          stroke="#0f172a"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </>
    );
  }

  // Hungry / excited default
  return (
    <>
      <circle cx="39" cy="49" r="4.5" fill="#0f172a" />
      <circle cx="61" cy="49" r="4.5" fill="#0f172a" />
      <circle cx="40.5" cy="47.5" r="1.6" fill="#ffffff" />
      <circle cx="62.5" cy="47.5" r="1.6" fill="#ffffff" />
      <ellipse cx="31" cy="57" rx="4.2" ry="2.5" fill="#fda4af" opacity="0.65" />
      <ellipse cx="69" cy="57" rx="4.2" ry="2.5" fill="#fda4af" opacity="0.65" />
      <path
        d={`M43 ${mouthY} Q50 ${mouthY + 7} 57 ${mouthY}`}
        fill="none"
        stroke="#0f172a"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Nose connector */}
      <line
        x1="50"
        y1={noseY + 2}
        x2="50"
        y2={mouthY + 2}
        stroke="#0f172a"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  );
};

export const AnimalCharacter: React.FC<AnimalCharacterProps> = ({
  animal,
  mood,
  className = 'w-24 h-24',
}) => {
  switch (animal) {
    case 'panda':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label="Panda Milo">
          {/* Ears */}
          <circle cx="24" cy="24" r="13" fill="#1e293b" />
          <circle cx="76" cy="24" r="13" fill="#1e293b" />
          {/* Head */}
          <circle cx="50" cy="54" r="34" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
          {/* Eye patches */}
          <ellipse cx="38" cy="49" rx="10" ry="12" transform="rotate(-14 38 49)" fill="#1e293b" />
          <ellipse cx="62" cy="49" rx="10" ry="12" transform="rotate(14 62 49)" fill="#1e293b" />
          {/* Eye highlights when panda */}
          {mood !== 'oops' && mood !== 'happy' ? (
            <>
              <circle cx="39" cy="49" r="3.6" fill="#ffffff" />
              <circle cx="61" cy="49" r="3.6" fill="#ffffff" />
              <circle cx="39.5" cy="49" r="1.8" fill="#0f172a" />
              <circle cx="60.5" cy="49" r="1.8" fill="#0f172a" />
            </>
          ) : mood === 'happy' ? (
            <>
              <path d="M34 49 Q39 44 43 49" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M57 49 Q61 44 66 49" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M35 46 L42 53 M42 46 L35 53" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M58 46 L65 53 M65 46 L58 53" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
            </>
          )}
          {/* Snout & Nose */}
          <ellipse cx="50" cy="67" rx="13" ry="9" fill="#f1f5f9" />
          <ellipse cx="50" cy="61" rx="5.5" ry="3.8" fill="#1e293b" />
          {mood === 'happy' ? (
            <path d="M41 69 Q50 79 59 69 Z" fill="#be123c" stroke="#1e293b" strokeWidth="2" />
          ) : mood === 'oops' ? (
            <path d="M43 72 Q46 68 50 72 T57 72" fill="none" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
          ) : (
            <path d="M43 70 Q50 76 57 70" fill="none" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
          )}
        </svg>
      );

    case 'fox':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label="Tilki Bibi">
          {/* Pointy Ears */}
          <polygon points="18,44 22,12 44,30" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="82,44 78,12 56,30" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="23,37 25,19 38,30" fill="#fed7aa" />
          <polygon points="77,37 75,19 62,30" fill="#fed7aa" />
          {/* Head */}
          <ellipse cx="50" cy="56" rx="35" ry="30" fill="#f97316" stroke="#7c2d12" strokeWidth="2.8" />
          {/* White Cheeks */}
          <path d="M16 58 Q33 52 50 72 Q67 52 84 58 Q80 86 50 86 Q20 86 16 58 Z" fill="#fff7ed" />
          {renderEyesAndMouth(mood, 64, 73)}
          {/* Nose */}
          <ellipse cx="50" cy="64" rx="5" ry="3.6" fill="#0f172a" />
        </svg>
      );

    case 'lion':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label="Aslan Leo">
          {/* Fluffy Mane */}
          <circle cx="50" cy="53" r="42" fill="#b45309" stroke="#78350f" strokeWidth="2.5" strokeDasharray="10 4" />
          <circle cx="50" cy="53" r="39" fill="#d97706" />
          {/* Ears */}
          <circle cx="24" cy="27" r="9" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
          <circle cx="76" cy="27" r="9" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
          {/* Face */}
          <circle cx="50" cy="54" r="29" fill="#fcd34d" stroke="#92400e" strokeWidth="2.5" />
          <ellipse cx="50" cy="66" rx="13" ry="10" fill="#fef3c7" />
          {renderEyesAndMouth(mood, 61, 71)}
          {/* Nose */}
          <polygon points="44,58 56,58 50,64" fill="#78350f" />
        </svg>
      );

    case 'monkey':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label="Maymun Koko">
          {/* Big Ears */}
          <circle cx="17" cy="50" r="12" fill="#92400e" stroke="#451a03" strokeWidth="2.5" />
          <circle cx="17" cy="50" r="6.5" fill="#fde68a" />
          <circle cx="83" cy="50" r="12" fill="#92400e" stroke="#451a03" strokeWidth="2.5" />
          <circle cx="83" cy="50" r="6.5" fill="#fde68a" />
          {/* Head */}
          <circle cx="50" cy="54" r="32" fill="#92400e" stroke="#451a03" strokeWidth="2.8" />
          {/* Hair tuft */}
          <path d="M44 22 Q50 12 56 22" fill="none" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />
          {/* Face mask */}
          <ellipse cx="39" cy="48" rx="12" ry="13" fill="#fef3c7" />
          <ellipse cx="61" cy="48" rx="12" ry="13" fill="#fef3c7" />
          <ellipse cx="50" cy="67" rx="21" ry="14" fill="#fef3c7" />
          {renderEyesAndMouth(mood, 60, 71)}
          {/* Nostrils */}
          <circle cx="46" cy="60" r="2" fill="#451a03" />
          <circle cx="54" cy="60" r="2" fill="#451a03" />
        </svg>
      );

    case 'bunny':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-label="Tavşan Pamuk">
          {/* Long Ears */}
          <ellipse cx="36" cy="24" rx="9" ry="22" transform="rotate(-10 36 24)" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2.5" />
          <ellipse cx="36" cy="25" rx="4.5" ry="14" transform="rotate(-10 36 25)" fill="#fbcfe8" />
          <ellipse cx="64" cy="24" rx="9" ry="22" transform="rotate(10 64 24)" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2.5" />
          <ellipse cx="64" cy="25" rx="4.5" ry="14" transform="rotate(10 64 25)" fill="#fbcfe8" />
          {/* Head */}
          <ellipse cx="50" cy="62" rx="33" ry="28" fill="#ffffff" stroke="#94a3b8" strokeWidth="2.8" />
          {renderEyesAndMouth(mood, 65, 75)}
          {/* Pink Nose */}
          <ellipse cx="50" cy="65" rx="4.5" ry="3.2" fill="#f43f5e" />
        </svg>
      );
  }
};
