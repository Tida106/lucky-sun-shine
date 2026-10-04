// Pre-build script — emits public/sitemap.xml and public/robots.txt
// based on the current Markdown corpus + category list. Runs before
// `next build` so the static export picks them up.
const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const { collectPublishedTags } = require('../lib/tags');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lucky-sun-shine.com';
const BASE = process.env.BASE_PATH || '';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
fs.mkdirSync(PUBLIC_DIR, { recursive: true });

const CATEGORY_SLUGS = ['powerstones', 'powerspots', 'lucky-goods', 'luck-habits', 'letter'];

function loadPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  const enFiles = new Set(files.filter((f) => /\.en\.(md|mdx)$/.test(f)));
  const zhTwFiles = new Set(files.filter((f) => /\.zh-tw\.(md|mdx)$/.test(f)));
  return files
    .filter((f) => !/\.en\.(md|mdx)$/.test(f) && !/\.zh-tw\.(md|mdx)$/.test(f))
    .map((f) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8');
      const { data } = matter(raw);
      const baseName = f.replace(/\.(md|mdx)$/, '');
      const ext = f.match(/\.(md|mdx)$/)[0];
      const slug = data.slug || baseName;
      const date = data.date ? new Date(data.date).toISOString() : new Date().toISOString();
      const hasEn = enFiles.has(`${baseName}.en${ext}`);
      const hasZhTw = zhTwFiles.has(`${baseName}.zh-tw${ext}`);
      return { slug, date, draft: Boolean(data.draft), hasEn, hasZhTw };
    })
    .filter((p) => !p.draft);
}

function urlEntry(loc, lastmod, changefreq = 'weekly', priority = '0.6') {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function build() {
  const posts = loadPosts();
  const today = new Date().toISOString();
  const entries = [];

  entries.push(urlEntry(`${SITE_URL}${BASE}/`, today, 'daily', '1.0'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/about/`, today, 'monthly', '0.6'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/about-our-vision/`, today, 'monthly', '0.6'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/about-mascot/`, today, 'monthly', '0.6'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/editorial-policy/`, today, 'monthly', '0.5'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/privacy/`, today, 'yearly', '0.3'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/disclaimer/`, today, 'yearly', '0.3'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/contact/`, today, 'yearly', '0.3'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/tags/`, today, 'weekly', '0.6'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/search/`, today, 'monthly', '0.4'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/blog/`, today, 'daily', '0.9'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/recommend-youtube/`, today, 'monthly', '0.6'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/omikuji/`, today, 'monthly', '0.7'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/credits/`, today, 'monthly', '0.3'));

  // 英語版ルート — app/en/ 配下に実在するページのみ
  entries.push(urlEntry(`${SITE_URL}${BASE}/en/`, today, 'daily', '0.9'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/en/blog/`, today, 'daily', '0.8'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/en/omikuji/`, today, 'monthly', '0.6'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/en/credits/`, today, 'monthly', '0.3'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/en/privacy/`, today, 'yearly', '0.3'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/en/disclosure/`, today, 'yearly', '0.3'));

  // 繁體中文版ルート — app/zh-tw/ 配下に実在するページのみ
  entries.push(urlEntry(`${SITE_URL}${BASE}/zh-tw/`, today, 'daily', '0.9'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/zh-tw/about-mascot/`, today, 'monthly', '0.5'));
  entries.push(urlEntry(`${SITE_URL}${BASE}/zh-tw/omikuji/`, today, 'monthly', '0.6'));

  CATEGORY_SLUGS.forEach((s) => {
    entries.push(urlEntry(`${SITE_URL}${BASE}/category/${s}/`, today, 'weekly', '0.8'));
  });

  posts.forEach((p) => {
    entries.push(urlEntry(`${SITE_URL}${BASE}/blog/${p.slug}/`, p.date, 'monthly', '0.7'));
    // .en.md 訳がある記事だけ /en/blog/ も生成される(app/en/blog/[slug]の
    // generateStaticParamsと同じ条件)ため、存在しないEN URLをsitemapに
    // 載せて404を誘発しないようhasEnで絞る。
    if (p.hasEn) {
      entries.push(urlEntry(`${SITE_URL}${BASE}/en/blog/${p.slug}/`, p.date, 'monthly', '0.6'));
    }
    // .zh-tw.md 訳がある記事だけ /zh-tw/blog/ も生成される
    // (app/zh-tw/blog/[slug]のgenerateStaticParamsと同じ条件)。
    if (p.hasZhTw) {
      entries.push(urlEntry(`${SITE_URL}${BASE}/zh-tw/blog/${p.slug}/`, p.date, 'monthly', '0.6'));
    }
  });

  // /tag/* — タグ部分は Unicode をそのまま URL 末尾に置けないため encodeURIComponent。
  // タグ一覧はページ生成側(app/tag/[slug] の generateStaticParams)と
  // 同一ソース lib/tags.js から取得する。別実装にすると sitemap だけに
  // 載る(またはページだけ生成される)タグが生まれ 404 の原因になる。
  const tags = collectPublishedTags();
  tags.forEach((t) => {
    entries.push(
      urlEntry(`${SITE_URL}${BASE}/tag/${encodeURIComponent(t)}/`, today, 'monthly', '0.5'),
    );
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);
  console.log(`✓ sitemap.xml — ${entries.length} URLs`);

  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}${BASE}/sitemap.xml
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots);
  console.log('✓ robots.txt');
}

build();
