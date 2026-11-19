import React from 'react';

export function renderExtraWordSvgB(
  illustrationKey: string,
  className: string
): React.ReactNode | null {
  switch (illustrationKey) {
    case 'lemonade':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <polygon points="38,34 82,34 74,94 46,94" fill="#FEF08A" stroke="#CA8A04" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="78" cy="34" r="12" fill="#FACC15" stroke="#A16207" strokeWidth="2.5" />
          <line x1="62" y1="34" x2="72" y2="16" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'lesson':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="26" width="80" height="68" rx="10" fill="#E0E7FF" stroke="#4338CA" strokeWidth="3" />
          <text x="60" y="66" textAnchor="middle" fill="#312E81" fontSize="17" fontWeight="900" fontFamily="sans-serif">1+1=2</text>
        </svg>
      );

    case 'letter_abc':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="24" y="24" width="72" height="72" rx="14" fill="#FEF3C7" stroke="#B45309" strokeWidth="3" />
          <text x="60" y="75" textAnchor="middle" fill="#B45309" fontSize="48" fontWeight="900" fontFamily="sans-serif">A</text>
        </svg>
      );

    case 'life_study':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#DCFCE7" stroke="#15803D" strokeWidth="3" />
          <path d="M60 76V46" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="48" cy="50" rx="12" ry="7" transform="rotate(-25 48 50)" fill="#22C55E" />
          <ellipse cx="72" cy="46" rx="12" ry="7" transform="rotate(25 72 46)" fill="#4ADE80" />
        </svg>
      );

    case 'like_heart':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M60 92C60 92 22 68 22 44C22 31 32 24 44 24C52 24 57 29 60 35C63 29 68 24 76 24C88 24 98 31 98 44C98 68 60 92 60 92Z" fill="#EC4899" stroke="#831843" strokeWidth="3" />
        </svg>
      );

    case 'little_bird':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="58" cy="64" r="22" fill="#FACC15" stroke="#A16207" strokeWidth="3" />
          <circle cx="66" cy="58" r="3" fill="#1E293B" />
          <polygon points="79,60 92,64 79,68" fill="#F97316" />
          <ellipse cx="52" cy="66" rx="10" ry="6" fill="#FDE047" stroke="#A16207" strokeWidth="2" />
        </svg>
      );

    case 'locker':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="34" y="18" width="52" height="84" rx="6" fill="#60A5FA" stroke="#1E3A8A" strokeWidth="3" />
          <line x1="44" y1="30" x2="76" y2="30" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
          <line x1="44" y1="38" x2="76" y2="38" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
          <circle cx="76" cy="60" r="4" fill="#FACC15" stroke="#1E3A8A" strokeWidth="2" />
        </svg>
      );

    case 'look_like':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="42" cy="58" r="18" fill="#FDE68A" stroke="#6D28D9" strokeWidth="3" />
          <circle cx="78" cy="58" r="18" fill="#FDE68A" stroke="#6D28D9" strokeWidth="3" />
          <text x="60" y="94" textAnchor="middle" fill="#6D28D9" fontSize="16" fontWeight="900" fontFamily="sans-serif">=</text>
        </svg>
      );

    case 'man_person':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="46" r="20" fill="#FDBA74" stroke="#7C2D12" strokeWidth="3" />
          <path d="M40 40C42 24 78 24 80 40" stroke="#334155" strokeWidth="7" strokeLinecap="round" />
          <circle cx="53" cy="46" r="2.8" fill="#1E293B" />
          <circle cx="67" cy="46" r="2.8" fill="#1E293B" />
          <path d="M34 96C34 74 86 74 86 96Z" fill="#2563EB" stroke="#1E3A8A" strokeWidth="3" />
        </svg>
      );

    case 'map':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <polygon points="20,30 46,22 74,30 100,22 100,90 74,98 46,90 20,98" fill="#D1FAE5" stroke="#047857" strokeWidth="3" strokeLinejoin="round" />
          <line x1="46" y1="22" x2="46" y2="90" stroke="#059669" strokeWidth="2.5" />
          <line x1="74" y1="30" x2="74" y2="98" stroke="#059669" strokeWidth="2.5" />
          <circle cx="60" cy="54" r="8" fill="#EF4444" />
        </svg>
      );

    case 'match_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="28" width="24" height="24" rx="5" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" />
          <rect x="76" y="68" width="24" height="24" rx="5" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" />
          <line x1="44" y1="40" x2="76" y2="80" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'maybe':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#F3E8FF" stroke="#7E22CE" strokeWidth="3" />
          <text x="60" y="72" textAnchor="middle" fill="#6B21A8" fontSize="34" fontWeight="900" fontFamily="sans-serif">?!</text>
        </svg>
      );

    case 'meal_plate':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#FFFFFF" stroke="#059669" strokeWidth="3.5" />
          <circle cx="52" cy="54" r="10" fill="#F97316" />
          <circle cx="70" cy="66" r="10" fill="#22C55E" />
          <circle cx="48" cy="70" r="7" fill="#FACC15" />
        </svg>
      );

    case 'men_group':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="42" cy="46" r="16" fill="#FDBA74" stroke="#7C2D12" strokeWidth="2.5" />
          <path d="M22 94C22 72 62 72 62 94Z" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2.5" />
          <circle cx="78" cy="46" r="16" fill="#FDE68A" stroke="#7C2D12" strokeWidth="2.5" />
          <path d="M58 94C58 72 98 72 98 94Z" fill="#0D9488" stroke="#115E59" strokeWidth="2.5" />
        </svg>
      );

    case 'microphone':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="46" y="22" width="28" height="44" rx="14" fill="#94A3B8" stroke="#1E293B" strokeWidth="3" />
          <path d="M36 56C36 72 84 72 84 56" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
          <line x1="60" y1="68" x2="60" y2="94" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
          <line x1="42" y1="94" x2="78" y2="94" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'minute':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="62" r="34" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3.5" />
          <rect x="52" y="20" width="16" height="8" rx="3" fill="#0284C7" />
          <text x="60" y="69" textAnchor="middle" fill="#0C4A6E" fontSize="16" fontWeight="900" fontFamily="sans-serif">1m</text>
        </svg>
      );

    case 'my_pleasure':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#FFE4E6" stroke="#E11D48" strokeWidth="3" />
          <path d="M60 78C60 78 36 62 36 48C36 40 42 35 49 35C54 35 58 38 60 42C62 38 66 35 71 35C78 35 84 40 84 48C84 62 60 78 60 78Z" fill="#E11D48" />
        </svg>
      );

    case 'necklace':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M30 34C30 78 90 78 90 34" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="78" r="12" fill="#06B6D4" stroke="#0E7490" strokeWidth="3" />
        </svg>
      );

    case 'need':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="24" y="34" width="72" height="52" rx="12" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          <path d="M40 60H80M60 44V76" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );

    case 'nice_day':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="54" r="24" fill="#FACC15" stroke="#B45309" strokeWidth="3" />
          <path d="M32 82C42 74 78 74 88 82" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'nice_smile':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#FEF3C7" stroke="#D97706" strokeWidth="3.5" />
          <circle cx="46" cy="52" r="3.5" fill="#1E293B" />
          <circle cx="74" cy="52" r="3.5" fill="#1E293B" />
          <path d="M42 66C48 80 72 80 78 66Z" fill="#FFFFFF" stroke="#B45309" strokeWidth="2.5" />
        </svg>
      );

    case 'nice_weather':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="46" cy="46" r="18" fill="#FACC15" stroke="#B45309" strokeWidth="2.5" />
          <path d="M44 74H88C94 74 98 69 98 64C98 58 93 54 88 54C86 46 78 42 70 44C63 44 58 49 56 56C49 56 44 62 44 68Z" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
        </svg>
      );

    case 'nice_weekend':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="22" y="26" width="76" height="70" rx="10" fill="#DCFCE7" stroke="#15803D" strokeWidth="3" />
          <rect x="22" y="26" width="76" height="20" rx="8" fill="#16A34A" />
          <text x="60" y="72" textAnchor="middle" fill="#14532D" fontSize="14" fontWeight="900" fontFamily="sans-serif">SAT·SUN</text>
        </svg>
      );

    case 'night':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="18" y="20" width="84" height="80" rx="16" fill="#0F172A" stroke="#334155" strokeWidth="3" />
          <path d="M68 38A20 20 0 1 0 82 72A16 16 0 1 1 68 38Z" fill="#FDE047" />
          <circle cx="38" cy="42" r="3" fill="#FEF08A" />
          <circle cx="84" cy="40" r="3" fill="#FEF08A" />
        </svg>
      );

    case 'no_idea':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#F1F5F9" stroke="#475569" strokeWidth="3" />
          <text x="60" y="72" textAnchor="middle" fill="#334155" fontSize="34" fontWeight="900" fontFamily="sans-serif">?</text>
        </svg>
      );

    case 'no_problem':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#DCFCE7" stroke="#15803D" strokeWidth="3.5" />
          <path d="M40 62L54 76L82 44" stroke="#15803D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'no_way':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#FFEDD5" stroke="#EA580C" strokeWidth="3.5" />
          <text x="60" y="72" textAnchor="middle" fill="#C2410C" fontSize="34" fontWeight="900" fontFamily="sans-serif">!</text>
        </svg>
      );

    case 'now':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#FEF3C7" stroke="#D97706" strokeWidth="3.5" />
          <text x="60" y="67" textAnchor="middle" fill="#92400E" fontSize="18" fontWeight="900" fontFamily="sans-serif">NOW</text>
        </svg>
      );

    case 'old_person':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="48" r="20" fill="#FDE68A" stroke="#64748B" strokeWidth="3" />
          <path d="M40 42C42 26 78 26 80 42" stroke="#CBD5E1" strokeWidth="7" strokeLinecap="round" />
          <circle cx="52" cy="48" r="5" stroke="#334155" strokeWidth="2" />
          <circle cx="68" cy="48" r="5" stroke="#334155" strokeWidth="2" />
          <path d="M36 96C36 76 84 76 84 96Z" fill="#64748B" />
        </svg>
      );

    case 'or_choice':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="34" cy="60" r="16" fill="#3B82F6" />
          <circle cx="86" cy="60" r="16" fill="#F97316" />
          <text x="60" y="66" textAnchor="middle" fill="#312E81" fontSize="15" fontWeight="900" fontFamily="sans-serif">OR</text>
        </svg>
      );

    case 'order_food':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="30" y="24" width="60" height="72" rx="8" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="3" />
          <line x1="42" y1="42" x2="78" y2="42" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
          <line x1="42" y1="56" x2="78" y2="56" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
          <path d="M44 72L52 80L68 66" stroke="#16A34A" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'page':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M32 22H72L88 38V98H32Z" fill="#FFFFFF" stroke="#B45309" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="72,22 72,38 88,38" fill="#FDE68A" stroke="#B45309" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="44" y1="54" x2="76" y2="54" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <line x1="44" y1="68" x2="76" y2="68" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'paint':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <ellipse cx="60" cy="64" rx="38" ry="28" fill="#FDE68A" stroke="#78350F" strokeWidth="3" />
          <circle cx="42" cy="54" r="7" fill="#EF4444" />
          <circle cx="62" cy="48" r="7" fill="#3B82F6" />
          <circle cx="80" cy="58" r="7" fill="#22C55E" />
          <circle cx="56" cy="76" r="6" fill="#A855F7" />
        </svg>
      );

    case 'paintbrush':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M30 86L74 42L82 50L38 94Z" fill="#D97706" stroke="#78350F" strokeWidth="3" strokeLinejoin="round" />
          <path d="M74 42C80 28 96 24 96 36C96 46 84 48 82 50Z" fill="#E11D48" stroke="#881337" strokeWidth="3" />
        </svg>
      );

    case 'party':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <polygon points="30,92 48,42 78,72" fill="#A855F7" stroke="#581C87" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="72" cy="34" r="6" fill="#FACC15" />
          <circle cx="88" cy="48" r="5" fill="#EC4899" />
          <circle cx="54" cy="28" r="5" fill="#38BDF8" />
        </svg>
      );

    case 'pass_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="42" width="80" height="36" rx="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          <path d="M38 60H76" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
          <polygon points="70,48 86,60 70,72" fill="#D97706" />
        </svg>
      );

    case 'pass_salt':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <polygon points="50,44 82,44 86,90 46,90" fill="#E0F2FE" stroke="#0369A1" strokeWidth="3" strokeLinejoin="round" />
          <path d="M50 44C50 32 82 32 82 44Z" fill="#94A3B8" stroke="#334155" strokeWidth="2.5" />
          <path d="M22 66H40" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <polygon points="34,58 44,66 34,74" fill="#0284C7" />
        </svg>
      );

    case 'perfect':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#FEF08A" stroke="#CA8A04" strokeWidth="3.5" />
          <text x="60" y="68" textAnchor="middle" fill="#854D0E" fontSize="22" fontWeight="900" fontFamily="sans-serif">100</text>
        </svg>
      );

    case 'play_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="34" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
          <polygon points="60,44 74,55 68,72 52,72 46,55" fill="#1E293B" />
        </svg>
      );

    case 'pleasure':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#CCFBF1" stroke="#0F766E" strokeWidth="3" />
          <circle cx="48" cy="52" r="3.5" fill="#0F766E" />
          <circle cx="72" cy="52" r="3.5" fill="#0F766E" />
          <path d="M46 66Q60 78 74 66" stroke="#0F766E" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'point_score':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="34" width="80" height="52" rx="12" fill="#FFEDD5" stroke="#EA580C" strokeWidth="3" />
          <text x="60" y="68" textAnchor="middle" fill="#9A3412" fontSize="24" fontWeight="900" fontFamily="sans-serif">+10</text>
        </svg>
      );

    case 'prepare':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="26" y="42" width="68" height="48" rx="8" fill="#FDE68A" stroke="#B45309" strokeWidth="3" />
          <rect x="26" y="42" width="68" height="14" rx="4" fill="#F59E0B" />
          <circle cx="60" cy="70" r="10" fill="#22C55E" />
        </svg>
      );

    case 'pretty_flower':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <line x1="60" y1="60" x2="60" y2="96" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <circle key={a} cx={60 + 18 * Math.cos((a * Math.PI) / 180)} cy={46 + 18 * Math.sin((a * Math.PI) / 180)} r="10" fill="#F472B6" />
          ))}
          <circle cx="60" cy="46" r="10" fill="#FACC15" />
        </svg>
      );

    case 'prize':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M38 28H82V50C82 64 72 74 60 74C48 74 38 64 38 50Z" fill="#FACC15" stroke="#B45309" strokeWidth="3" />
          <rect x="54" y="74" width="12" height="14" fill="#F59E0B" />
          <rect x="42" y="88" width="36" height="10" rx="4" fill="#B45309" />
        </svg>
      );

    case 'put_on_clothes':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M36 34L22 48L32 58L40 50V90H80V50L88 58L98 48L84 34H70C68 42 52 42 50 34Z" fill="#EC4899" stroke="#831843" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );

    case 'question_mark':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#EDE9FE" stroke="#6D28D9" strokeWidth="3.5" />
          <text x="60" y="75" textAnchor="middle" fill="#5B21B6" fontSize="46" fontWeight="900" fontFamily="sans-serif">?</text>
        </svg>
      );

    case 'quiet':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#E0E7FF" stroke="#4338CA" strokeWidth="3" />
          <text x="60" y="68" textAnchor="middle" fill="#312E81" fontSize="22" fontWeight="900" fontFamily="sans-serif">Shh!</text>
        </svg>
      );

    case 'rain_weather':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M32 58H88C94 58 98 53 98 47C98 41 93 37 87 37C84 28 76 24 66 26C58 26 52 32 50 39C42 39 32 45 32 58Z" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />
          <line x1="44" y1="68" x2="38" y2="86" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <line x1="62" y1="68" x2="56" y2="86" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <line x1="80" y1="68" x2="74" y2="86" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'ready_food':
    case 'ready_person':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#DCFCE7" stroke="#16A34A" strokeWidth="3.5" />
          <path d="M40 62L54 76L82 44" stroke="#15803D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'run':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="66" cy="30" r="10" fill="#FDBA74" stroke="#9A3412" strokeWidth="2.5" />
          <path d="M62 42L52 64L34 86M52 64L74 72L82 92M46 48L78 52" stroke="#15803D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'say_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M24 30H96C101 30 105 34 105 39V68C105 73 101 77 96 77H54L36 92V77H24C19 77 15 73 15 68V39C15 34 19 30 24 30Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          <text x="60" y="60" textAnchor="middle" fill="#0369A1" fontSize="18" fontWeight="900" fontFamily="sans-serif">HI!</text>
        </svg>
      );

    case 'season':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="42" cy="42" r="18" fill="#4ADE80" />
          <circle cx="78" cy="42" r="18" fill="#FACC15" />
          <circle cx="42" cy="78" r="18" fill="#F97316" />
          <circle cx="78" cy="78" r="18" fill="#38BDF8" />
        </svg>
      );

    case 'seat':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="38" y="28" width="44" height="34" rx="6" fill="#38BDF8" stroke="#0369A1" strokeWidth="3" />
          <rect x="34" y="62" width="52" height="12" rx="4" fill="#0284C7" stroke="#0369A1" strokeWidth="3" />
          <line x1="40" y1="74" x2="40" y2="96" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          <line x1="80" y1="74" x2="80" y2="96" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'see_you_later':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#E0E7FF" stroke="#4338CA" strokeWidth="3" />
          <path d="M46 72V44C46 40 52 40 52 44V58M52 58V38C52 34 58 34 58 38V58M58 58V40C58 36 64 36 64 40V58M64 58V46C64 42 70 42 70 46V72C70 82 46 82 46 72Z" fill="#FDE68A" stroke="#92400E" strokeWidth="2.5" />
        </svg>
      );

    case 'shoe':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M26 52H56L72 68H94C98 68 100 84 92 84H26Z" fill="#2563EB" stroke="#1E3A8A" strokeWidth="3" strokeLinejoin="round" />
          <rect x="26" y="78" width="68" height="8" rx="3" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="2" />
        </svg>
      );

    case 'snow_weather':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M32 58H88C94 58 98 53 98 47C98 41 93 37 87 37C84 28 76 24 66 26C58 26 52 32 50 39C42 39 32 45 32 58Z" fill="#E2E8F0" stroke="#475569" strokeWidth="3" />
          <circle cx="44" cy="76" r="4" fill="#38BDF8" />
          <circle cx="62" cy="84" r="4" fill="#38BDF8" />
          <circle cx="78" cy="74" r="4" fill="#38BDF8" />
        </svg>
      );

    case 'so_excited':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#FCE7F3" stroke="#DB2777" strokeWidth="3.5" />
          <polygon points="46,44 49,51 56,52 51,57 52,64 46,60 40,64 41,57 36,52 43,51" fill="#FACC15" />
          <polygon points="74,44 77,51 84,52 79,57 80,64 74,60 68,64 69,57 64,52 71,51" fill="#FACC15" />
          <path d="M44 72Q60 88 76 72Z" fill="#E11D48" />
        </svg>
      );

    case 'sock':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M44 26H68V66L84 78C90 84 82 96 72 92L44 76Z" fill="#FB923C" stroke="#9A3412" strokeWidth="3" strokeLinejoin="round" />
          <rect x="44" y="26" width="24" height="10" fill="#FEF3C7" stroke="#9A3412" strokeWidth="2.5" />
        </svg>
      );

    case 'some_food':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="46" cy="58" r="14" fill="#FACC15" stroke="#A16207" strokeWidth="2.5" />
          <circle cx="74" cy="56" r="14" fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
          <circle cx="60" cy="74" r="14" fill="#FB7185" stroke="#9F1239" strokeWidth="2.5" />
        </svg>
      );

    case 'song':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="42" cy="80" r="12" fill="#A855F7" stroke="#581C87" strokeWidth="3" />
          <circle cx="78" cy="72" r="12" fill="#A855F7" stroke="#581C87" strokeWidth="3" />
          <path d="M52 80V34L88 26V72" stroke="#581C87" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'speak_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="46" cy="56" r="18" fill="#FDE68A" stroke="#0F766E" strokeWidth="3" />
          <path d="M72 48Q84 56 72 64M82 40Q98 56 82 72" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'spell_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="42" width="24" height="32" rx="6" fill="#E0E7FF" stroke="#4338CA" strokeWidth="2.5" />
          <rect x="48" y="42" width="24" height="32" rx="6" fill="#E0E7FF" stroke="#4338CA" strokeWidth="2.5" />
          <rect x="76" y="42" width="24" height="32" rx="6" fill="#E0E7FF" stroke="#4338CA" strokeWidth="2.5" />
          <text x="32" y="64" textAnchor="middle" fill="#312E81" fontSize="16" fontWeight="900" fontFamily="sans-serif">A</text>
          <text x="60" y="64" textAnchor="middle" fill="#312E81" fontSize="16" fontWeight="900" fontFamily="sans-serif">B</text>
          <text x="88" y="64" textAnchor="middle" fill="#312E81" fontSize="16" fontWeight="900" fontFamily="sans-serif">C</text>
        </svg>
      );

    case 'sports_lesson':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="34" fill="#F97316" stroke="#7C2D12" strokeWidth="3.5" />
          <line x1="26" y1="60" x2="94" y2="60" stroke="#7C2D12" strokeWidth="3" />
          <line x1="60" y1="26" x2="60" y2="94" stroke="#7C2D12" strokeWidth="3" />
        </svg>
      );

    case 'spring':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <line x1="42" y1="60" x2="42" y2="94" stroke="#16A34A" strokeWidth="4" />
          <circle cx="42" cy="52" r="12" fill="#F472B6" />
          <circle cx="42" cy="52" r="5" fill="#FACC15" />
          <line x1="76" y1="54" x2="76" y2="94" stroke="#16A34A" strokeWidth="4" />
          <circle cx="76" cy="44" r="13" fill="#38BDF8" />
          <circle cx="76" cy="44" r="5" fill="#FACC15" />
        </svg>
      );

    case 'start_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#DCFCE7" stroke="#16A34A" strokeWidth="3.5" />
          <polygon points="48,38 82,60 48,82" fill="#16A34A" />
        </svg>
      );

    case 'strawberry_cake':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <polygon points="24,84 96,84 96,52 34,42" fill="#FBCFE8" stroke="#9D174D" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="60" cy="38" r="10" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
          <path d="M56 28L60 32L64 28" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'strong_arm':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M28 84H68C84 84 92 70 84 54C78 44 64 46 62 56C56 50 44 54 44 66H28Z" fill="#FDBA74" stroke="#9A3412" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="74" cy="36" r="10" fill="#FACC15" />
        </svg>
      );

    case 'student_desk':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="22" y="42" width="76" height="12" rx="4" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
          <rect x="28" y="54" width="64" height="18" fill="#FCD34D" stroke="#78350F" strokeWidth="2.5" />
          <line x1="30" y1="72" x2="30" y2="96" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          <line x1="90" y1="72" x2="90" y2="96" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'summer':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="56" r="24" fill="#FACC15" stroke="#D97706" strokeWidth="3" />
          <path d="M18 88Q38 78 58 88T102 88" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'surprise':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="30" y="50" width="60" height="44" rx="8" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
          <rect x="26" y="34" width="68" height="16" rx="5" fill="#FBBF24" stroke="#78350F" strokeWidth="3" transform="rotate(-10 60 42)" />
          <text x="60" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="900" fontFamily="sans-serif">!</text>
        </svg>
      );

    case 'sweatshirt':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M36 30L16 58L28 66L38 50V90H82V50L92 66L104 58L84 30H70C68 38 52 38 50 30Z" fill="#94A3B8" stroke="#334155" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );

    case 'take_care':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M60 90C60 90 24 68 24 44C24 31 34 24 46 24C53 24 58 29 60 34C62 29 67 24 74 24C86 24 96 31 96 44C96 68 60 90 60 90Z" fill="#FB7185" stroke="#881337" strokeWidth="3" />
        </svg>
      );

    case 'takeaway':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="34" y="36" width="52" height="58" rx="6" fill="#FDE68A" stroke="#92400E" strokeWidth="3" />
          <path d="M48 36C48 22 72 22 72 36" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'teacher_chair':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="38" y="22" width="44" height="38" rx="8" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
          <rect x="34" y="60" width="52" height="12" rx="4" fill="#C2410C" stroke="#7C2D12" strokeWidth="3" />
          <line x1="60" y1="72" x2="60" y2="92" stroke="#334155" strokeWidth="6" />
          <line x1="40" y1="92" x2="80" y2="92" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'teacher_desk':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="16" y="42" width="88" height="12" rx="4" fill="#B45309" stroke="#451A03" strokeWidth="3" />
          <rect x="22" y="54" width="26" height="36" fill="#D97706" stroke="#451A03" strokeWidth="2.5" />
          <rect x="72" y="54" width="26" height="36" fill="#D97706" stroke="#451A03" strokeWidth="2.5" />
        </svg>
      );

    case 'teeth_set':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="22" y="42" width="76" height="36" rx="14" fill="#FFFFFF" stroke="#0F766E" strokeWidth="3" />
          <line x1="22" y1="60" x2="98" y2="60" stroke="#0F766E" strokeWidth="2.5" />
          {[42, 60, 78].map((x) => (
            <line key={x} x1={x} y1="42" x2={x} y2="78" stroke="#CBD5E1" strokeWidth="2.5" />
          ))}
        </svg>
      );

    case 'thank_you':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#FFE4E6" stroke="#E11D48" strokeWidth="3" />
          <text x="60" y="66" textAnchor="middle" fill="#9F1239" fontSize="15" fontWeight="900" fontFamily="sans-serif">THANKS!</text>
        </svg>
      );

    case 'thats_right':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#DCFCE7" stroke="#15803D" strokeWidth="3.5" />
          <path d="M40 60L54 74L82 44" stroke="#15803D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'thats_so_cool':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#E0E7FF" stroke="#4338CA" strokeWidth="3" />
          <text x="60" y="68" textAnchor="middle" fill="#312E81" fontSize="18" fontWeight="900" fontFamily="sans-serif">COOL!</text>
        </svg>
      );

    case 'today':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="22" y="24" width="76" height="72" rx="10" fill="#FFFFFF" stroke="#0F766E" strokeWidth="3" />
          <rect x="22" y="24" width="76" height="22" rx="8" fill="#0F766E" />
          <circle cx="60" cy="70" r="14" fill="#FACC15" />
        </svg>
      );

    case 'tomato_soup':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M24 56H96C94 82 78 92 60 92C42 92 26 82 24 56Z" fill="#FFFFFF" stroke="#B91C1C" strokeWidth="3" />
          <ellipse cx="60" cy="56" rx="34" ry="10" fill="#EF4444" stroke="#B91C1C" strokeWidth="2.5" />
        </svg>
      );

    case 'touch_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="36" r="14" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2.5" />
          <path d="M54 90V44C54 40 62 40 62 44V90" fill="#FDBA74" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'try_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#FFEDD5" stroke="#EA580C" strokeWidth="3" />
          <path d="M40 66L60 44L80 66" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'turkish_lesson':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="28" width="80" height="60" rx="8" fill="#DC2626" stroke="#7F1D1D" strokeWidth="3" />
          <circle cx="52" cy="58" r="14" fill="#FFFFFF" />
          <circle cx="57" cy="58" r="11" fill="#DC2626" />
          <polygon points="74,50 76,56 82,56 77,60 79,66 74,62 69,66 71,60 66,56 72,56" fill="#FFFFFF" />
        </svg>
      );

    case 'ugly_monster':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="30" y="34" width="60" height="58" rx="18" fill="#84CC16" stroke="#3F6212" strokeWidth="3" />
          <circle cx="48" cy="54" r="6" fill="#FFFFFF" stroke="#3F6212" strokeWidth="2" />
          <circle cx="48" cy="54" r="2.5" fill="#1E293B" />
          <circle cx="72" cy="56" r="4" fill="#FFFFFF" stroke="#3F6212" strokeWidth="2" />
          <path d="M42 74H78" stroke="#3F6212" strokeWidth="3" strokeLinecap="round" />
          <polygon points="48,74 52,82 56,74" fill="#FFFFFF" />
        </svg>
      );

    case 'uniform':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M36 30L20 48L32 58L40 48V90H80V48L88 58L100 48L84 30H68L60 44L52 30Z" fill="#1E3A8A" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="56,36 64,36 62,62 60,68 58,62" fill="#EF4444" />
        </svg>
      );

    case 'waitress':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="44" r="18" fill="#FDE68A" stroke="#881337" strokeWidth="3" />
          <path d="M34 96C34 74 86 74 86 96Z" fill="#E11D48" stroke="#881337" strokeWidth="3" />
          <rect x="74" y="62" width="24" height="6" rx="3" fill="#CBD5E1" stroke="#334155" strokeWidth="2" />
        </svg>
      );

    case 'want':
    case 'want_food':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="54" r="26" fill="#FCE7F3" stroke="#DB2777" strokeWidth="3" />
          <polygon points="60,38 64,49 76,50 67,58 69,69 60,63 51,69 53,58 44,50 56,49" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
        </svg>
      );

    case 'wardrobe':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="26" y="20" width="68" height="80" rx="6" fill="#D97706" stroke="#78350F" strokeWidth="3" />
          <line x1="60" y1="20" x2="60" y2="100" stroke="#78350F" strokeWidth="3" />
          <circle cx="52" cy="60" r="3.5" fill="#FEF3C7" />
          <circle cx="68" cy="60" r="3.5" fill="#FEF3C7" />
        </svg>
      );

    case 'warm_weather':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="26" fill="#FB923C" stroke="#C2410C" strokeWidth="3" />
          <path d="M36 92Q48 84 60 92T84 92" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'weak_state':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="28" y="42" width="58" height="36" rx="6" fill="#F1F5F9" stroke="#64748B" strokeWidth="3" />
          <rect x="86" y="52" width="8" height="16" rx="2" fill="#64748B" />
          <rect x="34" y="48" width="12" height="24" rx="2" fill="#EF4444" />
        </svg>
      );

    case 'well_badge':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#CCFBF1" stroke="#0F766E" strokeWidth="3.5" />
          <path d="M40 62L54 76L82 44" stroke="#0F766E" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'what':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="18" y="30" width="84" height="60" rx="14" fill="#CCFBF1" stroke="#0F766E" strokeWidth="3" />
          <text x="60" y="68" textAnchor="middle" fill="#115E59" fontSize="22" fontWeight="900" fontFamily="sans-serif">WHAT?</text>
        </svg>
      );

    case 'what_a_surprise':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="28" y="48" width="64" height="46" rx="8" fill="#FB923C" stroke="#9A3412" strokeWidth="3" />
          <rect x="55" y="48" width="10" height="46" fill="#FEF08A" />
          <text x="60" y="38" textAnchor="middle" fill="#EA580C" fontSize="24" fontWeight="900" fontFamily="sans-serif">!</text>
        </svg>
      );

    case 'whats_for_breakfast':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="64" r="32" fill="#FFFFFF" stroke="#EA580C" strokeWidth="3.5" />
          <text x="60" y="74" textAnchor="middle" fill="#EA580C" fontSize="30" fontWeight="900" fontFamily="sans-serif">?</text>
        </svg>
      );

    case 'when':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="34" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          <path d="M60 40V60L74 68" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'where':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M60 20C43 20 30 33 30 50C30 72 60 100 60 100C60 100 90 72 90 50C90 33 77 20 60 20Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="3" />
          <circle cx="60" cy="50" r="10" fill="#FFFFFF" />
        </svg>
      );

    case 'whiteboard':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="16" y="24" width="88" height="62" rx="6" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
          <rect x="22" y="30" width="76" height="50" rx="3" fill="#FFFFFF" />
          <path d="M36 52H74M36 64H62" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'who':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="44" r="16" fill="#DDD6FE" stroke="#5B21B6" strokeWidth="3" />
          <path d="M36 92C36 72 84 72 84 92Z" fill="#A855F7" stroke="#581C87" strokeWidth="3" />
          <text x="60" y="50" textAnchor="middle" fill="#4C1D95" fontSize="18" fontWeight="900" fontFamily="sans-serif">?</text>
        </svg>
      );

    case 'whose':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="24" y="34" width="72" height="52" rx="12" fill="#FFE4E6" stroke="#E11D48" strokeWidth="3" />
          <text x="60" y="66" textAnchor="middle" fill="#9F1239" fontSize="17" fontWeight="900" fontFamily="sans-serif">WHOSE?</text>
        </svg>
      );

    case 'why_not':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#ECFCCB" stroke="#4D7C0F" strokeWidth="3" />
          <path d="M40 62L54 76L82 44" stroke="#4D7C0F" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'windy':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M20 46H76C84 46 88 38 82 32C76 26 68 32 70 38" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
          <path d="M20 66H88C96 66 98 76 90 80C82 84 78 76 80 72" stroke="#14B8A6" strokeWidth="5" strokeLinecap="round" />
          <line x1="26" y1="84" x2="64" y2="84" stroke="#0F766E" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'winner':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M36 28H84V52C84 68 74 78 60 78C46 78 36 68 36 52Z" fill="#FACC15" stroke="#B45309" strokeWidth="3" />
          <text x="60" y="60" textAnchor="middle" fill="#92400E" fontSize="22" fontWeight="900" fontFamily="sans-serif">1</text>
          <rect x="44" y="84" width="32" height="12" rx="4" fill="#92400E" />
        </svg>
      );

    case 'winter':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="76" r="20" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
          <circle cx="60" cy="46" r="14" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
          <polygon points="60,46 76,48 60,51" fill="#F97316" />
          <circle cx="55" cy="42" r="2.2" fill="#1E293B" />
          <circle cx="65" cy="42" r="2.2" fill="#1E293B" />
        </svg>
      );

    case 'woman_person':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M38 46C38 24 82 24 82 46V64H38Z" fill="#78350F" />
          <circle cx="60" cy="46" r="18" fill="#FDE68A" stroke="#78350F" strokeWidth="3" />
          <circle cx="53" cy="46" r="2.5" fill="#1E293B" />
          <circle cx="67" cy="46" r="2.5" fill="#1E293B" />
          <path d="M36 96C36 74 84 74 84 96Z" fill="#9333EA" stroke="#581C87" strokeWidth="3" />
        </svg>
      );

    case 'women_group':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="42" cy="46" r="15" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
          <path d="M22 94C22 72 62 72 62 94Z" fill="#EC4899" stroke="#831843" strokeWidth="2.5" />
          <circle cx="78" cy="46" r="15" fill="#FDBA74" stroke="#78350F" strokeWidth="2.5" />
          <path d="M58 94C58 72 98 72 98 94Z" fill="#A855F7" stroke="#581C87" strokeWidth="2.5" />
        </svg>
      );

    case 'word_card':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="34" width="80" height="52" rx="10" fill="#F3E8FF" stroke="#7E22CE" strokeWidth="3" />
          <text x="60" y="66" textAnchor="middle" fill="#6B21A8" fontSize="18" fontWeight="900" fontFamily="sans-serif">HELLO</text>
        </svg>
      );

    case 'work_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="26" y="42" width="68" height="48" rx="8" fill="#64748B" stroke="#1E293B" strokeWidth="3" />
          <path d="M46 42V32H74V42" stroke="#1E293B" strokeWidth="4" strokeLinejoin="round" />
          <rect x="54" y="60" width="12" height="10" rx="2" fill="#FACC15" />
        </svg>
      );

    case 'work_in_pairs':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="42" cy="48" r="15" fill="#FDE68A" stroke="#0F766E" strokeWidth="2.5" />
          <path d="M24 92C24 72 60 72 60 92Z" fill="#14B8A6" />
          <circle cx="78" cy="48" r="15" fill="#FDBA74" stroke="#0F766E" strokeWidth="2.5" />
          <path d="M60 92C60 72 96 72 96 92Z" fill="#0284C7" />
        </svg>
      );

    case 'workbook':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="26" y="20" width="68" height="80" rx="8" fill="#14B8A6" stroke="#115E59" strokeWidth="3" />
          <rect x="40" y="34" width="40" height="22" rx="4" fill="#FFFFFF" />
          <path d="M48 45L54 51L68 38" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'write':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="24" y="26" width="72" height="68" rx="8" fill="#FFFFFF" stroke="#0F766E" strokeWidth="3" />
          <line x1="36" y1="50" x2="72" y2="50" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
          <line x1="36" y1="66" x2="62" y2="66" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
          <path d="M72 78L94 56L100 62L78 84L68 86Z" fill="#FACC15" stroke="#78350F" strokeWidth="2.5" />
        </svg>
      );

    case 'you_look_great':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          <polygon points="60,30 66,48 85,49 70,60 75,78 60,67 45,78 50,60 35,49 54,48" fill="#FACC15" stroke="#B45309" strokeWidth="2.5" />
        </svg>
      );

    case 'young_person':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="46" r="18" fill="#FDE68A" stroke="#0F766E" strokeWidth="3" />
          <path d="M40 40C46 24 74 24 80 40" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          <path d="M36 94C36 74 84 74 84 94Z" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
        </svg>
      );

    case 'youre_welcome':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#CCFBF1" stroke="#0F766E" strokeWidth="3" />
          <circle cx="48" cy="52" r="3.5" fill="#0F766E" />
          <circle cx="72" cy="52" r="3.5" fill="#0F766E" />
          <path d="M44 66Q60 80 76 66" stroke="#0F766E" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'yummy':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#FCE7F3" stroke="#DB2777" strokeWidth="3" />
          <circle cx="48" cy="52" r="3.5" fill="#1E293B" />
          <circle cx="72" cy="52" r="3.5" fill="#1E293B" />
          <path d="M44 66Q60 78 76 66" stroke="#9D174D" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M62 72C62 82 74 82 74 72Z" fill="#EF4444" />
        </svg>
      );

    default:
      return null;
  }
}
