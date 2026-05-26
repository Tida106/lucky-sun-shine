// セカンダリハブ → 子記事の対応表。
//
// カテゴリの「pillarSlug」(完全ガイド)はすでに app/blog/[slug]/page.jsx 側で
// 自動的に「このテーマの記事一覧」を生成しているが、それ以外の主要ハブ記事
// (誕生石ガイド・星座ガイド・干支ガイド・目的別ガイド・神社の目的/地域別ガイド)
// は同カテゴリの全記事リストだとノイズになってしまう。そこで「ハブ→子」を
// 明示的にマッピングし、ハブ記事末尾に子記事の完全リンク一覧を自動描画する。
//
// 用途:
//   1) 子記事一覧UIブロックの自動レンダリング(ハブ記事のページ下部)
//   2) 子記事ページから親ハブ記事への "back to hub" 導線(将来拡張用)
//
// 追加するときは: 親スラグをキーに、children に slug 配列(表示順)を入れる。

export const secondaryHubs = {
  'birthstone-guide': {
    title: '12ヶ月の誕生石',
    blurb: '1月から12月まで、生まれ月のパワーストーン全12記事の完全リストです。',
    children: [
      'birthstone-january',
      'birthstone-february',
      'birthstone-march',
      'birthstone-april',
      'birthstone-may',
      'birthstone-june',
      'birthstone-july',
      'birthstone-august',
      'birthstone-september',
      'birthstone-october',
      'birthstone-november',
      'birthstone-december',
    ],
  },
  'zodiac-powerstones-guide': {
    title: '12星座のパワーストーン',
    blurb: '牡羊座から魚座まで、星座別おすすめパワーストーン全12記事の完全リストです。',
    children: [
      'zodiac-aries',
      'zodiac-taurus',
      'zodiac-gemini',
      'zodiac-cancer',
      'zodiac-leo',
      'zodiac-virgo',
      'zodiac-libra',
      'zodiac-scorpio',
      'zodiac-sagittarius',
      'zodiac-capricorn',
      'zodiac-aquarius',
      'zodiac-pisces',
    ],
  },
  'eto-powerstones-guide': {
    title: '十二支のパワーストーン',
    blurb: '子年から亥年まで、十二支別おすすめパワーストーン全12記事の完全リストです。',
    children: [
      'eto-rat',
      'eto-ox',
      'eto-tiger',
      'eto-rabbit',
      'eto-dragon',
      'eto-snake',
      'eto-horse',
      'eto-sheep',
      'eto-monkey',
      'eto-rooster',
      'eto-dog',
      'eto-boar',
    ],
  },
  'luck-powerstones-complete-guide': {
    title: '目的別パワーストーン',
    blurb: '恋愛・金運・仕事・健康など、目的別おすすめパワーストーンの完全リストです。',
    children: [
      'love-luck-stones',
      'marriage-luck-stones',
      'relation-luck-stones',
      'money-luck-stones',
      'work-luck-stones',
      'career-change-luck-stones',
      'study-luck-stones',
      'health-luck-stones',
      'fertility-luck-stones',
      'protection-luck-stones',
    ],
  },
  'shrine-enmusubi-guide': {
    title: '縁結びの神社',
    blurb: '恋愛・結婚・人とのご縁にご利益があるとされる神社の完全リストです。',
    children: [
      'izumo-taisha',
      'meiji-jingu',
      'enoshima-jinja',
      'omiwa-jinja',
      'kasuga-taisha',
    ],
  },
  'shrine-gakugyo-guide': {
    title: '学業成就の神社',
    blurb: '受験・資格・学業成就にご利益があるとされる神社の完全リストです。',
    children: [
      'kasuga-taisha',
      'hieizan-enryakuji',
      'kurama-dera',
      'mitsumine-jinja',
    ],
  },
  'shrine-kinun-guide': {
    title: '金運アップの神社',
    blurb: '商売繁盛・金運・財運にご利益があるとされる神社の完全リストです。',
    children: [
      'fujisan-hongu-sengen-taisha',
      'kumano-hongu-taisha',
      'hokkaido-jingu',
      'munakata-taisha',
    ],
  },
  'shrine-kanto-guide': {
    title: '関東の神社',
    blurb: '関東エリアのパワースポット神社の完全リストです。',
    children: ['meiji-jingu', 'enoshima-jinja', 'mitsumine-jinja'],
  },
  'shrine-kansai-guide': {
    title: '関西の神社',
    blurb: '関西エリアのパワースポット神社の完全リストです。',
    children: [
      'ise-jingu-power-spot',
      'kumano-hongu-taisha',
      'kurama-dera',
      'hieizan-enryakuji',
      'kasuga-taisha',
      'tamaki-jinja',
      'omiwa-jinja',
    ],
  },
  'shrine-chubu-guide': {
    title: '中部の神社',
    blurb: '中部エリアのパワースポット神社の完全リストです。',
    children: [
      'fujisan-hongu-sengen-taisha',
      'togakushi-jinja',
      'suwa-taisha',
    ],
  },
  'shrine-kyushu-guide': {
    title: '九州・沖縄の神社',
    blurb: '九州・沖縄エリアのパワースポット神社の完全リストです。',
    children: [
      'aso-jinja',
      'kirishima-jingu',
      'takachiho-kyo',
      'yakushima',
      'munakata-taisha',
    ],
  },
};

export function getHubChildren(slug, allPosts) {
  const hub = secondaryHubs[slug];
  if (!hub) return null;
  const bySlug = Object.fromEntries(allPosts.map((p) => [p.slug, p]));
  // children の並び順を維持しつつ、存在しないスラッグは静かに除外する
  // (ハブ定義の typo を本番で全件 404 化させないため)。
  const posts = hub.children.map((s) => bySlug[s]).filter(Boolean);
  if (posts.length === 0) return null;
  return { ...hub, posts };
}
