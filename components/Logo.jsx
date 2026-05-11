// Brand mark for Lucky Sun Shine.
//
// `SunMark` is the inline SVG glyph (filled gold disk + thin rays).
// `Logo` composes the glyph with the wordmark; `orientation="vertical"`
// stacks the glyph above the wordmark for badge / hero contexts.
//
// The wordmark uses Noto Serif JP at weight 300 with wide tracking
// (letter-spacing 0.1em) to read editorial / luxury rather than playful.

export function SunMark({ size = 28, className = 'text-amber-500' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Filled core gives the mark visual weight at small sizes */}
      <circle cx="16" cy="16" r="4.5" fill="currentColor" />
      <g
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      >
        {/* Cardinal rays */}
        <line x1="16" y1="3"  x2="16" y2="7" />
        <line x1="16" y1="25" x2="16" y2="29" />
        <line x1="3"  y1="16" x2="7"  y2="16" />
        <line x1="25" y1="16" x2="29" y2="16" />
        {/* Diagonal rays — shorter to keep the mark balanced */}
        <line x1="6.7"  y1="6.7"  x2="9.2"  y2="9.2" />
        <line x1="22.8" y1="22.8" x2="25.3" y2="25.3" />
        <line x1="6.7"  y1="25.3" x2="9.2"  y2="22.8" />
        <line x1="22.8" y1="9.2"  x2="25.3" y2="6.7" />
      </g>
      {/* Outer ring — barely-there halo for editorial polish */}
      <circle
        cx="16"
        cy="16"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.45"
      />
    </svg>
  );
}

export default function Logo({
  orientation = 'horizontal',
  size = 28,
  className = '',
  wordmarkClassName = '',
  showWordmark = true,
}) {
  const isVertical = orientation === 'vertical';

  const wordmark = (
    <span
      className={`font-serif font-light tracking-[0.1em] text-amber-900 dark:text-amber-200 ${wordmarkClassName}`}
      style={{ fontWeight: 300 }}
    >
      Lucky Sun Shine
    </span>
  );

  if (isVertical) {
    return (
      <span className={`inline-flex flex-col items-center gap-2 ${className}`}>
        <SunMark size={size} className="text-amber-500" />
        {showWordmark && wordmark}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <SunMark size={size} className="text-amber-500" />
      {showWordmark && wordmark}
    </span>
  );
}
