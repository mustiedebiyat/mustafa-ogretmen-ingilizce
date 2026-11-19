import React from 'react';

export function renderExtraWordSvgA(
  illustrationKey: string,
  className: string
): React.ReactNode | null {
  switch (illustrationKey) {
    case 'afternoon':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="14" y="18" width="92" height="84" rx="16" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          <circle cx="60" cy="48" r="18" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="60" y1="48" x2={60 + 27 * Math.cos((a * Math.PI) / 180)} y2={48 + 27 * Math.sin((a * Math.PI) / 180)} stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          ))}
          <rect x="14" y="76" width="92" height="26" rx="10" fill="#86EFAC" />
          <text x="60" y="93" textAnchor="middle" fill="#14532D" fontSize="11" fontWeight="800" fontFamily="sans-serif">14:00</text>
        </svg>
      );

    case 'again':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="40" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          <path d="M80 48A24 24 0 1 0 82 70" stroke="#0369A1" strokeWidth="6" strokeLinecap="round" />
          <polygon points="84,34 88,54 68,48" fill="#0369A1" />
          <text x="60" y="65" textAnchor="middle" fill="#0C4A6E" fontSize="13" fontWeight="800" fontFamily="sans-serif">x2</text>
        </svg>
      );

    case 'and_link':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="36" cy="60" r="20" fill="#38BDF8" stroke="#0369A1" strokeWidth="3" />
          <circle cx="84" cy="60" r="20" fill="#F472B6" stroke="#9D174D" strokeWidth="3" />
          <circle cx="60" cy="60" r="14" fill="#FEF08A" stroke="#CA8A04" strokeWidth="3" />
          <text x="60" y="66" textAnchor="middle" fill="#713F12" fontSize="18" fontWeight="900" fontFamily="sans-serif">&amp;</text>
        </svg>
      );

    case 'any_food':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <ellipse cx="60" cy="76" rx="40" ry="18" fill="#F1F5F9" stroke="#475569" strokeWidth="3" />
          <ellipse cx="60" cy="74" rx="28" ry="11" fill="#E2E8F0" />
          <text x="60" y="48" textAnchor="middle" fill="#0F172A" fontSize="22" fontWeight="900" fontFamily="sans-serif">?</text>
        </svg>
      );

    case 'anytime':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#DCFCE7" stroke="#15803D" strokeWidth="3.5" />
          <circle cx="60" cy="60" r="28" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2.5" />
          <path d="M60 40V60L75 68" stroke="#15803D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <text x="60" y="80" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="800" fontFamily="sans-serif">24/7</text>
        </svg>
      );

    case 'ask':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="42" cy="68" r="18" fill="#FDBA74" stroke="#9A3412" strokeWidth="3" />
          <path d="M24 100C24 86 60 86 60 100" fill="#0D9488" stroke="#115E59" strokeWidth="3" />
          <circle cx="36" cy="66" r="2.5" fill="#1E293B" />
          <circle cx="48" cy="66" r="2.5" fill="#1E293B" />
          <path d="M68 24H96C101 24 105 28 105 33V52C105 57 101 61 96 61H78L66 70V61H68C63 61 59 57 59 52V33C59 28 63 24 68 24Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          <text x="82" y="49" textAnchor="middle" fill="#0369A1" fontSize="22" fontWeight="900" fontFamily="sans-serif">?</text>
        </svg>
      );

    case 'at_present':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="24" width="80" height="72" rx="14" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          <circle cx="60" cy="52" r="18" fill="#FFFFFF" stroke="#0369A1" strokeWidth="3" />
          <path d="M60 41V52L68 56" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <rect x="30" y="75" width="60" height="14" rx="5" fill="#0284C7" />
          <text x="60" y="85" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="sans-serif">NOW</text>
        </svg>
      );

    case 'autumn':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M60 20L70 42L94 38L78 58L90 78L64 72L60 98L56 72L30 78L42 58L26 38L50 42Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" strokeLinejoin="round" />
          <line x1="60" y1="36" x2="60" y2="96" stroke="#FED7AA" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="28" cy="90" r="6" fill="#F59E0B" />
          <circle cx="92" cy="88" r="5" fill="#DC2626" />
        </svg>
      );

    case 'bad_mood':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#E2E8F0" stroke="#475569" strokeWidth="3" />
          <path d="M40 46L50 51M80 46L70 51" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          <circle cx="47" cy="55" r="3.5" fill="#1E293B" />
          <circle cx="73" cy="55" r="3.5" fill="#1E293B" />
          <path d="M44 80C50 70 70 70 76 80" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'basket':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M36 52C36 26 84 26 84 52" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
          <polygon points="24,52 96,52 84,96 36,96" fill="#F59E0B" stroke="#78350F" strokeWidth="3" strokeLinejoin="round" />
          <rect x="20" y="46" width="80" height="10" rx="4" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
          <line x1="34" y1="68" x2="86" y2="68" stroke="#92400E" strokeWidth="2.5" />
          <line x1="38" y1="82" x2="82" y2="82" stroke="#92400E" strokeWidth="2.5" />
          <line x1="50" y1="56" x2="52" y2="96" stroke="#92400E" strokeWidth="2.5" />
          <line x1="70" y1="56" x2="68" y2="96" stroke="#92400E" strokeWidth="2.5" />
        </svg>
      );

    case 'be_careful':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <polygon points="60,20 100,94 20,94" fill="#FACC15" stroke="#92400E" strokeWidth="4" strokeLinejoin="round" />
          <line x1="60" y1="45" x2="60" y2="70" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          <circle cx="60" cy="82" r="4" fill="#78350F" />
        </svg>
      );

    case 'beautiful':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <ellipse cx="44" cy="48" rx="22" ry="16" transform="rotate(-25 44 48)" fill="#F472B6" stroke="#9D174D" strokeWidth="3" />
          <ellipse cx="76" cy="48" rx="22" ry="16" transform="rotate(25 76 48)" fill="#F472B6" stroke="#9D174D" strokeWidth="3" />
          <ellipse cx="46" cy="74" rx="16" ry="12" transform="rotate(20 46 74)" fill="#FBBF24" stroke="#9D174D" strokeWidth="2.5" />
          <ellipse cx="74" cy="74" rx="16" ry="12" transform="rotate(-20 74 74)" fill="#FBBF24" stroke="#9D174D" strokeWidth="2.5" />
          <rect x="57" y="38" width="6" height="46" rx="3" fill="#4C1D95" />
          <path d="M58 38C54 28 48 26 45 28M62 38C66 28 72 26 75 28" stroke="#4C1D95" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'bin':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="46" y="20" width="28" height="8" rx="3" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="30" y="28" width="60" height="10" rx="4" fill="#94A3B8" stroke="#1E293B" strokeWidth="3" />
          <polygon points="36,38 84,38 78,98 42,98" fill="#CBD5E1" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />
          <line x1="48" y1="48" x2="50" y2="88" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="48" x2="60" y2="88" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          <line x1="72" y1="48" x2="70" y2="88" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'birthday':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="26" y="58" width="68" height="36" rx="8" fill="#FB7185" stroke="#881337" strokeWidth="3" />
          <path d="M26 68Q38 78 50 68Q62 78 74 68Q86 78 94 68V58H26Z" fill="#FEF3C7" />
          <rect x="44" y="34" width="8" height="24" rx="2" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" />
          <rect x="68" y="34" width="8" height="24" rx="2" fill="#FACC15" stroke="#A16207" strokeWidth="2" />
          <path d="M48 22C52 26 52 32 48 34C44 32 44 26 48 22Z" fill="#F97316" />
          <path d="M72 22C76 26 76 32 72 34C68 32 68 26 72 22Z" fill="#F97316" />
        </svg>
      );

    case 'blackboard':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="16" y="24" width="88" height="62" rx="6" fill="#92400E" stroke="#451A03" strokeWidth="3" />
          <rect x="22" y="30" width="76" height="50" rx="3" fill="#1E293B" />
          <text x="60" y="60" textAnchor="middle" fill="#F8FAFC" fontSize="16" fontWeight="800" fontFamily="sans-serif">A B C</text>
          <rect x="44" y="86" width="32" height="7" rx="2" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
        </svg>
      );

    case 'board_game':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="24" width="80" height="72" rx="10" fill="#EDE9FE" stroke="#6D28D9" strokeWidth="3" />
          <rect x="30" y="36" width="26" height="26" rx="5" fill="#FFFFFF" stroke="#4C1D95" strokeWidth="2.5" />
          <circle cx="38" cy="44" r="3" fill="#4C1D95" />
          <circle cx="48" cy="54" r="3" fill="#4C1D95" />
          <rect x="64" y="54" width="26" height="26" rx="5" fill="#FDE047" stroke="#A16207" strokeWidth="2.5" />
          <circle cx="77" cy="67" r="4" fill="#DC2626" />
        </svg>
      );

    case 'bookshelf':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="18" width="80" height="84" rx="6" fill="#D97706" stroke="#78350F" strokeWidth="3" />
          <rect x="26" y="24" width="68" height="32" fill="#FEF3C7" />
          <rect x="26" y="62" width="68" height="32" fill="#FEF3C7" />
          <rect x="30" y="30" width="11" height="26" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
          <rect x="42" y="32" width="11" height="24" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="2" />
          <rect x="54" y="28" width="11" height="28" fill="#10B981" stroke="#065F46" strokeWidth="2" />
          <rect x="32" y="68" width="12" height="26" fill="#A855F7" stroke="#581C87" strokeWidth="2" />
          <rect x="46" y="70" width="12" height="24" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
        </svg>
      );

    case 'boy':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="48" r="22" fill="#FDE68A" stroke="#78350F" strokeWidth="3" />
          <path d="M38 42C40 24 80 24 82 42C74 34 46 34 38 42Z" fill="#451A03" />
          <circle cx="52" cy="48" r="3" fill="#1E293B" />
          <circle cx="68" cy="48" r="3" fill="#1E293B" />
          <path d="M52 58Q60 64 68 58" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M34 98C34 78 86 78 86 98Z" fill="#0284C7" stroke="#0C4A6E" strokeWidth="3" />
        </svg>
      );

    case 'breakfast_time':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="34" cy="34" r="14" fill="#FACC15" stroke="#B45309" strokeWidth="2.5" />
          <rect x="34" y="54" width="44" height="36" rx="8" fill="#FDE68A" stroke="#92400E" strokeWidth="3" />
          <circle cx="84" cy="68" r="16" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
          <path d="M84 58V68L91 72" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'bring':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="44" y="34" width="44" height="36" rx="6" fill="#FBBF24" stroke="#78350F" strokeWidth="3" />
          <path d="M22 80H78L94 68" stroke="#FDBA74" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 50H38" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <polygon points="36,42 46,50 36,58" fill="#0284C7" />
        </svg>
      );

    case 'but_link':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="18" y="36" width="34" height="34" rx="8" fill="#22C55E" stroke="#14532D" strokeWidth="3" />
          <path d="M27 53L33 59L44 47" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="68" y="36" width="34" height="34" rx="8" fill="#EF4444" stroke="#7F1D1D" strokeWidth="3" />
          <path d="M77 45L93 61M93 45L77 61" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <text x="60" y="92" textAnchor="middle" fill="#9A3412" fontSize="14" fontWeight="900" fontFamily="sans-serif">BUT</text>
        </svg>
      );

    case 'cafe':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M20 42H100L94 24H26Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" strokeLinejoin="round" />
          <rect x="26" y="42" width="68" height="54" fill="#FFF7ED" stroke="#7C2D12" strokeWidth="3" />
          <path d="M44 60H72V74C72 81 66 86 58 86C50 86 44 81 44 74Z" fill="#78350F" />
          <path d="M72 64H78C81 64 81 74 72 74" stroke="#78350F" strokeWidth="3" />
        </svg>
      );

    case 'calm_down':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#CCFBF1" stroke="#0F766E" strokeWidth="3" />
          <path d="M36 56Q45 62 54 56" stroke="#115E59" strokeWidth="3" strokeLinecap="round" />
          <path d="M66 56Q75 62 84 56" stroke="#115E59" strokeWidth="3" strokeLinecap="round" />
          <path d="M46 74Q60 80 74 74" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'card':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="24" y="28" width="72" height="64" rx="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3.5" />
          <polygon points="60,42 65,54 78,55 68,63 71,76 60,69 49,76 52,63 42,55 55,54" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
        </svg>
      );

    case 'careful':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#FEF3C7" stroke="#D97706" strokeWidth="3.5" />
          <ellipse cx="45" cy="54" rx="7" ry="9" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <ellipse cx="75" cy="54" rx="7" ry="9" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="45" cy="54" r="3" fill="#1E293B" />
          <circle cx="75" cy="54" r="3" fill="#1E293B" />
          <line x1="48" y1="76" x2="72" y2="76" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'child_person':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="46" r="20" fill="#FDE68A" stroke="#78350F" strokeWidth="3" />
          <circle cx="53" cy="45" r="2.8" fill="#1E293B" />
          <circle cx="67" cy="45" r="2.8" fill="#1E293B" />
          <path d="M53 54Q60 60 67 54" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M38 96C38 78 82 78 82 96Z" fill="#F59E0B" stroke="#92400E" strokeWidth="3" />
        </svg>
      );

    case 'children_group':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="38" cy="48" r="15" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
          <path d="M20 92C20 74 56 74 56 92Z" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" />
          <circle cx="82" cy="48" r="15" fill="#FDBA74" stroke="#78350F" strokeWidth="2.5" />
          <path d="M64 92C64 74 100 74 100 92Z" fill="#F472B6" stroke="#9D174D" strokeWidth="2.5" />
          <circle cx="60" cy="42" r="15" fill="#FEF3C7" stroke="#78350F" strokeWidth="2.5" />
          <path d="M42 96C42 76 78 76 78 96Z" fill="#22C55E" stroke="#14532D" strokeWidth="2.5" />
        </svg>
      );

    case 'circle_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="42" y="42" width="36" height="36" rx="6" fill="#CCFBF1" stroke="#0F766E" strokeWidth="2.5" />
          <circle cx="60" cy="60" r="36" stroke="#DC2626" strokeWidth="5" strokeDasharray="8 4" />
        </svg>
      );

    case 'color_black':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
          <path d="M40 42A24 24 0 0 1 68 34" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'color_blue':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#2563EB" stroke="#1E3A8A" strokeWidth="4" />
          <path d="M40 42A24 24 0 0 1 68 34" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'color_brown':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#92400E" stroke="#451A03" strokeWidth="4" />
          <path d="M40 42A24 24 0 0 1 68 34" stroke="#FCD34D" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.6" />
        </svg>
      );

    case 'color_dark':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="22" y="28" width="76" height="64" rx="14" fill="#1E1B4B" stroke="#0F172A" strokeWidth="3" />
          <path d="M68 42A16 16 0 1 0 80 70A13 13 0 1 1 68 42Z" fill="#FDE047" />
        </svg>
      );

    case 'color_green':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#16A34A" stroke="#14532D" strokeWidth="4" />
          <path d="M40 42A24 24 0 0 1 68 34" stroke="#86EFAC" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'color_grey':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#94A3B8" stroke="#475569" strokeWidth="4" />
          <path d="M40 42A24 24 0 0 1 68 34" stroke="#E2E8F0" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'color_light':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="22" y="28" width="76" height="64" rx="14" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          <circle cx="60" cy="60" r="16" fill="#FDE047" stroke="#EAB308" strokeWidth="3" />
        </svg>
      );

    case 'color_pink':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#EC4899" stroke="#831843" strokeWidth="4" />
          <path d="M40 42A24 24 0 0 1 68 34" stroke="#FBCFE8" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'color_purple':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#9333EA" stroke="#581C87" strokeWidth="4" />
          <path d="M40 42A24 24 0 0 1 68 34" stroke="#E9D5FF" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'color_red':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#DC2626" stroke="#7F1D1D" strokeWidth="4" />
          <path d="M40 42A24 24 0 0 1 68 34" stroke="#FCA5A5" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'color_white':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#FFFFFF" stroke="#64748B" strokeWidth="4" />
          <path d="M40 42A24 24 0 0 1 68 34" stroke="#E2E8F0" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'color_yellow':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#FACC15" stroke="#A16207" strokeWidth="4" />
          <path d="M40 42A24 24 0 0 1 68 34" stroke="#FEF9C3" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'colour_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#FFFBEB" stroke="#B45309" strokeWidth="3" />
          <circle cx="42" cy="48" r="9" fill="#EF4444" />
          <circle cx="66" cy="42" r="9" fill="#3B82F6" />
          <circle cx="76" cy="66" r="9" fill="#22C55E" />
          <circle cx="48" cy="74" r="9" fill="#FACC15" />
        </svg>
      );

    case 'come_on':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#FFEDD5" stroke="#EA580C" strokeWidth="3" />
          <path d="M36 60H76" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
          <polygon points="68,42 90,60 68,78" fill="#EA580C" />
        </svg>
      );

    case 'computer_mouse':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M60 16C60 16 74 16 74 28" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          <rect x="38" y="30" width="44" height="66" rx="22" fill="#E2E8F0" stroke="#334155" strokeWidth="3.5" />
          <line x1="60" y1="30" x2="60" y2="60" stroke="#334155" strokeWidth="2.5" />
          <line x1="38" y1="60" x2="82" y2="60" stroke="#334155" strokeWidth="2.5" />
          <rect x="56" y="40" width="8" height="14" rx="4" fill="#0284C7" />
        </svg>
      );

    case 'cool':
    case 'cool_style':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#FEF08A" stroke="#CA8A04" strokeWidth="3" />
          <rect x="32" y="46" width="24" height="16" rx="4" fill="#0F172A" />
          <rect x="64" y="46" width="24" height="16" rx="4" fill="#0F172A" />
          <line x1="56" y1="52" x2="64" y2="52" stroke="#0F172A" strokeWidth="3" />
          <path d="M46 74Q60 84 74 74" stroke="#854D0E" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'correct_mark':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#DCFCE7" stroke="#16A34A" strokeWidth="4" />
          <path d="M38 62L53 77L84 44" stroke="#15803D" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'coursebook':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="26" y="20" width="68" height="80" rx="8" fill="#F97316" stroke="#7C2D12" strokeWidth="3" />
          <rect x="26" y="20" width="12" height="80" rx="4" fill="#C2410C" stroke="#7C2D12" strokeWidth="2.5" />
          <rect x="46" y="34" width="38" height="22" rx="4" fill="#FFF7ED" />
          <text x="65" y="49" textAnchor="middle" fill="#9A3412" fontSize="11" fontWeight="900" fontFamily="sans-serif">ABC</text>
        </svg>
      );

    case 'customer':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="52" cy="46" r="18" fill="#FDE68A" stroke="#78350F" strokeWidth="3" />
          <path d="M28 96C28 74 76 74 76 96Z" fill="#0284C7" stroke="#0C4A6E" strokeWidth="3" />
          <rect x="78" y="56" width="22" height="24" rx="4" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
        </svg>
      );

    case 'cute':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="64" r="32" fill="#FCE7F3" stroke="#DB2777" strokeWidth="3" />
          <circle cx="42" cy="36" r="10" fill="#FCE7F3" stroke="#DB2777" strokeWidth="3" />
          <circle cx="78" cy="36" r="10" fill="#FCE7F3" stroke="#DB2777" strokeWidth="3" />
          <circle cx="48" cy="60" r="4" fill="#1E293B" />
          <circle cx="72" cy="60" r="4" fill="#1E293B" />
          <circle cx="40" cy="68" r="5" fill="#F9A8D4" />
          <circle cx="80" cy="68" r="5" fill="#F9A8D4" />
          <path d="M54 70Q60 76 66 70" stroke="#9D174D" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'decorate':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M18 32Q60 56 102 32" stroke="#475569" strokeWidth="2.5" />
          <polygon points="24,36 38,39 30,54" fill="#EF4444" />
          <polygon points="46,42 60,44 52,60" fill="#FACC15" />
          <polygon points="68,42 82,39 76,56" fill="#3B82F6" />
          <polygon points="88,36 100,32 96,49" fill="#22C55E" />
          <circle cx="34" cy="84" r="12" fill="#EC4899" stroke="#831843" strokeWidth="2.5" />
          <circle cx="84" cy="84" r="12" fill="#06B6D4" stroke="#164E63" strokeWidth="2.5" />
        </svg>
      );

    case 'device':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="26" y="20" width="68" height="80" rx="10" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
          <rect x="33" y="28" width="54" height="58" rx="4" fill="#38BDF8" />
          <circle cx="60" cy="93" r="4" fill="#94A3B8" />
          <circle cx="60" cy="56" r="12" fill="#FDE047" />
        </svg>
      );

    case 'dinner_ready':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M24 74C24 50 96 50 96 74Z" fill="#CBD5E1" stroke="#334155" strokeWidth="3" />
          <circle cx="60" cy="46" r="6" fill="#94A3B8" stroke="#334155" strokeWidth="2.5" />
          <rect x="18" y="74" width="84" height="10" rx="5" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
          <path d="M44 36C44 30 48 26 44 20M76 36C76 30 80 26 76 20" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'dish_plate':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3.5" />
          <circle cx="60" cy="60" r="24" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2.5" />
        </svg>
      );

    case 'dislike_heart':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M60 92C60 92 22 68 22 44C22 31 32 24 44 24C52 24 57 29 60 35C63 29 68 24 76 24C88 24 98 31 98 44C98 68 60 92 60 92Z" fill="#FECDD3" stroke="#BE123C" strokeWidth="3" />
          <line x1="28" y1="28" x2="92" y2="88" stroke="#BE123C" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'do_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#CCFBF1" stroke="#0F766E" strokeWidth="3" />
          <polygon points="60,30 68,52 92,52 72,66 80,88 60,74 40,88 48,66 28,52 52,52" fill="#14B8A6" stroke="#115E59" strokeWidth="2.5" />
        </svg>
      );

    case 'do_me_favour':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#FFE4E6" stroke="#E11D48" strokeWidth="3" />
          <path d="M38 66L54 80L82 48" stroke="#E11D48" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="84" cy="36" r="10" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
        </svg>
      );

    case 'dont_forget':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="26" y="24" width="68" height="72" rx="10" fill="#FEF08A" stroke="#B45309" strokeWidth="3" />
          <circle cx="60" cy="24" r="6" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
          <line x1="60" y1="42" x2="60" y2="68" stroke="#B45309" strokeWidth="6" strokeLinecap="round" />
          <circle cx="60" cy="80" r="4" fill="#B45309" />
        </svg>
      );

    case 'draw':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="26" width="70" height="68" rx="8" fill="#FFFFFF" stroke="#475569" strokeWidth="3" />
          <path d="M32 70Q46 44 62 66T80 48" stroke="#E11D48" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M74 78L96 56L102 62L80 84L70 86Z" fill="#FACC15" stroke="#713F12" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );

    case 'drink_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <polygon points="38,38 82,38 74,94 46,94" fill="#BAE6FD" stroke="#0369A1" strokeWidth="3" strokeLinejoin="round" />
          <path d="M68 38L78 18L90 18" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'duster':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="24" y="42" width="72" height="20" rx="6" fill="#D97706" stroke="#78350F" strokeWidth="3" />
          <rect x="24" y="62" width="72" height="16" rx="4" fill="#334155" stroke="#0F172A" strokeWidth="3" />
          <line x1="34" y1="52" x2="86" y2="52" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'earring':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="34" r="10" fill="#FACC15" stroke="#A16207" strokeWidth="3" />
          <polygon points="60,48 76,68 60,92 44,68" fill="#38BDF8" stroke="#0369A1" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );

    case 'eat_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="64" r="34" fill="#FFFFFF" stroke="#EA580C" strokeWidth="3.5" />
          <circle cx="60" cy="64" r="22" fill="#FED7AA" />
          <line x1="22" y1="34" x2="22" y2="88" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          <line x1="98" y1="34" x2="98" y2="88" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'eat_together':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="22" y="60" width="76" height="12" rx="4" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="42" cy="42" r="12" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="78" cy="42" r="12" fill="#FDBA74" stroke="#78350F" strokeWidth="2.5" />
          <ellipse cx="44" cy="57" rx="10" ry="4" fill="#FFFFFF" stroke="#475569" strokeWidth="2" />
          <ellipse cx="76" cy="57" rx="10" ry="4" fill="#FFFFFF" stroke="#475569" strokeWidth="2" />
        </svg>
      );

    case 'enjoy_meal':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="64" r="34" fill="#DCFCE7" stroke="#15803D" strokeWidth="3.5" />
          <path d="M60 44C60 44 46 36 46 28C46 23 50 20 55 20C58 20 60 22 60 24C60 22 62 20 65 20C70 20 74 23 74 28C74 36 60 44 60 44Z" fill="#EF4444" />
          <circle cx="60" cy="66" r="18" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2.5" />
        </svg>
      );

    case 'evening':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="16" y="20" width="88" height="80" rx="16" fill="#4338CA" stroke="#1E1B4B" strokeWidth="3" />
          <circle cx="60" cy="66" r="22" fill="#F97316" />
          <rect x="16" y="70" width="88" height="30" rx="10" fill="#1E1B4B" />
        </svg>
      );

    case 'every_badge':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#CCFBF1" stroke="#0F766E" strokeWidth="3" />
          <circle cx="42" cy="48" r="8" fill="#14B8A6" />
          <circle cx="78" cy="48" r="8" fill="#14B8A6" />
          <circle cx="42" cy="74" r="8" fill="#14B8A6" />
          <circle cx="78" cy="74" r="8" fill="#14B8A6" />
        </svg>
      );

    case 'every_day':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="22" y="26" width="76" height="72" rx="10" fill="#FFFFFF" stroke="#D97706" strokeWidth="3" />
          <rect x="22" y="26" width="76" height="20" rx="8" fill="#F59E0B" />
          {[36, 52, 68, 84].map((x) => (
            <circle key={x} cx={x} cy="62" r="4" fill="#16A34A" />
          ))}
          {[36, 52, 68, 84].map((x) => (
            <circle key={x} cx={x} cy="80" r="4" fill="#16A34A" />
          ))}
        </svg>
      );

    case 'everything_ok':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#DCFCE7" stroke="#15803D" strokeWidth="3.5" />
          <text x="60" y="68" textAnchor="middle" fill="#15803D" fontSize="26" fontWeight="900" fontFamily="sans-serif">OK!</text>
        </svg>
      );

    case 'fantastic':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <polygon points="60,18 70,46 100,46 76,64 85,94 60,76 35,94 44,64 20,46 50,46" fill="#FACC15" stroke="#B45309" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="30" cy="26" r="5" fill="#EC4899" />
          <circle cx="92" cy="26" r="5" fill="#38BDF8" />
        </svg>
      );

    case 'fast_food':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M30 52C30 34 90 34 90 52Z" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
          <rect x="26" y="52" width="68" height="10" rx="4" fill="#22C55E" />
          <rect x="28" y="62" width="64" height="12" rx="4" fill="#78350F" />
          <rect x="30" y="74" width="60" height="14" rx="6" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
        </svg>
      );

    case 'fat_shape':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="64" r="38" fill="#FDE68A" stroke="#92400E" strokeWidth="3.5" />
          <circle cx="48" cy="56" r="3.5" fill="#1E293B" />
          <circle cx="72" cy="56" r="3.5" fill="#1E293B" />
          <path d="M50 72Q60 79 70 72" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'favour_gift':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="30" y="46" width="60" height="48" rx="8" fill="#F472B6" stroke="#831843" strokeWidth="3" />
          <rect x="55" y="46" width="10" height="48" fill="#FDE047" />
          <path d="M60 46C46 28 32 42 46 46M60 46C74 28 88 42 74 46" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'favourite_star':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M60 94C60 94 20 68 20 44C20 30 31 22 43 22C51 22 57 27 60 33C63 27 69 22 77 22C89 22 100 30 100 44C100 68 60 94 60 94Z" fill="#EC4899" stroke="#831843" strokeWidth="3" />
          <polygon points="60,42 64,52 74,53 66,60 68,70 60,65 52,70 54,60 46,53 56,52" fill="#FDE047" />
        </svg>
      );

    case 'feet_pair':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <ellipse cx="42" cy="68" rx="12" ry="22" fill="#FDBA74" stroke="#9A3412" strokeWidth="3" />
          <ellipse cx="78" cy="68" rx="12" ry="22" fill="#FDBA74" stroke="#9A3412" strokeWidth="3" />
          <circle cx="35" cy="40" r="3" fill="#FDBA74" stroke="#9A3412" strokeWidth="2" />
          <circle cx="43" cy="39" r="3" fill="#FDBA74" stroke="#9A3412" strokeWidth="2" />
          <circle cx="77" cy="39" r="3" fill="#FDBA74" stroke="#9A3412" strokeWidth="2" />
          <circle cx="85" cy="40" r="3" fill="#FDBA74" stroke="#9A3412" strokeWidth="2" />
        </svg>
      );

    case 'find':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="52" cy="52" r="24" fill="#DCFCE7" stroke="#15803D" strokeWidth="5" />
          <line x1="70" y1="70" x2="94" y2="94" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );

    case 'finish':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <line x1="28" y1="22" x2="28" y2="98" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          <rect x="30" y="24" width="60" height="38" rx="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
          <rect x="30" y="24" width="20" height="19" fill="#0F172A" />
          <rect x="70" y="24" width="20" height="19" fill="#0F172A" />
          <rect x="50" y="43" width="20" height="19" fill="#0F172A" />
        </svg>
      );

    case 'flashcard':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="34" width="66" height="48" rx="8" fill="#E9D5FF" stroke="#6B21A8" strokeWidth="3" />
          <rect x="32" y="42" width="68" height="48" rx="8" fill="#FFFFFF" stroke="#7E22CE" strokeWidth="3" />
          <text x="66" y="72" textAnchor="middle" fill="#6B21A8" fontSize="14" fontWeight="900" fontFamily="sans-serif">WORD</text>
        </svg>
      );

    case 'follow_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <ellipse cx="42" cy="76" rx="10" ry="16" transform="rotate(-15 42 76)" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" />
          <ellipse cx="76" cy="46" rx="10" ry="16" transform="rotate(-15 76 46)" fill="#0284C7" stroke="#0C4A6E" strokeWidth="2.5" />
        </svg>
      );

    case 'freezing':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#CFFAFE" stroke="#0891B2" strokeWidth="3" />
          <line x1="60" y1="28" x2="60" y2="92" stroke="#0E7490" strokeWidth="4" strokeLinecap="round" />
          <line x1="32" y1="44" x2="88" y2="76" stroke="#0E7490" strokeWidth="4" strokeLinecap="round" />
          <line x1="88" y1="44" x2="32" y2="76" stroke="#0E7490" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'freq_always':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="34" width="80" height="52" rx="12" fill="#DCFCE7" stroke="#15803D" strokeWidth="3" />
          <text x="60" y="66" textAnchor="middle" fill="#14532D" fontSize="22" fontWeight="900" fontFamily="sans-serif">100%</text>
        </svg>
      );

    case 'freq_never':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="34" width="80" height="52" rx="12" fill="#FEE2E2" stroke="#B91C1C" strokeWidth="3" />
          <text x="60" y="66" textAnchor="middle" fill="#991B1B" fontSize="24" fontWeight="900" fontFamily="sans-serif">0%</text>
        </svg>
      );

    case 'freq_often':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="34" width="80" height="52" rx="12" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          <text x="60" y="66" textAnchor="middle" fill="#0C4A6E" fontSize="24" fontWeight="900" fontFamily="sans-serif">75%</text>
        </svg>
      );

    case 'freq_sometimes':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="20" y="34" width="80" height="52" rx="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          <text x="60" y="66" textAnchor="middle" fill="#92400E" fontSize="24" fontWeight="900" fontFamily="sans-serif">50%</text>
        </svg>
      );

    case 'full_stomach':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#DCFCE7" stroke="#15803D" strokeWidth="3" />
          <circle cx="48" cy="52" r="3.5" fill="#1E293B" />
          <circle cx="72" cy="52" r="3.5" fill="#1E293B" />
          <path d="M44 68Q60 82 76 68" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'garden_place':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="16" y="72" width="88" height="28" rx="8" fill="#4ADE80" stroke="#15803D" strokeWidth="3" />
          <line x1="40" y1="54" x2="40" y2="78" stroke="#15803D" strokeWidth="3.5" />
          <circle cx="40" cy="46" r="10" fill="#F472B6" stroke="#9D174D" strokeWidth="2.5" />
          <line x1="78" y1="50" x2="78" y2="78" stroke="#15803D" strokeWidth="3.5" />
          <circle cx="78" cy="42" r="11" fill="#FACC15" stroke="#B45309" strokeWidth="2.5" />
        </svg>
      );

    case 'garden_work':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="18" y="76" width="84" height="22" rx="6" fill="#84CC16" stroke="#3F6212" strokeWidth="3" />
          <path d="M42 40L72 70" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
          <polygon points="68,62 84,74 74,84 62,68" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M46 76C46 58 62 58 62 76" fill="#22C55E" />
        </svg>
      );

    case 'girl':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="34" cy="42" r="10" fill="#78350F" />
          <circle cx="86" cy="42" r="10" fill="#78350F" />
          <circle cx="60" cy="48" r="22" fill="#FDE68A" stroke="#78350F" strokeWidth="3" />
          <circle cx="52" cy="48" r="3" fill="#1E293B" />
          <circle cx="68" cy="48" r="3" fill="#1E293B" />
          <path d="M52 58Q60 64 68 58" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 98C36 78 84 78 84 98Z" fill="#EC4899" stroke="#831843" strokeWidth="3" />
        </svg>
      );

    case 'give_a_hand':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          <path d="M42 74V46C42 42 48 42 48 46V60M48 60V38C48 34 54 34 54 38V60M54 60V36C54 32 60 32 60 36V60M60 60V42C60 38 66 38 66 42V74C66 84 42 84 42 74Z" fill="#FDBA74" stroke="#9A3412" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );

    case 'go_action':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#DCFCE7" stroke="#16A34A" strokeWidth="3.5" />
          <text x="60" y="68" textAnchor="middle" fill="#15803D" fontSize="26" fontWeight="900" fontFamily="sans-serif">GO!</text>
        </svg>
      );

    case 'go_on_please':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#D1FAE5" stroke="#059669" strokeWidth="3.5" />
          <polygon points="48,40 80,60 48,80" fill="#059669" />
        </svg>
      );

    case 'good_thumb':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#DCFCE7" stroke="#15803D" strokeWidth="3" />
          <path d="M46 58V84H74C78 84 82 78 82 64C82 58 76 56 66 56V38C66 32 58 32 56 38L46 58Z" fill="#FDE68A" stroke="#92400E" strokeWidth="3" strokeLinejoin="round" />
          <rect x="34" y="58" width="12" height="26" rx="3" fill="#0284C7" />
        </svg>
      );

    case 'good_to_see_you':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="44" cy="52" r="16" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="76" cy="52" r="16" fill="#FDBA74" stroke="#78350F" strokeWidth="2.5" />
          <path d="M46 82C46 72 74 72 74 82" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="28" r="9" fill="#F43F5E" />
        </svg>
      );

    case 'granddaughter':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="48" r="20" fill="#FDE68A" stroke="#9D174D" strokeWidth="3" />
          <path d="M40 42C44 26 76 26 80 42" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          <circle cx="53" cy="48" r="2.8" fill="#1E293B" />
          <circle cx="67" cy="48" r="2.8" fill="#1E293B" />
          <path d="M53 56Q60 62 67 56" stroke="#9D174D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 96C36 76 84 76 84 96Z" fill="#FB7185" stroke="#881337" strokeWidth="3" />
        </svg>
      );

    case 'grandparents':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="42" cy="48" r="16" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
          <path d="M26 42C28 28 56 28 58 42" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          <circle cx="78" cy="48" r="16" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
          <path d="M62 42C64 28 92 28 94 42" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
          <path d="M24 96C24 76 60 76 60 96Z" fill="#0284C7" stroke="#0C4A6E" strokeWidth="2.5" />
          <path d="M60 96C60 76 96 76 96 96Z" fill="#A855F7" stroke="#581C87" strokeWidth="2.5" />
        </svg>
      );

    case 'grandson':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="48" r="20" fill="#FDE68A" stroke="#0369A1" strokeWidth="3" />
          <path d="M40 42C44 26 76 26 80 42" stroke="#451A03" strokeWidth="6" strokeLinecap="round" />
          <circle cx="53" cy="48" r="2.8" fill="#1E293B" />
          <circle cx="67" cy="48" r="2.8" fill="#1E293B" />
          <path d="M53 56Q60 62 67 56" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 96C36 76 84 76 84 96Z" fill="#38BDF8" stroke="#0369A1" strokeWidth="3" />
        </svg>
      );

    case 'great_job':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="54" r="32" fill="#FACC15" stroke="#B45309" strokeWidth="3.5" />
          <polygon points="60,34 65,48 80,49 68,58 71,72 60,64 49,72 52,58 40,49 55,48" fill="#FFFFFF" />
          <path d="M46 84L40 104L54 96L60 104L66 96L80 104L74 84" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
        </svg>
      );

    case 'green_salad':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="44" cy="54" r="14" fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
          <circle cx="74" cy="52" r="15" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <circle cx="60" cy="48" r="14" fill="#86EFAC" stroke="#15803D" strokeWidth="2.5" />
          <path d="M24 62H96C94 86 78 96 60 96C42 96 26 86 24 62Z" fill="#FFFFFF" stroke="#15803D" strokeWidth="3" />
        </svg>
      );

    case 'hand_bag':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <path d="M44 46C44 28 76 28 76 46" stroke="#9D174D" strokeWidth="4.5" strokeLinecap="round" />
          <rect x="28" y="46" width="64" height="50" rx="10" fill="#FB7185" stroke="#881337" strokeWidth="3" />
          <rect x="52" y="56" width="16" height="10" rx="3" fill="#FDE047" stroke="#881337" strokeWidth="2" />
        </svg>
      );

    case 'handsome':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="52" r="24" fill="#FDE68A" stroke="#78350F" strokeWidth="3" />
          <path d="M36 46C38 24 82 24 84 46C74 34 46 34 36 46Z" fill="#1E293B" />
          <circle cx="51" cy="52" r="3" fill="#1E293B" />
          <circle cx="69" cy="52" r="3" fill="#1E293B" />
          <path d="M52 63Q60 69 68 63" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="48,84 60,92 72,84 60,78" fill="#2563EB" />
        </svg>
      );

    case 'happy_birthday':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <polygon points="60,20 88,88 32,88" fill="#EC4899" stroke="#831843" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="60" cy="20" r="8" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
          <circle cx="52" cy="60" r="5" fill="#FDE047" />
          <circle cx="68" cy="70" r="5" fill="#38BDF8" />
          <circle cx="60" cy="46" r="4" fill="#FFFFFF" />
        </svg>
      );

    case 'hardworking':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="24" y="30" width="72" height="58" rx="10" fill="#CCFBF1" stroke="#0F766E" strokeWidth="3" />
          <rect x="34" y="42" width="52" height="12" rx="4" fill="#FFFFFF" stroke="#0D9488" strokeWidth="2" />
          <path d="M38 66L44 72L54 62" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="68" x2="82" y2="68" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'hate_face':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#FEE2E2" stroke="#DC2626" strokeWidth="3.5" />
          <path d="M38 44L52 52M82 44L68 52" stroke="#991B1B" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="46" cy="56" r="3.5" fill="#1E293B" />
          <circle cx="74" cy="56" r="3.5" fill="#1E293B" />
          <path d="M44 78Q60 66 76 78" stroke="#991B1B" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'help':
    case 'help_me':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#FFFFFF" stroke="#DC2626" strokeWidth="6" />
          <circle cx="60" cy="60" r="18" fill="#E0F2FE" stroke="#DC2626" strokeWidth="4" />
          <line x1="60" y1="22" x2="60" y2="42" stroke="#DC2626" strokeWidth="8" />
          <line x1="60" y1="78" x2="60" y2="98" stroke="#DC2626" strokeWidth="8" />
          <line x1="22" y1="60" x2="42" y2="60" stroke="#DC2626" strokeWidth="8" />
          <line x1="78" y1="60" x2="98" y2="60" stroke="#DC2626" strokeWidth="8" />
        </svg>
      );

    case 'here_you_are':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="24" y="64" width="72" height="12" rx="6" fill="#0284C7" />
          <rect x="42" y="34" width="36" height="30" rx="6" fill="#FDE047" stroke="#A16207" strokeWidth="3" />
          <path d="M36 90Q60 80 84 90" stroke="#0369A1" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'homework':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="28" y="22" width="64" height="76" rx="8" fill="#FFFFFF" stroke="#4338CA" strokeWidth="3" />
          <line x1="40" y1="40" x2="80" y2="40" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />
          <line x1="40" y1="54" x2="80" y2="54" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />
          <line x1="40" y1="68" x2="68" y2="68" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />
          <circle cx="80" cy="82" r="10" fill="#22C55E" />
        </svg>
      );

    case 'hope_star':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#FEF9C3" stroke="#EAB308" strokeWidth="3" />
          <polygon points="60,28 67,48 88,49 71,62 77,82 60,70 43,82 49,62 32,49 53,48" fill="#FACC15" stroke="#B45309" strokeWidth="2.5" />
        </svg>
      );

    case 'how':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="18" y="30" width="84" height="60" rx="14" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          <text x="60" y="68" textAnchor="middle" fill="#0369A1" fontSize="24" fontWeight="900" fontFamily="sans-serif">HOW?</text>
        </svg>
      );

    case 'how_beautiful':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="38" fill="#D1FAE5" stroke="#059669" strokeWidth="3" />
          <circle cx="60" cy="60" r="12" fill="#FACC15" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <circle key={a} cx={60 + 20 * Math.cos((a * Math.PI) / 180)} cy={60 + 20 * Math.sin((a * Math.PI) / 180)} r="9" fill="#FB7185" />
          ))}
        </svg>
      );

    case 'how_often':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="22" y="26" width="76" height="68" rx="10" fill="#F3E8FF" stroke="#7E22CE" strokeWidth="3" />
          <text x="60" y="68" textAnchor="middle" fill="#6B21A8" fontSize="28" fontWeight="900" fontFamily="sans-serif">? / 7</text>
        </svg>
      );

    case 'i_am_full':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="60" r="36" fill="#CCFBF1" stroke="#0F766E" strokeWidth="3.5" />
          <path d="M40 50Q46 44 52 50M68 50Q74 44 80 50" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" />
          <path d="M44 68Q60 80 76 68" stroke="#0F766E" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'idea':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="50" r="24" fill="#FEF08A" stroke="#CA8A04" strokeWidth="3.5" />
          <rect x="48" y="74" width="24" height="16" rx="4" fill="#94A3B8" stroke="#334155" strokeWidth="2.5" />
          <line x1="60" y1="18" x2="60" y2="10" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="28" y1="36" x2="20" y2="30" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="92" y1="36" x2="100" y2="30" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'its_freezing':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="46" y="22" width="20" height="58" rx="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          <circle cx="56" cy="84" r="14" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
          <rect x="52" y="54" width="8" height="24" fill="#0284C7" />
          <text x="84" y="48" fill="#0369A1" fontSize="18" fontWeight="900" fontFamily="sans-serif">❄</text>
        </svg>
      );

    case 'keyboard':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <rect x="14" y="38" width="92" height="44" rx="8" fill="#CBD5E1" stroke="#334155" strokeWidth="3" />
          {[22, 36, 50, 64, 78, 92].map((x) => (
            <rect key={x} x={x} y="46" width="9" height="9" rx="2" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
          ))}
          <rect x="34" y="62" width="52" height="9" rx="2" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
        </svg>
      );

    case 'kid_person':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="60" cy="48" r="20" fill="#FDE68A" stroke="#0F766E" strokeWidth="3" />
          <path d="M42 36L52 24L60 32L68 24L78 36" fill="#14B8A6" stroke="#0F766E" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="53" cy="48" r="2.8" fill="#1E293B" />
          <circle cx="67" cy="48" r="2.8" fill="#1E293B" />
          <path d="M53 56Q60 62 67 56" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 96C36 76 84 76 84 96Z" fill="#14B8A6" stroke="#0F766E" strokeWidth="3" />
        </svg>
      );

    case 'last_item':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <circle cx="32" cy="60" r="10" fill="#CBD5E1" />
          <circle cx="60" cy="60" r="10" fill="#CBD5E1" />
          <circle cx="88" cy="60" r="14" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
        </svg>
      );

    case 'lazy_cat':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" shapeRendering="geometricPrecision">
          <ellipse cx="60" cy="70" rx="34" ry="22" fill="#C4B5FD" stroke="#5B21B6" strokeWidth="3" />
          <circle cx="42" cy="54" r="14" fill="#C4B5FD" stroke="#5B21B6" strokeWidth="3" />
          <text x="80" y="38" fill="#5B21B6" fontSize="16" fontWeight="900" fontFamily="sans-serif">Zzz</text>
        </svg>
      );

    default:
      return null;
  }
}
