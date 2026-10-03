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
import { getRelatedPosts } from "@/lib/related";

const LOCALE = "en";

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
  return {
    title: post.title,
    description,
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
    alternates: {
      canonical: `/en/blog/${post.slug}/`,
      languages: { ja: `/blog/${post.slug}/`, en: `/en/blog/${post.slug}/` },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `${site.url}/en/blog/${post.slug}/`,
      siteName: site.name,
      images: [{ url: `${site.url}/og-image.jpg`, width: 1200, height: 630, alt: post.title }],
    },
  };
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, LOCALE);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);
  const headings = extractHeadings(html);
  const cat = getCategory(post.category);
  const minutes = readingTimeMinutes(post.content);

  const all = getAllPosts(LOCALE);
  const sameCatAll = all.filter((p) => p.category === post.category);
  const idxInCat = sameCatAll.findIndex((p) => p.slug === post.slug);
  const prev = idxInCat > 0 ? sameCatAll[idxInCat - 1] : null;
  const next = idxInCat >= 0 && idxInCat < sameCatAll.length - 1 ? sameCatAll[idxInCat + 1] : null;
  const alsoRead = getRelatedPosts(post, all, { limit: 4 });

  const catTitle = getCategoryTitle(cat, LOCALE) || post.category;

  const breadcrumbItems = [
    { name: catTitle },
    { name: post.title },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
      <article className="min-w-0">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" locale={LOCALE} />
        <ArticleCover post={post} variant="hero" locale={LOCALE} className="mb-8" />

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${cat?.pastel ? `${cat.pastel.accentBg}${cat.pastel.accent}` : "bg-amber-100 text-amber-700"}`}>
              {cat && <CategoryIcon slug={cat.slug} className="w-3 h-3" />}
              {catTitle}
            </span>
            <span className="text-ink-500">About {minutes} min read</span>
          </div>
          <h1 className="mt-4 font-display text-3xl md:text-4xl font-extrabold leading-tight text-ink-900">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-4 text-ink-700 leading-relaxed">{post.description}</p>
          )}
          <div className="mt-5 pt-4 border-t border-amber-100 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
            <span>
              <span className="block text-[10px] tracking-widest text-amber-700 font-bold">PUBLISHED</span>
              <time dateTime={post.date} className="font-bold text-ink-900">{formatDate(post.date)}</time>
            </span>
          </div>
        </header>

        {headings.length > 0 && (
          <TableOfContents headings={headings} variant="inline" className="lg:hidden mb-8" locale={LOCALE} />
        )}

        <div className="prose-article">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>

        {post.tags?.length > 0 && (
          <div className="mt-10 pt-6 border-t border-amber-200">
            <h3 className="text-sm font-bold text-ink-900 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded bg-amber-50 text-amber-800">#{t}</span>
              ))}
            </div>
          </div>
        )}

        <nav className="mt-10 grid gap-3 sm:grid-cols-2">
          {prev && (
            <Link href={`/en/blog/${prev.slug}/`} className="block p-4 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 transition-colors">
              <div className="text-xs text-amber-700">Previous</div>
              <div className="mt-1 text-sm font-bold line-clamp-2">{prev.title}</div>
            </Link>
          )}
          {next && (
            <Link href={`/en/blog/${next.slug}/`} className="block p-4 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 text-right transition-colors">
              <div className="text-xs text-amber-700">Next</div>
              <div className="mt-1 text-sm font-bold line-clamp-2">{next.title}</div>
            </Link>
          )}
        </nav>

        <ShareButtons url={`${site.url}/en/blog/${post.slug}/`} title={post.title} image={`${site.url}/og-image.jpg`} className="mt-12" />

        <BlogMascotBubble tone="cream" src="/images/mascot-sun-thanks.png" alt="Sun-chan" className="mt-12">
          {`Thanks so much for reading!\nI hope this article brought a little sunshine to your day!\nSee you again soon!`}
        </BlogMascotBubble>

        {alsoRead.length > 0 && (
          <section className="mt-12">
            <div className="mb-6">
              <h2 className="font-display text-xl md:text-2xl font-bold text-ink-900 flex items-center gap-3">
                <SunOrnament className="w-5 h-5 md:w-6 md:h-6 text-amber-500 shrink-0" />
                <span>You might also like</span>
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
          <Sidebar headings={headings} locale={LOCALE} />
        </div>
      </div>
    </div>
  );
}