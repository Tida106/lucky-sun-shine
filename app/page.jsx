import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { categories } from '@/lib/categories';
import { author } from '@/lib/site';
import PostCard from '@/components/PostCard';
import PopularPosts from '@/components/PopularPosts';
import Newsletter from '@/components/Newsletter';

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
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 pt-12 pb-14 md:pt-20 md:pb-20 text-center">
          <p className="text-amber-700 tracking-widest text-xs md:text-sm font-bold">
            ☀️ LUCKY SUN SHINE ☀️
          </p>
          <h1 className="mt-4 font-display text-3xl md:text-5xl font-extrabold text-ink-900 leading-tight">
            太陽のように、<br className="md:hidden" />
            運気を呼び込む暮らしを。
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-ink-700 text-sm md:text-base leading-relaxed">
            パワーストーン・パワースポット・開運グッズ・運気アップ習慣。<br />
            日々の暮らしに「ちょっといい兆し」を取り入れるためのメディアです。
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}/`}
                className="px-4 py-2 rounded-full bg-white border border-amber-200 text-sm font-medium text-amber-900 hover:bg-amber-50 hover:border-amber-400 transition-colors"
              >
                {c.icon} {c.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Operator intro — humanise the homepage */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 dark:from-amber-900/40 dark:to-rose-900/40 border border-amber-200 dark:border-amber-700 p-6 md:p-8 grid gap-6 md:grid-cols-[120px_minmax(0,1fr)_auto] items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={author.avatar}
            alt={`${author.name} のアバター`}
            width="120"
            height="120"
            className="w-24 h-24 md:w-30 md:h-30 mx-auto md:mx-0 rounded-full bg-white shadow-md"
          />
          <div className="text-center md:text-left">
            <p className="text-xs text-amber-700 dark:text-amber-300 font-bold tracking-widest">
              EDITOR'S NOTE
            </p>
            <p className="mt-1 font-display text-lg md:text-xl font-bold text-ink-900 dark:text-amber-50">
              はじめまして、編集長の{author.name}です。
            </p>
            <p className="mt-2 text-sm text-ink-700 dark:text-amber-100 leading-relaxed">
              30歳の挫折期に1つのローズクォーツに救われた経験から、
              <strong>「占いより少し実用的に、宗教より少しゆるく」</strong>を
              モットーに、日々の暮らしに開運を取り入れる方法をお届けします。
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <Link
              href="/start-here/"
              className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold whitespace-nowrap text-center"
            >
              🌟 はじめての方へ
            </Link>
            <Link
              href="/operator/"
              className="px-4 py-2 rounded-full bg-white dark:bg-ink-900 border border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-200 text-sm font-bold whitespace-nowrap text-center hover:bg-amber-50 dark:hover:bg-ink-700"
            >
              編集長プロフィール
            </Link>
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
              <div className="text-4xl mb-2">{c.icon}</div>
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
