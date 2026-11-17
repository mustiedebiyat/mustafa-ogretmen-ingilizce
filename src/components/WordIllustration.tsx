import React from 'react';

interface WordIllustrationProps {
  illustrationKey: string;
  className?: string;
}

export const WordIllustration: React.FC<WordIllustrationProps> = ({
  illustrationKey,
  className = 'w-24 h-24',
}) => {
  const renderSvg = () => {
    switch (illustrationKey) {
      case 'book':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="20" y="24" width="80" height="72" rx="10" fill="#EA580C" />
            <rect x="24" y="20" width="76" height="72" rx="8" fill="#FB923C" stroke="#7C2D12" strokeWidth="3" />
            <path d="M60 20V92" stroke="#7C2D12" strokeWidth="3" />
            <rect x="31" y="30" width="22" height="52" rx="3" fill="#FFF7ED" />
            <rect x="67" y="30" width="22" height="52" rx="3" fill="#FFF7ED" />
            <path d="M35 40H49M35 48H49M35 56H45" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M71 40H85M71 48H85M71 56H81" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M75 92V104L80 99L85 104V92" fill="#FACC15" stroke="#7C2D12" strokeWidth="2" />
          </svg>
        );

      case 'notebook':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="28" y="18" width="66" height="84" rx="8" fill="#0284C7" stroke="#0C4A6E" strokeWidth="3" />
            <rect x="42" y="28" width="42" height="16" rx="4" fill="#FEF3C7" stroke="#0C4A6E" strokeWidth="2" />
            <path d="M47 36H79" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="44" y="54" width="38" height="36" rx="4" fill="#E0F2FE" />
            <path d="M48 63H77M48 72H77M48 81H70" stroke="#0369A1" strokeWidth="2.2" strokeLinecap="round" />
            {[26, 38, 50, 62, 74, 86].map((y) => (
              <rect key={y} x="20" y={y} width="14" height="6" rx="3" fill="#FDE047" stroke="#0C4A6E" strokeWidth="2" />
            ))}
          </svg>
        );

      case 'pencil':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <g transform="rotate(-35 60 60)">
              <rect x="48" y="22" width="24" height="62" rx="3" fill="#FACC15" stroke="#713F12" strokeWidth="3" />
              <line x1="56" y1="22" x2="56" y2="84" stroke="#EAB308" strokeWidth="2.5" />
              <line x1="64" y1="22" x2="64" y2="84" stroke="#CA8A04" strokeWidth="2.5" />
              <rect x="48" y="14" width="24" height="10" rx="3" fill="#FB7185" stroke="#713F12" strokeWidth="3" />
              <rect x="48" y="22" width="24" height="6" fill="#CBD5E1" stroke="#713F12" strokeWidth="2.5" />
              <polygon points="48,84 72,84 60,106" fill="#FDE68A" stroke="#713F12" strokeWidth="3" strokeLinejoin="round" />
              <polygon points="56,98 64,98 60,106" fill="#1E293B" />
            </g>
          </svg>
        );

      case 'pen':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <g transform="rotate(35 60 60)">
              <rect x="50" y="20" width="20" height="64" rx="8" fill="#DC2626" stroke="#7F1D1D" strokeWidth="3" />
              <rect x="50" y="34" width="20" height="10" fill="#E2E8F0" stroke="#7F1D1D" strokeWidth="2" />
              <path d="M70 26H76V48" stroke="#94A3B8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <polygon points="52,84 68,84 60,104" fill="#CBD5E1" stroke="#7F1D1D" strokeWidth="3" strokeLinejoin="round" />
              <circle cx="60" cy="103" r="3" fill="#1E293B" />
            </g>
          </svg>
        );

      case 'eraser':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <g transform="rotate(-20 60 60)">
              <rect x="24" y="40" width="72" height="40" rx="10" fill="#F43F5E" stroke="#4C0519" strokeWidth="3" />
              <rect x="56" y="40" width="40" height="40" rx="6" fill="#38BDF8" stroke="#4C0519" strokeWidth="3" />
              <rect x="44" y="40" width="20" height="40" fill="#FFFFFF" stroke="#4C0519" strokeWidth="3" />
              <line x1="30" y1="48" x2="40" y2="48" stroke="#FECDD3" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        );

      case 'ruler':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <g transform="rotate(-18 60 60)">
              <rect x="14" y="42" width="92" height="34" rx="6" fill="#FBBF24" stroke="#78350F" strokeWidth="3" />
              {[24, 34, 44, 54, 64, 74, 84, 94].map((x, idx) => (
                <line
                  key={x}
                  x1={x}
                  y1="42"
                  x2={x}
                  y2={idx % 2 === 0 ? 58 : 52}
                  stroke="#78350F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              ))}
              <circle cx="96" cy="59" r="3.5" fill="#FFFBEB" stroke="#78350F" strokeWidth="2" />
            </g>
          </svg>
        );

      case 'pencil_case':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="18" y="42" width="84" height="44" rx="16" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
            <path d="M22 54H98" stroke="#FED7AA" strokeWidth="3" strokeDasharray="4 4" />
            <rect x="86" y="48" width="12" height="8" rx="3" fill="#FACC15" stroke="#7C2D12" strokeWidth="2.5" />
            <rect x="32" y="62" width="56" height="12" rx="6" fill="#FDBA74" />
            <circle cx="44" cy="68" r="3" fill="#7C2D12" />
            <circle cx="60" cy="68" r="3" fill="#7C2D12" />
            <circle cx="76" cy="68" r="3" fill="#7C2D12" />
          </svg>
        );

      case 'schoolbag':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M46 28C46 20 74 20 74 28" stroke="#7C2D12" strokeWidth="5" strokeLinecap="round" />
            <rect x="26" y="28" width="68" height="72" rx="18" fill="#F97316" stroke="#7C2D12" strokeWidth="3" />
            <path d="M26 52C26 36 94 36 94 52V56H26V52Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
            <rect x="36" y="64" width="48" height="26" rx="8" fill="#FDBA74" stroke="#7C2D12" strokeWidth="2.5" />
            <rect x="44" y="48" width="8" height="14" rx="3" fill="#FACC15" stroke="#7C2D12" strokeWidth="2" />
            <rect x="68" y="48" width="8" height="14" rx="3" fill="#FACC15" stroke="#7C2D12" strokeWidth="2" />
          </svg>
        );

      case 'desk':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="18" y="42" width="84" height="12" rx="4" fill="#D97706" stroke="#78350F" strokeWidth="3" />
            <rect x="26" y="54" width="68" height="16" rx="2" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
            <rect x="26" y="70" width="8" height="30" rx="2" fill="#64748B" stroke="#334155" strokeWidth="2.5" />
            <rect x="86" y="70" width="8" height="30" rx="2" fill="#64748B" stroke="#334155" strokeWidth="2.5" />
            <rect x="36" y="32" width="26" height="10" rx="2" fill="#38BDF8" stroke="#0C4A6E" strokeWidth="2" />
          </svg>
        );

      case 'chair':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="36" y="22" width="48" height="24" rx="6" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
            <line x1="40" y1="46" x2="40" y2="62" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <line x1="80" y1="46" x2="80" y2="62" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <rect x="32" y="60" width="56" height="10" rx="4" fill="#F97316" stroke="#7C2D12" strokeWidth="3" />
            <line x1="38" y1="70" x2="36" y2="98" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <line x1="82" y1="70" x2="84" y2="98" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          </svg>
        );

      case 'board':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="14" y="24" width="92" height="62" rx="6" fill="#0F766E" stroke="#78350F" strokeWidth="5" />
            <path d="M28 42H62M28 54H86M28 66H54" stroke="#CCFBF1" strokeWidth="3" strokeLinecap="round" />
            <circle cx="84" cy="42" r="7" fill="#FACC15" />
            <rect x="44" y="86" width="32" height="7" rx="3" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
          </svg>
        );

      case 'scissors':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M36 32L76 82" stroke="#94A3B8" strokeWidth="9" strokeLinecap="round" />
            <path d="M84 32L44 82" stroke="#CBD5E1" strokeWidth="9" strokeLinecap="round" />
            <circle cx="38" cy="84" r="13" fill="none" stroke="#E11D48" strokeWidth="6" />
            <circle cx="82" cy="84" r="13" fill="none" stroke="#E11D48" strokeWidth="6" />
            <circle cx="60" cy="58" r="4" fill="#334155" />
          </svg>
        );

      case 'english':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="18" y="24" width="84" height="72" rx="14" fill="#FFF7ED" stroke="#C2410C" strokeWidth="3" />
            <text x="60" y="58" textAnchor="middle" fill="#C2410C" fontSize="24" fontWeight="800" fontFamily="sans-serif">
              ABC
            </text>
            <rect x="30" y="68" width="60" height="16" rx="8" fill="#EA580C" />
            <text x="60" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700" fontFamily="sans-serif">
              HELLO!
            </text>
          </svg>
        );

      case 'maths':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="20" y="20" width="80" height="80" rx="14" fill="#FEF3C7" stroke="#B45309" strokeWidth="3" />
            <path d="M38 36V52M30 44H46" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
            <path d="M72 44H88" stroke="#EA580C" strokeWidth="5" strokeLinecap="round" />
            <path d="M32 70L44 82M44 70L32 82" stroke="#B45309" strokeWidth="5" strokeLinecap="round" />
            <path d="M72 72H88M72 80H88" stroke="#0F766E" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        );

      case 'science':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M48 24H72M52 24V46L34 84C31 90 35 96 42 96H78C85 96 89 90 86 84L68 46V24" fill="#ECFDF5" stroke="#047857" strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M40 74H80L85 85C87 89 84 94 78 94H42C36 94 33 89 35 85L40 74Z" fill="#10B981" />
            <circle cx="52" cy="82" r="3.5" fill="#D1FAE5" />
            <circle cx="65" cy="86" r="2.5" fill="#D1FAE5" />
            <circle cx="60" cy="60" r="3" fill="#34D399" />
          </svg>
        );

      case 'music':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="60" cy="60" r="42" fill="#FFFBEB" stroke="#D97706" strokeWidth="3" />
            <path d="M48 76V36L82 28V68" stroke="#B45309" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="40" cy="78" r="10" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
            <circle cx="74" cy="70" r="10" fill="#EA580C" stroke="#78350F" strokeWidth="3" />
          </svg>
        );

      case 'art':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M60 22C36 22 20 39 20 60C20 81 36 96 58 96C67 96 72 90 70 83C68 78 72 73 78 73H85C94 73 100 66 100 57C100 37 82 22 60 22Z" fill="#FDE68A" stroke="#92400E" strokeWidth="3" />
            <circle cx="44" cy="46" r="7" fill="#EF4444" />
            <circle cx="66" cy="40" r="7" fill="#3B82F6" />
            <circle cx="82" cy="54" r="7" fill="#10B981" />
            <circle cx="38" cy="68" r="7" fill="#A855F7" />
            <circle cx="56" cy="80" r="5" fill="#FFFBEB" stroke="#92400E" strokeWidth="2.5" />
          </svg>
        );

      case 'pe':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="60" cy="60" r="38" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
            <polygon points="60,42 74,52 69,68 51,68 46,52" fill="#1E293B" />
            <path d="M60 42V22M74 52L94 45M69 68L82 88M51 68L38 88M46 52L26 45" stroke="#1E293B" strokeWidth="3" />
          </svg>
        );

      case 'open':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="26" y="20" width="68" height="80" rx="6" fill="#FEF3C7" stroke="#9A3412" strokeWidth="3" />
            <path d="M30 22L68 34V94L30 98V22Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" strokeLinejoin="round" />
            <circle cx="58" cy="62" r="4" fill="#FDE047" />
            <path d="M74 60H96M88 52L96 60L88 68" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'close':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="30" y="20" width="60" height="80" rx="6" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
            <rect x="38" y="28" width="44" height="28" rx="3" fill="#FDBA74" />
            <circle cx="78" cy="64" r="4" fill="#FDE047" />
            <path d="M104 60H86M94 52L86 60L94 68" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'listen':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M54 28C38 28 28 42 28 56C28 70 38 78 44 86C48 91 54 94 60 90C64 87 64 80 60 76C56 72 52 70 52 62C52 54 60 50 64 56" fill="#FED7AA" stroke="#9A3412" strokeWidth="4" strokeLinecap="round" />
            <path d="M76 44C82 50 82 66 76 72" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
            <path d="M88 34C98 44 98 72 88 82" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );

      case 'repeat':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M32 52C32 36 46 28 62 28H84" stroke="#C2410C" strokeWidth="6" strokeLinecap="round" />
            <polygon points="82,18 98,28 82,38" fill="#C2410C" />
            <path d="M88 68C88 84 74 92 58 92H36" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
            <polygon points="38,82 22,92 38,102" fill="#EA580C" />
            <text x="60" y="65" textAnchor="middle" fill="#7C2D12" fontSize="16" fontWeight="800">
              x2
            </text>
          </svg>
        );

      case 'sit_down':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="52" cy="28" r="11" fill="#FDBA74" stroke="#7C2D12" strokeWidth="3" />
            <path d="M52 40V66H76V92" stroke="#EA580C" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M34 52V94M34 72H62" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <path d="M86 30V54M78 46L86 54L94 46" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'stand_up':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="52" cy="24" r="11" fill="#FDBA74" stroke="#7C2D12" strokeWidth="3" />
            <path d="M52 36V66M52 46L36 58M52 46L68 58M46 66L42 96M58 66L62 96" stroke="#EA580C" strokeWidth="8" strokeLinecap="round" />
            <path d="M88 64V36M80 44L88 36L96 44" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'eyebrow':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <ellipse cx="60" cy="68" rx="34" ry="22" fill="#FFFFFF" stroke="#4C1D95" strokeWidth="3.5" />
            <circle cx="60" cy="68" r="11" fill="#6D28D9" />
            <circle cx="60" cy="68" r="5" fill="#1E1B4B" />
            <circle cx="64" cy="64" r="2.5" fill="#FFFFFF" />
            <path d="M24 40C38 26 82 26 96 40" stroke="#4C1D95" strokeWidth="8" strokeLinecap="round" />
            <path d="M60 16V26" stroke="#EC4899" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );

      case 'eyelash':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <ellipse cx="60" cy="66" rx="32" ry="20" fill="#FFFFFF" stroke="#4C1D95" strokeWidth="3.5" />
            <circle cx="60" cy="66" r="10" fill="#7C3AED" />
            <circle cx="60" cy="66" r="4.5" fill="#1E1B4B" />
            <path d="M34 52L26 36M46 46L42 28M60 44V25M74 46L78 28M86 52L94 36" stroke="#3B0764" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );

      case 'chin':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M32 34C32 66 44 88 60 88C76 88 88 66 88 34" fill="#FDE68A" stroke="#78350F" strokeWidth="3.5" />
            <path d="M46 60C52 68 68 68 74 60" stroke="#9A3412" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M60 104V92M52 98L60 91L68 98" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'tooth':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path
              d="M36 28C26 28 22 40 26 54C30 68 34 94 44 94C51 94 54 76 60 76C66 76 69 94 76 94C86 94 90 68 94 54C98 40 94 28 84 28C74 28 68 34 60 34C52 34 46 28 36 28Z"
              fill="#FFFFFF"
              stroke="#4C1D95"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path d="M40 42C44 38 50 38 52 40" stroke="#C4B5FD" strokeWidth="3" strokeLinecap="round" />
            <circle cx="88" cy="30" r="4" fill="#38BDF8" />
          </svg>
        );

      case 'foot':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path
              d="M44 24C34 26 30 42 36 62C40 76 36 94 52 96C68 98 76 88 74 74C72 60 66 50 64 36C62 26 54 22 44 24Z"
              fill="#FDBA74"
              stroke="#7C2D12"
              strokeWidth="3"
            />
            <circle cx="38" cy="24" r="5" fill="#FDBA74" stroke="#7C2D12" strokeWidth="2.5" />
            <circle cx="49" cy="20" r="4.5" fill="#FDBA74" stroke="#7C2D12" strokeWidth="2.5" />
            <circle cx="59" cy="22" r="4" fill="#FDBA74" stroke="#7C2D12" strokeWidth="2.5" />
            <circle cx="67" cy="27" r="3.5" fill="#FDBA74" stroke="#7C2D12" strokeWidth="2.5" />
          </svg>
        );

      case 'back':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="60" cy="26" r="13" fill="#4C1D95" />
            <path d="M36 46C36 40 84 40 84 46L80 94H40L36 46Z" fill="#7C3AED" stroke="#3B0764" strokeWidth="3" />
            <line x1="60" y1="48" x2="60" y2="88" stroke="#DDD6FE" strokeWidth="3" strokeDasharray="4 4" />
            <path d="M98 62H84M90 54L82 62L90 70" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'happy':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="60" cy="60" r="38" fill="#FDE047" stroke="#9A3412" strokeWidth="3.5" />
            <circle cx="46" cy="52" r="4.5" fill="#1E293B" />
            <circle cx="74" cy="52" r="4.5" fill="#1E293B" />
            <path d="M40 68C46 82 74 82 80 68" stroke="#9A3412" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="38" cy="64" r="5" fill="#FB7185" opacity="0.6" />
            <circle cx="82" cy="64" r="5" fill="#FB7185" opacity="0.6" />
          </svg>
        );

      case 'sad':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="60" cy="60" r="38" fill="#C7D2FE" stroke="#312E81" strokeWidth="3.5" />
            <circle cx="46" cy="52" r="4.5" fill="#1E293B" />
            <circle cx="74" cy="52" r="4.5" fill="#1E293B" />
            <path d="M42 80C48 68 72 68 78 80" stroke="#312E81" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M74 60C74 60 80 68 74 72C68 68 74 60 74 60Z" fill="#38BDF8" />
          </svg>
        );

      case 'excited':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="60" cy="60" r="38" fill="#FDE047" stroke="#6D28D9" strokeWidth="3.5" />
            <polygon points="46,42 49,49 56,49 50,53 52,60 46,56 40,60 42,53 36,49 43,49" fill="#7C3AED" />
            <polygon points="74,42 77,49 84,49 78,53 80,60 74,56 68,60 70,53 64,49 71,49" fill="#7C3AED" />
            <path d="M40 66C46 84 74 84 80 66Z" fill="#EC4899" stroke="#6D28D9" strokeWidth="3" />
          </svg>
        );

      case 'blonde':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M28 56C28 28 42 20 60 20C78 20 92 28 92 56V90H28V56Z" fill="#FACC15" stroke="#854D0E" strokeWidth="3" />
            <circle cx="60" cy="62" r="22" fill="#FED7AA" stroke="#854D0E" strokeWidth="2.5" />
            <path d="M38 52C48 34 72 34 82 52" fill="#FDE047" />
            <circle cx="52" cy="60" r="3" fill="#1E293B" />
            <circle cx="68" cy="60" r="3" fill="#1E293B" />
            <path d="M52 72C56 76 64 76 68 72" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'curly':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="38" cy="36" r="14" fill="#5B21B6" />
            <circle cx="60" cy="28" r="15" fill="#5B21B6" />
            <circle cx="82" cy="36" r="14" fill="#5B21B6" />
            <circle cx="30" cy="56" r="13" fill="#4C1D95" />
            <circle cx="90" cy="56" r="13" fill="#4C1D95" />
            <circle cx="60" cy="62" r="22" fill="#FED7AA" stroke="#4C1D95" strokeWidth="2.5" />
            <circle cx="52" cy="60" r="3" fill="#1E293B" />
            <circle cx="68" cy="60" r="3" fill="#1E293B" />
            <path d="M52 72C56 76 64 76 68 72" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'straight':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M32 54C32 28 46 22 60 22C74 22 88 28 88 54L92 94H28L32 54Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
            <circle cx="60" cy="62" r="21" fill="#FED7AA" />
            <path d="M38 46L60 32L82 46" fill="#1E293B" />
            <circle cx="52" cy="60" r="3" fill="#1E293B" />
            <circle cx="68" cy="60" r="3" fill="#1E293B" />
            <path d="M53 72C56 75 64 75 67 72" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'coat':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M40 24L60 30L80 24L98 46L88 56L82 48V98H38V48L32 56L22 46L40 24Z" fill="#6D28D9" stroke="#3B0764" strokeWidth="3" strokeLinejoin="round" />
            <line x1="60" y1="30" x2="60" y2="98" stroke="#DDD6FE" strokeWidth="2.5" />
            <circle cx="54" cy="48" r="3" fill="#FDE047" />
            <circle cx="54" cy="64" r="3" fill="#FDE047" />
            <circle cx="54" cy="80" r="3" fill="#FDE047" />
          </svg>
        );

      case 'jacket':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M40 28L60 34L80 28L98 50L86 58L80 48V88H40V48L34 58L22 50L40 28Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" strokeLinejoin="round" />
            <line x1="60" y1="34" x2="60" y2="88" stroke="#FEF3C7" strokeWidth="3" />
            <rect x="44" y="64" width="10" height="12" rx="2" fill="#FDBA74" />
            <rect x="66" y="64" width="10" height="12" rx="2" fill="#FDBA74" />
          </svg>
        );

      case 'jumper':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M42 26H78L98 52L86 60L78 48V92H42V48L34 60L22 52L42 26Z" fill="#EC4899" stroke="#831843" strokeWidth="3" strokeLinejoin="round" />
            <rect x="42" y="54" width="36" height="10" fill="#FDE047" />
            <rect x="48" y="22" width="24" height="8" rx="4" fill="#F472B6" stroke="#831843" strokeWidth="2.5" />
          </svg>
        );

      case 'dress':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M44 22L52 32H68L76 22L82 32L74 52L90 94H30L46 52L38 32L44 22Z" fill="#A855F7" stroke="#581C87" strokeWidth="3" strokeLinejoin="round" />
            <rect x="45" y="48" width="30" height="7" rx="3" fill="#FDE047" />
          </svg>
        );

      case 'skirt':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="38" y="28" width="44" height="10" rx="3" fill="#4C1D95" />
            <path d="M38 38H82L94 90H26L38 38Z" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="3" strokeLinejoin="round" />
            <line x1="50" y1="38" x2="44" y2="90" stroke="#DDD6FE" strokeWidth="2.5" />
            <line x1="70" y1="38" x2="76" y2="90" stroke="#DDD6FE" strokeWidth="2.5" />
          </svg>
        );

      case 'jeans':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M34 22H86L90 96H66L60 54L54 96H30L34 22Z" fill="#2563EB" stroke="#1E3A8A" strokeWidth="3" strokeLinejoin="round" />
            <line x1="34" y1="32" x2="86" y2="32" stroke="#FBBF24" strokeWidth="3" />
            <line x1="60" y1="22" x2="60" y2="54" stroke="#1E3A8A" strokeWidth="2.5" />
          </svg>
        );

      case 'boots':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M34 24H60V68L88 74C94 75 96 82 96 90H32V24Z" fill="#B45309" stroke="#451A03" strokeWidth="3" strokeLinejoin="round" />
            <rect x="32" y="88" width="64" height="8" rx="3" fill="#1E293B" />
            <line x1="48" y1="42" x2="60" y2="42" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
            <line x1="48" y1="54" x2="60" y2="54" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'scarf':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="26" y="34" width="68" height="22" rx="11" fill="#7C3AED" stroke="#3B0764" strokeWidth="3" />
            <path d="M64 46H82V94H64V46Z" fill="#8B5CF6" stroke="#3B0764" strokeWidth="3" />
            <rect x="64" y="64" width="18" height="8" fill="#FACC15" />
            <line x1="68" y1="94" x2="68" y2="104" stroke="#3B0764" strokeWidth="3" strokeLinecap="round" />
            <line x1="78" y1="94" x2="78" y2="104" stroke="#3B0764" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'sunglasses':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="44" width="38" height="28" rx="10" fill="#1E293B" stroke="#F59E0B" strokeWidth="4" />
            <rect x="66" y="44" width="38" height="28" rx="10" fill="#1E293B" stroke="#F59E0B" strokeWidth="4" />
            <path d="M54 54H66" stroke="#F59E0B" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="24" y1="52" x2="34" y2="64" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            <line x1="74" y1="52" x2="84" y2="64" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'sunny':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="60" cy="60" r="24" fill="#FACC15" stroke="#D97706" strokeWidth="3" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1="60"
                y1="16"
                x2="60"
                y2="28"
                stroke="#F59E0B"
                strokeWidth="5"
                strokeLinecap="round"
                transform={`rotate(${deg} 60 60)`}
              />
            ))}
          </svg>
        );

      case 'raining':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M34 62H86C94 62 98 56 98 50C98 42 92 38 86 38C84 26 74 20 62 20C50 20 40 28 38 38C30 38 22 44 22 52C22 58 28 62 34 62Z" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />
            <line x1="40" y1="72" x2="34" y2="88" stroke="#0284C7" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="60" y1="72" x2="54" y2="88" stroke="#0284C7" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="80" y1="72" x2="74" y2="88" stroke="#0284C7" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        );

      case 'snowing':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M34 58H86C94 58 98 52 98 46C98 38 92 34 86 34C84 22 74 16 62 16C50 16 40 24 38 34C30 34 22 40 22 48C22 54 28 58 34 58Z" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="3" />
            <circle cx="38" cy="76" r="5" fill="#38BDF8" />
            <circle cx="60" cy="86" r="6" fill="#6366F1" />
            <circle cx="82" cy="74" r="5" fill="#38BDF8" />
            <circle cx="48" cy="96" r="4" fill="#818CF8" />
            <circle cx="76" cy="94" r="4" fill="#818CF8" />
          </svg>
        );

      case 'headteacher':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="60" cy="36" r="17" fill="#FDE68A" stroke="#78350F" strokeWidth="2.8" />
            <path d="M43 34C43 22 77 22 77 34C73 28 47 28 43 34Z" fill="#CBD5E1" stroke="#475569" strokeWidth="2.5" />
            <circle cx="53" cy="37" r="2.2" fill="#1E293B" />
            <circle cx="67" cy="37" r="2.2" fill="#1E293B" />
            <path d="M54 44C57 47 63 47 66 44" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M36 96V70C36 59 46 54 60 54C74 54 84 59 84 70V96H36Z" fill="#334155" stroke="#0F172A" strokeWidth="2.8" />
            <polygon points="55,55 65,55 62,76 60,80 58,76" fill="#0F766E" />
            <rect x="68" y="68" width="18" height="22" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="2" />
          </svg>
        );

      case 'teacher':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="18" width="88" height="50" rx="6" fill="#0F766E" stroke="#134E4A" strokeWidth="3" />
            <path d="M26 32H54M26 42H46" stroke="#CCFBF1" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="72" cy="48" r="14" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
            <path d="M58 46C58 34 86 34 86 46C80 39 64 39 58 46Z" fill="#78350F" />
            <circle cx="67" cy="49" r="2" fill="#1E293B" />
            <circle cx="77" cy="49" r="2" fill="#1E293B" />
            <path d="M68 55C71 57 74 57 76 55" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <path d="M52 100V78C52 68 60 63 72 63C84 63 92 68 92 78V100H52Z" fill="#F8FAFC" stroke="#334155" strokeWidth="2.5" />
            <line x1="52" y1="80" x2="34" y2="54" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );

      case 'librarian':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="20" width="88" height="68" rx="6" fill="#FEF3C7" stroke="#92400E" strokeWidth="2.5" />
            <rect x="22" y="26" width="12" height="24" rx="2" fill="#0F766E" />
            <rect x="36" y="28" width="10" height="22" rx="2" fill="#EA580C" />
            <rect x="74" y="26" width="12" height="24" rx="2" fill="#7C3AED" />
            <rect x="88" y="28" width="10" height="22" rx="2" fill="#0284C7" />
            <circle cx="60" cy="42" r="14" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
            <path d="M46 41C46 28 74 28 74 41C70 34 50 34 46 41Z" fill="#1E293B" />
            <circle cx="54" cy="43" r="3.5" fill="none" stroke="#1E293B" strokeWidth="1.8" />
            <circle cx="66" cy="43" r="3.5" fill="none" stroke="#1E293B" strokeWidth="1.8" />
            <line x1="57.5" y1="43" x2="62.5" y2="43" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M40 98V74C40 63 48 58 60 58C72 58 80 63 80 74V98H40Z" fill="#0F766E" stroke="#134E4A" strokeWidth="2.5" />
            <rect x="46" y="76" width="28" height="18" rx="3" fill="#FFFBEB" stroke="#78350F" strokeWidth="2" />
            <line x1="60" y1="76" x2="60" y2="94" stroke="#78350F" strokeWidth="2" />
          </svg>
        );

      case 'caretaker':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="52" cy="34" r="14" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
            <path d="M38 33C38 22 66 22 66 33C61 27 43 27 38 33Z" fill="#78350F" />
            <circle cx="47" cy="35" r="2" fill="#1E293B" />
            <circle cx="57" cy="35" r="2" fill="#1E293B" />
            <path d="M48 41C50 43 54 43 56 41" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <path d="M32 94V66C32 56 40 50 52 50C64 50 72 56 72 66V94H32Z" fill="#64748B" stroke="#334155" strokeWidth="2.5" />
            <line x1="88" y1="24" x2="74" y2="86" stroke="#92400E" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M62 84H86L92 102H56L62 84Z" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" strokeLinejoin="round" />
            <line x1="64" y1="92" x2="62" y2="102" stroke="#92400E" strokeWidth="2" />
            <line x1="74" y1="92" x2="74" y2="102" stroke="#92400E" strokeWidth="2" />
            <line x1="84" y1="92" x2="86" y2="102" stroke="#92400E" strokeWidth="2" />
          </svg>
        );

      case 'school_nurse':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="60" cy="36" r="16" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
            <path d="M44 35C44 21 76 21 76 35C70 28 50 28 44 35Z" fill="#78350F" />
            <circle cx="54" cy="37" r="2" fill="#1E293B" />
            <circle cx="66" cy="37" r="2" fill="#1E293B" />
            <path d="M55 44C58 46 62 46 65 44" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <path d="M36 98V68C36 58 46 53 60 53C74 53 84 58 84 68V98H36Z" fill="#FFFFFF" stroke="#334155" strokeWidth="2.8" />
            <rect x="66" y="64" width="12" height="12" rx="3" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.5" />
            <path d="M72 67V73M69 70H75" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M48 58C48 70 60 76 60 76C60 76 72 70 72 58" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'classmate':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="40" cy="40" r="14" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
            <path d="M26 38C26 26 54 26 54 38C49 32 31 32 26 38Z" fill="#D97706" />
            <circle cx="35" cy="41" r="2" fill="#1E293B" />
            <circle cx="45" cy="41" r="2" fill="#1E293B" />
            <path d="M36 47C38 49 42 49 44 47" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <path d="M22 86V68C22 59 30 55 40 55C50 55 58 59 58 68V86H22Z" fill="#0284C7" stroke="#0C4A6E" strokeWidth="2.5" />
            <circle cx="80" cy="40" r="14" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
            <path d="M66 38C66 26 94 26 94 38C89 32 71 32 66 38Z" fill="#1E293B" />
            <circle cx="75" cy="41" r="2" fill="#1E293B" />
            <circle cx="85" cy="41" r="2" fill="#1E293B" />
            <path d="M76 47C78 49 82 49 84 47" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <path d="M62 86V68C62 59 70 55 80 55C90 55 98 59 98 68V86H62Z" fill="#0F766E" stroke="#134E4A" strokeWidth="2.5" />
            <rect x="16" y="84" width="88" height="14" rx="4" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
          </svg>
        );

      case 'pupil':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="36" y="54" width="48" height="36" rx="10" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.5" />
            <circle cx="60" cy="36" r="17" fill="#FDE68A" stroke="#78350F" strokeWidth="2.8" />
            <path d="M43 34C43 20 77 20 77 34C72 27 48 27 43 34Z" fill="#451A03" />
            <circle cx="53" cy="37" r="2.2" fill="#1E293B" />
            <circle cx="67" cy="37" r="2.2" fill="#1E293B" />
            <path d="M54 44C57 47 63 47 66 44" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M38 98V68C38 58 47 54 60 54C73 54 82 58 82 68V98H38Z" fill="#0284C7" stroke="#0C4A6E" strokeWidth="2.8" />
            <rect x="49" y="72" width="22" height="18" rx="3" fill="#FEF3C7" stroke="#78350F" strokeWidth="2" />
          </svg>
        );

      case 'classroom':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="14" y="18" width="92" height="84" rx="8" fill="#FFFBEB" stroke="#78350F" strokeWidth="2.8" />
            <rect x="26" y="26" width="68" height="34" rx="4" fill="#0F766E" stroke="#78350F" strokeWidth="3" />
            <path d="M36 38H62M36 48H52" stroke="#CCFBF1" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="24" y="72" width="30" height="18" rx="3" fill="#F59E0B" stroke="#78350F" strokeWidth="2.2" />
            <rect x="66" y="72" width="30" height="18" rx="3" fill="#F59E0B" stroke="#78350F" strokeWidth="2.2" />
            <line x1="28" y1="90" x2="28" y2="98" stroke="#475569" strokeWidth="3" />
            <line x1="50" y1="90" x2="50" y2="98" stroke="#475569" strokeWidth="3" />
            <line x1="70" y1="90" x2="70" y2="98" stroke="#475569" strokeWidth="3" />
            <line x1="92" y1="90" x2="92" y2="98" stroke="#475569" strokeWidth="3" />
          </svg>
        );

      case 'library':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="18" width="88" height="84" rx="8" fill="#FEF3C7" stroke="#78350F" strokeWidth="3" />
            <line x1="18" y1="46" x2="102" y2="46" stroke="#92400E" strokeWidth="4" />
            <line x1="18" y1="74" x2="102" y2="74" stroke="#92400E" strokeWidth="4" />
            <rect x="24" y="24" width="11" height="20" rx="2" fill="#0F766E" />
            <rect x="37" y="26" width="10" height="18" rx="2" fill="#EA580C" />
            <rect x="49" y="23" width="12" height="21" rx="2" fill="#0284C7" />
            <rect x="64" y="26" width="11" height="18" rx="2" fill="#7C3AED" />
            <rect x="78" y="24" width="14" height="20" rx="2" fill="#E11D48" />
            <rect x="26" y="52" width="12" height="20" rx="2" fill="#D97706" />
            <rect x="40" y="54" width="11" height="18" rx="2" fill="#059669" />
            <rect x="54" y="52" width="12" height="20" rx="2" fill="#6366F1" />
            <rect x="70" y="53" width="14" height="19" rx="2" fill="#0F766E" />
            <rect x="34" y="82" width="52" height="12" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="2" />
          </svg>
        );

      case 'art_room':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <line x1="60" y1="18" x2="36" y2="102" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
            <line x1="60" y1="18" x2="84" y2="102" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
            <line x1="60" y1="18" x2="60" y2="98" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
            <rect x="28" y="26" width="64" height="48" rx="5" fill="#FFFBEB" stroke="#78350F" strokeWidth="3" />
            <circle cx="46" cy="44" r="8" fill="#FACC15" />
            <path d="M34 66L50 48L64 62L74 52L86 66H34Z" fill="#0F766E" />
            <ellipse cx="80" cy="86" rx="18" ry="12" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
            <circle cx="72" cy="84" r="3.5" fill="#E11D48" />
            <circle cx="81" cy="81" r="3.5" fill="#0284C7" />
            <circle cx="88" cy="86" r="3.5" fill="#10B981" />
          </svg>
        );

      case 'music_room':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M22 72H98V88C98 92 94 94 90 94H30C26 94 22 92 22 88V72Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
            <rect x="26" y="72" width="68" height="10" fill="#FFFFFF" />
            <path d="M32 72V79M42 72V79M54 72V79M64 72V79M76 72V79M86 72V79" stroke="#0F172A" strokeWidth="4" />
            <path d="M26 72C26 44 46 30 70 34C88 38 96 52 96 72H26Z" fill="#334155" stroke="#0F172A" strokeWidth="3" />
            <path d="M46 28V48M46 28L64 24V44" stroke="#7C3AED" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="42" cy="49" r="5" fill="#7C3AED" />
            <circle cx="60" cy="45" r="5" fill="#7C3AED" />
          </svg>
        );

      case 'office':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="18" y="18" width="84" height="84" rx="8" fill="#F1F5F9" stroke="#334155" strokeWidth="3" />
            <rect x="66" y="26" width="24" height="12" rx="3" fill="#FDE68A" stroke="#92400E" strokeWidth="2" />
            <path d="M72 32H84" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="26" y="64" width="68" height="10" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
            <rect x="32" y="74" width="56" height="22" rx="2" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
            <rect x="44" y="44" width="32" height="20" rx="3" fill="#38BDF8" stroke="#0C4A6E" strokeWidth="2.5" />
            <rect x="56" y="80" width="8" height="4" rx="1" fill="#FEF3C7" />
          </svg>
        );

      case 'meeting_room':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="60" cy="24" r="9" fill="#0F766E" />
            <circle cx="24" cy="60" r="9" fill="#EA580C" />
            <circle cx="96" cy="60" r="9" fill="#7C3AED" />
            <circle cx="60" cy="96" r="9" fill="#0284C7" />
            <ellipse cx="60" cy="60" rx="34" ry="24" fill="#D97706" stroke="#78350F" strokeWidth="3.5" />
            <rect x="44" y="52" width="14" height="16" rx="2" fill="#FFFBEB" />
            <rect x="64" y="54" width="12" height="14" rx="2" fill="#FFFBEB" />
          </svg>
        );

      case 'gym':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="20" width="88" height="80" rx="8" fill="#E0F2FE" stroke="#0369A1" strokeWidth="3" />
            <rect x="42" y="26" width="36" height="24" rx="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
            <rect x="52" y="34" width="16" height="12" stroke="#EA580C" strokeWidth="2" />
            <ellipse cx="60" cy="52" rx="10" ry="3.5" stroke="#EA580C" strokeWidth="3" />
            <path d="M52 54L55 66H65L68 54" stroke="#64748B" strokeWidth="2" />
            <circle cx="38" cy="84" r="12" fill="#F97316" stroke="#7C2D12" strokeWidth="2.5" />
            <path d="M26 84H50M38 72V96" stroke="#7C2D12" strokeWidth="1.8" />
            <rect x="66" y="82" width="28" height="12" rx="3" fill="#0F766E" stroke="#134E4A" strokeWidth="2" />
          </svg>
        );

      case 'corridor':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="18" width="88" height="84" rx="8" fill="#FEF3C7" stroke="#78350F" strokeWidth="2.8" />
            <polygon points="16,18 42,36 42,84 16,102" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
            <polygon points="104,18 78,36 78,84 104,102" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
            <rect x="42" y="36" width="36" height="48" fill="#F8FAFC" stroke="#475569" strokeWidth="2" />
            <rect x="50" y="44" width="20" height="40" fill="#B45309" stroke="#78350F" strokeWidth="2" />
            <line x1="28" y1="42" x2="28" y2="82" stroke="#64748B" strokeWidth="2" />
            <polygon points="42,84 78,84 104,102 16,102" fill="#FDE68A" stroke="#78350F" strokeWidth="2" />
          </svg>
        );

      case 'sports_field':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="14" y="22" width="92" height="76" rx="10" fill="#10B981" stroke="#065F46" strokeWidth="3" />
            <rect x="22" y="30" width="76" height="60" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="60" y1="30" x2="60" y2="90" stroke="#FFFFFF" strokeWidth="2.5" />
            <circle cx="60" cy="60" r="12" stroke="#FFFFFF" strokeWidth="2.5" />
            <circle cx="60" cy="60" r="8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
            <polygon points="60,55 64,58 62,63 58,63 56,58" fill="#0F172A" />
          </svg>
        );

      case 'cake':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="24" y="56" width="72" height="36" rx="8" fill="#F472B6" stroke="#831843" strokeWidth="3" />
            <path d="M24 64C32 72 42 72 48 64C54 72 66 72 72 64C78 72 88 72 96 64V56H24V64Z" fill="#FFF1F2" stroke="#831843" strokeWidth="2.5" />
            <rect x="44" y="32" width="7" height="24" rx="2" fill="#38BDF8" stroke="#0C4A6E" strokeWidth="2" />
            <rect x="57" y="30" width="7" height="26" rx="2" fill="#FACC15" stroke="#854D0E" strokeWidth="2" />
            <rect x="70" y="32" width="7" height="24" rx="2" fill="#34D399" stroke="#065F46" strokeWidth="2" />
            <path d="M47.5 22C50 26 50 30 47.5 30C45 30 45 26 47.5 22Z" fill="#F97316" />
            <path d="M60.5 20C63 24 63 28 60.5 28C58 28 58 24 60.5 20Z" fill="#F97316" />
            <path d="M73.5 22C76 26 76 30 73.5 30C71 30 71 26 73.5 22Z" fill="#F97316" />
            <rect x="16" y="92" width="88" height="9" rx="4.5" fill="#CBD5E1" stroke="#475569" strokeWidth="2.5" />
          </svg>
        );

      case 'candles':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="28" y="46" width="14" height="52" rx="4" fill="#F43F5E" stroke="#881337" strokeWidth="2.5" />
            <rect x="53" y="38" width="14" height="60" rx="4" fill="#0EA5E9" stroke="#0C4A6E" strokeWidth="2.5" />
            <rect x="78" y="46" width="14" height="52" rx="4" fill="#10B981" stroke="#064E3B" strokeWidth="2.5" />
            <path d="M35 24C40 32 40 42 35 42C30 42 30 32 35 24Z" fill="#FACC15" stroke="#EA580C" strokeWidth="2" />
            <path d="M60 16C65 24 65 34 60 34C55 34 55 24 60 16Z" fill="#FACC15" stroke="#EA580C" strokeWidth="2" />
            <path d="M85 24C90 32 90 42 85 42C80 42 80 32 85 24Z" fill="#FACC15" stroke="#EA580C" strokeWidth="2" />
          </svg>
        );

      case 'balloons':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <path d="M34 66C34 78 44 92 52 104" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M86 64C86 78 76 92 66 104" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M60 58V104" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="34" cy="44" rx="17" ry="22" fill="#F43F5E" stroke="#881337" strokeWidth="2.5" />
            <ellipse cx="86" cy="42" rx="17" ry="22" fill="#0EA5E9" stroke="#0C4A6E" strokeWidth="2.5" />
            <ellipse cx="60" cy="36" rx="19" ry="24" fill="#FACC15" stroke="#854D0E" strokeWidth="2.5" />
            <ellipse cx="53" cy="27" rx="4" ry="7" fill="#FFFFFF" opacity="0.5" transform="rotate(-20 53 27)" />
          </svg>
        );

      case 'gift':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="24" y="48" width="72" height="52" rx="8" fill="#E11D48" stroke="#881337" strokeWidth="3" />
            <rect x="20" y="36" width="80" height="16" rx="5" fill="#F43F5E" stroke="#881337" strokeWidth="3" />
            <rect x="53" y="36" width="14" height="64" fill="#FACC15" stroke="#854D0E" strokeWidth="2.5" />
            <path d="M60 36C48 20 34 22 38 34C42 40 54 36 60 36Z" fill="#FACC15" stroke="#854D0E" strokeWidth="2.5" />
            <path d="M60 36C72 20 86 22 82 34C78 40 66 36 60 36Z" fill="#FACC15" stroke="#854D0E" strokeWidth="2.5" />
          </svg>
        );

      case 'january':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="18" width="88" height="84" rx="14" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
            <circle cx="60" cy="70" r="18" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2.5" />
            <circle cx="60" cy="46" r="12" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2.5" />
            <rect x="50" y="28" width="20" height="8" rx="2" fill="#0F766E" />
            <circle cx="56" cy="44" r="1.8" fill="#0F172A" />
            <circle cx="64" cy="44" r="1.8" fill="#0F172A" />
            <polygon points="60,46 68,48 60,50" fill="#F97316" />
            <text x="60" y="100" textAnchor="middle" fill="#0369A1" fontSize="13" fontWeight="800" fontFamily="sans-serif">JAN</text>
          </svg>
        );

      case 'february':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="18" width="88" height="84" rx="14" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
            <ellipse cx="60" cy="54" rx="20" ry="26" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />
            <path d="M44 44L76 54M42 56L78 66M46 36L72 44" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="32" cy="36" r="4" fill="#38BDF8" />
            <circle cx="88" cy="36" r="4" fill="#38BDF8" />
            <text x="60" y="98" textAnchor="middle" fill="#92400E" fontSize="13" fontWeight="800" fontFamily="sans-serif">FEB</text>
          </svg>
        );

      case 'march':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="18" width="88" height="84" rx="14" fill="#ECFDF5" stroke="#059669" strokeWidth="3" />
            <path d="M36 82C36 72 84 72 84 82Z" fill="#92400E" />
            <path d="M60 76V46" stroke="#15803D" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M60 56C44 52 40 38 52 36C60 35 60 48 60 56Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
            <path d="M60 52C76 48 80 34 68 32C60 31 60 44 60 52Z" fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
            <text x="60" y="98" textAnchor="middle" fill="#065F46" fontSize="13" fontWeight="800" fontFamily="sans-serif">MAR</text>
          </svg>
        );

      case 'april':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="18" width="88" height="84" rx="14" fill="#F0FDFA" stroke="#0F766E" strokeWidth="3" />
            <polygon points="60,24 82,46 60,72 38,46" fill="#E11D48" stroke="#881337" strokeWidth="2.5" />
            <polygon points="60,24 82,46 60,46" fill="#FACC15" />
            <polygon points="38,46 60,46 60,72" fill="#38BDF8" />
            <path d="M60 72C64 80 54 84 62 90" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" />
            <text x="60" y="98" textAnchor="middle" fill="#0F766E" fontSize="13" fontWeight="800" fontFamily="sans-serif">APR</text>
          </svg>
        );

      case 'may':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="18" width="88" height="84" rx="14" fill="#FDF2F8" stroke="#DB2777" strokeWidth="3" />
            <circle cx="60" cy="40" r="9" fill="#F472B6" />
            <circle cx="48" cy="50" r="9" fill="#F472B6" />
            <circle cx="72" cy="50" r="9" fill="#F472B6" />
            <circle cx="53" cy="64" r="9" fill="#F472B6" />
            <circle cx="67" cy="64" r="9" fill="#F472B6" />
            <circle cx="60" cy="53" r="9" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
            <ellipse cx="86" cy="34" rx="7" ry="5" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
            <text x="60" y="98" textAnchor="middle" fill="#9D174D" fontSize="13" fontWeight="800" fontFamily="sans-serif">MAY</text>
          </svg>
        );

      case 'june':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="18" width="88" height="84" rx="14" fill="#FFF1F2" stroke="#E11D48" strokeWidth="3" />
            <circle cx="48" cy="54" r="14" fill="#E11D48" stroke="#881337" strokeWidth="2.5" />
            <circle cx="72" cy="54" r="14" fill="#F43F5E" stroke="#881337" strokeWidth="2.5" />
            <path d="M48 40C50 28 60 28 60 28C60 28 70 28 72 40" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
            <circle cx="45" cy="52" r="2" fill="#FECDD3" />
            <circle cx="69" cy="52" r="2" fill="#FECDD3" />
            <text x="60" y="98" textAnchor="middle" fill="#9F1239" fontSize="13" fontWeight="800" fontFamily="sans-serif">JUN</text>
          </svg>
        );

      case 'july':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="18" width="88" height="84" rx="14" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
            <circle cx="36" cy="36" r="10" fill="#FACC15" />
            <path d="M64 42L64 80" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M40 52C44 36 84 36 88 52Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
            <path d="M22 76C32 70 42 82 52 76C62 70 72 82 82 76C90 71 96 76 98 78" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
            <text x="60" y="98" textAnchor="middle" fill="#0369A1" fontSize="13" fontWeight="800" fontFamily="sans-serif">JUL</text>
          </svg>
        );

      case 'august':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="18" width="88" height="84" rx="14" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="3" />
            <circle cx="42" cy="38" r="11" fill="#FACC15" stroke="#D97706" strokeWidth="2" />
            <path d="M36 60H86C84 78 72 84 61 84C50 84 38 78 36 60Z" fill="#16A34A" stroke="#14532D" strokeWidth="2.5" />
            <path d="M41 60H81C79 73 70 78 61 78C52 78 43 73 41 60Z" fill="#F43F5E" />
            <circle cx="54" cy="67" r="2" fill="#1E293B" />
            <circle cx="62" cy="71" r="2" fill="#1E293B" />
            <circle cx="69" cy="67" r="2" fill="#1E293B" />
            <text x="60" y="98" textAnchor="middle" fill="#A16207" fontSize="13" fontWeight="800" fontFamily="sans-serif">AUG</text>
          </svg>
        );

      case 'september':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="18" width="88" height="84" rx="14" fill="#FFEDD5" stroke="#EA580C" strokeWidth="3" />
            <path d="M60 28C46 40 44 60 60 72C76 60 74 40 60 28Z" fill="#F97316" stroke="#9A3412" strokeWidth="2.5" />
            <path d="M60 34V80" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M60 52L50 46M60 60L70 54" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
            <text x="60" y="98" textAnchor="middle" fill="#9A3412" fontSize="13" fontWeight="800" fontFamily="sans-serif">SEP</text>
          </svg>
        );

      case 'october':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="18" width="88" height="84" rx="14" fill="#FFF1F2" stroke="#E11D48" strokeWidth="3" />
            <rect x="30" y="30" width="60" height="40" rx="4" fill="#E11D48" stroke="#9F1239" strokeWidth="2.5" />
            <circle cx="54" cy="50" r="10" fill="#FFFFFF" />
            <circle cx="57" cy="50" r="8" fill="#E11D48" />
            <polygon points="67,45 69,49 73,49 70,52 71,56 67,53 63,56 64,52 61,49 65,49" fill="#FFFFFF" />
            <text x="60" y="96" textAnchor="middle" fill="#9F1239" fontSize="13" fontWeight="800" fontFamily="sans-serif">29 OCT</text>
          </svg>
        );

      case 'november':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="18" width="88" height="84" rx="14" fill="#E0F2FE" stroke="#0369A1" strokeWidth="3" />
            <path d="M36 52H82C88 52 92 48 92 43C92 38 87 34 82 34C80 25 71 22 61 22C51 22 43 28 41 35C34 35 28 40 28 45C28 49 32 52 36 52Z" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
            <line x1="42" y1="60" x2="38" y2="74" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="60" y1="60" x2="56" y2="74" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="78" y1="60" x2="74" y2="74" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
            <text x="60" y="98" textAnchor="middle" fill="#0369A1" fontSize="13" fontWeight="800" fontFamily="sans-serif">NOV</text>
          </svg>
        );

      case 'december':
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <rect x="16" y="18" width="88" height="84" rx="14" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="3" />
            <polygon points="60,26 42,54 78,54" fill="#0F766E" stroke="#134E4A" strokeWidth="2" />
            <polygon points="60,42 36,74 84,74" fill="#10B981" stroke="#065F46" strokeWidth="2" />
            <rect x="55" y="74" width="10" height="8" fill="#78350F" />
            <circle cx="32" cy="34" r="3.5" fill="#60A5FA" />
            <circle cx="86" cy="36" r="3.5" fill="#60A5FA" />
            <circle cx="34" cy="64" r="3" fill="#93C5FD" />
            <text x="60" y="98" textAnchor="middle" fill="#3730A3" fontSize="13" fontWeight="800" fontFamily="sans-serif">DEC</text>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none">
            <circle cx="60" cy="60" r="36" fill="#EDE9FE" stroke="#6D28D9" strokeWidth="3" />
            <polygon points="60,34 67,50 84,52 71,64 74,82 60,73 46,82 49,64 36,52 53,50" fill="#FACC15" stroke="#B45309" strokeWidth="2.5" />
          </svg>
        );
    }
  };

  return <div className="inline-flex items-center justify-center shrink-0">{renderSvg()}</div>;
};
