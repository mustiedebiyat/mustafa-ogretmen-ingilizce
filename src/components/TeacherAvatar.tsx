import React from 'react';

interface TeacherAvatarProps {
  className?: string;
}

export const TeacherAvatar: React.FC<TeacherAvatarProps> = ({
  className = 'w-14 h-14',
}) => {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Background badge */}
      <circle cx="60" cy="60" r="56" fill="#FDE68A" stroke="#FFFFFF" strokeWidth="4" />

      {/* Shoulders & Sweater */}
      <path
        d="M24 108C26 87 42 79 60 79C78 79 94 87 96 108"
        fill="#4C1D95"
      />
      {/* Shirt collar & tie */}
      <polygon points="48,80 60,93 72,80" fill="#FFFFFF" />
      <polygon points="57,85 63,85 62,102 60,106 58,102" fill="#EA580C" />

      {/* Neck */}
      <rect x="52" y="70" width="16" height="14" rx="6" fill="#FDBA74" />

      {/* Ears */}
      <circle cx="34" cy="54" r="6" fill="#FDBA74" />
      <circle cx="86" cy="54" r="6" fill="#FDBA74" />

      {/* Head with tapered, pointed chin */}
      <path
        d="M36 42C36 30 45 25 60 25C75 25 84 30 84 42V55C84 67 70 81 60 83C50 81 36 67 36 55V42Z"
        fill="#FED7AA"
      />

      {/* Black Hair: styled upward and swept neatly to the side */}
      <path
        d="M35 49C32 37 36 25 46 21C49 14 59 11 72 14C81 16 88 22 86 30C89 34 88 42 84 48C82 37 78 30 68 29C58 28 49 32 42 36C39 39 37 44 35 49Z"
        fill="#111827"
      />
      {/* Upward side-swept hair volume highlights */}
      <path
        d="M48 21C56 16 68 16 79 22C72 24 58 26 46 29"
        stroke="#374151"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M42 29C48 23 58 20 67 21"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Eyebrows */}
      <path d="M44 45C47 43 51 43 54 45" stroke="#111827" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M66 45C69 43 73 43 76 45" stroke="#111827" strokeWidth="2.8" strokeLinecap="round" />

      {/* Eyes */}
      <circle cx="49" cy="52" r="3.4" fill="#111827" />
      <circle cx="71" cy="52" r="3.4" fill="#111827" />
      <circle cx="50.2" cy="50.8" r="1.2" fill="#FFFFFF" />
      <circle cx="72.2" cy="50.8" r="1.2" fill="#FFFFFF" />

      {/* Cute rosy cheeks */}
      <circle cx="42" cy="58" r="3.5" fill="#FB7185" opacity="0.45" />
      <circle cx="78" cy="58" r="3.5" fill="#FB7185" opacity="0.45" />

      {/* Black Beard & Mustache following the pointed chin */}
      <path
        d="M36 55C37 68 50 83 60 85C70 83 83 68 84 55C81 61 76 64 70 64C65 64 63 61 60 61C57 61 55 64 50 64C44 64 39 61 36 55Z"
        fill="#111827"
      />

      {/* Friendly Smile */}
      <path
        d="M52 67C55 71.5 65 71.5 68 67"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Cute mini ABC board badge */}
      <rect x="82" y="76" width="22" height="17" rx="3" fill="#0F766E" stroke="#FFFFFF" strokeWidth="2" />
      <text
        x="93"
        y="88"
        textAnchor="middle"
        fill="#FDE047"
        fontSize="8.5"
        fontWeight="800"
        fontFamily="sans-serif"
      >
        ABC
      </text>
    </svg>
  );
};
