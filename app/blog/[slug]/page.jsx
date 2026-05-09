import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, renderMarkdown, readingTimeMinutes } from '@/lib/posts';
import { getCategory } from '@/lib/categories';
import { site } from '@/lib/site';

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

  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;
  const related = all
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <nav className="text-xs text-ink-500 mb-6">
        <Link href="/" className="hover:text-amber-700">トップ</Link>
        <span className="mx-1">/</span>
        <Link href={`/category/${post.category}/`} className="hover:text-amber-700">
          {cat?.title || post.category}
        </Link>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs text-amber-700">
          <span className="px-2 py-0.5 rounded-full bg-amber-100 font-medium">
            {cat?.icon} {cat?.title}
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>約{minutes}分で読了</span>
        </div>
        <h1 className="mt-4 font-display text-3xl md:text-4xl font-extrabold leading-tight text-ink-900">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-4 text-ink-700 leading-relaxed">{post.description}</p>
        )}
      </header>

      <div
        className="prose-article"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {post.tags?.length > 0 && (
        <div className="mt-10 pt-6 border-t border-amber-200">
          <h3 className="text-sm font-bold text-ink-900 mb-2">タグ</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Link
                key={t}
                href={`/tag/${encodeURIComponent(t)}/`}
                className="text-xs px-2.5 py-1 rounded bg-amber-50 text-amber-800 hover:bg-amber-100"
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
            className="block p-4 rounded-xl border border-amber-200 bg-white hover:bg-amber-50"
          >
            <div className="text-xs text-amber-700">← 前の記事</div>
            <div className="mt-1 text-sm font-bold line-clamp-2">{prev.title}</div>
          </Link>
        )}
        {next && (
          <Link
            href={`/blog/${next.slug}/`}
            className="block p-4 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 text-right"
          >
            <div className="text-xs text-amber-700">次の記事 →</div>
            <div className="mt-1 text-sm font-bold line-clamp-2">{next.title}</div>
          </Link>
        )}
      </nav>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold mb-4">関連記事</h2>
          <ul className="space-y-2 text-sm">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}/`} className="hover:text-amber-700">
                  · {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
