import SunMascot from './SunMascot';

// 太陽ちゃんの吹き出しコメント。トップページ各セクションの直前に挿入し
// セクションの世界観を太陽ちゃんの声で受け渡す。
// 太陽ちゃん画像(48px) + 吹き出し(パステルピンク+ゴールド枠+三角)。
// `align="right"` で画像を右側に置く左右反転バリエーション。

export default function SunSpeechBubble({
  children,
  align = 'left',
  size = 48,
  className = '',
}) {
  const isRight = align === 'right';
  return (
    <div
      className={`flex items-center gap-3 ${
        isRight ? 'flex-row-reverse justify-end' : ''
      } ${className}`}
    >
      <SunMascot size={size} className="shrink-0 drop-shadow-sm" alt="" />
      <div
        className="relative rounded-2xl bg-rose-50 border-2 border-amber-300 px-4 py-2 md:px-5 md:py-2.5 shadow-[0_2px_10px_rgba(245,158,11,0.10)] font-display text-sm md:text-base text-ink-900 leading-snug"
      >
        {/* 吹き出しの三角（45°回転した正方形で枠と一体化させる） */}
        <span
          aria-hidden="true"
          className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-rose-50 ${
            isRight
              ? '-right-[7px] border-t-2 border-r-2 border-amber-300'
              : '-left-[7px] border-b-2 border-l-2 border-amber-300'
          }`}
        />
        <span className="relative">{children}</span>
      </div>
    </div>
  );
}
