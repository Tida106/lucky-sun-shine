// Inline SVG icons for the homepage "カテゴリから探す" cards.
// Paths are from Lucide (MIT) — Gem / Mountain / Gift / Sunrise — copied
// directly so we avoid pulling lucide-react into the bundle for 4 icons.

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function Gem(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...STROKE} {...props}>
      <path d="M6 3h12l4 6-10 13L2 9Z" />
      <path d="M11 3 8 9l4 13 4-13-3-6" />
      <path d="M2 9h20" />
    </svg>
  );
}

function Mountain(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...STROKE} {...props}>
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function Gift(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...STROKE} {...props}>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}

function Sunrise(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...STROKE} {...props}>
      <path d="M12 2v8" />
      <path d="m4.93 10.93 1.41 1.41" />
      <path d="M2 18h2" />
      <path d="M20 18h2" />
      <path d="m19.07 10.93-1.41 1.41" />
      <path d="M22 22H2" />
      <path d="m8 6 4-4 4 4" />
      <path d="M16 18a4 4 0 0 0-8 0" />
    </svg>
  );
}

// "太陽ちゃんからのお手紙" カテゴリ用 — 封筒+ハートの組み合わせ。
function LetterHeart(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...STROKE} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
      <path d="M12 15.5c-1.2-1.1-2.5-2-2.5-3.2 0-.8.6-1.3 1.3-1.3.5 0 .9.2 1.2.6.3-.4.7-.6 1.2-.6.7 0 1.3.5 1.3 1.3 0 1.2-1.3 2.1-2.5 3.2z" />
    </svg>
  );
}

const ICONS = {
  powerstones: Gem,
  powerspots: Mountain,
  'lucky-goods': Gift,
  'luck-habits': Sunrise,
  letter: LetterHeart,
};

export default function CategoryIcon({ slug, className = 'w-9 h-9 text-amber-600' }) {
  const Icon = ICONS[slug];
  if (!Icon) return null;
  return <Icon className={className} />;
}
