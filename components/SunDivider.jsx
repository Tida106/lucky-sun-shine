import SunOrnament from './icons/SunOrnament';

// Section break ornament — two fading gold rules with a sun glyph
// centered between them. Purely decorative.
export default function SunDivider({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`my-12 flex items-center justify-center gap-4 opacity-70 ${className}`}
    >
      <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-amber-500" />
      <SunOrnament className="w-7 h-7 text-amber-500" />
      <span className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-amber-500" />
    </div>
  );
}
