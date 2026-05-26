// 「あわせて読みたい」記事ランキングの中央ロジック。
//
// スコアリング:
//   同カテゴリ          +10
//   共有タグ 1件        +3
//   ブースト対象スラグ  +5  (インデックス未登録対策で重点的に露出させたい記事)
//   編集部おすすめ      +2  (lib/featured.js のキュレーション)
//   日付近接            +1  (同月に公開された記事は文脈が近いことが多い)
//
// 並びは スコア降順 → 日付降順。スコア同点の場合は新しい記事を優先する。
// 結果が `limit` に満たない場合は、編集部おすすめ → 同カテゴリ → 全記事の順に
// 補完して必ず `limit` 件返す(関連が薄い記事でもカードを並べるよりは、
// 「読まれている記事」を見せた方が回遊率が高いため)。

import { featuredSlugs } from './featured';

// インデックス未登録対策で関連リストでの露出を強化したい記事スラグ。
// 同カテゴリの他記事より優先して「あわせて読みたい」に出てくる。
// このリストはサイト全体の internal-link ブースト戦略の中心となるので、
// 追加/削除する際は SEO 影響を意識すること。
export const boostedSlugs = new Set([
  'moonstone',
  'pyrite',
  'apatite',
  'sunstone',
  'rhodonite',
  'seraphinite',
  'omiwa-jinja',
  'moon-phases-and-stones',
  'how-to-wear-powerstones',
]);

const featuredSet = new Set(featuredSlugs);

function monthKey(iso) {
  // 日付文字列の先頭7文字(YYYY-MM)で同月かを比較する。
  // 同月公開記事は同じ企画やキャンペーン文脈で並んでいることが多く、
  // 文脈の近さ ≒ 読者の関心の近さと仮定して微加点する。
  return (iso || '').slice(0, 7);
}

export function getRelatedPosts(post, allPosts, { limit = 4 } = {}) {
  if (!post || !Array.isArray(allPosts)) return [];

  const candidates = allPosts.filter((p) => p.slug !== post.slug);
  const myTags = new Set((post.tags || []).map((t) => t.toLowerCase()));
  const myMonth = monthKey(post.date);

  const scored = candidates.map((p) => {
    let score = 0;
    if (p.category === post.category) score += 10;
    const shared = (p.tags || []).reduce(
      (n, t) => (myTags.has(t.toLowerCase()) ? n + 1 : n),
      0,
    );
    score += shared * 3;
    if (boostedSlugs.has(p.slug)) score += 5;
    if (featuredSet.has(p.slug)) score += 2;
    if (monthKey(p.date) === myMonth) score += 1;
    return { post: p, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.post.date < b.post.date ? 1 : -1;
  });

  const picked = [];
  const seen = new Set();
  for (const { post: p, score } of scored) {
    if (score <= 0) break;
    if (seen.has(p.slug)) continue;
    picked.push(p);
    seen.add(p.slug);
    if (picked.length >= limit) break;
  }

  if (picked.length < limit) {
    // フォールバック1: 編集部おすすめ
    for (const slug of featuredSlugs) {
      if (picked.length >= limit) break;
      if (slug === post.slug || seen.has(slug)) continue;
      const found = candidates.find((p) => p.slug === slug);
      if (found) {
        picked.push(found);
        seen.add(found.slug);
      }
    }
  }

  if (picked.length < limit) {
    // フォールバック2: 同カテゴリの新着
    for (const p of candidates.filter((c) => c.category === post.category)) {
      if (picked.length >= limit) break;
      if (seen.has(p.slug)) continue;
      picked.push(p);
      seen.add(p.slug);
    }
  }

  if (picked.length < limit) {
    // フォールバック3: サイト全体の新着
    for (const p of candidates) {
      if (picked.length >= limit) break;
      if (seen.has(p.slug)) continue;
      picked.push(p);
      seen.add(p.slug);
    }
  }

  return picked.slice(0, limit);
}
