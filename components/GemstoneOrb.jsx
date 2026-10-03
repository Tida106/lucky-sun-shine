import CategoryIcon from './CategoryIcon';

// 石の写真は public/images/stones/<slug>-320.webp のビルド時固定画像を使う
// (外部APIへのランタイム取得は行わない)。画像が無い石はカテゴリアイコンに
// フォールバックする。
export default function GemstoneOrb({ stoneSlug, catSlug, sizeClasses }) {
  if (stoneSlug) {
    return (
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden border-[4px] border-white/80 shadow-[0_0_40px_rgba(255,255,255,0.7)] z-10 ${sizeClasses}`}>
        <img
          src={`/images/stones/${stoneSlug}-320.webp`}
          alt={stoneSlug}
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 rounded-full shadow-[inset_0_6px_15px_rgba(255,255,255,0.8)] pointer-events-none" />
        <div className="absolute inset-0 rounded-full shadow-[inset_0_-5px_15px_rgba(0,0,0,0.2)] pointer-events-none" />
      </div>
    );
  }

  // 画像がない場合は、安全に白いアイコンを表示
  if (catSlug) {
    return (
      <CategoryIcon
        slug={catSlug}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeClasses} text-white/40 z-10`}
      />
    );
  }

  return null;
}
