// タグ収集の単一ソース。
// app/tag/[slug] の generateStaticParams と scripts/generate-sitemap.js の
// 両方がこのモジュールを使うことで、「sitemap に載っているのに
// ページが生成されない(=404)」という不一致を構造的に防ぐ。
// CommonJS なのは prebuild スクリプト(require)と Next.js(import interop)の
// 双方から読み込めるようにするため。
const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

// Unicode 正規化(NFC)+ trim。NFD(濁点分解形)で書かれたタグが
// 別ディレクトリ/別URLに分裂するのを防ぐ。
function normalizeTag(tag) {
  return String(tag).normalize('NFC').trim();
}

function normalizeTags(tags) {
  if (!Array.isArray(tags)) return [];
  const out = [];
  const seen = new Set();
  for (const t of tags) {
    const n = normalizeTag(t);
    if (!n || seen.has(n)) continue;
    seen.add(n);
    out.push(n);
  }
  return out;
}

// 公開記事(draft でない)の全タグをソート済みで返す。
// 記事1件だけのタグも除外しない(ページ生成と sitemap は常に全件一致させる)。
function collectPublishedTags() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const set = new Set();
  for (const f of fs.readdirSync(POSTS_DIR)) {
    if (!/\.mdx?$/.test(f)) continue;
    const { data } = matter(fs.readFileSync(path.join(POSTS_DIR, f), 'utf8'));
    if (data.draft) continue;
    for (const t of normalizeTags(data.tags)) set.add(t);
  }
  return [...set].sort();
}

module.exports = { normalizeTag, normalizeTags, collectPublishedTags };
