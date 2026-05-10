import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { categories } from '@/lib/categories';
import PostCard from '@/components/PostCard';
import PopularPosts from '@/components/PopularPosts';
import Newsletter from '@/components/Newsletter';
import CategoryIcon from '@/components/CategoryIcon';

export const metadata = {
  title: 'Lucky Sun Shine | パワーストーン・パワースポット・開運の総合メディア',
  description:
    'パワーストーン、パワースポット、開運グッズ、運気アップ習慣の最新情報をお届け。今日から始める開運アクションを毎日更新中。',
};

export default function HomePage() {
  const posts = getAllPosts();
  const latest = posts.slice(0, 9);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden isolate">
        <Image
          src="/images/hero-crystals.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="object-cover object-center -z-10 select-none pointer-events-none"
        />
        {/* Readability overlay — 60–70% white veil keeps amber/ink type legible */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-white/60 to-white/70 dark:from-ink-900/75 dark:via-ink-900/60 dark:to-ink-900/80"
        />
        <div className="max-w-6xl mx-auto px-4 pt-12 pb-14 md:pt-20 md:pb-20 text-center">
          <p className="text-amber-700 dark:text-amber-300 tracking-widest text-xs md:text-sm font-bold">
            ☀️ LUCKY SUN SHINE ☀️
          </p>
          <h1 className="mt-4 font-display text-3xl md:text-5xl font-extrabold text-ink-900 dark:text-amber-50 leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
            太陽のように<br className="md:hidden" />
            明るい毎日を。
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-ink-700 dark:text-amber-100 text-sm md:text-base leading-relaxed">
            パワーストーン・パワースポット・開運グッズ・運気アップ習慣。<br />
            日々の暮らしに「ちょっといい兆し」を取り入れるためのメディアです。
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}/`}
                className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-amber-200 text-sm font-medium text-amber-900 hover:bg-amber-50 hover:border-amber-400 transition-colors"
              >
                {c.icon} {c.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-amber-50 mb-6 flex items-center gap-2">
          <span>🌟</span> カテゴリから探す
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}/`}
              className={`group block rounded-2xl p-5 bg-gradient-to-br ${c.color} border border-white/60 hover:scale-[1.02] transition-transform`}
            >
              <CategoryIcon slug={c.slug} className="w-9 h-9 mb-2 text-amber-600 dark:text-amber-500" />
              <h3 className="font-display font-bold text-lg text-ink-900">{c.title}</h3>
              <p className="mt-1 text-xs text-ink-700 leading-relaxed">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest posts + sidebar popular */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-amber-50 flex items-center gap-2">
              <span>📖</span> 最新の記事
            </h2>
            <span className="text-sm text-ink-500 dark:text-amber-200">{posts.length} 記事</span>
          </div>
          {latest.length === 0 ? (
            <p className="text-ink-500 text-sm">記事を準備中です。</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {latest.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <PopularPosts limit={5} />
          <Newsletter />
        </div>
      </section>
    </>
  );
}
