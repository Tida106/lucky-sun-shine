import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { categories } from '@/lib/categories';
import PostCard from '@/components/PostCard';
import PopularPosts from '@/components/PopularPosts';
import CategoryIcon from '@/components/CategoryIcon';
import SunOrnament from '@/components/icons/SunOrnament';
import Sparkles from '@/components/icons/Sparkles';
import SunDivider from '@/components/SunDivider';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveBanner from '@/components/PositiveBanner';

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
          className="absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-white/60 to-white/70"
        />
        <div className="max-w-6xl mx-auto px-4 pt-12 pb-20 md:pt-20 md:pb-28 text-center">
          <p className="inline-flex items-center justify-center gap-3 text-amber-700 tracking-[0.3em] text-xs md:text-sm font-bold">
            <SunOrnament className="w-4 h-4 text-amber-500" />
            <span>LUCKY SUN SHINE</span>
            <SunOrnament className="w-4 h-4 text-amber-500" />
          </p>
          <h1 className="mt-5 font-display text-3xl md:text-5xl font-extrabold text-ink-900 leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
            <span className="inline-flex items-center justify-center gap-3 md:gap-5">
              <SunOrnament className="hidden md:inline-block w-6 h-6 text-amber-500 opacity-70 shrink-0" strokeWidth={1.1} />
              <span>
                太陽のように<br className="md:hidden" />
                明るい毎日を。
              </span>
              <SunOrnament className="hidden md:inline-block w-6 h-6 text-amber-500 opacity-70 shrink-0" strokeWidth={1.1} />
            </span>
          </h1>
          {/* Catchphrases — H1 直下の3行。font-display(Noto Serif JP) を継承し、
              濃いめのゴールド(#9C7A47 ≒ text-amber-700)でほんのり小さめに重ねる。 */}
          <div className="mt-6 space-y-2 font-display font-bold text-amber-700 leading-snug">
            <p className="text-lg md:text-2xl">気分が上がれば、運気も上がる。</p>
            <p className="text-lg md:text-2xl">あなたは、絶対運がいい。</p>
          </div>
          <p className="mt-6 max-w-2xl mx-auto text-ink-700 text-sm md:text-base leading-relaxed">
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
              className="scroll-cue w-6 h-6 text-amber-600"
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
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
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

      <PositiveBanner tone="pink" message="あなたは、存在しているだけで価値がある。" />

      {/* Latest posts + sidebar popular */}
      <ScrollReveal as="section" delay={100} className="max-w-6xl mx-auto px-4 py-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
                <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
                <span>最新の記事</span>
              </h2>
              <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
            </div>
            <span className="text-sm text-ink-500">{posts.length} 記事</span>
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

      <PositiveBanner tone="peach" message="あなたには、絶対魅力がある。" />

      {/* Pickup featured pillar/hub articles — surface curated entry points
          in a distinct band, separate from the date-ordered latest grid. */}
      <ScrollReveal as="section" delay={100} className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>ピックアップ記事</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
          <p className="mt-3 ml-9 text-sm text-ink-500">
            開運を始めるなら、まずここから読んでほしいガイド記事。
          </p>
        </div>
        {featured.length === 0 ? (
          <p className="text-ink-500 text-sm">準備中です。</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 6).map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </ScrollReveal>

      <PositiveBanner tone="cream" message="大丈夫、絶対うまくいく。" />

      {/* YouTube channel intro — bridge to /recommend-youtube without
          duplicating the channel cards on the home page. */}
      <ScrollReveal as="section" delay={100} className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink-900 flex items-center gap-3">
            <SunOrnament className="w-6 h-6 text-amber-500 shrink-0" />
            <span>YouTubeチャンネル紹介</span>
          </h2>
          <span aria-hidden="true" className="heading-rule mt-3 ml-9" />
        </div>
        <Link
          href="/recommend-youtube/"
          className="group block rounded-2xl overflow-hidden border border-amber-200 bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 ease-out"
        >
          <div className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] items-center p-6 md:p-8">
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/80 flex items-center justify-center shadow-inner">
                <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12 text-rose-500" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 0 0-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="inline-flex items-center gap-2 text-amber-700 text-xs font-bold tracking-widest">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>RECOMMEND</span>
              </p>
              <h3 className="mt-2 font-display text-xl md:text-2xl font-extrabold text-ink-900 leading-snug group-hover:text-amber-700 transition-colors">
                開運に役立つおすすめYouTubeチャンネル
              </h3>
              <p className="mt-3 text-sm md:text-base text-ink-700 leading-relaxed">
                神社・パワースポット・占い・パワーストーン――。
                記事だけでは伝わらない空気感や語り手の熱量は、動画でしか得られないもの。
                Lucky Sun Shine が実際に視聴している、本当に学びになる4チャンネルを厳選して紹介します。
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-amber-700 group-hover:underline">
                おすすめチャンネルを見る
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </Link>
      </ScrollReveal>

      <PositiveBanner tone="gold" message="今日も、お日さまはあなたの味方。" />
    </>
  );
}
