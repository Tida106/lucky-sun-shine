// Single source of truth for site categories.
// Slugs are stable URL identifiers — do not rename without redirects.
// `pastel` carries per-category tokens that drive the category-card,
// hero, and label coloring. Use the class strings on Tailwind utilities;
// `bgHex` / `accentHex` are exposed for places that need a literal value
// (inline style, ItemList JSON-LD, etc).
//
// NOTE: lib/ is included in tailwind.config.js `content` so arbitrary-value
// classes like `bg-[#FCE7E7]` below are emitted into the bundle.
export const categories = [
  {
    slug: 'powerstones',
    title: 'パワーストーン',
    tagline: '石言葉と効果から、あなたの守り石を見つける',
    description: 'パワーストーンの種類・意味・浄化方法・組み合わせを徹底解説。恋愛・金運・仕事・健康など目的別に最適な石を提案します。',
    pillarSlug: 'how-to-choose-powerstones',
    pillarTitle: 'パワーストーンの選び方 完全ガイド',
    icon: '💎',
    color: 'from-purple-200 via-pink-100 to-amber-100',
    pastel: {
      bg: 'bg-[#FCE7E7]',
      hoverBg: 'hover:bg-[#FCE7E7]',
      accent: 'text-[#E8A4A4]',
      accentBg: 'bg-[#E8A4A4]/15',
      accentBorder: 'border-[#E8A4A4]',
      accentHover: 'hover:text-[#D88A8A]',
      bgHex: '#FCE7E7',
      accentHex: '#E8A4A4',
    },
  },
  {
    slug: 'powerspots',
    title: 'パワースポット',
    tagline: '日本全国の聖地・神社・自然の力を訪ねる',
    description: '神社仏閣・自然のパワースポットを地域別に紹介。御利益・参拝マナー・アクセス情報まで詳しく解説します。',
    pillarSlug: 'shrine-visit-basics',
    pillarTitle: '神社参拝の基本 完全ガイド',
    icon: '⛩️',
    color: 'from-emerald-200 via-teal-100 to-sky-100',
    pastel: {
      bg: 'bg-[#E7F0E3]',
      hoverBg: 'hover:bg-[#E7F0E3]',
      accent: 'text-[#8FB789]',
      accentBg: 'bg-[#8FB789]/15',
      accentBorder: 'border-[#8FB789]',
      accentHover: 'hover:text-[#769C70]',
      bgHex: '#E7F0E3',
      accentHex: '#8FB789',
    },
  },
  {
    slug: 'lucky-goods',
    title: '開運グッズ',
    tagline: '財布・お守り・縁起物で運気を引き寄せる',
    description: '財布・ブレスレット・置物・お守りなど、開運アイテムの選び方と使い方を紹介。素材・色・方角まで具体的に解説します。',
    pillarSlug: 'lucky-items-guide',
    pillarTitle: '開運グッズの選び方 完全ガイド',
    icon: '🧧',
    color: 'from-rose-200 via-orange-100 to-yellow-100',
    pastel: {
      bg: 'bg-[#FCEDDB]',
      hoverBg: 'hover:bg-[#FCEDDB]',
      accent: 'text-[#E8A876]',
      accentBg: 'bg-[#E8A876]/15',
      accentBorder: 'border-[#E8A876]',
      accentHover: 'hover:text-[#D08F5D]',
      bgHex: '#FCEDDB',
      accentHex: '#E8A876',
    },
  },
  {
    slug: 'luck-habits',
    title: '運気アップ習慣',
    tagline: '今日からできる、運を呼び込む暮らし方',
    description: '掃除・風水・朝活・言霊・食事など、毎日の習慣で運気を整える方法を紹介。科学的根拠と実践しやすさを重視しています。',
    pillarSlug: 'lucky-habits-guide',
    pillarTitle: '開運習慣 完全ガイド',
    icon: '🌅',
    color: 'from-amber-200 via-yellow-100 to-lime-100',
    pastel: {
      bg: 'bg-[#FCF4DC]',
      hoverBg: 'hover:bg-[#FCF4DC]',
      accent: 'text-[#D4B26C]',
      accentBg: 'bg-[#D4B26C]/15',
      accentBorder: 'border-[#D4B26C]',
      accentHover: 'hover:text-[#B89554]',
      bgHex: '#FCF4DC',
      accentHex: '#D4B26C',
    },
  },
  {
    // 太陽ちゃんからのお手紙。既存4カテゴリと別扱い —
    // ヘッダーナビとトップページのカテゴリ群からは隠し、
    // フッターのカテゴリ一覧 / /category/letter/ ルート / 記事一覧には現れる。
    slug: 'letter',
    title: '太陽ちゃんからのお手紙',
    tagline: '太陽ちゃんが、あなたに語りかけるエッセイ集',
    description: 'Lucky Sun Shine のマスコット「太陽ちゃん」から読者のあなたへ宛てた、毎日に光を届けるお手紙シリーズ。',
    pillarSlug: 'letter-001-welcome',
    pillarTitle: 'ようこそ Lucky Sun Shine へ — 最初のお手紙',
    icon: '💌',
    color: 'from-rose-200 via-amber-100 to-yellow-100',
    hidden: true,
    pastel: {
      bg: 'bg-[#FCE9E9]',
      hoverBg: 'hover:bg-[#FCE9E9]',
      accent: 'text-[#D88A8A]',
      accentBg: 'bg-[#D88A8A]/15',
      accentBorder: 'border-[#D88A8A]',
      accentHover: 'hover:text-[#B86A6A]',
      bgHex: '#FCE9E9',
      accentHex: '#D88A8A',
    },
  },
];

// ヘッダーナビやトップページのカテゴリグリッドなど、
// 「メインカテゴリ4種」を出したい場所で使うフィルタ済み配列。
export const mainCategories = categories.filter((c) => !c.hidden);

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}

export function categorySlugs() {
  return categories.map((c) => c.slug);
}
