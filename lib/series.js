// サイドバーの「ハブから探す」セクション用、ハブ+子記事のシリーズ定義。
//
// 各シリーズは { id, label, hubSlug?, hubLabel?, items: [{slug, label}] } の形。
// - hubSlug: シリーズの総合ガイド(ピラー記事)。あれば「総合ガイドを見る」リンクで先頭に表示。
// - items: シリーズの子記事一覧。slug は frontmatter の slug と一致させる。
//
// データはハードコーディング。lib/posts.js でフィルタしても良いが、
// (a) 並び順(月・干支・星座)を明示的に保ちたい
// (b) ラベル(「牡羊座」など)を slug から再構築するのは面倒
// この2つの理由で宣言的に持つ方が読みやすい。記事を追加した時はここに足す。

export const series = [
  {
    id: 'zodiac',
    label: '12星座別パワーストーン',
    accent: 'rose',
    hubSlug: 'zodiac-powerstones-guide',
    hubLabel: '12星座別の総合ガイド',
    items: [
      { slug: 'zodiac-aries',       label: '牡羊座（3/21–4/19）' },
      { slug: 'zodiac-taurus',      label: '牡牛座（4/20–5/20）' },
      { slug: 'zodiac-gemini',      label: '双子座（5/21–6/21）' },
      { slug: 'zodiac-cancer',      label: '蟹座（6/22–7/22）' },
      { slug: 'zodiac-leo',         label: '獅子座（7/23–8/22）' },
      { slug: 'zodiac-virgo',       label: '乙女座（8/23–9/22）' },
      { slug: 'zodiac-libra',       label: '天秤座（9/23–10/23）' },
      { slug: 'zodiac-scorpio',     label: '蠍座（10/24–11/22）' },
      { slug: 'zodiac-sagittarius', label: '射手座（11/23–12/21）' },
      { slug: 'zodiac-capricorn',   label: '山羊座（12/22–1/19）' },
      { slug: 'zodiac-aquarius',    label: '水瓶座（1/20–2/18）' },
      { slug: 'zodiac-pisces',      label: '魚座（2/19–3/20）' },
    ],
  },
  {
    id: 'birthstone',
    label: '12ヶ月の誕生石',
    accent: 'amber',
    hubSlug: 'birthstone-guide',
    hubLabel: '12ヶ月の誕生石 総合ガイド',
    items: [
      { slug: 'birthstone-january',   label: '1月の誕生石（ガーネット）' },
      { slug: 'birthstone-february',  label: '2月の誕生石（アメジスト）' },
      { slug: 'birthstone-march',     label: '3月の誕生石（アクアマリン）' },
      { slug: 'birthstone-april',     label: '4月の誕生石（ダイヤモンド）' },
      { slug: 'birthstone-may',       label: '5月の誕生石（エメラルド）' },
      { slug: 'birthstone-june',      label: '6月の誕生石（パール／ムーンストーン）' },
      { slug: 'birthstone-july',      label: '7月の誕生石（ルビー）' },
      { slug: 'birthstone-august',    label: '8月の誕生石（ペリドット）' },
      { slug: 'birthstone-september', label: '9月の誕生石（サファイア）' },
      { slug: 'birthstone-october',   label: '10月の誕生石（オパール／トルマリン）' },
      { slug: 'birthstone-november',  label: '11月の誕生石（トパーズ／シトリン）' },
      { slug: 'birthstone-december',  label: '12月の誕生石（ターコイズ／ラピスラズリ）' },
    ],
  },
  {
    id: 'eto',
    label: '干支別パワーストーン',
    accent: 'amber',
    hubSlug: 'eto-powerstones-guide',
    hubLabel: '干支別の総合ガイド',
    items: [
      { slug: 'eto-rat',     label: '子（ねずみ）年生まれ' },
      { slug: 'eto-ox',      label: '丑（うし）年生まれ' },
      { slug: 'eto-tiger',   label: '寅（とら）年生まれ' },
      { slug: 'eto-rabbit',  label: '卯（うさぎ）年生まれ' },
      { slug: 'eto-dragon',  label: '辰（たつ）年生まれ' },
      { slug: 'eto-snake',   label: '巳（へび）年生まれ' },
      { slug: 'eto-horse',   label: '午（うま）年生まれ' },
      { slug: 'eto-sheep',   label: '未（ひつじ）年生まれ' },
      { slug: 'eto-monkey',  label: '申（さる）年生まれ' },
      { slug: 'eto-rooster', label: '酉（とり）年生まれ' },
      { slug: 'eto-dog',     label: '戌（いぬ）年生まれ' },
      { slug: 'eto-boar',    label: '亥（いのしし）年生まれ' },
    ],
  },
  {
    id: 'luck-types',
    label: '運気・願い別パワーストーン',
    accent: 'rose',
    hubSlug: 'luck-powerstones-complete-guide',
    hubLabel: '運気・願い別の総合ガイド',
    items: [
      { slug: 'love-luck-stones',          label: '恋愛運' },
      { slug: 'marriage-luck-stones',      label: '結婚運' },
      { slug: 'money-luck-stones',         label: '金運' },
      { slug: 'work-luck-stones',          label: '仕事運' },
      { slug: 'career-change-luck-stones', label: '転職運' },
      { slug: 'study-luck-stones',         label: '学業運' },
      { slug: 'health-luck-stones',        label: '健康運' },
      { slug: 'fertility-luck-stones',     label: '子宝運' },
      { slug: 'relation-luck-stones',      label: '人間関係運' },
      { slug: 'protection-luck-stones',    label: '厄除け・お守り' },
    ],
  },
  {
    id: 'fengshui',
    label: '風水で置き場所別',
    accent: 'amber',
    hubSlug: 'fengshui-powerstone-basics',
    hubLabel: '風水×パワーストーンの基本',
    items: [
      { slug: 'fengshui-entrance-stones',  label: '玄関の石' },
      { slug: 'fengshui-bedroom-stones',   label: '寝室の石' },
      { slug: 'fengshui-desk-stones',      label: 'デスクの石' },
      { slug: 'fengshui-direction-stones', label: '方位別の石' },
    ],
  },
  {
    id: 'lucky-goods',
    label: '開運グッズ',
    accent: 'orange',
    hubSlug: 'lucky-items-guide',
    hubLabel: '開運グッズの選び方 完全ガイド',
    items: [
      { slug: 'maneki-neko',        label: '招き猫' },
      { slug: 'daruma-guide',       label: 'だるま' },
      { slug: 'omamori-guide',      label: 'お守り' },
      { slug: 'shichifukujin',      label: '七福神' },
      { slug: 'kumade-guide',       label: '熊手' },
      { slug: 'engimono-disposal',  label: '縁起物の処分方法' },
    ],
  },
  {
    id: 'shrine-benefit',
    label: '神社をご利益で探す',
    accent: 'emerald',
    items: [
      { slug: 'shrine-enmusubi-guide', label: '縁結び・恋愛運の神社まとめ' },
      { slug: 'shrine-gakugyo-guide',  label: '学業成就の神社まとめ' },
      { slug: 'shrine-kinun-guide',    label: '金運の神社まとめ' },
    ],
  },
  {
    id: 'shrine-region',
    label: '神社を地域で探す',
    accent: 'emerald',
    items: [
      { slug: 'shrine-kanto-guide',  label: '関東地方の神社まとめ' },
      { slug: 'shrine-chubu-guide',  label: '中部地方の神社まとめ' },
      { slug: 'shrine-kansai-guide', label: '関西地方の神社まとめ' },
      { slug: 'shrine-kyushu-guide', label: '九州地方の神社まとめ' },
    ],
  },
];

// `accent` を Tailwind の class 文字列に解決するヘルパ。
// 共通の見た目に揃えるため、ラベル左の縁取り色＋ホバー時の文字色を返す。
// Tailwind は class 文字列を静的に検出する必要があるため、必ずベタ書きで返す。
export function accentClasses(accent) {
  switch (accent) {
    case 'rose':
      return {
        bar: 'border-l-rose-300',
        chip: 'bg-rose-50 text-rose-800 border border-rose-200',
        hover: 'hover:bg-rose-50 hover:text-rose-800',
      };
    case 'emerald':
      return {
        bar: 'border-l-emerald-300',
        chip: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
        hover: 'hover:bg-emerald-50 hover:text-emerald-800',
      };
    case 'orange':
      return {
        bar: 'border-l-orange-300',
        chip: 'bg-orange-50 text-orange-800 border border-orange-200',
        hover: 'hover:bg-orange-50 hover:text-orange-800',
      };
    case 'amber':
    default:
      return {
        bar: 'border-l-amber-300',
        chip: 'bg-amber-50 text-amber-800 border border-amber-200',
        hover: 'hover:bg-amber-50 hover:text-amber-800',
      };
  }
}
