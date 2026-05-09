import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { categories, getCategory, categorySlugs } from '@/lib/categories';
import { getPostsByCategory } from '@/lib/posts';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return categorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return {
    title: `${cat.title}の記事一覧`,
    description: cat.description,
    alternates: { canonical: `/category/${cat.slug}/` },
    openGraph: {
      title: `${cat.title} | ${site.name}`,
      description: cat.description,
      url: `${site.url}/category/${cat.slug}/`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const posts = getPostsByCategory(slug);

  return (
    <>
      <section className={`bg-gradient-to-br ${cat.color}`}>
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <div className="text-5xl mb-3">{cat.icon}</div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-ink-900">
            {cat.title}
          </h1>
          <p className="mt-3 text-ink-700">{cat.tagline}</p>
          <p className="mt-2 text-sm text-ink-500 max-w-2xl mx-auto">{cat.description}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-xl font-bold">記事一覧</h2>
          <span className="text-sm text-ink-500">{posts.length} 記事</span>
        </div>
        {posts.length === 0 ? (
          <p className="text-ink-500 text-sm">このカテゴリの記事は準備中です。</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-amber-200">
          <h3 className="text-sm font-bold mb-3 text-ink-700">他のカテゴリ</h3>
          <div className="flex flex-wrap gap-2">
            {categories.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}/`}
                className="px-3 py-1.5 rounded-full bg-white border border-amber-200 text-sm hover:bg-amber-50"
              >
                {c.icon} {c.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
