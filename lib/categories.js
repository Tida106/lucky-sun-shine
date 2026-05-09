// Single source of truth for site categories.
// Slugs are stable URL identifiers — do not rename without redirects.
export const categories = [
  {
    slug: 'powerstones',
    title: 'パワーストーン',
    tagline: '石言葉と効果から、あなたの守り石を見つける',
    description: 'パワーストーンの種類・意味・浄化方法・組み合わせを徹底解説。恋愛・金運・仕事・健康など目的別に最適な石を提案します。',
    icon: '💎',
    color: 'from-purple-200 via-pink-100 to-amber-100',
  },
  {
    slug: 'powerspots',
    title: 'パワースポット',
    tagline: '日本全国の聖地・神社・自然の力を訪ねる',
    description: '神社仏閣・自然のパワースポットを地域別に紹介。御利益・参拝マナー・アクセス情報まで詳しく解説します。',
    icon: '⛩️',
    color: 'from-emerald-200 via-teal-100 to-sky-100',
  },
  {
    slug: 'lucky-goods',
    title: '開運グッズ',
    tagline: '財布・お守り・縁起物で運気を引き寄せる',
    description: '財布・ブレスレット・置物・お守りなど、開運アイテムの選び方と使い方を紹介。素材・色・方角まで具体的に解説します。',
    icon: '🧧',
    color: 'from-rose-200 via-orange-100 to-yellow-100',
  },
  {
    slug: 'luck-habits',
    title: '運気アップ習慣',
    tagline: '今日からできる、運を呼び込む暮らし方',
    description: '掃除・風水・朝活・言霊・食事など、毎日の習慣で運気を整える方法を紹介。科学的根拠と実践しやすさを重視しています。',
    icon: '🌅',
    color: 'from-amber-200 via-yellow-100 to-lime-100',
  },
];

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}

export function categorySlugs() {
  return categories.map((c) => c.slug);
}
