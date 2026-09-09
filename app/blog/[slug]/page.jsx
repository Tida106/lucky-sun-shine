import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, renderMarkdown, readingTimeMinutes, extractHeadings } from '@/lib/posts';
import { getCategory } from '@/lib/categories';
import { site } from '@/lib/site';
import { getFaqForPost, faqJsonLd } from '@/lib/faq';
import RelatedProducts from '@/components/RelatedProducts';
import Sidebar from '@/components/Sidebar';
import AdUnit from '@/components/AdUnit';
import CategoryIcon from '@/components/CategoryIcon';
import PostCard from '@/components/PostCard';
import SunOrnament from '@/components/icons/SunOrnament';
import BlogMascotBubble from '@/components/BlogMascotBubble';
import FaqSection from '@/components/FaqSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import TableOfContents from '@/components/TableOfContents';
import ShareButtons from '@/components/ShareButtons';
import ArticleCover from '@/components/ArticleCover';
import { getRelatedPosts } from '@/lib/related';
import { getHubChildren } from '@/lib/hubs';
import BirthdayTable from '@/components/BirthdayTable';
// ★ 黄金ルート（あわせて読みたいエース記事）をインポート
import GoldenRouteArticles from '@/components/GoldenRouteArticles';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

function normalizeDescription(post) {
  const raw = (post.description || '').trim();
  if (!raw) return site.description;
  if (raw.length <= 160) return raw;
  return `${raw.slice(0, 157)}…`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const description = normalizeDescription(post);
  const url = `${site.url}/blog/${post.slug}/`;
  const ogImage = `${site.url}/og-image.jpg`;
  return {
    title: post.title,
    description,
    keywords: post.tags?.length ? post.tags.join(', ') : undefined,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      tags: post.tags || [],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage],
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
  const headings = extractHeadings(html);
  const cat = getCategory(post.category);
  const minutes = readingTimeMinutes(post.content);

  const articleUrl = `${site.url}/blog/${post.slug}/`;
  const shareImage = `${site.url}/og-image.jpg`;
  const authorName = post.author || site.publisherName;
  const articleImage = post.cover
    ? (post.cover.startsWith('http') ? post.cover : `${site.url}${post.cover}`)
    : shareImage;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    url: `${site.url}/blog/${post.slug}/`,
    image: {
      '@type': 'ImageObject',
      url: articleImage,
      width: 1200,
      height: 630,
    },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    inLanguage: site.language,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: site.url,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      logo: {
        '@type': 'ImageObject',
        url: `${site.url}/apple-touch-icon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/blog/${post.slug}/`,
    },
  };

  const all = getAllPosts();
  const sameCatAll = all.filter((p) => p.category === post.category);
  const idxInCat = sameCatAll.findIndex((p) => p.slug === post.slug);
  const prev = idxInCat > 0 ? sameCatAll[idxInCat - 1] : null;
  const next = idxInCat >= 0 && idxInCat < sameCatAll.length - 1 ? sameCatAll[idxInCat + 1] : null;

  const sameCat = sameCatAll.filter((p) => p.slug !== post.slug);
  const alsoRead = getRelatedPosts(post, all, { limit: 4 });

  const pillarPost = cat?.pillarSlug && post.slug !== cat.pillarSlug
    ? all.find((p) => p.slug === cat.pillarSlug) || null
    : null;
  const isPillarPost = Boolean(cat?.pillarSlug && post.slug === cat.pillarSlug);
  const pillarChildren = isPillarPost ? sameCat : [];
  const hubChildren = getHubChildren(post.slug, all);

  const breadcrumbItems = [
    { name: cat?.title || post.category, href: `/category/${post.category}/` },
  ];
  if (pillarPost) {
    breadcrumbItems.push({
      name: pillarPost.title,
      href: `/blog/${pillarPost.slug}/`,
    });
  }
  breadcrumbItems.push({ name: post.title });

  const itemListSchema = isPillarPost && pillarChildren.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `${cat?.title || post.category} の記事一覧`,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: pillarChildren.length,
        itemListElement: pillarChildren.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${site.url}/blog/${p.slug}/`,
          name: p.title,
        })),
      }
    : null;

  const faq = getFaqForPost(post);
  const faqSchema = faqJsonLd(faq);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
      <article className="min-w-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {itemListSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
          />
        )}

        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <ArticleCover post={post} variant="hero" className="mb-8" />

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${
                cat?.pastel ? `${cat.pastel.accentBg} ${cat.pastel.accent}` : 'bg-amber-100 text-amber-700'
              }`}
            >
              {cat && <CategoryIcon slug={cat.slug} className="w-3 h-3" />}
              {cat?.title || post.category}
            </span>
            <span className="text-ink-500">約{minutes}分で読了</span>
          </div>
          <h1 className="mt-4 font-display text-3xl md:text-4xl font-extrabold leading-tight text-ink-900">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-4 text-ink-700 leading-relaxed">{post.description}</p>
          )}

          <div className="mt-5 pt-4 border-t border-amber-100 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
            <span>
              <span className="block text-[10px] tracking-widest text-amber-700 font-bold">
                PUBLISHED
              </span>
              <time dateTime={post.date} className="font-bold text-ink-900">
                {formatDate(post.date)}
              </time>
            </span>
            {post.updated && post.updated !== post.date && (
              <span>
                <span className="block text-[10px] tracking-widest text-amber-700 font-bold">
                  UPDATED
                </span>
                <time dateTime={post.updated} className="font-bold text-ink-900">
                  {formatDate(post.updated)}
                </time>
              </span>
            )}
          </div>
        </header>

        <p className="not-prose mb-6 px-4 py-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-ink-700 leading-relaxed">
          <span className="inline-block px-1.5 py-0.5 mr-2 rounded bg-amber-200 text-amber-900 font-bold align-middle">PR</span>
          本記事はアフィリエイトリンクを含みます。リンク経由でご購入された場合、運営者に紹介料が支払われることがあります。
        </p>

        <BlogMascotBubble
          tone="pink"
          src="/images/mascot-sun.png"
          alt="太陽ちゃん"
          className="mb-8"
        >
          {`こんにちは☀️ Lucky Sun Shineの太陽ちゃんだよ！
この記事を読んでくれてありがとう💛
最後までゆっくり読んでいってね✨`}
        </BlogMascotBubble>

        {headings.length > 0 && (
          <TableOfContents
            headings={headings}
            variant="inline"
            className="lg:hidden mb-8"
          />
        )}
        
        <RelatedProducts post={post} />
        
        <div className="prose-article">
          <div dangerouslySetInnerHTML={{ __html: html }} />
          {post?.slug?.includes('birthday') && <BirthdayTable />}
        </div>
        
        {/* 🌟 記事下の強力なCTA（クロージング） */}
        <div className="mt-16 mb-10">
          <BlogMascotBubble>
            最後まで読んでくれてありがとう🌻<br />
            天然石との出会いは一期一会。いま直感で『これ！』と惹かれる石があったら、それが今のあなたに必要な運命の石だよ✨<br />
            でも、色合いの綺麗なものや、ピンとくる石からどんどん他の人にお迎えされていっちゃうから要注意💦<br />
            『あの時見ておけばよかった…』って後悔しないように、まずは今のラインナップだけでも早めにチェックしてみてね！💛
          </BlogMascotBubble>
          
          <RelatedProducts post={post} heading="いま出会える運命の石をチェック" />
        </div>
        
        {/* ✨ ここに黄金ルートを追加！読了直後・商品チェック直後の読者を一網打尽にします */}
        <GoldenRouteArticles />

        {pillarPost && (
          <Link
            href={`/blog/${pillarPost.slug}/`}
            className={`mt-10 block group rounded-2xl border-2 ${cat?.pastel?.accentBorder || 'border-amber-300'} ${cat?.pastel?.bg || 'bg-amber-50'} p-5 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start gap-4">
              <div className={`shrink-0 mt-0.5 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white ${cat?.pastel?.accent || 'text-amber-700'}`}>
                <CategoryIcon slug={cat?.slug || post.category} className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className={`text-[11px] font-bold tracking-widest ${cat?.pastel?.accent || 'text-amber-700'}`}>
                  もっと詳しく知りたい方はこちら☀️
                </div>
                <h3 className="mt-1 font-display text-lg font-bold text-ink-900 group-hover:underline">
                  {pillarPost.title}
                </h3>
                <p className="mt-1 text-sm text-ink-700">
                  この記事のカテゴリの全体像はこちらにまとまっています →
                </p>
              </div>
            </div>
          </Link>
        )}

        {hubChildren && (
          <section className="mt-12">
            <div className="mb-6">
              <h2 className="font-display text-xl md:text-2xl font-bold text-ink-900 flex items-center gap-3">
                <SunOrnament className="w-5 h-5 md:w-6 md:h-6 text-amber-500 shrink-0" />
                <span>{hubChildren.title}の記事一覧</span>
              </h2>
              <span aria-hidden="true" className="heading-rule mt-3 ml-8" />
              <p className="mt-3 ml-8 text-sm text-ink-700">{hubChildren.blurb}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {hubChildren.posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}

        {isPillarPost && pillarChildren.length > 0 && (
          <section className="mt-12">
            <div className="mb-6">
              <h2 className="font-display text-xl md:text-2xl font-bold text-ink-900 flex items-center gap-3">
                <SunOrnament className="w-5 h-5 md:w-6 md:h-6 text-amber-500 shrink-0" />
                <span>このテーマの記事一覧</span>
              </h2>
              <span aria-hidden="true" className="heading-rule mt-3 ml-8" />
              <p className="mt-3 ml-8 text-sm text-ink-700">
                「{cat?.title || post.category}」カテゴリの全記事です。気になる記事から読み進めてみてください☀️
              </p>
            </div>
            <ul
              className={`rounded-2xl border-2 ${cat?.pastel?.accentBorder || 'border-amber-300'} ${cat?.pastel?.bg || 'bg-amber-50'} divide-y divide-amber-200/70 overflow-hidden`}
            >
              {pillarChildren.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}/`}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-white/60 transition-colors"
                  >
                    <span
                      className={`shrink-0 mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white ${cat?.pastel?.accent || 'text-amber-700'}`}
                    >
                      <CategoryIcon slug={cat?.slug || post.category} className="w-4 h-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold text-sm md:text-[15px] text-ink-900 leading-snug">
                        {p.title}
                      </span>
                      {p.description && (
                        <span className="block mt-1 text-xs md:text-sm text-ink-600 line-clamp-2">
                          {p.description}
                        </span>
                      )}
                    </span>
                    <span aria-hidden="true" className={`shrink-0 mt-1 text-sm ${cat?.pastel?.accent || 'text-amber-700'}`}>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="my-8">
          <AdUnit slot="auto" />
        </div>

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

        <FaqSection faq={faq} />

        <ShareButtons
          url={articleUrl}
          title={post.title}
          image={shareImage}
          className="mt-12"
        />

        <BlogMascotBubble
          tone="cream"
          src="/images/mascot-sun-thanks.png"
          alt="太陽ちゃん（合掌）"
          className="mt-12"
        >
          {`最後まで読んでくれてありがとう💛
この記事が、あなたの毎日のヒントになりますように☀️
また遊びにきてね！`}
        </BlogMascotBubble>

        {alsoRead.length > 0 && (
          <section className="mt-12">
            <div className="mb-6">
              <h2 className="font-display text-xl md:text-2xl font-bold text-ink-900 flex items-center gap-3">
                <SunOrnament className="w-5 h-5 md:w-6 md:h-6 text-amber-500 shrink-0" />
                <span>あわせて読みたい</span>
              </h2>
              <span aria-hidden="true" className="heading-rule mt-3 ml-8" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {alsoRead.map((r) => (
                <PostCard key={r.slug} post={r} />
              ))}
            </div>
          </section>
        )}
      </article>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <Sidebar headings={headings} />
        </div>
      </div>
    </div>
  );
}