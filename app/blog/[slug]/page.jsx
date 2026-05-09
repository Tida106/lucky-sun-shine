import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, renderMarkdown, readingTimeMinutes } from '@/lib/posts';
import { getCategory } from '@/lib/categories';
import { site } from '@/lib/site';
import RelatedProducts from '@/components/RelatedProducts';
import Sidebar from '@/components/Sidebar';
import AdUnit from '@/components/AdUnit';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `${site.url}/blog/${post.slug}/`,
      publishedTime: post.date,
    },
  };
}

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);
  const cat = getCategory(post.category);
  const minutes = readingTimeMinutes(post.content);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    url: `${site.url}/blog/${post.slug}/`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: site.language,
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/blog/${post.slug}/`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム',           item: `${site.url}/` },
      { '@type': 'ListItem', position: 2, name: cat?.title || post.category, item: `${site.url}/category/${post.category}/` },
      { '@type': 'ListItem', position: 3, name: post.title,         item: `${site.url}/blog/${post.slug}/` },
    ],
  };

  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  // Related: same category first, then matching tags, dedupe, max 6
  const sameCat = all.filter((p) => p.slug !== post.slug && p.category === post.category);
  const sameTag = all.filter(
    (p) => p.slug !== post.slug && p.category !== post.category && p.tags.some((t) => post.tags.includes(t))
  );
  const related = [...sameCat, ...sameTag].slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
      <article className="min-w-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <nav aria-label="パンくずリスト" className="text-xs text-ink-500 dark:text-amber-200 mb-6">
          <Link href="/" className="hover:text-amber-700 dark:hover:text-amber-300">トップ</Link>
          <span className="mx-1">/</span>
          <Link href={`/category/${post.category}/`} className="hover:text-amber-700 dark:hover:text-amber-300">
            {cat?.title || post.category}
          </Link>
          <span className="mx-1">/</span>
          <span className="text-ink-700 dark:text-amber-100">{post.title}</span>
        </nav>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-amber-700 dark:text-amber-300">
            <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-800 font-medium">
              {cat?.icon} {cat?.title}
            </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>約{minutes}分で読了</span>
          </div>
          <h1 className="mt-4 font-display text-3xl md:text-4xl font-extrabold leading-tight text-ink-900 dark:text-amber-50">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-4 text-ink-700 dark:text-amber-100 leading-relaxed">{post.description}</p>
          )}
        </header>

        <div className="prose-article" dangerouslySetInnerHTML={{ __html: html }} />

        {/* In-article ad slot — renders nothing without an AdSense ID */}
        <div className="my-8">
          <AdUnit slot="auto" />
        </div>

        <RelatedProducts post={post} />

        {post.tags?.length > 0 && (
          <div className="mt-10 pt-6 border-t border-amber-200 dark:border-amber-700">
            <h3 className="text-sm font-bold text-ink-900 dark:text-amber-50 mb-2">タグ</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Link
                  key={t}
                  href={`/tag/${encodeURIComponent(t)}/`}
                  className="text-xs px-2.5 py-1 rounded bg-amber-50 dark:bg-ink-700 text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-ink-500"
                >
                  #{t}
                </Link>
              ))}
            </div>
          </div>
        )}

        <nav className="mt-10 grid gap-3 sm:grid-cols-2">
          {prev && (
            <Link
              href={`/blog/${prev.slug}/`}
              className="block p-4 rounded-xl border border-amber-200 dark:border-amber-700 bg-white dark:bg-ink-900 hover:bg-amber-50 dark:hover:bg-ink-700"
            >
              <div className="text-xs text-amber-700 dark:text-amber-300">← 前の記事</div>
              <div className="mt-1 text-sm font-bold line-clamp-2 dark:text-amber-50">{prev.title}</div>
            </Link>
          )}
          {next && (
            <Link
              href={`/blog/${next.slug}/`}
              className="block p-4 rounded-xl border border-amber-200 dark:border-amber-700 bg-white dark:bg-ink-900 hover:bg-amber-50 dark:hover:bg-ink-700 text-right"
            >
              <div className="text-xs text-amber-700 dark:text-amber-300">次の記事 →</div>
              <div className="mt-1 text-sm font-bold line-clamp-2 dark:text-amber-50">{next.title}</div>
            </Link>
          )}
        </nav>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold text-ink-900 dark:text-amber-50 mb-4">
              関連記事
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {related.map((r) => {
                const rcat = getCategory(r.category);
                return (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}/`} className="block p-3 rounded-lg bg-white dark:bg-ink-900 border border-amber-100 dark:border-amber-800 hover:border-amber-400">
                      <div className="text-[11px] text-amber-700 dark:text-amber-300">{rcat?.icon} {rcat?.title}</div>
                      <div className="text-sm font-bold dark:text-amber-50 line-clamp-2 mt-1">{r.title}</div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </article>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
