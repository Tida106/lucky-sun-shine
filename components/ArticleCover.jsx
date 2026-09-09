import { getCategory } from '@/lib/categories';
import CategoryIcon from './CategoryIcon';
import GemstoneOrb from './GemstoneOrb'; // さっき作った専用オーブを呼び出す

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

export default function ArticleCover({ post, variant = 'card', className = '' }) {
  if (!post) return null;

  const categorySlug = post.category;
  const title = post.title || '';
  const cat = categorySlug ? getCategory(categorySlug) : null;

  const gradient = cat?.color || 'from-amber-200 via-yellow-100 to-orange-100';
  const accent = cat?.pastel?.accent || 'text-amber-700';
  const mascot = pickMascot(post.slug || title);
  const isHero = variant === 'hero';

  const sizeClasses = isHero
    ? 'w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44'
    : 'w-20 h-20';

  // タイトルから石の名前を賢く抽出
  const stoneKeywords = [
    'ガーネット', 'ローズクォーツ', 'アメジスト', 'ムーンストーン', 'ルビー',
    'スモーキークォーツ', 'ラピスラズリ', 'アクアマリン', 'ブルートパーズ', 'サファイア',
    'ダイヤモンド', 'エメラルド', 'パール', 'ターコイズ', 'シトリン', 'ペリドット',
    'オパール', 'トルマリン', 'タンザナイト', 'アイオライト', 'ヘマタイト', 'カーネリアン',
    'アベンチュリン', 'クリソプレーズ', 'タイガーアイ', 'コーラル（珊瑚）', 'ブラッドストーン',
    'ロードナイト', 'フローライト', 'マラカイト', 'アレキサンドライト'
  ];

  let stoneName = null;
  if (categorySlug === 'powerstones' && title) {
    stoneName = stoneKeywords.find(stone => title.includes(stone));
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-br ${gradient} ${
        isHero
          ? 'rounded-2xl aspect-[16/9] sm:aspect-[2.2/1] md:aspect-[2.6/1]'
          : 'h-32'
      } ${className}`}
    >
      {/* 柔らかい光の装飾 */}
      <span aria-hidden="true" className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/35 blur-2xl pointer-events-none" />
      <span aria-hidden="true" className="absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-white/25 blur-2xl pointer-events-none" />

      {/* 真ん中のオーブ（安全な独立部品にお任せ！） */}
      <GemstoneOrb stoneName={stoneName} catSlug={cat?.slug} sizeClasses={sizeClasses} />

      {/* カテゴリラベル（左上） */}
      <div
        className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur-sm px-2.5 py-1 font-bold shadow-sm z-20 ${accent} ${
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
        <span>{cat?.title || categorySlug || '未分類'}</span>
      </div>

      {/* 太陽ちゃん（右下） */}
      <img
        src={mascot}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={`absolute object-contain select-none pointer-events-none z-20 drop-shadow-[0_4px_10px_rgba(245,158,11,0.25)] ${
          isHero
            ? 'right-3 bottom-2 w-24 h-24 sm:right-6 sm:bottom-3 sm:w-32 sm:h-32 md:right-10 md:bottom-4 md:w-44 md:h-44'
            : 'right-2 bottom-1 w-20 h-20'
        }`}
      />
    </div>
  );
}