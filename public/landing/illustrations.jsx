// Hand-drawn-style SVG illustrations for Darsly
// Use CSS var --accent for the brand color so they tint with the theme.

const SK = "#1F2937"; // sketch stroke
const SK_FAINT = "#6B7280";

// ============================================================
// HERO ILLUSTRATION: Teacher at desk with printables + monitor
// ============================================================
const HeroIllustration = ({ width = 460, height = 320 }) => (
  <svg viewBox="0 0 460 320" width={width} height={height} xmlns="http://www.w3.org/2000/svg" fill="none">
    {/* "Teacher" label + arrow */}
    <g style={{ fontFamily: "'Caveat', 'Patrick Hand', cursive", fontSize: 22 }} fill="var(--accent)">
      <text x="230" y="22">Ustoz</text>
    </g>
    <path d="M 240 30 Q 230 55 218 88" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M 215 82 L 218 92 L 226 85" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

    {/* Person — sitting at desk */}
    {/* head */}
    <circle cx="208" cy="118" r="22" stroke={SK} strokeWidth="2.5" fill="white"/>
    {/* hair tuft */}
    <path d="M 188 108 Q 200 95 222 102" stroke={SK} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    {/* glasses */}
    <circle cx="201" cy="120" r="4.5" stroke={SK} strokeWidth="1.8" fill="none"/>
    <circle cx="216" cy="120" r="4.5" stroke={SK} strokeWidth="1.8" fill="none"/>
    <path d="M 205.5 120 L 211.5 120" stroke={SK} strokeWidth="1.8"/>
    {/* smile */}
    <path d="M 203 128 Q 208 132 213 128" stroke={SK} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    {/* shoulders/torso */}
    <path d="M 178 175 Q 175 145 200 140 L 218 140 Q 240 145 238 175 L 238 200 L 178 200 Z" stroke={SK} strokeWidth="2.5" strokeLinejoin="round" fill="white"/>
    {/* arm reaching to keyboard */}
    <path d="M 178 175 Q 155 178 140 195" stroke={SK} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M 238 175 Q 260 178 275 195" stroke={SK} strokeWidth="2.5" strokeLinecap="round" fill="none"/>

    {/* Desk surface */}
    <path d="M 50 230 L 410 230" stroke={SK} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M 50 230 L 35 285" stroke={SK} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M 410 230 L 425 285" stroke={SK} strokeWidth="2.5" strokeLinecap="round"/>

    {/* Printables stack on left */}
    <g transform="translate(70, 200) rotate(-6)">
      <rect x="0" y="0" width="78" height="58" rx="2" stroke={SK} strokeWidth="2.2" fill="white"/>
      <path d="M 10 14 L 60 14" stroke={SK_FAINT} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 10 22 L 55 22" stroke={SK_FAINT} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 10 30 L 60 30" stroke={SK_FAINT} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 10 38 L 48 38" stroke={SK_FAINT} strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="10" y="44" width="10" height="8" stroke="var(--accent)" strokeWidth="1.8" fill="var(--accent-soft)"/>
    </g>
    <g transform="translate(82, 195) rotate(3)">
      <rect x="0" y="0" width="78" height="58" rx="2" stroke={SK} strokeWidth="2.2" fill="white"/>
      <circle cx="15" cy="15" r="5" stroke="var(--accent)" strokeWidth="1.8" fill="var(--accent-soft)"/>
      <path d="M 28 13 L 60 13" stroke={SK_FAINT} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 28 19 L 50 19" stroke={SK_FAINT} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 10 32 L 60 32" stroke={SK_FAINT} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 10 40 L 55 40" stroke={SK_FAINT} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 10 48 L 40 48" stroke={SK_FAINT} strokeWidth="1.5" strokeLinecap="round"/>
    </g>
    {/* "Printables" label + arrow */}
    <g style={{ fontFamily: "'Caveat', 'Patrick Hand', cursive", fontSize: 22 }} fill="var(--accent)">
      <text x="60" y="305">Bosma</text>
    </g>
    <path d="M 100 295 Q 110 280 118 260" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M 114 264 L 120 258 L 124 264" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

    {/* Monitor on right */}
    <g transform="translate(290, 100)">
      <rect x="0" y="0" width="120" height="86" rx="4" stroke={SK} strokeWidth="2.5" fill="white"/>
      <path d="M 50 86 L 50 100 L 70 100 L 70 86" stroke={SK} strokeWidth="2.5" strokeLinejoin="round" fill="white"/>
      <path d="M 35 100 L 85 100" stroke={SK} strokeWidth="2.5" strokeLinecap="round"/>
      {/* triangle on screen */}
      <path d="M 50 60 L 70 25 L 90 60 Z" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" fill="var(--accent-soft)"/>
    </g>
    {/* "Interactives" label + arrow */}
    <g style={{ fontFamily: "'Caveat', 'Patrick Hand', cursive", fontSize: 22 }} fill="var(--accent)">
      <text x="320" y="305">Interaktiv</text>
    </g>
    <path d="M 360 295 Q 365 270 370 220" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M 366 226 L 371 218 L 377 224" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

// ============================================================
// STEP 1: Pick a template — laptop with template list
// ============================================================
const LaptopPickTemplate = ({ width = 240, height = 170 }) => (
  <svg viewBox="0 0 240 170" width={width} height={height} fill="none">
    {/* laptop body */}
    <rect x="20" y="20" width="200" height="120" rx="6" stroke={SK} strokeWidth="2.5" fill="white"/>
    <rect x="30" y="30" width="180" height="100" rx="2" fill="#FAFAFA" stroke={SK_FAINT} strokeWidth="1"/>
    {/* base */}
    <path d="M 10 140 L 230 140 L 218 158 L 22 158 Z" stroke={SK} strokeWidth="2.5" strokeLinejoin="round" fill="white"/>
    <path d="M 100 148 L 140 148" stroke={SK} strokeWidth="2" strokeLinecap="round"/>

    {/* "Pick a template" header on screen */}
    <text x="40" y="46" style={{ fontFamily: "'Caveat', 'Patrick Hand', cursive", fontSize: 14 }} fill={SK}>Shablon tanlang</text>

    {/* template list items */}
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(40, ${56 + i * 22})`}>
        <rect x="0" y="0" width="22" height="16" rx="2" stroke="var(--accent)" strokeWidth="1.5" fill={i === 0 ? "var(--accent-soft)" : "white"}/>
        <circle cx="6" cy="8" r="2" fill="var(--accent)"/>
        <path d="M 12 6 L 18 6" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M 12 10 L 16 10" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M 30 4 L 130 4" stroke={SK_FAINT} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 30 11 L 90 11" stroke={SK_FAINT} strokeWidth="1" strokeLinecap="round"/>
      </g>
    ))}
  </svg>
);

// ============================================================
// STEP 2: Enter content — laptop with quiz form
// ============================================================
const LaptopEnterContent = ({ width = 240, height = 170 }) => (
  <svg viewBox="0 0 240 170" width={width} height={height} fill="none">
    <rect x="20" y="20" width="200" height="120" rx="6" stroke={SK} strokeWidth="2.5" fill="white"/>
    <rect x="30" y="30" width="180" height="100" rx="2" fill="#FAFAFA" stroke={SK_FAINT} strokeWidth="1"/>
    <path d="M 10 140 L 230 140 L 218 158 L 22 158 Z" stroke={SK} strokeWidth="2.5" strokeLinejoin="round" fill="white"/>
    <path d="M 100 148 L 140 148" stroke={SK} strokeWidth="2" strokeLinecap="round"/>

    <text x="40" y="46" style={{ fontFamily: "'Caveat', 'Patrick Hand', cursive", fontSize: 14 }} fill={SK}>Test</text>

    {/* question line */}
    <path d="M 40 56 L 180 56" stroke={SK} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M 40 62 L 140 62" stroke={SK_FAINT} strokeWidth="1" strokeLinecap="round"/>

    {/* answer rows */}
    {[
      { y: 74, color: "var(--accent)", checked: true },
      { y: 90, color: SK_FAINT, checked: false },
      { y: 106, color: SK_FAINT, checked: false },
    ].map((r, i) => (
      <g key={i}>
        <circle cx="46" cy={r.y + 4} r="4" stroke={r.color} strokeWidth="1.5" fill={r.checked ? "var(--accent)" : "white"}/>
        {r.checked && <path d={`M 44 ${r.y + 4} L 46 ${r.y + 6} L 49 ${r.y + 2}`} stroke="white" strokeWidth="1.5" fill="none"/>}
        <path d={`M 58 ${r.y + 4} L 130 ${r.y + 4}`} stroke={SK_FAINT} strokeWidth="1.2" strokeLinecap="round"/>
      </g>
    ))}

    {/* save button */}
    <rect x="150" y="116" width="48" height="14" rx="3" fill="var(--accent)"/>
    <text x="174" y="126" textAnchor="middle" style={{ fontFamily: "'Nunito', sans-serif", fontSize: 9, fontWeight: 700 }} fill="white">Saqlash</text>
  </svg>
);

// ============================================================
// STEP 3: Play on any device — big screen + worksheet
// ============================================================
const PlayDevice = ({ width = 260, height = 180 }) => (
  <svg viewBox="0 0 260 180" width={width} height={height} fill="none">
    {/* big screen */}
    <rect x="20" y="14" width="180" height="115" rx="6" stroke={SK} strokeWidth="2.5" fill="var(--accent-soft)"/>

    <text x="110" y="36" textAnchor="middle" style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, fontWeight: 700 }} fill={SK}>
      Eng issiq sayyora qaysi?
    </text>

    {/* 4 answer chips */}
    {[
      { x: 38, y: 56, label: "Saturn" },
      { x: 100, y: 56, label: "Yer" },
      { x: 38, y: 88, label: "Venera" },
      { x: 100, y: 88, label: "Mars" },
    ].map((a, i) => (
      <g key={i}>
        <circle cx={a.x + 14} cy={a.y + 14} r="14" stroke={SK} strokeWidth="1.8" fill="white"/>
        <text x={a.x + 14} y={a.y + 17} textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: 10 }} fill={SK}>{a.label}</text>
      </g>
    ))}

    {/* stand */}
    <path d="M 100 129 L 120 129 L 124 145 L 96 145 Z" stroke={SK} strokeWidth="2" strokeLinejoin="round" fill="white"/>
    <path d="M 80 145 L 140 145" stroke={SK} strokeWidth="2" strokeLinecap="round"/>

    {/* worksheet on right, behind */}
    <g transform="translate(160, 50) rotate(8)">
      <rect x="0" y="0" width="72" height="96" stroke={SK} strokeWidth="2" fill="white"/>
      <path d="M 8 12 L 60 12" stroke={SK_FAINT} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M 8 20 L 50 20" stroke={SK_FAINT} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M 8 30 L 60 30" stroke={SK_FAINT} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M 8 38 L 55 38" stroke={SK_FAINT} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M 8 48 L 60 48" stroke={SK_FAINT} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M 8 56 L 45 56" stroke={SK_FAINT} strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="8" y="68" width="10" height="10" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent-soft)"/>
      <path d="M 22 73 L 60 73" stroke={SK_FAINT} strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="8" y="82" width="10" height="10" stroke="var(--accent)" strokeWidth="1.5" fill="white"/>
      <path d="M 22 87 L 55 87" stroke={SK_FAINT} strokeWidth="1.2" strokeLinecap="round"/>
    </g>
  </svg>
);

// ============================================================
// FEATURE ICONS (6) — small hand-drawn glyphs
// ============================================================
const IconMinute = () => (
  <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
    {/* clock-like radial burst with "1" */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
      const r1 = 24, r2 = 32;
      const rad = (deg * Math.PI) / 180;
      const x1 = 40 + r1 * Math.cos(rad);
      const y1 = 40 + r1 * Math.sin(rad);
      const x2 = 40 + r2 * Math.cos(rad);
      const y2 = 40 + r2 * Math.sin(rad);
      return <path key={i} d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>;
    })}
    <text x="40" y="48" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: 28, fontWeight: 700 }} fill="var(--accent)">1'</text>
  </svg>
);

const IconActivityTypes = () => (
  <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
    {[[10, 10], [38, 10], [10, 38], [38, 38]].map(([x, y], i) => (
      <rect key={i} x={x} y={y} width="22" height="22" rx="3" stroke="var(--accent)" strokeWidth="2" fill={i % 2 ? "var(--accent-soft)" : "white"}/>
    ))}
    <g transform="translate(13, 13)"><circle cx="6" cy="8" r="3" fill="var(--accent)"/><path d="M 0 16 L 16 16" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/></g>
    <g transform="translate(41, 13)"><path d="M 4 4 L 14 14 M 14 4 L 4 14" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/></g>
    <g transform="translate(13, 41)"><circle cx="4" cy="4" r="2" fill="var(--accent)"/><circle cx="10" cy="4" r="2" fill="var(--accent)"/><circle cx="16" cy="4" r="2" fill="var(--accent)"/><path d="M 0 12 L 16 12" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/></g>
    <g transform="translate(41, 41)"><path d="M 2 10 L 6 14 L 14 4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></g>
  </svg>
);

const IconCommunity = () => (
  <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
    {/* laptop + phone */}
    <rect x="6" y="22" width="48" height="32" rx="3" stroke="var(--accent)" strokeWidth="2" fill="white"/>
    <rect x="10" y="26" width="40" height="24" rx="1" fill="var(--accent-soft)"/>
    <path d="M 2 54 L 58 54 L 56 60 L 4 60 Z" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" fill="white"/>
    {/* grid on screen */}
    {[0, 1].map((row) => [0, 1, 2].map((col) => (
      <rect key={`${row}-${col}`} x={14 + col * 12} y={30 + row * 9} width="8" height="6" fill="var(--accent)" opacity="0.6"/>
    )))}
    {/* phone */}
    <rect x="56" y="36" width="20" height="32" rx="3" stroke="var(--accent)" strokeWidth="2" fill="white"/>
    <rect x="59" y="40" width="14" height="22" rx="1" fill="var(--accent-soft)"/>
    <circle cx="66" cy="65" r="1.5" fill="var(--accent)"/>
  </svg>
);

const IconPrint = () => (
  <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
    {/* printer */}
    <rect x="14" y="32" width="52" height="22" rx="3" stroke="var(--accent)" strokeWidth="2" fill="white"/>
    <rect x="22" y="20" width="36" height="14" stroke="var(--accent)" strokeWidth="2" fill="white"/>
    <circle cx="58" cy="42" r="2" fill="var(--accent)"/>
    {/* paper coming out */}
    <rect x="22" y="48" width="36" height="20" stroke="var(--accent)" strokeWidth="2" fill="var(--accent-soft)"/>
    <path d="M 28 56 L 52 56" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M 28 60 L 46 60" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M 28 64 L 50 64" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconAssignments = () => (
  <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
    {/* 2 papers */}
    <g transform="translate(12, 14) rotate(-4)">
      <rect x="0" y="0" width="32" height="44" stroke="var(--accent)" strokeWidth="2" fill="white"/>
      <path d="M 5 8 L 27 8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 5 14 L 22 14" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M 5 22 L 27 22" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M 5 28 L 20 28" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </g>
    <g transform="translate(36, 20) rotate(6)">
      <rect x="0" y="0" width="32" height="44" stroke="var(--accent)" strokeWidth="2" fill="white"/>
      <path d="M 5 8 L 27 8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 5 14 L 22 14" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      {/* checkmark */}
      <path d="M 4 26 L 8 30 L 16 22" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M 4 36 L 8 40 L 16 32" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </g>
  </svg>
);

const IconCustomize = () => (
  <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
    {/* wrench + screwdriver crossed + dot panel */}
    <path d="M 18 56 L 38 36" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>
    <path d="M 14 60 Q 8 66 14 70 Q 20 76 26 70 L 22 66" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" fill="white"/>
    <circle cx="40" cy="34" r="6" stroke="var(--accent)" strokeWidth="2.5" fill="white"/>

    <path d="M 38 56 L 56 38" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>
    <rect x="36" y="58" width="10" height="6" transform="rotate(45 41 61)" stroke="var(--accent)" strokeWidth="2" fill="white"/>
    <path d="M 54 36 L 60 30" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>

    {/* slider dots */}
    <circle cx="58" cy="56" r="3" fill="var(--accent)"/>
    <circle cx="66" cy="56" r="3" stroke="var(--accent)" strokeWidth="1.8" fill="white"/>
    <path d="M 50 56 L 70 56" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    <circle cx="58" cy="64" r="3" stroke="var(--accent)" strokeWidth="1.8" fill="white"/>
    <circle cx="66" cy="64" r="3" fill="var(--accent)"/>
    <path d="M 50 64 L 70 64" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

// ============================================================
// TEMPLATE THUMBS (12) — small iconographic tiles
// ============================================================
const TT = ({ children }) => (
  <svg viewBox="0 0 90 70" width="90" height="70" fill="none">
    <rect x="0" y="0" width="90" height="70" rx="4" fill="var(--accent-soft)"/>
    {children}
  </svg>
);

const TTMatchUp = () => (
  <TT>
    <rect x="10" y="14" width="22" height="10" rx="2" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    <rect x="10" y="30" width="22" height="10" rx="2" fill="var(--accent)"/>
    <rect x="10" y="46" width="22" height="10" rx="2" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    <rect x="58" y="14" width="22" height="10" rx="2" fill="var(--accent)"/>
    <rect x="58" y="30" width="22" height="10" rx="2" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    <rect x="58" y="46" width="22" height="10" rx="2" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    <path d="M 34 35 Q 45 35 56 19" stroke="var(--accent)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <path d="M 51 22 L 56 19 L 53 14" stroke="var(--accent)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </TT>
);

const TTQuiz = () => (
  <TT>
    <rect x="14" y="12" width="62" height="46" rx="3" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    <text x="45" y="26" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: 13, fontWeight: 700 }} fill="var(--accent)">?</text>
    <rect x="20" y="32" width="12" height="10" rx="2" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.2"/>
    <path d="M 22 38 L 30 38 M 22 34 L 28 34" stroke="var(--accent)" strokeWidth="0.8"/>
    <rect x="36" y="32" width="12" height="10" rx="2" fill="var(--accent)"/>
    <path d="M 38 36 L 40 38 L 46 33" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="20" y="46" width="12" height="10" rx="2" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.2"/>
    <rect x="36" y="46" width="12" height="10" rx="2" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.2"/>
    <text x="58" y="40" style={{ fontFamily: "'Caveat', cursive", fontSize: 11 }} fill="var(--accent)">×</text>
    <text x="58" y="52" style={{ fontFamily: "'Caveat', cursive", fontSize: 11 }} fill="var(--accent)">✓</text>
  </TT>
);

const TTFlashCards = () => (
  <TT>
    <rect x="22" y="18" width="48" height="32" rx="3" fill="white" stroke="var(--accent)" strokeWidth="1.5" transform="rotate(-4 46 34)"/>
    <rect x="14" y="22" width="48" height="32" rx="3" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    <text x="38" y="42" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: 18, fontWeight: 700 }} fill="var(--accent)">A</text>
  </TT>
);

const TTSpeakingCards = () => (
  <TT>
    <rect x="14" y="20" width="28" height="30" rx="3" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    <circle cx="28" cy="35" r="6" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5"/>
    <path d="M 28 32 L 28 38 M 25 36 L 31 36 M 26 34 L 30 34" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round"/>
    <rect x="48" y="20" width="28" height="30" rx="3" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1.5"/>
    <circle cx="62" cy="35" r="6" fill="white"/>
    <path d="M 58 35 L 66 35" stroke="var(--accent)" strokeWidth="1.5"/>
  </TT>
);

const TTSpinWheel = () => (
  <TT>
    <circle cx="45" cy="36" r="22" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    {[0, 90, 180, 270].map((d, i) => {
      const r = (d * Math.PI) / 180;
      return <path key={i} d={`M 45 36 L ${45 + 22 * Math.cos(r)} ${36 + 22 * Math.sin(r)}`} stroke="var(--accent)" strokeWidth="1.5"/>;
    })}
    <path d="M 45 14 A 22 22 0 0 1 67 36 L 45 36 Z" fill="var(--accent)"/>
    <path d="M 45 14 L 49 8 L 45 12 L 41 8 Z" fill="var(--accent)"/>
    <circle cx="45" cy="36" r="3" fill="var(--accent)"/>
  </TT>
);

const TTGroupSort = () => (
  <TT>
    <rect x="10" y="16" width="22" height="40" rx="3" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    <rect x="13" y="20" width="16" height="6" rx="1" fill="var(--accent)"/>
    <rect x="13" y="28" width="16" height="6" rx="1" fill="var(--accent)"/>
    <rect x="34" y="16" width="22" height="40" rx="3" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    <rect x="37" y="20" width="16" height="6" rx="1" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1"/>
    <rect x="37" y="28" width="16" height="6" rx="1" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1"/>
    <rect x="37" y="36" width="16" height="6" rx="1" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1"/>
    <rect x="58" y="16" width="22" height="40" rx="3" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    <rect x="61" y="20" width="16" height="6" rx="1" fill="var(--accent)" opacity="0.5"/>
  </TT>
);

const TTCompleteSentence = () => (
  <TT>
    <rect x="12" y="20" width="20" height="14" rx="2" fill="var(--accent)" />
    <text x="22" y="30" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: 9, fontWeight: 700 }} fill="white">rahmat</text>
    <rect x="36" y="20" width="20" height="14" rx="2" fill="white" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="2 2"/>
    <rect x="60" y="20" width="20" height="14" rx="2" fill="var(--accent)" />
    <text x="70" y="30" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: 9, fontWeight: 700 }} fill="white">size</text>
    <path d="M 12 42 L 80 42" stroke="var(--accent)" strokeWidth="1" opacity="0.5"/>
    <path d="M 12 48 L 60 48" stroke="var(--accent)" strokeWidth="1" opacity="0.5"/>
    <path d="M 12 54 L 70 54" stroke="var(--accent)" strokeWidth="1" opacity="0.5"/>
  </TT>
);

const TTUnjumble = () => (
  <TT>
    <rect x="10" y="22" width="18" height="14" rx="2" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    <text x="19" y="32" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: 10, fontWeight: 700 }} fill="var(--accent)">men</text>
    <path d="M 30 30 L 35 28 L 35 32 Z" fill="var(--accent)"/>
    <rect x="38" y="22" width="22" height="14" rx="2" fill="var(--accent)"/>
    <text x="49" y="32" textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: 10, fontWeight: 700 }} fill="white">seni</text>
    <path d="M 62 30 L 67 28 L 67 32 Z" fill="var(--accent)"/>
    <rect x="70" y="22" width="14" height="14" rx="2" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    <path d="M 10 46 L 84 46" stroke="var(--accent)" strokeWidth="1" opacity="0.4"/>
    <path d="M 10 52 L 70 52" stroke="var(--accent)" strokeWidth="1" opacity="0.4"/>
  </TT>
);

const TTFindMatch = () => (
  <TT>
    <path d="M 22 18 L 30 32 L 14 32 Z" fill="var(--accent)"/>
    <circle cx="46" cy="26" r="8" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    <rect x="62" y="18" width="16" height="16" rx="2" fill="var(--accent)"/>
    <path d="M 22 44 L 30 58 L 14 58 Z" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    <path d="M 40 44 L 52 44 L 52 58 L 40 58 Z" fill="white" stroke="var(--accent)" strokeWidth="1.5"/>
    <circle cx="70" cy="52" r="8" fill="var(--accent)"/>
  </TT>
);

const TTAnagram = () => (
  <TT>
    {["B", "I", "L", "I", "M"].map((c, i) => (
      <g key={i}>
        <rect x={12 + i * 14} y={26 + (i % 2) * 4} width="12" height="14" rx="2" fill="var(--accent)"/>
        <text x={18 + i * 14} y={36 + (i % 2) * 4} textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: 11, fontWeight: 700 }} fill="white">{c}</text>
      </g>
    ))}
    <path d="M 12 50 L 78 50" stroke="var(--accent)" strokeWidth="1" opacity="0.4"/>
  </TT>
);

const TTMatchingPairs = () => (
  <TT>
    {[0, 1, 2].map((c) => [0, 1].map((r) => (
      <rect key={`${r}-${c}`} x={14 + c * 22} y={16 + r * 22} width="18" height="18" rx="3"
        fill={(c === 0 && r === 0) || (c === 2 && r === 1) ? "white" : "var(--accent)"}
        stroke="var(--accent)" strokeWidth="1.5"/>
    )))}
    {/* show matched (open) cards with symbols */}
    <path d="M 19 22 L 27 30 M 27 22 L 19 30" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="67" cy="47" r="4" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent-soft)"/>
  </TT>
);

const TTOpenBox = () => (
  <TT>
    {[
      { x: 14, y: 18, n: "1" },
      { x: 36, y: 18, n: "2" },
      { x: 58, y: 18, n: "3" },
      { x: 14, y: 38, n: "4" },
      { x: 36, y: 38, n: "5", open: true },
      { x: 58, y: 38, n: "6" },
    ].map((b, i) => (
      <g key={i}>
        <rect x={b.x} y={b.y} width="18" height="16" rx="2" fill={b.open ? "white" : "var(--accent)"} stroke="var(--accent)" strokeWidth="1.5"/>
        <text x={b.x + 9} y={b.y + 12} textAnchor="middle" style={{ fontFamily: "'Caveat', cursive", fontSize: 11, fontWeight: 700 }} fill={b.open ? "var(--accent)" : "white"}>{b.n}</text>
      </g>
    ))}
  </TT>
);

Object.assign(window, {
  HeroIllustration,
  LaptopPickTemplate, LaptopEnterContent, PlayDevice,
  IconMinute, IconActivityTypes, IconCommunity, IconPrint, IconAssignments, IconCustomize,
  TTMatchUp, TTQuiz, TTFlashCards, TTSpeakingCards, TTSpinWheel, TTGroupSort,
  TTCompleteSentence, TTUnjumble, TTFindMatch, TTAnagram, TTMatchingPairs, TTOpenBox,
});
