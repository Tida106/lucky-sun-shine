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
import stoneImageCredits from '../data/stone-image-credits.json';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

// アイキャッチ中央の丸い石の写真は public/images/stones/ の静的ファイルを使う
// (GemstoneOrb参照)。記事自身の slug がそのまま石の画像キーになる
// (例: slug "blue-topaz" -> /images/stones/blue-topaz-320.webp)。
function findCoverStoneSlug(category, slug) {
  if (category !== 'powerstones' || !slug) return null;
  const entry = stoneImageCredits[slug];
  if (!entry || entry.source === 'icon-fallback') return null;
  return slug;
}

function readPostFiles() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
}

const _cache = {};

// サポートするロケールと、それぞれの記事ファイルに付くサフィックス。
// 'ja' はサフィックスなし("xxx.md")が本体。
const LOCALE_SUFFIXES = { en: '.en', 'zh-tw': '.zh-tw' };

// locale: 'ja'(デフォルト) / 'en' / 'zh-tw'
// 'en'・'zh-tw' はそれぞれ "xxx.en.md" / "xxx.zh-tw.md" のファイルだけを
// 対象にし、slugは対応する日本語版の slug と同じ値にする
// (言語切り替えで同じslugを共有するため)。
export function getAllPosts(locale = 'ja') {
  if (_cache[locale]) return _cache[locale];

  const suffix = LOCALE_SUFFIXES[locale] || null;
  const otherSuffixes = Object.values(LOCALE_SUFFIXES).filter((s) => s !== suffix);
  const files = readPostFiles().filter((f) => {
    if (suffix) return f.endsWith(`${suffix}.md`) || f.endsWith(`${suffix}.mdx`);
    // ja: en/zh-tw いずれのサフィックスも付かないファイルのみ
    return !otherSuffixes.some((s) => f.endsWith(`${s}.md`) || f.endsWith(`${s}.mdx`));
  });

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    const baseName = suffix
      ? file.replace(/\.(md|mdx)$/, '').slice(0, -suffix.length)
      : file.replace(/\.(md|mdx)$/, '');
    let slug = data.slug || baseName;
    let jaData = null;
    if (suffix) {
      for (const ext of ['.md', '.mdx']) {
        const jaPath = path.join(POSTS_DIR, baseName + ext);
        if (fs.existsSync(jaPath)) {
          jaData = matter(fs.readFileSync(jaPath, 'utf8')).data;
          slug = jaData.slug || baseName;
          break;
        }
      }
    }
    const category = data.category || 'powerstones';
    // 画像系フィールドは英語版 frontmatter に無ければ日本語版から引き継ぐ。
    // 翻訳記事を追加するだけで、アイキャッチ画像が自動的に揃うようにするため。
    const cover = data.cover || jaData?.cover || null;
    const coverStoneSlug = findCoverStoneSlug(category, slug);
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      updated: data.updated ? new Date(data.updated).toISOString() : null,
      category,
      tags: normalizeTags(data.tags),
      cover,
      coverStoneSlug,
      author: data.author || null,
      faq: Array.isArray(data.faq) ? data.faq : null,
      // 英語版記事のみで使う、Viatorツアーリンクの対象スポット
      // (components/ViatorTours.jsx参照)。日本語版frontmatterには
      // 書かないため、日本語ページには自然に表示されない。
      viatorSpots: Array.isArray(data.viatorSpots) ? data.viatorSpots : null,
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

// スキーム付きURL(http:, https:, mailto:, tel: 等)かどうか。
// 外部リンク・アフィリエイトリンクはここで弾いて絶対に書き換えない。
function hasUrlScheme(href) {
  return /^[a-z][a-z0-9+.-]*:/i.test(href);
}

// 本文内の内部リンク(/blog/xxx/ など)を、その言語版ページが実在する場合
// だけ /en/ や /zh-tw/ 配下へ書き換える。存在しない場合は何もせず日本語版
// へのリンクのままフォールバックさせる(各言語版の/category//tags/ 等の
// ページは現状存在しないため、無条件にprefixを付けると新たな404を生む)。
function localizeHref(href, prefix, localeSlugSet) {
  if (!href || hasUrlScheme(href) || href.startsWith('//')) return href;
  if (href.startsWith('#') || !href.startsWith('/')) return href;
  if (href.startsWith(`${prefix}/`) || href === prefix) return href;

  const hashIdx = href.indexOf('#');
  const pathPart = hashIdx === -1 ? href : href.slice(0, hashIdx);
  const hashPart = hashIdx === -1 ? '' : href.slice(hashIdx);

  const blogMatch = pathPart.match(/^\/blog\/([a-z0-9-]+)\/?$/i);
  if (blogMatch && localeSlugSet.has(blogMatch[1])) {
    return `${prefix}/blog/${blogMatch[1]}/${hashPart}`;
  }
  return href;
}

function walkHastLinks(node, visit) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'element' && node.tagName === 'a' && node.properties) {
    visit(node.properties);
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) walkHastLinks(child, visit);
  }
}

// rehypeプラグイン: <a href> を locale に応じてローカライズする。
function rehypeLocalizeLinks(prefix, localeSlugSet) {
  return (tree) => {
    walkHastLinks(tree, (props) => {
      if (typeof props.href === 'string') {
        props.href = localizeHref(props.href, prefix, localeSlugSet);
      }
    });
  };
}

const LOCALE_PREFIXES = { en: '/en', 'zh-tw': '/zh-tw' };

export async function renderMarkdown(md, locale = 'ja') {
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkRehype);
  const prefix = LOCALE_PREFIXES[locale];
  if (prefix) {
    const localeSlugSet = new Set(getAllPosts(locale).map((p) => p.slug));
    processor.use(rehypeLocalizeLinks, prefix, localeSlugSet);
  }
  processor.use(rehypeSlug).use(rehypeStringify);
  const file = await processor.process(md);
  return String(file);
}

// 英語は文字数ではなく語数ベース(約215語/分)で計算する。Markdownのリンク
// URLやHTMLタグ・テーブル記号を文字数にそのまま含めると、長い表を持つ記事で
// 読了時間が実際より大幅に長く出てしまうため。
function stripMarkdownForWordCount(markdown) {
  return (markdown || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[`*_>#|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const ENGLISH_WORDS_PER_MINUTE = 215;

export function readingTimeMinutes(markdown, locale = 'ja') {
  if (locale === 'en') {
    const text = stripMarkdownForWordCount(markdown);
    const words = text ? text.split(' ').filter(Boolean).length : 0;
    return Math.max(1, Math.round(words / ENGLISH_WORDS_PER_MINUTE));
  }
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