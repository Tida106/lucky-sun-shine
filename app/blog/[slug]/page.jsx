import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, renderMarkdown, readingTimeMinutes, extractHeadings } from "@/lib/posts";
import { getCategory, getCategoryTitle } from "@/lib/categories";
import { site } from "@/lib/site";
import Sidebar from "@/components/Sidebar";
import CategoryIcon from "@/components/CategoryIcon";
import PostCard from "@/components/PostCard";
import SunOrnament from "@/components/icons/SunOrnament";
import BlogMascotBubble from "@/components/BlogMascotBubble";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import ShareButtons from "@/components/ShareButtons";
import ArticleCover from "@/components/ArticleCover";
import StoneThumbEnhancer from "@/components/StoneThumbEnhancer";
import PhoneFortuneCTA from "@/components/PhoneFortuneCTA";
import RelatedProducts from "@/components/RelatedProducts";
import FaqSection from "@/components/FaqSection";
import GoldenRouteArticles from "@/components/GoldenRouteArticles";
import { getFaqForPost, faqJsonLd } from "@/lib/faq";
import { getRelatedPosts } from "@/lib/related";
import { postHasAffiliateLinks } from "@/lib/affiliate";

// 365日誕生日石の表だけ、石名リンクの左に丸いサムネイル画像を復元する対象。
const STONE_THUMB_SLUGS = new Set(["birthday-stone-365"]);

const LOCALE = "ja";

export function generateStaticParams() {
  return getAllPosts(LOCALE).map((p) => ({ slug: p.slug }));
}

function normalizeDescription(post) {
  const raw = (post.description || "").trim();
  if (!raw) return site.description;
  if (raw.length <= 160) return raw;
  return `${raw.slice(0, 157)}...`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, LOCALE);
  if (!post) return {};
  const description = normalizeDescription(post);
  const hasZhTw = Boolean(getPostBySlug(slug, "zh-tw"));
  return {
    title: post.title,
    description,
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
    alternates: {
      canonical: `/blog/${post.slug}/`,
      languages: {
        ja: `/blog/${post.slug}/`,
        en: `/en/blog/${post.slug}/`,
        ...(hasZhTw ? { "zh-Hant-TW": `/zh-tw/blog/${post.slug}/` } : {}),
        "x-default": `/blog/${post.slug}/`,
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `${site.url}/blog/${post.slug}/`,
      siteName: site.name,
      images: [{ url: `${site.url}/og-image.jpg`, width: 1200, height: 630, alt: post.title }],
    },
  };
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, LOCALE);
  if (!post) notFound();

  const html = await renderMarkdown(post.content, LOCALE);
  const headings = extractHeadings(html);
  const cat = getCategory(post.category);
  const minutes = readingTimeMinutes(post.content, LOCALE);

  const all = getAllPosts(LOCALE);
  const sameCatAll = all.filter((p) => p.category === post.category);
  const idxInCat = sameCatAll.findIndex((p) => p.slug === post.slug);
  const prev = idxInCat > 0 ? sameCatAll[idxInCat - 1] : null;
  const next = idxInCat >= 0 && idxInCat < sameCatAll.length - 1 ? sameCatAll[idxInCat + 1] : null;
  const alsoRead = getRelatedPosts(post, all, { limit: 4 });

  const catTitle = getCategoryTitle(cat, LOCALE) || post.category;
  const hasAffiliate = postHasAffiliateLinks(post, LOCALE);
  // 本文に独自のFAQ見出しがある記事では、汎用FAQ(lib/faq.js)を重ねて出さない。
  const bodyHasFaq = /^#{2,3}\s.*(よくある質問|FAQ|Q&A)/m.test(post.content || "");
  const faq = bodyHasFaq ? null : getFaqForPost(post);

  const breadcrumbItems = [
    // カテゴリ一覧ページが実在するカテゴリだけURLを付ける(BreadcrumbList の中間項目はURL必須)。
    { name: catTitle, href: cat ? `/category/${cat.slug}/` : undefined },
    { name: post.title },
  ];

  // 更新日: 公開日と日付が異なるときだけ表示する(frontmatter の updated)。
  const showUpdated = Boolean(post.updated) && post.updated.slice(0, 10) !== post.date.slice(0, 10);

  // 構造化データ: Article(BlogPosting)は全記事。FAQPage は frontmatter に faq を
  // 明示した記事だけ(本文のFAQ見出しの有無とは独立。本文FAQとの二重表示はしない)。
  const articleUrl = `${site.url}/blog/${post.slug}/`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
    url: articleUrl,
    image: { "@type": "ImageObject", url: `${site.url}/og-image.jpg`, width: 1200, height: 630 },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    inLanguage: site.language,
    author: { "@type": "Organization", name: post.author || site.publisherName, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/apple-touch-icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };
  const explicitFaq = Array.isArray(post.faq) && post.faq.length > 0 ? getFaqForPost(post) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
      <article className="min-w-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        {explicitFaq && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(explicitFaq)) }}
          />
        )}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" locale={LOCALE} />
        <ArticleCover post={post} variant="hero" locale={LOCALE} className="mb-8" />

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${cat?.pastel ? `${cat.pastel.accentBg}${cat.pastel.accent}` : "bg-amber-100 text-amber-700"}`}>
              {cat && <CategoryIcon slug={cat.slug} className="w-3 h-3" />}
              {catTitle}
            </span>
            <span className="text-ink-500">約 {minutes} 分で読めます</span>
          </div>
          <h1 className="mt-4 font-display text-3xl md:text-4xl font-extrabold leading-tight text-ink-900">
            {post.title}
          </h1>
          {hasAffiliate && (
            <p className="mt-2 text-[11px] text-ink-500">
              この記事にはプロモーションが含まれています
            </p>
          )}
          {post.description && (
            <p className="mt-4 text-ink-700 leading-relaxed">{post.description}</p>
          )}
          <div className="mt-5 pt-4 border-t border-amber-100 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
            <span>
              <span className="block text-[10px] tracking-widest text-amber-700 font-bold">公開日</span>
              <time dateTime={post.date} className="font-bold text-ink-900">{formatDate(post.date)}</time>
            </span>
            {showUpdated && (
              <span>
                <span className="block text-[10px] tracking-widest text-amber-700 font-bold">更新日</span>
                <time dateTime={post.updated} className="font-bold text-ink-900">{formatDate(post.updated)}</time>
              </span>
            )}
          </div>
        </header>

        {headings.length > 0 && (
          <TableOfContents headings={headings} variant="inline" className="lg:hidden mb-8" locale={LOCALE} />
        )}

        <div className="prose-article">
          {STONE_THUMB_SLUGS.has(post.slug) ? (
            <StoneThumbEnhancer html={html} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: html }} />
          )}
        </div>

        {/* ▼▼ パワースポット記事専用のCTA（sあり・なし両対応） ▼▼ */}
        {(post.category === 'powerspots' || post.category === 'powerspot') && (
          <PhoneFortuneCTA
            className="mt-12 mb-8"
            lead={'自分と向き合う時間は本当に大切だよね🌻\n神様に相談しに行こうよ！\nでも、もし人に相談してみたいなら、占いで専門家に聞いてみるのもいいかもね✨'}
          />
        )}
        {/* ▲▲ ここまで ▲▲ */}

        {post.tags?.length > 0 && (
          <div className="mt-10 pt-6 border-t border-amber-200">
            <h3 className="text-sm font-bold text-ink-900 mb-2">タグ</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded bg-amber-50 text-amber-800">#{t}</span>
              ))}
            </div>
          </div>
        )}

        <nav className="mt-10 grid gap-3 sm:grid-cols-2">
          {prev && (
            <Link prefetch={false} href={`/blog/${prev.slug}/`} className="block p-4 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 transition-colors">
              <div className="text-xs text-amber-700">前の記事</div>
              <div className="mt-1 text-sm font-bold line-clamp-2">{prev.title}</div>
            </Link>
          )}
          {next && (
            <Link prefetch={false} href={`/blog/${next.slug}/`} className="block p-4 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 text-right transition-colors">
              <div className="text-xs text-amber-700">次の記事</div>
              <div className="mt-1 text-sm font-bold line-clamp-2">{next.title}</div>
            </Link>
          )}
        </nav>

        <FaqSection faq={faq} />

        <ShareButtons url={`${site.url}/blog/${post.slug}/`} title={post.title} image={`${site.url}/og-image.jpg`} className="mt-12" />

        {/* ▼通常の記事下固定メッセージ（パワーストーン購入誘導など） */}
        <BlogMascotBubble tone="cream" src="/images/mascot-sun-thanks.png" alt="太陽ちゃん" className="mt-12">
          {`最後まで読んでくれてありがとう🌻\n天然石との出会いは一期一会。いま直感で『これ！』と惹かれる石があったら、それが今のあなたに必要な運命の石だよ✨\nでも、色合いの綺麗なものや、ピンとくる石からどんどん他の人にお迎えされていっちゃうから要注意💦\n『あの時見ておけばよかった…』って後悔しないように、まずは今のラインナップだけでも早めにチェックしてみてね！💛`}
        </BlogMascotBubble>

        <RelatedProducts post={post} heading="いま出会える運命の石をチェック" />

        <GoldenRouteArticles />

        {alsoRead.length > 0 && (
          <section className="mt-12">
            <div className="mb-6">
              <h2 className="font-display text-xl md:text-2xl font-bold text-ink-900 flex items-center gap-3">
                <SunOrnament className="w-5 h-5 md:w-6 md:h-6 text-amber-500 shrink-0" />
                <span>合わせて読みたい関連記事</span>
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
          <Sidebar headings={headings} locale={LOCALE} />
        </div>
      </div>
    </div>
  );
}