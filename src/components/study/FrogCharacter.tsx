import React from 'react';

export type FrogMood = 'idle' | 'jumping' | 'splash' | 'eating' | 'sunk';

interface FrogCharacterProps {
  mood: FrogMood;
  className?: string;
}

export const FrogCharacter: React.FC<FrogCharacterProps> = ({
  mood,
  className = 'w-16 h-16',
}) => {
  const isDizzy = mood === 'splash' || mood === 'sunk';

  return (
    <svg viewBox="0 0 100 100" className={className} aria-label="Kurbağa Zıpzıp">
      {/* Hind legs */}
      {mood === 'jumping' ? (
        <>
          <path d="M22 72 Q10 86 18 94" fill="none" stroke="#15803d" strokeWidth="8" strokeLinecap="round" />
          <path d="M78 72 Q90 86 82 94" fill="none" stroke="#15803d" strokeWidth="8" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="23" cy="76" rx="12" ry="9" fill="#15803d" stroke="#14532d" strokeWidth="2.5" />
          <ellipse cx="77" cy="76" rx="12" ry="9" fill="#15803d" stroke="#14532d" strokeWidth="2.5" />
        </>
      )}

      {/* Body */}
      <ellipse cx="50" cy="64" rx="28" ry="23" fill="#22c55e" stroke="#14532d" strokeWidth="3" />
      {/* Belly */}
      <ellipse cx="50" cy="69" rx="18" ry="15" fill="#dcfce7" />

      {/* Head */}
      <ellipse cx="50" cy="42" rx="27" ry="20" fill="#22c55e" stroke="#14532d" strokeWidth="3" />

      {/* Big frog eye bumps */}
      <circle cx="33" cy="24" r="11.5" fill="#22c55e" stroke="#14532d" strokeWidth="2.8" />
      <circle cx="67" cy="24" r="11.5" fill="#22c55e" stroke="#14532d" strokeWidth="2.8" />
      <circle cx="33" cy="24" r="7.8" fill="#ffffff" />
      <circle cx="67" cy="24" r="7.8" fill="#ffffff" />

      {/* Eyes expression */}
      {isDizzy ? (
        <>
          <path d="M29 20 L37 28 M37 20 L29 28" stroke="#0f172a" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M63 20 L71 28 M71 20 L63 28" stroke="#0f172a" strokeWidth="2.6" strokeLinecap="round" />
        </>
      ) : mood === 'eating' ? (
        <>
          <path d="M28 25 Q33 19 38 25" fill="none" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M62 25 Q67 19 72 25" fill="none" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="34.5" cy="24" r="4.2" fill="#0f172a" />
          <circle cx="68.5" cy="24" r="4.2" fill="#0f172a" />
          <circle cx="35.8" cy="22.4" r="1.5" fill="#ffffff" />
          <circle cx="69.8" cy="22.4" r="1.5" fill="#ffffff" />
        </>
      )}

      {/* Rosy cheeks */}
      <ellipse cx="27" cy="43" rx="5" ry="3" fill="#fda4af" opacity="0.85" />
      <ellipse cx="73" cy="43" rx="5" ry="3" fill="#fda4af" opacity="0.85" />

      {/* Mouth */}
      {mood === 'eating' ? (
        <>
          <path d="M36 44 Q50 58 64 44 Z" fill="#be123c" stroke="#14532d" strokeWidth="2.4" strokeLinejoin="round" />
          <ellipse cx="50" cy="49" rx="6.5" ry="3" fill="#fda4af" />
          {/* Little yum crumbs */}
          <circle cx="72" cy="46" r="2.2" fill="#fbbf24" />
          <circle cx="77" cy="41" r="1.8" fill="#fb7185" />
        </>
      ) : isDizzy ? (
        <path
          d="M38 48 Q44 43 50 48 T62 48"
          fill="none"
          stroke="#14532d"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M35 44 Q50 54 65 44"
          fill="none"
          stroke="#14532d"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      )}

      {/* Front paws */}
      <ellipse cx="36" cy="83" rx="6" ry="3.8" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
      <ellipse cx="64" cy="83" rx="6" ry="3.8" fill="#16a34a" stroke="#14532d" strokeWidth="2" />

      {/* Submerged water overlay & rising bubbles when sunk */}
      {mood === 'sunk' && (
        <>
          <path
            d="M4 58 Q18 48 32 58 T60 58 T88 58 L96 58 L96 96 L4 96 Z"
            fill="#0ea5e9"
            opacity="0.58"
          />
          <path
            d="M4 62 Q18 52 32 62 T60 62 T88 62 L96 62"
            fill="none"
            stroke="#e0f2fe"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="24" cy="14" r="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.6" />
          <circle cx="78" cy="12" r="4.5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.6" />
          <circle cx="52" cy="8" r="3" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.4" />
        </>
      )}
    </svg>
  );
};

interface PondTreatPlatterProps {
  eaten: boolean;
  className?: string;
}

export const PondTreatPlatter: React.FC<PondTreatPlatterProps> = ({
  eaten,
  className = 'w-14 h-14',
}) => {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-label="Kurbağa Ziyafet Tabağı">
      {/* Wooden/Leaf Plate */}
      <ellipse cx="50" cy="72" rx="38" ry="15" fill="#fde68a" stroke="#b45309" strokeWidth="3" />
      <ellipse cx="50" cy="70" rx="28" ry="9" fill="#fef3c7" />

      {eaten ? (
        <>
          {/* Crumbs left after eating */}
          <circle cx="42" cy="70" r="3" fill="#f59e0b" />
          <circle cx="56" cy="68" r="2.5" fill="#e11d48" />
          <circle cx="50" cy="73" r="2.2" fill="#f59e0b" />
        </>
      ) : (
        <>
          {/* Berry Pie / Cupcake */}
          <path d="M30 68 L36 46 L64 46 L70 68 Z" fill="#d97706" stroke="#78350f" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Cream topping */}
          <path d="M29 47 Q38 35 50 38 Q62 35 71 47 Q60 54 50 50 Q40 54 29 47 Z" fill="#fff1f2" stroke="#e11d48" strokeWidth="2" />
          {/* Strawberry on top */}
          <path d="M43 32 Q50 20 57 32 Q50 42 43 32 Z" fill="#e11d48" stroke="#881337" strokeWidth="2" />
          <path d="M46 24 L50 28 L54 24" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
          {/* Cute little golden fly cookie */}
          <circle cx="72" cy="40" r="6" fill="#fbbf24" stroke="#78350f" strokeWidth="1.8" />
          <ellipse cx="68" cy="33" rx="4" ry="2.5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.2" />
          <ellipse cx="76" cy="33" rx="4" ry="2.5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.2" />
        </>
      )}
    </svg>
  );
};
