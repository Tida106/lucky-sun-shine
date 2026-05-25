import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function readPostFiles() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
}

let _cache = null;

export function getAllPosts() {
  if (_cache) return _cache;

  const posts = readPostFiles().map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    const slug = data.slug || file.replace(/\.(md|mdx)$/, '');
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      // `updated` is optional — if absent, treat as never-updated and
      // omit the second timestamp on the article page.
      updated: data.updated ? new Date(data.updated).toISOString() : null,
      category: data.category || 'powerstones',
      tags: Array.isArray(data.tags) ? data.tags : [],
      cover: data.cover || null,
      // `author` defaults to the site author from lib/site.js when
      // not explicitly set in frontmatter (which is the common case).
      author: data.author || null,
      // 任意のFAQ。記事側で frontmatter `faq: [{q, a}, ...]` を指定したとき
      // のみ採用され、未指定なら lib/faq.js のカテゴリ別デフォルトが使われる。
      faq: Array.isArray(data.faq) ? data.faq : null,
      draft: Boolean(data.draft),
      content,
    };
  });

  _cache = posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return _cache;
}

export function getPostBySlug(slug) {
  return getAllPosts().find((p) => p.slug === slug) || null;
}

export function getPostsByCategory(categorySlug) {
  return getAllPosts().filter((p) => p.category === categorySlug);
}

export function getPostsByTag(tag) {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function allTags() {
  const set = new Set();
  for (const p of getAllPosts()) p.tags.forEach((t) => set.add(t));
  return [...set].sort();
}

export async function renderMarkdown(md) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(md);
  return String(file);
}

export function readingTimeMinutes(markdown) {
  const chars = (markdown || '').length;
  // Japanese rough estimate: ~500 chars/min
  return Math.max(1, Math.round(chars / 500));
}

// 追従TOC用に、レンダリング済み HTML から h2/h3 を {level, id, label} で抽出する。
// rehype-slug が H2/H3 に自動付与した id を採用するので、TOC リンクと
// 本文アンカーが必ず一致する(自前のスラグ化を再実装する必要がない)。
// 抽出後、ラベルが「目次」(本文中の手書きTOC見出し)のものは除外する。
export function extractHeadings(html) {
  if (!html) return [];
  const out = [];
  const re = /<h([23])\b([^>]*?)>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const level = Number(m[1]);
    const attrs = m[2] || '';
    const inner = m[3] || '';
    const idMatch = attrs.match(/\bid="([^"]+)"/);
    if (!idMatch) continue;
    // 内側のタグ(<span id="..."></span>等)を剥がしてプレーンテキスト化。
    const label = inner.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!label) continue;
    if (label === '目次') continue;
    out.push({ level, id: idMatch[1], label });
  }
  return out;
}
