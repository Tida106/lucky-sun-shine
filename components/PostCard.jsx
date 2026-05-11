import Link from 'next/link';
import { getCategory } from '@/lib/categories';
import CategoryIcon from './CategoryIcon';

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function PostCard({ post }) {
  const cat = getCategory(post.category);
  return (
    <article className="group rounded-2xl bg-white border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all overflow-hidden">
      <Link href={`/blog/${post.slug}/`} className="block">
        <div className={`h-32 bg-gradient-to-br ${cat?.color || 'from-amber-200 to-yellow-100'} flex items-center justify-center`}>
          {cat ? (
            <CategoryIcon slug={cat.slug} className="w-14 h-14 text-amber-700/80" />
          ) : (
            <span className="text-5xl" aria-hidden="true">☀️</span>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-amber-700 mb-2">
            <span className="px-2 py-0.5 rounded-full bg-amber-100 font-medium">
              {cat?.title || post.category}
            </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <h2 className="font-display font-bold text-lg leading-snug text-ink-900 group-hover:text-amber-700 transition-colors">
            {post.title}
          </h2>
          {post.description && (
            <p className="mt-2 text-sm text-ink-700 line-clamp-3">{post.description}</p>
          )}
          {post.tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
