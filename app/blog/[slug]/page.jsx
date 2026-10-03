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
import { getRelatedPosts } from "@/lib/related";

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
  return {
    title: post.title,
    description,
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
    alternates: {
      canonical: `/blog/${post.slug}/`,
      languages: { ja: `/blog/${post.slug}/`, en: `/en/blog/${post.slug}/` },
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
            <span className="text-ink-500">約 {minutes} 分で読めます</span>
          </div>
          <h1 className="mt-4 font-display text-3xl md:text-4xl font-extrabold leading-tight text-ink-900">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-4 text-ink-700 leading-relaxed">{post.description}</p>
          )}
          <div className="mt-5 pt-4 border-t border-amber-100 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
            <span>
              <span className="block text-[10px] tracking-widest text-amber-700 font-bold">公開日</span>
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

        {/* ▼▼ パワースポット記事専用のCTA（sあり・なし両対応） ▼▼ */}
        {(post.category === 'powerspots' || post.category === 'powerspot') && (
          <div className="mt-12 mb-8 p-6 md:p-8 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
            <div className="flex-shrink-0 w-24">
              <img src="/images/mascot-sun.png" alt="太陽ちゃん" className="w-full h-auto drop-shadow-sm" />
            </div>
            <div className="flex-1 text-gray-800 leading-relaxed text-sm md:text-base text-center sm:text-left">
              <p className="mb-4 font-bold">
                自分と向き合う時間は本当に大切だよね🌻<br />
                神様に相談しに行こうよ！<br />
                でも、もし人に相談してみたいなら、占いで専門家に聞いてみるのもいいかもね✨
              </p>
              
              <div className="my-5">
                <a 
                  href="https://px.a8.net/svt/ejp?a8mat=4BCJJV+2W6VN6+1SZG+5ZMCI" 
                  rel="nofollow"
                  className="inline-block bg-orange-400 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-500 hover:shadow-md transition-all duration-300"
                >
                  電話占いデスティニーで相談してみる
                </a>
                <img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=4BCJJV+2W6VN6+1SZG+5ZMCI" alt="" />
              </div>

              <p className="text-sm font-bold text-orange-600 mt-2">
                今なら無料登録で最大2,450円分のお試し鑑定サービス中!!💛
              </p>
            </div>
          </div>
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
            <Link href={`/blog/${prev.slug}/`} className="block p-4 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 transition-colors">
              <div className="text-xs text-amber-700">前の記事</div>
              <div className="mt-1 text-sm font-bold line-clamp-2">{prev.title}</div>
            </Link>
          )}
          {next && (
            <Link href={`/blog/${next.slug}/`} className="block p-4 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 text-right transition-colors">
              <div className="text-xs text-amber-700">次の記事</div>
              <div className="mt-1 text-sm font-bold line-clamp-2">{next.title}</div>
            </Link>
          )}
        </nav>

        <ShareButtons url={`${site.url}/blog/${post.slug}/`} title={post.title} image={`${site.url}/og-image.jpg`} className="mt-12" />

        {/* ▼通常の記事下固定メッセージ（パワーストーン購入誘導など） */}
        <BlogMascotBubble tone="cream" src="/images/mascot-sun-thanks.png" alt="太陽ちゃん" className="mt-12">
          {`最後まで読んでくれてありがとう🌻\n天然石との出会いは一期一会。いま直感で『これ！』と惹かれる石があったら、それが今のあなたに必要な運命の石だよ✨\nでも、色合いの綺麗なものや、ピンとくる石からどんどん他の人にお迎えされていっちゃうから要注意💦\n『あの時見ておけばよかった…』って後悔しないように、まずは今のラインナップだけでも早めにチェックしてみてね！💛`}
        </BlogMascotBubble>

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