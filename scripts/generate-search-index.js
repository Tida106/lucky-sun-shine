// Build a static search index (public/search-index.json) from all
// non-draft Markdown posts. The client-side <SearchBox> fetches this
// and runs a lightweight in-browser scan (no external dependency, no
// runtime CPU on the server — works fine for ≲ 5000 posts).
const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
fs.mkdirSync(PUBLIC_DIR, { recursive: true });

function stripMarkdown(s) {
  return s
    .replace(/```[\s\S]*?```/g, ' ')          // code blocks
    .replace(/`[^`]*`/g, ' ')                 // inline code
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')     // images
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')   // links → text
    .replace(/[#>*_~|\\-]/g, ' ')             // markdown punctuation
    .replace(/\s+/g, ' ')
    .trim();
}

const files = fs.existsSync(POSTS_DIR)
  ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
  : [];

const index = files
  .map((f) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8');
    const { data, content } = matter(raw);
    if (data.draft) return null;
    const slug = data.slug || f.replace(/\.(md|mdx)$/, '');
    const body = stripMarkdown(content).slice(0, 1500);
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      category: data.category || 'powerstones',
      tags: Array.isArray(data.tags) ? data.tags : [],
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      body,
    };
  })
  .filter(Boolean)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

fs.writeFileSync(path.join(PUBLIC_DIR, 'search-index.json'), JSON.stringify(index));
console.log(`✓ search-index.json — ${index.length} posts`);
