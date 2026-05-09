import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { featuredSlugs } from '@/lib/featured';
import { getCategory } from '@/lib/categories';

export default function PopularPosts({ limit = 5, heading = '人気記事ランキング' }) {
  const all = getAllPosts();
  const bySlug = Object.fromEntries(all.map((p) => [p.slug, p]));
  const ranked = featuredSlugs
    .map((s) => bySlug[s])
    .filter(Boolean)
    .slice(0, limit);

  if (ranked.length === 0) return null;

  return (
    <aside className="rounded-2xl bg-white dark:bg-ink-900 border border-amber-200 dark:border-amber-700 p-5">
      <h3 className="font-display text-lg font-bold text-ink-900 dark:text-amber-50 flex items-center gap-2 mb-3">
        <span>🏆</span> {heading}
      </h3>
      <ol className="space-y-3">
        {ranked.map((post, i) => {
          const cat = getCategory(post.category);
          return (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}/`} className="flex gap-3 group">
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full ${
                    i === 0 ? 'bg-amber-500 text-white' :
                    i === 1 ? 'bg-amber-400 text-white' :
                    i === 2 ? 'bg-amber-300 text-amber-900' :
                              'bg-amber-100 text-amber-800'
                  } font-bold text-sm flex items-center justify-center`}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="text-xs text-amber-700 dark:text-amber-300">
                    {cat?.icon} {cat?.title}
                  </div>
                  <div className="text-sm font-bold text-ink-900 dark:text-amber-50 group-hover:text-amber-700 dark:group-hover:text-amber-300 leading-snug line-clamp-2">
                    {post.title}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
