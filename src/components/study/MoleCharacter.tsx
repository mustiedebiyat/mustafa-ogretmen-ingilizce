import React from 'react';

export type MoleMood = 'pop' | 'bonked' | 'wrong';

interface MoleCharacterProps {
  mood: MoleMood;
  className?: string;
}

export const MoleCharacter: React.FC<MoleCharacterProps> = ({
  mood,
  className = 'w-20 h-20',
}) => {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-label="Sevimli Köstebek">
      {/* Ears */}
      <circle cx="28" cy="30" r="8" fill="#78350f" stroke="#451a03" strokeWidth="2.4" />
      <circle cx="28" cy="30" r="4" fill="#fbcfe8" />
      <circle cx="72" cy="30" r="8" fill="#78350f" stroke="#451a03" strokeWidth="2.4" />
      <circle cx="72" cy="30" r="4" fill="#fbcfe8" />

      {/* Body & Head */}
      <path
        d="M22 90 L22 48 Q22 18 50 18 Q78 18 78 48 L78 90 Z"
        fill="#92400e"
        stroke="#451a03"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Soft Belly / Snout Patch */}
      <ellipse cx="50" cy="60" rx="19" ry="15" fill="#fde68a" />

      {/* Eyes */}
      {mood === 'bonked' ? (
        <>
          <path d="M33 41 Q38 35 43 41" fill="none" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M57 41 Q62 35 67 41" fill="none" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" />
          {/* Victory stars above head */}
          <polygon points="22,12 24,17 29,17 25,20 26,25 22,22 18,25 19,20 15,17 20,17" fill="#fbbf24" />
          <polygon points="78,12 80,17 85,17 81,20 82,25 78,22 74,25 75,20 71,17 76,17" fill="#fbbf24" />
        </>
      ) : mood === 'wrong' ? (
        <>
          <path d="M34 36 L42 44 M42 36 L34 44" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M58 36 L66 44 M66 36 L58 44" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="38" cy="40" r="4.2" fill="#0f172a" />
          <circle cx="62" cy="40" r="4.2" fill="#0f172a" />
          <circle cx="39.5" cy="38.5" r="1.5" fill="#ffffff" />
          <circle cx="63.5" cy="38.5" r="1.5" fill="#ffffff" />
        </>
      )}

      {/* Cheeks */}
      <ellipse cx="29" cy="49" rx="4.5" ry="2.6" fill="#fda4af" opacity="0.75" />
      <ellipse cx="71" cy="49" rx="4.5" ry="2.6" fill="#fda4af" opacity="0.75" />

      {/* Big Pink Nose */}
      <ellipse cx="50" cy="52" rx="6.5" ry="4.5" fill="#f43f5e" stroke="#881337" strokeWidth="1.8" />

      {/* Mouth */}
      {mood === 'bonked' ? (
        <path d="M41 61 Q50 70 59 61 Z" fill="#be123c" stroke="#451a03" strokeWidth="2" />
      ) : mood === 'wrong' ? (
        <path d="M41 64 Q45 59 50 64 T59 64" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
      ) : (
        <>
          <path d="M42 60 Q50 67 58 60" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
          {/* Cute little buck tooth */}
          <rect x="47.5" y="62.5" width="5" height="4.5" rx="1" fill="#ffffff" stroke="#451a03" strokeWidth="1.2" />
        </>
      )}

      {/* Little Paws holding up */}
      <ellipse cx="23" cy="76" rx="7" ry="5" fill="#78350f" stroke="#451a03" strokeWidth="2" />
      <ellipse cx="77" cy="76" rx="7" ry="5" fill="#78350f" stroke="#451a03" strokeWidth="2" />
    </svg>
  );
};
