import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import Sidebar from '@/components/Sidebar';
import { getPostsByTag, allTags } from '@/lib/posts';
import { getCategory } from '@/lib/categories';

// 重要: generateStaticParams には *生のタグ文字列* を渡すこと。
// 以前は encodeURIComponent をかけて渡していたが、Next.js 15 がさらに
// URL エンコードを走らせるため、ファイルパスが二重エンコードされて
// すべてのタグページが 404 になっていた(GSC 404 の真の原因)。
// Next.js は静的パス生成・URL マッチング時に自動でエンコードする。
export function generateStaticParams() {
  return allTags().map((tag) => ({ slug: tag }));
}

// params.slug の正規化。Next.js のバージョンや環境(dev/prod)で
// 渡される形(生 / エンコード済み)が異なるケースを吸収する。
// % を含まなければ decodeURIComponent は冪等なのでそのまま返る。
function decodeSlug(slug) {
  if (!slug) return '';
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

// タグ一覧ページの description を、所属記事の件数・主カテゴリから生成する。
// 短すぎる description は SEO 監査で「薄い」扱いになるため、テーマ感が伝わる
// 自然な要約に膨らませる。効果断定はしないトーン（「お守りとして楽しむ視点」）。
function buildTagDescription(tag, posts) {
  const count = posts.length;
  // 主カテゴリ = タグ内で最も多いカテゴリ
  const catCount = new Map();
  for (const p of posts) catCount.set(p.category, (catCount.get(p.category) || 0) + 1);
  const top = [...catCount.entries()].sort((a, b) => b[1] - a[1])[0];
  const cat = top ? getCategory(top[0]) : null;
  const catLabel = cat ? cat.title : '開運';
  return `「${tag}」に関する${catLabel}の記事一覧。Lucky Sun Shineで「${tag}」をテーマに書かれた${count}件の記事を新着順にご紹介します。意味・象徴・使い方などを、お守りとして楽しむ視点でまとめました。`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tag = decodeSlug(slug);
  const posts = getPostsByTag(tag);
  const description = posts.length > 0
    ? buildTagDescription(tag, posts)
    : `タグ「${tag}」がついた記事の一覧です。`;
  // canonical はサイト共通のメタベース下で解決されるため、
  // ここでも *生のタグ* を入れて Next.js のエンコードに任せる。
  return {
    title: `#${tag} の記事`,
    description,
    alternates: { canonical: `/tag/${tag}/` },
  };
}

export default async function TagPage({ params }) {
  const { slug } = await params;
  const tag = decodeSlug(slug);
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
      <section className="min-w-0">
        <Breadcrumbs
          items={[
            { name: 'タグ一覧', href: '/tags/' },
            { name: `#${tag}` },
          ]}
          className="mb-6"
        />
        <header className="mb-8">
          <p className="text-amber-700 text-xs font-bold tracking-widest">TAG</p>
          <h1 className="font-display text-3xl font-extrabold mt-1">#{tag}</h1>
          <p className="mt-2 text-sm text-ink-500">{posts.length} 記事</p>
        </header>
        <div className="grid gap-5 sm:grid-cols-2">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
