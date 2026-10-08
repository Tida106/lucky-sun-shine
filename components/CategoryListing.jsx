import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import CategoryIcon from '@/components/CategoryIcon';
import Breadcrumbs from '@/components/Breadcrumbs';
import Sidebar from '@/components/Sidebar';
import { getCategory, getCategoryTitle } from '@/lib/categories';
import { getPostsByCategory, getPostBySlug, getAllPosts } from '@/lib/posts';
import { getLocalizedCategorySlugs } from '@/lib/routes';
import { site } from '@/lib/site';

// 英語・繁體中文のカテゴリ一覧ページ(日本語版 app/category/[slug]/page.jsx と同じデザイン)。
// 掲載するのは、その言語の翻訳記事(.en.md / .zh-tw.md)だけ。カテゴリ名は
// lib/categories.js の titleEn / titleZhTw を使う。カテゴリの説明文(tagline /
// description)は日本語しか無いため、ここでは汎用の1文にしている。
const UI = {
  en: {
    prefix: '/en',
    inLanguage: 'en',
    metaTitle: (t) => `${t} Articles`,
    intro: (t) => `Browse all ${t} articles on ${site.name}, newest first.`,
    listHeading: 'Articles',
    count: (n) => `${n} ${n === 1 ? 'article' : 'articles'}`,
    other: 'Other categories',
    pillarLabel: 'Start here — complete guide',
    pillarText: 'An overview and the basics of this category. If you are new, start here →',
  },
  'zh-tw': {
    prefix: '/zh-tw',
    inLanguage: 'zh-Hant-TW',
    metaTitle: (t) => `${t}文章列表`,
    intro: (t) => `瀏覽 ${site.name} 的「${t}」文章（由新到舊）。`,
    listHeading: '文章列表',
    count: (n) => `${n} 篇文章`,
    other: '其他分類',
    pillarLabel: '從這裡開始 — 完整指南',
    pillarText: '整理了此分類的整體概念與基礎知識。初次閱讀的朋友請從這裡開始 →',
  },
};

export function localizedCategoryParams(locale) {
  return getLocalizedCategorySlugs(locale).map((slug) => ({ slug }));
}

export function buildCategoryMetadata(slug, locale) {
  const cat = getCategory(slug);
  const ui = UI[locale];
  if (!cat || !ui) return {};
  const title = getCategoryTitle(cat, locale);
  const path = `${ui.prefix}/category/${cat.slug}/`;
  return {
    title: ui.metaTitle(title),
    description: ui.intro(title),
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description: ui.intro(title),
      url: `${site.url}${path}`,
      images: [
        {
          url: `${site.url}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${title} | ${site.name}`,
          type: 'image/jpeg',
        },
      ],
    },
  };
}

export default function CategoryListing({ slug, locale }) {
  const ui = UI[locale];
  const cat = getCategory(slug);
  // 翻訳記事が0件のカテゴリはページを作らない(generateStaticParams側でも除外している)。
  const posts = getPostsByCategory(slug, locale);
  if (!ui || !cat || posts.length === 0) notFound();

  const title = getCategoryTitle(cat, locale);
  const pagePath = `${ui.prefix}/category/${cat.slug}/`;
  const otherCategories = getLocalizedCategorySlugs(locale)
    .filter((s) => s !== slug)
    .map((s) => getCategory(s));
  // 総合ガイド(柱記事)も、その言語版が実在するときだけ案内する。
  const pillar = cat.pillarSlug ? getPostBySlug(cat.pillarSlug, locale) : null;
  const allSlugs = getAllPosts(locale).map((p) => p.slug);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: ui.metaTitle(title),
    description: ui.intro(title),
    url: `${site.url}${pagePath}`,
    inLanguage: ui.inLanguage,
    isPartOf: { '@type': 'WebSite', name: site.name, url: site.url },
    mainEntity: {
      '@type': 'ItemList',
      name: ui.metaTitle(title),
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: posts.length,
      itemListElement: posts.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${site.url}${ui.prefix}/blog/${p.slug}/`,
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
      <section className={cat.pastel.bg}>
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-12">
          <Breadcrumbs items={[{ name: title }]} className="mb-6" locale={locale} />
          <div className="text-center">
            <CategoryIcon slug={cat.slug} className={`w-12 h-12 mx-auto mb-3 ${cat.pastel.accent}`} />
            <h1 className={`font-display text-3xl md:text-4xl font-extrabold ${cat.pastel.accent}`}>
              {title}
            </h1>
            <p className="mt-3 text-sm text-[#5A5A5A]/80 max-w-2xl mx-auto">{ui.intro(title)}</p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
        <section className="min-w-0">
          {pillar && (
            <Link prefetch={false}
              href={`${ui.prefix}/blog/${pillar.slug}/`}
              className={`mb-8 block group rounded-2xl border-2 ${cat.pastel.accentBorder} ${cat.pastel.bg} p-5 sm:p-6 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start gap-4">
                <div className={`shrink-0 mt-0.5 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white ${cat.pastel.accent}`}>
                  <CategoryIcon slug={cat.slug} className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className={`text-[11px] font-bold tracking-widest ${cat.pastel.accent}`}>
                    {ui.pillarLabel}
                  </div>
                  <h2 className="mt-1 font-display text-lg sm:text-xl font-bold text-ink-900 group-hover:underline">
                    {pillar.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink-700">{ui.pillarText}</p>
                </div>
              </div>
            </Link>
          )}

          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-xl font-bold">{ui.listHeading}</h2>
            <span className="text-sm text-ink-500">{ui.count(posts.length)}</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} locale={locale} />
            ))}
          </div>

          {otherCategories.length > 0 && (
            <div className="mt-12 pt-6 border-t border-amber-200">
              <h3 className="text-sm font-bold mb-3 text-ink-700">{ui.other}</h3>
              <div className="flex flex-wrap gap-2">
                {otherCategories.map((c) => (
                  <Link prefetch={false}
                    key={c.slug}
                    href={`${ui.prefix}/category/${c.slug}/`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border ${c.pastel.accentBorder} text-sm ${c.pastel.accent} ${c.pastel.accentHover} ${c.pastel.hoverBg} transition-colors`}
                  >
                    <CategoryIcon slug={c.slug} className={`w-3.5 h-3.5 ${c.pastel.accent}`} />
                    {getCategoryTitle(c, locale)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar
              locale={locale}
              enSlugs={locale === 'en' ? allSlugs : []}
              zhTwSlugs={locale === 'zh-tw' ? allSlugs : []}
            />
          </div>
        </div>
      </div>
    </>
  );
}
