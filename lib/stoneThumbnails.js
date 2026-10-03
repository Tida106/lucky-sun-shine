// Slug -> canonical Japanese stone name, used to query ja.wikipedia.org for a
// thumbnail photo. Extracted from the verified 365-day birthstone table data
// (components/BirthdayTable.jsx) so every slug actually linked from the
// /blog/birthday-stone-365/ table resolves to the correct stone.
export const STONE_SLUG_TO_JA = {
  garnet: 'ガーネット',
  'rose-quartz-meaning': 'ローズクォーツ',
  amethyst: 'アメジスト',
  moonstone: 'ムーンストーン',
  ruby: 'ルビー',
  'smoky-quartz': 'スモーキークォーツ',
  'lapis-lazuli': 'ラピスラズリ',
  aquamarine: 'アクアマリン',
  'blue-topaz': 'ブルートパーズ',
  sapphire: 'サファイア',
  iolite: 'アイオライト',
  hematite: 'ヘマタイト',
  turquoise: 'ターコイズ',
  carnelian: 'カーネリアン',
  peridot: 'ペリドット',
  citrine: 'シトリン',
  onyx: 'オニキス',
  diamond: 'ダイヤモンド',
  aventurine: 'アベンチュリン',
  chrysoprase: 'クリソプレーズ',
  'tigers-eye': 'タイガーアイ',
  pearl: 'パール',
  emerald: 'エメラルド',
  coral: 'コーラル（珊瑚）',
  bloodstone: 'ブラッドストーン',
  rhodonite: 'ロードナイト',
  fluorite: 'フローライト',
  malachite: 'マラカイト',
  alexandrite: 'アレキサンドライト',
  opal: 'オパール',
  tourmaline: 'トルマリン',
  topaz: 'トパーズ',
  tanzanite: 'タンザナイト',
};

// Wikipedia's article title sometimes differs from the common Japanese stone
// name (mirrors components/GemstoneOrb.jsx so both features query the same
// canonical titles and share cache hits for overlapping stones).
const WIKI_NAME_MAP = {
  'ローズクォーツ': '紅水晶',
  'スモーキークォーツ': '煙水晶',
  'タイガーアイ': '虎目石',
  'コーラル（珊瑚）': 'サンゴ',
  'ブラッドストーン': '血玉髄',
  'アイオライト': '菫青石',
  'アメジスト': 'アメシスト',
  'ヘマタイト': '赤鉄鉱',
  'クリソプレーズ': '緑玉髄',
  'ロードナイト': 'ばら輝石',
  'フローライト': '蛍石',
  'マラカイト': '孔雀石',
  'ブルートパーズ': 'トパーズ',
  'ムーンストーン': '月長石',
  'パール': '真珠',
  'ターコイズ': 'トルコ石',
  'カーネリアン': '紅玉髄',
  'アベンチュリン': '砂金石',
  'シトリン': '黄水晶',
};

// Module-level cache keyed by Japanese stone name, shared by every row that
// requests the same stone so a 365-row table issues at most ~33 requests
// (one per distinct stone) instead of one per row.
const cache = new Map();
const pending = new Map();

function fetchStoneImage(stoneNameJa) {
  if (cache.has(stoneNameJa)) return Promise.resolve(cache.get(stoneNameJa));
  if (pending.has(stoneNameJa)) return pending.get(stoneNameJa);

  const queryName = WIKI_NAME_MAP[stoneNameJa] || stoneNameJa;
  const url = `https://ja.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(queryName)}&redirects=1&prop=pageimages&format=json&pithumbsize=200&origin=*`;

  const promise = fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const pages = data?.query?.pages;
      const pageId = pages ? Object.keys(pages)[0] : null;
      const img = pageId ? pages[pageId]?.thumbnail?.source || null : null;
      cache.set(stoneNameJa, img);
      return img;
    })
    .catch(() => {
      cache.set(stoneNameJa, null);
      return null;
    })
    .finally(() => {
      pending.delete(stoneNameJa);
    });

  pending.set(stoneNameJa, promise);
  return promise;
}

// Resolve a birthstone article slug (e.g. "garnet") to its thumbnail image
// URL, or null if the slug isn't a known stone or Wikipedia has no image.
export function getStoneThumbnailBySlug(slug) {
  const ja = STONE_SLUG_TO_JA[slug];
  if (!ja) return Promise.resolve(null);
  return fetchStoneImage(ja);
}
