import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import Sidebar from '@/components/Sidebar';
import { getPostsByTag, allTags } from '@/lib/posts';

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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tag = decodeSlug(slug);
  // canonical はサイト共通のメタベース下で解決されるため、
  // ここでも *生のタグ* を入れて Next.js のエンコードに任せる。
  return {
    title: `#${tag} の記事`,
    description: `タグ「${tag}」がついた記事の一覧です。`,
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
