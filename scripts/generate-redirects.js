// Generate static HTML stubs that redirect old post URLs to their new
// consolidation target. GitHub Pages can't do HTTP 301s, so we emit
// meta-refresh + canonical + JS replace into public/blog/<slug>/index.html,
// which next build copies to out/ verbatim.
//
// Trigger: any draft post whose frontmatter declares `redirect_to: "<url>"`.
// The draft itself does not generate a page; this stub takes its place.
//
// Run via `npm run prebuild`.

const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const OUT_BASE  = path.join(process.cwd(), 'public', 'blog');

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderStub(target, originalTitle) {
  const safeTarget = escapeHtml(target);
  const safeTitle  = escapeHtml(originalTitle || '');
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>記事は移動しました — Lucky Sun Shine</title>
<meta name="robots" content="noindex,follow">
<link rel="canonical" href="${safeTarget}">
<meta http-equiv="refresh" content="0;url=${safeTarget}">
<script>location.replace(${JSON.stringify(target)});</script>
<style>body{font-family:'Noto Sans JP',sans-serif;padding:2rem;max-width:32rem;margin:auto;color:#3b322a}</style>
</head>
<body>
<h1 style="font-size:1.1rem">このページは移動しました</h1>
<p>「${safeTitle}」は新しい総合ガイドに統合されました。</p>
<p>自動転送されない場合は、こちらのリンクから移動してください: <a href="${safeTarget}">${safeTarget}</a></p>
</body>
</html>
`;
}

function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.warn('[redirects] no posts dir, skipping');
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));
  let written = 0;

  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const { data } = matter(raw);
    if (!data.redirect_to) continue;

    const slug = data.slug || file.replace(/\.mdx?$/, '');
    const dir  = path.join(OUT_BASE, slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), renderStub(data.redirect_to, data.title));
    written++;
  }

  console.log(`[redirects] wrote ${written} stub(s) under public/blog/`);
}

main();
