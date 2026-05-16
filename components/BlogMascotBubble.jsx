import SunMascot from './SunMascot';

// 記事ページの冒頭・末尾に置く太陽ちゃん吹き出し。
// 既存の SunSpeechBubble (homepage の 48px 単行用) より一回り大きく、
// 複数行 / fade-in / トーン切替対応の "記事用" バリアント。
//
// レイアウト:
//   - PC (sm+): [画像][吹き出し] の横並び、三角は左向き
//   - スマホ : [画像]を上、[吹き出し]を下に縦並び、三角は上向き

const TONES = {
  // 記事冒頭 — パステルピンク (homepage の SunSpeechBubble と同系統)
  pink: {
    bubble: 'bg-rose-50',
    // 縦並び時の上向き三角 / 横並び時の左向き三角は共通の rotate-45 で
    // 表現する。border 色はゴールド (amber-300) で統一。
  },
  // 記事末尾 — パステルクリーム (少し色味を変えて変化を出す)
  cream: {
    bubble: 'bg-amber-50',
  },
};

export default function BlogMascotBubble({
  tone = 'pink',
  src,
  alt = '太陽ちゃん',
  children,
  className = '',
}) {
  const t = TONES[tone] || TONES.pink;
  return (
    <div
      className={`mascot-bubble-fade not-prose flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 ${className}`}
    >
      <div className="shrink-0 self-center sm:self-auto">
        <SunMascot
          size={72}
          src={src}
          alt={alt}
          className="sm:!w-20 sm:!h-20"
        />
      </div>
      <div
        className={`relative flex-1 rounded-2xl border-2 border-amber-300 ${t.bubble} px-5 py-4 md:px-6 md:py-5 shadow-[0_2px_12px_rgba(245,158,11,0.10)]`}
      >
        {/* 吹き出しの三角 — sm 以上は左向き / モバイルは上向き */}
        <span
          aria-hidden="true"
          className={`absolute w-3 h-3 rotate-45 ${t.bubble} border-amber-300
            left-1/2 -top-[7px] -translate-x-1/2 border-t-2 border-l-2
            sm:left-auto sm:translate-x-0 sm:top-1/2 sm:-translate-y-1/2 sm:-left-[7px]
            sm:border-t-0 sm:border-r-0 sm:border-b-2`}
        />
        <p className="relative font-display text-sm md:text-base text-ink-900 leading-relaxed whitespace-pre-line">
          {children}
        </p>
      </div>
    </div>
  );
}
