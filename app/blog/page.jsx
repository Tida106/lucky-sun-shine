import PostCard from '@/components/PostCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import Sidebar from '@/components/Sidebar';
import SunOrnament from '@/components/icons/SunOrnament';
import { getAllPosts } from '@/lib/posts';
import { site } from '@/lib/site';

export const metadata = {
  title: '記事一覧（新着順） | Lucky Sun Shine',
  description:
    'Lucky Sun Shine の記事を新しい順にすべて一覧。パワーストーン・パワースポット・開運グッズ・運気アップ習慣の最新記事をまとめてチェックできます。',
  alternates: { canonical: '/blog/' },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '記事一覧（新着順）',
    description:
      'Lucky Sun Shine のすべての記事を新着順に一覧表示します。',
    url: `${site.url}/blog/`,
    inLanguage: site.language,
    isPartOf: { '@type': 'WebSite', name: site.name, url: site.url },
    mainEntity: {
      '@type': 'ItemList',
      name: '記事一覧（新着順）',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: posts.length,
      itemListElement: posts.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${site.url}/blog/${p.slug}/`,
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
          <Breadcrumbs items={[{ name: '記事一覧' }]} className="mb-6" />
          <header className="mb-8">
            <p className="text-amber-700 text-xs font-bold tracking-widest">ALL ARTICLES</p>
            <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink-900 flex items-center gap-3">
              <SunOrnament className="w-7 h-7 text-amber-500 shrink-0" />
              <span>記事一覧（新着順）</span>
            </h1>
            <p className="mt-3 text-sm text-ink-700">
              新しい記事から順に並べています。気になるものから読んでみてね☀️
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-ink-500">{posts.length} 記事</span>
            </div>
          </header>

          {posts.length === 0 ? (
            <p className="text-ink-500 text-sm">記事を準備中です。</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </section>

        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
