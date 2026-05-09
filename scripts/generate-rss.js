// Emit public/rss.xml (RSS 2.0) from current posts.
const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lucky-sun-shine.com';
const BASE = process.env.BASE_PATH || '';
const SITE_NAME = 'Lucky Sun Shine';
const SITE_DESC = 'パワーストーン・パワースポット・開運の総合メディア';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
fs.mkdirSync(PUBLIC_DIR, { recursive: true });

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function loadPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8');
      const { data } = matter(raw);
      return {
        slug: data.slug || f.replace(/\.(md|mdx)$/, ''),
        title: data.title || '',
        description: data.description || '',
        date: data.date ? new Date(data.date) : new Date(),
        draft: Boolean(data.draft),
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => b.date - a.date);
}

function build() {
  const posts = loadPosts().slice(0, 30);
  const items = posts.map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}${BASE}/blog/${p.slug}/</link>
      <guid isPermaLink="true">${SITE_URL}${BASE}/blog/${p.slug}/</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${p.date.toUTCString()}</pubDate>
    </item>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_NAME)}</title>
    <link>${SITE_URL}${BASE}/</link>
    <description>${esc(SITE_DESC)}</description>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}${BASE}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), xml);
  console.log(`✓ rss.xml — ${posts.length} items`);
}

build();
