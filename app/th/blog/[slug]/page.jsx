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
import TravelAffiliate from "@/components/TravelAffiliate";
import { getRelatedPosts } from "@/lib/related";
import { postHasAffiliateLinks } from "@/lib/affiliate";
import { getLocalizedCategorySlugs } from "@/lib/routes";

// 365日誕生日石の表だけ、石名リンクの左に丸いサムネイル画像を復元する対象。
// (日本語版・英語版と同じ対象スラッグ。石画像はslugベースで言語非依存。)
const STONE_THUMB_SLUGS = new Set(["birthday-stone-365"]);

const LOCALE = "th";

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
  const hasEn = Boolean(getPostBySlug(slug, "en"));
  const hasZhTw = Boolean(getPostBySlug(slug, "zh-tw"));
  return {
    title: post.title,
    description,
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
    alternates: {
      canonical: `/th/blog/${post.slug}/`,
      languages: {
        ja: `/blog/${post.slug}/`,
        ...(hasEn ? { en: `/en/blog/${post.slug}/` } : {}),
        ...(hasZhTw ? { "zh-Hant-TW": `/zh-tw/blog/${post.slug}/` } : {}),
        th: `/th/blog/${post.slug}/`,
        "x-default": `/blog/${post.slug}/`,
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `${site.url}/th/blog/${post.slug}/`,
      siteName: site.name,
      locale: "th_TH",
      images: [{ url: `${site.url}/og-image.jpg`, width: 1200, height: 630, alt: post.title }],
    },
  };
}

function formatDate(iso) {
  const d = new Date(iso);
  // 西暦表記(仏暦との混同を避けるため)で表示する。
  return d.toLocaleDateString("th-TH-u-ca-gregory", { year: "numeric", month: "long", day: "numeric" });
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
  // タイ語のカテゴリページは、そのカテゴリにタイ語記事が1件以上あるときだけ実在する。
  const hasCatPage = getLocalizedCategorySlugs(LOCALE).includes(post.category);
  const catHref = hasCatPage ? `/${LOCALE}/category/${post.category}/` : null;
  const catChipClass = `inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${cat?.pastel ? `${cat.pastel.accentBg}${cat.pastel.accent}` : "bg-amber-100 text-amber-700"}`;
  const hasAffiliate = postHasAffiliateLinks(post, LOCALE);

  const breadcrumbItems = [
    { name: catTitle, href: hasCatPage ? `/category/${post.category}/` : undefined },
    { name: post.title },
  ];

  const articleUrl = `${site.url}/${LOCALE}/blog/${post.slug}/`;
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
    inLanguage: "th",
    author: { "@type": "Organization", name: post.author || site.publisherName, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/apple-touch-icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  return (
    <div lang="th" className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
      <article className="min-w-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <Breadcrumbs items={breadcrumbItems} className="mb-6" locale={LOCALE} />
        <ArticleCover post={post} variant="hero" locale={LOCALE} className="mb-8" />

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {catHref ? (
              <Link prefetch={false} href={catHref} className={`${catChipClass} hover:opacity-80 transition-opacity`}>
                {cat && <CategoryIcon slug={cat.slug} className="w-3 h-3" />}
                {catTitle}
              </Link>
            ) : (
              <span className={catChipClass}>
                {cat && <CategoryIcon slug={cat.slug} className="w-3 h-3" />}
                {catTitle}
              </span>
            )}
            <span className="text-ink-500">อ่านประมาณ {minutes} นาที</span>
          </div>
          <h1 className="mt-4 font-display text-3xl md:text-4xl font-extrabold leading-tight text-ink-900">
            {post.title}
          </h1>
          {hasAffiliate && (
            <p className="mt-2 text-[11px] text-ink-500">
              บทความนี้มีเนื้อหาโฆษณา
            </p>
          )}
          {post.description && (
            <p className="mt-4 text-ink-700 leading-relaxed">{post.description}</p>
          )}
          <div className="mt-5 pt-4 border-t border-amber-100 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
            <span>
              <span className="block text-[10px] tracking-widest text-amber-700 font-bold">วันที่เผยแพร่</span>
              <time dateTime={post.date} className="font-bold text-ink-900">{formatDate(post.date)}</time>
            </span>
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

        {post.tags?.length > 0 && (
          <div className="mt-10 pt-6 border-t border-amber-200">
            <h3 className="text-sm font-bold text-ink-900 mb-2">แท็ก</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded bg-amber-50 text-amber-800">#{t}</span>
              ))}
            </div>
          </div>
        )}

        <nav className="mt-10 grid gap-3 sm:grid-cols-2">
          {prev && (
            <Link prefetch={false} href={`/th/blog/${prev.slug}/`} className="block p-4 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 transition-colors">
              <div className="text-xs text-amber-700">บทความก่อนหน้า</div>
              <div className="mt-1 text-sm font-bold line-clamp-2">{prev.title}</div>
            </Link>
          )}
          {next && (
            <Link prefetch={false} href={`/th/blog/${next.slug}/`} className="block p-4 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 text-right transition-colors">
              <div className="text-xs text-amber-700">บทความถัดไป</div>
              <div className="mt-1 text-sm font-bold line-clamp-2">{next.title}</div>
            </Link>
          )}
        </nav>

        <ShareButtons url={`${site.url}/th/blog/${post.slug}/`} title={post.title} image={`${site.url}/og-image.jpg`} className="mt-12" />

        <BlogMascotBubble tone="cream" src="/images/mascot-sun-thanks.png" alt="ซันจัง" className="mt-12">
          {`ขอบคุณที่อ่านจนจบนะ🌻
ไม่ว่าวันนี้จะเป็นวันแบบไหน ขอให้มีแสงแดดอ่อนๆ ส่องถึงใจคุณสักนิดนะ ☀️✨`}
        </BlogMascotBubble>

        <TravelAffiliate slug={post.slug} locale={LOCALE} />

        {alsoRead.length > 0 && (
          <section className="mt-12">
            <div className="mb-6">
              <h2 className="font-display text-xl md:text-2xl font-bold text-ink-900 flex items-center gap-3">
                <SunOrnament className="w-5 h-5 md:w-6 md:h-6 text-amber-500 shrink-0" />
                <span>บทความที่คุณอาจชอบ</span>
              </h2>
              <span aria-hidden="true" className="heading-rule mt-3 ml-8" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {alsoRead.map((r) => (
                <PostCard key={r.slug} post={r} locale={LOCALE} />
              ))}
            </div>
          </section>
        )}
      </article>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <Sidebar headings={headings} locale={LOCALE} thSlugs={all.map((p) => p.slug)} />
        </div>
      </div>
    </div>
  );
}
