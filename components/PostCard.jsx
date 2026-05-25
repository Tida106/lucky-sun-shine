import Link from 'next/link';
import { getCategory } from '@/lib/categories';
import ArticleCover from './ArticleCover';

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function PostCard({ post }) {
  const cat = getCategory(post.category);
  return (
    <article className="card-elev group rounded-2xl bg-white border border-amber-100 hover:border-amber-300 overflow-hidden">
      <Link href={`/blog/${post.slug}/`} className="block">
        <div className="overflow-hidden">
          {/* cover も hover でほんのり拡大して、既存カードのアニメーション感を継承する */}
          <div className="transition-transform duration-500 ease-out group-hover:scale-105">
            <ArticleCover post={post} variant="card" />
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs mb-2">
            <span
              className={`px-2 py-0.5 rounded-full font-medium ${
                cat?.pastel ? `${cat.pastel.accentBg} ${cat.pastel.accent}` : 'bg-amber-100 text-amber-700'
              }`}
            >
              {cat?.title || post.category}
            </span>
            <time dateTime={post.date} className="text-ink-500">{formatDate(post.date)}</time>
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
