// 九星気学・本命星の計算ロジック。
//
// 本命星の算出方法（標準的な数え方）:
//   1. 立春（簡易的に2月4日）を年の区切りとし、1月〜2月3日生まれは前年扱いにする。
//   2. 生年の各桁を足して1桁になるまで繰り返す（デジットルート）。
//      これは ((year - 1) % 9) + 1 の計算で同じ値が得られる。
//   3. 11から2.の数を引き、9を超えたら9を引く。これが本命星の番号(1〜9)。
//
// 下記の式は以下の6パターンで全一致を確認済み（検証用テストは
// scripts/test-kyusei.js 参照）:
//   1990年 → 一白水星 / 1999年 → 一白水星 / 2000年 → 九紫火星
//   2024年 → 三碧木星 / 2025年 → 二黒土星 / 2026年 → 一白水星
//   1月生まれ・2月3日生まれは前年の星になる

export function digitRootOfYear(year) {
  return ((year - 1) % 9) + 1;
}

function starNumberFromYear(year) {
  const s = digitRootOfYear(year);
  let n = 11 - s;
  if (n > 9) n -= 9;
  return n;
}

// 立春の簡易区分: 1月・2月3日以前生まれは前年の星になる
// （実際の立春は年により2月3日〜5日で前後するため、あくまで簡易判定）
export function effectiveKyuseiYear(year, month, day) {
  if (month === 1 || (month === 2 && day <= 3)) return year - 1;
  return year;
}

export function honmeiseiNumber(year, month, day) {
  const effectiveYear = effectiveKyuseiYear(year, month, day);
  return starNumberFromYear(effectiveYear);
}

// 9つの本命星の基本データ。
// element: 五行(木・火・土・金・水) / colorLabel: 本命星の名前に含まれる色
// personality: サイト独自に執筆した性格・特徴（書籍・他サイトからの転載なし）
// stones: 五行・色に合わせて選んだ、サイト内に実在する記事のみを掲載
// compatibleNumbers: 相生・比和の関係にある本命星（五行の生成関係 + 同じ五行）
export const STARS = {
  1: {
    number: 1,
    name: '一白水星',
    reading: 'いっぱくすいせい',
    element: '水',
    colorLabel: '白（清らかな白）',
    personality:
      '柔軟で適応力があり、どんな環境にも静かに馴染んでいくタイプ。表面は物静かでも、内側には深い思考力と粘り強さを持っています。人の話をよく聞き、相手の気持ちを汲み取るのが得意で、信頼されやすい存在。変化の多い状況でも、水のようにしなやかに流れを読んで立ち回れる人です。',
    stones: [
      { slug: 'clear-quartz', title: '水晶（クリスタル）' },
      { slug: 'aquamarine', title: 'アクアマリン' },
      { slug: 'moonstone', title: 'ムーンストーン' },
    ],
    compatibleNumbers: [3, 4, 6, 7],
  },
  2: {
    number: 2,
    name: '二黒土星',
    reading: 'じこくどせい',
    element: '土',
    colorLabel: '黒（どっしりとした黒）',
    personality:
      '真面目でこつこつと物事に取り組む、裏方として力を発揮するタイプ。派手さはなくても、誰かのために黒子役に回ることを厭わない包容力があります。地道な積み重ねを大切にし、周りからの信頼をじっくり築いていくタイプ。サポート役に回ったときほど、本来の実力を発揮しやすい人です。',
    stones: [
      { slug: 'obsidian', title: 'オブシディアン（黒曜石）' },
      { slug: 'onyx', title: 'オニキス' },
      { slug: 'morion', title: 'モリオン（黒水晶）' },
    ],
    compatibleNumbers: [5, 6, 7, 8, 9],
  },
  3: {
    number: 3,
    name: '三碧木星',
    reading: 'さんぺきもくせい',
    element: '木',
    colorLabel: '碧（若葉のような青緑）',
    personality:
      '好奇心旺盛でフレッシュな発想力を持つ、行動派タイプ。新しいことへのアンテナが高く、思いついたらすぐ動く軽やかさが魅力です。会話も得意で、周囲に話題や刺激を届ける存在になりやすいタイプ。興味が次々移りやすい面もありますが、それも新しい風を運んでくる才能のひとつです。',
    stones: [
      { slug: 'aventurine', title: 'アベンチュリン' },
      { slug: 'malachite', title: 'マラカイト（孔雀石）' },
      { slug: 'jade', title: 'ヒスイ（翡翠）' },
    ],
    compatibleNumbers: [1, 4, 9],
  },
  4: {
    number: 4,
    name: '四緑木星',
    reading: 'しろくもくせい',
    element: '木',
    colorLabel: '緑（爽やかな緑）',
    personality:
      '誰とでも自然に打ち解けられる、調和を大事にするタイプ。人と人をつなぐ役割を自然と担うことが多く、周囲からは「話しやすい人」として親しまれます。柔らかな雰囲気で場の空気を和らげる力があり、信頼や縁を広げながら物事を進めていくのが得意な人です。',
    stones: [
      { slug: 'amazonite', title: 'アマゾナイト' },
      { slug: 'chrysoprase', title: 'クリソプレーズ' },
      { slug: 'prehnite', title: 'プレナイト' },
    ],
    compatibleNumbers: [1, 3, 9],
  },
  5: {
    number: 5,
    name: '五黄土星',
    reading: 'ごおうどせい',
    element: '土',
    colorLabel: '黄（大地を思わせる黄色）',
    personality:
      'スケールの大きな目標に向かって粘り強く進める、エネルギッシュなタイプ。良くも悪くも周囲への影響力が大きく、リーダー的な立場を任されることも多いタイプです。多少の波はあっても、最終的には自分なりのやり方で結果を出す力強さを持っている人です。',
    stones: [
      { slug: 'citrine', title: 'シトリン（黄水晶）' },
      { slug: 'pyrite', title: 'パイライト（黄鉄鉱）' },
      { slug: 'tigers-eye', title: 'タイガーアイ' },
    ],
    compatibleNumbers: [2, 6, 7, 8, 9],
  },
  6: {
    number: 6,
    name: '六白金星',
    reading: 'ろっぱくきんせい',
    element: '金',
    colorLabel: '白（気品のある白）',
    personality:
      '筋を通すことを大切にする、誠実で向上心のあるタイプ。目標を定めたらまっすぐに取り組み、努力を積み重ねて結果を出す力があります。プライドの高さゆえに完璧主義になりやすい面もありますが、それが成長のエンジンにもなっているタイプ。信頼されるリーダーとして評価されやすい人です。',
    stones: [
      { slug: 'opal', title: 'オパール' },
      { slug: 'hematite', title: 'ヘマタイト（赤鉄鉱）' },
      { slug: 'labradorite', title: 'ラブラドライト' },
    ],
    compatibleNumbers: [1, 2, 5, 7, 8],
  },
  7: {
    number: 7,
    name: '七赤金星',
    reading: 'しちせききんせい',
    element: '金',
    colorLabel: '赤（華やかな赤）',
    personality:
      '社交的で華やかな雰囲気を持つ、人を惹きつけるタイプ。会話のセンスがあり、場を楽しい空気で満たすのが得意です。楽観的で人脈作りが得意な面もあるタイプ。気分の波はありますが、それも人間らしい魅力として周囲に愛される人です。',
    stones: [
      { slug: 'carnelian', title: 'カーネリアン' },
      { slug: 'garnet', title: 'ガーネット（ザクロ石）' },
      { slug: 'ruby', title: 'ルビー' },
    ],
    compatibleNumbers: [1, 2, 5, 6, 8],
  },
  8: {
    number: 8,
    name: '八白土星',
    reading: 'はっぱくどせい',
    element: '土',
    colorLabel: '白（あたたかみのある白）',
    personality:
      '一つのことをじっくり積み上げて、大きな結果につなげていくタイプ。継続力と粘り強さがあり、「ここまで来たらやめられない」という頑固な一面も持っています。変化やターニングポイントに強いとも言われ、一度決めたら着実に状況を好転させていく力がある人です。',
    stones: [
      { slug: 'pearl', title: 'パール（真珠）' },
      { slug: 'agate', title: 'アゲート（瑪瑙）' },
      { slug: 'smoky-quartz', title: 'スモーキークォーツ（煙水晶）' },
    ],
    compatibleNumbers: [2, 5, 6, 7, 9],
  },
  9: {
    number: 9,
    name: '九紫火星',
    reading: 'きゅうしかせい',
    element: '火',
    colorLabel: '紫（高貴な紫）',
    personality:
      '感性が豊かで、人目を引く個性と華やかさを持つタイプ。直感力が鋭く、アイデアや表現力で周囲を惹きつけます。気分に波があり、情熱的な面と冷静な面が混在しますが、その振れ幅こそが魅力のひとつ。人前に立つ場面や、注目される役割で本来の輝きを発揮しやすい人です。',
    stones: [
      { slug: 'amethyst', title: 'アメジスト（紫水晶）' },
      { slug: 'charoite', title: 'チャロアイト' },
      { slug: 'sugilite', title: 'スギライト' },
    ],
    compatibleNumbers: [2, 3, 4, 5, 8],
  },
};

export function getStar(number) {
  return STARS[number] || null;
}

export function compatibleStars(number) {
  const star = STARS[number];
  if (!star) return [];
  return star.compatibleNumbers.map((n) => STARS[n]);
}

// ──────────────────────────────────────────────
// 吉方位（年盤による簡易計算）
// ──────────────────────────────────────────────
//
// 後天定位盤（洛書）を基準とし、その年の中央の星の数だけ全体をずらして
// 年盤を作る、九星気学で標準的に使われる方法。
//   基準盤（中央=五黄のとき）: 北=1, 北東=8, 東=3, 南東=4, 南=9,
//                               南西=2, 西=7, 北西=6, 中央=5
//   年盤 = 基準盤の値を (中央の星 - 5) だけ右回りに シフトしたもの
//
// 除外する方位:
//   ・五黄殺   : その年の年盤で五黄土星が入っている方位
//   ・暗剣殺   : 五黄殺の正反対の方位
//   ・歳破     : その年の十二支の正反対の方位
//                （子・卯・午・酉の正四方位の年のみ簡易対応。
//                  間の干支の年は今回のツールでは対象外）
//   ・本命殺   : その年の年盤で、自分の本命星が入っている方位
//   ・本命的殺 : 本命殺の正反対の方位
// これらを除いた方位のうち、自分の本命星と相生・比和の関係にある星が
// 入っている方位を「吉方位」とする。
const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

const DIRECTION_LABEL = {
  N: '北',
  NE: '北東',
  E: '東',
  SE: '南東',
  S: '南',
  SW: '南西',
  W: '西',
  NW: '北西',
};

const OPPOSITE = { N: 'S', S: 'N', E: 'W', W: 'E', NE: 'SW', SW: 'NE', SE: 'NW', NW: 'SE' };

// 中央=五黄(5)のときの後天定位盤（洛書）
const BASE_LUOSHU = { N: 1, NE: 8, E: 3, SE: 4, S: 9, SW: 2, W: 7, NW: 6 };

export function yearCenterStar(year) {
  return starNumberFromYear(year);
}

export function yearChart(year) {
  const center = yearCenterStar(year);
  const shift = (((center - 5) % 9) + 9) % 9;
  const chart = { center };
  for (const dir of DIRECTIONS) {
    const base = BASE_LUOSHU[dir];
    chart[dir] = ((base - 1 + shift) % 9) + 1;
  }
  return chart;
}

const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
// 正四方位（子・卯・午・酉）の年のみ、歳破の方位を簡易的に算出する
const CARDINAL_BRANCH_DIR = { 子: 'N', 卯: 'E', 午: 'S', 酉: 'W' };

function zodiacBranch(year) {
  const idx = (((year - 2020) % 12) + 12) % 12; // 2020年 = 子（ねずみ年）
  return BRANCHES[idx];
}

function saihaDirection(year) {
  const branch = zodiacBranch(year);
  const dir = CARDINAL_BRANCH_DIR[branch];
  if (!dir) return null;
  return OPPOSITE[dir];
}

// 本命星number(1〜9) と 対象年 から、その年の吉方位（8方位のキー配列）を返す。
export function favorableDirections(starNumber, year) {
  const chart = yearChart(year);
  const posByValue = {};
  for (const dir of DIRECTIONS) posByValue[chart[dir]] = dir;

  const excluded = new Set();

  // 五黄殺・暗剣殺
  const gohokuDir = posByValue[5];
  if (gohokuDir) {
    excluded.add(gohokuDir);
    excluded.add(OPPOSITE[gohokuDir]);
  }

  // 歳破（正四方位の年のみ）
  const saiha = saihaDirection(year);
  if (saiha) excluded.add(saiha);

  // 本命殺・本命的殺（自分の星が年盤の中央に入っている年は対象外）
  const ownDir = posByValue[starNumber];
  if (ownDir) {
    excluded.add(ownDir);
    excluded.add(OPPOSITE[ownDir]);
  }

  const compatible = new Set(STARS[starNumber]?.compatibleNumbers || []);
  return DIRECTIONS.filter((d) => !excluded.has(d) && compatible.has(chart[d])).map((d) => ({
    key: d,
    label: DIRECTION_LABEL[d],
  }));
}

// クライアント・サーバー両方から呼べる、診断結果の一括取得。
export function getKyuseiResult(year, month, day) {
  const number = honmeiseiNumber(year, month, day);
  const star = STARS[number];
  const effectiveYear = effectiveKyuseiYear(year, month, day);
  return {
    number,
    star,
    effectiveYear,
    compatible: compatibleStars(number),
  };
}

export { DIRECTIONS, DIRECTION_LABEL };
