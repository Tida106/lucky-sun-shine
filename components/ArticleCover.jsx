import { getCategory } from '@/lib/categories';
import CategoryIcon from './CategoryIcon';

// 既存のWebP化済みマスコットを使い回す（新規画像素材は追加しない）。
// 記事スラグをシードにして決定的に選ぶことで、同じ記事は常に同じ表情になり、
// ビルド間でブレない（静的書き出しでもハイドレーション差異が出ない）。
const MASCOTS = [
  '/images/mascot-sun.webp',
  '/images/mascot-sun-morning.webp',
  '/images/mascot-sun-cheer.webp',
  '/images/mascot-sun-yay.webp',
  '/images/mascot-sun-good.webp',
  '/images/mascot-sun-believe.webp',
];

function pickMascot(seed = '') {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return MASCOTS[h % MASCOTS.length];
}

// 記事の cover を CSS グラデーション + 既存マスコット + カテゴリアイコンで自動生成する。
// 画像ファイルを増やさず、カテゴリごとの色トーン（lib/categories.js の `color` /
// `pastel.accent` を参照）でビジュアル統一する。
//
// variant:
//   card — 一覧カード上部用（高さ128px、PostCard 互換）
//   hero — 記事先頭用（横長バナー / アスペクト比固定）
export default function ArticleCover({ post, variant = 'card', className = '' }) {
  const cat = getCategory(post.category);
  const gradient = cat?.color || 'from-amber-200 via-yellow-100 to-orange-100';
  const accent = cat?.pastel?.accent || 'text-amber-700';
  const mascot = pickMascot(post.slug || post.title || '');
  const isHero = variant === 'hero';

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-br ${gradient} ${
        isHero
          ? 'rounded-2xl aspect-[16/9] sm:aspect-[2.2/1] md:aspect-[2.6/1]'
          : 'h-32'
      } ${className}`}
    >
      {/* 柔らかい光の装飾 — ふんわりした奥行きを出す */}
      <span
        aria-hidden="true"
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/35 blur-2xl"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-white/25 blur-2xl"
      />

      {/* 背景にぼんやり大きなカテゴリアイコン */}
      {cat && (
        <CategoryIcon
          slug={cat.slug}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
            isHero
              ? 'w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44'
              : 'w-20 h-20'
          } text-white/40`}
        />
      )}

      {/* カテゴリラベル（左上） */}
      <div
        className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur-sm px-2.5 py-1 font-bold ${accent} ${
          isHero
            ? 'text-xs md:text-sm md:left-6 md:top-6 md:px-3 md:py-1.5'
            : 'text-[10px]'
        }`}
      >
        {cat && (
          <CategoryIcon
            slug={cat.slug}
            className={isHero ? 'w-3.5 h-3.5 md:w-4 md:h-4' : 'w-3 h-3'}
          />
        )}
        <span>{cat?.title || post.category}</span>
      </div>

      {/* 太陽ちゃん（右下） — 装飾用途のため alt は空・aria-hidden */}
      <img
        src={mascot}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={`absolute object-contain select-none pointer-events-none drop-shadow-[0_4px_10px_rgba(245,158,11,0.25)] ${
          isHero
            ? 'right-3 bottom-2 w-24 h-24 sm:right-6 sm:bottom-3 sm:w-32 sm:h-32 md:right-10 md:bottom-4 md:w-44 md:h-44'
            : 'right-2 bottom-1 w-20 h-20'
        }`}
      />
    </div>
  );
}
