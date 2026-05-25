import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { allTags, getPostsByTag } from '@/lib/posts';

export const metadata = {
  title: 'タグ一覧',
  description: 'Lucky Sun Shine のすべてのタグの一覧です。気になるテーマから記事を探せます。',
  alternates: { canonical: '/tags/' },
};

export default function TagsIndexPage() {
  const tags = allTags()
    .map((t) => ({ name: t, count: getPostsByTag(t).length }))
    .sort((a, b) => b.count - a.count);

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ name: 'タグ一覧' }]} className="mb-6" />
      <header className="mb-8 text-center">
        <p className="text-amber-700 text-xs font-bold tracking-widest">TAGS</p>
        <h1 className="font-display text-3xl font-extrabold mt-2">タグから探す</h1>
        <p className="mt-2 text-sm text-ink-500">{tags.length} 個のタグ</p>
      </header>
      {tags.length === 0 ? (
        <p className="text-center text-ink-500 text-sm">タグはまだありません。</p>
      ) : (
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((t) => (
            <Link
              key={t.name}
              href={`/tag/${encodeURIComponent(t.name)}/`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-amber-200 hover:border-amber-400 hover:bg-amber-50 transition-colors"
              style={{ fontSize: `${Math.min(1.4, 0.85 + t.count * 0.05)}rem` }}
            >
              <span className="text-amber-800 font-medium">#{t.name}</span>
              <span className="text-xs text-ink-500">({t.count})</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
