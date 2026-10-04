import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { featuredSlugs } from '@/lib/featured';
import { getCategory, getCategoryTitle } from '@/lib/categories';
import CategoryIcon from './CategoryIcon';
import SunOrnament from './icons/SunOrnament';

// Display name is "編集部おすすめ" — the underlying list is a curated
// editorial pick (lib/featured.js), not real popularity data. The component
// name is kept as `PopularPosts` for git-blame continuity; the user-facing
// label is what matters and is set in the default `heading` prop.
export default function PopularPosts({ limit = 5, heading = '編集部おすすめ', locale = 'ja' }) {
  const isEn = locale === 'en';
  const isZhTw = locale === 'zh-tw';

  // 英語・繁体中文環境の場合は見出しを切り替える
  const displayHeading = heading === '編集部おすすめ'
    ? (isZhTw ? '編輯部精選' : isEn ? "Editor's Picks" : heading)
    : heading;

  // ロケールを渡して記事を取得する（未翻訳の記事は自動で除外される）
  const all = getAllPosts(locale);
  const bySlug = Object.fromEntries(all.map((p) => [p.slug, p]));
  const ranked = featuredSlugs
    .map((s) => bySlug[s])
    .filter(Boolean)
    .slice(0, limit);

  if (ranked.length === 0) return null;

  const blogPrefix = isZhTw ? '/zh-tw/blog/' : isEn ? '/en/blog/' : '/blog/';

  return (
    <aside className="card-elev rounded-2xl bg-white border border-amber-200 p-6">
      <h3 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2 mb-2">
        <SunOrnament className="w-5 h-5 text-amber-500 shrink-0" />
        <span>{displayHeading}</span>
      </h3>
      <span aria-hidden="true" className="heading-rule mb-4 ml-7" />
      <ol className="space-y-3">
        {ranked.map((post, i) => {
          const cat = getCategory(post.category);
          const catTitle = getCategoryTitle(cat, locale) || '';
          
          return (
            <li key={post.slug}>
              <Link href={`${blogPrefix}${post.slug}/`} className="flex gap-3 group">
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
                  <div className={`text-xs inline-flex items-center gap-1 ${cat?.pastel?.accent || 'text-amber-700'}`}>
                    {cat && <CategoryIcon slug={cat.slug} className="w-3 h-3" />}
                    {catTitle}
                  </div>
                  <div className="text-sm font-bold text-ink-900 group-hover:text-amber-700 leading-snug line-clamp-2">
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