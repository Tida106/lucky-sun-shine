import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { normalizeTags, collectPublishedTags } from './tags';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function readPostFiles() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
}

const _cache = {};

// locale: 'ja'(デフォルト) or 'en'
// 'en' は "xxx.en.md" のファイルだけを対象にし、slugは ".en" を除いた
// 元のslugと同じ値にする(JP/EN切り替えで同じslugを共有するため)。
export function getAllPosts(locale = 'ja') {
  if (_cache[locale]) return _cache[locale];

  const isEn = locale === 'en';
  const files = readPostFiles().filter((f) =>
    isEn ? /\.en\.(md|mdx)$/.test(f) : !/\.en\.(md|mdx)$/.test(f)
  );

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    const baseName = file.replace(/\.(md|mdx)$/, '').replace(/\.en$/, '');
    let slug = data.slug || baseName;
    if (isEn) {
      for (const ext of ['.md', '.mdx']) {
        const jaPath = path.join(POSTS_DIR, baseName + ext);
        if (fs.existsSync(jaPath)) {
          const jaData = matter(fs.readFileSync(jaPath, 'utf8')).data;
          slug = jaData.slug || baseName;
          break;
        }
      }
    }
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      updated: data.updated ? new Date(data.updated).toISOString() : null,
      category: data.category || 'powerstones',
      tags: normalizeTags(data.tags),
      cover: data.cover || null,
      author: data.author || null,
      faq: Array.isArray(data.faq) ? data.faq : null,
      draft: Boolean(data.draft),
      content,
    };
  });

  _cache[locale] = posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return _cache[locale];
}

export function getPostBySlug(slug, locale = 'ja') {
  return getAllPosts(locale).find((p) => p.slug === slug) || null;
}

export function getPostsByCategory(categorySlug, locale = 'ja') {
  return getAllPosts(locale).filter((p) => p.category === categorySlug);
}

export function getPostsByTag(tag, locale = 'ja') {
  return getAllPosts(locale).filter((p) => p.tags.includes(tag));
}

export function allTags() {
  return collectPublishedTags();
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
  return Math.max(1, Math.round(chars / 500));
}

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
    const label = inner.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!label) continue;
    if (label === '目次') continue;
    out.push({ level, id: idMatch[1], label });
  }
  return out;
}