import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { categories } from '@/lib/categories';
import PostCard from '@/components/PostCard';
import PopularPosts from '@/components/PopularPosts';
import CategoryIcon from '@/components/CategoryIcon';
import SunOrnament from '@/components/icons/SunOrnament';
import SunDivider from '@/components/SunDivider';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'Lucky Sun Shine | パワーストーン・パワースポット・開運の総合メディア',
  description:
    'パワーストーン、パワースポット、開運グッズ、運気アップ習慣の最新情報をお届け。今日から始める開運アクションを毎日更新中。',
};

// Pillars + hub guides surfaced at the top of "最新の記事" regardless of
// date, so visitors landing on the home page meet the curated entry
// points first. Falls back gracefully if any slug goes missing.
const FEATURED_SLUGS = [
  'how-to-choose-powerstones',       // pillar — powerstones
  'shrine-visit-basics',             // pillar — powerspots
  'lucky-items-guide',               // pillar — lucky-goods
  'lucky-habits-guide',              // pillar — luck-habits
  'luck-powerstones-complete-guide', // hub — 目的別ガイド
  'zodiac-powerstones-guide',        // hub — 12星座
  'birthstone-guide',                // hub — 12誕生石
];

export default function HomePage() {
  const posts = getAllPosts();

  const featuredSet = new Set(FEATURED_SLUGS);
  const featured = FEATURED_SLUGS
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter(Boolean);
  const rest = posts.filter((p) => !featuredSet.has(p.slug));
  const latest = [...featured, ...rest].slice(0, 9);

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
        <div className="max-w-6xl mx-auto px-4 pt-12 pb-20 md:pt-20 md:pb-28 text-center">
          <p className="inline-flex items-center justify-center gap-3 text-amber-700 dark:text-amber-300 tracking-[0.3em] text-xs md:text-sm font-bold">
            <SunOrnament className="w-4 h-4 text-amber-500" />
            <span>LUCKY SUN SHINE</span>
            <SunOrnament className="w-4 h-4 text-amber-500" />
          </p>
          <h1 className="mt-5 font-display text-3xl md:text-5xl font-extrabold text-ink-900 dark:text-amber-50 leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
            <span className="inline-flex items-center justify-center gap-3 md:gap-5">
              <SunOrnament className="hidden md:inline-block w-6 h-6 text-amber-500 opacity-70 shrink-0" strokeWidth={1.1} />
              <span>
                太陽のように<br className="md:hidden" />
                明るい毎日を。
              </span>
              <SunOrnament className="hidden md:inline-block w-6 h-6 text-amber-500 opacity-70 shrink-0" strokeWidth={1.1} />
            </span>
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-amber-200 text-sm font-medium text-amber-900 hover:bg-amber-50 hover:border-amber-400 transition-colors"
              >
                <CategoryIcon slug={c.slug} className="w-4 h-4 text-amber-600" />
                {c.title}
              </Link>
            ))}
          </div>
          {/* Scroll cue — gently bouncing chevron */}
          <div className="mt-12 md:mt-14 flex justify-center" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              className="scroll-cue w-6 h-6 text-amber-600 dark:text-amber-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </section>

      <SunDivider />

      {/* Categories */}
      <ScrollReveal as="section" className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-amber-50 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>カテゴリから探す</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}/`}
              className={`group block rounded-2xl p-5 overflow-hidden border border-white/60 ${c.pastel.bg} shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 ease-out`}
            >
              <CategoryIcon
                slug={c.slug}
                className={`w-10 h-10 mb-3 ${c.pastel.accent} transition-transform duration-500 ease-out group-hover:scale-105`}
              />
              <h3 className={`font-display font-bold text-lg ${c.pastel.accent} transition-colors`}>{c.title}</h3>
              <p className="mt-1 text-xs text-[#5A5A5A] leading-relaxed">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      <SunDivider />

      {/* Latest posts + sidebar popular */}
      <ScrollReveal as="section" delay={100} className="max-w-6xl mx-auto px-4 py-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-amber-50 flex items-center gap-3">
                <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
                <span>最新の記事</span>
              </h2>
              <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
            </div>
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
        </div>
      </ScrollReveal>

      <SunDivider />
    </>
  );
}
