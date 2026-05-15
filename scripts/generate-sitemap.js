// Pre-build script — emits public/sitemap.xml and public/robots.txt
// based on the current Markdown corpus + category list. Runs before
// `next build` so the static export picks them up.
const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lucky-sun-shine.com';
const BASE = process.env.BASE_PATH || '';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
fs.mkdirSync(PUBLIC_DIR, { recursive: true });

const CATEGORY_SLUGS = ['powerstones', 'powerspots', 'lucky-goods', 'luck-habits'];

function loadPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8');
      const { data } = matter(raw);
      const slug = data.slug || f.replace(/\.(md|mdx)$/, '');
      const date = data.date ? new Date(data.date).toISOString() : new Date().toISOString();
      return { slug, date, draft: Boolean(data.draft) };
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
  entries.push(urlEntry(`${SITE_URL}${BASE}/recommend-youtube/`, today, 'monthly', '0.6'));

  CATEGORY_SLUGS.forEach((s) => {
    entries.push(urlEntry(`${SITE_URL}${BASE}/category/${s}/`, today, 'weekly', '0.8'));
  });

  posts.forEach((p) => {
    entries.push(urlEntry(`${SITE_URL}${BASE}/blog/${p.slug}/`, p.date, 'monthly', '0.7'));
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
