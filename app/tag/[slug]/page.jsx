import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getPostsByTag, allTags } from '@/lib/posts';

export function generateStaticParams() {
  return allTags().map((tag) => ({ slug: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  return {
    title: `#${tag} の記事`,
    description: `タグ「${tag}」がついた記事の一覧です。`,
    alternates: { canonical: `/tag/${slug}/` },
  };
}

export default async function TagPage({ params }) {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
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
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
