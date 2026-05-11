import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import RecommendSns from '@/components/RecommendSns';
import CategoryIcon from '@/components/CategoryIcon';
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
      <section className={cat.pastel.bg}>
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <CategoryIcon slug={cat.slug} className={`w-12 h-12 mx-auto mb-3 ${cat.pastel.accent}`} />
          <h1 className={`font-display text-3xl md:text-4xl font-extrabold ${cat.pastel.accent}`}>
            {cat.title}
          </h1>
          <p className="mt-3 text-[#5A5A5A]">{cat.tagline}</p>
          <p className="mt-2 text-sm text-[#5A5A5A]/80 max-w-2xl mx-auto">{cat.description}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        {cat.pillarSlug && (
          <Link
            href={`/blog/${cat.pillarSlug}/`}
            className={`mb-8 block group rounded-2xl border-2 ${cat.pastel.accentBorder} ${cat.pastel.bg} dark:bg-ink-900/40 p-5 sm:p-6 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start gap-4">
              <div className={`shrink-0 mt-0.5 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white ${cat.pastel.accent}`}>
                <CategoryIcon slug={cat.slug} className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className={`text-[11px] font-bold tracking-widest ${cat.pastel.accent}`}>
                  まずはここから — 完全ガイド
                </div>
                <h2 className="mt-1 font-display text-lg sm:text-xl font-bold text-ink-900 dark:text-amber-50 group-hover:underline">
                  {cat.pillarTitle}
                </h2>
                <p className="mt-1 text-sm text-ink-700 dark:text-amber-100/90">
                  カテゴリの全体像と基礎をまとめた総合ガイドです。初めての方はこちらから →
                </p>
              </div>
            </div>
          </Link>
        )}

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

        {slug === 'luck-habits' && <RecommendSns />}

        <div className="mt-12 pt-6 border-t border-amber-200">
          <h3 className="text-sm font-bold mb-3 text-ink-700">他のカテゴリ</h3>
          <div className="flex flex-wrap gap-2">
            {categories.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}/`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border ${c.pastel.accentBorder} text-sm ${c.pastel.accent} ${c.pastel.accentHover} ${c.pastel.hoverBg} transition-colors`}
              >
                <CategoryIcon slug={c.slug} className={`w-3.5 h-3.5 ${c.pastel.accent}`} />
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
