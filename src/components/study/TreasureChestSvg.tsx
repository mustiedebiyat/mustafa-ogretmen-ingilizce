import React from 'react';

interface TreasureChestSvgProps {
  open: boolean;
  cracking?: boolean;
  className?: string;
}

export const TreasureChestSvg: React.FC<TreasureChestSvgProps> = ({
  open,
  cracking = false,
  className = 'w-28 h-28',
}) => {
  return (
    <svg viewBox="0 0 120 110" className={className} aria-label="Korsan Hazine Sandığı">
      {/* Ground Shadow */}
      <ellipse cx="60" cy="96" rx="46" ry="8" fill="#0f172a" opacity="0.16" />

      {open ? (
        <>
          {/* Open Lid Tilted Back */}
          <path
            d="M18 46 Q20 14 60 14 Q100 14 102 46 Z"
            fill="#92400e"
            stroke="#451a03"
            strokeWidth="3"
          />
          <path
            d="M34 17 L34 45 M86 17 L86 45"
            stroke="#fbbf24"
            strokeWidth="5"
          />
          {/* Overflowing Gold Coins & Gems */}
          <circle cx="38" cy="52" r="9" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
          <circle cx="52" cy="48" r="10" fill="#fde047" stroke="#b45309" strokeWidth="2" />
          <circle cx="67" cy="49" r="10" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
          <circle cx="82" cy="52" r="9" fill="#fde047" stroke="#b45309" strokeWidth="2" />
          <polygon points="60,33 69,43 60,53 51,43" fill="#38bdf8" stroke="#0369a1" strokeWidth="2" />
          <polygon points="43,40 49,47 43,54 37,47" fill="#f43f5e" stroke="#9f1239" strokeWidth="1.8" />
          {/* Sparkles */}
          <path d="M24 26 L26 20 L28 26 L34 28 L28 30 L26 36 L24 30 L18 28 Z" fill="#fde047" />
          <path d="M94 22 L95.5 17 L97 22 L102 23.5 L97 25 L95.5 30 L94 25 L89 23.5 Z" fill="#fde047" />
        </>
      ) : (
        <>
          {/* Closed Domed Lid */}
          <path
            d="M16 54 Q18 24 60 24 Q102 24 104 54 Z"
            fill="#b45309"
            stroke="#451a03"
            strokeWidth="3"
          />
          <path
            d="M34 27 L34 54 M86 27 L86 54"
            stroke="#fbbf24"
            strokeWidth="5"
          />
        </>
      )}

      {/* Chest Base Box */}
      <rect
        x="16"
        y="54"
        width="88"
        height="40"
        rx="6"
        fill="#92400e"
        stroke="#451a03"
        strokeWidth="3"
      />
      {/* Wood Planks */}
      <line x1="18" y1="68" x2="102" y2="68" stroke="#451a03" strokeWidth="2" opacity="0.65" />
      <line x1="18" y1="81" x2="102" y2="81" stroke="#451a03" strokeWidth="2" opacity="0.65" />
      {/* Gold Metal Straps */}
      <rect x="31" y="54" width="6" height="40" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
      <rect x="83" y="54" width="6" height="40" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />

      {/* Center Lock Plate */}
      <rect
        x="51"
        y="48"
        width="18"
        height="22"
        rx="4"
        fill={open ? '#fde047' : cracking ? '#fef08a' : '#fbbf24'}
        stroke="#78350f"
        strokeWidth="2.5"
      />
      {open ? (
        <path
          d="M55 57 L59 61 L65 53"
          fill="none"
          stroke="#15803d"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <>
          <circle cx="60" cy="56" r="3" fill="#451a03" />
          <path d="M58 58 L62 58 L61 65 L59 65 Z" fill="#451a03" />
        </>
      )}
    </svg>
  );
};
