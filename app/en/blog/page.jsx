import PostCard from '@/components/PostCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import Sidebar from '@/components/Sidebar';
import SunOrnament from '@/components/icons/SunOrnament';
import { getAllPosts } from '@/lib/posts';
import { site } from '@/lib/site';

const LOCALE = 'en';

export const metadata = {
  title: 'All Articles (Newest First) | Lucky Sun Shine',
  description:
    'Browse every Lucky Sun Shine article, newest first — powerstones, power spots, lucky goods, and luck-boosting habits all in one place.',
  alternates: { canonical: '/en/blog/' },
};

export default function BlogIndexPageEn() {
  const posts = getAllPosts(LOCALE);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Articles (Newest First)',
    description: 'All Lucky Sun Shine articles, listed newest first.',
    url: `${site.url}/en/blog/`,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: site.name, url: site.url },
    mainEntity: {
      '@type': 'ItemList',
      name: 'All Articles (Newest First)',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: posts.length,
      itemListElement: posts.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${site.url}/en/blog/${p.slug}/`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
        <section className="min-w-0">
          <Breadcrumbs items={[{ name: 'All Articles' }]} className="mb-6" locale={LOCALE} />
          <header className="mb-8">
            <p className="text-amber-700 text-xs font-bold tracking-widest">ALL ARTICLES</p>
            <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900 flex items-center gap-3">
              <SunOrnament className="w-7 h-7 text-amber-500 shrink-0" />
              <span>All Articles (Newest First)</span>
            </h1>
            <p className="mt-3 text-sm text-ink-700">
              Sorted from newest to oldest — start with whatever catches your eye ☀️
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-ink-500">{posts.length} articles</span>
            </div>
          </header>

          {posts.length === 0 ? (
            <p className="text-ink-500 text-sm">Articles coming soon.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} locale={LOCALE} />
              ))}
            </div>
          )}
        </section>

        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar locale={LOCALE} enSlugs={posts.map((p) => p.slug)} />
          </div>
        </div>
      </div>
    </>
  );
}
